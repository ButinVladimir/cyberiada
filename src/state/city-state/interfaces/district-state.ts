import { IPoint } from '@shared/interfaces/point';
import { DistrictType, Faction } from '@shared/types';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IDistrictSerializedState } from './district-serialized-state';
import { DistrictUnlockState } from '../types';
import { IDistrictParameters } from './district-parameters';

export interface IDistrictState extends IUIEventEmitter {
  name: string;
  startingPoint: IPoint;
  districtType: DistrictType;
  state: DistrictUnlockState;
  faction: Faction;
  parameters: IDistrictParameters;
  recalculate(): void;
  serialize(): IDistrictSerializedState;
}
