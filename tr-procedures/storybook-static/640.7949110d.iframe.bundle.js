/*! For license information please see 640.7949110d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[640],{"./node_modules/@vaadin/a11y-base/src/disabled-mixin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>DisabledMixin});const DisabledMixin=(0,__webpack_require__("./node_modules/@polymer/polymer/lib/utils/mixin.js").y)((superclass=>class DisabledMixinClass extends superclass{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0}}}_disabledChanged(disabled){this._setAriaDisabled(disabled)}_setAriaDisabled(disabled){disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled")}click(){this.disabled||super.click()}}))},"./node_modules/@vaadin/a11y-base/src/focus-utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Qj:()=>isElementFocused,aJ:()=>isKeyboardActive,n8:()=>isElementHidden});let keyboardActive=!1;function isKeyboardActive(){return keyboardActive}function isElementHiddenDirectly(element){const style=element.style;if("hidden"===style.visibility||"none"===style.display)return!0;const computedStyle=window.getComputedStyle(element);return"hidden"===computedStyle.visibility||"none"===computedStyle.display}function isElementHidden(element){return null===element.offsetParent&&0===element.clientWidth&&0===element.clientHeight||isElementHiddenDirectly(element)}function isElementFocused(element){return element.getRootNode().activeElement===element}window.addEventListener("keydown",(()=>{keyboardActive=!0}),{capture:!0}),window.addEventListener("mousedown",(()=>{keyboardActive=!1}),{capture:!0})},"./node_modules/@vaadin/a11y-base/src/keyboard-mixin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>KeyboardMixin});const KeyboardMixin=(0,__webpack_require__("./node_modules/@polymer/polymer/lib/utils/mixin.js").y)((superclass=>class KeyboardMixinClass extends superclass{ready(){super.ready(),this.addEventListener("keydown",(event=>{this._onKeyDown(event)})),this.addEventListener("keyup",(event=>{this._onKeyUp(event)}))}_onKeyDown(event){switch(event.key){case"Enter":this._onEnter(event);break;case"Escape":this._onEscape(event)}}_onKeyUp(_event){}_onEnter(_event){}_onEscape(_event){}}))},"./node_modules/@vaadin/accordion/node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cp:()=>ThemableMixin,AH:()=>lit.AH,SF:()=>registerStyles});var lit=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/lit/index.js");const ThemePropertyMixin=superClass=>class VaadinThemePropertyMixin extends superClass{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(name,oldValue,newValue){super.attributeChangedCallback(name,oldValue,newValue),"theme"===name&&this._set_theme(newValue)}},themeRegistry=[];function classHasThemes(elementClass){return elementClass&&Object.prototype.hasOwnProperty.call(elementClass,"__themes")}function registerStyles(themeFor,styles,options={}){themeFor&&function hasThemes(tagName){return classHasThemes(customElements.get(tagName))}(themeFor)&&console.warn(`The custom element definition for "${themeFor}"\n      was finalized before a style module was registered.\n      Make sure to add component specific style modules before\n      importing the corresponding custom element.`),styles=function flattenStyles(styles=[]){return[styles].flat(1/0).filter((style=>style instanceof lit.BO||(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1)))}(styles),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(themeFor,styles,options):themeRegistry.push({themeFor,styles,include:options.include,moduleId:options.moduleId})}function getAllThemes(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():themeRegistry}function getIncludePriority(moduleName=""){let includePriority=0;return moduleName.startsWith("lumo-")||moduleName.startsWith("material-")?includePriority=1:moduleName.startsWith("vaadin-")&&(includePriority=2),includePriority}function getIncludedStyles(theme){const includedStyles=[];return theme.include&&[].concat(theme.include).forEach((includeModuleId=>{const includedTheme=getAllThemes().find((s=>s.moduleId===includeModuleId));includedTheme?includedStyles.push(...getIncludedStyles(includedTheme),...includedTheme.styles):console.warn(`Included moduleId ${includeModuleId} not found in style registry`)}),theme.styles),includedStyles}function getThemes(tagName){const defaultModuleName=`${tagName}-default-theme`,themes=getAllThemes().filter((theme=>theme.moduleId!==defaultModuleName&&function matchesThemeFor(themeFor,tagName){return(themeFor||"").split(" ").some((themeForToken=>new RegExp(`^${themeForToken.split("*").join(".*")}$`,"u").test(tagName)))}(theme.themeFor,tagName))).map((theme=>({...theme,styles:[...getIncludedStyles(theme),...theme.styles],includePriority:getIncludePriority(theme.moduleId)}))).sort(((themeA,themeB)=>themeB.includePriority-themeA.includePriority));return themes.length>0?themes:getAllThemes().filter((theme=>theme.moduleId===defaultModuleName))}const ThemableMixin=superClass=>class VaadinThemableMixin extends(ThemePropertyMixin(superClass)){static finalize(){if(super.finalize(),this.elementStyles)return;const template=this.prototype._template;template&&!classHasThemes(this)&&function addStylesToTemplate(styles,template){const styleEl=document.createElement("style");styleEl.innerHTML=styles.map((style=>style.cssText)).join("\n"),template.content.appendChild(styleEl)}(this.getStylesForThis(),template)}static finalizeStyles(styles){const themeStyles=this.getStylesForThis();return styles?[...super.finalizeStyles(styles),...themeStyles]:themeStyles}static getStylesForThis(){const parent=Object.getPrototypeOf(this.prototype),inheritedThemes=(parent?parent.constructor.__themes:[])||[];this.__themes=[...inheritedThemes,...getThemes(this.is)];const themeStyles=this.__themes.flatMap((theme=>theme.styles));return themeStyles.filter(((style,index)=>index===themeStyles.lastIndexOf(style)))}}},"./node_modules/@vaadin/accordion/node_modules/lit/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BO:()=>n,AH:()=>i});const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:reactive_element_r,getOwnPropertyNames:h,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!reactive_element_i(t,s),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&reactive_element_e(this.prototype,t,r)}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=reactive_element_r(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...h(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s))}else void 0!==s&&i.push(c(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f)(this[t],s))return;this.P(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i)}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d("elementProperties")]=new Map,b[d("finalized")]=new Map,p?.({ReactiveElement:b}),(a.reactiveElementVersions??=[]).push("2.0.4");const lit_html_t=globalThis,lit_html_i=lit_html_t.trustedTypes,lit_html_s=lit_html_i?lit_html_i.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_h=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_o="?"+lit_html_h,lit_html_n=`<${lit_html_o}>`,lit_html_r=document,lit_html_l=()=>lit_html_r.createComment(""),lit_html_c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_a=Array.isArray,lit_html_u=t=>lit_html_a(t)||"function"==typeof t?.[Symbol.iterator],lit_html_f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),lit_html_p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,lit_html_y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),w=(lit_html_y(1),lit_html_y(2),Symbol.for("lit-noChange")),T=Symbol.for("lit-nothing"),A=new WeakMap,E=lit_html_r.createTreeWalker(lit_html_r,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_s?lit_html_s.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=lit_html_f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===lit_html_f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??lit_html_f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:lit_html_p):c===g||c===lit_html_p?c=m:c===v||c===_?c=lit_html_f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===lit_html_f?s+lit_html_n:d>=0?(o.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+lit_html_h+x):s+lit_html_h+(-2===d?i:x)}return[C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith("$lit$")){const i=v[a++],s=r.getAttribute(t).split(lit_html_h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t)}else t.startsWith(lit_html_h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(lit_html_h),s=t.length-1;if(s>0){r.textContent=lit_html_i?lit_html_i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],lit_html_l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],lit_html_l())}}}else if(8===r.nodeType)if(r.data===lit_html_o)d.push({type:2,index:c});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_h,t+1));)d.push({type:7,index:c}),t+=lit_html_h.length-1}c++}}static createElement(t,i){const s=lit_html_r.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class lit_html_S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_r).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n]}o!==l?.index&&(h=E.nextNode(),o++)}return E.currentNode=lit_html_r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),lit_html_c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_u(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==T&&lit_html_c(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_r.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new lit_html_S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){lit_html_a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(lit_html_l()),this.S(lit_html_l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!lit_html_c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!lit_html_c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class k extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class H extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const Z=lit_html_t.litHtmlPolyfillSupport;Z?.(V,M),(lit_html_t.litHtmlVersions??=[]).push("3.1.3");class lit_element_s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(lit_html_l(),t),t,void 0,s??{})}return h._$AI(t),h})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}lit_element_s._$litElement$=!0,lit_element_s.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:lit_element_s});const lit_element_r=globalThis.litElementPolyfillSupport;lit_element_r?.({LitElement:lit_element_s});(globalThis.litElementVersions??=[]).push("4.0.5")},"./node_modules/@vaadin/accordion/src/vaadin-accordion-heading.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var polymer_element=__webpack_require__("./node_modules/@polymer/polymer/polymer-element.js"),src_async=__webpack_require__("./node_modules/@vaadin/component-base/src/async.js");const passiveTouchGestures=!1,wrap=node=>node,HAS_NATIVE_TA="string"==typeof document.head.style.touchAction,GESTURE_KEY="__polymerGestures",HANDLED_OBJ="__polymerGesturesHandled",TOUCH_ACTION="__polymerGesturesTouchAction",MOUSE_EVENTS=["mousedown","mousemove","mouseup","click"],MOUSE_WHICH_TO_BUTTONS=[0,1,4,2],MOUSE_HAS_BUTTONS=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function isMouseEvent(name){return MOUSE_EVENTS.indexOf(name)>-1}let supportsPassive=!1;function PASSIVE_TOUCH(eventName){if(!isMouseEvent(eventName)&&"touchend"!==eventName)return HAS_NATIVE_TA&&supportsPassive&&passiveTouchGestures?{passive:!0}:void 0}!function(){try{const opts=Object.defineProperty({},"passive",{get(){supportsPassive=!0}});window.addEventListener("test",null,opts),window.removeEventListener("test",null,opts)}catch(e){}}();const IS_TOUCH_ONLY=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),canBeDisabled={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function hasLeftMouseButton(ev){const type=ev.type;if(!isMouseEvent(type))return!1;if("mousemove"===type){let buttons=void 0===ev.buttons?1:ev.buttons;return ev instanceof window.MouseEvent&&!MOUSE_HAS_BUTTONS&&(buttons=MOUSE_WHICH_TO_BUTTONS[ev.which]||0),Boolean(1&buttons)}return 0===(void 0===ev.button?0:ev.button)}const POINTERSTATE={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function trackDocument(stateObj,movefn,upfn){stateObj.movefn=movefn,stateObj.upfn=upfn,document.addEventListener("mousemove",movefn),document.addEventListener("mouseup",upfn)}function untrackDocument(stateObj){document.removeEventListener("mousemove",stateObj.movefn),document.removeEventListener("mouseup",stateObj.upfn),stateObj.movefn=null,stateObj.upfn=null}const getComposedPath=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:event=>event.composedPath&&event.composedPath()||[],gestures={},recognizers=[];function _findOriginalTarget(ev){const path=getComposedPath(ev);return path.length>0?path[0]:ev.target}function _handleNative(ev){const type=ev.type,gobj=ev.currentTarget[GESTURE_KEY];if(!gobj)return;const gs=gobj[type];if(!gs)return;if(!ev[HANDLED_OBJ]&&(ev[HANDLED_OBJ]={},type.startsWith("touch"))){const t=ev.changedTouches[0];if("touchstart"===type&&1===ev.touches.length&&(POINTERSTATE.touch.id=t.identifier),POINTERSTATE.touch.id!==t.identifier)return;HAS_NATIVE_TA||"touchstart"!==type&&"touchmove"!==type||function _handleTouchAction(ev){const t=ev.changedTouches[0],type=ev.type;if("touchstart"===type)POINTERSTATE.touch.x=t.clientX,POINTERSTATE.touch.y=t.clientY,POINTERSTATE.touch.scrollDecided=!1;else if("touchmove"===type){if(POINTERSTATE.touch.scrollDecided)return;POINTERSTATE.touch.scrollDecided=!0;const ta=function firstTouchAction(ev){let ta="auto";const path=getComposedPath(ev);for(let n,i=0;i<path.length;i++)if(n=path[i],n[TOUCH_ACTION]){ta=n[TOUCH_ACTION];break}return ta}(ev);let shouldPrevent=!1;const dx=Math.abs(POINTERSTATE.touch.x-t.clientX),dy=Math.abs(POINTERSTATE.touch.y-t.clientY);ev.cancelable&&("none"===ta?shouldPrevent=!0:"pan-x"===ta?shouldPrevent=dy>dx:"pan-y"===ta&&(shouldPrevent=dx>dy)),shouldPrevent?ev.preventDefault():prevent("track")}}(ev)}const handled=ev[HANDLED_OBJ];if(!handled.skip){for(let r,i=0;i<recognizers.length;i++)r=recognizers[i],gs[r.name]&&!handled[r.name]&&r.flow&&r.flow.start.indexOf(ev.type)>-1&&r.reset&&r.reset();for(let r,i=0;i<recognizers.length;i++)r=recognizers[i],gs[r.name]&&!handled[r.name]&&(handled[r.name]=!0,r[type](ev))}}function addListener(node,evType,handler){return!!gestures[evType]&&(function _add(node,evType,handler){const recognizer=gestures[evType],deps=recognizer.deps,name=recognizer.name;let gobj=node[GESTURE_KEY];gobj||(node[GESTURE_KEY]=gobj={});for(let dep,gd,i=0;i<deps.length;i++)dep=deps[i],IS_TOUCH_ONLY&&isMouseEvent(dep)&&"click"!==dep||(gd=gobj[dep],gd||(gobj[dep]=gd={_count:0}),0===gd._count&&node.addEventListener(dep,_handleNative,PASSIVE_TOUCH(dep)),gd[name]=(gd[name]||0)+1,gd._count=(gd._count||0)+1);node.addEventListener(evType,handler),recognizer.touchAction&&function setTouchAction(node,value){HAS_NATIVE_TA&&node instanceof HTMLElement&&src_async._3.run((()=>{node.style.touchAction=value}));node[TOUCH_ACTION]=value}(node,recognizer.touchAction)}(node,evType,handler),!0)}function register(recog){recognizers.push(recog),recog.emits.forEach((emit=>{gestures[emit]=recog}))}function _fire(target,type,detail){const ev=new Event(type,{bubbles:!0,cancelable:!0,composed:!0});if(ev.detail=detail,wrap(target).dispatchEvent(ev),ev.defaultPrevented){const preventer=detail.preventer||detail.sourceEvent;preventer&&preventer.preventDefault&&preventer.preventDefault()}}function prevent(evName){const recognizer=function _findRecognizerByEvent(evName){for(let r,i=0;i<recognizers.length;i++){r=recognizers[i];for(let n,j=0;j<r.emits.length;j++)if(n=r.emits[j],n===evName)return r}return null}(evName);recognizer.info&&(recognizer.info.prevent=!0)}function downupFire(type,target,event,preventer){target&&_fire(target,type,{x:event.clientX,y:event.clientY,sourceEvent:event,preventer,prevent:e=>prevent(e)})}function trackHasMovedEnough(info,x,y){if(info.prevent)return!1;if(info.started)return!0;const dx=Math.abs(info.x-x),dy=Math.abs(info.y-y);return dx>=5||dy>=5}function trackFire(info,target,touch){if(!target)return;const secondlast=info.moves[info.moves.length-2],lastmove=info.moves[info.moves.length-1],dx=lastmove.x-info.x,dy=lastmove.y-info.y;let ddx,ddy=0;secondlast&&(ddx=lastmove.x-secondlast.x,ddy=lastmove.y-secondlast.y),_fire(target,"track",{state:info.state,x:touch.clientX,y:touch.clientY,dx,dy,ddx,ddy,sourceEvent:touch,hover:()=>function deepTargetFind(x,y){let node=document.elementFromPoint(x,y),next=node;for(;next&&next.shadowRoot&&!window.ShadyDOM;){const oldNext=next;if(next=next.shadowRoot.elementFromPoint(x,y),oldNext===next)break;next&&(node=next)}return node}(touch.clientX,touch.clientY)})}function trackForward(info,e,preventer){const dx=Math.abs(e.clientX-info.x),dy=Math.abs(e.clientY-info.y),t=_findOriginalTarget(preventer||e);!t||canBeDisabled[t.localName]&&t.hasAttribute("disabled")||(isNaN(dx)||isNaN(dy)||dx<=25&&dy<=25||function isSyntheticClick(ev){if("click"===ev.type){if(0===ev.detail)return!0;const t=_findOriginalTarget(ev);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;const bcr=t.getBoundingClientRect(),x=ev.pageX,y=ev.pageY;return!(x>=bcr.left&&x<=bcr.right&&y>=bcr.top&&y<=bcr.bottom)}return!1}(e))&&(info.prevent||_fire(t,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer}))}register({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){untrackDocument(this.info)},mousedown(e){if(!hasLeftMouseButton(e))return;const t=_findOriginalTarget(e),self=this;trackDocument(this.info,(e=>{hasLeftMouseButton(e)||(downupFire("up",t,e),untrackDocument(self.info))}),(e=>{hasLeftMouseButton(e)&&downupFire("up",t,e),untrackDocument(self.info)})),downupFire("down",t,e)},touchstart(e){downupFire("down",_findOriginalTarget(e),e.changedTouches[0],e)},touchend(e){downupFire("up",_findOriginalTarget(e),e.changedTouches[0],e)}}),register({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(move){this.moves.length>2&&this.moves.shift(),this.moves.push(move)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,untrackDocument(this.info)},mousedown(e){if(!hasLeftMouseButton(e))return;const t=_findOriginalTarget(e),self=this,movefn=e=>{const x=e.clientX,y=e.clientY;trackHasMovedEnough(self.info,x,y)&&(self.info.state=self.info.started?"mouseup"===e.type?"end":"track":"start","start"===self.info.state&&prevent("tap"),self.info.addMove({x,y}),hasLeftMouseButton(e)||(self.info.state="end",untrackDocument(self.info)),t&&trackFire(self.info,t,e),self.info.started=!0)};trackDocument(this.info,movefn,(e=>{self.info.started&&movefn(e),untrackDocument(self.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart(e){const ct=e.changedTouches[0];this.info.x=ct.clientX,this.info.y=ct.clientY},touchmove(e){const t=_findOriginalTarget(e),ct=e.changedTouches[0],x=ct.clientX,y=ct.clientY;trackHasMovedEnough(this.info,x,y)&&("start"===this.info.state&&prevent("tap"),this.info.addMove({x,y}),trackFire(this.info,t,ct),this.info.state="track",this.info.started=!0)},touchend(e){const t=_findOriginalTarget(e),ct=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:ct.clientX,y:ct.clientY}),trackFire(this.info,t,ct))}}),register({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(e){hasLeftMouseButton(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click(e){hasLeftMouseButton(e)&&trackForward(this.info,e)},touchstart(e){const touch=e.changedTouches[0];this.info.x=touch.clientX,this.info.y=touch.clientY},touchend(e){trackForward(this.info,e.changedTouches[0],e)}});var disabled_mixin=__webpack_require__("./node_modules/@vaadin/a11y-base/src/disabled-mixin.js"),keyboard_mixin=__webpack_require__("./node_modules/@vaadin/a11y-base/src/keyboard-mixin.js");const ActiveMixin=superclass=>class ActiveMixinClass extends((0,disabled_mixin.i)((0,keyboard_mixin.f)(superclass))){get _activeKeys(){return[" "]}ready(){super.ready(),addListener(this,"down",(event=>{this._shouldSetActive(event)&&this._setActive(!0)})),addListener(this,"up",(()=>{this._setActive(!1)}))}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(_event){return!this.disabled}_onKeyDown(event){super._onKeyDown(event),this._shouldSetActive(event)&&this._activeKeys.includes(event.key)&&(this._setActive(!0),document.addEventListener("keyup",(e=>{this._activeKeys.includes(e.key)&&this._setActive(!1)}),{once:!0}))}_setActive(active){this.toggleAttribute("active",active)}};var src_define=__webpack_require__("./node_modules/@vaadin/component-base/src/define.js"),dir_mixin=__webpack_require__("./node_modules/@vaadin/component-base/src/dir-mixin.js"),vaadin_themable_mixin=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js");const accordionHeading=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/lit/index.js").AH`
  :host {
    display: block;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  :host([hidden]) {
    display: none !important;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: inherit;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: initial;
    color: inherit;
    border: initial;
    outline: none;
    font: inherit;
    text-align: inherit;
  }
`;(0,vaadin_themable_mixin.SF)("vaadin-accordion-heading",accordionHeading,{moduleId:"vaadin-accordion-heading-styles"});class AccordionHeading extends(ActiveMixin((0,dir_mixin.v)((0,vaadin_themable_mixin.cp)(polymer_element.Pu)))){static get is(){return"vaadin-accordion-heading"}static get template(){return polymer_element.qy`
      <button id="button" part="content" disabled$="[[disabled]]" aria-expanded$="[[__updateAriaExpanded(opened)]]">
        <span part="toggle" aria-hidden="true"></span>
        <slot></slot>
      </button>
    `}static get properties(){return{opened:{type:Boolean,reflectToAttribute:!0}}}_attachDom(dom){const root=this.attachShadow({mode:"open",delegatesFocus:!0});return root.appendChild(dom),root}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","heading")}__updateAriaExpanded(opened){return opened?"true":"false"}}(0,src_define.X)(AccordionHeading)},"./node_modules/@vaadin/accordion/src/vaadin-accordion-panel.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>AccordionPanel});__webpack_require__("./node_modules/@vaadin/accordion/src/vaadin-accordion-heading.js");var polymer_element=__webpack_require__("./node_modules/@polymer/polymer/polymer-element.js"),mixin=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/mixin.js"),focus_utils=__webpack_require__("./node_modules/@vaadin/a11y-base/src/focus-utils.js");const FocusMixin=(0,mixin.y)((superclass=>class FocusMixinClass extends superclass{get _keyboardActive(){return(0,focus_utils.aJ)()}ready(){this.addEventListener("focusin",(e=>{this._shouldSetFocus(e)&&this._setFocused(!0)})),this.addEventListener("focusout",(e=>{this._shouldRemoveFocus(e)&&this._setFocused(!1)})),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}_setFocused(focused){this.toggleAttribute("focused",focused),this.toggleAttribute("focus-ring",focused&&this._keyboardActive)}_shouldSetFocus(_event){return!0}_shouldRemoveFocus(_event){return!0}}));var disabled_mixin=__webpack_require__("./node_modules/@vaadin/a11y-base/src/disabled-mixin.js");const TabindexMixin=superclass=>class TabindexMixinClass extends((0,disabled_mixin.i)(superclass)){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged"},_lastTabIndex:{type:Number}}}_disabledChanged(disabled,oldDisabled){super._disabledChanged(disabled,oldDisabled),disabled?(void 0!==this.tabindex&&(this._lastTabIndex=this.tabindex),this.tabindex=-1):oldDisabled&&(this.tabindex=this._lastTabIndex)}_tabindexChanged(tabindex){this.disabled&&-1!==tabindex&&(this._lastTabIndex=tabindex,this.tabindex=-1)}},DelegateFocusMixin=(0,mixin.y)((superclass=>class DelegateFocusMixinClass extends(FocusMixin(TabindexMixin(superclass))){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged"},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame((()=>{this.focus(),this.setAttribute("focus-ring","")}))}focus(){this.focusElement&&!this.disabled&&this.focusElement.focus()}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(element,oldElement){element?(element.disabled=this.disabled,this._addFocusListeners(element),this.__forwardTabIndex(this.tabindex)):oldElement&&this._removeFocusListeners(oldElement)}_addFocusListeners(element){element.addEventListener("blur",this._boundOnBlur),element.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(element){element.removeEventListener("blur",this._boundOnBlur),element.removeEventListener("focus",this._boundOnFocus)}_onFocus(event){event.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(event){event.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(event){return event.target===this.focusElement}_shouldRemoveFocus(event){return event.target===this.focusElement}_disabledChanged(disabled,oldDisabled){super._disabledChanged(disabled,oldDisabled),this.focusElement&&(this.focusElement.disabled=disabled),disabled&&this.blur()}_tabindexChanged(tabindex){this.__forwardTabIndex(tabindex)}__forwardTabIndex(tabindex){void 0!==tabindex&&this.focusElement&&(this.focusElement.tabIndex=tabindex,-1!==tabindex&&(this.tabindex=void 0)),this.disabled&&tabindex&&(-1!==tabindex&&(this._lastTabIndex=tabindex),this.tabindex=void 0)}})),ControllerMixin=(0,mixin.y)((superClass=>"function"==typeof superClass.prototype.addController?superClass:class ControllerMixinClass extends superClass{constructor(){super(),this.__controllers=new Set}connectedCallback(){super.connectedCallback(),this.__controllers.forEach((c=>{c.hostConnected&&c.hostConnected()}))}disconnectedCallback(){super.disconnectedCallback(),this.__controllers.forEach((c=>{c.hostDisconnected&&c.hostDisconnected()}))}addController(controller){this.__controllers.add(controller),void 0!==this.$&&this.isConnected&&controller.hostConnected&&controller.hostConnected()}removeController(controller){this.__controllers.delete(controller)}}));var src_define=__webpack_require__("./node_modules/@vaadin/component-base/src/define.js");const DelegateStateMixin=(0,mixin.y)((superclass=>class DelegateStateMixinClass extends superclass{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(target){target&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach((name=>{this._delegateAttribute(name,this[name])}))}_ensurePropsDelegated(){this.constructor.delegateProps.forEach((name=>{this._delegateProperty(name,this[name])}))}_delegateAttrsChanged(...values){this.constructor.delegateAttrs.forEach(((name,index)=>{this._delegateAttribute(name,values[index])}))}_delegatePropsChanged(...values){this.constructor.delegateProps.forEach(((name,index)=>{this._delegateProperty(name,values[index])}))}_delegateAttribute(name,value){this.stateTarget&&("invalid"===name&&this._delegateAttribute("aria-invalid",!!value&&"true"),"boolean"==typeof value?this.stateTarget.toggleAttribute(name,value):value?this.stateTarget.setAttribute(name,value):this.stateTarget.removeAttribute(name))}_delegateProperty(name,value){this.stateTarget&&(this.stateTarget[name]=value)}}));var slot_observer=__webpack_require__("./node_modules/@vaadin/component-base/src/slot-observer.js");let uniqueId=0;class SlotController extends EventTarget{static generateId(host,slotName){return`${slotName||"default"}-${host.localName}-${function generateUniqueId(){return uniqueId++}()}`}constructor(host,slotName,tagName,config={}){super();const{initializer,multiple,observe,useUniqueId}=config;this.host=host,this.slotName=slotName,this.tagName=tagName,this.observe="boolean"!=typeof observe||observe,this.multiple="boolean"==typeof multiple&&multiple,this.slotInitializer=initializer,multiple&&(this.nodes=[]),useUniqueId&&(this.defaultId=this.constructor.generateId(host,slotName))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let node=this.getSlotChild();node?(this.node=node,this.initAddedNode(node)):(node=this.attachDefaultNode(),this.initNode(node))}initMultiple(){const children=this.getSlotChildren();if(0===children.length){const defaultNode=this.attachDefaultNode();defaultNode&&(this.nodes=[defaultNode],this.initNode(defaultNode))}else this.nodes=children,children.forEach((node=>{this.initAddedNode(node)}))}attachDefaultNode(){const{host,slotName,tagName}=this;let node=this.defaultNode;return!node&&tagName&&(node=document.createElement(tagName),node instanceof Element&&(""!==slotName&&node.setAttribute("slot",slotName),this.node=node,this.defaultNode=node)),node&&host.appendChild(node),node}getSlotChildren(){const{slotName}=this;return Array.from(this.host.childNodes).filter((node=>node.nodeType===Node.ELEMENT_NODE&&node.slot===slotName||node.nodeType===Node.TEXT_NODE&&node.textContent.trim()&&""===slotName))}getSlotChild(){return this.getSlotChildren()[0]}initNode(node){const{slotInitializer}=this;slotInitializer&&slotInitializer(node,this.host)}initCustomNode(_node){}teardownNode(_node){}initAddedNode(node){node!==this.defaultNode&&(this.initCustomNode(node),this.initNode(node))}observeSlot(){const{slotName}=this,selector=""===slotName?"slot:not([name])":`slot[name=${slotName}]`,slot=this.host.shadowRoot.querySelector(selector);this.__slotObserver=new slot_observer.P(slot,(({addedNodes,removedNodes})=>{const current=this.multiple?this.nodes:[this.node],newNodes=addedNodes.filter((node=>!function isEmptyTextNode(node){return node.nodeType===Node.TEXT_NODE&&""===node.textContent.trim()}(node)&&!current.includes(node)));removedNodes.length&&(this.nodes=current.filter((node=>!removedNodes.includes(node))),removedNodes.forEach((node=>{this.teardownNode(node)}))),newNodes&&newNodes.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...current,...newNodes].filter((node=>node!==this.defaultNode)),newNodes.forEach((node=>{this.initAddedNode(node)}))):(this.node&&this.node.remove(),this.node=newNodes[0],this.initAddedNode(this.node)))}))}}class TooltipController extends SlotController{constructor(host){super(host,"tooltip"),this.setTarget(host)}initCustomNode(tooltipNode){tooltipNode.target=this.target,void 0!==this.ariaTarget&&(tooltipNode.ariaTarget=this.ariaTarget),void 0!==this.context&&(tooltipNode.context=this.context),void 0!==this.manual&&(tooltipNode.manual=this.manual),void 0!==this.opened&&(tooltipNode.opened=this.opened),void 0!==this.position&&(tooltipNode._position=this.position),void 0!==this.shouldShow&&(tooltipNode.shouldShow=this.shouldShow),this.__notifyChange()}teardownNode(){this.__notifyChange()}setAriaTarget(ariaTarget){this.ariaTarget=ariaTarget;const tooltipNode=this.node;tooltipNode&&(tooltipNode.ariaTarget=ariaTarget)}setContext(context){this.context=context;const tooltipNode=this.node;tooltipNode&&(tooltipNode.context=context)}setManual(manual){this.manual=manual;const tooltipNode=this.node;tooltipNode&&(tooltipNode.manual=manual)}setOpened(opened){this.opened=opened;const tooltipNode=this.node;tooltipNode&&(tooltipNode.opened=opened)}setPosition(position){this.position=position;const tooltipNode=this.node;tooltipNode&&(tooltipNode._position=position)}setShouldShow(shouldShow){this.shouldShow=shouldShow;const tooltipNode=this.node;tooltipNode&&(tooltipNode.shouldShow=shouldShow)}setTarget(target){this.target=target;const tooltipNode=this.node;tooltipNode&&(tooltipNode.target=target)}__notifyChange(){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:this.node}}))}}class SlotChildObserveController extends SlotController{constructor(host,slot,tagName,config={}){super(host,slot,tagName,{...config,useUniqueId:!0})}initCustomNode(node){this.__updateNodeId(node),this.__notifyChange(node)}teardownNode(_node){const node=this.getSlotChild();node&&node!==this.defaultNode?this.__notifyChange(node):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){const node=super.attachDefaultNode();return node&&this.__updateNodeId(node),node}restoreDefaultNode(){}updateDefaultNode(node){this.__notifyChange(node)}observeNode(node){this.__nodeObserver&&this.__nodeObserver.disconnect(),this.__nodeObserver=new MutationObserver((mutations=>{mutations.forEach((mutation=>{const target=mutation.target,isCurrentNodeMutation=target===this.node;"attributes"===mutation.type?isCurrentNodeMutation&&this.__updateNodeId(target):(isCurrentNodeMutation||target.parentElement===this.node)&&this.__notifyChange(this.node)}))})),this.__nodeObserver.observe(node,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}__hasContent(node){return!!node&&(node.nodeType===Node.ELEMENT_NODE&&(customElements.get(node.localName)||node.children.length>0)||node.textContent&&""!==node.textContent.trim())}__notifyChange(node){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:this.__hasContent(node),node}}))}__updateNodeId(node){const isFirstNode=!this.nodes||node===this.nodes[0];node.nodeType!==Node.ELEMENT_NODE||this.multiple&&!isFirstNode||node.id||(node.id=this.defaultId)}}class ContentController extends SlotChildObserveController{static generateId(host){return super.generateId(host,"content")}constructor(host){super(host,"",null,{multiple:!0})}}const CollapsibleMixin=superClass=>class CollapsibleMixinClass extends superClass{static get properties(){return{opened:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0},_contentElements:{type:Array}}}static get observers(){return["_openedOrContentChanged(opened, _contentElements)"]}constructor(){super(),this._contentController=new ContentController(this),this._contentController.addEventListener("slot-content-changed",(event=>{const content=event.target.nodes||[];this._contentElements=content.filter((node=>node.parentNode===this))}))}ready(){super.ready(),this.addController(this._contentController),this.addEventListener("click",(({target})=>{if(this.disabled)return;if("a"===target.localName)return;const summary=this.focusElement;summary&&(target===summary||summary.contains(target))&&(this.opened=!this.opened)}))}_openedOrContentChanged(opened,elements){elements&&elements.forEach((el=>{el.setAttribute("aria-hidden",opened?"false":"true")}))}};class SummaryController extends SlotChildObserveController{constructor(host,tagName){super(host,"summary",tagName)}setSummary(summary){this.summary=summary;this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{summary}=this;summary&&""!==summary.trim()&&this.attachDefaultNode()}updateDefaultNode(node){node&&(node.textContent=this.summary),super.updateDefaultNode(node)}}var vaadin_themable_mixin=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js");const accordionPanel=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/lit/index.js").AH`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='content'] {
    display: none;
    overflow: hidden;
  }

  :host([opened]) [part='content'] {
    display: block;
    overflow: visible;
  }
`;(0,vaadin_themable_mixin.SF)("vaadin-accordion-panel",accordionPanel,{moduleId:"vaadin-accordion-panel-styles"});class AccordionPanel extends(CollapsibleMixin(DelegateFocusMixin(DelegateStateMixin((0,vaadin_themable_mixin.cp)(ControllerMixin(polymer_element.Pu)))))){static get is(){return"vaadin-accordion-panel"}static get template(){return polymer_element.qy`
      <slot name="summary"></slot>

      <div part="content">
        <slot></slot>
      </div>

      <slot name="tooltip"></slot>
    `}static get properties(){return{summary:{type:String,observer:"_summaryChanged"}}}static get observers(){return["__updateAriaAttributes(focusElement, _contentElements)"]}static get delegateAttrs(){return["theme"]}static get delegateProps(){return["disabled","opened"]}constructor(){super(),this._summaryController=new SummaryController(this,"vaadin-accordion-heading"),this._summaryController.addEventListener("slot-content-changed",(event=>{const{node}=event.target;this._setFocusElement(node),this.stateTarget=node,this._tooltipController.setTarget(node)})),this._tooltipController=new TooltipController(this),this._tooltipController.setPosition("bottom-start")}ready(){super.ready(),this.addController(this._summaryController),this.addController(this._tooltipController)}_setAriaDisabled(){}_summaryChanged(summary){this._summaryController.setSummary(summary)}__updateAriaAttributes(focusElement,contentElements){if(focusElement&&contentElements){const node=contentElements[0];node&&(node.setAttribute("role","region"),node.setAttribute("aria-labelledby",focusElement.id)),node&&node.id?focusElement.setAttribute("aria-controls",node.id):focusElement.removeAttribute("aria-controls")}}}(0,src_define.X)(AccordionPanel)},"./node_modules/@vaadin/accordion/theme/lumo/vaadin-accordion-panel.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var src_define=__webpack_require__("./node_modules/@vaadin/component-base/src/define.js");class Lumo extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}(0,src_define.X)(Lumo);const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:reactive_element_r,getOwnPropertyNames:h,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!reactive_element_i(t,s),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&reactive_element_e(this.prototype,t,r)}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=reactive_element_r(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...h(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s))}else void 0!==s&&i.push(c(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f)(this[t],s))return;this.P(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i)}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d("elementProperties")]=new Map,b[d("finalized")]=new Map,p?.({ReactiveElement:b}),(a.reactiveElementVersions??=[]).push("2.0.4");const lit_html_t=globalThis,lit_html_i=lit_html_t.trustedTypes,lit_html_s=lit_html_i?lit_html_i.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_h=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_o="?"+lit_html_h,lit_html_n=`<${lit_html_o}>`,lit_html_r=document,lit_html_l=()=>lit_html_r.createComment(""),lit_html_c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_a=Array.isArray,lit_html_u=t=>lit_html_a(t)||"function"==typeof t?.[Symbol.iterator],lit_html_f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),lit_html_p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,lit_html_y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),w=(lit_html_y(1),lit_html_y(2),Symbol.for("lit-noChange")),T=Symbol.for("lit-nothing"),A=new WeakMap,E=lit_html_r.createTreeWalker(lit_html_r,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_s?lit_html_s.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=lit_html_f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===lit_html_f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??lit_html_f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:lit_html_p):c===g||c===lit_html_p?c=m:c===v||c===_?c=lit_html_f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===lit_html_f?s+lit_html_n:d>=0?(o.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+lit_html_h+x):s+lit_html_h+(-2===d?i:x)}return[C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith("$lit$")){const i=v[a++],s=r.getAttribute(t).split(lit_html_h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t)}else t.startsWith(lit_html_h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(lit_html_h),s=t.length-1;if(s>0){r.textContent=lit_html_i?lit_html_i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],lit_html_l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],lit_html_l())}}}else if(8===r.nodeType)if(r.data===lit_html_o)d.push({type:2,index:c});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_h,t+1));)d.push({type:7,index:c}),t+=lit_html_h.length-1}c++}}static createElement(t,i){const s=lit_html_r.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class lit_html_S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_r).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n]}o!==l?.index&&(h=E.nextNode(),o++)}return E.currentNode=lit_html_r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),lit_html_c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_u(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==T&&lit_html_c(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_r.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new lit_html_S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){lit_html_a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(lit_html_l()),this.S(lit_html_l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!lit_html_c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!lit_html_c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class k extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class H extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const Z=lit_html_t.litHtmlPolyfillSupport;Z?.(V,M),(lit_html_t.litHtmlVersions??=[]).push("3.1.3");class lit_element_s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(lit_html_l(),t),t,void 0,s??{})}return h._$AI(t),h})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}lit_element_s._$litElement$=!0,lit_element_s.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:lit_element_s});const lit_element_r=globalThis.litElementPolyfillSupport;lit_element_r?.({LitElement:lit_element_s});(globalThis.litElementVersions??=[]).push("4.0.5");const themeRegistry=[];function classHasThemes(elementClass){return elementClass&&Object.prototype.hasOwnProperty.call(elementClass,"__themes")}function registerStyles(themeFor,styles,options={}){themeFor&&function hasThemes(tagName){return classHasThemes(customElements.get(tagName))}(themeFor)&&console.warn(`The custom element definition for "${themeFor}"\n      was finalized before a style module was registered.\n      Make sure to add component specific style modules before\n      importing the corresponding custom element.`),styles=function flattenStyles(styles=[]){return[styles].flat(1/0).filter((style=>style instanceof n||(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1)))}(styles),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(themeFor,styles,options):themeRegistry.push({themeFor,styles,include:options.include,moduleId:options.moduleId})}const addLumoGlobalStyles=(id,...styles)=>{((id,...styles)=>{const styleTag=document.createElement("style");styleTag.id=id,styleTag.textContent=styles.map((style=>style.toString())).join("\n").replace(":host","html"),document.head.insertAdjacentElement("afterbegin",styleTag)})(`lumo-${id}`,styles)};addLumoGlobalStyles("color-props",i`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`);registerStyles("",i`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`,{moduleId:"lumo-color"});addLumoGlobalStyles("font-icons",i`
  @font-face {
    font-family: 'lumo-icons';
    src: url(data:application/font-woff;charset=utf-8;base64,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)
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --lumo-icons-align-center: '\\ea01';
    --lumo-icons-align-left: '\\ea02';
    --lumo-icons-align-right: '\\ea03';
    --lumo-icons-angle-down: '\\ea04';
    --lumo-icons-angle-left: '\\ea05';
    --lumo-icons-angle-right: '\\ea06';
    --lumo-icons-angle-up: '\\ea07';
    --lumo-icons-arrow-down: '\\ea08';
    --lumo-icons-arrow-left: '\\ea09';
    --lumo-icons-arrow-right: '\\ea0a';
    --lumo-icons-arrow-up: '\\ea0b';
    --lumo-icons-bar-chart: '\\ea0c';
    --lumo-icons-bell: '\\ea0d';
    --lumo-icons-calendar: '\\ea0e';
    --lumo-icons-checkmark: '\\ea0f';
    --lumo-icons-chevron-down: '\\ea10';
    --lumo-icons-chevron-left: '\\ea11';
    --lumo-icons-chevron-right: '\\ea12';
    --lumo-icons-chevron-up: '\\ea13';
    --lumo-icons-clock: '\\ea14';
    --lumo-icons-cog: '\\ea15';
    --lumo-icons-cross: '\\ea16';
    --lumo-icons-download: '\\ea17';
    --lumo-icons-dropdown: '\\ea18';
    --lumo-icons-edit: '\\ea19';
    --lumo-icons-error: '\\ea1a';
    --lumo-icons-eye: '\\ea1b';
    --lumo-icons-eye-disabled: '\\ea1c';
    --lumo-icons-menu: '\\ea1d';
    --lumo-icons-minus: '\\ea1e';
    --lumo-icons-ordered-list: '\\ea1f';
    --lumo-icons-phone: '\\ea20';
    --lumo-icons-photo: '\\ea21';
    --lumo-icons-play: '\\ea22';
    --lumo-icons-plus: '\\ea23';
    --lumo-icons-redo: '\\ea24';
    --lumo-icons-reload: '\\ea25';
    --lumo-icons-search: '\\ea26';
    --lumo-icons-undo: '\\ea27';
    --lumo-icons-unordered-list: '\\ea28';
    --lumo-icons-upload: '\\ea29';
    --lumo-icons-user: '\\ea2a';
  }
`);addLumoGlobalStyles("sizing-props",i`
  :host {
    --lumo-size-xs: 1.625rem;
    --lumo-size-s: 1.875rem;
    --lumo-size-m: 2.25rem;
    --lumo-size-l: 2.75rem;
    --lumo-size-xl: 3.5rem;

    /* Icons */
    --lumo-icon-size-s: 1.25em;
    --lumo-icon-size-m: 1.5em;
    --lumo-icon-size-l: 2.25em;
    /* For backwards compatibility */
    --lumo-icon-size: var(--lumo-icon-size-m);
  }
