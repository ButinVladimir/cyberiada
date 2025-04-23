import { msg } from '@lit/localize';
import { type MessageEvent, GameStateEvent, PurchaseEvent, ProgramsEvent, ClonesEvent } from '@shared/types';

export const MESSAGE_EVENT_NAMES: Record<MessageEvent, () => string> = {
  [GameStateEvent.gameStarted]: () => msg('Game started'),
  [GameStateEvent.gameSaved]: () => msg('Game saved'),
  [GameStateEvent.fastForwared]: () => msg('Accumulated time spent'),
  [GameStateEvent.levelReached]: () => msg('Development level reached'),
  [PurchaseEvent.performanceUpgraded]: () => msg('Mainframe performance upgraded'),
  [PurchaseEvent.coresUpgraded]: () => msg('Mainframe cores upgraded'),
  [PurchaseEvent.ramUpgraded]: () => msg('Mainframe ram upgraded'),
  [PurchaseEvent.programPurchased]: () => msg('Program purchased'),
  [PurchaseEvent.clonePurchased]: () => msg('Clone purchased'),
  [ProgramsEvent.processStarted]: () => msg('Process started'),
  [ProgramsEvent.processDeleted]: () => msg('Process deleted'),
  [ProgramsEvent.allProcessesDeleted]: () => msg('All processes deleted'),
  [ClonesEvent.cloneDeleted]: () => msg('Clone deleted'),
  [ClonesEvent.allClonesDeleted]: () => msg('All clones deleted'),
  [ClonesEvent.cloneLevelReached]: () => msg('Clone reached next level'),
  [ClonesEvent.cloneRenamed]: () => msg('Clone renamed'),
};
