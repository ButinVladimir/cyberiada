import { html, PropertyValues } from 'lit';
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
export class StatisticsSynchronization extends BaseComponent<StatisticsSynchronizationController> {
  static styles = statisticsPanelContentStyle;

  protected controller: StatisticsSynchronizationController;

  constructor() {
    super();

    this.controller = new StatisticsSynchronizationController(this);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
  }

  render() {
    const formatter = this.controller.formatter;

    const formattedBaseValue = formatter.formatNumberDecimal(this.controller.baseValue);
    const formattedTotalValue = formatter.formatNumberDecimal(this.controller.totalValue);

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

          ${map(this.controller.listAvailableDistricts(), this.renderDistrict)}

          <span>${STATISTIC_PAGE_TEXTS.total()}</span>
          <span>${formattedTotalValue}</span>
        </div>
      </sl-details>
    `;
  }

  private renderDistrict = (districtState: IDistrictState) => {
    const formattedValue = this.controller.formatter.formatNumberDecimal(
      this.controller.getDistrictSynchronization(districtState.index),
    );

    return html`
      <span> ${STATISTIC_PAGE_TEXTS.byDistrict(districtState.name)}</span>
      <span>${formattedValue}</span>
    `;
  };
}
