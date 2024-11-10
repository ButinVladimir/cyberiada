import { ISerializeable } from '@shared/interfaces/serializable';

export interface IMainframeHardwareParameter extends ISerializeable<number> {
  level: number;
  getIncreaseCost(increase: number): number;
  purchase(increase: number): boolean;
  checkCanPurchase(increase: number): boolean;
}
