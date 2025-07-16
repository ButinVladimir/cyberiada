import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { STATISTIC_HINTS, STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { IDistrictState } from '@state/city-state';
import { BaseComponent, HINT_ICON } from '@shared/index';
import { COMMON_TEXTS } from '@texts/index';
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

  protected renderDesktop() {
    const formatter = this._controller.formatter;

    const formattedBaseValue = formatter.formatNumberDecimal(this._controller.baseValue);
    const formattedTotalValue = formatter.formatNumberDecimal(this._controller.totalValue);

    return html`
      <sl-details>
        <h4 class="title" slot="summary">
          ${COMMON_TEXTS.synchronization()}

          <sl-tooltip>
            <span slot="content"> ${STATISTIC_HINTS.synchronization()} </span>

            <sl-icon name=${HINT_ICON}></sl-icon>
          </sl-tooltip>
        </h4>

        <div class="parameters-table">
          <div>${STATISTIC_PAGE_TEXTS.baseValue()}</div>
          <div>${formattedBaseValue}</div>

          ${map(this._controller.listAvailableDistricts(), this.renderDistrict)}

          <div>${STATISTIC_PAGE_TEXTS.total()}</div>
          <div>${formattedTotalValue}</div>
        </div>
      </sl-details>
    `;
  }

  private renderDistrict = (districtState: IDistrictState) => {
    const formattedValue = this._controller.formatter.formatNumberDecimal(
      this._controller.getDistrictSynchronization(districtState.index),
    );

    return html`
      <div>${STATISTIC_PAGE_TEXTS.byDistrict(districtState.name)}</div>
      <div>${formattedValue}</div>
    `;
  };
}
