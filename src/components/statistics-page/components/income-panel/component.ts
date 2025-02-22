import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-income-panel')
export class StatisticsIncomePanel extends BaseComponent {
  static styles = statisticsPanelStyle;

  renderContent() {
    return html`
      <ca-statistics-money-income></ca-statistics-money-income>

      <ca-statistics-development-income></ca-statistics-development-income>

      <ca-statistics-multiplier-points-income type="rewards"></ca-statistics-multiplier-points-income>

      <ca-statistics-multiplier-points-income type="connectivity"></ca-statistics-multiplier-points-income>

      <ca-statistics-multiplier-points-income type="codeBase"></ca-statistics-multiplier-points-income>

      <ca-statistics-multiplier-points-income type="computationalBase"></ca-statistics-multiplier-points-income>
    `;
  }
}
