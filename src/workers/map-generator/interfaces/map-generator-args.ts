import { Scenario } from '@shared/types';

export interface IMapGeneratorArgs {
  scenario: Scenario;
  randomSeed: number;
  randomShift: bigint;
}
