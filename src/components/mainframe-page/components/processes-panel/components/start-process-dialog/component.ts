import { t } from 'i18next';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertCloseEvent,
  ConfirmationAlertSubmitEvent,
} from '@/components/shared/confirmation-alert/events';
import { ProgramAlert } from '@shared/types';
import { StartProcessDialogCloseEvent } from './events';
import { StartProcessDialogController } from './controller';

@customElement('ca-start-process-dialog')
export class StartProcessDialog extends BaseComponent<StartProcessDialogController> {
  static styles = css`
    sl-dialog {
      --width: 40rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    div.inputs-container {
      display: grid;
      column-gap: var(--sl-spacing-medium);
      grid-template-columns: 2fr 1fr;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }

    div.program-description {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    div.program-description p {
      margin: 0;
    }

    div.program-description p.line-break {
      height: var(--sl-spacing-medium);
    }
  `;

  protected controller: StartProcessDialogController;

  private _programInputRef = createRef<SlSelect>();

  private _threadsInputRef = createRef<SlInput>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _programName?: ProgramName = undefined;

  @state()
  private _threads = 1;

  @state()
  private _confirmationAlertVisible = false;

  constructor() {
    super();

    this.controller = new StartProcessDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertCloseEvent.type, this.handleCloseConfirmationAlert);
    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertCloseEvent.type, this.handleCloseConfirmationAlert);
    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.get('isOpen') === false) {
      this._programName = undefined;
      this._threads = 1;
      this._confirmationAlertVisible = false;
    }
  }

  renderContent() {
    const program = this._programName ? this.controller.getProgram(this._programName) : undefined;
    const maxThreads = this.calculateMaxThreads();

    const threadsInputDisabled = !(program && !program.isAutoscalable);
    const submitButtonDisabled = !(
      program &&
      (program.isAutoscalable || (this._threads >= 1 && this._threads <= maxThreads))
    );

    return html`
      <sl-dialog ?open=${this.isOpen && !this._confirmationAlertVisible} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${t('mainframe.processes.startProcess', { ns: 'ui' })}</h4>

        <div class="body">
          <p class="hint">${t('mainframe.processes.startProcessDialogHint', { ns: 'ui' })}</p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label"> ${t('mainframe.program', { ns: 'ui' })} </span>

              ${this.controller.listPrograms().map(this.formatProgramSelectItem)}
            </sl-select>

            <sl-input
              ${ref(this._threadsInputRef)}
              name="threads"
              value=${this._threads}
              type="number"
              min="1"
              max=${Math.max(maxThreads, 1)}
              step="1"
              ?disabled=${threadsInputDisabled}
              @sl-change=${this.handleThreadsChange}
            >
              <span class="input-label" slot="label"> ${t('mainframe.threads', { ns: 'ui' })} </span>
            </sl-input>
          </div>

          ${this._programName
            ? html`<ca-process-diff-text program-name=${this._programName} threads=${this._threads}>
              </ca-process-diff-text>`
            : null}
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          ${t('common.close', { ns: 'ui' })}
        </sl-button>

        <sl-button
          ?disabled=${submitButtonDisabled}
          slot="footer"
          size="medium"
          variant="primary"
          @click=${this.handleOpenConfirmationAlert}
        >
          ${t('mainframe.processes.startProcess', { ns: 'ui' })}
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new StartProcessDialogCloseEvent());
  };

  private handleProgramChange = () => {
    if (!this._programInputRef.value) {
      return;
    }

    this._programName = this._programInputRef.value.value as ProgramName;
  };

  private handleThreadsChange = () => {
    if (!this._threadsInputRef.value) {
      return;
    }

    let threads = this._threadsInputRef.value.valueAsNumber;
    const maxThreads = this.calculateMaxThreads();

    if (threads > maxThreads) {
      threads = maxThreads;
    }

    if (threads < 1) {
      threads = 1;
    }

    this._threads = threads;
    this._threadsInputRef.value.valueAsNumber = threads;
  };

  private handleOpenConfirmationAlert = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._programName) {
      return;
    }

    const program = this.controller.getProgram(this._programName);
    const runningScalableProgram = this.controller.getRunningScalableProgram();

    const existingProcess = this.controller.getProcessByName(this._programName);
    const formatter = this.controller.formatter;

    if (existingProcess) {
      const confirmationAlertParameters = {
        programName: this._programName,
        threads: formatter.formatNumberDecimal(existingProcess.threads),
      };

      this._confirmationAlertVisible = true;

      this.dispatchEvent(new ConfirmationAlertOpenEvent(ProgramAlert.processReplace, confirmationAlertParameters));
    } else if (program?.isAutoscalable && runningScalableProgram) {
      const confirmationAlertParameters = {
        programName: runningScalableProgram.program.name,
      };

      this._confirmationAlertVisible = true;

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(ProgramAlert.scalableProcessReplace, confirmationAlertParameters),
      );
    } else {
      this.startProcess();
    }
  };

  private handleConfirmConfirmationAlert = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertSubmitEvent;

    if (
      convertedEvent.gameAlert !== ProgramAlert.processReplace &&
      convertedEvent.gameAlert !== ProgramAlert.scalableProcessReplace
    ) {
      return;
    }

    this._confirmationAlertVisible = false;

    this.startProcess();
  };

  private startProcess = () => {
    if (this._programName) {
      const isStarted = this.controller.startProcess(this._programName, this._threads);

      if (isStarted) {
        this.dispatchEvent(new StartProcessDialogCloseEvent());
      }
    }
  };

  private handleCloseConfirmationAlert = (event: Event) => {
    const convertedEvent = event as ConfirmationAlertCloseEvent;

    if (
      convertedEvent.gameAlert !== ProgramAlert.processReplace &&
      convertedEvent.gameAlert !== ProgramAlert.scalableProcessReplace
    ) {
      return;
    }

    this._confirmationAlertVisible = false;
  };

  private formatProgramSelectItem = (program: IProgram) => {
    const formatter = this.controller.formatter;

    return html`<sl-option value=${program.name}>
      ${t('mainframe.processes.programSelectItem', {
        ns: 'ui',
        programName: program.name,
        level: formatter.formatNumberDecimal(program.level),
        quality: formatter.formatQuality(program.quality),
      })}
    </sl-option>`;
  };

  private calculateMaxThreads = (): number => {
    if (!this._programName) {
      return 1;
    }

    const program = this.controller.getProgram(this._programName);
    const availableRam = this.controller.getAvailableRamForProgram(this._programName);

    if (program && !program.isAutoscalable) {
      return Math.max(Math.floor(availableRam / program.ram), 0);
    }

    return 1;
  };
}
