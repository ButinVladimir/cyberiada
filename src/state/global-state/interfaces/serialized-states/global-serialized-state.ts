import { GameSpeed } from '../../types';
import { IDevelopmentSerializedState } from './development-serialized-state';
import { ICodeBaseSerializedState } from './code-base-serialized-state';
import { IMoneySerializedState } from './money-serialized-state';
import { ITimeSerializedState } from './time-serialized-state';
import { IUnlockedFeaturesSerializedState } from './unlocked-features-serialized-state';
import { IScenarioSerializedState } from './scenario-serialized-state';

export interface IGlobalSerializedState {
  randomSeed: number;
  scenario: IScenarioSerializedState;
  gameSpeed: GameSpeed;
  money: IMoneySerializedState;
  time: ITimeSerializedState;
  development: IDevelopmentSerializedState;
  codeBase: ICodeBaseSerializedState;
  unlockedFeatures: IUnlockedFeaturesSerializedState;
}
