import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ca-statistics-page')
export class StatisticsPage extends LitElement {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;

  render() {
    return html`
      <h3 class="title">
        <intl-message label="ui:statistics:statistics">Statistics</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="growth">
          <intl-message label="ui:statistics:tabs:growth">Growth</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="incomeExpenses">
          <intl-message label="ui:statistics:tabs:incomeExpenses">Income and expenses</intl-message>
        </sl-tab>

        <sl-tab-panel name="growth">
          <ca-statistics-growth-panel></ca-statistics-growth-panel>
        </sl-tab-panel>
        <sl-tab-panel name="incomeExpenses"> Income and expenses </sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
