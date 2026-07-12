import { ISnapshotable } from '@shared/index';
import { IDistrictCountersSerializedState } from '../serialized-states';
import { IDistrictCountersSnapshotState } from '../snapshot-states';
import { IDistrictContractsCountersState } from './district-contracts-counters-state';

export interface IDistrictCountersState extends ISnapshotable<IDistrictCountersSnapshotState> {
  contracts: IDistrictContractsCountersState;
  processTick(): void;
  serialize(): IDistrictCountersSerializedState;
  deserialize(serializedState: IDistrictCountersSerializedState): void;
  removeAllEventListeners(): void;
}
