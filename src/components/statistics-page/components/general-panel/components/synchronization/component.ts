import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { STATISTIC_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { IDistrictState } from '@state/city-state';
import { HINT_ICON } from '@shared/styles';
import { StatisticsSynchronizationController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-synchronization')
export class StatisticsSynchronization extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  private _controller: StatisticsSynchronizationController;

  constructor() {
    super();

    this._controller = new StatisticsSynchronizationController(this);
  }

  render() {
    const formatter = this._controller.formatter;

    const formattedBaseValue = formatter.formatNumberDecimal(this._controller.baseValue);
    const formattedTotalValue = formatter.formatNumberDecimal(this._controller.totalValue);

    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${msg('Synchronization')}

          <sl-tooltip>
            <span slot="content"> ${STATISTIC_HINTS.synchronization()} </span>

            <sl-icon name=${HINT_ICON}></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          <span>${STATISTIC_PAGE_TEXTS.baseValue()}</span>
          <span>${formattedBaseValue}</span>

          ${map(this._controller.listAvailableDistricts(), this.renderDistrict)}

          <span>${STATISTIC_PAGE_TEXTS.total()}</span>
          <span>${formattedTotalValue}</span>
        </div>
      </sl-details>
    `;
  }

  private renderDistrict = (districtState: IDistrictState) => {
    const formattedValue = this._controller.formatter.formatNumberDecimal(
      this._controller.getDistrictSynchronization(districtState.index),
    );

    return html`
      <span> ${STATISTIC_PAGE_TEXTS.byDistrict(districtState.name)}</span>
      <span>${formattedValue}</span>
    `;
  };
}
