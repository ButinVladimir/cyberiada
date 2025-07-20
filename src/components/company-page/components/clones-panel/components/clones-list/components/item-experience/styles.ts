import { css } from 'lit';
import { hintStyle, progressBarHintStyle } from '@shared/index';

const styles = [
  hintStyle,
  progressBarHintStyle,
  css`
    :host {
      display: block;
    }

    div.title {
      font-size: var(--sl-font-size-small);
      line-height: var(--sl-line-height-dense);
      margin-bottom: var(--sl-spacing-2x-small);
    }

    sl-progress-bar {
      --height: var(--sl-spacing-large);
    }

    sl-progress-bar::part(label) {
      font-size: var(--sl-font-size-small);
    }
  `,
];

export default styles;
