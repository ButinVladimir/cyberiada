export interface IMultiplierGrowthState {
  growthByProgram: number;
  resetValues(): void;
  clearValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
