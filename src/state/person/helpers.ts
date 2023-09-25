import { BASE_EXP_COST, EXP_REQUIREMENT_BASE, EXP_REQUIREMENT_FACTOR } from './constants';

export function calculateExpFromLevel(level: number): number {
  return BASE_EXP_COST * Math.pow(EXP_REQUIREMENT_BASE, level * EXP_REQUIREMENT_FACTOR);
}
