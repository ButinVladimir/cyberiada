import { IAttributes, ISkills, IPersonStats } from './interfaces';
import { Language, Quality } from './types';

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
  [Quality.Abysmal]: 0,
  [Quality.Bad]: 0.15,
  [Quality.Mediocre]: 0.30,
  [Quality.Average]: 0.5,
  [Quality.Cool]: 0.65,
  [Quality.Good]: 0.8,
  [Quality.Excellent]: 1,
}

export const QUALITY_STEPS = {
  [Quality.Abysmal]: 0,
  [Quality.Bad]: 1,
  [Quality.Mediocre]: 2,
  [Quality.Average]: 3,
  [Quality.Cool]: 4,
  [Quality.Good]: 5,
  [Quality.Excellent]: 6,
}

export const DEFAULT_LANGUAGE: Language = 'en-US';

export const ACTIVITY_QUALITY_BASE = 4;

export const EXP_REQUIREMENT_BASE = 1;
export const EXP_REQUIREMENT_FACTOR = 1;
