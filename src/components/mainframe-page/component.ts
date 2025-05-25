import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { MainframePageController } from './controller';
import { MainframePageTabs } from './types';
import { MAINFRAME_PAGE_TABS_LIST, MAINFRAMGE_PAGE_TAB_TITLES as MAINFRAME_PAGE_TAB_TITLES } from './constants';

@localized()
@customElement('ca-mainframe-page')
export class MainframePage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  private _controller: MainframePageController;

  constructor() {
    super();

    this._controller = new MainframePageController(this);
  }

  render() {
    return html`
      <h3 class="title">${msg('Mainframe')}</h3>

      <sl-tab-group>
        ${MAINFRAME_PAGE_TABS_LIST.map(this.renderTab)} ${MAINFRAME_PAGE_TABS_LIST.map(this.renderTabPanel)}
      </sl-tab-group>
    `;
  }

  private isTabUnlocked = (tab: MainframePageTabs): boolean => {
    switch (tab) {
      case MainframePageTabs.hardware:
        return this._controller.isMainframeHardwareUnlocked();
      case MainframePageTabs.programs:
        return this._controller.isMainframeProgramsUnlocked();
      default:
        return true;
    }
  };

  private renderTab = (tab: MainframePageTabs) => {
    if (!this.isTabUnlocked(tab)) {
      return nothing;
    }

    return html` <sl-tab slot="nav" panel=${tab}> ${MAINFRAME_PAGE_TAB_TITLES[tab]()} </sl-tab> `;
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
