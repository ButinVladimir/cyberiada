import { t } from 'i18next';
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
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

@customElement('ca-settings-form')
export class SettingsForm extends BaseComponent<SettingsFormController> {
  static styles = [
    inputLabelStyle,
    css`
      :host {
        width: 100%;
        display: grid;
        row-gap: var(--sl-spacing-2x-large);
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        align-items: flex-start;
        margin-bottom: var(--sl-spacing-large);
      }

      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
        :host {
          row-gap: var(--sl-spacing-large);
          column-gap: var(--sl-spacing-3x-large);
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ];

  protected controller: SettingsFormController;

  private _languageInputRef = createRef<SlSelect>();

  private _themeInputRef = createRef<SlSelect>();

  private _messageLogSizeInputRef = createRef<SlInput>();

  private _toastDurationInputRef = createRef<SlRange>();

  private _updateFPSInputRef = createRef<SlRange>();

  private _autosaveEnabledSwitchRef = createRef<SlSwitch>();

  private _autosaveIntervalInputRef = createRef<SlRange>();

  private _fastSpeedMultiplierInputRef = createRef<SlRange>();

  private _maxUpdatesPerTickInputRef = createRef<SlInput>();

  private _longNumberFormatInputRef = createRef<SlSelect>();

  constructor() {
    super();

    this.controller = new SettingsFormController(this);
  }

  renderContent() {
    return html`
      <sl-select
        ${ref(this._languageInputRef)}
        name="language"
        value=${this.controller.language}
        @sl-change=${this.handleChangeLanguage}
      >
        <span class="input-label" slot="label"> ${t('settings.language', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.languageHint', { ns: 'ui' })} </span>

        ${constants.LANGUAGE_OPTIONS.map(
          ([language, optionText]) => html`<sl-option value=${language}> ${optionText} </sl-option>`,
        )}
      </sl-select>

      <sl-select
        ${ref(this._themeInputRef)}
        name="theme"
        value=${this.controller.theme}
        @sl-change=${this.handleChangeTheme}
      >
        <span class="input-label" slot="label"> ${t('settings.theme', { ns: 'ui' })} </span>

        ${THEMES.map(
          (theme) => html`<sl-option value=${theme}> ${t(`settings.themes.${theme}`, { ns: 'ui' })} </sl-option>`,
        )}
      </sl-select>

      <sl-input
        ${ref(this._messageLogSizeInputRef)}
        name="messageLogSize"
        value=${this.controller.messageLogSize}
        type="number"
        min=${constants.MESSAGE_LOG_SIZE_MIN}
        max=${constants.MESSAGE_LOG_SIZE_MAX}
        step=${constants.MESSAGE_LOG_SIZE_STEP}
        @sl-change=${this.handleChangeMessageLogSize}
      >
        <span class="input-label" slot="label"> ${t('settings.messageLogSize', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.messageLogSizeHint', { ns: 'ui' })} </span>
      </sl-input>

      <sl-range
        ${ref(this._toastDurationInputRef)}
        min=${constants.TOAST_DURATION_MIN}
        max=${constants.TOAST_DURATION_MAX}
        step=${constants.TOAST_DURATION_STEP}
        name="toastDuration"
        value=${this.controller.toastDuration}
        @sl-change=${this.handleChangeToastDuration}
      >
        <span class="input-label" slot="label"> ${t('settings.toastDuration', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.toastDurationHint', { ns: 'ui' })} </span>
      </sl-range>

      <sl-range
        ${ref(this._updateFPSInputRef)}
        min=${constants.FPS_MIN}
        max=${constants.FPS_MAX}
        step=${constants.FPS_STEP}
        name="fps"
        value=${this.controller.fps}
        @sl-change=${this.handleChangeUpdateFPS}
      >
        <span class="input-label" slot="label"> ${t('settings.framesPerSecond', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.framesPerSecondHint', { ns: 'ui' })} </span>
      </sl-range>

      <sl-range
        ${ref(this._fastSpeedMultiplierInputRef)}
        min=${constants.FAST_SPEED_MULTIPLIER_MIN}
        max=${constants.FAST_SPEED_MULTIPLIER_MAX}
        step=${constants.FAST_SPEED_MULTIPLIER_STEP}
        name="fastSpeedMultiplier"
        value=${this.controller.fastSpeedMultiplier}
        @sl-change=${this.handleChangeFastSpeedMultiplier}
      >
        <span class="input-label" slot="label"> ${t('settings.fastSpeedMultiplier', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.fastSpeedMultiplierHint', { ns: 'ui' })} </span>
      </sl-range>

      <sl-input
        ${ref(this._maxUpdatesPerTickInputRef)}
        name="maxUpdatesPerTick"
        value=${this.controller.maxUpdatesPerTick}
        type="number"
        min=${constants.MAX_UPDATES_PER_FRAME_MIN}
        max=${constants.MAX_UPDATES_PER_FRAME_MAX}
        step=${constants.MAX_UPDATES_PER_FRAME_STEP}
        @sl-change=${this.handleChangeMaxUpdatesPerTick}
      >
        <span class="input-label" slot="label"> ${t('settings.maxUpdatesPerFrame', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.maxUpdatesPerFrameHint', { ns: 'ui' })} </span>
      </sl-input>

      <sl-select
        ${ref(this._longNumberFormatInputRef)}
        name="longNumberFormat"
        value=${this.controller.longNumberFormat}
        @sl-change=${this.handleChangeLongNumberFormat}
      >
        <span class="input-label" slot="label"> ${t('settings.longNumberFormat', { ns: 'ui' })} </span>

        ${LONG_NUMBER_FORMATS.map(
          (longNumberFormat) =>
            html` <sl-option value=${longNumberFormat}>
              ${t(`settings.longNumberFormats.${longNumberFormat}`, { ns: 'ui' })}
            </sl-option>`,
        )}
      </sl-select>

      <sl-switch
        ${ref(this._autosaveEnabledSwitchRef)}
        size="medium"
        name="autosaveEnabled"
        ?checked=${this.controller.autosaveEnabled}
        @sl-change=${this.handleChangeAutosaveEnabled}
      >
        <span class="input-label"> ${t('settings.autosaveEnabled', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.autosaveEnabledHint', { ns: 'ui' })} </span>
      </sl-switch>

      <sl-range
        ${ref(this._autosaveIntervalInputRef)}
        min=${constants.AUTOSAVE_INTERVAL_MIN}
        max=${constants.AUTOSAVE_INTERVAL_MAX}
        step=${constants.AUTOSAVE_INTERVAL_STEP}
        name="autosaveInterval"
        value=${this.controller.autosaveInterval}
        @sl-change=${this.handleChangeAutosaveInterval}
      >
        <span class="input-label" slot="label"> ${t('settings.autosaveInterval', { ns: 'ui' })} </span>

        <span slot="help-text"> ${t('settings.autosaveIntervalHint', { ns: 'ui' })} </span>
      </sl-range>
    `;
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

  private handleChangeLanguage = async () => {
    if (!this._languageInputRef.value) {
      return;
    }

    try {
      await this.controller.setLanguage(this._languageInputRef.value.value as Language);
    } catch (e) {
      console.error(e);
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

    if (value < constants.MESSAGE_LOG_SIZE_MIN) {
      value = constants.MESSAGE_LOG_SIZE_MIN;
    }

    if (value > constants.MESSAGE_LOG_SIZE_MAX) {
      value = constants.MESSAGE_LOG_SIZE_MAX;
    }

    this.controller.setMessageLogSize(value);
    this._messageLogSizeInputRef.value.valueAsNumber = value;
  };

  private handleChangeToastDuration = () => {
    if (!this._toastDurationInputRef.value) {
      return;
    }

    this.controller.setToastDuration(this._toastDurationInputRef.value.value);
  };

  private handleChangeUpdateFPS = () => {
    if (!this._updateFPSInputRef.value) {
      return;
    }

    this.controller.setUpdateFPS(this._updateFPSInputRef.value.value);
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

  private handleChangeFastSpeedMultiplier = () => {
    if (!this._fastSpeedMultiplierInputRef.value) {
      return;
    }

    this.controller.setFastSpeedMultiplier(this._fastSpeedMultiplierInputRef.value.value);
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

    this.controller.setMaxUpdatesPerTick(value);
    this._maxUpdatesPerTickInputRef.value.valueAsNumber = value;
  };

  private handleChangeLongNumberFormat = () => {
    if (!this._longNumberFormatInputRef.value) {
      return;
    }

    this.controller.setLongNumberFormat(this._longNumberFormatInputRef.value.value as LongNumberFormat);
  };

  private timeSecondsFormatter = (value: number): string => {
    return this.controller.formatter.formatNumberDecimal(value / 1000);
  };

  private decimalNumberFormatter = (value: number): string => {
    return this.controller.formatter.formatNumberDecimal(value);
  };
}
