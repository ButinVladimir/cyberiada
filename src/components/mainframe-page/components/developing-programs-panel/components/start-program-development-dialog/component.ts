import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import { PROGRAMS } from '@state/progam-factory/constants';
import { ProgramName } from '@state/progam-factory/types';
import { StartProgramDevelopmentDialogCloseEvent } from './events';
import { QUALITIES } from '@shared/constants';
import { StartProgramDevelopmentDialogController } from './controller';

@customElement('ca-start-program-development-dialog')
export class StartProgramDevelopmentDialog extends LitElement {
  static styles = css`
    sl-dialog {
      --width: 50rem;
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
      grid-template-columns: repeat(3, 1fr);
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

  private _startProgramDevelopmentDialogController: StartProgramDevelopmentDialogController;

  private _programInputRef = createRef<SlSelect>();

  private _levelInputRef = createRef<SlInput>();

  private _qualityInputRef = createRef<SlSelect>();

  @property({
    attribute: 'is-open',
    type: Boolean,
  })
  isOpen = false;

  @state()
  private _programName?: ProgramName = undefined;

  @state()
  private _level = 1;

  @state()
  private _quality = 0;

  constructor() {
    super();

    this._startProgramDevelopmentDialogController = new StartProgramDevelopmentDialogController(this);
  }

  updated(_changedProperties: Map<string, any>) {
    if (_changedProperties.get('isOpen') === false) {
      this._programName = undefined;
      this._level = 1;
      this._quality = 0;
    }
  }

  render() {
    const formatter = this._startProgramDevelopmentDialogController.formatter;
    const cityLevel = this._startProgramDevelopmentDialogController.cityLevel;

    const program = this._programName
      ? this._startProgramDevelopmentDialogController.getProgram(this._programName, this._level, this._quality)
      : undefined;
    const developmentPoints = program ? program.developmentPoints : 0;

    const submitButtonValues = JSON.stringify({
      developmentPoints: formatter.formatNumberLong(developmentPoints),
    });

    const submitButtonDisabled = !(program && this._level <= cityLevel);

    return html`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:developingPrograms:startProgramDevelopment">
            Start program development
          </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:developingPrograms:startProgramDevelopmentDialogHint">
              Select program type, level and quality to start developing it.
            </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select
              ${ref(this._programInputRef)}
              name="program"
              value=${this._programName ?? ''}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:program">Program</intl-message>
              </span>

              ${PROGRAMS.map(
                (program) =>
                  html`<sl-option value=${program}>
                    <intl-message label="programs:${program}:name"> Program </intl-message>
                  </sl-option>`,
              )}
            </sl-select>

            <sl-input
              ${ref(this._levelInputRef)}
              name="level"
              value=${this._level}
              type="number"
              min="1"
              max=${cityLevel}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:level">Level</intl-message>
              </span>
            </sl-input>

            <sl-select
              ${ref(this._qualityInputRef)}
              name="quality"
              value=${this._quality}
              hoist
              @sl-change=${this.handleQualityChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:quality">Quality</intl-message>
              </span>

              ${QUALITIES.map(
                (quality) => html` <sl-option value=${quality}> ${formatter.formatQuality(quality)} </sl-option>`,
              )}
            </sl-select>
          </div>

          <ca-program-description
            program-name=${ifDefined(this._programName)}
            level=${this._level}
            quality=${this._quality}
            threads=${1}
          >
          </ca-program-description>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <sl-button
          slot="footer"
          ?disabled=${submitButtonDisabled}
          size="medium"
          variant="primary"
          @click=${this.handlePurchase}
        >
          <intl-message label="ui:mainframe:developingPrograms:startDevelopment" value=${submitButtonValues}>
            Start development
          </intl-message>
        </sl-button>
      </sl-dialog>
    `;
  }

  private handleClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new StartProgramDevelopmentDialogCloseEvent());
  };

  private handleProgramChange = () => {
    if (!this._programInputRef.value) {
      return;
    }

    this._programName = this._programInputRef.value.value as ProgramName;
  };

  private handleLevelChange = () => {
    if (!this._levelInputRef.value) {
      return;
    }

    let level = this._levelInputRef.value.valueAsNumber;

    if (level < 1) {
      level = 1;
    }

    if (level > this._startProgramDevelopmentDialogController.cityLevel) {
      level = this._startProgramDevelopmentDialogController.cityLevel;
    }

    this._level = level;
    this._levelInputRef.value.valueAsNumber = level;
  };

  private handleQualityChange = () => {
    if (!this._qualityInputRef.value) {
      return;
    }

    this._quality = +this._qualityInputRef.value.value;
  };

  private handlePurchase = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this._programName) {
      return;
    }

    const hasStarted = this._startProgramDevelopmentDialogController.startDevelopingProgram(
      this._programName,
      this._level,
      this._quality,
    );

    if (hasStarted) {
      this.dispatchEvent(new StartProgramDevelopmentDialogCloseEvent());
    }
  };
}
