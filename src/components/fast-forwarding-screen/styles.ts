import { css } from 'lit';
import { progressBarHintStyle } from '@shared/index';

const styles =   [
    progressBarHintStyle,
    css`
      :host {
        width: 100vw;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--sl-color-neutral-0);
        gap: var(--sl-spacing-large);
      }

      span.warning {
        font-size: var(--sl-font-size-3x-large);
        font-weight: var(--sl-font-weight-semibold);
        letter-spacing: var(--sl-letter-spacing-loose);
      }

      sl-progress-bar {
        width: 80vw;
        --height: 2rem;
      }
    `,
  ];

  export default styles;