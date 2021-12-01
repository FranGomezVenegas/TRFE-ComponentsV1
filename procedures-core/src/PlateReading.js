import { SampleFq } from './SampleFq';

export class PlateReading extends SampleFq {
  constructor() {
    super()
    this.procName = "em-demo-a"
    this.hidePrev = false
    this.hideNext = false
    this.name = "samples"
    this.langConfig.title = {
      "samples": {
        "label_en": "Samples Pending Plate Reading", 
        "label_es": "Muestras pendientes de la lectura de placa"
      },
      "personel": {
        "label_en": "Personnel Samples Pending Plate Reading", 
        "label_es": "Muestras de personal pendientes de la lectura de placa"
      }
    }
    this.langConfig.gridHeader = {
      "sample_id": {
        label_en: "Sample ID", 
        label_es: "ID Muestra"
      },
      "status": {
        label_en:"Status", label_es: "Estado"
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
      "incubation_batch": {
        label_en:"Batch incub 1", label_es: "Tanda 1a Incubacion"
      },
      "incubation_incubator": {
        label_en:"Incubator incub 1", label_es: "Incubadora 1a Incubacion"
      },
      "incubation_start": {
        label_en:"incubation 1 start", label_es: "Inicio 1a Incubacion"
      },
      "incubation_end": {
        label_en:"incubation 1 end", label_es: "Fin 1a Incubacion"
      },
      "incubation2_batch": {
        label_en:"Batch incub 2", label_es: "Tanda 2a Incubacion"
      },
      "incubation2_incubator": {
        label_en:"Incubator incub 2", label_es: "Incubadora 2a Incubacion"
      },
      "incubation2_start": {
        label_en:"incubation 2 start", label_es: "Inicio 2a Incubacion"
      },
      "incubation2_end": {
        label_en:"incubation 2 end", label_es: "Fin 2a Incubacion"
      }
    }
  }

  getSamples() {
    this.credsChecker("SAMPLES_BY_STAGE", null, {
      sampleFieldToRetrieve: "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code",
      whereFieldsName: "current_stage|sample_config_code"+ (this.samplingType=='personel'?'':' not') +" in*",
      whereFieldsValue: "PlateReading|prog_pers_template"
    })
  }
}
