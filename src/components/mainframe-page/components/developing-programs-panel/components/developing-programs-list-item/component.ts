import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DevelopingProgramsListItemController } from './controller';
import { ProgramName } from '@state/progam-factory/types';

@customElement('ca-developing-programs-list-item')
export class DevelopingProgramsListItem extends LitElement {
  static styles = css`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 32%;
    }

    td.level {
      width: 17%;
    }

    td.quality {
      width: 17%;
    }

    td {
      text-align: left;
      vertical-align: middle;
      padding: var(--sl-spacing-small);
    }

    sl-icon[name='question-circle'] {
      position: relative;
      top: 0.25em;
      margin-left: 0.5em;
      color: var(--ca-hint-color);
      font-size: var(--sl-font-size-large);
    }

    div.indicators-container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  private _developingProgramsListItemController: DevelopingProgramsListItemController;

  constructor() {
    super();

    this._developingProgramsListItemController = new DevelopingProgramsListItemController(this);
  }

  render() {
    const developingProgram = this._developingProgramsListItemController.getDevelopingProgram(
      this.programName as ProgramName,
    );

    if (!developingProgram) {
      return html``;
    }

    const formatter = this._developingProgramsListItemController.formatter;

    return html`
      <td class="program">
        <intl-message label="programs:${developingProgram.program.name}:name">Progam name</intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-program-description
            slot="content"
            program-name=${developingProgram.program.name}
            level=${developingProgram.program.level}
            quality=${developingProgram.program.quality}
            threads=${1}
          >
          </ca-program-description>
        </sl-tooltip>
      </td>

      <td class="level">${formatter.formatNumberDecimal(developingProgram.program.level)}</td>

      <td class="quality">${formatter.formatQuality(developingProgram.program.quality)}</td>

      <td>
        <div class="indicators-container">
          <ca-developing-programs-list-item-progress program-name=${developingProgram.program.name}>
          </ca-developing-programs-list-item-progress>

          <sl-icon-button
            name=${developingProgram.isActive ? 'play-fill' : 'pause-fill'}
            label=${t('mainframe.developingPrograms.developingProgramToggle', { ns: 'ui' })}
            @click=${this.handleToggleDevelopingProgram}
          >
          </sl-icon-button>

          <sl-icon-button
            id="delete-btn"
            name="x-lg"
            label=${t('mainframe.developingPrograms.developingProgramDelete', { ns: 'ui' })}
            @click=${this.handleDeleteDevelopingProgram}
          >
          </sl-icon-button>
        </div>
      </td>
    `;
  }

  private handleToggleDevelopingProgram = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._developingProgramsListItemController.toggleDevelopingProgram();
  };

  private handleDeleteDevelopingProgram = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._developingProgramsListItemController.deleteDevelopingProgram();
  };
}
