import { css, html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
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

@localized()
@customElement('ca-assign-clone-sidejob-dialog-buttons')
export class AssignCloneSidejobDialogButtons extends BaseComponent<AssignCloneSidejobDialogButtonsController> {
  static styles = [
    warningStyle,
    css`
      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }

      div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  protected controller: AssignCloneSidejobDialogButtonsController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  private _warningRef = createRef<HTMLParagraphElement>();
  private _assignButtonRef = createRef<SlButton>();

  constructor() {
    super();

    this.controller = new AssignCloneSidejobDialogButtonsController(this, this.handlePartialUpdate);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.handlePartialUpdate();
  }

  render() {
    return html`
      <p ${ref(this._warningRef)} class="warning"></p>

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

  private handlePartialUpdate = () => {
    if (this._warningRef.value) {
      this._warningRef.value.textContent = this.getWarning();
    }

    if (this._assignButtonRef.value) {
      this.updateAssignButton();
    }
  };

  private getWarning(): string {
    if (!this._sidejob) {
      return msg('Select sidejob name and district');
    }

    const totalConnectivity = this.controller.getTotalConnectivity(this._sidejob.district.index);
    const requiredConnectivity = this.controller.getRequiredConnectivity(this._sidejob.sidejobName);
    if (totalConnectivity < requiredConnectivity) {
      return msg('Not enough connectivity');
    }

    if (!this._sidejob.assignedClone) {
      return msg('Select clone');
    }

    if (!this._sidejob.checkRequirements()) {
      return msg(`Clone doesn't fit requirements`);
    }

    if (this._existingSidejob) {
      const sidejobName = SIDEJOB_TEXTS[this._existingSidejob.sidejobName].title();
      const districtName = DISTRICT_NAMES[this._existingSidejob.district.name]();

      return msg(str`Clone has already assigned sidejob "${sidejobName}" in district "${districtName}"`);
    }

    return '';
  }

  private updateAssignButton(): void {
    const totalConnectivity = this._sidejob ? this.controller.getTotalConnectivity(this._sidejob.district.index) : 0;
    const requiredConnectivity = this._sidejob ? this.controller.getRequiredConnectivity(this._sidejob.sidejobName) : 0;

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
