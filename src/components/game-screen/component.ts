import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent, MiscMenuItem, OverviewMenuItem } from '@shared/index';
import { MenuItemSelectedEvent } from './components/menu-bar/events';
import styles from './styles';

@customElement('ca-game-screen')
export class GameScreen extends BaseComponent {
  static styles = styles;

  protected hasMobileRender = true;
  protected hasTabletRender = true;

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

  protected renderDesktop() {
    return this.renderWithoutOverlay();
  }

  protected renderTablet() {
    return this.renderWithOverlay();
  }

  protected renderMobile() {
    return this.renderWithOverlay();
  }

  private renderWithOverlay() {
    const menuClasses = classMap({
      'menu-bar-container': true,
      'menu-opened': this._menuOpened,
      mobile: this.layoutContext === 'mobile',
      tablet: this.layoutContext === 'tablet',
    });

    const viewportOverlayClasses = classMap({
      'viewport-overlay': true,
      'menu-opened': this._menuOpened,
    });

    return html`
      <div class="game-screen with-overlay">
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

  private renderWithoutOverlay() {
    return html`
      <div class="game-screen without-overlay">
        <div class="top-bar-outer-container">
          <div class="top-bar-inner-container">
            <ca-top-bar @menu-toggled=${this.handleMenuToggle}> </ca-top-bar>
          </div>
        </div>

        <div class="content-outer-container">
          <div class="content-inner-container">
            <div class="menu-bar-container">
              <ca-menu-bar selected-menu-item=${ifDefined(this._selectedMenuItem)}> </ca-menu-bar>
            </div>

            <div class="viewport-container">
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
    const menuItemSelectedEvent = event as MenuItemSelectedEvent;

    this._selectedMenuItem = menuItemSelectedEvent.menuItem as OverviewMenuItem;

    if (this._menuOpened) {
      this._menuOpened = false;
    }
  };
}
