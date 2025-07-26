import { css } from 'lit';
import { dragIconStyle, hintIconStyle } from '@shared/index';

const styles = [
  hintIconStyle,
  dragIconStyle,
  css`
    :host {
      display: contents;
    }

    .buttons {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);

      &.desktop {
        justify-content: flex-end;
        font-size: var(--sl-font-size-large);
      }

      &.mobile {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }
  `,
];

export default styles;
