import { IPoint } from '@shared/interfaces';
import { IDistrictSerializedInfo } from './district-serialized-info';

export interface IDistrictInfo {
  name: string;
  startingPoint: IPoint;
  serialize(): IDistrictSerializedInfo;
}
