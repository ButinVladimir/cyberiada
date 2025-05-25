import { injectable } from 'inversify';
import constants from '@configs/constants.json';
import { checkPercentage } from '@shared/helpers';
import { IMainframeHardwareAutomationSerializedState, IMainframeHardwareAutomationState } from './interfaces';

@injectable()
export class MainframeHardwareAutomationState implements IMainframeHardwareAutomationState {
  private _moneyShare: number;

  constructor() {
    this._moneyShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.moneyShare;
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
    this._moneyShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.moneyShare;
  }

  async deserialize(serializedState: IMainframeHardwareAutomationSerializedState): Promise<void> {
    this._moneyShare = serializedState.moneyShare;
  }

  serialize(): IMainframeHardwareAutomationSerializedState {
    return {
      moneyShare: this._moneyShare,
    };
  }
}
