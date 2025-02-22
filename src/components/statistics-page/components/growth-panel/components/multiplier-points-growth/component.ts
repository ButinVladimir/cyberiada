import { t } from 'i18next';
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import type { PointsMultiplierType } from '@shared/types';
import { StatisticsMultiplierPointsGrowthController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@customElement('ca-statistics-multiplier-points-growth')
export class StatisticsCodeBaseGrowth extends BaseComponent<StatisticsMultiplierPointsGrowthController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: PointsMultiplierType;

  protected controller: StatisticsMultiplierPointsGrowthController;

  constructor() {
    super();

    this.controller = new StatisticsMultiplierPointsGrowthController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const growthByProgram = this.controller.getGrowthByProgram(this.type);

    return html`
      <h4 class="title">
        ${t(`statistics.growth.${this.type}.title`, { ns: 'ui' })}

        <sl-tooltip>
          <span slot="content"> ${t(`statistics.hints.${this.type}`, { ns: 'ui' })} </span>

          <sl-icon name="question-circle"></sl-icon>
        </sl-tooltip>
      </h4>

      <div class="parameters-table">
        ${growthByProgram > 0
          ? html`
              <span>${t(`statistics.growth.${this.type}.growthByProgram`, { ns: 'ui' })} </span>
              <span> ${formatter.formatNumberFloat(growthByProgram)} </span>
            `
          : nothing}
      </div>
    `;
  }
}
