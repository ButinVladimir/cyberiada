import { msg } from '@lit/localize';
import { OverviewPageTabs } from './types';

export const OVERVIEW_PAGE_TABS_LIST = Array.from(Object.values(OverviewPageTabs));

export const KEYS_SEPARATOR = ';';

export const OVERVIEW_PAGE_TAB_TITLES = {
  [OverviewPageTabs.progress]: () => msg('Progress', { desc: 'Progress tab title' }),
  [OverviewPageTabs.story]: () => msg('Story', { desc: 'Story tab title' }),
  [OverviewPageTabs.unlockedFeatures]: () => msg('Unlocked features', { desc: 'Unlocked features tab title' }),
  [OverviewPageTabs.unlockedItems]: () => msg('Unlocked items', { desc: 'Unlocked items tab title' }),
};
