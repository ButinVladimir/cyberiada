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
import { MainframePageTabs } from './constants';
import { IMainframePageHistoryState } from './interfaces';

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

  private _currentTab: MainframePageTabs = MainframePageTabs.processes;

  private _tabGroupRef = createRef<SlTabGroup>();

  constructor() {
    super();

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
    const isMainframeHardwareUnlocked = this.controller.isMainframeHardwareUnlocked();
    const isMainframeProgramsUnlocked = this.controller.isMainframeProgramsUnlocked();

    return html`
      <h3 class="title">${t('mainframe.mainframe', { ns: 'ui' })}</h3>

      <sl-tab-group ${ref(this._tabGroupRef)} @sl-tab-show=${this.handleTabShow}>
        <sl-tab slot="nav" panel=${MainframePageTabs.processes}>
          ${t('mainframe.tabs.processes', { ns: 'ui' })}
        </sl-tab>
        ${isMainframeHardwareUnlocked
          ? html`
              <sl-tab slot="nav" panel=${MainframePageTabs.hardware}>
                ${t('mainframe.tabs.hardware', { ns: 'ui' })}
              </sl-tab>
            `
          : nothing}
        ${isMainframeProgramsUnlocked
          ? html`
              <sl-tab slot="nav" panel=${MainframePageTabs.programs}>
                ${t('mainframe.tabs.programs', { ns: 'ui' })}
              </sl-tab>
            `
          : nothing}

        <sl-tab-panel name=${MainframePageTabs.processes}>
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        ${isMainframeHardwareUnlocked
          ? html`
              <sl-tab-panel name=${MainframePageTabs.hardware}>
                <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
              </sl-tab-panel>
            `
          : nothing}
        ${isMainframeProgramsUnlocked
          ? html`
              <sl-tab-panel name=${MainframePageTabs.programs}>
                <ca-mainframe-programs-panel></ca-mainframe-programs-panel>
              </sl-tab-panel>
            `
          : nothing}
      </sl-tab-group>
    `;
  }

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

      window.history.pushState(state, OverviewMenuItem.mainframe);
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
