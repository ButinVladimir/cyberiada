import { IMapGeneratorArgs, IMapGeneratorResult } from './interfaces';
import { MapGenerator } from './map-generator';

onmessage = (e: MessageEvent<IMapGeneratorArgs>) => {
  const mapGenerator: MapGenerator = new MapGenerator(e.data);
  const result: IMapGeneratorResult = mapGenerator.generate();

  postMessage(result);
};
