import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IAutomationSerializedState, IAutomationState } from './interfaces';
import type {
  IMainframeHardwareAutomationState,
  IMainframeProgramsAutomationState,
  ICloneLevelAutomationState,
} from './states';

@injectable()
export class AutomationState implements IAutomationState {
  private _mainframeHardwareAutomationState: IMainframeHardwareAutomationState;
  private _mainframeProgramsAutomationState: IMainframeProgramsAutomationState;
  private _cloneLevelAutomationState: ICloneLevelAutomationState;

  constructor(
    @inject(TYPES.MainframeHardwareAutomationState)
    _mainframeHardwareAutomationState: IMainframeHardwareAutomationState,
    @inject(TYPES.MainframeProgramsAutomationState)
    _mainframeProgramsAutomationState: IMainframeProgramsAutomationState,
    @inject(TYPES.CloneLevelAutomationState)
    _cloneLevelAutomationState: ICloneLevelAutomationState,
  ) {
    this._mainframeHardwareAutomationState = _mainframeHardwareAutomationState;
    this._mainframeProgramsAutomationState = _mainframeProgramsAutomationState;
    this._cloneLevelAutomationState = _cloneLevelAutomationState;
  }

  get mainframeHardware() {
    return this._mainframeHardwareAutomationState;
  }

  get mainframePrograms() {
    return this._mainframeProgramsAutomationState;
  }

  get cloneLevel() {
    return this._cloneLevelAutomationState;
  }

  async startNewState(): Promise<void> {
    await this._mainframeHardwareAutomationState.startNewState();
    await this._mainframeProgramsAutomationState.startNewState();
    await this._cloneLevelAutomationState.startNewState();
  }

  async deserialize(serializedState: IAutomationSerializedState): Promise<void> {
    await this._mainframeHardwareAutomationState.deserialize(serializedState.mainframeHardware);
    await this._mainframeProgramsAutomationState.deserialize(serializedState.mainframePrograms);
    await this._cloneLevelAutomationState.deserialize(serializedState.cloneLevel);
  }

  serialize(): IAutomationSerializedState {
    return {
      mainframeHardware: this._mainframeHardwareAutomationState.serialize(),
      mainframePrograms: this._mainframeProgramsAutomationState.serialize(),
      cloneLevel: this._cloneLevelAutomationState.serialize(),
    };
  }
}
