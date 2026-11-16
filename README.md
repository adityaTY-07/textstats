# @adityatyagi/textstats

Beginner-friendly text statistics for Node.js, with no dependencies.

Requires Node.js 18 or newer and uses CommonJS.

## Install

Install the published package:

```sh
npm install @adityatyagi/textstats
```

Or install it globally to use the command-line tool:

```sh
npm install --global @adityatyagi/textstats
```

## Usage

### Text statistics

```js
const { textStats } = require('@adityatyagi/textstats');

console.log(textStats.analyze('Hello, Node.js! Hello again.'));
// {
//   wordCount: 5,
//   charCount: 25,
//   readingTime: 1,
//   topWords: [{ word: 'hello', count: 2 }, ...]
// }
```

`wordCount`, `readingTime`, and `topWords` treat punctuation as word separators and compare words in lowercase. `charCount` counts punctuation and excludes whitespace by default; pass `{ includeSpaces: true }` to include whitespace. `topWords` returns `{ word, count }` entries.

## Command line

The installed `textstats` command prints statistics for a text file:

```sh
textstats article.txt
```

## Node.js concepts in this package

| Node.js concept | Where it appears |
| --- | --- |
| Modules and `module.exports` | `index.js` exports `textStats`; `require()` loads the API. |
| File system (`fs`) | The CLI reads text files with Node's promise-based file system API. |
| `async`/`await` | The CLI waits for a text file to be read. |
| Arrays and `Map` | `index.js` collects words and counts their frequencies. |
| Regular expressions | `index.js` separates words from punctuation. |
| `process.argv` | `bin/cli.js` reads command-line arguments. |
| npm `bin` field | `package.json` connects the `textstats` command to `bin/cli.js`. |
| Built-in testing | `test/index.test.js` uses `node:test` and `node:assert`. |

## Test

```sh
npm test
```
