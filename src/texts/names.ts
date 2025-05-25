import { msg } from '@lit/localize';

export const CLONE_NAMES: Record<string, () => string> = {
  John: () => msg('John'),
  Jack: () => msg('Jack'),
  Ivan: () => msg('Ivan'),
  Vasily: () => msg('Vasily'),
  Petar: () => msg('Petar'),
  Miloš: () => msg('Miloš'),
};

export const DISTRICT_NAMES: Record<string, () => string> = {
  Banjica: () => msg('Banjica'),
  Autokomanda: () => msg('Autokomanda'),
  Zvezdara: () => msg('Zvezdara'),
  Mirievo: () => msg('Mirievo'),
  Voždovac: () => msg('Voždovac'),
};
