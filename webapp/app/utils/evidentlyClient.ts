import { EvidentlyClient } from "@aws-sdk/client-evidently"

export const evidentlyClient = process.env.ENABLED_EVIDENTLY_OPTION
  ? new EvidentlyClient({ region: process.env.NEXT_PUBLIC_AWS_REGION })
  : null
