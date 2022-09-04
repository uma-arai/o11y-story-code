import { Center, Flex, Spinner } from "@chakra-ui/react"
import { calc } from "@chakra-ui/theme-tools"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "app/utils"
import { BlitzLayout } from "blitz"
import { ReactNode, Suspense } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

type Props = { title?: string; children: ReactNode }

export const MainLayout: BlitzLayout<Props> = ({ title, children }) => {
  return (
    <>
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
