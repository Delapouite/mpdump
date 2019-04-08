const fs = require("fs")
const net = require("net")

const fsStream = fs.createWriteStream("dump.raw")

const client = net.connect(6600, () => client.write("listallinfo\n"))

client.on("data", (data) => {
  const str = data.toString()
  console.log(str)
  if (str.endsWith('OK\n')) {
    client.destroy()
  }
})

client.on("error", console.error)

client.on("end", () => console.log("Client disconnected"))

client.pipe(fsStream)
