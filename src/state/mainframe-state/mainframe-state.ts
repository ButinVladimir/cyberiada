import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import { IMainframeSerializedState, IMainframeState } from './interfaces';
import type { IMainframeHardwareState } from './states/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProgramsState } from './states/mainframe-programs-state/interfaces/mainframe-programs-state';
import type { IMainframeProcessesState } from './states/mainframe-processes-state/interfaces/mainframe-processes-state';

@injectable()
export class MainframeState implements IMainframeState {
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeProgramsState: IMainframeProgramsState;
  private _mainframeProcessesState: IMainframeProcessesState;

  constructor(
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeProgramsState) _mainframeProgramsState: IMainframeProgramsState,
    @inject(TYPES.MainframeProcessesState) _mainframeProcessesState: IMainframeProcessesState,
  ) {
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeProgramsState = _mainframeProgramsState;
    this._mainframeProcessesState = _mainframeProcessesState;
  }

  get hardware() {
    return this._mainframeHardwareState;
  }

  get programs() {
    return this._mainframeProgramsState;
  }

  get processes() {
    return this._mainframeProcessesState;
  }

  async startNewState(): Promise<void> {
    await this._mainframeHardwareState.startNewState();
    await this._mainframeProgramsState.startNewState();
    await this._mainframeProcessesState.startNewState();
  }

  async deserialize(serializedState: IMainframeSerializedState): Promise<void> {
    await this._mainframeHardwareState.deserialize(serializedState.hardware);
    await this._mainframeProgramsState.deserialize(serializedState.programs);
    await this._mainframeProcessesState.deserialize(serializedState.processes);
  }

  serialize(): IMainframeSerializedState {
    return {
      hardware: this._mainframeHardwareState.serialize(),
      programs: this._mainframeProgramsState.serialize(),
      processes: this._mainframeProcessesState.serialize(),
    };
  }
}
