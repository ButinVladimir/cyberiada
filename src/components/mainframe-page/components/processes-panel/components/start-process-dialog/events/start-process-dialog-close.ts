export class StartProcessDialogClose extends Event {
  static readonly type = 'start-process-dialog-close';

  constructor() {
    super(StartProcessDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
