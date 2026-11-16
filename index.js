// ---- textStats ----
function getWords(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }

  // Punctuation separates words, so count only letter and number groups.
  return text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
}

const textStats = {
  wordCount(text) {
    return getWords(text).length;
  },

  charCount(text, { includeSpaces = false } = {}) {
    if (typeof text !== 'string') {
      throw new TypeError('text must be a string');
    }

    return includeSpaces ? text.length : text.replace(/\s/g, '').length;
  },

  readingTime(text, wordsPerMinute = 200) {
    const words = getWords(text).length;

    if (typeof wordsPerMinute !== 'number' || !Number.isFinite(wordsPerMinute)) {
      throw new TypeError('wordsPerMinute must be a finite number');
    }
    if (wordsPerMinute <= 0) {
      throw new RangeError('wordsPerMinute must be greater than zero');
    }

    return Math.max(1, Math.ceil(words / wordsPerMinute));
  },

  topWords(text, limit = 5) {
    const words = getWords(text);

    if (!Number.isInteger(limit) || limit < 0) {
      throw new RangeError('limit must be a non-negative integer');
    }

    const counts = new Map();
    for (const word of words) {
      counts.set(word, (counts.get(word) || 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word, count]) => ({ word, count }));
  },

  analyze(text) {
    return {
      wordCount: this.wordCount(text),
      charCount: this.charCount(text),
      readingTime: this.readingTime(text),
      topWords: this.topWords(text),
    };
  },
};

module.exports = { textStats };
