import { RandomQueue } from '@shared/random-queue';
import { IPoint } from '@shared/interfaces';

export interface IMapGeneratorDistrict {
  startingPoint: IPoint;
  queue: RandomQueue<IPoint>;
}
