export interface IConnectivityGrowthSnapshotState {
  growthByProgram: number;
  baseGrowthByDistrict: Record<number, number>;
  totalGrowthByDistrict: Record<number, number>;
}
