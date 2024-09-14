import { IScenarioSerializedState } from '@state/scenario-state/interfaces/scenario-serialized-state';
import { IGeneralSerializedState } from '@state/general-state/interfaces/general-serialized-state';
import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeHardwareSerializedState } from '@state/mainframe-hardware-state/interfaces/mainframe-hardware-serialized-state';
import { IMainframeOwnedProgramsSerializedState } from '@state/mainframe-owned-programs-state/interfaces/mainframe-owned-programs-serialized-state';
import { IMainframeProcessesSerializedState } from '@state/mainframe-processes-state/interfaces/mainframe-processes-serialized-state';
import { IMainframeDevelopingProgramsSerializedState } from '@state/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-serialized-state';

export interface ISerializedState {
  scenario: IScenarioSerializedState;
  general: IGeneralSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframeHardware: IMainframeHardwareSerializedState;
  mainframeOwnedPrograms: IMainframeOwnedProgramsSerializedState;
  mainframeProcesses: IMainframeProcessesSerializedState;
  mainframeDevelopingPrograms: IMainframeDevelopingProgramsSerializedState;
}
