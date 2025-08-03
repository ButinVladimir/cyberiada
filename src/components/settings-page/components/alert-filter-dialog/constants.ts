import { msg } from '@lit/localize';
import { GameStateAlert, ProgramAlert, CloneAlert, SidejobAlert, GameAlertGroup } from '@shared/index';

export const GAME_ALERT_GROUP_NAMES = {
  [GameAlertGroup.gameState]: () => msg('Game state alerts'),
  [GameAlertGroup.programs]: () => msg('Programs alerts'),
  [GameAlertGroup.clones]: () => msg('Clones alerts'),
  [GameAlertGroup.sidejobs]: () => msg('Sidejobs alerts'),
};

export const GAME_ALERT_NAMES = {
  [GameStateAlert.saveImport]: () => msg('Import savefile'),
  [GameStateAlert.saveDelete]: () => msg('Delete save data'),
  [GameStateAlert.clearMessages]: () => msg('Clear log messages'),
  [GameStateAlert.fastForward]: () => msg('Spend accumulated time'),
  [GameStateAlert.unassignHotkeys]: () => msg('Unassign hotkeys'),
  [GameStateAlert.restoreDefaultHotkeys]: () => msg('Restore default hotkeys'),
  [GameStateAlert.restoreDefaultSettings]: () => msg('Restore default settings'),
  [ProgramAlert.purchaseProgramOverwrite]: () => msg('Purchase an already owned program'),
  [ProgramAlert.processReplace]: () => msg('Replace a process'),
  [ProgramAlert.processDelete]: () => msg('Delete a process'),
  [ProgramAlert.deleteAllProcesses]: () => msg('Delete all process'),
  [ProgramAlert.scalableProcessReplace]: () => msg('Replace a autoscalable process'),
  [CloneAlert.cloneDelete]: () => msg('Delete a clone'),
  [CloneAlert.deleteAllClones]: () => msg('Delete all clones'),
  [SidejobAlert.sidejobCancel]: () => msg('Cancel an assigned sidejob'),
  [SidejobAlert.cancelAllSidejobs]: () => msg('Cancel all sidejobs'),
  [SidejobAlert.replaceSidejob]: () => msg('Replace an assigned sidejob'),
};
