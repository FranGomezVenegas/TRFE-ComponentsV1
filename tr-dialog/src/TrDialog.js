import { LitElement, html, css } from 'lit';
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
        dialogTitle:{type:Object}
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
    }

    static styles = css`
        host {
            --md-icon-size, 14px;
        }
        .dialog-container {
            position: absolute;
            background-color: white;
            border: 1px solid black;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            overflow: hidden;
            max-width: 90vw; /* Limitar el tamaño del diálogo a un 90% del ancho de la ventana */
            max-height: 90vh; /* Limitar el tamaño del diálogo a un 90% de la altura de la ventana */
            min-width: 300px; /* Establecer un ancho mínimo */
            min-height: 100px; /* Establecer una altura mínima */
            resize: both; /* Permitir redimensionar el diálogo manualmente si es necesario */
        }

        .popup-content {
            overflow-y: auto;
            padding: 10px;
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            /* padding: 10px; */
            background-color: rgb(94, 145, 186);
            color: white;
            cursor: move;
        }

        .popup-content.minimized {
            display: none; /* Ocultar contenido cuando está minimizado */
        }

        .button-container {
            display: flex;
            justify-content: center;
            gap: 100px;
            padding: 4px;
            position: absolute;
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        md-icon, md-filled-button {
            cursor: pointer;
            --_container-color:rgb(94, 145, 186);
            
        } 

        md-filled-button {
        --_container-height: 20px;
            --md-filled-button-padding: 4px 8px; /* Ajustar el padding para reducir el tamaño */
            --md-filled-button-font-size: 12px; /* Tamaño de la fuente más pequeño */
            --md-filled-button-height: 32px; /* Altura mínima más baja */
        }

        .icon-container {
            display: flex;
            gap: 8px;
            right: 5px;
            position: relative;            
        }

        /* Estilo de los íconos en la esquina */
        md-icon {
            cursor: pointer;
            color: white;
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
    `;

    render() {
        return html`
          <div class="dialog-container"
              style="top: ${this.top}px; left: ${this.left}px; width: ${this.width}px; height: ${this.height}px;"
              @mousedown=${this.startDragFromEmptySpace}>
            <div class="popup-header" @mousedown=${this.startDrag}>
                <span>
                    ${this.dialogTitle!==undefined&&this.dialogTitle.icon!==undefined?nothing:html`<md-icon>${this.dialogTitle.icon}</md-icon>`}
                    ${this.dialogTitle!==undefined&&this.dialogTitle["title_"+this.lang]!==undefined?nothing:this.dialogTitle["title_"+this.lang]}
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
                <slot></slot>
            </div>

            <div class="button-container">
                ${this.showCloseButton ? html`
                    <md-filled-button style="--_container-color:#892a25bf;" @click=${this.closeDialog}>${this.closeButtonLabel===undefined?`${defaultButtonLabels.close["label_"+this.lang]}`:this.closeButtonLabel}</md-filled-button>
                ` : ''}
                
                ${this.showDoButton ? html`
                    <md-filled-button @click=${this.handleDoAction}>${this.doButtonLabel===undefined?`${defaultButtonLabels.do["label_"+this.lang]}`:this.doButtonLabel}</md-filled-button>
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
        // Verificar si el botón de acción existe antes de intentar enfocarlo
        const doButton = this.shadowRoot.querySelector('#do-button');
        if (doButton) {
            doButton.focus();
        }
        if (this.lang===undefined||this.lang.length==0){
            this.lang="en"
        }
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
        const dialogContainer = this.shadowRoot.querySelector('.dialog-container');
        if (dialogContainer) {
            dialogContainer.style.display = 'block'; // Mostrar el diálogo nuevamente
        }
    }

    closeDialog() {
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

// import { LitElement, html, css } from 'lit';
// import '@material/web/dialog/dialog.js';
// import '@material/web/icon/icon.js';
// import '@material/web/button/text-button';
// export class TrDialog extends LitElement {
//     static properties = {
//         showCloseButton: { type: Boolean },
//         showDoButton: { type: Boolean },
//       };    
//   static styles = [
//     css`
//       :host {
//         display: block;
//       }
//       md-dialog {
//         display: none; /* Asegura que el diálogo esté oculto inicialmente */
//       }
//       md-dialog[open] {
//         display: block; /* Mostrar solo cuando esté abierto */
//       }
//       .resizer-top, .resizer-left, .resizer-top-left, .resizer-top-right, .resizer-bottom-left {
//         position: absolute;
//         background: transparent;
//         z-index: 10;
//       }
// .resizer-top {
//       height: 5px;
//       width: 100%;
//       top: 0;
//       cursor: n-resize;
//     }
//     .resizer-left {
//       width: 5px;
//       height: 100%;
//       left: 0;
//       cursor: w-resize;
//     }
//     .resizer-top-left {
//       width: 10px;
//       height: 10px;
//       top: 0;
//       left: 0;
//       cursor: nw-resize;
//     }
//     .resizer-top-right {
//       width: 10px;
//       height: 10px;
//       top: 0;
//       right: 0;
//       cursor: ne-resize;
//     }
//     .resizer-bottom-left {
//       width: 10px;
//       height: 10px;
//       bottom: 0;
//       left: 0;
//       cursor: sw-resize;
//     }
//     .resizer-right {
//       width: 5px;
//       height: 100%;
//       right: 0;
//       cursor: e-resize;
//     }
//     .resizer-bottom {
//       height: 5px;
//       width: 100%;
//       bottom: 0;
//       cursor: s-resize;
//     }
//     .resizer-both {
//       width: 10px;
//       height: 10px;
//       right: 0;
//       bottom: 0;
//       cursor: se-resize;
//     } 
// .resizer-top, .resizer-left, .resizer-top-left, .resizer-top-right, .resizer-bottom-left {
//   z-index: 100; /* Asegura que los resizers estén por encima del contenido del diálogo */
// }             
//     `,
//   ];


//   firstUpdated() {
//     this.initResizeElement();
//     this.initDragElement();
//   }

//   render() {
//     return html`
//       <md-dialog id="new-dialog">
//         <div slot="headline" class="popup-header">
//             <slot name="icon1" style="margin-right: 5px;"></slot>
// <div class="corner" @click=${this.minimize}>Expand</div>
// <div class="corner" @click=${this.zoomOut}>Zoom</div>
// <div class="corner" dialogAction="decline" @click=${this.close}>Close</div>
            
//         </div>
//         <form slot="content" id="form-id" method="dialog">    
//         <slot name="content"></slot> 
//         </form>
//         <div slot="actions">
//             ${this.showCloseButton 
//             ? html`<md-text-button form="form-id" @click="${this.close}">close</md-text-button>` 
//             : ''}

//             ${this.showDoButton 
//                 ? html`<md-text-button form="form-id" @click="${this.doAction}">Do</md-text-button>` 
//                 : ''}
//           <slot name="ad-hoc-buttons"></slot> <!-- Slot para botones adicionales -->
//         </div>
//         <!-- Resizers -->
//         <div class="resizer-top"></div>
//         <div class="resizer-left"></div>
//         <div class="resizer-top-left"></div>
//         <div class="resizer-top-right"></div>
//         <div class="resizer-bottom-left"></div>
//         <div class="resizer-right"></div>
//         <div class="resizer-bottom"></div>
//         <div class="resizer-both"></div>
//       </md-dialog>
//     `;
//   }  
//   show() {
//     const dialog = this.shadowRoot.querySelector('md-dialog');
//     if (dialog) {
//       const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
//       if (dialogSurface) {
//           dialogSurface.style.width = '600px'; // Ancho inicial deseado
//           dialogSurface.style.height = '400px'; // Altura inicial deseada
//           dialogSurface.style.top = '50%'; // Posición inicial deseada
//           dialogSurface.style.left = '50%'; // Posición inicial deseada
//           dialogSurface.style.transform = 'translate(-50%, -50%)'; // Centrar el diálogo
//       }
//       dialog.show(); // Mostrar el diálogo usando el método nativo de `md-dialog`
//     } else {
//       console.error('md-dialog element not found');
//     }
//   }
  

//   close() {
//     const dialog = this.shadowRoot.querySelector('md-dialog');
//     if (dialog) {
//       dialog.close(); // Cerrar el diálogo usando el método nativo de `md-dialog`
//     } else {
//       console.error('md-dialog element not found');
//     }
//   }

//   minimize() {
//     const dialogSurface = this.shadowRoot.querySelector('md-dialog'); // Asegúrate de seleccionar el md-dialog
//     if (!dialogSurface) return;

//     this.dialogShape = "5px";
//     dialogSurface.style.minWidth = "auto";
//     dialogSurface.style.height = "auto";
//     dialogSurface.style.overflow = "hidden"; // Asegúrate de manejar el overflow correctamente

//     if (this.expandLabel === "expand_more") {
//         dialogSurface.style.top = "45vh";
//         dialogSurface.style.height = "0";
//         this.expandLabel = "expand_less";
//     } else {
//         dialogSurface.style.top = "0";
//         dialogSurface.style.height = "auto";
//         this.expandLabel = "expand_more";
//     }
// }
// zoomOut() {
//     const dialogSurface = this.shadowRoot.querySelector('md-dialog'); // Asegúrate de seleccionar el md-dialog
//     if (!dialogSurface) return;

//     if (this.zoomLabel === "zoom_out_map") {
//         this.top = dialogSurface.style.top;
//         this.left = dialogSurface.style.left;
//         this.width = dialogSurface.style.width;
//         this.height = dialogSurface.style.height;
        
//         this.dispatchEvent(new CustomEvent("zoom-out"));

//         this.dialogShape = "0px";
//         dialogSurface.style.height = "100vh";
//         dialogSurface.style.top = "0px";
//         dialogSurface.style.left = "0px";
//         dialogSurface.style.minWidth = "100vw";
//         this.zoomLabel = "zoom_in_map";
//         this.expandLabel = "expand_more";
//     } else {
//         this.dispatchEvent(new CustomEvent("zoom-in"));

//         dialogSurface.style.minWidth = "auto";
//         this.dialogShape = "5px";
//         dialogSurface.style.height = "auto";
//         dialogSurface.style.top = this.top;
//         dialogSurface.style.left = this.left;
//         dialogSurface.style.width = this.width;
//         dialogSurface.style.height = this.height;
//         this.zoomLabel = "zoom_out_map";
//     }
// }

// initDragElement() {
//     const dialog = this.shadowRoot.querySelector('md-dialog');
//     if (!dialog) return;
  
//     const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
//     if (!dialogSurface) return; // Verificación adicional para evitar errores
  
//     const header = this.shadowRoot.querySelector('.popup-header');
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
//     if (header) {
//       header.onmousedown = dragMouseDown;
//     }
  
//     function dragMouseDown(e) {
//       e.preventDefault();
//       e.stopPropagation();
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//       document.onmouseup = closeDragElement;
//       document.onmousemove = elementDrag;
//     }
  
//     function elementDrag(e) {
//       if (!dialogSurface) return; // Verificación adicional para evitar errores
//       e.preventDefault();
//       dialogSurface.style.top = (dialogSurface.offsetTop - (pos4 - e.clientY)) + "px";
//       dialogSurface.style.left = (dialogSurface.offsetLeft - (pos3 - e.clientX)) + "px";
//       pos3 = e.clientX;
//       pos4 = e.clientY;
//     }
  
//     function closeDragElement() {
//       document.onmouseup = null;
//       document.onmousemove = null;
//     }
//   }
  
//   initResizeElement() {
//     const dialog = this.shadowRoot.querySelector('md-dialog');
//     if (!dialog) return;
  
//     const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
//     if (!dialogSurface) return; // Verificación adicional para evitar errores
  
//     const resizers = this.shadowRoot.querySelectorAll('.resizer-top, .resizer-left, .resizer-right, .resizer-bottom, .resizer-top-left, .resizer-top-right, .resizer-bottom-left, .resizer-both');
//     let startX, startY, startWidth, startHeight;
  
//     resizers.forEach(resizer => {
//       resizer.addEventListener('mousedown', (e) => initDrag(e, resizer), false);
//     });
  
//     const initDrag = (e, resizer) => {
//       startX = e.clientX;
//       startY = e.clientY;
//       startWidth = parseInt(document.defaultView.getComputedStyle(dialogSurface).width, 10);
//       startHeight = parseInt(document.defaultView.getComputedStyle(dialogSurface).height, 10);
  
//       const doDrag = (e) => {
//         if (resizer.classList.contains('resizer-right') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-right') || resizer.classList.contains('resizer-bottom-right')) {
//           dialogSurface.style.width = startWidth + (e.clientX - startX) + 'px';
//         }
//         if (resizer.classList.contains('resizer-bottom') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-bottom-left') || resizer.classList.contains('resizer-bottom-right')) {
//           dialogSurface.style.height = startHeight + (e.clientY - startY) + 'px';
//         }
//         if (resizer.classList.contains('resizer-left') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-left') || resizer.classList.contains('resizer-bottom-left')) {
//           dialogSurface.style.width = startWidth - (e.clientX - startX) + 'px';
//           dialogSurface.style.left = dialogSurface.offsetLeft + (e.clientX - startX) + 'px';
//         }
//         if (resizer.classList.contains('resizer-top') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-left') || resizer.classList.contains('resizer-top-right')) {
//           dialogSurface.style.height = startHeight - (e.clientY - startY) + 'px';
//           dialogSurface.style.top = dialogSurface.offsetTop + (e.clientY - startY) + 'px';
//         }
//       };
  
//       const stopDrag = () => {
//         document.documentElement.removeEventListener('mousemove', doDrag, false);
//         document.documentElement.removeEventListener('mouseup', stopDrag, false);
//       };
  
//       document.documentElement.addEventListener('mousemove', doDrag, false);
//       document.documentElement.addEventListener('mouseup', stopDrag, false);
//     };
//   }
  
//   doAction() {
//     this.dispatchEvent(new CustomEvent('do-action'));
//   }   
 
// }

// //customElements.define('tr-dialog', TrDialog);
