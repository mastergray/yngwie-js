(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Yngwie"] = factory();
	else
		root["Yngwie"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Element/main.js":
/*!*****************************!*\
  !*** ./src/Element/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieElement)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Listener/main.js */ "./src/Listener/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Error/main.js */ "./src/Error/main.js");




class YngwieElement extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // CONSTRUCTOR :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  constructor(tagName, attribs, text, listeners) {
    super(tagName.toUpperCase());     // Stores tagName in ALL CAPS
    this._attribs = attribs || {};     // Element Attributes
    this._text = text;                 // Element text that's appended as first child of this element
    this._listeners = [];            // Listeners bound to this element
  }

  // :: VOID -> STRING
  // Returns tagName of this element:
  tagName() {
    return this._value;
  }

  // :: OBJECT|VOID -> this|OBJECT
  // Sets "attribs" OBJECT with given OBJECT:
  // NOTE: If no argument is given, set attributes are returned:
  attribs(attribs) {
    if (attribs === undefined) {
      return this._attribs;
    } else {
      if (typeof(attribs) === "object") {
        this._attribs = attribs;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("YngwieElement attributes can only be set with OBJECT", attribs);
    }
  }

  // :: STRING -> BOOLEAN
  // Returns BOOLEAN for if attribute with given name exists in "attribs" OBJECT:
  hasAttribute(name) {
    return this._attribs.hasOwnProperty(name);
  }

  // :: STRING -> *|UNDEFINED
  // Returns value of attribute by name stored in "attribs" OBJECT, otherwise returns UNDEFINED
  getAttribute(name) {
    return this._attribs[name];
  }

  // :: STRING, * -> this
  // Binds  value to "attribs" OBJECT with given name:
  setAttribute(name, value) {
    this._attribs[name] = value;
    return this;
  }

  // :: STRING -> this
  // Remove attribute with given name from "attribs" OBJECT:
  removeAttribute(name) {
    delete this._attribs[name];
    return this;
  }

  // :: STRING|VOID -> this|UNDEFINED
  // Appends text node as first child of element at render with given string as it's value:
  // NOTE: If no argument is given, set text is returned:
  text(str) {
    if (str === undefined) {
      return this._text;
    } else {
      if (typeof(str) === "string") {
        this._text = str;
        return this;
      }
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Text of element can only be set with a STRING", str);
    }
  }

  // :: VOID -> this
  // Sets text as UNDEFINED for this element:
  removeText() {
    this._text = undefined;
    return this;
  }

  // :: (yngwieElement -> BOOLEAN) -> [yngwieElement]
  // Returns all the elements that, when the given function is applied to this elements and it's desendants, that function returns TRUE:
  getElementsBy(fn) {
    return this.parse((node, result) => {
      if (node instanceof YngwieElement) {
        if (fn(node) === true) {
          result.push(node);
        }
      }
      return result;
    }, []);
  }

  // :: STRING -> [yngwieElement]
  // Returns an array of YngwieElemnts that have the given tagName:
  // NOTE: Returns an empty array if no elements are found with the given tag name:
  getElementsByTagName(tagName) {
    return this.getElementsBy(elem => elem.tagName() === tagName);
  }

  // STRING, STRING|VOID -> [yngwieElement]
  // Returns an array of yngwieElements that have the given attribute with the given value:
  // NOTE: If no value is given, then any element that has the given attribute name is returned
  getElementsByAttribute(name, value) {
    return this.getElementsBy(elem => {
      if (elem.hasAttribute(name)) {
        if (value === undefined) {
          return true;
        } else {
          return elem.getAttribute(name) === value;
        }
      }
      return false;
    });
  }

  // STRING -> [yngwieElement]
  // Returns all elements that have the given class name
  // NOTE: Returns an empty array if no elements are found with the given class name:
  getElementsByClass(className) {
    return this.getElementsByAttribute("class", className);
  }

  // Returns YngwieElement that has the given ID:
  // NOTE: Returns UNDEFINED if no elements are found with the given ID
  getElementByID(id) {
    return this.getElementsByAttribute("id", id).pop();
  }

  // :: STRING, [(EVENT, ELEMENT) -> VOID]|(EVENT, ELEMENT) -> VOID ->  this
  // Binds listener by event name to node at render:
  // NOTE: Function bound to listener is called in the context of this element
  on(evtName, fns) {
    let listener = Yngwie.Listener.init(evtName, fns);
    this._listeners.push(listener);
    return this;
  }

  // VOID -> yngwieElement
  // Returns clone of this yngwieElement:
  clone() {

    // Copy tagname:
    let tagName = `${this._value}`;

    // Copy attributes:
    let attribs = Object.keys(this._attribs).reduce((result, id) => {
      result[id] = `${this._attribs[id]}`;
      return result;
    }, {});

    // Copy set:
    let text = this._text !== undefined
      ? `${this._text}`
      : undefined;

    // Copy listeners:
    let listeners = this._listeners.map((listener) => {
      return listener.clone();
    });

    // Copy children and return element:
    let elem = new YngwieElement(tagName, attribs, text, listeners);
    return this.children().reduce((elem, child) => {
      child = child.clone();
      return elem.append(child);
    }, elem);

  }

  // :: STRING|ELEMENT, OBJECT -> ELEMENT
  // Transforms this element and it's desendants into a DOM ELEMENT, appending result to given target
  // and rendering that ELEMENT in the context of the given OBJECT. If no target to append is given,
  // the rendered ELEMENT is returned. If no context is given, then DOCUMENT is used by default.
  render(target, ctx) {

    // Check if default context of DOCUMENT should be used:
    let context = ctx === undefined ? document : ctx;

    // Intialize DOMElement:
    let elem = Object.keys(this._attribs).reduce((elem, id) => {
      elem.setAttribute(id, this._attribs[id]);
      return elem;
    }, context.createElement(this._value));

    // Bind Listeners:
    elem = this._listeners.reduce((elem, listener) => {
      return listener.render(elem, this);
    }, elem);

    // If set, create and append text node:
    if (typeof(this._text) === "string") {
      let elemText = context.createTextNode(this._text);
      elem.appendChild(elemText);
    }

    // Render and append all children and return result:
    let result = this.children().reduce((result, child) => {
      child = child.render();
      result.appendChild(child);
      return result;
    }, elem);

    // If target is given, appends result of render to that target:
    if (target !== undefined) {
      // If target is string, find node using query selector:
      if (typeof(target) === "string") {
        context.querySelector(target).appendChild(result);
      } else {
        // Otherise assume that target is DOMElement:
        target.appendChild(result);
      }
    }

    return result;

  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING. OBJECT, STRING, [yngwieListener] -> yngwieElement
  // Static factory method:
  static init(tagName, attribs, text, listeners) {
    return new YngwieElement(tagName, attribs, text, listeners)
  }

  // :: STRING|ELEMENT, [yngwieElement], OBJECT -> ELEMENT
  // Renders an array of yngwieElements in the given context and appends result to given target:
  // NOTE: ELEMENT of target is returned
  static renderTo(target, elems, ctx) {
    let context = ctx === undefined ? document : ctx;
    if (elems instanceof Array) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      return elems.reduce((result, elem) => {
        if (elem instanceof YngwieElement) {
          elem.render(result);
          return result;
        }
        throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Only YngwieElement can be rendered to target", elem);
      }, node);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Expected array as argument", elems);
  }

  // :: STRING|ELEMENT, yngwieElement, OBJECT -> ELEMENT
  // Replaces the given target with the render of the given instance  of YngwieElement in the given context:
  static inject(target, elem, ctx) {
    if (elem instanceof YngwieElement) {
      let context = ctx === undefined ? document : ctx;
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      let result = elem.render();
      node.replaceWith(result);
      return node;
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_2__.default("Only YngwieElement can be injected into target", elem);
  }

}


/***/ }),

/***/ "./src/Error/main.js":
/*!***************************!*\
  !*** ./src/Error/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieError)
/* harmony export */ });
class YngwieError extends Error {

