import { html } from 'lit-element';
export const template = (props) => {
    return html`
    <div class="sellect-container">
        <div class="sellect-destination-list">
            ${props.activeOptions.map((option, i) => html `
                <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} <i class="fa fa-times sellect-close-icon" @click=${() => props.removeActiveOption(i)}> * </i> </span>
            `)}
        </div>
        <input type="text" id="my-element" class="sellect-element"  @keyup=${(e) => props.setSearchResultOptions(e)} @click=${() => props.setOpenTrue()}>
        <div class="sellect-origin-list ${props.open ? "open" : ""}">
            ${props.searchOptions.map((option, i) => html `
                <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${() => props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
            `)}
        </div>
        <i class="fa fa-chevron-down sellect-arrow-icon" @click=${() => props.setOpen()}> * </i>
    </div>
    `;
};
