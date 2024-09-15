import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CityOverviewController } from './controller';
import { CityMapDistrictSelectEvent } from './components/city-map-canvas/events';
import { MapCellZoomChangeEvent } from './components/map-cell-zoom-panel/events';

@customElement('ca-city-overview')
export class CityOverview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
    }

    div.content {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: var(--sl-spacing-medium);
      flex-wrap: wrap;
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }

    ca-city-map {
      flex: 0 0 auto;
    }

    ca-city-district-info-panel {
      min-width: 25em;
      flex: 1 0;
    }

    ca-map-cell-zoom-panel {
      position: absolute;
      top: 0;
      right: 0;
    }
  `;

  private _cityOverviewController: CityOverviewController;

  @state()
  private _selectedDistrict?: number;

  constructor() {
    super();

    this._cityOverviewController = new CityOverviewController(this);
  }

  render() {
    return html`
      <h3 class="title">
        <intl-message label="ui:city:cityOverview:title">City overview</intl-message>
      </h3>

      <p>
        <intl-message label="ui:city:cityOverview:hint">City overview hint</intl-message>
      </p>

      <ca-map-cell-zoom-panel
        zoom=${this._cityOverviewController.mapCellSize}
        @map-cell-zoom-change=${this.handleChangeZoom}
      >
      </ca-map-cell-zoom-panel>

      <div class="content">
        <ca-city-map-canvas
          selected-district=${ifDefined(this._selectedDistrict)}
          map-cell-zoom=${this._cityOverviewController.mapCellSize}
          @city-map-district-select=${this.handleSelectDistrict}
        >
        </ca-city-map-canvas>

        <ca-city-district-info-panel
          .districtInfo=${this._selectedDistrict !== undefined
            ? this._cityOverviewController.getDistrictInfo(this._selectedDistrict)
            : undefined}
        >
        </ca-city-district-info-panel>
      </div>
    `;
  }

  private handleSelectDistrict = (event: Event) => {
    const cityMapDistrictSelectEvent = event as CityMapDistrictSelectEvent;

    this._selectedDistrict = cityMapDistrictSelectEvent.district;
  };

  private handleChangeZoom = (event: Event) => {
    const mapCellZoomChangeEvent = event as MapCellZoomChangeEvent;

    const { zoom } = mapCellZoomChangeEvent;
    this._cityOverviewController.setMapCellSize(zoom);
  };
}
