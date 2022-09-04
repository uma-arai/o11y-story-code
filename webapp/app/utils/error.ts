import SuperJson from "superjson"

export class Custom500Error extends Error {
  statusCode = 500

  constructor(message: string = "[Error] サーバ側で問題が発生しています。") {
    super(message)
    this.name = new.target.name
    this.statusCode = 500
    Object.setPrototypeOf(this, Custom500Error.prototype)
  }
}

SuperJson.registerClass(Custom500Error, {
  identifier: "Custom500Error",
  allowProps: ["statusCode", "message"],
})
