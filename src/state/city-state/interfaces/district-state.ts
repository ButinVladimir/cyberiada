import { IPoint } from '@shared/interfaces/point';
import { DistrictType, Faction } from '@shared/types';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IDistrictSerializedState } from './serialized-states/district-serialized-state';
import { DistrictUnlockState } from '../types';
import { IDistrictParameters } from './district-parameters';
import { IDistrictTypeTemplate } from './district-type-template';

export interface IDistrictState extends IUIEventEmitter {
  index: number;
  template: IDistrictTypeTemplate;
  name: string;
  startingPoint: IPoint;
  districtType: DistrictType;
  state: DistrictUnlockState;
  faction: Faction;
  parameters: IDistrictParameters;
  recalculate(): void;
  serialize(): IDistrictSerializedState;
}
