import { html } from 'lit';
import { localized, msg } from '@lit/localize';
import { map } from 'lit/directives/map.js';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { IClone } from '@state/company-state';
import { StatisticsExperienceIncomeController } from './controller';
import { statisticsPanelContentStyle } from '../../../../styles';

@localized()
@customElement('ca-statistics-experience-income')
export class StatisticsExperienceIncome extends BaseComponent {
  static styles = statisticsPanelContentStyle;

  hasPartialUpdate = true;

  private _controller: StatisticsExperienceIncomeController;

  @queryAll('span[data-clone]')
  private _cloneValueNodes!: NodeListOf<HTMLSpanElement>;

  constructor() {
    super();

    this._controller = new StatisticsExperienceIncomeController(this);
  }

  render() {
    return html`
      <sl-details>
        <h4 class="title" slot="summary">${msg('Experience')}</h4>

        <div class="parameters-table">${map(this._controller.listClones(), this.renderClone)}</div>
      </sl-details>
    `;
  }

  private renderClone = (clone: IClone) => {
    return html`
      <span> ${clone.name}</span>
      <span data-clone=${clone.id}></span>
    `;
  };

  handlePartialUpdate = () => {
    const formatter = this._controller.formatter;

    this._cloneValueNodes.forEach((element) => {
      const cloneId = element.dataset.clone!;
      const value = this._controller.getExperienceByClone(cloneId);

      element.textContent = formatter.formatNumberFloat(value);
    });
  };
}