`);addLumoGlobalStyles("spacing-props",i`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`);i`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 400;
  }
`;addLumoGlobalStyles("style-props",i`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`);const font=i`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`;registerStyles("",i`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`,{moduleId:"lumo-typography"}),addLumoGlobalStyles("typography-props",font);const detailsSummary=i`
  :host {
    display: flex;
    align-items: center;
    width: 100%;
    outline: none;
    padding: var(--lumo-space-s) 0;
    box-sizing: border-box;
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    font-weight: 500;
    line-height: var(--lumo-line-height-xs);
    color: var(--lumo-secondary-text-color);
    background-color: inherit;
    border-radius: var(--lumo-border-radius-m);
    cursor: var(--lumo-clickable-cursor);
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([disabled]),
  :host([disabled]) [part='toggle'] {
    color: var(--lumo-disabled-text-color);
    cursor: default;
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])),
    :host(:hover:not([disabled])) [part='toggle'] {
      color: var(--lumo-contrast-80pct);
    }
  }

  [part='toggle'] {
    display: block;
    width: 1em;
    height: 1em;
    margin-left: calc(var(--lumo-space-xs) * -1);
    margin-right: var(--lumo-space-xs);
    font-size: var(--lumo-icon-size-s);
    line-height: 1;
    color: var(--lumo-contrast-60pct);
    font-family: 'lumo-icons';
    cursor: var(--lumo-clickable-cursor);
  }

  [part='toggle']::before {
    content: var(--lumo-icons-angle-right);
  }

  :host([opened]) [part='toggle'] {
    transform: rotate(90deg);
  }

  /* RTL styles */
  :host([dir='rtl']) [part='toggle'] {
    margin-left: var(--lumo-space-xs);
    margin-right: calc(var(--lumo-space-xs) * -1);
  }

  :host([dir='rtl']) [part='toggle']::before {
    content: var(--lumo-icons-angle-left);
  }

  :host([opened][dir='rtl']) [part='toggle'] {
    transform: rotate(-90deg);
  }

  /* Small */
  :host([theme~='small']) {
    padding-top: var(--lumo-space-xs);
    padding-bottom: var(--lumo-space-xs);
  }

  :host([theme~='small']) [part='toggle'] {
    margin-right: calc(var(--lumo-space-xs) / 2);
  }

  :host([theme~='small'][dir='rtl']) [part='toggle'] {
    margin-left: calc(var(--lumo-space-xs) / 2);
  }

  /* Filled */
  :host([theme~='filled']) {
    padding: var(--lumo-space-s) calc(var(--lumo-space-s) + var(--lumo-space-xs) / 2);
  }

  /* Reverse */
  :host([theme~='reverse']) {
    justify-content: space-between;
  }

  :host([theme~='reverse']) [part='toggle'] {
    order: 1;
    margin-right: 0;
  }

  :host([theme~='reverse'][dir='rtl']) [part='toggle'] {
    margin-left: 0;
  }

  /* Filled reverse */
  :host([theme~='reverse'][theme~='filled']) {
    padding-left: var(--lumo-space-m);
  }

  :host([theme~='reverse'][theme~='filled'][dir='rtl']) {
    padding-right: var(--lumo-space-m);
  }
