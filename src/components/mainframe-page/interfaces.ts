import { IHistoryState } from '@shared/interfaces/history-state';
import { MainframePageTabs } from './constants';
import { OverviewMenuItem } from '@shared/types';
import { ProgramName } from '@state/progam-factory/types';

export interface IMainframePageHistoryState extends IHistoryState {
  selectedMenuItem: OverviewMenuItem.mainframe;
  selectedTab?: MainframePageTabs;
  purchaseProgramModalOpen?: boolean;
  startProcessModalOpen?: boolean;
  programName?: ProgramName;
  level?: number;
  quality?: number;
  threads?: number;
}
