import { css } from 'lit';

export const styles = css`
  .table-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

.table {
  position: relative;
  border: 2px solid black;  /* Borde de la tabla */
  width: 150px;  /* Ancho por defecto del nodo */
}

/* Añadir un "handle" invisible en el borde derecho para redimensionar */
.table::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;  /* Área de 10px en el borde derecho */
  height: 100%;
  cursor: ew-resize;  /* Cambiar el cursor a redimensionar horizontal */
}


  .field {
    margin: 5px 0;
    padding: 5px;
    border-radius: 4px;
    position: relative;
    min-width:100px;
  }

  .line {
    position: absolute;
    background-color: red;
    height: 2px;
    transform-origin: 0 0;
  }
`;
