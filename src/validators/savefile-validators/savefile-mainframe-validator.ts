import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { ISavefileMainframeValidator } from '../interfaces';
import { IMainframeSerializedState, ISerializedProcess, ProgramName } from '@/state/mainframe-state';

@injectable()
export class SavefileMainframeValidator implements ISavefileMainframeValidator {
  private _currentState!: IMainframeSerializedState;

  validate(state: IMainframeSerializedState): void {
    console.log(`\t\tValidating mainframe serialized state`);

    this._currentState = state;

    this.validateProcesses();
    this.validateProgramsUniqueness();
    this.validateProcessesUniqueness();
  }

  private validateProcesses() {
    for (const process of this._currentState.processes.processes) {
      this.validateProcess(process);
    }
  }

  private validateProcess(process: ISerializedProcess) {
    if (!this._currentState.programs.ownedPrograms.find((program) => program.name === process.programName)) {
      console.log(
        `\t\t\tProcess for program ${styleText('cyanBright', process.programName)} does ${styleText('redBright', 'not have an owned program')}`,
      );
    }
  }

  private validateProgramsUniqueness() {
    const names = new Set<ProgramName>();

    for (const program of this._currentState.programs.ownedPrograms) {
      if (names.has(program.name)) {
        console.log(
          `\t\t\tOwned program ${styleText('cyanBright', program.name)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      names.add(program.name);
    }
  }

  private validateProcessesUniqueness() {
    const names = new Set<ProgramName>();

    for (const process of this._currentState.processes.processes) {
      if (names.has(process.programName)) {
        console.log(
          `\t\t\tProcess for program ${styleText('cyanBright', process.programName)} is ${styleText('redBright', 'not unique')}`,
        );
      }

      names.add(process.programName);
    }
  }
}
