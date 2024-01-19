import { html } from 'lit-element';
import '@material/mwc-icon';
export const template = (props) => {
    return html`
    <div class="sellect-container">
        <div class="sellect-destination-list">
            ${props.activeOptions.map((option, i) => html `
                <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${() => props.removeActiveOption(i)}> close </mwc-icon> </span>
            `)}
        </div>
        <input type="text" id="my-element" class="sellect-element"  @keyup=${(e) => props.setSearchResultOptions(e)} @click=${() => props.setOpenTrue()}>
        <div class="sellect-origin-list ${props.open ? "open" : ""}">
            ${props.searchOptions.map((option, i) => html `
                <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${() => props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
            `)}
        </div>
        
        <mwc-icon class="sellect-arrow-icon" @click=${() => props.setOpen()}> arrow_drop_down </mwc-icon>
    </div>
    `;
};
