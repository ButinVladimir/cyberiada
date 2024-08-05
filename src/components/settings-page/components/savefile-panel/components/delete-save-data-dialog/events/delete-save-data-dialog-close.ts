export class DeleteSaveDataDialogClose extends Event {
  static readonly type = 'delete-save-data-dialog-close';

  constructor() {
    super(DeleteSaveDataDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
