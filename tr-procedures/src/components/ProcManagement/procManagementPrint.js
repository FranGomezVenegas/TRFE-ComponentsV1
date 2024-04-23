import { html } from "lit"

export function PrintViews(base) {
  return class extends (base) {
    print() {
      this.printCoa({})
    }

    printCoa(data) {
      let coaData = data
      this.setPrintContentCoa(data)
      let printWindow = window.open('', '_blank');
      printWindow.document.write(this.printObj.contentWithFooter);
      printWindow.document.title = 'Title Hear';
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
    documentFooter(data) {
      let coaData = data
      let session = JSON.parse(sessionStorage.getItem("userSession"))
      let sessionDate = session.appSessionStartDate
      let sessionUser = session.header_info.first_name + " " + session.header_info.last_name + " (" + session.userRole + ")"
      let footerText = `${sessionUser} on ${sessionDate} `
      if (coaData == undefined && coaData.report_info !== undefined && coaData.report_info.report_information !== undefined) {
        footerText += `${coaData.report_info["report_information_" + this.lang]}`
      }
      return footerText
    }

    setPrintContentCoa(data) {
      let headerData = ''
      let headerDataDiv = this.shadowRoot.querySelectorAll(".title-banner .title")
      if (headerDataDiv !== undefined) {
        headerData = headerDataDiv[0].outerHTML
      }
      let mainDivContent = ''
      let mainDivContentDiv = this.shadowRoot.querySelectorAll('#rightSplit')
      console.log(mainDivContent)
      if (mainDivContentDiv !== undefined) {
        mainDivContent = mainDivContentDiv[0].outerHTML
      }
      let pagerFooter = ''
      let pagerFooterDiv = this.shadowRoot.querySelectorAll("div#pagefooter")
      if (pagerFooterDiv !== undefined) {
        pagerFooter = headerDataDiv[0].outerHTML
      }

      const element = this.shadowRoot.querySelector('#rightSplit object-by-tabs');
      let dataTable = '';
      if (element) {
        const compositionObj = element.shadowRoot.querySelector('objecttabs-composition');
        if (compositionObj) {
          const allDivs = compositionObj.shadowRoot.querySelectorAll('#mainDiv > div > div > div');
          allDivs.forEach(div => {
            const table = div.querySelector('.styled-table');
            if (table) {
              const clonedTable = table;
              const headers = clonedTable.querySelectorAll('th');
              let actionsColumnIndex = -1;

              headers.forEach((header, index) => {
                if (header.textContent.trim() === "Actions") {
                  actionsColumnIndex = index;
                }
              });

              if (actionsColumnIndex !== -1) {
                headers[actionsColumnIndex].remove();
                const rows = clonedTable.querySelectorAll('tr');
                rows.forEach(row => {
                  if (row.cells.length > actionsColumnIndex) {
                    row.deleteCell(actionsColumnIndex);
                  }
                });
              }

              dataTable += div.outerHTML;
            } else {
              dataTable += div.outerHTML;
            }
          });

        } else {
          console.error("objecttabs-composition not found.");
        }
      } else {
        console.error("#rightSplit object-by-tabs not found.");
      }


      this.printObj = {
        header: '.',
        content: headerData,
        contentWithFooter: `
                <html>
                  <head>        
                  <style>
                  * {
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  }            
        
                  .title {
                    color: #2989d8;
                    font-size: 18px;
                    font-weight: bold;
                  }
        
                  table.TRAZiT-DefinitionArea thead tr th {
                    background-color: #2989d8;
                    color: white;
                  }
        
                  table.TRAZiT-UsersArea thead tr th {
                    background-color: white;
                    color: gray;
                  }
        
                  table {
                    border-collapse: collapse;
                    width: 100%;
                    font-family: Montserrat;
                    font-size: 16px;
                  }
        
                  table.TRAZiT-UsersArea tr {
                    border: none; 
                    border-bottom: 1px solid #dddddd;
                  }
        
                  tr {
                    border: 1px solid #dddddd;
                    text-align: center;
                    color: #808080;
                  }
        
                  table.TRAZiT-UsersArea tr:nth-child(even) {
                    background-color: white;
                  }
        
                  table.TRAZiT-UsersArea tr:last-child {
                    border: none;
                  }
               
                  table.TRAZiT-UsersArea thead {
                    border-bottom: 1px solid #dddddd;
                  }
        
                  tr:nth-child(even) {
                    background-color: rgba(214, 233, 248, 0.37);
                  }
        
                  table.TRAZiT-DefinitionArea th {
                    padding: 16px 20px;
                    border: 1px solid #dddddd !important;
                  }
        
                  td, th {
                    padding: 16px 20px;
                    border: 1px solid #dddddd !important;
                  }
        
                  table.TRAZiT-UsersArea td, th {
                    border: none !important;
                  }
        
                  tr {
                    cursor: pointer;
                  }
        
                  table#<!---->procedure_roles tr:hover td {
                    background-color: #2989d830 !important;
                  }
        
                  mwc-icon-button {
                    --mdc-icon-button-size: 24px;
                    --mdc-icon-size: 16px;
                  }
        
                  .hidden {
                    display: none;
                  }
        
                  .js-context-popup {
                    background-color: #24C0EB;
                    color: white;
                    width: 130px;
                    position: fixed;
                    z-index: 10;
                    display:none;
                  }
                  .js-context-popup div {
                    padding: 8px 12px;
                    border: 2px solid #03A9F4;
                    cursor: pointer;
                  }
                  .js-context-popup div:first-child {
                    border-botton: none !important;
                  }
        
                  .circle {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background-color: #24C0EB;
                    border-radius: 50%;
                    color: white;
                    float: left;
                  }
                  .green {
                    color: green;
                  }
                  .red { 
                    color: red;
                  }
                  .yellow {
                    color: orange;
                  }
                  span.title {
                      color: rgb(35, 163, 198);
                      margin-top: 10px;
                      font-weight: bold;
                  }
                  span.title.true {
                      font-size: 18px;
                  }
                  span.title.false {
                      font-size: 18px;
                  }  
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
                      font-color: rgb(
                        94,
                        145,
                        186
                      );
                    }                      
                  <!----></style>
                  </head>
                  <body>  
                  <div id="print-document-header" class="print-document-footer">This Is Page Heaser Content</div>  
                    <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">
                      ${dataTable}
                    </div>                    
                    <div id="print-document-footer" class="print-document-footer">This Is Page Footer Content</div>                    
                  </body>
                </html>
              `
      }
    }
  }
}