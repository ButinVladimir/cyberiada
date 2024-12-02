import { injectable } from 'inversify';
import constants from '@configs/constants.json';
import { checkPercentage } from '@shared/helpers';
import { IMainframeProgramsAutomationSerializedState, IMainframeProgramsAutomationState } from './interfaces';

@injectable()
export class MainframeProgramsAutomationState implements IMainframeProgramsAutomationState {
  private _moneyShare: number;

  constructor() {
    this._moneyShare = constants.defaultAutomationSettings.mainframeProgramsAutobuyer.moneyShare;
  }

  get moneyShare() {
    return this._moneyShare;
  }

  set moneyShare(value: number) {
    if (checkPercentage(value)) {
      this._moneyShare = value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._moneyShare = constants.defaultAutomationSettings.mainframeProgramsAutobuyer.moneyShare;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeProgramsAutomationSerializedState): Promise<void> {
    this._moneyShare = serializedState.moneyShare;
  }

  serialize(): IMainframeProgramsAutomationSerializedState {
    return {
      moneyShare: this._moneyShare,
    };
  }
}
