import { IAttributes, ISkills, IPersonStats } from './interfaces';

export const ATTRIBUTE_FIELDS: (keyof IAttributes)[] = [
  'strength',
  'endurance',
  'perception',
  'agility',
  'intellect',
  'charisma',
];

export const SKILL_FIELDS: (keyof ISkills)[] = [
  'closeCombat',
  'rangedCombat',
  'stealth',
  'infoGathering',
  'persuasion',
  'hacking',
  'chemistry',
  'engineering',
];

export const PERSON_STAT_FIELDS: (keyof IPersonStats)[] = [
  'closeCombatScore',
  'rangedCombatScore',
  'defense',
  'maxHp',
];
