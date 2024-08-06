import { GameStateEvent, Language, MiscMenuItem, OverviewMenuItem, Scenario, Theme } from './types';

export const LANGUAGES: Language[] = Object.values(Language);

export const THEMES: Theme[] = Object.values(Theme);

export const OVERVIEW_MENU_ITEMS: OverviewMenuItem[] = Object.values(OverviewMenuItem);

export const MISC_MENU_ITEMS: MiscMenuItem[] = Object.values(MiscMenuItem);

export const SCENARIOS: Scenario[] = Object.values(Scenario);

export const GAME_STATE_EVENTS: GameStateEvent[] = Object.values(GameStateEvent);
