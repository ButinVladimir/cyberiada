export enum Language {
  enUS = 'en-US',
  ruRU = 'ru-RU',
}
export const languages: string[] = Object.values(Language);

export enum Theme {
  light = 'light',
  dark = 'dark',
}
export const themes: string[] = Object.values(Theme);

export enum OverviewMenuItem {
  cityOverview = 'cityOverview',
  companyMembers = 'companyMembers',
  activity = 'activity',
}
export const overviewMenuItems: string[] = Object.values(OverviewMenuItem);

export enum MiscMenuItem {
  settings = 'settings',
}
export const miscMenuItems: string[] = Object.values(MiscMenuItem);
