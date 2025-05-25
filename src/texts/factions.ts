import { msg } from '@lit/localize';
import { Faction } from '@shared/types';

interface IFactionTexts {
  title: () => string;
  overview: () => string;
}

export const FACTION_TEXTS: Record<Faction, IFactionTexts> = {
  [Faction.neutral]: {
    title: () => msg('Neutral'),
    overview: () => msg(`Neutrals who don't belong to any major factions.`),
  },
  [Faction.wsa]: {
    title: () => msg('WSA'),
    overview: () =>
      msg(`WSA (World Security Agency) is an international organization backed by multiple biggest countries,
causing conflicts all over the world to make a profit.
While lacking numbers, they compensate it with web of agents and informators, diplomacy and subterfuge.`),
  },
};
