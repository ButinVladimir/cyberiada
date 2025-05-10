import { css, html, nothing } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized, str } from '@lit/localize';
import { consume } from '@lit/context';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent } from '@shared/base-component';
import { warningStyle } from '@shared/styles';
import { COMMON_TEXTS, DISTRICT_NAMES, SIDEJOB_TEXTS } from '@texts/index';
import { type ISidejob } from '@state/company-state';
import { AssignCloneSidejobDialogButtonsController } from './controller';
import { AssignCloneEvent, CancelEvent } from './events';
import { existingSidejobContext, temporarySidejobContext } from '../../contexts';
import { AssignCloneSidejobDialogWarning } from './types';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-buttons')
export class AssignCloneSidejobDialogButtons extends BaseComponent {
  static styles = [
    warningStyle,
    css`
      p.warning {
        display: none;
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }

      p.warning.visible {
        display: block;
      }

      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: AssignCloneSidejobDialogButtonsController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  @queryAll('p[data-warning]')
  private _warningElements!: NodeListOf<HTMLParagraphElement>;

  private _assignButtonRef = createRef<SlButton>();
  private _warning?: AssignCloneSidejobDialogWarning;

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogButtonsController(this);
  }

  performUpdate() {
    this._warning = this.selectInitialWarning();

    super.performUpdate();
  }

  render() {
    return html`
      ${this.renderWarnings()}

      <div class="buttons">
        <sl-button size="medium" variant="default" outline @click=${this.handleCancel}>
          ${COMMON_TEXTS.close()}
        </sl-button>

        <sl-button
          ${ref(this._assignButtonRef)}
          size="medium"
          variant="primary"
          disabled
          @click=${this.handleAssignClone}
        >
          Assign clone
        </sl-button>
      </div>
    `;
  }

  handlePartialUpdate = () => {
    const warning = this.selectWarning();
    this._warningElements.forEach((warningElement) => {
      if (warningElement.dataset.warning === warning) {
        warningElement.classList.add('visible');
      } else {
        warningElement.classList.remove('visible');
      }
    });

    if (this._assignButtonRef.value) {
      this.updateAssignButton();
    }
  };

  private renderWarnings = () => {
    return html`
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.selectSidejob}>
        ${msg('Select sidejob name and district')}
      </p>
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.selectClone}>${msg('Select clone')}</p>
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.needConnectivity}>
        ${msg('Not enough connectivity')}
      </p>
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.requirementsNotFit}>
        ${msg(`Clone doesn't fit requirements`)}
      </p>
      ${this.renderExistingSidejobWarning()}
    `;
  };

  private renderExistingSidejobWarning = () => {
    if (!this._existingSidejob) {
      return nothing;
    }

    const sidejobName = SIDEJOB_TEXTS[this._existingSidejob.sidejobName].title();
    const districtName = DISTRICT_NAMES[this._existingSidejob.district.name]();

    return html` <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.cloneAlreadyAssigned}>
      ${msg(str`Clone has already assigned sidejob "${sidejobName}" in district "${districtName}"`)}
    </p>`;
  };

  private selectInitialWarning(): AssignCloneSidejobDialogWarning | undefined {
    if (!this._sidejob) {
      return AssignCloneSidejobDialogWarning.selectSidejob;
    }

    if (!this._sidejob.assignedClone) {
      return AssignCloneSidejobDialogWarning.selectClone;
    }

    if (!this._sidejob.checkRequirements()) {
      return AssignCloneSidejobDialogWarning.requirementsNotFit;
    }

    if (this._existingSidejob) {
      return AssignCloneSidejobDialogWarning.cloneAlreadyAssigned;
    }

    return undefined;
  }

  private selectWarning(): AssignCloneSidejobDialogWarning | undefined {
    if (!this._sidejob) {
      return AssignCloneSidejobDialogWarning.selectSidejob;
    }

    const totalConnectivity = this._controller.getTotalConnectivity(this._sidejob.district.index);
    const requiredConnectivity = this._controller.getRequiredConnectivity(this._sidejob.sidejobName);

    if (totalConnectivity < requiredConnectivity) {
      return AssignCloneSidejobDialogWarning.needConnectivity;
    }

    return this._warning;
  }

  private updateAssignButton(): void {
    const totalConnectivity = this._sidejob ? this._controller.getTotalConnectivity(this._sidejob.district.index) : 0;
    const requiredConnectivity = this._sidejob
      ? this._controller.getRequiredConnectivity(this._sidejob.sidejobName)
      : 0;

    const purchaseButtonDisabled = !(
      this._sidejob &&
      this._sidejob.assignedClone &&
      this._sidejob.checkRequirements() &&
      totalConnectivity >= requiredConnectivity
    );

    this._assignButtonRef.value!.disabled = purchaseButtonDisabled;
  }

  private handleCancel = () => {
    this.dispatchEvent(new CancelEvent());
  };

  private handleAssignClone = () => {
    this.dispatchEvent(new AssignCloneEvent());
  };
}
