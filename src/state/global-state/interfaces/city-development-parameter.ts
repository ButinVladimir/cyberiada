import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IncomeSource } from '@shared/types';
import { ICityDevelopmentSerializedParameter } from './serialized-states/city-development-serialized-parameter';

export interface ICityDevelopmentParameter
  extends ISerializeable<ICityDevelopmentSerializedParameter>,
    IUIEventEmitter {
  points: number;
  level: number;
  increase(pointsDelta: number, incomeSource: IncomeSource): void;
  getIncome(incomeSource: IncomeSource): number;
  getNextLevelPoints(): number;
  requestLevelRecalculation(): void;
  recalculateLevel(): void;
}
