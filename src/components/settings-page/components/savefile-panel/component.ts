import { css, html } from 'lit';
import { localized, msg } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import { GameStateAlert } from '@shared/types';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { SavefilePanelController } from './controller';

@localized()
@customElement('ca-savefile-panel')
export class SavefilePanel extends BaseComponent {
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

  private _controller: SavefilePanelController;

  private _importInputRef = createRef<HTMLInputElement>();

  constructor() {
    super();

    this._controller = new SavefilePanelController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmImportSavefileDialog);
    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteSaveDataDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmImportSavefileDialog);
    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteSaveDataDialog);
  }

  render() {
    return html`
      <input ${ref(this._importInputRef)} type="file" id="import-file" @change=${this.handleChangeImportSavefile} />

      <sl-button variant="primary" type="button" size="medium" @click=${this.handleSaveGame}>
        ${msg('Save game')}
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleOpenImportSavefileDialog}>
        ${msg('Import savefile')}
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleExportSavefile}>
        ${msg('Export savefile')}
      </sl-button>

      <sl-button variant="danger" type="button" size="medium" @click=${this.handleOpenDeleteSaveDataDialog}>
        ${msg('Delete save data')}
      </sl-button>
    `;
  }

  private handleSaveGame = () => {
    this._controller.saveGame();
  };

  private handleOpenImportSavefileDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        GameStateAlert.saveImport,
        msg('Are you sure want to import savefile? Your current progress will be lost.'),
      ),
    );
  };

  private handleConfirmImportSavefileDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.saveImport) {
      return;
    }

    if (this._importInputRef.value) {
      this._importInputRef.value.click();
    }
  };

  private handleChangeImportSavefile = () => {
    if (!this._importInputRef.value) {
      return;
    }

    const importedSavefile = this._importInputRef.value.files?.item(0);

    if (importedSavefile) {
      this._controller.importSavefile(importedSavefile);
    }
  };

  private handleExportSavefile = () => {
    this._controller.exportSavefile();
  };

  private handleOpenDeleteSaveDataDialog = () => {
    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(
        GameStateAlert.saveDelete,
        msg('Are you sure want to delete save data? Your current progress will be lost.'),
      ),
    );
  };

  private handleConfirmDeleteSaveDataDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== GameStateAlert.saveDelete) {
      return;
    }

    this._controller.deleteSaveData().catch((e) => {
      console.error(e);
    });
  };
}
