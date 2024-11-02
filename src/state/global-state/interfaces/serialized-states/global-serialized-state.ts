import { GameSpeed } from '../../types';
import { ICityDevelopmentSerializedParameter } from './city-development-serialized-parameter';
import { IComputationalBaseSerializedParameter } from './computational-base-serialized-parameter';
import { IMoneySerializedParameter } from './money-serialized-parameter';
import { ITimeSerializedParameter } from './time-serialized-parameter';

export interface IGlobalSerializedState {
  randomSeed: number;
  gameSpeed: GameSpeed;
  money: IMoneySerializedParameter;
  time: ITimeSerializedParameter;
  cityDevelopment: ICityDevelopmentSerializedParameter;
  computationalBase: IComputationalBaseSerializedParameter;
}
