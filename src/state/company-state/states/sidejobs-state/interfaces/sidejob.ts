import { Attribute, Skill } from '@shared/index';
import { IDistrictState } from '@state/city-state';
import { IClone } from '../../clone-factory';
import { SidejobName } from '../types';
import { IMakeSidejobParameters } from './make-sidejob-parameters';

export interface ISidejob {
  id: string;
  sidejobName: SidejobName;
  district: IDistrictState;
  isActive: boolean;
  assignedClone?: IClone;
  checkRequirements(): boolean;
  getAttributeRequirement(attribute: Attribute): number;
  getSkillRequirement(skill: Skill): number;
  getAttributeModifier(attribute: Attribute): number;
  getSkillModifier(skill: Skill): number;
  perform(): void;
  calculateExperienceDelta(passedTime: number): number;
  calculateMoneyDelta(passedTime: number): number;
  calculateDevelopmentPointsDelta(passedTime: number): number;
  calculateDistrictTierPointsDelta(passedTime: number): number;
  calculateConnectivityDelta(passedTime: number): number;
  calculateCodeBaseDelta(passedTime: number): number;
  calculateComputationalBaseDelta(passedTime: number): number;
  calculateRewardsDelta(passedTime: number): number;
  serialize(): IMakeSidejobParameters;
  removeAllEventListeners(): void;
}
