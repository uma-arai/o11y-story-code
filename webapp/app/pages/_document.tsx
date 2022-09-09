import { BlitzScript, Document, DocumentHead, Html, Main } from "blitz"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP&subset=japanese"
            rel="stylesheet"
          />
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
