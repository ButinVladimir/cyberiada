export interface IDistrictTierPointsGrowthState {
  resetValues(): void;
  clearValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
