import { html, css } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { BaseComponent } from '@shared/base-component';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import SlRange from '@shoelace-style/shoelace/dist/components/range/range.component.js';
import SlSwitch from '@shoelace-style/shoelace/dist/components/switch/switch.component.js';
import { LONG_NUMBER_FORMATS, THEMES } from '@shared/constants';
import { SCREEN_WIDTH_POINTS, inputLabelStyle } from '@shared/styles';
import { Language, LongNumberFormat, Theme } from '@shared/types';
import { SettingsFormController } from './controller';
import * as constants from './constants';
import { cache } from 'lit/directives/cache.js';

@localized()
@customElement('ca-settings-form')
export class SettingsForm extends BaseComponent {
  static styles = [
    inputLabelStyle,
    css`
      :host {
        width: 100%;
      }

      div.spinner-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--sl-spacing-3x-large);
        font-size: var(--sl-font-size-3x-large);
      }

      div.settings-form {
        width: 100%;
        display: grid;
        row-gap: var(--sl-spacing-2x-large);
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        align-items: flex-start;
        margin-bottom: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        div.settings-form {
          row-gap: var(--sl-spacing-large);
          column-gap: var(--sl-spacing-3x-large);
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ];

  private _controller: SettingsFormController;

  private _languageInputRef = createRef<SlSelect>();

  private _themeInputRef = createRef<SlSelect>();

  private _messageLogSizeInputRef = createRef<SlInput>();

  private _toastDurationInputRef = createRef<SlRange>();

  private _updateFPSInputRef = createRef<SlRange>();

  private _autosaveEnabledOnHideSwitchRef = createRef<SlSwitch>();

  private _autosaveIntervalInputRef = createRef<SlRange>();

  private _fastSpeedMultiplierInputRef = createRef<SlRange>();

  private _maxUpdatesPerTickInputRef = createRef<SlInput>();

  private _longNumberFormatInputRef = createRef<SlSelect>();

  @state()
  private _spinnerVisible = false;

  constructor() {
    super();

    this._controller = new SettingsFormController(this);
  }

  render() {
    if (this._spinnerVisible) {
      return html`<div class="spinner-container"><sl-spinner></sl-spinner></div>`;
    }

    return cache(html`
      <div class="settings-form">
        <sl-select
          ${ref(this._languageInputRef)}
          name="language"
          value=${this._controller.language}
          @sl-change=${this.handleChangeLanguage}
        >
          <span class="input-label" slot="label"> ${msg('Language')} </span>

          ${constants.LANGUAGE_OPTIONS.map(this.renderLanguageOption)}
        </sl-select>

        <sl-select
          ${ref(this._themeInputRef)}
          name="theme"
          value=${this._controller.theme}
          @sl-change=${this.handleChangeTheme}
        >
          <span class="input-label" slot="label"> ${msg('Theme')} </span>

          ${THEMES.map(this.renderThemeOption)}
        </sl-select>

        <sl-input
          ${ref(this._messageLogSizeInputRef)}
          name="messageLogSize"
          value=${this._controller.messageLogSize}
          type="number"
          inputmode="decimal"
          min=${constants.MESSAGE_LOG_SIZE_MIN}
          max=${constants.MESSAGE_LOG_SIZE_MAX}
          step=${constants.MESSAGE_LOG_SIZE_STEP}
          @sl-change=${this.handleChangeMessageLogSize}
        >
          <span class="input-label" slot="label"> ${msg('Maximum amount of messages in log')} </span>

          <span slot="help-text">
            ${msg("Excessive messages in log won't be removed until new message is received")}
          </span>
        </sl-input>

        <sl-range
          ${ref(this._toastDurationInputRef)}
          min=${constants.TOAST_DURATION_MIN}
          max=${constants.TOAST_DURATION_MAX}
          step=${constants.TOAST_DURATION_STEP}
          name="toastDuration"
          value=${this._controller.toastDuration}
          @sl-change=${this.handleChangeToastDuration}
        >
          <span class="input-label" slot="label"> ${msg('Message popup duration (s)')} </span>

          <span slot="help-text"> ${msg('Set 0 to disable message popups')} </span>
        </sl-range>

        <sl-range
          ${ref(this._updateFPSInputRef)}
          min=${constants.FPS_MIN}
          max=${constants.FPS_MAX}
          step=${constants.FPS_STEP}
          name="fps"
          value=${this._controller.fps}
          @sl-change=${this.handleChangeUpdateFPS}
        >
          <span class="input-label" slot="label"> ${msg('Frames per second')} </span>

          <span slot="help-text"> ${msg('Too high number can cause strain on CPU')} </span>
        </sl-range>

        <sl-range
          ${ref(this._fastSpeedMultiplierInputRef)}
          min=${constants.FAST_SPEED_MULTIPLIER_MIN}
          max=${constants.FAST_SPEED_MULTIPLIER_MAX}
          step=${constants.FAST_SPEED_MULTIPLIER_STEP}
          name="fastSpeedMultiplier"
          value=${this._controller.fastSpeedMultiplier}
          @sl-change=${this.handleChangeFastSpeedMultiplier}
        >
          <span class="input-label" slot="label"> ${msg('Speed multiplier when game speed is fast')} </span>

          <span slot="help-text"> ${msg('Too high number can cause strain on CPU')} </span>
        </sl-range>

        <sl-input
          ${ref(this._maxUpdatesPerTickInputRef)}
          name="maxUpdatesPerTick"
          value=${this._controller.maxUpdatesPerTick}
          type="number"
          inputmode="decimal"
          min=${constants.MAX_UPDATES_PER_FRAME_MIN}
          max=${constants.MAX_UPDATES_PER_FRAME_MAX}
          step=${constants.MAX_UPDATES_PER_FRAME_STEP}
          @sl-change=${this.handleChangeMaxUpdatesPerTick}
        >
          <span class="input-label" slot="label"> ${msg('Maximum amount of updates per frame')} </span>

          <span slot="help-text"> ${msg('Too high number can cause strain on CPU')} </span>
        </sl-input>

        <sl-select
          ${ref(this._longNumberFormatInputRef)}
          name="longNumberFormat"
          value=${this._controller.longNumberFormat}
          @sl-change=${this.handleChangeLongNumberFormat}
        >
          <span class="input-label" slot="label"> ${msg('Long number format')} </span>

          ${LONG_NUMBER_FORMATS.map(this.renderLongNumberFormatOption)}
        </sl-select>

        <sl-switch
          ${ref(this._autosaveEnabledOnHideSwitchRef)}
          size="medium"
          name="autosaveEnabledOnHide"
          ?checked=${this._controller.autosaveEnabledOnHide}
          @sl-change=${this.handleChangeAutosaveEnabledOnHide}
        >
          <span class="input-label"> ${msg('Enable autosave when game tab hides or closes')} </span>
        </sl-switch>

        <sl-range
          ${ref(this._autosaveIntervalInputRef)}
          min=${constants.AUTOSAVE_INTERVAL_MIN}
          max=${constants.AUTOSAVE_INTERVAL_MAX}
          step=${constants.AUTOSAVE_INTERVAL_STEP}
          name="autosaveInterval"
          value=${this._controller.autosaveInterval}
          @sl-change=${this.handleChangeAutosaveInterval}
        >
          <span class="input-label" slot="label"> ${msg('Autosave interval (s)')} </span>

          <span slot="help-text">
            ${msg('Too low number can cause strain on CPU. Select 0 to disable regular autosave')}
          </span>
        </sl-range>
      </div>
    `);
  }

  updated(_changedProperties: Map<string, any>) {
    super.updated(_changedProperties);

    if (this._toastDurationInputRef.value) {
      this._toastDurationInputRef.value.tooltipFormatter = this.timeSecondsFormatter;
    }

    if (this._autosaveIntervalInputRef.value) {
      this._autosaveIntervalInputRef.value.tooltipFormatter = this.timeSecondsFormatter;
    }

    if (this._updateFPSInputRef.value) {
      this._updateFPSInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }

    if (this._fastSpeedMultiplierInputRef.value) {
      this._fastSpeedMultiplierInputRef.value.tooltipFormatter = this.decimalNumberFormatter;
    }
  }

  private renderLanguageOption = ([language, optionText]: string[]) => {
    return html`<sl-option value=${language}> ${optionText} </sl-option>`;
  };

  private renderThemeOption = (theme: Theme) => {
    return html`<sl-option value=${theme}> ${constants.THEME_NAMES[theme]()} </sl-option>`;
  };

  private renderLongNumberFormatOption = (longNumberFormat: LongNumberFormat) => {
    return html`<sl-option value=${longNumberFormat}>
      ${constants.LONG_NUMBER_FORMAT_NAMES[longNumberFormat]()}
    </sl-option>`;
  };

  private handleChangeLanguage = async () => {
    if (!this._languageInputRef.value) {
      return;
    }

    try {
      this._spinnerVisible = true;
      await this._controller.setLanguage(this._languageInputRef.value.value as Language);
      this._spinnerVisible = false;
    } catch (e) {
      console.error(e);
    }
  };

  private handleChangeTheme = () => {
    if (!this._themeInputRef.value) {
      return;
    }

    this._controller.setTheme(this._themeInputRef.value.value as Theme);
  };

  private handleChangeMessageLogSize = () => {
    if (!this._messageLogSizeInputRef.value) {
      return;
    }

    let value = this._messageLogSizeInputRef.value.valueAsNumber;

    if (value < constants.MESSAGE_LOG_SIZE_MIN) {
      value = constants.MESSAGE_LOG_SIZE_MIN;
    }

    if (value > constants.MESSAGE_LOG_SIZE_MAX) {
      value = constants.MESSAGE_LOG_SIZE_MAX;
    }

    this._controller.setMessageLogSize(value);
    this._messageLogSizeInputRef.value.valueAsNumber = value;
  };

  private handleChangeToastDuration = () => {
    if (!this._toastDurationInputRef.value) {
      return;
    }

    this._controller.setToastDuration(this._toastDurationInputRef.value.value);
  };

  private handleChangeUpdateFPS = () => {
    if (!this._updateFPSInputRef.value) {
      return;
    }

    this._controller.setUpdateFPS(this._updateFPSInputRef.value.value);
  };

  private handleChangeAutosaveEnabledOnHide = () => {
    if (!this._autosaveEnabledOnHideSwitchRef.value) {
      return;
    }

    this._controller.setAutosaveEnabled(this._autosaveEnabledOnHideSwitchRef.value.checked);
  };

  private handleChangeAutosaveInterval = () => {
    if (!this._autosaveIntervalInputRef.value) {
      return;
    }

    this._controller.setAutosaveInterval(this._autosaveIntervalInputRef.value.value);
  };

  private handleChangeFastSpeedMultiplier = () => {
    if (!this._fastSpeedMultiplierInputRef.value) {
      return;
    }

    this._controller.setFastSpeedMultiplier(this._fastSpeedMultiplierInputRef.value.value);
  };

  private handleChangeMaxUpdatesPerTick = () => {
    if (!this._maxUpdatesPerTickInputRef.value) {
      return;
    }

    let value = this._maxUpdatesPerTickInputRef.value.valueAsNumber;

    if (value < constants.MAX_UPDATES_PER_FRAME_MIN) {
      value = constants.MAX_UPDATES_PER_FRAME_MIN;
    }

    if (value > constants.MAX_UPDATES_PER_FRAME_MAX) {
      value = constants.MAX_UPDATES_PER_FRAME_MAX;
    }

    this._controller.setMaxUpdatesPerTick(value);
    this._maxUpdatesPerTickInputRef.value.valueAsNumber = value;
  };

  private handleChangeLongNumberFormat = () => {
    if (!this._longNumberFormatInputRef.value) {
      return;
    }

    this._controller.setLongNumberFormat(this._longNumberFormatInputRef.value.value as LongNumberFormat);
  };

  private timeSecondsFormatter = (value: number): string => {
    return this._controller.formatter.formatNumberDecimal(value / 1000);
  };

  private decimalNumberFormatter = (value: number): string => {
    return this._controller.formatter.formatNumberDecimal(value);
  };
}
