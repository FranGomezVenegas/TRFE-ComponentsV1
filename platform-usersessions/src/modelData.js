export const ModelData = {
  "viewQuery": {
    "actionName": "GET_LOT_INFO",
  "notUseGrid": true,
    "button": {
      "icon": "refresh",
      "title": {
        "label_en": "Reload",
        "label_es": "Recargar"
      },
      "requiresGridItemSelected": false
    },
    "endPointParams": [
      {
        "argumentName": "sessionId",
        "element": "text1"
      }
    ]
  },  
    "filter_button": {
        "label_en": "Search",
        "label_es": "Buscar"
    },
    "filter": [
        {
          "text1": {
            "label_en": "session id",
            "label_es": "Id de Sesión",
            "fixValue": "19641"
          }
        }
    ],  
    "filterResultDetail":{
      "type":  "list",
      "detail":[
        {"field": "session_id"},
        {"field": "date_started"},
        {"field": "person"},
        {"field": "role_name"}
      ]        
    },
    "detail":{
      "header":
        { "type": "cardSomeElementsSingleObject", "endPointResponseObject": "ROOT",
        "hideNoDataMessage": true,
        "title": {
          "label_en": "Session Audit",
          "label_es": "Auditoría de la sessión"
        },
        "subtitle": {
          "label_en": "Lot Info",
          "label_es": "Información del Lote"
        },
        "fieldsToDisplay": [
          {
            "name": "person",
            "label_en": "User",
            "label_es": "Usuario"
          },
          {
            "name": "role_name",
            "label_en": "User role",
            "label_es": "Perfil de usuario"
          },
          {
            "name": "material_name",
            "label_en": "Material",
            "label_es": "Material"
          },
          {
            "name": "quantity",
            "name2": "quantity_uom",
            "label_en": "Quantity",
            "label_es": "Cantidad"
          },
          {
            "name": "num_containers",
            "label_en": "Num. Containers",
            "label_es": "Núm. Contenedores"
          },
          {
            "name": "bulk_decision",
            "name2": "bulk_decision_by",
            "name3": "bulk_decision_by",
            "label_en": "Bulks decision",
            "label_es": "Decisión en los bultos"
          },
          {
            "name": "sampling_plan",
            "label_en": "sampling_plan",
            "label_es": "sampling_plan"
          },
          {
            "name": "analysis_status",
            "label_en": "analysis_status",
            "label_es": "analysis_status"
          }
        ],
    }  
    }        
}