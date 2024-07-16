import { html, nothing } from "lit";
import '@material/mwc-button';

export function CardMultipleElementsView(base) {
    return class extends base{
        cardMultipleElementsView(elem, data) {
          
            //console.log('cardSomeElementsRepititiveObjects', 'elem', elem, 'data', data)
            //data = this.getDataFromRoot(elem, data);
            console.log('CardMultipleElementsView >> getDataFromRoot', 'elem', elem, 'data', data)
            return html`
              ${Array.isArray(data) && data.length > 0
          ? html`
                <mwc-icon-button icon="print" @click=${this.printAllCard}></mwc-icon-button>  
                <div style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">                 
                    ${data.map(
                        (d, i) =>html`
                          ${d.json_model===undefined?
                            html` ${this.cardController(elem, d, i)} `
                          :
                            html` ${this.cardController(d.json_model, d, i)} `
                          }
                        `
                    )}                                    
                </div>
                `
          : nothing}
            `;
    }
    printCard(index) {
      const cardDiv = this.shadowRoot.querySelectorAll('#mainaddborder')
      const {title,cardStyles,mainDivSkeleton} = this.collectCardData(cardDiv[index])
      let printWindow = window.open('', '_blank');
      printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${title}</title>
          <link rel="stylesheet" type="text/css" href="https://www.gstatic.com/charts/51/css/core/tooltip.css">
          <link rel="stylesheet" type="text/css" href="https://www.gstatic.com/charts/51/css/util/util.css">
          <style>
            ${cardStyles}
          </style>
       </head>
        <body>        
        ${mainDivSkeleton}
      </body>
      </html>
      
      `);
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
    printAllCard(){
      const cardDiv = this.shadowRoot.querySelectorAll('#mainaddborder')
      let title = 'All Card';
      let allStyles = '';
      let allCards = ''
      cardDiv.forEach((card,index)=>{
        const {title,cardStyles,mainDivSkeleton} = this.collectCardData(cardDiv[index])
        allStyles += cardStyles;
        allCards += mainDivSkeleton;
      })
      let printWindow = window.open('', '_blank');
      printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${title}</title>
          <link rel="stylesheet" type="text/css" href="https://www.gstatic.com/charts/51/css/core/tooltip.css">
          <link rel="stylesheet" type="text/css" href="https://www.gstatic.com/charts/51/css/util/util.css">
          <style>
            ${allStyles}
          </style>
       </head>
        <body>
        <div style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">

        ${allCards}

        </div>
      </body>
      </html>
      
      `);
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
    collectCardData(elem) {
      let cardElement = ``;
      let cardStyles = `
      #mainaddborder {
        border: 0.72px solid rgba(36, 192, 235, 1);
        border-radius: 10px;
        padding: 10px;
        margin:10px;
        overflow: hidden;
        flex:1;        
        position: relative;                  
        top: 2px;
        left: 2px;                  
      }
      `;
      const divElement = elem.cloneNode(true);
      const titleElement = divElement.querySelector('p');
      cardElement += titleElement.outerHTML;
      const title = titleElement.textContent;


      const styleElements = divElement.querySelectorAll('style');
      let styleContents = [];
      styleElements.forEach(styleElement => {
        styleContents.push(styleElement.innerHTML);
      });
      const allStyles = styleContents.join('');
      cardStyles += allStyles;
      if (divElement?.querySelector('div')?.outerHTML) { 
        cardElement += divElement?.querySelector('div')?.outerHTML;
      }

      let chartElement = elem.querySelector('google-chart');
      if (chartElement) {
        let chartElementShadowRoot = chartElement.shadowRoot
        let chartDiv= chartElementShadowRoot.querySelector('#chartdiv');
        let chartDivStr = '';
        chartDivStr += chartDiv.innerHTML;
        console.log(chartDivStr)
        cardElement += chartDivStr
      }


      let lastDiv = elem.querySelector('table');
      if (lastDiv) {
          // Clone the table to avoid modifying the original element
          let clonedTable = lastDiv.cloneNode(true);

          // Remove the last th element in the thead
          let thead = clonedTable.querySelector('thead');
          if (thead) {
              let thElements = thead.querySelectorAll('th');
              if (thElements.length > 0) {
                  thElements[thElements.length - 1].remove();
              }
          }

          // Remove the last td element in each tr of the tbody
          let tbody = clonedTable.querySelector('tbody');
          if (tbody) {
              let trElements = tbody.querySelectorAll('tr');
              trElements.forEach(tr => {
                  let tdElements = tr.querySelectorAll('td');
                  if (tdElements.length > 0) {
                      tdElements[tdElements.length - 1].remove();
                  }

                  // Replace input elements with their values
                  tdElements.forEach(td => {
                      let input = td.querySelector('input');
                      if (input) {
                          let value = input.value;
                          let valueElement = document.createElement('div');
                          valueElement.textContent = value;
                          td.replaceChild(valueElement, input);
                      }
                  });
              });
          }

          // Add the modified table's outerHTML to cardElement
          cardElement += clonedTable.outerHTML;
      }



  


      const clonedDiv = elem.cloneNode(false);
      const divString = clonedDiv.outerHTML;
      let position = divString.indexOf('</div>');
      let mainDivSkeleton = divString.slice(0, position) + cardElement + divString.slice(position);

      return {title,cardStyles,mainDivSkeleton};
    }
    hideCard(index, thisComponent) {
      let cardDiv;
      if (thisComponent) {
        cardDiv = thisComponent.shadowRoot.querySelectorAll('#mainaddborder');
      } else {
        cardDiv = this.shadowRoot.querySelectorAll('#mainaddborder');
      }
      if (cardDiv) {
        let curentDiv = cardDiv[index];
        const content = curentDiv.querySelectorAll('#hidden');
        if (content) {
          content.forEach(element => {
            if (element.style.display === 'none') {
              element.style.display = 'block';
            } else {
              element.style.display = 'none';
            }
          });
        }
      }
      console.log(index);
    }
    
    cardController(elem, data, i) {
      console.log(elem.cardElements)
      return html` 
    <style>
    #main {
      display: flex;
      flex-wrap: wrap;
      gap: 10px; /* espacio entre los elementos */
    }
    #main > div {
      flex: 1 1 calc(50% - 10px); /* Dos columnas con espacio */
    }
    div#mainaddborder {
        border: 0.72px solid rgba(36, 192, 235, 1);
        border-radius: 10px;
        padding: 10px;
        margin-right: 2px;
        overflow: hidden;
        flex:1;        
        position: relative;                  
        top: 2px;
        left: 2px; 
        display: flex;
        flex-wrap: wrap;
        gap: 10px; /* espacio entre los elementos */    
        height: fit-content;             
      } 
      #mainaddborder > div {
        flex: 1 1 calc(50% - 10px); /* Dos columnas con espacio */
      }      
    </style>
    <div id="main${elem.add_border !== undefined && elem.add_border == true ? "addborder" : ""}"
        class="${elem.class !== undefined && elem.class === 'vertical' ? 'layout vertical flex wrap' : ''}" style="${elem.style !== undefined ? elem.style : ""}">
         
        <mwc-icon-button icon="print" @click=${() => { this.printCard(i) }}></mwc-icon-button> 
        <mwc-icon-button icon="visibility" @click=${() => { this.hideCard(i) }}></mwc-icon-button> 
            ${elem.type === "reportTitle" ? this.kpiReportTitle(elem, data) : nothing}
            ${elem.cardElements===undefined?nothing:html`        
              ${elem.cardElements.map((elem2, index) => {
                return html`
                
                  ${elem2.is_translation === undefined || (elem2.is_translation !== undefined && elem2.is_translation === true && elem2.lang !== undefined && elem2.lang === this.lang) ?
                  html`      
                       
                    ${elem2.type === "reportTitle" ? html`
                    <div @click="${()=>this.hideCard(i)}">
                    ${this.kpiReportTitleLvl2(elem2, data, this.lang)}
                    </div>
                    ` : nothing}
                    <div id="hidden">
                    ${elem2.type === "card" ? this.kpiCard(elem2, data[elem2.endPointResponseObject], true) : nothing}
                    ${elem2.type === "cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem2, data, true) : nothing}
                    ${elem2.type === "cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem2, data, true) : nothing}              
                    ${elem2.type === "recovery_rate" ? this.kpiRecoveryRate(elem2, true) : nothing}
                    ${elem2.type === "grid" ? this.kpiGrid(elem2, data[elem2.endPointResponseObject], true) : nothing}
                    ${elem2.type === "chart" ? this.kpiChartFran(elem2, data, true) : nothing}   
        
                    ${elem2.type === "jsonViewer" ? this.jsonViewer(elem2, data, true) : nothing}
                    ${elem2.type === "readOnlyTable" ? this.readOnlyTable(elem2, data, true) : nothing}
                    ${elem2.type === "parentReadOnlyTable" ? this.parentReadOnlyTable(elem2, data, true, undefined, undefined,) : nothing}
                    ${elem2.type === "readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem2, data, true) : nothing}
                    ${elem2.type === "readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem2, data, true) : nothing}
        
                    ${elem2.type === "rolesAndActions" && elem2.endPointResponseObject2 !== undefined && data[elem2.endPointResponseObject] !== undefined ?
                this.rolesAndActions(elem2, data[elem2.endPointResponseObject][elem2.endPointResponseObject2], true, this.lang) : nothing}
                    ${elem2.type === "rolesAndActions" && elem2.endPointResponseObject2 === undefined ?
                this.rolesAndActions(elem2, data[elem2.endPointResponseObject], true, this.lang) : nothing}   
        
                    ${elem2.type === "coa" ? this.coa(elem, data[elem.endPointResponseObject], true) : nothing}
        
                    ${elem2.type === "dragDropBoxes" ? this.dragDropBoxes(elem, data[elem2.endPointResponseObject]) : nothing}
                      
                      
                    ${(elem2.includeChild === undefined || elem2.includeChild === false) ? nothing :
                html`
                          ${this.kpiCardSomeElementsChild(elem2, data, true)}
                    `}              
                    ${elem2.type==="Report" ? this.ReportController(elem2, true) : nothing}
                    ${elem2.type==="testScripts" ? this.scripts(elem2, true) : nothing}
                    ${elem2.type==="spectestScripts" ? this.specScripts(elem, true) : nothing}
                    ${elem2.type==="buttonsOnly" ? 
                    
                      this.buttonsOnly(elem2, data) : nothing}
                    ${elem2.type==="tree" ? this.treeElement(elem2, data)   : nothing}
                    </div>
                  `: nothing}
                `
              })} 
            `}
            
    </div>
`
    }

    cardMainBlock(elem, data) {
      console.log('kpiCardSomeElementsMain', 'elem', elem, 'data', data)
      return html`
              ${elem === undefined || elem.title === undefined
          ? nothing
          : html`<span
                    style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
                    >${elem.title["label_" + this.lang]}</span
                  >`}
              ${data === undefined
          ? html`${elem.hideNoDataMessage !== undefined &&
            elem.hideNoDataMessage
            ? ""
            : "No columns defined"}`
          : html`
                    <style>
                      ul.column-list {
                        -webkit-columns: var(
                          --num-columns,
                          3
                        ); /* Number of columns */
                        -moz-columns: var(--num-columns, 3);
                        columns: var(--num-columns, 3);
                        -webkit-column-gap: 10px; /* Spacing between columns */
                        -moz-column-gap: 10px;
                        column-gap: 10px;
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
                      ul.column-list1 {
                        -webkit-columns: 1; /* Number of columns */
                        -moz-columns: 1;
                        columns: 1;
                        -webkit-column-gap: 10px; /* Spacing between columns */
                        -moz-column-gap: 10px;
                        column-gap: 10px;
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
                      ul.column-list2 {
                        -webkit-columns: 2; /* Number of columns */
                        -moz-columns: 2;
                        columns: 2;
                        -webkit-column-gap: 10px; /* Spacing between columns */
                        -moz-column-gap: 10px;
                        column-gap: 10px;
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
                      ul.column-list3 {
                        -webkit-columns: var(
                          --num-columns,
                          3
                        ); /* Number of columns */
                        -moz-columns: var(--num-columns, 3);
                        columns: var(--num-columns, 3);
                        -webkit-column-gap: 10px; /* Spacing between columns */
                        -moz-column-gap: 10px;
                        column-gap: 10px;
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
                      ul.column-list4 {
                        -webkit-columns: 4; /* Number of columns */
                        -moz-columns: 4;
                        columns: 4;
                        -webkit-column-gap: 10px; /* Spacing between columns */
                        -moz-column-gap: 10px;
                        column-gap: 10px;
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
      
                      ul.column-list li {
                        display: inline-block;
                        width: 100%;
                        margin-bottom: 10px;
                        margin-left: 30px;
                        hyphens: auto;
                        word-break: break-all;
                        left: -17px;
                        position: RELATIVE;
                      }
                      span.relevantlabel {
                        font-weight: bold;
                        font-size: 16px;
                      }
                      span.label {
                        font-weight: bold;
                      }
                      div#mainaddborder {
                        border: 0.72px solid rgba(36, 192, 235, 1);
                        border-radius: 10px;
                        padding: 10px;
                        margin-right: 2px;
                        overflow: hidden;
                        flex-basis: calc(33.33% - 10px);
                        position: relative;                  
                        left: -12px;                  
                      }
                      iframe {
                        width: 100%;
                        height: 250px;
                        flex: 1;
                      }
                      /* Dialog styles */
                      .dialog {
                        display: none;
                        position: fixed;
                        z-index: 9999;
                        top: 0;
                        left: 0;
                        width: 1000px;
                        height: 600px;
                        background-color: white; /* rgba(0, 0, 0, 0.5); */
                      }
      
                      /* Iframe styles */
                      #my-iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                        flex: 1;
                      }
                      @keyframes slidein {
                        from {
                          margin-left: 30%;
                        }
                        to {
                          margin-left: 0%;
                        }
                      }
                      @media (max-width: 460px) {
                      }
                      iframe::shadow
                        .pdf-viewer::content
                        #controls
                        ::slotted(.SwitchToReadingMode-Small14) {
                        display: none;
                      }
                      .card-container {
                        display: flex;
                        flex-wrap: wrap;
                      }
      
                      .card {
                        flex: 0 0 calc(33.33% - 20px);
                        margin: 10px;
                        border: 1px solid #ccc;
                        padding: 10px;
                      }
      
                      @media (max-width: 768px) {
                        .card {
                          flex: 0 0 calc(50% - 20px);
                        }
                      }
      
                      @media (max-width: 480px) {
                        .card {
                          flex: 0 0 calc(100% - 20px);
                        }
                      }
                    </style>
                    <div id="main${elem.add_border !== undefined && elem.add_border == true ? "addborder" : ""}"
                      class="layout vertical flex wrap" style="${elem.style !== undefined ? elem.style : ""}">
                      <div style="flex-basis: auto; width: auto;">
                        ${this.getButton(elem, data, true)}
                      </div>
                      <ul
                        style="align-items: baseline;"
                        class="column-list${elem.num_columns !== undefined
              ? elem.num_columns
              : ""}"
                      >
                      ${elem.fieldsToDisplay === undefined ? nothing :
              html`
                        ${elem.fieldsToDisplay.map(
                (fld, i) =>
                  html`
                              ${this.fieldsToDiscard(fld) === true
                      ? nothing
                      : html`                              
                                    ${fld.as_ppt !== undefined &&
                          (fld.as_ppt === true || fld.as_video === true)
                          ? html`
                                          <mwc-icon-button
                                            icon="fullscreen"
                                            .isvideo=${data.is_video}
                                            .src=${data[fld.name]}
                                            @click=${this.openDialogFrame}
                                            .fld=${fld}
                                          ></mwc-icon-button>
                                          ${data.is_video === undefined ||
                              data.is_video === false
                              ? html`
                                                <iframe
                                                  src=${data[fld.name]}
                                                  @click=${this.openDialogFrame}
                                                ></iframe>
                                                <div id="dialog-frame" class="dialog">
                                                  <mwc-icon-button
                                                    icon="fullscreen_exit"
                                                    @click=${this.closeDialogFrame}
                                                  ></mwc-icon-button>
                                                  <iframe
                                                    id="my-iframe"
                                                    controls
                                                    controlsList="nodownload"
                                                  ></iframe>
                                                </div>
                                              `
                              : html`
                                  <video id="${data[fld.name]
                                }-${i}" controls slot="cover-photo"
                                  @play=${() =>
                                  this.stopOthers(`${data[fld.name]}-${i}`)}>
                                  <source type="video/mp4" src="${data[fld.name]}">
                                  </video>
      <!---
                                    <video controls type="video/mp4" src=${data[fld.name]
                                } controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false"></video>
                                    <div id="dialog-frame" class="dialog">
                                    <mwc-icon-button icon="fullscreen_exit" @click=${this.closeDialogFrame
                                }></mwc-icon-button> 
                                      <video id="video-source" type="video/mp4" controls controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false" >
                                      </video>-->
                                    </div>
                                  `}
                                        `
                          : html`
                                      ${fld.is_tag_list !== undefined && fld.is_tag_list === true ? html`   
                                      <span class="cardLabel">${this.fieldLabel(fld)}:</span>
                                      <span class="cardValue">                               
                                        <multi-select .label=${this.purpose} .props=${{ "readOnly": true, "displayLabel": false }} .activeOptions=${data[fld.name]} .options=${{}}> </multi-select>
                                      </span>
                                      `: html`                                      
                                          ${fld.as_progress !== undefined &&
                                fld.as_progress === true
                                ? html`
                                                <style>
                                                  .w3-responsive {
                                                    display: block;
                                                    overflow-x: auto;
                                                  }
                                                  .w3-container,
                                                  .w3-panel {
                                                    padding: 0.01em 4px;
                                                  }
                                                  .w3-panel {
                                                    margin-top: 16px;
                                                    margin-bottom: 16px;
                                                    border-radius: 5px;
                                                    box-shadow: 0px 0px 5px
                                                      rgba(0, 0, 0, 0.1);
                                                  }
                                                  .w3-container:after,
                                                  .w3-container:before,
                                                  .w3-panel:after,
                                                  .w3-panel:before,
                                                  .w3-row:after,
                                                  .w3-row:before,
                                                  .w3-row-padding:after,
                                                  .w3-row-padding:before,
                                                  .w3-blue,
                                                  .w3-hover-blue:hover {
                                                    color: rgba(
                                                      7,
                                                      13,
                                                      22,
                                                      0.94
                                                    ) !important;
                                                    background-color: #2196f3 !important;
                                                  }
                                                  .w3-background,
                                                  .w3-hover-blue:hover {
                                                    color: rgba(
                                                      7,
                                                      13,
                                                      22,
                                                      0.94
                                                    ) !important;
                                                    background-color: #ffdedd !important;
                                                  }
                                                  .title {
                                                    font-size: 8px;
                                                    font-weight: 500;
                                                    letter-spacing: 0;
                                                    line-height: 1.5em;
                                                    padding-bottom: 15px;
                                                    position: relative;
                                                    font-family: Montserrat;
                                                    font-color: rgb(94, 145, 186);
                                                  }
                                                  span.cardMainLabel {
                                                    font-weight: bold;
                                                    color: rgb(41, 137, 216); /* #032bbc; */
                                                  }
                                                  span.cardMainValue {            
                                                    color: rgba(214, 233, 248, 0.37); /* #009879; */
                                                  }
                                                </style>
                                                <div class="w3-container">
                                                  <div
                                                    class="w3-background w3-round-xlarge"
                                                    title="${this.titleLang(fld)}"
                                                  >
                                                    <div
                                                      title="${this.titleLang(fld)}"
                                                      class="w3-container w3-blue w3-round-xlarge"
                                                      style="width:${data[fld.name]}%"
                                                    >
                                                      ${fld.name}:
                                                      ${data[fld.name] ===
                                    undefined ||
                                    data[fld.name].length == 0
                                    ? "0"
                                    : data[fld.name]}%
                                                    </div>
                                                  </div>
                                                </div>
                                                <br />
                                              `
                                : html`
                                                <li>
                                                  <span class="cardLabel">
                                                    ${this.fieldLabel(fld)}:
                                                  </span>
                                                  <span class="cardValue">
                                                    ${data[fld.name]}
                                                    ${fld.fix_value_suffix !== undefined ? fld.fix_value_suffix : ""}
                                                    ${fld.fix_value2_prefix !== undefined ? fld.fix_value2_prefix : ""}
                                                    ${fld.name2 !== undefined ? data[fld.name2] : ""}
                                                    ${fld.fix_value2_suffix !== undefined ? fld.fix_value2_suffix : ""}
                                                    ${fld.fix_value3_prefix !== undefined ? fld.fix_value3_prefix : ""}
                                                    ${fld.name3 !== undefined ? data[fld.name3] : ""}
                                                    ${fld.fix_value3_suffix !== undefined ? fld.fix_value3_suffix : ""}
                                                  </span>
                                                </li>
                                              `}
                                        `}
                                      `}  
                                  `}
                            `
              )}
                      `}
                      </ul>
                    </div>
                  `}
            `;
    }


  }
}