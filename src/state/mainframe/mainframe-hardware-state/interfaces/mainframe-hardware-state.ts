import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IMainframeHardwareSerializedState } from './mainframe-hardware-serialized-state';
import { IMainframeHardwareParameter } from './mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from '../types';

export interface IMainframeHardwareState extends ISerializeable<IMainframeHardwareSerializedState>, IUIEventEmitter {
  performance: IMainframeHardwareParameter;
  cores: IMainframeHardwareParameter;
  ram: IMainframeHardwareParameter;
  listParameters(): IMainframeHardwareParameter[];
  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number): void;
  purchaseMax(): void;
  emitUpgradedEvent(): void;
  emitAutobuyerUpdatedEvent(): void;
}
