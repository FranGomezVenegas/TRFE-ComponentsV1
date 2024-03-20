import { html } from 'lit-element';
import '@material/mwc-icon';
import "@material/mwc-textfield";

export const template = (props, label) => {
    if (props.activeOptions===undefined){ props.activeOptions=[]}
    if (props.allowAdhocEntries===undefined){ props.allowAdhocEntries=false}
    if (props.searchOptions===undefined){ props.searchOptions=[]}
    const filteredOptions = props.searchOptions.filter(option => !props.activeOptions.includes(option));
    const uniqueFilteredOptions = [...new Set(filteredOptions)];
    return html`
    <div>
        <div class="sellect-container" @click=${(e) => props.clickContainer(e)} style=${props.clickedContainer ? "background-color:white;" : ""} @focusout=${() => props.inputFocusOut()}>
            <div class="sellect-destination-list">
                ${props.activeOptions.map((option, i) => html `

                    <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${() => props.removeActiveOption(i)}> close </mwc-icon> </span>
                `)}
            </div>
            <label class=${props.clickedContainer ? "second" : "first"}> ${label} </label>
            ${props.allowAdhocEntries ? html `
            <input class="sellect-element" @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}  @change=${(e) => props.pressEnter(e) }></input>
            ` : html `
            <input class="sellect-element" @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}> </input>
            `}
            <div class="sellect-origin-list ${!props.open ? "" : "open"}">
                ${uniqueFilteredOptions.map((option, i) => html`
                    <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${() => props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
                `)}
            </div>
            <mwc-icon class="sellect-arrow-icon" @click=${(e) => props.setOpen(e)}> arrow_drop_down </mwc-icon>
        </div>
    </div>
    `;
};
