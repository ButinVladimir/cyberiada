import { Theme } from '@shared/types';
import { IMapStyles } from './interfaces';
import { DistrictState } from '@state/city-state/types';

export const MAP_STYLES: Record<Theme, IMapStyles> = {
  [Theme.light]: {
    borderColor: '#e4e4e7',
    stateStyles: {
      [DistrictState.locked]: {
        backgroundColor: '#7f1d1d',
        selectedColor: '#ef4444',
        selectedBorderColor: '#dc2626',
      },
      [DistrictState.contested]: {
        backgroundColor: '#78350f',
        selectedColor: '#f59e0b',
        selectedBorderColor: '#d97706',
      },
      [DistrictState.controlled]: {
        backgroundColor: '#0c4a6e',
        selectedColor: '#0ea5e9',
        selectedBorderColor: '#0284c7',
      },
    },
  },
  [Theme.dark]: {
    borderColor: '#36363b',
    stateStyles: {
      [DistrictState.locked]: {
        backgroundColor: '#7f1d1d',
        selectedColor: '#dc2626',
        selectedBorderColor: '#ef4444',
      },
      [DistrictState.contested]: {
        backgroundColor: '#78350f',
        selectedColor: '#d97706',
        selectedBorderColor: '#f59e0b',
      },
      [DistrictState.controlled]: {
        backgroundColor: '#0c4a6e',
        selectedColor: '#0284c7',
        selectedBorderColor: '#0ea5e9',
      },
    },
  },
};
