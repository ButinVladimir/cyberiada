import { css } from 'lit';
import { attributesSkillsTablesStyle, highlightedValuesStyle, subSectionTitleStyle } from '@shared/index';

const styles = [
  subSectionTitleStyle,
  attributesSkillsTablesStyle,
  highlightedValuesStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    p.overview {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
    }

    p.text {
      margin: 0;
    }

    .attributes-skills-tables {
      margin-top: var(--sl-spacing-medium);
    }
  `,
];

export default styles;
