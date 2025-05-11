import { BaseComponent } from '@shared/index';

export interface IStateUIConnector {
  connectComponent(component: BaseComponent): void;
  disconnectComponent(component: BaseComponent): void;
  startRendering(component: BaseComponent): void;
  stopRendering(): void;
  registerEvents(events: Record<any, symbol>): void;
  unregisterEvents(event: Record<any, symbol>): void;
  connectEventHandler(event: symbol): void;
  enqueueEvent(event: symbol): void;
  fireEvents(): void;
}
