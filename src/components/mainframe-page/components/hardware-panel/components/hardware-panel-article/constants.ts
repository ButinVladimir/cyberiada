import { msg, str } from '@lit/localize';

export const MAINFRAME_HARDWARE_TEXTS = {
  performance: {
    title: () => msg(str`Performance level`),
    hint: () =>
      msg('Higher performance level leads to faster process completion and better yields from autoscalable programs.'),
  },
  cores: {
    title: () => msg(str`Cores level`),
    hint: () => msg('Additional cores allow better scalability and running more processes at same time.'),
  },
  ram: {
    title: () => msg(str`RAM level`),
    hint: () =>
      msg('Additional RAM allows to keep more processes in memory so they could ran later or in bigger batches.'),
  },
};
