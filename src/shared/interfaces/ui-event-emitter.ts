export interface IUIEventEmitter {
  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  fireUiEvents(): void;
}
