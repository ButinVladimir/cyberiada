export class DeleteSaveDataDialogSubmit extends Event {
  static readonly type = 'delete-save-data-dialog-submit';

  constructor() {
    super(DeleteSaveDataDialogSubmit.type, {
      bubbles: true,
      composed: true,
    });
  }
}
