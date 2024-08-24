import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ca-mainframe-owned-programs-panel')
export class MainframeHardwarePanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    ca-owned-programs-list {
      margin-top: var(--sl-spacing-large);
    }
  `;

  @state()
  private _isPurchaseProgramDialogOpen = false;

  render() {
    return html`
      <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
        <intl-message label="ui:mainframe:ownedPrograms:purchaseProgram"> Purchase a program </intl-message>
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
