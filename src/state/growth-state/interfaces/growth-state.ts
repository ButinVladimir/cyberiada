import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IGrowthState extends IUIEventEmitter {
  programCompletionSpeedModifier: number;
  programCompletionSpeed: number;
  moneyIncomeTotal: number;
  moneyIncomeByPrograms: number;
  cityDevelopmentSpeedTotal: number;
  cityDevelopmentSpeedByPrograms: number;
  recalculate(): void;
}
