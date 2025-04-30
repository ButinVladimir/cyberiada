import { msg } from '@lit/localize';
import { DistrictType } from '@shared/types';

interface IDistrictTypeTexts {
  title: () => string;
  overview: () => string;
}

export const DISTRICT_TYPE_TEXTS: Record<DistrictType, IDistrictTypeTexts> = {
  [DistrictType.suburb]: {
    title: () => msg('Suburb'),
    overview: () => msg(`Relatively silent arrays of houses. Suburbs don't have a lot of opportunities.`),
  },
  [DistrictType.corpoDistrict]: {
    title: () => msg('Corpo district'),
    overview: () =>
      msg(`Corpo districts house offices of corporations from entire world.
It's a good place to make a raid to get a new tech or find a quick job.`),
  },
};
