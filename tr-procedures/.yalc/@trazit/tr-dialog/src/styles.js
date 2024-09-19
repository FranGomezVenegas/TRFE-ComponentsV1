import { css } from 'lit';

export const dialogStyles = css`
  :host {
    display: none; /* Asegura que el diálogo esté oculto inicialmente */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  }

  :host([open]) {
    display: block;
  }

  .dialog-content {
    padding: 20px;
    /* Agrega más estilos según sea necesario */
  }
`;

export const buttonStyles = css`
 mwc-icon.corner {
        cursor: pointer;
        --mdc-icon-size: 15px;
        margin: auto 5px;
        color: rgb(94, 145, 186);
      }
      ::slotted(mwc-icon) {
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      mwc-icon[hidden] {
        display: none;
      }
      div[hidden] {
        display: none;
      }
      /*Resizeable*/

      .mdc-dialog__surface .resizer-right {
        width: 5px;
        height: 100%;
        background: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: e-resize;
      }

      .mdc-dialog__surface .resizer-bottom {
        width: 100%;
        height: 5px;
        background: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: n-resize;
      }

      .mdc-dialog__surface .resizer-both {
        width: 5px;
        height: 5px;
        background: transparent;
        z-index: 10;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: nw-resize;
      }

      /*NOSELECT*/

      .mdc-dialog__surface * {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
      }

      .mdc-dialog__surface {
        max-width: 100% !important;
      }

      .popup-header {
        cursor: move;
      }
`;

export const iconStyles = css`
  md-icon-button.corner {
    cursor: pointer;
    --md-icon-size: 15px;
    margin: auto 5px;
    color: rgb(94, 145, 186);
  }
  ::slotted(md-icon-button) {
    cursor: pointer;
    --md-icon-size: 15px;
  }
  md-icon-button[hidden] {
    display: none;
  }
  div[hidden] {
    display: none;
  }
`;
