export interface IConnectivityGrowthState {
  growthByProgram: number;
  resetValues(): void;
  getBaseGrowthByDistrict(districtIndex: number): number;
  getTotalGrowthByDistrict(districtIndex: number): number;
}
