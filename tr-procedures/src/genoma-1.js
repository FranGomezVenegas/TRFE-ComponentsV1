export const Genoma1 = {
    "ProductionLots": {
      "langConfig": {
        "title": {
          "SampleLot": {
            "label_en": "Active Production Lots",
            "label_es": "Lotes en producción activos"
          }
        },
        "fieldText": {
          "newLot": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" },
          "lotDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
          "lotName": { "label_en": "Lot Name to reactivate", "label_es": "Nombre para el lote a reactivar" },
          "activateLot": { "label_en": "Production Lot Name to reactivate", "label_es": "Nombre para el lote de producción a reactivar" }
        },
        "gridHeader": {
          "lot_name": {
            "label_en": "Name", "label_es": "Nombre", "width": "80%", "sort": false, "filter": true, "align": "left"
          },
          "created_on": {
            "label_en": "Created On", "label_es": "F. Creación", "width": "20%", "sort": true, "filter": false
          }
        }
      },
      "actions": [
        {
          "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
          "clientMethod": "getSamples",
          "endPoint": "/moduleenvmon/frontend/EnvMonAPIfrontend",
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "whenDisabled": "samplesReload"
          }
        },
        {
          "actionName": "EM_NEW_PRODUCTION_LOT",
          "clientMethod": "setLot",
          "button": {
            "icon": "create_new_folder",
            "title": {
              "label_en": "New", "label_es": "Nuevo"
            },
            "whenDisabled": "samplesReload"
          },
          "dialogInfo": {
            "requiresDialog": true,
            "name": "lotDialog"
          },
          "apiParams": [
            { "query": "lotName", "element": "lotInput" },
            { "query": "fieldName", "value": "active" },
            { "query": "fieldValue", "value": "true*Boolean" }
          ]
        },
        {
          "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
          "clientMethod": "setLot",
          "button": {
            "icon": "alarm_add",
            "title": {
              "label_en": "Activate", "label_es": "Activar"
            },
            "whenDisabled": "samplesReload"
          },
          "dialogInfo": {
            "requiresDialog": true,
            "name": "lotDialog",
            "action": [
              {
                "actionName": "DEACTIVATED_PRODUCTION_LOTS_LAST_N_DAYS",
                "clientMethod": "getDeactivatedLots",
                "endPoint": "/moduleenvmon/frontend/EnvMonAPIfrontend",
                "apiParams": [
                  { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 }
                ]
              }
            ]
          },
          "apiParams": [
            { "query": "lotName", "element": "lotName" }
          ]
        },
        {
          "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
          "clientMethod": "setLot",
          "button": {
            "icon": "alarm_off",
            "title": {
              "label_en": "Deactivate", "label_es": "Desactivar"
            },
            "whenDisabled": "selectedSamples"
          },
          "apiParams": [
            { "query": "lotName", "beItem": "lot_name" }
          ]
        }
      ]
    },
    "StudyVariableValues": {
      "langConfig": {
        "title": {
          "SampleLogin": {
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
            "id":{name: 'id', label_en:'Id', label_es: 'Id', sort:false, filter:true, is_icon:false, width:"20%"},
            "name":{name: 'name', label_en:'Name', label_es: 'Nombre', sort:false, filter:true, is_icon:false, width:"20%"},
            "value":{name: 'value', label_en:'Value', label_es: 'Valor', sort:false, filter:true, is_icon:false, width:"20%"},
            "variable_set":{name: 'variable_set', label_en:'Var Set', label_es: 'Conjunto', sort:false, filter:true, is_icon:false, width:"20%"},
            "type":{name: 'type', label_en:'Type', label_es: 'Tipo', sort:false, filter:true, is_icon:false, width:"20%"},
            "owner_table":{name: 'owner_table', label_en:'Owner', label_es: 'Dueño', sort:false, filter:true, is_icon:false, width:"20%"},
            "owner_id":{name: 'owner_id', label_en:'Owner Id', label_es: 'Id Dueño', sort:false, filter:true, is_icon:false, width:"20%"},    
            "sample":{name: 'sample', label_en:'Sample', label_es: 'Muestra', sort:false, filter:true, is_icon:false, width:"20%"},
            "individual":{name: 'individual', label_en:'Individual', label_es: 'Individuo', sort:false, filter:true, is_icon:false, width:"20%"},
            "family":{name: 'family', label_en:'Family', label_es: 'Familia', sort:true, filter:false, is_icon:false, width:"20%"},    
        }
      },
      "actions": [
        {
          "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList",
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "whenDisabled": "samplesReload"
          },
          "subAction": {
            "actionName": "ALL_ACTIVE_PROJECTS",
            "clientMethod": "getGenomaProjectsList"
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
    "ProjectManager": {
        "component": "program-proc",
        "actions": [
          {
            "actionName": "ALL_ACTIVE_PROJECTS",
            "clientMethod": "getGenomaProjectsList",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "whenDisabled": "samplesReload"
            },
            "subAction": {
                "actionName": "ALL_ACTIVE_PROJECTS",
                "clientMethod": "getGenomaProjectsList",
            }
          }
        ]
      },
    
    "ProjectManager2": {
      "abstract": true,
      "tabs": [
        {
          "filter": "pending",
          "langConfig": {
            "tab": {
              "label_en": "Samples", 
              "label_es": "Muestras"
            },
            "title": {
              "pending": {
                "label_en": "Study Samples", 
                "label_es": "Muestras del Estudio"
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
          "actions": [
            {
                "actionName": "ALL_ACTIVE_PROJECTS",
                "clientMethod": "getGenomaProjectsList",
            "button": {
                "icon": "refresh",
                "title": {
                  "label_en": "Reload", "label_es": "Recargar"
                },
                "whenDisabled": "samplesReload"
              }
            },
            {
              "actionName": "NEW_INVESTIGATION",
              "clientMethod": "newInvestigation",
              "endPoint": "/app/InvestigationAPI",
              "button": {
                "title": {
                  "label_en": "Create Investigation", "label_es": "Crear Investigación"
                },
                "whenDisabled": "selectedSamples"
              },
              "apiParams": [
                { "query": "fieldName", "value": "description" }
              ]
            },
            {
              "actionName": "OPEN_INVESTIGATIONS",
              "clientMethod": "getOpenInvestigations",
              "endPoint": "/frontend/InvestigationAPIfrontend",
              "button": {
                "title": {
                  "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
                },
                "whenDisabled": "selectedSamples"
              },
              "dialogInfo": {
                "automatic": true,
                "action": [
                  {
                    "actionName": "ADD_INVEST_OBJECTS",
                    "clientMethod": "addInvestObjects",
                    "endPoint": "/app/InvestigationAPI",
                    "apiParams": [
                      { "query": "investigationId", "targetValue": true },
                      { "query": "objectsToAdd", "targetValue": true }
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          "filter": "open",
          "langConfig": {
            "tab": {
              "label_en": "Individuals", 
              "label_es": "Individuos"
            },
            "title": {
              "open": {
                "label_en": "Study Individuals", 
                "label_es": "Individuos del Estudio"
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
          "actions": [
            {
              "actionName": "OPEN_INVESTIGATIONS",
              "clientMethod": "getSamples",
              "endPoint": "/frontend/InvestigationAPIfrontend",
              "button": {
                "icon": "refresh",
                "title": {
                  "label_en": "Reload", "label_es": "Recargar"
                },
                "whenDisabled": "samplesReload"
              }
            },
            {
              "actionName": "INVESTIGATION_CAPA_DECISION",
              "clientMethod": "capaDecision",
              "endPoint": "/app/InvestigationAPI",
              "button": {
                "title": {
                  "label_en": "Decision", "label_es": "Decisión"
                },
                "whenDisabled": "selectedSamples"
              },
              "dialogInfo": { 
                "requiresDialog": true,
                "name": "decisionDialog"
              },
              "apiParams": [
                { "query": "investigationId", "beItem": "id" },
                { "query": "capaRequired", "element": "capaCheck", "type": "check" },
                { "query": "capaFieldName", "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id" },
                { "query": "capaFieldValue", "targetValue": true }
              ]
            },
            {
              "actionName": "CLOSE_INVESTIGATION",
              "clientMethod": "closeInvestigation",
              "endPoint": "/app/InvestigationAPI",
              "button": {
                "title": {
                  "label_en": "Close", "label_es": "Cerrar"
                },
                "whenDisabled": "selectedSamples"
              },
              "apiParams": [
                { "query": "investigationId", "beItem": "id" }
              ]
            }
          ]
        }
      ]
    }
  }