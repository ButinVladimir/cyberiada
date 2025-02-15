import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeSerializedState } from '@state/mainframe-state/interfaces/mainframe-serialized-state';
import { IGlobalSerializedState } from '@state/global-state/interfaces/serialized-states/global-serialized-state';
import { IAutomationSerializedState } from '@state/automation-state/interfaces/automation-serialized-state';
import { GameVersion } from '@shared/types';

export interface ISerializedState {
  gameVersion: GameVersion;
  global: IGlobalSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframe: IMainframeSerializedState;
  automation: IAutomationSerializedState;
}
