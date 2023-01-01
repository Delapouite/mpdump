# mpdump

Dump all the songs stored in a [MPD](http://www.musicpd.org) database into a raw list that may be parsed to JSON and JSONL, and then inserted into a [SQLite](https://www.sqlite.org/index.html) database.

## Install

The following tools are written in ECMAScript. You need [Node](https://nodejs.org) > 6 to run them.

Execute `npm i` to install the camelcase dependency.

## Usage

### Dump

- MPD must be running
- execute `npm run dump`
- it generates a `dump.raw` file in the current directory by executing [`listallinfo`](https://www.musicpd.org/doc/html/protocol.html#command-listallinfo)
- the dump is finished when the last line displays `OK`

#### Config

By default the client connects on port `6600` and the result is called `dump.raw`.
Simply edit the `dump.js` to tweak those values. Don't be scared, the script is only a few lines long!

### Parse

- `dump.raw` must have been generated (see above) in the current directory
- execute `npm run parse`
- it generates a `dump.json` file in the current directory
- it generates a `dump.jsonl` file in the current directory (https://jsonlines.org/)
- ???
- [PROFIT!](https://github.com/Delapouite/visic)

### Insert

- `sqlite-utils` must be installed on your system (https://sqlite-utils.datasette.io/en/stable/index.html)
- `dump.jsonl` must have been generated (see above) in the current directory
- execute `npm run insert`
- it generates a `dump.sqlite` with a `songs` table in the current directory

## License

MIT
