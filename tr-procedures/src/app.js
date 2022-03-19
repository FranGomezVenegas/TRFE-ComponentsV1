export const App = {
  "WhiteIpList": {
    "langConfig": {
      "title": {
        "WhiteIpList": {
          "label_en": "White (Accepted) IPs List",
          "label_es": "Lista de IPs aceptadas (Blancas)"
        }
      },
      "fieldText": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
      }
    },
    "actions": [
      {
        "actionName": "GET_WHITE_IP_LIST",
        "clientMethod": "getSamples",
        "endPoint": "/app/PlatformAdminQueries",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        }
      },
      {
        "actionName": "ADD_WHITE_IP",
        "clientMethod": "setWhiteIpsList",
        "endPoint": "/app/PlatformAdminQueries",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "newIPEntryDialog"
        },
        "apiParams": [
          { "query": "ip_value1", "element": "ipValue1Input" },
          { "query": "ip_value2", "element": "ipValue2Input" },
          { "query": "ip_value3", "element": "ipValue3Input" },
          { "query": "ip_value4", "element": "ipValue4Input" },
          { "query": "description", "element": "ipDescriptionInput" }
        ]
      },
      {
        "actionName": "DEACTIVATE_WHITE_IP",
        "clientMethod": "setWhiteIpsList",
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" }
        ]
      },
      {
        "actionName": "ACTIVATE_WHITE_IP",
        "clientMethod": "setWhiteIpsList",
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" }
        ]
      },
      {
        "actionName": "UPDATE_WHITE_IP",
        "clientMethod": "setWhiteIpsList",
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Update", "label_es": "Modificar"
            },
            "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "updateIPEntryDialog"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" },
          { "query": "ip_value1", "element": "ipValue1Input" },
          { "query": "ip_value2", "element": "ipValue2Input" },
          { "query": "ip_value3", "element": "ipValue3Input" },
          { "query": "ip_value4", "element": "ipValue4Input" },
          { "query": "description", "element": "ipDescriptionInput" }
        ]
    },
    {
      "actionName": "REMOVE_WHITE_IP",
      "clientMethod": "setWhiteIpsList",
      "button": {
        "img": "activate.svg",
        "title": {
          "label_en": "Remove", "label_es": "Borrar"
        },
        "whenDisabled": "selectedSamples"
      },
      "apiParams": [
        { "query": "id", "beItem": "id" }
      ]
    }
    ]
  },
  "BlackIpList": {
    "langConfig": {
      "title": {
        "BlackIpList": {
          "label_en": "Black (Banned) IPs List",
          "label_es": "Lista de IPs bloqueadas (Baneadas)"
        }
      },
      "fieldText": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
      }
    },
    "actions": [
      {
        "actionName": "GET_BLACK_IP_LIST",
        "clientMethod": "getSamples",
        "endPoint": "/app/PlatformAdminQueries",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        }
      },
      {
        "actionName": "ADD_BLACK_IP",
        "clientMethod": "setBlackIpsList",
        "endPoint": "/app/PlatformAdminQueries",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "newIPEntryDialog"
        },
        "apiParams": [
          { "query": "ip_value1", "element": "ipValue1Input" },
          { "query": "ip_value2", "element": "ipValue2Input" },
          { "query": "ip_value3", "element": "ipValue3Input" },
          { "query": "ip_value4", "element": "ipValue4Input" },
          { "query": "description", "element": "ipDescriptionInput" }
        ]
      },
      {
        "actionName": "DEACTIVATE_BLACK_IP",
        "clientMethod": "setBlackIpsList",
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" }
        ]
      },
      {
        "actionName": "ACTIVATE_BLACK_IP",
        "clientMethod": "setBlackIpsList",
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" }
        ]
      },
      {
        "actionName": "UPDATE_BLACK_IP",
        "clientMethod": "setBlackIpsList",
        "button": {
            "icon": "alarm_on",
            "title": {
              "label_en": "Update", "label_es": "Modificar"
            },
            "whenDisabled": "selectedSamples"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "updateIPEntryDialog"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" },
          { "query": "ip_value1", "element": "ipValue1Input" },
          { "query": "ip_value2", "element": "ipValue2Input" },
          { "query": "ip_value3", "element": "ipValue3Input" },
          { "query": "ip_value4", "element": "ipValue4Input" },
          { "query": "description", "element": "ipDescriptionInput" }
        ]
      },
      {
        "actionName": "REMOVE_BLACK_IP",
        "clientMethod": "setBlackIpsList",
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Remove", "label_es": "Borrar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "id", "beItem": "id" }
        ]
      }  
    ]
  },
  "PlatformBusRules": {
    "langConfig": {
      "title": {
        "platformBusRules": {
          "label_en": "Platform Business Rules",
          "label_es": "Reglas de Negocio de la Plataforma"
        }
      },
      "fieldText": {
        "newInstrument": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" },
        "familyName": { "label_en": "Family", "label_es": "Familia" },
        "instrumentName": { "label_en": "Instrument Name", "label_es": "Nombre del instrumento" },
        "lotDays": { "label_en": "Number of Days", "label_es": "Número de Días" }
      },
      "gridHeader": {
        "area": {
          "label_en": "Area", "label_es": "Área", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "rule_name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "rule_value": {
          "label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "disabled": {
          "label_en": "Disabled?", "label_es": "¿Deshabilitada?", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
      }
    },
    "actions": [
      {
        "actionName": "GET_PLATFORM_BUSINESS_RULES",
        "clientMethod": "getSamples",
        "endPoint": "/app/PlatformAdminQueries",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        }
      }
    ]
  },
  "EventsInProgress": {
    "langConfig": {
      "title": {
        "InstrumentsList": {
          "label_en": "Events in progress",
          "label_es": "Eventos en curso"
        }
      },
      "fieldText": {
        "decision": { "label_en": "Decision", "label_es": "Decisión",
            "items":[
              {"keyName":"ACCEPTED", "keyValue_en":"Accepted", "keyValue_es":"Aceptado"},
              {"keyName":"ACCEPTED_WITH_RESTRICTIONS", "keyValue_en":"Accepted with restrictions", "keyValue_es":"Aceptado con restricciones"},
              {"keyName":"REJECTED", "keyValue_en":"Rejected", "keyValue_es":"Rechazado"}
            ]}

      },
      "gridHeader": {
        "instrument": {
          "label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "event_type": {
          "label_en": "Event", "label_es": "Evento", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "created_by": {
          "label_en": "Creator", "label_es": "Creador", "sort": false, "filter": false, "is_icon": false, "width": "10%"
        }
      },
      "resultHeader": {
        "event_id": {
          "label_en": "Event Id", "label_es": "Id Event"
        },
        "param_name": {
          "label_en": "Parameter", "label_es": "Parámetro"
        },
        "value": {
          "label_en": "Value", "label_es": "Valor"
        }
      }
    },
    "actions": [
      {
        "actionName": "INSTRUMENT_EVENTS_INPROGRESS",
        "clientMethod": "getSamples",
        "endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "whenDisabled": "samplesReload"
        }
      },
      {
        "actionName": "COMPLETE",
        "clientMethod": "completeInstrumentEvent",
        "dialogInfo": {
            "name": "completeInstrumentEventDialog",
            "requiresDialog": true
        },
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Complete Event", "label_es": "Completar Evento"
            },
            "whenDisabled": "selectedSamples"
        },
        "apiParams": [
            { "query": "instrumentName", "beItem": "instrument" },
            { "query": "decision", "beItem": "decision" }
        ]
    },
    {
      "actionName": "INSTRUMENT_EVENT_VARIABLES",
      "clientMethod": "getInstEventResult",
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
            "actionName": "ENTER_EVENT_RESULT",
            "clientMethod": "enterEventResult",
            "apiParams": [
              { "query": "newValue", "targetValue": true },
              { "query": "eventId", "targetValue": true },
              { "query": "instrumentName", "targetValue": true },
              { "query": "variableName", "targetValue": true }
            ]
          }
        ]
      },
      "apiParams": [
        { "query": "eventId", "beItem": "id"}
      ]
    }
  ]
  }
}