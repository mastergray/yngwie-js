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
  init(text) {
    return new YngwieTextNode(text);
  }

}


/***/ }),

/***/ "./src/transform/main.js":
/*!*******************************!*\
  !*** ./src/transform/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YngwieTransform)
/* harmony export */ });
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TextNode/main.js */ "./src/TextNode/main.js");



// :: STRING -> yngwieElement
// Transforms string of HTML into a yngwieElement
// NOTE: This DOES NOT transform event handlers into YngwieController objects:
function YngwieTransform (html) {
  return walkNode(typeof(html) === "string" ? toNode(html) : html);
}

// :: STRING -> NODE
// Transforms string of HTML into client-side DOM node:
function toNode(html) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  return doc.body.firstElementChild;
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
/* harmony export */   "transform": () => (/* reexport safe */ _transform_main_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Error": () => (/* reexport safe */ _Error_main_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./src/TextNode/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var _transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transform/main.js */ "./src/transform/main.js");
/* harmony import */ var _Error_main_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error/main.js */ "./src/Error/main.js");









})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy90cmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7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O0FDTndDO0FBQ007QUFDRTtBQUNJO0FBQ0Y7QUFDUjs7QUFTekMiLCJmaWxlIjoieW5nd2llLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVlQgLT4gVk9JRCldIC0+IHRoaXNcbiAgY29uc3RydWN0b3IoZXZ0TmFtZSwgZm5zKSB7XG4gICAgdGhpcy5fZXZ0TmFtZSA9IGV2dE5hbWU7XG4gICAgdGhpcy5fZm5zID0gZm5zIHx8IFtdO1xuICB9XG5cbiAgLy8gOjogKEVWVCwgeW5nd2llRWxlbWVudCwgTk9ERSAtPiBWT0lEKSAtPiB0aGlzO1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGxpc3RlbmVyOlxuICBhZGQoZm4pIHtcbiAgICB0aGlzLl9mbnMucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHluZ3dpZUNvbnRyb2xsZXI6XG4gIGNsb25lKCkge1xuICAgIGxldCBldnROYW1lID0gYCR7dGhpcy5fZXZ0TmFtZX1gO1xuICAgIGxldCBmbnMgPSB0aGlzLl9mbnMubWFwKGZuPT57XG4gICAgICByZXR1cm4gZm4udG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUNvbnRyb2xsZXIoZXZ0TmFtZSwgZm5zKTtcbiAgfVxuXG4gIC8vIDo6eW5nd2llRWxlbWVudCwgRE9NRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIENyZWF0ZXMgZXZlbnQgbGlzdGVuZXIgYW5kIGJpbmRzIGl0IGdpdmVuIERPTUVsZW1lbnRcbiAgcmVuZGVyKGVsZW0sIG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm5zLnJlZHVjZSgobm9kZSwgZm4pID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldnROYW1lLCBldnQgPT4ge1xuICAgICAgICBmbihldnQsIGVsZW0sIG5vZGUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LCBub2RlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgW0VWRU5ULCB5bmd3aWVFbGVtZW50LCBOT0RFIC0+IFZPSURdfEVWRU5ULCB5bmd3aWVFbGVtZW50LCBOT0RFIC0+IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGV2dE5hbWUsIGZucykge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBBcnJheS5pc0FycmF5KGZucykgPT09IHRydWUgPyBmbnMgOiBbZm5zXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4uL0NvbnRyb2xsZXIvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVsZW1lbnQgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llQ29udHJvbGxlcl0gLT4gdGhpc1xuICBjb25zdHJ1Y3Rvcih0YWdOYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycykge1xuICAgIHN1cGVyKHRhZ05hbWUudG9VcHBlckNhc2UoKSk7ICAgICAvLyBTdG9yZXMgdGFnTmFtZSBpbiBBTEwgQ0FQU1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzIHx8IHt9OyAgICAgLy8gRWxlbWVudCBBdHRyaWJ1dGVzXG4gICAgdGhpcy5fdGV4dCA9IHRleHQ7ICAgICAgICAgICAgICAgICAvLyBFbGVtZW50IHRleHQgdGhhdCdzIGFwcGVuZGVkIGFzIGZpcnN0IGNoaWxkIG9mIHRoaXMgZWxlbWVudFxuICAgIHRoaXMuX2NvbnRyb2xsZXJzID0gW107ICAgICAgICAgICAgLy8gQ29udHJvbGxlcnMgYm91bmQgdG8gdGhpcyBlbGVtZW50XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFNUUklOR1xuICAvLyBSZXR1cm5zIHRhZ05hbWUgb2YgdGhpcyBlbGVtZW50OlxuICB0YWdOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIDo6IE9CSkVDVHxWT0lEIC0+IHRoaXN8T0JKRUNUXG4gIC8vIFNldHMgXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gT0JKRUNUOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IGF0dHJpYnV0ZXMgYXJlIHJldHVybmVkOlxuICBhdHRyaWJzKGF0dHJpYnMpIHtcbiAgICBpZiAoYXR0cmlicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlicztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihhdHRyaWJzKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJZbmd3aWVFbGVtZW50IGF0dHJpYnV0ZXMgY2FuIG9ubHkgYmUgc2V0IHdpdGggT0JKRUNUXCIsIGF0dHJpYnMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBCT09MRUFOXG4gIC8vIFJldHVybnMgQk9PTEVBTiBmb3IgaWYgYXR0cmlidXRlIHdpdGggZ2l2ZW4gbmFtZSBleGlzdHMgaW4gXCJhdHRyaWJzXCIgT0JKRUNUOlxuICBoYXNBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzLmhhc093blByb3BlcnR5KG5hbWUpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+ICp8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgdmFsdWUgb2YgYXR0cmlidXRlIGJ5IG5hbWUgc3RvcmVkIGluIFwiYXR0cmlic1wiIE9CSkVDVCwgb3RoZXJ3aXNlIHJldHVybnMgVU5ERUZJTkVEXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsICogLT4gdGhpc1xuICAvLyBCaW5kcyAgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gUmVtb3ZlIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZnJvbSBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8Vk9JRCAtPiB0aGlzfFVOREVGSU5FRFxuICAvLyBBcHBlbmRzIHRleHQgbm9kZSBhcyBmaXJzdCBjaGlsZCBvZiBlbGVtZW50IGF0IHJlbmRlciB3aXRoIGdpdmVuIHN0cmluZyBhcyBpdCdzIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IHRleHQgaXMgcmV0dXJuZWQ6XG4gIHRleHQoc3RyKSB7XG4gICAgaWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZihzdHIpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3RleHQgPSBzdHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiVGV4dCBvZiBlbGVtZW50IGNhbiBvbmx5IGJlIHNldCB3aXRoIGEgU1RSSU5HXCIsIHN0cik7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIFNldHMgdGV4dCBhcyBVTkRFRklORUQgZm9yIHRoaXMgZWxlbWVudDpcbiAgcmVtb3ZlVGV4dCgpIHtcbiAgICB0aGlzLl90ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogKHluZ3dpZUVsZW1lbnQgLT4gQk9PTEVBTikgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIHRoZSBlbGVtZW50cyB0aGF0LCB3aGVuIHRoZSBnaXZlbiBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoaXMgZWxlbWVudHMgYW5kIGl0J3MgZGVzZW5kYW50cywgdGhhdCBmdW5jdGlvbiByZXR1cm5zIFRSVUU6XG4gIGdldEVsZW1lbnRzQnkoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSgobm9kZSwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGZuKG5vZGUpID09PSB0cnVlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWdOYW1lOlxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiBlbGVtLnRhZ05hbWUoKSA9PT0gdGFnTmFtZSk7XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xWT0lEIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyB2YWx1ZSBpcyBnaXZlbiwgdGhlbiBhbnkgZWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgaXMgcmV0dXJuZWRcbiAgZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnkoZWxlbSA9PiB7XG4gICAgICBpZiAoZWxlbS5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3MgbmFtZVxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBjbGFzcyBuYW1lOlxuICBnZXRFbGVtZW50c0J5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIFluZ3dpZUVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIElEOlxuICAvLyBOT1RFOiBSZXR1cm5zIFVOREVGSU5FRCBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgZ2V0RWxlbWVudEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiaWRcIiwgaWQpLnBvcCgpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5UKSAtPiBWT0lEXXwoRVZFTlQpIC0+IFZPSUQgLT4gIHRoaXNcbiAgLy8gQmluZHMgY29udHJvbGxlciBieSBldmVudCBuYW1lIHRvIG5vZGUgYXQgcmVuZGVyOlxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IFluZ3dpZUNvbnRyb2xsZXIuaW5pdChldnROYW1lLCBmbnMpO1xuICAgIHRoaXMuX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBWT0lEIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gUmV0dXJucyBjbG9uZSBvZiB0aGlzIHluZ3dpZUVsZW1lbnQ6XG4gIGNsb25lKCkge1xuXG4gICAgLy8gQ29weSB0YWduYW1lOlxuICAgIGxldCB0YWdOYW1lID0gYCR7dGhpcy5fdmFsdWV9YDtcblxuICAgIC8vIENvcHkgYXR0cmlidXRlczpcbiAgICBsZXQgYXR0cmlicyA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgocmVzdWx0LCBpZCkgPT4ge1xuICAgICAgcmVzdWx0W2lkXSA9IGAke3RoaXMuX2F0dHJpYnNbaWRdfWA7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIC8vIENvcHkgc2V0OlxuICAgIGxldCB0ZXh0ID0gdGhpcy5fdGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGAke3RoaXMuX3RleHR9YFxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBDb3B5IGNvbnRyb2xsZXJzOlxuICAgIGxldCBjb250cm9sbGVycyA9IHRoaXMuX2NvbnRyb2xsZXJzLm1hcCgoY29udHJvbGxlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIENvcHkgY2hpbGRyZW4gYW5kIHJldHVybiBlbGVtZW50OlxuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpO1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChlbGVtLCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIGVsZW0uYXBwZW5kKGNoaWxkKTtcbiAgICB9LCBlbGVtKTtcblxuICB9XG5cbiAgLy8gOjogU1RSSU5HfERPTUVsZW1lbnQgLT4gRE9NRWxlbWVudFxuICAvLyBUcmFuc2Zvcm1zIFluZ3dpZUVsZW1lbnQgYW5kIGl0J3MgZGVzZW5kYW50cyBpbnRvIGJyb3dzZXIgYSBET01FbGVtZW50OlxuICAvLyBOT1RFOiBPcHRpb25hbCBhcnVnbWVudCBkZXRlcm1pbmVzIHdoZXJlIHRvIGFwcGVuZCByZW5kZXIgdG8sIG90aGVyd2lzZSByZWVuZGVyIGlzIHJldHVybmVkO1xuICByZW5kZXIodGFyZ2V0KSB7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX3ZhbHVlKSk7XG5cbiAgICAvLyBCaW5kIENvbnRyb2xsZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9jb250cm9sbGVycy5yZWR1Y2UoKGVsZW0sIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLnJlbmRlcih0aGlzLCBlbGVtKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuX3RleHQpO1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChlbGVtVGV4dCk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuZCBhcHBlbmQgYWxsIGNoaWxkcmVuIGFuZCByZXR1cm4gcmVzdWx0OlxuICAgIGxldCByZXN1bHQgPSB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLnJlbmRlcigpO1xuICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiB0YXJnZXQgaXMgZ2l2ZW4sIGFwcGVuZHMgcmVzdWx0IG9mIHJlbmRlciB0byB0aGF0IHRhcmdldDpcbiAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIElmIHRhcmdldCBpcyBzdHJpbmcsIGZpbmQgbm9kZSB1c2luZyBxdWVyeSBzZWxlY3RvcjpcbiAgICAgIGlmICh0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyaXNlIGFzc3VtZSB0aGF0IHRhcmdldCBpcyBET01FbGVtZW50OlxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVDb250cm9sbGVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnTmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpXG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RE9NRWxlbWVudCwgW3luZ3dpZUVsZW1lbnRdIC0+IERPTUVsZW1lbnRcbiAgLy8gUmVuZGVycyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyBhbmQgYXBwZW5kcyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0OlxuICAvLyBOT1RFOiBET01FbGVtZW50IG9mIHRhcmdldCBpcyByZXR1cm5lZFxuICBzdGF0aWMgcmVuZGVyVG8odGFyZ2V0LCBlbGVtcykge1xuICAgIGlmIChlbGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICAgIDogdGFyZ2V0O1xuICAgICAgcmV0dXJuIGVsZW1zLnJlZHVjZSgocmVzdWx0LCBlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICAgIGVsZW0ucmVuZGVyKHJlc3VsdCk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIHJlbmRlcmVkIHRvIHRhcmdldFwiLCBlbGVtKTtcbiAgICAgIH0sIG5vZGUpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJFeHBlY3RlZCBhcnJheSBhcyBhcmd1bWVudFwiLCBlbGVtcyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RE9NRWxlbWVudCwgeW5nd2llRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIFJlcGxhY2VzIHRoZSBnaXZlbiB0YXJnZXQgd2l0aCB0aGUgcmVuZGVyIG9mIHRoZSBnaXZlbiBpbnN0YW5jZSAgb2YgWW5nd2llRWxlbWVudDpcbiAgc3RhdGljIGluamVjdCh0YXJnZXQsIGVsZW0pIHtcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICBsZXQgcmVzdWx0ID0gZWxlbS5yZW5kZXIoKTtcbiAgICAgIG5vZGUucmVwbGFjZVdpdGgocmVzdWx0KTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIGluamVjdGVkIGludG8gdGFyZ2V0XCIsIGVsZW0pO1xuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgKiAtPiBFUlJPUlxuICAvLyBOT1RFIDo6IFwiZGF0YVwiIGFyZ3VtZW50IGlzIGFsd2F5cyBjYXN0IGFzIFNUUklORzpcbiAgY29uc3RydWN0b3IobXNnLCBkYXRhKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLmRhdGEgPSBgJHtkYXRhfWA7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+ICBWT0lEXG4gIC8vIENvbnNvbGVzIG91dCBzdGFjayB0cmFjZSBvZiBlcnJvciwgYWxvbmcgd2l0aCB0aGUgZGF0YSB0aGF0IGNhdXNlZCB0aGUgZXhjZXB0aW9uIHRvIGJlIHRocm93bjpcbiAgbG9nKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhY2spO1xuICAgIGNvbnNvbGUubG9nKFwiV2hhdCBGYWlsZWQ6IFwiLCB0aGlzLmRhdGEpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcgLT4geW5nd2llTm9kZVxuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YodmFsdWUpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlOyAgICAgICAvLyBBcmJpdHJhcnkgU1RSSU5HIHZhbHVlIHRoYXQgY2FuIGJlIHN0b3JlZCBieSB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDsgIC8vIFBhcmVudCBvZiB0aGlzIG5vZGVcbiAgICAgIHRoaXMuX2ZpcnN0ID0gdW5kZWZpbmVkOyAgIC8vIEZpcnN0IGNoaWxkIG9mIHRoaXMgbm9kZVxuICAgICAgdGhpcy5fbGFzdCA9IHVuZGVmaW5lZDsgICAgLy8gTGFzdCBjaGlsZCBvZiB0aGlzIG5vZGU7XG4gICAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkOyAgICAvLyBOZXh0IHNpYmxpbmcgb2YgdGhpcyBub2RlXG4gICAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkOyAgICAvLyBQcmV2aW91cyBzaWJsaW5nIG9mIHRoZSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIlZhbHVlIG9mIFluZ3dpZU5vZGUgbXVzdCBiZSBTVFJJTkdcIiwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gW3luZ3dpZU5vZGVdXG4gIC8vIFJldHVybnMgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGU6XG4gIGNoaWxkcmVuKCkge1xuXG4gICAgbGV0IGNoaWxkID0gdGhpcy5fZmlyc3Q7ICAgLy8gRmlyc3QgY2hpbGRcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTsgICAgICAgICAvLyBBcnJheSBvZiBjaGlsZHJlbiB0byByZXR1cm5cblxuICAgIC8vIExvb2tzIGZvciBuZXh0IHNpYmxpbmcgdW50aWwgdGhlcmUgYXJlIG5vIG1vcmUgc2libGluZ3M6XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbiBhcnJhcnkgeW5naXdOb2RlIGVsZW1lbnRzOlxuICAgIHJldHVybiBjaGlsZHJlbjtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzXG4gIC8vIEFkZHMgZ2l2ZW4gbm9kZSB0byBjaGlsZHJlbiBvZiB0aGlzIG5vZGU6XG4gIC8vIE5PVEU6IElmIGdpdmVuIG5vZGUgYWxyZWFkeSBoYXMgYSBwYXJlbnQsIHRoYXQgbm9kZSBpcyBkZXRhY2hlZCBhbmQgYXBwZW5lZCB0byB0aGlzIG5vZGU6XG4gIGFwcGVuZChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBJZiBnaXZlbiBub2RlIGhhcyBwYXJlbnQsIGRldGFjaCB0aGF0IG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgICAgIGlmIChub2RlLl9wYXJlbnQpIHtcbiAgICAgICAgbm9kZS5kZXRhY2goKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IG5ldyBub2RlIGFzIGxhc3Qgc2libGluZzpcbiAgICAgIGlmICh0aGlzLl9maXJzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9sYXN0OyAgICAvLyBTZXRzIG5ldyBsYXN0IGNoaWxkJ3MgcHJldmlvdXMgbm9kZSB0byBvbGQgbGFzdCBub2RlXG4gICAgICAgIHRoaXMuX2xhc3QuX25leHQgPSBub2RlOyAgICAvLyBTZXQgb2xkIGxhc3QgY2hpbGQgbmV4dCBlbGVtZW50IHRvIG5ldyBsYXN0IGNoaWxkXG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlOyAgICAgICAgIC8vIFNldCBuZXcgbGFzdCBjaGlsZCB0byBnaXZlbiBub2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB0aGVyIGFyZSBubyBjaGlsZHJlbiwgdGhlbiB0aGlzIG5vZGUgaXMgYW4gb25seSBjaGlsZDpcbiAgICAgICAgdGhpcy5fZmlyc3QgPSBub2RlO1xuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHBhcmVudFxuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcztcblxuICAgICAgLy8gUmV0dXJuIGluc3RhbmNlOmNvc25vbGVcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgYXBwcGVuZCBZbmd3aWVOb2RlIHRvIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBbeW5nd2llTm9kZV0gLT4gdGhpc1xuICAvLyBBcHBlbmRzIGFuIGFycmF5IG9mIFluZ3dpZU5vZGVzIHRvIHRoaXMgaW5zdGFuY2U6XG4gIGFwcGVuZHMobm9kZXMpIHtcbiAgICBpZiAobm9kZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIG5vZGVzLnJlZHVjZSgocmVzdWx0LCBub2RlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZChub2RlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJFeHBlY3RlZCBhcnJheSBhcyBhcmd1ZW1udFwiLCBub2Rlcyk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gRGV0YWNoZXMgdGhpcyBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gIGRldGFjaCgpIHtcblxuICAgIC8vIE1ha2UgcHJldmlvdXMgbm9kZSdzIG5leHQgbm9kZSB0aGlzIG5vZGUncyBuZXh0IG5vZGU6XG4gICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgIHRoaXMuX3ByZXYuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBwcmV2aW91cyBub2RlLCB0aGVuIHRoaXMgbm9kZSBtdXN0IGJlIGZpcnN0IGNoaWxkIG9mIHBhcmVudCAoaWYgbm9kZSBoYXMgcGFyZW50KTpcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IHRoaXMuX25leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBuZXh0IG5vZGUncyBwcmV2aW91cyBub2RlIHRoaXMgbm9kZSdzIHByZXZpb3VzIG5vZGU6XG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgIHRoaXMuX25leHQuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIH1cblxuICAgIC8vIFVuc2V0IGFsbCByZWxhdGlvbnM6XG4gICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFJldHVybiBpbnN0YW5jZTpcbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzO1xuICAvLyBJbnNlcnRzIGdpdmVuIHluZ3dpZU5vZGUgYmVmb3JlIHRoaXMgaW5zdGFuY2Ugb2YgeW5nd2llTm9kZTpcbiAgLy8gTk9URTogYS5pbnNlcnRzQmVmb3JlKGIpIG1lYW5zIFwiYlwiIGlzIGluc2VydGVkIGJlZm9yZSBcImFcIlxuICBpbnNlcnRCZWZvcmUobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gU2V0IHJlbGF0aW9uc1xuICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgICBub2RlLl9uZXh0ID0gdGhpcztcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgLy8gU2V0IHByZXZpb3VzIHNpYmxpbmcgcmVsYXRpb25zOlxuICAgICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHByZXZpb3VzIHNpYmxpbmc6XG4gICAgICB0aGlzLl9wcmV2ID0gbm9kZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBpbnNlcnQgYSBZbmd3aWVOb2RlIGJlZm9yZSBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB5bmd3aWVOb2RlXG4gIC8vIFJlcGxhY2UgdGhpcyBub2RlIHdpdGggZ2l2ZW4gbm9kZTpcbiAgcmVwbGFjZVdpdGgobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gQ2hlY2tzIGlmIHRoaXMgbm9kZSBoYXMgYSBwYXJlbnRcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIC8vIFJlcGxhY2VtZW50IGlzIGFjY29tcGxpc2hlZCBieSBmaXJzdCBpbnNlcnRpbmcgZ2l2ZW4gbm9kZSwgdGhlbiBkZXRhdGNoaW5nIHRoaXMgbm9kZTpcbiAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZSk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGdpdmVuIG5vZGU6XG4gICAgICAgIHJldHVybiBub2RlO1xuXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgWW5nd2llTm9kZSBpZiBZbmd3aWVOb2RlIGJlaW5nIHJlcGxhY2VkIGhhcyBwYXJlbnRcIiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSByZXBsYWNlIGEgWW5nd2llTm9kZSB3aXRoIGFub3RoZXIgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVOb2RlXG4gIC8vIFJldHVybnMgZGVlcCBjbG9uZSBvZiB0aGlzIG5vZGU6XG4gIGNsb25lKCkge1xuICAgIGxldCB2YWx1ZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG4gICAgbGV0IGNsb25lID0gbmV3IFluZ3dpZU5vZGUodmFsdWUpXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNsb25lID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiByZXN1bHQuYXBwZW5kKGNsb25lKTtcbiAgICB9LCBjbG9uZSk7XG4gIH1cblxuICAvLyBOT0RFLCAqIC0+IE5PREUgLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGEgcmVzdWx0IGFuZCB0aGlzIG5vZGUsIHdoZXJlIHRoYXQgZnVuY3Rpb24gcmV0dXJucyB0aGUgbmV4dCBub2RlIHRvIHRoYXQgZnVuY3Rpb24gaXMgYXBwbGllZCB0b1xuICAvLyBOT1RFOiBSZXN1bHQgaXMgcmV0dXJuZWQgd2hlbiB0aGVyZSBpcyBubyBuZXh0IG5vZGUgdG8gYXBwbHkgZnVuY3Rpb24gdG9cbiAgc3RlcChmbiwgcmVzdWx0KSB7XG4gICAgbmV4dCA9IGZuKHRoaXMsIHJlc3VsdCk7XG4gICAgaWYgKG5leHQpIHtcbiAgICAgIG5leHQuc3RlcChmbiwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIDo6IE5PREUsICogLT4gKiwgKiAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gdGhpcyBub2RlIGFuZCBpdCdzIGRlc2NlbmRhbnRzLCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGF0IGZ1bmN0aW9uOlxuICBwYXJzZShmbiwgcmVzdWx0KSB7XG4gICAgWW5nd2llTm9kZS5wYXJzZSh0aGlzLCAobm9kZSkgPT4ge1xuICAgICAgcmVzdWx0ID0gZm4obm9kZSwgcmVzdWx0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFN0YXRpYyBGdW5jdGlvblxuICAgKlxuICAgKi9cblxuICAvLyBTdGF0aWMgRmFjdG9yeSBNZXRob2RcbiAgc3RhdGljIGluaXQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZU5vZGUodmFsdWUpO1xuICB9XG5cbiAgLy8gTk9ERSwgTk9ERSAtPiBWT0lEIC0+IFZPSURcbiAgLy8gQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGEgbm9kZSBhbmQgYWxsIGl0J3MgZGVzZW5kYW50c1xuICAvLyBOT0RFOiBUaGlzIGlzIGEgcmUtaW1wbGVtZW50YXRpb24gb2YgQ3JvY2tmb3JkJ3MgRE9NIHdhbGsgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OiBUaGUgR29vZCBQYXJ0c1wiXG4gIHN0YXRpYyBwYXJzZShub2RlLCBmbikge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgZm4obm9kZSk7XG4gICAgICBub2RlID0gbm9kZS5fZmlyc3Q7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBZbmd3aWVOb2RlLnBhcnNlKG5vZGUsIGZuKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBwYXJzZSBhIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4uL0Vycm9yL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVGV4dE5vZGUgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHN1cGVyKHRleHQpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBTVFJJTkdcbiAgLy8gUmV0dXJucyB0ZXh0IG9mIHRoaXMgdGV4dCBub2RlOlxuICB0ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vOjogVk9JRCAtPiBET01UZXh0Tm9kZVxuICAvLyBDcmVhdGVzICBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBBcHBlbmRzIFNUUklORyBpbnN0ZWFkIG9mIE5PREUgc2luY2UgYSBUZXh0Tm9kZSBoYXMgbm8gY2hpbGRyZW5cbiAgYXBwZW5kKHN0cikge1xuICAgIGlmICh0eXBlb2Yoc3RyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSBzdHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFNUUklOR3MgY2FuIGFwcGVuZCBZbmd3aWVUZXh0Tm9kZXNcIiwgc3RyKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gQ3JlYXRlcyBhIGNsb25lIG9mIHRoaXMgeW5nd2llVGV4dE5vZGU6XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUoYCR7dGhpcy5fdmFsdWV9YCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIGluaXQodGV4dCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUodGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4uL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5cbi8vIDo6IFNUUklORyAtPiB5bmd3aWVFbGVtZW50XG4vLyBUcmFuc2Zvcm1zIHN0cmluZyBvZiBIVE1MIGludG8gYSB5bmd3aWVFbGVtZW50XG4vLyBOT1RFOiBUaGlzIERPRVMgTk9UIHRyYW5zZm9ybSBldmVudCBoYW5kbGVycyBpbnRvIFluZ3dpZUNvbnRyb2xsZXIgb2JqZWN0czpcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFluZ3dpZVRyYW5zZm9ybSAoaHRtbCkge1xuICByZXR1cm4gd2Fsa05vZGUodHlwZW9mKGh0bWwpID09PSBcInN0cmluZ1wiID8gdG9Ob2RlKGh0bWwpIDogaHRtbCk7XG59XG5cbi8vIDo6IFNUUklORyAtPiBOT0RFXG4vLyBUcmFuc2Zvcm1zIHN0cmluZyBvZiBIVE1MIGludG8gY2xpZW50LXNpZGUgRE9NIG5vZGU6XG5mdW5jdGlvbiB0b05vZGUoaHRtbCkge1xuICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKTtcbiAgcmV0dXJuIGRvYy5ib2R5LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG4vLyA6OiBOT0RFLCBOT0RFLCBub2RlLm5vZGVUeXBlIC0+IFZPSURcbi8vIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWW5nd2llRWxlbWVudCBmcm9tIHRoZSBnaXZlbiBub2RlIGFuZCBhbGwgb2YgaXQncyBkZXNlbmRlbnRzOlxuLy8gTk9URTogSW5zcGlyZWQgYnkgQ3JvY2tmb3JkJ3MgRE9NIHdhbGtpbmcgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OlRoZSBHb29kIFBhcnRzXCJcbmZ1bmN0aW9uIHdhbGtOb2RlKG5vZGUsIHJlc3VsdCkge1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgbGV0IGF0dHJpYnMgPSBnZXRBdHRyaWJ1dGVzKG5vZGUpO1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBhdHRyaWJzKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtLmF0dHJpYnV0ZXMpLnJlZHVjZSgocmVzdWx0LCBhdHRyaWIpID0+IHtcbiAgICByZXN1bHRbYXR0cmliLm5hbWVdID0gYXR0cmliLnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUcmFuc2Zvcm0gZnJvbSBcIi4vdHJhbnNmb3JtL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU5vZGUgYXMgTm9kZSxcbiAgWW5nd2llRWxlbWVudCBhcyBFbGVtZW50LFxuICBZbmd3aWVUZXh0Tm9kZSBhcyBUZXh0Tm9kZSxcbiAgWW5nd2llQ29udHJvbGxlciBhcyBDb250cm9sbGVyLFxuICBZbmd3aWVUcmFuc2Zvcm0gYXMgdHJhbnNmb3JtLFxuICBZbmd3aWVFcnJvciBhcyBFcnJvclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==