import aspida from "@aspida/node-fetch"
import api from "app/api/$api"
import { API_HOST } from "app/config"
import fetch from "node-fetch"
import { XRayClient } from "@aws-sdk/client-xray"

// a client can be shared by different commands.
export const xrayClient = new XRayClient({ region: "ap-northeast-1" })
export const apiClient = api(aspida(fetch, { baseURL: API_HOST }))
