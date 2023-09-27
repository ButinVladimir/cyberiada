export interface IAttributes {
  strength: number;
  endurance: number;
  agility: number;
  perception: number;
  intellect: number;
  charisma: number;
}

export interface ISkills {
  meleeCombat: number;
  rangedCombat: number;
  stealth: number;
  security: number;
  infoGathering: number;
  persuasion: number;
  hacking: number;
}

export interface IStats {
  meleeScore: number;
  rangedScore: number;
  defense: number;
  speed: number;
  driving: number;
  maxHp: number;
}

export interface IPerson {
  id: string;
  name: string;
  exp: number;
  level: number;
  hp: number;
  loyalty: number;
  attributes: IAttributes;
  skills: ISkills;
  stats: IStats;
}
