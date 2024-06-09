import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Language, Theme, languages, themes } from '@shared/constants';
import { SettingsPageController } from './controller';
import { ISettingsFormValues } from '@state/settings-state';

@customElement('ca-settings-page')
export class SettingsPage extends LitElement {
  static styles = css`
    div.form-container {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }
    
    div.form-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--sl-spacing-3x-large);
      margin-bottom: var(--sl-spacing-large);
    }

    div.form-element {
      flex: 1 1 auto;
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  `;

  private _settingsPageController: SettingsPageController;

  constructor() {
    super();

    this._settingsPageController = new SettingsPageController(this);
  }

  render() {
    return html`
      <h3 class="title">
        <intl-message label="ui:settings:settings">Settings</intl-message>
      </h3>

      <form id="settings" @submit=${this.handleSubmit}>
        <div class="form-container">
          <div class="form-row">
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
          </div>
        </div>

        <div class="button-container">
          <sl-button variant="primary" type="submit" size="large">
            <intl-message label="ui:common:save">
              Save
            </intl-message>
          </sl-button>
        </div>
      </form>
    `;
  }

  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const settingsStateFormValues: ISettingsFormValues = {
      language: formData.get('language') as Language,
      theme: formData.get('theme') as Theme,
    };

    this._settingsPageController.applyFormValues(settingsStateFormValues);
  }
}
