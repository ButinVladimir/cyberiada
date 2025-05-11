import { msg, str } from '@lit/localize';
import { IncomeSource } from '@shared/types';
import { DISTRICT_NAMES } from '@texts/names';
import { StatisticsPageTabs } from './types';

export const STATISTICS_PAGE_TABS_LIST = Array.from(Object.values(StatisticsPageTabs));

export const STATISTICS_PAGE_TAB_NAMES = {
  [StatisticsPageTabs.expenses]: () => msg('Expenses'),
  [StatisticsPageTabs.general]: () => msg('General'),
  [StatisticsPageTabs.growth]: () => msg('Growth'),
  [StatisticsPageTabs.income]: () => msg('Income'),
};

export const INCOME_SOURCE_NAMES = {
  [IncomeSource.program]: () => msg('By programs'),
  [IncomeSource.sidejob]: () => msg('By sidejobs'),
};

export const STATISTIC_PAGE_TEXTS = {
  baseValue: () => msg('Base value'),
  byPrograms: () => msg('By programs'),
  byDistrict: (districtName: string) => msg(str`By district "${DISTRICT_NAMES[districtName]()}"`),
  total: () => msg('Total'),
};

export const POINT_MULTIPLIER_HINTS = {
  codeBase: () => msg('Code base affects cost multiplier for mainframe programs'),
  computationalBase: () => msg('Computational base affects cost multiplier for mainframe hardware upgrades'),
  rewards: () => msg('Rewards affect all gains'),
};

export const STATISTIC_HINTS = {
  connectivity: () => msg('Connectivity affects chances to receive new contracts and sidejobs'),
  synchronization: () => msg('Synchronization affects how many clones can be in company'),
};
