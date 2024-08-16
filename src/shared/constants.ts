import { GameStateEvent, Language, MiscMenuItem, OverviewMenuItem, PurchaseEvent, Scenario, Theme } from './types';

export const LANGUAGES: Language[] = Object.values(Language);

export const THEMES: Theme[] = Object.values(Theme);

export const OVERVIEW_MENU_ITEMS: OverviewMenuItem[] = Object.values(OverviewMenuItem);

export const MISC_MENU_ITEMS: MiscMenuItem[] = Object.values(MiscMenuItem);

export const SCENARIOS: Scenario[] = Object.values(Scenario);

export const GAME_STATE_EVENTS: GameStateEvent[] = Object.values(GameStateEvent);

export const PURCHASE_EVENTS: PurchaseEvent[] = Object.values(PurchaseEvent);

export const QUALITIES: number[] = [0, 1, 2, 3, 4, 5, 6];
