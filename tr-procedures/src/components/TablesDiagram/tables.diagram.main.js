import { LitElement, html } from 'lit';
import { template } from './template.js';

class TableDiagram extends LitElement {
  static get properties() {
    return {
      nodeDataArray: { type: Array },
      links: { type: Array },
      selectedNode: { type: Object },  // Guardar el nodo seleccionado
      resizingNode: { type: Object },  // Guardar el nodo que se está redimensionando
      offsetX: { type: Number },  // Para calcular la diferencia de arrastre en X
      offsetY: { type: Number }   // Para calcular la diferencia de arrastre en Y      
    };
  }

  constructor() {
    super();
    this.nodeDataArray = [];
    this.links = [];
    this.selectedNode = null;  // Nodo seleccionado para arrastrar
    this.resizingNode = null;  // Para manejar el nodo que se está redimensionando
    this.offsetX = 0;
    this.offsetY = 0;
  }

  updated() {
    // Creamos las líneas después de que el DOM ha sido actualizado
    this.createConnections();
  }

  createConnections() {
    const existingLines = this.shadowRoot.querySelectorAll('.connection-line, .connection-arrow');
    existingLines.forEach(line => line.remove());

    this.links.forEach(link => {
      const fromNode = this.nodeDataArray.find(node => node.key === link.from.key);
      const toNode = this.nodeDataArray.find(node => node.key === link.to.key);
  
      // Encontrar los elementos DOM correspondientes
      const fromFieldElement = this.shadowRoot.querySelector(`#${fromNode.key}-${link.from.field}`);
      const toFieldElement = this.shadowRoot.querySelector(`#${toNode.key}-${link.to.field}`);
  
      if (fromFieldElement && toFieldElement) {
        // Calculamos las posiciones de los campos
        const containerRect = this.shadowRoot.querySelector('.table-container').getBoundingClientRect();
        const fromRect = fromFieldElement.getBoundingClientRect();
        const toRect = toFieldElement.getBoundingClientRect();
  
        // Calcular las posiciones ajustadas (del borde de cada campo)
        const x1 = (fromRect.right - containerRect.left); // Comienza en el borde derecho del primer campo
        const y1 = (fromRect.top + fromRect.height / 2 - containerRect.top); // A la mitad de altura del primer campo
        const x2 = (toRect.left - containerRect.left - 15); // Termina en el borde izquierdo del segundo campo
        const y2 = (toRect.top + toRect.height / 2 - containerRect.top); // A la mitad de altura del segundo campo
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  
        // Crear la línea
        const line = document.createElement('div');
        line.classList.add('connection-line');
        this.shadowRoot.appendChild(line);
        line.style.position = 'absolute';
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.backgroundColor = '#dc354559';
        line.style.transformOrigin = '0 0';
        line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        //console.log(y2)
        // Crear la flecha al final de la línea
        const arrowHead = document.createElement('div');
        arrowHead.classList.add('connection-arrow');
        arrowHead.style.position = 'absolute';
        arrowHead.style.width = '0';
        arrowHead.style.height = '0';
        arrowHead.style.borderLeft = '10px solid #dc354559';  // Color de la flecha
        arrowHead.style.borderTop = '5px solid transparent';
        arrowHead.style.borderBottom = '5px solid transparent';
        arrowHead.style.transform = `translate(${x2-4}px, ${y2 - 3}px) rotate(${angle}deg)`; // Ajustar la flecha
        this.shadowRoot.appendChild(arrowHead);
      }
    });
  }
  
  // Iniciar el arrastre o redimensionar según la posición del clic
  handleMouseDown(event, node) {
    const rect = event.target.getBoundingClientRect();
    const isResizing = event.clientX > rect.right - 10;  // Detectar si estamos en el borde derecho (10px de ancho)

    if (isResizing) {
      // Iniciar redimensionado
      this.resizingNode = node;
    } else {
      // Iniciar el arrastre
      this.selectedNode = node;
      this.offsetX = event.clientX - parseInt(node.loc.split(' ')[0], 10);
      this.offsetY = event.clientY - parseInt(node.loc.split(' ')[1], 10);
    }
  }

  handleMouseMove(event) {
    // Verificar si el mouse está sobre un nodo seleccionado o en proceso de redimensionado
    const activeNode = this.selectedNode ? this.selectedNode : this.resizingNode;
  
    // Solo ejecutar si hay un nodo activo
    if (activeNode) {
      const nodeElement = this.shadowRoot.querySelector(`#${activeNode.key}`);
  
      if (nodeElement) {
        const rect = nodeElement.getBoundingClientRect();
  
        // Detectar si estamos en el borde derecho del nodo para redimensionar (margen de 10px)
        const isResizing = event.clientX > rect.right - 10 && event.clientX < rect.right;
  
        // Cambiar el cursor si estamos en el borde derecho
        if (isResizing) {
          nodeElement.style.cursor = 'ew-resize';  // Cambia el cursor a uno de redimensionar
        } else {
          nodeElement.style.cursor = 'default';  // Vuelve al cursor por defecto
        }
  
        // Si el nodo está siendo arrastrado, actualizamos su posición
        if (this.selectedNode) {
          const x = event.clientX - this.offsetX;
          const y = event.clientY - this.offsetY;
          this.selectedNode.loc = `${x} ${y}`;
          this.requestUpdate();  // Forzar una actualización
        }
  
        // Si el nodo está siendo redimensionado, actualizamos su ancho
        if (this.resizingNode) {
          this.resizingNode.width = event.clientX - rect.left;  // Cambiar el ancho en función del mouse
          this.requestUpdate();
        }
      }
    }
  }
  
  
  
  
  

  // Finalizar el arrastre o redimensionado
  handleMouseUp() {
    this.selectedNode = null;
    this.resizingNode = null;
  }

  // Iniciar el arrastre
  handleDragStart(event, node) {
    this.selectedNode = node;
    
    // Obtener la posición actual del mouse y el desplazamiento respecto a la tabla
    this.offsetX = event.clientX - parseInt(node.loc.split(' ')[0], 10);
    this.offsetY = event.clientY - parseInt(node.loc.split(' ')[1], 10);
  }

  // Continuar el arrastre mientras el mouse se mueve
  handleDragging(event) {
    if (this.selectedNode) {
      // Actualizar la posición mientras arrastras
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;

      // Actualizar la localización del nodo en tiempo real
      this.selectedNode.loc = `${x} ${y}`;
      this.requestUpdate();  // Forzar una actualización de la vista para ver los cambios
    }
  }

  // Terminar el arrastre cuando se suelta el mouse
  handleDragEnd() {
    if (this.selectedNode) {
      // Mostrar en consola la nueva posición del nodo seleccionado
      console.log(`Nueva posición de ${this.selectedNode.key}: loc = ${this.selectedNode.loc}`);

      this.selectedNode = null;  // Resetear el nodo seleccionado
    }
  }  

  render() {
    return template(this.nodeDataArray, this.links, this.lang, this.handleMouseDown.bind(this), this.handleMouseMove.bind(this), this.handleMouseUp.bind(this));
  }
}

customElements.define('table-diagram', TableDiagram);
