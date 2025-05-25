import { IDistrictConnectivitySerializedParameter } from '../serialized-states/district-connectivity-serialized-parameter';

export interface IDistrictConnectivityParameter {
  points: number;
  totalValue: number;
  increasePoints(delta: number): void;
  recalculate(): void;
  serialize(): IDistrictConnectivitySerializedParameter;
  deserialize(serializedParameter: IDistrictConnectivitySerializedParameter): void;
}
