import { RandomQueue } from '@shared/random-queue';
import { IPoint } from '@shared/interfaces';

export interface ILayoutGeneratorDistrict {
  startingPoint: IPoint;
  queue: RandomQueue<IPoint>;
}
