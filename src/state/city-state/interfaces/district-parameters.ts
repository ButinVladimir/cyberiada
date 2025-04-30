import { IDistrictSerializedParameters } from './district-serialized-parameters';
import { IDistrictTierParameter } from './parameters';

export interface IDistrictParameters {
  tier: IDistrictTierParameter;
  recalculate(): void;
  serialize(): IDistrictSerializedParameters;
  deserialize(serializedParameters: IDistrictSerializedParameters): void;
}
