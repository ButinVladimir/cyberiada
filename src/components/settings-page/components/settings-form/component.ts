import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.component.js';
import { LANGUAGES, LONG_NUMBER_FORMATS, THEMES } from '@shared/constants';
import { Language, LongNumberFormat, Theme } from '@shared/types';
import { SettingsFormController } from './controller';

@customElement('ca-settings-form')
export class SettingsForm extends LitElement {
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

  private _settingsFormController: SettingsFormController;

  private _languageInputRef = createRef<SlSelect>();

  private _themeInputRef = createRef<SlSelect>();

  private _messageLogSizeInputRef = createRef<SlInput>();

  private _updateIntervalInputRef = createRef<SlRange>();

  private _autosaveEnabledSwitchRef = createRef<SlSwitch>();

  private _autosaveIntervalInputRef = createRef<SlRange>();

  private _maxTicksPerUpdateInputRef = createRef<SlRange>();

  private _maxTicksPerFastForwardInputRef = createRef<SlInput>();

  private _longNumberFormatInputRef = createRef<SlSelect>();

  @state()
  private _isSaving = false;

  @state()
  private _isMessageFilterOpen = false;

  @state()
  private _isAlertFilterOpen = false;

  constructor() {
    super();

    this._settingsFormController = new SettingsFormController(this);
  }

  render() {
    const content = this._isSaving ? this.renderSpinner() : this.renderForm();

    return html`${content}`;
  }

  updated() {
    if (this._autosaveIntervalInputRef.value) {
      this._autosaveIntervalInputRef.value.tooltipFormatter = this.autosaveIntervalFormatter;
    }

    if (this._updateIntervalInputRef.value) {
      this._updateIntervalInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }

    if (this._maxTicksPerUpdateInputRef.value) {
      this._maxTicksPerUpdateInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }
  }

  private renderForm(): TemplateResult {
    return html`
      <sl-button class="dialog-btn" variant="default" size="medium" @click=${this.handleMessageFilterDialogOpen}>
        <sl-icon slot="prefix" name="chat-left-dots"></sl-icon>
        <intl-message label="ui:settings:messageFilter">Message filter</intl-message>
      </sl-button>

      <sl-button class="dialog-btn" variant="default" size="medium" @click=${this.handleAlertFilterDialogOpen}>
        <sl-icon slot="prefix" name="exclamation-circle"></sl-icon>
        <intl-message label="ui:settings:alertFilter">Alert filter</intl-message>
      </sl-button>

      <sl-select
        ${ref(this._languageInputRef)}
        name="language"
        value=${this._settingsFormController.language}
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
        value=${this._settingsFormController.theme}
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
        value=${this._settingsFormController.messageLogSize}
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
        value=${this._settingsFormController.longNumberFormat}
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
        value=${this._settingsFormController.updateInterval}
        @sl-change=${this.handleChangeUpdateInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:updateInterval">Update interval</intl-message>
        </span>
      </sl-range>

      <sl-range
        ${ref(this._maxTicksPerUpdateInputRef)}
        min="2"
        max="100"
        step="1"
        name="maxTicksPerUpdate"
        value=${this._settingsFormController.maxTicksPerUpdate}
        @sl-change=${this.handleChangeMaxTicksPerUpdate}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxTicksPerUpdate">Max ticks per update</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxTicksPerUpdateHint">
            Excessive messages in log won't be removed until new message is received
          </intl-message>
        </span>
      </sl-range>

      <sl-switch
        ${ref(this._autosaveEnabledSwitchRef)}
        size="large"
        name="autosaveEnabled"
        ?checked=${this._settingsFormController.autosaveEnabled}
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
        value=${this._settingsFormController.autosaveInterval}
        @sl-change=${this.handleChangeAutosaveInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:autosaveInterval">Autosave interval</intl-message>
        </span>
      </sl-range>

      <sl-input
        ${ref(this._maxTicksPerFastForwardInputRef)}
        name="maxTicksPerFastForward"
        value=${this._settingsFormController.maxTicksPerFastForward}
        type="number"
        min="1"
        max="100000000"
        step="1"
        @sl-change=${this.handleChangeMaxTicksPerFastForward}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxTicksPerFastForward">Max ticks per fast forward</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxTicksPerFastForwardHint">
            Too high number can cause strain on CPU
          </intl-message>
        </span>
      </sl-input>

      <ca-message-filter-dialog
        ?is-open=${this._isMessageFilterOpen}
        @message-filter-dialog-close=${this.handleMessageFilterDialogClose}
      >
      </ca-message-filter-dialog>

      <ca-alert-filter-dialog
        ?is-open=${this._isAlertFilterOpen}
        @alert-filter-dialog-close=${this.handleAlertFilterDialogClose}
      >
      </ca-alert-filter-dialog>
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
      await this._settingsFormController.setLanguage(this._languageInputRef.value.value as Language);
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

    this._settingsFormController.setTheme(this._themeInputRef.value.value as Theme);
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

    this._settingsFormController.setMessageLogSize(value);
    this._messageLogSizeInputRef.value.valueAsNumber = value;
  };

  private handleChangeUpdateInterval = () => {
    if (!this._updateIntervalInputRef.value) {
      return;
    }

    this._settingsFormController.setUpdateInterval(this._updateIntervalInputRef.value.value);
  };

  private handleChangeAutosaveEnabled = () => {
    if (!this._autosaveEnabledSwitchRef.value) {
      return;
    }

    this._settingsFormController.setAutosaveEnabled(this._autosaveEnabledSwitchRef.value.checked);
  };

  private handleChangeAutosaveInterval = () => {
    if (!this._autosaveIntervalInputRef.value) {
      return;
    }

    this._settingsFormController.setAutosaveInterval(this._autosaveIntervalInputRef.value.value);
  };

  private handleChangeMaxTicksPerUpdate = () => {
    if (!this._maxTicksPerUpdateInputRef.value) {
      return;
    }

    this._settingsFormController.setMaxTicksPerUpdate(this._maxTicksPerUpdateInputRef.value.value);
  };

  private handleChangeMaxTicksPerFastForward = () => {
    if (!this._maxTicksPerFastForwardInputRef.value) {
      return;
    }

    let value = this._maxTicksPerFastForwardInputRef.value.valueAsNumber;

    if (value < 1) {
      value = 1;
    }

    if (value > 100000000) {
      value = 100000000;
    }

    this._settingsFormController.setMaxTicksPerFastForward(value);
    this._maxTicksPerFastForwardInputRef.value.valueAsNumber = value;
  };

  private handleChangeLongNumberFormat = () => {
    if (!this._longNumberFormatInputRef.value) {
      return;
    }

    this._settingsFormController.setLongNumberFormat(this._longNumberFormatInputRef.value.value as LongNumberFormat);
  };

  private handleMessageFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = true;
  };

  private handleMessageFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isMessageFilterOpen = false;
  };

  private handleAlertFilterDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isAlertFilterOpen = true;
  };

  private handleAlertFilterDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isAlertFilterOpen = false;
  };

  private autosaveIntervalFormatter = (value: number): string => {
    return this._settingsFormController.formatter.formatNumberDecimal(value / 1000);
  };

  private decimalNumberFormatter = (value: number): string => {
    return this._settingsFormController.formatter.formatNumberDecimal(value);
  };
}
