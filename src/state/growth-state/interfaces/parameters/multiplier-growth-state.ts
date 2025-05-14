export interface IMultiplierGrowthState {
  growthByProgram: number;
  resetValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
