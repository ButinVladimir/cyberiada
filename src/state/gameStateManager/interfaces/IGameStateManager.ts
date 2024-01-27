import {
  IGlobalState,
  ICrewState,
  ISideJobState,
  ISettingsState,
} from '@state/gameState';
import { IActivity } from '@state/common';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;
  sideJobState: ISideJobState;
  settingsState: ISettingsState;

  deleteActivity: (activity: IActivity) => void;
}
