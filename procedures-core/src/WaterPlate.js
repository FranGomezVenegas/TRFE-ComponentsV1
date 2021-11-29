import { html } from 'lit';
import { PlateReading } from './PlateReading';

export class WaterPlate extends PlateReading {
  constructor() {
    super()
    this.procName = "proc-deploy"
    this.hidePrev = true
    this.hideNext = true
    this.langConfig.title = {
      "fq": {
        "label_en": "FQ-Testing Pending Results", 
        "label_es": "FQ-Ensayos pendientes entrar resultados"
      },
      "mb": {
        "label_en": "Samples Pending Micro Testing", 
        "label_es": "Muestras pendientes de testeo Microbiológico"
      }
    }
    this.langConfig.gridHeader = {
      "status": {
        label_en:"Status", label_es: "Estado"
      },
      "sample_id": {
        label_en: "Sample ID", 
        label_es: "ID Muestra"
      },
      "program_name": {
        label_en:"Project", label_es: "Programa"
      },
      "location_name": {
        label_en:"Location", label_es: "Ubicación"
      },
      "sampling_date": {
        label_en:"sampling Date", label_es: "ID Fecha de Muestreo"
      },
      "spec_code": {
        label_en:"Spec", label_es: "Especificación"
      }
    }
  }

  getTitle() {
    let title = ""
    if (this.samplingType == "fq") {
      title = `${this.langConfig.title.fq["label_"+this.lang]}`
    } else if (this.samplingType == "mb") {
      title = `${this.langConfig.title.mb["label_"+this.lang]}`
    }
    return html`<h1>${title}</h1>`
  }

  getSamples() {
    this.credsChecker("SAMPLES_INPROGRESS_LIST", null, {
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "status in-|sample_config_code not in*|sampling_date is not null",
      whereFieldsValue: "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-",
      addSampleAnalysis: this.samplingType == "fq" ? true : false,
      addSampleAnalysisFieldToRetrieve: "method_name|testing_group",
      sampleAnalysisWhereFieldsName: "testing_group|status not in",
      sampleAnalysisWhereFieldsValue: (this.samplingType == "fq" ? "FQ" : "MB") + "*String|REVIEWED*String",
      addSampleAnalysisResult: true
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "SAMPLES_INPROGRESS_LIST") {
      this.getSamplesReq()
    }
  }
}
