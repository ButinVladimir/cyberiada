export class StartProgramDevelopmentDialogCloseEvent extends Event {
  static readonly type = 'start-program-development-dialog-close';

  constructor() {
    super(StartProgramDevelopmentDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
