import { html, nothing } from 'lit';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';
import {DialogsFunctions} from './DialogsFunctions';
import { ApiFunctions } from '../Api/ApiFunctions';
import '../cameraview/index';
import '../dropzone/index';
export function TrazitTakePictureDialog(base) {
return class extends ApiFunctions(GridFunctions(DialogsFunctions(base))) {
    static get properties() {
        return {
            lang:{type:String},
            actionModel:{type: Object},
            recordData:{type: Object}
        }
    }
    constructor() {
        console.log("constructor");    
        super()
        this.actionModel={}
        this.recordData={}

    }
    show(viewModel, actionModel, data){
        console.log('show', 'actionModel', actionModel)
        this.actionModel=actionModel
        this.recordData=data
        this.requestUpdate(); // Ensure the component updates with new properties

        // Open the dialog after properties are set
        const dialog = this.shadowRoot.querySelector("#takePictureDialog");
        if (dialog) {
          dialog.open = true;
        }        

    }
    openTakePictureDialog(actionModel = this.actionBeingPerformedModel){
        if (actionModel.dialogInfo===undefined||actionModel.dialogInfo.name===undefined
            ||(actionModel.dialogInfo.name.toString().toUpperCase()!=="TAKEPICTUREDIALOG"
            &&actionModel.dialogInfo.name.toString().toUpperCase()!=="UPLOADFILEDIALOG")){
            return false
       }    
       return true 
    }    
    resetView(){
        if (this.cameraView!==null){
            this.cameraView._init()
        }
    }
    takePictureFormDialog(actionModel) {
        //console.log(actionModel)
        if (actionModel === undefined) {
            actionModel = this.actionBeingPerformedModel
        }
         // @closed=${this.resetFields} this is in use but moved to be executed about to perform the fetchApi 
         //     otherwise it is not compatible with actions requiring credentials dialog.
    return html`
        <style>
            mwc-textfield {
                border-style : Solid;
                border-color : #999999;
                border-color : rgba(153, 153, 153, 1);
                border-width : 1px;
                border-radius : 7px;
                -moz-border-radius : 7px;
                -webkit-border-radius : 7px;   
                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
                background-color :  #FFFFFF;
                background-color : rgb(255, 255, 255);  
                --mdc-text-field-idle-line-color:#148CFA;
                --mdc-text-field-outlined-idle-border-color: #148CFA;
                --mdc-text-field-label-ink-color:  #148CFA;
                --mdc-text-field-focused-label-color: #148CFA;
                --mdc-theme-primary: #0465FB;
            }
            mwc-select {        
                --mdc-theme-primary : rgba(36, 192, 235, 1);
                --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
                --mdc-select-ink-color: rgb(47, 47, 47);
                --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
                --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
                --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
                --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
            }
            mwc-select.outlined {        
                --mdc-theme-primary : rgba(36, 192, 235, 1);
                --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
                --mdc-select-ink-color: rgba(36, 192, 235, 1);
                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
                background-color: 4fcad029;
            }       
            .title {
                text-align: center;    
                font-size: 22px;
            }
        </style>
        ${actionModel.dialogInfo===undefined||actionModel.dialogInfo.name.toString().toUpperCase()!=="TAKEPICTUREDIALOG"?nothing:html`
            <tr-dialog id="takePictureDialog" @opened=${this.resetView} ?open=${this.openTakePictureDialog(actionModel)} 
                heading="" hideActions="" scrimClickAction="">
                <p class="title" >${this.lang==="en"?html`Turn on the cam, Take one picture and upload it`:html`Activa la cámara, toma una foto y súbela`}</p>
                <camera-view id="cameraView" .lang=${this.lang} procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .selectedItem="${this.selectedItem}"></camera-view>
            </tr-dialog>
        `}
        ${actionModel.dialogInfo===undefined||actionModel.dialogInfo.name.toString().toUpperCase()!=="UPLOADFILEDIALOG"?nothing:html`
            <tr-dialog id="takePictureDialog" @opened=${this.resetView} ?open=${this.openTakePictureDialog(actionModel)} 
                heading="" hideActions="" scrimClickAction="">
                <p class="title">${this.lang==="en"?html``:html``}</p>
                <drop-zone id="dropFileZone" .lang=${this.lang} procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .selectedItem="${this.selectedItem}"></drop-zone>
            </tr-dialog>
        `}
    `
    }
    get cameraView() {return this.shadowRoot.querySelector("camera-view#cameraView")}
    get takePictureDialog() {
        if (this.cameraView!==null){
            this.cameraView._reset();
        }
        return this.shadowRoot.querySelector("tr-dialog#takePictureDialog")
    }
}
}  