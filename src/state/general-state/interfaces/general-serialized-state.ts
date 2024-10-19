import { IncomeSource, PurchaseType } from '@shared/types';
import { GameSpeed } from '../types';

export interface IGeneralSerializedState {
  randomSeed: number;
  lastUpdateTime: number;
  offlineTime: number;
  gameSpeed: GameSpeed;
  timeThisRun: number;
  timeTotal: number;
  money: number;
  cityLevel: number;
  cityDevelopmentPoints: number;
  moneyIncome: Record<IncomeSource, number>;
  cityDevelopmentPointsIncome: Record<IncomeSource, number>;
  moneyExpenses: Record<PurchaseType, number>;
}