`;registerStyles("vaadin-details-summary",detailsSummary,{moduleId:"lumo-details-summary"});var vaadin_themable_mixin=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js");const accordionHeading=vaadin_themable_mixin.AH`
  :host {
    padding: 0;
  }

  [part='content'] {
    padding: var(--lumo-space-s) 0;
  }

  :host([theme~='filled']) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;(0,vaadin_themable_mixin.SF)("vaadin-accordion-heading",[detailsSummary,accordionHeading],{moduleId:"lumo-accordion-heading"});__webpack_require__("./node_modules/@vaadin/accordion/src/vaadin-accordion-heading.js");class version_Lumo extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}(0,src_define.X)(version_Lumo);const global_addLumoGlobalStyles=(id,...styles)=>{((id,...styles)=>{const styleTag=document.createElement("style");styleTag.id=id,styleTag.textContent=styles.map((style=>style.toString())).join("\n").replace(":host","html"),document.head.insertAdjacentElement("afterbegin",styleTag)})(`lumo-${id}`,styles)};global_addLumoGlobalStyles("color-props",vaadin_themable_mixin.AH`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`);const color_color=vaadin_themable_mixin.AH`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;(0,vaadin_themable_mixin.SF)("",color_color,{moduleId:"lumo-color"});global_addLumoGlobalStyles("spacing-props",vaadin_themable_mixin.AH`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`);const details=i`
  :host {
    margin: var(--lumo-space-xs) 0;
    outline: none;
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
  }

  :host([focus-ring]) ::slotted([slot='summary']) {
    box-shadow: 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }

  [part='content'] {
    padding: var(--lumo-space-xs) 0 var(--lumo-space-s);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
  }

  :host([theme~='filled']) {
    background-color: var(--lumo-contrast-5pct);
    border-radius: var(--lumo-border-radius-m);
  }

  :host([theme~='filled']) [part='content'] {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }

  :host([theme~='small']) [part$='content'] {
    font-size: var(--lumo-font-size-s);
  }
