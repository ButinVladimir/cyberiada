import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IAutomationSerializedState, IAutomationState } from './interfaces';
import type { IMainframeHardwareAutomationState } from './states/mainframe-hardware-automation-state/interfaces/mainframe-hardware-automation-state';
import type { IMainframeProgramsAutomationState } from './states/mainframe-programs-automation-state/interfaces/mainframe-programs-automation-state';

@injectable()
export class AutomationState implements IAutomationState {
  private _mainframeHardwareAutomationState: IMainframeHardwareAutomationState;
  private _mainframeProgramsAutomationState: IMainframeProgramsAutomationState;

  constructor(
    @inject(TYPES.MainframeHardwareAutomationState)
    _mainframeHardwareAutomationState: IMainframeHardwareAutomationState,
    @inject(TYPES.MainframeProgramsAutomationState)
    _mainframeProgramsAutomationState: IMainframeProgramsAutomationState,
  ) {
    this._mainframeHardwareAutomationState = _mainframeHardwareAutomationState;
    this._mainframeProgramsAutomationState = _mainframeProgramsAutomationState;
  }

  get mainframeHardware() {
    return this._mainframeHardwareAutomationState;
  }

  get mainframePrograms() {
    return this._mainframeProgramsAutomationState;
  }

  async startNewState(): Promise<void> {
    await this._mainframeHardwareAutomationState.startNewState();
    await this._mainframeProgramsAutomationState.startNewState();
  }

  async deserialize(serializedState: IAutomationSerializedState): Promise<void> {
    await this._mainframeHardwareAutomationState.deserialize(serializedState.mainframeHardware);
    await this._mainframeProgramsAutomationState.deserialize(serializedState.mainframePrograms);
  }

  serialize(): IAutomationSerializedState {
    return {
      mainframeHardware: this._mainframeHardwareAutomationState.serialize(),
      mainframePrograms: this._mainframeProgramsAutomationState.serialize(),
    };
  }
}
