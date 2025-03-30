import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { pageTitleStyle } from '@shared/styles';
import { CompanyPageController } from './controller';
import { CompanyPageTabs } from './types';
import { COMPANY_PAGE_TABS_LIST } from './constants';

@customElement('ca-company-page')
export class CompanyPage extends BaseComponent<CompanyPageController> {
  static styles = [
    pageTitleStyle,
    css`
      h3.title {
        margin-bottom: var(--sl-spacing-2x-small);
      }
    `,
  ];

  protected controller: CompanyPageController;

  constructor() {
    super();

    this.controller = new CompanyPageController(this);
  }

  render() {
    return html`
      <h3 class="title">${t('company.company', { ns: 'ui' })}</h3>

      <sl-tab-group>
        ${COMPANY_PAGE_TABS_LIST.map((tab) => this.renderTab(tab))}
        ${COMPANY_PAGE_TABS_LIST.map((tab) => this.renderTabPanel(tab))}
      </sl-tab-group>
    `;
  }

  private renderTab = (tab: CompanyPageTabs) => {
    return html` <sl-tab slot="nav" panel=${tab}> ${t(`company.tabs.${tab}`, { ns: 'ui' })} </sl-tab> `;
  };

  private renderTabPanel = (tab: CompanyPageTabs) => {
    return html` <sl-tab-panel name=${tab}> ${this.renderTabPanelContent(tab)} </sl-tab-panel> `;
  };

  private renderTabPanelContent = (tab: CompanyPageTabs) => {
    switch (tab) {
      case CompanyPageTabs.clones:
        return html`<ca-company-clones-panel></ca-company-clones-panel>`;

      case CompanyPageTabs.sidejobs:
        return html`Side jobs`;
    }
  };
}
