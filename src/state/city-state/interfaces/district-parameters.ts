import { IDistrictSerializedParameters } from './serialized-states/district-serialized-parameters';
import {
  IDistrictConnectivityParameter,
  IDistrictSynchronizationParameter,
  IDistrictTierParameter,
} from './parameters';
import { IDistrictMultipliers } from './district-multipliers';

export interface IDistrictParameters {
  tier: IDistrictTierParameter;
  synchronization: IDistrictSynchronizationParameter;
  connectivity: IDistrictConnectivityParameter;
  multipliers: IDistrictMultipliers;
  recalculate(): void;
  serialize(): IDistrictSerializedParameters;
  deserialize(serializedParameters: IDistrictSerializedParameters): void;
}
