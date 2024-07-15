import { html } from 'lit-element';

export const template = (props) => {
    if (props.viewModelFromProcModel === undefined || props.viewModelFromProcModel.view_definition === undefined) { return html``; }
    let index = 0;
    return html`
    <div class="container">
        ${props.viewModelFromProcModel === undefined || props.viewModelFromProcModel.title === undefined
        ? nothing
        : html`<span
            style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
            >${props.viewModelFromProcModel.title["fix_text_" + props.lang]}</span
            >`}
        ${props.viewModelFromProcModel.view_definition.map((elem) => html`  
            ${elem.type === "flipcard" ? html`
                <flip-card .lang=${props.lang} .config=${elem.config} .data=${elem.data}></flip-card>
            ` : nothing}
        `)}  
    </div>
    `;
};
