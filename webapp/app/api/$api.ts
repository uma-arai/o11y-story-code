import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from './cnosapp/v1/performance/cpubound'
import type { Methods as Methods1 } from './cnosapp/v1/pets/_petId@string'
import type { Methods as Methods2 } from './cnosapp1/v1/performance/cpubound'
import type { Methods as Methods3 } from './cnosapp1/v1/pets/_petId@string'
import type { Methods as Methods4 } from './pets'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/cnosapp/v1/performance/cpubound'
  const PATH1 = '/cnosapp/v1/pets'
  const PATH2 = '/cnosapp1/v1/performance/cpubound'
  const PATH3 = '/cnosapp1/v1/pets'
  const PATH4 = '/pets'
  const GET = 'GET'

  return {
    cnosapp: {
      v1: {
        performance: {
          cpubound: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH0}`
          }
        },
        pets: {
          _petId: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`

            return {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1['get']['resBody']>(prefix, prefix3, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1['get']['resBody']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          }
        }
      }
    },
    cnosapp1: {
      v1: {
        performance: {
          cpubound: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH2}`
          }
        },
        pets: {
          _petId: (val3: string) => {
            const prefix3 = `${PATH3}/${val3}`

            return {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods3['get']['resBody']>(prefix, prefix3, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods3['get']['resBody']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          }
        }
      }
    },
    pets: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods4['get']['resBody']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods4['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
