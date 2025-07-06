import { css } from 'lit';
import { attributesSkillsTablesStyle, subSectionTitleStyle } from '@shared/index';

const styles = [
  subSectionTitleStyle,
  attributesSkillsTablesStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    h5.title {
      margin: 0;
    }

    .attributes-skills-tables {
      margin-top: var(--sl-spacing-small);
    }
  `,
];

export default styles;
