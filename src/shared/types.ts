export enum GameVersion {
  '0.1.1' = '0.1.1',
}

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
  companyManagement = 'companyManagement',
  mainframe = 'mainframe',
  statistics = 'statistics',
  automation = 'automation',
}

export enum MiscMenuItem {
  settings = 'settings',
  credits = 'credits',
}

export enum Scenario {
  tutorial = 'tutorial',
}

export enum GameStateEvent {
  gameStarted = 'gameStarted',
  gameSaved = 'gameSaved',
  fastForwared = 'fastForwarded',
  levelReached = 'levelReached',
  featureUnlocked = 'featureUnlocked',
  storyEvent = 'storyEvent',
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
  allProcessesDeleted = 'allProcessesDeleted',
}

export type MessageEvent = GameStateEvent | PurchaseEvent | ProgramsEvent;

export enum GameStateAlert {
  saveImport = 'saveImport',
  saveDelete = 'saveDelete',
  clearMessages = 'clearMessages',
  fastForward = 'fastForward',
}

export enum ProgramAlert {
  purchaseProgramOverwrite = 'purchaseProgramOverwrite',
  processDelete = 'processDelete',
  processReplace = 'processReplace',
  scalableProcessReplace = 'scalableProcessReplace',
  deleteAllProcesses = 'deleteAllProcesses',
}

export type GameAlert = GameStateAlert | ProgramAlert;

export enum NotificationType {
  storyEvent = 'storyEvent',
  featureUnlocked = 'featureUnlocked',
  timeAccumulated = 'timeAccumulated',
  gameVersionUpdated = 'gameVersionUpdated',
}

export enum LongNumberFormat {
  builtIn = 'builtIn',
  scientific = 'scientific',
}

export enum PurchaseType {
  mainframeHardware = 'mainframeHardware',
  mainframePrograms = 'mainframePrograms',
}

export enum IncomeSource {
  program = 'program',
}

export enum Feature {
  automation = 'automation',
  automationMainframeHardware = 'automationMainframeHardware',
  automationMainframePrograms = 'automationMainframePrograms',
  mainframeHardware = 'mainframeHardware',
  mainframePrograms = 'mainframePrograms',
  cityOverview = 'cityOverview',
  companyManagement = 'companyManagement',
}
