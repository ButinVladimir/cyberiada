import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement, queryAll } from 'lit/decorators.js';
import {
  BaseComponent,
  diffFormatterParameters,
  Feature,
  getHighlightDifferenceClass,
  MS_IN_SECOND,
  RewardParameter,
  highlightedValuesStyle,
} from '@shared/index';
import { type ISidejob } from '@state/company-state';
import { COMMON_TEXTS, REWARD_PARAMETER_NAMES } from '@texts/index';
import { existingSidejobContext, temporarySidejobContext } from '../../contexts';
import { DISPLAY_TYPES } from './constants';
import { AssignCloneSidejobDialogRewardsController } from './controller';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-rewards')
export class AssignCloneSidejobDialogRewards extends BaseComponent {
  static styles = [
    highlightedValuesStyle,
    css`
      :host {
        display: block;
        color: var(--ca-hint-color);
        font-size: var(--ca-hint-font-size);
        line-height: var(--ca-hint-line-height);
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: AssignCloneSidejobDialogRewardsController;

  @queryAll(`span[data-value][data-type=${DISPLAY_TYPES.VALUE}]`)
  private _rewardValueElements!: NodeListOf<HTMLSpanElement>;

  @queryAll(`span[data-value][data-type=${DISPLAY_TYPES.DIFF}]`)
  private _rewardDiffElements!: NodeListOf<HTMLSpanElement>;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  private _rewardValues: Record<RewardParameter, { value: number; diff: number }> = {
    [RewardParameter.money]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.developmentPoints]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.experience]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.districtTierPoints]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.connectivity]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.codeBase]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.computationalBase]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.rewards]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.processCompletionSpeedMultiplier]: {
      value: 0,
      diff: 0,
    },
    [RewardParameter.actions]: {
      value: 0,
      diff: 0,
    },
  };

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogRewardsController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    return html`
      ${this.renderParameter(RewardParameter.money, true)}
      ${this.renderParameter(RewardParameter.developmentPoints, true)}
      ${this.renderParameter(RewardParameter.experience, true)}
      ${this.renderParameter(RewardParameter.districtTierPoints, true)}
      ${this.renderParameter(RewardParameter.connectivity, this._controller.isFeatureUnlocked(Feature.connectivity))}
      ${this.renderParameter(RewardParameter.codeBase, this._controller.isFeatureUnlocked(Feature.codeBase))}
      ${this.renderParameter(
        RewardParameter.computationalBase,
        this._controller.isFeatureUnlocked(Feature.computationalBase),
      )}
      ${this.renderParameter(RewardParameter.rewards, this._controller.isFeatureUnlocked(Feature.rewards))}
    `;
  }

  private renderParameter = (parameter: RewardParameter, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return nothing;
    }

    const parameterName = REWARD_PARAMETER_NAMES[parameter]();
    const valueElement = html`<span data-value=${parameter} data-type=${DISPLAY_TYPES.VALUE}></span>`;
    const diffElement = html`<span data-value=${parameter} data-type=${DISPLAY_TYPES.DIFF}></span>`;

    return html`<p class="text">${COMMON_TEXTS.parameterSpeedDiff(parameterName, valueElement, diffElement)}</p>`;
  };

  handlePartialUpdate = () => {
    if (!this._sidejob) {
      return;
    }

    this.updateMoney();
    this.updateDevelopmentPoints();
    this.updateExperience();
    this.updateDistrictTierPoints();
    this.updateConnectivity();
    this.updateCodeBase();
    this.updateComputationalBase();
    this.updateRewards();

    this._rewardValueElements.forEach(this.updateValueElement);
    this._rewardDiffElements.forEach(this.updateDiffElement);
  };

  private updateMoney() {
    const newValue = this._sidejob!.calculateMoneyDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateMoneyDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.money].value = newValue;
    this._rewardValues[RewardParameter.money].diff = newValue - oldValue;
  }

  private updateDevelopmentPoints() {
    const newValue = this._sidejob!.calculateDevelopmentPointsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateDevelopmentPointsDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.developmentPoints].value = newValue;
    this._rewardValues[RewardParameter.developmentPoints].diff = newValue - oldValue;
  }

  private updateExperience() {
    const newValue = this._sidejob!.calculateExperienceDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateExperienceDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.experience].value = newValue;
    this._rewardValues[RewardParameter.experience].diff = newValue - oldValue;
  }

  private updateDistrictTierPoints() {
    const newValue = this._sidejob!.calculateDistrictTierPointsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateDistrictTierPointsDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.districtTierPoints].value = newValue;
    this._rewardValues[RewardParameter.districtTierPoints].diff = newValue - oldValue;
  }

  private updateConnectivity() {
    const newValue = this._sidejob!.calculateConnectivityDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateConnectivityDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.connectivity].value = newValue;
    this._rewardValues[RewardParameter.connectivity].diff = newValue - oldValue;
  }

  private updateCodeBase() {
    const newValue = this._sidejob!.calculateCodeBaseDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateCodeBaseDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.codeBase].value = newValue;
    this._rewardValues[RewardParameter.codeBase].diff = newValue - oldValue;
  }

  private updateComputationalBase() {
    const newValue = this._sidejob!.calculateComputationalBaseDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateComputationalBaseDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.computationalBase].value = newValue;
    this._rewardValues[RewardParameter.computationalBase].diff = newValue - oldValue;
  }

  private updateRewards() {
    const newValue = this._sidejob!.calculateRewardsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateRewardsDelta(MS_IN_SECOND) ?? 0;

    this._rewardValues[RewardParameter.rewards].value = newValue;
    this._rewardValues[RewardParameter.rewards].diff = newValue - oldValue;
  }

  private updateValueElement = (element: HTMLSpanElement) => {
    const parameter = element.dataset.value as RewardParameter;
    const value = this._rewardValues[parameter].value;

    element.textContent = this._controller.formatter.formatNumberFloat(value);
  };

  private updateDiffElement = (element: HTMLSpanElement) => {
    const parameter = element.dataset.value as RewardParameter;
    const diff = this._rewardValues[parameter].diff;
    const className = getHighlightDifferenceClass(diff);

    element.textContent = this._controller.formatter.formatNumberFloat(diff, diffFormatterParameters);
    element.className = className;
  };
}
