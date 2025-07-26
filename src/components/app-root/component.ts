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

  private _matchTablet: MediaQueryList;
  private _matchDesktop: MediaQueryList;

  private _matchesTablet: boolean;
  private _matchesDesktop: boolean;

  constructor() {
    super();

    this._controller = new AppRootController(this);
    const pixelRatio = window.devicePixelRatio;
    const tabletThreshold = Math.floor(LAYOUT_WIDTH_THRESHOLDS.TABLET * pixelRatio);
    const desktopThreshold = Math.floor(LAYOUT_WIDTH_THRESHOLDS.DESKTOP * pixelRatio);

    this._matchTablet = window.matchMedia(`(min-width: ${tabletThreshold}px)`);
    this._matchDesktop = window.matchMedia(`(min-width: ${desktopThreshold}px)`);

    this._matchesDesktop = this._matchDesktop.matches;
    this._matchesTablet = this._matchTablet.matches;

    this.updateLayout();
  }

  connectedCallback() {
    super.connectedCallback();

    this._matchTablet.addEventListener('change', this.handleSwitchToTablet);
    this._matchDesktop.addEventListener('change', this.handleSwitchToDesktop);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._matchTablet.removeEventListener('change', this.handleSwitchToTablet);
    this._matchDesktop.removeEventListener('change', this.handleSwitchToDesktop);
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

  private handleSwitchToTablet = (event: MediaQueryListEvent) => {
    this._matchesTablet = event.matches;

    this.updateLayout();
  };

  private handleSwitchToDesktop = (event: MediaQueryListEvent) => {
    this._matchesDesktop = event.matches;

    this.updateLayout();
  };

  private updateLayout() {
    if (this._matchesDesktop) {
      this._layoutContextProvider = 'desktop';
    } else if (this._matchesTablet) {
      this._layoutContextProvider = 'tablet';
    } else {
      this._layoutContextProvider = 'mobile';
    }
  }
}
