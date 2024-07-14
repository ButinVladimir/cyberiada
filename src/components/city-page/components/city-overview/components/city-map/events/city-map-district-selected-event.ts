export class CityMapDistrictSelectedEvent extends Event {
  static readonly type = 'city-map-district-selected';

  district?: number;

  constructor(district?: number) {
    super(CityMapDistrictSelectedEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.district = district;
  }
}
