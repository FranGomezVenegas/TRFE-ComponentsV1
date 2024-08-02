/*! For license information please see 949.7a5b5d90.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[949],{"./node_modules/@spectrum-web-components/button/sp-button.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");const directives=new WeakMap,isDirective=o=>"function"==typeof o&&directives.has(o),isCEPolyfill="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,noChange={},nothing={},template_marker=`{{lit-${String(Math.random()).slice(2)}}}`,nodeMarker=`\x3c!--${template_marker}--\x3e`;new RegExp(`${template_marker}|${nodeMarker}`);const isTemplatePartActive=part=>-1!==part.index,createMarker=()=>document.createComment(""),lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class TemplateInstance{constructor(template,processor,options){this.__parts=[],this.template=template,this.processor=processor,this.options=options}update(values){let i=0;for(const part of this.__parts)void 0!==part&&part.setValue(values[i]),i++;for(const part of this.__parts)void 0!==part&&part.commit()}_clone(){const fragment=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),stack=[],parts=this.template.parts,walker=document.createTreeWalker(fragment,133,null,!1);let part,partIndex=0,nodeIndex=0,node=walker.nextNode();for(;partIndex<parts.length;)if(part=parts[partIndex],isTemplatePartActive(part)){for(;nodeIndex<part.index;)nodeIndex++,"TEMPLATE"===node.nodeName&&(stack.push(node),walker.currentNode=node.content),null===(node=walker.nextNode())&&(walker.currentNode=stack.pop(),node=walker.nextNode());if("node"===part.type){const part=this.processor.handleTextExpression(this.options);part.insertAfterNode(node.previousSibling),this.__parts.push(part)}else this.__parts.push(...this.processor.handleAttributeExpressions(node,part.name,part.strings,this.options));partIndex++}else this.__parts.push(void 0),partIndex++;return isCEPolyfill&&(document.adoptNode(fragment),customElements.upgrade(fragment)),fragment}}const policy=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:s=>s}),commentMarker=` ${template_marker} `;class template_result_TemplateResult{constructor(strings,values,type,processor){this.strings=strings,this.values=values,this.type=type,this.processor=processor}getHTML(){const l=this.strings.length-1;let html="",isCommentBinding=!1;for(let i=0;i<l;i++){const s=this.strings[i],commentOpen=s.lastIndexOf("\x3c!--");isCommentBinding=(commentOpen>-1||isCommentBinding)&&-1===s.indexOf("--\x3e",commentOpen+1);const attributeMatch=lastAttributeNameRegex.exec(s);html+=null===attributeMatch?s+(isCommentBinding?commentMarker:nodeMarker):s.substr(0,attributeMatch.index)+attributeMatch[1]+attributeMatch[2]+"$lit$"+attributeMatch[3]+template_marker}return html+=this.strings[l],html}getTemplateElement(){const template=document.createElement("template");let value=this.getHTML();return void 0!==policy&&(value=policy.createHTML(value)),template.innerHTML=value,template}}const isPrimitive=value=>null===value||!("object"==typeof value||"function"==typeof value),isIterable=value=>Array.isArray(value)||!(!value||!value[Symbol.iterator]);class AttributeCommitter{constructor(element,name,strings){this.dirty=!0,this.element=element,this.name=name,this.strings=strings,this.parts=[];for(let i=0;i<strings.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const strings=this.strings,l=strings.length-1,parts=this.parts;if(1===l&&""===strings[0]&&""===strings[1]){const v=parts[0].value;if("symbol"==typeof v)return String(v);if("string"==typeof v||!isIterable(v))return v}let text="";for(let i=0;i<l;i++){text+=strings[i];const part=parts[i];if(void 0!==part){const v=part.value;if(isPrimitive(v)||!isIterable(v))text+="string"==typeof v?v:String(v);else for(const t of v)text+="string"==typeof t?t:String(t)}}return text+=strings[l],text}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(committer){this.value=void 0,this.committer=committer}setValue(value){value===noChange||isPrimitive(value)&&value===this.value||(this.value=value,isDirective(value)||(this.committer.dirty=!0))}commit(){for(;isDirective(this.value);){const directive=this.value;this.value=noChange,directive(this)}this.value!==noChange&&this.committer.commit()}}class parts_NodePart{constructor(options){this.value=void 0,this.__pendingValue=void 0,this.options=options}appendInto(container){this.startNode=container.appendChild(createMarker()),this.endNode=container.appendChild(createMarker())}insertAfterNode(ref){this.startNode=ref,this.endNode=ref.nextSibling}appendIntoPart(part){part.__insert(this.startNode=createMarker()),part.__insert(this.endNode=createMarker())}insertAfterPart(ref){ref.__insert(this.startNode=createMarker()),this.endNode=ref.endNode,ref.endNode=this.startNode}setValue(value){this.__pendingValue=value}commit(){if(null===this.startNode.parentNode)return;for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange,directive(this)}const value=this.__pendingValue;value!==noChange&&(isPrimitive(value)?value!==this.value&&this.__commitText(value):value instanceof template_result_TemplateResult?this.__commitTemplateResult(value):value instanceof Node?this.__commitNode(value):isIterable(value)?this.__commitIterable(value):value===nothing?(this.value=nothing,this.clear()):this.__commitText(value))}__insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}__commitNode(value){this.value!==value&&(this.clear(),this.__insert(value),this.value=value)}__commitText(value){const node=this.startNode.nextSibling,valueAsString="string"==typeof(value=null==value?"":value)?value:String(value);node===this.endNode.previousSibling&&3===node.nodeType?node.data=valueAsString:this.__commitNode(document.createTextNode(valueAsString)),this.value=value}__commitTemplateResult(value){const template=this.options.templateFactory(value);if(this.value instanceof TemplateInstance&&this.value.template===template)this.value.update(value.values);else{const instance=new TemplateInstance(template,value.processor,this.options),fragment=instance._clone();instance.update(value.values),this.__commitNode(fragment),this.value=instance}}__commitIterable(value){Array.isArray(this.value)||(this.value=[],this.clear());const itemParts=this.value;let itemPart,partIndex=0;for(const item of value)itemPart=itemParts[partIndex],void 0===itemPart&&(itemPart=new parts_NodePart(this.options),itemParts.push(itemPart),0===partIndex?itemPart.appendIntoPart(this):itemPart.insertAfterPart(itemParts[partIndex-1])),itemPart.setValue(item),itemPart.commit(),partIndex++;partIndex<itemParts.length&&(itemParts.length=partIndex,this.clear(itemPart&&itemPart.endNode))}clear(startNode=this.startNode){((container,start,end=null)=>{for(;start!==end;){const n=start.nextSibling;container.removeChild(start),start=n}})(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(element,name,strings){if(this.value=void 0,this.__pendingValue=void 0,2!==strings.length||""!==strings[0]||""!==strings[1])throw new Error("Boolean attributes can only contain a single expression");this.element=element,this.name=name,this.strings=strings}setValue(value){this.__pendingValue=value}commit(){for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange,directive(this)}if(this.__pendingValue===noChange)return;const value=!!this.__pendingValue;this.value!==value&&(value?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=value),this.__pendingValue=noChange}}class PropertyCommitter extends AttributeCommitter{constructor(element,name,strings){super(element,name,strings),this.single=2===strings.length&&""===strings[0]&&""===strings[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let eventOptionsSupported=!1;(()=>{try{const options={get capture(){return eventOptionsSupported=!0,!1}};window.addEventListener("test",options,options),window.removeEventListener("test",options,options)}catch(_e){}})();class EventPart{constructor(element,eventName,eventContext){this.value=void 0,this.__pendingValue=void 0,this.element=element,this.eventName=eventName,this.eventContext=eventContext,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(value){this.__pendingValue=value}commit(){for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange,directive(this)}if(this.__pendingValue===noChange)return;const newListener=this.__pendingValue,oldListener=this.value,shouldRemoveListener=null==newListener||null!=oldListener&&(newListener.capture!==oldListener.capture||newListener.once!==oldListener.once||newListener.passive!==oldListener.passive),shouldAddListener=null!=newListener&&(null==oldListener||shouldRemoveListener);shouldRemoveListener&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),shouldAddListener&&(this.__options=getOptions(newListener),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=newListener,this.__pendingValue=noChange}handleEvent(event){"function"==typeof this.value?this.value.call(this.eventContext||this.element,event):this.value.handleEvent(event)}}const getOptions=o=>o&&(eventOptionsSupported?{capture:o.capture,passive:o.passive,once:o.once}:o.capture);new class DefaultTemplateProcessor{handleAttributeExpressions(element,name,strings,options){const prefix=name[0];if("."===prefix){return new PropertyCommitter(element,name.slice(1),strings).parts}if("@"===prefix)return[new EventPart(element,name.slice(1),options.eventContext)];if("?"===prefix)return[new BooleanAttributePart(element,name.slice(1),strings)];return new AttributeCommitter(element,name,strings).parts}handleTextExpression(options){return new parts_NodePart(options)}};new Map,new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const previousValues=new WeakMap,ifDefined=(f=value=>part=>{const previousValue=previousValues.get(part);if(void 0===value&&part instanceof AttributePart){if(void 0!==previousValue||!previousValues.has(part)){const name=part.committer.name;part.committer.element.removeAttribute(name)}}else value!==previousValue&&part.setValue(value);previousValues.set(part,value)},(...args)=>{const d=f(...args);return directives.set(d,!0),d});var f;const observedForElements=new Set;new MutationObserver((()=>{const dir="rtl"===document.documentElement.dir?document.documentElement.dir:"ltr";observedForElements.forEach((el=>{el.setAttribute("dir",dir)}))})).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});class SpectrumElement extends(function SpectrumMixin(constructor){class SlotTextObservingElement extends constructor{constructor(){super(...arguments),this.dir="ltr"}get isLTR(){return"ltr"===this.dir}hasVisibleFocusInTree(){const activeElement=this.getRootNode().activeElement;if(!activeElement)return!1;try{return activeElement.matches(":focus-visible")||activeElement.matches(".focus-visible")}catch(error){return activeElement.matches(".focus-visible")}}connectedCallback(){if(!this.hasAttribute("dir")){let dirParent=this.assignedSlot||this.parentNode;for(;dirParent!==document.documentElement&&(void 0===(el=dirParent).startManagingContentDirection&&"SP-THEME"!==el.tagName);)dirParent=dirParent.assignedSlot||dirParent.parentNode||dirParent.host;if(this.dir="rtl"===dirParent.dir?dirParent.dir:this.dir||"ltr",dirParent===document.documentElement)observedForElements.add(this);else{const{localName}=dirParent;localName.search("-")>-1&&!customElements.get(localName)?customElements.whenDefined(localName).then((()=>{dirParent.startManagingContentDirection(this)})):dirParent.startManagingContentDirection(this)}this._dirParent=dirParent}var el;super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._dirParent&&(this._dirParent===document.documentElement?observedForElements.delete(this):this._dirParent.stopManagingContentDirection(this),this.removeAttribute("dir"))}}return(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],SlotTextObservingElement.prototype,"dir",void 0),SlotTextObservingElement}(lit_element.WF)){}__webpack_require__("./node_modules/focus-visible/dist/focus-visible.js");let hasFocusVisible=!0;try{document.body.querySelector(":focus-visible")}catch(error){hasFocusVisible=!1}const FocusVisiblePolyfillMixin=SuperClass=>{var _a;const $endPolyfillCoordination=Symbol("endPolyfillCoordination");return _a=$endPolyfillCoordination,class FocusVisibleCoordinator extends SuperClass{constructor(){super(...arguments),this[_a]=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),hasFocusVisible||requestAnimationFrame((()=>{null==this[$endPolyfillCoordination]&&(this[$endPolyfillCoordination]=(instance=>{if(null==instance.shadowRoot||instance.hasAttribute("data-js-focus-visible"))return()=>{};if(!self.applyFocusVisiblePolyfill){const coordinationHandler=()=>{self.applyFocusVisiblePolyfill&&instance.shadowRoot&&self.applyFocusVisiblePolyfill(instance.shadowRoot),instance.manageAutoFocus&&instance.manageAutoFocus()};return self.addEventListener("focus-visible-polyfill-ready",coordinationHandler,{once:!0}),()=>{self.removeEventListener("focus-visible-polyfill-ready",coordinationHandler)}}return self.applyFocusVisiblePolyfill(instance.shadowRoot),instance.manageAutoFocus&&instance.manageAutoFocus(),()=>{}})(this))}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),hasFocusVisible||requestAnimationFrame((()=>{null!=this[$endPolyfillCoordination]&&(this[$endPolyfillCoordination](),this[$endPolyfillCoordination]=null)}))}}};class Focusable extends(FocusVisiblePolyfillMixin(SpectrumElement)){constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this._tabIndex=0,this.manipulatingTabindex=!1}get tabIndex(){if(this.focusElement===this){const tabindex=this.hasAttribute("tabindex")?Number(this.getAttribute("tabindex")):NaN;return isNaN(tabindex)?-1:tabindex}const tabIndexAttribute=parseFloat(this.hasAttribute("tabindex")&&this.getAttribute("tabindex")||"0");return this.disabled||tabIndexAttribute<0?-1:this.focusElement?this.focusElement.tabIndex:tabIndexAttribute}set tabIndex(tabIndex){if(this.manipulatingTabindex)this.manipulatingTabindex=!1;else if(this.focusElement!==this){if(-1===tabIndex?this.addEventListener("pointerdown",this.onPointerdownManagementOfTabIndex):(this.manipulatingTabindex=!0,this.removeEventListener("pointerdown",this.onPointerdownManagementOfTabIndex)),-1===tabIndex||this.disabled)return this.setAttribute("tabindex","-1"),this.removeAttribute("focusable"),void(-1!==tabIndex&&this.manageFocusElementTabindex(tabIndex));this.setAttribute("focusable",""),this.hasAttribute("tabindex")?this.removeAttribute("tabindex"):this.manipulatingTabindex=!1,this.manageFocusElementTabindex(tabIndex)}else if(tabIndex!==this.tabIndex){this._tabIndex=tabIndex;const tabindex=this.disabled?"-1":""+tabIndex;this.setAttribute("tabindex",tabindex)}}onPointerdownManagementOfTabIndex(){-1===this.tabIndex&&(this.tabIndex=0,this.focus({preventScroll:!0}))}async manageFocusElementTabindex(tabIndex){this.focusElement||await this.updateComplete,null===tabIndex?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=tabIndex}get focusElement(){throw new Error("Must implement focusElement getter!")}focus(options){!this.disabled&&this.focusElement&&(this.focusElement!==this?this.focusElement.focus(options):HTMLElement.prototype.focus.apply(this,[options]))}blur(){const focusElement=this.focusElement||this;focusElement!==this?focusElement.blur():HTMLElement.prototype.blur.apply(this)}click(){if(this.disabled)return;const focusElement=this.focusElement||this;focusElement!==this?focusElement.click():HTMLElement.prototype.click.apply(this)}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus())}firstUpdated(changes){super.firstUpdated(changes),this.manageAutoFocus(),this.hasAttribute("tabindex")&&"-1"===this.getAttribute("tabindex")||this.setAttribute("focusable","")}update(changedProperties){changedProperties.has("disabled")&&this.handleDisabledChanged(this.disabled,changedProperties.get("disabled")),super.update(changedProperties)}updated(changedProperties){super.updated(changedProperties),changedProperties.has("disabled")&&this.disabled&&this.blur()}async handleDisabledChanged(disabled,oldDisabled){const canSetDisabled=()=>this.focusElement!==this&&void 0!==this.focusElement.disabled;disabled?(this.manipulatingTabindex=!0,this.setAttribute("tabindex","-1"),await this.updateComplete,canSetDisabled()?this.focusElement.disabled=!0:this.setAttribute("aria-disabled","true")):oldDisabled&&(this.manipulatingTabindex=!0,this.focusElement===this?this.setAttribute("tabindex",""+this._tabIndex):this.removeAttribute("tabindex"),await this.updateComplete,canSetDisabled()?this.focusElement.disabled=!1:this.removeAttribute("aria-disabled"))}}(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean,reflect:!0})],Focusable.prototype,"disabled",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean})],Focusable.prototype,"autofocus",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Number})],Focusable.prototype,"tabIndex",null);const slotElementObserver=Symbol("slotElementObserver"),assignedNodesList=Symbol("assignedNodes"),startObserving=Symbol("startObserving");const observe_slot_presence_slotElementObserver=Symbol("slotElementObserver"),observe_slot_presence_startObserving=Symbol("startObserving"),slotContentIsPresent=Symbol("slotContentIsPresent");class ButtonBase extends(function LikeAnchor(constructor){class LikeAnchorElement extends constructor{renderAnchor({id,className,ariaHidden,labelledby,tabindex,anchorContent=lit_element.qy`<slot></slot>`}){return lit_element.qy`<a
                    id=${id}
                    class=${ifDefined(className)}
                    href=${ifDefined(this.href)}
                    download=${ifDefined(this.download)}
                    target=${ifDefined(this.target)}
                    aria-label=${ifDefined(this.label)}
                    aria-labelledby=${ifDefined(labelledby)}
                    aria-hidden=${ifDefined(ariaHidden?"true":void 0)}
                    tabindex=${ifDefined(tabindex)}
                    rel=${ifDefined(this.rel)}
                >${anchorContent}</a>`}}return(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],LikeAnchorElement.prototype,"download",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)()],LikeAnchorElement.prototype,"label",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],LikeAnchorElement.prototype,"href",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],LikeAnchorElement.prototype,"target",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],LikeAnchorElement.prototype,"rel",void 0),LikeAnchorElement}(function ObserveSlotText(constructor,slotSelector){var _a;class SlotTextObservingElement extends constructor{constructor(){super(...arguments),this.slotHasContent=!1}manageTextObservedSlot(){if(!this[assignedNodesList])return;const assignedNodes=[...this[assignedNodesList]].filter((node=>!!node.tagName||!!node.textContent&&node.textContent.trim()));this.slotHasContent=assignedNodes.length>0}firstUpdated(changedProperties){super.firstUpdated(changedProperties),this.manageTextObservedSlot()}[(_a=assignedNodesList,startObserving)](){if(!this[slotElementObserver]){const callback=mutationsList=>{for(const mutation of mutationsList)"characterData"===mutation.type&&this.manageTextObservedSlot()};this[slotElementObserver]=new MutationObserver(callback)}this[slotElementObserver].observe(this,{characterData:!0,subtree:!0})}connectedCallback(){super.connectedCallback(),this[startObserving]()}disconnectedCallback(){this[slotElementObserver]&&this[slotElementObserver].disconnect(),super.disconnectedCallback()}}return(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean,attribute:!1})],SlotTextObservingElement.prototype,"slotHasContent",void 0),(0,tslib_es6.Cg)([(0,lit_element.gZ)(slotSelector,!0)],SlotTextObservingElement.prototype,_a,void 0),SlotTextObservingElement}(function ObserveSlotPresence(constructor,lightDomSelector){var _a;const lightDomSelectors=Array.isArray(lightDomSelector)?lightDomSelector:[lightDomSelector];class SlotPresenceObservingElement extends constructor{constructor(){super(...arguments),this[_a]=new Map,this.managePresenceObservedSlot=()=>{lightDomSelectors.forEach((selector=>{this[slotContentIsPresent].set(selector,!!this.querySelector(selector))})),this.requestUpdate()}}get slotContentIsPresent(){if(1===lightDomSelectors.length)return this[slotContentIsPresent].get(lightDomSelectors[0])||!1;throw new Error("Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.")}getSlotContentPresence(selector){if(this[slotContentIsPresent].has(selector))return this[slotContentIsPresent].get(selector)||!1;throw new Error("The provided selector `` is not being observed.")}[(_a=slotContentIsPresent,observe_slot_presence_startObserving)](){this[observe_slot_presence_slotElementObserver]||(this[observe_slot_presence_slotElementObserver]=new MutationObserver(this.managePresenceObservedSlot)),this[observe_slot_presence_slotElementObserver].observe(this,{childList:!0,subtree:!0}),this.managePresenceObservedSlot()}connectedCallback(){super.connectedCallback(),this[observe_slot_presence_startObserving]()}disconnectedCallback(){this[observe_slot_presence_slotElementObserver].disconnect(),super.disconnectedCallback()}}return SlotPresenceObservingElement}(Focusable,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const content=[lit_element.qy`
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageTextObservedSlot}
                    ></slot>
                </div>
            `];return this.hasIcon&&content.unshift(lit_element.qy`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `),content}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(event){if(this.disabled)return event.preventDefault(),event.stopImmediatePropagation(),event.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let handled=!1;if(this.anchorElement)this.anchorElement.click(),handled=!0;else if("button"!==this.type){const proxy=document.createElement("button");proxy.type=this.type,this.insertAdjacentElement("afterend",proxy),proxy.click(),proxy.remove(),handled=!0}return handled}renderAnchor(){return lit_element.qy`
            ${this.buttonContent}
            ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}
        `}renderButton(){return lit_element.qy`
            ${this.buttonContent}
        `}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(event){const{code}=event;if("Space"===code)event.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeypress(event){const{code}=event;switch(code){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(event){const{code}=event;if("Space"===code)this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):(this.hasAttribute("role")&&"link"!==this.getAttribute("role")||this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(changed){super.firstUpdated(changed),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(changed){super.updated(changed),changed.has("href")&&this.manageAnchor(),changed.has("label")&&this.setAttribute("aria-label",this.label||""),changed.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean,reflect:!0})],ButtonBase.prototype,"active",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:String})],ButtonBase.prototype,"type",void 0),(0,tslib_es6.Cg)([(0,lit_element.P)(".anchor")],ButtonBase.prototype,"anchorElement",void 0);const button_base_css=lit_element.AH`
:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{bottom:0;left:0;position:absolute;right:0;top:0}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}
`;class StyledButton extends ButtonBase{static get styles(){return[button_base_css]}}const button_css=lit_element.AH`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){flex-shrink:0;max-height:100%}:host:after{border-radius:calc(var(--spectrum-button-primary-texticon-border-radius) + var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
));bottom:0;content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host(.focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host(:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host([size=s]){--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-s-primary-textonly-text-padding-bottom
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-s-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-s-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-s-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-s-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-s-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-s-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-s-primary-texticon-border-radius,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-s-primary-texticon-padding-left,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-s-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-s-primary-textonly-min-width,var(--spectrum-global-dimension-size-675)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-s-primary-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-s-primary-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-s-primary-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:calc(var(
--spectrum-button-s-primary-textonly-text-padding-top,
var(--spectrum-global-dimension-static-size-50)
) - 1px)}:host([size=m]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-m-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-m-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-m-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-m-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-m-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-m-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-m-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-m-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-m-primary-textonly-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-m-primary-textonly-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-m-primary-textonly-padding-left,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-m-primary-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-m-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-115)
) - 1px)}:host([size=l]){--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-l-primary-textonly-text-padding-top
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-l-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-l-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-l-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-l-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-l-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-l-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-l-primary-texticon-border-radius,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-l-primary-texticon-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-l-primary-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-l-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-l-primary-textonly-min-width,var(--spectrum-global-dimension-size-1125)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-l-primary-textonly-padding-right,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-l-primary-textonly-padding-left,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-l-primary-textonly-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-xl-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-xl-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-xl-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-xl-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-xl-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-xl-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-xl-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-xl-primary-texticon-border-radius,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-xl-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-xl-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-xl-primary-textonly-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-xl-primary-textonly-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-xl-primary-textonly-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-xl-primary-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-xl-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-175)
) - 1px)}:host{--spectrum-button-primary-padding-left-adjusted:calc(var(--spectrum-button-primary-texticon-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-left-adjusted:calc(var(--spectrum-button-primary-textonly-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-right-adjusted:calc(var(--spectrum-button-primary-textonly-padding-right) - var(--spectrum-button-primary-texticon-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-button-primary-textonly-padding-left-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-right-adjusted
)}:host([dir=rtl]){padding-left:var(
--spectrum-button-primary-textonly-padding-right-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-button-primary-texticon-border-radius);border-style:solid;border-width:var(
--spectrum-button-primary-texticon-border-size
);font-size:var(--spectrum-button-primary-texticon-text-size);font-weight:var(--spectrum-button-primary-texticon-text-font-weight);height:auto;min-height:var(--spectrum-button-primary-textonly-height);min-width:var(--spectrum-button-primary-textonly-min-width);padding-bottom:0;padding-top:0}:host(:hover),:host([active]){box-shadow:none}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(-1*(var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(-1*(var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted)))}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#label{line-height:var(
--spectrum-button-primary-texticon-text-line-height
);padding-bottom:calc(var(--spectrum-button-primary-textonly-text-padding-bottom) - var(--spectrum-button-primary-textonly-border-size));padding-top:calc(var(--spectrum-button-primary-textonly-text-padding-top) - var(--spectrum-button-primary-textonly-border-size))}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([variant=cta]){background-color:var(
--spectrum-button-m-cta-texticon-background-color,var(--spectrum-semantic-cta-background-color-default)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color,var(--spectrum-semantic-cta-background-color-default)
);color:var(
--spectrum-button-m-cta-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:hover){background-color:var(
--spectrum-button-m-cta-texticon-background-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=cta].focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta][active]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-down,var(--spectrum-semantic-cta-background-color-down)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-down,var(--spectrum-semantic-cta-background-color-down)
);color:var(
--spectrum-button-m-cta-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:disabled),:host([variant=cta][disabled]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-cta-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=primary]){background-color:var(
--spectrum-button-m-primary-texticon-background-color,var(--spectrum-alias-button-primary-background-color-default)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color,var(--spectrum-alias-button-primary-border-color-default)
);color:var(
--spectrum-button-m-primary-texticon-text-color,var(--spectrum-alias-button-primary-text-color-default)
)}:host([variant=primary]:hover){background-color:var(
--spectrum-button-m-primary-texticon-background-color-hover,var(--spectrum-alias-button-primary-background-color-hover)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-hover,var(--spectrum-alias-button-primary-border-color-hover)
);color:var(
--spectrum-button-m-primary-texticon-text-color-hover,var(--spectrum-alias-button-primary-text-color-hover)
)}:host([variant=primary].focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary]:focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary][active]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-down,var(--spectrum-alias-button-primary-background-color-down)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-down,var(--spectrum-alias-button-primary-border-color-down)
);color:var(
--spectrum-button-m-primary-texticon-text-color-down,var(--spectrum-alias-button-primary-text-color-down)
)}:host([variant=primary]:disabled),:host([variant=primary][disabled]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color,var(--spectrum-alias-button-secondary-background-color-default)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color,var(--spectrum-alias-button-secondary-border-color-default)
);color:var(
--spectrum-button-m-secondary-texticon-text-color,var(--spectrum-alias-button-secondary-text-color-default)
)}:host([variant=secondary]:hover){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-hover,var(--spectrum-alias-button-secondary-background-color-hover)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-hover,var(--spectrum-alias-button-secondary-border-color-hover)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-hover,var(--spectrum-alias-button-secondary-text-color-hover)
)}:host([variant=secondary].focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary]:focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary][active]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-down,var(--spectrum-alias-button-secondary-background-color-down)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-down,var(--spectrum-alias-button-secondary-border-color-down)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-down,var(--spectrum-alias-button-secondary-text-color-down)
)}:host([variant=secondary]:disabled),:host([variant=secondary][disabled]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative]){background-color:var(
--spectrum-button-m-negative-texticon-background-color,var(--spectrum-alias-button-negative-background-color-default)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color,var(--spectrum-alias-button-negative-border-color-default)
);color:var(
--spectrum-button-m-negative-texticon-text-color,var(--spectrum-alias-button-negative-text-color-default)
)}:host([variant=negative]:hover){background-color:var(
--spectrum-button-m-negative-texticon-background-color-hover,var(--spectrum-alias-button-negative-background-color-hover)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-hover,var(--spectrum-alias-button-negative-border-color-hover)
);color:var(
--spectrum-button-m-negative-texticon-text-color-hover,var(--spectrum-alias-button-negative-text-color-hover)
)}:host([variant=negative].focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative]:focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative][active]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-down,var(--spectrum-alias-button-negative-background-color-down)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-down,var(--spectrum-alias-button-negative-border-color-down)
);color:var(
--spectrum-button-m-negative-texticon-text-color-down,var(--spectrum-alias-button-negative-text-color-down)
)}:host([variant=negative]:disabled),:host([variant=negative][disabled]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-down,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-overbackground-disabled)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-overbackground-disabled)
)}:host([variant=overBackground][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down,var(--spectrum-alias-background-color-quiet-overbackground-down)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:disabled),:host([variant=overBackground][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-quiet-overbackground-disabled)
)}:host([variant=primary][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([variant=primary][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:disabled),:host([variant=primary][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary][quiet]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color,var(--spectrum-global-color-gray-700)
)}:host([variant=secondary][quiet]:hover){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet].focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet][active]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:disabled),:host([variant=secondary][quiet][disabled]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative][quiet]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color,var(--spectrum-semantic-negative-text-color-small)
)}:host([variant=negative][quiet]:hover){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-hover,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet].focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet][active]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-down,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:disabled),:host([variant=negative][quiet][disabled]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}@media (forced-colors:active){:host{forced-color-adjust:none}}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`;class Button extends(function SizedMixin(constructor,{validSizes=["s","m","l","xl"],noDefaultSize}={}){class SizedElement extends constructor{constructor(){super(...arguments),this._size="m"}get size(){return this._size||"m"}set size(value){const defaultSize=noDefaultSize?null:"m",size=value?value.toLocaleLowerCase():value,validSize=validSizes.includes(size)?size:defaultSize;if(validSize&&this.setAttribute("size",validSize),this._size===validSize)return;const oldSize=this._size;this._size=validSize,this.requestUpdate("size",oldSize)}firstUpdated(changes){super.firstUpdated(changes),this.hasAttribute("size")||noDefaultSize||this.setAttribute("size",this.size)}}return(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:String,reflect:!0})],SizedElement.prototype,"size",null),SizedElement}(StyledButton)){constructor(){super(...arguments),this.variant="cta",this.warning=!1,this.quiet=!1}static get styles(){return[...super.styles,button_css]}}(0,tslib_es6.Cg)([(0,lit_element.MZ)({reflect:!0})],Button.prototype,"variant",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean,reflect:!0})],Button.prototype,"warning",void 0),(0,tslib_es6.Cg)([(0,lit_element.MZ)({type:Boolean,reflect:!0})],Button.prototype,"quiet",void 0),customElements.define("sp-button",Button)},"./node_modules/@vaadin/vaadin-combo-box/vaadin-combo-box.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var register_styles=__webpack_require__("./node_modules/@vaadin/vaadin-themable-mixin/register-styles.js");__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/color.js"),__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/spacing.js"),__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/style.js"),__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/mixins/overlay.js");(0,register_styles.SF)("vaadin-overlay",register_styles.AH``,{include:["lumo-overlay"],moduleId:"lumo-vaadin-overlay"});var vaadin_overlay=__webpack_require__("./node_modules/@vaadin/vaadin-overlay/src/vaadin-overlay.js");__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/mixins/menu-overlay.js");(0,register_styles.SF)("vaadin-combo-box-overlay",register_styles.AH`
    [part='content'] {
      padding: 0;
    }

    :host {
      /* TODO: using a legacy mixin (unsupported) */
      --iron-list-items-container: {
        border-width: var(--lumo-space-xs);
        border-style: solid;
        border-color: transparent;
      }
    }

    /* Loading state */

    /* When items are empty, the spinner needs some room */
    :host(:not([closing])) [part~='content'] {
      min-height: calc(2 * var(--lumo-space-s) + var(--lumo-icon-size-s));
    }

    [part~='overlay'] {
      position: relative;
    }

    :host([loading]) [part~='loader'] {
      box-sizing: border-box;
      width: var(--lumo-icon-size-s);
      height: var(--lumo-icon-size-s);
      position: absolute;
      z-index: 1;
      left: var(--lumo-space-s);
      right: var(--lumo-space-s);
      top: var(--lumo-space-s);
      margin-left: auto;
      margin-inline-start: auto;
      margin-inline-end: 0;
      border: 2px solid transparent;
      border-color: var(--lumo-primary-color-50pct) var(--lumo-primary-color-50pct) var(--lumo-primary-color)
        var(--lumo-primary-color);
      border-radius: calc(0.5 * var(--lumo-icon-size-s));
      opacity: 0;
      animation: 1s linear infinite lumo-combo-box-loader-rotate, 0.3s 0.1s lumo-combo-box-loader-fade-in both;
      pointer-events: none;
    }

    @keyframes lumo-combo-box-loader-fade-in {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes lumo-combo-box-loader-rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    /* RTL specific styles */

    :host([loading][dir='rtl']) [part~='loader'] {
      left: auto;
      margin-left: 0;
      margin-right: auto;
      margin-inline-start: 0;
      margin-inline-end: auto;
    }
  `,{moduleId:"lumo-combo-box-overlay",include:["lumo-overlay","lumo-menu-overlay-core"]});__webpack_require__("./node_modules/@vaadin/vaadin-item/theme/lumo/vaadin-item.js");(0,register_styles.SF)("vaadin-combo-box-item",register_styles.AH`
    :host {
      cursor: default;
      -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
      padding-left: calc(var(--lumo-border-radius-m) / 4);
      padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
      transition: background-color 100ms;
      border-radius: var(--lumo-border-radius-m);
      overflow: hidden;
      --_lumo-item-selected-icon-display: block;
    }

    :host(:hover) {
      background-color: var(--lumo-primary-color-10pct);
    }

    :host([focused]:not([disabled])) {
      box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
    }

    @media (pointer: coarse) {
      :host(:hover) {
        background-color: transparent;
      }

      :host([focused]:not([disabled])) {
        box-shadow: none;
      }
    }

    /* RTL specific styles */
    :host([dir='rtl']) {
      padding-right: calc(var(--lumo-border-radius-m) / 4);
      padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    }
  `,{moduleId:"lumo-combo-box-item",include:["lumo-item"]});__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/font-icons.js"),__webpack_require__("./node_modules/@vaadin/vaadin-lumo-styles/mixins/field-button.js"),__webpack_require__("./node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field.js");(0,register_styles.SF)("vaadin-combo-box",register_styles.AH`
    :host {
      outline: none;
    }

    [part='toggle-button']::before {
      content: var(--lumo-icons-dropdown);
    }
  `,{moduleId:"lumo-combo-box",include:["lumo-field-button"]});var polymer_element=__webpack_require__("./node_modules/@polymer/polymer/polymer-element.js"),vaadin_control_state_mixin=__webpack_require__("./node_modules/@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js"),vaadin_element_mixin=__webpack_require__("./node_modules/@vaadin/vaadin-element-mixin/vaadin-element-mixin.js"),vaadin_themable_mixin=__webpack_require__("./node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js"),utils_async=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/async.js"),debounce=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/debounce.js"),flush=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/flush.js"),polymer_fn=(__webpack_require__("./node_modules/@polymer/polymer/polymer-legacy.js"),__webpack_require__("./node_modules/@polymer/polymer/lib/legacy/polymer-fn.js")),html_tag=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/html-tag.js");const IronA11yAnnouncer=(0,polymer_fn.b)({_template:html_tag.q`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},timeout:{type:Number,value:150},_text:{type:String,value:""}},created:function(){IronA11yAnnouncer.instance||(IronA11yAnnouncer.instance=this),document.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(text){this._text="",this.async((function(){this._text=text}),this.timeout)},_onIronAnnounce:function(event){event.detail&&event.detail.text&&this.announce(event.detail.text)}});IronA11yAnnouncer.instance=null,IronA11yAnnouncer.requestAvailability=function(){IronA11yAnnouncer.instance||(IronA11yAnnouncer.instance=document.createElement("iron-a11y-announcer")),document.body?document.body.appendChild(IronA11yAnnouncer.instance):document.addEventListener("load",(function(){document.body.appendChild(IronA11yAnnouncer.instance)}))};var templates=__webpack_require__("./node_modules/@vaadin/vaadin-element-mixin/templates.js");const ComboBoxPlaceholder=class ComboBoxPlaceholder{toString(){return""}},ComboBoxMixin=subclass=>class VaadinComboBoxMixinElement extends subclass{static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,observer:"_openedChanged"},autoOpenDisabled:Boolean,disabled:{type:Boolean,value:!1,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:Function,items:{type:Array,observer:"_itemsChanged"},allowCustomValue:{type:Boolean,value:!1},filteredItems:{type:Array},value:{type:String,observer:"_valueChanged",notify:!0,value:""},_lastCommittedValue:String,loading:{type:Boolean,value:!1,reflectToAttribute:!0},_focusedIndex:{type:Number,value:-1},filter:{type:String,value:"",notify:!0},selectedItem:{type:Object,notify:!0},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged"},itemValuePath:{type:String,value:"value"},itemIdPath:String,name:{type:String},invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1},_toggleElement:Object,_clearElement:Object,_inputElementValue:String,_closeOnBlurIsPrevented:Boolean,_previousDocumentPointerEvents:String}}static get observers(){return["_filterChanged(filter, itemValuePath, itemLabelPath)","_itemsOrPathsChanged(items.*, itemValuePath, itemLabelPath)","_filteredItemsChanged(filteredItems.*, itemValuePath, itemLabelPath)","_loadingChanged(loading)","_selectedItemChanged(selectedItem, itemValuePath, itemLabelPath)","_toggleElementChanged(_toggleElement)"]}constructor(){super(),this._boundOnFocusout=this._onFocusout.bind(this),this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundClose=this.close.bind(this),this._boundOnOpened=this._onOpened.bind(this),this._boundOnKeyDown=this._onKeyDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}ready(){super.ready(),this.addEventListener("focusout",this._boundOnFocusout),this._lastCommittedValue=this.value,IronA11yAnnouncer.requestAvailability(),this.$.overlay.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged),this.addEventListener("vaadin-combo-box-dropdown-closed",this._boundClose),this.addEventListener("vaadin-combo-box-dropdown-opened",this._boundOnOpened),this.addEventListener("keydown",this._boundOnKeyDown),this.addEventListener("click",this._boundOnClick),this.$.overlay.addEventListener("vaadin-overlay-touch-action",this._boundOnOverlayTouchAction),this.addEventListener("touchend",this._boundOnTouchend);const bringToFrontListener=()=>{const overlay=this.$.overlay,dropdown=overlay&&overlay.$.dropdown;dropdown&&dropdown.$&&requestAnimationFrame((()=>{dropdown.$.overlay.bringToFront()}))};this.addEventListener("mousedown",bringToFrontListener),this.addEventListener("touchstart",bringToFrontListener,{passive:!0}),(0,templates.h)(this)}requestContentUpdate(){this.$.overlay._selector&&this.$.overlay._selector.querySelectorAll("vaadin-combo-box-item").forEach((item=>{item.requestContentUpdate()}))}render(){console.warn("WARNING: Since Vaadin 21, render() is deprecated. Please use requestContentUpdate() instead."),this.requestContentUpdate()}open(){this.disabled||this.readonly||(this.opened=!0)}close(){this.opened=!1}_openedChanged(value,old){void 0!==old&&(this.opened?(this._openedWithFocusRing=this.hasAttribute("focus-ring")||this.focusElement&&this.focusElement.hasAttribute("focus-ring"),this.hasAttribute("focused")||this.$.overlay.touchDevice||this.focus()):(this._onClosed(),this._openedWithFocusRing&&this.hasAttribute("focused")&&this.focusElement.setAttribute("focus-ring","")))}_onOverlayTouchAction(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_onClick(e){this._closeOnBlurIsPrevented=!0;const path=e.composedPath();-1!==path.indexOf(this._clearElement)||"clear-button"===path[0].getAttribute("part")?(this._clear(),this.focus()):-1!==path.indexOf(this.inputElement)&&(path.indexOf(this._toggleElement)>-1&&this.opened?this.close():(path.indexOf(this._toggleElement)>-1||!this.autoOpenDisabled)&&this.open()),this._closeOnBlurIsPrevented=!1}_onKeyDown(e){40===e.keyCode?(this._closeOnBlurIsPrevented=!0,this._onArrowDown(),this._closeOnBlurIsPrevented=!1,e.preventDefault()):38===e.keyCode?(this._closeOnBlurIsPrevented=!0,this._onArrowUp(),this._closeOnBlurIsPrevented=!1,e.preventDefault()):13===e.keyCode?this._onEnter(e):27===e.keyCode&&this._onEscape(e)}_getItemLabel(item){return this.$.overlay.getItemLabel(item)}_getItemValue(item){let value=item&&this.itemValuePath?this.get(this.itemValuePath,item):void 0;return void 0===value&&(value=item?item.toString():""),value}_onArrowDown(){this.opened?this.$.overlay._items&&(this._focusedIndex=Math.min(this.$.overlay._items.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel()):this.open()}_onArrowUp(){this.opened?(this._focusedIndex>-1?this._focusedIndex=Math.max(0,this._focusedIndex-1):this.$.overlay._items&&(this._focusedIndex=this.$.overlay._items.length-1),this._prefillFocusedItemLabel()):this.open()}_prefillFocusedItemLabel(){this._focusedIndex>-1&&(this._inputElementValue="",setTimeout((()=>{this._inputElementValue=this._getItemLabel(this.$.overlay._focusedItem),this._markAllSelectionRange()}),1))}_setSelectionRange(start,end){const input=this._nativeInput||this.inputElement;this.hasAttribute("focused")&&input&&input.setSelectionRange&&input.setSelectionRange(start,end)}_markAllSelectionRange(){void 0!==this._inputElementValue&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(void 0!==this._inputElementValue){const pos=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(pos,pos)}}_closeOrCommit(){this.opened||this.loading?this.close():this._commitValue()}_onEnter(e){(this.opened||this.autoOpenDisabled)&&(this.allowCustomValue||""===this._inputElementValue||this._focusedIndex>-1)&&(this._closeOrCommit(),e.preventDefault(),e.stopPropagation())}_onEscape(e){this.autoOpenDisabled?(this._focusedIndex=-1,this.cancel()):this.opened&&(this._stopPropagation(e),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this.cancel())}_toggleElementChanged(toggleElement){toggleElement&&(toggleElement.addEventListener("mousedown",(e=>e.preventDefault())),toggleElement.addEventListener("click",(()=>{this.$.overlay.touchDevice&&!this.hasAttribute("focused")&&document.activeElement.blur()})))}_clear(){this.selectedItem=null,this.allowCustomValue&&(this.value=""),this._detectAndDispatchChange()}cancel(){this._revertInputValueToValue(),this._lastCommittedValue=this.value,this._closeOrCommit()}_onOpened(){(0,flush.b)(),this.$.overlay.ensureItemsRendered(),this.$.overlay._selector.toggleScrollListener(!0),this.$.overlay.updateViewportBoundaries(),this.$.overlay._selector._increasePoolIfNeeded(),setTimeout((()=>this._resizeDropdown()),1),window.requestAnimationFrame((()=>this.$.overlay.adjustScrollPosition())),this._lastCommittedValue=this.value}_onClosed(){this.opened&&this.close(),this.loading&&!this.allowCustomValue||this._commitValue()}_commitValue(){if(this.$.overlay._items&&this._focusedIndex>-1){const focusedItem=this.$.overlay._items[this._focusedIndex];this.selectedItem!==focusedItem&&(this.selectedItem=focusedItem),this._inputElementValue=this._getItemLabel(this.selectedItem)}else if(""===this._inputElementValue||void 0===this._inputElementValue)this.selectedItem=null,this.allowCustomValue&&(this.value="");else{const toLowerCase=item=>item&&item.toLowerCase&&item.toLowerCase(),itemsMatchedByLabel=this.filteredItems&&this.filteredItems.filter((item=>toLowerCase(this._getItemLabel(item))===toLowerCase(this._inputElementValue)))||[];if(this.allowCustomValue&&!itemsMatchedByLabel.length){const e=new CustomEvent("custom-value-set",{detail:this._inputElementValue,composed:!0,cancelable:!0,bubbles:!0});if(this.dispatchEvent(e),!e.defaultPrevented){const customValue=this._inputElementValue;this._selectItemForValue(customValue),this.value=customValue}}else!this.allowCustomValue&&!this.opened&&itemsMatchedByLabel.length>0?this.value=this._getItemValue(itemsMatchedByLabel[0]):this._inputElementValue=this.selectedItem?this._getItemLabel(this.selectedItem):this.value||""}this._detectAndDispatchChange(),this._clearSelectionRange(),this.dataProvider||(this.filter="")}get _propertyForValue(){return"value"}_inputValueChanged(e){-1!==e.composedPath().indexOf(this.inputElement)&&(this._inputElementValue=this.inputElement[this._propertyForValue],this._filterFromInput(e))}_filterFromInput(e){this.opened||e.__fromClearButton||this.autoOpenDisabled||this.open(),this.filter===this._inputElementValue?this._filterChanged(this.filter,this.itemValuePath,this.itemLabelPath):this.filter=this._inputElementValue}_itemLabelPathChanged(itemLabelPath){"string"!=typeof itemLabelPath&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(filter,itemValuePath,itemLabelPath){void 0!==filter&&(this.$.overlay.filterChanged=!0,this.items?this.filteredItems=this._filterItems(this.items,filter):this._filteredItemsChanged({path:"filteredItems",value:this.filteredItems},itemValuePath,itemLabelPath))}_loadingChanged(loading){loading&&(this._focusedIndex=-1)}_revertInputValue(){""!==this.filter?this._inputElementValue=this.filter:this._revertInputValueToValue(),this._clearSelectionRange()}_revertInputValueToValue(){this.allowCustomValue&&!this.selectedItem?this._inputElementValue=this.value:this._inputElementValue=this._getItemLabel(this.selectedItem)}_resizeDropdown(){this.$.overlay.$.dropdown.notifyResize()}_updateHasValue(hasValue){hasValue?this.setAttribute("has-value",""):this.removeAttribute("has-value")}_selectedItemChanged(selectedItem){if(null==selectedItem)this.filteredItems&&(this.allowCustomValue||(this.value=""),this._updateHasValue(""!==this.value),this._inputElementValue=this.value);else{const value=this._getItemValue(selectedItem);if(this.value!==value&&(this.value=value,this.value!==value))return;this._updateHasValue(!0),this._inputElementValue=this._getItemLabel(selectedItem),this.inputElement&&(this.inputElement[this._propertyForValue]=this._inputElementValue)}this.$.overlay._selectedItem=selectedItem,this.filteredItems&&this.$.overlay._items&&(this._focusedIndex=this.filteredItems.indexOf(selectedItem))}_valueChanged(value,oldVal){if(""!==value||void 0!==oldVal){if(this._isValidValue(value)){let item;this._getItemValue(this.selectedItem)!==value?this._selectItemForValue(value):item=this.selectedItem,!item&&this.allowCustomValue&&(this._inputElementValue=value),this._updateHasValue(""!==this.value)}else this.selectedItem=null;this._lastCommittedValue=void 0}}_detectAndDispatchChange(){this.value!==this._lastCommittedValue&&(this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this._lastCommittedValue=this.value)}_itemsChanged(items,oldItems){this._ensureItemsOrDataProvider((()=>{this.items=oldItems}))}_itemsOrPathsChanged(e){if("items"===e.path||"items.splices"===e.path){this.items?this.filteredItems=this.items.slice(0):this.__previousItems&&(this.filteredItems=null);const valueIndex=this._indexOfValue(this.value,this.items);this._focusedIndex=valueIndex;const item=valueIndex>-1&&this.items[valueIndex];item&&(this.selectedItem=item)}this.__previousItems=e.value}_filteredItemsChanged(e){"filteredItems"!==e.path&&"filteredItems.splices"!==e.path||(this._setOverlayItems(this.filteredItems),this._focusedIndex=this.opened||this.autoOpenDisabled?this.$.overlay.indexOfLabel(this.filter):this._indexOfValue(this.value,this.filteredItems),this.opened&&this._repositionOverlay())}_filterItems(arr,filter){if(!arr)return arr;return arr.filter((item=>(filter=filter?filter.toString().toLowerCase():"",this._getItemLabel(item).toString().toLowerCase().indexOf(filter)>-1)))}_selectItemForValue(value){const valueIndex=this._indexOfValue(value,this.filteredItems),previouslySelectedItem=this.selectedItem;this.selectedItem=valueIndex>=0?this.filteredItems[valueIndex]:this.dataProvider&&void 0===this.selectedItem?void 0:null,null===this.selectedItem&&null===previouslySelectedItem&&this._selectedItemChanged(this.selectedItem)}_setOverlayItems(items){this.$.overlay.set("_items",items)}_repositionOverlay(){this.__repositionOverlayDebouncer=debounce.aq.debounce(this.__repositionOverlayDebouncer,utils_async.EV.after(500),(()=>{const selector=this.$.overlay._selector;selector._isClientFull()||selector._resetScrollPosition(selector._physicalTop),this._resizeDropdown(),this.$.overlay.updateViewportBoundaries(),this.$.overlay.ensureItemsRendered(),selector.notifyResize(),(0,flush.b)()}))}_indexOfValue(value,items){if(items&&this._isValidValue(value))for(let i=0;i<items.length;i++)if(this._getItemValue(items[i])===value)return i;return-1}_isValidValue(value){return null!=value}_overlaySelectedItemChanged(e){e.stopPropagation(),e.detail.item instanceof ComboBoxPlaceholder||(this.opened?(this._focusedIndex=this.filteredItems.indexOf(e.detail.item),this.close()):this.selectedItem!==e.detail.item&&(this.selectedItem=e.detail.item,this._detectAndDispatchChange()))}_onFocusout(event){const dropdown=this.$.overlay.$.dropdown;dropdown&&dropdown.$&&event.relatedTarget===dropdown.$.overlay?event.composedPath()[0].focus():this.readonly||this._closeOnBlurIsPrevented||this._closeOrCommit()}_onTouchend(event){this._clearElement&&event.composedPath()[0]===this._clearElement&&(event.preventDefault(),this._clear())}validate(){return!(this.invalid=!this.checkValidity())}checkValidity(){if(this.inputElement.validate)return this.inputElement.validate()}_preventInputBlur(){this._toggleElement&&this._toggleElement.addEventListener("click",this._preventDefault),this._clearElement&&this._clearElement.addEventListener("click",this._preventDefault)}_restoreInputBlur(){this._toggleElement&&this._toggleElement.removeEventListener("click",this._preventDefault),this._clearElement&&this._clearElement.removeEventListener("click",this._preventDefault)}_preventDefault(e){e.preventDefault()}_stopPropagation(e){e.stopPropagation()}};__webpack_require__("./node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field.js");Boolean;var polymer_dom=__webpack_require__("./node_modules/@polymer/polymer/lib/legacy/polymer.dom.js"),settings=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/settings.js"),ORPHANS=new Set;const IronResizableBehavior={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(ORPHANS.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach((function(resizable){this.resizerShouldNotify(resizable)&&this._notifyDescendant(resizable)}),this),this._fireResize())},assignParentResizable:function(parentResizable){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=parentResizable,parentResizable&&-1===parentResizable._interestedResizables.indexOf(this)&&(parentResizable._interestedResizables.push(this),parentResizable._subscribeIronResize(this))},stopResizeNotificationsFor:function(target){var index=this._interestedResizables.indexOf(target);index>-1&&(this._interestedResizables.splice(index,1),this._unsubscribeIronResize(target))},_subscribeIronResize:function(target){target.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(target){target.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(element){return!0},_onDescendantIronResize:function(event){this._notifyingDescendant?event.stopPropagation():settings.sv||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(event){var target=(0,polymer_dom.tT)(event).rootTarget;target!==this&&(target.assignParentResizable(this),this._notifyDescendant(target),event.stopPropagation())},_parentResizableChanged:function(parentResizable){parentResizable&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(descendant){this.isAttached&&(this._notifyingDescendant=!0,descendant.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var _requestResizeNotifications=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function readystatechanged(){document.removeEventListener("readystatechange",readystatechanged),_requestResizeNotifications()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((function(resizable){resizable!==this&&resizable._findParent()}),this):(ORPHANS.forEach((function(orphan){orphan!==this&&orphan._findParent()}),this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?ORPHANS.delete(this):ORPHANS.add(this)}},IronScrollTargetBehavior={properties:{scrollTarget:{type:HTMLElement,value:function(){return this._defaultScrollTarget}}},observers:["_scrollTargetChanged(scrollTarget, isAttached)"],_shouldHaveListener:!0,_scrollTargetChanged:function(scrollTarget,isAttached){if(this._oldScrollTarget&&(this._toggleScrollListener(!1,this._oldScrollTarget),this._oldScrollTarget=null),isAttached)if("document"===scrollTarget)this.scrollTarget=this._doc;else if("string"==typeof scrollTarget){var domHost=this.domHost;this.scrollTarget=domHost&&domHost.$?domHost.$[scrollTarget]:(0,polymer_dom.tT)(this.ownerDocument).querySelector("#"+scrollTarget)}else this._isValidScrollTarget()&&(this._oldScrollTarget=scrollTarget,this._toggleScrollListener(this._shouldHaveListener,scrollTarget))},_scrollHandler:function scrollHandler(){},get _defaultScrollTarget(){return this._doc},get _doc(){return this.ownerDocument.documentElement},get _scrollTop(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageYOffset:this.scrollTarget.scrollTop:0},get _scrollLeft(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.pageXOffset:this.scrollTarget.scrollLeft:0},set _scrollTop(top){this.scrollTarget===this._doc?window.scrollTo(window.pageXOffset,top):this._isValidScrollTarget()&&(this.scrollTarget.scrollTop=top)},set _scrollLeft(left){this.scrollTarget===this._doc?window.scrollTo(left,window.pageYOffset):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=left)},scroll:function(leftOrOptions,top){var left;"object"==typeof leftOrOptions?(left=leftOrOptions.left,top=leftOrOptions.top):left=leftOrOptions,left=left||0,top=top||0,this.scrollTarget===this._doc?window.scrollTo(left,top):this._isValidScrollTarget()&&(this.scrollTarget.scrollLeft=left,this.scrollTarget.scrollTop=top)},get _scrollTargetWidth(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerWidth:this.scrollTarget.offsetWidth:0},get _scrollTargetHeight(){return this._isValidScrollTarget()?this.scrollTarget===this._doc?window.innerHeight:this.scrollTarget.offsetHeight:0},_isValidScrollTarget:function(){return this.scrollTarget instanceof HTMLElement},_toggleScrollListener:function(yes,scrollTarget){var eventTarget=scrollTarget===this._doc?window:scrollTarget;yes?this._boundScrollHandler||(this._boundScrollHandler=this._scrollHandler.bind(this),eventTarget.addEventListener("scroll",this._boundScrollHandler)):this._boundScrollHandler&&(eventTarget.removeEventListener("scroll",this._boundScrollHandler),this._boundScrollHandler=null)},toggleScrollListener:function(yes){this._shouldHaveListener=yes,this._toggleScrollListener(yes,this.scrollTarget)}};var mutable_data_behavior=__webpack_require__("./node_modules/@polymer/polymer/lib/legacy/mutable-data-behavior.js"),templatizer_behavior=__webpack_require__("./node_modules/@polymer/polymer/lib/legacy/templatizer-behavior.js"),path=__webpack_require__("./node_modules/@polymer/polymer/lib/utils/path.js"),IOS=(__webpack_require__("./node_modules/@polymer/polymer/lib/utils/templatize.js"),navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/)),IOS_TOUCH_SCROLLING=IOS&&IOS[1]>=8;(0,polymer_fn.b)({_template:html_tag.q`
    <style>
      :host {
        display: block;
      }

      @media only screen and (-webkit-max-device-pixel-ratio: 1) {
        :host {
          will-change: transform;
        }
      }

      #items {
        @apply --iron-list-items-container;
        position: relative;
      }

      :host(:not([grid])) #items > ::slotted(*) {
        width: 100%;
      }

      #items > ::slotted(*) {
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
      }
    </style>

    <array-selector id="selector" items="{{items}}" selected="{{selectedItems}}" selected-item="{{selectedItem}}"></array-selector>

    <div id="items">
      <slot></slot>
    </div>
`,is:"iron-list",properties:{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},selectedAs:{type:String,value:"selected"},grid:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_gridChanged"},selectionEnabled:{type:Boolean,value:!1},selectedItem:{type:Object,notify:!0},selectedItems:{type:Object,notify:!0},multiSelection:{type:Boolean,value:!1},scrollOffset:{type:Number,value:0}},observers:["_itemsChanged(items.*)","_selectionEnabledChanged(selectionEnabled)","_multiSelectionChanged(multiSelection)","_setOverflow(scrollTarget, scrollOffset)"],behaviors:[templatizer_behavior.C,IronResizableBehavior,IronScrollTargetBehavior,mutable_data_behavior.N],_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_focusedItem:null,_focusedVirtualIndex:-1,_focusedPhysicalIndex:-1,_offscreenFocusedItem:null,_focusBackfillItem:null,_itemsPerRow:1,_itemWidth:0,_rowHeight:0,_templateCost:0,_parentModel:!0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return(this.grid?this._physicalRows*this._rowHeight:this._physicalSize)-this._viewportHeight},get _itemsParent(){return(0,polymer_dom.tT)((0,polymer_dom.tT)(this._userTemplate).parentNode)},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){var virtualCount=this._convertIndexToCompleteRow(this._virtualCount);return Math.max(0,virtualCount-this._physicalCount)},set _virtualStart(val){val=this._clamp(val,0,this._maxVirtualStart),this.grid&&(val-=val%this._itemsPerRow),this._virtualStartVal=val},get _virtualStart(){return this._virtualStartVal||0},set _physicalStart(val){(val%=this._physicalCount)<0&&(val=this._physicalCount+val),this.grid&&(val-=val%this._itemsPerRow),this._physicalStartVal=val},get _physicalStart(){return this._physicalStartVal||0},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(val){this._physicalCountVal=val},get _physicalCount(){return this._physicalCountVal||0},get _optPhysicalSize(){return 0===this._viewportHeight?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return Boolean(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){var idx=this._firstVisibleIndexVal;if(null==idx){var physicalOffset=this._physicalTop+this._scrollOffset;idx=this._iterateItems((function(pidx,vidx){return(physicalOffset+=this._getPhysicalSizeIncrement(pidx))>this._scrollPosition?this.grid?vidx-vidx%this._itemsPerRow:vidx:this.grid&&this._virtualCount-1===vidx?vidx-vidx%this._itemsPerRow:void 0}))||0,this._firstVisibleIndexVal=idx}return idx},get lastVisibleIndex(){var idx=this._lastVisibleIndexVal;if(null==idx){if(this.grid)idx=Math.min(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1);else{var physicalOffset=this._physicalTop+this._scrollOffset;this._iterateItems((function(pidx,vidx){physicalOffset<this._scrollBottom&&(idx=vidx),physicalOffset+=this._getPhysicalSizeIncrement(pidx)}))}this._lastVisibleIndexVal=idx}return idx},get _defaultScrollTarget(){return this},get _virtualRowCount(){return Math.ceil(this._virtualCount/this._itemsPerRow)},get _estRowsInView(){return Math.ceil(this._viewportHeight/this._rowHeight)},get _physicalRows(){return Math.ceil(this._physicalCount/this._itemsPerRow)},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},ready:function(){this.addEventListener("focus",this._didFocus.bind(this),!0)},attached:function(){this._debounce("_render",this._render,utils_async.G$),this.listen(this,"iron-resize","_resizeHandler"),this.listen(this,"keydown","_keydownHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler"),this.unlisten(this,"keydown","_keydownHandler")},_setOverflow:function(scrollTarget){this.style.webkitOverflowScrolling=scrollTarget===this?"touch":"",this.style.overflowY=scrollTarget===this?"auto":"",this._lastVisibleIndexVal=null,this._firstVisibleIndexVal=null,this._debounce("_render",this._render,utils_async.G$)},updateViewportBoundaries:function(){var styles=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(styles["padding-top"],10),this._isRTL=Boolean("rtl"===styles.direction),this._viewportWidth=this.$.items.offsetWidth,this._viewportHeight=this._scrollTargetHeight,this.grid&&this._updateGridMetrics()},_scrollHandler:function(){var scrollTop=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),delta=scrollTop-this._scrollPosition,isScrollingDown=delta>=0;if(this._scrollPosition=scrollTop,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(delta)>this._physicalSize&&this._physicalSize>0){delta-=this._scrollOffset;var idxAdjustment=Math.round(delta/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+idxAdjustment,this._physicalStart=this._physicalStart+idxAdjustment,this._physicalTop=Math.min(Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){var reusables=this._getReusables(isScrollingDown);isScrollingDown?(this._physicalTop=reusables.physicalTop,this._virtualStart=this._virtualStart+reusables.indexes.length,this._physicalStart=this._physicalStart+reusables.indexes.length):(this._virtualStart=this._virtualStart-reusables.indexes.length,this._physicalStart=this._physicalStart-reusables.indexes.length),this._update(reusables.indexes,isScrollingDown?null:reusables.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),utils_async._3)}},_getReusables:function(fromTop){var ith,offsetContent,physicalItemHeight,idxs=[],protectedOffsetContent=this._hiddenContentSize*this._ratio,virtualStart=this._virtualStart,virtualEnd=this._virtualEnd,physicalCount=this._physicalCount,top=this._physicalTop+this._scrollOffset,bottom=this._physicalBottom+this._scrollOffset,scrollTop=this._scrollPosition,scrollBottom=this._scrollBottom;for(fromTop?(ith=this._physicalStart,this._physicalEnd,offsetContent=scrollTop-top):(ith=this._physicalEnd,this._physicalStart,offsetContent=bottom-scrollBottom);offsetContent-=physicalItemHeight=this._getPhysicalSizeIncrement(ith),!(idxs.length>=physicalCount||offsetContent<=protectedOffsetContent);)if(fromTop){if(virtualEnd+idxs.length+1>=this._virtualCount)break;if(top+physicalItemHeight>=scrollTop-this._scrollOffset)break;idxs.push(ith),top+=physicalItemHeight,ith=(ith+1)%physicalCount}else{if(virtualStart-idxs.length<=0)break;if(top+this._physicalSize-physicalItemHeight<=scrollBottom)break;idxs.push(ith),top-=physicalItemHeight,ith=0===ith?physicalCount-1:ith-1}return{indexes:idxs,physicalTop:top-this._scrollOffset}},_update:function(itemSet,movingUp){if(!(itemSet&&0===itemSet.length||0===this._physicalCount)){if(this._manageFocus(),this._assignModels(itemSet),this._updateMetrics(itemSet),movingUp)for(;movingUp.length;){var idx=movingUp.pop();this._physicalTop-=this._getPhysicalSizeIncrement(idx)}this._positionItems(),this._updateScrollerSize()}},_createPool:function(size){var i,inst;this._ensureTemplatized();var physicalItems=new Array(size);for(i=0;i<size;i++)inst=this.stamp(null),physicalItems[i]=inst.root.querySelector("*"),this._itemsParent.appendChild(inst.root);return physicalItems},_isClientFull:function(){return 0!=this._scrollBottom&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded:function(count){var nextPhysicalCount=this._clamp(this._physicalCount+count,3,this._virtualCount-this._virtualStart);if(nextPhysicalCount=this._convertIndexToCompleteRow(nextPhysicalCount),this.grid){var correction=nextPhysicalCount%this._itemsPerRow;correction&&nextPhysicalCount-correction<=this._physicalCount&&(nextPhysicalCount+=this._itemsPerRow),nextPhysicalCount-=correction}var delta=nextPhysicalCount-this._physicalCount,nextIncrease=Math.round(.5*this._physicalCount);if(!(delta<0)){if(delta>0){var ts=window.performance.now();[].push.apply(this._physicalItems,this._createPool(delta));for(var i=0;i<delta;i++)this._physicalSizes.push(0);this._physicalCount=this._physicalCount+delta,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart=this._physicalStart+delta),this._update(),this._templateCost=(window.performance.now()-ts)/delta,nextIncrease=Math.round(.5*this._physicalCount)}this._virtualEnd>=this._virtualCount-1||0===nextIncrease||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,nextIncrease)),utils_async.g8):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,nextIncrease),utils_async._3))}},_render:function(){if(this.isAttached&&this._isVisible)if(0!==this._physicalCount){var reusables=this._getReusables(!0);this._physicalTop=reusables.physicalTop,this._virtualStart=this._virtualStart+reusables.indexes.length,this._physicalStart=this._physicalStart+reusables.indexes.length,this._update(reusables.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(3))},_ensureTemplatized:function(){if(!this.ctor){this._userTemplate=this.queryEffectiveChildren("template"),this._userTemplate||console.warn("iron-list requires a template to be provided in light-dom");var instanceProps={__key__:!0};instanceProps[this.as]=!0,instanceProps[this.indexAs]=!0,instanceProps[this.selectedAs]=!0,instanceProps.tabIndex=!0,this._instanceProps=instanceProps,this.templatize(this._userTemplate,this.mutableData)}},_gridChanged:function(newGrid,oldGrid){void 0!==oldGrid&&(this.notifyResize(),(0,flush.b)(),newGrid&&this._updateGridMetrics())},_itemsChanged:function(change){if("items"===change.path)this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalCount=this._physicalCount||0,this._physicalItems=this._physicalItems||[],this._physicalSizes=this._physicalSizes||[],this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._removeFocusedItem(),this._debounce("_render",this._render,utils_async.G$);else if("items.splices"===change.path){if(this._adjustVirtualIndex(change.value.indexSplices),this._virtualCount=this.items?this.items.length:0,change.value.indexSplices.some((function(splice){return splice.addedCount>0||splice.removed.length>0}))){var activeElement=this._getActiveElement();this.contains(activeElement)&&activeElement.blur()}var affectedIndexRendered=change.value.indexSplices.some((function(splice){return splice.index+splice.addedCount>=this._virtualStart&&splice.index<=this._virtualEnd}),this);this._isClientFull()&&!affectedIndexRendered||this._debounce("_render",this._render,utils_async.G$)}else"items.length"!==change.path&&this._forwardItemPath(change.path,change.value)},_forwardItemPath:function(path,value){var isIndexRendered,pidx,inst,dot=(path=path.slice(6)).indexOf(".");-1===dot&&(dot=path.length);var offscreenInstance=this.modelForElement(this._offscreenFocusedItem),vidx=parseInt(path.substring(0,dot),10);(isIndexRendered=this._isIndexRendered(vidx))?(pidx=this._getPhysicalIndex(vidx),inst=this.modelForElement(this._physicalItems[pidx])):offscreenInstance&&(inst=offscreenInstance),inst&&inst[this.indexAs]===vidx&&(path=path.substring(dot+1),path=this.as+(path?"."+path:""),inst._setPendingPropertyOrPath(path,value,!1,!0),inst._flushProperties&&inst._flushProperties(),isIndexRendered&&(this._updateMetrics([pidx]),this._positionItems(),this._updateScrollerSize()))},_adjustVirtualIndex:function(splices){splices.forEach((function(splice){if(splice.removed.forEach(this._removeItem,this),splice.index<this._virtualStart){var delta=Math.max(splice.addedCount-splice.removed.length,splice.index-this._virtualStart);this._virtualStart=this._virtualStart+delta,this._focusedVirtualIndex>=0&&(this._focusedVirtualIndex=this._focusedVirtualIndex+delta)}}),this)},_removeItem:function(item){this.$.selector.deselect(item),this._focusedItem&&this.modelForElement(this._focusedItem)[this.as]===item&&this._removeFocusedItem()},_iterateItems:function(fn,itemSet){var pidx,vidx,rtn,i;if(2===arguments.length&&itemSet){for(i=0;i<itemSet.length;i++)if(pidx=itemSet[i],vidx=this._computeVidx(pidx),null!=(rtn=fn.call(this,pidx,vidx)))return rtn}else{for(pidx=this._physicalStart,vidx=this._virtualStart;pidx<this._physicalCount;pidx++,vidx++)if(null!=(rtn=fn.call(this,pidx,vidx)))return rtn;for(pidx=0;pidx<this._physicalStart;pidx++,vidx++)if(null!=(rtn=fn.call(this,pidx,vidx)))return rtn}},_computeVidx:function(pidx){return pidx>=this._physicalStart?this._virtualStart+(pidx-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+pidx},_assignModels:function(itemSet){this._iterateItems((function(pidx,vidx){var el=this._physicalItems[pidx],item=this.items&&this.items[vidx];if(null!=item){var inst=this.modelForElement(el);inst.__key__=null,this._forwardProperty(inst,this.as,item),this._forwardProperty(inst,this.selectedAs,this.$.selector.isSelected(item)),this._forwardProperty(inst,this.indexAs,vidx),this._forwardProperty(inst,"tabIndex",this._focusedVirtualIndex===vidx?0:-1),this._physicalIndexForKey[inst.__key__]=pidx,inst._flushProperties&&inst._flushProperties(!0),el.removeAttribute("hidden")}else el.setAttribute("hidden","")}),itemSet)},_updateMetrics:function(itemSet){(0,flush.b)();var newPhysicalSize=0,oldPhysicalSize=0,prevAvgCount=this._physicalAverageCount,prevPhysicalAvg=this._physicalAverage;this._iterateItems((function(pidx,vidx){oldPhysicalSize+=this._physicalSizes[pidx],this._physicalSizes[pidx]=this._physicalItems[pidx].offsetHeight,newPhysicalSize+=this._physicalSizes[pidx],this._physicalAverageCount+=this._physicalSizes[pidx]?1:0}),itemSet),this.grid?(this._updateGridMetrics(),this._physicalSize=Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight):(oldPhysicalSize=1===this._itemsPerRow?oldPhysicalSize:Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight,this._physicalSize=this._physicalSize+newPhysicalSize-oldPhysicalSize,this._itemsPerRow=1),this._physicalAverageCount!==prevAvgCount&&(this._physicalAverage=Math.round((prevPhysicalAvg*prevAvgCount+newPhysicalSize)/this._physicalAverageCount))},_updateGridMetrics:function(){this._itemWidth=this._physicalCount>0?this._physicalItems[0].getBoundingClientRect().width:200,this._rowHeight=this._physicalCount>0?this._physicalItems[0].offsetHeight:200,this._itemsPerRow=this._itemWidth?Math.floor(this._viewportWidth/this._itemWidth):this._itemsPerRow},_positionItems:function(){this._adjustScrollPosition();var y=this._physicalTop;if(this.grid){var totalItemWidth=this._itemsPerRow*this._itemWidth,rowOffset=(this._viewportWidth-totalItemWidth)/2;this._iterateItems((function(pidx,vidx){var modulus=vidx%this._itemsPerRow,x=Math.floor(modulus*this._itemWidth+rowOffset);this._isRTL&&(x*=-1),this.translate3d(x+"px",y+"px",0,this._physicalItems[pidx]),this._shouldRenderNextRow(vidx)&&(y+=this._rowHeight)}))}else{const order=[];this._iterateItems((function(pidx,vidx){const item=this._physicalItems[pidx];this.translate3d(0,y+"px",0,item),y+=this._physicalSizes[pidx];const itemId=item.id;itemId&&order.push(itemId)})),order.length&&this.setAttribute("aria-owns",order.join(" "))}},_getPhysicalSizeIncrement:function(pidx){return this.grid?this._computeVidx(pidx)%this._itemsPerRow!=this._itemsPerRow-1?0:this._rowHeight:this._physicalSizes[pidx]},_shouldRenderNextRow:function(vidx){return vidx%this._itemsPerRow==this._itemsPerRow-1},_adjustScrollPosition:function(){var deltaHeight=0===this._virtualStart?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(0!==deltaHeight){this._physicalTop=this._physicalTop-deltaHeight;var scrollTop=this._scrollPosition;!IOS_TOUCH_SCROLLING&&scrollTop>0&&this._resetScrollPosition(scrollTop-deltaHeight)}},_resetScrollPosition:function(pos){this.scrollTarget&&pos>=0&&(this._scrollTop=pos,this._scrollPosition=this._scrollTop)},_updateScrollerSize:function(forceUpdate){this.grid?this._estScrollHeight=this._virtualRowCount*this._rowHeight:this._estScrollHeight=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage,((forceUpdate=(forceUpdate=(forceUpdate=forceUpdate||0===this._scrollHeight)||this._scrollPosition>=this._estScrollHeight-this._physicalSize)||this.grid&&this.$.items.style.height<this._estScrollHeight)||Math.abs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=this._estScrollHeight+"px",this._scrollHeight=this._estScrollHeight)},scrollToItem:function(item){return this.scrollToIndex(this.items.indexOf(item))},scrollToIndex:function(idx){if(!("number"!=typeof idx||idx<0||idx>this.items.length-1)&&((0,flush.b)(),0!==this._physicalCount)){idx=this._clamp(idx,0,this._virtualCount-1),(!this._isIndexRendered(idx)||idx>=this._maxVirtualStart)&&(this._virtualStart=this.grid?idx-2*this._itemsPerRow:idx-1),this._manageFocus(),this._assignModels(),this._updateMetrics(),this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;for(var currentTopItem=this._physicalStart,currentVirtualItem=this._virtualStart,targetOffsetTop=0,hiddenContentSize=this._hiddenContentSize;currentVirtualItem<idx&&targetOffsetTop<=hiddenContentSize;)targetOffsetTop+=this._getPhysicalSizeIncrement(currentTopItem),currentTopItem=(currentTopItem+1)%this._physicalCount,currentVirtualItem++;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+targetOffsetTop),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null}},_resetAverage:function(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler:function(){this._debounce("_render",(function(){this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)}),utils_async.G$)},selectItem:function(item){return this.selectIndex(this.items.indexOf(item))},selectIndex:function(index){if(!(index<0||index>=this._virtualCount)){if(!this.multiSelection&&this.selectedItem&&this.clearSelection(),this._isIndexRendered(index)){var model=this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);model&&(model[this.selectedAs]=!0),this.updateSizeForIndex(index)}this.$.selector.selectIndex(index)}},deselectItem:function(item){return this.deselectIndex(this.items.indexOf(item))},deselectIndex:function(index){if(!(index<0||index>=this._virtualCount)){if(this._isIndexRendered(index))this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)])[this.selectedAs]=!1,this.updateSizeForIndex(index);this.$.selector.deselectIndex(index)}},toggleSelectionForItem:function(item){return this.toggleSelectionForIndex(this.items.indexOf(item))},toggleSelectionForIndex:function(index){(this.$.selector.isIndexSelected?this.$.selector.isIndexSelected(index):this.$.selector.isSelected(this.items[index]))?this.deselectIndex(index):this.selectIndex(index)},clearSelection:function(){this._iterateItems((function(pidx,vidx){this.modelForElement(this._physicalItems[pidx])[this.selectedAs]=!1})),this.$.selector.clearSelection()},_selectionEnabledChanged:function(selectionEnabled){(selectionEnabled?this.listen:this.unlisten).call(this,this,"tap","_selectionHandler")},_selectionHandler:function(e){var model=this.modelForElement(e.target);if(model){var modelTabIndex,activeElTabIndex,target=(0,polymer_dom.tT)(e).path[0],activeEl=this._getActiveElement(),physicalItem=this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];"input"!==target.localName&&"button"!==target.localName&&"select"!==target.localName&&(modelTabIndex=model.tabIndex,model.tabIndex=-100,activeElTabIndex=activeEl?activeEl.tabIndex:-1,model.tabIndex=modelTabIndex,activeEl&&physicalItem!==activeEl&&physicalItem.contains(activeEl)&&-100!==activeElTabIndex||this.toggleSelectionForItem(model[this.as]))}},_multiSelectionChanged:function(multiSelection){this.clearSelection(),this.$.selector.multi=multiSelection},updateSizeForItem:function(item){return this.updateSizeForIndex(this.items.indexOf(item))},updateSizeForIndex:function(index){return this._isIndexRendered(index)?(this._updateMetrics([this._getPhysicalIndex(index)]),this._positionItems(),null):null},_manageFocus:function(){var fidx=this._focusedVirtualIndex;fidx>=0&&fidx<this._virtualCount?this._isIndexRendered(fidx)?this._restoreFocusedItem():this._createFocusBackfillItem():this._virtualCount>0&&this._physicalCount>0&&(this._focusedPhysicalIndex=this._physicalStart,this._focusedVirtualIndex=this._virtualStart,this._focusedItem=this._physicalItems[this._physicalStart])},_convertIndexToCompleteRow:function(idx){return this._itemsPerRow=this._itemsPerRow||1,this.grid?Math.ceil(idx/this._itemsPerRow)*this._itemsPerRow:idx},_isIndexRendered:function(idx){return idx>=this._virtualStart&&idx<=this._virtualEnd},_isIndexVisible:function(idx){return idx>=this.firstVisibleIndex&&idx<=this.lastVisibleIndex},_getPhysicalIndex:function(vidx){return(this._physicalStart+(vidx-this._virtualStart))%this._physicalCount},focusItem:function(idx){this._focusPhysicalItem(idx)},_focusPhysicalItem:function(idx){if(!(idx<0||idx>=this._virtualCount)){this._restoreFocusedItem(),this._isIndexRendered(idx)||this.scrollToIndex(idx);var focusable,physicalItem=this._physicalItems[this._getPhysicalIndex(idx)],model=this.modelForElement(physicalItem);model.tabIndex=-100,-100===physicalItem.tabIndex&&(focusable=physicalItem),focusable||(focusable=(0,polymer_dom.tT)(physicalItem).querySelector('[tabindex="-100"]')),model.tabIndex=0,this._focusedVirtualIndex=idx,focusable&&focusable.focus()}},_removeFocusedItem:function(){this._offscreenFocusedItem&&this._itemsParent.removeChild(this._offscreenFocusedItem),this._offscreenFocusedItem=null,this._focusBackfillItem=null,this._focusedItem=null,this._focusedVirtualIndex=-1,this._focusedPhysicalIndex=-1},_createFocusBackfillItem:function(){var fpidx=this._focusedPhysicalIndex;if(!(this._offscreenFocusedItem||this._focusedVirtualIndex<0)){if(!this._focusBackfillItem){var inst=this.stamp(null);this._focusBackfillItem=inst.root.querySelector("*"),this._itemsParent.appendChild(inst.root)}this._offscreenFocusedItem=this._physicalItems[fpidx],this.modelForElement(this._offscreenFocusedItem).tabIndex=0,this._physicalItems[fpidx]=this._focusBackfillItem,this._focusedPhysicalIndex=fpidx,this.translate3d(0,"-10000px",0,this._offscreenFocusedItem)}},_restoreFocusedItem:function(){if(this._offscreenFocusedItem&&!(this._focusedVirtualIndex<0)){this._assignModels();var fpidx=this._focusedPhysicalIndex=this._getPhysicalIndex(this._focusedVirtualIndex),onScreenItem=this._physicalItems[fpidx];if(onScreenItem){var onScreenInstance=this.modelForElement(onScreenItem),offScreenInstance=this.modelForElement(this._offscreenFocusedItem);onScreenInstance[this.as]===offScreenInstance[this.as]?(this._focusBackfillItem=onScreenItem,onScreenInstance.tabIndex=-1,this._physicalItems[fpidx]=this._offscreenFocusedItem,this.translate3d(0,"-10000px",0,this._focusBackfillItem)):(this._removeFocusedItem(),this._focusBackfillItem=null),this._offscreenFocusedItem=null}}},_didFocus:function(e){var targetModel=this.modelForElement(e.target),focusedModel=this.modelForElement(this._focusedItem),hasOffscreenFocusedItem=null!==this._offscreenFocusedItem,fidx=this._focusedVirtualIndex;targetModel&&(focusedModel===targetModel?this._isIndexVisible(fidx)||this.scrollToIndex(fidx):(this._restoreFocusedItem(),focusedModel&&(focusedModel.tabIndex=-1),targetModel.tabIndex=0,fidx=targetModel[this.indexAs],this._focusedVirtualIndex=fidx,this._focusedPhysicalIndex=this._getPhysicalIndex(fidx),this._focusedItem=this._physicalItems[this._focusedPhysicalIndex],hasOffscreenFocusedItem&&!this._offscreenFocusedItem&&this._update()))},_keydownHandler:function(e){switch(e.keyCode){case 40:this._focusedVirtualIndex<this._virtualCount-1&&e.preventDefault(),this._focusPhysicalItem(this._focusedVirtualIndex+(this.grid?this._itemsPerRow:1));break;case 39:this.grid&&this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?-1:1));break;case 38:this._focusedVirtualIndex>0&&e.preventDefault(),this._focusPhysicalItem(this._focusedVirtualIndex-(this.grid?this._itemsPerRow:1));break;case 37:this.grid&&this._focusPhysicalItem(this._focusedVirtualIndex+(this._isRTL?1:-1));break;case 13:this._focusPhysicalItem(this._focusedVirtualIndex),this.selectionEnabled&&this._selectionHandler(e)}},_clamp:function(v,min,max){return Math.min(max,Math.max(min,v))},_debounce:function(name,cb,asyncModule){this._debouncers=this._debouncers||{},this._debouncers[name]=debounce.aq.debounce(this._debouncers[name],asyncModule,cb.bind(this)),(0,flush.O)(this._debouncers[name])},_forwardProperty:function(inst,name,value){inst._setPendingProperty(name,value)},_forwardHostPropV2:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){item&&this.modelForElement(item).forwardHostProp(prop,value)}),this)},_notifyInstancePropV2:function(inst,prop,value){if((0,path.cK)(this.as,prop)){var idx=inst[this.indexAs];prop==this.as&&(this.items[idx]=value),this.notifyPath((0,path.Tl)(this.as,"items."+idx,prop),value)}},_getStampedChildren:function(){return this._physicalItems},_forwardInstancePath:function(inst,path,value){0===path.indexOf(this.as+".")&&this.notifyPath("items."+inst.__key__+"."+path.slice(this.as.length+1),value)},_forwardParentPath:function(path,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){item&&this.modelForElement(item).notifyPath(path,value)}),this)},_forwardParentProp:function(prop,value){(this._physicalItems||[]).concat([this._offscreenFocusedItem,this._focusBackfillItem]).forEach((function(item){item&&(this.modelForElement(item)[prop]=value)}),this)},_getActiveElement:function(){var itemsHost=this._itemsParent.node.domHost;return(0,polymer_dom.tT)(itemsHost?itemsHost.root:document).activeElement}});var vaadin_dir_mixin=__webpack_require__("./node_modules/@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js");class ComboBoxItemElement extends((0,vaadin_themable_mixin.c)((0,vaadin_dir_mixin.v)(polymer_element.Pu))){static get template(){return polymer_element.qy`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
      </style>
      <div part="content" id="content"></div>
    `}static get is(){return"vaadin-combo-box-item"}static get properties(){return{index:Number,item:Object,label:String,selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:Function,_oldRenderer:Function}}static get observers(){return["__rendererOrItemChanged(renderer, index, item.*, selected, focused)","__updateLabel(label, renderer)"]}connectedCallback(){super.connectedCallback();const comboBoxOverlay=this.getRootNode().host.getRootNode().host.__dataHost.getRootNode().host;this._comboBox=comboBoxOverlay.getRootNode().host;const hostDir=this._comboBox.getAttribute("dir");hostDir&&this.setAttribute("dir",hostDir)}requestContentUpdate(){if(!this.renderer)return;const model={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this.$.content,this._comboBox,model)}__rendererOrItemChanged(renderer,index,item,_selected,_focused){void 0!==item&&void 0!==index&&(this._oldRenderer!==renderer&&(this.$.content.innerHTML="",delete this.$.content._$litPart$),renderer&&(this._oldRenderer=renderer,this.requestContentUpdate()))}__updateLabel(label,renderer){renderer||this.$.content&&(this.$.content.textContent=label)}}customElements.define(ComboBoxItemElement.is,ComboBoxItemElement);var legacy_class=__webpack_require__("./node_modules/@polymer/polymer/lib/legacy/class.js"),disable_upgrade_mixin=__webpack_require__("./node_modules/@polymer/polymer/lib/mixins/disable-upgrade-mixin.js");(0,register_styles.SF)("vaadin-combo-box-overlay",register_styles.AH`
    :host {
      width: var(--vaadin-combo-box-overlay-width, var(--_vaadin-combo-box-overlay-default-width, auto));
    }
  `,{moduleId:"vaadin-combo-box-overlay-styles"});let memoizedTemplate;class ComboBoxOverlayElement extends vaadin_overlay.h{static get is(){return"vaadin-combo-box-overlay"}static get template(){return memoizedTemplate||(memoizedTemplate=super.template.cloneNode(!0),memoizedTemplate.content.querySelector('[part~="overlay"]').removeAttribute("tabindex")),memoizedTemplate}connectedCallback(){super.connectedCallback();const comboBoxOverlay=this.__dataHost.getRootNode().host,comboBox=comboBoxOverlay&&comboBoxOverlay.getRootNode().host,hostDir=comboBox&&comboBox.getAttribute("dir");hostDir&&this.setAttribute("dir",hostDir)}ready(){super.ready();const loader=document.createElement("div");loader.setAttribute("part","loader");const content=this.shadowRoot.querySelector('[part~="content"]');content.parentNode.insertBefore(loader,content)}}customElements.define(ComboBoxOverlayElement.is,ComboBoxOverlayElement);class ComboBoxDropdownElement extends((0,disable_upgrade_mixin.o)((0,legacy_class.Z)(IronResizableBehavior,polymer_element.Pu))){static get template(){return polymer_element.qy`
      <style>
        :host {
          display: block;
        }

        :host > #overlay {
          display: none;
        }
      </style>
      <vaadin-combo-box-overlay
        id="overlay"
        hidden$="[[hidden]]"
        opened="[[opened]]"
        style="align-items: stretch; margin: 0;"
        theme$="[[theme]]"
      >
        <slot></slot>
      </vaadin-combo-box-overlay>
    `}static get is(){return"vaadin-combo-box-dropdown"}static get properties(){return{opened:{type:Boolean,observer:"_openedChanged"},positionTarget:{type:Object},alignedAbove:{type:Boolean,value:!1},theme:String}}constructor(){super(),this._boundSetPosition=this._setPosition.bind(this),this._boundOutsideClickListener=this._outsideClickListener.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("iron-resize",this._boundSetPosition)}ready(){super.ready(),this.$.overlay.addEventListener("vaadin-overlay-outside-click",(e=>{e.preventDefault()}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("iron-resize",this._boundSetPosition),this.opened=!1}notifyResize(){super.notifyResize(),this.positionTarget&&this.opened&&(this._setPosition(),requestAnimationFrame(this._setPosition.bind(this)))}_openedChanged(opened,oldValue){!!opened!=!!oldValue&&(opened?(this.$.overlay.style.position=this._isPositionFixed(this.positionTarget)?"fixed":"absolute",this._setPosition(),window.addEventListener("scroll",this._boundSetPosition,!0),document.addEventListener("click",this._boundOutsideClickListener,!0),this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-opened",{bubbles:!0,composed:!0}))):this.__emptyItems||(window.removeEventListener("scroll",this._boundSetPosition,!0),document.removeEventListener("click",this._boundOutsideClickListener,!0),this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-closed",{bubbles:!0,composed:!0}))))}_outsideClickListener(event){const eventPath=event.composedPath();eventPath.indexOf(this.positionTarget)<0&&eventPath.indexOf(this.$.overlay)<0&&(this.opened=!1)}_isPositionFixed(element){const offsetParent=this._getOffsetParent(element);return"fixed"===window.getComputedStyle(element).position||offsetParent&&this._isPositionFixed(offsetParent)}_getOffsetParent(element){if(element.assignedSlot)return element.assignedSlot.parentElement;if(element.parentElement)return element.offsetParent;const parent=element.parentNode;return parent&&11===parent.nodeType&&parent.host?parent.host:void 0}_verticalOffset(overlayRect,targetRect){return this.alignedAbove?-overlayRect.height:targetRect.height}_shouldAlignLeft(targetRect){return(window.innerWidth-targetRect.right)/window.innerWidth<.3}_shouldAlignAbove(targetRect){return(window.innerHeight-targetRect.bottom-Math.min(document.body.scrollTop,0))/window.innerHeight<.3}_setOverlayWidth(){const inputWidth=this.positionTarget.clientWidth+"px",customWidth=getComputedStyle(this).getPropertyValue("--vaadin-combo-box-overlay-width");this.$.overlay.style.setProperty("--_vaadin-combo-box-overlay-default-width",inputWidth),""===customWidth?this.$.overlay.style.removeProperty("--vaadin-combo-box-overlay-width"):this.$.overlay.style.setProperty("--vaadin-combo-box-overlay-width",customWidth)}_setPosition(e){if(this.hidden)return;if(e&&e.target){const target=e.target===document?document.body:e.target,parent=this.$.overlay.parentElement;if(!target.contains(this.$.overlay)&&!target.contains(this.positionTarget)||parent!==document.body)return}const targetRect=this.positionTarget.getBoundingClientRect(),alignedLeft=this._shouldAlignLeft(targetRect);this.alignedAbove=this._shouldAlignAbove(targetRect);const overlayRect=this.$.overlay.getBoundingClientRect();this._translateX=alignedLeft?targetRect.right-overlayRect.right+(this._translateX||0):targetRect.left-overlayRect.left+(this._translateX||0),this._translateY=targetRect.top-overlayRect.top+(this._translateY||0)+this._verticalOffset(overlayRect,targetRect);const _devicePixelRatio=window.devicePixelRatio||1;this._translateX=Math.round(this._translateX*_devicePixelRatio)/_devicePixelRatio,this._translateY=Math.round(this._translateY*_devicePixelRatio)/_devicePixelRatio,this.$.overlay.style.transform=`translate3d(${this._translateX}px, ${this._translateY}px, 0)`,this.$.overlay.style.justifyContent=this.alignedAbove?"flex-end":"flex-start",this._setOverlayWidth(),this.dispatchEvent(new CustomEvent("position-changed"))}}customElements.define(ComboBoxDropdownElement.is,ComboBoxDropdownElement);const TOUCH_DEVICE=(()=>{try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}})();class ComboBoxDropdownWrapperElement extends polymer_element.Pu{static get template(){return polymer_element.qy`
      <vaadin-combo-box-dropdown
        id="dropdown"
        hidden="[[_hidden(_items.*, loading)]]"
        position-target="[[positionTarget]]"
        on-position-changed="_setOverlayHeight"
        disable-upgrade=""
        theme="[[theme]]"
      >
        <template>
          <style>
            #scroller {
              overflow: auto;

              /* Fixes item background from getting on top of scrollbars on Safari */
              transform: translate3d(0, 0, 0);

              /* Enable momentum scrolling on iOS (iron-list v1.2+ no longer does it for us) */
              -webkit-overflow-scrolling: touch;

              /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
              box-shadow: 0 0 0 white;
            }
          </style>
          <div id="scroller" on-click="_stopPropagation">
            <iron-list id="selector" role="listbox" items="[[_getItems(opened, _items)]]" scroll-target="[[_scroller]]">
              <template>
                <vaadin-combo-box-item
                  on-click="_onItemClick"
                  index="[[__requestItemByIndex(item, index, _resetScrolling)]]"
                  item="[[item]]"
                  label="[[getItemLabel(item, _itemLabelPath)]]"
                  selected="[[_isItemSelected(item, _selectedItem, _itemIdPath)]]"
                  renderer="[[renderer]]"
                  role$="[[_getAriaRole(index)]]"
                  aria-selected$="[[_getAriaSelected(_focusedIndex,index)]]"
                  focused="[[_isItemFocused(_focusedIndex,index)]]"
                  tabindex="-1"
                  theme$="[[theme]]"
                ></vaadin-combo-box-item>
              </template>
            </iron-list>
          </div>
        </template>
      </vaadin-combo-box-dropdown>
    `}static get is(){return"vaadin-combo-box-dropdown-wrapper"}static get properties(){return{touchDevice:{type:Boolean,value:TOUCH_DEVICE},opened:Boolean,positionTarget:{type:Object},renderer:Function,loading:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_setOverlayHeight"},theme:String,filterChanged:{type:Boolean,value:!1},_resetScrolling:{type:Boolean,value:!1},_selectedItem:{type:Object},_items:{type:Object},_focusedIndex:{type:Number,value:-1,observer:"_focusedIndexChanged"},_focusedItem:{type:String,computed:"_getFocusedItem(_focusedIndex)"},_itemLabelPath:{type:String,value:"label"},_itemValuePath:{type:String,value:"value"},_selector:Object,_itemIdPath:String,_oldScrollerPosition:{type:Number,value:0}}}static get observers(){return["_loadingChanged(loading)","_openedChanged(opened, _items, loading)","_restoreScrollerPosition(_items)"]}_fireTouchAction(sourceEvent){this.dispatchEvent(new CustomEvent("vaadin-overlay-touch-action",{detail:{sourceEvent}}))}_getItems(opened,items){if(opened){if(this._isNotEmpty(items)&&this._selector&&!this.filterChanged){const currentScrollerPosition=this._selector.firstVisibleIndex;0!==currentScrollerPosition&&(this._oldScrollerPosition=currentScrollerPosition,this._resetScrolling=!0)}return this.filterChanged=!1,items}return[]}_restoreScrollerPosition(items){this._isNotEmpty(items)&&this._selector&&0!==this._oldScrollerPosition&&(this._scrollIntoView(Math.min(items.length-1,this._oldScrollerPosition)),this._resetScrolling=!1,this._oldScrollerPosition=0)}_isNotEmpty(items){return!this._isEmpty(items)}_isEmpty(items){return!items||!items.length}_openedChanged(opened,items,loading){if(this.$.dropdown.hasAttribute("disable-upgrade")){if(!opened)return;this._initDropdown()}this._isEmpty(items)&&(this.$.dropdown.__emptyItems=!0),this.$.dropdown.opened=!(!opened||!loading&&!this._isNotEmpty(items)),this.$.dropdown.__emptyItems=!1}_initDropdown(){this.$.dropdown.removeAttribute("disable-upgrade"),this._selector=this.$.dropdown.$.overlay.content.querySelector("#selector"),this._scroller=this.$.dropdown.$.overlay.content.querySelector("#scroller"),this._patchWheelOverScrolling(),this._loadingChanged(this.loading),this.$.dropdown.$.overlay.addEventListener("touchend",(e=>this._fireTouchAction(e))),this.$.dropdown.$.overlay.addEventListener("touchmove",(e=>this._fireTouchAction(e))),this.$.dropdown.$.overlay.addEventListener("mousedown",(e=>e.preventDefault()))}_loadingChanged(loading){this.$.dropdown.hasAttribute("disable-upgrade")||(loading?this.$.dropdown.$.overlay.setAttribute("loading",""):this.$.dropdown.$.overlay.removeAttribute("loading"))}_setOverlayHeight(){if(!this.opened||!this.positionTarget)return;const targetRect=this.positionTarget.getBoundingClientRect();this._scroller.style.maxHeight=getComputedStyle(this).getPropertyValue("--vaadin-combo-box-overlay-max-height")||"65vh";const maxHeight=this._maxOverlayHeight(targetRect);this.$.dropdown.$.overlay.style.maxHeight=maxHeight,this._selector.style.maxHeight=maxHeight,this.updateViewportBoundaries()}_maxOverlayHeight(targetRect){return this.$.dropdown.alignedAbove?Math.max(targetRect.top-8+Math.min(document.body.scrollTop,0),116)+"px":Math.max(document.documentElement.clientHeight-targetRect.bottom-8,116)+"px"}_getFocusedItem(focusedIndex){if(focusedIndex>=0)return this._items[focusedIndex]}_isItemSelected(item,selectedItem,itemIdPath){return!(item instanceof ComboBoxPlaceholder)&&(itemIdPath&&void 0!==item&&void 0!==selectedItem?this.get(itemIdPath,item)===this.get(itemIdPath,selectedItem):item===selectedItem)}_onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.model.item}}))}indexOfLabel(label){if(this._items&&label)for(let i=0;i<this._items.length;i++)if(this.getItemLabel(this._items[i]).toString().toLowerCase()===label.toString().toLowerCase())return i;return-1}__requestItemByIndex(item,index,resetScrolling){return item instanceof ComboBoxPlaceholder&&void 0!==index&&!resetScrolling&&this.dispatchEvent(new CustomEvent("index-requested",{detail:{index,currentScrollerPos:this._oldScrollerPosition}})),index}getItemLabel(item,itemLabelPath){itemLabelPath=itemLabelPath||this._itemLabelPath;let label=item&&itemLabelPath?this.get(itemLabelPath,item):void 0;return null==label&&(label=item?item.toString():""),label}_isItemFocused(focusedIndex,itemIndex){return focusedIndex==itemIndex}_getAriaSelected(focusedIndex,itemIndex){return this._isItemFocused(focusedIndex,itemIndex).toString()}_getAriaRole(itemIndex){return void 0!==itemIndex&&"option"}_focusedIndexChanged(index){index>=0&&this._scrollIntoView(index)}_scrollIntoView(index){if(!(this.opened&&index>=0))return;const visibleItemsCount=this._visibleItemsCount();let targetIndex=index;index>this._selector.lastVisibleIndex-1?(this._selector.scrollToIndex(index),targetIndex=index-visibleItemsCount+1):index>this._selector.firstVisibleIndex&&(targetIndex=this._selector.firstVisibleIndex),this._selector.scrollToIndex(Math.max(0,targetIndex));const pidx=this._selector._getPhysicalIndex(index),physicalItem=this._selector._physicalItems[pidx];if(!physicalItem)return;const physicalItemRect=physicalItem.getBoundingClientRect(),scrollerRect=this._scroller.getBoundingClientRect(),scrollTopAdjust=physicalItemRect.bottom-scrollerRect.bottom+this._viewportTotalPaddingBottom;scrollTopAdjust>0&&(this._scroller.scrollTop+=scrollTopAdjust)}ensureItemsRendered(){this._selector._render()}adjustScrollPosition(){this.opened&&this._items&&this._scrollIntoView(this._focusedIndex)}_patchWheelOverScrolling(){const selector=this._selector;selector.addEventListener("wheel",(e=>{const scroller=selector._scroller||selector.scrollTarget,scrolledToTop=0===scroller.scrollTop,scrolledToBottom=scroller.scrollHeight-scroller.scrollTop-scroller.clientHeight<=1;(scrolledToTop&&e.deltaY<0||scrolledToBottom&&e.deltaY>0)&&e.preventDefault()}))}updateViewportBoundaries(){this._cachedViewportTotalPaddingBottom=void 0,this._selector.updateViewportBoundaries()}get _viewportTotalPaddingBottom(){if(void 0===this._cachedViewportTotalPaddingBottom){const itemsStyle=window.getComputedStyle(this._selector.$.items);this._cachedViewportTotalPaddingBottom=[itemsStyle.paddingBottom,itemsStyle.borderBottomWidth].map((v=>parseInt(v,10))).reduce(((sum,v)=>sum+v))}return this._cachedViewportTotalPaddingBottom}_visibleItemsCount(){return this._selector.scrollToIndex(this._selector.firstVisibleIndex),this.updateViewportBoundaries(),this._selector.lastVisibleIndex-this._selector.firstVisibleIndex+1}_stopPropagation(e){e.stopPropagation()}_hidden(){return!this.loading&&this._isEmpty(this._items)}}customElements.define(ComboBoxDropdownWrapperElement.is,ComboBoxDropdownWrapperElement);const ComboBoxDataProviderMixin=superClass=>class DataProviderMixin extends superClass{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},size:{type:Number,observer:"_sizeChanged"},dataProvider:{type:Object,observer:"_dataProviderChanged"},_pendingRequests:{value:()=>({})},__placeHolder:{value:new ComboBoxPlaceholder}}}static get observers(){return["_dataProviderFilterChanged(filter, dataProvider)","_dataProviderClearFilter(dataProvider, opened, value)","_warnDataProviderValue(dataProvider, value)","_ensureFirstPage(opened)"]}_dataProviderClearFilter(dataProvider,opened,value){!dataProvider||this.loading||!this.filter||opened&&this.autoOpenDisabled&&value===this.filter||(this.size=void 0,this._pendingRequests={},this.filter="",this.clearCache())}ready(){super.ready(),this.clearCache(),this.$.overlay.addEventListener("index-requested",(e=>{const index=e.detail.index,currentScrollerPos=e.detail.currentScrollerPos,allowedIndexRange=Math.floor(1.5*this.pageSize);if(!this._shouldSkipIndex(index,allowedIndexRange,currentScrollerPos)&&void 0!==index){const page=this._getPageForIndex(index);this._shouldLoadPage(page)&&this._loadPage(page)}}))}_dataProviderFilterChanged(){this._shouldFetchData()&&(this.size=void 0,this._pendingRequests={},this.clearCache())}_shouldFetchData(){return!!this.dataProvider&&(this.opened||this.filter&&this.filter.length)}_ensureFirstPage(opened){opened&&this._shouldLoadPage(0)&&this._loadPage(0)}_shouldSkipIndex(index,allowedIndexRange,currentScrollerPos){return 0!==currentScrollerPos&&index>=currentScrollerPos-allowedIndexRange&&index<=currentScrollerPos+allowedIndexRange}_shouldLoadPage(page){if(!this.filteredItems||this._forceNextRequest)return this._forceNextRequest=!1,!0;const loadedItem=this.filteredItems[page*this.pageSize];return void 0!==loadedItem?loadedItem instanceof ComboBoxPlaceholder:void 0===this.size}_loadPage(page){if(!this._pendingRequests[page]&&this.dataProvider){this.loading=!0;const params={page,pageSize:this.pageSize,filter:this.filter},callback=(items,size)=>{if(this._pendingRequests[page]===callback){if(this.filteredItems)this.splice("filteredItems",params.page*params.pageSize,items.length,...items);else{const filteredItems=[];filteredItems.splice(params.page*params.pageSize,items.length,...items),this.filteredItems=filteredItems}this._isValidValue(this.value)&&this._getItemValue(this.selectedItem)!==this.value&&this._selectItemForValue(this.value),this.opened||this.hasAttribute("focused")||this._commitValue(),this.size=size,delete this._pendingRequests[page],0===Object.keys(this._pendingRequests).length&&(this.loading=!1),0===page&&this.__repositionOverlayDebouncer&&items.length>(this.__maxRenderedItems||0)&&(setTimeout((()=>this.__repositionOverlayDebouncer.flush())),this.__maxRenderedItems=items.length)}};this._pendingRequests[page]||(this._pendingRequests[page]=callback,this.dataProvider(params,callback))}}_getPageForIndex(index){return Math.floor(index/this.pageSize)}clearCache(){if(!this.dataProvider)return;this._pendingRequests={};const filteredItems=[];for(let i=0;i<(this.size||0);i++)filteredItems.push(this.__placeHolder);this.filteredItems=filteredItems,this._shouldFetchData()?this._loadPage(0):this._forceNextRequest=!0}_sizeChanged(size=0){const filteredItems=(this.filteredItems||[]).slice(0,size);for(let i=0;i<size;i++)filteredItems[i]=void 0!==filteredItems[i]?filteredItems[i]:this.__placeHolder;this.filteredItems=filteredItems,this._flushPendingRequests(size)}_pageSizeChanged(pageSize,oldPageSize){if(Math.floor(pageSize)!==pageSize||pageSize<1)throw this.pageSize=oldPageSize,new Error("`pageSize` value must be an integer > 0");this.clearCache()}_dataProviderChanged(dataProvider,oldDataProvider){this._ensureItemsOrDataProvider((()=>{this.dataProvider=oldDataProvider}))}_ensureItemsOrDataProvider(restoreOldValueCallback){if(void 0!==this.items&&void 0!==this.dataProvider)throw restoreOldValueCallback(),new Error("Using `items` and `dataProvider` together is not supported");this.dataProvider&&!this.filteredItems&&(this.filteredItems=[])}_warnDataProviderValue(dataProvider,value){if(dataProvider&&""!==value&&(void 0===this.selectedItem||null===this.selectedItem)){const valueIndex=this._indexOfValue(value,this.filteredItems);(valueIndex<0||!this._getItemLabel(this.filteredItems[valueIndex]))&&console.warn("Warning: unable to determine the label for the provided `value`. Nothing to display in the text field. This usually happens when setting an initial `value` before any items are returned from the `dataProvider` callback. Consider setting `selectedItem` instead of `value`")}}_flushPendingRequests(size){if(this._pendingRequests){const lastPage=Math.ceil(size/this.pageSize),pendingRequestsKeys=Object.keys(this._pendingRequests);for(let reqIdx=0;reqIdx<pendingRequestsKeys.length;reqIdx++){const page=parseInt(pendingRequestsKeys[reqIdx]);page>=lastPage&&this._pendingRequests[page]([],size)}}}};class ComboBoxElement extends((0,vaadin_element_mixin.q)((0,vaadin_control_state_mixin.U)((0,vaadin_themable_mixin.c)(ComboBoxDataProviderMixin(ComboBoxMixin(polymer_element.Pu)))))){static get template(){return polymer_element.qy`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }

        :host([opened]) {
          pointer-events: auto;
        }

        [part='text-field'] {
          width: 100%;
          min-width: 0;
        }
      </style>

      <vaadin-text-field
        part="text-field"
        id="input"
        pattern="[[pattern]]"
        prevent-invalid-input="[[preventInvalidInput]]"
        value="{{_inputElementValue}}"
        autocomplete="off"
        invalid="[[invalid]]"
        label="[[label]]"
        name="[[name]]"
        placeholder="[[placeholder]]"
        required="[[required]]"
        disabled="[[disabled]]"
        readonly="[[readonly]]"
        helper-text="[[helperText]]"
        error-message="[[errorMessage]]"
        autocapitalize="none"
        autofocus="[[autofocus]]"
        on-change="_stopPropagation"
        on-input="_inputValueChanged"
        clear-button-visible="[[clearButtonVisible]]"
        theme$="[[theme]]"
      >
        <slot name="prefix" slot="prefix"></slot>
        <slot name="helper" slot="helper">[[helperText]]</slot>

        <div part="toggle-button" id="toggleButton" slot="suffix" role="button" aria-label="Toggle"></div>
      </vaadin-text-field>

      <vaadin-combo-box-dropdown-wrapper
        id="overlay"
        opened="[[opened]]"
        renderer="[[renderer]]"
        position-target="[[_getPositionTarget()]]"
        _focused-index="[[_focusedIndex]]"
        _item-id-path="[[itemIdPath]]"
        _item-label-path="[[itemLabelPath]]"
        loading="[[loading]]"
        theme="[[theme]]"
      ></vaadin-combo-box-dropdown-wrapper>
    `}constructor(){super(),this.theme}static get is(){return"vaadin-combo-box"}static get version(){return"21.0.5"}static get properties(){return{label:{type:String,reflectToAttribute:!0},required:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1},preventInvalidInput:{type:Boolean},pattern:{type:String},errorMessage:{type:String},autofocus:{type:Boolean},placeholder:{type:String,value:""},helperText:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},clearButtonVisible:{type:Boolean,value:!1}}}static get observers(){return["_updateAriaExpanded(opened)"]}ready(){super.ready(),this._nativeInput=this.inputElement.focusElement,this._toggleElement=this.$.toggleButton,this._clearElement=this.inputElement.shadowRoot.querySelector('[part="clear-button"]'),this.inputElement.addEventListener("keydown",(e=>{27===e.keyCode&&(this._stopPropagation(e),this._onEscape(e))}),!0),this._nativeInput.setAttribute("role","combobox"),this._nativeInput.setAttribute("aria-autocomplete","list"),this._updateAriaExpanded()}connectedCallback(){super.connectedCallback(),this._preventInputBlur()}disconnectedCallback(){super.disconnectedCallback(),this._restoreInputBlur()}_getPositionTarget(){return this.$.input}_updateAriaExpanded(){this._nativeInput&&(this._nativeInput.setAttribute("aria-expanded",this.opened),this._toggleElement.setAttribute("aria-expanded",this.opened))}get inputElement(){return this.$.input}get focusElement(){return this.inputElement||this}}customElements.define(ComboBoxElement.is,ComboBoxElement)},"./node_modules/focus-visible/dist/focus-visible.js":function(){!function(){"use strict";function applyFocusVisiblePolyfill(scope){var hadKeyboardEvent=!0,hadFocusVisibleRecently=!1,hadFocusVisibleRecentlyTimeout=null,inputTypesAllowlist={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function isValidFocusTarget(el){return!!(el&&el!==document&&"HTML"!==el.nodeName&&"BODY"!==el.nodeName&&"classList"in el&&"contains"in el.classList)}function focusTriggersKeyboardModality(el){var type=el.type,tagName=el.tagName;return!("INPUT"!==tagName||!inputTypesAllowlist[type]||el.readOnly)||"TEXTAREA"===tagName&&!el.readOnly||!!el.isContentEditable}function addFocusVisibleClass(el){el.classList.contains("focus-visible")||(el.classList.add("focus-visible"),el.setAttribute("data-focus-visible-added",""))}function removeFocusVisibleClass(el){el.hasAttribute("data-focus-visible-added")&&(el.classList.remove("focus-visible"),el.removeAttribute("data-focus-visible-added"))}function onKeyDown(e){e.metaKey||e.altKey||e.ctrlKey||(isValidFocusTarget(scope.activeElement)&&addFocusVisibleClass(scope.activeElement),hadKeyboardEvent=!0)}function onPointerDown(e){hadKeyboardEvent=!1}function onFocus(e){isValidFocusTarget(e.target)&&(hadKeyboardEvent||focusTriggersKeyboardModality(e.target))&&addFocusVisibleClass(e.target)}function onBlur(e){isValidFocusTarget(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(hadFocusVisibleRecently=!0,window.clearTimeout(hadFocusVisibleRecentlyTimeout),hadFocusVisibleRecentlyTimeout=window.setTimeout((function(){hadFocusVisibleRecently=!1}),100),removeFocusVisibleClass(e.target))}function onVisibilityChange(e){"hidden"===document.visibilityState&&(hadFocusVisibleRecently&&(hadKeyboardEvent=!0),addInitialPointerMoveListeners())}function addInitialPointerMoveListeners(){document.addEventListener("mousemove",onInitialPointerMove),document.addEventListener("mousedown",onInitialPointerMove),document.addEventListener("mouseup",onInitialPointerMove),document.addEventListener("pointermove",onInitialPointerMove),document.addEventListener("pointerdown",onInitialPointerMove),document.addEventListener("pointerup",onInitialPointerMove),document.addEventListener("touchmove",onInitialPointerMove),document.addEventListener("touchstart",onInitialPointerMove),document.addEventListener("touchend",onInitialPointerMove)}function removeInitialPointerMoveListeners(){document.removeEventListener("mousemove",onInitialPointerMove),document.removeEventListener("mousedown",onInitialPointerMove),document.removeEventListener("mouseup",onInitialPointerMove),document.removeEventListener("pointermove",onInitialPointerMove),document.removeEventListener("pointerdown",onInitialPointerMove),document.removeEventListener("pointerup",onInitialPointerMove),document.removeEventListener("touchmove",onInitialPointerMove),document.removeEventListener("touchstart",onInitialPointerMove),document.removeEventListener("touchend",onInitialPointerMove)}function onInitialPointerMove(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(hadKeyboardEvent=!1,removeInitialPointerMoveListeners())}document.addEventListener("keydown",onKeyDown,!0),document.addEventListener("mousedown",onPointerDown,!0),document.addEventListener("pointerdown",onPointerDown,!0),document.addEventListener("touchstart",onPointerDown,!0),document.addEventListener("visibilitychange",onVisibilityChange,!0),addInitialPointerMoveListeners(),scope.addEventListener("focus",onFocus,!0),scope.addEventListener("blur",onBlur,!0),scope.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&scope.host?scope.host.setAttribute("data-js-focus-visible",""):scope.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var event;window.applyFocusVisiblePolyfill=applyFocusVisiblePolyfill;try{event=new CustomEvent("focus-visible-polyfill-ready")}catch(error){(event=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(event)}"undefined"!=typeof document&&applyFocusVisiblePolyfill(document)}()}}]);
//# sourceMappingURL=949.7a5b5d90.iframe.bundle.js.map