`;registerStyles("vaadin-details",details,{moduleId:"lumo-details"});const accordionPanel=vaadin_themable_mixin.AH`
  :host {
    margin: 0;
    border-bottom: solid 1px var(--lumo-contrast-10pct);
  }

  :host(:last-child) {
    border-bottom: none;
  }

  :host([theme~='filled']) {
    border-bottom: none;
  }

  :host([theme~='filled']:not(:last-child)) {
    margin-bottom: 2px;
  }
`;(0,vaadin_themable_mixin.SF)("vaadin-accordion-panel",[details,accordionPanel],{moduleId:"lumo-accordion-panel"});__webpack_require__("./node_modules/@vaadin/accordion/src/vaadin-accordion-panel.js")},"./node_modules/@vaadin/accordion/vaadin-accordion-panel.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@vaadin/accordion/theme/lumo/vaadin-accordion-panel.js"),__webpack_require__("./node_modules/@vaadin/accordion/src/vaadin-accordion-panel.js")},"./node_modules/@vaadin/accordion/vaadin-accordion.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@vaadin/accordion/theme/lumo/vaadin-accordion-panel.js");var polymer_element=__webpack_require__("./node_modules/@polymer/polymer/polymer-element.js"),focus_utils=__webpack_require__("./node_modules/@vaadin/a11y-base/src/focus-utils.js"),keyboard_mixin=__webpack_require__("./node_modules/@vaadin/a11y-base/src/keyboard-mixin.js");const KeyboardDirectionMixin=superclass=>class KeyboardDirectionMixinClass extends((0,keyboard_mixin.f)(superclass)){get focused(){return(this._getItems()||[]).find(focus_utils.Qj)}get _vertical(){return!0}focus(){const items=this._getItems();if(Array.isArray(items)){const idx=this._getAvailableIndex(items,0,null,(item=>!(0,focus_utils.n8)(item)));idx>=0&&this._focus(idx)}}_getItems(){return Array.from(this.children)}_onKeyDown(event){if(super._onKeyDown(event),event.metaKey||event.ctrlKey)return;const{key}=event,items=this._getItems()||[],currentIdx=items.indexOf(this.focused);let idx,increment;const dirIncrement=!this._vertical&&"rtl"===this.getAttribute("dir")?-1:1;this.__isPrevKey(key)?(increment=-dirIncrement,idx=currentIdx-dirIncrement):this.__isNextKey(key)?(increment=dirIncrement,idx=currentIdx+dirIncrement):"Home"===key?(increment=1,idx=0):"End"===key&&(increment=-1,idx=items.length-1),idx=this._getAvailableIndex(items,idx,increment,(item=>!(0,focus_utils.n8)(item))),idx>=0&&(event.preventDefault(),this._focus(idx,!0))}__isPrevKey(key){return this._vertical?"ArrowUp"===key:"ArrowLeft"===key}__isNextKey(key){return this._vertical?"ArrowDown"===key:"ArrowRight"===key}_focus(index,navigating=!1){const items=this._getItems();this._focusItem(items[index],navigating)}_focusItem(item){item&&(item.focus(),item.setAttribute("focus-ring",""))}_getAvailableIndex(items,index,increment,condition){const totalItems=items.length;let idx=index;for(let i=0;"number"==typeof idx&&i<totalItems;i+=1,idx+=increment||1){idx<0?idx=totalItems-1:idx>=totalItems&&(idx=0);const item=items[idx];if(!item.hasAttribute("disabled")&&this.__isMatchingItem(item,condition))return idx}return-1}__isMatchingItem(item,condition){return"function"!=typeof condition||condition(item)}};var src_define=__webpack_require__("./node_modules/@vaadin/component-base/src/define.js"),element_mixin=__webpack_require__("./node_modules/@vaadin/component-base/src/element-mixin.js"),slot_observer=__webpack_require__("./node_modules/@vaadin/component-base/src/slot-observer.js"),vaadin_themable_mixin=__webpack_require__("./node_modules/@vaadin/accordion/node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js"),src_vaadin_accordion_panel=__webpack_require__("./node_modules/@vaadin/accordion/src/vaadin-accordion-panel.js");class Accordion extends(KeyboardDirectionMixin((0,vaadin_themable_mixin.cp)((0,element_mixin.q)(polymer_element.Pu)))){static get template(){return polymer_element.qy`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <slot></slot>
    `}static get is(){return"vaadin-accordion"}static get properties(){return{opened:{type:Number,value:0,notify:!0,reflectToAttribute:!0},items:{type:Array,readOnly:!0,notify:!0}}}static get observers(){return["_updateItems(items, opened)"]}constructor(){super(),this._boundUpdateOpened=this._updateOpened.bind(this)}get focused(){return(this._getItems()||[]).find((item=>(0,focus_utils.Qj)(item.focusElement)))}focus(){this._observer&&this._observer.flush(),super.focus()}ready(){super.ready();const slot=this.shadowRoot.querySelector("slot");this._observer=new slot_observer.P(slot,(info=>{this._setItems(this._filterItems(Array.from(this.children))),this._filterItems(info.addedNodes).forEach((el=>{el.addEventListener("opened-changed",this._boundUpdateOpened)}))}))}_getItems(){return this.items}_filterItems(array){return array.filter((el=>el instanceof src_vaadin_accordion_panel.v))}_updateItems(items,opened){if(items){const itemToOpen=items[opened];items.forEach((item=>{item.opened=item===itemToOpen}))}}_onKeyDown(event){this.items.some((item=>item.focusElement===event.target))&&super._onKeyDown(event)}_updateOpened(e){const target=this._filterItems(e.composedPath())[0],idx=this.items.indexOf(target);if(e.detail.value){if(target.disabled||-1===idx)return;this.opened=idx}else this.items.some((item=>item.opened))||(this.opened=null)}}(0,src_define.X)(Accordion)},"./node_modules/@vaadin/component-base/src/async.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_3:()=>microTask,g8:()=>idlePeriod});let microtaskCurrHandle=0,microtaskLastHandle=0;const microtaskCallbacks=[];let microtaskScheduled=!1;const idlePeriod={run:fn=>window.requestIdleCallback?window.requestIdleCallback(fn):window.setTimeout(fn,16),cancel(handle){window.cancelIdleCallback?window.cancelIdleCallback(handle):window.clearTimeout(handle)}},microTask={run(callback){microtaskScheduled||(microtaskScheduled=!0,queueMicrotask((()=>function microtaskFlush(){microtaskScheduled=!1;const len=microtaskCallbacks.length;for(let i=0;i<len;i++){const cb=microtaskCallbacks[i];if(cb)try{cb()}catch(e){setTimeout((()=>{throw e}))}}microtaskCallbacks.splice(0,len),microtaskLastHandle+=len}()))),microtaskCallbacks.push(callback);const result=microtaskCurrHandle;return microtaskCurrHandle+=1,result},cancel(handle){const idx=handle-microtaskLastHandle;if(idx>=0){if(!microtaskCallbacks[idx])throw new Error(`invalid async handle: ${handle}`);microtaskCallbacks[idx]=null}}}},"./node_modules/@vaadin/component-base/src/define.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function defineCustomElement(CustomElement){const defined=customElements.get(CustomElement.is);if(defined){const definedVersion=defined.version;definedVersion&&CustomElement.version&&definedVersion===CustomElement.version&&console.warn(`The component ${CustomElement.is} has been loaded twice`)}else Object.defineProperty(CustomElement,"version",{get:()=>"24.3.13"}),customElements.define(CustomElement.is,CustomElement)}__webpack_require__.d(__webpack_exports__,{X:()=>defineCustomElement})},"./node_modules/@vaadin/component-base/src/dir-mixin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>DirMixin});const directionSubscribers=[];function alignDirs(element,documentDir,elementDir=element.getAttribute("dir")){documentDir?element.setAttribute("dir",documentDir):null!=elementDir&&element.removeAttribute("dir")}function getDocumentDir(){return document.documentElement.getAttribute("dir")}new MutationObserver((function directionUpdater(){const documentDir=getDocumentDir();directionSubscribers.forEach((element=>{alignDirs(element,documentDir)}))})).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});const DirMixin=superClass=>class VaadinDirMixin extends superClass{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:attr=>attr||"",toAttribute:prop=>""===prop?null:prop}}}}get __isRTL(){return"rtl"===this.getAttribute("dir")}connectedCallback(){super.connectedCallback(),this.hasAttribute("dir")&&!this.__restoreSubscription||(this.__subscribe(),alignDirs(this,getDocumentDir(),null))}attributeChangedCallback(name,oldValue,newValue){if(super.attributeChangedCallback(name,oldValue,newValue),"dir"!==name)return;const documentDir=getDocumentDir(),newValueEqlDocDir=newValue===documentDir&&-1===directionSubscribers.indexOf(this),newValueEmptied=!newValue&&oldValue&&-1===directionSubscribers.indexOf(this),newDiffValue=newValue!==documentDir&&oldValue===documentDir;newValueEqlDocDir||newValueEmptied?(this.__subscribe(),alignDirs(this,documentDir,newValue)):newDiffValue&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=directionSubscribers.includes(this),this.__unsubscribe()}_valueToNodeAttribute(node,value,attribute){("dir"!==attribute||""!==value||node.hasAttribute("dir"))&&super._valueToNodeAttribute(node,value,attribute)}_attributeToProperty(attribute,value,type){"dir"!==attribute||value?super._attributeToProperty(attribute,value,type):this.dir=""}__subscribe(){directionSubscribers.includes(this)||directionSubscribers.push(this)}__unsubscribe(){directionSubscribers.includes(this)&&directionSubscribers.splice(directionSubscribers.indexOf(this),1)}}},"./node_modules/@vaadin/component-base/src/element-mixin.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>ElementMixin});var settings=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/settings.js"),vaadin_usage_statistics=__webpack_require__("./node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics.js"),src_async=__webpack_require__("./node_modules/@vaadin/component-base/src/async.js");const debouncerQueue=new Set;class Debouncer{static debounce(debouncer,asyncModule,callback){return debouncer instanceof Debouncer?debouncer._cancelAsync():debouncer=new Debouncer,debouncer.setConfig(asyncModule,callback),debouncer}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(asyncModule,callback){this._asyncModule=asyncModule,this._callback=callback,this._timer=this._asyncModule.run((()=>{this._timer=null,debouncerQueue.delete(this),this._callback()}))}cancel(){this.isActive()&&(this._cancelAsync(),debouncerQueue.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}}var dir_mixin=__webpack_require__("./node_modules/@vaadin/component-base/src/dir-mixin.js");let statsJob;(0,settings.DH)(!1),window.Vaadin||(window.Vaadin={}),window.Vaadin.registrations||(window.Vaadin.registrations=[]),window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={}),window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){(0,vaadin_usage_statistics.r)()};const registered=new Set,ElementMixin=superClass=>class VaadinElementMixin extends((0,dir_mixin.v)(superClass)){static finalize(){super.finalize();const{is}=this;is&&!registered.has(is)&&(window.Vaadin.registrations.push(this),registered.add(is),window.Vaadin.developmentModeCallback&&(statsJob=Debouncer.debounce(statsJob,src_async.g8,(()=>{window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]()})),function enqueueDebouncer(debouncer){debouncerQueue.add(debouncer)}(statsJob)))}constructor(){super(),null===document.doctype&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.')}}},"./node_modules/@vaadin/component-base/src/slot-observer.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>SlotObserver});class SlotObserver{constructor(slot,callback){this.slot=slot,this.callback=callback,this._storedNodes=[],this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){this.slot.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.slot.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask((()=>{this.flush()})))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_processNodes(){const currentNodes=this.slot.assignedNodes({flatten:!0});let addedNodes=[];const removedNodes=[],movedNodes=[];currentNodes.length&&(addedNodes=currentNodes.filter((node=>!this._storedNodes.includes(node)))),this._storedNodes.length&&this._storedNodes.forEach(((node,index)=>{const idx=currentNodes.indexOf(node);-1===idx?removedNodes.push(node):idx!==index&&movedNodes.push(node)})),(addedNodes.length||removedNodes.length||movedNodes.length)&&this.callback({addedNodes,movedNodes,removedNodes}),this._storedNodes=currentNodes}}},"./node_modules/@vaadin/vertical-layout/vaadin-vertical-layout.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var src_define=__webpack_require__("./node_modules/@vaadin/component-base/src/define.js");class Lumo extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}(0,src_define.X)(Lumo);const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:reactive_element_r,getOwnPropertyNames:h,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!reactive_element_i(t,s),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&reactive_element_e(this.prototype,t,r)}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=reactive_element_r(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...h(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s))}else void 0!==s&&i.push(c(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f)(this[t],s))return;this.P(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i)}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d("elementProperties")]=new Map,b[d("finalized")]=new Map,p?.({ReactiveElement:b}),(a.reactiveElementVersions??=[]).push("2.0.4");const lit_html_t=globalThis,lit_html_i=lit_html_t.trustedTypes,lit_html_s=lit_html_i?lit_html_i.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_h=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_o="?"+lit_html_h,lit_html_n=`<${lit_html_o}>`,lit_html_r=document,lit_html_l=()=>lit_html_r.createComment(""),lit_html_c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_a=Array.isArray,lit_html_u=t=>lit_html_a(t)||"function"==typeof t?.[Symbol.iterator],lit_html_f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),lit_html_p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,lit_html_y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),w=(lit_html_y(1),lit_html_y(2),Symbol.for("lit-noChange")),T=Symbol.for("lit-nothing"),A=new WeakMap,E=lit_html_r.createTreeWalker(lit_html_r,129);function C(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_s?lit_html_s.createHTML(i):i}const P=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":"",c=lit_html_f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===lit_html_f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??lit_html_f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:lit_html_p):c===g||c===lit_html_p?c=m:c===v||c===_?c=lit_html_f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===lit_html_f?s+lit_html_n:d>=0?(o.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+lit_html_h+x):s+lit_html_h+(-2===d?i:x)}return[C(t,l+(t[s]||"<?>")+(2===i?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=P(t,s);if(this.el=V.createElement(f,n),E.currentNode=this.el.content,2===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=E.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith("$lit$")){const i=v[a++],s=r.getAttribute(t).split(lit_html_h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?k:"?"===e[1]?H:"@"===e[1]?I:R}),r.removeAttribute(t)}else t.startsWith(lit_html_h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(lit_html_h),s=t.length-1;if(s>0){r.textContent=lit_html_i?lit_html_i.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],lit_html_l()),E.nextNode(),d.push({type:2,index:++c});r.append(t[s],lit_html_l())}}}else if(8===r.nodeType)if(r.data===lit_html_o)d.push({type:2,index:c});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_h,t+1));)d.push({type:7,index:c}),t+=lit_html_h.length-1}c++}}static createElement(t,i){const s=lit_html_r.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){if(i===w)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class lit_html_S{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_r).importNode(i,!0);E.currentNode=e;let h=E.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new M(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new L(h,this,t)),this._$AV.push(i),l=s[++n]}o!==l?.index&&(h=E.nextNode(),o++)}return E.currentNode=lit_html_r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),lit_html_c(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==w&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_u(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==T&&lit_html_c(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_r.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new lit_html_S(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new V(t)),i}k(t){lit_html_a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new M(this.S(lit_html_l()),this.S(lit_html_l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=N(this,t,i,0),o=!lit_html_c(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=N(this,e[s+n],i,n),r===w&&(r=this._$AH[n]),o||=!lit_html_c(r)||r!==this._$AH[n],r===T?t=T:t!==T&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class k extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===T?void 0:t}}class H extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==T)}}class I extends R{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=N(this,t,i,0)??T)===w)return;const s=this._$AH,e=t===T&&s!==T||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==T&&(s===T||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const Z=lit_html_t.litHtmlPolyfillSupport;Z?.(V,M),(lit_html_t.litHtmlVersions??=[]).push("3.1.3");class lit_element_s extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new M(i.insertBefore(lit_html_l(),t),t,void 0,s??{})}return h._$AI(t),h})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}lit_element_s._$litElement$=!0,lit_element_s.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:lit_element_s});const lit_element_r=globalThis.litElementPolyfillSupport;lit_element_r?.({LitElement:lit_element_s});(globalThis.litElementVersions??=[]).push("4.0.5");const ThemePropertyMixin=superClass=>class VaadinThemePropertyMixin extends superClass{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(name,oldValue,newValue){super.attributeChangedCallback(name,oldValue,newValue),"theme"===name&&this._set_theme(newValue)}},themeRegistry=[];function classHasThemes(elementClass){return elementClass&&Object.prototype.hasOwnProperty.call(elementClass,"__themes")}function getAllThemes(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():themeRegistry}function getIncludePriority(moduleName=""){let includePriority=0;return moduleName.startsWith("lumo-")||moduleName.startsWith("material-")?includePriority=1:moduleName.startsWith("vaadin-")&&(includePriority=2),includePriority}function getIncludedStyles(theme){const includedStyles=[];return theme.include&&[].concat(theme.include).forEach((includeModuleId=>{const includedTheme=getAllThemes().find((s=>s.moduleId===includeModuleId));includedTheme?includedStyles.push(...getIncludedStyles(includedTheme),...includedTheme.styles):console.warn(`Included moduleId ${includeModuleId} not found in style registry`)}),theme.styles),includedStyles}function getThemes(tagName){const defaultModuleName=`${tagName}-default-theme`,themes=getAllThemes().filter((theme=>theme.moduleId!==defaultModuleName&&function matchesThemeFor(themeFor,tagName){return(themeFor||"").split(" ").some((themeForToken=>new RegExp(`^${themeForToken.split("*").join(".*")}$`,"u").test(tagName)))}(theme.themeFor,tagName))).map((theme=>({...theme,styles:[...getIncludedStyles(theme),...theme.styles],includePriority:getIncludePriority(theme.moduleId)}))).sort(((themeA,themeB)=>themeB.includePriority-themeA.includePriority));return themes.length>0?themes:getAllThemes().filter((theme=>theme.moduleId===defaultModuleName))}const ThemableMixin=superClass=>class VaadinThemableMixin extends(ThemePropertyMixin(superClass)){static finalize(){if(super.finalize(),this.elementStyles)return;const template=this.prototype._template;template&&!classHasThemes(this)&&function addStylesToTemplate(styles,template){const styleEl=document.createElement("style");styleEl.innerHTML=styles.map((style=>style.cssText)).join("\n"),template.content.appendChild(styleEl)}(this.getStylesForThis(),template)}static finalizeStyles(styles){const themeStyles=this.getStylesForThis();return styles?[...super.finalizeStyles(styles),...themeStyles]:themeStyles}static getStylesForThis(){const parent=Object.getPrototypeOf(this.prototype),inheritedThemes=(parent?parent.constructor.__themes:[])||[];this.__themes=[...inheritedThemes,...getThemes(this.is)];const themeStyles=this.__themes.flatMap((theme=>theme.styles));return themeStyles.filter(((style,index)=>index===themeStyles.lastIndexOf(style)))}};((id,...styles)=>{((id,...styles)=>{const styleTag=document.createElement("style");styleTag.id=id,styleTag.textContent=styles.map((style=>style.toString())).join("\n").replace(":host","html"),document.head.insertAdjacentElement("afterbegin",styleTag)})(`lumo-${id}`,styles)})("spacing-props",i`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`);!function registerStyles(themeFor,styles,options={}){themeFor&&function hasThemes(tagName){return classHasThemes(customElements.get(tagName))}(themeFor)&&console.warn(`The custom element definition for "${themeFor}"\n      was finalized before a style module was registered.\n      Make sure to add component specific style modules before\n      importing the corresponding custom element.`),styles=function flattenStyles(styles=[]){return[styles].flat(1/0).filter((style=>style instanceof n||(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1)))}(styles),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(themeFor,styles,options):themeRegistry.push({themeFor,styles,include:options.include,moduleId:options.moduleId})}("vaadin-vertical-layout",i`
  :host([theme~='margin']) {
    margin: var(--lumo-space-m);
  }

  :host([theme~='padding']) {
    padding: var(--lumo-space-m);
  }

  :host([theme~='spacing-xs']) {
    gap: var(--lumo-space-xs);
  }

  :host([theme~='spacing-s']) {
    gap: var(--lumo-space-s);
  }

  :host([theme~='spacing']) {
    gap: var(--lumo-space-m);
  }

  :host([theme~='spacing-l']) {
    gap: var(--lumo-space-l);
  }

  :host([theme~='spacing-xl']) {
    gap: var(--lumo-space-xl);
  }
`,{moduleId:"lumo-vertical-layout"});var polymer_element=__webpack_require__("./node_modules/@polymer/polymer/polymer-element.js"),element_mixin=__webpack_require__("./node_modules/@vaadin/component-base/src/element-mixin.js");class VerticalLayout extends((0,element_mixin.q)(ThemableMixin(polymer_element.Pu))){static get template(){return polymer_element.qy`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
        }

        :host([hidden]) {
          display: none !important;
        }

        /* Theme variations */
        :host([theme~='margin']) {
          margin: 1em;
        }

        :host([theme~='padding']) {
          padding: 1em;
        }

        :host([theme~='spacing']) {
          gap: 1em;
        }
      </style>

      <slot></slot>
    `}static get is(){return"vaadin-vertical-layout"}}(0,src_define.X)(VerticalLayout)}}]);
//# sourceMappingURL=640.7949110d.iframe.bundle.js.map