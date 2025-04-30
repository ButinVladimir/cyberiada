import { msg } from '@lit/localize';
import { DistrictUnlockState } from '@state/city-state/types';

export const DISTRICT_STATE_TEXTS: Record<DistrictUnlockState, () => string> = {
  [DistrictUnlockState.locked]: () => msg('Locked'),
  [DistrictUnlockState.contested]: () => msg('Contested'),
  [DistrictUnlockState.controlled]: () => msg('Controlled'),
};
