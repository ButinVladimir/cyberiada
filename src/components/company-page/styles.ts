import { css } from 'lit';
import { pageTitleStyle } from '@shared/index';

const styles = [
  pageTitleStyle,
  css`
    h3.title {
      margin-bottom: var(--sl-spacing-2x-small);
    }
  `,
];

export default styles;
