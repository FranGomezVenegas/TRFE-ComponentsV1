import { html, css } from 'lit';
import { cssClasses } from '@material/dialog/constants';
import { classMap } from 'lit/directives/class-map.js';
import { Dialog } from '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon';

export class TrDialog extends Dialog {
  static get styles() {
    return [
      super.styles,
      css`
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
      `
    ];
  }

  render() {
    const classes = {
      [cssClasses.STACKED]: this.stacked,
    };
    let heading = html``;
    if (this.heading) {
      heading = this.renderHeading();
    }
    const actionsClasses = {
      'mdc-dialog__actions': !this.hideActions,
    };
    return html`
    <style>
      :host {
        --mdc-shape-medium: ${this.dialogShape};
        --mdc-dialog-z-index: ${this.zIndex};
      }
    </style>
    <div class="mdc-dialog ${classMap(classes)}" role="alertdialog" aria-modal="true" aria-labelledby="title"
      aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface" style="top: 0px; left: 0px">
          ${heading}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer id="actions" class="${classMap(actionsClasses)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
              <slot name="primaryAction"></slot>
            </span>
          </footer>
          ${this.cornerButton()}
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`;
  }

  get mdcDialog() {
    return this.shadowRoot.querySelector(".mdc-dialog")
  }

  get mdcScrim() {
    return this.shadowRoot.querySelector(".mdc-dialog__scrim")
  }

