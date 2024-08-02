/*! For license information please see components-MultiSelect-_Multiselect-stories.fd38266a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[58],{"./node_modules/@material/base/foundation.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>MDCFoundation});var MDCFoundation=function(){function MDCFoundation(adapter){void 0===adapter&&(adapter={}),this.adapter=adapter}return Object.defineProperty(MDCFoundation,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(MDCFoundation,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(MDCFoundation,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(MDCFoundation,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),MDCFoundation.prototype.init=function(){},MDCFoundation.prototype.destroy=function(){},MDCFoundation}()},"./node_modules/@material/mwc-base/base-element.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>BaseElement,i:()=>_utils_js__WEBPACK_IMPORTED_MODULE_1__.is});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_utils_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@material/mwc-base/utils.js");class BaseElement extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}},"./node_modules/@material/mwc-base/observer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>observer});const observer=observer=>(proto,propName)=>{if(proto.constructor._observers){if(!proto.constructor.hasOwnProperty("_observers")){const observers=proto.constructor._observers;proto.constructor._observers=new Map,observers.forEach(((v,k)=>proto.constructor._observers.set(k,v)))}}else{proto.constructor._observers=new Map;const userUpdated=proto.updated;proto.updated=function(changedProperties){userUpdated.call(this,changedProperties),changedProperties.forEach(((v,k)=>{const observer=this.constructor._observers.get(k);void 0!==observer&&observer.call(this,this[k],v)}))}}proto.constructor._observers.set(propName,observer)}},"./node_modules/@material/mwc-base/utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{SE:()=>doesElementContainFocus,U9:()=>deepActiveElementPath,hP:()=>isNodeElement,is:()=>addHasRemoveClass});const isNodeElement=node=>node.nodeType===Node.ELEMENT_NODE;function addHasRemoveClass(element){return{addClass:className=>{element.classList.add(className)},removeClass:className=>{element.classList.remove(className)},hasClass:className=>element.classList.contains(className)}}let supportsPassive=!1;const fn=()=>{},optionsBlock={get passive(){return supportsPassive=!0,!1}};document.addEventListener("x",fn,optionsBlock),document.removeEventListener("x",fn);const deepActiveElementPath=(doc=window.document)=>{let activeElement=doc.activeElement;const path=[];if(!activeElement)return path;for(;activeElement&&(path.push(activeElement),activeElement.shadowRoot);)activeElement=activeElement.shadowRoot.activeElement;return path},doesElementContainFocus=element=>{const activePath=deepActiveElementPath();if(!activePath.length)return!1;const deepActiveElement=activePath[activePath.length-1],focusEv=new Event("check-if-focused",{bubbles:!0,composed:!0});let composedPath=[];const listener=ev=>{composedPath=ev.composedPath()};return document.body.addEventListener("check-if-focused",listener),deepActiveElement.dispatchEvent(focusEv),document.body.removeEventListener("check-if-focused",listener),-1!==composedPath.indexOf(element)}},"./src/components/MultiSelect/_Multiselect.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js");__webpack_require__("./src/components/MultiSelect/multiselect.css.js"),__webpack_require__("./src/components/MultiSelect/multiselect.template.js"),__webpack_require__("./src/components/MultiSelect/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Multiselect",component:"multiselect",tags:["autodocs"],parameters:{docs:{description:{component:"The `multiselect` component allows users to select multiple options from a predefined list. It provides flexibility with configuration options and handles various selection states."}}},argTypes:{config:{description:"Configuration object for the multiselect component",control:"object",table:{type:{summary:"object"}}},maxSelections:{description:"Maximum number of selections allowed",control:"number",table:{category:"config",type:{summary:"number"},defaultValue:{summary:3}}},disabled:{description:"Indicates if the multiselect is disabled",control:"boolean",table:{category:"config",type:{summary:"boolean"},defaultValue:{summary:!1}}},options:{description:"Array of options available for selection",control:"array",table:{type:{summary:"array"}}},label:{description:"Text representing the option",control:"text",table:{category:"options",type:{summary:"string"},defaultValue:{summary:""}}},value:{description:"Value of the option",control:"text",table:{category:"options",type:{summary:"string"},defaultValue:{summary:""}}},selected:{description:"Indicates if the option is selected by default",control:"boolean",table:{category:"options",type:{summary:"boolean"},defaultValue:{summary:!1}}}}},Default=(({config,options})=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
  <multiselect .config=${config} .options=${options}></multiselect>
`).bind({});Default.args={config:{maxSelections:3,disabled:!1},options:[{label:"Option 1",value:"opt1",selected:!0},{label:"Option 2",value:"opt2"},{label:"Option 3",value:"opt3"},{label:"Option 4",value:"opt4"}]};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  config,\n  options\n}) => html`\n  <multiselect .config=${config} .options=${options}></multiselect>\n`",...Default.parameters?.docs?.source}}}},"./node_modules/lit-html/directive.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{OA:()=>t,WL:()=>i,u$:()=>e});const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},"./node_modules/lit/directives/class-map.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H:()=>o});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),directive=__webpack_require__("./node_modules/lit-html/directive.js");const o=(0,directive.u$)(class extends directive.WL{constructor(t){var i;if(super(t),t.type!==directive.OA.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t))}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)))}return lit_html.c0}})},"./node_modules/lit/directives/if-defined.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>l});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js");const l=l=>null!=l?l:lit_html.s6},"./src/components/MultiSelect/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var lit_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-element/lit-element.js"),_multiselect_template__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/MultiSelect/multiselect.template.js"),_multiselect_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/MultiSelect/multiselect.css.js"),lit_element_router__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js");class MultiSelect extends((0,lit_element_router__WEBPACK_IMPORTED_MODULE_3__.gM)(lit_element__WEBPACK_IMPORTED_MODULE_0__.WF)){static get styles(){return _multiselect_css__WEBPACK_IMPORTED_MODULE_2__.R}static get properties(){return{activeOptions:{type:Array},options:{type:Array},props:{type:Object},open:{type:Boolean},searchOptions:{type:Array}}}constructor(){super(),this.options=[],this.props={},this.activeOptions=[],this.open=!1,this.searchOptions=[],this.allowAdhocEntries=!0,this.value=void 0,this.clickedContainer=!1}render(){return void 0===this.activeOptions?this.activeOptions=[]:"string"==typeof this.activeOptions&&(this.activeOptions=this.activeOptions.split("|")),Array.isArray(this.activeOptions)||(this.activeOptions=[]),void 0===this.searchOptions?this.searchOptions=[]:"string"==typeof this.searchOptions&&(this.searchOptions=this.searchOptions.split("|")),Array.isArray(this.searchOptions)||(this.searchOptions=[]),void 0===this.props&&(this.props={}),void 0===this.props.allowAdhocEntries&&(this.props.allowAdhocEntries=!1),void 0!==this.props&&void 0!==this.props.displayLabel||(this.props.displayLabel=!0),void 0!==this.props&&void 0!==this.props.readOnly||(this.props.readOnly=!1),(0,_multiselect_template__WEBPACK_IMPORTED_MODULE_1__.v)({activeOptions:this.activeOptions,options:this.options,displayLabel:this.props.displayLabel,readOnly:this.props.readOnly,open:this.open,searchOptions:this.searchOptions,allowAdhocEntries:this.props.allowAdhocEntries,clickedContainer:this.clickedContainer,setOpen:this._setOpen,removeActiveOption:this._removeActiveOption,removeOption:this._removeOption,setOpenTrue:this._setOpenTrue,pressEnter:this._pressEnter,clickContainer:this._clickContainer,inputFocusOut:this._inputFocusOut},this.label)}_inputFocusOut=()=>{0==this.activeOptions.length&&(this.clickedContainer=!1),this.open=!1,this.requestUpdate()};_clickContainer=e=>{this.clickedContainer=!0,this.open=!0,this.requestUpdate()};_pressEnter=e=>{const inputValue=e.target.value.toLowerCase();this.activeOptions.some((option=>option.toLowerCase()===inputValue))||this.activeOptions.push(e.target.value),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.inputValue="",this.requestUpdate()};firstUpdated=()=>{this.searchOptions=this.options,this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.requestUpdate()};_setOpen=e=>{e.stopPropagation(),this.open=!this.open,this.open?this.clickedContainer=!0:0==this.activeOptions.length&&(this.clickedContainer=!1),this.requestUpdate()};_removeActiveOption=index=>{this.searchOptions.push(this.activeOptions[index]),this.activeOptions.splice(index,1),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),0==this.activeOptions.length&&(this.clickedContainer=!1,this.open=!1),this.requestUpdate()};_removeOption=index=>{this.activeOptions.push(this.searchOptions[index]),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.searchOptions.splice(index,1),this.requestUpdate()};_setOpenTrue=()=>{this.open=!0,this.requestUpdate()};setClosed(){this.open=!1,this.requestUpdate()}}window.customElements.define("multi-select",MultiSelect)},"./src/components/MultiSelect/multiselect.css.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>styles});const styles=__webpack_require__("./node_modules/lit-element/lit-element.js").AH`
:host {

}
.sellect-container {
    border: 1px solid #ccc;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: 5px;
    position: relative;
    background: #efefef;
}

.sellect-container-readonly {
    border: none;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: -5px;
    position: relative;
    background: #efefef;
}


.sellect-destination-list {
    display: inline-block;
}

.sellect-destination-list .sellect-item {
    padding-top: 3px;
    padding-bottom: 0;
    font-size: 11px;
}

.sellect-destination-list .sellect-item {
    margin: 2px -2px 2px 0;
    background-color: #e5e5e5;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 2px;
    padding: 0px 5px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    color: rgb(19, 11, 111);
    background-color: #8DDDF4;    
}

.sellect-destination-list .sellect-item .sellect-close-icon {
    margin-left: 5px;
}

.sellect-element {
    border: none;
    height: 18px;
    background: none;
}

.sellect-element:focus-visible {
    outline-offset: 0px;
    outline: none;
}

.sellect-origin-list.open {
    max-height: 138px;
    opacity: 1;
}

.sellect-origin-list {
    overflow: auto;
    max-height: 0;
    opacity: 0;
    transition: opacity 1.1s ease, max-height .2s ease;
}

.sellect-origin-list .sellect-item {
    display: block;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    margin-right: 5px;
}

.sellect-arrow-icon {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    padding: 8px;
    transform: translateY(-3px);
}

.first {
    color: gray;
    position: absolute;
    font-size: 14px;
    top: 8px;
}

.second {
    top: 0px;
    left: -12px;
    position: absolute;
    transform: scale(0.8);
    color: #18a4fe;
}

label {
    padding: 0px 8px;
    transition: all 0.2s;
}
`},"./src/components/MultiSelect/multiselect.template.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>template});var lit_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js"),__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js");const template=(props,label)=>{void 0===props.activeOptions?props.activeOptions=[]:"string"==typeof props.activeOptions&&(props.activeOptions=props.activeOptions.split("|")),Array.isArray(props.activeOptions)||(props.activeOptions=[]),void 0===props.options?props.options=[]:"string"==typeof props.options&&(props.options=props.options.split("|")),Array.isArray(props.options)||(props.options=[]),void 0===props.allowAdhocEntries&&(props.allowAdhocEntries=!1),void 0===props.readOnly&&(props.readOnly=!1),void 0===props.displayLabel&&(props.displayLabel=!0),!0===props.readOnly&&(props.clickedContainer=!0);const filteredOptions=props.options.filter((option=>!props.activeOptions.includes(option))),uniqueFilteredOptions=[...new Set(filteredOptions)];return lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div>
    ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div class="sellect-container-readonly" @click=${e=>props.clickContainer(e)} style=${props.clickedContainer?"background-color:transparent;":""} @focusout=${()=>props.inputFocusOut()}>
        ${!1===props.displayLabel?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <label class=${props.clickedContainer?"second":"first"}> ${label} </label>
        `}                
        <div class="sellect-destination-list">
        ${props.activeOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${()=>props.removeActiveOption(i)}> close </mwc-icon> </span>
            `}
        `))}
        </div>
        </div>
    `:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div class="sellect-container" @click=${e=>props.clickContainer(e)} style=${props.clickedContainer?"background-color:transparent;":""} @focusout=${()=>props.inputFocusOut()}>
            <div class="sellect-destination-list">
                ${props.activeOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
                    ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                        <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${()=>props.removeActiveOption(i)}> close </mwc-icon> </span>
                    `}
                `))}
            </div>
            ${!1===props.displayLabel?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <label class=${props.clickedContainer?"second":"first"}> ${label} </label>
                ${props.allowAdhocEntries?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${()=>props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}  @change=${e=>props.pressEnter(e)}></input>
                `:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${()=>props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}> </input>
                `}
            `}
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <div class="sellect-origin-list ${props.open?"open":""}">
                ${uniqueFilteredOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${()=>props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
                `))}
            </div>
            `}
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <mwc-icon class="sellect-arrow-icon" @click=${e=>props.setOpen(e)}> arrow_drop_down </mwc-icon>
            `}
        </div>
    `}
    </div>
    `}}}]);
//# sourceMappingURL=components-MultiSelect-_Multiselect-stories.fd38266a.iframe.bundle.js.map