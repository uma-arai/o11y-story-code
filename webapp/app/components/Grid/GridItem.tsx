import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react"
import { PriceTag } from "app/components/PriceTag"
import { PetsType } from "app/models"
import { Link as BlitzLink, useQuery, useRouter } from "blitz"
import getEvaluate from "../../rpc/evidently/queries/getEvaluate"
import { Rating } from "../Rating"
import { useMemo } from "react"
import { ReserveModal } from "../Modal"

type BaseItemType = PetsType
type Props<T extends BaseItemType> = {
  items: T
  rootProps?: StackProps
}

export const GridItem = <T,>(props: Props<T extends BaseItemType ? T : BaseItemType>) => {
  const router = useRouter()
  const code = router.query["tester"]
  const [flag] = useQuery(
    getEvaluate,
    {
      feature: "cnos-favorite-feature",
      project: "cnos-appconfig",
      code: Array.isArray(code) ? code[0] : code,
    },
    { suspense: false }
  )
  const likes = useMemo(() => Math.ceil(Math.random() * 5), [])
  const disclosure = useDisclosure()

  const { items, rootProps } = props
  const { id, name, imageUrl, price, salePrice } = items

  return (
    <Stack spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
      <Box position="relative" maxW={"20vw"}>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={imageUrl}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={"gray.700"}>
            {name}
          </Text>
          <PriceTag price={price} salePrice={salePrice} currency="JPY" />
        </Stack>
        {!!flag && (
          <HStack>
            <Rating defaultValue={likes} />
            <Text fontSize="sm" color={"grey.100"}>
              {`${likes}人がお気に入り`}
            </Text>
          </HStack>
        )}
      </Stack>
      <Stack align="center">
        <BlitzLink href={`/pets/${id}`} passHref>
          <Button as={"a"}>詳細を見る</Button>
        </BlitzLink>
        <Link as="button" textDecoration="underline" color={"gray.70"} onClick={disclosure.onOpen}>
          見学予約をする
        </Link>
        <ReserveModal {...disclosure} name={name} />
      </Stack>
    </Stack>
  )
}
