import { CloneNameGenerator } from './clone-name-generator';
import { ICloneNameGeneratorArgs, ICloneNameGeneratorResult } from './interfaces';

onmessage = (e: MessageEvent<ICloneNameGeneratorArgs>) => {
  const cloneNameGenerator: CloneNameGenerator = new CloneNameGenerator(e.data);
  const result: ICloneNameGeneratorResult = cloneNameGenerator.generate();

  postMessage(result);
};
