import 'reflect-metadata';
import '@state/bindings';
import { readFile } from 'fs/promises';
import { parseArgs } from 'util';
import path from 'path';
import { ICsvWriterRequest } from '../interfaces';
import { CsvWriterTool } from '../csv-writer';

const { values: args } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
    },
  },
  allowPositionals: true,
  args: process.argv,
});

if (!args.input) {
  throw new Error('Input argument is not provided');
}

const inputFilePath = path.join(__dirname, '../../../cli-data/csv-requests', args.input);
const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

const csvRequest = JSON.parse(fileContent) as ICsvWriterRequest;
const csvWriterTool = new CsvWriterTool(csvRequest);

await csvWriterTool.write();

process.exit();
