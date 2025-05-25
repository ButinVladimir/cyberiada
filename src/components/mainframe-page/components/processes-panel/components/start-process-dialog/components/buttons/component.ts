import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, localized, str } from '@lit/localize';
import { BaseComponent, dialogButtonsStyle, warningStyle } from '@shared/index';
import { StartProcessDialogButtonsController } from './controller';
import { StartProcessEvent, CancelEvent } from './events';
import { COMMON_TEXTS, PROGRAM_TEXTS } from '@texts/index';
import { type IProcess, type IProgram } from '@state/mainframe-state';
import { consume } from '@lit/context';
import { existingProcessContext, programContext } from '../../contexts';
import { classMap } from 'lit/directives/class-map.js';

@localized()
@customElement('ca-start-process-dialog-buttons')
export class StartProcessDialogButtons extends BaseComponent {
  static styles = [warningStyle, dialogButtonsStyle];

  @property({
    attribute: 'threads',
    type: Number,
  })
  threads!: number;

  @property({
    attribute: 'max-threads',
    type: Number,
  })
  maxThreads!: number;

  private _controller: StartProcessDialogButtonsController;

  @consume({ context: programContext, subscribe: true })
  private _program?: IProgram;

  @consume({ context: existingProcessContext, subscribe: true })
  private _existingProcess?: IProcess;

  constructor() {
    super();

    this._controller = new StartProcessDialogButtonsController(this);
  }

  render() {
    const submitButtonDisabled = !(this._program && this.hasEnoughRam());

    const warning = this.getWarning();

    const warningClasses = classMap({
      warning: true,
      visible: !!warning,
    });

    return html`
      <p class=${warningClasses}>${warning}</p>

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

  private hasEnoughRam(): boolean {
    if (!this._program) {
      return false;
    }

    if (!this._program.isAutoscalable) {
      return this.threads >= 1 && this.threads <= this.maxThreads;
    }

    return this.maxThreads > 0;
  }

  private getWarning(): string {
    if (!this._program) {
      return msg('Select program');
    }

    if (!this.hasEnoughRam()) {
      return msg('Not enough RAM');
    }

    if (this._program.isAutoscalable && this._existingProcess) {
      return msg(str`Process for same program is already running`);
    }

    if (!this._program.isAutoscalable && this._existingProcess) {
      const formattedThreads = this._controller.formatter.formatNumberDecimal(this._existingProcess.threads);
      return msg(str`Process for same program with ${formattedThreads} threads is already running`);
    }

    const runningAutoscalableProgram = this._controller.getRunningScalableProgram();
    if (this._program.isAutoscalable && runningAutoscalableProgram) {
      const runningAutoscalableProgramTitle = PROGRAM_TEXTS[runningAutoscalableProgram.program.name].title();
      return msg(str`Autoscalable process for program "${runningAutoscalableProgramTitle}" is already running`);
    }

    return '';
  }

  private handleCancel = () => {
    this.dispatchEvent(new CancelEvent());
  };

  private handleStart = () => {
    this.dispatchEvent(new StartProcessEvent());
  };
}
