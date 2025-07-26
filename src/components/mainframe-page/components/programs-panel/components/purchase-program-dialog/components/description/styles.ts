import { css } from 'lit';
import { highlightedValuesStyle } from '@shared/index';

const styles = [
  highlightedValuesStyle,
  css`
    :host {
      display: block;
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    p {
      margin: 0;
    }

    p.line-break {
      height: var(--sl-spacing-medium);
    }
  `,
];

export default styles;
