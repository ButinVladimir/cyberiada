import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { MAINFRAME_HARDWARE_STATE_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { calculatePow } from '@shared/helpers';
import programs from '@configs/programs.json';
import { ProgramName } from '../types';
import { IPredictiveComputatorParameters } from '../interfaces/program-parameters/predictive-computator-parameters';
import { BaseProgram } from './base-program';
import { PROGRAMS_UI_EVENTS } from '../constants';

export class PredictiveComputatorProgram extends BaseProgram {
  public readonly name = ProgramName.predictiveComputator;
  public readonly isRepeatable = true;
  public readonly isAutoscalable = true;

  private _scenarioState: IScenarioState;
  private _mainframeHardwareState: IMainframeHardwareState;

  constructor(parameters: IPredictiveComputatorParameters) {
    super(parameters);

    this._scenarioState = parameters.scenarioState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;

    this._mainframeHardwareState.addStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
  }

  perform(): void {}

  removeEventListeners() {
    this._mainframeHardwareState.removeStateEventListener(
      MAINFRAME_HARDWARE_STATE_EVENTS.HARDWARE_UPDATED,
      this.handleHardwareUpdate,
    );
    this.uiEventBatcher.removeAllListeners();
    this.stateEventEmitter.removeAllListeners();
  }

  buildDescriptionParametersObject(threads: number, usedRam: number) {
    return {
      value: this.calculateProgramCompletionSpeedMultiplier(threads, usedRam),
    };
  }

  calculateProgramCompletionSpeedMultiplier(threads: number, usedRam: number): number {
    const programData = programs[this.name];

    return Math.max(
      1,
      threads *
        usedRam *
        this.level *
        (programData.speedModifierLevelMultiplier as number) *
        Math.pow(programData.speedModifierQualityMultiplier, this.quality) *
        calculatePow(
          this._mainframeHardwareState.performance,
          this._scenarioState.currentValues.mainframeSoftware.performanceBoost,
        ),
    );
  }

  private handleHardwareUpdate = () => {
    this.uiEventBatcher.enqueueEvent(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED);
  };
}
