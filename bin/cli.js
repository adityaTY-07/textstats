#!/usr/bin/env node

const fs = require('node:fs/promises');
const { textStats } = require('../index.js');

function printUsage() {
  console.error('Usage: textstats <file>');
}

async function main(args) {
  if (args.length === 1) {
    const text = await fs.readFile(args[0], 'utf8');
    console.log(JSON.stringify(textStats.analyze(text), null, 2));
  } else {
    printUsage();
    process.exitCode = 1;
  }
}

main(process.argv.slice(2)).catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
