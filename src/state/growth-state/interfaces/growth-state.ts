import { IncomeSource } from '@shared/types';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IGrowthSerializedState } from './growth-serialized-state';

export interface IGrowthState extends ISerializeable<IGrowthSerializedState>, IUIEventEmitter {
  programCompletionSpeedModifier: number;
  programCompletionSpeed: number;
  moneyIncomeTotal: number;
  cityDevelopmentSpeedTotal: number;
  codebasePointsByProgram: number;
  codebaseIncomeByProgram: number;
  programDiscount: number;
  recalculate(): void;
  requestRecalculation(): void;
  getMoneyIncomeBySource(incomeSource: IncomeSource): number;
  getCityDevelopmentSpeedBySource(incomeSource: IncomeSource): number;
  increaseCodebaseByProgram(delta: number): void;
}
