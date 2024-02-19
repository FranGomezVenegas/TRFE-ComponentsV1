import { html } from 'lit-element';
import '@material/mwc-icon';
import "@material/mwc-textfield";

export const template = (props, label) => {
    if (props.activeOptions===undefined){ props.activeOptions=[]}
    if (props.allowAdhocEntries===undefined){ props.allowAdhocEntries=false}
    if (props.searchOptions===undefined){ props.searchOptions=[]}
    return html`
    <div>
        <label>
            ${label}
        </label>
        <div class="sellect-container">
            <div class="sellect-destination-list">
                ${props.activeOptions.map((option, i) => html `
                    <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${() => props.removeActiveOption(i)}> close </mwc-icon> </span>
                `)}
            </div>
            ${props.allowAdhocEntries ? html `
            <mwc-textfield @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"multiselect"}  @change=${(e) => props.pressEnter(e) }></mwc-textfield>
            ` : html `
            <mwc-textfield @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"multiselect"}></mwc-textfield>
            `}
            <div class="sellect-origin-list ${props.open ? "open" : ""}">
                ${props.searchOptions.map((option, i) => html `
                    <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${() => props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
                `)}
            </div>
            <mwc-icon class="sellect-arrow-icon" @click=${() => props.setOpen()}> arrow_drop_down </mwc-icon>
        </div>
    </div>
    `;
};
