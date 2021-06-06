!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Yngwie=e():t.Yngwie=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Controller:()=>n,Element:()=>i,Node:()=>r,TextNode:()=>s,transform:()=>o});class r{constructor(t){this._value=t,this._parent=void 0,this._first=void 0,this._last=void 0,this._next=void 0,this._prev=void 0}children(){let t=this._first,e=[];for(;t;)e.push(t),t=t._next;return e}append(t){if(t instanceof r)return t._parent&&t.detach(),void 0!==this._first?(t._prev=this._last,this._last._next=t,this._last=t):(this._first=t,this._last=t),t._parent=this,this;throw new Error("Can only apppend YngwieNode to other YngwieNodes")}detach(){return this._prev?this._prev._next=this._next:this._parent&&(this._parent._first=this._next),this._next&&(this._next._prev=this._prev),this._next=void 0,this._prev=void 0,this._parent=void 0,this}insertBefore(t){if(t instanceof r)return this._prev?this._prev._next=t:this._parent&&(this._parent._first=t),t._prev=this._prev,t._next=this,t._parent=this._parent,this;throw new Error("Can only insert a YngwieNode before other YngwieNodes")}replaceWith(t){if(t instanceof r)return this.insertBefore(t),this.detach(),t;throw new Error("Can only replace a YngwieNode with another YngwieNode")}clone(){let t=(" "+this._value).slice(1),e=new r(t);return this.children().reduce(((t,r)=>(e=r.clone(),t.append(e))),e)}step(t,e){return next=t(this,e),next&&next.step(t,e),e}parse(t,e){return r.parse(this,(r=>{e=t(r,e)})),e}static init(t){return new r(t)}static parse(t,e){if(!(t instanceof r))throw new Error("Can only parse a YngwieNode");for(e(t),t=t._first;t;)r.parse(t,e),t=t._next}}class n{constructor(t,e){this._evtName=t,this._fns=e||[]}add(t){return this._fns.push(t),this}clone(){let t=(" "+this._evtName).slice(1),e=this._fns.map((t=>t.toString()));return new n(t,e)}render(t){return this._fns.reduce(((t,e)=>(t.addEventListener(this._evtName,e),t)),t)}static init(t,e){return new n(t,!0===Array.isArray(e)?e:[e])}}class i extends r{constructor(t,e,r,n){super(t),this._attribs=e||{},this._text=r,this._controllers=[]}attribs(t){return this._attribs=t,this}hasAttribute(t){return this._attribs.hasOwnProperty(t)}getAttribute(t){return this._attribs[t]}setAttribute(t,e){return this._attribs[t]=e,this}text(t){return this._text=t,this}getElementsByTagName(t){return this.parse(((e,r)=>(r._value===t&&e.push(r),e)),[])}getElementsByAttribute(t,e){return this.parse(((r,n)=>(r instanceof i&&r.hasAttribute(t)&&(void 0===e||r.getAttribute(t)===e)&&n.push(r),n)),[])}getElementsByClass(t){return this.getElementsByAttribute("class",t)}getElementByID(t){return this.getElementsByAttribute("id",t).pop()}on(t,e){let r=n.init(t,e);return this._controllers.push(r),this}clone(){let t=(" "+this._value).slice(1),e=Object.keys(this._attribs).reduce(((t,e)=>(t[e]=(" "+this._attribs[e]).slice(1),t)),{}),r=void 0!==this._text?(" "+this._text).slice(1):void 0,n=this._controllers.map((t=>t.clone())),s=i(t,e,r,n);return this.children().reduce(((t,e)=>(e=e.clone(),t.append(e))),s)}appends(t){return t.reduce(((t,e)=>this.append(e)),this)}render(t){let e=Object.keys(this._attribs).reduce(((t,e)=>(t.setAttribute(e,this._attribs[e]),t)),document.createElement(this._value));if(e=this._controllers.reduce(((t,e)=>e.render(t)),e),"string"==typeof this._text){let t=document.createTextNode(this._text);e.appendChild(t)}let r=this.children().reduce(((t,e)=>(e=e.render(),t.appendChild(e),t)),e);return void 0!==t&&("string"==typeof t?document.querySelector(t).appendChild(r):t.appendChild(r)),r}static init(t,e,r,n){return new i(t,e,r,n)}static renderTo(t,e){let r="string"==typeof t?document.querySelector(t):t;return e.reduce(((t,e)=>(e.render(t),t)),r)}}class s extends r{constructor(t){super(t)}render(){return document.createTextNode(this._value)}append(t){if("string"==typeof t)return this._value+=t,this;throw new Error("Only STRINGs can append YngwieTextNodes")}clone(){return new s((" "+this._value).slice(1))}init(t){return new s(t)}}function o(t){return a("string"==typeof t?function(t){return(new DOMParser).parseFromString(t,"text/html").body.firstElementChild}(t):t)}function a(t,e){if(1===t.nodeType){let r=function(t){return Array.from(t.attributes).reduce(((t,e)=>(t[e.name]=e.value,t)),{})}(t),n=new i(t.tagName,r);e=void 0===e?n:e.append(n)}if(3===t.nodeType){let r=new s(t.nodeValue);e=void 0===e?r:e.append(r)}for(t=t.firstChild;t;){let r=a(t);void 0!==r&&e.append(r),t=t.nextSibling}return e}return e})()}));