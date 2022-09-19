import { html, css } from 'lit';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

export function TabFunctions(base) {
    return class extends base {
        showTabElement(tabBtns){
            return html`
            <div class="layout flex">
            <div class="layout horizontal center">
              <mwc-icon-button class="slide" icon="navigate_before" @click=${this.prevTab} ?hidden=${!this.prev}>
              </mwc-icon-button>
              <div class="tabContainer layout horizontal flex center">
                <mwc-icon-button icon="refresh" @click=${this.resetView} ?disabled=${this.samplesReload}></mwc-icon-button>
                ${(tabBtns[this.procName]||tabBtns.default).map(t =>
                  html`<tab-element .lang=${this.lang} .tab=${t} @tab-rendered=${this.isScroll} @tab-change=${this.tabChanged} ?disabled=${this.samplesReload}></tab-element>`
                )}
              </div>
              <mwc-icon-button class="slide" icon="navigate_next" @click=${this.nextTab} ?hidden=${!this.next}>
              </mwc-icon-button>
            </div>
            </div>    
            `
        }
    }
}