import { msg } from '@lit/localize';
import { GameStateEvent, ProgramsEvent, ClonesEvent, SidejobsEvent, CityEvent, MessageEventGroup } from '@shared/index';

export const MESSAGE_EVENT_GROUP_NAMES = {
  [MessageEventGroup.gameState]: () => msg('Game state events'),
  [MessageEventGroup.programs]: () => msg('Programs events'),
  [MessageEventGroup.clones]: () => msg('Clones events'),
  [MessageEventGroup.sidejobs]: () => msg('Sidejobs events'),
  [MessageEventGroup.city]: () => msg('City events'),
};

export const MESSAGE_EVENT_NAMES = {
  [GameStateEvent.gameStarted]: () => msg('Game started'),
  [GameStateEvent.gameSaved]: () => msg('Game saved'),
  [GameStateEvent.fastForwared]: () => msg('Accumulated time spent'),
  [GameStateEvent.levelReached]: () => msg('Development level reached'),
  [ProgramsEvent.performanceUpgraded]: () => msg('Mainframe performance upgraded'),
  [ProgramsEvent.coresUpgraded]: () => msg('Mainframe cores upgraded'),
  [ProgramsEvent.ramUpgraded]: () => msg('Mainframe ram upgraded'),
  [ProgramsEvent.programPurchased]: () => msg('Program purchased'),
  [ProgramsEvent.processStarted]: () => msg('Process started'),
  [ProgramsEvent.processDeleted]: () => msg('Process deleted'),
  [ProgramsEvent.allProcessesDeleted]: () => msg('All processes deleted'),
  [ClonesEvent.clonePurchased]: () => msg('Clone purchased'),
  [ClonesEvent.cloneLevelUpgraded]: () => msg('Clone level upgraded'),
  [ClonesEvent.cloneDeleted]: () => msg('Clone deleted'),
  [ClonesEvent.allClonesDeleted]: () => msg('All clones deleted'),
  [ClonesEvent.cloneLevelReached]: () => msg('Clone reached next level'),
  [ClonesEvent.cloneRenamed]: () => msg('Clone renamed'),
  [SidejobsEvent.sidejobAssigned]: () => msg('Sidejob assigned'),
  [SidejobsEvent.sidejobCancelled]: () => msg('Sidejob cancelled'),
  [SidejobsEvent.allSidejobsCancelled]: () => msg('All sidejobs cancelled'),
  [CityEvent.districtTierIncreased]: () => msg('City district tier increased'),
};
