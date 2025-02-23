import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { MiscMenuItem, OverviewMenuItem } from '@shared/types';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
import { IHistoryState } from '@shared/interfaces/history-state';
import { MenuItemSelectedEvent } from './components/menu-bar/events';

@customElement('ca-game-screen')
export class GameScreen extends BaseComponent {
  static styles = css`
    .game-screen {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
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
      display: flex;
      padding: var(--sl-spacing-2x-small);
    }

    .content-outer-container {
      box-sizing: border-box;
      height: calc(100vh - var(--ca-top-bar-height));
      box-shadow: var(--sl-shadow-small);
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex: 1 1 auto;
    }

    .content-inner-container {
      width: 100vw;
      max-width: var(--ca-width-screen);
      display: flex;
      align-items: stretch;
    }

    .menu-bar-container {
      flex: 0 0 auto;
      box-sizing: border-box;
      background-color: var(--sl-panel-background-color);
      height: calc(100vh - var(--ca-top-bar-height));
      width: 0;
      position: absolute;
      top: var(--ca-top-bar-height);
      left: 0;
      transition: width var(--sl-transition-x-fast) ease;
    }

    .menu-bar-container.menu-opened {
      width: 100vw;
      border-right: var(--ca-border);
      z-index: 2;
    }

    .viewport-container {
      position: relative;
      flex: 1 1 auto;
      height: calc(100vh - var(--ca-top-bar-height));
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
        position: static;
        width: var(--ca-menu-bar-max-width);
        background-color: var(--sl-color-neutral-0);
        border-right: var(--ca-border);
      }

      .menu-bar-container.menu-opened {
        width: var(--ca-menu-bar-max-width);
        z-index: 0;
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

    const historyState = history.state as IHistoryState;

    this._menuOpened = historyState.menuOpened;
    this._selectedMenuItem = historyState.selectedMenuItem ?? OverviewMenuItem.overview;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(MenuItemSelectedEvent.type, this.handleMenuItemSelect);
    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(MenuItemSelectedEvent.type, this.handleMenuItemSelect);
    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
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
    const newMenuOpened = !this._menuOpened;

    const state: IHistoryState = {
      ...(window.history.state as IHistoryState),
      menuOpened: newMenuOpened,
    };

    if (newMenuOpened) {
      window.history.pushState(state, '');
      this._menuOpened = newMenuOpened;
    } else {
      window.history.back();
    }
  };

  private handleMenuItemSelect = (event: Event) => {
    event.stopPropagation();

    const menuItemSelectedEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectedEvent.menuItem as OverviewMenuItem;

    const state: IHistoryState = {
      ...(window.history.state as IHistoryState),
      selectedMenuItem: this._selectedMenuItem,
    };

    if (this._menuOpened) {
      this._menuOpened = false;
      state.menuOpened = false;

      window.history.replaceState(state, '');
    } else {
      window.history.pushState(state, '');
    }
  };

  private handlePopState = (event: PopStateEvent) => {
    const state = event.state as IHistoryState;

    this._selectedMenuItem = state.selectedMenuItem;
    this._menuOpened = state.menuOpened;
  };
}
