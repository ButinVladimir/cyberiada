import { IHistoryState } from '@shared/interfaces/history-state';
import { OverviewMenuItem } from '@shared/types';
import { StatisticsPageTabs } from './types';

export interface IStatisticsPageHistoryState extends IHistoryState {
  selectedMenuItem: OverviewMenuItem.statistics;
  selectedTab?: StatisticsPageTabs;
}
