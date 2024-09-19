import { LitElement, html, css } from 'lit';
import '@material/web/dialog/dialog.js';
import '@material/web/icon/icon.js';
import '@material/web/button/text-button';
export class CustomMdDialog extends LitElement {
    static properties = {
        showCloseButton: { type: Boolean },
        showDoButton: { type: Boolean },
      };    
  static styles = [
    css`
      :host {
        display: block;
      }
      md-dialog {
        display: none; /* Asegura que el diálogo esté oculto inicialmente */
      }
      md-dialog[open] {
        display: block; /* Mostrar solo cuando esté abierto */
      }
      .resizer-top, .resizer-left, .resizer-top-left, .resizer-top-right, .resizer-bottom-left {
        position: absolute;
        background: transparent;
        z-index: 10;
      }
.resizer-top {
      height: 5px;
      width: 100%;
      top: 0;
      cursor: n-resize;
    }
    .resizer-left {
      width: 5px;
      height: 100%;
      left: 0;
      cursor: w-resize;
    }
    .resizer-top-left {
      width: 10px;
      height: 10px;
      top: 0;
      left: 0;
      cursor: nw-resize;
    }
    .resizer-top-right {
      width: 10px;
      height: 10px;
      top: 0;
      right: 0;
      cursor: ne-resize;
    }
    .resizer-bottom-left {
      width: 10px;
      height: 10px;
      bottom: 0;
      left: 0;
      cursor: sw-resize;
    }
    .resizer-right {
      width: 5px;
      height: 100%;
      right: 0;
      cursor: e-resize;
    }
    .resizer-bottom {
      height: 5px;
      width: 100%;
      bottom: 0;
      cursor: s-resize;
    }
    .resizer-both {
      width: 10px;
      height: 10px;
      right: 0;
      bottom: 0;
      cursor: se-resize;
    } 
.resizer-top, .resizer-left, .resizer-top-left, .resizer-top-right, .resizer-bottom-left {
  z-index: 100; /* Asegura que los resizers estén por encima del contenido del diálogo */
}             
    `,
  ];


  firstUpdated() {
    this.initResizeElement();
    this.initDragElement();
  }

  render() {
    return html`
      <md-dialog id="new-dialog">
        <div slot="headline" class="popup-header">
            <slot name="icon1" style="margin-right: 5px;"></slot>
<div class="corner" @click=${this.minimize}>Expand</div>
<div class="corner" @click=${this.zoomOut}>Zoom</div>
<div class="corner" dialogAction="decline" @click=${this.close}>Close</div>
            
        </div>
        <form slot="content" id="form-id" method="dialog">    
        <slot name="content"></slot> 
        </form>
        <div slot="actions">
            ${this.showCloseButton 
            ? html`<md-text-button form="form-id" @click="${this.close}">close</md-text-button>` 
            : ''}

            ${this.showDoButton 
                ? html`<md-text-button form="form-id" @click="${this.doAction}">Do</md-text-button>` 
                : ''}
          <slot name="ad-hoc-buttons"></slot> <!-- Slot para botones adicionales -->
        </div>
        <!-- Resizers -->
        <div class="resizer-top"></div>
        <div class="resizer-left"></div>
        <div class="resizer-top-left"></div>
        <div class="resizer-top-right"></div>
        <div class="resizer-bottom-left"></div>
        <div class="resizer-right"></div>
        <div class="resizer-bottom"></div>
        <div class="resizer-both"></div>
      </md-dialog>
    `;
  }  
  show() {
    const dialog = this.shadowRoot.querySelector('md-dialog');
    if (dialog) {
      const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
      if (dialogSurface) {
          dialogSurface.style.width = '600px'; // Ancho inicial deseado
          dialogSurface.style.height = '400px'; // Altura inicial deseada
          dialogSurface.style.top = '50%'; // Posición inicial deseada
          dialogSurface.style.left = '50%'; // Posición inicial deseada
          dialogSurface.style.transform = 'translate(-50%, -50%)'; // Centrar el diálogo
      }
      dialog.show(); // Mostrar el diálogo usando el método nativo de `md-dialog`
    } else {
      console.error('md-dialog element not found');
    }
  }
  

  close() {
    const dialog = this.shadowRoot.querySelector('md-dialog');
    if (dialog) {
      dialog.close(); // Cerrar el diálogo usando el método nativo de `md-dialog`
    } else {
      console.error('md-dialog element not found');
    }
  }

