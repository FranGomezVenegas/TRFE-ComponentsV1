import { SamplePlateReading } from './SamplePlateReading';

export class SampleEnterResult extends SamplePlateReading {
  constructor() {
    super()
    this.procName = "proc-deploy"
    this.hidePrev = true
    this.hideNext = true
    this.name = "fq"
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

  getSamples() {
    this.credsChecker("SAMPLES_INPROGRESS_LIST", null, {
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "status in-|sample_config_code not in*|sampling_date is not null",
      whereFieldsValue: "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-",
      addSampleAnalysis: this.name == "fq" ? true : false,
      addSampleAnalysisFieldToRetrieve: "method_name|testing_group",
      sampleAnalysisWhereFieldsName: "testing_group|status not in",
      sampleAnalysisWhereFieldsValue: (this.name == "fq" ? "FQ" : "MB") + "*String|REVIEWED*String",
      addSampleAnalysisResult: true
    })
  }

  getResultCmd() {
    this.credsChecker("GET_SAMPLE_ANALYSIS_RESULT_LIST", this.selectedItem.sample_id, {
      sampleAnalysisResultFieldToRetrieve: "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict",
      sortFieldsName: "test_id|result_id",
      sampleAnalysisWhereFieldsName: "testing_group|status not in",
      sampleAnalysisWhereFieldsValue: (this.name == "fq" ? "FQ" : "MB") + "|REVIEWED*String"
    })
  }
}
