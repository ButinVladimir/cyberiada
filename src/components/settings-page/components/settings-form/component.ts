import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import { LANGUAGES, THEMES } from '@shared/constants';
import { Language, Theme } from '@shared/types';
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
      margin-bottom: var(--sl-spacing-large);
    }

    span.select-label {
      font-size: var(--sl-font-size-small);
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
  private _languageInput!: SlSelect;

  @query('sl-select[name="theme"]')
  private _themeInput!: SlSelect;

  @state()
  private _isSaving = false;

  constructor() {
    super();

    this._settingsFormController = new SettingsFormController(this);
  }

  render() {
    const content = this._isSaving ? this.renderSpinner() : this.renderForm();

    return html` ${content} `;
  }

  private renderForm(): TemplateResult {
    return html`
      <sl-select name="language" value=${this._settingsFormController.language} @sl-change=${this.handleUpdateLanguage}>
        <span class="select-label" slot="label">
          <intl-message label="ui:settings:language">Language</intl-message>
        </span>

        ${LANGUAGES.map(
          (language) =>
            html` <sl-option value=${language}>
              <intl-message label="ui:settings:languages:${language}"> ${language} </intl-message>
            </sl-option>`,
        )}
      </sl-select>

      <sl-select name="theme" value=${this._settingsFormController.theme} @sl-change=${this.handleUpdateTheme}>
        <span class="select-label" slot="label">
          <intl-message label="ui:settings:theme">Theme</intl-message>
        </span>

        ${THEMES.map(
          (theme) =>
            html` <sl-option value=${theme}>
              <intl-message label="ui:settings:themes:${theme}"> ${theme} </intl-message>
            </sl-option>`,
        )}
      </sl-select>
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

  private handleUpdateLanguage = async () => {
    this.startSaving();

    try {
      await this._settingsFormController.setLanguage(this._languageInput.value as Language);
    } catch (e) {
      console.error(e);
    } finally {
      this.stopSaving();
    }
  };

  private handleUpdateTheme = () => {
    this._settingsFormController.setTheme(this._themeInput.value as Theme);
  };
}
