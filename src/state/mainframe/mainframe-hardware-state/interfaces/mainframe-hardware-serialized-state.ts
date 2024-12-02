import { MainframeHardwareParameterType } from '../types';
import { IMainframeHardwareParameterSerializedState } from './mainframe-hardware-parameter-serialized-state';

export interface IMainframeHardwareSerializedState {
  performance: IMainframeHardwareParameterSerializedState;
  cores: IMainframeHardwareParameterSerializedState;
  ram: IMainframeHardwareParameterSerializedState;
  parametersList: MainframeHardwareParameterType[];
}
