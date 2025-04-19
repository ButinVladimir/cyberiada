import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IAppState } from '@state/app-state/interfaces/app-state';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ICityState } from '@state/city-state/interfaces/city-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { INotificationsState } from '@state/notifications-state/interfaces/notifications-state';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { IAutomationState } from '@state/automation-state/interfaces/automation-state';
import { ICompanyState } from '@state/company-state/interfaces/company-state';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { APP_UI_EVENTS, IApp } from '@state/app';
import { IFormatter, IUIEventEmitter, IUIEventListener } from './interfaces';
import { COMMON_UI_EVENTS } from './constants';

export type PartialUpdateFunction = () => void;

export class BaseController<T extends ReactiveControllerHost & HTMLElement = ReactiveControllerHost & HTMLElement>
  implements ReactiveController, IUIEventListener
{
  private static _containerValuesCache = new Map<symbol, any>();

  private static getContainerValue<T>(type: symbol): T {
    let result = BaseController._containerValuesCache.get(type);

    if (!result) {
      result = container.get<T>(type);
      BaseController._containerValuesCache.set(type, result);
    }

    return result;
  }

  protected host: T;

  protected removeEventsEmitterMap: Map<IUIEventEmitter, () => void>;

  protected eventsEmitterMap: Map<IUIEventEmitter, Set<symbol>>;

  private _partialUpdateFn?: PartialUpdateFunction;

  constructor(host: T, partialUpdateFn?: PartialUpdateFunction) {
    this.host = host;
    host.addController(this);

    this.removeEventsEmitterMap = new Map<IUIEventEmitter, () => void>();
    this.eventsEmitterMap = new Map<IUIEventEmitter, Set<symbol>>();

    this._partialUpdateFn = partialUpdateFn;
  }

  hostConnected() {
    for (const [eventEmitter, callback] of this.removeEventsEmitterMap.entries()) {
      eventEmitter.uiEventBatcher.addListener(COMMON_UI_EVENTS.REMOVE_EVENT_LISTENERS_BY_EMITTER, callback);
    }

    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      for (const event of eventSet.values()) {
        eventEmitter.uiEventBatcher.addListener(event, this.handleRefreshUI);
      }
    }

    if (this._partialUpdateFn) {
      this.app.uiEventBatcher.addListener(APP_UI_EVENTS.UI_FRAME_UPDATE, this._partialUpdateFn);
    }
  }

  hostDisconnected() {
    for (const [eventEmitter, callback] of this.removeEventsEmitterMap.entries()) {
      eventEmitter.uiEventBatcher.removeListener(COMMON_UI_EVENTS.REMOVE_EVENT_LISTENERS_BY_EMITTER, callback);
    }

    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      this.clearEventSet(eventEmitter, eventSet);
    }

    if (this._partialUpdateFn) {
      this.app.uiEventBatcher.removeListener(APP_UI_EVENTS.UI_FRAME_UPDATE, this._partialUpdateFn);
    }
  }

  addEventListener(eventEmitter: IUIEventEmitter, event: symbol) {
    if (!this.removeEventsEmitterMap.has(eventEmitter)) {
      const removeEventEmitterCallback = this.handleRemoveEventEmitterCallback(eventEmitter);

      this.removeEventsEmitterMap.set(eventEmitter, removeEventEmitterCallback);
      eventEmitter.uiEventBatcher.addListener(
        COMMON_UI_EVENTS.REMOVE_EVENT_LISTENERS_BY_EMITTER,
        removeEventEmitterCallback,
      );
    }

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
    this.removeEventsEmitterMap.delete(eventEmitter);
  }

  removeAllEventListeners() {
    for (const [eventEmitter, eventSet] of this.eventsEmitterMap.entries()) {
      this.clearEventSet(eventEmitter, eventSet);
    }

    this.eventsEmitterMap.clear();
    this.removeEventsEmitterMap.clear();
  }

  startRendering() {
    this.stateUiConnector.pushEventListener(this);
  }

  stopRendering() {
    this.stateUiConnector.popEventListener();
  }

  protected get stateUiConnector(): IStateUIConnector {
    return BaseController.getContainerValue(TYPES.StateUIConnector);
  }

  public get formatter(): IFormatter {
    return BaseController.getContainerValue(TYPES.Formatter);
  }

  protected get app(): IApp {
    return BaseController.getContainerValue(TYPES.App);
  }

  protected get appState(): IAppState {
    return BaseController.getContainerValue(TYPES.AppState);
  }

  protected get globalState(): IGlobalState {
    return BaseController.getContainerValue(TYPES.GlobalState);
  }

  protected get growthState(): IGrowthState {
    return BaseController.getContainerValue(TYPES.GrowthState);
  }

  protected get settingsState(): ISettingsState {
    return BaseController.getContainerValue(TYPES.SettingsState);
  }

  protected get cityState(): ICityState {
    return BaseController.getContainerValue(TYPES.CityState);
  }

  protected get messageLogState(): IMessageLogState {
    return BaseController.getContainerValue(TYPES.MessageLogState);
  }

  protected get notificationsState(): INotificationsState {
    return BaseController.getContainerValue(TYPES.NotificationsState);
  }

  protected get mainframeState(): IMainframeState {
    return BaseController.getContainerValue(TYPES.MainframeState);
  }

  protected get automationState(): IAutomationState {
    return BaseController.getContainerValue(TYPES.AutomationState);
  }

  protected get companyState(): ICompanyState {
    return BaseController.getContainerValue(TYPES.CompanyState);
  }

  protected handleRefreshUI = (): void => {
    this.host.requestUpdate();
  };

  private clearEventSet(eventEmitter: IUIEventEmitter, eventSet: Set<symbol>) {
    for (const event of eventSet.values()) {
      eventEmitter.uiEventBatcher.removeListener(event, this.handleRefreshUI);
    }
  }

  private handleRemoveEventEmitterCallback = (eventEmitter: IUIEventEmitter) => () => {
    this.removeEventListenersByEmitter(eventEmitter);
  };
}
