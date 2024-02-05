import { html } from 'lit-element';
import '@material/mwc-icon';

export const template = (props) => {
    return html`    
        <div style="display:flex; flex-direction:row; gap:12px;">
            <table class="dragdropable TRAZiT-DefinitionArea" style="width: 400px;"> 
                <thead>
                        ${props.data.tableDefinition.columns.map((column, i) => html`
                            <th>${column.label_en}</th>
                        `)}
                    <tr>
                </thead>
                <tbody>
                    ${props.data.tableData.map((data, i) => html`
                    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e)}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>
                    `)}
                </tbody>
            </table>
            <table class="dragdropable TRAZiT-DefinitionArea" style="width: 400px;"> 
                <thead>
                        ${props.data.tableDefinition.columns.map((column, i) => html`
                            <th>${column.label_en}</th>
                        `)}
                    <tr>
                </thead>
                <tbody>
                    ${props.data.tableData.map((data, i) => html`
                    <tr class="dragdropabletr" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e)}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>
                    `)}
                </tbody>
            </table>
        </div>
    `;
};


