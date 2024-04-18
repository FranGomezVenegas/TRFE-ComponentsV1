export function PrintViews(base) {
    return class extends (base) {
        print(){
            alert('prrrrint')
            this.printCoa({})
        }

        printCoa(data) {
            let coaData = data//FakeCOA
            this.setPrintContentCoa(data)
            let printWindow = window.open('aaa', '', 'fullscreen=yes');
            printWindow.document.write(this.printObj.contentWithFooter);
            console.log('contentWithFooter', this.printObj.contentWithFooter)
            printWindow.document.title = coaData.report_info["provisional_copy_" + this.lang];
            printWindow.document.close();
            setTimeout(function () {
              printWindow.print();
              printWindow.close();
            }, 500); 
          }
      
          setPrintContentCoa(data) {
            let headerData = ''
            // let headerDataDiv = this.shadowRoot.querySelectorAll("div#document")
            // if (headerDataDiv !== undefined) {
            //   headerData = headerDataDiv[0].outerHTML
            // }
            let mainDivContent = ''
            let mainDivContentDiv = this.shadowRoot.querySelectorAll("div#mainDiv")
            if (mainDivContentDiv !== undefined) {
                mainDivContent = mainDivContentDiv[0].outerHTML
            }
            let pagerFooter = ''
            // let pagerFooterDiv = this.shadowRoot.querySelectorAll("div#pagefooter")
            // if (pagerFooterDiv !== undefined) {
            //   pagerFooter = pagerFooterDiv[0].outerHTML
            // }
      
            const tbody = this.shadowRoot.querySelector(".table-container-results tbody");
            const tableItems = tbody.querySelectorAll('tr');
            const totalPages = Math.ceil(tableItems.length / 14);
            const lastItemsCount = tableItems.length % 14;
            const lastItemsLeft = 14 - lastItemsCount;
            const pageStr = this.lang === "en" ? "Page" : "Página";
            const ofStr = this.lang === "en" ? "of" : "de";
    
            this.printObj = {
              header: '.', //this.documentFooter(), //this.coaForInspectionLotHeader(),
              content: headerData, //this.coaForInspectionLotContent(),   
              contentWithFooter: `
                <html>
                  <head>        
                  <style>
                    #firstline-header .title {
                      display: block;
                      color: red;
                      text-align: right;
                    }
      
                    #header-header {
                      padding: 0 20px;
                    }
      
                    .table-container-results {
                      padding: 0 20px;
                    }
      
                    .logo-header {
                      margin-left: 20px !important;
                    }
      
                    * {
                      box-sizing: border-box;
                    }
      
                    body {
                      padding: 0;
                      margin: 0;
                      counter-increment: page_index;
                    }
      
                    table {
                      padding: 0;
                      margin: 0;
                      width: 100%;
                    }
      
                    tr {
                      height: 50px;
                    }
      
                    @media print {
                      :root {
                        counter-reset: page_index;
                      }
      
                      @page {
                        margin: 0;
                      }
      
                      .page-break-row {
                        border-bottom: 1px solid black;
                        page-break-after: always; /* This ensures the page breaks after this row */
                      }
    
                      tr:nth-child(14n + 14) {
                        position: relative;
                        border-bottom: ${ data.report_info.display_result_box_border ? `1px solid black;` : `none;`}
                        page-break-after: always;
                      }
      
                      tr:nth-child(14n + 14)::after {
                        display: block;
                        position: absolute;
                        font-style: italic;
                        top: 90px;
                        left: 0px;
                        counter-increment: page_index;
                        content: "${this.documentFooter(data)}";
                      }
      
                      tr:nth-child(14n + 14) td:last-child::after {
                        display: block;
                        position: absolute;
                        top: 90px;
                        right: 0px;
                        content: "${pageStr} " counter(page_index) " ${ofStr} ${totalPages}";
                      }
      
                      tr:nth-child(14)::after {
                        top: 84px;
                      }
      
                      tr:nth-child(14) td:last-child::after {
                        top: 84px;
                      }
      
                      #print-document-footer {
                        position: relative;
                        margin-top: ${50 * lastItemsLeft - 150}px;
                      }
      
                      #print-document-footer::before {
                        display: block;
                        position: absolute;
                        font-style: italic;
                        top: 150px;
                        left: 20px;
                        content: "${this.documentFooter(data)}";
                      }
      
                      #print-document-footer::after {
                        display: block;
                        position: absolute;
                        top: 150px;
                        right: 20px;
                        content: "${pageStr} " counter(page_index) " ${ofStr} ${totalPages}";
                      }
                    }
                    </style>
                  </head>
                  <body>  
                    <div id="print-content">
                      ${headerData}
                    </div>
                    <div id="print-document-footer" class="print-document-footer">${pagerFooter}</div>                    
                  </body>
                </html>
              `
            }
          }        
    }
}