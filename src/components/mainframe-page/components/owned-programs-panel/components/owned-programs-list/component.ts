import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { formatQuality } from '@shared/formatters';
import { OwnedProgramsListController } from './controller';

@customElement('ca-owned-programs-list')
export class OwnedProgramsList extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: var(--sl-font-weight-bold);
    }

    th.program,
    td.program {
      width: 32%;
    }

    th.level,
    td.level {
      width: 17%;
    }

    th.quality,
    td.quality {
      width: 17%;
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.list-item td {
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.notification td {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }
  `;

  private _ownedProgramsListController: OwnedProgramsListController;

  constructor() {
    super();

    this._ownedProgramsListController = new OwnedProgramsListController(this);
  }

  render() {
    return html`
      <table>
        <thead>
          <th class="program">
            <intl-message label="ui:mainframe:program">Program</intl-message>
          </th>
          <th class="level">
            <intl-message label="ui:mainframe:level">Level</intl-message>
          </th>
          <th class="quality">
            <intl-message label="ui:mainframe:quality">Quality</intl-message>
          </th>
          <th class="description">
            <intl-message label="ui:mainframe:description">Description</intl-message>
          </th>
        </thead>

        <tbody>
          ${this.renderContent()}
        </tbody>
      </table>
    `;
  }

  renderContent = () => {
    const ownedPrograms = this._ownedProgramsListController.listOwnedPrograms();

    if (ownedPrograms.length === 0) {
      return this.renderEmptyListNotification();
    }

    return repeat(ownedPrograms, (program) => program.name, this.renderListItem);
  };

  renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:ownedPrograms:emptyListNotification"
            >You don't have any programs</intl-message
          >
        </td>
      </tr>
    `;
  };

  renderListItem = (program: IProgram) => {
    return html`
      <tr class="list-item">
        <td class="program">
          <intl-message label="programs:${program.name}:name">Progam name</intl-message>
        </td>
        <td class="level">${program.level}</td>
        <td class="quality">${formatQuality(program.quality)}</td>
        <td class="description">Description goes here</td>
      </tr>
    `;
  };
}
