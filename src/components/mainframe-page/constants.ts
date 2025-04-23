import { msg } from '@lit/localize';
import { MainframePageTabs } from './types';

export const MAINFRAME_PAGE_TABS_LIST = Array.from(Object.values(MainframePageTabs));

export const MAINFRAMGE_PAGE_TAB_TITLES: Record<MainframePageTabs, () => string> = {
  [MainframePageTabs.processes]: () => msg('Processes'),
  [MainframePageTabs.hardware]: () => msg('Hardware'),
  [MainframePageTabs.programs]: () => msg('Programs'),
};
