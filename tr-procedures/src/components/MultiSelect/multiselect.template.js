import { html } from 'lit-element';
import '@material/mwc-icon';
import "@material/mwc-textfield";

export const template = (props, label) => {
    if (props.activeOptions===undefined){ 
        props.activeOptions=[]
    } else if (typeof props.activeOptions === 'string') {
        // Split the string into an array using the pipe '|' as a delimiter
        props.activeOptions = props.activeOptions.split('|');
    }
    if (!Array.isArray(props.activeOptions)) {
        props.activeOptions = [];
    }
    if (props.options===undefined){ 
        props.options=[]
    } else if (typeof props.options === 'string') {
        // Split the string into an array using the pipe '|' as a delimiter
        props.options = props.options.split('|');
    }
    if (!Array.isArray(props.options)) {
        props.options = [];
    }
    if (props.allowAdhocEntries===undefined){ props.allowAdhocEntries=false}
    //if (props.options===undefined){ props.options=[]}
    if (props.readOnly===undefined){ props.readOnly=false}
    if (props.displayLabel===undefined){ props.displayLabel=true}
    if (props.readOnly===true){props.clickedContainer= true}
    
    const filteredOptions = props.options.filter(option => !props.activeOptions.includes(option));
    const uniqueFilteredOptions = [...new Set(filteredOptions)];
    return html`
    <div>
    ${props.readOnly===true? html`
    <div class="sellect-container-readonly" @click=${(e) => props.clickContainer(e)} style=${props.clickedContainer ? "background-color:transparent;" : ""} @focusout=${() => props.inputFocusOut()}>
        ${props.displayLabel===false? html``:html`
            <label class=${props.clickedContainer ? "second" : "first"}> ${label} </label>
        `}                
        <div class="sellect-destination-list">
        ${props.activeOptions.map((option, i) => html `
            <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
            ${props.readOnly===true? html``:html`
                <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${() => props.removeActiveOption(i)}> close </mwc-icon> </span>
            `}
        `)}
        </div>
        </div>
    `:html`
        <div class="sellect-container" @click=${(e) => props.clickContainer(e)} style=${props.clickedContainer ? "background-color:transparent;" : ""} @focusout=${() => props.inputFocusOut()}>
            <div class="sellect-destination-list">
                ${props.activeOptions.map((option, i) => html `
                    <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
                    ${props.readOnly===true? html``:html`
                        <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${() => props.removeActiveOption(i)}> close </mwc-icon> </span>
                    `}
                `)}
            </div>
            ${props.displayLabel===false? html``:html`
                <label class=${props.clickedContainer ? "second" : "first"}> ${label} </label>
                ${props.allowAdhocEntries ? html `
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}  @change=${(e) => props.pressEnter(e) }></input>
                ` : html `
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${() => props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}> </input>
                `}
            `}
            ${props.readOnly===true? html``:html`
            <div class="sellect-origin-list ${!props.open ? "" : "open"}">
                ${uniqueFilteredOptions.map((option, i) => html`
                    <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${() => props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
                `)}
            </div>
            `}
            ${props.readOnly===true? html``:html`
                <mwc-icon class="sellect-arrow-icon" @click=${(e) => props.setOpen(e)}> arrow_drop_down </mwc-icon>
            `}
        </div>
    `}
    </div>
    `;
};
