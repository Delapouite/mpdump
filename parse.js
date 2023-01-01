const fs = require("fs")
const camelCase = require("camelcase")

const tags = [
  "file",
  "lastModified",
  "format",
  "time",
  "duration",
  "artist",
  "title",
  "album",
  "track",
  "date",
]

fs.readFile("dump.raw", "utf8", (err, content) => {
  if (err) throw err

  const parsed = parse(content)

  fs.writeFile("dump.json", JSON.stringify(parsed, null, 2), (err) => {
    if (err) throw err

    console.log(`dump.json created with ${parsed.songs.length} songs`)
  })

  fs.writeFile("dump.jsonl", parsed.songs.map(s => JSON.stringify(s)).join("\n"), (err) => {
    if (err) throw err

    console.log(`dump.jsonl created with ${parsed.songs.length} songs`)
  })
})

function parse (content) {
  let song = null
  let last = null

  const songs = getLines(content).reduce((acc, line) => {
    const [key, value] = getEntry(line)
    if (key === "directory") {
      console.log(value)
      last = key
    } else {
      if (!tags.includes(key))
        console.warn("tag", key, value)
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
  const lines = content.split("\n")
  // remove extraneous MPD fences
  lines.shift()
  lines.pop()
  lines.pop()

  return lines
}

function getEntry (line) {
  const [k, v] = line.split(":")
  return [camelCase(k), v.trim()]
}
