import { ISerializeable, ISnapshotable } from '@shared/interfaces';
import { IMainframeHardwareSerializedState } from './mainframe-hardware-serialized-state';
import { IMainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from '../types';
import { IMainframeHardwareUpgrader } from './mainframe-hardware-upgrader';
import { IMainframeHardwareValidator } from './mainframe-hardware-validator';
import { IMainframeHardwareSnapshotState } from './mainframe-hardware-snapshot-state';

export interface IMainframeHardwareState
  extends ISerializeable<IMainframeHardwareSerializedState>, ISnapshotable<IMainframeHardwareSnapshotState> {
  performance: IMainframeHardwareParameter;
  cores: IMainframeHardwareParameter;
  ram: IMainframeHardwareParameter;
  upgrader: IMainframeHardwareUpgrader;
  validator: IMainframeHardwareValidator;
  listParameters(): IMainframeHardwareParameter[];
  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number): void;
}
