import { msg, str } from '@lit/localize';
import { Attribute, ItemCategory, Skill } from '@shared/types';

export const COMMON_TEXTS = {
  notEnoughMoney: () => msg('Not enough money'),
  willBeAvailableIn: (time: string) => msg(str`Will be available in ${time}`),
  higherDevelopmentLevelRequired: () => msg('Higher development level required'),
  buyIncrease: (increase: string, cost: string) => msg(str`Buy x${increase} for ${cost}`),
  buyMax: () => msg('Buy max'),
  buyMaxAllUpgrades: () => msg('Buy all upgrades'),
  enableAutoupgrade: () => msg('Enable autoupgrade'),
  disableAutoupgrade: () => msg('Disable autoupgrade'),
  enableAutoupgradeAll: () => msg('Enable autoupgrade for all'),
  disableAutoupgradeAll: () => msg('Disable autoupgrade for all'),
  showDescription: () => msg('Show description'),
  hideDescription: () => msg('Hide description'),
  upgrade: () => msg('Upgrade'),
  upgradeAll: () => msg('Upgrade all'),
  level: () => msg('Level'),
  quality: () => msg('Quality'),
  cancel: () => msg('Cancel'),
  continue: () => msg('Continue'),
  close: () => msg('Close'),
  purchase: (cost: string) => msg(str`Purchase for ${cost}`),
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
