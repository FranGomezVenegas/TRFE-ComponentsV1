export const AppProc = {
  "PlatformInstruments": {
    "langConfig": {
      "title": {
        "InstrumentsList": {
          "label_en": "Active Instruments",
          "label_es": "Instrumentos activos"
        }
      },
      "fieldText": {
        "newInstrument": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" },
        "familyName": { "label_en": "Family", "label_es": "Familia" },
        "instrumentName": { "label_en": "Instrument Name", "label_es": "Nombre del instrumento" },
        "lotDays": { "label_en": "Number of Days", "label_es": "Número de Días" }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "locked_reason": {
          "label_en": "Locked Reason", "label_es": "Razón del bloqueo", "sort": false, "filter": false, "is_icon": false, "width": "10%"
        },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "actions": [
      {
        "actionName": "ACTIVE_INSTRUMENTS_LIST",
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
        "actionName": "NEW_INSTRUMENT",
        "clientMethod": "setInstruments",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "newInstrumentDialog"
        },
        "apiParams": [
          { "query": "instrumentName", "element": "instrumentInput" },
          { "query": "familyName", "element": "instrumentFamilyInput" },
          { "query": "fieldName", "value": "description" },
          { "query": "fieldValue", "value": "hola*String" }
        ]
      },
      {
        "actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",
        "clientMethod": "getInstrumentAudit",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit",
            "label_es": "Auditoría de Instrumento"
          },
          "whenDisabled": "selectedSamples"
        },
        "dialogInfo": { 
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "clientMethod": "signAudit",
              "apiParams": [
                { "query": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "TURN_OFF_LINE",
        "clientMethod": "setInstruments",
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "TURN_ON_LINE",
        "clientMethod": "setInstruments",
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "START_CALIBRATION",
        "clientMethod": "setInstruments",
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "START_PREV_MAINT",
        "clientMethod": "setInstruments",
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "START_SERVICE",
        "clientMethod": "setInstruments",
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "START_VERIFICATION",
        "clientMethod": "setInstruments",
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "whenDisabled": "selectedSamples"
        },
        "apiParams": [
          { "query": "instrumentName", "beItem": "name" }
        ]
      },
      {
        "actionName": "DECOMMISSION_INSTRUMENT",
        "clientMethod": "setInstruments",
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Decommission", "label_es": "Retiro definitivo"
            },
            "whenDisabled": "selectedSamples"
        },
        "apiParams": [
            { "query": "instrumentName", "beItem": "name" }
        ]
    },
    {
        "actionName": "UNDECOMMISSION_INSTRUMENT",
        "clientMethod": "setInstruments",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Undecommission", "label_es": "Recuperar inst. retirado"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "undecomInstrDialog",
          "action": [
            {
              "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
              "clientMethod": "getDeactivatedInstruments",
              "apiParams": [
                { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 }
              ]
            }
          ]
        },
        "apiParams": [
          { "query": "instrumentName", "element": "lotName" }
        ]
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
        "event_type": {
          "label_en": "Event", "label_es": "Evento", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "instrument": {
          "label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
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