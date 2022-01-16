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
                "newLot": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" },
                "activateLot": { "label_en": "Production Lot Name to reactivate", "label_es": "Nombre para el lote de producción a reactivar" }
            },
            "gridHeader": {
                name: {
                    "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%"
                },
                family: {
                    "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
                },
                on_line: {
                    "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                created_on: {
                    "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                locked_reason: {
                    "label_en": "Locked Reason", "label_es": "Razón del bloqueo", "sort": false, "filter": false, "is_icon": false, "width": "10%"
                },
                detail: {
                    "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                last_calibration: {
                    "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                next_calibration: {
                    "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                last_prev_maint: {
                    "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                next_prev_maint: {
                    "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
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
                "endPoint": "/app/procs/InstrumentsAPIactions",
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
                    { "query": "lotName", "element": "lotInput" },
                    { "query": "fieldName", "value": "active" },
                    { "query": "fieldValue", "value": "true*Boolean" }
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
                    "automatic": true
                }
            },
            {
                "actionName": "TURN_OFF_LINE",
                "clientMethod": "setInstruments",
                "button": {
                    "icon": "alarm_off",
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
                    "icon": "alarm_on",
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
                    "icon": "alarm_on",
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
                    "icon": "alarm_on",
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
                "actionName": "START_VERIFICATION",
                "clientMethod": "setInstruments",
                "button": {
                    "icon": "alarm_on",
                    "title": {
                        "label_en": "Start Verification", "label_es": "Iniciar Verificación"
                    },
                    "whenDisabled": "selectedSamples"
                },
                "apiParams": [
                    { "query": "instrumentName", "beItem": "name" }
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
                "newLot": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" },
                "activateLot": { "label_en": "Production Lot Name to reactivate", "label_es": "Nombre para el lote de producción a reactivar" }
            },
            "gridHeader": {
                instrument: {
                    "label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%"
                },
                event_type: {
                    "label_en": "Event", "label_es": "Evento", "sort": false, "filter": true, "is_icon": false, "width": "20%"
                },
                created_on: {
                    "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
                },
                created_by: {
                    "label_en": "Creator", "label_es": "Creador", "sort": false, "filter": false, "is_icon": false, "width": "10%"
                },
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
                "actionName": "COMPLETE_CALIBRATION",
                "clientMethod": "setInstruments",
                "button": {
                    "icon": "alarm_on",
                    "title": {
                        "label_en": "Complete Calibration", "label_es": "Completar Calibración"
                    },
                    "whenDisabled": "selectedSamples"
                },
                "apiParams": [
                    { "query": "instrumentName", "beItem": "instrument" },
                    { "query": "decision", "value": "ACCEPTED" }
                ]
            },
            {
                "actionName": "COMPLETE_PREV_MAINT",
                "clientMethod": "setInstruments",
                "button": {
                    "icon": "alarm_on",
                    "title": {
                        "label_en": "Complete Prev Maint", "label_es": "Completar Mantenimiento Prev"
                    },
                    "whenDisabled": "selectedSamples"
                },
                "apiParams": [
                    { "query": "instrumentName", "beItem": "instrument" },
                    { "query": "decision", "value": "ACCEPTED" }
                ]
            },
            {
                "actionName": "COMPLETE_VERIFICATION",
                "clientMethod": "setInstruments",
                "button": {
                    "icon": "alarm_on",
                    "title": {
                        "label_en": "Complete Verification", "label_es": "Completar Verificación"
                    },
                    "whenDisabled": "selectedSamples"
                },
                "apiParams": [
                    { "query": "instrumentName", "beItem": "instrument" },
                    { "query": "decision", "value": "ACCEPTED" }
                ]
            }
        ]
    },
}