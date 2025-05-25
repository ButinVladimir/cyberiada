import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { map } from 'lit/directives/map.js';
import { localized } from '@lit/localize';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { STATISTIC_PAGE_TEXTS } from '@components/statistics-page/constants';
import { IDistrictState } from '@state/city-state';
import { StatisticsMultipliersController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';
import type { MultipliersType } from '../../types';
import { STATISTIC_MULTIPLIER_TITLES } from './constants';

@localized()
@customElement('ca-statistics-multipliers')
export class StatisticsMultipliers extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  @property({
    attribute: true,
  })
  type!: MultipliersType;

  private _controller: StatisticsMultipliersController;

  private _programMultiplierRef = createRef<HTMLSpanElement>();
  private _totalMultiplierRef = createRef<HTMLSpanElement>();

  @queryAll('span[data-district]')
  private _districtValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this._controller = new StatisticsMultipliersController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${STATISTIC_MULTIPLIER_TITLES[this.type]()}</h4>

        <div class="parameters-table">
          <span> ${STATISTIC_PAGE_TEXTS.byPrograms()} </span>
          <span ${ref(this._programMultiplierRef)}> </span>

          ${map(this._controller.listAvailableDistricts(), this.renderDistrict)}

          <span> ${STATISTIC_PAGE_TEXTS.total()} </span>
          <span ${ref(this._totalMultiplierRef)}> </span>
        </div>
      </sl-details>
    `;
  }

  private renderDistrict = (districtState: IDistrictState) => {
    return html`
      <span> ${STATISTIC_PAGE_TEXTS.byDistrict(districtState.name)}</span>
      <span data-district=${districtState.index}></span>
    `;
  };

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    if (this._programMultiplierRef.value) {
      const programMultiplier = this._controller.getProgramMultiplier(this.type);
      this._programMultiplierRef.value.textContent = formatter.formatNumberFloat(programMultiplier);
    }

    if (this._totalMultiplierRef.value) {
      const totalMultiplier = this._controller.getTotalMultiplier(this.type);
      this._totalMultiplierRef.value.textContent = formatter.formatNumberFloat(totalMultiplier);
    }

    this._districtValueNodes.forEach((element) => {
      const districtIndex = parseInt(element.dataset.district!);
      const value = this._controller.getDistrictMultiplier(districtIndex, this.type);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
