import { msg, str } from '@lit/localize';
import { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';

interface IMainframeHardwareTexts {
  title: (level: string) => string;
  hint: () => string;
}

export const MAINFRAME_HARDWARE_TEXTS: Record<MainframeHardwareParameterType, IMainframeHardwareTexts> = {
  performance: {
    title: (level) => msg(str`Performance level: ${level}`),
    hint: () => msg('Higher performance level leads to overall faster performance'),
  },
  cores: {
    title: (level) => msg(str`Cores level: ${level}`),
    hint: () => msg('Additional cores allow better scalability and running more processes at same time'),
  },
  ram: {
    title: (level) => msg(str`RAM level: ${level}`),
    hint: () =>
      msg('Additional RAM allows to keep more processes in memory so they could ran later or in bigger batches'),
  },
};
