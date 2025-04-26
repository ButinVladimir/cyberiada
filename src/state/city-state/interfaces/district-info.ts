import { IPoint } from '@shared/interfaces/point';
import { Faction } from '@shared/types';
import { IDistrictSerializedInfo } from './district-serialized-info';
import { DistrictState } from '../types';

export interface IDistrictInfo {
  name: string;
  startingPoint: IPoint;
  state: DistrictState;
  faction: Faction;
  serialize(): IDistrictSerializedInfo;
}
