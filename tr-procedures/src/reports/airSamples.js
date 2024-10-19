import { html, nothing, LitElement } from 'lit';
import '../components/StagesView/index';
export function AirSampleReport(base) {
    return class extends (base) {

EnvMonAirSampleBrowser() {
    console.log('data', this.data)
    let stageData={}
    stageData.stages=[
        {"name": "Sampling", "label_en": "Sampling", "label_es": "Muestreo"},
        {"name": "Incubation", "label_en": "Incubation", "label_es": "Incubación"},
        {"name": "PlateReading", "label_en": "Plate Reading", "label_es": "Lectura de placa"},
        {"name": "MicroorganismIdentification", "label_en": "Microorganism Identification", "label_es": "Identificacion de Microorganismos"},
        {"name": "SampleRevision", "label_en": "Sample Revision", "label_es": "Revisión de la muestra"},
        {"name": "END", "label_en": "End", "label_es": "Fin"}
    ]
        //, "", "", "", "SampleRevision", ""]

    if (this.data.sampleFieldToRetrieve === undefined) return html``;
    let header = `Report for the `;
    header += `sample ${this.data.sampleFieldToRetrieve.sample_id}`;
    return html`
            <stages-view style="margin:17.6779px;" .stages="${stageData.stages}"
                .currentstage="${this.data.sampleFieldsToDisplay.current_sage}" .lang="${this.lang}"></stages-view>

    ${this._sampleFieldData()}
            <div slot="footer" class="layout vertical">
            
                ${this.data.stages.map(
        (d) =>
            html`
                    ${this._stageTitle(d.current_stage)}
                    ${this._stageTimingCapture(d)}
                    <sp-card-ext
                        heading="${d.current_stage}"
                        ?nonSubHeading=${!d.started_on}
                        subheading="${d.started_on}${d.ended_on &&` >> ${d.ended_on}`}"
                    >
                        <div slot="footer">
                        ${d.current_stage == "Sampling"
                ? html`
                                ${d.data.map(
                (data) =>
                    html`<li class="cardItem">
                                    ${data.field_name}: ${data.field_value}
                                    </li>`
                )}
                            `
                : html`${d.current_stage == "Incubation"
                ? html`
                                    ${d.data.map(
                    (data) =>
                    html`
                                        <sp-card-ext
                                            heading="Incubation 1"
                                            nonSubHeading
                                        >
                                            <div slot="footer">
                                            ${data.incubation_1.map(
                        (f) =>
                        html`${f.field_name
                            ? html`<li class="cardItem">
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                    </li>`
                            : nothing}`
                    )}
                                            </div>
                                        </sp-card-ext>
                                        <sp-card-ext
                                            heading="Incubation 2"
                                            nonSubHeading
                                        >
                                            <div slot="footer">
                                            ${data.incubation_2.map(
                        (f) =>
                        html`${f.field_name
                            ? html`<li class="cardItem">
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                    </li>`
                            : nothing}`
                    )}
                                            </div>
                                        </sp-card-ext>
                                        `
                )}
                                `
                : html`${d.current_stage == "PlateReading"
                    ? html`
                                        ${d.data.map(
                    (data) =>
                        html`${data.field_name ==
                        "raw_value"
                        ? html`<li class="cardItem">
                                                Number of Colonies:
                                                ${data.field_value}
                                                </li>`
                        : nothing}`
                    )}
                                    `
                    : html`${d.current_stage ==
                    "MicroorganismIdentification"
                    ? html`
                                            ${d.data.map(
                        (data) =>
                        html`${data.field_name ===
                            "microorganism_count" ||
                            data.field_name ===
                            "microorganism_list"
                            ? html`<li class="cardItem">
                                                    ${data.field_name}:
                                                    ${data.field_value}
                                                    </li>`
                            : nothing}`
                    )}
                                        `
                    : html`
                                            ${d.data.map(
                        (data) =>
                        html`${data.field_name == "name"
                            ? html`${data.field_name}:
                                                    ${data.field_value}`
                            : nothing}`
                    )}
                                        `}`}`}`}
                        </div>
                        ${d.current_stage == "Sampling"
                ? html`<mwc-icon
                            slot="actions"
                            title="Open"
                            placement="bottom-end"
                            ?hidden=${this.data.sampleFieldToRetrieve
                    .current_stage == "END"}
                            @click=${this.openSample}
                            >file_open</mwc-icon
                            >`
                : nothing}
                    </sp-card-ext>
                    `
        )}
            </div>
            </sp-card-ext>
        `
       
    }  
    
    _stageTitle(currentStage) {
    return html` <h1>${currentStage}</h1> `;
    }
    _stageTimingCapture(stageData) {
        return html`
        <div style="display: flex; align-items: center;">
          <h3 style="margin-right: 10px;">Timeline:</h3>
          <div style="background-color: #f0f0f0; padding: 5px 10px; border-radius: 5px;">
            <span style="font-weight: bold;">${new Date(stageData.started_on).toLocaleDateString()}</span>
            <span style="margin: 0 5px;">&rarr;</span>
            <span style="font-weight: bold;">${new Date(stageData.ended_on).toLocaleDateString()}</span>
          </div>
        </div>
      `;          
    }

    _sampleFieldData(){
        return html`
            ${this.data.sampleFieldToRetrieve? html`
                    <sp-card-ext
                    heading="Report for the sample"
                    subheading="${this.data.sampleFieldToRetrieve.sample_id}"
                    >
                    <div slot="footer">
                        ${this.data.sampleFieldsToDisplay.map(
                (d) => html`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`
                )}
                    </div>
                    </sp-card-ext>
                    <sp-card-ext heading="Stages" nonSubHeading>        
            `:html``}
        `
    }
                
}}