  // CONSTRUCTOR :: STRING, * -> ERROR
  // NOTE :: "data" argument is always cast as STRING:
  constructor(msg, data) {
    super(msg);
    this.data = `${data}`;
  }

  // :: VOID ->  VOID
  // Consoles out stack trace of error, along with the data that caused the exception to be thrown:
  log() {
    console.log(this.stack);
    console.log("What Failed: ", this.data);
  }

}


/***/ }),

/***/ "./src/Listener/main.js":
/*!******************************!*\
  !*** ./src/Listener/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieListener)
/* harmony export */ });
class YngwieListener {

  // CONSTRUCTOR :: STRING, [(EVENT, ELEMENT -> VOID)] -> yngwieListener
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVENT, ELEMENT -> VOID) -> this;
  // Adds function to listener:
  add(fn) {
    this._fns.push(fn);
    return this;
  }

  // :: VOID -> yngwieListener
  // Creates clone of this yngwieListener:
  clone() {
    let evtName = `${this._evtName}`;
    let fns = this._fns.map(fn=>{
      return new Function("evt", "elem", fn.toString());
    });
    return new YngwieListener(evtName, fns);
  }

  // :: ELEMENT, OBJECT -> ELEMENT
  // Creates event listener and binds it to given DOM ELEMENT, and calls function of listener to given context
  // NOTE: If no context is given, function is called in the context of the ELEMENT the listener is bound to
  render(elem, ctx) {
    return this._fns.reduce((elem, fn) => {
      elem.addEventListener(this._evtName, function (evt) {
        fn.call(ctx === undefined ? elem : ctx, evt, elem);
      });
      return elem;
    }, elem);
  }

  // :: STRING, [(EVENT, ELEMENT -> VOID)]|(EVENT, ELEMENT -> VOID) -> yngwieListener
  // Static factory method:
  static init(evtName, fns) {
    return fns !== undefined
      ? new YngwieListener(evtName, Array.isArray(fns) === true ? fns : [fns])
      : new YngwieListener(evtName);
  }

}


/***/ }),

/***/ "./src/Node/main.js":
/*!**************************!*\
  !*** ./src/Node/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieNode)
/* harmony export */ });
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Error/main.js */ "./src/Error/main.js");


class YngwieNode {

  // CONSTRUCTOR :: STRING -> yngwieNode
  constructor(value) {
    if (typeof(value) === "string") {
      this._value = value;       // Arbitrary STRING value that can be stored by this node
      this._parent = undefined;  // Parent of this node
      this._first = undefined;   // First child of this node
      this._last = undefined;    // Last child of this node;
      this._next = undefined;    // Next sibling of this node
      this._prev = undefined;    // Previous sibling of the node
    } else {
      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Value of YngwieNode must be STRING", value);
    }
  }

  // :: VOID -> [yngwieNode]
  // Returns all the children of this node:
  children() {

    let child = this._first;   // First child
    let children = [];         // Array of children to return

    // Looks for next sibling until there are no more siblings:
    while (child) {
      children.push(child);
      child = child._next;
    }

    // Returns an arrary yngiwNode elements:
    return children;

  }

  // :: yngwieNode -> this
  // Adds given node to children of this node:
  // NOTE: If given node already has a parent, that node is detached and appened to this node:
  append(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // If given node has parent, detach that node from it's parent:
      if (node._parent) {
        node.detach();
      }

      // Set new node as last sibling:
      if (this._first !== undefined) {
        node._prev = this._last;    // Sets new last child's previous node to old last node
        this._last._next = node;    // Set old last child next element to new last child
        this._last = node;         // Set new last child to given node
      } else {
        // If ther are no children, then this node is an only child:
        this._first = node;
        this._last = node;
      }

      // Set parent
      node._parent = this;

      // Return instance:cosnole
      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only apppend YngwieNode to other YngwieNodes", node);

  }

