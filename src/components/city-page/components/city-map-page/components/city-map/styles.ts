import { css } from "lit";

const styles = css`
    :host {
      display: contents;
    }

    .host-content {
      display: flex;
      align-items: stretch;
      gap: var(--sl-spacing-medium);
      width: 100%;

      div.content-wrapper {
        display: block;
        box-sizing: border-box;
        width: 100%;

        div.content {
          position: relative;
          cursor: not-allowed;

          &.unlocked {
            cursor: pointer;
          }
        }  
      }

      ca-city-map-district {
        opacity: 0;

        &.visible {
          opacity: 1;
        }
      } 
    }

    .host-content.mobile {
      flex-direction: column;
      align-items: stretch;
    }

    .host-content.desktop {
      flex-direction: row;

      div.content-wrapper {
        width: 60%;
      }

      ca-city-map-district-description {
        width: 40%;
      }
    }
  `;

  export default styles;