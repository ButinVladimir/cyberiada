import { injectable } from 'inversify';
import { IStateUIConnector } from './interfaces';
import { BaseComponent } from '@shared/index';
import { PARTIAL_UPDATE_UI_EVENT } from './constants';

@injectable()
export class StateUIConnector implements IStateUIConnector {
  private _componentEventsMap: WeakMap<BaseComponent, Set<symbol>>;
  private _eventComponentsMap: Map<symbol, Set<BaseComponent>>;
  private _currentlyRenderingComponent?: BaseComponent;
  private _enqueuedEvents: Set<symbol>;

  constructor() {
    this._componentEventsMap = new WeakMap<BaseComponent, Set<symbol>>();
    this._eventComponentsMap = new Map<symbol, Set<BaseComponent>>();
    this._enqueuedEvents = new Set<symbol>();

    this._eventComponentsMap.set(PARTIAL_UPDATE_UI_EVENT, new Set<BaseComponent>());
  }

  connectComponent(component: BaseComponent): void {
    const currentEvents = this._componentEventsMap.get(component);

    if (currentEvents) {
      currentEvents.forEach((event) => {
        this._eventComponentsMap.get(event)?.add(component);
      });
    } else {
      this._componentEventsMap.set(component, new Set<symbol>());
    }
  }

  disconnectComponent(component: BaseComponent): void {
    const currentEvents = this._componentEventsMap.get(component);

    currentEvents?.forEach((event) => {
      this._eventComponentsMap.get(event)?.delete(component);
    });
  }

  startRendering(component: BaseComponent): void {
    this._currentlyRenderingComponent = component;

    const currentEvents = this._componentEventsMap.get(component);

    currentEvents?.forEach((event) => {
      this._eventComponentsMap.get(event)?.delete(component);
    });

    currentEvents?.clear();
  }

  stopRendering() {
    if (this._currentlyRenderingComponent?.hasPartialUpdate) {
      this.connectEventHandler(PARTIAL_UPDATE_UI_EVENT);
    }

    this._currentlyRenderingComponent = undefined;
  }

  registerEvents(events: Record<any, symbol>): void {
    Object.values(events).forEach((event) => {
      if (!this._eventComponentsMap.has(event)) {
        this._eventComponentsMap.set(event, new Set<BaseComponent>());
      }
    });
  }

  unregisterEvents(events: Record<any, symbol>): void {
    Object.values(events).forEach((event) => {
      const components = this._eventComponentsMap.get(event);

      components?.forEach((component) => {
        this._componentEventsMap.get(component)?.delete(event);
      });

      components?.clear();

      this._eventComponentsMap.delete(event);
    });
  }

  connectEventHandler(event: symbol): void {
    if (this._currentlyRenderingComponent) {
      this._eventComponentsMap.get(event)?.add(this._currentlyRenderingComponent);
      this._componentEventsMap.get(this._currentlyRenderingComponent)?.add(event);
    }
  }

  enqueueEvent(event: symbol): void {
    this._enqueuedEvents.add(event);
  }

  fireEvents(): void {
    this.enqueueEvent(PARTIAL_UPDATE_UI_EVENT);

    this._enqueuedEvents.forEach((event) => {
      this._eventComponentsMap.get(event)?.forEach((component) => {
        component.requestUpdate();
      });
    });

    this._enqueuedEvents.clear();
  }
}
