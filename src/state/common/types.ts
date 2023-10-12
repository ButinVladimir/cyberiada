export type Attribute = 'strength' |'endurance' | 'agility' | 'perception' | 'intellect' | 'charisma';

export type Skill = 'meleeCombat' | 'rangedCombat' | 'stealth' | 'security' | 'infoGathering' |
  'persuasion' | 'hacking' | 'engineering' | 'chemistry';

export enum Stat {
  MeleeScore = 'meleeScore',
  RangedScore = 'rangedScore',
  Defense = 'defense',
  Speed = 'speed',
  Driving = 'driving',
  MaxHp = 'maxHp',
}

export enum Events {
  GlobalStateUpdated = 'globalStateUpdated',
}

export type StateName = 'globalState';
