export interface IExperienceGrowthState {
  resetValues(): void;
  clearValues(): void;
  getGrowthByClone(cloneId: string): number;
}
