import { DistrictUnlockState } from '@state/city-state';

export interface IDistrictStyles {
  borderColor: string;
  color: string;
}

export type MapStyles = Record<
  DistrictUnlockState,
  {
    selectedStyles: IDistrictStyles;
    notSelectedStyles: IDistrictStyles;
  }
>;
