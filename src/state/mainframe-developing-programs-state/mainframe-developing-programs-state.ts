import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IMainframeOwnedProgramsState } from '@state/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import type { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import type { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';
import type { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import {
  IMainframeDevelopingProgramsSerializedState,
  IMainframeDevelopingProgramsState,
  IDevelopingProgram,
  ISerializedDevelopingProgram,
} from './interfaces';
import { TYPES } from '@state/types';
import { EventBatcher } from '@shared/event-batcher';
import { ProgramsEvent } from '@shared/types';
import { formatter } from '@shared/formatter';
import { DevelopingProgram } from './developing-program';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from './constants';

@injectable()
export class MainframeDevelopingProgramsState implements IMainframeDevelopingProgramsState {
  private _programFactory: IProgramFactory;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _messageLogState: IMessageLogState;

  private _developingPrograms: IDevelopingProgram[];

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
  ) {
    this._programFactory = _programFactory;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._messageLogState = _messageLogState;

    this._developingPrograms = [];

    this._uiEventBatcher = new EventBatcher();
  }

  listDevelopingPrograms(): IDevelopingProgram[] {
    return this._developingPrograms;
  }

  getDevelopingProgramByName(programName: ProgramName): IDevelopingProgram {
    const developingProgram = this._developingPrograms.find(
      (developingProgram) => developingProgram.program.name === programName,
    );

    if (!developingProgram) {
      throw new Error(`Developing program ${programName} is not found`);
    }

    return developingProgram;
  }

  addDevelopingProgram(parameters: IMakeProgramParameters): boolean {
    const program = this._programFactory.makeProgram(parameters);

    this.deleteDevelopingProgram(parameters.name);

    const developingProgram = new DevelopingProgram({
      isActive: true,
      currentDevelopmentPoints: 0,
      program: program,
      mainframeDevelopingProgramsState: this,
    });

    this._developingPrograms.push(developingProgram);

    this.enqueueUiUpdate();
    this.fireUiEvents();

    this._messageLogState.postMessage(ProgramsEvent.programDevelopmentStarted, {
      programName: program.name,
      level: formatter.formatNumberDecimal(program.level),
      quality: formatter.formatQuality(program.quality),
    });

    return true;
  }

  deleteDevelopingProgram(programName: ProgramName): void {
    let index = 0;
    let developingProgram: IDevelopingProgram;

    while (index < this._developingPrograms.length) {
      developingProgram = this._developingPrograms[index];

      if (developingProgram.program.name === programName) {
        this._developingPrograms.splice(index, 1);

        this._messageLogState.postMessage(ProgramsEvent.programDevelopmentAborted, {
          programName: developingProgram.program.name,
          level: formatter.formatNumberDecimal(developingProgram.program.level),
          quality: formatter.formatQuality(developingProgram.program.quality),
        });
      } else {
        index++;
      }
    }

    this.enqueueUiUpdate();
    this.fireUiEvents();
  }

  increaseDevelopingProgramCompletion(delta: number) {
    const developingProgram = this._developingPrograms.find((developingProgram) => developingProgram.isActive);

    if (developingProgram) {
      developingProgram.increaseDevelopment(delta);

      if (developingProgram.currentDevelopmentPoints >= developingProgram.maxDevelopmentPoints) {
        this._mainframeOwnedProgramsState.addProgram(developingProgram.program);

        this._messageLogState.postMessage(ProgramsEvent.programDevelopmentFinished, {
          programName: developingProgram.program.name,
          level: formatter.formatNumberDecimal(developingProgram.program.level),
          quality: formatter.formatQuality(developingProgram.program.quality),
        });

        this._developingPrograms.shift();
        this.enqueueUiUpdate();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._developingPrograms = [];
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMainframeDevelopingProgramsSerializedState): Promise<void> {
    this._developingPrograms = serializedState.developingPrograms.map(
      (serializedDevelopingProgram: ISerializedDevelopingProgram) =>
        new DevelopingProgram({
          isActive: serializedDevelopingProgram.isActive,
          program: this._programFactory.makeProgram({
            name: serializedDevelopingProgram.programName,
            level: serializedDevelopingProgram.level,
            quality: serializedDevelopingProgram.quality,
          }),
          currentDevelopmentPoints: serializedDevelopingProgram.currentDevelopmentPoints,
          mainframeDevelopingProgramsState: this,
        }),
    );

    this.enqueueUiUpdate();
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
  }

  private enqueueUiUpdate() {
    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }
}
