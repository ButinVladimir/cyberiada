import { ISnapshotable } from '@shared/index';
import { IDistrictContractsCountersSerializedState } from '../serialized-states';
import { IDistrictContractsCountersSnapshotState } from '../snapshot-states';

export interface IDistrictContractsCountersState extends ISnapshotable<IDistrictContractsCountersSnapshotState> {
  getPassedGenerationTime(contractName: string): number;
  getRequiredGenerationTime(contractName: string): number;
  getAvailableAmount(contractName: string): number;
  getChance(contractName: string): number;
  useContract(contractName: string): boolean;
  processTick(): void;
  serialize(): IDistrictContractsCountersSerializedState;
  deserialize(serializedState: IDistrictContractsCountersSerializedState): void;
  removeAllEventListeners(): void;
}
