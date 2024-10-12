import { App, IApp } from '@state/app';
import { AppState, IAppState } from '@state/app-state';
import { ScenarioState, IScenarioState } from '@state/scenario-state';
import { GeneralState, IGeneralState } from '@state/general-state';
import { SettingsState, ISettingsState } from '@state/settings-state';
import { CityState, ICityState } from '@state/city-state';
import { IMessageLogState, MessageLogState } from '@state/message-log-state';
import { IProgramFactory, ProgramFactory } from '@state/progam-factory';
import { IMainframeHardwareState, MainframeHardwareState } from '@state/mainframe/mainframe-hardware-state';
import {
  IMainframeOwnedProgramsState,
  MainframeOwnedProgramsState,
} from '@state/mainframe/mainframe-owned-programs-state';
import { IMainframeProcessesState, MainframeProcessesState } from '@state/mainframe/mainframe-processes-state';
import {
  IMainframeDevelopingProgramsState,
  MainframeDevelopingProgramsState,
} from '@state/mainframe/mainframe-developing-programs-state';
import { IGrowthState, GrowthState } from '@state/growth-state';
import { Formatter } from '@shared/formatter';
import { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from './types';
import { container } from './container';

container.bind<IApp>(TYPES.App).to(App).inSingletonScope().whenTargetIsDefault();

container.bind<IAppState>(TYPES.AppState).to(AppState).inSingletonScope().whenTargetIsDefault();

container.bind<IGeneralState>(TYPES.GeneralState).to(GeneralState).inSingletonScope().whenTargetIsDefault();

container.bind<IScenarioState>(TYPES.ScenarioState).to(ScenarioState).inSingletonScope().whenTargetIsDefault();

container.bind<ISettingsState>(TYPES.SettingsState).to(SettingsState).inSingletonScope().whenTargetIsDefault();

container.bind<ICityState>(TYPES.CityState).to(CityState).inSingletonScope().whenTargetIsDefault();

container.bind<IMessageLogState>(TYPES.MessageLogState).to(MessageLogState).inSingletonScope().whenTargetIsDefault();

container.bind<IProgramFactory>(TYPES.ProgramFactory).to(ProgramFactory).inSingletonScope().whenTargetIsDefault();

container
  .bind<IMainframeHardwareState>(TYPES.MainframeHardwareState)
  .to(MainframeHardwareState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeOwnedProgramsState>(TYPES.MainframeOwnedProgramsState)
  .to(MainframeOwnedProgramsState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeProcessesState>(TYPES.MainframeProcessesState)
  .to(MainframeProcessesState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeDevelopingProgramsState>(TYPES.MainframeDevelopingProgramsState)
  .to(MainframeDevelopingProgramsState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IFormatter>(TYPES.Formatter).to(Formatter).inSingletonScope().whenTargetIsDefault();

container.bind<IGrowthState>(TYPES.GrowthState).to(GrowthState).inSingletonScope().whenTargetIsDefault();
