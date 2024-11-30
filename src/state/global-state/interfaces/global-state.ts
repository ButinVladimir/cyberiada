import { ISerializeable } from '@shared/interfaces/serializable';
import { IGlobalSerializedState } from './serialized-states/global-serialized-state';
import { GameSpeed } from '../types';
import { IMoneyParameter } from './money-parameter';
import { ITimeParameter } from './time-parameter';
import { IDevelopmentParameter } from './development-parameter';
import { IProgramCompletionSpeedParameter } from './program-completion-speed-parameter';
import { IMoneyGrowthParameter } from './money-growth-parameter';
import { IDevelopmentGrowthParameter } from './development-growth-parameter';
import { IComputationalBaseParameter } from './computational-base-parameter';
import { IProgramsGrowthParameter } from './programs-growth-parameter';
import { IUnlockedFeaturesParameter } from './unlocked-features-parameter';
import { IStoryEventsParameter } from './story-events-parameter';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState> {
  randomSeed: number;
  gameSpeed: GameSpeed;
  money: IMoneyParameter;
  time: ITimeParameter;
  development: IDevelopmentParameter;
  computationalBase: IComputationalBaseParameter;
  programCompletionSpeed: IProgramCompletionSpeedParameter;
  moneyGrowth: IMoneyGrowthParameter;
  developmentGrowth: IDevelopmentGrowthParameter;
  programsGrowth: IProgramsGrowthParameter;
  unlockedFeatures: IUnlockedFeaturesParameter;
  storyEvents: IStoryEventsParameter;
  requestGrowthRecalculation(): void;
  recalculate(): void;
}
