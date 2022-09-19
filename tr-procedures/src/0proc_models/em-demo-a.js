export const EmDemoA = {
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20220918",
	  "last change note": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "Programs" , "url" : "/moduleenvmon/EnvMonAPIactions"},
	    { "name": "Samples" , "url" : "/moduleenvmon/EnvMonSampleAPIactions"},
		{ "name": "Batches" , "url" : "/moduleenvmon/EnvMonAPIactions"},
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
        "lot_name": {"label_en": "Name", "label_es": "Nombre", "width": "80%", "sort": false, "filter": true, "align": "left"},
        "created_on": {"label_en": "Created On", "label_es": "F. Creación", "width": "20%", "sort": true, "filter": false, "confidential_value":true},
		"closed_on": {"label_en": "Closed On", "label_es": "F. Cierre", "width": "20%", "sort": true, "filter": false}
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
      { "actionName": "EM_NEW_PRODUCTION_LOT",
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
      { "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
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
		  "viewQuery": {
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
      { "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
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
  "SamplePendingSampling": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date", 
          "label_es": "Muestras pendientes de la fecha de muestreo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date", 
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
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
        "sampling_date": {
          "label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true
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
    "viewQuery":{ "actionName": "SAMPLES_BY_STAGE",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
	  "clientMethodxxxxx": "getSamples",
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
        { "argumentName": "whereFieldsValue", "value": "Sampling|prog_pers_template|false*Boolean" }
      ],
      "paramFilter": {
        "SamplingSMP": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*|requires_tracking_sampling_end" },
        "SamplingPERS": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*|requires_tracking_sampling_end" }
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
			{"text1": { "label_en": "new Comment", "label_es": "Comentario", "selObjectPropertyName": "sampling_comment" }}
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
  "SamplePendingSamplingInterval": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date by Interval", 
          "label_es": "Muestras pendientes de la fecha de muestreo por Intervalo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date", 
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
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
        "sampling_date": {
          "label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true
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
    "viewQuery":
    { "actionName": "SAMPLES_BY_STAGE",
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
        { "argumentName": "whereFieldsValue", "value": "true*Boolean|Sampling|prog_pers_template" }
      ],
      "paramFilter": {
        "SamplingSMP": { "argumentName": "whereFieldsName", "value": "requires_tracking_sampling_end|current_stage|sample_config_code not in*" },
        "SamplingPERS": { "argumentName": "whereFieldsName", "value": "requires_tracking_sampling_end|current_stage|sample_config_code in*" }
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
      { "actionName": "SETSAMPLINGDATEEND",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set END Sample Date", "label_es": "Establecer Fecha FIN Muestreo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "CHANGESAMPLINGDATEEND",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change END Sample Date", "label_es": "Cambiar Fecha FIN Muestreo"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
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
  "SamplePlateReading": {
	"component": "TableWithButtons",	
    "langConfig": {
      "title": {
        "PlateReadingSMP": {
          "label_en": "Samples Pending Plate Reading", 
          "label_es": "Muestras pendientes de la lectura de placa"
        },
        "PlateReadingPERS": {
          "label_en": "Personnel Samples Pending Plate Reading", 
          "label_es": "Muestras de personal pendientes de la lectura de placa"
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
        "sampling_date": {
          "label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true
        },
        "incubation_batch": {
          "label_en": "Batch incub 1", "label_es": "Tanda 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_incubator": {
          "label_en": "Incubator incub 1", "label_es": "Incubadora 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_start": {
          "label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_end": {
          "label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true
        },
        "incubation2_batch": {
          "label_en": "Batch incub 2", "label_es": "Tanda 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_incubator": {
          "label_en": "Incubator incub 2", "label_es": "Incubadora 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_start": {
          "label_en": "incubation 2 start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_end": {
          "label_en": "incubation 2 end", "label_es": "Fin 2a Incubacion", "sort": false, "filter": true
        }
      }
    },
    "viewQuery":{ "actionName": "SAMPLES_BY_STAGE",
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
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code" },
        { "argumentName": "whereFieldsValue", "value": "PlateReading|prog_pers_template" }
      ],
      "paramFilter": {
        "PlateReadingSMP": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*" },
        "PlateReadingPERS": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*" }
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
		"xxxmode": "readonly",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
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
      { "actionName": "ENTER_PLATE_READING",
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
            {
              "actionName": "ENTER_PLATE_READING",
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                { "argumentName": "rawValueResult", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
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
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      }
    ]
  },
  "SamplePlateReadingSecondEntry": {
	"component": "TableWithButtons",	  
    "langConfig": {
      "title": {
        "PlateReadingSecondEntrySMP": {"label_en": "Samples Pending Plate Reading Second Entry", "label_es": "Muestras pendientes de confirmación de lectura de placa"},
        "PlateReadingSecondEntryPERS": {"label_en": "Personnel Samples Pending Plate Reading Confirmation", "label_es": "Muestras de personal pendientes confirmación de la lectura de placa"}
      },
      "gridHeader": {
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": false, "filter": true},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true},
        "sampling_date": {"label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true},
        "incubation_batch": {"label_en": "Batch incub 1", "label_es": "Tanda 1a Incubacion", "sort": false, "filter": true},
        "incubation_incubator": {"label_en": "Incubator incub 1", "label_es": "Incubadora 1a Incubacion", "sort": false, "filter": true},
        "incubation_start": {"label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true},
        "incubation_end": {"label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true},
        "incubation2_batch": {"label_en": "Batch incub 2", "label_es": "Tanda 2a Incubacion", "sort": false, "filter": true},
        "incubation2_incubator": {"label_en": "Incubator incub 2", "label_es": "Incubadora 2a Incubacion", "sort": false, "filter": true},
        "incubation2_start": {"label_en": "incubation 2 start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true},
        "incubation2_end": {"label_en": "incubation 2 end", "label_es": "Fin 2a Incubacion", "sort": false, "filter": true}
      }
    },
    "viewQuery":    { "actionName": "SAMPLES_BY_STAGE",
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
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code" },
        { "argumentName": "whereFieldsValue", "value": "PlateReadingSecondEntry|prog_pers_template" }        
      ],
      "paramFilter": {
        "PlateReadingSecondEntrySMP": { 
          "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*" },
        "PlateReadingSecondEntryPERS": { 
          "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*" }
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
        "clientMethod": "moveToNext",
        "button": {
          "class": "reverse",
          "icon": "next_week",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]    
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
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
      { "actionName": "ENTER_PLATE_READING_SECONDENTRY",
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
			  "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST_SECONDENTRY",
			  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
				"endPointParams": [				  
				  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				]
		  },			  
          "automatic": true,
		  "resultHeader": {"sar2_spec_eval": {"label_en": "Spec Eval", "label_es": "Eval Espec"},
			"sar2_result_id": {"label_en": "Result Id", "label_es": "Id Resultado"},
			"analysis": {"label_en": "Analysis", "label_es": "Análísis"},
			"sar2_param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
			"sar2_raw_value": {"label_en": "Value", "label_es": "Valor"},
			"sar2_uom": {"label_en": "UOM", "label_es": "UOM"}
		  },
		  "resultHeaderObjectLabelTopLeft": {
			"label_en": "Sample: ", "label_es": "Muestra: "
		  },  		  
          "action": [
            {
              "actionName": "ENTER_PLATE_READING_SECONDENTRY",
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                { "argumentName": "rawValueResult", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
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
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "sampleAnalysisResultWhereFieldsName", "value": "entered_by" },
          { "argumentName": "sampleAnalysisResultWhereFieldsValue", "value": "TOKN_internalUserID*String" }  
        ]
      }
    ]
  },
  "SampleMicroorganism": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "MicroOrganismSMP": {
          "label_en": "Samples Pending Microorganism Identification", 
          "label_es": "Muestras pendientes de la identificación de microorganismos"
        },
        "MicroOrganismPERS": {
          "label_en": "Personnel Samples Pending Microorganism Identification", 
          "label_es": "Muestras de personal pendientes de la identificación de microorganismos"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true, "width":  "12px"
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true, "width": "20px"
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "30px"
        },
        "sampling_date": {
          "label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true, "width": "20px"
        },
        "raw_value": {
          "label_en": "Reading Result", "label_es": "Recuento", "sort": false, "filter": true, "width": "20px"
        },
        "microorganism_count": {
          "label_en": "# Organism Ident.", "label_es": "Num. MicroOrg. Detectados", "sort": false, "filter": true, "width": "20px"
        },
        "microorganism_list": {
          "label_en": "Microorganisms", "label_es": "Microorganismos", "sort": false, "filter": true, "width": "20px"
        }
      },
      "microorganismHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
        },
        "items": {
          "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
        }
      }
    },
    "viewQuery":
    { "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "clientMethodxxx": "getSamples",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "whenDisabled": "samplesReload"
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "MicroorganismIdentification|prog_pers_template" }
      ],
      "paramFilter": {
        "MicroOrganismSMP": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*" },
        "MicroOrganismPERS": { "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*" }
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "next_week",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
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
      { "actionName": "GET_MICROORGANISM_LIST",
        "clientMethod": "getMicroorganism",
		"requiresDialog": true,
        "button": {
          "icon": "add",
          "title": {
            "label_en": "Add Microorganism", "label_es": "Añadir Microorganismo"
          },
          "whenDisabled": "selectedSamples"
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],
		"microorganismHeader": {
			"name": {
			  "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
			},
			"items": {
			  "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
			}
		},		
        "dialogInfo": { 
          "automatic": true,
		  "name": "microorganismDialogAdd",
		  "clientMethod": "getMicroorganismToAdd",
		  "subQueryName": "getMicroorganismToAdd",
		  "viewQuery": {
			  "actionName": "GET_MICROORGANISM_LIST",
				"endPointParams": [				  
				  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				]
		  },		  
          "fieldText": {
            "addhocInput": { "label_en": "Ad-hoc microorganism name", "label_es": "Nombre Ad-hoc" },
            "addhocBtn": { "label_en": "Add Addhoc", "label_es": "Añadir Nuevo" },
            "addBtn": { "label_en": "Add", "label_es": "Añadir" }
          },
              "action": [
            {
              "actionName": "ADD_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
			  "endPointUrl": "Samples",
              "endPointParams": [
                { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            },
            {
              "actionName": "ADD_ADHOC_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
			  "endPointUrl": "Samples",
			  "requiresDialog": false,
              "endPointParams": [
                { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionNamexxx": "GET_SAMPLE_MICROORGANISM_VIEW",
        "clientMethod": "getMicroorganismItem",
		"requiresDialog": true,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove Microorganism", "label_es": "Borrar Microorganismo"
          },
          "whenDisabled": "selectedSamples"
        },
        "zzzendPointParams": [
          { "argumentName": "whereFieldsName", "value": "sample_id" },
          { "argumentName": "whereFieldsValue", "targetValue": true }
        ],
      "microorganismHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
        },
        "items": {
          "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
        }
      },		
        "dialogInfo": { 
          "automatic": true,
		  "name": "microorganismDialogRemove",
		  "subQueryName": "getMicroorganismToRemove",
		  "viewQuery": {
			  "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
				"endPointParams": [
				  { "argumentName": "whereFieldsName", "value": "sample_id" },
				  { "argumentName": "whereFieldsValue", "targetValue": true }
				]
		  },
          "action": [
            {
              "actionName": "REMOVE_SAMPLE_MICROORGANISM",
              "clientMethod": "removeSampleMicroorganism",
              "endPointParams": [
                { "argumentName": "sampleId", "targetValue": true },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            }
          ]
        }
      }
    ]
  },
  "SampleIncubation": {
	"component":"ModuleEnvMonitSampleIncubation", 	  
    "abstract": true,
	"langConfig": {
		"title": {		
		"label_en": "Samples Incubation", 
		"label_es": "Incubación de Muestras"
		}
	},
    "viewQuery":{ "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "xxxxclientMethod": "getSamples",
      "endPointParams": [
        { "argumentName": "incub1_whereFieldsName", "value": "current_stage|incubation_passed" },
        { "argumentName": "incub1_whereFieldsValue", "value": "Incubation|false" },
        { "argumentName": "incub1_sortFieldsName", "value": "sample_id desc" },
        { "argumentName": "incub2_whereFieldsName", "value": "current_stage|incubation_passed" },
        { "argumentName": "incub2_whereFieldsValue", "value": "Incubation|true" },
        { "argumentName": "incub2_sortFieldsName", "value": "sample_id desc" },
        { "argumentName": "includeAllWithAnyPendingIncubation", "value": true },
        { "argumentName": "samplesWithAnyPendingIncubation", "value": true}
      ]
    },
	"actions": [],
    "stuckSamplesDialog":{
		"gridHeader": {
			"current_stage": { "label_en": "Current Stage", "label_es": "Etapa Actual" },
            "incubation_passed": { "label_en": "Passed", "label_es": "Aprobado" },
            "sample_id": { "label_en": "Sample Id", "label_es": "Muestra Id" }
		},
		"fields": {
		"topLabel": { "label_en": "Samples Incubation Stage", "label_es": "Etapa de incubación de muestras" },
		"next": { "label_en": "Next", "label_es": "Próxima" }
		}		
	},
	"active_batches":
      { "elementName": "envmonit-batch-sampleincubation",
        "filter": "active_batches",
        "langConfig": {
			"title":{
				"Incubation": {
					"label_en": "Batches", 
					"label_es": "Tandas"
				}
          },
          "fieldText": {
            "newBatch" : { "label_en": "New Batch Name", "label_es": "Nombre para la nueva tanda" }
          },
          "gridHeader": {
            "batchState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "10%"
            },
            "incubState": {
              "label_en": "incubState", "label_es": "EstadoIncub", "is_icon": true, "width": "10%"
            },
            "name": {
              "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false, "width": "15%"
            },
			"incubation_incubator": {
				"label_en": "Incubator", "label_es": "Incubadora", "sort": true, "filter": false, "width": "15%"
			},
            "incubator_info_temperature": {
              "label_en": "Temperature", "label_es": "Temperatura", "sort": false, "filter": false, "width": "10%"
            },
            "incubator_info_created_on": {
              "label_en": "T.Date", "label_es": "Fecha T.", "sort": false, "filter": false, "width": "20%"
            },
            "NUM_SAMPLES": {
              "label_en": "Num Samples", "label_es": "Nº Muestras", "sort": false, "filter": false, "width": "10%"
            },
            "incubation_start": {
              "label_en": "Start Date", "label_es": "Fecha Inicio", "sort": false, "filter": false, "width": "10%"
            }
          },
          "assignHeader": {
            "stage": { "label_en": "Incub", "label_es": "Incub" },
            "name": { "label_en": "Name", "label_es": "Nombre" },
            "description": { "label_en": "description", "label_es": "descripción" }
          }
        },
		"alternativeItemPropertyName": "selectedBatches",
		"viewQuery":{ "addRefreshButton": true,
		  "button": {
			"icon": "refresh",
			"title": {
			  "label_en": "Reload", "label_es": "Recargar"
			},
			"whenDisabled": "samplesReload"
		  }
		},        
		"actions": [
          { "actionName": "EM_BATCH_INCUB_CREATE",
			"requiresDialog": true,
			"endPointUrl": "Programs",
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "New Batch", "label_es": "Nuevo Lote"
              },
              "whenDisabled": "samplesReload"
            },
            "dialogInfo": {               
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "New Batch Name", "label_es": "Nombre para nueva Tanda" }}
				]	
            },
            "endPointParams": [
              { "argumentName": "batchName", "element": "text1", "defaultValue": "" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          },
          { "actionName": "EM_BATCH_INCUB_REMOVE",
            "xxxclientMethod": "setIncubator",
			"requiresDialog": false,
			"endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "Delete Batch", "label_es": "Eliminar Lote"
              },
              "requiresGridItemSelected": true,
			  "axxxlternativeItemPropertyName": "selectedBatches"
            },
            "endPointParams": [
              { "argumentName": "batchName", "selObjectPropertyName": "name" }
            ]
          },
          { "actionName": "EM_BATCH_ASSIGN_INCUB",
			"requiresDialog": true,
			"endPointUrl": "Programs",
            "clientMethod": "getAssign",
            "button": {
				"title": {
					"label_en": "Assign Incubator", "label_es": "Asignar Incubadora"
				},
				"requiresGridItemSelected": true,
				"alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
			"dialogQueries":[
				{	"actionName": "GET_INCUBATORS_LIST",				
					"endPoint": "/moduleenvmon/EnvMonIncubationAPIqueries",
					"variableForData": "incubatorsList"		  
				}
			],
			
            "dialogInfo": { 
				"name": "assignDialog",
				"automatic": true,
              "action": { "actionName": "EM_BATCH_ASSIGN_INCUB",
                  "xxclientMethod": "setIncubator",
				  "endPointUrl": "Batches",
                  "endPointParams": [
                    { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" },
                    { "argumentName": "incubatorName", "targetValue": true },
                    { "argumentName": "incubStage", "targetValue": true }
                  ]
                }
              
            }
          },
          { "actionName": "EM_BATCH_INCUB_START",
			"endPointUrl": "Programs",
			"requiresDialog": false,
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "Start Incubator", "label_es": "Iniciar Incubadora"
              },
			  "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "endPointParams": [
              { "argumentName": "batchName", "selObjectPropertyName": "name" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          },
          { "actionName": "EM_BATCH_INCUB_END",
			"endPointUrl": "Programs",
		    "requiresDialog": false,
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "End Incubator", "label_es": "Termina incubadora"
              },
			  "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedBatches"

            },
            "endPointParams": [
              { "argumentName": "batchName", "selObjectPropertyName": "name" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          }
        ]
      },
    "samples_pending_incubation":  
	  { "elementName": "envmonit-batch-sampleincubation",
        "filter": "samplesWithAnyPendingIncubation",
		"langConfig": {
			"title":{
				"Incubation": {
					"label_en": "All Samples Pending Incubation", 
					"label_es": "Todas las muestras pendientes de incubación"
				}
          },
			"gridHeader": {
            "sampleType": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "incubState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "samplesState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "sample_id": {
              "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true, "width": "9%"
            },
            "incubation_batch": {
              "label_en": "Batch 1", "label_es": "Tanda", "sort": false, "filter": true, "width": "9%"
            },
            "incubation2_batch": {
              "label_en": "Batch 2", "label_es": "Tanda", "sort": false, "filter": true, "width": "9%"
            },
            "incubation_start": {
              "label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "incubation_end": {
              "label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "incubation2_start": {
              "label_en": "Incubation 2 Start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "sampling_date": {
              "label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true, "width": "9%"
            },
            "sampling_comment": {
              "label_en": "Sampling Commment", "label_es": "Comentario Muestreo", "sort": false, "filter": true, "width": "9%"
            }
          }
        },
		"alternativeItemPropertyName": "selectedSamples",
		"viewQuery":{ "addRefreshButton": true,
		  "button": {
			"icon": "refresh",
			"title": {
			  "label_en": "Reload", "label_es": "Recargar"
			},
			"whenDisabled": "samplesReload"
		  }
		},        
        "actions": [
          { "actionName": "SAMPLESTAGE_MOVETONEXT",
			"endPointUrl": "Samples",
			"requiresDialog": false,	
            "xxxclientMethod": "moveToNext",
            "button": {
              "icon": "low_priority",
              "color": "red",
              "title": {
                "label_en": "Sample Stuck", "label_es": "Muestra Atascada", "extra": "stuckNum"
              },
              "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedSamples",
              "whenHidden": "stucksList"
            },
            "dialogInfo": { 
              "requiresDialog": true,
              "name": "sampleStuckDialog"
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
            ]            
          },
          { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
			"requiresDialog": false,
			"endPointUrl": "Samples",
            "xxclientMethod": "moveToNext",
            "button": {
              "class": "reverse",
              "icon": "next_week",
              "title": {
                "label_en": "Previous", "label_es": "Previo"
              },
			  "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedSamples"
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
            ]    
          },
		  { "actionName": "GET_SAMPLE_AUDIT",	  
			"buttonForQuery" : true,
			"requiresDialog": true,
			"endPoint": "/modulesample/SampleAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
			  },
			  "requiresGridItemSelected": true		
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "sampleId", "internalVariableObjName": "selectedSamples", "internalVariableObjProperty": "sample_id" }
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
						{ "argumentName": "sampleId", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "sample_id" }
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
          { "actionName": "EM_BATCH_INCUB_ADD_SMP",
			"endPointUrl": "Samples",
			"requiresDialog": false,
            "clientMethod": "addRemoveBatch",
            "button": {
              "title": {
                "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
              },
              "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedSamples"
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
			  { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" }			  
            ]
          },
          { "actionName": "EM_BATCH_INCUB_REMOVE_SMP",
			"endPointUrl": "Samples",
			"requiresDialog": false,
            "clientMethod": "addRemoveBatch",
            "button": {
              "title": {
                "label_en": "Remove from Batch", "label_es": "Quitar de Tanda"
              },
              "requiresGridItemSelected": true			  
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
			  { "argumentName": "batchName", "selObjectPropertyName": "current_pending_incub_batch" }			  
            ]            
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "not_in_batch",
            "button": {
              "icon": "radio_button_checked",
              "color": "Orange",
              "title": {
                "label_en": "Incubation1, Not in Batch", "label_es": "Incubación1, Pendiente Asignar Tanda"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "in_batch_1",
            "button": {
              "icon": "radio_button_checked",
              "color": "Tomato",
              "title": {
                "label_en": "Incubation1, In Batch", "label_es": "Incubación1, En Tanda"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "progress_1",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "title": {
                "label_en": "Incubation1 In-Progress", "label_es": "Incubación1 en curso"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "done",
            "button": {
              "icon": "radio_button_checked",
              "color": "MediumSeaGreen",
              "title": {
                "label_en": "Incubation2, Not in Batch", "label_es": "Incubación2, Pendiente Asignar Tanda"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "in_batch_2",
            "button": {
              "icon": "radio_button_checked",
              "color": "SlateBlue",
              "title": {
                "label_en": "Incubation2, In Batch", "label_es": "Incubación2, En Tanda"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "progress_2",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "title": {
                "label_en": "Incubation2 In-Progress", "label_es": "Incubación2 en curso"
              },
              "whenDisabled": "samplesReload"
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "all",
            "button": {
              "icon": "restart_alt",
              "color": "black",
              "title": {
                "label_en": "Reset", "label_es": "Reiniciar"
              },
              "whenDisabled": "samplesReload"
            }
          }
        ]
      }
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
  "Incubators": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "Incubators": {
          "label_en": "Incubators List",
          "label_es": "Lista de incubadoras"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "width": "30%", "sort": false, "filter": true, "align": "left"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "width": "40%", "sort": true, "filter": false
        },
        "stage": {
          "label_en": "Incubation", "label_es": "Incubación", "width": "10%", "sort": true, "filter": false
        },
        "min": {
          "label_en": "Min T.", "label_es": "T. Mín", "width": "10%", "sort": true, "filter": false
        },
        "max": {
          "label_en": "Max T.", "label_es": "T. Máx", "width": "10%", "sort": true, "filter": false
        }
      }
    },
    "viewQuery":
      {
        "actionName": "GET_INCUBATORS_LIST",
        "clientMethodzzzz": "getGridData",
        "endPoint": "/moduleenvmon/EnvMonIncubationAPIqueries",
        "endPointParams": [
          { "argumentName": "stage", "element": "lotNumDays", "defaultValue": 1 }
        ],
        "addRefreshButton": true,
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Refresh", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
      }
    },
    "bottomCompositions": [
    {
      "elementName": "chart",
      "chartTitle":{
        "label_en": "Last Temperature Readings", 
        "label_es": "Últimas lecturas de temperatura"
      },      
      "data":{
        "chartType": "line",
        "objectArrayValuesName": "LAST_READINGS",
        "valuesFirstPropertyName": "created_on",
        "valuesSecondPropertyName": "temperature",
        "chartValuesHeader":{
          "en":["Moment", "Temperature"],
          "es":["Momento", "Temperatura"]
        }
      }
    }
    ],
    "actions": [
      { "actionName": "EM_NEW_INCUBATOR",
		"requiresDialog": true,
        "clientMethod": "setLot",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {          
          "name": "newIncubatorDialog",
          "fieldText": {
            "newName": { "label_en": "New Incub Name", "label_es": "Nombre para nueva Incubadora" },
            "incubStage": { 
              "items": [
                { "keyName": "1", "keyValue_en": "1st Incub", "keyValue_es": "1ª Incub" },
                { "keyName": "2", "keyValue_en": "2nd Incub", "keyValue_es": "2ª Incub" }
              ],    
              "label_en": "Incub Stage", "label_es": "Incubación" },
            "minTemp": { "label_en": "Min Temp", "label_es": "Temp Mín", "defaultValue":20 },
            "maxTemp": { "label_en": "Max Temp", "label_es": "Temp Máx", "defaultValue":30 }
          }
        },
        "endPointParams": [
          { "argumentName": "newIncubator", "element": "newName" },
          { "argumentName": "incubStage", "element": "incubStage" },
          { "argumentName": "minTemp", "element": "minTemp" },
          { "argumentName": "maxTemp", "element": "maxTemp" },
          { "argumentName": "fieldName", "value": "active" },
          { "argumentName": "fieldValue", "value": "true*Boolean" }
        ]
      },
      { "actionName": "EM_INCUBATION_ACTIVATE",
        "endPoint": "/moduleenvmon/EnvMonIncubationAPIactions", 
		"requiresDialog": true,		
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "reactivateObjectDialog",
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Incubator Name to reactivate", "label_es": "Nombre de Incubadora a Reactivar" }
          },  
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "description", "type":"field"}, {"value": " (", "type":"fix"}, 
              {"value": "name", "type":"field"}, {"value": ")", "type":"fix"}
              ]
          },
          "viewQuery": [            
            {
              "actionName": "GET_INCUBATORS_DEACTIVATED_LAST_N_DAYS",
              "clientMethod": "getDeactivatedObjects",
              "endPoint": "/moduleenvmon/EnvMonIncubationAPIqueries",
              "endPointParams": [
                { "argumentName": "numDays", "element": "lotNumDays", "defaultValue": 7 }
              ]
            }
          ]
        }
      },
      { "actionName": "EM_INCUBATION_DEACTIVATE",
		"requiresDialog": true,
        "endPoint": "/moduleenvmon/EnvMonIncubationAPIactions",     
        "clientMethod": "buttonActionWithoutDialog",
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" }
        ],
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        }
      },
      { "actionName": "EM_INCUBATION_ADD_TEMP_READING",
        "endPoint": "/moduleenvmon/EnvMonIncubationAPIactions",     
        "xxxclientMethod": "buttonActionWithoutDialog",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" },
          { "argumentName": "temperature", "element": "number1" }
        ],
        "button": {
          "icon": "add",
          "title": {
            "label_en": "Add Temperature Reading", "label_es": "Añadir Registro Temperatura"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {                    
          "name": "genericDialog",
		  "fields": [
			{"number1": { "label_en": "Temperature", "label_es": "Temperatura" }}
          ]
        }
      }
    ]
  },
  "Browser": {
	"component": "EnvMonitBrowser",
    "tabs": [
      { 
        "label_en": "Sample", 
        "label_es": "Sample", 
        "action": "GET_SAMPLE_STAGES_SUMMARY_REPORT",
        "fixParams": {
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "current_stage|program_name|location_name|product_lot|shift"
        },
        "extraParams": {
          "sampleId": ""
        }
      },
      { 
        "label_en": "Incubation", 
        "label_es": "Incubation", 
        "action": "GET_INCUBATOR_REPORT",
        "fixParams": {
          "incubatorFieldToRetrieve": "current_stage", 
          "incubatorFieldsToDisplay": "ALL"
        },
        "extraParams": {
          "incubatorName": "",
          "startDate": "", 
          "endDate": ""
        }
      },
      { 
        "label_en": "Batch", 
        "label_es": "Batch", 
        "action": "GET_BATCH_REPORT",
        "fixParams": {
          "batchFieldToRetrieve": "ALL", 
          "batchFieldsToDisplay": "name|active|completed|incubation_incubator|incubation_start|incubation_end"
        },
        "extraParams": {
          "batchName": ""
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
  } ,
  "DataMining": {
	"component": "DataMining",
    "tabs": [
      { "action": "QUERY_READING_OUT_OF_RANGE",
        "label_en": "Readings out of range", 
        "label_es": "Lecturas fuera de rango", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text2": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text3": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"checkbox1": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text4": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "extraParams": [
            {"argumentName": "programName", "element": "text1"},
            {"argumentName": "locationName", "element": "text2"},
            {"argumentName": "area", "element": "text3"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox1"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text4"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [
          {"type": "reportTitle", "title":{"label_en": "Readings Out of Range", "label_es": "Lecturas Fuera de Rango Permitido"}}
          ],
          [
          {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
          {"type": "chart", "elementName": "counter_range_eval",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_range_eval",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },
          {"type": "chart", "elementName": "counter_by_area_spec_tmp",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_by_area_spec_tmp",
            "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
            },
            "grouper_field_name":"sample_config_code",
            "label_values_replacement":{
              "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
              "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "KPI_PRODUCTION_LOT_SAMPLES",
        "label_en": "Production Lot Samples", 
        "label_es": "Muestras por Lote de Producción", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
          },
          "filterFields":[
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"text1": { "label_en": "Lot Name", "label_es": "Lote", "default_value": "Lote video 1" }},
            {"text2": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text3": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text4": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"checkbox1": { "label_en": "Exclude Personal", "label_es": "Excluir Personal", "default_value": true }},
            {"checkbox2": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox3": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text5": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "extraParams": [
            {"argumentName": "lotName", "element": "text1"},
            {"argumentName": "programName", "element": "text2"},
            {"argumentName": "locationName", "element": "text3"},
            {"argumentName": "area", "element": "text4"},
            {"argumentName": "excludeSamplerSamples", "element": "checkbox1"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox2"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox3"},
            {"argumentName": "MicroorganismsToFind", "element": "text5"}
          ]      
        },
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Production Lot", "label_es": "Lote de Producción"},
              "style":"color:blue"}
          ],
          [
            {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
              "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
            {"type": "recovery_rate"}
          ],
          [
            {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
             "elementName": "datatable", "fieldsToDisplay":[
                {"property": "program_name", "header": "Program"}, 
                {"property": "location_name", "header": "Location"}, 
                {"property": "area", "header": "Area"}, 
                {"property": "shift", "header": "shift"}, 
                {"property": "sampling_date", "header": "Sampling Date"}, 
                {"property": "raw_value_num", "header": "Value"}, 
                {"property": "spec_eval_detail", "header": "Spec Eval"}
             ] 
            }          
          ]          
        ]
      },
      { "action": "RECOVERY_RATE",
        "label_en": "Recovery Rate", 
        "label_es": "Recovery Rate", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "fieldsToRetrieveOrGrouping": "program_name|location_name",
            "whereFieldsName": "sample_config_code|program_name",
            "whereFieldsValue": "program_smp_template*STRING|LlenadoVialesFA2018*STRING"
          },
          "filterFields":[
            {"checkbox1": { "label_en": "Show Row Totals", "label_es": "Mostrar Totales", "default_value": true }},
            {"checkbox2": { "label_en": "Show Absences", "label_es": "Mostrar Ausencias", "default_value": true }},
            {"checkbox3": { "label_en": "Show Presences", "label_es": "Mostrar Presencias", "default_value": true }},
            {"checkbox4": { "label_en": "Show INs", "label_es": "Mostrar INs", "default_value": true }},
            {"checkbox5": { "label_en": "Show OUTs", "label_es": "Mostrar OUTs", "default_value": true }},
            {"number1": { "label_en": "Perc Num Decs", "label_es": "Num Decimales Perc", "default_value": 2 }}
          ],
          "extraParams": [
            {"argumentName": "showRowTotal", "element": "checkbox1"},
            {"argumentName": "showAbsence", "element": "checkbox2"},
            {"argumentName": "showPresence", "element": "checkbox3"},
            {"argumentName": "showIN", "element": "checkbox4"},
            {"argumentName": "showOUT", "element": "checkbox5"},
            {"argumentName": "percNumDecimals", "element": "number1"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "recovery_rate", "header": "columns_data", "values":"data"}
          ] 
        },        
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Recovery Rate", "label_es": "Recovery Rate"},
            "style":"color:blue"}
          ],
          [
            {"type": "recovery_rate"}
          ]
        ]
      },
      { "action": "QUERY_SAMPLING_HISTORY",
        "label_en": "Sampling History", 
        "label_es": "Histórico de muestreos", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Lot Name", "label_es": "Lote", "default_value": "Lote video 1" }},
            {"text2": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text3": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text4": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"checkbox1": { "label_en": "Include Samples", "label_es": "Incluir Muestreo Ubicaciones", "default_value": true }},
            {"checkbox2": { "label_en": "Include Sampler Samples", "label_es": "Incluir Muestreos de Personal", "default_value": false }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"daterange2":
              {
              "dateStart":{ "label_en": "Login Start Date", "label_es": "Fecha Inicio Creación Muestra", "default_value": "" },
              "dateEnd":{ "label_en": "Login End Date", "label_es": "Fecha Fin Creación Muestra", "default_value": "" }
              }
            },
            {"checkbox3": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text5": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}

          ],
          "extraParams": [
            {"argumentName": "lotName", "element": "text1"},
            {"argumentName": "programName", "element": "text2"},
            {"argumentName": "locationName", "element": "text3"},
            {"argumentName": "area", "element": "text4"},
            {"argumentName": "includeSamples", "element": "checkbox1"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox2"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox3"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "loginDayStart", "element": "daterange2dateStart"},
            {"argumentName": "loginDayEnd", "element": "daterange2dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text5"}
          ]      
        },
        "reportElements":[
          [
          {"type": "reportTitle", "title":{"label_en": "Sampling History", "label_es": "Histórico de muestreos"}}
          ],
          [
          {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
          {"type": "chart", "elementName": "counter_range_eval",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_range_eval",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },
          {"type": "chart", "elementName": "counter_by_area_spec_tmp",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_by_area_spec_tmp",
            "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
            },
            "grouper_field_name":"sample_config_code",
            "label_values_replacement":{
              "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
              "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "QUERY_SAMPLER_SAMPLING_HISTORY",
        "label_en": "Personal Sampling History", 
        "label_es": "Histórico de muestreos de personal", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": [
            {"sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"},
            {"includeSamplerSamples": "true"},
            {"includeSamples": "false"}
          ],
          "filterFields":[
            {"text1": { "label_en": "Sampler Name", "label_es": "Muestreador", "default_value": "" }},
            {"listMDSamplerPersonalAreas": { "label_en": "Sampler Area", "label_es": "Area Muestreada", "default_value": "" }},
            {"text3": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text4": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text5": { "label_en": "Location Area", "label_es": "Area de la ubicacion", "default_value": "" }},
            {"checkbox1": { "label_en": "Include Samples", "label_es": "Incluir Muestreo Ubicaciones", "default_value": true }},
            {"checkbox2": { "label_en": "Include Sampler Samples", "label_es": "Incluir Muestreos de Personal", "default_value": false }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"checkbox3": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text6": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "extraParams": [
            {"argumentName": "samplerName", "element": "text1"},
            {"argumentName": "samplerArea", "element": "listMDSamplerPersonalAreas"},
            {"argumentName": "programName", "element": "text3"},
            {"argumentName": "locationName", "element": "text4"},
            {"argumentName": "area", "element": "text5"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox1"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox2"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox3"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text6"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Personal Sampling History", "label_es": "Histórico de muestreos de personal"}}
          ],
          [
            {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
              "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
            {"type": "chart", "elementName": "counter_range_eval",
              "display_chart": true,
              "chart_type":"pie",
              "chart_name":"counter_range_eval",
              "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
              "counter_field_name":"count",
              "counterLimits":{
                "xmin_allowed": 3,
                "xmin_allowed_included":3,
                "xmax_allowed":100,
                "xmax_allowed_included":100,
                "xvalue":0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": ["#dfa942", "#d33737", "#bf120f"]              
              },
              "grouper_field_name":"spec_eval",
              "label_values_replacement":{
                "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
                "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
                "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
                "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
              },
              "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
              "label_item":{"label_en":"Statussss", "label_es":"Estado"},
              "label_value":{"label_en":"#", "label_es":"#"}   
            },
            {"type": "chart", "elementName": "counter_by_area_spec_tmp",

              "display_chart": true,
              "chart_type":"pie",
              "chart_name":"counter_by_area_spec_tmp",
              "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
              "counter_field_name":"count",
              "counterLimits":{
                "xmin_allowed": 3,
                "xmin_allowed_included":3,
                "xmax_allowed":100,
                "xmax_allowed_included":100,
                "xvalue":0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
              },
              "grouper_field_name":"sample_config_code",
              "label_values_replacement":{
                "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
                "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
                "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
              },
              "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
              "label_item":{"label_en":"Statussss", "label_es":"Estado"},
              "label_value":{"label_en":"#", "label_es":"#"}   
            }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "sampler", "header": "Sampler"},
              {"property": "sampler_area", "header": "Sampler Area"},
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "QUERY_INVESTIGATION",
        "label_en": "Investigations History", 
        "label_es": "Histórico Investigaciones", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "investigationGroups": "capa_required*capa_or_not"
          },
          "filterFields":[
            {"checkbox1": { "label_en": "Exclude In Progress ones", "label_es": "Excluir En Curso"}, "default_value": true },
            {"daterange1":
              {
              "dateStart":{ "label_en": "Creation Start Date", "label_es": "Inicio Rango Creación", "default_value": "" },
              "dateEnd":{ "label_en": "Creation End Date", "label_es": "Fin Rango Creación", "default_value": "" }
              }
            },
            {"daterange2":
              {
              "dateStart":{ "label_en": "Closure Start Date", "label_es": "Inicio Rango Cierre", "default_value": "" },
              "dateEnd":{ "label_en": "Closure End Date", "label_es": "Fin Rango Cierre", "default_value": "" }
              }
            }
          ],
          "extraParams": [
            {"argumentName": "excludeNotClosedYet", "element": "checkbox1"},
            {"argumentName": "creationDayStart", "element": "daterange1dateStart"},
            {"argumentName": "creationDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "closureDayStart", "element": "daterange2dateStart"},
            {"argumentName": "closureDayEnd", "element": "daterange2dateEnd"}
          ]      
        },
        "reportElements":[
          [
            {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
             "elementName": "datatable", "fieldsToDisplay":[
                {"property": "id", "header": "Id"}, 
                {"property": "created_on", "header": "Creation", "label_es":"Creación"}, 
                {"property": "created_by", "header": "By"}, 
                {"property": "closed_on", "header": "Closed"}, 
                {"property": "closed_by", "header": "By"}, 
                {"property": "external_system_name", "header": "External System Name"},
                {"property": "external_system_id", "header": "Id"}, 
                {"property": "capa_required", "header": "Capa Required"}, 
                {"property": "capa_decision_by", "header": "Capa Decision By"},
                {"property": "capa_decision_on", "header": "On"},
                {"property": "capa_external_system_id", "header": "External CAPA Systema Name"}, 
                {"property": "capa_external_system_name", "header": "Id"}
             ] 
            }          
          ],
  
          [
          {"type": "reportTitle", "title":{"label_en": "Investigations History", "label_es": "Histórico Investigaciones"}}
          ],
          [
          {"type": "chart", "elementName": "capa_or_not",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"capa_or_not",
            "chart_title":{"label_en": "Per CAPA Required", "label_es":"Por CAPA necesario"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"capa_required",
            "label_values_replacement":{
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ]
        ]
      }
    ]
  }   
}
