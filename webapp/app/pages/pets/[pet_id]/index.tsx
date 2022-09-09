import { BlitzPage, Link, useParam, useQuery } from "blitz"
import { MainLayout } from "app/templates"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import assert from "assert"
import { Suspense } from "react"
import { PriceTag, ReserveModal } from "app/components"
import { FaChevronRight, MdLocalShipping } from "app/components/icons"
import getPet from "app/rpc/pet/queries/getPet"

type DetailProps = {
  id: string
}

const Detail = ({ id }: DetailProps) => {
  const [pet] = useQuery(getPet, { id })
  const disclosure = useDisclosure()

  return (
    <Container maxW={"7xl"}>
      <Breadcrumb spacing={3} separator={<FaChevronRight color="gray.100" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            トップ
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/pets">
            一覧
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{pet?.name || ""}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          {pet ? (
            <Image
              rounded={"md"}
              alt={"pet image"}
              src={pet.imageUrl}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          ) : (
            <Center w={"100%"} h={{ base: "100%", sm: "400px", lg: "500px" }}>
              <Spinner />
            </Center>
          )}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {pet?.name || "--"}
            </Heading>
            <PriceTag price={pet?.price || 99999999} salePrice={pet?.salePrice} currency="JPY" />
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                推しポイント
              </Text>
              <Text fontSize={"lg"}>{pet?.description || "なし"}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.500"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                特徴
              </Text>
              {pet && (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {pet.features.map((f) => (
                    <List key={f} spacing={2}>
                      <ListItem>{f}</ListItem>
                    </List>
                  ))}
                </SimpleGrid>
              )}
            </Box>
            {pet && (
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={"yellow.500"}
                  fontWeight={"500"}
                  mb={"4"}
                >
                  詳細情報
                </Text>
                <List spacing={2}>
                  {pet.details.map((v) => (
                    <ListItem key={v.name}>
                      <Text as={"span"} fontWeight={"bold"} mr={5}>
                        {v.name}
                      </Text>
                      {v.value}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Stack>

          <Button size="lg" variant={"primary"} onClick={disclosure.onOpen}>
            見学をする
          </Button>
          <ReserveModal {...disclosure} />

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>予約には２〜３営業日かかります</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

const PetDetailPage: BlitzPage = () => {
  const id = useParam("pet_id")
  if (!id) {
    return <Spinner />
  }
  assert(!Array.isArray(id), "想定外の値です")

  return (
    <Box
      w="100%"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Suspense
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <Detail id={id} />
      </Suspense>
    </Box>
  )
}

PetDetailPage.suppressFirstRenderFlicker = true
PetDetailPage.getLayout = (page) => <MainLayout title="一覧ページ">{page}</MainLayout>

export default PetDetailPage
