export const Genoma1 = {
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
            "id":{"name": "id", "label_en":"Id", "label_es": "Id", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "name":{"name": "name", "label_en":"Name", "label_es": "Nombre", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "value":{"name": "value", "label_en":"Value", "label_es": "Valor", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "variable_set":{"name": "variable_set", "label_en":"Var Set", "label_es": "Conjunto", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "type":{"name": "type", "label_en":"Type", "label_es": "Tipo", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "owner_table":{"name": "owner_table", "label_en":"Owner", "label_es": "Dueño", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "owner_id":{"name": "owner_id", "label_en":"Owner Id", "label_es": "Id Dueño", "sort":false, "filter":true, "is_icon":false, "width":"20%"},    
            "sample":{"name": "sample", "label_en":"Sample", "label_es": "Muestra", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "individual":{"name": "individual", "label_en":"Individual", "label_es": "Individuo", "sort":false, "filter":true, "is_icon":false, "width":"20%"},
            "family":{"name": "family", "label_en":"Family", "label_es": "Familia", "sort":true, "filter":false, "is_icon":false, "width":"20%"}    
        }
      },
      "viewQuery":
      {
        "actionName": "ALL_ACTIVE_PROJECTS",
        "clientMethod": "getGenomaProjectsList",
        "addRefreshButton": true,
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "requiresGridItemSelected": true
        },
        "subAction": {
          "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList"
        }
      },
      "actions": [
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
        "hasOwnComponent": true,
        "viewQuery":
        {
          "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList",
          "addRefreshButton": true,
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          },
          "subAction": {
              "actionName": "ALL_ACTIVE_PROJECTS",
              "clientMethod": "getGenomaProjectsList"
          }
        },
      "actions": [
        {
          "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList",
          "addRefreshButton": true,
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          },
          "subAction": {
              "actionName": "ALL_ACTIVE_PROJECTS",
              "clientMethod": "getGenomaProjectsList"
          }
        }
        ]
      }
  }