import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { BaseComponent } from '@shared/base-component';
import { localized } from '@lit/localize';
import { CityMapClickEvent } from './components/city-map-page/components/city-map/events';

@localized()
@customElement('ca-city-page')
export class CityPage extends BaseComponent {
  @state()
  private _selectedDistrictIndex?: number;

  render() {
    const renderedTemplate = this._selectedDistrictIndex === undefined ? this.renderMap() : this.renderDistrict();

    return cache(renderedTemplate);
  }

  private renderMap() {
    return html`<ca-city-map-page @city-map-click=${this.handleCityMapClick}></ca-city-map-page>`;
  }

  private renderDistrict() {
    return html`<ca-city-district-page
      @return-city-map-page=${this.handleReturnCityMapPage}
      district-index=${this._selectedDistrictIndex!}
    ></ca-city-district-page>`;
  }

  private handleCityMapClick = (event: CityMapClickEvent) => {
    this._selectedDistrictIndex = event.selectedDistrictIndex;
  };

  private handleReturnCityMapPage = () => {
    this._selectedDistrictIndex = undefined;
  };
}
