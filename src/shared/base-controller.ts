import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IAppState } from '@state/app-state/interfaces/app-state';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ICityState } from '@state/city-state/interfaces/city-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { IProgramFactory } from '@state/progam-factory';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { IAutomationState } from '@state/automation-state';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { IApp } from '@state/app';
import { IFormatter, IUIEventListener, IUIEventEmitter } from './interfaces';

export class BaseController<T extends ReactiveControllerHost = ReactiveControllerHost>
  implements ReactiveController, IUIEventListener
{
  protected host: T;

  protected eventsEmitterMap: Map<IUIEventEmitter, Set<symbol>>;

  constructor(host: T) {
    this.host = host;
    host.addController(this);
    this.eventsEmitterMap = new Map<IUIEventEmitter, Set<symbol>>();
  }

  hostConnected() {
    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      for (const event of eventSet.values()) {
        eventEmitter.uiEventBatcher.addListener(event, this.handleRefreshUI);
      }
    }
  }

  hostDisconnected() {
    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      this.clearEventSet(eventEmitter, eventSet);
    }
  }

  addEventListener(eventEmitter: IUIEventEmitter, event: symbol) {
    let eventSet: Set<symbol> | undefined = this.eventsEmitterMap.get(eventEmitter);

    if (!eventSet) {
      eventSet = new Set<symbol>();
      this.eventsEmitterMap.set(eventEmitter, eventSet);
    }

    if (!eventSet.has(event)) {
      eventSet.add(event);
      eventEmitter.uiEventBatcher.addListener(event, this.handleRefreshUI);
    }
  }

  removeEventListenersByEmitter(eventEmitter: IUIEventEmitter) {
    const eventSet = this.eventsEmitterMap.get(eventEmitter);

    if (eventSet) {
      this.clearEventSet(eventEmitter, eventSet);
    }

    this.eventsEmitterMap.delete(eventEmitter);
  }

  removeAllEventListeners() {
    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      this.clearEventSet(eventEmitter, eventSet);
    }

    this.eventsEmitterMap.clear();
  }

  startRendering() {
    this.stateUiConnector.pushEventListener(this);
  }

  stopRendering() {
    this.stateUiConnector.popEventListener();
  }

  get formatter(): IFormatter {
    return container.get<IFormatter>(TYPES.Formatter);
  }

  protected get stateUiConnector(): IStateUIConnector {
    return container.get<IStateUIConnector>(TYPES.StateUIConnector);
  }

  protected get app(): IApp {
    return container.get<IApp>(TYPES.App);
  }

  protected get appState(): IAppState {
    return container.get<IAppState>(TYPES.AppState);
  }

  protected get globalState(): IGlobalState {
    return container.get<IGlobalState>(TYPES.GlobalState);
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

  protected get notificationsState(): INotificationsState {
    return container.get<INotificationsState>(TYPES.NotificationsState);
  }

  protected get mainframeState(): IMainframeState {
    return container.get<IMainframeState>(TYPES.MainframeState);
  }

  protected get programFactory(): IProgramFactory {
    return container.get<IProgramFactory>(TYPES.ProgramFactory);
  }

  protected get automationState(): IAutomationState {
    return container.get<IAutomationState>(TYPES.AutomationState);
  }

  protected handleRefreshUI = (): void => {
    this.host.requestUpdate();
  };

  private clearEventSet(eventEmitter: IUIEventEmitter, eventSet: Set<symbol>) {
    for (const event of eventSet.values()) {
      eventEmitter.uiEventBatcher.removeListener(event, this.handleRefreshUI);
    }
  }
}
