export interface IEventBatcher {
  fireEvents(): void;
  enqueueEvent(eventType: string | symbol, ...args: any[]): void;
  addEventListener(eventType: string | symbol, listener: (...args: any[]) => void): void;
  removeEventListener(eventType: string | symbol, listener: (...args: any[]) => void): void;
}
