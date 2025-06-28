import { createContext } from '@lit/context';
import { IMainframeHardwareParameter } from '@state/mainframe-state';

export const mainframeHardwareParameterContext = createContext<IMainframeHardwareParameter>(
  Symbol('MAINFRAME_HARDWARE_PARAMETER'),
);
