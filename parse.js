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
    var last = null

    var songs = getLines(content).reduce((acc, line) => {
        const [key, value] = getEntry(line)

        if (key === "directory") {
            last = key
        }
        // song delimiter
        if (key === "file") {
            last = key
            if (song) acc.push(song)
            song = { file: value }
        } else if (last === "file") {
            song[key] = value
        }
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
    var s = line.split(":")
    return [camelCase(s[0]), s[1].trim()]
}
