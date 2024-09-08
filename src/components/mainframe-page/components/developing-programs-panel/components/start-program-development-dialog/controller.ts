import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { PROGRAMS_UI_EVENTS } from '@/state/progam-factory/constants';

export class StartProgramDevelopmentDialogController extends BaseController {
  private _selectedProgram?: IProgram;

  hostConnected() {}

  hostDisconnected() {
    if (this._selectedProgram) {
      this.programFactory.deleteProgram(this._selectedProgram);
    }
  }

  getProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.level !== level ||
      this._selectedProgram.quality !== quality
    ) {
      if (this._selectedProgram) {
        this.programFactory.deleteProgram(this._selectedProgram);
      }

      this._selectedProgram = this.programFactory.makeProgram({
        name,
        level,
        quality,
      });

      this._selectedProgram.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }

    return this._selectedProgram;
  }

  startDevelopingProgram(name: ProgramName, level: number, quality: number): boolean {
    return this.mainframeDevelopingProgramsState.addDevelopingProgram({
      name,
      level,
      quality,
    });
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
