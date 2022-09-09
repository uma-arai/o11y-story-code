import {
  App,
  AppContext,
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"

import { ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react"
import { Suspense, useEffect } from "react"
import theme from "app/theme"
import components from "app/theme/components"
import { rumClient } from "../utils"

if (process.env.NODE_ENV === "development") {
  require("../../mocks")
}


export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLED_RUM_OPTION === "1") {
      rumClient?.recordPageView(router.pathname)
    }
  }, [router])

  return (
    <ChakraProvider theme={extendTheme(theme, components)}>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          onReset={useQueryErrorResetBoundary().reset}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  useEffect(() => {
    rumClient?.recordError(error)
  }, [])
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // https://blitzjs.com/docs/app-component#caveats
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appInitialProps = await App.getInitialProps(appContext)
  const { ctx } = appContext

  if (!ctx.req) {
    return { ...appInitialProps }
  }

  return { ...appInitialProps }
}
