var fs = require("fs")
var net = require("net")

var fsStream = fs.createWriteStream("dump.raw")

var client = net.connect(6600, () => client.write("listallinfo\n"))

client.on("data", (data) => console.log(data.toString()))

client.on("end", () => console.log("Client disconnected"))

client.pipe(fsStream)
