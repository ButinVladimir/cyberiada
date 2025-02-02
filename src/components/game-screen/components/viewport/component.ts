import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewMenuItem, MiscMenuItem } from '@shared/types';
import constants from '@configs/constants.json';
import { Feature } from '@shared/types';
import { ViewportController } from './controller';

@customElement('ca-viewport')
export class Viewport extends BaseComponent<ViewportController> {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      scrollbar-gutter: stable;
      scrollbar-width: thin;
      overflow: auto;
    }

    div.content-wrapper {
      width: 100%;
      max-width: var(--ca-width-widescreen-content);
      padding: var(--sl-spacing-medium);
      box-sizing: border-box;
    }
  `;

  @property({
    attribute: 'selected-menu-item',
    type: String,
  })
  selectedMenuItem = '';

  protected controller: ViewportController;

  constructor() {
    super();

    this.controller = new ViewportController(this);
  }

  renderContent() {
    return html` <div class="content-wrapper">${this.renderPage()}</div> `;
  }

  private renderPage = () => {
    const requirements = constants.menuUnlockRequirements as Record<string, Feature>;
    const feature = requirements[this.selectedMenuItem] as Feature | undefined;

    if (feature && !this.controller.isFeatureUnlocked(feature)) {
      return nothing;
    }

    switch (this.selectedMenuItem) {
      case OverviewMenuItem.cityOverview:
        return html`<ca-city-page></ca-city-page>`;

      case OverviewMenuItem.mainframe:
        return html`<ca-mainframe-page></ca-mainframe-page>`;

      case OverviewMenuItem.automation:
        return html`<ca-automation-page></ca-automation-page>`;

      case OverviewMenuItem.statistics:
        return html`<ca-statistics-page></ca-statistics-page>`;

      case OverviewMenuItem.messageLog:
        return html`<ca-message-log-page></ca-message-log-page>`;

      case MiscMenuItem.settings:
        return html`<ca-settings-page></ca-settings-page>`;

      case MiscMenuItem.credits:
        return html`<ca-credits-page></ca-credits-page>`;

      default:
        return nothing;
    }
  };
}
