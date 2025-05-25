import { Theme } from '@shared/types';
import { IMapStyles } from './interfaces';
import { DistrictUnlockState } from '@state/city-state/types';

export const CELL_SIZE = 10;

export const MAP_STYLES: Record<Theme, IMapStyles> = {
  [Theme.light]: {
    borderColor: '#e4e4e7',
    stateStyles: {
      [DistrictUnlockState.locked]: {
        backgroundColor: '#7f1d1d',
        selectedColor: '#ef4444',
        selectedBorderColor: '#dc2626',
      },
      [DistrictUnlockState.contested]: {
        backgroundColor: '#78350f',
        selectedColor: '#f59e0b',
        selectedBorderColor: '#d97706',
      },
      [DistrictUnlockState.captured]: {
        backgroundColor: '#0c4a6e',
        selectedColor: '#0ea5e9',
        selectedBorderColor: '#0284c7',
      },
    },
  },
  [Theme.dark]: {
    borderColor: '#36363b',
    stateStyles: {
      [DistrictUnlockState.locked]: {
        backgroundColor: '#7f1d1d',
        selectedColor: '#dc2626',
        selectedBorderColor: '#ef4444',
      },
      [DistrictUnlockState.contested]: {
        backgroundColor: '#78350f',
        selectedColor: '#d97706',
        selectedBorderColor: '#f59e0b',
      },
      [DistrictUnlockState.captured]: {
        backgroundColor: '#0c4a6e',
        selectedColor: '#0284c7',
        selectedBorderColor: '#0ea5e9',
      },
    },
  },
};
