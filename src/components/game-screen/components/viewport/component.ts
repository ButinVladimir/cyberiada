import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewMenuItem, MiscMenuItem } from '@shared/types';
import constants from '@configs/constants.json';
import { Feature } from '@shared/types';
import { ViewportController } from './controller';
import { cache } from 'lit/directives/cache.js';

@customElement('ca-viewport')
export class Viewport extends BaseComponent {
  static styles = css`
    div.content-wrapper {
      width: 100%;
      max-width: var(--ca-width-widescreen-content);
      padding: var(--sl-spacing-2x-large);
      box-sizing: border-box;
    }
  `;

  @property({
    attribute: 'selected-menu-item',
    type: String,
  })
  selectedMenuItem = '';

  private _controller: ViewportController;

  constructor() {
    super();

    this._controller = new ViewportController(this);
  }

  render() {
    return html` <div class="content-wrapper">${cache(this.renderPage())}</div> `;
  }

  private renderPage = () => {
    const requirements = constants.menuUnlockRequirements as Record<string, Feature>;
    const feature = requirements[this.selectedMenuItem] as Feature | undefined;

    if (feature && !this._controller.isFeatureUnlocked(feature)) {
      return nothing;
    }

    switch (this.selectedMenuItem) {
      case OverviewMenuItem.overview:
        return html`<ca-overview-page></ca-overview-page>`;

      case OverviewMenuItem.city:
        return html`<ca-city-page></ca-city-page>`;

      case OverviewMenuItem.company:
        return html`<ca-company-page></ca-company-page>`;

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
