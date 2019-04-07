# mpdump

Dump all the songs stored in a [MPD](http://www.musicpd.org) database into a raw list that may be parsed to JSON.

## Install

The following tools are written in ECMAScript. You need [Node](https://nodejs.org) > 6 to run them.

Execute `npm i` to install the dependencies.

## Usage

### Dump

- MPD must be running
- execute `node dump.js`
- it generates a `dump.raw` file in the current directory by executing `listallinfo`
- the dump is finished when the last line displays `OK`

#### Config

By default the client connects on port `6600` and the result is called `dump.raw`.
Simply edit the `dump.js` to tweak those values. Don't be scared, the script is only a few lines long!

### Parse

- `dump.raw` must have been generated (see above) in the current directory
- execute `node parse.js`
- it generates a `dump.json` file in the current directory
- ???
- [PROFIT!](https://github.com/Delapouite/visic)

### Bonus

You can also run `npm run dump` and `npm run parse`

## License

MIT
