import { ISnapshotable } from '@shared/index';
import { IDistrictConnectivitySerializedParameter } from '../serialized-states';
import { IDistrictConnectivityParameterSnapshot } from '../snapshot-states';

export interface IDistrictConnectivityParameter extends ISnapshotable<IDistrictConnectivityParameterSnapshot> {
  points: number;
  totalValue: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  serialize(): IDistrictConnectivitySerializedParameter;
  deserialize(serializedParameter: IDistrictConnectivitySerializedParameter): void;
}
