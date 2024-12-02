import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';

@customElement('ca-mainframe-programs-panel')
export class MainframeProgramsPanel extends BaseComponent {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    ca-owned-programs-list {
      margin-top: var(--sl-spacing-large);
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }
  `;

  @state()
  private _isPurchaseProgramDialogOpen = false;

  renderContent() {
    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:programs:programsHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>

      <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
        <intl-message label="ui:mainframe:programs:purchaseProgram"> Purchase a program </intl-message>
      </sl-button>

      <ca-purchase-program-dialog
        ?is-open=${this._isPurchaseProgramDialogOpen}
        @purchase-program-dialog-close=${this.handlePurchaseProgramDialogClose}
      >
      </ca-purchase-program-dialog>

      <ca-owned-programs-list></ca-owned-programs-list>
    `;
  }

  private handlePurchaseProgramDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseProgramDialogOpen = true;
  };

  private handlePurchaseProgramDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isPurchaseProgramDialogOpen = false;
  };
}
