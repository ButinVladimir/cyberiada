import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { statisticsPanelStyle } from '../../styles';

@customElement('ca-statistics-growth-panel')
export class StatisticsGrowthPanel extends BaseComponent {
  static styles = statisticsPanelStyle;

  renderContent() {
    return html`
      <ca-statistics-money-growth></ca-statistics-money-growth>

      <ca-statistics-city-development-growth></ca-statistics-city-development-growth>

      <ca-statistics-program-completion-speed></ca-statistics-program-completion-speed>

      <ca-statistics-programs-growth></ca-statistics-programs-growth>
    `;
  }
}
