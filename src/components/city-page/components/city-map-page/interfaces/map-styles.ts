import { DistrictUnlockState } from '@state/city-state/types';

export interface IMapStyles {
  borderColor: string;
  stateStyles: Record<
    DistrictUnlockState,
    {
      selectedBorderColor: string;
      selectedColor: string;
      backgroundColor: string;
    }
  >;
}
