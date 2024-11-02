import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-growth-panel')
export class StatisticsGrowthPanel extends LitElement {
  static styles = statisticsPanelStyle;

  render() {
    return html`
      <ca-statistics-money-growth></ca-statistics-money-growth>

      <ca-statistics-city-development-growth></ca-statistics-city-development-growth>

      <ca-statistics-program-completion-speed></ca-statistics-program-completion-speed>

      <ca-statistics-programs-growth></ca-statistics-programs-growth>
    `;
  }
}
