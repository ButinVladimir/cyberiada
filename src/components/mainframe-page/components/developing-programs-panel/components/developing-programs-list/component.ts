import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { IDevelopingProgram } from '@state/mainframe-developing-programs-state/interfaces/developing-program';
import { DevelopingProgramsListController } from './controller';

@customElement('ca-developing-programs-list')
export class DevelopingProgramsList extends LitElement {
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

    th.program {
      width: 32%;
    }

    th.level {
      width: 17%;
    }

    th.quality {
      width: 17%;
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
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

  private _developingProgramsListController: DevelopingProgramsListController;

  constructor() {
    super();

    this._developingProgramsListController = new DevelopingProgramsListController(this);
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
          <th></th>
        </thead>

        <tbody>
          ${this.renderContent()}
        </tbody>
      </table>
    `;
  }

  renderContent = () => {
    const developingPrograms = this._developingProgramsListController.listDevelopingPrograms();

    if (developingPrograms.length === 0) {
      return this.renderEmptyListNotification();
    }

    return repeat(developingPrograms, (developingProgram) => developingProgram.program.name, this.renderListItem);
  };

  renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:developingPrograms:emptyListNotification"
            >You don't have any programs</intl-message
          >
        </td>
      </tr>
    `;
  };

  renderListItem = (developingProgram: IDevelopingProgram) => {
    return html`
      <ca-developing-programs-list-item program-name=${developingProgram.program.name}>
      </ca-developing-programs-list-item>
    `;
  };
}
