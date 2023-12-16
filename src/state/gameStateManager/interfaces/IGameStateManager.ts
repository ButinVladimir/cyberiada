import {
  IGlobalState,
  ICrewState,
  ISideJobState,
  ISettingsState,
} from '@state/gameState';
import { IActivity, IPerson } from '@state/common';

export interface IGameStateManager {
  globalState: IGlobalState;
  crewState: ICrewState;
  sideJobState: ISideJobState;
  settingsState: ISettingsState;
  activitiesInProcess: IActivity[];
  needsActivityReassignment: boolean;
  personActivityMap: Map<IPerson, IActivity>;

  requestActivityReassignment: () => void;
  deleteActivity: (activity: IActivity) => void;
}
