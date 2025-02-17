import { IMainframeHardwareAutomationSerializedState } from '../states/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-serialized-state';
import { IMainframeProgramsAutomationSerializedState } from '../states/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-serialized-state';

export interface IAutomationSerializedState {
  mainframeHardware: IMainframeHardwareAutomationSerializedState;
  mainframePrograms: IMainframeProgramsAutomationSerializedState;
}
