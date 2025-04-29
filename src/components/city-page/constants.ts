import { msg } from '@lit/localize';
import { DistrictState } from '@state/city-state/types';

export const DISTRICT_STATE_TEXTS: Record<DistrictState, () => string> = {
  [DistrictState.locked]: () => msg('Locked'),
  [DistrictState.contested]: () => msg('Contested'),
  [DistrictState.controlled]: () => msg('Controlled'),
};
