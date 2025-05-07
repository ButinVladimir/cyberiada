import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement, queryAll } from 'lit/decorators.js';
import { BaseComponent, diffFormatterParameters, Feature, MS_IN_SECOND } from '@shared/index';
import { type ISidejob } from '@state/company-state';
import { highlightedValuesStyle } from '@shared/index';
import { existingSidejobContext, temporarySidejobContext } from '../../contexts';
import { PARAGRAPH_VALUES, PARAMETER_NAMES } from './constants';
import { RewardParameters } from './types';
import { AssignCloneSidejobDialogRewardsController } from './controller';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-rewards')
export class AssignCloneSidejobDialogRewards extends BaseComponent {
  static styles = [
    highlightedValuesStyle,
    css`
      :host {
        display: block;
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  hasPartialUpdate = true;

  private _controller: AssignCloneSidejobDialogRewardsController;

  @queryAll('p[data-name]')
  private _paragraphs!: NodeListOf<HTMLParagraphElement>;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  constructor() {
    super();

    this._controller = new AssignCloneSidejobDialogRewardsController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    return html`
      ${this.renderParameter(RewardParameters.money)} ${this.renderParameter(RewardParameters.developmentPoints)}
      ${this.renderParameter(RewardParameters.experience)} ${this.renderParameter(RewardParameters.districtTierPoints)}
      ${this._controller.isFeatureUnlocked(Feature.connectivity)
        ? this.renderParameter(RewardParameters.connectivity)
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.codeBase)
        ? this.renderParameter(RewardParameters.codeBase)
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.computationalBase)
        ? this.renderParameter(RewardParameters.computationalBase)
        : nothing}
      ${this._controller.isFeatureUnlocked(Feature.rewards) ? this.renderParameter(RewardParameters.rewards) : nothing}
    `;
  }

  private renderParameter = (parameter: RewardParameters) => {
    const parameterName = PARAMETER_NAMES[parameter]();
    const valueElement = html`<span data-value=${PARAGRAPH_VALUES.VALUE}></span>`;
    const diffElement = html`<span data-value=${PARAGRAPH_VALUES.DIFF}></span>`;

    return html`<p class="text" data-name=${parameter}>
      ${msg(html`${parameterName}: ${valueElement} (${diffElement}) per second`)}
    </p>`;
  };

  handlePartialUpdate = () => {
    this._paragraphs.forEach((paragraph) => {
      const parameter = paragraph.dataset.name;

      switch (parameter) {
        case RewardParameters.money:
          this.updateMoney(paragraph);
          break;
        case RewardParameters.developmentPoints:
          this.updateDevelopmentPoints(paragraph);
          break;
        case RewardParameters.experience:
          this.updateExperience(paragraph);
          break;
        case RewardParameters.districtTierPoints:
          this.updateDistrictTierPoints(paragraph);
          break;
        case RewardParameters.connectivity:
          this.updateConnectivity(paragraph);
          break;
        case RewardParameters.codeBase:
          this.updateCodeBase(paragraph);
          break;
        case RewardParameters.computationalBase:
          this.updateComputationalBase(paragraph);
          break;
        case RewardParameters.rewards:
          this.updateRewards(paragraph);
          break;
      }
    });
  };

  private updateMoney(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateMoneyDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateMoneyDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateDevelopmentPoints(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateDevelopmentPointsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateDevelopmentPointsDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateExperience(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateExperienceDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateExperienceDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateDistrictTierPoints(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateDistrictTierPointsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateDistrictTierPointsDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateConnectivity(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateConnectivityDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateConnectivityDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateCodeBase(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateCodeBaseDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateCodeBaseDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateComputationalBase(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateComputationalBaseDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateComputationalBaseDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateRewards(paragraph: HTMLParagraphElement) {
    const newValue = this._sidejob!.calculateRewardsDelta(MS_IN_SECOND);
    const oldValue = this._existingSidejob?.calculateRewardsDelta(MS_IN_SECOND) ?? 0;

    this.updateValue(newValue, oldValue, paragraph);
  }

  private updateValue(newValue: number, oldValue: number, paragraph: HTMLParagraphElement) {
    const valueElement = paragraph.querySelector(`span[data-value=${PARAGRAPH_VALUES.VALUE}]`)!;
    const diffElement = paragraph.querySelector(`span[data-value=${PARAGRAPH_VALUES.DIFF}]`)!;

    const diff = newValue - oldValue;

    const formatter = this._controller.formatter;

    const formattedValue = formatter.formatNumberFloat(newValue);
    const formattedDiff = formatter.formatNumberFloat(diff, diffFormatterParameters);

    const classes = AssignCloneSidejobDialogRewards.highlightDifference(diff);

    valueElement.textContent = formattedValue;
    diffElement.className = classes;
    diffElement.textContent = formattedDiff;
  }

  private static highlightDifference(difference: number) {
    if (difference > 0) {
      return 'success';
    }

    if (difference < 0) {
      return 'danger';
    }

    return '';
  }
}
