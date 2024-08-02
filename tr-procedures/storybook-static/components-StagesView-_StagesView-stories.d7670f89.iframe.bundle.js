"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[848],{"./src/components/StagesView/_StagesView.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Group1:()=>Group1,Group2:()=>Group2,Group3:()=>Group3,__namedExportsOrder:()=>__namedExportsOrder,default:()=>_StagesView_stories});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");const styles=lit_element.AH`
:host {
}
`;__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js");var lit_element_router=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js");class StagesView extends((0,lit_element_router.gM)(lit_element.WF)){static get styles(){return styles}static get properties(){return{stages:{type:Array},currentstage:{type:Number},data:{type:Object},lang:{type:String},ejemplo:{type:String}}}constructor(){super(),this.stages=[],this.currentstage=0,this.data={},this.lang="",this.example="mi valor por defecto"}render(){console.log("stages",this.stages);let currentStageName="";return void 0===this.currentstage&&(this.currentstage=0),void 0!==this.stages&&(currentStageName=this.stages[this.currentstage-1]),this.data={stages:this.stages,currentStageName,currentState:this.currentstage-1},((props,lang)=>{return void 0===props.data.stages?lit_element.qy``:lit_element.qy`
    <style>
        *, *:before, *:after{ 
            box-sizing: border-box; 
            -moz-box-sizing: border-box; 
            -webkit-box-sizing: border-box; 
        } 
        .selectedbar {
            font-family: Montserrat;
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(36, 192, 235); 
            border-bottom: 14px solid rgb(36, 192, 235); 
            border-top: 14px solid rgb(36, 192, 235); 
            text-align: center;
            line-height: 0px;
            z-index: 4;
            font-weight: bold;
        }

        .selectedbar::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(36, 192, 235);
            right: -28px;
            top: -14px;
            font-weight: bold;
        }

        .bar1 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(23, 162, 184); 
            border-bottom: 14px solid rgb(23, 162, 184); 
            border-top: 14px solid rgb(23, 162, 184); 
            text-align: center;
            line-height: 0px;
            z-index: 4;
        }

        .bar1::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(23, 162, 184);
            right: -28px;
            top: -14px;
        }

        .bar2 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(40, 167, 69); 
            border-bottom: 14px solid rgb(40, 167, 69); 
            border-top: 14px solid rgb(40, 167, 69); 
            text-align: center;
            line-height: 0px;
            z-index: 3;
        }

        .bar2::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(40, 167, 69);
            right: -28px;
            top: -14px;
        }

        .bar3 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(220, 53, 69); 
            border-bottom: 14px solid rgb(220, 53, 69); 
            border-top: 14px solid rgb(220, 53, 69); 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .bar3::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(220, 53, 69);
            right: -28px;
            top: -14px;
        }

        .bar4 {
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid rgb(253, 126, 20); 
            border-bottom: 14px solid rgb(253, 126, 20); 
            border-top: 14px solid rgb(253, 126, 20); 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .bar4::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid rgb(253, 126, 20);
            right: -28px;
            top: -14px;
        }

        .stages-bar {
            display: flex;
            flex-direction: row;
            gap: 4px;
        }

        .unactive-bar {
            font-family: Montserrat;
            position: relative; 
            height: 28px; 
            width: 240px; 
            padding: 0px; 
            -webkit-transform: rotate(0deg) skew(0deg); 
            transform: rotate(0deg) skew(0deg); 
            border-left: 14px solid transparent; 
            border-right: 14px solid #dddddd; 
            border-bottom: 14px solid #dddddd; 
            border-top: 14px solid #dddddd; 
            text-align: center;
            line-height: 0px;
            z-index: 2;
        }

        .unactive-bar::after {
            content: '';
            position: absolute;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid #dddddd;
            right: -28px;
            top: -14px;
        }

    </style>
    <div class="stages-bar">
        ${props.data.stages.map(((curData,i)=>i!=props.data.currentState?lit_element.qy`<div class="unactive-bar" style="color: gray;"> ${getLabel(curData,lang)} </div>`:lit_element.qy`<div class="selectedbar" style="color: white;"> ${getLabel(curData,lang)} </div>`))}
    </div>
    `;function getLabel(curData,lang){return console.log(lang),void 0===curData["label_"+lang]?curData.name:curData["label_"+lang]}})({data:this.data},this.lang)}}window.customElements.define("stages-view",StagesView);const _StagesView_stories={title:"Components/StagesView",component:"stages-view",tags:["autodocs"],argTypes:{stages:{control:"array",description:'An array of objects representing the stages of the process. Each object should have the following properties:\n- `name`: `String` - The name of the stage (e.g., "Assigned", "Started", "Completed", "Approved").',table:{type:{summary:"array"},defaultValue:{summary:"[]"}}},currentstage:{control:"number",description:"The index of the current stage, starting from 0.",table:{type:{summary:"number"},defaultValue:{summary:0}}},data:{control:"object",description:"An object containing detailed data about the stages and the current stage. It should have the following properties:\n- `stages`: `Array` - An array of stage objects, similar to the `stages` property.\n- `currentStageName`: `String` - The name of the current stage.\n- `currentState`: `Number` - The index of the current stage, starting from 0.",table:{type:{summary:"object"},defaultValue:{summary:"{}"}}},lang:{control:"text",description:'The language code used for localization. Defaults to English ("en").',table:{type:{summary:"string"},defaultValue:{summary:"en"}}},example:{control:"text",description:"Example property for demonstration purposes.",table:{type:{summary:"string"},defaultValue:{summary:""}}}}},Template=({stages,currentstage,data,lang,example})=>lit_html.qy`
  <stages-view
    .stages=${stages}
    .currentstage=${currentstage}
    .data=${data}
    .lang=${lang}
    .example=${example}
  ></stages-view>
