import { css } from 'lit';
import {
  inputLabelStyle,
  hintStyle,
  sectionTitleStyle,
  modalBodyScrollStyle,
  smallModalStyle,
  warningStyle,
  formStyle,
} from '@shared/index';

const styles = [
    inputLabelStyle,
    hintStyle,
    sectionTitleStyle,
    smallModalStyle,
    modalBodyScrollStyle,
    warningStyle,
    formStyle,
    css`
      sl-dialog::part(body) {
        padding-top: 0;
        padding-bottom: 0;
      }

      :host {
        display: contents;
      }

      h4.title {
        margin: 0;
      }

      div.body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      p.hint {
        margin-top: 0;
        margin-bottom: var(--sl-spacing-medium);
      }

      div.footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      p.warning {
        margin-top: var(--sl-spacing-3x-small);
        margin-bottom: 0;
      }
      div.footer div.buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-medium);
      }
    `,
  ];

  export default styles;