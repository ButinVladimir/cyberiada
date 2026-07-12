import { SimulationAutomationType } from '../types';

export interface ISimulationRequest {
  inputSavefile: string;
  outputSavefile: string;
  snapshotsFile?: string;
  time: number;
  updatesPerTick: number;
  cooldownTime: number;
  automation: {
    type: SimulationAutomationType;
    timeout: number;
    startImmediately: boolean;
  }[];
}
