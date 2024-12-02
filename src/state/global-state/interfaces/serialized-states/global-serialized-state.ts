import { GameSpeed } from '../../types';
import { IDevelopmentSerializedParameter } from './development-serialized-parameter';
import { IComputationalBaseSerializedParameter } from './computational-base-serialized-parameter';
import { IMoneySerializedParameter } from './money-serialized-parameter';
import { IStoryEventsSerializedParameter } from './story-events-serialized-parameter';
import { ITimeSerializedParameter } from './time-serialized-parameter';
import { IUnlockedFeaturesSerializedParameter } from './unlocked-features-serialized-parameter';

export interface IGlobalSerializedState {
  randomSeed: number;
  gameSpeed: GameSpeed;
  money: IMoneySerializedParameter;
  time: ITimeSerializedParameter;
  development: IDevelopmentSerializedParameter;
  computationalBase: IComputationalBaseSerializedParameter;
  unlockedFeatures: IUnlockedFeaturesSerializedParameter;
  storyEvents: IStoryEventsSerializedParameter;
}
