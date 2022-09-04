import { apiClient, pets } from "app/utils"
import { Ctx, getConfig } from "blitz"
import { PetsType } from "../../../models"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider"
import { Span, SpanKind, SpanStatusCode } from "@opentelemetry/api"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc"
import { BatchSpanProcessor, Tracer } from "@opentelemetry/sdk-trace-base"
import { Segment } from "aws-xray-sdk"
import assert from "assert"
import { AspidaResponse } from "aspida"

const getPets = async (_ = null, ctx: Ctx) => {
  let segment: Segment | null = null
  let tracer: Tracer | null = null
  let otelSpan: Span | null = null
  if (process.env.TRACING === "xray") {
    const AWSXRay = require("aws-xray-sdk")
    segment = new AWSXRay.Segment("xray-segment")
    assert(segment)
    segment.addMetadata("rpc", "getPets")
  } else {
    const { serverRuntimeConfig } = getConfig()
    const tracerProvider: NodeTracerProvider = serverRuntimeConfig.tracerProvider
    const exporter = new OTLPTraceExporter({})
    const spanProcessor = new BatchSpanProcessor(exporter)
    tracerProvider.addSpanProcessor(spanProcessor)
    tracer = tracerProvider.getTracer("cnos")
    otelSpan = tracer.startSpan("get-pets", { kind: SpanKind.INTERNAL })
    otelSpan.setAttribute("rpc", "getPets")
  }

  try {
    if (process.env.LOCAL_MODE === "1") {
      return pets.map((pet) => {
        return {
          id: pet.id,
          name: pet.name,
          currency: pet.currency,
          price: pet.price,
          salePrice: pet.salePrice,
          imageUrl: pet.imageUrl,
        } as PetsType
      })
    }

    if (process.env.TRACING === "xray") {
      const subSegment = segment?.addNewSubsegment("api-call")
      const result = await apiClient.pets.get()
      subSegment?.close()
      return result.body
    } else {
      assert(tracer)
      return await tracer.startActiveSpan(
        "active-getPets",
        { kind: SpanKind.INTERNAL },
        async (span) => {
          if (span.isRecording()) {
            span.setAttribute("api.path", apiClient.pets.$path())
          }

          let result: AspidaResponse<PetsType[]> | null = null
          try {
            result = await apiClient.pets.get()
          } catch (e: any) {
            span.recordException(e)
            span.setStatus({ code: SpanStatusCode.ERROR, message: e.message })
          } finally {
            span.end()
          }
          return result?.body || []
        }
      )
    }
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    if (process.env.TRACING === "xray") {
      segment?.flush()
      segment?.close()
    } else {
      otelSpan?.end()
    }
  }
}

export default getPets
