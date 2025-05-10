import { msg, str } from '@lit/localize';
import { Attribute, ItemCategory, RewardParameter, Skill } from '@shared/types';
import { html } from 'lit';

export const COMMON_TEXTS = {
  notEnoughMoney: () => msg('Not enough money'),
  willBeAvailableIn: (time: string) => msg(str`Will be available in ${time}`),
  willBeAvailableInNew: (timeElement: any) => msg(html`Will be available in ${timeElement}`),
  higherDevelopmentLevelRequired: () => msg('Higher development level required'),
  buyIncrease: (increase: string) => msg(str`Buy x${increase}`),
  buyMax: () => msg('Buy max'),
  buyMaxAllUpgrades: () => msg('Buy all upgrades'),
  enableAutoupgrade: () => msg('Enable autoupgrade'),
  disableAutoupgrade: () => msg('Disable autoupgrade'),
  enableAutoupgradeAll: () => msg('Enable autoupgrade for all'),
  disableAutoupgradeAll: () => msg('Disable autoupgrade for all'),
  showDescription: () => msg('Show description'),
  hideDescription: () => msg('Hide description'),
  showDetails: () => msg('Show details'),
  hideDetails: () => msg('Hide details'),
  upgrade: () => msg('Upgrade'),
  upgradeAll: () => msg('Upgrade all'),
  level: () => msg('Level'),
  levelValue: (level: string) => msg(str`Level: ${level}`),
  quality: () => msg('Quality'),
  qualityValue: (quality: string) => msg(str`Quality: ${quality}`),
  cancel: () => msg('Cancel'),
  continue: () => msg('Continue'),
  close: () => msg('Close'),
  purchase: () => msg('Purchase'),
  percentage: (value: string) => msg(str`${value}%`),
  modifierDiff: (value: string, diff: string) => msg(str`\u00D7 ${value} (${diff})`),
  menu: () => msg('Menu'),
  requirements: () => msg('Requirements'),
  rewards: () => msg('Rewards'),
  rewardsMultipliers: () => msg('Rewards multipliers'),
  attributes: () => msg('Attributes'),
  skills: () => msg('Skills'),
  cost: (costEl: any) => msg(html`Cost: ${costEl}`),
  parameterValueWithDiff: (parameterName: string, valueElement: any, diffElement: any) =>
    msg(html`${parameterName}: ${valueElement} (${diffElement}) per second`),
  parameterValue: (parameterName: string, valueElement: any) => msg(html`${parameterName}: ${valueElement} per second`),
};

export const CATEGORY_TEXTS: Record<ItemCategory, () => string> = {
  programs: () => msg('Programs'),
  cloneTemplates: () => msg('Clone templates'),
};

export const ATTRIBUTE_TEXTS: Record<Attribute, () => string> = {
  strength: () => msg('Strength'),
  agility: () => msg('Agility'),
  charisma: () => msg('Charisma'),
  endurance: () => msg('Endurance'),
  intellect: () => msg('Intellect'),
  perception: () => msg('Perception'),
};

export const SKILL_TEXTS: Record<Skill, () => string> = {
  closeCombat: () => msg('Close combat'),
  rangedCombat: () => msg('Ranged combat'),
  diplomacy: () => msg('Diplomacy'),
  engineering: () => msg('Engineering'),
  hacking: () => msg('Hacking'),
  stealth: () => msg('Stealth'),
};

export const REWARD_PARAMETER_NAMES = {
  [RewardParameter.money]: () => msg('Money'),
  [RewardParameter.developmentPoints]: () => msg('Development points'),
  [RewardParameter.experience]: () => msg('Experience'),
  [RewardParameter.districtTierPoints]: () => msg('District tier points'),
  [RewardParameter.connectivity]: () => msg('Connectivity points'),
  [RewardParameter.codeBase]: () => msg('Code base points'),
  [RewardParameter.computationalBase]: () => msg('Computational base points'),
  [RewardParameter.rewards]: () => msg('Rewards base points'),
};
