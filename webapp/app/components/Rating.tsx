import { HStack, Icon, StackProps } from "@chakra-ui/react"
import { FaHeart } from "app/components/icons"

type Props = {
  defaultValue?: number
  max?: number
  size?: "sm" | "md" | "lg" | "xl"
} & StackProps

export const Rating = ({ defaultValue = 0, max = 5, size = "md", ...stackProps }: Props) => {
  return (
    <HStack spacing="0.5" {...stackProps}>
      {Array.from({ length: max })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            key={index}
            as={FaHeart}
            fontSize={size}
            color={index <= defaultValue ? "primary.100" : "white"}
          />
        ))}
    </HStack>
  )
}
