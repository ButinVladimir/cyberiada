export class MenuToggledEvent extends Event {
  static readonly type = 'menu-toggled';

  constructor() {
    super(MenuToggledEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
