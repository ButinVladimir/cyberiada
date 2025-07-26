import { DistrictUnlockState } from '@state/city-state';
import { Theme } from '@shared/index';

export interface IDistrictRendererArgs {
  canvas: OffscreenCanvas;
  mapWidth: number;
  mapHeight: number;
  layout: number[][];
  theme: Theme;
  districtNum: number;
  districtUnlockState: DistrictUnlockState;
  selected: boolean;
}
