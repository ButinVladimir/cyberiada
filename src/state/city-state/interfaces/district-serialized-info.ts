import { IPoint } from '@shared/interfaces/point';
import { Faction } from '@shared/types';
import { DistrictState } from '../types';

export interface IDistrictSerializedInfo {
  name: string;
  startingPoint: IPoint;
  state: DistrictState;
  faction: Faction;
}
