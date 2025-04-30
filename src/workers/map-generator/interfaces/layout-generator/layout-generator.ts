import { ILayoutGeneratorResult } from './layout-generator-result';

export interface ILayoutGenerator {
  generate(): ILayoutGeneratorResult;
}
