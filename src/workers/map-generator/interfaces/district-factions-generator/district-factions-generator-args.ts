import { XORShift128Plus } from 'random-seedable';
import { ILayoutGeneratorResult } from '../layout-generator/layout-generator-result';
import { IDistrictInfoGeneratorResult } from '../district-info-generator';
import { Scenario } from '@shared/types';

export interface IDistrictFactionsGeneratorArgs {
  scenario: Scenario;
  layout: ILayoutGeneratorResult;
  districtInfos: IDistrictInfoGeneratorResult;
  random: XORShift128Plus;
}
