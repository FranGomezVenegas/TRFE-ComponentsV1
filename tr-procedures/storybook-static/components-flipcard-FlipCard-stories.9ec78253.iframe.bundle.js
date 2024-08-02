"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[583],{"./src/components/flipcard/FlipCard.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Group1:()=>Group1,Group2:()=>Group2,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FlipCard_stories});var lit=__webpack_require__("./node_modules/lit/index.js");const flipCardStyles=lit.AH`
.flip-card-container {
  display: grid;
  grid-template-columns: repeat(var(--cards-per-row, 3), minmax(300px, 1fr));
  gap: 20px; /* Espacio entre las tarjetas */
  margin: 20px 0;
}

.flip-card {
  height: var(--flip-card-height, 400px);
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 300px;
  max-width: 350px;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .flip-card-front,
  .flip-card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px 0; /* Reducir el padding superior */
  }

  .flip-card-front {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinear contenido al principio */
    text-align: center;
  }

  .flip-card-back {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Alinear contenido al principio */
    text-align: center;
  }

  .card-header {
    width: 100%;
    margin-bottom: 10px; /* Reducir el margen inferior */
  }

  .card-role {
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 5px;
  }

  .card-title {
    font-family: Montserrat;
    font-size: 2.4rem;
    font-weight: 100;
    margin-bottom: 10px;
  }

  .card-cover {
    width: 90%;
    height: 25%; /* Ajustar la altura */
    background: linear-gradient(to top right, #1e0b36, #ca3782);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }

  .card-heading-text {
    font-family: Montserrat;
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: uppercase;
    padding: 10px 15px;    
    border-radius: 5px;
  }

  .card-details {
    padding: 20px;
    text-align: center;
  }

  .skills-list {
    list-style: none;
    padding: 0;
    overflow-y: auto;
    max-height: 200px;
  }

  .skills-list li {
    font-size: 1.6rem;
    padding: 10px 0;
  }

  .flip-button {
    background-color: #1e0b36;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }

  .flip-button:hover {
    background-color: #ca3782;
  }

  .button-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
  }

  .flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .text-normal {
    color: white;
  }

  .text-warning {
    color: yellow;
  }

  .text-critical {
    color: #7b0a1f;
  }

  @media only screen and (max-width: 600px) {
    .flip-card {
      width: calc(100% - 20px); /* Ajuste para pantallas pequeñas */
      height: auto;
    }
  }
`;var lit_element_router=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js");class FlipCard extends((0,lit_element_router.gM)(lit.WF)){static styles=lit.AH`
    ${flipCardStyles}
  `;static get properties(){return{config:{type:Object},data:{type:Array},lang:{type:String},defaultImageUrl:{type:String},defaultImageHeight:{type:String},defaultImageWidth:{type:String}}}constructor(){super(),this.config={},this.data=[],this.defaultImageUrl="https://images.unsplash.com/photo-1720475376136-bf9bf6c0c782?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",this.defaultImageHeight="50px",this.defaultImageWidth="100%"}setConfigVariables(){const maxCardsPerRow=this.data.length;let cardsPerRow=3;this.config&&void 0!==this.config.cardsPerRow&&(cardsPerRow=Math.min(this.config.cardsPerRow,maxCardsPerRow)),this.style.setProperty("--cards-per-row",cardsPerRow),this.config&&void 0!==this.config.width&&this.style.setProperty("--flip-card-width",this.config.width),this.config&&void 0!==this.config.height&&this.style.setProperty("--flip-card-height",this.config.height),void 0===this.lang&&(this.lang="en")}getClassForTextType(type){switch(type){case"warning":return"text-warning";case"critical":return"text-critical";default:return"text-normal"}}render(){return this.setConfigVariables(),lit.qy`
      <div class="flip-card-container">
        ${this.data.map((item=>lit.qy`
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                ${void 0===item.contentOnFront||void 0===item.contentOnFront.cardTitle?lit.qy``:lit.qy`
                  <div class="card-cover">
                    <h4 class="card-heading">
                      <span class="card-heading-text">${void 0===item.contentOnFront||void 0===item.contentOnFront.cardTitle?lit.qy``:lit.qy`${item.contentOnFront.cardTitle["label_"+this.lang]}`}</span>
                    </h4>
                  </div>
                `}
                <div class="card-content">
                  <div class="card-header">
                    ${void 0!==item.contentOnFront&&item.contentOnFront.imageUrl?lit.qy`<img src="${item.imageUrl}" alt="Dynamic Image" style="height:${item.imageHeight||this.defaultImageHeight}; width:${item.imageWidth||this.defaultImageWidth};" />`:lit.s6}
                  </div>
                  ${void 0===item.contentOnFront||void 0===item.contentOnFront.textTop?lit.s6:lit.qy`
                    <p class="card-role ${this.getClassForTextType(item.contentOnFront.textTop.type)}">${item.contentOnFront.textTop["label_"+this.lang]}</p>
                  `}
                  ${void 0===item.contentOnFront||void 0===item.contentOnFront.textLow?lit.s6:lit.qy`
                    <p class="card-title ${this.getClassForTextType(item.contentOnFront.textLow.type)}">${item.contentOnFront.textLow["label_"+this.lang]}</p>
                  `}
                </div>
                <div class="button-container">
                  ${item.clickLinkAllowed?lit.qy`<button class="flip-button" @click="${()=>this._elementClicked(item)}">Window</button>`:lit.s6}
                  ${item.flipCardAllowed?lit.qy`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>`:lit.s6}
                </div>
              </div>
              <div class="flip-card-back">
                ${void 0===item.contentOnBack||void 0===item.contentOnBack.cardTitle?lit.qy``:lit.qy`
                  <div class="card-cover">                
                    <h4 class="card-heading">
                      <span class="card-heading-text">${void 0===item.contentOnBack||void 0===item.contentOnBack.cardTitle?lit.qy``:lit.qy`${item.contentOnBack.cardTitle["label_"+this.lang]}`}</span>
                    </h4>
                  </div>
                `}
                <div class="card-details">
                  <ul class="skills-list">
                  ${void 0===item.contentOnBack||void 0===item.contentOnBack.detail?lit.s6:lit.qy`
                    ${item.contentOnBack.detail["label_"+this.lang].map(((curText,index)=>lit.qy`
                      <li class="${this.getClassForTextType(item.contentOnBack.detail.types?item.contentOnBack.detail.types[index]:"normal")}">${curText}</li>
                    `))}
                  `}
                  </ul>
                </div>
                <div class="button-container">
                  ${item.clickLinkAllowed?lit.qy`<button class="flip-button" @click="${()=>this._elementClicked(item)}">Window</button>`:lit.s6}
                  ${item.flipCardAllowed?lit.qy`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>`:lit.s6}
                </div>
              </div>
            </div>
          </div>
        `))}
      </div>
    `}flipCard(event){event.stopPropagation();event.currentTarget.closest(".flip-card").classList.toggle("flipped")}_elementClicked(item){if(void 0===item.procInstanceName||void 0===item.viewName)return void alert("Procedure and view are mandatory to open one view from this card");let procName=item.procInstanceName,vwName=item.viewName,fltrName=item.filterName;void 0===procName&&(procName=this.procName),console.log("elementClicked",procName,vwName,fltrName),this._selectedMenu("/dashboard/procedures?procName="+procName+"&viewName="+vwName+"&filterName="+fltrName)}_selectedMenu(route){this.shadowRoot.querySelectorAll("sp-action-menu").forEach((s=>s.open=!1)),this.navigate(route)}}customElements.define("flip-card",FlipCard);const FlipCard_stories={title:"Components/FlipCard",component:"flip-card",tags:["autodocs"],argTypes:{config:{control:"object",description:"Configuración del flip-card. Incluye propiedades como `flipCardAllowed` y `cardsPerRow`.",table:{type:{summary:"object"},defaultValue:{summary:"{}"}}},data:{control:"object",description:"Datos para cada tarjeta. Incluye propiedades como `textLow`, `textTop`, `flipCardAllowed`, `clickLinkAllowed` y `contentOnBack`.",table:{type:{summary:"array"},defaultValue:{summary:"[]"}}},lang:{control:"text",description:"Idioma para la tarjeta.",table:{type:{summary:"string"},defaultValue:{summary:"es"}}}}},Template=({lang,config,data})=>lit.qy`
  <flip-card .lang=${lang} .config=${config} .data=${data}></flip-card>
