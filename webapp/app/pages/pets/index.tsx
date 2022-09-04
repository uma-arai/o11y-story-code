import { BlitzPage, useQuery } from "blitz"
import { MainLayout } from "app/templates"
import { Grid, GridItem } from "app/components/Grid"
import { Box } from "@chakra-ui/react"
import getPets from "app/rpc/pet/queries/getPets"

const PetsPage: BlitzPage = () => {
  const [pets] = useQuery(getPets, null)

  return (
    <Box
      w="100%"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Grid>
        {pets.map((pet) => (
          <GridItem key={pet.id} items={pet} />
        ))}
      </Grid>
    </Box>
  )
}

PetsPage.suppressFirstRenderFlicker = true
PetsPage.getLayout = (page) => <MainLayout title="一覧ページ">{page}</MainLayout>

export default PetsPage
