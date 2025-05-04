import { msg } from '@lit/localize';
import { SidejobName } from '@state/company-state';

export const SIDEJOB_TEXTS = {
  [SidejobName.oddjob]: {
    title: () => msg('Oddjob'),
    overview: () => msg(`Random job not requiring high qualification.`),
  },
  [SidejobName.infoBroker]: {
    title: () => msg('Information broker'),
    overview: () => msg('Find and deliver useful information for various parties.'),
  },
};
