import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';

export interface IBaseProgramParameters {
  formatter: IFormatter;
  level: number;
  quality: number;
  autoUpgradeEnabled: boolean;
  stateUiConnector: IStateUIConnector;
  globalState: IGlobalState;
  growthState: IGrowthState;
  mainframeState: IMainframeState;
}
