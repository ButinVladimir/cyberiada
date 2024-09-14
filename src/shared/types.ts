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
  mainframe = 'mainframe',
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
}

export enum PurchaseEvent {
  performanceUpdated = 'performanceUpdated',
  coresUpdated = 'coresUpdated',
  ramUpdated = 'ramUpdated',
  programPurchased = 'programPurchased',
}

export enum ProgramsEvent {
  processStarted = 'processStarted',
  processFinished = 'processFinished',
  processDeleted = 'processDeleted',
  programDevelopmentStarted = 'programDevelopmentStarted',
  programDevelopmentFinished = 'programDevelopmentFinished',
  programDevelopmentAborted = 'programDevelopmentAborted',
}

export type MessageFilterEvent = GameStateEvent | PurchaseEvent | ProgramsEvent;

export enum LongNumberFormat {
  builtIn = 'builtIn',
  scientific = 'scientific',
}
