import { msg } from '@lit/localize';
import { CompanyPageTabs } from './types';

export const COMPANY_PAGE_TABS_LIST = Array.from(Object.values(CompanyPageTabs));

export const COMPANY_PAGE_TAB_TITLES = {
  [CompanyPageTabs.clones]: () => msg('Clones'),
  [CompanyPageTabs.sidejobs]: () => msg('Sidejobs'),
};
