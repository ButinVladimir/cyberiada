export interface IDistrictConnectionGraphBuilderResult {
  connections: Map<number, Set<number>>;
  districtSizes: Map<number, number>;
}
