import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { OwnedProgramsListItemController } from './controller';

@customElement('ca-owned-programs-list-item')
export class OwnedProgramsListItem extends BaseComponent<OwnedProgramsListItemController> {
  static styles = css`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 40%;
      cursor: grab;
    }

    td.level {
      width: 25%;
    }

    td.quality {
      width: 25%;
    }

    td.autoupgrade {
      width: auto;
      text-align: right;
      font-size: var(--sl-font-size-large);
    }

    td {
      text-align: left;
      vertical-align: middle;
      padding: var(--sl-spacing-small);
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    sl-icon[name='question-circle'] {
      position: relative;
      margin-left: 0.5em;
      color: var(--ca-hint-color);
      font-size: var(--sl-font-size-large);
      vertical-align: middle;
    }

    sl-icon-button#toggle-autoupgrade-btn {
      vertical-align: middle;
    }

    sl-button#upgrade-max-btn {
      margin-right: var(--sl-spacing-medium);
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  protected controller: OwnedProgramsListItemController;

  constructor() {
    super();

    this.controller = new OwnedProgramsListItemController(this);
  }

  renderContent() {
    const formatter = this.controller.formatter;

    const program = this.controller.getProgram(this.programName as ProgramName);

    if (!program) {
      return html``;
    }

    const autoupgradeIcon = program.autoUpgradeEnabled ? 'arrow-up-circle-fill' : 'arrow-up-circle';

    return html`
      <td class="program" draggable="true" @dragstart=${this.handleDragStart}>
        <intl-message id="title" label="programs:${program.name}:name"> Progam name </intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-program-description-text slot="content" program-name=${this.programName}></ca-program-description-text>
        </sl-tooltip>
      </td>

      <td class="level">${formatter.formatNumberDecimal(program.level)}</td>

      <td class="quality">${formatter.formatQuality(program.quality)}</td>

      <td class="autoupgrade">
        <sl-button id="upgrade-max-btn" variant="default" type="button" size="medium" @click=${this.handleUpgradeMax}>
          <intl-message label="ui:common:upgrade"> Upgrade </intl-message>
        </sl-button>

        <sl-tooltip>
          <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgrade">
            Toggle autoupgrade
          </intl-message>

          <sl-icon-button
            id="toggle-autoupgrade-btn"
            name=${autoupgradeIcon}
            label=${t('mainframe.programs.toggleAutoupgrade', { ns: 'ui' })}
            @click=${this.handleToggleAutoUpgrade}
          >
          </sl-icon-button>
        </sl-tooltip>
      </td>
    `;
  }

  private handleToggleAutoUpgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const program = this.controller.getProgram(this.programName as ProgramName);

    if (program) {
      program.autoUpgradeEnabled = !program.autoUpgradeEnabled;
    }
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };

  private handleUpgradeMax = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    this.controller.upgradeMaxProgram(this.programName as ProgramName);
  };
}
