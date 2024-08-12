export enum Language {
  en = 'en',
  ru = 'ru',
}

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export enum OverviewMenuItem {
  cityOverview = 'cityOverview',
  company = 'company',
  activity = 'activity',
}

export enum MiscMenuItem {
  settings = 'settings',
}

export enum Scenario {
  tutorial1 = 'tutorial1',
}

export enum GameStateEvent {
  gameStarted = 'gameStarted',
  gameSaved = 'gameSaved',
  gameStateUpdated = 'gameStateUpdated',
}

export type MessageFilterEvent = GameStateEvent;
