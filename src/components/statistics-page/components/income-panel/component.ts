import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-income-panel')
export class StatisticsIncomePanel extends LitElement {
  static styles = statisticsPanelStyle;

  render() {
    return html`
      <ca-statistics-money-income></ca-statistics-money-income>

      <ca-statistics-city-development-income></ca-statistics-city-development-income>

      <ca-statistics-programs-income></ca-statistics-programs-income>
    `;
  }
}
