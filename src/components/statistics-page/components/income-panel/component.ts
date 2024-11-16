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

      <ca-statistics-city-development-income></ca-statistics-city-development-income>

      <ca-statistics-programs-income></ca-statistics-programs-income>
    `;
  }
}
