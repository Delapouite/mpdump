var fs = require("fs")
var camelCase = require("camelcase")

fs.readFile("dump.raw", "utf8", (err, content) => {
    if (err) throw err

    var parsed = parse(content)

    fs.writeFile("dump.json", JSON.stringify(parsed, null, 2), (err) => {
        if (err) throw err

        console.log(`dump.json created with ${parsed.songs.length} songs`)
    })
})

function parse (content) {
    var song = null

    var songs = getLines(content).reduce((acc, line) => {
        // TODO destructuring
        var entry = getEntry(line)
        var key = entry[0]
        var value = entry[1]

        // song delimiter
        if (key === "file") {
            if (song) acc.push(song)
            song = { file: value }
        }
        song[key] = value
        return acc
    }, [])

    return { songs }
}

function getLines (content) {
    var lines = content.split("\n")
    // remove extraneous MPD fences
    lines.shift()
    lines.pop()
    lines.pop()

    return lines
}

function getEntry (line) {
    // TODO destructuring
    var s = line.split(":")
    return [camelCase(s[0]), s[1].trim()]
}
