import 'reflect-metadata';
import '@validators/bindings';
import { readFile } from 'fs/promises';
import { parseArgs } from 'util';
import path from 'path';
import { ISerializedState } from '@state/app-state';
import { ISavefileValidatorFacade, VALIDATOR_TYPES, validatorContainer } from '@validators/index';

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

const inputFilePath = path.join(__dirname, '../../../cli-data/unzipped-savefiles', args.input);
const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

const serializedState = JSON.parse(fileContent) as ISerializedState;

const savefileValidatorFacade: ISavefileValidatorFacade = validatorContainer.get(
  VALIDATOR_TYPES.SavefileValidatorFacade,
);

await savefileValidatorFacade.validate(serializedState);

process.exit();
