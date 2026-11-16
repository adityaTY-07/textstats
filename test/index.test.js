const assert = require('node:assert/strict');
const { test } = require('node:test');
const { textStats } = require('../index.js');

test('textStats counts, summarizes, and ignores punctuation when finding words', () => {
  const text = 'Hello, hello! Node.js is fun.';

  assert.equal(textStats.wordCount(text), 6);
  assert.equal(textStats.charCount('a b!\n'), 3);
  assert.equal(textStats.charCount('a b!\n', { includeSpaces: true }), 5);
  assert.equal(textStats.readingTime('one two three', 2), 2);
  assert.deepEqual(textStats.topWords(text, 2), [
    { word: 'hello', count: 2 },
    { word: 'node', count: 1 },
  ]);
  assert.deepEqual(textStats.analyze('Hi, hi.'), {
    wordCount: 2,
    charCount: 6,
    readingTime: 1,
    topWords: [{ word: 'hi', count: 2 }],
  });
});

test('textStats handles empty input and invalid arguments', () => {
  assert.equal(textStats.wordCount(''), 0);
  assert.equal(textStats.charCount(''), 0);
  assert.equal(textStats.readingTime(''), 1);
  assert.deepEqual(textStats.topWords(''), []);
  assert.throws(() => textStats.wordCount(42), TypeError);
  assert.throws(() => textStats.charCount(null), TypeError);
  assert.throws(() => textStats.readingTime('words', 0), RangeError);
  assert.throws(() => textStats.topWords('words', -1), RangeError);
});