  // :: [yngwieNode] -> this
  // Appends an array of YngwieNodes to this instance:
  appends(nodes) {
    if (nodes instanceof Array) {
      return nodes.reduce((result, node) => {
        return this.append(node);
      }, this);
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Expected array as arguemnt", nodes);
  }

  // :: VOID -> this
  // Detaches this node from it's parent:
  detach() {

    // Make previous node's next node this node's next node:
    if (this._prev) {
      this._prev._next = this._next;
    } else {
      // if no previous node, then this node must be first child of parent (if node has parent):
      if (this._parent) {
        this._parent._first = this._next;
      }
    }

    // Make next node's previous node this node's previous node:
    if (this._next) {
      this._next._prev = this._prev;
    }

    // Unset all relations:
    this._next = undefined;
    this._prev = undefined;
    this._parent = undefined;

    // Return instance:
    return this;

  }

  // :: yngwieNode -> this;
  // Inserts given yngwieNode before this instance of yngwieNode:
  // NOTE: a.insertsBefore(b) means "b" is inserted before "a"
  insertBefore(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Set relations
      node._prev = this._prev;
      node._next = this;
      node._parent = this._parent;

      // Set previous sibling relations:
      if (this._prev) {
        this._prev._next = node;
      } else {
        if (this._parent) {
          this._parent._first = node;
        }
      }

      // Set previous sibling:
      this._prev = node;

      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only insert a YngwieNode before other YngwieNodes", node);

  }

  // :: yngwieNode -> yngwieNode
  // Replace this node with given node:
  replaceWith(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      // Checks if this node has a parent
      if (this._parent !== undefined) {

        // Replacement is accomplished by first inserting given node, then detatching this node:
        this.insertBefore(node);
        this.detach();

        // Return given node:
        return node;

      }

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only replace YngwieNode if YngwieNode being replaced has parent", this);

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only replace a YngwieNode with another YngwieNode", node);

  }

  // :: VOID -> yngwieNode
  // Returns deep clone of this node:
  clone() {
    let value = `${this._value}`;
    let clone = new YngwieNode(value)
    return this.children().reduce((result, child) => {
      clone = child.clone();
      return result.append(clone);
    }, clone);
  }

  // NODE, * -> NODE -> *
  // Applies function to a result and this node, where that function returns the next node to that function is applied to
  // NOTE: Result is returned when there is no next node to apply function to
  step(fn, result) {
    next = fn(this, result);
    if (next) {
      next.step(fn, result);
    }
    return result;
  }

  // :: NODE, * -> *, * -> *
  // Applies function to this node and it's descendants, returning the result of that function:
  parse(fn, result) {
    YngwieNode.parse(this, (node) => {
      result = fn(node, result);
    });
    return result;
  }

  /**
   *
   * Static Function
   *
   */

  // STRING -> yngwieNode
  // Static factory method
  static init(value) {
    return new YngwieNode(value);
  }

  // NODE, NODE -> VOID -> VOID
  // Applies a function to a node and all it's desendants
  // NODE: This is a re-implementation of Crockford's DOM walk algorithm from "Javascript: The Good Parts"
  static parse(node, fn) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      fn(node);
      node = node._first;
      while (node) {
        YngwieNode.parse(node, fn);
        node = node._next;
      }

    } else {

      throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only parse a YngwieNode", node);

    }

  }

}


/***/ }),

/***/ "./src/TextNode/main.js":
/*!******************************!*\
  !*** ./src/TextNode/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTextNode)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Error/main.js */ "./src/Error/main.js");



class YngwieTextNode extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // CONSTRUCTOR :: STRING -> yngwieTextNode
  constructor(text) {
    super(text);
  }

  // :: VOID -> STRING
  // Returns text of this text node:
  text() {
    return this._value;
  }

  // :: STRING|yngwieTextNode -> this
  // Appends STRING instead of NODE since a TextNode has no children
  append(val) {

    if (typeof(val) === "string") {
        this._value += val;
        return this;
    }

    if (val instanceof YngwieTextNode) {
        this._value += val.text();
        return this;
    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_1__.default("Only STRINGs and other YngwieTextNodes can append a YngwieTextNode", val);
  }

  //:: STRING|ELEMENT|VOID, OBJECT -> TEXT
  // Creates DOM Text node set with the STRING stored in _value:
  render(target, ctx) {
    let context = ctx === undefined ? document : ctx;
    let textNode = context.createTextNode(this._value);
    if (target !== undefined) {
      let node = typeof(target) === "string"
        ? context.querySelector(target)
        : target;
      target.appendChild(textNode);
    }
    return textNode;
  }

  // :: VOID -> yngwieTextNode
  // Creates a clone of this yngwieTextNode:
  clone() {
    return new YngwieTextNode(`${this._value}`);
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING -> yngwieTextNode
  // Static factory method:
  static init(text) {
    return new YngwieTextNode(text);
  }

}


/***/ }),

/***/ "./src/Transform/main.js":
/*!*******************************!*\
  !*** ./src/Transform/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTransform)
/* harmony export */ });
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TextNode/main.js */ "./src/TextNode/main.js");
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Transform/main.js */ "./src/Transform/main.js");





class YngwieTransform {

  // CONSTRUCTOR :: * -> yngwieTransform
  constructor(val) {
    this._value = val;                         // Value to transform
    this._type = YngwieTransform.getType(val); // Stores value's type for determining how it can be transformed
  }

