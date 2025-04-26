import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import names from '@configs/names.json';
import { Scenario } from '@shared/types';
import {
  IDistrictNamesGenerator,
  IDistrictNamesGeneratorDistrictResult,
  IDistrictNamesGeneratorResult,
} from './interfaces/district-names-generator';

export class DistrictNamesGenerator implements IDistrictNamesGenerator {
  private _scenario: Scenario;

  private _random: XORShift128Plus;

  constructor(scenario: Scenario, random: XORShift128Plus) {
    this._scenario = scenario;
    this._random = random;
  }

  generate(): IDistrictNamesGeneratorResult {
    const distictsNum = scenarios[this._scenario].map.districts.length;
    const allNames = this._random.shuffle(names.districts);

    const districtsResult = allNames.slice(0, distictsNum).map<IDistrictNamesGeneratorDistrictResult>((name) => ({
      name,
    }));

    return {
      districts: districtsResult,
    };
  }
}
