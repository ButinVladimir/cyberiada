export interface IEventBatcher {
  fireImmediateEvent(eventType: symbol): void;
  fireEnqueuedEvents(): void;
  enqueueEvent(eventType: symbol): void;
  addListener(eventType: symbol, listener: () => void): void;
  removeListener(eventType: symbol, listener: () => void): void;
  removeAllListeners(): void;
}
