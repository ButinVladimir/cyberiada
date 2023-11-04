import { IAttributes, ISkills, IPersonStats } from './interfaces';
import { Quality } from './types';

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
  'damage',
  'defense',
  'maxHp',
];

export const QUALITY_POWERS = {
  [Quality.Abysmal]: -1,
  [Quality.Bad]: -0.5,
  [Quality.Mediocre]: -0.25,
  [Quality.Average]: 0,
  [Quality.Cool]: 0.25,
  [Quality.Good]: 0.5,
  [Quality.Excellent]: 1,
}
