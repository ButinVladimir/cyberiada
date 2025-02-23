import { IHistoryState } from '@shared/interfaces/history-state';
import { OverviewMenuItem } from '@shared/types';
import { OverviewPageTabs } from './types';

export interface IOverviewPageHistoryState extends IHistoryState {
  selectedMenuItem: OverviewMenuItem.overview;
  selectedTab?: OverviewPageTabs;
}
