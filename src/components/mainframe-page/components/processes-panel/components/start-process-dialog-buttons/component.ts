import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, localized, str } from '@lit/localize';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { StartProcessDialogButtonsController } from './controller';
import { StartProcessEvent, CancelEvent } from './events';
import { COMMON_TEXTS, PROGRAM_TEXTS } from '@texts/index';

@localized()
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
    const program = this.programName ? this.controller.getProgram(this.programName) : undefined;

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
          ${COMMON_TEXTS.close()}
        </sl-button>

        <sl-button size="medium" variant="primary" ?disabled=${submitButtonDisabled} @click=${this.handleStart}>
          ${msg('Start process')}
        </sl-button>
      </div>
    `;
  }

  private getWarning(program?: IProgram): string {
    if (!program) {
      return msg('Select program');
    }

    if (!program.isAutoscalable) {
      const maxThreads = this.calculateMaxThreads();

      if (this.threads < 1 || this.threads > maxThreads) {
        return msg('Not enough RAM');
      }
    }

    const processForSameProgramName = this.controller.getProcessByName(this.programName!);
    if (program.isAutoscalable && processForSameProgramName) {
      return msg(str`Process for same program is already running`);
    }

    if (!program.isAutoscalable && processForSameProgramName) {
      const formattedThreads = this.controller.formatter.formatNumberDecimal(processForSameProgramName.threads);
      return msg(str`Process for same program with ${formattedThreads} threads is already running`);
    }

    const runningAutoscalableProgram = this.controller.getRunningScalableProgram();
    if (program.isAutoscalable && runningAutoscalableProgram) {
      const runningAutoscalableProgramTitle = PROGRAM_TEXTS[runningAutoscalableProgram.program.name].title();
      return msg(str`Autoscalable process for program "${runningAutoscalableProgramTitle}" is already running`);
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
