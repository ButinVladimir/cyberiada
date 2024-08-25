import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import { LANGUAGES, LONG_NUMBER_FORMATS, THEMES } from '@shared/constants';
import { Language, LongNumberFormat, Theme } from '@shared/types';
import { formatter } from '@shared/formatter';
import { SettingsFormController } from './controller';

@customElement('ca-settings-form')
export class SettingsForm extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: grid;
      column-gap: var(--sl-spacing-3x-large);
      row-gap: var(--sl-spacing-large);
      grid-template-columns: repeat(2, minmax(0, 30rem));
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

  @query('sl-select[name="language"]')
  private _languageInput?: SlSelect;

  @query('sl-select[name="theme"]')
  private _themeInput?: SlSelect;

  @query('sl-input[name="messageLogSize"]')
  private _messageLogSizeInput?: SlInput;

  @query('sl-range[name="updateInterval"]')
  private _updateIntervalInput?: SlRange;

  @query('sl-checkbox[name="autosaveEnabled"]')
  private _autosaveEnabledInput?: SlCheckbox;

  @query('sl-range[name="autosaveInterval"]')
  private _autosaveIntervalInput?: SlRange;

  @query('sl-range[name="maxTicksPerUpdate"]')
  private _maxTicksPerUpdateInput?: SlRange;

  @query('sl-select[name="longNumberFormat"]')
  private _longNumberFormatInput?: SlSelect;

  @state()
  private _isSaving = false;

  private static autosaveIntervalFormatter = (value: number): string => {
    return formatter.formatNumberDecimal(value / 1000);
  };

  private static decimalNumberFormatter = (value: number): string => {
    return formatter.formatNumberDecimal(value);
  };

  constructor() {
    super();

    this._settingsFormController = new SettingsFormController(this);
  }

  render() {
    const content = this._isSaving ? this.renderSpinner() : this.renderForm();

    return html` ${content} `;
  }

  updated() {
    if (this._autosaveIntervalInput) {
      this._autosaveIntervalInput.tooltipFormatter = SettingsForm.autosaveIntervalFormatter;
    }

    if (this._updateIntervalInput) {
      this._updateIntervalInput.tooltipFormatter = SettingsForm.decimalNumberFormatter;
    }

    if (this._maxTicksPerUpdateInput) {
      this._maxTicksPerUpdateInput.tooltipFormatter = SettingsForm.decimalNumberFormatter;
    }
  }

  private renderForm(): TemplateResult {
    return html`
      <sl-select name="language" value=${this._settingsFormController.language} @sl-change=${this.handleChangeLanguage}>
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

      <sl-select name="theme" value=${this._settingsFormController.theme} @sl-change=${this.handleChangeTheme}>
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
        min="2"
        max="20"
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

      <sl-checkbox
        size="medium"
        name="autosaveEnabled"
        ?checked=${this._settingsFormController.autosaveEnabled}
        @sl-change=${this.handleChangeAutosaveEnabled}
      >
        <span class="input-label">
          <intl-message label="ui:settings:autosaveEnabled">Autosave enabled</intl-message>
        </span>
      </sl-checkbox>

      <sl-range
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
    this.startSaving();

    try {
      await this._settingsFormController.setLanguage(this._languageInput!.value as Language);
    } catch (e) {
      console.error(e);
    } finally {
      this.stopSaving();
    }
  };

  private handleChangeTheme = () => {
    this._settingsFormController.setTheme(this._themeInput!.value as Theme);
  };

  private handleChangeMessageLogSize = () => {
    let value = this._messageLogSizeInput!.valueAsNumber;

    if (value < 1) {
      value = 1;
    }

    if (value > 100) {
      value = 100;
    }

    this._settingsFormController.setMessageLogSize(value);
    this._messageLogSizeInput!.valueAsNumber = value;
  };

  private handleChangeUpdateInterval = () => {
    this._settingsFormController.setUpdateInterval(this._updateIntervalInput!.value);
  };

  private handleChangeAutosaveEnabled = () => {
    this._settingsFormController.setAutosaveEnabled(this._autosaveEnabledInput!.checked);
  };

  private handleChangeAutosaveInterval = () => {
    this._settingsFormController.setAutosaveInterval(this._autosaveIntervalInput!.value);
  };

  private handleChangeMaxTicksPerUpdate = () => {
    this._settingsFormController.setMaxTicksPerUpdate(this._maxTicksPerUpdateInput!.value);
  };

  private handleChangeLongNumberFormat = () => {
    this._settingsFormController.setLongNumberFormat(this._longNumberFormatInput!.value as LongNumberFormat);
  };
}
