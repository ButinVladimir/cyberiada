import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { BaseComponent } from '@shared/base-component';
import type { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { ProgramAlert } from '@shared/types';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/styles';
import { PROGRAM_TEXTS } from '@texts/programs';
import { StartProcessDialogCloseEvent } from './events';
import { StartProcessDialogController } from './controller';

@localized()
@customElement('ca-start-process-dialog')
export class StartProcessDialog extends BaseComponent<StartProcessDialogController> {
  static styles = [
    inputLabelStyle,
    hintStyle,
    sectionTitleStyle,
    mediumModalStyle,
    modalBodyScrollStyle,
    css`
      sl-dialog::part(body) {
        padding-top: 0;
        padding-bottom: 0;
      }

      sl-dialog::part(footer) {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--sl-spacing-small);
      }

      h4.title {
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
        row-gap: var(--sl-spacing-medium);
        grid-template-columns: auto;
        grid-template-rows: auto;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.inputs-container {
          grid-template-rows: auto;
          grid-template-columns: 2fr 1fr;
        }
      }
    `,
  ];

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

  constructor() {
    super();

    this.controller = new StartProcessDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._programName = undefined;
      this._threads = 1;
    }
  }

  render() {
    const program = this._programName ? this.controller.getProgram(this._programName) : undefined;
    const maxThreads = this.calculateMaxThreads();

    const threadsInputDisabled = !(program && !program.isAutoscalable);

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">${msg('Start process')}</h4>

        <div class="body">
          <p class="hint">
            ${msg(`Select one of owned programs to start process for it.
If you already have process for same program, old process will be replaced with new one.
Threads allow to run multiple instances of same program at same time, but additional threads require additional memory.`)}
          </p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label"> ${msg('Program')} </span>

              ${this.controller.listPrograms().map(this.formatProgramSelectItem)}
            </sl-select>

            <sl-input
              ${ref(this._threadsInputRef)}
              name="threads"
              value=${this._threads}
              type="number"
              inputmode="decimal"
              min="1"
              max=${Math.max(maxThreads, 1)}
              step="1"
              ?disabled=${threadsInputDisabled}
              @sl-change=${this.handleThreadsChange}
            >
              <span class="input-label" slot="label"> ${msg('Threads')} </span>
            </sl-input>
          </div>

          ${this._programName
            ? html`<ca-process-diff-text program-name=${this._programName} threads=${this._threads}>
              </ca-process-diff-text>`
            : nothing}
        </div>

        <ca-start-process-dialog-buttons
          slot="footer"
          program-name=${ifDefined(this._programName)}
          threads=${this._threads}
          @start-process=${this.handleOpenConfirmationAlert}
          @cancel=${this.handleClose}
        >
        </ca-start-process-dialog-buttons>
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

    const programName = this._programInputRef.value.value as ProgramName;
    this._programName = programName;
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
    const programIsAutoscalable = program!.isAutoscalable;
    const runningScalableProgram = this.controller.getRunningScalableProgram();

    const existingProcess = this.controller.getProcessByName(this._programName);
    const formatter = this.controller.formatter;

    const programTitle = PROGRAM_TEXTS[this._programName].title();

    if (existingProcess && !programIsAutoscalable) {
      const threads = formatter.formatNumberDecimal(existingProcess.threads);

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          ProgramAlert.processReplace,
          msg(
            str`Are you sure want to overwrite process for program "${programTitle}"? This will replace your current process with ${threads} threads.`,
          ),
        ),
      );
    } else if (existingProcess && programIsAutoscalable) {
      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          ProgramAlert.processReplace,
          msg(str`Are you sure want to overwrite process for program "${programTitle}"?`),
        ),
      );
    } else if (runningScalableProgram && programIsAutoscalable) {
      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          ProgramAlert.scalableProcessReplace,
          msg(
            str`Are you sure want to replace autoscalable process? This will delete your current process for program "${programTitle}".`,
          ),
        ),
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

  private formatProgramSelectItem = (program: IProgram) => {
    const formatter = this.controller.formatter;
    const programTitle = PROGRAM_TEXTS[program.name].title();
    const formattedLevel = formatter.formatNumberDecimal(program.level);
    const formattedQuality = formatter.formatQuality(program.quality);

    return html`<sl-option value=${program.name}>
      ${msg(str`${programTitle}, quality ${formattedQuality}, level ${formattedLevel}`)}
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
