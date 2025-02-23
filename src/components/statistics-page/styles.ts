import { css } from 'lit';
import { sectionTitleStyle, SCREEN_WIDTH_POINTS } from '@shared/styles';

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
  css`
    :host {
      display: block;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-large);
    }

    h4.title {
      margin-bottom: 0;
    }

    .parameters-table {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: auto;
      grid-auto-rows: auto;
    }

    .parameters-table > span:nth-child(even) {
      text-align: start;
      white-space: nowrap;
      margin-bottom: var(--sl-spacing-medium);
    }

    sl-icon[name='question-circle'] {
      position: relative;
      top: 0.2em;
      margin-left: 0.5em;
      color: var(--ca-hint-color);
      font-size: var(--sl-font-size-large);
    }

    @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      .parameters-table {
        grid-template-columns: auto auto;
      }

      .parameters-table > span:nth-child(even) {
        text-align: end;
        margin-bottom: 0;
      }
    }
  `,
];
