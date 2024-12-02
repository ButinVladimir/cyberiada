export class StartProcessDialogCloseEvent extends Event {
  static readonly type = 'start-process-dialog-close';

  constructor() {
    super(StartProcessDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
