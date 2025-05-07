import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { choose } from 'lit/directives/choose.js';
import SlRadioGroup from '@shoelace-style/shoelace/dist/components/radio-group/radio-group.component.js';
import { BaseComponent, highlightValue } from '@shared/index';
import { SIDEJOB_TEXTS } from '@texts/index';
import { type ISidejob } from '@state/company-state';
import { highlightedValuesStyle } from '@shared/index';
import { temporarySidejobContext } from '../../contexts';
import { AssignCloneSidejobDialogDescriptionMode } from './types';
import { DESCRIPTION_MODE_TEXTS, DESCRIPTION_MODES } from './constants';
import { AssignCloneSidejobDialogDescriptionController } from './controller';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-description')
export class AssignCloneSidejobDialogDescription extends BaseComponent {
  static styles = [
    highlightedValuesStyle,
    css`
      :host {
        display: flex;
        align-items: stretch;
        gap: var(--sl-spacing-medium);
        flex-direction: column;
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  private _controller: AssignCloneSidejobDialogDescriptionController;

  private _descriptionModelInputRef = createRef<SlRadioGroup>();

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @state()
  private _desciptionMode: AssignCloneSidejobDialogDescriptionMode =
    AssignCloneSidejobDialogDescriptionMode.requirements;

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogDescriptionController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    return html`
      <p class="text">${SIDEJOB_TEXTS[this._sidejob.sidejobName].overview()}</p>

      ${this.renderConnectivity()}

      <sl-radio-group
        ${ref(this._descriptionModelInputRef)}
        name="desciption-mode"
        size="small"
        value=${this._desciptionMode}
        @sl-change=${this.handleDescriptionModeChange}
      >
        ${this.renderDescriptionModes()}
      </sl-radio-group>

      ${choose(this._desciptionMode, [
        [AssignCloneSidejobDialogDescriptionMode.requirements, this.renderRequirements],
        [AssignCloneSidejobDialogDescriptionMode.rewardsMultipliers, this.renderRewardMultipliers],
        [AssignCloneSidejobDialogDescriptionMode.rewards, this.renderRewards],
      ])}
    `;
  }

  private renderConnectivity = () => {
    const formatter = this._controller.formatter;

    const totalConnectivity = this._controller.getTotalConnectivity(this._sidejob!.district.index);
    const requiredConnectivity = this._controller.getRequiredConnectivity(this._sidejob!.sidejobName);

    const formattedTotalConnectivity = formatter.formatNumberFloat(totalConnectivity);
    const formattedRequiredConnectivity = formatter.formatNumberFloat(requiredConnectivity);

    const valid = totalConnectivity >= requiredConnectivity;
    const connectivityClasses = highlightValue(valid);

    const connectivityValue = html`<span class=${connectivityClasses}
      >${formattedTotalConnectivity} / ${formattedRequiredConnectivity}</span
    >`;

    return html` <p class="text">${msg(html`Connectivity: ${connectivityValue}`)}</p> `;
  };

  private handleDescriptionModeChange = () => {
    if (!this._descriptionModelInputRef.value) {
      return;
    }

    this._desciptionMode = this._descriptionModelInputRef.value.value as AssignCloneSidejobDialogDescriptionMode;
  };

  private renderDescriptionModes = () => {
    return DESCRIPTION_MODES.map(
      (descriptionMode) =>
        html`<sl-radio-button value=${descriptionMode}>${DESCRIPTION_MODE_TEXTS[descriptionMode]()}</sl-radio-button>`,
    );
  };

  private renderRequirements = () => {
    return html` <ca-assign-clone-sidejob-dialog-requirements> </ca-assign-clone-sidejob-dialog-requirements> `;
  };

  private renderRewardMultipliers = () => {
    return html`
      <ca-assign-clone-sidejob-dialog-rewards-multipliers> </ca-assign-clone-sidejob-dialog-rewards-multipliers>
    `;
  };

  private renderRewards = () => {
    return html` <ca-assign-clone-sidejob-dialog-rewards> </ca-assign-clone-sidejob-dialog-rewards> `;
  };
}
