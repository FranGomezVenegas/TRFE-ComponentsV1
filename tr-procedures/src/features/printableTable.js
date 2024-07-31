export function PrintableTable(base) {
    return class extends (base) {

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
            this._getPrintableContent(index);

            this.printObj = {
                header: header,
                contentWithFooter: `
                    <html>
                        <head>
                            ${styles}
                        </head>
                        <body>
                            <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left: 30px; gap: 10px">
                            ${content}
                            </div>
                        </body>
                    </html>
                ` 
            };
        }

        _getAllStyles() {
            const styles = Array.from(this.shadowRoot.querySelectorAll('style, link[rel="stylesheet"]'))
                .map(style => style.outerHTML)
                .join('\n');
            return styles;
        }

        _getPrintableContent(index) {
            const table = this.shadowRoot.querySelector(`table[data-index="${index}"]`);
            if (table) {
                return this._getTableHTML(table, index);
            } else {
                return this._getFallbackContent(index);
            }
        }

        _getTableHTML(table, index) {
            let getAllHeader = this.shadowRoot.querySelectorAll('#mainDiv > div > p')
            let headerElement = getAllHeader[index]
            if (!headerElement) {
                headerElement = getAllHeader[0]
            }
            const headerTitle = headerElement.querySelector('span') ? headerElement.querySelector('span').textContent.trim() : '';
            console.log(headerTitle)
            const clonedTable = table.cloneNode(true);
            const headers = clonedTable.querySelectorAll('th');
            let actionsColumnIndex = -1;

            headers.forEach((header, headerIndex) => {
                if (header.textContent.trim() === "Actions") {
                    actionsColumnIndex = headerIndex;
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

            const inputs = clonedTable.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value;
                const textNode = document.createTextNode(value);
                input.parentNode.replaceChild(textNode, input);
            });

            return { header: headerTitle, content: headerElement.outerHTML + clonedTable.outerHTML };
        }

        _getFallbackContent(index) {
            const mainDiv = this.shadowRoot.querySelector('#mainDiv > div');
            if (!mainDiv) {
                console.error(`Main div not found.`);
                return { header: 'Error', content: 'Main div not found.' };
            }

            const targetDivs = mainDiv.querySelector(`div[data-index="${index}"]`);;
            if (index >= targetDivs?.length) {
                console.error(`Div with index "${index}" not found.`);
                return { header: 'Error', content: `Div with index "${index}" not found.` };
            }

            const targetDiv = targetDivs;
            const headerTitle = targetDiv.querySelector('p span') ? targetDiv.querySelector('p span').textContent.trim() : 'Print';

            const clonedDiv = targetDiv.cloneNode(true);
            const inputs = clonedDiv.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value;
                const textNode = document.createTextNode(value);
                input.parentNode.replaceChild(textNode, input);
            });

            return { header: headerTitle, content: clonedDiv.outerHTML };
        }
    }
}
