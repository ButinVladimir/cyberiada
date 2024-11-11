import { injectable } from 'inversify';
import constants from '@configs/constants.json';
import { checkPercentage } from '@shared/helpers';
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
    if (checkPercentage(value)) {
      this._performanceShare = value;
    }
  }

  get coresShare() {
    return this._coresShare;
  }

  set coresShare(value: number) {
    if (checkPercentage(value)) {
      this._coresShare = value;
    }
  }

  get ramShare() {
    return this._ramShare;
  }

  set ramShare(value: number) {
    if (checkPercentage(value)) {
      this._ramShare = value;
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
}
