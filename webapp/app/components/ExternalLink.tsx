import { HStack, Icon, Link as ChakraLink, Text } from "@chakra-ui/react"
import { ComponentProps } from "react"
import { FaExternalLinkAlt } from "app/components/icons"

type ExternalLinkProps = ComponentProps<typeof ChakraLink>

export const ExternalLink = ({ children, ...restProps }: ExternalLinkProps) => {
  return (
    <ChakraLink {...restProps} isExternal>
      <HStack>
        <Text>{children}</Text>
        <Icon as={FaExternalLinkAlt} />
      </HStack>
    </ChakraLink>
  )
}
