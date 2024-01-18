import { html } from 'lit-element';

export const template = (props) => {
    let cols = [], rows = [];
    for(let i = 0; i < props.data.cols; i++) {
        cols.push(i);
    }
    let letter = "A";
    for(let i = 0; i < props.data.rows; i++) {
        rows.push(String.fromCharCode(letter.charCodeAt(0) + (i)));
    }
    console.log("rows", rows);
    return html`
        <div style="width: fit-content; gap: 4px; display: flex; flex-direction: column;">
            <div style="display:flex; justify-content: space-between;"> 
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                    <div> COPY </div>
                    <div class="view-btn ${props.viewMode == 1 ? "active" : ""}" @click=${() => props.setViewMode(1)}> Box View </div>
                    <div class="view-btn ${props.viewMode == 2 ? "active" : ""}" @click=${() => props.setViewMode(2)}> List View </div>
                </div>
                <div class="accept-btn"> Accept </div>
            </div>
            <div class="box-content">
                <div class="row-content"> 
                    <div class="first-item"> </div>
                    ${cols.map((item, i) => html `
                    <div class="col-num"> ${item + 1} </div>
                    `)}
                </div>
                ${rows.map((item ,i) => html `
                <div class="row-content"> 
                    <div class="row-num"> ${item} </div>
                    ${cols.map((item1 ,j) => html `
                    <div class="box ${props.selectedIndex1 == item + (j + 1) ? "active" : ""}" @click=${() => props.setSelectBoxIndex(item + (j + 1), i * cols.length + (j + 1))}> 
                        <div class="data-view">
                            ${props.selectedIndex1 == item + (j + 1) ? "" : html `<div class="add-circle"> + </div>` }
                            
                        </div>
                        <div class="position">
                            <span> ${item + (j + 1)} </span>
                            <span> ${ i * cols.length + (j + 1) } </span>
                        </div>
                    </div>
                    `)}
                </div>
                `)}
                <div style="display:flex; justify-content: center;">
                    ${props.selectedIndex1 ? html `<div class="selected-cell-content"> Cell selected: ${props.selectedIndex1} </div>` : null} 
                </div>
                ${props.selectedIndex2 ? html `<div style="text-align: center"> ${props.selectedIndex2}:Sample box </div>` : null} 
            </div>
        </div>
    `;
};
