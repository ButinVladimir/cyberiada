import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewMenuItem, MiscMenuItem } from '@shared/types';

@customElement('ca-viewport')
export class Viewport extends BaseComponent {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --content-padding: var(--sl-spacing-small) var(--sl-spacing-medium);
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    div.content-wrapper {
      max-width: var(--ca-max-content-width);
    }
  `;

  @property({
    attribute: 'selected-menu-item',
    type: String,
  })
  selectedMenuItem = '';

  renderContent() {
    return html`
      <scrollable-component>
        <div class="content-wrapper">${this.renderPage()}</div>
      </scrollable-component>
    `;
  }

  private renderPage = () => {
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
        return null;
    }
  };
}
