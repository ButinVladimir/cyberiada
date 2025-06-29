import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { AppStage } from '@state/app';
import { BaseComponent, type Layout, LAYOUT_WIDTH_THRESHOLDS, layoutContext } from '@shared/index';
import { AppRootController } from './controller';

@customElement('ca-app-root')
export class AppRoot extends BaseComponent {
  private _controller: AppRootController;

  @provide({ context: layoutContext })
  private _layoutContextProvider: Layout = 'desktop';

  private matchMobile: MediaQueryList;
  private matchTablet: MediaQueryList;
  private matchDesktop: MediaQueryList;

  constructor() {
    super();

    this._controller = new AppRootController(this);

    this.matchMobile = window.matchMedia(`(max-width: ${LAYOUT_WIDTH_THRESHOLDS.TABLET}px)`);
    this.matchTablet = window.matchMedia(`(min-width: ${LAYOUT_WIDTH_THRESHOLDS.TABLET}px)`);
    this.matchDesktop = window.matchMedia(`(min-width: ${LAYOUT_WIDTH_THRESHOLDS.DESKTOP}px)`);

    if (this.matchDesktop.matches) {
      this._layoutContextProvider = 'desktop';
    } else if (this.matchTablet.matches) {
      this._layoutContextProvider = 'tablet';
    } else {
      this._layoutContextProvider = 'mobile';
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.matchMobile.addEventListener('change', this.handleSwitchToMobile);
    this.matchTablet.addEventListener('change', this.handleSwitchToTablet);
    this.matchDesktop.addEventListener('change', this.handleSwitchToDesktop);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.matchMobile.removeEventListener('change', this.handleSwitchToMobile);
    this.matchTablet.removeEventListener('change', this.handleSwitchToTablet);
    this.matchDesktop.removeEventListener('change', this.handleSwitchToDesktop);
  }

  protected renderDesktop() {
    switch (this._controller.appStage) {
      case AppStage.loading:
        return html`<ca-loading-screen></ca-loading-screen>`;

      case AppStage.running:
        return html`<ca-game-screen></ca-game-screen>`;

      case AppStage.fastForward:
        return html`<ca-fast-forwarding-screen></ca-fast-forwarding-screen>`;

      default:
        return nothing;
    }
  }

  handleSwitchToMobile = (event: MediaQueryListEvent) => {
    if (event.matches) {
      this._layoutContextProvider = 'mobile';
    }
  };

  handleSwitchToTablet = (event: MediaQueryListEvent) => {
    if (event.matches) {
      this._layoutContextProvider = 'tablet';
    }
  };

  handleSwitchToDesktop = (event: MediaQueryListEvent) => {
    if (event.matches) {
      this._layoutContextProvider = 'desktop';
    }
  };
}
