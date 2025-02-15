import { ISerializeable } from '@shared/interfaces/serializable';
import { IMainframeHardwareAutomationState } from '../states/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import { IMainframeProgramsAutomationState } from '../states/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-state';
import { IAutomationSerializedState } from './automation-serialized-state';

export interface IAutomationState extends ISerializeable<IAutomationSerializedState> {
  mainframeHardware: IMainframeHardwareAutomationState;
  mainframePrograms: IMainframeProgramsAutomationState;
}
