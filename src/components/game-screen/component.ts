import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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
      border-bottom: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
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
      border-bottom: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
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
      visibility: hidden;
      transition:
        width var(--sl-transition-x-fast) ease-in-out,
        visibility var(--sl-transition-x-fast) ease-in-out;
    }

    .side-bar-container.opened {
      visibility: visible;
    }

    .menu-bar-container {
      border-right: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
    }
    .menu-bar-container.opened {
      width: 16%;
    }

    .viewport-container {
      flex: 1 1 auto;
      overflow: auto;
      scrollbar-width: thin;
      padding: var(--sl-spacing-small) var(--sl-spacing-medium);
    }

    .message-log-bar-container {
      border-left: var(--sl-panel-border-width) solid var(--sl-panel-border-color);
    }
    .message-log-bar-container.opened {
      width: 32%;
    }
  `;

  @state()
  private _menuOpened = true;

  @state()
  private _logsOpened = true;

  @state()
  private _selectedMenuItem = OverviewMenuItem.cityOverview;

  render() {
    const menuClasses = classMap({
      'side-bar-container': true,
      'menu-bar-container': true,
      opened: this._menuOpened,
    });

    const messageLogClasses = classMap({
      'side-bar-container': true,
      'message-log-bar-container': true,
      opened: this._logsOpened,
    });

    return html`
      <div class="top-bar-outer-container">
        <div class="top-bar-inner-container">
          <ca-top-bar @menu-toggled=${this.handleMenuToggle} @logs-toggled=${this.handleLogsToggle}> </ca-top-bar>
        </div>
      </div>

      <div class="content-outer-container">
        <div class="content-inner-container">
          <div class=${menuClasses}>
            <ca-menu-bar selected-menu-item=${this._selectedMenuItem} @menu-item-selected=${this.handleMenuItemSelect}>
            </ca-menu-bar>
          </div>

          <div class="viewport-container">
            <ca-viewport selected-menu-item=${this._selectedMenuItem}></ca-viewport>
          </div>

          <div class=${messageLogClasses}>
            <ca-message-log-bar></ca-logs-bar>
          </div>
        </div>
      </div>
    `;
  }

  private handleMenuToggle = () => {
    this._menuOpened = !this._menuOpened;
  };

  private handleLogsToggle = () => {
    this._logsOpened = !this._logsOpened;
  };

  private handleMenuItemSelect = (event: Event) => {
    const menuItemSelectEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectEvent.menuItem as OverviewMenuItem;
  };
}
