export interface IExperienceShareParameter {
  synchronizationMultiplier: number;
  programMultiplier: number;
  totalMultiplier: number;
  resetExperience(): void;
  increaseExperience(delta: number): void;
  spendExperience(): void;
  recalculateMultipliers(): void;
}
