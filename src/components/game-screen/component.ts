import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { LogsToggledEvent, MenuToggledEvent } from './components/top-bar/events';
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
        --ca-max-width: 1920px;
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
        transition: width 500ms ease-in-out;
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
        padding: var(--sl-spacing-small);
      }

      .logs-bar-container {
        border-left: var(--sl-panel-border-width) solid var(--sl-panel-border-color);  
      }
      .logs-bar-container.opened {
        width: 32%;
      }
    `;

  @state()
  private menuOpened = true;

  @state()
  private logsOpened = true;

  @state()
  private selectedMenuItem = '';

  constructor() {
    super();

    this.addEventListener(MenuToggledEvent.type, this.handleMenuToggle);
    this.addEventListener(LogsToggledEvent.type, this.handleLogsToggle);
    this.addEventListener(MenuItemSelectedEvent.type, this.handleMenuItemSelect);
  }

  render() {
    const menuClasses = classMap({
      "side-bar-container": true,
      "menu-bar-container": true,
      opened: this.menuOpened,
    });

    const logsClasses = classMap({
      "side-bar-container": true,
      "logs-bar-container": true,
      opened: this.logsOpened,
    });

    return html`
      <div class="top-bar-outer-container">
        <div class="top-bar-inner-container">
          <ca-top-bar>
          </ca-top-bar>
        </div>
      </div>

      <div class="content-outer-container">
        <div class="content-inner-container">
          <div class=${menuClasses}>
            <ca-menu-bar selectedMenuItem=${this.selectedMenuItem}></ca-menu-bar>
          </div>

          <div class="viewport-container">
            <ca-viewport></ca-viewport>
          </div>

          <div class=${logsClasses}>
            <ca-logs-bar></ca-logs-bar>
          </div>
        </div>
      </div>
    `;
  }

  private handleMenuToggle = () => {
    this.menuOpened = !this.menuOpened;
  };

  private handleLogsToggle = () => {
    this.logsOpened = !this.logsOpened;
  };

  private handleMenuItemSelect = (event: Event) => {
    const menuItemSelectEvent = event as MenuItemSelectedEvent;

    this.selectedMenuItem = menuItemSelectEvent.menuItem;
  };
}
