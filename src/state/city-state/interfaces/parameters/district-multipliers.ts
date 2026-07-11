import { ISnapshotable } from '@shared/index';
import { IDistrictMultiplierParameter } from './district-multiplier-parameter';
import { IDistrictSerializedMultipliers } from '../serialized-states';
import { IDistrictMultipliersSnapshot } from '../snapshot-states';

export interface IDistrictMultipliers extends ISnapshotable<IDistrictMultipliersSnapshot> {
  codeBase: IDistrictMultiplierParameter;
  computationalBase: IDistrictMultiplierParameter;
  serialize(): IDistrictSerializedMultipliers;
  deserialize(serializedState: IDistrictSerializedMultipliers): void;
}
