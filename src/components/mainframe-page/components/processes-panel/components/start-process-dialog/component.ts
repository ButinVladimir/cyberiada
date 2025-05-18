import { css, html, nothing } from 'lit';
import { localized, msg, str } from '@lit/localize';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { provide } from '@lit/context';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import clamp from 'lodash/clamp';
import {
  ConfirmationAlertOpenEvent,
  ConfirmationAlertSubmitEvent,
} from '@components/game-screen/components/confirmation-alert/events';
import { type ProgramName, type IProgram, type IProcess } from '@state/mainframe-state';
import {
  BaseComponent,
  ProgramAlert,
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  mediumModalStyle,
  modalBodyScrollStyle,
  SCREEN_WIDTH_POINTS,
} from '@shared/index';
import { PROGRAM_TEXTS } from '@texts/programs';
import { StartProcessDialogCloseEvent } from './events';
import { StartProcessDialogController } from './controller';
import { programContext, existingProcessContext } from './contexts';

@localized()
@customElement('ca-start-process-dialog')
export class StartProcessDialog extends BaseComponent {
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

  private _controller: StartProcessDialogController;

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

  @provide({ context: programContext })
  private _program?: IProgram;

  @provide({ context: existingProcessContext })
  private _existingProcess?: IProcess;

  constructor() {
    super();

    this._controller = new StartProcessDialogController(this);
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(ConfirmationAlertSubmitEvent.type, this.handleConfirmConfirmationAlert);
  }

  performUpdate() {
    this.updateContext();

    super.performUpdate();
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (_changedProperties.has('isOpen')) {
      this._programName = undefined;
      this._threads = 1;
    }
  }

  render() {
    const maxThreads = this.calculateMaxThreads();

    const threadsInputDisabled = !(this._program && !this._program.isAutoscalable);

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

              ${this._controller.listPrograms().map(this.formatProgramSelectItem)}
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
            ? html`<ca-start-process-dialog-description threads=${this._threads}>
              </ca-start-process-dialog-description>`
            : nothing}
        </div>

        <ca-start-process-dialog-buttons
          slot="footer"
          threads=${this._threads}
          max-threads=${this.calculateMaxThreads()}
          @start-process=${this.handleOpenConfirmationAlert}
          @cancel=${this.handleClose}
        >
        </ca-start-process-dialog-buttons>
      </sl-dialog>
    `;
  }

  private updateContext() {
    if (this._programName) {
      this._program = this._controller.getProgram(this._programName);
      this._existingProcess = this._controller.getProcessByName(this._programName);
    } else {
      this._program = undefined;
      this._existingProcess = undefined;
    }
  }

  private handleClose = () => {
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

    const threads = clamp(this._threadsInputRef.value.valueAsNumber, 1, this.calculateMaxThreads());

    this._threads = threads;
    this._threadsInputRef.value.valueAsNumber = threads;
  };

  private handleOpenConfirmationAlert = () => {
    if (!this._programName || !this._program) {
      return;
    }

    const programIsAutoscalable = this._program.isAutoscalable;
    const runningScalableProgram = this._controller.getRunningScalableProgram();

    const formatter = this._controller.formatter;

    const programTitle = PROGRAM_TEXTS[this._programName].title();

    if (this._existingProcess && !programIsAutoscalable) {
      const threads = formatter.formatNumberDecimal(this._existingProcess.threads);

      this.dispatchEvent(
        new ConfirmationAlertOpenEvent(
          ProgramAlert.processReplace,
          msg(
            str`Are you sure want to overwrite process for program "${programTitle}"? This will replace your current process with ${threads} threads.`,
          ),
        ),
      );
    } else if (this._existingProcess && programIsAutoscalable) {
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
      const isStarted = this._controller.startProcess(this._programName, this._threads);

      if (isStarted) {
        this.dispatchEvent(new StartProcessDialogCloseEvent());
      }
    }
  };

  private formatProgramSelectItem = (program: IProgram) => {
    const formatter = this._controller.formatter;
    const programTitle = PROGRAM_TEXTS[program.name].title();
    const formattedLevel = formatter.formatLevel(program.level);
    const formattedTier = formatter.formatTier(program.tier);

    return html`<sl-option value=${program.name}>
      ${msg(str`${programTitle}, tier ${formattedTier}, level ${formattedLevel}`)}
    </sl-option>`;
  };

  private calculateMaxThreads = (): number => {
    if (!this._programName) {
      return 1;
    }

    const availableRam = this._controller.getAvailableRamForProgram(this._programName);

    if (this._program && !this._program.isAutoscalable) {
      return Math.max(Math.floor(availableRam / this._program.ram), 0);
    }

    if (availableRam > 0) {
      return 1;
    }

    return 0;
  };
}
