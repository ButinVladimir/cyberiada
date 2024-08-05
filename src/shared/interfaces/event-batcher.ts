export interface IEventBatcher {
  fireEvents(): void;
  enqueueEvent(eventType: string | symbol, ...args: any[]): void;
  addListener(eventType: string | symbol, listener: (...args: any[]) => void): void;
  removeListener(eventType: string | symbol, listener: (...args: any[]) => void): void;
}
