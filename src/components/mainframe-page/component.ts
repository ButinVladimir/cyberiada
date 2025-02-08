import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlTabGroup from '@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces/history-state';
import { MainframePageController } from './controller';
import { MainframePageTabs } from './types';
import { IMainframePageHistoryState } from './interfaces';
import { MAINFRAME_PAGE_TABS_LIST } from './constants';

@customElement('ca-mainframe-page')
export class MainframePage extends BaseComponent<MainframePageController> {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  protected controller: MainframePageController;

  private _currentTab: MainframePageTabs;

  private _tabGroupRef = createRef<SlTabGroup>();

  constructor() {
    super();

    const state = window.history.state as IMainframePageHistoryState;
    this._currentTab = state.selectedTab ?? MainframePageTabs.processes;

    this.controller = new MainframePageController(this);
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
      <h3 class="title">${t('mainframe.mainframe', { ns: 'ui' })}</h3>

      <sl-tab-group ${ref(this._tabGroupRef)} @sl-tab-show=${this.handleTabShow}>
        ${MAINFRAME_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${MAINFRAME_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private isTabUnlocked = (tab: MainframePageTabs): boolean => {
    switch (tab) {
      case MainframePageTabs.hardware:
        return this.controller.isMainframeHardwareUnlocked();
      case MainframePageTabs.programs:
        return this.controller.isMainframeProgramsUnlocked();
      default:
        return true;
    }
  };

  private renderTab = (tab: MainframePageTabs) => {
    if (!this.isTabUnlocked(tab)) {
      return nothing;
    }

    return html`
      <sl-tab ?active=${this._currentTab === tab} slot="nav" panel=${tab}>
        ${t(`mainframe.tabs.${tab}`, { ns: 'ui' })}
      </sl-tab>
    `;
  };

  private renderTabPanel = (tab: MainframePageTabs) => {
    if (!this.isTabUnlocked(tab)) {
      return nothing;
    }

    return html`
      <sl-tab-panel ?active=${this._currentTab === tab} name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel>
    `;
  };

  private renderTabPanelContent = (tab: MainframePageTabs) => {
    switch (tab) {
      case MainframePageTabs.processes:
        return html`<ca-mainframe-processes-panel></ca-mainframe-processes-panel>`;

      case MainframePageTabs.hardware:
        return html`<ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>`;

      case MainframePageTabs.programs:
        return html`<ca-mainframe-programs-panel></ca-mainframe-programs-panel>`;
    }
  };

  private handleTabShow = (event: Event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tab: MainframePageTabs = (event as any).detail.name as MainframePageTabs;

    if (tab !== this._currentTab) {
      this._currentTab = tab;

      const state: IMainframePageHistoryState = {
        ...(window.history.state as IHistoryState),
        selectedMenuItem: OverviewMenuItem.mainframe,
        selectedTab: tab,
      };

      window.history.pushState(state, '');
    }
  };

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state as IMainframePageHistoryState;

    const tab = state.selectedTab ?? MainframePageTabs.processes;

    if (this._tabGroupRef.value) {
      this._currentTab = tab;
      this._tabGroupRef.value.show(tab);
    }
  };
}
