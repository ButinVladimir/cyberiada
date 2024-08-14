import { IGeneralSerializedState } from '@state/general-state/interfaces/general-serialized-state';
import { ISettingsSerializedState } from '@state/settings-state/interfaces/settings-serialized-state';
import { ICitySerializedState } from '@state/city-state/interfaces/city-serialized-state';
import { IMainframeSerializedState } from '@state/mainframe-state/interfaces/mainframe-serialized-state';

export interface ISerializedState {
  general: IGeneralSerializedState;
  settings: ISettingsSerializedState;
  city: ICitySerializedState;
  mainframe: IMainframeSerializedState;
}
