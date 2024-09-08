import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OwnedProgramsListItemController } from './controller';
import { ProgramName } from '@state/progam-factory/types';

@customElement('ca-owned-programs-list-item')
export class OwnedProgramsListItem extends LitElement {
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
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  private _ownedProgramsListItemController: OwnedProgramsListItemController;

  constructor() {
    super();

    this._ownedProgramsListItemController = new OwnedProgramsListItemController(this);
  }

  render() {
    const formatter = this._ownedProgramsListItemController.formatter;

    const program = this._ownedProgramsListItemController.getProgram(this.programName as ProgramName);

    if (!program) {
      return html``;
    }

    return html`
      <td class="program">
        <intl-message label="programs:${program.name}:name">Progam name</intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-program-description
            slot="content"
            program-name=${program.name}
            level=${program.level}
            quality=${program.quality}
            threads=${1}
          >
          </ca-program-description>
        </sl-tooltip>
      </td>

      <td class="level">${formatter.formatNumberDecimal(program.level)}</td>

      <td class="quality">${formatter.formatQuality(program.quality)}</td>
    `;
  }
}
