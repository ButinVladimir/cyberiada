import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IGeneralSerializedState } from './general-serialized-state';
import { IncomeSource, PurchaseType } from '@shared/types';
import { GameSpeed } from '../types';

export interface IGeneralState extends ISerializeable<IGeneralSerializedState>, IUIEventEmitter {
  randomSeed: number;
  lastUpdateTime: number;
  offlineTime: number;
  gameSpeed: GameSpeed;
  timeThisRun: number;
  timeTotal: number;
  money: number;
  cityLevel: number;
  cityDevelopmentPoints: number;
  changeGameSpeed(gameSpeed: GameSpeed): void;
  updateLastUpdateTime(): void;
  decreaseOfflineTimeByTick(): boolean;
  increaseTime(): void;
  increaseMoney(moneyDelta: number, source: IncomeSource): void;
  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean;
  increaseCityDevelopmentPoints(delta: number, source: IncomeSource): void;
  getMoneyIncome(incomeSource: IncomeSource): number;
  getCityDevelopmentPointsIncome(incomeSource: IncomeSource): number;
  getMoneyExpenses(purchaseType: PurchaseType): number;
}
