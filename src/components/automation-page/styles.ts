import { css } from 'lit';
import { hintStyle } from '@shared/styles';

export const autobuyerStyles = [
  hintStyle,
  css`
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: var(--sl-spacing-large);
      box-sizing: border-box;
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
      gap: var(--sl-spacing-3x-large);
    }

    div.text-container {
      flex: 1 1 auto;
      overflow: hidden;
    }

    div.text-container-inner {
      max-width: 100%;
    }

    h4.title {
      width: 100%;
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      line-height: var(--sl-line-height-denser);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    p.hint {
      width: 100%;
      margin: 0;
    }

    div.input-container {
      flex: 0 0 auto;
      min-width: 15rem;
    }
  `,
];