  // :: VOID -> NODE
  // Transforms stored value into a DOMElement NODE:
  toNODE() {
    switch (this._type) {
      case "NODE":
        return this._value;
      case "STRING":
        let parser = new DOMParser();
        let doc = parser.parseFromString(this._value, "text/html");
        return doc.body.firstChild;
      case "YNGWIE":
        return this._value.render();
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to NODE from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a STRING:
  toSTRING() {
    switch (this._type) {
      case "NODE":
        return this._value.nodeType === 1 ? this._value.outerHTML : this._value.nodeValue;
      case "STRING":
        return this._value;
      case "YNGWIE":
        console.log(this._value);
        let node = this._value.render();
        console.log(node)
        return node.nodeType === 1 ? node.outerHTML : node.nodeValue;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to STRING from unsuppoted type", this._value);
    }
  }

  // :: VOID -> STRING
  // Transforms stored value into a yngwieElement:
  toYNGWIE() {
    switch (this._type) {
      case "NODE":
      case "STRING":
        return YngwieTransform.init(this._value);
      case "YNGWIE":
        return this._value;
      default:
        throw new _Transform_main_js__WEBPACK_IMPORTED_MODULE_3__.default("Cannot transform to YngwieElement from unsuppoted type", this._value);
    }
  }

  /**
   *
   *  Static Methods
   *
   */

  // :: STRING|NODE -> yngwieElement
  // Transforms string of HTML or DOMElement NODE into a yngwieElement
  // NOTE: This DOES NOT transform event handlers into YngwieListener objects:
  static init(html) {
    return walkNode(YngwieTransform.getType(html) === "STRING" ? YngwieTransform.toNODE(html) : html);
  }

  // :: * -> NODE
  // Static factory method that transforms given value into a NODE:
  static toNODE(val) {
    let transform = new YngwieTransform(val);
    return transform.toNODE();
  }

  // :: * -> STRING
  // Static factory method that transforms given value into a STRING:
  static toSTRING(val) {
    let transform = new YngwieTransform(val);
    return transform.toSTRING();
  }

  // :: * -> yngwieElement
  // Static factory method that transforms given value into a yngwieElement:
  static toYNGWIE(val) {
    let transform = new YngwieTransform(val);
    return transform.toYNGWIE();
  }

  // * -> "NODE"|"STRING"|"YNGWIE"|UNDEFINED
  // Returns name of type for given value:
  static getType(val) {

    if (val instanceof Node) {
      return "NODE";
    }

    if (typeof(val) === "string") {
      return "STRING";
    }

    if (val instanceof _Node_main_js__WEBPACK_IMPORTED_MODULE_2__.default) {
      return "YNGWIE";
    }

    return undefined;

  }

}

/**
 *
 *  Local Functions
 *
 */

// :: NODE, NODE, node.nodeType -> VOID
// Creates an instance of YngwieElement from the given node and all of it's desendents:
// NOTE: Inspired by Crockford's DOM walking algorithm from "Javascript:The Good Parts"
function walkNode(node, result) {

  if (node.nodeType === 1) {
    let attribs = getAttributes(node);
    let elem = new _Element_main_js__WEBPACK_IMPORTED_MODULE_0__.default(node.tagName, attribs);
    result = result === undefined
      ? elem
      : result.append(elem);
  }

  if (node.nodeType === 3) {
    let textNode = new _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__.default(node.nodeValue);
    result = result === undefined
      ? textNode
      : result.append(textNode);
  }

  node = node.firstChild;

  while (node) {
    let child = walkNode(node);
    if (child !== undefined) {
        result.append(child);
    }
    node = node.nextSibling;
  }

  return result;

}

// :: DOMElement -> OBJECT
// Returns OBJECT of attributes from the given DOM Element:
function getAttributes(elem) {
  return Array.from(elem.attributes).reduce((result, attrib) => {
    result[attrib.name] = attrib.value;
    return result;
  }, {});
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* reexport safe */ _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "Element": () => (/* reexport safe */ _Element_main_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "TextNode": () => (/* reexport safe */ _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Listener": () => (/* reexport safe */ _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Transform": () => (/* reexport safe */ _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Error": () => (/* reexport safe */ _Error_main_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./src/TextNode/main.js");
/* harmony import */ var _Listener_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener/main.js */ "./src/Listener/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform/main.js */ "./src/Transform/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error/main.js */ "./src/Error/main.js");









})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9FbGVtZW50L21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0Vycm9yL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0xpc3RlbmVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL05vZGUvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvVGV4dE5vZGUvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvVHJhbnNmb3JtL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1luZ3dpZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnlDO0FBQ1E7QUFDTjs7QUFFNUIsNEJBQTRCLGtEQUFVOztBQUVyRDtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQyxzQkFBc0I7QUFDdEIseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1EQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1EQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFlBQVk7O0FBRWpDO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0EsS0FBSyxJQUFJOztBQUVUO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGtEQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHNEQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQOzs7Ozs7O1VDcktBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNNO0FBQ0U7QUFDQTtBQUNFO0FBQ1I7O0FBU3pDIiwiZmlsZSI6InluZ3dpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlluZ3dpZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJZbmd3aWVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTGlzdGVuZXIgZnJvbSBcIi4uL0xpc3RlbmVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUxpc3RlbmVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGxpc3RlbmVycykge1xuICAgIHN1cGVyKHRhZ05hbWUudG9VcHBlckNhc2UoKSk7ICAgICAvLyBTdG9yZXMgdGFnTmFtZSBpbiBBTEwgQ0FQU1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzIHx8IHt9OyAgICAgLy8gRWxlbWVudCBBdHRyaWJ1dGVzXG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7ICAgICAgICAgICAgICAgICAvLyBFbGVtZW50IHRleHQgdGhhdCdzIGFwcGVuZGVkIGFzIGZpcnN0IGNoaWxkIG9mIHRoaXMgZWxlbWVudFxuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdOyAgICAgICAgICAgIC8vIExpc3RlbmVycyBib3VuZCB0byB0aGlzIGVsZW1lbnRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGFnTmFtZSBvZiB0aGlzIGVsZW1lbnQ6XG4gIHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfFZPSUQgLT4gdGhpc3xPQkpFQ1RcbiAgLy8gU2V0cyBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBPQkpFQ1Q6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgYXR0cmlidXRlcyBhcmUgcmV0dXJuZWQ6XG4gIGF0dHJpYnMoYXR0cmlicykge1xuICAgIGlmIChhdHRyaWJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKGF0dHJpYnMpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlluZ3dpZUVsZW1lbnQgYXR0cmlidXRlcyBjYW4gb25seSBiZSBzZXQgd2l0aCBPQkpFQ1RcIiwgYXR0cmlicyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gKnxVTkRFRklORURcbiAgLy8gUmV0dXJucyB2YWx1ZSBvZiBhdHRyaWJ1dGUgYnkgbmFtZSBzdG9yZWQgaW4gXCJhdHRyaWJzXCIgT0JKRUNULCBvdGhlcndpc2UgcmV0dXJucyBVTkRFRklORURcbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKiAtPiB0aGlzXG4gIC8vIEJpbmRzICB2YWx1ZSB0byBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBuYW1lOlxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLl9hdHRyaWJzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBSZW1vdmUgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBmcm9tIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xWT0lEIC0+IHRoaXN8VU5ERUZJTkVEXG4gIC8vIEFwcGVuZHMgdGV4dCBub2RlIGFzIGZpcnN0IGNoaWxkIG9mIGVsZW1lbnQgYXQgcmVuZGVyIHdpdGggZ2l2ZW4gc3RyaW5nIGFzIGl0J3MgdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgdGV4dCBpcyByZXR1cm5lZDpcbiAgdGV4dChzdHIpIHtcbiAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHN0cjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJUZXh0IG9mIGVsZW1lbnQgY2FuIG9ubHkgYmUgc2V0IHdpdGggYSBTVFJJTkdcIiwgc3RyKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gU2V0cyB0ZXh0IGFzIFVOREVGSU5FRCBmb3IgdGhpcyBlbGVtZW50OlxuICByZW1vdmVUZXh0KCkge1xuICAgIHRoaXMuX3RleHQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiAoeW5nd2llRWxlbWVudCAtPiBCT09MRUFOKSAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQsIHdoZW4gdGhlIGdpdmVuIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50cyBhbmQgaXQncyBkZXNlbmRhbnRzLCB0aGF0IGZ1bmN0aW9uIHJldHVybnMgVFJVRTpcbiAgZ2V0RWxlbWVudHNCeShmbikge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChub2RlLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICBpZiAoZm4obm9kZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgWW5nd2llRWxlbW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIHRhZ05hbWU6XG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIHRhZyBuYW1lOlxuICBnZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IGVsZW0udGFnTmFtZSgpID09PSB0YWdOYW1lKTtcbiAgfVxuXG4gIC8vIFNUUklORywgU1RSSU5HfFZPSUQgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIHZhbHVlIGlzIGdpdmVuLCB0aGVuIGFueSBlbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBhdHRyaWJ1dGUgbmFtZSBpcyByZXR1cm5lZFxuICBnZXRFbGVtZW50c0J5QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IHtcbiAgICAgIGlmIChlbGVtLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBjbGFzcyBuYW1lXG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIGNsYXNzIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgWW5nd2llRWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gSUQ6XG4gIC8vIE5PVEU6IFJldHVybnMgVU5ERUZJTkVEIGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBJRFxuICBnZXRFbGVtZW50QnlJRChpZCkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJpZFwiLCBpZCkucG9wKCk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQpIC0+IFZPSURdfChFVkVOVCwgRUxFTUVOVCkgLT4gVk9JRCAtPiAgdGhpc1xuICAvLyBCaW5kcyBsaXN0ZW5lciBieSBldmVudCBuYW1lIHRvIG5vZGUgYXQgcmVuZGVyOlxuICAvLyBOT1RFOiBGdW5jdGlvbiBib3VuZCB0byBsaXN0ZW5lciBpcyBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhpcyBlbGVtZW50XG4gIG9uKGV2dE5hbWUsIGZucykge1xuICAgIGxldCBsaXN0ZW5lciA9IFluZ3dpZS5MaXN0ZW5lci5pbml0KGV2dE5hbWUsIGZucyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnTmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBsaXN0ZW5lcnM6XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5tYXAoKGxpc3RlbmVyKSA9PiB7XG4gICAgICByZXR1cm4gbGlzdGVuZXIuY2xvbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIENvcHkgY2hpbGRyZW4gYW5kIHJldHVybiBlbGVtZW50OlxuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBUcmFuc2Zvcm1zIHRoaXMgZWxlbWVudCBhbmQgaXQncyBkZXNlbmRhbnRzIGludG8gYSBET00gRUxFTUVOVCwgYXBwZW5kaW5nIHJlc3VsdCB0byBnaXZlbiB0YXJnZXRcbiAgLy8gYW5kIHJlbmRlcmluZyB0aGF0IEVMRU1FTlQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuIE9CSkVDVC4gSWYgbm8gdGFyZ2V0IHRvIGFwcGVuZCBpcyBnaXZlbixcbiAgLy8gdGhlIHJlbmRlcmVkIEVMRU1FTlQgaXMgcmV0dXJuZWQuIElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIHRoZW4gRE9DVU1FTlQgaXMgdXNlZCBieSBkZWZhdWx0LlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcblxuICAgIC8vIENoZWNrIGlmIGRlZmF1bHQgY29udGV4dCBvZiBET0NVTUVOVCBzaG91bGQgYmUgdXNlZDpcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQodGhpcy5fdmFsdWUpKTtcblxuICAgIC8vIEJpbmQgTGlzdGVuZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9saXN0ZW5lcnMucmVkdWNlKChlbGVtLCBsaXN0ZW5lcikgPT4ge1xuICAgICAgcmV0dXJuIGxpc3RlbmVyLnJlbmRlcihlbGVtLCB0aGlzKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdGV4dCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGVsZW1UZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgYW5kIGFwcGVuZCBhbGwgY2hpbGRyZW4gYW5kIHJldHVybiByZXN1bHQ6XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHRhcmdldCBpcyBnaXZlbiwgYXBwZW5kcyByZXN1bHQgb2YgcmVuZGVyIHRvIHRoYXQgdGFyZ2V0OlxuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSWYgdGFyZ2V0IGlzIHN0cmluZywgZmluZCBub2RlIHVzaW5nIHF1ZXJ5IHNlbGVjdG9yOlxuICAgICAgaWYgKHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcmlzZSBhc3N1bWUgdGhhdCB0YXJnZXQgaXMgRE9NRWxlbWVudDpcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llTGlzdGVuZXJdIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgbGlzdGVuZXJzKVxuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIFt5bmd3aWVFbGVtZW50XSwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gUmVuZGVycyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyBpbiB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXBwZW5kcyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0OlxuICAvLyBOT1RFOiBFTEVNRU5UIG9mIHRhcmdldCBpcyByZXR1cm5lZFxuICBzdGF0aWMgcmVuZGVyVG8odGFyZ2V0LCBlbGVtcywgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGlmIChlbGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICByZXR1cm4gZWxlbXMucmVkdWNlKChyZXN1bHQsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgICAgZWxlbS5yZW5kZXIocmVzdWx0KTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgcmVuZGVyZWQgdG8gdGFyZ2V0XCIsIGVsZW0pO1xuICAgICAgfSwgbm9kZSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VtZW50XCIsIGVsZW1zKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCB5bmd3aWVFbGVtZW50LCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBSZXBsYWNlcyB0aGUgZ2l2ZW4gdGFyZ2V0IHdpdGggdGhlIHJlbmRlciBvZiB0aGUgZ2l2ZW4gaW5zdGFuY2UgIG9mIFluZ3dpZUVsZW1lbnQgaW4gdGhlIGdpdmVuIGNvbnRleHQ6XG4gIHN0YXRpYyBpbmplY3QodGFyZ2V0LCBlbGVtLCBjdHgpIHtcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gY3R4ID09PSB1bmRlZmluZWQgPyBkb2N1bWVudCA6IGN0eDtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIGxldCByZXN1bHQgPSBlbGVtLnJlbmRlcigpO1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0YXJnZXRcIiwgZWxlbSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCAqIC0+IEVSUk9SXG4gIC8vIE5PVEUgOjogXCJkYXRhXCIgYXJndW1lbnQgaXMgYWx3YXlzIGNhc3QgYXMgU1RSSU5HOlxuICBjb25zdHJ1Y3Rvcihtc2csIGRhdGEpIHtcbiAgICBzdXBlcihtc2cpO1xuICAgIHRoaXMuZGF0YSA9IGAke2RhdGF9YDtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gIFZPSURcbiAgLy8gQ29uc29sZXMgb3V0IHN0YWNrIHRyYWNlIG9mIGVycm9yLCBhbG9uZyB3aXRoIHRoZSBkYXRhIHRoYXQgY2F1c2VkIHRoZSBleGNlcHRpb24gdG8gYmUgdGhyb3duOlxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGFjayk7XG4gICAgY29uc29sZS5sb2coXCJXaGF0IEZhaWxlZDogXCIsIHRoaXMuZGF0YSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTGlzdGVuZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKV0gLT4geW5nd2llTGlzdGVuZXJcbiAgY29uc3RydWN0b3IoZXZ0TmFtZSwgZm5zKSB7XG4gICAgdGhpcy5fZXZ0TmFtZSA9IGV2dE5hbWU7XG4gICAgdGhpcy5fZm5zID0gZm5zIHx8IFtdO1xuICB9XG5cbiAgLy8gOjogKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHluZ3dpZUxpc3RlbmVyOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgZXZ0TmFtZSA9IGAke3RoaXMuX2V2dE5hbWV9YDtcbiAgICBsZXQgZm5zID0gdGhpcy5fZm5zLm1hcChmbj0+e1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImV2dFwiLCBcImVsZW1cIiwgZm4udG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVMaXN0ZW5lcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRUxFTUVOVCwgT0JKRUNUIC0+IEVMRU1FTlRcbiAgLy8gQ3JlYXRlcyBldmVudCBsaXN0ZW5lciBhbmQgYmluZHMgaXQgdG8gZ2l2ZW4gRE9NIEVMRU1FTlQsIGFuZCBjYWxscyBmdW5jdGlvbiBvZiBsaXN0ZW5lciB0byBnaXZlbiBjb250ZXh0XG4gIC8vIE5PVEU6IElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiB0aGUgRUxFTUVOVCB0aGUgbGlzdGVuZXIgaXMgYm91bmQgdG9cbiAgcmVuZGVyKGVsZW0sIGN0eCkge1xuICAgIHJldHVybiB0aGlzLl9mbnMucmVkdWNlKChlbGVtLCBmbikgPT4ge1xuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHRoaXMuX2V2dE5hbWUsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZm4uY2FsbChjdHggPT09IHVuZGVmaW5lZCA/IGVsZW0gOiBjdHgsIGV2dCwgZWxlbSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGVsZW0pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5ULCBFTEVNRU5UIC0+IFZPSUQpXXwoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCkgLT4geW5nd2llTGlzdGVuZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChldnROYW1lLCBmbnMpIHtcbiAgICByZXR1cm4gZm5zICE9PSB1bmRlZmluZWRcbiAgICAgID8gbmV3IFluZ3dpZUxpc3RlbmVyKGV2dE5hbWUsIEFycmF5LmlzQXJyYXkoZm5zKSA9PT0gdHJ1ZSA/IGZucyA6IFtmbnNdKVxuICAgICAgOiBuZXcgWW5nd2llTGlzdGVuZXIoZXZ0TmFtZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZih2YWx1ZSkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7ICAgICAgIC8vIEFyYml0cmFyeSBTVFJJTkcgdmFsdWUgdGhhdCBjYW4gYmUgc3RvcmVkIGJ5IHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkOyAgLy8gUGFyZW50IG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fZmlyc3QgPSB1bmRlZmluZWQ7ICAgLy8gRmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9sYXN0ID0gdW5kZWZpbmVkOyAgICAvLyBMYXN0IGNoaWxkIG9mIHRoaXMgbm9kZTtcbiAgICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7ICAgIC8vIE5leHQgc2libGluZyBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7ICAgIC8vIFByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIG5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVmFsdWUgb2YgWW5nd2llTm9kZSBtdXN0IGJlIFNUUklOR1wiLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBbeW5nd2llTm9kZV1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgY2hpbGRyZW4oKSB7XG5cbiAgICBsZXQgY2hpbGQgPSB0aGlzLl9maXJzdDsgICAvLyBGaXJzdCBjaGlsZFxuICAgIGxldCBjaGlsZHJlbiA9IFtdOyAgICAgICAgIC8vIEFycmF5IG9mIGNoaWxkcmVuIHRvIHJldHVyblxuXG4gICAgLy8gTG9va3MgZm9yIG5leHQgc2libGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBzaWJsaW5nczpcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmFyeSB5bmdpd05vZGUgZWxlbWVudHM6XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXNcbiAgLy8gQWRkcyBnaXZlbiBub2RlIHRvIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgLy8gTk9URTogSWYgZ2l2ZW4gbm9kZSBhbHJlYWR5IGhhcyBhIHBhcmVudCwgdGhhdCBub2RlIGlzIGRldGFjaGVkIGFuZCBhcHBlbmVkIHRvIHRoaXMgbm9kZTpcbiAgYXBwZW5kKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIElmIGdpdmVuIG5vZGUgaGFzIHBhcmVudCwgZGV0YWNoIHRoYXQgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICAgICAgaWYgKG5vZGUuX3BhcmVudCkge1xuICAgICAgICBub2RlLmRldGFjaCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbmV3IG5vZGUgYXMgbGFzdCBzaWJsaW5nOlxuICAgICAgaWYgKHRoaXMuX2ZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX2xhc3Q7ICAgIC8vIFNldHMgbmV3IGxhc3QgY2hpbGQncyBwcmV2aW91cyBub2RlIHRvIG9sZCBsYXN0IG5vZGVcbiAgICAgICAgdGhpcy5fbGFzdC5fbmV4dCA9IG5vZGU7ICAgIC8vIFNldCBvbGQgbGFzdCBjaGlsZCBuZXh0IGVsZW1lbnQgdG8gbmV3IGxhc3QgY2hpbGRcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7ICAgICAgICAgLy8gU2V0IG5ldyBsYXN0IGNoaWxkIHRvIGdpdmVuIG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXIgYXJlIG5vIGNoaWxkcmVuLCB0aGVuIHRoaXMgbm9kZSBpcyBhbiBvbmx5IGNoaWxkOlxuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFyZW50XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAvLyBSZXR1cm4gaW5zdGFuY2U6Y29zbm9sZVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBhcHBwZW5kIFluZ3dpZU5vZGUgdG8gb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFt5bmd3aWVOb2RlXSAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgYW4gYXJyYXkgb2YgWW5nd2llTm9kZXMgdG8gdGhpcyBpbnN0YW5jZTpcbiAgYXBwZW5kcyhub2Rlcykge1xuICAgIGlmIChub2RlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gbm9kZXMucmVkdWNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kKG5vZGUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VlbW50XCIsIG5vZGVzKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBEZXRhY2hlcyB0aGlzIG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgZGV0YWNoKCkge1xuXG4gICAgLy8gTWFrZSBwcmV2aW91cyBub2RlJ3MgbmV4dCBub2RlIHRoaXMgbm9kZSdzIG5leHQgbm9kZTpcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIHByZXZpb3VzIG5vZGUsIHRoZW4gdGhpcyBub2RlIG11c3QgYmUgZmlyc3QgY2hpbGQgb2YgcGFyZW50IChpZiBub2RlIGhhcyBwYXJlbnQpOlxuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gdGhpcy5fbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIG5leHQgbm9kZSdzIHByZXZpb3VzIG5vZGUgdGhpcyBub2RlJ3MgcHJldmlvdXMgbm9kZTpcbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy5fbmV4dC5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgfVxuXG4gICAgLy8gVW5zZXQgYWxsIHJlbGF0aW9uczpcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gUmV0dXJuIGluc3RhbmNlOlxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXM7XG4gIC8vIEluc2VydHMgZ2l2ZW4geW5nd2llTm9kZSBiZWZvcmUgdGhpcyBpbnN0YW5jZSBvZiB5bmd3aWVOb2RlOlxuICAvLyBOT1RFOiBhLmluc2VydHNCZWZvcmUoYikgbWVhbnMgXCJiXCIgaXMgaW5zZXJ0ZWQgYmVmb3JlIFwiYVwiXG4gIGluc2VydEJlZm9yZShub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBTZXQgcmVsYXRpb25zXG4gICAgICBub2RlLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICAgIG5vZGUuX25leHQgPSB0aGlzO1xuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZyByZWxhdGlvbnM6XG4gICAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZzpcbiAgICAgIHRoaXMuX3ByZXYgPSBub2RlO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGluc2VydCBhIFluZ3dpZU5vZGUgYmVmb3JlIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmVwbGFjZSB0aGlzIG5vZGUgd2l0aCBnaXZlbiBub2RlOlxuICByZXBsYWNlV2l0aChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBDaGVja3MgaWYgdGhpcyBub2RlIGhhcyBhIHBhcmVudFxuICAgICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgLy8gUmVwbGFjZW1lbnQgaXMgYWNjb21wbGlzaGVkIGJ5IGZpcnN0IGluc2VydGluZyBnaXZlbiBub2RlLCB0aGVuIGRldGF0Y2hpbmcgdGhpcyBub2RlOlxuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShub2RlKTtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBZbmd3aWVOb2RlIGlmIFluZ3dpZU5vZGUgYmVpbmcgcmVwbGFjZWQgaGFzIHBhcmVudFwiLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgYSBZbmd3aWVOb2RlIHdpdGggYW5vdGhlciBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmV0dXJucyBkZWVwIGNsb25lIG9mIHRoaXMgbm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHZhbHVlID0gYCR7dGhpcy5fdmFsdWV9YDtcbiAgICBsZXQgY2xvbmUgPSBuZXcgWW5nd2llTm9kZSh2YWx1ZSlcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2xvbmUgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuICAgIH0sIGNsb25lKTtcbiAgfVxuXG4gIC8vIE5PREUsICogLT4gTk9ERSAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gYSByZXN1bHQgYW5kIHRoaXMgbm9kZSwgd2hlcmUgdGhhdCBmdW5jdGlvbiByZXR1cm5zIHRoZSBuZXh0IG5vZGUgdG8gdGhhdCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvXG4gIC8vIE5PVEU6IFJlc3VsdCBpcyByZXR1cm5lZCB3aGVuIHRoZXJlIGlzIG5vIG5leHQgbm9kZSB0byBhcHBseSBmdW5jdGlvbiB0b1xuICBzdGVwKGZuLCByZXN1bHQpIHtcbiAgICBuZXh0ID0gZm4odGhpcywgcmVzdWx0KTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5zdGVwKGZuLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gOjogTk9ERSwgKiAtPiAqLCAqIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byB0aGlzIG5vZGUgYW5kIGl0J3MgZGVzY2VuZGFudHMsIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHBhcnNlKGZuLCByZXN1bHQpIHtcbiAgICBZbmd3aWVOb2RlLnBhcnNlKHRoaXMsIChub2RlKSA9PiB7XG4gICAgICByZXN1bHQgPSBmbihub2RlLCByZXN1bHQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogU3RhdGljIEZ1bmN0aW9uXG4gICAqXG4gICAqL1xuXG4gIC8vIFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZFxuICBzdGF0aWMgaW5pdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTm9kZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBOT0RFLCBOT0RFIC0+IFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gYSBub2RlIGFuZCBhbGwgaXQncyBkZXNlbmRhbnRzXG4gIC8vIE5PREU6IFRoaXMgaXMgYSByZS1pbXBsZW1lbnRhdGlvbiBvZiBDcm9ja2ZvcmQncyBET00gd2FsayBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6IFRoZSBHb29kIFBhcnRzXCJcbiAgc3RhdGljIHBhcnNlKG5vZGUsIGZuKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICBmbihub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLl9maXJzdDtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIFluZ3dpZU5vZGUucGFyc2Uobm9kZSwgZm4pO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHBhcnNlIGEgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVUZXh0Tm9kZSBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgc3VwZXIodGV4dCk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRleHQgb2YgdGhpcyB0ZXh0IG5vZGU6XG4gIHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfHluZ3dpZVRleHROb2RlIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBTVFJJTkcgaW5zdGVhZCBvZiBOT0RFIHNpbmNlIGEgVGV4dE5vZGUgaGFzIG5vIGNoaWxkcmVuXG4gIGFwcGVuZCh2YWwpIHtcblxuICAgIGlmICh0eXBlb2YodmFsKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVUZXh0Tm9kZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB2YWwudGV4dCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFNUUklOR3MgYW5kIG90aGVyIFluZ3dpZVRleHROb2RlcyBjYW4gYXBwZW5kIGEgWW5nd2llVGV4dE5vZGVcIiwgdmFsKTtcbiAgfVxuXG4gIC8vOjogU1RSSU5HfEVMRU1FTlR8Vk9JRCwgT0JKRUNUIC0+IFRFWFRcbiAgLy8gQ3JlYXRlcyBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKHRhcmdldCwgY3R4KSB7XG4gICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgIGxldCB0ZXh0Tm9kZSA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpO1xuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHROb2RlO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB5bmd3aWVUZXh0Tm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZShgJHt0aGlzLl92YWx1ZX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGV4dCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUodGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4uL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRyYW5zZm9ybSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogKiAtPiB5bmd3aWVUcmFuc2Zvcm1cbiAgY29uc3RydWN0b3IodmFsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbHVlIHRvIHRyYW5zZm9ybVxuICAgIHRoaXMuX3R5cGUgPSBZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZSh2YWwpOyAvLyBTdG9yZXMgdmFsdWUncyB0eXBlIGZvciBkZXRlcm1pbmluZyBob3cgaXQgY2FuIGJlIHRyYW5zZm9ybWVkXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IE5PREVcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIERPTUVsZW1lbnQgTk9ERTpcbiAgdG9OT0RFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0aGlzLl92YWx1ZSwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIHJldHVybiBkb2MuYm9keS5maXJzdENoaWxkO1xuICAgICAgY2FzZSBcIllOR1dJRVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUucmVuZGVyKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIE5PREUgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHRvU1RSSU5HKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLm5vZGVUeXBlID09PSAxID8gdGhpcy5fdmFsdWUub3V0ZXJIVE1MIDogdGhpcy5fdmFsdWUubm9kZVZhbHVlO1xuICAgICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2cobm9kZSlcbiAgICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBub2RlLm91dGVySFRNTCA6IG5vZGUubm9kZVZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBTVFJJTkcgZnJvbSB1bnN1cHBvdGVkIHR5cGVcIiwgdGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFRyYW5zZm9ybXMgc3RvcmVkIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICB0b1lOR1dJRSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgIGNhc2UgXCJOT0RFXCI6XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiBZbmd3aWVUcmFuc2Zvcm0uaW5pdCh0aGlzLl92YWx1ZSk7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gWW5nd2llRWxlbWVudCBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkd8Tk9ERSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFRyYW5zZm9ybXMgc3RyaW5nIG9mIEhUTUwgb3IgRE9NRWxlbWVudCBOT0RFIGludG8gYSB5bmd3aWVFbGVtZW50XG4gIC8vIE5PVEU6IFRoaXMgRE9FUyBOT1QgdHJhbnNmb3JtIGV2ZW50IGhhbmRsZXJzIGludG8gWW5nd2llTGlzdGVuZXIgb2JqZWN0czpcbiAgc3RhdGljIGluaXQoaHRtbCkge1xuICAgIHJldHVybiB3YWxrTm9kZShZbmd3aWVUcmFuc2Zvcm0uZ2V0VHlwZShodG1sKSA9PT0gXCJTVFJJTkdcIiA/IFluZ3dpZVRyYW5zZm9ybS50b05PREUoaHRtbCkgOiBodG1sKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gTk9ERVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBOT0RFOlxuICBzdGF0aWMgdG9OT0RFKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b05PREUoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4gU1RSSU5HXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIFNUUklORzpcbiAgc3RhdGljIHRvU1RSSU5HKHZhbCkge1xuICAgIGxldCB0cmFuc2Zvcm0gPSBuZXcgWW5nd2llVHJhbnNmb3JtKHZhbCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybS50b1NUUklORygpO1xuICB9XG5cbiAgLy8gOjogKiAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZCB0aGF0IHRyYW5zZm9ybXMgZ2l2ZW4gdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHN0YXRpYyB0b1lOR1dJRSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9ZTkdXSUUoKTtcbiAgfVxuXG4gIC8vICogLT4gXCJOT0RFXCJ8XCJTVFJJTkdcInxcIllOR1dJRVwifFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIG5hbWUgb2YgdHlwZSBmb3IgZ2l2ZW4gdmFsdWU6XG4gIHN0YXRpYyBnZXRUeXBlKHZhbCkge1xuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIHJldHVybiBcIk5PREVcIjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mKHZhbCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBcIlNUUklOR1wiO1xuICAgIH1cblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG4gICAgICByZXR1cm4gXCJZTkdXSUVcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIH1cblxufVxuXG4vKipcbiAqXG4gKiAgTG9jYWwgRnVuY3Rpb25zXG4gKlxuICovXG5cbi8vIDo6IE5PREUsIE5PREUsIG5vZGUubm9kZVR5cGUgLT4gVk9JRFxuLy8gQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBZbmd3aWVFbGVtZW50IGZyb20gdGhlIGdpdmVuIG5vZGUgYW5kIGFsbCBvZiBpdCdzIGRlc2VuZGVudHM6XG4vLyBOT1RFOiBJbnNwaXJlZCBieSBDcm9ja2ZvcmQncyBET00gd2Fsa2luZyBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6VGhlIEdvb2QgUGFydHNcIlxuZnVuY3Rpb24gd2Fsa05vZGUobm9kZSwgcmVzdWx0KSB7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBsZXQgYXR0cmlicyA9IGdldEF0dHJpYnV0ZXMobm9kZSk7XG4gICAgbGV0IGVsZW0gPSBuZXcgWW5nd2llRWxlbWVudChub2RlLnRhZ05hbWUsIGF0dHJpYnMpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVsZW1cbiAgICAgIDogcmVzdWx0LmFwcGVuZChlbGVtKTtcbiAgfVxuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgbGV0IHRleHROb2RlID0gbmV3IFluZ3dpZVRleHROb2RlKG5vZGUubm9kZVZhbHVlKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyB0ZXh0Tm9kZVxuICAgICAgOiByZXN1bHQuYXBwZW5kKHRleHROb2RlKTtcbiAgfVxuXG4gIG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBsZXQgY2hpbGQgPSB3YWxrTm9kZShub2RlKTtcbiAgICBpZiAoY2hpbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQuYXBwZW5kKGNoaWxkKTtcbiAgICB9XG4gICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xuXG59XG5cbi8vIDo6IERPTUVsZW1lbnQgLT4gT0JKRUNUXG4vLyBSZXR1cm5zIE9CSkVDVCBvZiBhdHRyaWJ1dGVzIGZyb20gdGhlIGdpdmVuIERPTSBFbGVtZW50OlxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlcyhlbGVtKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGVsZW0uYXR0cmlidXRlcykucmVkdWNlKChyZXN1bHQsIGF0dHJpYikgPT4ge1xuICAgIHJlc3VsdFthdHRyaWIubmFtZV0gPSBhdHRyaWIudmFsdWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSwge30pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFbGVtZW50IGZyb20gXCIuL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuL1RleHROb2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVMaXN0ZW5lciBmcm9tIFwiLi9MaXN0ZW5lci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQge1xuICBZbmd3aWVOb2RlIGFzIE5vZGUsXG4gIFluZ3dpZUVsZW1lbnQgYXMgRWxlbWVudCxcbiAgWW5nd2llVGV4dE5vZGUgYXMgVGV4dE5vZGUsXG4gIFluZ3dpZUxpc3RlbmVyIGFzIExpc3RlbmVyLFxuICBZbmd3aWVUcmFuc2Zvcm0gYXMgVHJhbnNmb3JtLFxuICBZbmd3aWVFcnJvciBhcyBFcnJvclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==