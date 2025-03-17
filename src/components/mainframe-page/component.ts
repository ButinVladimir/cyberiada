import { t } from 'i18next';
import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { MainframePageController } from './controller';
import { MainframePageTabs } from './types';
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

  constructor() {
    super();

    this.controller = new MainframePageController(this);
  }

  render() {
    return html`
      <h3 class="title">${t('mainframe.mainframe', { ns: 'ui' })}</h3>

      <sl-tab-group>
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

    return html` <sl-tab slot="nav" panel=${tab}> ${t(`mainframe.tabs.${tab}`, { ns: 'ui' })} </sl-tab> `;
  };

  private renderTabPanel = (tab: MainframePageTabs) => {
    if (!this.isTabUnlocked(tab)) {
      return nothing;
    }

    return html` <sl-tab-panel name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel> `;
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
}
