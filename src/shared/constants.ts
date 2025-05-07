import {
  GameStateEvent,
  Language,
  MiscMenuItem,
  OverviewMenuItem,
  PurchaseEvent,
  Scenario,
  Theme,
  ProgramsEvent,
  LongNumberFormat,
  GameStateAlert,
  ProgramAlert,
  PurchaseType,
  IncomeSource,
  NotificationType,
  GameVersion,
  Feature,
  Attribute,
  Skill,
  ClonesEvent,
  CloneAlert,
  DistrictType,
  CityEvent,
} from './types';

export const CURRENT_VERSION = GameVersion['0.1.3'];

export const LANGUAGES: Language[] = Object.values(Language);

export const THEMES: Theme[] = Object.values(Theme);

export const OVERVIEW_MENU_ITEMS: OverviewMenuItem[] = Object.values(OverviewMenuItem);

export const MISC_MENU_ITEMS: MiscMenuItem[] = Object.values(MiscMenuItem);

export const SCENARIOS: Scenario[] = Object.values(Scenario);

export const GAME_STATE_EVENTS: GameStateEvent[] = Object.values(GameStateEvent);

export const PURCHASE_EVENTS: PurchaseEvent[] = Object.values(PurchaseEvent);

export const PROGRAM_EVENTS: ProgramsEvent[] = Object.values(ProgramsEvent);

export const CLONE_EVENTS: ClonesEvent[] = Object.values(ClonesEvent);

export const CITY_EVENTS: CityEvent[] = Object.values(CityEvent);

export const GAME_STATE_ALERTS: GameStateAlert[] = Object.values(GameStateAlert);

export const PROGRAM_ALERTS: ProgramAlert[] = Object.values(ProgramAlert);

export const CLONE_ALERTS: CloneAlert[] = Object.values(CloneAlert);

export const FORCE_NOTIFICATION_TYPES: Set<NotificationType> = new Set<NotificationType>([
  NotificationType.gameVersionUpdated,
]);

export const NOTIFICATION_TYPES: NotificationType[] = Object.values(NotificationType).filter(
  (notificationType) => !FORCE_NOTIFICATION_TYPES.has(notificationType),
);

export const QUALITIES: number[] = [0, 1, 2, 3, 4, 5, 6];

export const LONG_NUMBER_FORMATS: LongNumberFormat[] = Object.values(LongNumberFormat);

export const MS_IN_SECOND = 1000;

export const PURCHASE_TYPES: PurchaseType[] = Object.values(PurchaseType);

export const INCOME_SOURCES: IncomeSource[] = Object.values(IncomeSource);

export const FEATURES: Feature[] = Object.values(Feature);

export const ATTRIBUTES: Attribute[] = Object.values(Attribute);

export const SKILLS: Skill[] = Object.values(Skill);

export const DISTRICT_TYPES = Object.values(DistrictType);

export const RANDOM_TYPE = 'random';
