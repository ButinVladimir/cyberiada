import { css } from 'lit';
import { sectionTitleStyle, detailsStyle, hintIconStyle, pageTitleStyle } from '@shared/index';

export const statisticsPanelStyle = css`
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: var(--sl-spacing-large);
  }
`;

export const statisticsPanelContentStyle = [
  sectionTitleStyle,
  detailsStyle,
  hintIconStyle,
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-large);
    }

    h4.title {
      margin-bottom: 0;
    }

    .parameters-table {
      width: 100%;
      display: grid;
      column-gap: var(--sl-spacing-medium);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: 1fr auto;
      grid-auto-rows: auto;

      & > div:nth-child(even) {
        text-align: end;
        white-space: nowrap;
      }
    }
  `,
];

const styles = [
  pageTitleStyle,
  css`
    :host {
      display: block;
    }

    h3.title {
      margin-bottom: var(--sl-spacing-2x-small);
    }
  `,
];

export default styles;
