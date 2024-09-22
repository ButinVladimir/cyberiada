import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { GameStateAlert } from '@shared/types';
import { SavefilePanelController } from './controller';

@customElement('ca-savefile-panel')
export class SavefilePanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }

    input#import-file {
      display: none;
    }
  `;

  private _savefilePanelController: SavefilePanelController;

  private _importInputRef = createRef<HTMLInputElement>();

  @state()
  private _isImportSavefileDialogOpen = false;

  @state()
  private _isDeleteSaveDataDialogOpen = false;

  constructor() {
    super();

    this._savefilePanelController = new SavefilePanelController(this);
  }

  render() {
    return html`
      <input ${ref(this._importInputRef)} type="file" id="import-file" @change=${this.handleChangeImportSavefile} />

      <sl-button variant="primary" type="button" size="medium" @click=${this.handleSaveGame}>
        <intl-message label="ui:settings:saveGame"> Save game </intl-message>
      </sl-button>

      <sl-button
        variant="default"
        type="button"
        size="medium"
        outline
        @click=${this.handleImportSavefileDialogPresubmit}
      >
        <intl-message label="ui:settings:importSavefile"> Import savefile </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleExportSavefile}>
        <intl-message label="ui:settings:exportSavefile"> Export savefile </intl-message>
      </sl-button>

      <sl-button variant="danger" type="button" size="medium" @click=${this.handleDeleteSaveDataDialogPresubmit}>
        <intl-message label="ui:settings:deleteSaveData"> Delete save data </intl-message>
      </sl-button>

      <ca-confirmation-alert-modal
        ?is-open=${this._isImportSavefileDialogOpen}
        game-alert=${GameStateAlert.saveImport}
        @confirmation-alert-close=${this.handleImportSavefileDialogClose}
        @confirmation-alert-submit=${this.handleImportSavefileDialogSubmit}
      >
      </ca-confirmation-alert-modal>

      <ca-confirmation-alert-modal
        ?is-open=${this._isDeleteSaveDataDialogOpen}
        game-alert=${GameStateAlert.saveDelete}
        @confirmation-alert-close=${this.handleDeleteSaveDataDialogClose}
        @confirmation-alert-submit=${this.handleDeleteSaveDataDialogSubmit}
      >
      </ca-confirmation-alert-modal>
    `;
  }

  private handleSaveGame = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.saveGame();
  };

  private handleImportSavefileDialogClose = (event: Event) => {
    event.stopPropagation();

    this._isImportSavefileDialogOpen = false;
  };

  private handleImportSavefileDialogPresubmit = (event: Event) => {
    event.stopPropagation();

    if (this._savefilePanelController.isGameAlertEnabled(GameStateAlert.saveImport)) {
      this._isImportSavefileDialogOpen = true;
    } else {
      this.handleImportSavefileDialogSubmit(event);
    }
  };

  private handleImportSavefileDialogSubmit = (event: Event) => {
    event.stopPropagation();

    this._isImportSavefileDialogOpen = false;

    if (this._importInputRef.value) {
      this._importInputRef.value.click();
    }
  };

  private handleChangeImportSavefile = (event: Event) => {
    event.stopPropagation();

    if (!this._importInputRef.value) {
      return;
    }

    const importedSavefile = this._importInputRef.value.files?.item(0);

    if (importedSavefile) {
      this._savefilePanelController.importSavefile(importedSavefile);
    }
  };

  private handleExportSavefile = (event: Event) => {
    event.stopPropagation();

    this._savefilePanelController.exportSavefile();
  };

  private handleDeleteSaveDataDialogClose = (event: Event) => {
    event.stopPropagation();

    this._isDeleteSaveDataDialogOpen = false;
  };

  private handleDeleteSaveDataDialogPresubmit = async (event: Event) => {
    event.stopPropagation();

    if (this._savefilePanelController.isGameAlertEnabled(GameStateAlert.saveDelete)) {
      this._isDeleteSaveDataDialogOpen = true;
    } else {
      await this.handleDeleteSaveDataDialogSubmit(event);
    }
  };

  private handleDeleteSaveDataDialogSubmit = async (event: Event) => {
    event.stopPropagation();

    this._isDeleteSaveDataDialogOpen = false;

    await this._savefilePanelController.deleteSaveData();
  };
}
