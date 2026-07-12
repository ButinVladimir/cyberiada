import 'reflect-metadata';
import { readFile, writeFile } from 'fs/promises';
import { parseArgs } from 'util';
import path from 'path';
import { ISerializedState } from '@/state/app-state';
import { Migrator } from '@/state/app-state/migrator';

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

if (!args.output) {
  throw new Error('Input argument is not provided');
}

const inputFilePath = path.join(__dirname, '../../../cli-data/unzipped-savefiles', args.input);
const inputFileContent = await readFile(inputFilePath, { encoding: 'utf8' });

const parsedSaveData = JSON.parse(inputFileContent) as ISerializedState;
const migrator = new Migrator();
const migratedSaveData = migrator.migrate(parsedSaveData) || '';

const outputFilePath = path.join(__dirname, '../../../cli-data/unzipped-savefiles', args.output);

const formattedContent = JSON.stringify(migratedSaveData, undefined, '\t');
await writeFile(outputFilePath, formattedContent, { encoding: 'utf8' });

console.log(`${args.input} was successfully migrated into ${args.output}`);

process.exit();
