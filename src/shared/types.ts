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
  performanceUpgraded = 'performanceUpgraded',
  coresUpgraded = 'coresUpgraded',
  ramUpgraded = 'ramUpgraded',
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

export type MessageEvent = GameStateEvent | PurchaseEvent | ProgramsEvent;

export enum GameStateAlert {
  saveImport = 'saveImport',
  saveDelete = 'saveDelete',
}

export enum ProgramAlert {
  purchaseProgramOverwrite = 'purchaseProgramOverwrite',
  developingProgramDelete = 'developingProgramDelete',
  developingProgramOverwrite = 'developingProgramOverwrite',
  developingProgramReplace = 'developingProgramReplace',
  processDelete = 'processDelete',
  processReplace = 'processReplace',
  passiveProcessReplace = 'passiveProcessReplace',
}

export type GameAlert = GameStateAlert | ProgramAlert;

export enum LongNumberFormat {
  builtIn = 'builtIn',
  scientific = 'scientific',
}
