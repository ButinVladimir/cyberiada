import { BaseComponent } from '@shared/index';

export interface IStateUIConnector {
  connectComponent(component: BaseComponent): void;
  disconnectComponent(component: BaseComponent): void;
  startRendering(component: BaseComponent): void;
  stopRendering(): void;
  registerEvents(events: Record<any, symbol>): void;
  unregisterEvents(event: Record<any, symbol>): void;
  registerEventEmitter(eventEmitter: any, properties: string[]): void;
  unregisterEventEmitter(eventEmitter: any): void;
  connectEvent(event: symbol): void;
  enqueueEvent(event: symbol): void;
  fireEvents(): void;
}
