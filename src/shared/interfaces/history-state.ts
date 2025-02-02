import { OverviewMenuItem, MiscMenuItem } from '../types';

export interface IHistoryState {
  selectedMenuItem?: OverviewMenuItem | MiscMenuItem;
  showConfirmationAlert: boolean;
  showNotification: boolean;
  menuOpened: boolean;
  fastForwarding: boolean;
}
