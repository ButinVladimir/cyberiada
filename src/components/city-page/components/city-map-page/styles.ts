import { css } from 'lit';
import { hintStyle, pageTitleStyle } from '@shared/index';

const styles = [
  pageTitleStyle,
  hintStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
    }

    h3.title {
      margin-bottom: var(--sl-spacing-large);
    }

    p.hint {
      margin-bottom: var(--sl-spacing-large);
    }

    div.content {
      width: 100%;
    }
  `,
];

export default styles;
