export class MapCellZoomChangeEvent extends Event {
  static readonly type = 'map-cell-zoom-change';

  zoom: number;

  constructor(zoom: number) {
    super(MapCellZoomChangeEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.zoom = zoom;
  }
}
