import { IScenarioSerializedState } from '@state/scenario-state/interfaces/scenario-serialized-state';
import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeHardwareSerializedState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-serialized-state';
import { IMainframeProgramsSerializedState } from '@/state/mainframe/mainframe-programs-state/interfaces/mainframe-programs-serialized-state';
import { IMainframeProcessesSerializedState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-serialized-state';
import { IGlobalSerializedState } from '@state/global-state/interfaces/serialized-states/global-serialized-state';
import { IMainframeHardwareAutomationSerializedState } from '@state/automation/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-serialized-state';
import { IMainframeProgramsAutomationSerializedState } from '@state/automation/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-serialized-state';
import { GameVersion } from '@shared/types';

export interface ISerializedState {
  gameVersion: GameVersion;
  scenario: IScenarioSerializedState;
  global: IGlobalSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframeHardware: IMainframeHardwareSerializedState;
  mainframePrograms: IMainframeProgramsSerializedState;
  mainframeProcesses: IMainframeProcessesSerializedState;
  mainframeHardwareAutomationState: IMainframeHardwareAutomationSerializedState;
  mainframeProgramsAutomationState: IMainframeProgramsAutomationSerializedState;
}