`,Default=Template.bind({});Default.args={stages:[{name:"Assigned"},{name:"Started"},{name:"Completed"},{name:"Approved"}],currentstage:1,data:{stages:[{name:"Assigned"},{name:"Started"},{name:"Completed"},{name:"Approved"}],currentStageName:"Assigned",currentState:0},lang:"en",example:"This is an example"};const Group1=Template.bind({});Group1.args={stages:[{name:"Initiated"},{name:"In Progress"},{name:"Finished"},{name:"Reviewed"}],currentstage:2,data:{stages:[{name:"Initiated"},{name:"In Progress"},{name:"Finished"},{name:"Reviewed"}],currentStageName:"Finished",currentState:2},lang:"en",example:"Group 1 Example"};const Group2=Template.bind({});Group2.args={stages:[{name:"Open"},{name:"Processing"},{name:"Closed"},{name:"Archived"}],currentstage:3,data:{stages:[{name:"Open"},{name:"Processing"},{name:"Closed"},{name:"Archived"}],currentStageName:"Archived",currentState:3},lang:"en",example:"Group 2 Example"};const Group3=Template.bind({});Group3.args={stages:[{name:"Draft"},{name:"Submitted"},{name:"Reviewed"},{name:"Published"}],currentstage:1,data:{stages:[{name:"Draft"},{name:"Submitted"},{name:"Reviewed"},{name:"Published"}],currentStageName:"Submitted",currentState:1},lang:"en",example:"Group 3 Example"};const __namedExportsOrder=["Default","Group1","Group2","Group3"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  stages,\n  currentstage,\n  data,\n  lang,\n  example\n}) => html`\n  <stages-view\n    .stages=${stages}\n    .currentstage=${currentstage}\n    .data=${data}\n    .lang=${lang}\n    .example=${example}\n  ></stages-view>\n`",...Default.parameters?.docs?.source}}},Group1.parameters={...Group1.parameters,docs:{...Group1.parameters?.docs,source:{originalSource:"({\n  stages,\n  currentstage,\n  data,\n  lang,\n  example\n}) => html`\n  <stages-view\n    .stages=${stages}\n    .currentstage=${currentstage}\n    .data=${data}\n    .lang=${lang}\n    .example=${example}\n  ></stages-view>\n`",...Group1.parameters?.docs?.source}}},Group2.parameters={...Group2.parameters,docs:{...Group2.parameters?.docs,source:{originalSource:"({\n  stages,\n  currentstage,\n  data,\n  lang,\n  example\n}) => html`\n  <stages-view\n    .stages=${stages}\n    .currentstage=${currentstage}\n    .data=${data}\n    .lang=${lang}\n    .example=${example}\n  ></stages-view>\n`",...Group2.parameters?.docs?.source}}},Group3.parameters={...Group3.parameters,docs:{...Group3.parameters?.docs,source:{originalSource:"({\n  stages,\n  currentstage,\n  data,\n  lang,\n  example\n}) => html`\n  <stages-view\n    .stages=${stages}\n    .currentstage=${currentstage}\n    .data=${data}\n    .lang=${lang}\n    .example=${example}\n  ></stages-view>\n`",...Group3.parameters?.docs?.source}}}},"./node_modules/lit-element-router/lit-element-router.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function navigator(base){return class extends base{navigate(href){window.history.pushState({},null,href),window.dispatchEvent(new CustomEvent("route"))}}}__webpack_require__.d(__webpack_exports__,{gM:()=>navigator})}}]);
//# sourceMappingURL=components-StagesView-_StagesView-stories.d7670f89.iframe.bundle.js.map