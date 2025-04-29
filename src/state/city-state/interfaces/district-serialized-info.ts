import { IPoint } from '@shared/interfaces/point';
import { DistrictType, Faction } from '@shared/types';
import { DistrictState } from '../types';

export interface IDistrictSerializedInfo {
  name: string;
  startingPoint: IPoint;
  districtType: DistrictType;
  state: DistrictState;
  faction: Faction;
}
