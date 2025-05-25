export class ReturnCityMapPageEvent extends Event {
  static readonly type = 'return-city-map-page';

  constructor() {
    super(ReturnCityMapPageEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
