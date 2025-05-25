import { msg } from '@lit/localize';
import { DistrictUnlockState } from '@state/city-state/types';

export const DISTRICT_STATE_TEXTS = {
  [DistrictUnlockState.locked]: {
    title: () => msg('Locked'),
    hint: () => msg('Locked districts are inaccessible.'),
  },
  [DistrictUnlockState.contested]: {
    title: () => msg('Contested'),
    hint: () => msg('Contested districts are available for work.'),
  },
  [DistrictUnlockState.captured]: {
    title: () => msg('Captured'),
    hint: () =>
      msg(`Captured districts are available for work.
For each captured district you may be loaned a random item.
After making district captured, one more distict will become contested.
`),
  },
};
