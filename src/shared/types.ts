export enum GameVersion {
  '0.1.1' = '0.1.1',
  '0.1.2' = '0.1.2',
  '0.1.3' = '0.1.3',
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
  overview = 'overview',
  city = 'city',
  company = 'company',
  mainframe = 'mainframe',
  automation = 'automation',
  statistics = 'statistics',
  messageLog = 'messageLog',
}

export enum MiscMenuItem {
  settings = 'settings',
  credits = 'credits',
}

export enum Scenario {
  tutorial = 'tutorial',
}

export enum Faction {
  neutral = 'neutral',
  wsa = 'wsa',
}

export enum GameStateEvent {
  gameStarted = 'gameStarted',
  gameSaved = 'gameSaved',
  fastForwared = 'fastForwarded',
  levelReached = 'levelReached',
}

export enum ProgramsEvent {
  performanceUpgraded = 'performanceUpgraded',
  coresUpgraded = 'coresUpgraded',
  ramUpgraded = 'ramUpgraded',
  programPurchased = 'programPurchased',
  processStarted = 'processStarted',
  processDeleted = 'processDeleted',
  allProcessesDeleted = 'allProcessesDeleted',
}

export enum ClonesEvent {
  clonePurchased = 'clonePurchased',
  cloneDeleted = 'cloneDeleted',
  allClonesDeleted = 'allClonesDeleted',
  cloneLevelReached = 'cloneLevelReached',
  cloneRenamed = 'cloneRenamed',
}

export enum SidejobsEvent {
  sidejobAssigned = 'sidejobAssigned',
  sidejobCancelled = 'sidejobCancelled',
  allSidejobsCancelled = 'allSidejobsCancelled',
}

export enum CityEvent {
  districtTierIncreased = 'districtTierIncreased',
}

export type MessageEvent = GameStateEvent | ProgramsEvent | ClonesEvent | SidejobsEvent | CityEvent;

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

export enum CloneAlert {
  cloneDelete = 'cloneDelete',
  deleteAllClones = 'deleteAllClones',
}

export enum SidejobAlert {
  sidejobCancel = 'sidejobCancel',
  cancelAllSidejobs = 'cancelAllSidejobs',
  replaceSidejob = 'replaceSidejob',
}

export type GameAlert = GameStateAlert | ProgramAlert | CloneAlert | SidejobAlert;

export enum NotificationType {
  storyEvent = 'storyEvent',
  featureUnlocked = 'featureUnlocked',
  timeAccumulated = 'timeAccumulated',
  gameVersionUpdated = 'gameVersionUpdated',
}

export enum LongNumberFormat {
  short = 'short',
  long = 'long',
  scientific = 'scientific',
  engineering = 'engineering',
}

export enum PurchaseType {
  mainframeHardware = 'mainframeHardware',
  mainframePrograms = 'mainframePrograms',
  clones = 'clones',
}

export enum IncomeSource {
  program = 'program',
  sidejob = 'sidejob',
}

export enum Feature {
  automation = 'automation',
  automationMainframeHardware = 'automationMainframeHardware',
  automationMainframePrograms = 'automationMainframePrograms',
  mainframeUpgrades = 'mainframeUpgrades',
  companyManagement = 'companyManagement',
  codeBase = 'codeBase',
  computationalBase = 'computationalBase',
  connectivity = 'connectivity',
  rewards = 'rewards',
}

export type PointsMultiplierType = 'codeBase' | 'computationalBase' | 'rewards';

export type ItemCategory = 'programs' | 'cloneTemplates';

export enum Attribute {
  strength = 'strength',
  endurance = 'endurance',
  agility = 'agility',
  perception = 'perception',
  intellect = 'intellect',
  charisma = 'charisma',
}

export enum Skill {
  closeCombat = 'closeCombat',
  rangedCombat = 'rangedCombat',
  engineering = 'engineering',
  hacking = 'hacking',
  stealth = 'stealth',
  diplomacy = 'diplomacy',
}

export enum DistrictType {
  suburb = 'suburb',
  corpoDistrict = 'corpoDistrict',
}

export enum RewardParameter {
  money = 'money',
  developmentPoints = 'development-points',
  experience = 'experience',
  districtTierPoints = 'district-tier-points',
  connectivity = 'connectivity',
  codeBase = 'code-base',
  computationalBase = 'computational-base',
  rewards = 'rewards',
}
