// CloudWatch RUMの有効化
import { AwsRum, AwsRumConfig } from "aws-rum-web"

let rumClient: AwsRum | null
if (typeof window !== "undefined") {
  if (process.env.NEXT_PUBLIC_ENABLED_RUM_OPTION === "1") {
    console.log(
      "process.env.NEXT_PUBLIC_ENABLED_RUM_OPTION",
      process.env.NEXT_PUBLIC_ENABLED_RUM_OPTION
    )
    try {
      const APPLICATION_ID = process.env.NEXT_PUBLIC_RUM_APP_ID || ""
      const APPLICATION_VERSION = "1.0.0"
      const APPLICATION_REGION = process.env.NEXT_PUBLIC_AWS_REGION || "ap-northeast-1"

      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        guestRoleArn: process.env.NEXT_PUBLIC_GUEST_ROLE_ARN,
        identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
        endpoint: `https://dataplane.rum.${APPLICATION_REGION}.amazonaws.com`,
        telemetries: [
          ["errors", { stackTraceLength: 512 }],
          "performance",
          ["http", { stackTraceLength: 512, addXRayTraceIdHeader: true }],
        ],
        allowCookies: true,
        enableXRay: true,
        disableAutoPageView: true,
      }

      rumClient = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
      console.info(
        "INFO: complete RUM initialization!",
        APPLICATION_ID,
        APPLICATION_VERSION,
        APPLICATION_REGION,
        config
      )
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
      console.error("ERROR: failed to initiate RUM", error)
    }
  }
}

export { rumClient }
