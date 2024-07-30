export function PrintableTable(base) {
    return class extends (base) {

        printTable(index) {
            this.setPrintContentTable(index);
            let printWindow = window.open('', '_blank');
            printWindow.document.write(this.printObj.contentWithFooter);
            printWindow.document.title = 'Title Here';
            setTimeout(function () {
                printWindow.print();
                printWindow.close();
            }, 500);
        }

        setPrintContentTable(index) {
            const styles = this._getAllStyles();
            const dataTable = this._getTableHTML(index);

            this.printObj = {
                header: '.',
                contentWithFooter: `
                    <html>
                        <head>
                            ${styles}
                        </head>
                        <body>
                            <div id="print-content" style="display: flex; flex-wrap: wrap; padding-left: 30px; gap: 10px">
                                ${dataTable}
                            </div>
                        </body>
                    </html>
                `
            };
        }

        _getAllStyles() {
            const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
                .map(style => style.outerHTML)
                .join('\n');
            return styles;
        }

        _getTableHTML(index) {
            const table = this.shadowRoot.querySelector(`table[data-index="${index}"]`);
            if (!table) {
                console.error(`Table with data-index="${index}" not found.`);
                return '';
            }

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

            return clonedTable.outerHTML;
        }
    }
}
