import { BaseComponent } from '@shared/index';

export interface IStateUIConnector {
  connectComponent(component: BaseComponent): void;
  disconnectComponent(component: BaseComponent): void;
  startRendering(component: BaseComponent): void;
  stopRendering(): void;
  registerEventEmitter(eventEmitter: any, properties: string[]): void;
  unregisterEventEmitter(eventEmitter: any): void;
  fireEvents(): void;
}
