import { IDistrictInfo, IDistrictSerializedInfo } from './interfaces';

export class DistrictInfo implements IDistrictInfo {
  private _name: string = '';

  static deserialize(districtSerializedInfo: IDistrictSerializedInfo) {
    const districtInfo = new DistrictInfo();
    districtInfo._name = districtSerializedInfo.name;

    return districtInfo;
  }

  get name(): string {
    return this._name;
  }

  serialize(): IDistrictSerializedInfo {
    return {
      name: this._name,
    };
  }
}