import { LitElement, html, css, nothing } from 'lit';
import '@material/web/icon/icon.js';
import '@material/web/button/filled-button'

const defaultButtonLabels={
    close:{"label_en":"Close", "label_es":"Cerrar"},
    do:{"label_en":"Do", "label_es":"Aplicar"}
}

export class TrDialog extends LitElement {
    static properties = {
        top: { type: Number },
        left: { type: Number },
        width: { type: Number },
        height: { type: Number },
        isDragging: { type: Boolean },
        isResizing: { type: Boolean },
        startX: { type: Number },
        startY: { type: Number },
        startWidth: { type: Number },
        startHeight: { type: Number },
        zoomLabel: { type: String },
        expandLabel: { type: String },
        hideMin: { type: Boolean },
        hideZoom: { type: Boolean },
        hideXtoClose: { type: Boolean },
        isMinimized: { type: Boolean },
        lang: {type:Boolean},
        dialogTitle:{type:Object},
        isOpen:{ type: Boolean }
    };

    constructor() {
        super();
        this.top = 100;
        this.left = 100;
        this.width = 400;
        this.height = 300;
        this.isDragging = false;
        this.isResizing = false;
        this.zoomLabel = "zoom_out_map";
        this.expandLabel = "expand_more";
        this.hideMin = false;
        this.hideZoom = false;
        this.hideXtoClose = false;   
        this.isMinimized = false;   
        this.lang=""   
        this.dialogTitle={}
        this.isOpen=false
    }

    static styles = css`
        :host {
            --md-icon-size, 14px;
        }
    .dialog-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        max-width: 90vw;
        max-height: 90vh;
        width: auto;
        height: auto;
        overflow: hidden;
    }


        .popup-content {
            padding: 10px;
            flex-grow: 1;      /* Permitir que el contenido crezca */
            overflow-y: auto;  /* Permitir scroll si el contenido excede el tamaño máximo */
            max-height: 80vh;  /* El contenido interno no puede superar el 80% del alto de la pantalla */
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgb(94, 145, 186);
            color: white;
            padding: 10px;
            cursor: move;
        }


        .popup-content.minimized {
            display: none; /* Ocultar contenido cuando está minimizado */
        }


        md-filled-button {
        --_container-height: 20px;
            --md-filled-button-padding: 4px 8px; /* Ajustar el padding para reducir el tamaño */
            --md-filled-button-font-size: 12px; /* Tamaño de la fuente más pequeño */
            --md-filled-button-height: 32px; /* Altura mínima más baja */
        }

        .button-container {
            display: flex;
            justify-content: center;
            gap: 100px;
            padding: 4px;
            background: #fff;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        md-icon, md-filled-button {
            cursor: pointer;
            --_container-color: rgb(94, 145, 186);
        }

        .icon-container {
            display: flex;
            gap: 8px;
        }

        .resizer {
            position: absolute;
            background-color: transparent;
        }

        .resizer.corner {
            width: 15px;
            height: 15px;
        }

        .resizer.top-left {
          z-index: 100;
          top: -5px;
          left: -5px;
          cursor: nwse-resize;
        }

        .resizer.top-right {
          z-index: 100;
          top: -5px;
          right: -5px;
          cursor: nesw-resize;
        }

        .resizer.bottom-left {
          z-index: 100;
          bottom: -5px;
          left: -5px;
          cursor: nesw-resize;
        }

        .resizer.bottom-right {
          z-index: 100;
          bottom: -5px;
          right: -5px;
          cursor: nwse-resize;
        }

        /* Resizer en los bordes */
        .resizer.edge {
            background-color: transparent;
        }

        /* Aumentar el grosor de las áreas de interacción */
        .resizer.top,
        .resizer.bottom {
            height: 10px;  /* Más área sensible al ratón */
            left: 0;
            right: 0;
            cursor: ns-resize;
            position: absolute;
        }

        .resizer.top {
            top: -5px; /* Colocarlo correctamente encima del borde superior */
        }

        .resizer.bottom {
            bottom: -5px; /* Colocarlo correctamente debajo del borde inferior */
        }

        .resizer.left,
        .resizer.right {
            width: 10px;  /* Más área sensible al ratón */
            top: 0;
            bottom: 0;
            cursor: ew-resize;
            position: absolute;
        }

        .resizer.left {
            left: -5px; /* Colocarlo correctamente a la izquierda */
        }

        .resizer.right {
            right: -5px; /* Colocarlo correctamente a la derecha */
        }
       /* Responsive styles */
        @media (max-width: 768px) {
            .dialog-container {
                max-width: 95vw; /* En pantallas pequeñas, usar casi todo el ancho del viewport */
                max-height: 95vh; /* En pantallas pequeñas, usar casi todo el alto del viewport */
            }

            .button-container {
                flex-direction: column; /* Colocar botones verticalmente en pantallas pequeñas */
                gap: 20px;
            }
        }          
    `;

