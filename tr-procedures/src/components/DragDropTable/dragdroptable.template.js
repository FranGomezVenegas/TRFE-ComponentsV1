import { html } from 'lit-element';
import '@material/mwc-icon';

export const template = (props) => {
    return html`    
        <div style="display:flex; flex-direction:row; gap:12px;">
        ${props.data.tableData.map((taData, ii) => html`
            <table class="dragdropable TRAZiT-DefinitionArea" style="width: 400px;"> 
                <thead>
                        ${props.data.tableDefinition.columns.map((column, i) => html`
                            <th>${column.label_en}</th>
                        `)}
                    <tr>
                </thead>
                <tbody>
                    ${taData.map((data, index) => 
                    props.data.tableDefinition.dragEnable[ii] && props.data.tableDefinition.dropEnable[ii] ? html `
                    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)} @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>` :
                    props.data.tableDefinition.dropEnable[ii] ? html `
                    <tr class="dragdropabletr" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>
                    <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr> ` : 
                    props.data.tableDefinition.dragEnable[ii] ? html `
                    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>` : html `
                    <tr class="dragdropabletr undropable" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.unavaiableToDrop()}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>`)}
                </tbody>
            </table>
        `)}
        </div>
    `;
};


