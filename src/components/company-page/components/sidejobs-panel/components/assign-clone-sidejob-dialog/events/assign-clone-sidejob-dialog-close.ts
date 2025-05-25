export class AssignCloneSidejobDialogCloseEvent extends Event {
  static readonly type = 'assign-clone-sidejob-dialog-close';

  constructor() {
    super(AssignCloneSidejobDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
