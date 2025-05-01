import districtTypes from '@configs/district-types.json';
import { DistrictBaseMultiplierParameter } from './district-base-multiplier-parameter';

export class DistrictCodeBaseParameter extends DistrictBaseMultiplierParameter {
  getMultiplierParameters() {
    const districtTypeInfo = districtTypes[this._district.districtType];

    return districtTypeInfo.parameters.codeBase;
  }
}
