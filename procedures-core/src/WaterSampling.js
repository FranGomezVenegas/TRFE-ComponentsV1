import { html } from 'lit';
import { SamplesSampling } from './SamplesSampling';

export class WaterSampling extends SamplesSampling {
  constructor() {
    super()
    this.procName = "proc-deploy"
    this.hideNext = true
    this.langConfig.title = {
      "label_en": "Pending Sampling", 
      "label_es": "Muestras pendiente muestreo"
    }
    delete this.langConfig.gridHeader.sampling_date    
  }

  getTitle() {
    return html`<h1>${this.langConfig.title["label_"+this.lang]}</h1>`
  }

  getSamples() {
    this.credsChecker("SAMPLES_INPROGRESS_LIST", null, {
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "sampling_date is null",
      whereFieldsValue: "-",
      addSampleAnalysis: false,
      addSampleAnalysisFieldToRetrieve: "method_name|testing_group",
      sampleAnalysisWhereFieldsName: "FQ*String",
      addSampleAnalysisResult: false
    })
  }

  getSamplesReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      if (j) {
        this.grid.items = j
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "SAMPLES_INPROGRESS_LIST") {
      this.getSamplesReq()
    }
  }
}
