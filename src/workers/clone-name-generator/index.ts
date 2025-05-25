import { CloneNameGenerator } from './clone-name-generator';
import { ICloneNameGenerator, ICloneNameGeneratorArgs, ICloneNameGeneratorResult } from './interfaces';

onmessage = (e: MessageEvent<ICloneNameGeneratorArgs>) => {
  const cloneNameGenerator: ICloneNameGenerator = new CloneNameGenerator(e.data);
  const result: ICloneNameGeneratorResult = cloneNameGenerator.generate();

  postMessage(result);
};
