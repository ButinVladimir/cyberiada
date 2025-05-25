import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { CityDistrictOverviewPanelController } from './controller';

@localized()
@customElement('ca-city-district-overview-panel')
export class CityDistrictOverviewPanel extends BaseComponent {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-2x-large);
      }
    `,
  ];

  private _controller: CityDistrictOverviewPanelController;

  constructor() {
    super();

    this._controller = new CityDistrictOverviewPanelController(this);
  }

  render() {
    return html`
      <ca-city-district-overview-panel-values></ca-city-district-overview-panel-values>
      ${this._controller.isDistrictTiersUnlocked()
        ? html`<ca-city-district-overview-panel-next-tier-progress></ca-city-district-overview-panel-next-tier-progress>`
        : nothing}
    `;
  }
}
