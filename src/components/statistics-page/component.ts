import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { StatisticsPageTabs } from './types';
import { STATISTICS_PAGE_TAB_NAMES, STATISTICS_PAGE_TABS_LIST } from './constants';

@localized()
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

  render() {
    return html`
      <h3 class="title">${msg('Statistics')}</h3>

      <sl-tab-group>
        ${STATISTICS_PAGE_TABS_LIST.map(this.renderTab)} ${STATISTICS_PAGE_TABS_LIST.map(this.renderTabPanel)}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: StatisticsPageTabs) => {
    return html` <sl-tab slot="nav" panel=${tab}> ${STATISTICS_PAGE_TAB_NAMES[tab]()} </sl-tab> `;
  };

  private renderTabPanel = (tab: StatisticsPageTabs) => {
    return html` <sl-tab-panel name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel> `;
  };

  private renderTabPanelContent = (tab: StatisticsPageTabs) => {
    switch (tab) {
      case StatisticsPageTabs.general:
        return html`<ca-statistics-general-panel></ca-statistics-general-panel>`;

      case StatisticsPageTabs.growth:
        return html`<ca-statistics-growth-panel></ca-statistics-growth-panel>`;

      case StatisticsPageTabs.income:
        return html`<ca-statistics-income-panel></ca-statistics-income-panel>`;

      case StatisticsPageTabs.expenses:
        return html`<ca-statistics-expenses-panel></ca-statistics-expenses-panel>`;
    }
  };
}
