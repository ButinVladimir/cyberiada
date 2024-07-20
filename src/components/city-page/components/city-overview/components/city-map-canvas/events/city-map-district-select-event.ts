export class CityMapDistrictSelectEvent extends Event {
  static readonly type = 'city-map-district-select';

  district?: number;

  constructor(district?: number) {
    super(CityMapDistrictSelectEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.district = district;
  }
}
