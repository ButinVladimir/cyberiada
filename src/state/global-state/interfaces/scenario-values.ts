import { IExponent } from '@shared/interfaces/exponent';
import { ProgramName } from '@state/progam-factory/types';
import { IStoryEvent } from './story-event';

interface IMultiplierScenarioValue {
  pointsPerCompletion: number;
  completionsToMax: number;
  logBase: number;
}

export interface IScenarioValues {
  mapWidth: number;
  mapHeight: number;
  districtsNum: number;
  money: number;
  developmentLevel: number;
  accumulatedTime: number;
  mainframeHardware: {
    performanceLevel: number;
    coresLevel: number;
    ramLevel: number;
    performancePrice: IExponent;
    coresPrice: IExponent;
    ramPrice: IExponent;
  };
  mainframeSoftware: {
    performanceBoost: number;
    programs: ProgramName[];
    minCompletionTime: number;
  };
  developmentLevelRequirements: IExponent;
  programMultipliers: {
    codeBase: IMultiplierScenarioValue;
    computationalBase: IMultiplierScenarioValue;
    connectivity: IMultiplierScenarioValue;
    rewards: IMultiplierScenarioValue;
  };
  storyEvents: IStoryEvent[];
}
