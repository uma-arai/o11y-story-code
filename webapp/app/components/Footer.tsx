import { ReactNode } from "react"
import {
  Box,
  Button,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { ExternalLink } from "./ExternalLink"

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <Button
      bg={useColorModeValue("grey", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("grey.lightGrey", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

export const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position={"sticky"}
      top={"100vh"}
    >
      <Stack maxW={"4xl"} px={10} py={3}>
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
      </Stack>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Stack
          maxW={"6xl"}
          py={2}
          px={10}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 uma-arai. All rights reserved</Text>
        </Stack>
      </Box>
    </Box>
  )
}
