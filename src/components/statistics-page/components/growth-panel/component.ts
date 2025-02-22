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

      <ca-statistics-development-growth></ca-statistics-development-growth>

      <ca-statistics-multiplier-points-growth type="rewards"></ca-statistics-multiplier-points-growth>

      <ca-statistics-multiplier-points-growth type="connectivity"></ca-statistics-multiplier-points-growth>

      <ca-statistics-multiplier-points-growth type="codeBase"></ca-statistics-multiplier-points-growth>

      <ca-statistics-multiplier-points-growth type="computationalBase"></ca-statistics-multiplier-points-growth>
    `;
  }
}
