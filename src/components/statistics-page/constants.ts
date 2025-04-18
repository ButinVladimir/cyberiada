import { msg } from '@lit/localize';
import { IncomeSource, PointsMultiplierType } from '@shared/types';
import { StatisticsPageTabs } from './types';

export const STATISTICS_PAGE_TABS_LIST = Array.from(Object.values(StatisticsPageTabs));

export const STATISTICS_PAGE_TAB_NAMES: Record<StatisticsPageTabs, () => string> = {
  [StatisticsPageTabs.expenses]: () => msg('Expenses'),
  [StatisticsPageTabs.general]: () => msg('General'),
  [StatisticsPageTabs.growth]: () => msg('Growth'),
  [StatisticsPageTabs.income]: () => msg('Income'),
};

export const INCOME_SOURCE_NAMES: Record<IncomeSource | string, () => string> = {
  [IncomeSource.program]: () => msg('By programs'),
};

export const STATISTIC_PAGE_TEXTS: Record<string, () => string> = {
  byPrograms: () => msg('By programs'),
  total: () => msg('Total'),
};

export const POINT_MULTIPLIER_HINTS: Record<PointsMultiplierType, () => string> = {
  codeBase: () => msg('Code base affects cost multiplier for mainframe programs'),
  computationalBase: () => msg('Computational base affects cost multiplier for mainframe hardware upgrades'),
  connectivity: () => msg('Connectivity affects chances to receive new contracts and sidejobs'),
  rewards: () => msg('Rewards affect all gains'),
};