  minimize() {
    const dialogSurface = this.shadowRoot.querySelector('md-dialog'); // Asegúrate de seleccionar el md-dialog
    if (!dialogSurface) return;

    this.dialogShape = "5px";
    dialogSurface.style.minWidth = "auto";
    dialogSurface.style.height = "auto";
    dialogSurface.style.overflow = "hidden"; // Asegúrate de manejar el overflow correctamente

    if (this.expandLabel === "expand_more") {
        dialogSurface.style.top = "45vh";
        dialogSurface.style.height = "0";
        this.expandLabel = "expand_less";
    } else {
        dialogSurface.style.top = "0";
        dialogSurface.style.height = "auto";
        this.expandLabel = "expand_more";
    }
}
zoomOut() {
    const dialogSurface = this.shadowRoot.querySelector('md-dialog'); // Asegúrate de seleccionar el md-dialog
    if (!dialogSurface) return;

    if (this.zoomLabel === "zoom_out_map") {
        this.top = dialogSurface.style.top;
        this.left = dialogSurface.style.left;
        this.width = dialogSurface.style.width;
        this.height = dialogSurface.style.height;
        
        this.dispatchEvent(new CustomEvent("zoom-out"));

        this.dialogShape = "0px";
        dialogSurface.style.height = "100vh";
        dialogSurface.style.top = "0px";
        dialogSurface.style.left = "0px";
        dialogSurface.style.minWidth = "100vw";
        this.zoomLabel = "zoom_in_map";
        this.expandLabel = "expand_more";
    } else {
        this.dispatchEvent(new CustomEvent("zoom-in"));

        dialogSurface.style.minWidth = "auto";
        this.dialogShape = "5px";
        dialogSurface.style.height = "auto";
        dialogSurface.style.top = this.top;
        dialogSurface.style.left = this.left;
        dialogSurface.style.width = this.width;
        dialogSurface.style.height = this.height;
        this.zoomLabel = "zoom_out_map";
    }
}

initDragElement() {
    const dialog = this.shadowRoot.querySelector('md-dialog');
    if (!dialog) return;
  
    const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
    if (!dialogSurface) return; // Verificación adicional para evitar errores
  
    const header = this.shadowRoot.querySelector('.popup-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    if (header) {
      header.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      if (!dialogSurface) return; // Verificación adicional para evitar errores
      e.preventDefault();
      dialogSurface.style.top = (dialogSurface.offsetTop - (pos4 - e.clientY)) + "px";
      dialogSurface.style.left = (dialogSurface.offsetLeft - (pos3 - e.clientX)) + "px";
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
  initResizeElement() {
    const dialog = this.shadowRoot.querySelector('md-dialog');
    if (!dialog) return;
  
    const dialogSurface = dialog.shadowRoot.querySelector('.mdc-dialog__surface');
    if (!dialogSurface) return; // Verificación adicional para evitar errores
  
    const resizers = this.shadowRoot.querySelectorAll('.resizer-top, .resizer-left, .resizer-right, .resizer-bottom, .resizer-top-left, .resizer-top-right, .resizer-bottom-left, .resizer-both');
    let startX, startY, startWidth, startHeight;
  
    resizers.forEach(resizer => {
      resizer.addEventListener('mousedown', (e) => initDrag(e, resizer), false);
    });
  
    const initDrag = (e, resizer) => {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(dialogSurface).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(dialogSurface).height, 10);
  
      const doDrag = (e) => {
        if (resizer.classList.contains('resizer-right') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-right') || resizer.classList.contains('resizer-bottom-right')) {
          dialogSurface.style.width = startWidth + (e.clientX - startX) + 'px';
        }
        if (resizer.classList.contains('resizer-bottom') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-bottom-left') || resizer.classList.contains('resizer-bottom-right')) {
          dialogSurface.style.height = startHeight + (e.clientY - startY) + 'px';
        }
        if (resizer.classList.contains('resizer-left') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-left') || resizer.classList.contains('resizer-bottom-left')) {
          dialogSurface.style.width = startWidth - (e.clientX - startX) + 'px';
          dialogSurface.style.left = dialogSurface.offsetLeft + (e.clientX - startX) + 'px';
        }
        if (resizer.classList.contains('resizer-top') || resizer.classList.contains('resizer-both') || resizer.classList.contains('resizer-top-left') || resizer.classList.contains('resizer-top-right')) {
          dialogSurface.style.height = startHeight - (e.clientY - startY) + 'px';
          dialogSurface.style.top = dialogSurface.offsetTop + (e.clientY - startY) + 'px';
        }
      };
  
      const stopDrag = () => {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
      };
  
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    };
  }
  
  doAction() {
    this.dispatchEvent(new CustomEvent('do-action'));
  }   
 
}

customElements.define('custom-md-dialog', CustomMdDialog);
