# \<tr-procedures>
Component core for procedures elements with dynamic model

This v2 is a refactor of v1 then no new features are added but trying to reduce the number of lines and even harmonize some areas where naming is not clear taking advantage the v1 was completed

## Installation

```bash
./install.sh
```

## Local Demo with `web-dev-server`

```bash
npm run start
```
This area want to track the bugs identified for this Web Component that were already implemented/fixed.
[- #201. Buttons 'ButtonHide' property name hideWhen.... not hidWhen....typo](https://github.com/FranGomezVenegas/FE-Issues/issues/201)

[- #927. 2023-Sep-05 Issue for open and remove attachments within genericDialog](https://github.com/FranGomezVenegas/FETR/issues/927)

[- #930. 2023-Sep-05 default value when element is not present(null) within genericDialog](https://github.com/FranGomezVenegas/FETR/issues/930)

[- #929. 2023-Sep-06 buttonFunction when running dialog queries had bad variable reference](https://github.com/FranGomezVenegas/FETR/issues/929)

[- #929. 2023-Sep-06 Open and remove attachments dialog generating loop endpoints call, the logic should be in ButtonFunctions and not in TrazitGenericDialog itself](https://github.com/FranGomezVenegas/FETR/issues/929)

[- #927. 2023-Sep-07 Issue for removing attachments within genericDialog, the grid parameter not added to the API request, fixed.](https://github.com/FranGomezVenegas/FETR/issues/927)

[- #324. 2024-Apr-16 Arrows in the procedure management are not working properly after clicking its title](https://github.com/FranGomezVenegas/FrontE-Issues/issues/324)

[- #196. Check Mandatory Fields not filled](https://github.com/FranGomezVenegas/FE-Issues/issues/196)
[- #197. Reset Fields one action performed](https://github.com/FranGomezVenegas/FE-Issues/issues/197)
[- #198. Not allowed negative numDays for Reactivate Dialog](https://github.com/FranGomezVenegas/FE-Issues/issues/198)
[- #199. Buttons 'buttonForQuery' was enabling the button always even when no record selected](https://github.com/FranGomezVenegas/FE-Issues/issues/199)

## Versioning track

v0.0.1 model up to 2.0
v0.0.2 model 2.1
v0.1.0 QA cleaning, sonarcloud
v0.2.1 multilist default values
v0.2.2 fix issue when clicking one rowButton having the children open
v0.2.3 dropzone to upload file, preview duplicated page preview fixed
v0.2.4 improved file attachments dialog
v0.2.5 readOnlyTable, let cell be edited directly having one action linked and moving the focus to the next row,same column.
v0.2.6 Fix for tables disappearing when clicking on it and for tabs
v0.2.7 Styling, thin padding for th and td
v0.2.8 Styling applied same style from specLimitsQuantitative to cell edit for tables and Enter Results dialog
v0.2.9 avoid is_locked when undefined in grid_with_buttons and button to display/hide cards
v0.2.10 lock/unlock action for procedures
v0.2.11 Disabledd jsonDiffViewer
v0.2.12 Run the refreshMasterData just in case of request status 200 and the response contains master_data property
v0.2.13 [- #369. Reset Fields one action performed](https://github.com/FranGomezVenegas/FrontE-Issues/issues/369)
v0.2.14 Proc-definition main cards view compatible with confirm dialogs, added serialPort and TrackWise Integrity to prototype
v0.2.15 fix for reset values when selecting entries from one list element
v0.2.16 Integrated some dev solutions into the master
v0.2.17 vaadin-grid for grid-with-buttons, header backgroundcolor white and height 65vh
v0.2.18 fix for trazit form filters
v0.2.19 draft for flipcard
v0.2.20 drag&drop for object by tabs
v0.2.21 TrazitInvestigationDialog should use method formDefaultValue instead of defaultValue
v0.2.22 getServiceAPIUrl creation to manage the multi-services API
This area want to track the requirements that made this web component to become a reality.
v0.2.23 some changes:
    Download csv from data mining be separated by semi-color (;) to open it directly in the right format.
    Tree-view for dialogs
    preview-files component
v0.2.24 refresh master data wrong chronologically, run when the getViewData was performed and should be about to this to get the master data from the action, not the query.    
v0.2.25 fix for highlights in audit, ckeditor and upload by POST
v0.2.26 audit dialog included for objecttab-composition, required for inspection lots
v0.2.27 twolistslinked
v0.2.28 tree-viewfran
v0.2.29 set contextVariableValue variables in storageSession and get it from there when not in context
v0.2.30 api functions, when the view or button requires apply subViewFilter then it was endpointParams or subViewFilter and we need to have arguments complementary in both places.
v0.2.31 Flipcard draft and added to the home pages.
v0.2.32 fix for upload aws files
v0.2.33 fix, not display undefined when title is empty
v0.2.34 get backendUrl from sessionStorage when not in context instead of fetching the config file due to the path to config.json is not always in the same path
v0.2.35 Added spinning for GetViewData and all POST actions with files
[- v0.2.36 #380. The table readOnlyTable needs its own lateral scroll](https://github.com/FranGomezVenegas/FrontE-Issues/issues/380)
[- v0.2.37 Serial Port view]
[- v0.2.38 not change ready in resetView for grid with buttons]
[- v0.2.39 serial port with table for the readings]
[- v0.2.40 grid-with-buttons, resetView function name changed due to it impacted with other places]
[- v0.2.41 use Object By Tabs to replace Vaadin grid asap](https://github.com/FranGomezVenegas/FrontE-Issues/issues/380)
[- v0.2.42 multi-select and created SingleView as ObjectByTabs for single view-tab, to replace vaading table with buttons](https://github.com/FranGomezVenegas/FrontE-Issues/issues/365)
[- v0.2.43 smart filter for readOnlyTable](https://github.com/FranGomezVenegas/FrontE-Issues/issues/217)
[- v0.2.44 in ButtonsFunctions the query for grid for dialog had a typo when added the getServiceUrl line]
[- v0.2.45 exporTableToCsv with allowUserSelectColumn behavior](https://github.com/FranGomezVenegas/FrontE-Issues/issues/352)
[- v0.2.46 fix parentReadOnlyTable should pass the selectedItems instead of all dataArr to the buttons]
[- v0.2.47 fix for SingleView, ready mechanism to re-run the query when jumping from one view/tab to anoter]
[- v0.2.48 SingleView compatible with twoicons]
[- v0.2.49 Added label preview prototype]
[- v0.2.50 printable for read only tables]
[- v0.2.51 export to csv, all data when nothing selected fixed]
[- v0.2.52 the refreshable, printable, downloadable enabled by default should be only for tables]
[- v0.2.53 Moving from getDataFromRoot to TRAZiTgetDataFromRoot to make all components point to ApiFunctions instead of local instances]
[- v0.2.54 Moving from getDataFromRoot to TRAZiTgetDataFromRoot to make all components point to ApiFunctions instead of local instances, rev2]
[- v0.2.55 some look'n'feel for dragdropbox]
[- v0.2.56 fix for requirements solution, add solution dialog]
[- v0.2.57 tree-view as view retired and selectedData for actions fix]
[- v0.2.58 tree-element for dialogs and sort storybook sections]
[- v0.2.59 table styles and printable for procManagement to remove the sort icons here too]
[- v0.2.60 fixed ONE_PROCEDURE_DEFINITION, added endpointParams]
[- v0.2.61 fix in trazitCheckProcList, isProcManagement from this instead of sessionStorage]
[- v0.2.62 fix for new test script, using lit-element when should be lit for compatibility reasons]
[- v0.2.63 fix when no subfilter for kpiReportTitle + use lit instead of lit-element]
[- v0.2.64 Added locked reason to (parent)readOnlyTable]
[- v0.2.65 for reactivate element, display notification when no objects found by the criteria]
[- v0.2.66 fix in trazitCheckProcList, handle nulls as undefineds]
[- v0.2.67 use this.procInstanceName when userSession.currentProcInstanceName undefined]
[- v0.2.68 handle in btnHidden when selItems is undefined]
[- v0.2.69 some issues:
    - (related to v0.2.66) fix in getAPICommonParams, handle nulls as undefineds
    - fix to not add arrays of arrays in selectedItems    
]
[- v0.2.70 Tabs component using object-by-tabs]
[- v0.2.71 defaultValue added and selObjectPropertyName should get it from selectedItem{} and not selectedItem[0]
[- v0.2.72 use lit instead of lit-element]
[- v0.2.73 removed @vaadin/vertical-layout and vaadin-accordion due to they use different vaadin-lumo-styles version than the rest and even those vaadin components are not longer in use"
[- v0.2.74 ObjectByTabs tab label responsive. proc-management-home banner fixed]
[- v0.2.75
    - Refactor: removed clientMethod procMngRequirementsMethod
    - Refactor: action models for proc definition, removed property clientMethod:procMngRequirementsMethod and endpoint to get the one fron the API module settings
    - Refactor: apiFunctions, exclude ProcInstanceName for this.isProcManagement
]
[- v0.2.76 load notifications for local dev not duplicating with the app ones]
[- v0.2.77 Removed program-proc]
[- v0.2.78 clean some unused imports/installed components]
[- v0.2.79 fix for parent-child table]
[- v0.2.80 spec icons in enter results did not appear as icon, appeared the icon name instead, fixed]
[- v0.2.81 Label Designer]
[- v0.2.82 Calendar draft]
[- v0.2.83 Calendar with actions]
[- v0.2.84 microorganisms and fix to open the dialog for the second time]
[- v0.2.85 fix left pane on object by tabs and tabs display/hide by config for Calendar"]
[- v0.2.86 tables max-height removed, parent child number of children circle now rounding all number, not just up to 2 digits, spec limit quantitative in both langues, parent child compatible with endpointResponseArray too]
[- v0.2.87 fix for parent-child structure select/deselect and fix takePicture and upload being open both at the same time]