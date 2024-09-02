import { html } from 'lit';
//import { langConfig, commonLangConfig } from './config'; // Importar las configuraciones de idioma y otras si es necesario
import { commonLangConfig } from '@trazit/common-core';

export const mapWithIconsTemplate = function(langConfig) {
  if (this.samplePoints===undefined||this.samplePoints.length===0){return html``}
  return html`
    <div class="layout horizontal flex wrap">
      <div class="layout flex">
        <h1>${langConfig.title["label_"+this.lang]}</h1>
        <div class="mapWrap">
          <img class="mapImg" src="${this.mapUrl}" @click=${this.handleMapClickForMapPosition}>
          ${this.samplePoints && this.samplePoints.map(point => 
            html`<img class="mapIcon" 
                src="${point.map_icon}" 
                style="top:${point.map_icon_top};left:${point.map_icon_left};width:${point.map_icon_w}px;height:${point.map_icon_h}px"
                @mouseover=${this.actionOnHoverTheIcon ? () => this.selectedItems=[point] : null}
                @click=${this.actionOnClickTheIcon ? () => this.selectedItems=[point] : null}                            
              >`
          )}
        </div>
      </div>
      ${this.pointTemplate()}
    </div>
  `;
}

export const pointTemplate = function(langConfig) {
  return html`
    <tr-dialog id="pointDialog" .open=${this.selectedItems && this.selectedItems.length}
      @closed=${e => {if(e.target === this.pointDialog) this.selectedItems=[]}}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div class="layout horizontal justified flex">
          <sp-button size="m" variant="secondary" dialogAction="close">
            ${commonLangConfig.closeDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="m" @click=${this.setLogSample}>${langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
        </div>
        <mwc-select label="${langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
          ${langConfig.fieldText.shift.items.map((c, i) => 
            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
          )}
        </mwc-select>
        <mwc-select label="${langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
          ${langConfig.fieldText.lot.items.map((c, i) => 
            html`<mwc-list-item value="${c.lot_name}" ?selected=${i == 0}>${c.lot_name}</mwc-list-item>`
          )}
        </mwc-select>
        ${this.selectedItems.length && this.selectedItems[0].card_info.map(f => 
          html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
        )}
      </div>
    </tr-dialog>
  `;
}
