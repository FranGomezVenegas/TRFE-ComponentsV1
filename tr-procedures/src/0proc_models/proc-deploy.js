export const ProcDeploy = {
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20220918",
	  "last change note": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "Programs" , "url" : "/moduleenvmon/EnvMonAPIactions"},
	    { "name": "Samples" , "url" : "/moduleenvmon/EnvMonSampleAPIactions"},
		{ "name": "ProdLot" , "url" : "/moduleenvmon/EnvMonProdLotAPIactions"}
	  ]
  },
  "ProductionLots": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SampleLot": {
          "label_en": "Active Production Lots",
          "label_es": "Lotes en producción activos"
        }
      },
      "gridHeader": {
        "lot_name": {
          "label_en": "Name", "label_es": "Nombre", "width": "80%", "sort": false, "filter": true, "align": "left"
        },
        "created_on": {
          "label_en": "Created On", "label_es": "F. Creación", "width": "20%", "sort": true, "filter": false, "confidential_value":true
        }
      }
    },
    "viewQuery":
      {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
        "clientMethodssss": "getSamples",
        "endPoint": "/moduleenvmon/EnvMonAPIqueries",
        "addRefreshButton": true,
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Refresh", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
      }
    },
  "actions": [
      {
        "actionName": "EM_NEW_PRODUCTION_LOT",
		"endPointUrl": "ProdLot",
		"requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {          
          "name": "genericDialog",
          "fields": [
			{"text1": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" }}
          ]
        },
        "endPointParams": [
          { "argumentName": "lotName", "element": "text1" },
          { "argumentName": "fieldName", "value": "active" },
          { "argumentName": "fieldValue", "value": "true*Boolean" }
        ]
      },
      {
        "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",  
        "endPointParams": [
          { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "samplesReload"
        },
		"requiresDialog": true,
        "dialogInfo": {          
          "name": "reactivateObjectDialog",
          "fieldsObject": {
			"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
			"objectName": { "label_en": "Production Lot to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"lot_name",
            "eachEntryTextGenerator":[
              {"value": "Lot: ", "type":"fix"}, {"value": "lot_name", "type":"field"} 
            ]
          },
		  "argumentName": {
			  "actionName": "DEACTIVATED_PRODUCTION_LOTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/moduleenvmon/EnvMonAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "lotNumDays", "defaultValue": 7 }
			  ]
		  },
          "action": [            
          ]
        }
      },
      {
        "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",     
        "clientMethod": "buttonActionWithoutDialog",
        "endPointParams": [
          { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        }
      }
    ]
  },
  "LogSamples": {
    "component": "TableWithButtons",
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
        "area": {"label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"},
        "spec_code": {"label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"},
        "spec_variation_name": {"label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"},
        "spec_analysis_variation": {"label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"},
        "person_ana_definition": {"label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"}
      },
	  "gridActionOnClick":{"actionName": "LOGSAMPLE",
		"endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
		"requiresDialog": true,
		"clientMethod": "logSampleDialog",
		"dialogQueries":[
			{	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
				"endPoint": "/moduleenvmon/EnvMonAPIqueries",
				"variableForData": "prodLotList"		  
			}
		],

		"dialogInfo":{
			"name" : "pointDialog",
			"action": { "actionName": "LOGSAMPLE",
				"endPointUrl": "Samples",
				"requiresDialog": false,
				"endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
				"clientMethod": "logSample",
				"endPointParams": [
				  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
				  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
				  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
				  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
				  { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
				  { "argumentName": "fieldValue", "targetValue": true },
				  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
				]
			}
		}
	  }
    },
    "viewQuery":
    { "actionName": "PROGRAMS_LIST",
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "clientMethod": "getProgramList",
      "addRefreshButton": false,
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
    "actions": [
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
    "component": "TableWithButtons",	  
    "langConfig": {
      "title": {
        "sampling": {
          "label_en": "Pending Sampling",
          "label_es": "Muestras pendiente muestreo"
        }
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
    "viewQuery": { "actionName": "SAMPLES_INPROGRESS_LIST",
      "xxxclientMethod": "getSamples",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "-" },
        { "argumentName": "addSampleAnalysis", "value": false },
        { "argumentName": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
        { "argumentName": "sampleAnalysisWhereFieldsName", "value": "FQ*String" },
        { "argumentName": "addSampleAnalysisResult", "value": false }
      ],
      "paramFilter": {
        "sampling": { "argumentName": "whereFieldsName", "value": "sampling_date is null" }
      }
    },
  "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "xxxxsecondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "SETSAMPLINGDATE",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date", "label_es": "Establecer Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "CHANGESAMPLINGDATE",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date", "label_es": "Cambiar Fecha Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "namesssss": "dateDialog",
		  "name": "genericDialog",
          "fields": [            
			{"datetime1": { "label_en": "new Comment", "label_es": "Comentario" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "newDateTime", "element": "datetime1", "defaultValue": "" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTADD",		
        "requiresDialog": true,
		"endPointUrl": "Samples",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment", "label_es": "Agregar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {           
          "namezzzz": "commentDialog",
		  "name": "genericDialog",
          "fields": [            
			{"text1": { "label_en": "new Comment", "label_es": "Comentario" }}
          ]    
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "sampleComment", "element": "text1", "defaultValue": "" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTREMOVE",
		"requiresDialog": false, 
		"endPointUrl": "Samples",		
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment", "label_es": "Eliminar Comentario de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      }
    ]
  },
  "SampleEnterResult": {
    "component": "TableWithButtons",	  
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
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": true, "filter": false},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": true, "filter": false},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": true, "filter": false},
        "sampling_date": {"label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": true, "filter": false},
        "spec_code": {"label_en": "Spec", "label_es": "Especificación", "sort": true, "filter": false}
      }
    },
    "viewQuery":{ "actionName": "SAMPLES_INPROGRESS_LIST",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "LOGGED-RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-" },
        { "argumentName": "whereFieldsName", "value": "status in-|sample_config_code not in*|sampling_date is not null" },
        { "argumentName": "addSampleAnalysisFieldToRetrieve", "value": "method_name|testing_group" },
        { "argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
        { "argumentName": "addSampleAnalysis", "value": false },
        { "argumentName": "addSampleAnalysisResult", "value": false }
      ],
      "paramFilter": {
        "ER-FQ": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ*String|REVIEWED*String" },
        "ER-MB": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB*String|REVIEWED*String" }
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"buttonForQuery" : true,
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "xxxxsecondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "ENTERRESULT",
		"requiresDialog": true,
		"endPointUrl": "Samples",
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
		  "name": "resultDialog",
		  "subQueryName": "getResult",
		  "viewQuery": {
			  "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
			  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
			  "endPointParams": [				  
				{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
			  ]
		  },			  
          "automatic": true,
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
		  },  
          "action": [
            { "actionName": "ENTERRESULT",
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                { "argumentName": "rawValueResult", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            },
            { "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                { "argumentName": "newResultUom", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "endPointParams": [
          { "argumentName": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict" },
          { "argumentName": "sortFieldsName", "value": "test_id|result_id" },
          { "argumentName": "sampleAnalysisWhereFieldsName", "value": "testing_group|status not in" },
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],
	    "paramFilter": {
          "ER-FQ": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "FQ|REVIEWED*String" },
          "ER-MB": { "argumentName": "sampleAnalysisWhereFieldsValue", "value": "MB|REVIEWED*String" }
        }
      }
      

    ]
  },
  "ReviewTesting": {
    "component": "TableWithButtons",	  
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
        "program_name": {          "label_en": "Project",          "label_es": "Programa",          "sort": true,          "filter": false        },
        "location_name": {          "label_en": "Location",          "label_es": "Ubicación",          "sort": true,          "filter": false        },
        "sampling_date": {          "label_en": "sampling Date",          "label_es": "ID Fecha de Muestreo",          "sort": true,          "filter": false        },
        "spec_code": {          "label_en": "Spec",          "label_es": "Especificación",          "sort": true,          "filter": false        }
      }
    },
    "viewQuery":    
    { "actionName": "SAMPLEANALYSIS_PENDING_REVISION",
	  "xxxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        {
          "argumentName": "sampleAnalysisFieldToRetrieve",
          "value": "sample_id|test_id|analysis|raw_value|spec_eval|status|status_previous|sampling_date|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
        },
        {
          "argumentName": "sampleAnalysisWhereFieldsName",
          "value": "testing_group|status not in*"
        }
      ],
      "paramFilter": {
        "RT-FQ": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "FQ*String|REVIEWED*String"
        },
        "RT-MB": {
          "argumentName": "sampleAnalysisWhereFieldsValue",
          "value": "MB*String|REVIEWED*String"
        }
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "xxxxsecondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "REVIEWTEST",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "xxxclientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {
            "label_en": "Review Test",
            "label_es": "Revisar Ensayo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          {"argumentName": "testId", "selObjectPropertyName": "test_id"}
        ]
      }
    ]
  },
  "ReviewTestingGroup": {
    "component": "TableWithButtons",	  
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
        "program_name": {          "label_en": "Project",          "label_es": "Programa",          "sort": true,          "filter": false        },
        "location_name": {          "label_en": "Location",          "label_es": "Ubicación",          "sort": true,          "filter": false        },
        "sampling_date": {          "label_en": "sampling Date",          "label_es": "ID Fecha de Muestreo",          "sort": true,          "filter": false        },
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
	  "xxxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "ALL"
        }
      ],
      "paramFilter": {
        "RTG-FQ": {
          "argumentName": "testingGroup",
          "value": "FQ"
        },
        "RTG-MB": {
          "argumentName": "testingGroup",
          "value": "MB"
        }
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "xxxxsecondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
	    "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
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
        "endPointParams": [
          {
            "argumentName": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "argumentName": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "argumentName": "sampleAnalysisWhereFieldsName",
            "value": "testing_group|status in"
          },
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],
        "paramFilter": {
          "RTG-FQ": {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "FQ|REVIEWED*String"
          },
          "RTG-MB": {
            "argumentName": "sampleAnalysisWhereFieldsValue",
            "value": "MB|REVIEWED*String"
          }
        }
      },
      { "actionName": "REVIEWSAMPLE_TESTINGGROUP",
	    "requiresDialog": false,
		"endPointUrl": "Samples",
        "xxxclientMethod": "reviewTest",
        "button": {
          "icon": "reviews",
          "title": {"label_en": "Review", "label_es": "Revisar"},
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          {"argumentName": "sampleId", "selObjectPropertyName": "sample_id"},
          {"argumentName": "testingGroup", "selObjectPropertyName": "testing_group"}
        ]
      }
    ]
  },
  "ReviewSample": {
    "component": "TableWithButtons",	  
    "langConfig": {
      "title": {
        "Review": {"label_en": "Samples Review", "label_es": "Revisión de  Muestras"        }
      },
      "gridHeader": {
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": false, "filter": true},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true},
        "sampling_date": {"label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true}
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
	  "xxxendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "sample_id|program_name|location_name|sampling_date"
        },
        {
          "argumentName": "whereFieldsValue",
          "value": "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template"
        },
        {
          "argumentName": "whereFieldsName",
          "value": "status in-|sample_config_code not in*"
        }
      ]
    },
  "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "whenDisabled": "selectedSamples"
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "xxxxsecondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "REVIEWSAMPLE",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "xxxclientMethod": "reviewSample",
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
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
  },
  "Programs": {
    "component": "ModuleEnvMonitProgramProc",   
    "hasOwnComponent": true,
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
      }
    ]
  },
  "Deviation": {
	"component":"Tabs",  
    "abstract": true,
    "tabs": [
      {
		  "component":"TableWithButtons",  
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_en": "Pending Decision", 
            "label_es": "Decisión pendiente"
          },
          "title": {
            "pending": {
				"label_en": "Pending Decision", 
				"label_es": "Decisión pendiente"
            }
          },
          "gridHeader": {
            "result_id": {
              "label_en": "Result", "label_es": "Resultado", "sort": false, "filter": true, "width": "10%"
            },
            "sample_id": {
              "label_en": "Sample", "label_es": "Muestra", "sort": false, "filter": true, "width": "10%"
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creada", "sort": true, "filter": false, "width": "15%"
            },
            "location_name": {
              "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "15%"
            },
            "method_name": {
              "label_en": "Method", "label_es": "Método", "sort": false, "filter": true, "width": "10%"
            },
            "spec_eval_detail": {
              "label_en": "Problem Detail", "label_es": "Detalle del Problema", "sort": false, "filter": true, "width": "30%"
            },
            "spec_rule_with_detail": {
              "label_en": "Spec Rule", "label_es": "Especificación", "sort": false, "filter": true, "width": "10%"
            }
          }
        },
        "viewQuery":{
            "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
            "ssclientMethod": "getSamples",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "whenDisabled": "samplesReload"
            }		
		},
		"actions": [
          {
            "actionName": "NEW_INVESTIGATION", 
            "alternativeAPIActionMethod": "newInvestigationAction",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "whenDisabled": "selectedSamples"
            },
            "endPointParams": [
				{ "argumentName": "fieldName", "value": "description" },
				{ "argumentName": "fieldValue", "targetValue": true },
				{ "argumentName": "objectsToAdd", "targetValue": true }			
            ]
          },
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethodxxx": "getOpenInvestigations",
            "endPoint": "/app/InvestigationAPIqueries",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "whenDisabled": "selectedSamples"
            },
            "dialogInfo": {
			"name": "investigationDialog",
			"subQueryName": "getOpenInvestigations",				
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "clientMethod": "addInvestObjects",
                  "endPoint": "/app/InvestigationAPIactions",
                  "endPointParams": [
                    { "argumentName": "investigationId", "targetValue": true },
                    { "argumentName": "objectsToAdd", "targetValue": true }
                  ]
                }
              ]
            }
          }
        ]
      },
	
      {
		"component":"TableWithButtons",  
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_en": "Investigations", 
            "label_es": "Investigaciones"
          },
          "title": {
            "open": {
              "label_en": "In Progress Investigations", 
              "label_es": "Investigaciones en curso"
            }
          },
          "fieldText": {
            "systemName": { "label_en": "System Name", "label_es": "Nombre Sistema" },
            "systemId": { "label_en": "System Id", "label_es": "Id Sistema" },
            "capa": { "label_en": "CAPA Required", "label_es": "¿Requiere CAPA?" },
            "capaName": { "label_en": "CAPA System Name", "label_es": "Nombre Sistema CAPA" },
            "capaId": { "label_en": "CAPA Id", "label_es": "Id CAPA" }
          },
          "gridHeader": {
            "id": {
              "label_en": "ID", "label_es": "ID", "width": "12px", "sort": false, "filter": true
            },
            "description": {
              "label_en": "description", "label_es": "description", "width": "20px", "sort": false, "filter": true
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creación", "width": "30px", "sort": false, "filter": true
            },
            "external_system_name": {
              "label_en": "External System Name", "label_es": "Nombre Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "external_system_id": {
              "label_en": "External System Id", "label_es": "Id Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "capa_required": {
              "label_en": "capa_required", "label_es": "CAPA Necesario", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_name": {
              "label_en": "CAPA System", "label_es": "Sistema para CAPAs", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_id": {
              "label_en": "CAPA System Id", "label_es": "Id en Sistema CAPAs", "width": "20px", "sort": false, "filter": true
            }
          }
        },
        "viewQuery":{
            "actionName": "OPEN_INVESTIGATIONS",
            "sssclientMethod": "getSamples",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "whenDisabled": "samplesReload"
            }
		},
		"actions": [
          {
            "actionName": "INVESTIGATION_CAPA_DECISION",			
            "alternativeAPIActionMethod": "capaDecisionAction",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Decision", "label_es": "Decisión"
              },
              "whenDisabled": "selectedSamples"
            },
            "dialogInfo": {               
              "name": "decisionDialog"
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" },
              { "argumentName": "capaRequired", "element": "capaCheck", "type": "check" },
              { "argumentName": "capaFieldName", "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id" },
              { "argumentName": "capaFieldValue", "targetValue": true }
            ]
          },
          {
            "actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Close", "label_es": "Cerrar"
              },
              "whenDisabled": "selectedSamples"
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" }
            ]
          }
        ]
      }
    ]
  },
  "Browser": {
    "hasOwnComponent": true,
    "tabs": [
      { 
        "label_en": "Sample", 
        "label_es": "Sample", 
        "action": "GET_SAMPLE_STAGES_SUMMARY_REPORT",
        "fixParams": {
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "current_stage|program_name|location_name"
        },
        "extraParams": {
          "sampleId": ""
        }
      },
      { 
        "label_en": "Production Lot", 
        "label_es": "Production Lot", 
        "action": "GET_PRODLOT_REPORT",
        "fixParams": {
          "prodLotFieldToRetrieve": "ALL",
          "prodLotFieldsToDisplay": "ALL",
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "ALL",
          "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_status"
        },
        "extraParams": {
          "lotName": ""
        }
      }
    ]
  }
}