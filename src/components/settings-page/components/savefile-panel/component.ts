import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { SavefilePanelController } from './controller';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.component.js';

@customElement('ca-savefile-panel')
export class SavefilePanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    :host > sl-button:not(:last-child) {
      margin-right: var(--sl-spacing-large);
    }

    input#import-file {
      display: none;
    }

    sl-dialog.delete-save-data-dialog {
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-medium);
      font-weight: var(--sl-font-weight-normal);
      letter-spacing: var(--sl-letter-spacing-normal);
      line-height: var(--sl-line-height-normal);
      color: var(--sl-color-neutral-950);
    }

    sl-dialog.delete-save-data-dialog div.footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    sl-dialog.delete-save-data-dialog div.footer > sl-button:last-child {
      margin-left: var(--sl-spacing-small);
    }
  `;

  private _savefilePanelController: SavefilePanelController;

  @query('input#import-file', true)
  private _importInput!: HTMLInputElement;

  @query('sl-dialog.delete-save-data-dialog', true)
  private _deleteSaveDataDialog!: SlDialog;

  constructor() {
    super();

    this._savefilePanelController = new SavefilePanelController(this);
  }

  render() {
    return html`
      <input type="file" id="import-file" @change=${this.handleChangeImportSavefile} />
      
      <sl-button
        variant="default"
        type="button"
        size="medium"
        outline
        @click=${this.handleImportSavefile}
      >
        <intl-message label="ui:settings:importSavefile">
          Import savefile
        </intl-message>
      </sl-button>

      <sl-button
        variant="default"
        type="button"
        size="medium"
        outline
        @click=${this.handleExportSavefile}
      >
        <intl-message label="ui:settings:exportSavefile">
          Export savefile
        </intl-message>
      </sl-button>

      <sl-button
        variant="danger"
        type="button"
        size="medium"
        @click=${this.handleOpenDeleteSaveDataDialog}
      >
        <intl-message label="ui:settings:deleteSaveData">
          Delete save data
        </intl-message>
      </sl-button>

      <sl-dialog no-header class="delete-save-data-dialog"> 
        <intl-message label="ui:settings:deleteSaveDataAlert">
          Are you sure want to delete save data? You cannot revert this operation unless you exported a backup savefile.
        </intl-message>
        <div slot="footer" class="footer">
          <sl-button
            size="medium"
            variant="default"
            outline
            @click=${this.handleCloseDeleteSaveDataDialog}
          >
            <intl-message label="ui:common:cancel">
              Cancel
            </intl-message>
          </sl-button>
          <sl-button
            size="medium"
            variant="danger"
            @click=${this.handleDeleteSaveData}
          >
            <intl-message label="ui:common:delete">
              Delete
            </intl-message>
          </sl-button>
        </div>
      </sl-dialog>
    `
  }

  private handleImportSavefile = (event: Event) => {
    event.stopPropagation();

    this._importInput.click();
  };

  private handleChangeImportSavefile = (event: Event) => {
    event.stopPropagation();

    const importedSavefile = this._importInput.files?.item(0);

    if (importedSavefile) {
      this._savefilePanelController.importSavefile(importedSavefile);
    }
  };

  private handleExportSavefile = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.exportSavefile();
  };

  private handleOpenDeleteSaveDataDialog = (event: Event) => {
    event.stopPropagation();

    this._deleteSaveDataDialog.show();    
  }

  private handleCloseDeleteSaveDataDialog = (event: Event) => {
    event.stopPropagation();

    this._deleteSaveDataDialog.hide();    
  }

  private handleDeleteSaveData = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.deleteSaveData();
  }
}
