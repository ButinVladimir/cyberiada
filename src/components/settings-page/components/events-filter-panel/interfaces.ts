import { IHistoryState } from '@shared/interfaces/history-state';
import { MiscMenuItem } from '@shared/types';

export interface ISettingsEventsFilterHistoryState extends IHistoryState {
  selectedMenuItem: MiscMenuItem.settings;
  messageFilterOpen: boolean;
  alertFilterOpen: boolean;
  notificationTypeFilterOpen: boolean;
}
