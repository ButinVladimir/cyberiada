import { html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { consume } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ATTRIBUTE_TEXTS, COMMON_TEXTS, SKILL_TEXTS } from '@texts/index';
import { type ISidejob } from '@state/company-state';
import {
  BaseComponent,
  Attribute,
  ATTRIBUTES,
  BaseController,
  getHighlightValueClassMap,
  Skill,
  SKILLS,
} from '@shared/index';
import { temporarySidejobContext } from '../../contexts';
import styles from './styles';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-requirements')
export class AssignCloneSidejobDialogRequirements extends BaseComponent {
  static styles = styles;

  hasMobileRender = true;

  private _controller: BaseController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  constructor() {
    super();

    this._controller = new BaseController(this);
  }

  protected renderDesktop() {
    return this.renderContent(true);
  }

  protected renderMobile() {
    return this.renderContent(false);
  }

  private renderContent(desktop: boolean) {
    if (!this._sidejob) {
      return nothing;
    }

    const attributesSkillsTablesClasses = classMap({
      'attributes-skills-tables': true,
      desktop: desktop,
      mobile: !desktop,
    });

    return html`
      <div class=${attributesSkillsTablesClasses}>
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
      <div>${ATTRIBUTE_TEXTS[attribute]()}</div>
      <div class=${classes}>${formattedAvailableValue} / ${formattedRequiredValue}</div>
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
      <div>${SKILL_TEXTS[skill]()}</div>
      <div class=${classes}>${formattedAvailableValue} / ${formattedRequiredValue}</div>
    `;
  };
}
