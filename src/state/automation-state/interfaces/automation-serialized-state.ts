import {
  IMainframeHardwareAutomationSerializedState,
  IMainframeProgramsAutomationSerializedState,
  ICloneLevelAutomationSerializedState,
} from '../states';

export interface IAutomationSerializedState {
  mainframeHardware: IMainframeHardwareAutomationSerializedState;
  mainframePrograms: IMainframeProgramsAutomationSerializedState;
  cloneLevel: ICloneLevelAutomationSerializedState;
}
