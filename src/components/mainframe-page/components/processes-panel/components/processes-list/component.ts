import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { IProcess } from '@state/mainframe-processes-state/interfaces/process';
import { ProcessesListController } from './controller';

@customElement('ca-processes-list')
export class ProcessesList extends LitElement {
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

    th.threads,
    td.threads {
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

  private _processesListController: ProcessesListController;

  constructor() {
    super();

    this._processesListController = new ProcessesListController(this);
  }

  render() {
    return html`
      <table>
        <thead>
          <th class="program">
            <intl-message label="ui:mainframe:program">Program</intl-message>
          </th>
          <th class="threads">
            <intl-message label="ui:mainframe:threads">Threads</intl-message>
          </th>
          <th class="progress"></th>
        </thead>

        <tbody>
          ${this.renderContent()}
        </tbody>
      </table>
    `;
  }

  renderContent = () => {
    const processes = this._processesListController.listProcesses();

    if (processes.length === 0) {
      return this.renderEmptyListNotification();
    }

    return repeat(processes, (process) => process.program.name, this.renderListItem);
  };

  renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:processes:emptyListNotification">
            You don't have any processes
          </intl-message>
        </td>
      </tr>
    `;
  };

  renderListItem = (process: IProcess) => {
    const formatter = this._processesListController.formatter;

    const threads = process.program.isAutoscalable
      ? html`<intl-message label="ui:mainframe:processes:autoscalable">Autoscalable</intl-message>`
      : formatter.formatNumberDecimal(process.threads);

    return html`
      <tr class="list-item">
        <td class="program">
          <intl-message label="programs:${process.program.name}:name">Progam name</intl-message>
        </td>
        <td class="threads">${threads}</td>
        <td>
          <ca-process-actions-column
            program-name=${process.program.name}
            ?active=${process.isActive}
            ?autoscalable=${process.program.isAutoscalable}
            current-completion-points=${process.currentCompletionPoints}
            max-completion-points=${process.maxCompletionPoints}
          >
          </ca-process-actions-column>
        </td>
      </tr>
    `;
  };
}
