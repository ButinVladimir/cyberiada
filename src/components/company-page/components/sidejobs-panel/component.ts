import { css, html } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { hintStyle } from '@shared/styles';

@localized()
@customElement('ca-company-sidejobs-panel')
export class CompanySidejobsPanel extends BaseComponent {
  static styles = [
    hintStyle,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      p.hint {
        margin: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.top-container {
        margin-bottom: var(--sl-spacing-large);
      }
    `,
  ];

  @state()
  private _assignCloneDialogOpened = false;

  render() {
    return html`
      <p class="hint">
        ${msg(`Sidejobs provide passive income when assigned clones are not working on primary jobs.`)}
      </p>

      <div class="top-container">
        <sl-button
          class="assign-clone"
          variant="primary"
          size="medium"
          @click=${this.handleAssignCloneSidejobDialogOpen}
        >
          ${msg('Assign clone to sidejob')}
        </sl-button>
      </div>

      <ca-sidejobs-list></ca-sidejobs-list>

      <ca-assign-clone-sidejob-dialog
        ?is-open=${this._assignCloneDialogOpened}
        @assign-clone-sidejob-dialog-close=${this.handleAssignCloneSidejobDialogClose}
      >
      </ca-assign-clone-sidejob-dialog>
    `;
  }

  private handleAssignCloneSidejobDialogOpen = () => {
    this._assignCloneDialogOpened = true;
  };

  private handleAssignCloneSidejobDialogClose = () => {
    this._assignCloneDialogOpened = false;
  };
}
