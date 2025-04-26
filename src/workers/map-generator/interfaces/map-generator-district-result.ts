import { IPoint } from '@shared/interfaces/point';
import { Faction } from '@shared/types';

export interface IMapGeneratorDistrictResult {
  name: string;
  faction: Faction;
  startingPoint: IPoint;
}
