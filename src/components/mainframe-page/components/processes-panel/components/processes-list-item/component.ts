import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@/components/shared/confirmation-alert/events';
import { ProgramAlert } from '@shared/types';
import { ProcessesListItemController } from './controller';
import { ProgramName } from '@state/progam-factory/types';
import { DescriptionRenderer } from './description-renderer';
import { IDescriptionRenderer } from './interfaces';

@customElement('ca-processes-list-item')
export class ProcessesListItem extends BaseComponent<ProcessesListItemController> {
  static styles = css`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 32%;
      cursor: grab;
    }

    td.cores {
      width: 17%;
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

    div.indicators-container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
      vertical-align: middle;
    }

    div.program-description {
      white-space: normal;
    }

    div.program-description p {
      margin: 0;
    }

    div.program-description p.line-break {
      height: var(--sl-spacing-medium);
    }
  `;

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName: string = ProgramName.shareServer;

  protected controller: ProcessesListItemController;

  constructor() {
    super();

    this.controller = new ProcessesListItemController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteProcessDialog);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmDeleteProcessDialog);
  }

  renderContent() {
    const formatter = this.controller.formatter;
    const process = this.controller.getProcess(this.programName as ProgramName);

    if (!process) {
      return html``;
    }

    const coresValue = JSON.stringify({
      cores: formatter.formatNumberDecimal(process.usedCores),
      maxCores: formatter.formatNumberDecimal(process.maxCores),
    });

    const cores = process.program.isAutoscalable
      ? html`<intl-message label="ui:mainframe:processes:autoscalable">Autoscalable</intl-message>`
      : html`<intl-message label="ui:mainframe:processes:usesCores" value=${coresValue}>Cores</intl-message>`;

    const descriptionRenderer: IDescriptionRenderer = new DescriptionRenderer({
      formatter: this.controller.formatter,
      availableRam: process.program.isAutoscalable ? this.controller.availableRam : process.totalRam,
      usedCores: process.usedCores,
      program: process.program,
      threads: process.threads,
    });

    return html`
      <td class="program" draggable="true" @dragstart=${this.handleDragStart}>
        <intl-message label="programs:${process.program.name}:name">Progam name</intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <div class="program-description" slot="content">${descriptionRenderer.renderDescription()}</div>
        </sl-tooltip>
      </td>

      <td class="cores">${cores}</td>

      <td>
        <div class="indicators-container">
          <ca-processes-list-item-progress program-name=${process.program.name}> </ca-processes-list-item-progress>

          <sl-tooltip>
            <intl-message slot="content" label="ui:mainframe:processes:processToggle"> Toggle process </intl-message>

            <sl-icon-button
              name=${process.isActive ? 'play-fill' : 'pause-fill'}
              label=${t('mainframe.processes.processToggle', { ns: 'ui' })}
              @click=${this.handleToggleProcess}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <intl-message slot="content" label="ui:mainframe:processes:processDelete"> Delete process </intl-message>

            <sl-icon-button
              id="delete-btn"
              name="x-lg"
              label=${t('mainframe.processes.processDelete', { ns: 'ui' })}
              @click=${this.handleOpenDeleteProcessDialog}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>
      </td>
    `;
  }

  private handleToggleProcess = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.controller.toggleProcess();
  };

  private handleOpenDeleteProcessDialog = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmationAlertParameters = JSON.stringify({
      programName: this.programName,
    });

    this.dispatchEvent(
      new ConfirmationAlertOpenEvent(ProgramAlert.processDelete, confirmationAlertParameters, this.programName),
    );
  };

  private handleConfirmDeleteProcessDialog = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (convertedEvent.gameAlert !== ProgramAlert.processDelete || convertedEvent.gameAlertKey !== this.programName) {
      return;
    }

    this.controller.deleteProcess();
  };

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', this.programName);
    }
  };
}
