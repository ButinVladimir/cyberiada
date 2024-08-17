import { ISerializeable } from '@shared/interfaces/serializable';
import { IMainframeHardwareSerializedState } from './mainframe-hardware-serialized-state';

export interface IMainframeHardwareState extends ISerializeable<IMainframeHardwareSerializedState> {
  performance: number;
  cores: number;
  ram: number;
  getPerformanceIncreaseCost(increase: number): number;
  purchasePerformanceIncrease(increase: number): boolean;
  getCoresIncreaseCost(increase: number): number;
  purchaseCoresIncrease(increase: number): boolean;
  getRamIncreaseCost(increase: number): number;
  purchaseRamIncrease(increase: number): boolean;
}
