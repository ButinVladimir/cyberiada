import { IStateUIConnector, StateUIConnector } from '@state/state-ui-connector';
import { App, IApp } from '@state/app';
import { AppState, IAppState } from '@state/app-state';
import {
  IGlobalState,
  GlobalState,
  ScenarioState,
  IScenarioState,
  ITimeState,
  TimeState,
  IDevelopmentState,
  DevelopmentState,
  IMoneyState,
  MoneyState,
  ICodeBaseState,
  CodeBaseState,
  IStoryEventsState,
  StoryEventsState,
  IUnlockedFeaturesState,
  UnlockedFeaturesState,
} from '@state/global-state';
import {
  IGrowthState,
  GrowthState,
  IMoneyGrowthState,
  MoneyGrowthState,
  IDevelopmentGrowthState,
  DevelopmentGrowthState,
  ICodeBaseGrowthState,
  CodeBaseGrowthState,
  IProgramCompletionSpeedState,
  ProgramCompletionSpeedState,
} from '@state/growth-state';
import { SettingsState, ISettingsState } from '@state/settings-state';
import { CityState, ICityState } from '@state/city-state';
import { IMessageLogState, MessageLogState } from '@state/message-log-state';
import { IProgramFactory, ProgramFactory } from '@state/progam-factory';
import {
  IMainframeHardwareState,
  MainframeHardwareState,
  IMainframeProgramsState,
  MainframeProgramsState,
  IMainframeProcessesState,
  MainframeProcessesState,
  IMainframeState,
  MainframeState,
} from '@state/mainframe-state';
import {
  IMainframeHardwareAutomationState,
  MainframeHardwareAutomationState,
  IMainframeProgramsAutomationState,
  MainframeProgramsAutomationState,
  IAutomationState,
  AutomationState,
} from '@state/automation-state';
import { INotificationsState, NotificationsState } from '@state/notifications-state';
import { Formatter } from '@shared/formatter';
import { IFormatter } from '@shared/interfaces/formatter';
import { TYPES } from './types';
import { container } from './container';

container.bind<IStateUIConnector>(TYPES.StateUIConnector).to(StateUIConnector).inSingletonScope().whenTargetIsDefault();

container.bind<IApp>(TYPES.App).to(App).inSingletonScope().whenTargetIsDefault();

container.bind<IAppState>(TYPES.AppState).to(AppState).inSingletonScope().whenTargetIsDefault();

container.bind<ITimeState>(TYPES.TimeState).to(TimeState).inSingletonScope().whenTargetIsDefault();

container.bind<IDevelopmentState>(TYPES.DevelopmentState).to(DevelopmentState).inSingletonScope().whenTargetIsDefault();

container.bind<IMoneyState>(TYPES.MoneyState).to(MoneyState).inSingletonScope().whenTargetIsDefault();

container.bind<ICodeBaseState>(TYPES.CodeBaseState).to(CodeBaseState).inSingletonScope().whenTargetIsDefault();

container.bind<IScenarioState>(TYPES.ScenarioState).to(ScenarioState).inSingletonScope().whenTargetIsDefault();

container.bind<IStoryEventsState>(TYPES.StoryEventsState).to(StoryEventsState).inSingletonScope().whenTargetIsDefault();

container
  .bind<IUnlockedFeaturesState>(TYPES.UnlockedFeaturesState)
  .to(UnlockedFeaturesState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IGlobalState>(TYPES.GlobalState).to(GlobalState).inSingletonScope().whenTargetIsDefault();

container.bind<IMoneyGrowthState>(TYPES.MoneyGrowthState).to(MoneyGrowthState).inSingletonScope().whenTargetIsDefault();

container
  .bind<IDevelopmentGrowthState>(TYPES.DevelopmentGrowthState)
  .to(DevelopmentGrowthState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<ICodeBaseGrowthState>(TYPES.CodeBaseGrowthState)
  .to(CodeBaseGrowthState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IProgramCompletionSpeedState>(TYPES.ProgramCompletionSpeedState)
  .to(ProgramCompletionSpeedState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IGrowthState>(TYPES.GrowthState).to(GrowthState).inSingletonScope().whenTargetIsDefault();

container.bind<ISettingsState>(TYPES.SettingsState).to(SettingsState).inSingletonScope().whenTargetIsDefault();

container.bind<ICityState>(TYPES.CityState).to(CityState).inSingletonScope().whenTargetIsDefault();

container.bind<IMessageLogState>(TYPES.MessageLogState).to(MessageLogState).inSingletonScope().whenTargetIsDefault();

container
  .bind<INotificationsState>(TYPES.NotificationsState)
  .to(NotificationsState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IProgramFactory>(TYPES.ProgramFactory).to(ProgramFactory).inSingletonScope().whenTargetIsDefault();

container
  .bind<IMainframeHardwareState>(TYPES.MainframeHardwareState)
  .to(MainframeHardwareState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeProgramsState>(TYPES.MainframeProgramsState)
  .to(MainframeProgramsState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeProcessesState>(TYPES.MainframeProcessesState)
  .to(MainframeProcessesState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IMainframeState>(TYPES.MainframeState).to(MainframeState).inSingletonScope().whenTargetIsDefault();

container
  .bind<IMainframeHardwareAutomationState>(TYPES.MainframeHardwareAutomationState)
  .to(MainframeHardwareAutomationState)
  .inSingletonScope()
  .whenTargetIsDefault();

container
  .bind<IMainframeProgramsAutomationState>(TYPES.MainframeProgramsAutomationState)
  .to(MainframeProgramsAutomationState)
  .inSingletonScope()
  .whenTargetIsDefault();

container.bind<IAutomationState>(TYPES.AutomationState).to(AutomationState).inSingletonScope().whenTargetIsDefault();

container.bind<IFormatter>(TYPES.Formatter).to(Formatter).inSingletonScope().whenTargetIsDefault();
