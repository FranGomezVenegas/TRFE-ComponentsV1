import { css } from 'lit';

export const miniMapStyles = css`
  .calendar-minimap {
    display: grid;
    grid-template-columns: 1fr repeat(7, 1fr); /* Ajustar la cuadrícula para alinear los días */
    gap: 5px;
  }

  .calendar-header span {
    font-weight: bold;
    text-align: center;
  }

  .calendar-week {
    display: flex; /* Aseguramos que los días de una misma semana se alineen horizontalmente */
    justify-content: space-between; /* Espacio uniforme entre los días */
    width: 100%;
  }

  .calendar-week.even {
    background-color: #f0f0f0; /* Color para semanas pares */
  }

  .calendar-week.odd {
    background-color: #e0e0e0; /* Color para semanas impares */
  }

  .month-name {
    grid-column: 1 / -1;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .day-cell {
    border: 1px solid #ccc; /* Borde alrededor de cada celda */
    padding: 10px;
    display: flex;
    flex-direction: column; /* Los elementos dentro de la celda (número de día y checkbox) en vertical */
    align-items: center;
    justify-content: center;
  }

  .day-number {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
