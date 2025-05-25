export interface IExperienceShareParameter {
  baseMultiplier: number;
  synchronizationMultiplier: number;
  programMultiplier: number;
  totalMultiplier: number;
  resetExperience(): void;
  increaseExperience(delta: number): void;
  spendExperience(): void;
  recalculateMultipliers(): void;
}
