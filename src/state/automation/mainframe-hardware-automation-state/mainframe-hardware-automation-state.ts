import { injectable } from 'inversify';
import constants from '@configs/constants.json';
import { IMainframeHardwareAutomationSerializedState, IMainframeHardwareAutomationState } from './interfaces';

@injectable()
export class MainframeHardwareAutomationState implements IMainframeHardwareAutomationState {
  private _performanceShare: number;
  private _coresShare: number;
  private _ramShare: number;

  constructor() {
    this._performanceShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.performanceShare;
    this._coresShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.coresShare;
    this._ramShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.ramShare;
  }

  get performanceShare() {
    return this._performanceShare;
  }

  set performanceShare(value: number) {
    const roundedValue = Math.floor(value);

    if (this.checkValue(roundedValue)) {
      this._performanceShare = roundedValue;
    }
  }

  get coresShare() {
    return this._coresShare;
  }

  set coresShare(value: number) {
    const roundedValue = Math.floor(value);

    if (this.checkValue(roundedValue)) {
      this._coresShare = roundedValue;
    }
  }

  get ramShare() {
    return this._ramShare;
  }

  set ramShare(value: number) {
    const roundedValue = Math.floor(value);

    if (this.checkValue(roundedValue)) {
      this._ramShare = roundedValue;
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._performanceShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.performanceShare;
    this._coresShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.coresShare;
    this._ramShare = constants.defaultAutomationSettings.mainframeHardwareAutobuyer.ramShare;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeHardwareAutomationSerializedState): Promise<void> {
    this._performanceShare = serializedState.performanceShare;
    this._coresShare = serializedState.coresShare;
    this._ramShare = serializedState.ramShare;
  }

  serialize(): IMainframeHardwareAutomationSerializedState {
    return {
      performanceShare: this._performanceShare,
      coresShare: this._coresShare,
      ramShare: this._ramShare,
    };
  }

  private checkValue(value: number): boolean {
    return value >= 0 && value <= 100;
  }
}
