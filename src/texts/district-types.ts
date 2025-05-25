import { msg } from '@lit/localize';
import { DistrictType } from '@shared/types';

export const DISTRICT_TYPE_TEXTS = {
  [DistrictType.residential]: {
    title: () => msg('Residential district'),
    overview: () => msg(`Relatively silent arrays of houses. Residential districts don't have a lot of opportunities.`),
  },
  [DistrictType.corpoDistrict]: {
    title: () => msg('Corpo district'),
    overview: () =>
      msg(`Corpo districts house offices of corporations from entire world.
It's a good place to make a raid to get a new tech or find a quick job.`),
  },
};
