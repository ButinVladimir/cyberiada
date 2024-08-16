import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ca-mainframe-owned-programs-panel')
export class MainframeHardwarePanel extends LitElement {
  static styles = css``;

  @state()
  private _isBuyProgramDialogOpen = false;

  render() {
    return html`
      <sl-button variant="primary" size="medium" @click=${this.handleBuyProgramDialogOpen}>
        <intl-message label="ui:mainframe:ownedPrograms:buyProgram"> Buy a program </intl-message>
      </sl-button>

      <ca-buy-program-dialog
        ?is-open=${this._isBuyProgramDialogOpen}
        @buy-program-dialog-close=${this.handleBuyProgramDialogClose}
      >
      </ca-buy-program-dialog>
    `;
  }

  private handleBuyProgramDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isBuyProgramDialogOpen = true;
  };

  private handleBuyProgramDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isBuyProgramDialogOpen = false;
  };
}
