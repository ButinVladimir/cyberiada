import { msg } from '@lit/localize';
import { CityDistrictPageTabs } from './types';

export const CITY_DISTRICT_PAGE_TAB_LIST = Array.from(Object.values(CityDistrictPageTabs));

export const CITY_DISTRICT_PAGE_TAB_TITLES: Record<CityDistrictPageTabs, () => string> = {
  [CityDistrictPageTabs.overview]: () => msg('Overview'),
  [CityDistrictPageTabs.sidejobs]: () => msg('Sidejobs'),
};
