import { ISerializeable } from '@shared/interfaces';
import { IMainframeHardwareAutomationSerializedState } from './mainframe-hardware-automation-serialized-state';

export interface IMainframeHardwareAutomationState extends ISerializeable<IMainframeHardwareAutomationSerializedState> {
  moneyShare: number;
}
