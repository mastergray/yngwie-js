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

  // CONSTRUCTOR :: STRING, [(EVT -> VOID)] -> this
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVT, yngwieElement, NODE -> VOID) -> this;
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
      return fn.toString();
    });
    return new YngwieController(evtName, fns);
  }

  // ::yngwieElement, DOMElement -> DOMElement
  // Creates event listener and binds it given DOMElement
  render(elem, node) {
    return this._fns.reduce((node, fn) => {
      node.addEventListener(this._evtName, evt => {
        fn(evt, elem, node);
      });
      return node;
    }, node);
  }

  // :: STRING, [EVENT, yngwieElement, NODE -> VOID]|EVENT, yngwieElement, NODE -> VOID -> yngwieController
  // Static factory method:
  static init(evtName, fns) {
    return new YngwieController(evtName, Array.isArray(fns) === true ? fns : [fns]);
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

  // CONSTRUCTOR :: STRING. OBJECT, STRING, [yngwieController] -> this
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

  // :: STRING, [(EVENT) -> VOID]|(EVENT) -> VOID ->  this
  // Binds controller by event name to node at render:
  on(evtName, fns) {
    let controller = _Controller_main_js__WEBPACK_IMPORTED_MODULE_1__.default.init(evtName, fns);
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

  // :: STRING|DOMElement -> DOMElement
  // Transforms YngwieElement and it's desendants into browser a DOMElement:
  // NOTE: Optional arugment determines where to append render to, otherwise reender is returned;
  render(target) {

    // Intialize DOMElement:
    let elem = Object.keys(this._attribs).reduce((elem, id) => {
      elem.setAttribute(id, this._attribs[id]);
      return elem;
    }, document.createElement(this._value));

    // Bind Controllers:
    elem = this._controllers.reduce((elem, controller) => {
      return controller.render(this, elem);
    }, elem);

    // If set, create and append text node:
    if (typeof(this._text) === "string") {
      let elemText = document.createTextNode(this._text);
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
        document.querySelector(target).appendChild(result);
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

  // :: STRING|DOMElement, [yngwieElement] -> DOMElement
  // Renders an array of yngwieElements and appends result to given target:
  // NOTE: DOMElement of target is returned
  static renderTo(target, elems) {
    if (elems instanceof Array) {
      let node = typeof(target) === "string"
        ? document.querySelector(target)
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

  // :: STRING|DOMElement, yngwieElement -> DOMElement
  // Replaces the given target with the render of the given instance  of YngwieElement:
  static inject(target, elem) {
    if (elem instanceof YngwieElement) {
      let node = typeof(target) === "string"
        ? document.querySelector(target)
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

  // Static Factory Method
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

  //:: VOID -> DOMTextNode
  // Creates  DOM Text node set with the STRING stored in _value:
  render() {
    return document.createTextNode(this._value);
  }

  // :: STRING -> this
  // Appends STRING instead of NODE since a TextNode has no children
  append(str) {
    if (typeof(str) === "string") {
        this._value += str;
        return this;
    }
    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_1__.default("Only STRINGs can append YngwieTextNodes", str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UcmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDeUM7QUFDWTtBQUNWOztBQUU1Qiw0QkFBNEIsa0RBQVU7O0FBRXJEO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLHNCQUFzQjtBQUN0QiwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZEQUFxQjtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFlBQVk7O0FBRWpDO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0EsS0FBSyxJQUFJOztBQUVUO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1EQUFXO0FBQzdCLE9BQU87QUFDUDtBQUNBLGNBQWMsbURBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbURBQVc7QUFDekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ3JRZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCMkM7O0FBRTVCOztBQUVmO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwrQkFBK0I7QUFDL0IsOEJBQThCO0FBQzlCLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLEtBQUs7QUFDTCxnQkFBZ0IsbURBQVc7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsMEJBQTBCO0FBQzFCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYyxtREFBVzs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsY0FBYyxtREFBVztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGNBQWMsbURBQVc7O0FBRXpCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLG1EQUFXOztBQUUzQjs7QUFFQSxjQUFjLG1EQUFXOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMLGdCQUFnQixtREFBVzs7QUFFM0I7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN095QztBQUNFOztBQUU1Qiw2QkFBNkIsa0RBQVU7O0FBRXREO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbURBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFlBQVk7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEQrQztBQUNFO0FBQ1I7QUFDTTs7QUFFaEM7O0FBRWY7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qiw4Q0FBOEM7QUFDOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdURBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVEQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdURBQVc7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0RBQVU7QUFDakM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHNEQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQOzs7Ozs7O1VDL0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNNO0FBQ0U7QUFDSTtBQUNGO0FBQ1I7O0FBU3pDIiwiZmlsZSI6InluZ3dpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlluZ3dpZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJZbmd3aWVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVDb250cm9sbGVyIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcsIFsoRVZUIC0+IFZPSUQpXSAtPiB0aGlzXG4gIGNvbnN0cnVjdG9yKGV2dE5hbWUsIGZucykge1xuICAgIHRoaXMuX2V2dE5hbWUgPSBldnROYW1lO1xuICAgIHRoaXMuX2ZucyA9IGZucyB8fCBbXTtcbiAgfVxuXG4gIC8vIDo6IChFVlQsIHluZ3dpZUVsZW1lbnQsIE5PREUgLT4gVk9JRCkgLT4gdGhpcztcbiAgLy8gQWRkcyBmdW5jdGlvbiB0byBsaXN0ZW5lcjpcbiAgYWRkKGZuKSB7XG4gICAgdGhpcy5fZm5zLnB1c2goZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVDb250cm9sbGVyXG4gIC8vIENyZWF0ZXMgY2xvbmUgb2YgdGhpcyB5bmd3aWVDb250cm9sbGVyOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgZXZ0TmFtZSA9IGAke3RoaXMuX2V2dE5hbWV9YDtcbiAgICBsZXQgZm5zID0gdGhpcy5fZm5zLm1hcChmbj0+e1xuICAgICAgcmV0dXJuIGZuLnRvU3RyaW5nKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVDb250cm9sbGVyKGV2dE5hbWUsIGZucyk7XG4gIH1cblxuICAvLyA6OnluZ3dpZUVsZW1lbnQsIERPTUVsZW1lbnQgLT4gRE9NRWxlbWVudFxuICAvLyBDcmVhdGVzIGV2ZW50IGxpc3RlbmVyIGFuZCBiaW5kcyBpdCBnaXZlbiBET01FbGVtZW50XG4gIHJlbmRlcihlbGVtLCBub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zucy5yZWR1Y2UoKG5vZGUsIGZuKSA9PiB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5fZXZ0TmFtZSwgZXZ0ID0+IHtcbiAgICAgICAgZm4oZXZ0LCBlbGVtLCBub2RlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSwgbm9kZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFtFVkVOVCwgeW5nd2llRWxlbWVudCwgTk9ERSAtPiBWT0lEXXxFVkVOVCwgeW5nd2llRWxlbWVudCwgTk9ERSAtPiBWT0lEIC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChldnROYW1lLCBmbnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUNvbnRyb2xsZXIoZXZ0TmFtZSwgQXJyYXkuaXNBcnJheShmbnMpID09PSB0cnVlID8gZm5zIDogW2Zuc10pO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVDb250cm9sbGVyIGZyb20gXCIuLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUNvbnRyb2xsZXJdIC0+IHRoaXNcbiAgY29uc3RydWN0b3IodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICBzdXBlcih0YWdOYW1lLnRvVXBwZXJDYXNlKCkpOyAgICAgLy8gU3RvcmVzIHRhZ05hbWUgaW4gQUxMIENBUFNcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgICAgIC8vIEVsZW1lbnQgQXR0cmlidXRlc1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0OyAgICAgICAgICAgICAgICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9jb250cm9sbGVycyA9IFtdOyAgICAgICAgICAgIC8vIENvbnRyb2xsZXJzIGJvdW5kIHRvIHRoaXMgZWxlbWVudFxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gUmV0dXJucyB0YWdOYW1lIG9mIHRoaXMgZWxlbWVudDpcbiAgdGFnTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLyA6OiBPQkpFQ1R8Vk9JRCAtPiB0aGlzfE9CSkVDVFxuICAvLyBTZXRzIFwiYXR0cmlic1wiIE9CSkVDVCB3aXRoIGdpdmVuIE9CSkVDVDpcbiAgLy8gTk9URTogSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHNldCBhdHRyaWJ1dGVzIGFyZSByZXR1cm5lZDpcbiAgYXR0cmlicyhhdHRyaWJzKSB7XG4gICAgaWYgKGF0dHJpYnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YoYXR0cmlicykgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5fYXR0cmlicyA9IGF0dHJpYnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiWW5nd2llRWxlbWVudCBhdHRyaWJ1dGVzIGNhbiBvbmx5IGJlIHNldCB3aXRoIE9CSkVDVFwiLCBhdHRyaWJzKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIEJPT0xFQU4gZm9yIGlmIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZXhpc3RzIGluIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgaGFzQXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiAqfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGF0dHJpYnV0ZSBieSBuYW1lIHN0b3JlZCBpbiBcImF0dHJpYnNcIiBPQkpFQ1QsIG90aGVyd2lzZSByZXR1cm5zIFVOREVGSU5FRFxuICBnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCAqIC0+IHRoaXNcbiAgLy8gQmluZHMgIHZhbHVlIHRvIFwiYXR0cmlic1wiIE9CSkVDVCB3aXRoIGdpdmVuIG5hbWU6XG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMuX2F0dHJpYnNbbmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiB0aGlzXG4gIC8vIFJlbW92ZSBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGZyb20gXCJhdHRyaWJzXCIgT0JKRUNUOlxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfFZPSUQgLT4gdGhpc3xVTkRFRklORURcbiAgLy8gQXBwZW5kcyB0ZXh0IG5vZGUgYXMgZmlyc3QgY2hpbGQgb2YgZWxlbWVudCBhdCByZW5kZXIgd2l0aCBnaXZlbiBzdHJpbmcgYXMgaXQncyB2YWx1ZTpcbiAgLy8gTk9URTogSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHNldCB0ZXh0IGlzIHJldHVybmVkOlxuICB0ZXh0KHN0cikge1xuICAgIGlmIChzdHIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Yoc3RyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl90ZXh0ID0gc3RyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlRleHQgb2YgZWxlbWVudCBjYW4gb25seSBiZSBzZXQgd2l0aCBhIFNUUklOR1wiLCBzdHIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBTZXRzIHRleHQgYXMgVU5ERUZJTkVEIGZvciB0aGlzIGVsZW1lbnQ6XG4gIHJlbW92ZVRleHQoKSB7XG4gICAgdGhpcy5fdGV4dCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6ICh5bmd3aWVFbGVtZW50IC0+IEJPT0xFQU4pIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgZWxlbWVudHMgdGhhdCwgd2hlbiB0aGUgZ2l2ZW4gZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aGlzIGVsZW1lbnRzIGFuZCBpdCdzIGRlc2VuZGFudHMsIHRoYXQgZnVuY3Rpb24gcmV0dXJucyBUUlVFOlxuICBnZXRFbGVtZW50c0J5KGZuKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2UoKG5vZGUsIHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgIGlmIChmbihub2RlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiBZbmd3aWVFbGVtbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gdGFnTmFtZTpcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5KGVsZW0gPT4gZWxlbS50YWdOYW1lKCkgPT09IHRhZ05hbWUpO1xuICB9XG5cbiAgLy8gU1RSSU5HLCBTVFJJTkd8Vk9JRCAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZTpcbiAgLy8gTk9URTogSWYgbm8gdmFsdWUgaXMgZ2l2ZW4sIHRoZW4gYW55IGVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIGF0dHJpYnV0ZSBuYW1lIGlzIHJldHVybmVkXG4gIGdldEVsZW1lbnRzQnlBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5KGVsZW0gPT4ge1xuICAgICAgaWYgKGVsZW0uaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGNsYXNzIG5hbWVcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc05hbWUpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBZbmd3aWVFbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBJRDpcbiAgLy8gTk9URTogUmV0dXJucyBVTkRFRklORUQgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIElEXG4gIGdldEVsZW1lbnRCeUlEKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImlkXCIsIGlkKS5wb3AoKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgWyhFVkVOVCkgLT4gVk9JRF18KEVWRU5UKSAtPiBWT0lEIC0+ICB0aGlzXG4gIC8vIEJpbmRzIGNvbnRyb2xsZXIgYnkgZXZlbnQgbmFtZSB0byBub2RlIGF0IHJlbmRlcjpcbiAgb24oZXZ0TmFtZSwgZm5zKSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBZbmd3aWVDb250cm9sbGVyLmluaXQoZXZ0TmFtZSwgZm5zKTtcbiAgICB0aGlzLl9jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnTmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBjb250cm9sbGVyczpcbiAgICBsZXQgY29udHJvbGxlcnMgPSB0aGlzLl9jb250cm9sbGVycy5tYXAoKGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLmNsb25lKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDb3B5IGNoaWxkcmVuIGFuZCByZXR1cm4gZWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xET01FbGVtZW50IC0+IERPTUVsZW1lbnRcbiAgLy8gVHJhbnNmb3JtcyBZbmd3aWVFbGVtZW50IGFuZCBpdCdzIGRlc2VuZGFudHMgaW50byBicm93c2VyIGEgRE9NRWxlbWVudDpcbiAgLy8gTk9URTogT3B0aW9uYWwgYXJ1Z21lbnQgZGV0ZXJtaW5lcyB3aGVyZSB0byBhcHBlbmQgcmVuZGVyIHRvLCBvdGhlcndpc2UgcmVlbmRlciBpcyByZXR1cm5lZDtcbiAgcmVuZGVyKHRhcmdldCkge1xuXG4gICAgLy8gSW50aWFsaXplIERPTUVsZW1lbnQ6XG4gICAgbGV0IGVsZW0gPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKGVsZW0sIGlkKSA9PiB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShpZCwgdGhpcy5fYXR0cmlic1tpZF0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLl92YWx1ZSkpO1xuXG4gICAgLy8gQmluZCBDb250cm9sbGVyczpcbiAgICBlbGVtID0gdGhpcy5fY29udHJvbGxlcnMucmVkdWNlKChlbGVtLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICByZXR1cm4gY29udHJvbGxlci5yZW5kZXIodGhpcywgZWxlbSk7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiBzZXQsIGNyZWF0ZSBhbmQgYXBwZW5kIHRleHQgbm9kZTpcbiAgICBpZiAodHlwZW9mKHRoaXMuX3RleHQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgZWxlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl90ZXh0KTtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWxlbVRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbmRlciBhbmQgYXBwZW5kIGFsbCBjaGlsZHJlbiBhbmQgcmV0dXJuIHJlc3VsdDpcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5yZW5kZXIoKTtcbiAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgdGFyZ2V0IGlzIGdpdmVuLCBhcHBlbmRzIHJlc3VsdCBvZiByZW5kZXIgdG8gdGhhdCB0YXJnZXQ6XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBJZiB0YXJnZXQgaXMgc3RyaW5nLCBmaW5kIG5vZGUgdXNpbmcgcXVlcnkgc2VsZWN0b3I6XG4gICAgICBpZiAodHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcmlzZSBhc3N1bWUgdGhhdCB0YXJnZXQgaXMgRE9NRWxlbWVudDpcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llQ29udHJvbGxlcl0gLT4geW5nd2llRWxlbWVudFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKVxuICB9XG5cbiAgLy8gOjogU1RSSU5HfERPTUVsZW1lbnQsIFt5bmd3aWVFbGVtZW50XSAtPiBET01FbGVtZW50XG4gIC8vIFJlbmRlcnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgYW5kIGFwcGVuZHMgcmVzdWx0IHRvIGdpdmVuIHRhcmdldDpcbiAgLy8gTk9URTogRE9NRWxlbWVudCBvZiB0YXJnZXQgaXMgcmV0dXJuZWRcbiAgc3RhdGljIHJlbmRlclRvKHRhcmdldCwgZWxlbXMpIHtcbiAgICBpZiAoZWxlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIHJldHVybiBlbGVtcy5yZWR1Y2UoKHJlc3VsdCwgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtLnJlbmRlcihyZXN1bHQpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSByZW5kZXJlZCB0byB0YXJnZXRcIiwgZWxlbSk7XG4gICAgICB9LCBub2RlKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndW1lbnRcIiwgZWxlbXMpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfERPTUVsZW1lbnQsIHluZ3dpZUVsZW1lbnQgLT4gRE9NRWxlbWVudFxuICAvLyBSZXBsYWNlcyB0aGUgZ2l2ZW4gdGFyZ2V0IHdpdGggdGhlIHJlbmRlciBvZiB0aGUgZ2l2ZW4gaW5zdGFuY2UgIG9mIFluZ3dpZUVsZW1lbnQ6XG4gIHN0YXRpYyBpbmplY3QodGFyZ2V0LCBlbGVtKSB7XG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgbGV0IHJlc3VsdCA9IGVsZW0ucmVuZGVyKCk7XG4gICAgICBub2RlLnJlcGxhY2VXaXRoKHJlc3VsdCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSBpbmplY3RlZCBpbnRvIHRhcmdldFwiLCBlbGVtKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcsICogLT4gRVJST1JcbiAgLy8gTk9URSA6OiBcImRhdGFcIiBhcmd1bWVudCBpcyBhbHdheXMgY2FzdCBhcyBTVFJJTkc6XG4gIGNvbnN0cnVjdG9yKG1zZywgZGF0YSkge1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5kYXRhID0gYCR7ZGF0YX1gO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiAgVk9JRFxuICAvLyBDb25zb2xlcyBvdXQgc3RhY2sgdHJhY2Ugb2YgZXJyb3IsIGFsb25nIHdpdGggdGhlIGRhdGEgdGhhdCBjYXVzZWQgdGhlIGV4Y2VwdGlvbiB0byBiZSB0aHJvd246XG4gIGxvZygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YWNrKTtcbiAgICBjb25zb2xlLmxvZyhcIldoYXQgRmFpbGVkOiBcIiwgdGhpcy5kYXRhKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZU5vZGVcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgICAgICAgLy8gQXJiaXRyYXJ5IFNUUklORyB2YWx1ZSB0aGF0IGNhbiBiZSBzdG9yZWQgYnkgdGhpcyBub2RlXG4gICAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7ICAvLyBQYXJlbnQgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9maXJzdCA9IHVuZGVmaW5lZDsgICAvLyBGaXJzdCBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7ICAgIC8vIExhc3QgY2hpbGQgb2YgdGhpcyBub2RlO1xuICAgICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDsgICAgLy8gTmV4dCBzaWJsaW5nIG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDsgICAgLy8gUHJldmlvdXMgc2libGluZyBvZiB0aGUgbm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJWYWx1ZSBvZiBZbmd3aWVOb2RlIG11c3QgYmUgU1RSSU5HXCIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFt5bmd3aWVOb2RlXVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICBjaGlsZHJlbigpIHtcblxuICAgIGxldCBjaGlsZCA9IHRoaXMuX2ZpcnN0OyAgIC8vIEZpcnN0IGNoaWxkXG4gICAgbGV0IGNoaWxkcmVuID0gW107ICAgICAgICAgLy8gQXJyYXkgb2YgY2hpbGRyZW4gdG8gcmV0dXJuXG5cbiAgICAvLyBMb29rcyBmb3IgbmV4dCBzaWJsaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIHNpYmxpbmdzOlxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYW4gYXJyYXJ5IHluZ2l3Tm9kZSBlbGVtZW50czpcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpc1xuICAvLyBBZGRzIGdpdmVuIG5vZGUgdG8gY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICAvLyBOT1RFOiBJZiBnaXZlbiBub2RlIGFscmVhZHkgaGFzIGEgcGFyZW50LCB0aGF0IG5vZGUgaXMgZGV0YWNoZWQgYW5kIGFwcGVuZWQgdG8gdGhpcyBub2RlOlxuICBhcHBlbmQobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gSWYgZ2l2ZW4gbm9kZSBoYXMgcGFyZW50LCBkZXRhY2ggdGhhdCBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gICAgICBpZiAobm9kZS5fcGFyZW50KSB7XG4gICAgICAgIG5vZGUuZGV0YWNoKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBuZXcgbm9kZSBhcyBsYXN0IHNpYmxpbmc6XG4gICAgICBpZiAodGhpcy5fZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLl9wcmV2ID0gdGhpcy5fbGFzdDsgICAgLy8gU2V0cyBuZXcgbGFzdCBjaGlsZCdzIHByZXZpb3VzIG5vZGUgdG8gb2xkIGxhc3Qgbm9kZVxuICAgICAgICB0aGlzLl9sYXN0Ll9uZXh0ID0gbm9kZTsgICAgLy8gU2V0IG9sZCBsYXN0IGNoaWxkIG5leHQgZWxlbWVudCB0byBuZXcgbGFzdCBjaGlsZFxuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTsgICAgICAgICAvLyBTZXQgbmV3IGxhc3QgY2hpbGQgdG8gZ2l2ZW4gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlciBhcmUgbm8gY2hpbGRyZW4sIHRoZW4gdGhpcyBub2RlIGlzIGFuIG9ubHkgY2hpbGQ6XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYXJlbnRcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXM7XG5cbiAgICAgIC8vIFJldHVybiBpbnN0YW5jZTpjb3Nub2xlXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGFwcHBlbmQgWW5nd2llTm9kZSB0byBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogW3luZ3dpZU5vZGVdIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBZbmd3aWVOb2RlcyB0byB0aGlzIGluc3RhbmNlOlxuICBhcHBlbmRzKG5vZGVzKSB7XG4gICAgaWYgKG5vZGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBub2Rlcy5yZWR1Y2UoKHJlc3VsdCwgbm9kZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmQobm9kZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiRXhwZWN0ZWQgYXJyYXkgYXMgYXJndWVtbnRcIiwgbm9kZXMpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIERldGFjaGVzIHRoaXMgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICBkZXRhY2goKSB7XG5cbiAgICAvLyBNYWtlIHByZXZpb3VzIG5vZGUncyBuZXh0IG5vZGUgdGhpcyBub2RlJ3MgbmV4dCBub2RlOlxuICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gcHJldmlvdXMgbm9kZSwgdGhlbiB0aGlzIG5vZGUgbXVzdCBiZSBmaXJzdCBjaGlsZCBvZiBwYXJlbnQgKGlmIG5vZGUgaGFzIHBhcmVudCk6XG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSB0aGlzLl9uZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2UgbmV4dCBub2RlJ3MgcHJldmlvdXMgbm9kZSB0aGlzIG5vZGUncyBwcmV2aW91cyBub2RlOlxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9XG5cbiAgICAvLyBVbnNldCBhbGwgcmVsYXRpb25zOlxuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZXR1cm4gaW5zdGFuY2U6XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpcztcbiAgLy8gSW5zZXJ0cyBnaXZlbiB5bmd3aWVOb2RlIGJlZm9yZSB0aGlzIGluc3RhbmNlIG9mIHluZ3dpZU5vZGU6XG4gIC8vIE5PVEU6IGEuaW5zZXJ0c0JlZm9yZShiKSBtZWFucyBcImJcIiBpcyBpbnNlcnRlZCBiZWZvcmUgXCJhXCJcbiAgaW5zZXJ0QmVmb3JlKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIFNldCByZWxhdGlvbnNcbiAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgICAgbm9kZS5fbmV4dCA9IHRoaXM7XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nIHJlbGF0aW9uczpcbiAgICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICAgIHRoaXMuX3ByZXYuX25leHQgPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwcmV2aW91cyBzaWJsaW5nOlxuICAgICAgdGhpcy5fcHJldiA9IG5vZGU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgaW5zZXJ0IGEgWW5nd2llTm9kZSBiZWZvcmUgb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4geW5nd2llTm9kZVxuICAvLyBSZXBsYWNlIHRoaXMgbm9kZSB3aXRoIGdpdmVuIG5vZGU6XG4gIHJlcGxhY2VXaXRoKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIENoZWNrcyBpZiB0aGlzIG5vZGUgaGFzIGEgcGFyZW50XG4gICAgICBpZiAodGhpcy5fcGFyZW50ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAvLyBSZXBsYWNlbWVudCBpcyBhY2NvbXBsaXNoZWQgYnkgZmlyc3QgaW5zZXJ0aW5nIGdpdmVuIG5vZGUsIHRoZW4gZGV0YXRjaGluZyB0aGlzIG5vZGU6XG4gICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUpO1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIC8vIFJldHVybiBnaXZlbiBub2RlOlxuICAgICAgICByZXR1cm4gbm9kZTtcblxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSByZXBsYWNlIFluZ3dpZU5vZGUgaWYgWW5nd2llTm9kZSBiZWluZyByZXBsYWNlZCBoYXMgcGFyZW50XCIsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBhIFluZ3dpZU5vZGUgd2l0aCBhbm90aGVyIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTm9kZVxuICAvLyBSZXR1cm5zIGRlZXAgY2xvbmUgb2YgdGhpcyBub2RlOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmFsdWUgPSBgJHt0aGlzLl92YWx1ZX1gO1xuICAgIGxldCBjbG9uZSA9IG5ldyBZbmd3aWVOb2RlKHZhbHVlKVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjbG9uZSA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gcmVzdWx0LmFwcGVuZChjbG9uZSk7XG4gICAgfSwgY2xvbmUpO1xuICB9XG5cbiAgLy8gTk9ERSwgKiAtPiBOT0RFIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byBhIHJlc3VsdCBhbmQgdGhpcyBub2RlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSB0byB0aGF0IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG9cbiAgLy8gTk9URTogUmVzdWx0IGlzIHJldHVybmVkIHdoZW4gdGhlcmUgaXMgbm8gbmV4dCBub2RlIHRvIGFwcGx5IGZ1bmN0aW9uIHRvXG4gIHN0ZXAoZm4sIHJlc3VsdCkge1xuICAgIG5leHQgPSBmbih0aGlzLCByZXN1bHQpO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnN0ZXAoZm4sIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyA6OiBOT0RFLCAqIC0+ICosICogLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIHRoaXMgbm9kZSBhbmQgaXQncyBkZXNjZW5kYW50cywgcmV0dXJuaW5nIHRoZSByZXN1bHQgb2YgdGhhdCBmdW5jdGlvbjpcbiAgcGFyc2UoZm4sIHJlc3VsdCkge1xuICAgIFluZ3dpZU5vZGUucGFyc2UodGhpcywgKG5vZGUpID0+IHtcbiAgICAgIHJlc3VsdCA9IGZuKG5vZGUsIHJlc3VsdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBTdGF0aWMgRnVuY3Rpb25cbiAgICpcbiAgICovXG5cbiAgLy8gU3RhdGljIEZhY3RvcnkgTWV0aG9kXG4gIHN0YXRpYyBpbml0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVOb2RlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE5PREUsIE5PREUgLT4gVk9JRCAtPiBWT0lEXG4gIC8vIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBhIG5vZGUgYW5kIGFsbCBpdCdzIGRlc2VuZGFudHNcbiAgLy8gTk9ERTogVGhpcyBpcyBhIHJlLWltcGxlbWVudGF0aW9uIG9mIENyb2NrZm9yZCdzIERPTSB3YWxrIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDogVGhlIEdvb2QgUGFydHNcIlxuICBzdGF0aWMgcGFyc2Uobm9kZSwgZm4pIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIGZuKG5vZGUpO1xuICAgICAgbm9kZSA9IG5vZGUuX2ZpcnN0O1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgWW5nd2llTm9kZS5wYXJzZShub2RlLCBmbik7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcGFyc2UgYSBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRleHROb2RlIGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICBzdXBlcih0ZXh0KTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gU1RSSU5HXG4gIC8vIFJldHVybnMgdGV4dCBvZiB0aGlzIHRleHQgbm9kZTpcbiAgdGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICAvLzo6IFZPSUQgLT4gRE9NVGV4dE5vZGVcbiAgLy8gQ3JlYXRlcyAgRE9NIFRleHQgbm9kZSBzZXQgd2l0aCB0aGUgU1RSSU5HIHN0b3JlZCBpbiBfdmFsdWU6XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBTVFJJTkcgaW5zdGVhZCBvZiBOT0RFIHNpbmNlIGEgVGV4dE5vZGUgaGFzIG5vIGNoaWxkcmVuXG4gIGFwcGVuZChzdHIpIHtcbiAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gc3RyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBTVFJJTkdzIGNhbiBhcHBlbmQgWW5nd2llVGV4dE5vZGVzXCIsIHN0cik7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHluZ3dpZVRleHROb2RlOlxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKGAke3RoaXMuX3ZhbHVlfWApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4uL1RleHROb2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vVHJhbnNmb3JtL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVHJhbnNmb3JtIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiAqIC0+IHluZ3dpZVRyYW5zZm9ybVxuICBjb25zdHJ1Y3Rvcih2YWwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsdWUgdG8gdHJhbnNmb3JtXG4gICAgdGhpcy5fdHlwZSA9IFluZ3dpZVRyYW5zZm9ybS5nZXRUeXBlKHZhbCk7IC8vIFN0b3JlcyB2YWx1ZSdzIHR5cGUgZm9yIGRldGVybWluaW5nIGhvdyBpdCBjYW4gYmUgdHJhbnNmb3JtZWRcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gTk9ERVxuICAvLyBUcmFuc2Zvcm1zIHN0b3JlZCB2YWx1ZSBpbnRvIGEgRE9NRWxlbWVudCBOT0RFOlxuICB0b05PREUoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHRoaXMuX3ZhbHVlLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgcmV0dXJuIGRvYy5ib2R5LmZpcnN0Q2hpbGQ7XG4gICAgICBjYXNlIFwiWU5HV0lFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZS5yZW5kZXIoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbm5vdCB0cmFuc2Zvcm0gdG8gTk9ERSBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIFNUUklORzpcbiAgdG9TVFJJTkcoKSB7XG4gICAgc3dpdGNoICh0aGlzLl90eXBlKSB7XG4gICAgICBjYXNlIFwiTk9ERVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUubm9kZVR5cGUgPT09IDEgPyB0aGlzLl92YWx1ZS5vdXRlckhUTUwgOiB0aGlzLl92YWx1ZS5ub2RlVmFsdWU7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ZhbHVlLnJlbmRlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhub2RlKVxuICAgICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IG5vZGUub3V0ZXJIVE1MIDogbm9kZS5ub2RlVmFsdWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW5ub3QgdHJhbnNmb3JtIHRvIFNUUklORyBmcm9tIHVuc3VwcG90ZWQgdHlwZVwiLCB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gVHJhbnNmb3JtcyBzdG9yZWQgdmFsdWUgaW50byBhIHluZ3dpZUVsZW1lbnQ6XG4gIHRvWU5HV0lFKCkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcIk5PREVcIjpcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgICAgcmV0dXJuIFluZ3dpZVRyYW5zZm9ybS5pbml0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIGNhc2UgXCJZTkdXSUVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2Fubm90IHRyYW5zZm9ybSB0byBZbmd3aWVFbGVtZW50IGZyb20gdW5zdXBwb3RlZCB0eXBlXCIsIHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklOR3xOT0RFIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBvciBET01FbGVtZW50IE5PREUgaW50byBhIHluZ3dpZUVsZW1lbnRcbiAgLy8gTk9URTogVGhpcyBET0VTIE5PVCB0cmFuc2Zvcm0gZXZlbnQgaGFuZGxlcnMgaW50byBZbmd3aWVDb250cm9sbGVyIG9iamVjdHM6XG4gIHN0YXRpYyBpbml0KGh0bWwpIHtcbiAgICByZXR1cm4gd2Fsa05vZGUoWW5nd2llVHJhbnNmb3JtLmdldFR5cGUoaHRtbCkgPT09IFwiU1RSSU5HXCIgPyBZbmd3aWVUcmFuc2Zvcm0udG9OT0RFKGh0bWwpIDogaHRtbCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IE5PREVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kIHRoYXQgdHJhbnNmb3JtcyBnaXZlbiB2YWx1ZSBpbnRvIGEgTk9ERTpcbiAgc3RhdGljIHRvTk9ERSh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9OT0RFKCk7XG4gIH1cblxuICAvLyA6OiAqIC0+IFNUUklOR1xuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSBTVFJJTkc6XG4gIHN0YXRpYyB0b1NUUklORyh2YWwpIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gbmV3IFluZ3dpZVRyYW5zZm9ybSh2YWwpO1xuICAgIHJldHVybiB0cmFuc2Zvcm0udG9TVFJJTkcoKTtcbiAgfVxuXG4gIC8vIDo6ICogLT4geW5nd2llRWxlbWVudFxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2QgdGhhdCB0cmFuc2Zvcm1zIGdpdmVuIHZhbHVlIGludG8gYSB5bmd3aWVFbGVtZW50OlxuICBzdGF0aWMgdG9ZTkdXSUUodmFsKSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IG5ldyBZbmd3aWVUcmFuc2Zvcm0odmFsKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLnRvWU5HV0lFKCk7XG4gIH1cblxuICAvLyAqIC0+IFwiTk9ERVwifFwiU1RSSU5HXCJ8XCJZTkdXSUVcInxVTkRFRklORURcbiAgLy8gUmV0dXJucyBuYW1lIG9mIHR5cGUgZm9yIGdpdmVuIHZhbHVlOlxuICBzdGF0aWMgZ2V0VHlwZSh2YWwpIHtcblxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICByZXR1cm4gXCJOT0RFXCI7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gXCJTVFJJTkdcIjtcbiAgICB9XG5cbiAgICBpZiAodmFsIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuICAgICAgcmV0dXJuIFwiWU5HV0lFXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICB9XG5cbn1cblxuLy8gOjogTk9ERSwgTk9ERSwgbm9kZS5ub2RlVHlwZSAtPiBWT0lEXG4vLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFluZ3dpZUVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gbm9kZSBhbmQgYWxsIG9mIGl0J3MgZGVzZW5kZW50czpcbi8vIE5PVEU6IEluc3BpcmVkIGJ5IENyb2NrZm9yZCdzIERPTSB3YWxraW5nIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDpUaGUgR29vZCBQYXJ0c1wiXG5mdW5jdGlvbiB3YWxrTm9kZShub2RlLCByZXN1bHQpIHtcblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGxldCBhdHRyaWJzID0gZ2V0QXR0cmlidXRlcyhub2RlKTtcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KG5vZGUudGFnTmFtZSwgYXR0cmlicyk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gZWxlbVxuICAgICAgOiByZXN1bHQuYXBwZW5kKGVsZW0pO1xuICB9XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBsZXQgdGV4dE5vZGUgPSBuZXcgWW5nd2llVGV4dE5vZGUobm9kZS5ub2RlVmFsdWUpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRleHROb2RlXG4gICAgICA6IHJlc3VsdC5hcHBlbmQodGV4dE5vZGUpO1xuICB9XG5cbiAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuICB3aGlsZSAobm9kZSkge1xuICAgIGxldCBjaGlsZCA9IHdhbGtOb2RlKG5vZGUpO1xuICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5hcHBlbmQoY2hpbGQpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG5cbn1cblxuLy8gOjogRE9NRWxlbWVudCAtPiBPQkpFQ1Rcbi8vIFJldHVybnMgT0JKRUNUIG9mIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gRE9NIEVsZW1lbnQ6XG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGVsZW0pIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKHJlc3VsdCwgYXR0cmliKSA9PiB7XG4gICAgcmVzdWx0W2F0dHJpYi5uYW1lXSA9IGF0dHJpYi52YWx1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQge1xuICBZbmd3aWVOb2RlIGFzIE5vZGUsXG4gIFluZ3dpZUVsZW1lbnQgYXMgRWxlbWVudCxcbiAgWW5nd2llVGV4dE5vZGUgYXMgVGV4dE5vZGUsXG4gIFluZ3dpZUNvbnRyb2xsZXIgYXMgQ29udHJvbGxlcixcbiAgWW5nd2llVHJhbnNmb3JtIGFzIFRyYW5zZm9ybSxcbiAgWW5nd2llRXJyb3IgYXMgRXJyb3Jcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=