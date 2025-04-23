import { CloneListItemDialog } from '../type';

export class OpenCloneListItemDialogEvent extends Event {
  static readonly type = 'open-clone-list-item-dialog';

  public readonly dialog: CloneListItemDialog;
  public readonly cloneId: string;

  constructor(dialog: CloneListItemDialog, cloneId: string) {
    super(OpenCloneListItemDialogEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.dialog = dialog;
    this.cloneId = cloneId;
  }
}
