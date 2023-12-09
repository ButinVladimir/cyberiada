import { Attributes, Skills, PersonStats } from './classes';
import { Quality } from './types';
import { 
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS, QUALITY_POWERS,
  ACTIVITY_QUALITY_BASE, EXP_REQUIREMENT_BASE, EXP_REQUIREMENT_FACTOR
} from './constants';
import {
  ITemplateRequirements, IActivityRequirements, ITemplateBonusModifiers, IPerson
} from './interfaces';

interface GetRequirementsParams {
  requirements: ITemplateRequirements;
  quality: Quality;
  level: number;
}

interface GetBonusModifierParams {
  bonusModifiers: ITemplateBonusModifiers;
  quality: Quality;
  assignedPersons: IPerson[];
}

function applyModifier(value: number | undefined, modifier: number): number {
  return (value ?? 0) * modifier;
}

export function getQualityModifier(quality: Quality): number {
  return (ACTIVITY_QUALITY_BASE ** QUALITY_POWERS[quality]);
}

export function getQualityLevelModifier(quality: Quality, level: number): number {
  return (ACTIVITY_QUALITY_BASE ** QUALITY_POWERS[quality]) * level;
}

export function getRequirements(params: GetRequirementsParams): IActivityRequirements {
  const {
    requirements,
    quality,
    level,
  } = params;
  const modifier = getQualityLevelModifier(quality, level);

  const result = {
    attributes: new Attributes(),
    skills: new Skills(),
    personStats: new PersonStats(),
    credibility: requirements.credibility * (ACTIVITY_QUALITY_BASE ** QUALITY_POWERS[quality]),
  };

  for (const field of ATTRIBUTE_FIELDS) {
    result.attributes[field] = applyModifier(requirements.attributes[field], modifier);
  }

  for (const field of SKILL_FIELDS) {
    result.skills[field] = applyModifier(requirements.skills[field], modifier);
  }

  for (const field of PERSON_STAT_FIELDS) {
    result.personStats[field] = applyModifier(requirements.personStats[field], modifier);
  }

  return result;
}

export function getBonusModifier(params: GetBonusModifierParams): number {
  const {
    assignedPersons,
    bonusModifiers,
    quality,
  } = params;
  let modifier = getQualityModifier(quality);

  for (const person of assignedPersons) {
    for (const field of ATTRIBUTE_FIELDS) {
      modifier *= 1 + person.attributes[field] * (bonusModifiers.attributes[field] ?? 0);
    }

    for (const field of SKILL_FIELDS) {
      modifier *= 1 + person.skills[field] * (bonusModifiers.skills[field] ?? 0);
    }

    for (const field of PERSON_STAT_FIELDS) {
      modifier *= 1 + person.personStats[field] * (bonusModifiers.personStats[field] ?? 0);
    }
  }

  return modifier;
}

export function getCredibilityGain(baseCredibility: number, quality: Quality, bonusModifier: number) {
  return baseCredibility * getQualityModifier(quality) * bonusModifier;
}

export function getExpGain(baseExp: number, quality: Quality, level: number) {
  return baseExp * getQualityLevelModifier(quality, level);
}

export function getMoneyGain(baseMoney: number, quality: Quality, bonusModifier: number) {
  return baseMoney * getQualityModifier(quality) * bonusModifier;
}

export function calculateExpToLevelUp(baseLevel: number, levelUps = 1): number {
  return (2 * EXP_REQUIREMENT_BASE + (2 * baseLevel + levelUps - 1) * EXP_REQUIREMENT_FACTOR) * levelUps / 2;
}

export function calculateLevelUpsFromExp(baseLevel: number, exp: number): number {
  let levelUps = 0;
  let step = 1;

  while (step > 0) {
    const nextLevelUps = levelUps + step;
    const nextExp = calculateExpToLevelUp(baseLevel, nextLevelUps);

    if (nextExp > exp) {
      step = Math.floor(step / 2);
    } else {
      levelUps = nextLevelUps;
      step *= 2;
    }
  }

  return levelUps;
}