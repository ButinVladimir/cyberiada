import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';

export class StartProgramDevelopmentDialogController extends BaseController {
  startDevelopingProgram(name: ProgramName, level: number, quality: number): boolean {
    return this.mainframeDevelopingProgramsStart.addDevelopingProgram({
      name,
      level,
      quality,
    });
  }
}
