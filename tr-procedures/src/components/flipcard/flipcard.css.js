import { css } from 'lit';

export const flipCardStyles = css`
  .flip-card-container {
    perspective: 1000px;
  }

  .flip-card {
    width: 300px;
    height: 400px;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .flip-card-front,
  .flip-card-back {
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
  }

  .flip-card-front {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    text-align: center;
  }

  .flip-card-back {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    padding: 20px;
    text-align: center;
  }

  .card-header {
    margin-bottom: 20px;
  }

  .card-role {
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 5px;
  }

  .card-title {
    font-family: 'VT323', monospace;
    font-size: 3.6rem;
    font-weight: 100;
    margin-bottom: 10px;
  }

  .card-cover {
    width: 100%;
    height: 40%;
    background: linear-gradient(to top right, #1e0b36, #ca3782);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }

  .card-heading-text {
    font-family: 'VT323', monospace;
    font-size: 2.4rem;
    font-weight: 300;
    text-transform: uppercase;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.3);
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
    font-size: 1.6rem;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }

  .flip-button:hover {
    background-color: #ca3782;
  }

  .flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  @media only screen and (max-width: 600px) {
    .flip-card {
      width: 80%;
      height: auto;
    }
  }
`;
