import { html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.component.js';
import { LANGUAGES, LONG_NUMBER_FORMATS, THEMES } from '@shared/constants';
import { Language, LongNumberFormat, Theme } from '@shared/types';
import { SettingsFormController } from './controller';

@customElement('ca-settings-form')
export class SettingsForm extends BaseComponent<SettingsFormController> {
  static styles = css`
    :host {
      width: 100%;
      max-width: var(--ca-viewport-width);
      display: grid;
      column-gap: var(--sl-spacing-3x-large);
      row-gap: var(--sl-spacing-large);
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      align-items: flex-start;
      margin-bottom: var(--sl-spacing-large);
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.spinner-container {
      width: 100%;
      max-width: 20em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--sl-spacing-3x-large);
      font-size: var(--sl-font-size-3x-large);
      box-sizing: border-box;
    }

    div.spinner-container sl-spinner {
      --speed: var(--sl-transition-x-slow);
    }
  `;

  protected controller: SettingsFormController;

  private _languageInputRef = createRef<SlSelect>();

  private _themeInputRef = createRef<SlSelect>();

  private _messageLogSizeInputRef = createRef<SlInput>();

  private _updateIntervalInputRef = createRef<SlRange>();

  private _autosaveEnabledSwitchRef = createRef<SlSwitch>();

  private _autosaveIntervalInputRef = createRef<SlRange>();

  private _maxUpdatesPerTickInputRef = createRef<SlRange>();

  private _maxUpdatesPerFastForwardInputRef = createRef<SlInput>();

  private _longNumberFormatInputRef = createRef<SlSelect>();

  @state()
  private _isSaving = false;

  constructor() {
    super();

    this.controller = new SettingsFormController(this);
  }

  renderContent() {
    const content = this._isSaving ? this.renderSpinner() : this.renderForm();

    return html`${content}`;
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (this._autosaveIntervalInputRef.value) {
      this._autosaveIntervalInputRef.value.tooltipFormatter = this.autosaveIntervalFormatter;
    }

    if (this._updateIntervalInputRef.value) {
      this._updateIntervalInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }

    if (this._maxUpdatesPerTickInputRef.value) {
      this._maxUpdatesPerTickInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }
  }

  private renderForm(): TemplateResult {
    return html`
      <sl-select
        ${ref(this._languageInputRef)}
        name="language"
        value=${this.controller.language}
        @sl-change=${this.handleChangeLanguage}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:language">Language</intl-message>
        </span>

        ${LANGUAGES.map(
          (language) =>
            html` <sl-option value=${language}>
              <intl-message label="ui:settings:languages:${language}"> Language </intl-message>
            </sl-option>`,
        )}
      </sl-select>

      <sl-select
        ${ref(this._themeInputRef)}
        name="theme"
        value=${this.controller.theme}
        @sl-change=${this.handleChangeTheme}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:theme">Theme</intl-message>
        </span>

        ${THEMES.map(
          (theme) =>
            html` <sl-option value=${theme}>
              <intl-message label="ui:settings:themes:${theme}"> Theme </intl-message>
            </sl-option>`,
        )}
      </sl-select>

      <sl-input
        ${ref(this._messageLogSizeInputRef)}
        name="messageLogSize"
        value=${this.controller.messageLogSize}
        type="number"
        min="1"
        max="100"
        step="1"
        @sl-change=${this.handleChangeMessageLogSize}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:messageLogSize">Message log size</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:messageLogSizeHint">
            Excessive messages in log won't be removed until new message is received
          </intl-message>
        </span>
      </sl-input>

      <sl-select
        ${ref(this._longNumberFormatInputRef)}
        name="longNumberFormat"
        value=${this.controller.longNumberFormat}
        @sl-change=${this.handleChangeLongNumberFormat}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:longNumberFormat">Long number format</intl-message>
        </span>

        ${LONG_NUMBER_FORMATS.map(
          (longNumberFormat) =>
            html` <sl-option value=${longNumberFormat}>
              <intl-message label="ui:settings:longNumberFormats:${longNumberFormat}">
                Long number format
              </intl-message>
            </sl-option>`,
        )}
      </sl-select>

      <sl-range
        ${ref(this._updateIntervalInputRef)}
        min="25"
        max="1000"
        step="1"
        name="updateInterval"
        value=${this.controller.updateInterval}
        @sl-change=${this.handleChangeUpdateInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:updateInterval">Update interval</intl-message>
        </span>
      </sl-range>

      <sl-range
        ${ref(this._maxUpdatesPerTickInputRef)}
        min="2"
        max="100"
        step="1"
        name="maxUpdatesPerTick"
        value=${this.controller.maxUpdatesPerTick}
        @sl-change=${this.handleChangemaxUpdatesPerTick}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxUpdatesPerTick">Max ticks per update</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxUpdatesPerTickHint">
            Excessive messages in log won't be removed until new message is received
          </intl-message>
        </span>
      </sl-range>

      <sl-switch
        ${ref(this._autosaveEnabledSwitchRef)}
        size="large"
        name="autosaveEnabled"
        ?checked=${this.controller.autosaveEnabled}
        @sl-change=${this.handleChangeAutosaveEnabled}
      >
        <span class="input-label">
          <intl-message label="ui:settings:autosaveEnabled">Autosave enabled</intl-message>
        </span>
      </sl-switch>

      <sl-range
        ${ref(this._autosaveIntervalInputRef)}
        min="10000"
        max="600000"
        step="1000"
        name="autosaveInterval"
        value=${this.controller.autosaveInterval}
        @sl-change=${this.handleChangeAutosaveInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:autosaveInterval">Autosave interval</intl-message>
        </span>
      </sl-range>

      <sl-input
        ${ref(this._maxUpdatesPerFastForwardInputRef)}
        name="maxUpdatesPerFastForward"
        value=${this.controller.maxUpdatesPerFastForward}
        type="number"
        min="1"
        max="100000000"
        step="1"
        @sl-change=${this.handleChangemaxUpdatesPerFastForward}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxUpdatesPerFastForward">Max ticks per fast forward</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxUpdatesPerFastForwardHint">
            Too high number can cause strain on CPU
          </intl-message>
        </span>
      </sl-input>
    `;
  }

  private renderSpinner(): TemplateResult {
    return html`
      <div class="spinner-container">
        <sl-spinner></sl-spinner>
      </div>
    `;
  }

  private startSaving = () => {
    this._isSaving = true;
  };

  private stopSaving = () => {
    this._isSaving = false;
  };

  private handleChangeLanguage = async () => {
    if (!this._languageInputRef.value) {
      return;
    }

    this.startSaving();

    try {
      await this.controller.setLanguage(this._languageInputRef.value.value as Language);
    } catch (e) {
      console.error(e);
    } finally {
      this.stopSaving();
    }
  };

  private handleChangeTheme = () => {
    if (!this._themeInputRef.value) {
      return;
    }

    this.controller.setTheme(this._themeInputRef.value.value as Theme);
  };

  private handleChangeMessageLogSize = () => {
    if (!this._messageLogSizeInputRef.value) {
      return;
    }

    let value = this._messageLogSizeInputRef.value.valueAsNumber;

    if (value < 1) {
      value = 1;
    }

    if (value > 100) {
      value = 100;
    }

    this.controller.setMessageLogSize(value);
    this._messageLogSizeInputRef.value.valueAsNumber = value;
  };

  private handleChangeUpdateInterval = () => {
    if (!this._updateIntervalInputRef.value) {
      return;
    }

    this.controller.setUpdateInterval(this._updateIntervalInputRef.value.value);
  };

  private handleChangeAutosaveEnabled = () => {
    if (!this._autosaveEnabledSwitchRef.value) {
      return;
    }

    this.controller.setAutosaveEnabled(this._autosaveEnabledSwitchRef.value.checked);
  };

  private handleChangeAutosaveInterval = () => {
    if (!this._autosaveIntervalInputRef.value) {
      return;
    }

    this.controller.setAutosaveInterval(this._autosaveIntervalInputRef.value.value);
  };

  private handleChangemaxUpdatesPerTick = () => {
    if (!this._maxUpdatesPerTickInputRef.value) {
      return;
    }

    this.controller.setMaxUpdatesPerTick(this._maxUpdatesPerTickInputRef.value.value);
  };

  private handleChangemaxUpdatesPerFastForward = () => {
    if (!this._maxUpdatesPerFastForwardInputRef.value) {
      return;
    }

    let value = this._maxUpdatesPerFastForwardInputRef.value.valueAsNumber;

    if (value < 1) {
      value = 1;
    }

    if (value > 100000000) {
      value = 100000000;
    }

    this.controller.setmaxUpdatesPerFastForward(value);
    this._maxUpdatesPerFastForwardInputRef.value.valueAsNumber = value;
  };

  private handleChangeLongNumberFormat = () => {
    if (!this._longNumberFormatInputRef.value) {
      return;
    }

    this.controller.setLongNumberFormat(this._longNumberFormatInputRef.value.value as LongNumberFormat);
  };

  private autosaveIntervalFormatter = (value: number): string => {
    return this.controller.formatter.formatNumberDecimal(value / 1000);
  };

  private decimalNumberFormatter = (value: number): string => {
    return this.controller.formatter.formatNumberDecimal(value);
  };
}
