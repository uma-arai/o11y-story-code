import { BlitzPage } from "blitz"
import { MainLayout } from "app/templates"
import { Custom500Error } from "app/utils/error"

const CrashPage: BlitzPage = () => {
  throw new Custom500Error("500エラーが発生しました。")
}

CrashPage.getLayout = (page) => <MainLayout title="エラーが出るページ">{page}</MainLayout>

export default CrashPage
