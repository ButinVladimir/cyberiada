import { DistrictConnectionGraphBuilder } from './district-connection-graph-builder';
import {
  IDistrictConnectionGraphBuilder,
  IDistrictConnectionGraphBuilderArgs,
  IDistrictConnectionGraphBuilderResult,
} from './interfaces';

onmessage = (e: MessageEvent<IDistrictConnectionGraphBuilderArgs>) => {
  const cloneNameGenerator: IDistrictConnectionGraphBuilder = new DistrictConnectionGraphBuilder(e.data);
  const result: IDistrictConnectionGraphBuilderResult = cloneNameGenerator.build();

  postMessage(result);
};
