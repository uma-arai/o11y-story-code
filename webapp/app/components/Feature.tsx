import { ReactElement } from "react"
import { Flex, Stack, Text } from "@chakra-ui/react"

type FeatureProps = {
  text: string
  iconBg: string
  icon?: ReactElement
}

export const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}
