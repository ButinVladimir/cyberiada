import { IExponent } from '@shared/interfaces/formulas/exponent';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IStoryEvent } from './story-event';
import { IMultiplierScenarioParameters } from './multiplier-scenario-parameters';

export interface IScenarioValues {
  map: {
    width: number;
    height: number;
    districts: [];
  };
  startingMoney: number;
  startingDevelopmentLevel: number;
  startingAccumulatedTime: number;
  startingSynchronization: number;
  mainframeHardware: {
    basePerformanceLevel: number;
    baseCoresLevel: number;
    baseRamLevel: number;
    performancePrice: IExponent;
    coresPrice: IExponent;
    ramPrice: IExponent;
  };
  mainframeSoftware: {
    performanceBoost: number;
    startingPrograms: ProgramName[];
    minProgramCompletionTime: number;
  };
  developmentLevelRequirements: IExponent;
  programMultipliers: {
    money: {
      pointsMultiplier: number;
    };
    developmentPoints: {
      pointsMultiplier: number;
    };
    codeBase: IMultiplierScenarioParameters;
    computationalBase: IMultiplierScenarioParameters;
    connectivity: IMultiplierScenarioParameters;
    rewards: IMultiplierScenarioParameters;
  };
  storyEvents: IStoryEvent[];
}