  get dialogSurface() {
    return this.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get dialogContent() {
    return this.shadowRoot.querySelector("#content")
  }

  get dialogHeader() {
    return this.shadowRoot.querySelector(".popup-header");
  }

  static get properties() {
    return {
      dialogShape: { type: String },
      zoomLabel: { type: String },
      expandLabel: { type: String },
      hideMin: { type: Boolean, reflect: true },
      hideZoom: { type: Boolean, reflect: true },
      hideXtoClose: { type: Boolean, reflect: true },
      zIndex: { type: Number }
    };
  }

  constructor() {
    super();
    this.dialogShape = "5px"
    this.zoomLabel = "zoom_out_map"
    this.expandLabel = "expand_more"
    this.hideMin = false;
    this.hideZoom = false;
    this.hideXtoClose = false;
    this.top = "0px";
    this.left = "0px";
    this.width = "0px";
    this.height = "0px";
    this.zIndex = 7;
  }

  firstUpdated() {
    super.firstUpdated()
    this.shadowRoot.querySelector(".mdc-dialog__surface").style.padding = "20px"
    this.initialize();
  }

  initialize() {
    this.initResizeElement();
    this.initDragElement();
  }

  cornerButton() {
    //alert('hideXtoClose '+this.hideXtoClose)
    return html`
      <div class="popup-header" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 30px;">
        <div style="position: absolute; top: 10px; left: 10px;">
          <slot name="topLeft"></slot>
        </div>
        <div style="position: absolute; top: 10px; right: 10px;">
          <slot name="icon1" style="margin-right: 5px;"></slot>
          <mwc-icon ?hidden=${this.hideMin} class="corner" @click=${this.minimize}>${this.expandLabel}</mwc-icon>
          <mwc-icon ?hidden=${this.hideZoom} class="corner" @click=${this.zoomOut}>${this.zoomLabel}</mwc-icon>
          <mwc-icon ?hidden=${this.hideXtoClose} class="corner" dialogAction="decline">close</mwc-icon>
        </div>
      </div>
    `
  }

  show() {
    if (this.dialogContent!==undefined&&this.dialogContent!==null){
      this.dialogContent.style.overflow = "auto";
    }
    if (this.dialogSurface!==undefined&&this.dialogSurface!==null){
      this.dialogSurface.style.overflow = "auto";
      this.dialogSurface.style.top = "0";
      this.dialogSurface.style.height = "auto";
    }
      this.expandLabel = "expand_more";
    super.show()
  }

  initResizeElement() {
    let parentPopup = null;
    let resizer = null;

    let startX, startY, startWidth, startHeight;

    let right = document.createElement("div");
    right.className = "resizer-right";
    this.dialogSurface.appendChild(right);
    right.addEventListener("mousedown", initDrag, false);
    right.parentPopup = this.dialogSurface;

    let bottom = document.createElement("div");
    bottom.className = "resizer-bottom";
    this.dialogSurface.appendChild(bottom);
    bottom.addEventListener("mousedown", initDrag, false);
    bottom.parentPopup = this.dialogSurface;

    let both = document.createElement("div");
    both.className = "resizer-both";
    this.dialogSurface.appendChild(both);
    both.addEventListener("mousedown", initDrag, false);
    both.parentPopup = this.dialogSurface;

    function initDrag(e) {
      parentPopup = this.parentPopup;
      resizer = this;

      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(parentPopup).width,
        10
      );
      startHeight = parseInt(
        document.defaultView.getComputedStyle(parentPopup).height,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }

    function doDrag(e) {
      if(resizer.classList.contains('resizer-right') || resizer.classList.contains('resizer-both')) 
        parentPopup.style.width = startWidth + (e.clientX - startX) * 2 + "px";
      if(resizer.classList.contains('resizer-bottom') || resizer.classList.contains('resizer-both')) 
        parentPopup.style.height = startHeight + (e.clientY - startY) * 2 + "px";
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  initDragElement() {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let element = null;
    let currentZIndex = 100; //TODO reset z index when a threshold is passed
    
    this.dialogSurface.onmousedown = function() {
      this.style.zIndex = "" + ++currentZIndex;
    };

    if (this.dialogHeader) {
      this.dialogHeader.parentPopup = this.dialogSurface;
      this.dialogHeader.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      element = this.parentPopup;
      element.style.zIndex = "" + ++currentZIndex;
  
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      if (!element) {
        return;
      }
  
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.top = parseInt(element.style.top, 10) - pos2 + "px";
      element.style.left = parseInt(element.style.left, 10) - pos1 + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  minimize() {
    this.dialogSurface.style.minWidth = "auto";
    this.mdcDialog.style.minWidth = "auto";
    this.dialogShape = "5px";
    this.dialogSurface.style.height = "auto";
    this.mdcDialog.style.height = "100%";
    this.mdcScrim.style.height = "100%";
    this.zoomLabel = "zoom_out_map"

    if (this.expandLabel == "expand_more") {
      this.dialogContent.style.overflow = "hidden";
      this.dialogSurface.style.overflow = "hidden";
      this.dialogSurface.style.top = "45vh";
      this.dialogSurface.style.height = "0";
      this.expandLabel = "expand_less";
    } else {
      this.dialogContent.style.overflow = "auto";
      this.dialogSurface.style.overflow = "auto";
      this.dialogSurface.style.top = "0";
      this.dialogSurface.style.height = "auto";
      this.expandLabel = "expand_more";
    }
  }

  zoomOut() {
    if (this.zoomLabel == "zoom_out_map") {
      this.top = this.dialogSurface.style.top;
      this.left = this.dialogSurface.style.left;
      this.width = this.dialogSurface.style.width;
      this.height = this.dialogSurface.style.height;
      this.dispatchEvent(new CustomEvent("zoom-out"))
      this.dialogShape = "0px";
      this.dialogSurface.style.height = "100vh";
      this.dialogSurface.style.top = "0px";
      this.dialogSurface.style.left = "0px";
      this.mdcDialog.style.height = "auto";
      this.dialogSurface.style.minWidth = "100vw";
      this.mdcDialog.style.minWidth = "100vw";
      this.mdcScrim.style.height = "auto";
      this.zoomLabel = "zoom_in_map"
      this.expandLabel = "expand_more";
    } else {
      this.dispatchEvent(new CustomEvent("zoom-in"))
      this.dialogSurface.style.minWidth = "auto";
      this.mdcDialog.style.minWidth = "auto";
      this.dialogShape = "5px";
      this.dialogSurface.style.height = "auto";
      this.mdcDialog.style.height = "100%";
      this.mdcScrim.style.height = "100%";
      this.zoomLabel = "zoom_out_map"
      this.dialogSurface.style.top = this.top;
      this.dialogSurface.style.left = this.left;
      this.dialogSurface.style.width = this.width;
      this.dialogSurface.style.height = this.height;
    }
  }
}
