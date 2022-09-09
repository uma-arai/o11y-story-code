import { apiClient, pets, sleep } from "app/utils"
import { Ctx, getConfig, resolver } from "blitz"
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider"
import { SpanKind, SpanStatusCode } from "@opentelemetry/api"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc"
import { BatchSpanProcessor, Tracer } from "@opentelemetry/sdk-trace-base"
import { z } from "zod"
import assert from "assert"

const GetPet = z.object({
  id: z.string().nonempty(),
})
type GetPetType = z.infer<typeof GetPet>

export default resolver.pipe(resolver.zod(GetPet), async ({ id }, ctx: Ctx) => {
  let tracer: Tracer | null = null

  if (process.env.TRACING === "1") {
    const { serverRuntimeConfig } = getConfig()
    const tracerProvider: NodeTracerProvider = serverRuntimeConfig.tracerProvider
    const exporter = new OTLPTraceExporter({})
    const spanProcessor = new BatchSpanProcessor(exporter)
    tracerProvider.addSpanProcessor(spanProcessor)
    tracer = tracerProvider.getTracer("cnos")
  }

  const callDummyPetApi = async ({ id }: GetPetType) => {
    if (process.env.TRACING === "1") {
      assert(tracer)
      return await tracer.startActiveSpan("api-/pet/{id}", async (childSpan) => {
        const pet = pets.find((p) => p.id === id)
        await sleep(500)
        childSpan.end()

        return pet
      })
    } else {
      await sleep(500)
      return pets.find((p) => p.id === id)
    }
  }

  const callExternalApi = async ({ id, path }: GetPetType & { path: string }) => {
    if (process.env.TRACING === "1") {
      assert(tracer)
      return await tracer.startActiveSpan(path, async (childSpan) => {
        // この子は私のものだからアクセスしないでほしい
        if (id === "5") {
          await apiClient.cnosapp1.v1.performance.cpubound.$get()
        }
        const pet = await callDummyPetApi({ id })
        childSpan.end()

        return pet
      })
    } else {
      return await callDummyPetApi({ id })
    }
  }

  try {
    if (process.env.TRACING === "1") {
      assert(tracer)
      return await tracer?.startActiveSpan(
        "rpc-getPet",
        { kind: SpanKind.INTERNAL },
        async (span) => {
          if (span.isRecording()) {
            span.setAttribute("api.path", apiClient.pets.$path())
          }

          try {
            return await callExternalApi({
              id,
              path: apiClient.cnosapp1.v1.performance.cpubound.$path(),
            })
          } catch (e: any) {
            span.recordException(e)
            span.setStatus({ code: SpanStatusCode.ERROR, message: e.message })
          } finally {
            span.end()
          }
        }
      )
    } else {
      return await callExternalApi({
        id,
        path: apiClient.cnosapp1.v1.performance.cpubound.$path(),
      })
    }
  } catch (e) {
    console.error(e)
    throw e
  }
})
