import { css } from 'lit';
import { hintIconStyle } from '@shared/index';

const styles = [
  hintIconStyle,
  css`
    ul.features-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--sl-spacing-3x-small);
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `,
];

export default styles;
