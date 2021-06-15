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

/***/ "./src/Controller/main.js":
/*!********************************!*\
  !*** ./src/Controller/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieController)
/* harmony export */ });
class YngwieController {

  // CONSTRUCTOR :: STRING, [(EVENT, ELEMENT -> VOID)] -> yngwieController
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

  // :: VOID -> yngwieController
  // Creates clone of this yngwieController:
  clone() {
    let evtName = `${this._evtName}`;
    let fns = this._fns.map(fn=>{
      return new Function("evt", "elem", fn.toString());
    });
    return new YngwieController(evtName, fns);
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

  // :: STRING, [(EVENT, ELEMENT -> VOID)]|(EVENT, ELEMENT -> VOID) -> yngwieController
  // Static factory method:
  static init(evtName, fns) {
    return fns !== undefined
      ? new YngwieController(evtName, Array.isArray(fns) === true ? fns : [fns])
      : new YngwieController(evtName);
  }

}


/***/ }),

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
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Error/main.js */ "./src/Error/main.js");




class YngwieElement extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // CONSTRUCTOR :: STRING. OBJECT, STRING, [yngwieController] -> yngwieElement
  constructor(tagName, attribs, text, controllers) {
    super(tagName.toUpperCase());     // Stores tagName in ALL CAPS
    this._attribs = attribs || {};     // Element Attributes
    this._text = text;                 // Element text that's appended as first child of this element
    this._controllers = [];            // Controllers bound to this element
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
  // Binds controller by event name to node at render:
  // NOTE: Function bound to controller is called in the context of this element
  on(evtName, fns) {
    let controller = Yngwie.Controller.init(evtName, fns);
    this._controllers.push(controller);
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

    // Copy controllers:
    let controllers = this._controllers.map((controller) => {
      return controller.clone();
    });

    // Copy children and return element:
    let elem = new YngwieElement(tagName, attribs, text, controllers);
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

    // Bind Controllers:
    elem = this._controllers.reduce((elem, controller) => {
      return controller.render(elem, this);
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

  // :: STRING. OBJECT, STRING, [yngwieController] -> yngwieElement
  // Static factory method:
  static init(tagName, attribs, text, controllers) {
    return new YngwieElement(tagName, attribs, text, controllers)
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
  // NOTE: This DOES NOT transform event handlers into YngwieController objects:
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
/* harmony export */   "Controller": () => (/* reexport safe */ _Controller_main_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Transform": () => (/* reexport safe */ _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Error": () => (/* reexport safe */ _Error_main_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./src/TextNode/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var _Transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform/main.js */ "./src/Transform/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error/main.js */ "./src/Error/main.js");









})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UcmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0RBQVU7QUFDakM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIscURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsc0RBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7Ozs7Ozs7VUNyS0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTndDO0FBQ007QUFDRTtBQUNJO0FBQ0Y7QUFDUjs7QUFTekMiLCJmaWxlIjoieW5nd2llLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKV0gLT4geW5nd2llQ29udHJvbGxlclxuICBjb25zdHJ1Y3RvcihldnROYW1lLCBmbnMpIHtcbiAgICB0aGlzLl9ldnROYW1lID0gZXZ0TmFtZTtcbiAgICB0aGlzLl9mbnMgPSBmbnMgfHwgW107XG4gIH1cblxuICAvLyA6OiAoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQWRkcyBmdW5jdGlvbiB0byBsaXN0ZW5lcjpcbiAgYWRkKGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVDb250cm9sbGVyXG4gIC8vIENyZWF0ZXMgY2xvbmUgb2YgdGhpcyB5bmd3aWVDb250cm9sbGVyOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgZXZ0TmFtZSA9IGAke3RoaXMuX2V2dE5hbWV9YDtcbiAgICBsZXQgZm5zID0gdGhpcy5fZm5zLm1hcChmbj0+e1xuICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImV2dFwiLCBcImVsZW1cIiwgZm4udG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVDb250cm9sbGVyKGV2dE5hbWUsIGZucyk7XG4gIH1cblxuICAvLyA6OiBFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBDcmVhdGVzIGV2ZW50IGxpc3RlbmVyIGFuZCBiaW5kcyBpdCB0byBnaXZlbiBET00gRUxFTUVOVCwgYW5kIGNhbGxzIGZ1bmN0aW9uIG9mIGxpc3RlbmVyIHRvIGdpdmVuIGNvbnRleHRcbiAgLy8gTk9URTogSWYgbm8gY29udGV4dCBpcyBnaXZlbiwgZnVuY3Rpb24gaXMgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIHRoZSBFTEVNRU5UIHRoZSBsaXN0ZW5lciBpcyBib3VuZCB0b1xuICByZW5kZXIoZWxlbSwgY3R4KSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zucy5yZWR1Y2UoKGVsZW0sIGZuKSA9PiB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5fZXZ0TmFtZSwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBmbi5jYWxsKGN0eCA9PT0gdW5kZWZpbmVkID8gZWxlbSA6IGN0eCwgZXZ0LCBlbGVtKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZWxlbSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQgLT4gVk9JRCldfChFVkVOVCwgRUxFTUVOVCAtPiBWT0lEKSAtPiB5bmd3aWVDb250cm9sbGVyXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQoZXZ0TmFtZSwgZm5zKSB7XG4gICAgcmV0dXJuIGZucyAhPT0gdW5kZWZpbmVkXG4gICAgICA/IG5ldyBZbmd3aWVDb250cm9sbGVyKGV2dE5hbWUsIEFycmF5LmlzQXJyYXkoZm5zKSA9PT0gdHJ1ZSA/IGZucyA6IFtmbnNdKVxuICAgICAgOiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRWxlbWVudCBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVDb250cm9sbGVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKSB7XG4gICAgc3VwZXIodGFnTmFtZS50b1VwcGVyQ2FzZSgpKTsgICAgIC8vIFN0b3JlcyB0YWdOYW1lIGluIEFMTCBDQVBTXG4gICAgdGhpcy5fYXR0cmlicyA9IGF0dHJpYnMgfHwge307ICAgICAvLyBFbGVtZW50IEF0dHJpYnV0ZXNcbiAgICB0aGlzLl90ZXh0ID0gdGV4dDsgICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgdGV4dCB0aGF0J3MgYXBwZW5kZWQgYXMgZmlyc3QgY2hpbGQgb2YgdGhpcyBlbGVtZW50XG4gICAgdGhpcy5fY29udHJvbGxlcnMgPSBbXTsgICAgICAgICAgICAvLyBDb250cm9sbGVycyBib3VuZCB0byB0aGlzIGVsZW1lbnRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGFnTmFtZSBvZiB0aGlzIGVsZW1lbnQ6XG4gIHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgLy8gOjogT0JKRUNUfFZPSUQgLT4gdGhpc3xPQkpFQ1RcbiAgLy8gU2V0cyBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBPQkpFQ1Q6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgYXR0cmlidXRlcyBhcmUgcmV0dXJuZWQ6XG4gIGF0dHJpYnMoYXR0cmlicykge1xuICAgIGlmIChhdHRyaWJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKGF0dHJpYnMpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlluZ3dpZUVsZW1lbnQgYXR0cmlidXRlcyBjYW4gb25seSBiZSBzZXQgd2l0aCBPQkpFQ1RcIiwgYXR0cmlicyk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gKnxVTkRFRklORURcbiAgLy8gUmV0dXJucyB2YWx1ZSBvZiBhdHRyaWJ1dGUgYnkgbmFtZSBzdG9yZWQgaW4gXCJhdHRyaWJzXCIgT0JKRUNULCBvdGhlcndpc2UgcmV0dXJucyBVTkRFRklORURcbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgKiAtPiB0aGlzXG4gIC8vIEJpbmRzICB2YWx1ZSB0byBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBuYW1lOlxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLl9hdHRyaWJzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBSZW1vdmUgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBmcm9tIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5fYXR0cmlic1tuYW1lXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xWT0lEIC0+IHRoaXN8VU5ERUZJTkVEXG4gIC8vIEFwcGVuZHMgdGV4dCBub2RlIGFzIGZpcnN0IGNoaWxkIG9mIGVsZW1lbnQgYXQgcmVuZGVyIHdpdGggZ2l2ZW4gc3RyaW5nIGFzIGl0J3MgdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgdGV4dCBpcyByZXR1cm5lZDpcbiAgdGV4dChzdHIpIHtcbiAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHN0cjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJUZXh0IG9mIGVsZW1lbnQgY2FuIG9ubHkgYmUgc2V0IHdpdGggYSBTVFJJTkdcIiwgc3RyKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gU2V0cyB0ZXh0IGFzIFVOREVGSU5FRCBmb3IgdGhpcyBlbGVtZW50OlxuICByZW1vdmVUZXh0KCkge1xuICAgIHRoaXMuX3RleHQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiAoeW5nd2llRWxlbWVudCAtPiBCT09MRUFOKSAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQsIHdoZW4gdGhlIGdpdmVuIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50cyBhbmQgaXQncyBkZXNlbmRhbnRzLCB0aGF0IGZ1bmN0aW9uIHJldHVybnMgVFJVRTpcbiAgZ2V0RWxlbWVudHNCeShmbikge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChub2RlLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICBpZiAoZm4obm9kZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgWW5nd2llRWxlbW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIHRhZ05hbWU6XG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIHRhZyBuYW1lOlxuICBnZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IGVsZW0udGFnTmFtZSgpID09PSB0YWdOYW1lKTtcbiAgfVxuXG4gIC8vIFNUUklORywgU1RSSU5HfFZPSUQgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIHZhbHVlIGlzIGdpdmVuLCB0aGVuIGFueSBlbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBhdHRyaWJ1dGUgbmFtZSBpcyByZXR1cm5lZFxuICBnZXRFbGVtZW50c0J5QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeShlbGVtID0+IHtcbiAgICAgIGlmIChlbGVtLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBjbGFzcyBuYW1lXG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIGNsYXNzIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgWW5nd2llRWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gSUQ6XG4gIC8vIE5PVEU6IFJldHVybnMgVU5ERUZJTkVEIGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBJRFxuICBnZXRFbGVtZW50QnlJRChpZCkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJpZFwiLCBpZCkucG9wKCk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQsIEVMRU1FTlQpIC0+IFZPSURdfChFVkVOVCwgRUxFTUVOVCkgLT4gVk9JRCAtPiAgdGhpc1xuICAvLyBCaW5kcyBjb250cm9sbGVyIGJ5IGV2ZW50IG5hbWUgdG8gbm9kZSBhdCByZW5kZXI6XG4gIC8vIE5PVEU6IEZ1bmN0aW9uIGJvdW5kIHRvIGNvbnRyb2xsZXIgaXMgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIHRoaXMgZWxlbWVudFxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IFluZ3dpZS5Db250cm9sbGVyLmluaXQoZXZ0TmFtZSwgZm5zKTtcbiAgICB0aGlzLl9jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnTmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBjb250cm9sbGVyczpcbiAgICBsZXQgY29udHJvbGxlcnMgPSB0aGlzLl9jb250cm9sbGVycy5tYXAoKGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLmNsb25lKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDb3B5IGNoaWxkcmVuIGFuZCByZXR1cm4gZWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xFTEVNRU5ULCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBUcmFuc2Zvcm1zIHRoaXMgZWxlbWVudCBhbmQgaXQncyBkZXNlbmRhbnRzIGludG8gYSBET00gRUxFTUVOVCwgYXBwZW5kaW5nIHJlc3VsdCB0byBnaXZlbiB0YXJnZXRcbiAgLy8gYW5kIHJlbmRlcmluZyB0aGF0IEVMRU1FTlQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuIE9CSkVDVC4gSWYgbm8gdGFyZ2V0IHRvIGFwcGVuZCBpcyBnaXZlbixcbiAgLy8gdGhlIHJlbmRlcmVkIEVMRU1FTlQgaXMgcmV0dXJuZWQuIElmIG5vIGNvbnRleHQgaXMgZ2l2ZW4sIHRoZW4gRE9DVU1FTlQgaXMgdXNlZCBieSBkZWZhdWx0LlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcblxuICAgIC8vIENoZWNrIGlmIGRlZmF1bHQgY29udGV4dCBvZiBET0NVTUVOVCBzaG91bGQgYmUgdXNlZDpcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQodGhpcy5fdmFsdWUpKTtcblxuICAgIC8vIEJpbmQgQ29udHJvbGxlcnM6XG4gICAgZWxlbSA9IHRoaXMuX2NvbnRyb2xsZXJzLnJlZHVjZSgoZWxlbSwgY29udHJvbGxlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIucmVuZGVyKGVsZW0sIHRoaXMpO1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgc2V0LCBjcmVhdGUgYW5kIGFwcGVuZCB0ZXh0IG5vZGU6XG4gICAgaWYgKHR5cGVvZih0aGlzLl90ZXh0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IGVsZW1UZXh0ID0gY29udGV4dC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl90ZXh0KTtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWxlbVRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbmRlciBhbmQgYXBwZW5kIGFsbCBjaGlsZHJlbiBhbmQgcmV0dXJuIHJlc3VsdDpcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5yZW5kZXIoKTtcbiAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgdGFyZ2V0IGlzIGdpdmVuLCBhcHBlbmRzIHJlc3VsdCBvZiByZW5kZXIgdG8gdGhhdCB0YXJnZXQ6XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBJZiB0YXJnZXQgaXMgc3RyaW5nLCBmaW5kIG5vZGUgdXNpbmcgcXVlcnkgc2VsZWN0b3I6XG4gICAgICBpZiAodHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldCkuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyaXNlIGFzc3VtZSB0aGF0IHRhcmdldCBpcyBET01FbGVtZW50OlxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVDb250cm9sbGVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpXG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RUxFTUVOVCwgW3luZ3dpZUVsZW1lbnRdLCBPQkpFQ1QgLT4gRUxFTUVOVFxuICAvLyBSZW5kZXJzIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIGluIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcHBlbmRzIHJlc3VsdCB0byBnaXZlbiB0YXJnZXQ6XG4gIC8vIE5PVEU6IEVMRU1FTlQgb2YgdGFyZ2V0IGlzIHJldHVybmVkXG4gIHN0YXRpYyByZW5kZXJUbyh0YXJnZXQsIGVsZW1zLCBjdHgpIHtcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG4gICAgaWYgKGVsZW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIHJldHVybiBlbGVtcy5yZWR1Y2UoKHJlc3VsdCwgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtLnJlbmRlcihyZXN1bHQpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSByZW5kZXJlZCB0byB0YXJnZXRcIiwgZWxlbSk7XG4gICAgICB9LCBub2RlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndW1lbnRcIiwgZWxlbXMpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfEVMRU1FTlQsIHluZ3dpZUVsZW1lbnQsIE9CSkVDVCAtPiBFTEVNRU5UXG4gIC8vIFJlcGxhY2VzIHRoZSBnaXZlbiB0YXJnZXQgd2l0aCB0aGUgcmVuZGVyIG9mIHRoZSBnaXZlbiBpbnN0YW5jZSAgb2YgWW5nd2llRWxlbWVudCBpbiB0aGUgZ2l2ZW4gY29udGV4dDpcbiAgc3RhdGljIGluamVjdCh0YXJnZXQsIGVsZW0sIGN0eCkge1xuICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgbGV0IGNvbnRleHQgPSBjdHggPT09IHVuZGVmaW5lZCA/IGRvY3VtZW50IDogY3R4O1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGNvbnRleHQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgbGV0IHJlc3VsdCA9IGVsZW0ucmVuZGVyKCk7XG4gICAgICBub2RlLnJlcGxhY2VXaXRoKHJlc3VsdCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSBpbmplY3RlZCBpbnRvIHRhcmdldFwiLCBlbGVtKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcsICogLT4gRVJST1JcbiAgLy8gTk9URSA6OiBcImRhdGFcIiBhcmd1bWVudCBpcyBhbHdheXMgY2FzdCBhcyBTVFJJTkc6XG4gIGNvbnN0cnVjdG9yKG1zZywgZGF0YSkge1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5kYXRhID0gYCR7ZGF0YX1gO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiAgVk9JRFxuICAvLyBDb25zb2xlcyBvdXQgc3RhY2sgdHJhY2Ugb2YgZXJyb3IsIGFsb25nIHdpdGggdGhlIGRhdGEgdGhhdCBjYXVzZWQgdGhlIGV4Y2VwdGlvbiB0byBiZSB0aHJvd246XG4gIGxvZygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWNrKTtcbiAgICBjb25zb2xlLmxvZyhcIldoYXQgRmFpbGVkOiBcIiwgdGhpcy5kYXRhKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZU5vZGVcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgICAgICAgLy8gQXJiaXRyYXJ5IFNUUklORyB2YWx1ZSB0aGF0IGNhbiBiZSBzdG9yZWQgYnkgdGhpcyBub2RlXG4gICAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7ICAvLyBQYXJlbnQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9maXJzdCA9IHVuZGVmaW5lZDsgICAvLyBGaXJzdCBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7ICAgIC8vIExhc3QgY2hpbGQgb2YgdGhpcyBub2RlO1xuICAgICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDsgICAgLy8gTmV4dCBzaWJsaW5nIG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDsgICAgLy8gUHJldmlvdXMgc2libGluZyBvZiB0aGUgbm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJWYWx1ZSBvZiBZbmd3aWVOb2RlIG11c3QgYmUgU1RSSU5HXCIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFt5bmd3aWVOb2RlXVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICBjaGlsZHJlbigpIHtcblxuICAgIGxldCBjaGlsZCA9IHRoaXMuX2ZpcnN0OyAgIC8vIEZpcnN0IGNoaWxkXG4gICAgbGV0IGNoaWxkcmVuID0gW107ICAgICAgICAgLy8gQXJyYXkgb2YgY2hpbGRyZW4gdG8gcmV0dXJuXG5cbiAgICAvLyBMb29rcyBmb3IgbmV4dCBzaWJsaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIHNpYmxpbmdzOlxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYW4gYXJyYXJ5IHluZ2l3Tm9kZSBlbGVtZW50czpcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpc1xuICAvLyBBZGRzIGdpdmVuIG5vZGUgdG8gY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICAvLyBOT1RFOiBJZiBnaXZlbiBub2RlIGFscmVhZHkgaGFzIGEgcGFyZW50LCB0aGF0IG5vZGUgaXMgZGV0YWNoZWQgYW5kIGFwcGVuZWQgdG8gdGhpcyBub2RlOlxuICBhcHBlbmQobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gSWYgZ2l2ZW4gbm9kZSBoYXMgcGFyZW50LCBkZXRhY2ggdGhhdCBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gICAgICBpZiAobm9kZS5fcGFyZW50KSB7XG4gICAgICAgIG5vZGUuZGV0YWNoKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBuZXcgbm9kZSBhcyBsYXN0IHNpYmxpbmc6XG4gICAgICBpZiAodGhpcy5fZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLl9wcmV2ID0gdGhpcy5fbGFzdDsgICAgLy8gU2V0cyBuZXcgbGFzdCBjaGlsZCdzIHByZXZpb3VzIG5vZGUgdG8gb2xkIGxhc3Qgbm9kZVxuICAgICAgICB0aGlzLl9sYXN0Ll9uZXh0ID0gbm9kZTsgICAgLy8gU2V0IG9sZCBsYXN0IGNoaWxkIG5leHQgZWxlbWVudCB0byBuZXcgbGFzdCBjaGlsZFxuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTsgICAgICAgICAvLyBTZXQgbmV3IGxhc3QgY2hpbGQgdG8gZ2l2ZW4gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlciBhcmUgbm8gY2hpbGRyZW4sIHRoZW4gdGhpcyBub2RlIGlzIGFuIG9ubHkgY2hpbGQ6XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYXJlbnRcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXM7XG5cbiAgICAgIC8vIFJldHVybiBpbnN0YW5jZTpjb3Nub2xlXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGFwcHBlbmQgWW5nd2llTm9kZSB0byBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogW3luZ3dpZU5vZGVdIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBZbmd3aWVOb2RlcyB0byB0aGlzIGluc3RhbmNlOlxuICBhcHBlbmRzKG5vZGVzKSB7XG4gICAgaWYgKG5vZGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBub2Rlcy5yZWR1Y2UoKHJlc3VsdCwgbm9kZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmQobm9kZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndWVtbnRcIiwgbm9kZXMpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIERldGFjaGVzIHRoaXMgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICBkZXRhY2goKSB7XG5cbiAgICAvLyBNYWtlIHByZXZpb3VzIG5vZGUncyBuZXh0IG5vZGUgdGhpcyBub2RlJ3MgbmV4dCBub2RlOlxuICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gcHJldmlvdXMgbm9kZSwgdGhlbiB0aGlzIG5vZGUgbXVzdCBiZSBmaXJzdCBjaGlsZCBvZiBwYXJlbnQgKGlmIG5vZGUgaGFzIHBhcmVudCk6XG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSB0aGlzLl9uZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2UgbmV4dCBub2RlJ3MgcHJldmlvdXMgbm9kZSB0aGlzIG5vZGUncyBwcmV2aW91cyBub2RlOlxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9XG5cbiAgICAvLyBVbnNldCBhbGwgcmVsYXRpb25zOlxuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZXR1cm4gaW5zdGFuY2U6XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpcztcbiAgLy8gSW5zZXJ0cyBnaXZlbiB5bmd3aWVOb2RlIGJlZm9yZSB0aGlzIGluc3RhbmNlIG9mIHluZ3dpZU5vZGU6XG4gIC8vIE5PVEU6IGEuaW5zZXJ0c0JlZm9yZShiKSBtZWFucyBcImJcIiBpcyBpbnNlcnRlZCBiZWZvcmUgXCJhXCJcbiAgaW5zZXJ0QmVmb3JlKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIFNldCByZWxhdGlvbnNcbiAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgICAgbm9kZS5fbmV4dCA9IHRoaXM7XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nIHJlbGF0aW9uczpcbiAgICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICAgIHRoaXMuX3ByZXYuX25leHQgPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nOlxuICAgICAgdGhpcy5fcHJldiA9IG5vZGU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgaW5zZXJ0IGEgWW5nd2llTm9kZSBiZWZvcmUgb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4geW5nd2llTm9kZVxuICAvLyBSZXBsYWNlIHRoaXMgbm9kZSB3aXRoIGdpdmVuIG5vZGU6XG4gIHJlcGxhY2VXaXRoKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB0aGlzIG5vZGUgaGFzIGEgcGFyZW50XG4gICAgICBpZiAodGhpcy5fcGFyZW50ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAvLyBSZXBsYWNlbWVudCBpcyBhY2NvbXBsaXNoZWQgYnkgZmlyc3QgaW5zZXJ0aW5nIGdpdmVuIG5vZGUsIHRoZW4gZGV0YXRjaGluZyB0aGlzIG5vZGU6XG4gICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUpO1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIC8vIFJldHVybiBnaXZlbiBub2RlOlxuICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSByZXBsYWNlIFluZ3dpZU5vZGUgaWYgWW5nd2llTm9kZSBiZWluZyByZXBsYWNlZCBoYXMgcGFyZW50XCIsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBhIFluZ3dpZU5vZGUgd2l0aCBhbm90aGVyIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTm9kZVxuICAvLyBSZXR1cm5zIGRlZXAgY2xvbmUgb2YgdGhpcyBub2RlOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmFsdWUgPSBgJHt0aGlzLl92YWx1ZX1gO1xuICAgIGxldCBjbG9uZSA9IG5ldyBZbmd3aWVOb2RlKHZhbHVlKVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjbG9uZSA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gcmVzdWx0LmFwcGVuZChjbG9uZSk7XG4gICAgfSwgY2xvbmUpO1xuICB9XG5cbiAgLy8gTk9ERSwgKiAtPiBOT0RFIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byBhIHJlc3VsdCBhbmQgdGhpcyBub2RlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSB0byB0aGF0IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG9cbiAgLy8gTk9URTogUmVzdWx0IGlzIHJldHVybmVkIHdoZW4gdGhlcmUgaXMgbm8gbmV4dCBub2RlIHRvIGFwcGx5IGZ1bmN0aW9uIHRvXG4gIHN0ZXAoZm4sIHJlc3VsdCkge1xuICAgIG5leHQgPSBmbih0aGlzLCByZXN1bHQpO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnN0ZXAoZm4sIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyA6OiBOT0RFLCAqIC0+ICosICogLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIHRoaXMgbm9kZSBhbmQgaXQncyBkZXNjZW5kYW50cywgcmV0dXJuaW5nIHRoZSByZXN1bHQgb2YgdGhhdCBmdW5jdGlvbjpcbiAgcGFyc2UoZm4sIHJlc3VsdCkge1xuICAgIFluZ3dpZU5vZGUucGFyc2UodGhpcywgKG5vZGUpID0+IHtcbiAgICAgIHJlc3VsdCA9IGZuKG5vZGUsIHJlc3VsdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBTdGF0aWMgRnVuY3Rpb25cbiAgICpcbiAgICovXG5cbiAgLy8gU1RSSU5HIC0+IHluZ3dpZU5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kXG4gIHN0YXRpYyBpbml0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVOb2RlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE5PREUsIE5PREUgLT4gVk9JRCAtPiBWT0lEXG4gIC8vIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBhIG5vZGUgYW5kIGFsbCBpdCdzIGRlc2VuZGFudHNcbiAgLy8gTk9ERTogVGhpcyBpcyBhIHJlLWltcGxlbWVudGF0aW9uIG9mIENyb2NrZm9yZCdzIERPTSB3YWxrIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDogVGhlIEdvb2QgUGFydHNcIlxuICBzdGF0aWMgcGFyc2Uobm9kZSwgZm4pIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIGZuKG5vZGUpO1xuICAgICAgbm9kZSA9IG5vZGUuX2ZpcnN0O1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgWW5nd2llTm9kZS5wYXJzZShub2RlLCBmbik7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcGFyc2UgYSBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRleHROb2RlIGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICBzdXBlcih0ZXh0KTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGV4dCBvZiB0aGlzIHRleHQgbm9kZTpcbiAgdGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8eW5nd2llVGV4dE5vZGUgLT4gdGhpc1xuICAvLyBBcHBlbmRzIFNUUklORyBpbnN0ZWFkIG9mIE5PREUgc2luY2UgYSBUZXh0Tm9kZSBoYXMgbm8gY2hpbGRyZW5cbiAgYXBwZW5kKHZhbCkge1xuXG4gICAgaWYgKHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHZhbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIFluZ3dpZVRleHROb2RlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHZhbC50ZXh0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgU1RSSU5HcyBhbmQgb3RoZXIgWW5nd2llVGV4dE5vZGVzIGNhbiBhcHBlbmQgYSBZbmd3aWVUZXh0Tm9kZVwiLCB2YWwpO1xuICB9XG5cbiAgLy86OiBTVFJJTkd8RUxFTUVOVHxWT0lELCBPQkpFQ1QgLT4gVEVYVFxuICAvLyBDcmVhdGVzIERPTSBUZXh0IG5vZGUgc2V0IHdpdGggdGhlIFNUUklORyBzdG9yZWQgaW4gX3ZhbHVlOlxuICByZW5kZXIodGFyZ2V0LCBjdHgpIHtcbiAgICBsZXQgY29udGV4dCA9IGN0eCA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQgOiBjdHg7XG4gICAgbGV0IHRleHROb2RlID0gY29udGV4dC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSk7XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dE5vZGU7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHluZ3dpZVRleHROb2RlOlxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKGAke3RoaXMuX3ZhbHVlfWApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4uL1RleHROb2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vVHJhbnNmb3JtL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVHJhbnNmb3JtIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiAqIC0+IHluZ3dpZVRyYW5zZm9ybVxuICBjb25zdHJ1Y3Rvcih2YWwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsdWUgdG8gdHJhbnNmb3JtXG4gICAgdGhpcy5fdHlwZSA9IFluZ3dpZVRyYW5zZm9ybS5nZXRUeXBlKHZhbCk7IC8vIFN0b3JlcyB2YWx1ZSdzIHR5cGUgZm9yIGRldGVybWluaW5nIGhvdyBpdCBjYW4gYmUgdHJhbnNmb3JtZWRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gTk9ERVxuICAvLyBUcmFuc2Zvcm1zIHN0b3JlZCB2YWx1ZSBpbnRvIGEgRE9NRWxlbWVudCBOT0RFOlxuICB0b05PREUoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHRoaXMuX3ZhbHVlLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgcmV0dXJuIGRvYy5ib2R5LmZpcnN0Q2hpbGQ7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gTk9ERSBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIFNUUklORzpcbiAgdG9TVFJJTkcoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9kZVR5cGUgPT09IDEgPyB0aGlzLl92YWx1ZS5vdXRlckhUTUwgOiB0aGlzLl92YWx1ZS5ub2RlVmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ZhbHVlLnJlbmRlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhub2RlKVxuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IG5vZGUub3V0ZXJIVE1MIDogbm9kZS5ub2RlVmFsdWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIFNUUklORyBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHRvWU5HV0lFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgICAgcmV0dXJuIFluZ3dpZVRyYW5zZm9ybS5pbml0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBZbmd3aWVFbGVtZW50IGZyb20gdW5zdXBwb3RlZCB0eXBlXCIsIHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklOR3xOT0RFIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBvciBET01FbGVtZW50IE5PREUgaW50byBhIHluZ3dpZUVsZW1lbnRcbiAgLy8gTk9URTogVGhpcyBET0VTIE5PVCB0cmFuc2Zvcm0gZXZlbnQgaGFuZGxlcnMgaW50byBZbmd3aWVDb250cm9sbGVyIG9iamVjdHM6XG4gIHN0YXRpYyBpbml0KGh0bWwpIHtcbiAgICByZXR1cm4gd2Fsa05vZGUoWW5nd2llVHJhbnNmb3JtLmdldFR5cGUoaHRtbCkgPT09IFwiU1RSSU5HXCIgPyBZbmd3aWVUcmFuc2Zvcm0udG9OT0RFKGh0bWwpIDogaHRtbCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IE5PREVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kIHRoYXQgdHJhbnNmb3JtcyBnaXZlbiB2YWx1ZSBpbnRvIGEgTk9ERTpcbiAgc3RhdGljIHRvTk9ERSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9OT0RFKCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHN0YXRpYyB0b1NUUklORyh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9TVFJJTkcoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4geW5nd2llRWxlbWVudFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICBzdGF0aWMgdG9ZTkdXSUUodmFsKSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBZbmd3aWVUcmFuc2Zvcm0odmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLnRvWU5HV0lFKCk7XG4gIH1cblxuICAvLyAqIC0+IFwiTk9ERVwifFwiU1RSSU5HXCJ8XCJZTkdXSUVcInxVTkRFRklORURcbiAgLy8gUmV0dXJucyBuYW1lIG9mIHR5cGUgZm9yIGdpdmVuIHZhbHVlOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICByZXR1cm4gXCJOT0RFXCI7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gXCJTVFJJTkdcIjtcbiAgICB9XG5cbiAgICBpZiAodmFsIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuICAgICAgcmV0dXJuIFwiWU5HV0lFXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICB9XG5cbn1cblxuLyoqXG4gKlxuICogIExvY2FsIEZ1bmN0aW9uc1xuICpcbiAqL1xuXG4vLyA6OiBOT0RFLCBOT0RFLCBub2RlLm5vZGVUeXBlIC0+IFZPSURcbi8vIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWW5nd2llRWxlbWVudCBmcm9tIHRoZSBnaXZlbiBub2RlIGFuZCBhbGwgb2YgaXQncyBkZXNlbmRlbnRzOlxuLy8gTk9URTogSW5zcGlyZWQgYnkgQ3JvY2tmb3JkJ3MgRE9NIHdhbGtpbmcgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OlRoZSBHb29kIFBhcnRzXCJcbmZ1bmN0aW9uIHdhbGtOb2RlKG5vZGUsIHJlc3VsdCkge1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgbGV0IGF0dHJpYnMgPSBnZXRBdHRyaWJ1dGVzKG5vZGUpO1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBhdHRyaWJzKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtLmF0dHJpYnV0ZXMpLnJlZHVjZSgocmVzdWx0LCBhdHRyaWIpID0+IHtcbiAgICByZXN1bHRbYXR0cmliLm5hbWVdID0gYXR0cmliLnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUcmFuc2Zvcm0gZnJvbSBcIi4vVHJhbnNmb3JtL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU5vZGUgYXMgTm9kZSxcbiAgWW5nd2llRWxlbWVudCBhcyBFbGVtZW50LFxuICBZbmd3aWVUZXh0Tm9kZSBhcyBUZXh0Tm9kZSxcbiAgWW5nd2llQ29udHJvbGxlciBhcyBDb250cm9sbGVyLFxuICBZbmd3aWVUcmFuc2Zvcm0gYXMgVHJhbnNmb3JtLFxuICBZbmd3aWVFcnJvciBhcyBFcnJvclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==