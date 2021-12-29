export const ProcDeploy = {
  "LogSamples": {
    "langConfig": {
      "title": {
        "SampleLogin" : {
          "label_en": "Program Sampling Points", 
          "label_es": "Puntos de muestro del programa"
        }
      },
      "fieldText": {
        "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
        "shift": {
          "items": [
            { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
            { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
            { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
          ],
          "label_en": "Shift", "label_es": "Turno"
        },
        "lot": {
          "items": [],
          "label_en": "Lot", "label_es": "Lote"
        }
      },
      "gridHeader": {
        "area": {
          "label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"
        },
        "spec_analysis_variation": {
          "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"
        },
        "person_ana_definition": {
          "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"
        }
      }
    },
    "actions": [
      {
        "actionName": "PROGRAMS_LIST",
        "clientMethod": "getProgramList",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "subAction": {
          "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
          "clientMethod": "getLots"
        }
      },
      {
        "actionName": "LOGSAMPLE",
        "clientMethod": "logSample",
        "apiParams": [
          { "query": "programName", "element": "programInput", "defaultValue": "" },
          { "query": "locationName", "element": "locationInput", "defaultValue": "" },
          { "query": "sampleTemplate", "targetValue": true },
          { "query": "sampleTemplateVersion", "targetValue": true },
          { "query": "fieldName", "defaultValue": "shift|production_lot" },
          { "query": "fieldValue", "targetValue": true },
          { "query": "numSamplesToLog", "defaultValue": 1 }
        ]
      }
    ],
    "topCompositions": [
      {
        "templateName": "specCode",
        "buttons": [{
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "calledActionIdx": 0
        }]
      }
    ]
  },
  "SamplePending": {
    "langConfig": {
      "title": {
        "sampling": {
          "label_en": "Pending Sampling", 
          "label_es": "Muestras pendiente muestreo"
        }
      },
      "fieldText": {
        "newDate": { "label_en": "New Date", "label_es": "Nueva Fecha" }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true
        },
        "sampling_comment": {
          "label_en": "sampling Comment", "label_es": "Comentario Muestreo", "sort": false, "filter": true
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_INPROGRESS_LIST",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          { "query": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
          { "query": "whereFieldsValue", "value": "-" },
          { "query": "addSampleAnalysis", "value": false },
          { "query": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "FQ*String" },
          { "query": "addSampleAnalysisResult", "value": false }
        ],
        "paramFilter": {
          "sampling": { "query": "whereFieldsName", "value": "sampling_date is null" }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "automatic": true
        }
      },
      {
        "actionName": "SETSAMPLINGDATE",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date", "label_es": "Establecer Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      {
        "actionName": "CHANGESAMPLINGDATE",
        "clientMethod": "setSamplingDate",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date", "label_es": "Cambiar Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "requiresDialog": true,
          "name": "dateDialog"
        },
        "apiParams": [
          { "query": "newDateTime", "element": "dateInput", "defaultValue": "" }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTADD",
        "clientMethod": "addSamplingComment",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment", "label_es": "Agregar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "requiresDialog": true,
          "name": "commentDialog"
        },
        "apiParams": [
          { "query": "sampleComment", "element": "commentInput", "defaultValue": "" }
        ]
      },
      {
        "actionName": "SAMPLINGCOMMENTREMOVE",
        "clientMethod": "removeSamplingComment",
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment", "label_es": "Eliminar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        }
      }
    ]
  },
  "SampleEnterResult": {
    "langConfig": {
      "title": {
        "ER-FQ": {
          "label_en": "FQ-Testing Pending Results", 
          "label_es": "FQ-Ensayos pendientes entrar resultados"
        },
        "ER-MB": {
          "label_en": "Samples Pending Micro Testing", 
          "label_es": "Muestras pendientes de testeo Microbiológico"
        }
      },
      "gridHeader": {
        "status": {
          "label_en": "Status", "label_es": "Estado", "is_icon": true
        },
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": true, "filter": false
        },
        "program_name": {
          "label_en":"Project", "label_es": "Programa", "sort": true, "filter": false
        },
        "location_name": {
          "label_en":"Location", "label_es": "Ubicación", "sort": true, "filter": false
        },
        "sampling_date": {
          "label_en":"sampling Date", "label_es": "ID Fecha de Muestreo", "sort": true, "filter": false
        },
        "spec_code": {
          "label_en":"Spec", "label_es": "Especificación", "sort": true, "filter": false
        }
      },
      "resultHeader": {
        "spec_eval": {
          "label_en": "spec_eval", "label_es": "Eval Espec"
        },
        "result_id": {
          "label_en": "Result Id", "label_es": "Id Resultado"
        },
        "analysis": {
          "label_en": "Analysis", "label_es": "Análísis"
        },
        "param_name": {
          "label_en": "Parameter", "label_es": "Parámetro"
        },
        "raw_value": {
          "label_en": "Value", "label_es": "Valor"
        }
      }
    },
    "actions": [
      {
        "actionName": "SAMPLES_INPROGRESS_LIST",
        "clientMethod": "getSamples",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        },
        "apiParams": [
          { "query": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
          { "query": "whereFieldsValue", "value": "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-" },
          { "query": "whereFieldsName", "value": "status in-|sample_config_code not in*|sampling_date is not null" },
          { "query": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
          { "query": "addSampleAnalysis", "value": false },
          { "query": "addSampleAnalysisResult", "value": false }
        ],
        "paramFilter": {
          "ER-FQ": { "query": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED*String" },
          "ER-MB": { "query": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED*String" }
        }
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "automatic": true
        }
      },
      {
        "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result", "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "automatic": true,
          "action": [
            {
              "actionName": "ENTERRESULT",
              "clientMethod": "enterResult",
              "apiParams": [
                { "query": "rawValueResult", "targetValue": true },
                { "query": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "apiParams": [
          { "query": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict" },
          { "query": "sortFieldsName", "value": "test_id|result_id" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" }
        ],
        "paramFilter": {
          "ER-FQ": { "query": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String" },
          "ER-MB": { "query": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String" }
        }
      }
    ]
  }
}