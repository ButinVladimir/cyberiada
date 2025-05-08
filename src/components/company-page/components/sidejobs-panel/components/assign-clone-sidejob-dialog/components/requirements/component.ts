import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { ATTRIBUTE_TEXTS, COMMON_TEXTS, SKILL_TEXTS } from '@texts/index';
import { attributesSkillsTablesStyle, highlightedValuesStyle, subSectionTitleStyle } from '@shared/styles';
import { type ISidejob } from '@state/company-state';
import { Attribute, ATTRIBUTES, BaseController, getHighlightValueClassMap, Skill, SKILLS } from '@shared/index';
import { temporarySidejobContext } from '../../contexts';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-requirements')
export class AssignCloneSidejobDialogRequirements extends BaseComponent {
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
          <div class="attributes-skills-table">${ATTRIBUTES.map(this.renderRequirementAttribute)}</div>
        </div>

        <div>
          <h5 class="title">${COMMON_TEXTS.skills()}</h5>
          <div class="attributes-skills-table">${SKILLS.map(this.renderRequirementSkill)}</div>
        </div>
      </div>
    `;
  }

  private renderRequirementAttribute = (attribute: Attribute) => {
    const availableValue = this._sidejob?.assignedClone?.getTotalAttributeValue(attribute) ?? 0;
    const requiredValue = this._sidejob!.getAttributeRequirement(attribute);

    const formatter = this._controller.formatter;

    const formattedAvailableValue = formatter.formatNumberDecimal(availableValue);
    const formattedRequiredValue = formatter.formatNumberDecimal(requiredValue);

    const valid = availableValue >= requiredValue;

    const classes = getHighlightValueClassMap(valid);

    return html`
      <span>${ATTRIBUTE_TEXTS[attribute]()}</span>
      <span class=${classes}>${formattedAvailableValue} / ${formattedRequiredValue}</span>
    `;
  };

  private renderRequirementSkill = (skill: Skill) => {
    const availableValue = this._sidejob?.assignedClone?.getTotalSkillValue(skill) ?? 0;
    const requiredValue = this._sidejob!.getSkillRequirement(skill);

    const formatter = this._controller.formatter;

    const formattedAvailableValue = formatter.formatNumberDecimal(availableValue);
    const formattedRequiredValue = formatter.formatNumberDecimal(requiredValue);

    const valid = availableValue >= requiredValue;

    const classes = getHighlightValueClassMap(valid);

    return html`
      <span>${SKILL_TEXTS[skill]()}</span>
      <span class=${classes}>${formattedAvailableValue} / ${formattedRequiredValue}</span>
    `;
  };
}
