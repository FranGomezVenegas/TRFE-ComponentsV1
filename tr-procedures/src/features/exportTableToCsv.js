import { html, css, LitElement } from 'lit';

export function ExportTableToCsv(base) {
    return class extends base {
        static styles = css`
    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
    }
    .list li {
        flex: 1 1 30%;
        margin: 5px;
        list-style: none;
        cursor: pointer;
        user-select: none;
        border-style: solid;
        border-color: #999999;
        border-width: 1px;
        border-radius: 7px;
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        font-size: 19px;
        background-color: #FFFFFF;
        text-align: center;
        padding: 10px;
        color:#126075;
    }
    .dialog-container {
        display: none;
        z-index: 1000;
        position: relative;
    }
    .dialog-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .dialog-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 7px;
        font-family: Montserrat, sans-serif;
    }
    h3, h4 {
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        color: #003d7f;
    }
    button {
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        font-size: 19px;
        background-color: #FFFFFF;
        color: #148CFA;
        border: 1px solid #148CFA;
        border-radius: 7px;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
    button:hover {
        background-color: #148CFA;
        color: #FFFFFF;
    }
    .dragging {
        opacity: 0.5;
    }
            .dragging {
                opacity: 0.5;
            }
        `;

        constructor() {
            super();
            this.fieldsToDownload = [];
        }

        async downloadDataTableToCSV(downloadElements, dataArr, selectedData, downaloadbleButtonModel, lang = 'en') {
            if (downloadElements === undefined) {
                alert("The definition to download is wrong");
                return;
            }
            if (selectedData === undefined || selectedData.length > 0) {
                dataArr = selectedData;
            }
        
            let allFieldsInDataArrSet = new Set();
            dataArr.forEach(item => {
                Object.keys(item).forEach(key => allFieldsInDataArrSet.add(key));
            });
            const allFieldsInDataArr = Array.from(allFieldsInDataArrSet);
        
            const allNamesInColumns = new Set();
            downloadElements.columns.forEach(column => {
                if (column.hasOwnProperty('name')) {
                    allNamesInColumns.add(column.name);
                }
            });
            const tableColumnsArray = Array.from(allNamesInColumns);
            this.fieldsToDownload = tableColumnsArray;
        
            console.log('downloadElements', downloadElements);
        
            if (downloadElements.downloadable !== undefined && downloadElements.downloadable.allowUserSelectColumns !== undefined && downloadElements.downloadable.allowUserSelectColumns === true) {
                await this.showDialog(lang, allFieldsInDataArr, this.fieldsToDownload);
                this.fieldsToDownload = this.updateFieldsToDownload(); // Actualizar después de la selección
            }
        
            let csvContent = "data:text/csv;charset=utf-8,"; // Cambiado a coma en lugar de punto y coma
            let contents = this.getTraceabilityInfo();
        
            let headers = this.fieldsToDownload.map(key => key[`label_${lang}`] || key);
            contents.push(headers.join(";"));
            if (dataArr !== undefined) {
                dataArr.forEach(item => {
                    let row = this.fieldsToDownload.map(key => {
                        return item.hasOwnProperty(key) ? `"${item[key]}"` : ""; // Ensure to handle potential commas in data
                    }).join(";");
                    contents.push(row);
                });
            }
            
            csvContent += contents.join("\r\n");
        
            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `export_${new Date().toISOString().slice(0, 10)}.csv`); // Simplified filename
            document.body.appendChild(link); // Append link to the body to ensure it can be clicked
            link.click();
            document.body.removeChild(link); // Clean up link after clicking
        }
        
        getTraceabilityInfo() {
            let trackInfo = [];
            let userSession = JSON.parse(sessionStorage.getItem("userSession"));
            let procInstanceName = sessionStorage.getItem("currentProcInstanceName");
            if (procInstanceName===null||procInstanceName===undefined){
                procInstanceName=this.procInstanceName
            }
            trackInfo.push('Traceability Info:; TRAZiT');
            trackInfo.push('Exported by:;' + userSession.header_info.first_name + ' ' + userSession.header_info.last_name);
            trackInfo.push('Exported on:;' + String(new Date()));
            trackInfo.push('System:;' + userSession.dbName + ';Procedure:;' + procInstanceName);
            return trackInfo;
        }
        

        showDialog(lang, unselectedList, selectedList) {
            return new Promise((resolve, reject) => {
                this.cleanupDialog(); // Clean up any existing dialog elements before creating new ones
        
                const dialogContainer = document.createElement('div');
                dialogContainer.id = 'dialog-container';
                dialogContainer.style.display = 'none';
                dialogContainer.style.zIndex = '1000';
                dialogContainer.style.position = 'relative';
        
                const dialogBackground = document.createElement('div');
                dialogBackground.id = 'dialog-background';
                dialogBackground.style.position = 'fixed';
                dialogBackground.style.top = '0';
                dialogBackground.style.left = '0';
                dialogBackground.style.width = '100%';
                dialogBackground.style.height = '100%';
                dialogBackground.style.background = 'rgba(0, 0, 0, 0.5)';
        
                const dialogBox = document.createElement('div');
                dialogBox.id = 'dialog-box';
                dialogBox.style.position = 'fixed';
                dialogBox.style.top = '50%';
                dialogBox.style.left = '50%';
                dialogBox.style.transform = 'translate(-50%, -50%)';
                dialogBox.style.background = 'white';
                dialogBox.style.padding = '20px';
                dialogBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        
                const selectedColumnsContainer = document.createElement('div');
                const selectedColumnsTitle = document.createElement('h4');
                selectedColumnsTitle.textContent = lang === 'es' ? 'Columnas seleccionadas' : 'Selected Columns';
                const selectedListElement = document.createElement('ul');
                selectedListElement.id = 'selected-list';
                selectedListElement.classList.add('list');
                selectedListElement.style.fontFamily = 'Montserrat';
                selectedListElement.style.color = '#808080';
                selectedListElement.style.fontSize = '20px';

                const unselectedColumnsContainer = document.createElement('div');
                const unselectedColumnsTitle = document.createElement('h4');
                unselectedColumnsTitle.textContent = lang === 'es' ? 'Columnas no seleccionadas' : 'Unselected Columns';
                const unselectedListElement = document.createElement('ul');
                unselectedListElement.id = 'unselected-list';
                unselectedListElement.classList.add('list');
                unselectedListElement.style.fontFamily = 'Montserrat';
                unselectedListElement.style.color = '#808080';
                unselectedListElement.style.fontSize = '20px';
                
                selectedColumnsContainer.appendChild(selectedColumnsTitle);
                selectedColumnsContainer.appendChild(selectedListElement);
                unselectedColumnsContainer.appendChild(unselectedColumnsTitle);
                unselectedColumnsContainer.appendChild(unselectedListElement);
        

                const okButton = document.createElement('button');
                okButton.id = 'dialog-ok';
                okButton.textContent = 'OK';
                okButton.classList.add('sp-button'); // Aplicar la clase sp-button
                okButton.style.background = '#1473e6';
                okButton.style.borderColor = 'inherit';
                okButton.style.borderRadius = '35px';
                okButton.style.fontFamily = 'Montserrat';
                okButton.style.fontWeight = 'bold';
                okButton.style.fontSize = '19px';
                okButton.style.color = '#FFFFFF';                
                okButton.onclick = () => {
                    this.fieldsToDownload = this.updateFieldsToDownload(); // Actualizar después de cerrar el diálogo
                    dialogContainer.style.display = 'none';
                    resolve();
                };
        
                const cancelButton = document.createElement('button');
                cancelButton.id = 'dialog-cancel';
                cancelButton.textContent = 'Cancel';
                cancelButton.classList.add('sp-button'); // Aplicar la clase sp-button
                cancelButton.style.background = '#1473e6';
                cancelButton.style.borderColor = 'inherit';
                cancelButton.style.borderRadius = '35px';
                cancelButton.style.fontFamily = 'Montserrat';
                cancelButton.style.fontWeight = 'bold';
                cancelButton.style.fontSize = '19px';
                cancelButton.style.color = '#FFFFFF';                
                cancelButton.onclick = () => {
                    dialogContainer.style.display = 'none';
                    reject('Dialog cancelled');
                };
        
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.justifyContent = 'center';
                buttonContainer.style.gap = '10px'; // Espacio entre los botones
                buttonContainer.style.marginTop = '20px'; // Margen superior para separar de las listas
                
                buttonContainer.appendChild(okButton);
                buttonContainer.appendChild(cancelButton);

                dialogBox.appendChild(selectedColumnsContainer);
                dialogBox.appendChild(unselectedColumnsContainer);
                dialogBox.appendChild(buttonContainer);
                // dialogBox.appendChild(okButton);
                // dialogBox.appendChild(cancelButton);
        
                dialogBackground.appendChild(dialogBox);
                dialogContainer.appendChild(dialogBackground);
        
                document.body.appendChild(dialogContainer);
                dialogContainer.style.display = 'block';
        
                // Llamar a populateLists después de que el diálogo esté en el DOM
                this.populateLists(selectedList, unselectedList);
        
                dialogBackground.addEventListener('click', (event) => {
                    if (event.target === dialogBackground) {
                        dialogContainer.style.display = 'none';
                        reject('Dialog closed');
                    }
                });
            });
        }
        

        populateLists(selected, unselected) {
            const selectedList = document.getElementById('selected-list');
            const unselectedList = document.getElementById('unselected-list');

            if (!selectedList || !unselectedList) {
                console.error('Selected or Unselected list element not found');
                return;
            }

            selectedList.innerHTML = '';
            unselectedList.innerHTML = '';

            (selected || []).forEach((field, index) => {
                let li = document.createElement('li');
                li.textContent = `${index + 1}. ${field}`;
                li.draggable = true; // Hacer que los elementos sean arrastrables
                li.style.cursor = 'pointer'; // Cambiar el cursor al pasar sobre el elemento
                li.onclick = this.moveItemToUnselected.bind(this);
                li.addEventListener('dragstart', this.handleDragStart.bind(this));
                li.addEventListener('dragover', this.handleDragOver.bind(this));
                li.addEventListener('drop', this.handleDrop.bind(this));
                selectedList.appendChild(li);
            });

            (unselected || []).forEach((field, index) => {
                if (!selected.includes(field)) {
                    let li = document.createElement('li');
                    li.textContent = `${index + 1}. ${field}`;
                    li.style.cursor = 'pointer'; // Cambiar el cursor al pasar sobre el elemento
                    li.onclick = this.moveItemToSelected.bind(this);
                    unselectedList.appendChild(li);
                }
            });

            this.updateFieldsToDownload();
        }

        moveItemToSelected(event) {
            const item = event.target;
            const unselectedList = document.getElementById('unselected-list');
            const selectedList = document.getElementById('selected-list');

            if (unselectedList.contains(item)) {
                item.removeEventListener('click', this.moveItemToSelected.bind(this));
                item.addEventListener('click', this.moveItemToUnselected.bind(this));
                item.draggable = true; // Hacer que los elementos sean arrastrables
                item.style.cursor = 'pointer'; // Cambiar el cursor al pasar sobre el elemento
                item.addEventListener('dragstart', this.handleDragStart.bind(this));
                item.addEventListener('dragover', this.handleDragOver.bind(this));
                item.addEventListener('drop', this.handleDrop.bind(this));

                unselectedList.removeChild(item);
                selectedList.appendChild(item);

                this.updateFieldsToDownload();
                this.updateListIndices(selectedList); // Actualizar los índices después de mover
            }
        }

        moveItemToUnselected(event) {
            const item = event.target;
            const unselectedList = document.getElementById('unselected-list');
            const selectedList = document.getElementById('selected-list');

            if (selectedList.contains(item)) {
                item.removeEventListener('click', this.moveItemToUnselected.bind(this));
                item.addEventListener('click', this.moveItemToSelected.bind(this));
                item.draggable = false; // Desactivar arrastrar
                item.style.cursor = 'pointer'; // Cambiar el cursor al pasar sobre el elemento
                item.removeEventListener('dragstart', this.handleDragStart.bind(this));
                item.removeEventListener('dragover', this.handleDragOver.bind(this));
                item.removeEventListener('drop', this.handleDrop.bind(this));

                selectedList.removeChild(item);
                unselectedList.appendChild(item);

                this.updateFieldsToDownload();
                this.updateListIndices(selectedList); // Actualizar los índices después de mover
            }
        }

        handleDragStart(event) {
            event.target.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', event.target.textContent);
        }

        handleDragOver(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }

        handleDrop(event) {
            event.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            const targetElement = event.target;

            if (draggingElement && targetElement && targetElement.tagName === 'LI' && targetElement !== draggingElement) {
                const list = targetElement.parentElement;
                list.insertBefore(draggingElement, targetElement.nextSibling);
                draggingElement.classList.remove('dragging');

                this.updateFieldsToDownload();
                this.updateListIndices(list); // Actualizar los índices después de soltar
            }
        }

        updateFieldsToDownload() {
            const selectedList = document.getElementById('selected-list');
            const fields = Array.from(selectedList.children).map(item => item.textContent.split('. ')[1]);
            console.log('Updated fieldsToDownload:', fields);
            return fields;
        }

        updateListIndices(list) {
            Array.from(list.children).forEach((item, index) => {
                item.textContent = `${index + 1}. ${item.textContent.split('. ')[1]}`;
            });
        }

        cleanupDialog() {
            const existingDialog = document.getElementById('dialog-container');
            if (existingDialog) {
                existingDialog.remove();
            }
        }
    };
}
