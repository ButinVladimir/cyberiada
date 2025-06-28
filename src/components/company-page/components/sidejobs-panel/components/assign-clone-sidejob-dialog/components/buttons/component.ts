import { html, nothing } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { msg, localized, str } from '@lit/localize';
import { consume } from '@lit/context';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import { BaseComponent, dialogButtonsStyle, warningStyle } from '@shared/index';
import { COMMON_TEXTS, DISTRICT_NAMES, SIDEJOB_TEXTS } from '@texts/index';
import { type ISidejob } from '@state/company-state';
import { AssignCloneSidejobDialogButtonsController } from './controller';
import { AssignCloneEvent, CancelEvent } from './events';
import { existingSidejobContext, temporarySidejobContext } from '../../contexts';
import { AssignCloneSidejobDialogWarning } from './types';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-buttons')
export class AssignCloneSidejobDialogButtons extends BaseComponent {
  static styles = [warningStyle, dialogButtonsStyle];

  hasPartialUpdate = true;

  private _controller: AssignCloneSidejobDialogButtonsController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  @queryAll('p[data-warning]')
  private _warningElements!: NodeListOf<HTMLParagraphElement>;

  private _assignButtonRef = createRef<SlButton>();

  private _availableTimeRef = createRef<HTMLSpanElement>();

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogButtonsController(this);
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
          ${msg('Assign clone')}
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

    this.updateAvailabilityTimer();

    if (this._assignButtonRef.value) {
      this.updateAssignButton();
    }
  };

  private renderWarnings = () => {
    return html`
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.needConnectivity}>
        ${msg('Not enough connectivity')}
      </p>
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.willBeAvailableIn}>
        ${COMMON_TEXTS.willBeAvailableIn(html`<span ${ref(this._availableTimeRef)}></span>`)}
      </p>
      <p class="warning" data-warning=${AssignCloneSidejobDialogWarning.other}>${this.renderOtherWarnings()}</p>
    `;
  };

  private renderOtherWarnings = () => {
    if (!this._sidejob) {
      return msg('Select sidejob name and district');
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

    return nothing;
  };

  private selectWarning(): AssignCloneSidejobDialogWarning | undefined {
    if (!this._sidejob) {
      return AssignCloneSidejobDialogWarning.other;
    }

    const totalConnectivity = this._controller.getTotalConnectivity(this._sidejob.district.index);
    const requiredConnectivity = this._controller.getRequiredConnectivity(this._sidejob.sidejobName);
    const connectivityDiff = requiredConnectivity - totalConnectivity;
    const connectivityGrowth = this._controller.getConnectivityGrowth(this._sidejob.district.index);

    if (connectivityDiff > 0) {
      if (connectivityGrowth > 0) {
        return AssignCloneSidejobDialogWarning.willBeAvailableIn;
      }

      return AssignCloneSidejobDialogWarning.needConnectivity;
    }

    return AssignCloneSidejobDialogWarning.other;
  }

  private updateAvailabilityTimer(): void {
    if (!this._sidejob) {
      return;
    }

    if (!this._availableTimeRef.value) {
      return;
    }

    const currentPoints = this._controller.getTotalConnectivity(this._sidejob.district.index);
    const requiredPoints = this._controller.getRequiredConnectivity(this._sidejob.sidejobName);
    const connectivityGrowth = this._controller.getConnectivityGrowth(this._sidejob.district.index);
    const pointsDiff = requiredPoints - currentPoints;

    if (pointsDiff < 0 || connectivityGrowth < 0) {
      this._availableTimeRef.value.textContent = '';
    } else {
      const formattedTime = this._controller.formatter.formatTimeLong(pointsDiff / connectivityGrowth);
      this._availableTimeRef.value.textContent = formattedTime;
    }
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
