import { DistrictBaseMultiplierParameter } from './district-base-multiplier-parameter';

export class DistrictComputationalBaseParameter extends DistrictBaseMultiplierParameter {
  getMultiplierParameters() {
    const districtTypeInfo = this._district.template;

    return districtTypeInfo.parameters.computationalBase;
  }
}
