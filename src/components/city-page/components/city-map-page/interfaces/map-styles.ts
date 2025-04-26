import { DistrictState } from '@state/city-state/types';

export interface IMapStyles {
  borderColor: string;
  stateStyles: Record<
    DistrictState,
    {
      selectedBorderColor: string;
      selectedColor: string;
      backgroundColor: string;
    }
  >;
}
