import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { CompanyPageController } from './controller';
import { CompanyPageTabs } from './types';
import { COMPANY_PAGE_TABS_LIST, COMPANY_PAGE_TAB_TITLES } from './constants';

@localized()
@customElement('ca-company-page')
export class CompanyPage extends BaseComponent {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  private _controller: CompanyPageController;

  constructor() {
    super();

    this._controller = new CompanyPageController(this);
  }

  render() {
    return html`
      <h3 class="title">${msg('Company')}</h3>

      <sl-tab-group>
        ${COMPANY_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${COMPANY_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: CompanyPageTabs) => {
    return html` <sl-tab slot="nav" panel=${tab}> ${COMPANY_PAGE_TAB_TITLES[tab]()} </sl-tab> `;
  };

  private renderTabPanel = (tab: CompanyPageTabs) => {
    return html` <sl-tab-panel name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel> `;
  };

  private renderTabPanelContent = (tab: CompanyPageTabs) => {
    switch (tab) {
      case CompanyPageTabs.clones:
        return html`<ca-company-clones-panel></ca-company-clones-panel>`;

      case CompanyPageTabs.sidejobs:
        return html`<ca-company-sidejobs-panel></ca-company-sidejobs-panel>`;
    }
  };
}
