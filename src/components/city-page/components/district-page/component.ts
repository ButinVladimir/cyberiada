import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { DISTRICT_NAMES } from '@texts/names';
import { CITY_DISTRICT_PAGE_TAB_LIST, CITY_DISTRICT_PAGE_TAB_TITLES } from './constants';
import { CityDistrictPageTabs } from './types';
import { CityDistrictPageController } from './controller';
import { ReturnCityMapPageEvent } from './events';

@localized()
@customElement('ca-city-district-page')
export class CityDistrictPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        position: relative;
      }

      h3.title {
        margin-bottom: 0;
      }

      div.title {
        display: flex;
        align-items: center;
        margin-bottom: var(--sl-spacing-2x-small);
      }

      sl-icon-button.go-back-btn {
        font-size: var(--sl-font-size-2x-large);
        position: relative;
        margin-left: -1rem;
      }
    `,
  ];

  @property({
    attribute: 'district-index',
    type: Number,
  })
  districtIndex!: number;

  private _controller: CityDistrictPageController;

  constructor() {
    super();

    this._controller = new CityDistrictPageController(this);
  }

  render() {
    const districtState = this._controller.getDistrictState(this.districtIndex);

    const goBackLabel = msg('Go back to the map');

    return html`
      <div class="title">
        <sl-tooltip>
          <span slot="content">${goBackLabel}</span>

          <sl-icon-button
            class="go-back-btn"
            label=${goBackLabel}
            name="chevron-compact-left"
            @click=${this.handleGoBack}
          ></sl-icon-button>
        </sl-tooltip>

        <h3 class="title">${DISTRICT_NAMES[districtState.name]()}</h3>
      </div>

      <sl-tab-group> ${this.renderTabs()} ${this.renderTabPanels()} </sl-tab-group>
    `;
  }

  private renderTabs = () => {
    return CITY_DISTRICT_PAGE_TAB_LIST.map(this.renderTab);
  };

  private renderTab = (tab: CityDistrictPageTabs) => {
    return html`<sl-tab slot="nav" panel=${tab}>${CITY_DISTRICT_PAGE_TAB_TITLES[tab]()}</sl-tab>`;
  };

  private renderTabPanels = () => {
    return CITY_DISTRICT_PAGE_TAB_LIST.map(this.renderTabPanel);
  };

  private renderTabPanel = (tab: CityDistrictPageTabs) => {
    return html`<sl-tab-panel name=${tab}>${this.renderTabPanelContent(tab)}</sl-tab-panel>`;
  };

  private renderTabPanelContent = (tab: CityDistrictPageTabs) => {
    switch (tab) {
      case CityDistrictPageTabs.overview:
        return html`
          <ca-city-district-overiew-panel district-index=${this.districtIndex}> </ca-city-district-overiew-panel>
        `;

      case CityDistrictPageTabs.sidejobs:
        return html`
          <ca-city-district-sidejobs-panel district-index=${this.districtIndex}> </ca-city-district-sidejobs-panel>
        `;
    }
  };

  private handleGoBack = () => {
    this.dispatchEvent(new ReturnCityMapPageEvent());
  };
}
