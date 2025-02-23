import { t } from 'i18next';
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsMultipliersController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import type { MultipliersType } from '../../types';

@customElement('ca-statistics-multipliers')
export class StatisticsMultipliers extends BaseComponent<StatisticsMultipliersController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: MultipliersType;

  protected controller: StatisticsMultipliersController;

  constructor() {
    super();

    this.controller = new StatisticsMultipliersController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const multiplierByProgram = this.controller.getMultiplierByProgram(this.type);
    const totalMultiplier = this.controller.getTotalMultiplier(this.type);

    return html`
      <sl-details>
        <h4 class="title" slot="summary">${t(`statistics.general.${this.type}.title`, { ns: 'ui' })}</h4>

        <div class="parameters-table">
          ${multiplierByProgram > 1
            ? html`
                <span> ${t(`statistics.general.${this.type}.multiplierByProgram`, { ns: 'ui' })} </span>
                <span> ${formatter.formatNumberFloat(multiplierByProgram)} </span>
              `
            : nothing}

          <span> ${t('statistics.total', { ns: 'ui' })} </span>
          <span> ${formatter.formatNumberFloat(totalMultiplier)} </span>
        </div>
      </sl-details>
    `;
  }
}
