import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { StartProcessDialogButtonsController } from './controller';
import { StartProcessEvent, CancelEvent } from './events';

@customElement('ca-start-process-dialog-buttons')
export class StartProcessDialogButtons extends BaseComponent<StartProcessDialogButtonsController> {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  @property({
    attribute: 'program-name',
    type: String,
  })
  programName?: ProgramName;

  @property({
    attribute: 'threads',
    type: Number,
  })
  threads!: number;

  protected controller: StartProcessDialogButtonsController;

  constructor() {
    super();

    this.controller = new StartProcessDialogButtonsController(this);
  }

  render() {
    const { formatter } = this.controller;

    const program = this.programName ? this.controller.getProgram(this.programName) : undefined;
    const cost = program ? program.cost : 0;

    const maxThreads = this.calculateMaxThreads();
    const submitButtonDisabled = !(
      program &&
      (program.isAutoscalable || (this.threads >= 1 && this.threads <= maxThreads))
    );

    const warning = this.getWarning(program);

    return html`
      <p class="warning">${warning}</p>

      <div class="buttons">
        <sl-button size="medium" variant="default" outline @click=${this.handleCancel}>
          ${t('common.close', { ns: 'ui' })}
        </sl-button>

        <sl-button size="medium" variant="primary" ?disabled=${submitButtonDisabled} @click=${this.handleStart}>
          ${t('mainframe.processes.startProcess', { ns: 'ui', cost: formatter.formatNumberFloat(cost) })}
        </sl-button>
      </div>
    `;
  }

  private getWarning(program?: IProgram): string {
    if (!program) {
      return t('errors.selectProgram', { ns: 'ui' });
    }

    if (!program.isAutoscalable) {
      const maxThreads = this.calculateMaxThreads();

      if (this.threads < 1 || this.threads > maxThreads) {
        return t('errors.notEnoughRam', { ns: 'ui' });
      }
    }

    const processForSameProgramName = this.controller.getProcessByName(this.programName!);
    if (processForSameProgramName) {
      return t('errors.processForSameProgramRunning', { ns: 'ui', threads: processForSameProgramName.threads });
    }

    const runningAutoscalableProgram = this.controller.getRunningScalableProgram();
    if (program.isAutoscalable && runningAutoscalableProgram) {
      return t('errors.autoscalableProcessRunning', { ns: 'ui', programName: runningAutoscalableProgram.program.name });
    }

    return '';
  }

  private calculateMaxThreads = (): number => {
    if (!this.programName) {
      return 1;
    }

    const program = this.controller.getProgram(this.programName);
    const availableRam = this.controller.getAvailableRamForProgram(this.programName);

    if (program && !program.isAutoscalable) {
      return Math.max(Math.floor(availableRam / program.ram), 0);
    }

    return 1;
  };

  private handleCancel = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CancelEvent());
  };

  private handleStart = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new StartProcessEvent());
  };
}
