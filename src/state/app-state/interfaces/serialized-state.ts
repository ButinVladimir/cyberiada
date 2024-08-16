import { IGeneralSerializedState } from '@state/general-state/interfaces/general-serialized-state';
import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeHardwareSerializedState } from '@/state/mainframe-hardware-state/interfaces/mainframe-hardware-serialized-state';
import { IMainframeOwnedProgramsSerializedState } from '@/state/mainframe-owned-programs-state/interfaces/mainframe-owned-programs-serialized-state';

export interface ISerializedState {
  general: IGeneralSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframeHardware: IMainframeHardwareSerializedState;
  mainframeOwnedPrograms: IMainframeOwnedProgramsSerializedState;
}
