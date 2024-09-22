import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { ProgramName } from '@state/progam-factory/types';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { StartProcessDialogCloseEvent } from './events';
import { StartProcessDialogController } from './controller';

@customElement('ca-start-process-dialog')
export class StartProcessDialog extends LitElement {
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

    ca-program-description[program-name] {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }
  `;

  private _startProcessDialogController: StartProcessDialogController;

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
  private _maxThreads = 1;

  constructor() {
    super();

    this._startProcessDialogController = new StartProcessDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    if (_changedProperties.get('isOpen') === false) {
      this._programName = undefined;
      this._threads = 1;
    }
  }

  render() {
    const program = this._programName ? this._startProcessDialogController.getProgram(this._programName) : undefined;

    const threads = program?.isAutoscalable ? this._startProcessDialogController.cores : this._threads;

    const threadsInputDisabled = !(program && !program.isAutoscalable);
    const submitButtonDisabled = !(
      program &&
      (program.isAutoscalable || (this._threads >= 1 && this._threads <= this._maxThreads))
    );

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:processes:startProcess"> Start process </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:processes:startProcessDialogHint"> Select program. </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select
            ${ref(this._programInputRef)}
             name="program" value=${this._programName ?? ''} hoist @sl-change=${this.handleProgramChange}>
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:program">Program</intl-message>
              </span>

              ${this._startProcessDialogController.listPrograms().map(this.formatProgramSelectItem)}
            </sl-select>

            <sl-input
            ${ref(this._threadsInputRef)}
              name="threads"
              value=${this._threads}
              type="number"
              min="1"
              max=${this._maxThreads}
              step="1"
              ?disabled=${threadsInputDisabled}
              @sl-change=${this.handleThreadsChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:threads">Threads</intl-message>
              </span>
            </sl-input>
            </sl-select>
          </div>

          <ca-program-description
            program-name=${ifDefined(this._programName)}
            level=${program?.level ?? 1}
            quality=${program?.quality ?? 0}
            threads=${threads}
          >
          </ca-program-description>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <sl-button ?disabled=${submitButtonDisabled} slot="footer" size="medium" variant="primary" @click=${this.handleStartProcess}>
          <intl-message label="ui:mainframe:processes:startProcess"> Start process </intl-message>
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

    const program = this._startProcessDialogController.getProgram(this._programName);
    const availableRam = this._startProcessDialogController.getAvailableRamForProgram(this._programName);

    this._maxThreads = 1;

    if (program && !program.isAutoscalable) {
      this._maxThreads = Math.max(Math.floor(availableRam / program.ram), 1);
    }
  };

  private handleThreadsChange = () => {
    if (!this._threadsInputRef.value) {
      return;
    }

    let threads = this._threadsInputRef.value.valueAsNumber;

    if (threads < 1) {
      threads = 1;
    }

    if (threads > this._maxThreads) {
      threads = this._maxThreads;
    }

    this._threads = threads;
    this._threadsInputRef.value.valueAsNumber = threads;
  };

  private handleStartProcess = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (this._programName) {
      const isStarted = this._startProcessDialogController.startProcess(this._programName, this._threads);

      if (isStarted) {
        this.dispatchEvent(new StartProcessDialogCloseEvent());
      }
    }
  };

  private formatProgramSelectItem = (program: IProgram) => {
    const formatter = this._startProcessDialogController.formatter;
    const value = JSON.stringify({
      programName: program.name,
      level: formatter.formatNumberDecimal(program.level),
      quality: formatter.formatQuality(program.quality),
    });

    return html`<sl-option value=${program.name}>
      <intl-message label="ui:mainframe:processes:programSelectItem" value=${value}> Program </intl-message>
    </sl-option>`;
  };
}
