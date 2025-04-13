import { msg } from '@lit/localize';
import { StatisticsPageTabs } from './types';

export const STATISTICS_PAGE_TABS_LIST = Array.from(Object.values(StatisticsPageTabs));

export const STATISTICS_PAGE_TAB_NAMES: Record<StatisticsPageTabs, () => string> = {
  [StatisticsPageTabs.expenses]: () => msg('Expenses'),
  [StatisticsPageTabs.general]: () => msg('General'),
  [StatisticsPageTabs.growth]: () => msg('Growth'),
  [StatisticsPageTabs.income]: () => msg('Income'),
};
