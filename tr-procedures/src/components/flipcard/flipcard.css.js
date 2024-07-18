import { css } from 'lit';

export const flipCardStyles = css`
  .flip-card-container {
    perspective: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px 0;
    gap: 20px; /* Espacio entre las tarjetas */
  }

  .flip-card {
    width: calc((100% / var(--cards-per-row, 3)) - 20px); /* Ajuste dinámico para 3 columnas por defecto */
    height: var(--flip-card-height, 400px);
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    min-width:300px;
    max-width:350px;
  }

  .flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .flip-card-front,
  .flip-card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px 0; /* Reducir el padding superior */
  }

  .flip-card-front {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinear contenido al principio */
    text-align: center;
  }

  .flip-card-back {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinear contenido al principio */
    text-align: center;
  }

  .card-header {
    width: 100%;
    margin-bottom: 10px; /* Reducir el margen inferior */
  }

  .card-role {
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 5px;
  }

  .card-title {
    font-family: Montserrat;
    font-size: 2.4rem;
    font-weight: 100;
    margin-bottom: 10px;
  }

  .card-cover {
    width: 90%;
    height: 25%; /* Ajustar la altura */
    background: linear-gradient(to top right, #1e0b36, #ca3782);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }

  .card-heading-text {
    font-family: Montserrat;
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
    padding: 10px 15px;    
    border-radius: 5px;
  }

  .card-details {
    padding: 20px;
    text-align: center;
  }

  .skills-list {
    list-style: none;
    padding: 0;
    overflow-y: auto;
    max-height: 200px;
  }

  .skills-list li {
    font-size: 1.6rem;
    padding: 10px 0;
  }

  .flip-button {
    background-color: #1e0b36;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }

  .flip-button:hover {
    background-color: #ca3782;
  }

  .button-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
  }

  .flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .text-normal {
    color: white;
  }

  .text-warning {
    color: yellow;
  }

  .text-critical {
    color: #7b0a1f;
  }

  @media only screen and (max-width: 600px) {
    .flip-card {
      width: calc(100% - 20px); /* Ajuste para pantallas pequeñas */
      height: auto;
    }
  }
`;