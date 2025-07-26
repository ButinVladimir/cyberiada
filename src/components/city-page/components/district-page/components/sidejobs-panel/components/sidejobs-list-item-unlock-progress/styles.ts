import { css } from 'lit';
import { progressBarHintStyle } from '@shared/index';

const styles = [
  progressBarHintStyle,
  css`
    :host {
      flex: 1 1 auto;
    }

    .progress-bar-content {
      display: none;
    }

    .progress-bar-content.visible {
      display: block;
    }
  `,
];

export default styles;
