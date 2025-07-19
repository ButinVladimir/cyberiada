import { css } from 'lit';

const styles = css`
  :host {
    display: contents;
  }

  .game-screen {
    width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;
    background-color: var(--sl-color-neutral-0);
  }

  .top-bar-outer-container {
    border-bottom: var(--ca-border);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    height: var(--ca-top-bar-height);
  }

  .top-bar-inner-container {
    width: 100vw;
    max-width: var(--ca-width-screen);
    padding: var(--sl-spacing-2x-small);
  }

  .content-outer-container {
    box-sizing: border-box;
    height: calc(100dvh - var(--ca-top-bar-height));
    box-shadow: var(--sl-shadow-small);
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1 1 auto;
  }

  .content-inner-container {
    position: relative;
    width: 100vw;
    max-width: var(--ca-width-screen);
    height: 100%;
  }

  .menu-bar-container {
    box-sizing: border-box;
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: width var(--sl-transition-x-fast) ease;
  }

  .viewport-container {
    position: absolute;
    top: 0;
    height: 100%;
    scrollbar-width: thin;
    overflow: auto;
  }

  .game-screen {
    &.with-overlay {
      .menu-bar-container {
        width: 0;
        background-color: var(--sl-panel-background-color);

        &.menu-opened {
          border-right: var(--ca-border);
          z-index: 2;

          &.mobile {
            width: 100vw;
          }

          &.tablet {
            width: var(--ca-menu-bar-max-width);
          }
        }
      }

      .viewport-container {
        left: 0;
        width: 100%;

        .viewport-overlay {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--sl-overlay-background-color);

          &.menu-opened {
            display: block;
            z-index: 1;
          }
        }
      }
    }

    &.without-overlay {
      .menu-bar-container {
        width: var(--ca-menu-bar-max-width);
        background-color: var(--sl-color-neutral-0);
        border-right: var(--ca-border);
      }

      .viewport-container {
        left: var(--ca-menu-bar-max-width);
        width: calc(100% - var(--ca-menu-bar-max-width));
      }
    }
  }
`;

export default styles;
