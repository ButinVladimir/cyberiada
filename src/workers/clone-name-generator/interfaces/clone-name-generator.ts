import { ICloneNameGeneratorResult } from './clone-name-generator-result';

export interface ICloneNameGenerator {
  generate(): ICloneNameGeneratorResult;
}
