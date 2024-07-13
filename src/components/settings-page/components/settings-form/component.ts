import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Language, Theme, LANGUAGES, THEMES } from '@shared/constants';
import { ISettingsFormValues } from '@state/settings-state';
import { SettingsFormController } from './controller';
import { SAVING_TIME } from './constants';

@customElement('ca-settings-form')
export class SettingsForm extends LitElement {
  static styles = css`
    form#settings {
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

    sl-button[type='submit'] {
      grid-column: 2;
      justify-self: end;
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

  private _settingsFormController: SettingsFormController;

  @query('form#settings')
  private _form!: HTMLFormElement;

  @state()
  private _isSaving = false;

  constructor() {
    super();

    this._settingsFormController = new SettingsFormController(this);
  }

  render() {
    const content: TemplateResult = this._isSaving
      ? this.renderSpinner()
      : this.renderForm();

    return html` ${content} `;
  }

  private renderForm(): TemplateResult {
    return html`
      <form id="settings" @submit=${this.handleSubmit}>
        <sl-select
          name="language"
          value=${this._settingsFormController.language}
        >
          <span class="select-label" slot="label">
            <intl-message label="ui:settings:language">Language</intl-message>
          </span>

          ${LANGUAGES.map(
            (language) =>
              html` <sl-option value=${language}>
                <intl-message label="ui:settings:languages:${language}">
                  ${language}
                </intl-message>
              </sl-option>`,
          )}
        </sl-select>

        <sl-select name="theme" value=${this._settingsFormController.theme}>
          <span class="select-label" slot="label">
            <intl-message label="ui:settings:theme">Theme</intl-message>
          </span>

          ${THEMES.map(
            (theme) =>
              html` <sl-option value=${theme}>
                <intl-message label="ui:settings:themes:${theme}">
                  ${theme}
                </intl-message>
              </sl-option>`,
          )}
        </sl-select>

        <sl-button variant="primary" type="submit" size="medium">
          <intl-message label="ui:common:save"> Save </intl-message>
        </sl-button>
      </form>
    `;
  }

  private renderSpinner(): TemplateResult {
    return html`
      <div class="spinner-container">
        <sl-spinner></sl-spinner>
      </div>
    `;
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
    await this._settingsFormController.applyFormValues(settingsStateFormValues);
    setTimeout(this.stopSaving, SAVING_TIME);
  };

  private stopSaving = () => {
    this._isSaving = false;
  };
}
