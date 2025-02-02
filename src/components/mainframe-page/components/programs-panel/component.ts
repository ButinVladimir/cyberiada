import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';
import { OverviewMenuItem } from '@shared/types';
import { IHistoryState } from '@shared/interfaces/history-state';
import { IMainframePageHistoryState } from '../../interfaces';

@customElement('ca-mainframe-programs-panel')
export class MainframeProgramsPanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: var(--sl-spacing-large);
      }

      p.hint {
        margin: 0;
      }
    `,
  ];

  @state()
  private _isPurchaseProgramDialogOpen = false;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('popstate', this.handlePopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('popstate', this.handlePopState);
  }

  renderContent() {
    return html`
      <p class="hint">${t('mainframe.programs.programsHint', { ns: 'ui' })}</p>

      <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
        ${t('mainframe.programs.purchaseProgram', { ns: 'ui' })}
      </sl-button>

      <ca-owned-programs-list></ca-owned-programs-list>

      <ca-purchase-program-dialog
        ?is-open=${this._isPurchaseProgramDialogOpen}
        @purchase-program-dialog-close=${this.handlePurchaseProgramDialogClose}
      >
      </ca-purchase-program-dialog>
    `;
  }

  private handlePurchaseProgramDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseProgramDialogOpen = true;

    const state = { ...window.history.state, purchaseProgramModalOpen: true } as IMainframePageHistoryState;
    window.history.pushState(state, '');
  };

  private handlePurchaseProgramDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    window.history.back();
  };

  private handlePopState = (event: PopStateEvent) => {
    if ((event.state as IHistoryState).selectedMenuItem === OverviewMenuItem.mainframe) {
      const state = event.state as IMainframePageHistoryState;

      this._isPurchaseProgramDialogOpen = !!state.purchaseProgramModalOpen;
    }
  };
}
