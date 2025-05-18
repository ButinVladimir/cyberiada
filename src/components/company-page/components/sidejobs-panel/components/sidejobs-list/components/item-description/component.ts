import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent, Feature, MS_IN_SECOND, RewardParameter, highlightedValuesStyle } from '@shared/index';
import { type ISidejob } from '@state/company-state';
import { COMMON_TEXTS, REWARD_PARAMETER_NAMES, SIDEJOB_TEXTS } from '@texts/index';
import { SidejobsListItemDescriptionController } from './controller';
import { sidejobContext } from '../item/contexts';

@localized()
@customElement('ca-sidejobs-list-item-description')
export class SidejobsListItemDescription extends BaseComponent {
  static styles = [
    highlightedValuesStyle,
    css`
      :host {
        display: block;
        color: var(--ca-hint-color);
        font-size: var(--ca-hint-font-size);
        line-height: var(--ca-hint-line-height);
      }

      p.overview {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-small);
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: SidejobsListItemDescriptionController;

  @queryAll(`span[data-value]`)
  private _rewardValueElements!: NodeListOf<HTMLSpanElement>;

  @consume({ context: sidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  private _rewardValues: Record<RewardParameter, number> = {
    [RewardParameter.money]: 0,
    [RewardParameter.developmentPoints]: 0,
    [RewardParameter.experience]: 0,
    [RewardParameter.districtTierPoints]: 0,
    [RewardParameter.connectivity]: 0,
    [RewardParameter.codeBase]: 0,
    [RewardParameter.computationalBase]: 0,
    [RewardParameter.rewards]: 0,
    [RewardParameter.processCompletionSpeedMultiplier]: 0,
    [RewardParameter.actions]: 0,
  };

  constructor() {
    super();

    this._controller = new SidejobsListItemDescriptionController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    return html`
      <p class="overview">${SIDEJOB_TEXTS[this._sidejob.sidejobName].overview()}</p>

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
    const valueElement = html`<span data-value=${parameter}></span>`;

    return html`<p class="text">${COMMON_TEXTS.parameterSpeedValue(parameterName, valueElement)}</p>`;
  };

  handlePartialUpdate = () => {
    this.updateMoney();
    this.updateDevelopmentPoints();
    this.updateExperience();
    this.updateDistrictTierPoints();
    this.updateConnectivity();
    this.updateCodeBase();
    this.updateComputationalBase();
    this.updateRewards();

    this._rewardValueElements.forEach(this.updateValueElement);
  };

  private updateMoney() {
    const value = this._sidejob!.calculateMoneyDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.money] = value;
  }

  private updateDevelopmentPoints() {
    const value = this._sidejob!.calculateDevelopmentPointsDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.developmentPoints] = value;
  }

  private updateExperience() {
    const value = this._sidejob!.calculateExperienceDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.experience] = value;
  }

  private updateDistrictTierPoints() {
    const value = this._sidejob!.calculateDistrictTierPointsDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.districtTierPoints] = value;
  }

  private updateConnectivity() {
    const value = this._sidejob!.calculateConnectivityDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.connectivity] = value;
  }

  private updateCodeBase() {
    const value = this._sidejob!.calculateCodeBaseDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.codeBase] = value;
  }

  private updateComputationalBase() {
    const value = this._sidejob!.calculateComputationalBaseDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.computationalBase] = value;
  }

  private updateRewards() {
    const value = this._sidejob!.calculateRewardsDelta(MS_IN_SECOND);

    this._rewardValues[RewardParameter.rewards] = value;
  }

  private updateValueElement = (element: HTMLSpanElement) => {
    const parameter = element.dataset.value as RewardParameter;
    const value = this._rewardValues[parameter];

    element.textContent = this._controller.formatter.formatNumberFloat(value);
  };
}
