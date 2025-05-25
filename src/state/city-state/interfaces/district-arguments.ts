import { IPoint, DistrictType, Faction } from '@shared/index';
import { DistrictUnlockState } from '../types';

export interface IDistrictArguments {
  index: number;
  name: string;
  startingPoint: IPoint;
  districtType: DistrictType;
  state: DistrictUnlockState;
  faction: Faction;
}
