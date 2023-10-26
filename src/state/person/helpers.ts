import { EXP_REQUIREMENT_BASE, EXP_REQUIREMENT_FACTOR } from './constants';

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