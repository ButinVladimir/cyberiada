import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces';
import { OverviewPageTabs } from './types';
import { IOverviewPageHistoryState } from './interfaces';
import { OVERVIEW_PAGE_TABS_LIST } from './constants';

@customElement('ca-overview-page')
export class OverviewPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  private _currentTab: OverviewPageTabs = OverviewPageTabs.progress;

  private _tabGroupRef = createRef<SlTabGroup>();

  constructor() {
    super();

    const state = window.history.state as IOverviewPageHistoryState;
    this._currentTab = state.selectedTab ?? OverviewPageTabs.progress;
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
      <h3 class="title">${t('overview.overview', { ns: 'ui' })}</h3>

      <sl-tab-group ${ref(this._tabGroupRef)} @sl-tab-show=${this.handleTabShow}>
        ${OVERVIEW_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${OVERVIEW_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: OverviewPageTabs) => {
    return html`
      <sl-tab ?active=${this._currentTab === tab} slot="nav" panel=${tab}>
        ${t(`overview.tabs.${tab}`, { ns: 'ui' })}
      </sl-tab>
    `;
  };

  private renderTabPanel = (tab: OverviewPageTabs) => {
    return html`
      <sl-tab-panel ?active=${this._currentTab === tab} name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel>
    `;
  };

  private renderTabPanelContent = (tab: OverviewPageTabs) => {
    switch (tab) {
      case OverviewPageTabs.progress:
        return html`<ca-overview-progress-panel></ca-overview-progress-panel>`;
      default:
        return html`123`;
    }
  };

  private handleTabShow = (event: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tab: OverviewPageTabs = (event as any).detail.name as OverviewPageTabs;

    if (tab !== this._currentTab) {
      this._currentTab = tab;

      const state: IOverviewPageHistoryState = {
        ...(window.history.state as IHistoryState),
        selectedMenuItem: OverviewMenuItem.overview,
        selectedTab: tab,
      };

      window.history.pushState(state, '');
    }
  };

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state as IOverviewPageHistoryState;

    const tab = state.selectedTab ?? OverviewPageTabs.progress;

    if (this._tabGroupRef.value) {
      this._currentTab = tab;
      this._tabGroupRef.value.show(tab);
    }
  };
}
