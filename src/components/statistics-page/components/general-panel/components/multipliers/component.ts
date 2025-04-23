import { html, PropertyValues } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { StatisticsMultipliersController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import type { MultipliersType } from '../../types';
import { STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { STATISTIC_MULTIPLIER_TITLES } from './constants';

@localized()
@customElement('ca-statistics-multipliers')
export class StatisticsMultipliers extends BaseComponent<StatisticsMultipliersController> {
  static styles = statisticsPanelContentStyle;

  @property({
    attribute: true,
  })
  type!: MultipliersType;

  protected controller: StatisticsMultipliersController;

  private _programMultiplierRef = createRef<HTMLSpanElement>();
  private _totalMultiplierRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this.controller = new StatisticsMultipliersController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${STATISTIC_MULTIPLIER_TITLES[this.type]()}</h4>

        <div class="parameters-table">
          <span> ${STATISTIC_PAGE_TEXTS.byPrograms()} </span>
          <span ${ref(this._programMultiplierRef)}> </span>

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span ${ref(this._totalMultiplierRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  handlePartialUpdate = () => {
    const formatter = this.controller.formatter;

    if (this._programMultiplierRef.value) {
      const programMultiplier = this.controller.getProgramMultiplier(this.type);
      this._programMultiplierRef.value.textContent = formatter.formatNumberFloat(programMultiplier);
    }

    if (this._totalMultiplierRef.value) {
      const totalMultiplier = this.controller.getTotalMultiplier(this.type);
      this._totalMultiplierRef.value.textContent = formatter.formatNumberFloat(totalMultiplier);
    }
  };
}
