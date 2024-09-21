import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ca-mainframe-developing-programs-panel')
export class MainframeDevelopingProgramsPanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    ca-developing-programs-list {
      margin-top: var(--sl-spacing-large);
    }
  `;

  @state()
  private _isStartProgramDevelopmentDialogOpen = false;

  render() {
    return html`
      <p class="hint">
        <intl-message label="ui:mainframe:developingPrograms:developingProgramsHint">
          Program development hint.
        </intl-message>
      </p>

      <sl-button variant="primary" size="medium" @click=${this.handleStartProgramDevelopmentDialogOpen}>
        <intl-message label="ui:mainframe:developingPrograms:startProgramDevelopment">
          Start program development
        </intl-message>
      </sl-button>

      <ca-start-program-development-dialog
        ?is-open=${this._isStartProgramDevelopmentDialogOpen}
        @start-program-development-dialog-close=${this.handleStartProgramDevelopmentDialogClose}
      >
      </ca-start-program-development-dialog>

      <ca-developing-programs-list></ca-developing-programs-list>
    `;
  }

  private handleStartProgramDevelopmentDialogOpen = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isStartProgramDevelopmentDialogOpen = true;
  };

  private handleStartProgramDevelopmentDialogClose = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    this._isStartProgramDevelopmentDialogOpen = false;
  };
}
