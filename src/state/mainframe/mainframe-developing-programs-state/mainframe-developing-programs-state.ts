import { inject, injectable } from 'inversify';
import { ProgramName } from '@state/progam-factory/types';
import type { IGeneralState } from '@state/general-state/interfaces/general-state';
import type { IMainframeOwnedProgramsState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
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
  private _generalState: IGeneralState;
  private _mainframeOwnedProgramsState: IMainframeOwnedProgramsState;
  private _messageLogState: IMessageLogState;
  private _formatter: IFormatter;

  private _developingProgramsList: ProgramName[];
  private _developingProgramsMap: Map<ProgramName, IDevelopingProgram>;

  private readonly _uiEventBatcher: EventBatcher;

  constructor(
    @inject(TYPES.ProgramFactory) _programFactory: IProgramFactory,
    @inject(TYPES.GeneralState) _generalState: IGeneralState,
    @inject(TYPES.MainframeOwnedProgramsState) _mainframeOwnedProgramsState: IMainframeOwnedProgramsState,
    @inject(TYPES.MessageLogState) _messageLogState: IMessageLogState,
    @inject(TYPES.Formatter) _formatter: IFormatter,
  ) {
    this._programFactory = _programFactory;
    this._generalState = _generalState;
    this._mainframeOwnedProgramsState = _mainframeOwnedProgramsState;
    this._messageLogState = _messageLogState;
    this._formatter = _formatter;

    this._developingProgramsList = [];
    this._developingProgramsMap = new Map<ProgramName, IDevelopingProgram>();

    this._uiEventBatcher = new EventBatcher();
  }

  listDevelopingPrograms(): ProgramName[] {
    return this._developingProgramsList;
  }

  getDevelopingProgramByName(programName: ProgramName): IDevelopingProgram | undefined {
    return this._developingProgramsMap.get(programName);
  }

  addDevelopingProgram(parameters: IMakeProgramParameters): boolean {
    if (parameters.level > this._generalState.cityLevel) {
      throw new Error(`Cannot develop program ${parameters.name} with level above city level`);
    }

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

      this._developingProgramsList.push(parameters.name);
      this._developingProgramsMap.set(parameters.name, developingProgram);
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
    const developingProgram: IDevelopingProgram | undefined = this.getDevelopingProgramByName(programName);

    let index = 0;

    while (index < this._developingProgramsList.length) {
      if (this._developingProgramsList[index] === programName) {
        this._developingProgramsList.splice(index, 1);
      } else {
        index++;
      }
    }

    if (developingProgram) {
      developingProgram.removeEventListeners();
      this._programFactory.deleteProgram(developingProgram.program);

      this._developingProgramsMap.delete(programName);

      this._messageLogState.postMessage(ProgramsEvent.programDevelopmentAborted, {
        programName,
        level: this._formatter.formatNumberDecimal(developingProgram.program.level),
        quality: this._formatter.formatQuality(developingProgram.program.quality),
      });
    }

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }

  increaseDevelopingProgramCompletion(delta: number) {
    const developingProgramName = this._developingProgramsList.find(
      (programName) => this.getDevelopingProgramByName(programName)?.isActive,
    );

    if (developingProgramName) {
      const developingProgram = this.getDevelopingProgramByName(developingProgramName)!;
      developingProgram.increaseDevelopment(delta);

      if (developingProgram.currentDevelopmentPoints >= developingProgram.program.developmentPoints) {
        developingProgram.removeEventListeners();
        this._mainframeOwnedProgramsState.addProgram(developingProgram.program);

        this._messageLogState.postMessage(ProgramsEvent.programDevelopmentFinished, {
          programName: developingProgram.program.name,
          level: this._formatter.formatNumberDecimal(developingProgram.program.level),
          quality: this._formatter.formatQuality(developingProgram.program.quality),
        });

        this._developingProgramsList.shift();
        this._developingProgramsMap.delete(developingProgramName);
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

    serializedState.developingPrograms.forEach((serializedDevelopingProgram) => {
      this._developingProgramsMap.set(
        serializedDevelopingProgram.programName,
        this.createDevelopingProgram(serializedDevelopingProgram),
      );
      this._developingProgramsList.push(serializedDevelopingProgram.programName);
    });

    this._uiEventBatcher.enqueueEvent(MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED);
  }

  serialize(): IMainframeDevelopingProgramsSerializedState {
    return {
      developingPrograms: this._developingProgramsList.map((programName) =>
        this.getDevelopingProgramByName(programName)!.serialize(),
      ),
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

    for (const developingProgram of this._developingProgramsMap.values()) {
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
    for (const developingProgram of this._developingProgramsMap.values()) {
      developingProgram.removeEventListeners();
      this._programFactory.deleteProgram(developingProgram.program);
    }

    this._developingProgramsList = [];
    this._developingProgramsMap.clear();
  }
}
