import { IDistrictConnectionGraphBuilderResult } from './district-connection-graph-builder-result';

export interface IDistrictConnectionGraphBuilder {
  build(): IDistrictConnectionGraphBuilderResult;
}
