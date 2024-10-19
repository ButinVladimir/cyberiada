import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IAppState } from '@state/app-state/interfaces/app-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ICityState } from '@state/city-state/interfaces/city-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeOwnedProgramsState } from '@state/mainframe/mainframe-owned-programs-state/interfaces/mainframe-owned-program-state';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IProgramFactory } from '@state/progam-factory';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { IApp } from '@state/app';
import { IFormatter } from './interfaces/formatter';

export class BaseController<T extends ReactiveControllerHost = ReactiveControllerHost> implements ReactiveController {
  protected host: T;

  constructor(host: T) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  get formatter(): IFormatter {
    return container.get<IFormatter>(TYPES.Formatter);
  }

  protected get app(): IApp {
    return container.get<IApp>(TYPES.App);
  }

  protected get appState(): IAppState {
    return container.get<IAppState>(TYPES.AppState);
  }

  protected get scenarioState(): IScenarioState {
    return container.get<IScenarioState>(TYPES.ScenarioState);
  }

  protected get generalState(): IGeneralState {
    return container.get<IGeneralState>(TYPES.GeneralState);
  }

  protected get growthState(): IGrowthState {
    return container.get<IGrowthState>(TYPES.GrowthState);
  }

  protected get settingsState(): ISettingsState {
    return container.get<ISettingsState>(TYPES.SettingsState);
  }

  protected get cityState(): ICityState {
    return container.get<ICityState>(TYPES.CityState);
  }

  protected get messageLogState(): IMessageLogState {
    return container.get<IMessageLogState>(TYPES.MessageLogState);
  }

  protected get mainframeHardwareState(): IMainframeHardwareState {
    return container.get<IMainframeHardwareState>(TYPES.MainframeHardwareState);
  }

  protected get mainframeOwnedProgramState(): IMainframeOwnedProgramsState {
    return container.get<IMainframeOwnedProgramsState>(TYPES.MainframeOwnedProgramsState);
  }

  protected get mainframeProcessesState(): IMainframeProcessesState {
    return container.get<IMainframeProcessesState>(TYPES.MainframeProcessesState);
  }

  protected get programFactory(): IProgramFactory {
    return container.get<IProgramFactory>(TYPES.ProgramFactory);
  }
}
