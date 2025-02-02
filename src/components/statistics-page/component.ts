import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces';
import { StatisticsPageTabs } from './constants';
import { IStatisticsPageHistoryState } from './interfaces';

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
        <sl-tab
          ?active=${this._currentTab === StatisticsPageTabs.general}
          slot="nav"
          panel=${StatisticsPageTabs.general}
        >
          ${t('statistics.tabs.general', { ns: 'ui' })}
        </sl-tab>
        <sl-tab ?active=${this._currentTab === StatisticsPageTabs.growth} slot="nav" panel=${StatisticsPageTabs.growth}>
          ${t('statistics.tabs.growth', { ns: 'ui' })}
        </sl-tab>
        <sl-tab ?active=${this._currentTab === StatisticsPageTabs.income} slot="nav" panel=${StatisticsPageTabs.income}>
          ${t('statistics.tabs.income', { ns: 'ui' })}
        </sl-tab>
        <sl-tab
          ?active=${this._currentTab === StatisticsPageTabs.expenses}
          slot="nav"
          panel=${StatisticsPageTabs.expenses}
        >
          ${t('statistics.tabs.expenses', { ns: 'ui' })}
        </sl-tab>
        <sl-tab
          ?active=${this._currentTab === StatisticsPageTabs.unlockedFeatures}
          slot="nav"
          panel=${StatisticsPageTabs.unlockedFeatures}
        >
          ${t('statistics.tabs.unlockedFeatures', { ns: 'ui' })}
        </sl-tab>

        <sl-tab-panel ?active=${this._currentTab === StatisticsPageTabs.general} name=${StatisticsPageTabs.general}>
          <ca-statistics-general-panel></ca-statistics-general-panel>
        </sl-tab-panel>
        <sl-tab-panel ?active=${this._currentTab === StatisticsPageTabs.growth} name=${StatisticsPageTabs.growth}>
          <ca-statistics-growth-panel></ca-statistics-growth-panel>
        </sl-tab-panel>
        <sl-tab-panel ?active=${this._currentTab === StatisticsPageTabs.income} name=${StatisticsPageTabs.income}>
          <ca-statistics-income-panel></ca-statistics-income-panel>
        </sl-tab-panel>
        <sl-tab-panel ?active=${this._currentTab === StatisticsPageTabs.expenses} name=${StatisticsPageTabs.expenses}>
          <ca-statistics-expenses-panel></ca-statistics-expenses-panel>
        </sl-tab-panel>
        <sl-tab-panel
          ?active=${this._currentTab === StatisticsPageTabs.unlockedFeatures}
          name=${StatisticsPageTabs.unlockedFeatures}
        >
          <ca-statistics-unlocked-features-panel></ca-statistics-unlocked-features-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `;
  }

  private handleTabShow = (event: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
