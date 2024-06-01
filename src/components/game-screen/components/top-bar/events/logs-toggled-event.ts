export class LogsToggledEvent extends Event {
  static readonly type = 'logs-toggled';

  constructor() {
    super(
      LogsToggledEvent.type,
      {
        bubbles: true,
        composed: true,
      },
    );
  }
}
