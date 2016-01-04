# mpdump

Dump all the songs stored in a [MPD](http://www.musicpd.org) database into a raw list that may be parsed to JSON.

## Install

The following tools are written in ECMAScript. You need [Node](https://nodejs.org) > 5 to run them.

## Usage

### Dump

- MPD must be running.
- execute `node dump.js`
- it will generate a `dump.raw` file in the current directory
- `CTRL+C` to kill the client when the dump is finished. (OK is written on the screen)

#### Config

By default the client will connect on port `6600` and the result is called `dump.raw`.
Simply edit the `dump.js` to tweak those values. Don't be scared, the script is only a few lines long!
