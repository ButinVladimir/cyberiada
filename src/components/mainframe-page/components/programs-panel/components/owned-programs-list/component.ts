import { t } from 'i18next';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { OwnedProgramsListController } from './controller';

@customElement('ca-owned-programs-list')
export class OwnedProgramsList extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: var(--sl-font-weight-bold);
    }

    th.program {
      width: 40%;
    }

    th.level {
      width: 25%;
    }

    th.quality {
      width: 25%;
    }

    th.autoupgrade {
      width: auto;
      text-align: right;
      font-size: var(--sl-font-size-large);
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.notification td {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }

    tbody ca-owned-programs-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }
  `;

  private _ownedProgramsListController: OwnedProgramsListController;

  constructor() {
    super();

    this._ownedProgramsListController = new OwnedProgramsListController(this);
  }

  render() {
    const autoupgradeActive = this.checkSomeProgramsAutoupgradeActive();

    const autoupgradeIcon = autoupgradeActive ? 'arrow-up-circle-fill' : 'arrow-up-circle';

    return html`
      <table>
        <thead>
          <th class="program">
            <intl-message label="ui:mainframe:program">Program</intl-message>
          </th>
          <th class="level">
            <intl-message label="ui:mainframe:level">Level</intl-message>
          </th>
          <th class="quality">
            <intl-message label="ui:mainframe:quality">Quality</intl-message>
          </th>
          <th class="autoupgrade">
            <sl-tooltip>
              <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgradeAll">
                Toggle autoupgrade
              </intl-message>

              <sl-icon-button
                id="toggle-autoupgrade-btn"
                name=${autoupgradeIcon}
                label=${t('mainframe.programs.toggleAutoupgradeAll', { ns: 'ui' })}
                @click=${this.handleToggleAutoupgrade}
              >
              </sl-icon-button>
            </sl-tooltip>
          </th>
        </thead>

        <tbody>
          ${this.renderContent()}
        </tbody>
      </table>
    `;
  }

  private renderContent = () => {
    const ownedPrograms = this._ownedProgramsListController.listOwnedPrograms();

    if (ownedPrograms.length === 0) {
      return this.renderEmptyListNotification();
    }

    return repeat(ownedPrograms, (program) => program.name, this.renderListItem);
  };

  private renderEmptyListNotification = () => {
    return html`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:programs:emptyListNotification"> You don't have any programs </intl-message>
        </td>
      </tr>
    `;
  };

  private renderListItem = (program: IProgram) => {
    return html` <ca-owned-programs-list-item program-name=${program.name}> </ca-owned-programs-list-item> `;
  };

  private checkSomeProgramsAutoupgradeActive(): boolean {
    const programs = this._ownedProgramsListController.listOwnedPrograms();

    return programs.some((program) => program.autoUpgradeEnabled);
  }

  private handleToggleAutoupgrade = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const active = this.checkSomeProgramsAutoupgradeActive();

    this._ownedProgramsListController.toggleAutoupgrade(!active);
  };
}
