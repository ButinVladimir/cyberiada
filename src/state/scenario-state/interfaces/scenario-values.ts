import { IExponent } from '@shared/interfaces/exponent';
import { ProgramName } from '@state/progam-factory/types';

export interface IScenarioValues {
  mapWidth: number;
  mapHeight: number;
  districtsNum: number;
  startingMoney: number;
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
    startingPrograms: ProgramName[];
    minCompletionTime: number;
  };
  startingCityLevel: number;
  cityLevelRequirements: IExponent;
  pointsByProgramMultipliers: {
    program: number;
  };
  discounts: {
    program: number;
  };
}
