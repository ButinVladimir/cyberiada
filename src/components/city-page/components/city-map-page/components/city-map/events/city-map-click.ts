export class CityMapClickEvent extends Event {
  static readonly type = 'city-map-click';

  readonly selectedDistrictIndex: number;

  constructor(selectedDistrictIndex: number) {
    super(CityMapClickEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.selectedDistrictIndex = selectedDistrictIndex;
  }
}
