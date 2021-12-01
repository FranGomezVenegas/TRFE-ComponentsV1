import { PendingSampling } from './PendingSampling';

export class SamplesSampling extends PendingSampling {
  constructor() {
    super()
    this.procName = "em-demo-a"
    this.hideNext = false
    this.name = "samples"
    this.langConfig.title = {
      "personel": {
        "label_en": "Personnel Samples Pending Sampling Date", 
        "label_es": "Muestras de personal pendientes de la fecha de muestreo"
      },
      "samples": {
        "label_en": "Samples Pending Sampling Date", 
        "label_es": "Muestras pendientes de la fecha de muestreo"
      }
    }
    this.langConfig.gridHeader = {
      ...this.langConfig.gridHeader,
      "sampling_date": {
        label_en:"Sampling Date", label_es: "ID Fecha de Muestreo"
      }
    }
  }

  getSamples() {
    this.credsChecker("SAMPLES_BY_STAGE", null, {
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "current_stage|sample_config_code"+ (this.samplingType=='personel'?'':' not') +" in*",
      whereFieldsValue: "Sampling|prog_pers_template"
    })
  }

  moveToNext(isNext=true) {
    this.credsChecker(isNext ? "SAMPLESTAGE_MOVETONEXT" : "SAMPLESTAGE_MOVETOPREVIOUS", this.selectedItem.sample_id)
  }

  moveToNextReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        this.getSamples()
      }
    })
  }
}
