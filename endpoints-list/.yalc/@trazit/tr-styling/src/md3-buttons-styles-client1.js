import { css } from 'lit';

export const MdFilledIconButtonStylesClient1 = css`
  md-filled-icon-button {
    --md-filled-icon-button-container-color: transparent;
    --md-filled-icon-button-icon-color: green; /* Changed to green */
    --md-filled-icon-button-focus-icon-color: green;
    --md-filled-icon-button-outline-color: transparent;
    --md-filled-icon-button-hover-outline-color: transparent;
    transition: background-color 0.3s ease, transform 0.1s ease; 
  }

  md-filled-icon-button::part(container) {
    background-color: transparent; /* Fondo transparente en estado normal */
  }

  md-filled-icon-button:hover::part(container) {
    background-color: green; /* Fondo suave al hacer hover */
  }

  md-filled-icon-button:active::part(container) {
    background-color: green; /* Fondo más oscuro al hacer clic */
    transform: scale(0.95); /* Efecto de pulsar */
  }

  md-filled-icon-button:hover md-icon,
  md-filled-icon-button:active md-icon {
    color: #c314fa; /* Mantener el color del icono constante */
  }
`;
