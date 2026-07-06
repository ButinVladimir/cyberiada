import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { ISavefileMainframeValidator } from '../interfaces';
import { IMainframeSerializedState, ISerializedProcess } from '@/state/mainframe-state';

@injectable()
export class SavefileMainframeValidator implements ISavefileMainframeValidator {
  private _currentState!: IMainframeSerializedState;

  validate(state: IMainframeSerializedState): void {
    console.log(`\t\tValidating mainframe serialized state`);

    this._currentState = state;

    this.validateProcesses();
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
}
