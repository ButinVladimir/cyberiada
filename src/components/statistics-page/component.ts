import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces';
import { StatisticsPageTabs } from './types';
import { IStatisticsPageHistoryState } from './interfaces';
import { STATISTICS_PAGE_TABS_LIST } from './constants';

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

  private _currentTab: StatisticsPageTabs = StatisticsPageTabs.general;

  private _tabGroupRef = createRef<SlTabGroup>();

  constructor() {
    super();

    const state = window.history.state as IStatisticsPageHistoryState;
    this._currentTab = state.selectedTab ?? StatisticsPageTabs.general;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
    return html`
      <h3 class="title">${t('statistics.statistics', { ns: 'ui' })}</h3>

      <sl-tab-group ${ref(this._tabGroupRef)} @sl-tab-show=${this.handleTabShow}>
        ${STATISTICS_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${STATISTICS_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: StatisticsPageTabs) => {
    return html`
      <sl-tab ?active=${this._currentTab === tab} slot="nav" panel=${tab}>
        ${t(`statistics.tabs.${tab}`, { ns: 'ui' })}
      </sl-tab>
    `;
  };

  private renderTabPanel = (tab: StatisticsPageTabs) => {
    return html`
      <sl-tab-panel ?active=${this._currentTab === tab} name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel>
    `;
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

  private handleTabShow = (event: Event) => {
    const tab: StatisticsPageTabs = (event as any).detail.name as StatisticsPageTabs;

    if (tab !== this._currentTab) {
      this._currentTab = tab;

      const state: IStatisticsPageHistoryState = {
        ...(window.history.state as IHistoryState),
        selectedMenuItem: OverviewMenuItem.statistics,
        selectedTab: tab,
      };

      window.history.pushState(state, '');
    }
  };

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state as IStatisticsPageHistoryState;

    const tab = state.selectedTab ?? StatisticsPageTabs.general;

    if (this._tabGroupRef.value) {
      this._currentTab = tab;
      this._tabGroupRef.value.show(tab);
    }
  };
}