    updated(changedProperties) {
        super.updated(changedProperties);
    
        // Si la propiedad dialogTitle cambió, forzar una actualización
        if (changedProperties.has('dialogTitle')) {
            this.requestUpdate();
        }
        if (changedProperties.has('isOpen') && this.isOpen) {
            this._expandDialog(); // Llamamos a una función para expandir el diálogo completamente
          }        
    }  
    _expandDialog() {
        const dialogElement = this.shadowRoot.querySelector('.dialog-container');
        if (dialogElement) {
            dialogElement.style.display = 'block'; // Ensure dialog is visible first
            this.adjustSize(); // Adjust size after ensuring the dialog is visible
            dialogElement.style.height = 'auto'; // Aseguramos que el tamaño del contenido se ajuste automáticamente
            dialogElement.style.maxHeight = '100%'; 
            dialogElement.style.transition = 'height 0.3s ease';
        }
     }
   
    render() {
        return html`
          <div class="dialog-container" ?open=${this.isOpen}
              style="top: ${this.top}px; left: ${this.left}px; width: ${this.width}px; height: ${this.height}px;"
              @mousedown=${this.startDragFromEmptySpace}>
            <div class="popup-header" @mousedown=${this.startDrag}>
                <span>
                    ${this.dialogTitle!==undefined&&this.dialogTitle.icon!==undefined?html`<md-icon src="${this.dialogTitle.icon}">${this.dialogTitle.icon}</md-icon>`:nothing}
                    ${this.dialogTitle!==undefined&&this.dialogTitle["title_"+this.lang]!==undefined?this.dialogTitle["title_"+this.lang]:nothing}
                </span>
                <div class="icon-container">
                    <md-icon 
                        ?hidden=${this.hideMin} 
                        @click=${this.minimize}
                    >${this.expandLabel}</md-icon>
                    <md-icon 
                        ?hidden=${this.hideZoom} 
                        @click=${this.zoomOut}
                    >${this.zoomLabel}</md-icon>
                    <md-icon 
                        ?hidden=${this.hideXtoClose} 
                        @click=${this.closeDialog}
                    >close</md-icon>
                </div>
            </div>

            <div class="popup-content ${this.isMinimized ? 'minimized' : ''}">
                <slot name="content"></slot>
            </div>

            <div class="button-container">
                ${this.showCloseButton ? html`
                    <md-filled-button style="--_container-color:#892a25bf;" @click=${this.closeDialog}>${this.closeButtonLabel===undefined?`${defaultButtonLabels.close["label_"+this.lang]}`:this.closeButtonLabel["label_"+this.lang]}</md-filled-button>
                ` : ''}
                
                ${this.showDoButton ? html`
                    <md-filled-button @click=${this.handleDoAction}>${this.doButtonLabel===undefined?`${defaultButtonLabels.do["label_"+this.lang]}`:this.doButtonLabel["label_"+this.lang]}</md-filled-button>
                ` : ''}
            </div>            
            <!-- Resizers en las esquinas y bordes -->
            <div class="resizer corner top-left" @mousedown=${this.startResize}></div>
            <div class="resizer corner top-right" @mousedown=${this.startResize}></div>
            <div class="resizer corner bottom-left" @mousedown=${this.startResize}></div>
            <div class="resizer corner bottom-right" @mousedown=${this.startResize}></div>

            <div class="resizer edge top" @mousedown=${this.startResize}></div>
            <div class="resizer edge bottom" @mousedown=${this.startResize}></div>
            <div class="resizer edge left" @mousedown=${this.startResize}></div>
            <div class="resizer edge right" @mousedown=${this.startResize}></div>
          </div>
        `;
    }
    firstUpdated() {
        this.closeDialog()
        const doButton = this.shadowRoot.querySelector('#do-button');
        if (doButton) {
            doButton.focus();
        }
        if (this.lang===undefined||this.lang.length==0){
            this.lang="en"
        }        
        // Llamamos a adjustSize al iniciar para ajustar el tamaño según el contenido inicial
        this.adjustSize();
      
        // Creamos un MutationObserver para detectar cambios en el slot
        const slot = this.shadowRoot.querySelector('slot[name="content"]');
        const observer = new MutationObserver(() => this.adjustSize());
        observer.observe(slot, { childList: true, subtree: true });
      }
      
