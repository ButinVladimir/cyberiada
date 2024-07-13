import { IMapGeneratorResult } from './map-generator-result';

export interface IMapGenerator {
  generate(): IMapGeneratorResult;
}
