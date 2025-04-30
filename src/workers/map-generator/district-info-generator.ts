import { XORShift128Plus } from 'random-seedable';
import scenarios from '@configs/scenarios.json';
import names from '@configs/names.json';
import { DistrictType, Scenario } from '@shared/types';
import { RandomQueue } from '@shared/random-queue';
import { DISTRICT_TYPES, RANDOM_TYPE } from '@shared/constants';
import {
  IDistrictInfoGenerator,
  IDistrictInfoGeneratorDistrictResult,
  IDistrictInfoGeneratorResult,
} from './interfaces/district-info-generator';

export class DistrictInfoGenerator implements IDistrictInfoGenerator {
  private _scenario: Scenario;

  private _random: XORShift128Plus;
  private _names: RandomQueue<string>;

  constructor(scenario: Scenario, random: XORShift128Plus) {
    this._scenario = scenario;
    this._random = random;

    this._names = new RandomQueue<string>(this._random);
  }

  generate(): IDistrictInfoGeneratorResult {
    this.initNames();

    const districts = [];
    const districtsNum = scenarios[this._scenario].map.districts.length;

    for (let i = 0; i < districtsNum; i++) {
      districts.push(this.generateDistrict(i));
    }

    return {
      districts,
    };
  }

  private initNames() {
    names.districts.forEach((name) => {
      this._names.push(name);
    });
  }

  private generateDistrict(districtIndex: number): IDistrictInfoGeneratorDistrictResult {
    const districtData = scenarios[this._scenario].map.districts[districtIndex];

    const name = this._names.pop();
    let districtType: DistrictType;

    if (districtData.type === RANDOM_TYPE) {
      districtType = this._random.choice(DISTRICT_TYPES);
    } else {
      districtType = districtData.type as DistrictType;
    }

    const tier = this._random.randRange(districtData.tier.min, districtData.tier.max + 1);

    return {
      name,
      districtType,
      tier,
    };
  }
}
