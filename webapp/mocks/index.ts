if (typeof window === "undefined") {
  const { server } = require("./server")
  server.listen({
    onUnhandledRequest: "bypass",
  })
  server.printHandlers()
} else {
  const { worker } = require("./browser")
  worker.start({
    onUnhandledRequest: "bypass",
  })
  worker.printHandlers()
}

export {}
