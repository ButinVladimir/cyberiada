import { injectable } from 'inversify';
import constants from '@configs/constants.json';
import { checkPercentage } from '@shared/index';
import { ICloneLevelAutomationSerializedState, ICloneLevelAutomationState } from './interfaces';

@injectable()
export class CloneLevelAutomationState implements ICloneLevelAutomationState {
  private _moneyShare: number;

  constructor() {
    this._moneyShare = constants.defaultAutomationSettings.cloneLevelAutoupgrader.moneyShare;
  }

  get moneyShare() {
    return this._moneyShare;
  }

  set moneyShare(value: number) {
    if (checkPercentage(value)) {
      this._moneyShare = value;
    }
  }

  async startNewState(): Promise<void> {
    this._moneyShare = constants.defaultAutomationSettings.cloneLevelAutoupgrader.moneyShare;
  }

  async deserialize(serializedState: ICloneLevelAutomationSerializedState): Promise<void> {
    this._moneyShare = serializedState.moneyShare;
  }

  serialize(): ICloneLevelAutomationSerializedState {
    return {
      moneyShare: this._moneyShare,
    };
  }
}
