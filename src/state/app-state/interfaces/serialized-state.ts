import { IScenarioSerializedState } from '@state/scenario-state/interfaces/scenario-serialized-state';
import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeHardwareSerializedState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-serialized-state';
import { IMainframeOwnedProgramsSerializedState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-programs-serialized-state';
import { IMainframeProcessesSerializedState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-serialized-state';
import { IGlobalSerializedState } from '@state/global-state/interfaces/serialized-states/global-serialized-state';
import { IMainframeHardwareAutomationSerializedState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-serialized-state';

export interface ISerializedState {
  scenario: IScenarioSerializedState;
  global: IGlobalSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframeHardware: IMainframeHardwareSerializedState;
  mainframeOwnedPrograms: IMainframeOwnedProgramsSerializedState;
  mainframeProcesses: IMainframeProcessesSerializedState;
  mainframeHardwareAutomationState: IMainframeHardwareAutomationSerializedState;
}
