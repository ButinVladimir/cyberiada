import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IncomeSource } from '@shared/types';
import { IDevelopmentSerializedParameter } from './serialized-states/development-serialized-parameter';

export interface IDevelopmentParameter extends ISerializeable<IDevelopmentSerializedParameter>, IUIEventEmitter {
  points: number;
  level: number;
  increase(pointsDelta: number, incomeSource: IncomeSource): void;
  getIncome(incomeSource: IncomeSource): number;
  getNextLevelPoints(): number;
  requestLevelRecalculation(): void;
  recalculateLevel(): void;
}
