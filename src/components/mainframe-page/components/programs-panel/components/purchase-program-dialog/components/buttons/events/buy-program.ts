export class BuyProgramEvent extends Event {
  static readonly type = 'buy-program';

  constructor() {
    super(BuyProgramEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
