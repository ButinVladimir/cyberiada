import { IDistrictSerializedInfo } from './district-serialized-info';

export interface IDistrictInfo {
  name: string;
  serialize(): IDistrictSerializedInfo;
}
