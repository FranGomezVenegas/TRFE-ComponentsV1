import { html } from "lit"
import { ReportingFunctions } from "../../0TRAZiT-Paradigm/reporting"
export function PrintViews(base) {
  return class extends ReportingFunctions(base) {
    print() {
      this.printScreen({})
    }

    printScreen(data) {
      this.setPrintContentScreen(data)
      let printWindow = window.open('', '_blank');
      printWindow.document.write(this.printObj.contentWithFooter);
      printWindow.document.title = 'Title Here';
      setTimeout(function () {
        printWindow.print();
        printWindow.close();
      }, 500);
    }


    setPrintContentScreen(data) {
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
      let totalPages = 0

      const element = this.shadowRoot.querySelector('#rightSplit object-by-tabs');
      let dataTable = '';
      if (element) {
        const compositionObj = element.shadowRoot.querySelector('objecttabs-composition');
        if (compositionObj) {

          const itemsPerPage = 14;

          // Contenido principal
          const printContent = this.shadowRoot.querySelector("#print-content");
          
          // Estimación de la altura de una página en píxeles (ajustable)
          const pageHeight = 1020; // Por ejemplo, si piensas que cada página impresa tiene una altura de 1120px
          
          // Calcular el número total de páginas
          totalPages = Math.ceil(compositionObj.scrollHeight / pageHeight);

          const allDivs = compositionObj.shadowRoot.querySelectorAll('#mainDiv > div > div > div');
          allDivs.forEach(div => {
            const tabsContainer=div.querySelector('.tabs-container');
            if (tabsContainer){
              tabsContainer.remove()
            }
            const table = div.querySelector('.styled-table');
            if (table) {
              const clonedTable = table;
              const headers = clonedTable.querySelectorAll('th');
              let actionsColumnIndex = -1;

                            
              headers.forEach((header, index) => {
                const sortIconsDiv = header.querySelector('.sort-icons');
                if (sortIconsDiv) {
                    sortIconsDiv.remove();
                }
  
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
      const pageStr = this.lang === "en" ? "Page" : "Página";
      const ofStr = this.lang === "en" ? "of" : "de";
      

      let pageHeaderExtraPhrase=undefined // Add content to add header
      let pageFooterExtraPhrase=undefined // Add content to add extra phrase for the footer
      

      this.printObj = {
        header: '.',
        content: headerData,
        contentWithFooter: `
                <html>
                  <head>        
                   ${this.getPrintStyles(this.documentFooter(data), pageStr, ofStr, totalPages)}
                  </head>
                  <body>  
                  <div id="print-document-header" class="print-document-footer">${pageHeaderExtraPhrase!==undefined?pageHeaderExtraPhrase:``}</div>  
                    <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 100px">
                      ${dataTable} 
                    </div>                    
                    <div id="print-document-footer" class="print-document-footer">${pageFooterExtraPhrase!==undefined?pageFooterExtraPhrase:``}</div>                    
                  </body>
                </html>
              `
      }
    }
  
getPrintStyles(documentFooter, pageStr, ofStr, totalPages) {
  return `
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
          --mdc-icon-button-size: 35px;
          --mdc-icon-size: 25px;
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
        min-width: 20px;
        min-height: 20px;
        padding: 5px;
        display: inline-block;
        text-align: center;
        background-color: #24C0EB;
        border-radius: 50%;
        color: white;
        line-height: 1;
        font-size: 14px;
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
          color: rgba(7, 13, 22, 0.94) !important;
          background-color: #2196f3 !important;
      }

      .w3-background,
      .w3-hover-blue:hover {
          color: rgba(7, 13, 22, 0.94) !important;
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
      
      @media print {
          /* Esto elimina el paginado 'por defecto' del browser. */
          @page { 
              margin: 0;
          }
          /* Esto quita los stamps que genera por defecto el browser */
          body {
              margin: 0;
              padding-top: 150px; /* Asegura que el contenido comience después del header en cada página */
              padding-bottom: 120px; /* Deja espacio para el footer en cada página */
          }
          th {
              background-color: #b6d6f3 !important;
              color: rgb(0 0 0 / 55%) !important;
              font-size: 16px !important;
              font-family: Montserrat !important;
              padding: 8px !important;
          }
          table {
              width: 100%;
              border-collapse: collapse;
          }
          th, td {
              border: 1px solid #000;
              padding: 8px;
          }
          /* Estilos para el header */
          #print-document-header {
              position: fixed;
              top: 0;
              width: 100%;
              background-color: transparent;
              padding: 10px;
              text-align: center;
              font-size: 14px;
              border-bottom: 1px solid #000;
          }

          /* Asegúrate de que el contenido no se superponga con el header */
          #print-content {
              page-break-before: auto;
          }

          /* Evita que las filas de la tabla se corten entre páginas */
          tr {
              page-break-inside: avoid;
          }

          #print-document-footer {
              position: fixed;
              bottom: 0;
              width: 100%;
              text-align: center;
              background-color: transparent;
              padding: 10px;
              border-top: 1px solid #000;
          }

          /* Incrementa el contador en la primera página */
          body {
              counter-reset: page_index 0;
          }

          body:first-of-type {
              counter-increment: page_index 1;
          }

          #print-document-footer::before {
              display: block;
              font-style: italic;
              content: "${documentFooter}";
              padding-left: 20px;
          }

          #print-document-footer::after {
              display: block;
              content: "${pageStr} " counter(page_index, decimal) " ${ofStr} ${totalPages}";
              padding-right: 20px;
              text-align: right;
          }
      }                                          
  </style>
  `;
}

}}