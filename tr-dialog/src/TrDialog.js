import { html, css, LitElement } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@spectrum-web-components/button/sp-button';

export class TrDialog extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      mwc-dialog {
        --mdc-dialog-heading-ink-color: blue;
        --mdc-typography-headline6-font-size: 35px;
      }
      .content {
        opacity: 0.9;
      }
      .content * {
        margin: 5px 0;
      }
      sp-button[hidden] {
        display: none;
      }
      mwc-icon.corner {
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      `
    ];
  }

  render() {
    return html`
    <style>
      mwc-dialog {
        --mdc-dialog-min-width: ${this.dialogWidth};
        --mdc-shape-medium: ${this.dialogShape};
      }
    </style>
    <mwc-dialog id="${this.name}" 
      @opening=${()=>this.dispatchEvent(new CustomEvent("opening"))}
      @opened=${()=>this.dispatchEvent(new CustomEvent("opened"))} 
      @closing=${()=>this.dispatchEvent(new CustomEvent("closing"))}
      @closed=${()=>this.dispatchEvent(new CustomEvent("closed"))}
      heading="${this.title}"
      scrimClickAction=""
      hideActions="">
      <div class="content layout vertical flex center-justified">
        ${this.dialogContent()}
        <div style="margin-top:20px">
          <sp-button ?hidden=${this.hideCancel} size="xl" variant="secondary" dialogAction="decline">${this.cancelTitle}</sp-button>
          <sp-button ?hidden=${this.hideAccept} size="xl" @click=${()=>this.dispatchEvent(new CustomEvent('accept'))}>${this.acceptTitle}</sp-button>
        </div>
        ${this.dialogFooter()}
      </div>
      <div style="position: absolute; top: 10px; right: 10px;">
        <mwc-icon class="corner" @click=${this.minimize}>${this.expandLabel}</mwc-icon>
        <mwc-icon class="corner" @click=${this.zoomOut}>${this.zoomLabel}</mwc-icon>
        <mwc-icon class="corner" dialogAction="decline">close</mwc-icon>
      </div>
    </mwc-dialog>
    `;
  }

  minimize() {
    this.dialogWidth = "auto";
    this.dialogShape = "5px";
    this.dialogSurface.style.height = "auto";
    this.mdcDialog.style.height = "100%";
    this.mdcScrim.style.height = "100%";
    this.zoomLabel = "zoom_out_map"

    if (this.expandLabel == "expand_more") {
      this.dialogSurface.style.top = "45vh";
      this.dialogSurface.style.height = "0";
      this.expandLabel = "expand_less";
    } else {
      this.dialogSurface.style.top = "0";
      this.dialogSurface.style.height = "auto";
      this.expandLabel = "expand_more";
    }
  }

  zoomOut() {
    this.dialogSurface.style.top = "0";
    if (this.zoomLabel == "zoom_out_map") {
      this.dialogWidth = "100vw";
      this.dialogShape = "0px";
      this.dialogSurface.style.height = "100vh";
      this.mdcDialog.style.height = "auto";
      this.mdcScrim.style.height = "auto";
      this.zoomLabel = "zoom_in_map"
      this.expandLabel = "expand_more";
    } else {
      this.dialogWidth = "auto";
      this.dialogShape = "5px";
      this.dialogSurface.style.height = "auto";
      this.mdcDialog.style.height = "100%";
      this.mdcScrim.style.height = "100%";
      this.zoomLabel = "zoom_out_map"
    }
  }

  dialogContent() {}
  dialogFooter() {}

  get dialog() {
    return this.shadowRoot.querySelector("mwc-dialog#"+ this.name)
  }

  get mdcDialog() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog")
  }

  get mdcScrim() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__scrim")
  }

  get dialogSurface() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  static get properties() {
    return {
      name: { type: String }, // the unique dialog name (as element id reference)
      title: { type: String }, // the dialog header
      hideAccept: { type: Boolean }, // should hide the accept button
      hideCancel: { type: Boolean }, // should hide the cancel button
      acceptTitle: { type: String }, // the accept button label
      cancelTitle: { type: String }, // the cancel button label
      dialogWidth: { type: String },
      dialogShape: { type: String },
      zoomLabel: { type: String },
      expandLabel: { type: String }
    };
  }

  constructor() {
    super();
    this.name = "dialog-"+ new Date().getTime()
    this.title = "My Dialog"
    this.hideAccept = false
    this.hideCancel = false
    this.acceptTitle = "Accept"
    this.cancelTitle = "Cancel"
    this.dialogWidth = "auto"
    this.dialogShape = "5px"
    this.zoomLabel = "zoom_out_map"
    this.expandLabel = "expand_more"
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.dialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.dialogSurface.style.backgroundSize = "cover";
      this.dialogSurface.style.backgroundRepeat = "no-repeat";
      this.dialogSurface.style.textAlign = "center";
      this.dialogSurface.style.padding = "20px";
      this.dialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
    })
  }

  updated(updates) {
    // if (updates.has('name')) {
    //   this.dialogId = this.name +"-"+ new Date().getTime()
    // }
  }

  show() {
    this.dialog.show()
  }
}
