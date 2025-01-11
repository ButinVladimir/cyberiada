import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@shared/base-component';
import { OverviewMenuItem } from '@shared/types';
import { SCREEN_WIDTH_POINTS } from '@shared/styles';
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
      background-color: var(--sl-color-neutral-100);
    }

    .top-bar-outer-container {
      background-color: var(--sl-panel-background-color);
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
      background-color: var(--sl-panel-background-color);
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
      border-right: var(--ca-border);
      position: absolute;
      top: var(--ca-top-bar-height);
      left: 0;
      transition: width var(--sl-transition-x-fast) ease;
    }

    .menu-bar-container.menu-opened {
      width: 100vw;
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
      background-color: var(--sl-panel-background-color);
      opacity: 0.5;
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
  private _menuOpened = false;

  @state()
  private _selectedMenuItem?: OverviewMenuItem;

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
              <ca-menu-bar
                selected-menu-item=${ifDefined(this._selectedMenuItem)}
                @menu-item-selected=${this.handleMenuItemSelect}
              >
              </ca-menu-bar>
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
    const menuItemSelectEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectEvent.menuItem as OverviewMenuItem;
    this._menuOpened = false;
  };
}
