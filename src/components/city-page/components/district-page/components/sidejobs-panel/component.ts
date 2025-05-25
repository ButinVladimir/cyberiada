import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { hintStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';
import { SidejobName } from '@state/company-state';
import { repeat } from 'lit/directives/repeat.js';
import { CityDistrictSidejobsPanelController } from './controller';

@localized()
@customElement('ca-city-district-sidejobs-panel')
export class CityDistrictSidejobsPanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: block;
        width: 100%;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      .header {
        display: none;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto;
        gap: var(--sl-spacing-small);
        align-items: center;
        border-bottom: var(--ca-border);
        padding: var(--sl-spacing-small);
      }

      .header-column {
        display: none;
        font-weight: var(--sl-font-weight-bold);
      }

      .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        border-top: var(--ca-border);
      }

      .list ca-city-district-sidejobs-list-item {
        border-bottom: var(--ca-border);
      }

      .list ca-city-district-sidejobs-list-item:nth-child(2n) {
        background-color: var(--ca-table-row-odd-color);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        .header {
          display: grid;
        }

        .header-column {
          display: block;
        }
      }
    `,
  ];

  private _controller: CityDistrictSidejobsPanelController;

  constructor() {
    super();

    this._controller = new CityDistrictSidejobsPanelController(this);
  }

  render() {
    const sidejobs = this._controller.getAvailableSidejobs();

    return html`
      <p class="hint">
        ${msg(`Increase district connectivity and unlock more feature make more sidejobs available.
Clones could be assigned to sidejobs on company page under sidejobs tab.`)}
      </p>

      <div class="list">
        <div class="header">
          <div class="header-column">${msg('Sidejob')}</div>
          <div class="header-column">${msg('Unlock progress')}</div>
        </div>

        ${sidejobs.length > 0 ? this.renderList(sidejobs) : this.renderEmptyListNotification()}
      </div>
    `;
  }

  private renderEmptyListNotification = () => {
    return html` <div class="notification">${msg("You don't have any sidejobs available")}</div> `;
  };

  private renderList = (sidejobs: SidejobName[]) => {
    return html` ${repeat(sidejobs, (sidejob) => sidejob, this.renderSidejob)}`;
  };

  private renderSidejob = (sidejobName: SidejobName) => {
    return html`
      <ca-city-district-sidejobs-list-item sidejob-name=${sidejobName}> </ca-city-district-sidejobs-list-item>
    `;
  };
}
