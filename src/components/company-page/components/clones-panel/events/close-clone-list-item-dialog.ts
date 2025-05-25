export class CloseCloneListItemDialogEvent extends Event {
  static readonly type = 'close-clone-list-item-dialog';

  constructor() {
    super(CloseCloneListItemDialogEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
