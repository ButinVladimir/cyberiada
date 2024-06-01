export class MenuItemSelectedEvent extends Event {
  static readonly type = 'menu-item-selected';

  menuItem = '';

  constructor(menuItem: string) {
    super(
      MenuItemSelectedEvent.type,
      {
        bubbles: true,
        composed: true,
      },
    );

    this.menuItem = menuItem;
  }
}
