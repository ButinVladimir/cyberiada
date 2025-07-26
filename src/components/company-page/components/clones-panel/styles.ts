import { css } from 'lit';
import { hintStyle } from '@shared/index';

const styles = [
  hintStyle,
  css`
    :host {
      display: contents;
    }

    .host-content {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      p.hint {
        margin: 0;
        margin-bottom: var(--sl-spacing-large);
      }

      div.top-container {
        display: flex;
        margin-bottom: var(--sl-spacing-large);
      }

      &.mobile div.top-container {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--sl-spacing-medium);
      }

      &.desktop div.top-container {
        flex-direction: row;
        align-items: center;
        gap: var(--sl-spacing-3x-large);
      }
    }
  `,
];

export default styles;
