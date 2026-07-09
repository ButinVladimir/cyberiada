import 'reflect-metadata';
import '@state/bindings';
import { readFile } from 'fs/promises';
import { parseArgs } from 'util';
import path from 'path';
import { ISimulationRequest } from '../interfaces';
import { SimulationTool } from '../simulation-tool';

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

const inputFilePath = path.join(__dirname, '../../../cli-data/simulation-requests', args.input);
const fileContent = await readFile(inputFilePath, { encoding: 'utf8' });

const simulationRequest = JSON.parse(fileContent) as ISimulationRequest;
const simulationTool = new SimulationTool(simulationRequest);

await simulationTool.simulate();

process.exit();
