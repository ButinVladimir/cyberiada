export class SortableElementMovedEvent extends Event {
  static readonly type = 'sortable-element-moved';

  readonly keyName: string;
  readonly position: number;

  constructor(keyName: string, position: number) {
    super(SortableElementMovedEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.keyName = keyName;
    this.position = position;
  }
}
