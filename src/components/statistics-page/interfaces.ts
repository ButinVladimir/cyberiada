import { IHistoryState } from '@shared/interfaces/history-state';
import { StatisticsPageTabs } from './constants';
import { OverviewMenuItem } from '@shared/types';

export interface IStatisticsPageHistoryState extends IHistoryState {
  selectedMenuItem: OverviewMenuItem.statistics;
  selectedTab?: StatisticsPageTabs;
}
