import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-expenses-panel')
export class StatisticsExpensesPanel extends BaseComponent {
  static styles = statisticsPanelStyle;

  render() {
    return html` <ca-statistics-money-expenses></ca-statistics-money-expenses> `;
  }
}
