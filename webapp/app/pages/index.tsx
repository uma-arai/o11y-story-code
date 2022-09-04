import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { BlitzPage, Link } from "blitz"
import { MainLayout } from "app/templates"
import { ReactElement } from "react"
import { IoIosAlarm, IoIosAnalytics, IoIosJet, IoLogoOctocat } from "app/components/icons"

type FeatureProps = {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

const TopPage: BlitzPage = () => {
  return (
    <VStack p={12} gap={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            3rd shop
          </Text>
          <Heading>CloudWatch Pet shop</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            CloudWatch本で運営するペットショップです。
          </Text>
          <Stack
            spacing={4}
            divider={<StackDivider borderColor={useColorModeValue("gray.100", "gray.700")} />}
          >
            <Feature
              icon={<Icon as={IoLogoOctocat} color={"yellow.500"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"かわいい家族がみつかります"}
            />
            <Feature
              icon={<Icon as={IoIosJet} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"家族をCloudWatchで見守ります"}
            />
            <Feature
              icon={<Icon as={IoIosAlarm} color={"purple.500"} w={5} h={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"家族に何かあってもAlarmsで検知します"}
            />
            <Feature
              icon={<Icon as={IoIosAnalytics} color={"pink.500"} w={5} h={5} />}
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"健康状態もしっかりInsight"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            src={
              "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            }
            alt={"welcome cat"}
          ></Image>
        </Flex>
      </SimpleGrid>
      <Center w={"100%"}>
        <Link href="/pets" passHref>
          <Button as="a" size={"lg"} flex={1} maxW={"30%"}>
            一覧を見る
          </Button>
        </Link>
      </Center>
    </VStack>
  )
}

TopPage.suppressFirstRenderFlicker = true
TopPage.getLayout = (page) => <MainLayout title="トップページ">{page}</MainLayout>

export default TopPage
