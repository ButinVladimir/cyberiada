import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CityOverviewController } from './controller';
import { CityMapDistrictSelectedEvent } from './components/city-map/events/city-map-district-selected-event';

@customElement('ca-city-overview')
export class CityOverview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
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
      flex: 1 0 auto;
    }
  `;

  private _cityMapController: CityOverviewController;

  @state()
  private _selectedDistrict?: number;

  @state()
  private _mapSize: number;

  constructor() {
    super();

    this._cityMapController = new CityOverviewController(this);
    this._mapSize = this._cityMapController.mapCellSize;
  }

  render() {
    return html`
      <h3 class="title">
        <intl-message label="ui:city:cityOverview:title">City overview</intl-message>
      </h3>

      <p>
        <intl-message label="ui:city:cityOverview:hint">City overview hint</intl-message>
      </p>

      <div class="content">
        <ca-city-map
          .map=${this._cityMapController.map}
          selected-district=${ifDefined(this._selectedDistrict)}
          map-cell-size=${this._mapSize}
          @city-map-district-selected=${this.handleSelectDistrict}
        >
        </ca-city-map>

        <ca-city-district-info-panel
          .districtInfo=${this._selectedDistrict !== undefined
            ? this._cityMapController.getDistrictInfo(this._selectedDistrict)
            : undefined}
        >
        </ca-city-district-info-panel>
      </div>
    `;
  }

  private handleSelectDistrict = (event: Event) => {
    const cityMapDistrictSelectedEvent = event as CityMapDistrictSelectedEvent;

    this._selectedDistrict = cityMapDistrictSelectedEvent.district;
  };
}