`,Group1=Template.bind({});Group1.args={lang:"es",config:{flipCardAllowed:!0,cardsPerRow:3},data:[{textLow:"Hola11",textTop:"Hola",flipCardAllowed:!0,clickLinkAllowed:!0,contentOnBack:{detail:[{label_en:"Detail 1",label_es:"Detalle 1"},{label_en:"Detail 2",label_es:"Detalle 2"}]}},{textLow:"Hola12",textTop:"Hola",flipCardAllowed:!0,clickLinkAllowed:!0},{textLow:"Hola13",textTop:"Hola",flipCardAllowed:!0,clickLinkAllowed:!0},{textLow:"Hola14",textTop:"Hola",flipCardAllowed:!0,clickLinkAllowed:!0}]};const Group2=Template.bind({});Group2.args={lang:"es",config:{flipCardAllowed:!1,cardsPerRow:2},data:[{textLow:"Hola222",textTop:"Hola",flipCardAllowed:!0,clickLinkAllowed:!0,contentOnFront:{textTop:{label_en:"Detail A",label_es:"Detalle A",type:"warning"},textLow:{label_en:"Detail A",label_es:"Detalle A",type:"critical"}},contentOnBack:{detail:{label_en:["Detail Abb"],label_es:["Detalle A"]}}}]};const __namedExportsOrder=["Group1","Group2"];Group1.parameters={...Group1.parameters,docs:{...Group1.parameters?.docs,source:{originalSource:"({\n  lang,\n  config,\n  data\n}) => html`\n  <flip-card .lang=${lang} .config=${config} .data=${data}></flip-card>\n`",...Group1.parameters?.docs?.source}}},Group2.parameters={...Group2.parameters,docs:{...Group2.parameters?.docs,source:{originalSource:"({\n  lang,\n  config,\n  data\n}) => html`\n  <flip-card .lang=${lang} .config=${config} .data=${data}></flip-card>\n`",...Group2.parameters?.docs?.source}}}},"./node_modules/lit-element-router/lit-element-router.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function navigator(base){return class extends base{navigate(href){window.history.pushState({},null,href),window.dispatchEvent(new CustomEvent("route"))}}}__webpack_require__.d(__webpack_exports__,{gM:()=>navigator})}}]);
//# sourceMappingURL=components-flipcard-FlipCard-stories.9ec78253.iframe.bundle.js.map