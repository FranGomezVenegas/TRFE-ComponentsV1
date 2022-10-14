export const ProcManagement = {
  "ProcedureDefinition": {
    "elementType": "trazitfilterview",
    "display": true,
    
    "viewDefinition":[
    {    
      "action": "ALL_PROCEDURES_DEFINITION",
      "label_en": "All Procedures Definition", 
      "label_es": "Definición de todos los procesos", 
      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
      "button_label_en": "Run", 
      "button_label_es": "Ejecutar",
      "filter":{
        "fixParams": {
        },
        "filterFields":[
        ],
        "extraParams": [
        ]      
      },
      "reportElements":[
        [
          {"type": "cardWithImage", "elementName":"all_platform_procedures_list",
            "imageFld": "navigation_icon_name", "imageStyle": "height:15vw width:30vw;",
            "detailContent": {"elementName": "definition", "elementType": "jsonviewer"},
            "fieldsToDisplayHeader":[
              {"name": "procedure_name"}
            ],
            "fieldsToDisplayFooter":[    
              {
              "style":"font-size:20px; font-weight: bold;",       
              "fields":[
                {"name": "procedure_name", "style":"font-size:20px; font-weight: bold;"}, {"name": "procedure_version"}                              
              ]
              },
              {
                "style":"font-size:20px;",       
                "fields":[
                  
                ]
              }                
            ],
            "buttons": [
            ]
          }
        ],
        [
          {"type": "jsonviewer", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"all_platform_procedures_list", "subheadingObj": "text1"}
        ]
      ]  
    }
    ]
  },
  "ProcedureDeployment": {
    "elementType": "trazitfilterview",
    "display": true,
    
    "viewDefinition":[
    {    
      "action": "DEPLOY_REQUIREMENTS",
      "label_en": "Deploy Requirements", 
      "label_es": "Desplegar Requerimientos", 
      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
      "button_label_en": "Run", 
      "button_label_es": "Ejecutar",
      "filter":{
        "fixParams": {
        },
        "filterFields":[
          {"text1": { "label_en": "Proc Name", "label_es": "Proceso", "default_value": "sample-coa" }},
          {"number1": { "label_en": "Version", "label_es": "Proceso", "default_value": "1" }},
          {"text2": { "label_en": "Instance Name", "label_es": "Instancia", "default_value": "sample-coa-rel1" }},
          {"text3": { "label_en": "Module Name", "label_es": "Nombre del Módulo", "default_value": "SAMPLES" }},
          {"checkbox1": { "label_en": "Schemas and Proc Tables", "label_es": "Excluir Personal", "default_value": true }},
          {"checkbox2": { "label_en": "Procedure Info", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
          {"checkbox3": { "label_en": "Procedure User & Roles", "label_es": "Incluir Microorganismos", "default_value": true }},
          {"checkbox4": { "label_en": "SOPs", "label_es": "Excluir Personal", "default_value": false }},
          {"checkbox5": { "label_en": "Assign SOPs to Users", "label_es": "Excluir Lecturas no entradas aún", "default_value": false }},
          {"checkbox6": { "label_en": "Events", "label_es": "Incluir Microorganismos", "default_value": false }},
          {"checkbox7": { "label_en": "Business Rules", "label_es": "Excluir Personal", "default_value": false }},
          {"checkbox8": { "label_en": "Module Tables and Fields", "label_es": "Excluir Lecturas no entradas aún", "default_value": false }},
          {"checkbox9": { "label_en": "Master Data", "label_es": "Incluir Microorganismos", "default_value": false }},
        ],
        "extraParams": [
          {"argumentName": "procedureName", "element": "text1"},
          {"argumentName": "procedureVersion", "element": "number1"},
          {"argumentName": "procInstanceName", "element": "text2"},
          {"argumentName": "moduleName", "element": "text3"},
          {"argumentName": "deployRepositoriesAndProcTbls", "element": "checkbox1"},
          {"argumentName": "deployProcInfo", "element": "checkbox2"},
          {"argumentName": "deployProcUserRoles", "element": "checkbox3"},
          {"argumentName": "deployProcSopMetaData", "element": "checkbox4"},
          {"argumentName": "deployProcSopsToUsers", "element": "checkbox5"},
          {"argumentName": "deployProcEvents", "element": "checkbox6"},
          {"argumentName": "deployProcBusinessRulesPropFiles", "element": "checkbox7"},
          {"argumentName": "deployModuleTablesAndFields", "element": "checkbox8"},
          {"argumentName": "deployMasterData", "element": "checkbox9"}
        ]      
      },
      "reportElements":[
        [
          {"type": "jsonviewer", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"sections_log", "subheadingObj": "text1"}
        ]          
      ]  
    }
    ]
  },
  "ProcedureDeploymentChecker": {
    "elementType": "trazitfilterview",
    "display": true,
    
    "viewDefinition":[
    {    
      "action": "PROC_DEPLOY_CHECKER",
      "label_en": "Deploy Requirements Checker", 
      "label_es": "Verificador del Despliegue de Requerimientos", 
      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
      "button_label_en": "Run", 
      "button_label_es": "Ejecutar",
      "filter":{
        "fixParams": {
        },
        "filterFields":[
          {"text1": { "label_en": "Proc Name", "label_es": "Proceso", "default_value": "sample-coa" }},
          {"number1": { "label_en": "Version", "label_es": "Proceso", "default_value": "1" }},
          {"text2": { "label_en": "Instance Name", "label_es": "Instancia", "default_value": "sample-coa-rel1" }},
        ],
        "extraParams": [
          {"argumentName": "procedureName", "element": "text1"},
          {"argumentName": "procedureVersion", "element": "number1"},
          {"argumentName": "procInstanceName", "element": "text2"},
        ]      
      },
      "reportElements":[
        [
          {"type": "cardWithImage", "elementName":"sections_log",
            "imageFld": "pass_icon", "imageStyle":"width:50px;",
            "detailContent": {"elementName": "definition", "elementType": "jsonviewer"},
            "fieldsToDisplayHeader":[
              {"name": "procedure_name"}
            ],
            "fieldsToDisplayFooter":[    
              {
              "style":"font-size:20px; font-weight: bold;",       
              "fields":[
                {"name": "index", "hideLabel":true}, {"name": "section_label_en", "hideLabel":true}]
              }
            ],
            "buttons": [
            ]
          }
        ],
        [
          {"type": "jsonviewer", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"sections_log", "subheadingObj": "text1"}
        ]
      ]  
    }
    ]
  },
  "ProcedureTestingScripts": {
    "elementType": "trazitfilterview",
    "display": true,
    
    "viewDefinition":[
    {    
      "action": "ALL_PROCEDURE_TESTING_SCRIPT",
      "label_en": "Procedure Testing Scripts", 
      "label_es": "Guiones de pruebas del proceso", 
      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
      "button_label_en": "Run", 
      "button_label_es": "Ejecutar",
      "filter":{
        "fixParams": {
        },
        "filterFields":[
          {"text1": { "label_en": "Proc Name", "label_es": "Proceso", "default_value": "em-demo-a"}},
          {"number1": { "label_en": "Version", "label_es": "Proceso", "default_value": "1" }},
          {"text2": { "label_en": "Instance Name", "label_es": "Instancia", "default_value": "em-demo-a" }},
        ],
        "extraParams": [
          {"argumentName": "procedureName", "element": "text1"},
          {"argumentName": "procedureVersion", "element": "number1"},
          {"argumentName": "procInstanceName", "element": "text2"},
        ]      
      },
      "reportElements":[
        [
          {"type": "cardNoImage", "elementName":"scripts_list",
          "imageFld": "navigation_icon_name", 
          "detailContent": {"elementName": "steps", "elementType": "datatable",
          "fieldsToDisplay":[
            {"property": "step_id", "header": "Id"}, 
            {"property": "argument_01", "header": "Action"}, 
            {"property": "argument_01", "header": "Action"}, 
            {"property": "expected_syntaxis", "header": "Expected Syntaxis"}, 
            {"property": "expected_code", "header": "Expected Code"}, 
            {"property": "function_syntaxis", "header": "Run Syntaxis"}, 
            {"property": "function_code", "header": "Run Code"}, 
            {"property": "time_consume", "header": "Time"}, 
            ] 
            },
          "fieldsToDisplayHeader":[
            {"name": "script_id"}
          ],
          "fieldsToDisplayFooter":[
            {"name": "script_id", "style":"font-size:20px; font-weight: bold;"}, {"name": "purpose"}, 
            {"name": "date_execution"}, {"name": "run_summary"}, {"name": "time_consume"}            
          ],
          "buttons": [
            { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
              "clientMethod": "moveToNext",
              "button": {
                "class": "reverse",
                "icon": "next_week",
                "title": {
                  "label_en": "Previous", "label_es": "Previo"
                },
                             
              },
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" }
              ]    
            },
            { "actionName": "SAMPLESTAGE_MOVETONEXT",
              "clientMethod": "moveToNext",
              "selObjectVariableName": "selectedProcInstance",
              "button": {
                "icon": "next_week",
                "title": {
                  "label_en": "Next", "label_es": "Siguiente"
                },
                "requiresObjectSelected": true 
              },
              "apiParams": [
                { "query": "sampleId", "beItem": "sample_id" }
              ],
              "dialogInfo": { 
                "requiresDialog": true,
                "name": "genericFormDialog",
                "fieldText": [
                  {"text1": { "label_en": "Variable", "label_es": "Variable" }}
                ]                      
              }
            }
          ]
        }
        ],
        [
          {"type": "jsonviewer", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"steps", "subheadingObj": "text1"}
        ]
      ]  
    }
    ]
  },
  "ProcedureTestingCoverage": {
    "elementType": "trazitfilterview",
    "display": true,
    
    "viewDefinition":[
    {    
      "action": "PROC_DEPLOY_TESTING_COVERAGE_SUMMARY",
      "label_en": "Testing Coverage Summary", 
      "label_es": "Resumen Cobertura de las pruebas", 
      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
      "button_label_en": "Run", 
      "button_label_es": "Ejecutar",
      "filter":{
        "fixParams": {
        },
        "filterFields":[
          {"text1": { "label_en": "Proc Name", "label_es": "Proceso", "default_value": "sample-coa" }},
          {"number1": { "label_en": "Version", "label_es": "Proceso", "default_value": "1" }},
          {"text2": { "label_en": "Instance Name", "label_es": "Instancia", "default_value": "sample-coa-rel1" }},
        ],
        "extraParams": [
          {"argumentName": "procedureName", "element": "text1"},
          {"argumentName": "procedureVersion", "element": "number1"},
          {"argumentName": "procInstanceName", "element": "text2"},
        ]      
      },
      "reportElements":[
        [
          {"type": "grid", "title":{"label_en": "Mirror mismatches found between data repositories", "label_es": "Encontradas diferencias en el espejo que deben ser los repositorios de datos"}, 
           "elementName": "not_mirror", "subelementName": "data", "fieldsToDisplay":[
              {"property": "schema", "header": "Schema"}, 
              {"property": "table_name", "header": "Table"}, 
              {"property": "field_name", "header": "Field"}, 
           ] 
          }          
        ],
        [
          {"type": "jsonviewer", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"all_testing_coverage_list", "subheadingObj": "text1"}
        ]
      ]  
    }
    ]
  },
  
}
