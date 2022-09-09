import { evidentlyClient } from "app/utils"
import { Ctx } from "blitz"
import { EvaluateFeatureCommand, EvaluateFeatureCommandInput } from "@aws-sdk/client-evidently"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

const GetEvaluate = z.object({
  project: z.string().nonempty(),
  feature: z.string().nonempty(),
  code: z.string().optional(),
})
type InputType = z.infer<typeof GetEvaluate>

/**
 * Evidently APIを利用してInputに指定した機能から値を取得する
 *
 * @param {InputType} input プロジェクト、機能を指定
 * @param {Ctx} ctx
 * @returns {Promise<boolean | null>}
 */
const getEvaluate = async (input: InputType, ctx: Ctx): Promise<boolean | null> => {
  // Evidentlyの機能有効化チェック
  if (!process.env.ENABLED_EVIDENTLY_OPTION) {
    return null
  }

  // 入力値が適切な型かチェック
  GetEvaluate.parse(input)

  // Evidentlyからの返却値を判断する要素であるentityIdの指定
  // entityIdが変わらない場合は同一の値がEvidentlyから返却される
  // userIdなど特定の値が入力された場合は、その値を利用する
  // 今回は機能の値が切り替わったことを確認するためにUUIDを毎回発行している
  const entityId = input.code ?? uuidv4()
  try {
    const param: EvaluateFeatureCommandInput = {
      entityId,
      ...input,
    }
    const command = new EvaluateFeatureCommand(param)

    // コマンドで指定した「機能」の値を取得
    const data = await evidentlyClient?.send(command)

    return (data?.value?.boolValue as boolean) || null
  } catch (e) {
    console.error(e)
  }

  return null
}

export default getEvaluate
