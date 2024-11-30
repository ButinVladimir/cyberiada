import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-statistics-page')
export class StatisticsPage extends BaseComponent {
  static styles = css`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;

  renderContent() {
    return html`
      <h3 class="title">
        <intl-message label="ui:statistics:statistics">Statistics</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="general">
          <intl-message label="ui:statistics:tabs:general">General</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="growth">
          <intl-message label="ui:statistics:tabs:growth">Growth</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="income">
          <intl-message label="ui:statistics:tabs:income">Income</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="expenses">
          <intl-message label="ui:statistics:tabs:expenses">Expenses</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="unlocked-features">
          <intl-message label="ui:statistics:tabs:unlockedFeatures">Unlocked features</intl-message>
        </sl-tab>

        <sl-tab-panel name="general">
          <ca-statistics-general-panel></ca-statistics-general-panel>
        </sl-tab-panel>
        <sl-tab-panel name="growth">
          <ca-statistics-growth-panel></ca-statistics-growth-panel>
        </sl-tab-panel>
        <sl-tab-panel name="income">
          <ca-statistics-income-panel></ca-statistics-income-panel>
        </sl-tab-panel>
        <sl-tab-panel name="expenses">
          <ca-statistics-expenses-panel></ca-statistics-expenses-panel>
        </sl-tab-panel>
        <sl-tab-panel name="unlocked-features">
          <ca-statistics-unlocked-features-panel></ca-statistics-unlocked-features-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
