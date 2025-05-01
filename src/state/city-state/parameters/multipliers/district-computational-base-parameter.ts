import districtTypes from '@configs/district-types.json';
import { DistrictBaseMultiplierParameter } from './district-base-multiplier-parameter';

export class DistrictComputationalBaseParameter extends DistrictBaseMultiplierParameter {
  getMultiplierParameters() {
    const districtTypeInfo = districtTypes[this._district.districtType];

    return districtTypeInfo.parameters.computationalBase;
  }
}
