import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DeleteSaveDataDialogClose, DeleteSaveDataDialogSubmit } from './events';

@customElement('ca-delete-save-data-dialog')
export class DeleteSaveDataDialog extends LitElement {
  static styles = css`
    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }
  `;

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  render() {
    return html`
      <sl-dialog no-header ?open=${this.isOpen} @sl-request-close=${this.handleDeleteSaveDataDialogClose}>
        <intl-message label="ui:settings:deleteSaveDataAlert">
          Are you sure want to delete save data? You cannot revert this operation unless you exported a backup savefile.
        </intl-message>

        <div slot="footer">
          <sl-button size="medium" variant="default" outline @click=${this.handleDeleteSaveDataDialogClose}>
            <intl-message label="ui:common:cancel"> Cancel </intl-message>
          </sl-button>
          <sl-button size="medium" variant="danger" @click=${this.handleDeleteSaveDataDialogSubmit}>
            <intl-message label="ui:common:delete"> Delete </intl-message>
          </sl-button>
        </div>
      </sl-dialog>
    `;
  }

  private handleDeleteSaveDataDialogClose = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new DeleteSaveDataDialogClose());
  };

  private handleDeleteSaveDataDialogSubmit = (event: Event) => {
    event.stopPropagation();

    this.dispatchEvent(new DeleteSaveDataDialogSubmit());
  };
}
