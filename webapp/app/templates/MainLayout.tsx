import { Center, Flex, Spinner } from "@chakra-ui/react"
import { calc } from "@chakra-ui/theme-tools"
import { Footer, Header } from "app/components"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "app/utils"
import { BlitzLayout, Head } from "blitz"
import { ReactNode, Suspense } from "react"


type Props = { title?: string; children: ReactNode }

export const MainLayout: BlitzLayout<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Cloud Native Observability Story"}</title>
        <link rel="icon" href={"/favicon.svg"} />
      </Head>
      <Header />
      <Flex
        justify={"flex-start"}
        width={"100%"}
        minH={calc.subtract("100vh", `${FOOTER_HEIGHT}px`, `${HEADER_HEIGHT}px`)}
        maxH={"100%"}
      >
        <Suspense
          fallback={
            <Center
              flex={10}
              bg={"grey.pearlGrey"}
              height={calc.subtract("100vh", `${HEADER_HEIGHT}px`, `${FOOTER_HEIGHT}px`)}
            >
              <Spinner w={"30px"} h={"30px"} />
            </Center>
          }
        >
          {children}
        </Suspense>
      </Flex>
      <Footer />
    </>
  )
}
