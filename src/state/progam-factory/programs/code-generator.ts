import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeDevelopingProgramsState } from '@state/mainframe/mainframe-developing-programs-state/interfaces/mainframe-developing-programs-state';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { IExponent } from '@shared/interfaces/exponent';
import { calculatePow } from '@shared/helpers';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { ICodeGeneratorParameters } from '../interfaces/program-parameters/code-generator-parameters';
import { BaseProgram } from './base-program';
import { PROGRAMS_UI_EVENTS } from '../constants';

export class CodeGeneratorProgram extends BaseProgram {
  public readonly name = ProgramName.codeGenerator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = false;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeDevelopingProgramsState: IMainframeDevelopingProgramsState;

  constructor(parameters: ICodeGeneratorParameters) {
    super(parameters);

    this._mainframeHardwareState = parameters.mainframeHardwareState;
    this._mainframeDevelopingProgramsState = parameters.mainframeDevelopingProgramsState;

    this._mainframeHardwareState.addStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
  }

  perform(threads: number): void {
    const delta = this.calculateDelta(threads);

    this._mainframeDevelopingProgramsState.increaseDevelopingProgramCompletion(delta);
  }

  removeEventListeners() {
    this._mainframeHardwareState.removeStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
    this.uiEventBatcher.removeAllListeners();
    this.stateEventEmitter.removeAllListeners();
  }

  buildDescriptionParametersObject(threads: number) {
    const delta = this.calculateDelta(threads);

    return {
      value: this.formatter.formatNumberLong(delta),
    };
  }

  calculateDelta(threads: number): number {
    const programData = programs[this.name];

    return (
      threads *
      calculatePow(this.level - 1, programData.dpIncrease as IExponent) *
      Math.pow(programData.dpIncreaseQualityMultiplier, this.quality)
    );
  }

  private handleHardwareUpdate = () => {
    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED);
  };
}
