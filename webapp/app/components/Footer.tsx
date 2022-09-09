import { ReactNode } from "react"
import { Box, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { ExternalLink } from "./ExternalLink"

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

export const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      bg={"gray.50"}
      color={"gray.700"}
      position={"sticky"}
      top={"100vh"}
      w={"100vw"}
    >
      <Stack px={10} py={3} justify={"space-between"} direction={{ base: "column", md: "row" }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Titles</ListHeader>
            <ExternalLink href={"https://umarai-books.booth.pm/items/1866872"}>
              Cloud Native First Story
            </ExternalLink>
            <ExternalLink href={"https://umarai-books.booth.pm/items/3045918"}>
              Cloud Native IaC Story
            </ExternalLink>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <ExternalLink href={"https://umarai-books.booth.pm/"}>BOOTH</ExternalLink>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href={"#"}>Terms of Service</Link>
          </Stack>
        </SimpleGrid>
        <Stack
          py={2}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          align={{ base: "flex-start", md: "flex-end" }}
        >
          <Text>© 2022 uma-arai. All rights reserved</Text>
        </Stack>
      </Stack>
    </Box>
  )
}
