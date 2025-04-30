import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { localized } from '@lit/localize';
import { CityMapClickEvent } from './components/city-map-page/components/city-map/events';

@localized()
@customElement('ca-city-page')
export class CityPage extends BaseComponent {
  @state()
  private _selectedDistrictIndex?: number;

  render() {
    if (this._selectedDistrictIndex === undefined) {
      return this.renderMap();
    }

    return this.renderDistrict();
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
