import { IPoint } from '@shared/interfaces/point';
import { DistrictType, Faction } from '@shared/types';

export interface IMapGeneratorDistrictResult {
  name: string;
  faction: Faction;
  districtType: DistrictType;
  startingPoint: IPoint;
  tier: number;
}
