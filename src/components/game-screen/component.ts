import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { MiscMenuItem, OverviewMenuItem } from '@shared/types';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { MenuItemSelectedEvent } from './components/menu-bar/events';

@customElement('ca-game-screen')
export class GameScreen extends LitElement {
  static styles = css`
    .game-screen {
      width: 100vw;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: start;
      background-color: var(--sl-color-neutral-0);
    }

    .top-bar-outer-container {
      border-bottom: var(--ca-border);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      height: var(--ca-top-bar-height);
    }

    .top-bar-inner-container {
      width: 100vw;
      max-width: var(--ca-width-screen);
      padding: var(--sl-spacing-2x-small);
    }

    .content-outer-container {
      box-sizing: border-box;
      height: calc(100dvh - var(--ca-top-bar-height));
      box-shadow: var(--sl-shadow-small);
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex: 1 1 auto;
    }

    .content-inner-container {
      position: relative;
      width: 100vw;
      max-width: var(--ca-width-screen);
      height: 100%;
    }

    .menu-bar-container {
      box-sizing: border-box;
      background-color: var(--sl-panel-background-color);
      height: 100%;
      width: 0;
      position: absolute;
      top: 0;
      left: 0;
      transition: width var(--sl-transition-x-fast) ease;
    }

    .menu-bar-container.menu-opened {
      width: 100vw;
      border-right: var(--ca-border);
      z-index: 2;
    }

    .viewport-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      scrollbar-width: thin;
      overflow: auto;
    }

    .viewport-overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--sl-overlay-background-color);
    }

    .viewport-overlay.menu-opened {
      display: block;
      z-index: 1;
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .menu-bar-container.menu-opened {
        width: var(--ca-menu-bar-max-width);
      }
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.WIDE_SCREEN}) {
      .menu-bar-container {
        width: var(--ca-menu-bar-max-width);
        background-color: var(--sl-color-neutral-0);
        border-right: var(--ca-border);
      }

      .menu-bar-container.menu-opened {
        width: var(--ca-menu-bar-max-width);
        z-index: 0;
      }

      .viewport-container {
        left: var(--ca-menu-bar-max-width);
        width: calc(100% - var(--ca-menu-bar-max-width));
      }

      .viewport-overlay.menu-opened {
        display: none;
        z-index: 0;
      }
    }
  `;

  @state()
  private _menuOpened;

  @state()
  private _selectedMenuItem?: OverviewMenuItem | MiscMenuItem = OverviewMenuItem.overview;

  constructor() {
    super();

    this._menuOpened = false;
    this._selectedMenuItem = OverviewMenuItem.overview;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(MenuItemSelectedEvent.type, this.handleMenuItemSelect);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(MenuItemSelectedEvent.type, this.handleMenuItemSelect);
  }

  render() {
    const menuClasses = classMap({
      'menu-bar-container': true,
      'menu-opened': this._menuOpened,
    });

    const viewportOverlayClasses = classMap({
      'viewport-overlay': true,
      'menu-opened': this._menuOpened,
    });

    return html`
      <div class="game-screen">
        <div class="top-bar-outer-container">
          <div class="top-bar-inner-container">
            <ca-top-bar @menu-toggled=${this.handleMenuToggle}> </ca-top-bar>
          </div>
        </div>

        <div class="content-outer-container">
          <div class="content-inner-container">
            <div class=${menuClasses}>
              <ca-menu-bar selected-menu-item=${ifDefined(this._selectedMenuItem)}> </ca-menu-bar>
            </div>

            <div class="viewport-container">
              <div class=${viewportOverlayClasses} @click=${this.handleMenuToggle}></div>

              <ca-viewport selected-menu-item=${ifDefined(this._selectedMenuItem)}></ca-viewport>
            </div>
          </div>
        </div>
      </div>

      <ca-toasts></ca-toasts>
      <ca-confirmation-alert></ca-confirmation-alert>
      <ca-notification-modal></ca-notification-modal>
    `;
  }

  private handleMenuToggle = () => {
    this._menuOpened = !this._menuOpened;
  };

  private handleMenuItemSelect = (event: Event) => {
    event.stopPropagation();

    const menuItemSelectedEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectedEvent.menuItem as OverviewMenuItem;

    if (this._menuOpened) {
      this._menuOpened = false;
    }
  };
}
