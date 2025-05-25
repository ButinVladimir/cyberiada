import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { OverviewPageTabs } from './types';
import { OVERVIEW_PAGE_TAB_TITLES, OVERVIEW_PAGE_TABS_LIST } from './constants';

@localized()
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

  render() {
    return html`
      <h3 class="title">${msg('Overview')}</h3>

      <sl-tab-group>
        ${OVERVIEW_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${OVERVIEW_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: OverviewPageTabs) => {
    return html` <sl-tab slot="nav" panel=${tab}> ${OVERVIEW_PAGE_TAB_TITLES[tab]()} </sl-tab> `;
  };

  private renderTabPanel = (tab: OverviewPageTabs) => {
    return html` <sl-tab-panel name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel> `;
  };

  private renderTabPanelContent = (tab: OverviewPageTabs) => {
    switch (tab) {
      case OverviewPageTabs.progress:
        return html`<ca-overview-progress-panel></ca-overview-progress-panel>`;

      case OverviewPageTabs.unlockedFeatures:
        return html`<ca-overview-unlocked-features-panel></ca-overview-unlocked-features-panel>`;

      case OverviewPageTabs.unlockedItems:
        return html`<ca-overview-unlocked-items-panel></ca-overview-unlocked-items-panel>`;

      case OverviewPageTabs.story:
        return html`<ca-overview-story-panel></ca-overview-story-panel>`;
    }
  };
}
