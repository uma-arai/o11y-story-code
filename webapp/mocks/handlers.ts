import { rest } from "msw"
import { API_HOST } from "app/config"
import { pets } from "app/utils"

export const handlers = [
  rest.get(`${API_HOST}/pets`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        pets.map((pet) => {
          return {
            ...pet,
          }
        })
      )
    )
  }),
  rest.get(`${API_HOST}/pets/:petId`, (req, res, ctx) => {
    const id = req.params.petId
    if (typeof id === "string") {
      const pet = pets.find((pet) => pet.id === id)
      return res(ctx.status(200), ctx.json(pet))
    }

    return res(ctx.status(404))
  }),
  rest.get(`${API_HOST}/cnosdemo/v1/cpubound`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}), ctx.delay(10000))
  }),
]
