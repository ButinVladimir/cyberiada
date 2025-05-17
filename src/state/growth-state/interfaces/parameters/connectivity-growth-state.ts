export interface IConnectivityGrowthState {
  growthByProgram: number;
  resetValues(): void;
  clearValues(): void;
  getBaseGrowthByDistrict(districtIndex: number): number;
  getTotalGrowthByDistrict(districtIndex: number): number;
}
