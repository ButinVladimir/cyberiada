import { msg } from '@lit/localize';
import { RewardParameters } from './types';

export const PARAGRAPH_VALUES = {
  VALUE: 'value',
  DIFF: 'diff',
};

export const PARAMETER_NAMES = {
  [RewardParameters.money]: () => msg('Money'),
  [RewardParameters.developmentPoints]: () => msg('Development points'),
  [RewardParameters.experience]: () => msg('Experience'),
  [RewardParameters.districtTierPoints]: () => msg('District tier points'),
  [RewardParameters.connectivity]: () => msg('Connectivity points'),
  [RewardParameters.codeBase]: () => msg('Code base points'),
  [RewardParameters.computationalBase]: () => msg('Computational base points'),
  [RewardParameters.rewards]: () => msg('Rewards base points'),
};
