export const SampleCoaRel1 = {
  "LogSamplesModuleSamples": {
    "component": "ModuleSampleLogSample",
    "langConfig": {
      "title": {
          "label_en": "Login Samples", 
          "label_es": "Registro de Muestras"
      },
      "fields":[
        {"list1": {
          "items": [
            { "keyName": "demo", "keyValue_en": "Demo", "keyValue_es": "Demo" }
          ],
          "label_en": "Spec", "label_es": "Espec"
        }},
        {"list2": {
          "items": [
            { "keyName": "global", "keyValue_en": "global", "keyValue_es": "global" }
          ],
          "label_en": "Variation", "label_es": "Variación"
        }}
      ],
      "button": { "label_en": "Log Sample", "label_es": "Registrar Muestra" }
    },
    "viewQuery":
    { 
    },
    "actions": [
      { "actionName": "LOGSAMPLE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "",
        "endPoint": "/modulesample/SampleAPI",
        "endPointParams": [
          {"argumentName": "specName", "element": "list1"},
          {"argumentName": "specVersion", "value": "1"},
          {"argumentName": "variationName", "element": "list2"},
          {"argumentName": "sampleTemplate", "value": "template"},
          {"argumentName": "sampleTemplateVersion", "value": "1"}
          
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
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": true, "filter": false
        },
        "received_on": {
          "label_en": "Reception Date", "label_es": "Fecha de Recepción", "sort": true, "filter": false
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": true, "filter": false
        }
      },
      "resultHeader": {
        "spec_eval": {
          "label_en": "Spec Eval", "label_es": "Eval Espec"
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
        },
        "uom": {
          "label_en": "UOM", "label_es": "UOM"
        }
      },
      "resultHeaderObjectLabelTopLeft": {
        "label_en": "Sample: ", "label_es": "Muestra: "
      }  
    },
    "viewQuery":    
    { "actionName": "SAMPLES_INPROGRESS_LIST",
      "clientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "apiParams": [
        { "query": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|received_on|sampling_comment|sample_config_code|spec_code|spec_variation_name" },
        { "query": "whereFieldsValue", "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String" },
        { "query": "whereFieldsName", "value": "status in-" },
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
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "sampleId", "beItem": "sample_id" }
        ],        
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "endPoint": "/modulesample/SampleAPI",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" },
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "endPoint": "/frontend/SampleAPIfrontEnd",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
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
              "endPoint": "/modulesample/SampleAPI",
              "clientMethod": "enterResult",
              "apiParams": [
                { "query": "rawValueResult", "targetValue": true },
                { "query": "resultId", "targetValue": true }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "apiParams": [
                { "query": "newResultUom", "targetValue": true },
                { "query": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "apiParams": [
          { "query": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict|list_entry" },
          { "query": "sortFieldsName", "value": "test_id|result_id" },
          { "query": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
          { "query": "sampleId", "beItem": "sample_id" }
          
        ],
        "paramFilter": {
          "ER-FQ": { "query": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String" },
          "ER-MB": { "query": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String" }
        }
      }
    ]
  },
  "ReviewTesting": {
    "langConfig": {
      "title": {
        "RT-FQ": {
          "label_en": "FQ-Pending Review Testing",
          "label_es": "FQ-Ensayos pendiente revisión"
        },
        "RT-MB": {
          "label_en": "MB-Pending Review Testing",
          "label_es": "MB-Ensayos pendiente revisión"
        }
      },
      "gridHeader": {
        "sample_id": {          "label_en": "Sample ID",          "label_es": "ID Muestra",          "sort": true,          "filter": false        },
        "test_id": {          "label_en": "Test ID",          "label_es": "ID Ensayo",          "sort": true,          "filter": false        },
        "analysis": {          "label_en": "Analysis",          "label_es": "Ensayo",          "sort": true,          "filter": false        },
        "param_name": {          "label_en": "Parameter",          "label_es": "Parámetro"        },
        "raw_value": {          "label_en": "Value",          "label_es": "Valor"        },
        "spec_eval": {          "label_en": "Spec Eval",          "label_es": "Eval Especificación"        },
        "spec_code": {          "label_en": "Spec",          "label_es": "Especificación",          "sort": true,          "filter": false        }
      }
    },
    "viewQuery":    
    { "actionName": "SAMPLEANALYSIS_PENDING_REVISION",
      "clientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "apiParams": [
        {
          "query": "sampleAnalysisFieldToRetrieve",
          "value": "sample_id|test_id|analysis|raw_value|spec_eval|status|status_previous|sampling_date|sample_config_code|spec_code|spec_variation_name"
        },
        {
          "query": "sampleAnalysisWhereFieldsName",
          "value": "testing_group|status not in*"
        }
      ],
      "paramFilter": {
        "RT-FQ": {
          "query": "sampleAnalysisWhereFieldsValue",
          "value": "FQ*String|REVIEWED*String"
        },
        "RT-MB": {
          "query": "sampleAnalysisWhereFieldsValue",
          "value": "MB*String|REVIEWED*String"
        }
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "sampleId", "beItem": "sample_id" }
        ],        
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "endPoint": "/modulesample/SampleAPI",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" },
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "REVIEWTEST",
        "endPoint": "/modulesample/SampleAPI",
        "clientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review Test",
            "label_es": "Revisar Ensayo"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {
            "query": "testId",
            "beItem": "test_id"
          }
        ]
      }
    ]
  },
  "ReviewTestingGroup": {
    "langConfig": {
      "title": {
        "RTG-FQ": {
          "label_en": "FQ-Pending Review Testing Group",
          "label_es": "FQ-Grupo Analítico pendientes de revisión"
        },
        "RTG-MB": {
          "label_en": "MB-Pending Review Testing",
          "label_es": "MB-Ensayos pendiente revisión"
        }
      },
      "gridHeader": {
        "sample_id": {          "label_en": "Sample ID",          "label_es": "ID Muestra",          "sort": true,          "filter": false        },
        "testing_group": {          "label_en": "Testing Group",          "label_es": "Grupo Analítico",          "sort": true,          "filter": false        },
        "spec_code": {          "label_en": "Spec",          "label_es": "Especificación",          "sort": true,          "filter": false        }
      },
      "resultHeader": {
        "spec_eval": {          "label_en": "Spec Eval",          "label_es": "Eval Espec"        },
        "result_id": {          "label_en": "Result Id",          "label_es": "Id Resultado"        },
        "analysis": {          "label_en": "Analysis",          "label_es": "Análísis"        },
        "param_name": {          "label_en": "Parameter",          "label_es": "Parámetro"        },
        "raw_value": {          "label_en": "Value",          "label_es": "Valor"        },
        "uom": {          "label_en": "UOM", "label_es": "UOM"        }
      },
      "resultHeaderObjectLabelTopLeft": {        "label_en": "Sample: ", "label_es": "Muestra: "      }  
    },
    "viewQuery":    
    { "actionName": "SAMPLES_PENDING_TESTINGGROUP_REVISION",
      "clientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "apiParams": [
        {
          "query": "sampleFieldToRetrieve",
          "value": "ALL"
        }
      ],
      "paramFilter": {
        "RTG-FQ": {
          "query": "testingGroup",
          "value": "FQ"
        },
        "RTG-MB": {
          "query": "testingGroup",
          "value": "MB"
        }
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "sampleId", "beItem": "sample_id" }
        ],        
        "dialogInfo": {
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "endPoint": "/modulesample/SampleAPI",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" },
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result",
            "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "readOnly": true
        },
        "apiParams": [
          {
            "query": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "query": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "query": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status in"
          },
          { "query": "sampleId", "beItem": "sample_id" }
        ],
        "paramFilter": {
          "RTG-FQ": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "FQ|REVIEWED*String"
          },
          "RTG-MB": {
            "query": "sampleAnalysisWhereFieldsValue",
            "value": "MB|REVIEWED*String"
          }
        }
      },
      { "actionName": "REVIEWSAMPLE_TESTINGGROUP",
        "endPoint": "/modulesample/SampleAPI",
        "clientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {"label_en": "Review", "label_es": "Revisar"},
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          {"query": "sampleId", "beItem": "sample_id"},
          {"query": "testingGroup", "beItem": "testing_group"}
        ]
      }
    ]
  },
  "ReviewSample": {
    "langConfig": {
      "title": {
        "Review": {"label_en": "Samples Review", "label_es": "Revisión de  Muestras"        }
      },
      "gridHeader": {
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true}
      },
      "resultHeader": {
        "spec_eval": {"label_en": "Spec Eval", "label_es": "Eval Espec"},
        "result_id": {"label_en": "Result Id", "label_es": "Id Resultado"},
        "analysis": {"label_en": "Analysis", "label_es": "Análísis"},
        "param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
        "raw_value": {"label_en": "Value", "label_es": "Valor"},
        "uom": {"label_en": "UOM", "label_es": "UOM"}
      },
      "resultHeaderObjectLabelTopLeft": {
        "label_en": "Sample: ", "label_es": "Muestra: "
      }  
  },
    "viewQuery":    
    { "actionName": "SAMPLES_PENDING_SAMPLE_REVISION",
      "clientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "apiParams": [
        {
          "query": "sampleFieldToRetrieve",
          "value": "sample_id|sampling_date"
        },
        {
          "query": "whereFieldsValue",
          "value": "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template"
        },
        {
          "query": "whereFieldsName",
          "value": "status in-|sample_config_code not in*"
        }
      ]
    },
  "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",
        "clientMethod": "getSampleAudit",
        "button": {
          "icon": "rule",
          "title": {"label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "sampleId", "beItem": "sample_id" }
        ],        
        "dialogInfo": {
          "automatic": true,
          "action": [
            { "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "endPoint": "/modulesample/SampleAPI",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" },
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "REVIEWSAMPLE",
        "endPoint": "/modulesample/SampleAPI",
        "clientMethod": "reviewSample",
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "sampleId", "beItem": "sample_id" }
        ]
      },
      { "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "endPoint": "/frontend/SampleAPIfrontEnd",
        "clientMethod": "getResult",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result",
            "label_es": "Ingrese el Resultado"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "automatic": true,
          "readOnly": true
        }
      }
    ]
  }  
}