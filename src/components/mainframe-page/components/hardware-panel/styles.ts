import { css } from 'lit';
import { hintStyle } from '@shared/index';

const styles = [
  hintStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-large);
    }

    ca-sortable-list {
      width: 100%;
      display: block;

      &::part(list) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        gap: var(--sl-spacing-large);
      }
    }

    div.buttons-block {
      margin: 0 0 var(--sl-spacing-large) 0;
    }
  `,
];

export default styles;
