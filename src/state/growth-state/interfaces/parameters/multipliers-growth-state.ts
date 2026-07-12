import { ISnapshotable } from '@shared/index';
import { IMultiplierGrowthState } from './multiplier-growth-state';
import { IMultipliersGrowthSnapshotState } from '../snapshot-states';

export interface IMultipliersGrowthState extends ISnapshotable<IMultipliersGrowthSnapshotState> {
  codeBase: IMultiplierGrowthState;
  computationalBase: IMultiplierGrowthState;
  resetValues(): void;
  clearValues(): void;
}
