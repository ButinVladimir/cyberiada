import { IPoint } from '@shared/interfaces/point';
import { DistrictType, Faction } from '@shared/types';
import { DistrictUnlockState } from '../types';
import { IDistrictSerializedParameters } from './district-serialized-parameters';

export interface IDistrictSerializedState {
  name: string;
  startingPoint: IPoint;
  districtType: DistrictType;
  state: DistrictUnlockState;
  faction: Faction;
  parameters: IDistrictSerializedParameters;
}
