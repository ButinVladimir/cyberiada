import { IExponent } from '@shared/interfaces/exponent';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IStoryEvent } from './story-event';
import { IMultiplierScenarioParameters } from './multiplier-scenario-parameters';

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
    codeBase: IMultiplierScenarioParameters;
    computationalBase: IMultiplierScenarioParameters;
    connectivity: IMultiplierScenarioParameters;
    rewards: IMultiplierScenarioParameters;
  };
  storyEvents: IStoryEvent[];
}
