import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { OverviewMenuItem } from '@shared/types';
import { MenuItemSelectedEvent } from './components/menu-bar/events';

@customElement('ca-game-screen')
export class GameScreen extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: start;
      background-color: var(--sl-color-neutral-100);
    }

    .top-bar-outer-container {
      background-color: var(--sl-panel-background-color);
      border-bottom: var(--ca-border);
      box-shadow: var(--sl-shadow-small);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 0 0 auto;
      z-index: 2;
    }

    .top-bar-inner-container {
      max-width: var(--ca-max-width);
      width: 100vw;
      display: flex;
      padding: var(--sl-spacing-small);
    }

    .content-outer-container {
      border-bottom: var(--ca-border);
      box-shadow: var(--sl-shadow-small);
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex: 1 1 auto;
    }

    .content-inner-container {
      background-color: var(--sl-panel-background-color);
      max-width: var(--ca-max-width);
      width: 100vw;
      display: flex;
      align-items: stretch;
    }

    .side-bar-container {
      width: 0;
      display: flex;
      flex: 0 0 auto;
      overflow: auto;
      scrollbar-width: thin;
      box-sizing: border-box;
    }

    .menu-bar-container {
      width: 16%;
      border-right: var(--ca-border);
    }

    .viewport-container {
      flex: 1 1 auto;
      overflow: auto;
      scrollbar-width: thin;
      padding: var(--sl-spacing-small) var(--sl-spacing-medium);
    }

    .message-log-bar-container {
      width: 24%;
      border-left: var(--ca-border);
    }
  `;

  @state()
  private _menuOpened = true;

  @state()
  private _messageLogOpened = true;

  @state()
  private _selectedMenuItem = OverviewMenuItem.cityOverview;

  render() {
    return html`
      <div class="top-bar-outer-container">
        <div class="top-bar-inner-container">
          <ca-top-bar @menu-toggled=${this.handleMenuToggle} @logs-toggled=${this.handleMessageLogToggle}> </ca-top-bar>
        </div>
      </div>

      <div class="content-outer-container">
        <div class="content-inner-container">
          ${this._menuOpened
            ? html`
                <div class="side-bar-container menu-bar-container">
                  <ca-menu-bar
                    selected-menu-item=${this._selectedMenuItem}
                    @menu-item-selected=${this.handleMenuItemSelect}
                  >
                  </ca-menu-bar>
                </div>
              `
            : nothing}

          <div class="viewport-container">
            <ca-viewport selected-menu-item=${this._selectedMenuItem}></ca-viewport>
          </div>

          ${this._messageLogOpened
            ? html`
                <div class="side-bar-container message-log-bar-container">
                  <ca-message-log-bar></ca-message-log-bar>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private handleMenuToggle = () => {
    this._menuOpened = !this._menuOpened;
  };

  private handleMessageLogToggle = () => {
    this._messageLogOpened = !this._messageLogOpened;
  };

  private handleMenuItemSelect = (event: Event) => {
    const menuItemSelectEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectEvent.menuItem as OverviewMenuItem;
  };
}
