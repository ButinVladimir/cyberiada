import { ISerializeable, IExponent, ISnapshotable } from '@shared/index';
import { MainframeHardwareParameterType } from '../types';
import { IMainframeHardwareParameterSerializedState } from './mainframe-hardware-parameter-serialized-state';
import { IMainframeHardwareParameterSnapshotState } from './mainframe-hardware-parameter-snapshot-state';

export interface IMainframeHardwareParameter
  extends
    ISerializeable<IMainframeHardwareParameterSerializedState>,
    ISnapshotable<IMainframeHardwareParameterSnapshotState> {
  type: MainframeHardwareParameterType;
  priceExp: IExponent;
  autoUpgradeEnabled: boolean;
  level: number;
  totalLevel: number;
  purchase(increase: number): boolean;
}
