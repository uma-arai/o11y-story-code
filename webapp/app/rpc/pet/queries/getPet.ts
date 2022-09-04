import { apiClient } from "app/utils"
import { Ctx, getConfig, resolver } from "blitz"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider"
import { SpanKind, SpanStatusCode } from "@opentelemetry/api"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import * as z from "zod"

const GetPet = z.object({
  id: z.string().nonempty(),
})

export default resolver.pipe(resolver.zod(GetPet), async ({ id }, ctx: Ctx) => {
  const { serverRuntimeConfig } = getConfig()
  const tracerProvider: NodeTracerProvider = serverRuntimeConfig.tracerProvider
  const exporter = new OTLPTraceExporter({})
  const spanProcessor = new BatchSpanProcessor(exporter)
  tracerProvider.addSpanProcessor(spanProcessor)
  const tracer = tracerProvider.getTracer("cnos")

  const callExternalApi = async ({ id, path }: { id: string; path: string }) => {
    return tracer.startActiveSpan(path, async (childSpan) => {
      // この子は私のものだからアクセスしないでほしい
      if (id === "5") {
        await apiClient.cnosapp.v1.performance.cpubound.get()
      }
      // TODO: ちゃんとAPIかく
      //await apiClient.cnosapp.v1.pets._petId(id).get()
      childSpan.end()
    })
  }

  try {
    await tracer.startActiveSpan("rpc-getPet", { kind: SpanKind.INTERNAL }, async (span) => {
      if (span.isRecording()) {
        span.setAttribute("api.path", apiClient.pets.$path())
      }

      try {
        await callExternalApi({ id, path: apiClient.cnosapp.v1.performance.cpubound.$path() })
      } catch (e: any) {
        span.recordException(e)
        span.setStatus({ code: SpanStatusCode.ERROR, message: e.message })
      } finally {
        span.end()
      }
    })
  } catch (e) {
    console.error(e)
    throw e
  }
})
