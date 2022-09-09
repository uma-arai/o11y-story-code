import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node"
import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import { Resource } from "@opentelemetry/resources"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"
import { AWSXRayPropagator } from "@opentelemetry/propagator-aws-xray"
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api"
import { AWSXRayIdGenerator } from "@opentelemetry/id-generator-aws-xray"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk"

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

const tracerProvider = new NodeTracerProvider({
  idGenerator: new AWSXRayIdGenerator(),
  resource: Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "cnos-webapp",
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
    })
  ),
})

tracerProvider.register({
  propagator: new AWSXRayPropagator(),
})

if (process.env.NODE_ENV === "production") {
  registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations({
        // load custom configuration for http instrumentation
        "@opentelemetry/instrumentation-http": {
          applyCustomAttributesOnSpan: (span) => {
            span.setAttribute("http", "instrumentation-http")
          },
        },
      }),
      new AwsInstrumentation({}),
    ],
    tracerProvider,
  })
}

module.exports = {
  middleware: [
    sessionMiddleware({
      sessionExpiryMinutes: 60,
      sameSite: "strict",
      cookiePrefix: "cnos-webapp",
      secureCookies: false,
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  log: {
    level: "fatal",
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    tracerProvider,
  },
}
