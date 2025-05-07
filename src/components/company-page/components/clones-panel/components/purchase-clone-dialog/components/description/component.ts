import { css, html, nothing } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { BaseComponent } from '@shared/base-component';
import { type IClone } from '@state/company-state/states/clone-factory/interfaces/clone';
import { ATTRIBUTE_TEXTS, CLONE_TEMPLATE_TEXTS, COMMON_TEXTS, SKILL_TEXTS } from '@texts/index';
import { ATTRIBUTES, SKILLS } from '@shared/constants';
import { Attribute, Skill } from '@shared/types';
import { attributesSkillsTablesStyle, highlightedValuesStyle, subSectionTitleStyle } from '@shared/styles';
import { PurchaseCloneDialogDescriptionTextController } from './controller';
import { temporaryCloneContext } from '../../contexts';
import { highlightValue } from '@/shared';

@localized()
@customElement('ca-purchase-clone-dialog-description')
export class PurchaseCloneDialogDescription extends BaseComponent {
  static styles = [
    subSectionTitleStyle,
    attributesSkillsTablesStyle,
    highlightedValuesStyle,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: var(--sl-spacing-medium);
      }

      p.text {
        margin: 0;
      }
    `,
  ];

  @consume({ context: temporaryCloneContext, subscribe: true })
  private _clone?: IClone;

  private _controller: PurchaseCloneDialogDescriptionTextController;

  constructor() {
    super();

    this._controller = new PurchaseCloneDialogDescriptionTextController(this);
  }

  render() {
    if (!this._clone) {
      return nothing;
    }

    return html`
      <p class="text">${CLONE_TEMPLATE_TEXTS[this._clone.templateName].overview()}</p>

      ${this.renderSynchronization()} ${this.renderParameters()}
    `;
  }

  private renderSynchronization = () => {
    const formatter = this._controller.formatter;

    const synchronization = this._controller.getCloneSynchronization(this._clone!.templateName, this._clone!.quality);
    const availableSynchronization = this._controller.availableSynchronization;

    const formattedCloneSynchronization = formatter.formatNumberDecimal(synchronization);
    const formattedAvailableSynchronization = formatter.formatNumberDecimal(availableSynchronization);

    const valid = synchronization <= availableSynchronization;

    const synchronizationClasses = highlightValue(valid);
    const synchronizationValue = html`<span class=${synchronizationClasses}
      >${formattedCloneSynchronization} / ${formattedAvailableSynchronization}</span
    >`;

    return html`<p class="text">${msg(html`Synchronization: ${synchronizationValue}`)}</p>`;
  };

  private renderParameters = () => {
    return html`
      <div class="attributes-skills-tables">
        <div>
          <h5 class="title">${COMMON_TEXTS.attributes()}</h5>
          <div class="attributes-skills-table">${ATTRIBUTES.map(this.renderAttribute)}</div>
        </div>

        <div>
          <h5 class="title">${COMMON_TEXTS.skills()}</h5>
          <div class="attributes-skills-table">${SKILLS.map(this.renderSkill)}</div>
        </div>
      </div>
    `;
  };

  private renderAttribute = (attribute: Attribute) => {
    const value = this._clone!.getTotalAttributeValue(attribute);
    const formattedValue = this._controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${ATTRIBUTE_TEXTS[attribute]()}</div>
      <div>${formattedValue}</div>
    `;
  };

  private renderSkill = (skill: Skill) => {
    const value = this._clone!.getTotalSkillValue(skill);
    const formattedValue = this._controller.formatter.formatNumberDecimal(value);

    return html`
      <div>${SKILL_TEXTS[skill]()}</div>
      <div>${formattedValue}</div>
    `;
  };
}
