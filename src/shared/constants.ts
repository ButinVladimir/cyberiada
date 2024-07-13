export enum Language {
  en = 'en',
  ru = 'ru',
}
export const LANGUAGES: string[] = Object.values(Language);

export enum Theme {
  light = 'light',
  dark = 'dark',
}
export const THEMES: string[] = Object.values(Theme);

export enum OverviewMenuItem {
  cityOverview = 'cityOverview',
  company = 'company',
  activity = 'activity',
}
export const OVERVIEW_MENU_ITEMS: string[] = Object.values(OverviewMenuItem);

export enum MiscMenuItem {
  settings = 'settings',
}
export const MISC_MENU_ITEMS: string[] = Object.values(MiscMenuItem);

export const MAP_WIDTH = 100;
export const MAP_HEIGHT = 100;

export enum Scenario {
  tutorial1 = 'tutorial1',
}
export const SCENARIOS: string[] = Object.values(Scenario);
