import { PetsType } from "app/models"
import { DefineMethods } from "aspida"

export type Methods = DefineMethods<{
  get: {
    resBody: PetsType
  }
}>
