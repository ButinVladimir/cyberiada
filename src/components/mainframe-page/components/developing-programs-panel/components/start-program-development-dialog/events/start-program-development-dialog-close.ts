export class StartProgramDevelopmentDialogClose extends Event {
  static readonly type = 'start-program-development-dialog-close';

  constructor() {
    super(StartProgramDevelopmentDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
