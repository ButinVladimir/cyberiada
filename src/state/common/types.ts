export type Attribute = 'strength' |'endurance' | 'agility' | 'perception' | 'intellect' | 'charisma';

export type Skill = 'meleeCombat' | 'rangedCombat' | 'stealth' | 'security' | 'infoGathering' |
  'persuasion' | 'hacking' | 'engineering' | 'chemistry';

export enum Stat {
  MeleeScore = 'meleeScore',
  RangedScore = 'rangedScore',
  Defense = 'defense',
  Speed = 'speed',
  MaxHp = 'maxHp',
}

export type StateName = 'globalState';

export enum MenuPages {
  Crew = 'crew',
  CrewEditor = 'crewEditor',
}