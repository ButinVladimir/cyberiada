import 'reflect-metadata';
import { decompressFromUTF16 } from 'lz-string';
import { readFile, writeFile } from 'fs/promises';
import { parseArgs } from 'util';
import path from 'path';

const { values: args } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
    },
    output: {
      type: 'string',
      short: 'o',
    },
  },
  allowPositionals: true,
  args: process.argv,
});

if (!args.input) {
  throw new Error('Input argument is not provided');
}

const inputFilePath = path.join(__dirname, '../../../cli-data/zipped-savefiles', args.input);
const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

const parsedContent = JSON.parse(decompressFromUTF16(fileContent));

const formattedContent = JSON.stringify(parsedContent, undefined, '\t');

const outputFilename = args.output ?? args.input;
const outputFilePath = path.join(__dirname, '../../../cli-data/unzipped-savefiles', outputFilename);

await writeFile(outputFilePath, formattedContent, { encoding: 'utf8' });

console.log(`${args.input} was successfully unzipped into ${outputFilename}`);

process.exit();
