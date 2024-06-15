import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Language, Theme, languages, themes } from '@shared/constants';
import { ISettingsFormValues } from '@state/settings-state';
import { SettingsPageController } from './controller';
import { SAVING_TIME } from './constants';

@customElement('ca-settings-page')
export class SettingsPage extends LitElement {
  static styles = css`
    div.form-container {
      width: 100%;
      max-width: 70rem;
      display: grid;
      column-gap: var(--sl-spacing-3x-large);
      row-gap: var(--sl-spacing-large);
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
    }
   
    span.select-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    div.button-container {
      grid-column: 2;
      text-align: right;
    }

    div.spinner-container {
      width: 100%;
      max-width: 70rem;
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

  private _settingsPageController: SettingsPageController;

  @query('form#settings')
  private _form!: HTMLFormElement;

  @state()
  private _isSaving = false;

  constructor() {
    super();

    this._settingsPageController = new SettingsPageController(this);
  }

  render() {
    const content: TemplateResult = this._isSaving
      ? this.renderSpinner()
      : this.renderForm();

    return html`
      <h3 class="title">
        <intl-message label="ui:settings:settings">Settings</intl-message>
      </h3>

      ${content}
    `;
  }

  private renderForm(): TemplateResult {
    return html`
      <form id="settings" @submit=${this.handleSubmit}>
        <div class="form-container">
          <div class="form-element">
            <sl-select name="language" value=${this._settingsPageController.language}>
              <span class="select-label" slot="label">
                <intl-message label="ui:settings:language">Language</intl-message>
              </span>

              ${languages.map((language) => html`
                <sl-option value=${language}>
                  <intl-message label="ui:settings:languages:${language}">
                    ${language}
                  </intl-message>
                </sl-option>`)
              }
            </sl-select>
          </div>

          <div class="form-element">
            <sl-select name="theme" value=${this._settingsPageController.theme}>
              <span class="select-label" slot="label">
                <intl-message label="ui:settings:theme">Theme</intl-message>
              </span>

              ${themes.map((theme) => html`
                <sl-option value=${theme}>
                  <intl-message label="ui:settings:themes:${theme}">
                    ${theme}
                  </intl-message>
                </sl-option>`)
              }
            </sl-select>
          </div>

          <div class="button-container">
            <sl-button variant="primary" type="submit" size="large">
              <intl-message label="ui:common:save">
                Save
              </intl-message>
            </sl-button>
          </div>
        </div>
      </form>
    `;
  }

  private renderSpinner(): TemplateResult {
    return html`
      <div class="spinner-container">
        <sl-spinner></sl-spinner>
      </div>
    `
  }

  private handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(this._form);

    const settingsStateFormValues: ISettingsFormValues = {
      language: formData.get('language') as Language,
      theme: formData.get('theme') as Theme,
    };

    this._isSaving = true;
    await this._settingsPageController.applyFormValues(settingsStateFormValues);
    setTimeout(this.stopSaving, SAVING_TIME);
  }

  private stopSaving = () => {
    this._isSaving = false;
  }
}
