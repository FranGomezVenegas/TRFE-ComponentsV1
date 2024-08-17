import { ReportingFunctions } from "../0TRAZiT-Paradigm/reporting";
export function PrintableTable(base) {
    return class extends ReportingFunctions(base) {

        printTable(index) {
            this.setPrintContentTable(index);
            let printWindow = window.open('', '_blank');
            printWindow.document.write(this.printObj.contentWithFooter);
            printWindow.document.title = this.printObj.header;
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 500);
        }

        setPrintContentTable(index) {
            const styles = this._getAllStyles();
            const { header, content } = this._getPrintableContent(index);
            
            let pagerFooter = ''
            let tbody = this.shadowRoot.querySelector(".table-container-results tbody");
            if (tbody===null){
                tbody = this.shadowRoot.querySelector(".table-container");
            }        
            let itemsPerPage=14    
            const tableItems = tbody.querySelectorAll('tr');    
            const totalPages = Math.ceil(tableItems.length / itemsPerPage);


            const pageStr = this.lang === "en" ? "Page" : "Página";
            const ofStr = this.lang === "en" ? "of" : "de";
            let data=content;
            const printStyles = `
                <style>
                    @media print {
                        /* Esto elimina el paginado 'por defecto' del browser. */
                        @page { 
                            margin: 0;
                        }
                        /* Esto quita los stamps que genera por defecto el browser*/
                        body {
                            margin: 0;
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
                            background-color: #f4f4f4; /* Color de fondo del header */
                            padding: 10px; /* Espacio interno del header */
                            text-align: center; /* Centrar el contenido del header */
                            font-size: 14px; /* Tamaño de la fuente en el header */
                            border-bottom: 1px solid #000; /* Línea inferior para separar el header del contenido */
                        }

                        /* Asegúrate de que el contenido no se superponga con el header */
                        #print-content {
                            margin-top: 100px; /* Ajusta este valor según la altura del header */
                        }

                        #print-document-footer {
                            position: fixed;
                            bottom: 0;
                            width: 100%;
                            text-align: center; /* Ajusta esto si quieres el contenido centrado o alineado a la izquierda/derecha */
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
                            content: "${this.documentFooter(data)}";
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
        
            this.printObj = {
                header: header,
                contentWithFooter: `
                    <html>
                        <head>
                            ${styles}
                            ${printStyles}
                        </head>
                        <body>
                            <div id="print-document-header" class="print-document-header">
                                ${header}
                            </div>                        
                            <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left: 30px; gap: 10px">
                            ${content}
                            </div>
                            <div id="print-document-footer" class="print-document-footer">${pagerFooter}</div>                    
                        </body>
                    </html>
                `
            };
        }
               

        _getPrintableContent(index) {
            const table = this.shadowRoot.querySelector(`table[data-index="${index}"]`);
            if (table) {
                return this._getTableHTML(table, index);
            } else {
                return this._getFallbackContent(index);
            }
        }

        _getAllStyles() {
            const styles = Array.from(this.shadowRoot.querySelectorAll('style, link[rel="stylesheet"]'))
                .map(style => style.outerHTML)
                .join('\n');
            return styles;
        }

        _getTableHTML(table, index) {
            let getAllHeader = []
            getAllHeader = this.shadowRoot.querySelectorAll('#mainDiv > div > p');
            if (getAllHeader.length==0){
                getAllHeader = this.shadowRoot.querySelectorAll('#mainDiv > div > div > div > div > p');
            }
            let headerElement = getAllHeader[index];
            if (!headerElement) {
                headerElement = getAllHeader[0];
            }
            let headerTitle = ""
            if (headerElement!==undefined){
                headerTitle = headerElement.innerText //headerElement.querySelector('span') ? headerElement.querySelector('span').textContent.trim() : '';
            }else{

            }
            console.log(headerTitle);
            const clonedTable = table.cloneNode(true);
            const headers = clonedTable.querySelectorAll('th');
            let actionsColumnIndex = -1;
        
            headers.forEach((header, headerIndex) => {
                // Remove .sort-icons divs
                const sortIconsDiv = header.querySelector('.sort-icons');
                if (sortIconsDiv) {
                    sortIconsDiv.remove();
                }
        
                if (header.textContent.trim() === "Actions") {
                    actionsColumnIndex = headerIndex;
                }
        
                // Apply styles directly to cloned headers
                header.style.backgroundColor = '#b6d6f3';
                header.style.color = 'rgb(0 0 0 / 55%)';
                header.style.fontSize = '16px';
                header.style.fontFamily = 'Montserrat';
                header.style.padding = '8px';
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
        
            const inputs = clonedTable.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value;
                const textNode = document.createTextNode(value);
                input.parentNode.replaceChild(textNode, input);
            });
        
            const allStyles = this._getAllStyles();
        
            return { header: headerTitle, content: allStyles + clonedTable.outerHTML };
        }
        

        _getFallbackContent(index) {
            const mainDiv = this.shadowRoot.querySelector('#mainDiv > div');
            if (!mainDiv) {
                console.error(`Main div not found.`);
                return { header: 'Error', content: 'Main div not found.' };
            }
        
            const targetDiv = mainDiv.querySelector(`div[data-index="${index}"]`);
            if (!targetDiv) {
                console.error(`Div with index "${index}" not found.`);
                return { header: 'Error', content: `Div with index "${index}" not found.` };
            }
        
            const headerTitle = targetDiv.querySelector('p span') ? targetDiv.querySelector('p span').textContent.trim() : 'Print';
        
            const clonedDiv = targetDiv.cloneNode(true);
            const inputs = clonedDiv.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value;
                const textNode = document.createTextNode(value);
                input.parentNode.replaceChild(textNode, input);
            });
        
            const allStyles = this._getAllStyles();
        
            const printStyles = `
                <style>
                    th {
                        background-color: #b6d6f3 !important;
                        color: rgb(0 0 0 / 55%) !important;
                        font-size: 16px !important;
                        font-family: Montserrat !important;
                        padding: 8px !important;
                    }
                </style>
            `;
        
            return { header: headerTitle, content: printStyles + allStyles + clonedDiv.outerHTML };
        }
                
    }
}
