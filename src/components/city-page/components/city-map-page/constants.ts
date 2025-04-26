import { Theme } from '@shared/types';
import { IMapStyles } from './interfaces';
import { DistrictState } from '@state/city-state/types';

export const MAP_STYLES: Record<Theme, IMapStyles> = {
  [Theme.light]: {
    borderColor: '#EEEEEE',
    stateStyles: {
      [DistrictState.locked]: {
        backgroundColor: '#552222',
        selectedColor: '#AA7777',
        selectedBorderColor: '#774444',
      },
      [DistrictState.contested]: {
        backgroundColor: '#555522',
        selectedColor: '#AAAA77',
        selectedBorderColor: '#777744',
      },
      [DistrictState.controlled]: {
        backgroundColor: '#222255',
        selectedColor: '#7777AA',
        selectedBorderColor: '#444477',
      },
    },
  },
  [Theme.dark]: {
    borderColor: '#EEEEEE',
    stateStyles: {
      [DistrictState.locked]: {
        backgroundColor: '#552222',
        selectedColor: '#AA7777',
        selectedBorderColor: '#774444',
      },
      [DistrictState.contested]: {
        backgroundColor: '#555522',
        selectedColor: '#AAAA77',
        selectedBorderColor: '#777744',
      },
      [DistrictState.controlled]: {
        backgroundColor: '#222255',
        selectedColor: '#7777AA',
        selectedBorderColor: '#444477',
      },
    },
  },
};
