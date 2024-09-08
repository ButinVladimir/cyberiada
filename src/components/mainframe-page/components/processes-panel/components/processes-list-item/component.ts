import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProcessesListItemController } from './controller';
import { ProgramName } from '@state/progam-factory/types';

@customElement('ca-processes-list-item')
export class ProcessesListItem extends LitElement {
  static styles = css`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 32%;
    }

    td.threads {
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

  private _processesListItemController: ProcessesListItemController;

  constructor() {
    super();

    this._processesListItemController = new ProcessesListItemController(this);
  }

  render() {
    const formatter = this._processesListItemController.formatter;
    const process = this._processesListItemController.getProcess(this.programName as ProgramName);

    if (!process) {
      return html``;
    }

    const threads = process.program.isAutoscalable
      ? html`<intl-message label="ui:mainframe:processes:autoscalable">Autoscalable</intl-message>`
      : formatter.formatNumberDecimal(process.threads);

    return html`
      <td class="program">
        <intl-message label="programs:${process.program.name}:name">Progam name</intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-process-description slot="content" program-name=${process.program.name}> </ca-process-description>
        </sl-tooltip>
      </td>

      <td class="threads">${threads}</td>

      <td>
        <div class="indicators-container">
          <ca-processes-list-item-progress program-name=${process.program.name}> </ca-processes-list-item-progress>

          <sl-icon-button
            name=${process.isActive ? 'play-fill' : 'pause-fill'}
            label=${t('mainframe.processes.processToggle', { ns: 'ui' })}
            @click=${this.handleToggleProcess}
          >
          </sl-icon-button>

          <sl-icon-button
            id="delete-btn"
            name="x-lg"
            label=${t('mainframe.processes.processDelete', { ns: 'ui' })}
            @click=${this.handleDeleteProcess}
          >
          </sl-icon-button>
        </div>
      </td>
    `;
  }

  private handleToggleProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._processesListItemController.toggleProcess();
  };

  private handleDeleteProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._processesListItemController.deleteProcess();
  };
}
