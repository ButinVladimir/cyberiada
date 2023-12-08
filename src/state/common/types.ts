export enum MenuPages {
  Crew = 'crew',
  CrewEditor = 'crewEditor',
  Jobs = 'jobs',
  Settings = 'settings',
}

export enum Quality {
  Abysmal = 'abysmal',
  Bad = 'bad',
  Mediocre = 'mediocre',
  Average = 'average',
  Cool = 'cool',
  Good = 'good',
  Excellent = 'excellent',
}

export type Language = 'en-US' | 'ru-RU';

export type GameSpeedState = 'paused' | 'withoutBonusTime' |'withBonusTime';
