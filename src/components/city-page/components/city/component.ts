import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { CityController } from './controller';
import { CityMapDistrictSelectEvent } from './components/city-map-canvas/events';
import { MapCellZoomChangeEvent } from './components/map-cell-zoom-panel/events';

@customElement('ca-city')
export class City extends BaseComponent<CityController> {
  static styles = [
    pageTitleStyle,
    css`
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
        margin-bottom: var(--sl-spacing-large);
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
    `,
  ];

  protected controller: CityController;

  @state()
  private _selectedDistrict?: number;

  constructor() {
    super();

    this.controller = new CityController(this);
  }

  render() {
    return html`
      <h3 class="title">${t('city.city.title', { ns: 'ui' })}</h3>

      <p>${t('city.city.hint', { ns: 'ui' })}</p>

      <ca-map-cell-zoom-panel zoom=${this.controller.mapCellSize} @map-cell-zoom-change=${this.handleChangeZoom}>
      </ca-map-cell-zoom-panel>

      <div class="content">
        <ca-city-map-canvas
          selected-district=${ifDefined(this._selectedDistrict)}
          map-cell-zoom=${this.controller.mapCellSize}
          @city-map-district-select=${this.handleSelectDistrict}
        >
        </ca-city-map-canvas>

        <ca-city-district-info-panel
          .districtInfo=${this._selectedDistrict !== undefined
            ? this.controller.getDistrictInfo(this._selectedDistrict)
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
    this.controller.setMapCellSize(zoom);
  };
}
