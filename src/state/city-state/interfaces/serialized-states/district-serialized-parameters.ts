import { IDistrictConnectivitySerializedParameter } from './district-connectivity-serialized-parameter';
import { IDistrictSerializedMultipliers } from './district-serialized-multipliers';
import { IDistrictTierSerializedParameter } from './district-tier-serialized-parameter';

export interface IDistrictSerializedParameters {
  tier: IDistrictTierSerializedParameter;
  connectivtiy: IDistrictConnectivitySerializedParameter;
  multipliers: IDistrictSerializedMultipliers;
}
