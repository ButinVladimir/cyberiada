export class ToggleDetailsEvent extends Event {
  static readonly type = 'toggle-details';

  constructor() {
    super(ToggleDetailsEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
