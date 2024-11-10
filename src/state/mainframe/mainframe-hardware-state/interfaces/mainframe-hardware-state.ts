import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IMainframeHardwareSerializedState } from './mainframe-hardware-serialized-state';
import { IMainframeHardwareParameter } from './mainframe-hardware-parameter';

export interface IMainframeHardwareState extends ISerializeable<IMainframeHardwareSerializedState>, IUIEventEmitter {
  performance: IMainframeHardwareParameter;
  cores: IMainframeHardwareParameter;
  ram: IMainframeHardwareParameter;
  emitUpgradedEvent(): void;
}
