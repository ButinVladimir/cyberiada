import { IPoint, ISnapshotable } from '@shared/index';
import { IDistrictSerializedState } from './serialized-states';
import { DistrictUnlockState } from '../types';
import { IDistrictParameters } from './parameters';
import { IDistrictTypeTemplate } from './district-type-template';
import { IDistrictCountersState } from './counters';
import { IDistrictSnapshotState } from './snapshot-states';

export interface IDistrictState extends ISnapshotable<IDistrictSnapshotState> {
  index: number;
  template: IDistrictTypeTemplate;
  name: string;
  startingPoint: IPoint;
  districtType: string;
  state: DistrictUnlockState;
  faction: string;
  parameters: IDistrictParameters;
  counters: IDistrictCountersState;
  recalculate(): void;
  serialize(): IDistrictSerializedState;
  removeAllEventListeners(): void;
}
