import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IMainframeOwnedProgramsState } from '@state/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import type { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import type { IFormatter } from '@shared/interfaces/formatter';
import {
  IMainframeDevelopingProgramsSerializedState,
  IMainframeDevelopingProgramsState,
  IDevelopingProgram,
  ISerializedDevelopingProgram,
} from './interfaces';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { ProgramsEvent } from '@shared/types';
import { DevelopingProgram } from './developing-program';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeDevelopingProgramsState implements IMainframeDevelopingProgramsState {
  private _programFactory: IProgramFactory;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _developingPrograms: IDevelopingProgram[];

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._programFactory = _programFactory;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._developingPrograms = [];

    this._uiEventBatcher = new EventBatcher();
  }

  listDevelopingPrograms(): IDevelopingProgram[] {
    return this._developingPrograms;
  }

  getDevelopingProgramByName(programName: ProgramName): IDevelopingProgram | undefined {
    const developingProgram = this._developingPrograms.find(
      (developingProgram) => developingProgram.program.name === programName,
    );

    return developingProgram;
  }

  addDevelopingProgram(parameters: IMakeProgramParameters): boolean {
    const existingDevelopingProgram = this.getDevelopingProgramByName(parameters.name);

    if (existingDevelopingProgram) {
      const program = this._programFactory.makeProgram(parameters);
      existingDevelopingProgram.update(program);
    } else {
      const developingProgram = this.createDevelopingProgram({
        isActive: true,
        currentDevelopmentPoints: 0,
        programName: parameters.name,
        level: parameters.level,
        quality: parameters.quality,
      });

      this._developingPrograms.push(developingProgram);
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);

    this._messageLogState.postMessage(ProgramsEvent.programDevelopmentStarted, {
      programName: parameters.name,
      level: this._formatter.formatNumberDecimal(parameters.level),
      quality: this._formatter.formatQuality(parameters.quality),
    });

    return true;
  }

  deleteDevelopingProgram(programName: ProgramName): void {
    let index = 0;
    let developingProgram: IDevelopingProgram;

    while (index < this._developingPrograms.length) {
      developingProgram = this._developingPrograms[index];

      if (developingProgram.program.name === programName) {
        developingProgram.removeEventListeners();
        this._programFactory.deleteProgram(developingProgram.program);
        this._developingPrograms.splice(index, 1);

        this._messageLogState.postMessage(ProgramsEvent.programDevelopmentAborted, {
          programName: developingProgram.program.name,
          level: this._formatter.formatNumberDecimal(developingProgram.program.level),
          quality: this._formatter.formatQuality(developingProgram.program.quality),
        });
      } else {
        index++;
      }
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }

  increaseDevelopingProgramCompletion(delta: number) {
    const developingProgram = this._developingPrograms.find((developingProgram) => developingProgram.isActive);

    if (developingProgram) {
      developingProgram.increaseDevelopment(delta);

      if (developingProgram.currentDevelopmentPoints >= developingProgram.program.developmentPoints) {
        developingProgram.removeEventListeners();
        this._mainframeOwnedProgramsState.addProgram(developingProgram.program);

        this._messageLogState.postMessage(ProgramsEvent.programDevelopmentFinished, {
          programName: developingProgram.program.name,
          level: this._formatter.formatNumberDecimal(developingProgram.program.level),
          quality: this._formatter.formatQuality(developingProgram.program.quality),
        });

        this._developingPrograms.shift();
        this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.clearState();

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeDevelopingProgramsSerializedState): Promise<void> {
    this.clearState();

    this._developingPrograms = serializedState.developingPrograms.map(this.createDevelopingProgram);

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }

  serialize(): IMainframeDevelopingProgramsSerializedState {
    return {
      developingPrograms: this._developingPrograms.map((developingProgram) => developingProgram.serialize()),
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();

    for (const developingProgram of this._developingPrograms) {
      developingProgram.fireUiEvents();
    }
  }

  private createDevelopingProgram = (developingProgramParameters: ISerializedDevelopingProgram): IDevelopingProgram => {
    const developingProgram = new DevelopingProgram({
      isActive: developingProgramParameters.isActive,
      program: this._programFactory.makeProgram({
        name: developingProgramParameters.programName,
        level: developingProgramParameters.level,
        quality: developingProgramParameters.quality,
      }),
      currentDevelopmentPoints: developingProgramParameters.currentDevelopmentPoints,
      programFactory: this._programFactory,
    });

    return developingProgram;
  };

  private clearState() {
    for (const developingProgram of this._developingPrograms) {
      developingProgram.removeEventListeners();
      this._programFactory.deleteProgram(developingProgram.program);
    }

    this._developingPrograms = [];
  }
}
