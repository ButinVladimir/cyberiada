export interface IStateEventEmitter {
  addStateEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeStateEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
}
