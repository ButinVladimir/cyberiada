import { css, html, nothing } from 'lit';
import { localized, msg } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ATTRIBUTE_TEXTS, COMMON_TEXTS, SKILL_TEXTS } from '@texts/index';
import { attributesSkillsTablesStyle, highlightedValuesStyle, subSectionTitleStyle } from '@shared/styles';
import { type ISidejob } from '@state/company-state';
import {
  Attribute,
  ATTRIBUTES,
  BaseController,
  diffFormatterParameters,
  getHighlightDifferenceClassMap,
  Skill,
  SKILLS,
} from '@shared/index';
import { existingSidejobContext, temporarySidejobContext } from '../../contexts';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-rewards-multipliers')
export class AssignCloneSidejobDialogRewardsMultipliers extends BaseComponent {
  static styles = [
    subSectionTitleStyle,
    attributesSkillsTablesStyle,
    highlightedValuesStyle,
    css`
      :host {
        display: block;
      }
    `,
  ];

  private _controller: BaseController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  @consume({ context: existingSidejobContext, subscribe: true })
  private _existingSidejob?: ISidejob;

  constructor() {
    super();

    this._controller = new BaseController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }

    return html`
      <div class="attributes-skills-tables">
        <div>
          <h5 class="title">${COMMON_TEXTS.attributes()}</h5>
          <div class="attributes-skills-table">${ATTRIBUTES.map(this.renderRewardsMultplierAttribute)}</div>
        </div>

        <div>
          <h5 class="title">${COMMON_TEXTS.skills()}</h5>
          <div class="attributes-skills-table">${SKILLS.map(this.renderRewardsMultplierSkill)}</div>
        </div>
      </div>
    `;
  }

  private renderRewardsMultplierAttribute = (attribute: Attribute) => {
    const value = this._sidejob!.getAttributeModifier(attribute);
    const existingValue = this._existingSidejob?.getAttributeModifier(attribute) ?? 1;
    const diff = value - existingValue;

    const formatter = this._controller.formatter;

    const formattedValue = formatter.formatNumberFloat(value);
    const formattedDiff = formatter.formatNumberFloat(diff, diffFormatterParameters);

    const classes = getHighlightDifferenceClassMap(diff);
    const diffElement = html`<span class=${classes}>${formattedDiff}</span>`;

    return html`
      <span>${ATTRIBUTE_TEXTS[attribute]()}</span>
      <span>${msg(html`× ${formattedValue} (${diffElement})`)}</span>
    `;
  };

  private renderRewardsMultplierSkill = (skill: Skill) => {
    const value = this._sidejob!.getSkillModifier(skill);
    const existingValue = this._existingSidejob?.getSkillModifier(skill) ?? 1;
    const diff = value - existingValue;

    const formatter = this._controller.formatter;

    const formattedValue = formatter.formatNumberFloat(value);
    const formattedDiff = formatter.formatNumberFloat(diff, diffFormatterParameters);

    const classes = getHighlightDifferenceClassMap(diff);
    const diffElement = html`<span class=${classes}>${formattedDiff}</span>`;

    return html`
      <span>${SKILL_TEXTS[skill]()}</span>
      <span>${msg(html`× ${formattedValue} (${diffElement})`)}</span>
    `;
  };
}
