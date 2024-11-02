import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IGlobalSerializedState } from './serialized-states/global-serialized-state';
import { GameSpeed } from '../types';
import { IMoneyParameter } from './money-parameter';
import { ITimeParameter } from './time-parameter';
import { ICityDevelopmentParameter } from './city-development-parameter';
import { IProgramCompletionSpeedParameter } from './program-completion-speed-parameter';
import { IMoneyGrowthParameter } from './money-growth-parameter';
import { ICityDevelopmentGrowthParameter } from './city-development-growth-parameter';
import { IComputationalBaseParameter } from './computational-base-parameter';
import { IProgramsGrowthParameter } from './programs-growth-parameter';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState>, IUIEventEmitter {
  randomSeed: number;
  gameSpeed: GameSpeed;
  money: IMoneyParameter;
  time: ITimeParameter;
  cityDevelopment: ICityDevelopmentParameter;
  computationalBase: IComputationalBaseParameter;
  programCompletionSpeed: IProgramCompletionSpeedParameter;
  moneyGrowth: IMoneyGrowthParameter;
  cityDevelopmentGrowth: ICityDevelopmentGrowthParameter;
  programsGrowth: IProgramsGrowthParameter;
  requestGrowthRecalculation(): void;
  recalculate(): void;
}
