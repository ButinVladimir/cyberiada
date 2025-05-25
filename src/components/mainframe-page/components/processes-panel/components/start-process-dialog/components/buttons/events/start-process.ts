export class StartProcessEvent extends Event {
  static readonly type = 'start-process';

  constructor() {
    super(StartProcessEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
