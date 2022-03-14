import { actions } from './module_em/actions';

export const EmAir = {
  "link": "http://somewhere",
  "ProductionLots": {
    "viewType": "button-grid",
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
      actions.GET_ACTIVE_PRODUCTION_LOTS,
      actions.EM_NEW_PRODUCTION_LOT,
      actions.EM_ACTIVATE_PRODUCTION_LOT,
      actions.EM_DEACTIVATE_PRODUCTION_LOT
    ]
  }
}