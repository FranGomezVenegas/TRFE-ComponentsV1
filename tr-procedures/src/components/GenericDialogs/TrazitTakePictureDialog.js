import { html } from 'lit';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';
import {DialogsFunctions} from './DialogsFunctions';
import '../cameraview/index';
export function TrazitTakePictureDialog(base) {
return class extends GridFunctions(DialogsFunctions(base)) {
    static get properties() {
        return {
            lang:{type:String}
        }
    }
    constructor() {
        console.log("constructor");
        super()
    }
    openTakePictureDialog(actionModel = this.actionBeingPerformedModel){
        if (actionModel.dialogInfo===undefined||actionModel.dialogInfo.name===undefined||actionModel.dialogInfo.name.toString().toUpperCase()!=="TAKEPICTUREDIALOG"){
            return false
       }    
       return true 
    }    
    resetView(){
        this.cameraView._init()
    }
    takePictureFormDialog(actionModel) {
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
            }
        </style>
        <tr-dialog 
            id="takePictureDialog" 
            @opened=${this.resetView} 
            ?open=${this.openTakePictureDialog(actionModel)} 
            heading="" 
            hideActions="" 
            scrimClickAction=""
        >
            <p class="title">${this.lang==="en"?html`Turn on the cam, Take one picture of the plate and upload it`:html`Activa la cámara, toma una foto de la placa y súbela`}</p>
            <camera-view id="cameraView" .lang=${this.lang}></camera-view>
        </tr-dialog>
    `
    }
    get cameraView() {return this.shadowRoot.querySelector("camera-view#cameraView")}
    get takePictureDialog() {
        this.cameraView._reset();
        return this.shadowRoot.querySelector("tr-dialog#takePictureDialog")
    }
}
}  