      adjustSize() {
        // Obtenemos el contenido del slot
        const slot = this.shadowRoot.querySelector('slot[name="content"]');
        const assignedElements = slot.assignedElements();
      
        if (assignedElements.length === 0) {
          return; // Si no hay contenido, no hacemos nada
        }
      
        // Obtenemos la altura del contenido dentro del slot
        const contentHeight = assignedElements.reduce((acc, el) => acc + el.offsetHeight, 0);
      
        // Obtenemos las alturas del header y del footer
        const headerHeight = this.shadowRoot.querySelector('.popup-header').offsetHeight;
        const footerHeight = this.shadowRoot.querySelector('.button-container').offsetHeight;
      
        // Ajustamos la altura total del diálogo sumando header + contenido + footer
        const totalHeight = headerHeight + contentHeight + footerHeight;
      
        // Ajustamos la altura del contenedor del diálogo
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        dialogContainer.style.height = `${totalHeight}px`;
      }
    
     
    handleDoAction() {
        // Emitir un evento personalizado para que el componente padre pueda manejar la acción
        this.dispatchEvent(new CustomEvent('do-action', {
            detail: { message: 'Do action triggered' }
        }));
    }
    // Iniciar arrastre del diálogo
    startDrag(event) {
        if (!this.isResizing) {
            this.isDragging = true;
            this.startX = event.clientX - this.left;
            this.startY = event.clientY - this.top;
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.stopDrag);
        }
    }

    startDragFromEmptySpace(event) {
        const clickedElement = event.target;
        const isInteractiveElement = clickedElement.tagName === 'BUTTON' || clickedElement.closest('md-icon') || clickedElement.closest('slot');
        
        if (!isInteractiveElement && !this.isResizing) {
            this.startDrag(event); // Solo arrastrar si no es un elemento interactivo
        }
    }

    handleDrag = (event) => {
        if (this.isDragging) {
            this.left = event.clientX - this.startX;
            this.top = event.clientY - this.startY;
    
            // Asegurarnos de que las dimensiones no cambien durante el arrastre
            const dialogElement = this.shadowRoot.querySelector('.dialog-container');
            dialogElement.style.width = `${this.width}px`;  // Mantén el ancho fijo
            dialogElement.style.height = `${this.height}px`;  // Mantén la altura fija
    
            this.requestUpdate();
        }
    };
    


    stopDrag = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.stopDrag);
    };

    startResize(event) {
        this.isResizing = true;
    
        // Actualizar las dimensiones y posición inicial cada vez que se empieza a redimensionar
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startWidth = this.width; // Ancho actual del diálogo
        this.startHeight = this.height; // Altura actual del diálogo
    
        this.resizerType = event.target.classList; // Guarda el tipo de resizer
    
        document.addEventListener('mousemove', this.handleResize);
        document.addEventListener('mouseup', this.stopResize);
    }
    
    handleResize = (event) => {
        if (this.isResizing) {
            // Esquinas
            if (this.resizerType.contains('top-left')) {
                this.width = this.startWidth - (event.clientX - this.startX);
                this.height = this.startHeight - (event.clientY - this.startY);
                this.top = this.startY + (event.clientY - this.startY); // Cambia la posición superior
                this.left = this.startX + (event.clientX - this.startX); // Cambia la posición izquierda
            } else if (this.resizerType.contains('top-right')) {
                this.width = this.startWidth + (event.clientX - this.startX);
                this.height = this.startHeight - (event.clientY - this.startY);
                this.top = this.startY + (event.clientY - this.startY); // Cambia la posición superior
            } else if (this.resizerType.contains('bottom-left')) {
                this.width = this.startWidth - (event.clientX - this.startX);
                this.height = this.startHeight + (event.clientY - this.startY);
                this.left = this.startX + (event.clientX - this.startX); // Cambia la posición izquierda
            } else if (this.resizerType.contains('bottom-right')) {
                // Redimensionar desde la esquina inferior derecha (solo cambia el tamaño)
                this.width = this.startWidth + (event.clientX - this.startX);
                this.height = this.startHeight + (event.clientY - this.startY);
                // No cambiamos `top` ni `left` aquí para evitar mover el diálogo
            }
    
            // Bordes
            if (this.resizerType.contains('top')) {
                this.height = this.startHeight - (event.clientY - this.startY);
                this.top = this.startY + (event.clientY - this.startY); // Cambia la posición superior
            } else if (this.resizerType.contains('bottom')) {
                this.height = this.startHeight + (event.clientY - this.startY);
            } else if (this.resizerType.contains('left')) {
                this.width = this.startWidth - (event.clientX - this.startX);
                this.left = this.startX + (event.clientX - this.startX); // Cambia la posición izquierda
            } else if (this.resizerType.contains('right')) {
                this.width = this.startWidth + (event.clientX - this.startX);
            }
    
            this.requestUpdate();
        }
    };
     
    
    
    

    stopResize = () => {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.handleResize);
        document.removeEventListener('mouseup', this.stopResize);
    };

    minimize() {
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        const headerHeight = this.shadowRoot.querySelector('.popup-header').offsetHeight;

        if (this.isMinimized) {
            this.height = 300; // Altura original
            dialogContainer.style.height = `${this.height}px`;
            this.expandLabel = "expand_more";
        } else {
            dialogContainer.style.height = `${headerHeight}px`; // Solo mostrar la cabecera
            this.expandLabel = "expand_less";
        }

        this.isMinimized = !this.isMinimized;
        this.requestUpdate();
    }

    zoomOut() {
        if (this.zoomLabel == "zoom_out_map") {
            this.top = 0;
            this.left = 0;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.zoomLabel = "zoom_in_map";
        } else {
            this.width = 400;
            this.height = 300;
            this.top = 100;
            this.left = 100;
            this.zoomLabel = "zoom_out_map";
        }
        this.requestUpdate();
    }
    show() {
        this.isOpen = true;
    
        // Asegúrate de que el tamaño se ajuste correctamente
        this.adjustSize();
    
        // Mostrar el diálogo
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        if (dialogContainer) {
            dialogContainer.style.display = 'block';
            dialogContainer.style.top = '50%';   // Usamos valores relativos
            dialogContainer.style.left = '50%';  // Centramos desde el CSS con transform
            dialogContainer.style.transform = 'translate(-50%, -50%)';  // Esto asegura el centrado
        }
    }
    
    
    close(){
        this.closeDialog()
    }
    closeDialog() {
        this.isOpen = false;
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        if (dialogContainer) {
            dialogContainer.style.display = 'none'; // Ocultar el diálogo
        }
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this.adjustDialogSize.bind(this)); // Ajustar cuando la ventana cambie de tamaño
    }
    
    disconnectedCallback() {
        window.removeEventListener('resize', this.adjustDialogSize.bind(this)); // Limpiar el evento cuando el diálogo se elimine
        super.disconnectedCallback();
    }
    
    adjustDialogSize() {
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        const content = this.shadowRoot.querySelector('.popup-content');
        
        // Obtener el tamaño disponible en la ventana
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
    
        // Ajustar el tamaño del diálogo al contenido
        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;
    
        // Establecer el tamaño del diálogo, con un máximo del 90% del tamaño de la ventana
        dialogContainer.style.width = Math.min(contentWidth, windowWidth * 0.9) + 'px';
        dialogContainer.style.height = Math.min(contentHeight, windowHeight * 0.9) + 'px';
    }
    
}customElements.define('tr-dialog', TrDialog);
