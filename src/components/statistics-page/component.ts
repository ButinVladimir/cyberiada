import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';

@customElement('ca-statistics-page')
export class StatisticsPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  renderContent() {
    return html`
      <h3 class="title">${t('statistics.statistics', { ns: 'ui' })}</h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="general"> ${t('statistics.tabs.general', { ns: 'ui' })} </sl-tab>
        <sl-tab slot="nav" panel="growth"> ${t('statistics.tabs.growth', { ns: 'ui' })} </sl-tab>
        <sl-tab slot="nav" panel="income"> ${t('statistics.tabs.income', { ns: 'ui' })} </sl-tab>
        <sl-tab slot="nav" panel="expenses"> ${t('statistics.tabs.expenses', { ns: 'ui' })} </sl-tab>
        <sl-tab slot="nav" panel="unlocked-features"> ${t('statistics.tabs.unlockedFeatures', { ns: 'ui' })} </sl-tab>

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
