import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';

@localized()
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

  render() {
    return html`
      <p class="hint">
        ${msg(`Program autoupgrade priority can be changed by dragging it by the title.
Programs on top have higher priority. Autoupgrade for programs won"t change their tier but will attempt to increase level.`)}
      </p>

      <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
        ${msg('Purchase program')}
      </sl-button>

      <ca-owned-programs-list></ca-owned-programs-list>

      <ca-purchase-program-dialog
        ?is-open=${this._isPurchaseProgramDialogOpen}
        @purchase-program-dialog-close=${this.handlePurchaseProgramDialogClose}
      >
      </ca-purchase-program-dialog>
    `;
  }

  private handlePurchaseProgramDialogOpen = () => {
    this._isPurchaseProgramDialogOpen = true;
  };

  private handlePurchaseProgramDialogClose = () => {
    this._isPurchaseProgramDialogOpen = false;
  };
}
