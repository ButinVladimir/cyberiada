import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-expenses-panel')
export class StatisticsExpensesPanel extends LitElement {
  static styles = statisticsPanelStyle;

  render() {
    return html` <ca-statistics-money-expenses></ca-statistics-money-expenses> `;
  }
}
