import { msg } from '@lit/localize';
import { GameStateAlert, ProgramAlert, CloneAlert, type GameAlert } from '@shared/types';

export const ALERT_NAMES: Record<GameAlert, () => string> = {
  [GameStateAlert.saveImport]: () => msg('Import savefile'),
  [GameStateAlert.saveDelete]: () => msg('Delete save data'),
  [GameStateAlert.clearMessages]: () => msg('Clear log messages'),
  [GameStateAlert.fastForward]: () => msg('Spend accumulated time'),
  [ProgramAlert.purchaseProgramOverwrite]: () => msg('Purchase an already owned program'),
  [ProgramAlert.processReplace]: () => msg('Replace a process'),
  [ProgramAlert.processDelete]: () => msg('Delete a process'),
  [ProgramAlert.deleteAllProcesses]: () => msg('Delete all process'),
  [ProgramAlert.scalableProcessReplace]: () => msg('Replace a autoscalable process'),
  [CloneAlert.cloneDelete]: () => msg('Delete a clone'),
  [CloneAlert.deleteAllClones]: () => msg('Delete all clones'),
};
