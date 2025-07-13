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
      }

      ca-sortable-list::part(list) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        gap: var(--sl-spacing-large);
      }

      ca-sortable-list ca-mainframe-hardware-panel-article.dragged {
        background-color: var(--ca-dragged-color);
      }

      div.buttons-block {
        margin: 0 0 var(--sl-spacing-large) 0;
      }
    `,
  ];

  export default styles;