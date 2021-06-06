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

  // :: (EVT -> VOID) -> this;
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

  // :: DOMElement -> DOMElement
  // Creates event listener and binds it given DOMElement
  render(node) {
    return this._fns.reduce((node, fn) => {
      node.addEventListener(this._evtName, fn);
      return node;
    }, node);
  }

  // :: STRING, [EVENT -> VOID]|EVENT -> VOID -> yngwieController
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
  constructor(tagname, attribs, text, controllers) {
    super(tagname);
    this._attribs = attribs || {};                   // Element Attributes
    this._text = text === undefined ? null : text;   // Element text that's appended as first child of this element
    this._controllers = [];                          // Controllers bound to this element
  }

  // :: OBJECT|UNDEFINED -> this|OBJECT
  // Sets "attribs" OBJECT with given OBJECT:
  // NOTE: If no argument is given, set attributes are returned:
  attribs(attribs) {
    if (attribs === undefined) {
      return this._attribs;
    } else {
      this._attribs = attribs;
      return this;
    }
  }

  // :: STRING -> BOOLEAN
  // Returns BOOLEAN for if attribute with given name exists in "attribs" OBJECT:
  hasAttribute(name) {
    return this._attribs.hasOwnProperty(name);
  }

  // :: STRING -> STRING|UNDEFINED
  // Returns value of attribute by name stored in "attribs" OBJECT, otherwise returns UNDEFINED
  getAttribute(name) {
    return this._attribs[name];
  }

  // :: STRING, STRING -> this
  // Binds STRING value to "attribs" OBJECT with given name:
  setAttribute(name, value) {
    this._attribs[name] = value;
    return this;
  }

  // :: STRING|UNDEFINED -> this|UNDEFINED
  // Appends text node as first child of element at render with given string as it's value:
  // NOTE: If no argument is given, set text is returned:
  // NOTE: To unset next, set set to NULL:
  text(str) {
    if (str === undefined) {
      return this._text;
    } else {
      this._text = str;
      return this;
    }
  }

  // :: STRING -> [yngwieElement]
  // Returns an array of YngwieElemnts that have the given tagname:
  // NOTE: Returns an empty array if no elements are found with the given tag name:
  getElementsByTagName(tagname) {
    return this.parse((result, node) => {
      if (node._value === tagname) {
        result.push(node);
      }
    return result;
    }, []);
  }

  // STRING, STRING|UNDEFINED -> [yngwieElement]
  // Returns an array of yngwieElements that have the given attribute with the given value:
  // NOTE: If no value is given, then any element that has the given attribute name is returned
  getElementsByAttribute(name, value) {
    return this.parse((node, result) => {
      if (node instanceof YngwieElement) {
        if (node.hasAttribute(name)) {
          if (value === undefined) {
            result.push(node);
          } else {
            if (node.getAttribute(name) === value) {
              result.push(node);
            }
          }
        }
      }
      return result;
    }, []);
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
    let tagname = `${this._value}`;

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
    let elem = new YngwieElement(tagname, attribs, text, controllers);
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
      return controller.render(elem);
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
  // static factory method:
  static init(tagname, attribs, text, controllers) {
    return new YngwieElement(tagname, attribs, text, controllers)
  }

  // :: STRING|DOMElement, [yngwieElement] -> DOMElement
  // Renders an array of yngwieElements and appends result to given target:
  // NOTE: DOMElement of target is returned
  static renderTo(target, elems) {
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
    this._value = value;       // Arbitrary STRING value that can be stored by this node
    this._parent = undefined;  // Parent of this node
    this._first = undefined;   // First child of this node
    this._last = undefined;    // Last child of this node;
    this._next = undefined;    // Next sibling of this node
    this._prev = undefined;    // Previous sibling of the node
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
    return nodes.reduce((result, node) => {
      return this.append(node);
    }, this);
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

      if (this._prev) {
        this._prev._next = node;
      } else {
        if (this._parent) {
          this._parent._first = node;
        }
      }

      // Set relations
      node._prev = this._prev;
      node._next = this;
      node._parent = this._parent;

      return this;

    }

    throw new _Error_main_js__WEBPACK_IMPORTED_MODULE_0__.default("Can only insert a YngwieNode before other YngwieNodes", node);

  }

  // :: yngwieNode -> yngwieNode
  // Replace this node with given node:
  replaceWith(node) {

    // Checks if argument is a node:
    if (node instanceof YngwieNode) {

      this.insertBefore(node);
      this.detach();

      // Return given node:
      return node;

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
/* harmony export */   "transform": () => (/* reexport safe */ _transform_main_js__WEBPACK_IMPORTED_MODULE_4__.default)
/* harmony export */ });
/* harmony import */ var _Node_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/main.js */ "./src/Node/main.js");
/* harmony import */ var _Element_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Element/main.js */ "./src/Element/main.js");
/* harmony import */ var _TextNode_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextNode/main.js */ "./src/TextNode/main.js");
/* harmony import */ var _Controller_main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller/main.js */ "./src/Controller/main.js");
/* harmony import */ var _transform_main_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transform/main.js */ "./src/transform/main.js");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy90cmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDeUM7QUFD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O0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHNEQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQOzs7Ozs7O1VDM0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDTTtBQUNFO0FBQ0k7QUFDRjs7QUFRakQiLCJmaWxlIjoieW5nd2llLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlluZ3dpZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUNvbnRyb2xsZXIge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgWyhFVlQgLT4gVk9JRCldIC0+IHRoaXNcbiAgY29uc3RydWN0b3IoZXZ0TmFtZSwgZm5zKSB7XG4gICAgdGhpcy5fZXZ0TmFtZSA9IGV2dE5hbWU7XG4gICAgdGhpcy5fZm5zID0gZm5zIHx8IFtdO1xuICB9XG5cbiAgLy8gOjogKEVWVCAtPiBWT0lEKSAtPiB0aGlzO1xuICAvLyBBZGRzIGZ1bmN0aW9uIHRvIGxpc3RlbmVyOlxuICBhZGQoZm4pIHtcbiAgICB0aGlzLl9mbnMucHVzaChmbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHluZ3dpZUNvbnRyb2xsZXI6XG4gIGNsb25lKCkge1xuICAgIGxldCBldnROYW1lID0gYCR7dGhpcy5fZXZ0TmFtZX1gO1xuICAgIGxldCBmbnMgPSB0aGlzLl9mbnMubWFwKGZuPT57XG4gICAgICByZXR1cm4gZm4udG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUNvbnRyb2xsZXIoZXZ0TmFtZSwgZm5zKTtcbiAgfVxuXG4gIC8vIDo6IERPTUVsZW1lbnQgLT4gRE9NRWxlbWVudFxuICAvLyBDcmVhdGVzIGV2ZW50IGxpc3RlbmVyIGFuZCBiaW5kcyBpdCBnaXZlbiBET01FbGVtZW50XG4gIHJlbmRlcihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zucy5yZWR1Y2UoKG5vZGUsIGZuKSA9PiB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5fZXZ0TmFtZSwgZm4pO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSwgbm9kZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFtFVkVOVCAtPiBWT0lEXXxFVkVOVCAtPiBWT0lEIC0+IHluZ3dpZUNvbnRyb2xsZXJcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdChldnROYW1lLCBmbnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUNvbnRyb2xsZXIoZXZ0TmFtZSwgQXJyYXkuaXNBcnJheShmbnMpID09PSB0cnVlID8gZm5zIDogW2Zuc10pO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVDb250cm9sbGVyIGZyb20gXCIuLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUNvbnRyb2xsZXJdIC0+IHRoaXNcbiAgY29uc3RydWN0b3IodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICBzdXBlcih0YWduYW1lKTtcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgICAgICAgICAgICAgICAgICAgLy8gRWxlbWVudCBBdHRyaWJ1dGVzXG4gICAgdGhpcy5fdGV4dCA9IHRleHQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiB0ZXh0OyAgIC8vIEVsZW1lbnQgdGV4dCB0aGF0J3MgYXBwZW5kZWQgYXMgZmlyc3QgY2hpbGQgb2YgdGhpcyBlbGVtZW50XG4gICAgdGhpcy5fY29udHJvbGxlcnMgPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnRyb2xsZXJzIGJvdW5kIHRvIHRoaXMgZWxlbWVudFxuICB9XG5cbiAgLy8gOjogT0JKRUNUfFVOREVGSU5FRCAtPiB0aGlzfE9CSkVDVFxuICAvLyBTZXRzIFwiYXR0cmlic1wiIE9CSkVDVCB3aXRoIGdpdmVuIE9CSkVDVDpcbiAgLy8gTk9URTogSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHNldCBhdHRyaWJ1dGVzIGFyZSByZXR1cm5lZDpcbiAgYXR0cmlicyhhdHRyaWJzKSB7XG4gICAgaWYgKGF0dHJpYnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gU1RSSU5HfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGF0dHJpYnV0ZSBieSBuYW1lIHN0b3JlZCBpbiBcImF0dHJpYnNcIiBPQkpFQ1QsIG90aGVyd2lzZSByZXR1cm5zIFVOREVGSU5FRFxuICBnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBTVFJJTkcgLT4gdGhpc1xuICAvLyBCaW5kcyBTVFJJTkcgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HfFVOREVGSU5FRCAtPiB0aGlzfFVOREVGSU5FRFxuICAvLyBBcHBlbmRzIHRleHQgbm9kZSBhcyBmaXJzdCBjaGlsZCBvZiBlbGVtZW50IGF0IHJlbmRlciB3aXRoIGdpdmVuIHN0cmluZyBhcyBpdCdzIHZhbHVlOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IHRleHQgaXMgcmV0dXJuZWQ6XG4gIC8vIE5PVEU6IFRvIHVuc2V0IG5leHQsIHNldCBzZXQgdG8gTlVMTDpcbiAgdGV4dChzdHIpIHtcbiAgICBpZiAoc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90ZXh0ID0gc3RyO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWduYW1lOlxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnbmFtZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLl92YWx1ZSA9PT0gdGFnbmFtZSkge1xuICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8vIFNUUklORywgU1RSSU5HfFVOREVGSU5FRCAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGF0dHJpYnV0ZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZTpcbiAgLy8gTk9URTogSWYgbm8gdmFsdWUgaXMgZ2l2ZW4sIHRoZW4gYW55IGVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIGF0dHJpYnV0ZSBuYW1lIGlzIHJldHVybmVkXG4gIGdldEVsZW1lbnRzQnlBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSgobm9kZSwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKG5vZGUuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvLyBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3MgbmFtZVxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBjbGFzcyBuYW1lOlxuICBnZXRFbGVtZW50c0J5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIFluZ3dpZUVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIElEOlxuICAvLyBOT1RFOiBSZXR1cm5zIFVOREVGSU5FRCBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgZ2V0RWxlbWVudEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiaWRcIiwgaWQpLnBvcCgpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5UKSAtPiBWT0lEXXwoRVZFTlQpIC0+IFZPSUQgLT4gIHRoaXNcbiAgLy8gQmluZHMgY29udHJvbGxlciBieSBldmVudCBuYW1lIHRvIG5vZGUgYXQgcmVuZGVyOlxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IFluZ3dpZUNvbnRyb2xsZXIuaW5pdChldnROYW1lLCBmbnMpO1xuICAgIHRoaXMuX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBWT0lEIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gUmV0dXJucyBjbG9uZSBvZiB0aGlzIHluZ3dpZUVsZW1lbnQ6XG4gIGNsb25lKCkge1xuXG4gICAgLy8gQ29weSB0YWduYW1lOlxuICAgIGxldCB0YWduYW1lID0gYCR7dGhpcy5fdmFsdWV9YDtcblxuICAgIC8vIENvcHkgYXR0cmlidXRlczpcbiAgICBsZXQgYXR0cmlicyA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgocmVzdWx0LCBpZCkgPT4ge1xuICAgICAgcmVzdWx0W2lkXSA9IGAke3RoaXMuX2F0dHJpYnNbaWRdfWA7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIC8vIENvcHkgc2V0OlxuICAgIGxldCB0ZXh0ID0gdGhpcy5fdGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGAke3RoaXMuX3RleHR9YFxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBDb3B5IGNvbnRyb2xsZXJzOlxuICAgIGxldCBjb250cm9sbGVycyA9IHRoaXMuX2NvbnRyb2xsZXJzLm1hcCgoY29udHJvbGxlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIENvcHkgY2hpbGRyZW4gYW5kIHJldHVybiBlbGVtZW50OlxuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpO1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChlbGVtLCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIGVsZW0uYXBwZW5kKGNoaWxkKTtcbiAgICB9LCBlbGVtKTtcblxuICB9XG5cbiAgLy8gOjogU1RSSU5HfERPTUVsZW1lbnQgLT4gRE9NRWxlbWVudFxuICAvLyBUcmFuc2Zvcm1zIFluZ3dpZUVsZW1lbnQgYW5kIGl0J3MgZGVzZW5kYW50cyBpbnRvIGJyb3dzZXIgYSBET01FbGVtZW50OlxuICAvLyBOT1RFOiBPcHRpb25hbCBhcnVnbWVudCBkZXRlcm1pbmVzIHdoZXJlIHRvIGFwcGVuZCByZW5kZXIgdG8sIG90aGVyd2lzZSByZWVuZGVyIGlzIHJldHVybmVkO1xuICByZW5kZXIodGFyZ2V0KSB7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX3ZhbHVlKSk7XG5cbiAgICAvLyBCaW5kIENvbnRyb2xsZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9jb250cm9sbGVycy5yZWR1Y2UoKGVsZW0sIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLnJlbmRlcihlbGVtKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuX3RleHQpO1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChlbGVtVGV4dCk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuZCBhcHBlbmQgYWxsIGNoaWxkcmVuIGFuZCByZXR1cm4gcmVzdWx0OlxuICAgIGxldCByZXN1bHQgPSB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLnJlbmRlcigpO1xuICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiB0YXJnZXQgaXMgZ2l2ZW4sIGFwcGVuZHMgcmVzdWx0IG9mIHJlbmRlciB0byB0aGF0IHRhcmdldDpcbiAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIElmIHRhcmdldCBpcyBzdHJpbmcsIGZpbmQgbm9kZSB1c2luZyBxdWVyeSBzZWxlY3RvcjpcbiAgICAgIGlmICh0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyaXNlIGFzc3VtZSB0aGF0IHRhcmdldCBpcyBET01FbGVtZW50OlxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUNvbnRyb2xsZXJdIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gc3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycykge1xuICAgIHJldHVybiBuZXcgWW5nd2llRWxlbWVudCh0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycylcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xET01FbGVtZW50LCBbeW5nd2llRWxlbWVudF0gLT4gRE9NRWxlbWVudFxuICAvLyBSZW5kZXJzIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIGFuZCBhcHBlbmRzIHJlc3VsdCB0byBnaXZlbiB0YXJnZXQ6XG4gIC8vIE5PVEU6IERPTUVsZW1lbnQgb2YgdGFyZ2V0IGlzIHJldHVybmVkXG4gIHN0YXRpYyByZW5kZXJUbyh0YXJnZXQsIGVsZW1zKSB7XG4gICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgIDogdGFyZ2V0O1xuICAgIHJldHVybiBlbGVtcy5yZWR1Y2UoKHJlc3VsdCwgZWxlbSkgPT4ge1xuICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgIGVsZW0ucmVuZGVyKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIHJlbmRlcmVkIHRvIHRhcmdldFwiLCBlbGVtKTtcbiAgICB9LCBub2RlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xET01FbGVtZW50LCB5bmd3aWVFbGVtZW50IC0+IERPTUVsZW1lbnRcbiAgLy8gUmVwbGFjZXMgdGhlIGdpdmVuIHRhcmdldCB3aXRoIHRoZSByZW5kZXIgb2YgdGhlIGdpdmVuIGluc3RhbmNlICBvZiBZbmd3aWVFbGVtZW50OlxuICBzdGF0aWMgaW5qZWN0KHRhcmdldCwgZWxlbSkge1xuICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgbGV0IG5vZGUgPSB0eXBlb2YodGFyZ2V0KSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgICA6IHRhcmdldDtcbiAgICAgIGxldCByZXN1bHQgPSBlbGVtLnJlbmRlcigpO1xuICAgICAgbm9kZS5yZXBsYWNlV2l0aChyZXN1bHQpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIk9ubHkgWW5nd2llRWxlbWVudCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0YXJnZXRcIiwgZWxlbSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCAqIC0+IEVSUk9SXG4gIC8vIE5PVEUgOjogXCJkYXRhXCIgYXJndW1lbnQgaXMgYWx3YXlzIGNhc3QgYXMgU1RSSU5HOlxuICBjb25zdHJ1Y3Rvcihtc2csIGRhdGEpIHtcbiAgICBzdXBlcihtc2cpO1xuICAgIHRoaXMuZGF0YSA9IGAke2RhdGF9YDtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gIFZPSURcbiAgLy8gQ29uc29sZXMgb3V0IHN0YWNrIHRyYWNlIG9mIGVycm9yLCBhbG9uZyB3aXRoIHRoZSBkYXRhIHRoYXQgY2F1c2VkIHRoZSBleGNlcHRpb24gdG8gYmUgdGhyb3duOlxuICBsb2coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGFjayk7XG4gICAgY29uc29sZS5sb2coXCJXaGF0IEZhaWxlZDogXCIsIHRoaXMuZGF0YSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgICAgICAgLy8gQXJiaXRyYXJ5IFNUUklORyB2YWx1ZSB0aGF0IGNhbiBiZSBzdG9yZWQgYnkgdGhpcyBub2RlXG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkOyAgLy8gUGFyZW50IG9mIHRoaXMgbm9kZVxuICAgIHRoaXMuX2ZpcnN0ID0gdW5kZWZpbmVkOyAgIC8vIEZpcnN0IGNoaWxkIG9mIHRoaXMgbm9kZVxuICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7ICAgIC8vIExhc3QgY2hpbGQgb2YgdGhpcyBub2RlO1xuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7ICAgIC8vIE5leHQgc2libGluZyBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkOyAgICAvLyBQcmV2aW91cyBzaWJsaW5nIG9mIHRoZSBub2RlXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFt5bmd3aWVOb2RlXVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICBjaGlsZHJlbigpIHtcblxuICAgIGxldCBjaGlsZCA9IHRoaXMuX2ZpcnN0OyAgIC8vIEZpcnN0IGNoaWxkXG4gICAgbGV0IGNoaWxkcmVuID0gW107ICAgICAgICAgLy8gQXJyYXkgb2YgY2hpbGRyZW4gdG8gcmV0dXJuXG5cbiAgICAvLyBMb29rcyBmb3IgbmV4dCBzaWJsaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIHNpYmxpbmdzOlxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYW4gYXJyYXJ5IHluZ2l3Tm9kZSBlbGVtZW50czpcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpc1xuICAvLyBBZGRzIGdpdmVuIG5vZGUgdG8gY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICAvLyBOT1RFOiBJZiBnaXZlbiBub2RlIGFscmVhZHkgaGFzIGEgcGFyZW50LCB0aGF0IG5vZGUgaXMgZGV0YWNoZWQgYW5kIGFwcGVuZWQgdG8gdGhpcyBub2RlOlxuICBhcHBlbmQobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gSWYgZ2l2ZW4gbm9kZSBoYXMgcGFyZW50LCBkZXRhY2ggdGhhdCBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gICAgICBpZiAobm9kZS5fcGFyZW50KSB7XG4gICAgICAgIG5vZGUuZGV0YWNoKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBuZXcgbm9kZSBhcyBsYXN0IHNpYmxpbmc6XG4gICAgICBpZiAodGhpcy5fZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLl9wcmV2ID0gdGhpcy5fbGFzdDsgICAgLy8gU2V0cyBuZXcgbGFzdCBjaGlsZCdzIHByZXZpb3VzIG5vZGUgdG8gb2xkIGxhc3Qgbm9kZVxuICAgICAgICB0aGlzLl9sYXN0Ll9uZXh0ID0gbm9kZTsgICAgLy8gU2V0IG9sZCBsYXN0IGNoaWxkIG5leHQgZWxlbWVudCB0byBuZXcgbGFzdCBjaGlsZFxuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTsgICAgICAgICAvLyBTZXQgbmV3IGxhc3QgY2hpbGQgdG8gZ2l2ZW4gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlciBhcmUgbm8gY2hpbGRyZW4sIHRoZW4gdGhpcyBub2RlIGlzIGFuIG9ubHkgY2hpbGQ6XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYXJlbnRcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXM7XG5cbiAgICAgIC8vIFJldHVybiBpbnN0YW5jZTpjb3Nub2xlXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGFwcHBlbmQgWW5nd2llTm9kZSB0byBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogW3luZ3dpZU5vZGVdIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBZbmd3aWVOb2RlcyB0byB0aGlzIGluc3RhbmNlOlxuICBhcHBlbmRzKG5vZGVzKSB7XG4gICAgcmV0dXJuIG5vZGVzLnJlZHVjZSgocmVzdWx0LCBub2RlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBlbmQobm9kZSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gRGV0YWNoZXMgdGhpcyBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gIGRldGFjaCgpIHtcblxuICAgIC8vIE1ha2UgcHJldmlvdXMgbm9kZSdzIG5leHQgbm9kZSB0aGlzIG5vZGUncyBuZXh0IG5vZGU6XG4gICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgIHRoaXMuX3ByZXYuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBwcmV2aW91cyBub2RlLCB0aGVuIHRoaXMgbm9kZSBtdXN0IGJlIGZpcnN0IGNoaWxkIG9mIHBhcmVudCAoaWYgbm9kZSBoYXMgcGFyZW50KTpcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IHRoaXMuX25leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBuZXh0IG5vZGUncyBwcmV2aW91cyBub2RlIHRoaXMgbm9kZSdzIHByZXZpb3VzIG5vZGU6XG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgIHRoaXMuX25leHQuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIH1cblxuICAgIC8vIFVuc2V0IGFsbCByZWxhdGlvbnM6XG4gICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFJldHVybiBpbnN0YW5jZTpcbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzO1xuICAvLyBJbnNlcnRzIGdpdmVuIHluZ3dpZU5vZGUgYmVmb3JlIHRoaXMgaW5zdGFuY2Ugb2YgeW5nd2llTm9kZTpcbiAgLy8gTk9URTogYS5pbnNlcnRzQmVmb3JlKGIpIG1lYW5zIFwiYlwiIGlzIGluc2VydGVkIGJlZm9yZSBcImFcIlxuICBpbnNlcnRCZWZvcmUobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHJlbGF0aW9uc1xuICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgICBub2RlLl9uZXh0ID0gdGhpcztcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBpbnNlcnQgYSBZbmd3aWVOb2RlIGJlZm9yZSBvdGhlciBZbmd3aWVOb2Rlc1wiLCBub2RlKTtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB5bmd3aWVOb2RlXG4gIC8vIFJlcGxhY2UgdGhpcyBub2RlIHdpdGggZ2l2ZW4gbm9kZTpcbiAgcmVwbGFjZVdpdGgobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZSk7XG4gICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgIHJldHVybiBub2RlO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBhIFluZ3dpZU5vZGUgd2l0aCBhbm90aGVyIFluZ3dpZU5vZGVcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTm9kZVxuICAvLyBSZXR1cm5zIGRlZXAgY2xvbmUgb2YgdGhpcyBub2RlOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmFsdWUgPSBgJHt0aGlzLl92YWx1ZX1gO1xuICAgIGxldCBjbG9uZSA9IG5ldyBZbmd3aWVOb2RlKHZhbHVlKVxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjbG9uZSA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gcmVzdWx0LmFwcGVuZChjbG9uZSk7XG4gICAgfSwgY2xvbmUpO1xuICB9XG5cbiAgLy8gTk9ERSwgKiAtPiBOT0RFIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byBhIHJlc3VsdCBhbmQgdGhpcyBub2RlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uIHJldHVybnMgdGhlIG5leHQgbm9kZSB0byB0aGF0IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG9cbiAgLy8gTk9URTogUmVzdWx0IGlzIHJldHVybmVkIHdoZW4gdGhlcmUgaXMgbm8gbmV4dCBub2RlIHRvIGFwcGx5IGZ1bmN0aW9uIHRvXG4gIHN0ZXAoZm4sIHJlc3VsdCkge1xuICAgIG5leHQgPSBmbih0aGlzLCByZXN1bHQpO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LnN0ZXAoZm4sIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyA6OiBOT0RFLCAqIC0+ICosICogLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIHRoaXMgbm9kZSBhbmQgaXQncyBkZXNjZW5kYW50cywgcmV0dXJuaW5nIHRoZSByZXN1bHQgb2YgdGhhdCBmdW5jdGlvbjpcbiAgcGFyc2UoZm4sIHJlc3VsdCkge1xuICAgIFluZ3dpZU5vZGUucGFyc2UodGhpcywgKG5vZGUpID0+IHtcbiAgICAgIHJlc3VsdCA9IGZuKG5vZGUsIHJlc3VsdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBTdGF0aWMgRnVuY3Rpb25cbiAgICpcbiAgICovXG5cbiAgLy8gU3RhdGljIEZhY3RvcnkgTWV0aG9kXG4gIHN0YXRpYyBpbml0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVOb2RlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE5PREUsIE5PREUgLT4gVk9JRCAtPiBWT0lEXG4gIC8vIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBhIG5vZGUgYW5kIGFsbCBpdCdzIGRlc2VuZGFudHNcbiAgLy8gTk9ERTogVGhpcyBpcyBhIHJlLWltcGxlbWVudGF0aW9uIG9mIENyb2NrZm9yZCdzIERPTSB3YWxrIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDogVGhlIEdvb2QgUGFydHNcIlxuICBzdGF0aWMgcGFyc2Uobm9kZSwgZm4pIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIGZuKG5vZGUpO1xuICAgICAgbm9kZSA9IG5vZGUuX2ZpcnN0O1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgWW5nd2llTm9kZS5wYXJzZShub2RlLCBmbik7XG4gICAgICAgIG5vZGUgPSBub2RlLl9uZXh0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcGFyc2UgYSBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRleHROb2RlIGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICBzdXBlcih0ZXh0KTtcbiAgfVxuXG4gIC8vOjogVk9JRCAtPiBET01UZXh0Tm9kZVxuICAvLyBDcmVhdGVzICBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBBcHBlbmRzIFNUUklORyBpbnN0ZWFkIG9mIE5PREUgc2luY2UgYSBUZXh0Tm9kZSBoYXMgbm8gY2hpbGRyZW5cbiAgYXBwZW5kKHN0cikge1xuICAgIGlmICh0eXBlb2Yoc3RyKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aGlzLl92YWx1ZSArPSBzdHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFNUUklOR3MgY2FuIGFwcGVuZCBZbmd3aWVUZXh0Tm9kZXNcIiwgc3RyKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gQ3JlYXRlcyBhIGNsb25lIG9mIHRoaXMgeW5nd2llVGV4dE5vZGU6XG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUoYCR7dGhpcy5fdmFsdWV9YCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIGluaXQodGV4dCkge1xuICAgIHJldHVybiBuZXcgWW5nd2llVGV4dE5vZGUodGV4dCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4uL0VsZW1lbnQvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZVRleHROb2RlIGZyb20gXCIuLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5cbi8vIDo6IFNUUklORyAtPiB5bmd3aWVFbGVtZW50XG4vLyBUcmFuc2Zvcm1zIHN0cmluZyBvZiBIVE1MIGludG8gYSB5bmd3aWVFbGVtZW50XG4vLyBOT1RFOiBUaGlzIERPRVMgTk9UIHRyYW5zZm9ybSBldmVudCBoYW5kbGVycyBpbnRvIFluZ3dpZUNvbnRyb2xsZXIgb2JqZWN0czpcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFluZ3dpZVRyYW5zZm9ybSAoaHRtbCkge1xuICByZXR1cm4gd2Fsa05vZGUodHlwZW9mKGh0bWwpID09PSBcInN0cmluZ1wiID8gdG9Ob2RlKGh0bWwpIDogaHRtbCk7XG59XG5cbi8vIDo6IFNUUklORyAtPiBOT0RFXG4vLyBUcmFuc2Zvcm1zIHN0cmluZyBvZiBIVE1MIGludG8gY2xpZW50LXNpZGUgRE9NIG5vZGU6XG5mdW5jdGlvbiB0b05vZGUoaHRtbCkge1xuICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKTtcbiAgcmV0dXJuIGRvYy5ib2R5LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG4vLyA6OiBOT0RFLCBOT0RFLCBub2RlLm5vZGVUeXBlIC0+IFZPSURcbi8vIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgWW5nd2llRWxlbWVudCBmcm9tIHRoZSBnaXZlbiBub2RlIGFuZCBhbGwgb2YgaXQncyBkZXNlbmRlbnRzOlxuLy8gTk9URTogSW5zcGlyZWQgYnkgQ3JvY2tmb3JkJ3MgRE9NIHdhbGtpbmcgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OlRoZSBHb29kIFBhcnRzXCJcbmZ1bmN0aW9uIHdhbGtOb2RlKG5vZGUsIHJlc3VsdCkge1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgbGV0IGF0dHJpYnMgPSBnZXRBdHRyaWJ1dGVzKG5vZGUpO1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBhdHRyaWJzKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtLmF0dHJpYnV0ZXMpLnJlZHVjZSgocmVzdWx0LCBhdHRyaWIpID0+IHtcbiAgICByZXN1bHRbYXR0cmliLm5hbWVdID0gYXR0cmliLnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUcmFuc2Zvcm0gZnJvbSBcIi4vdHJhbnNmb3JtL21haW4uanNcIjtcblxuZXhwb3J0IHtcbiAgWW5nd2llTm9kZSBhcyBOb2RlLFxuICBZbmd3aWVFbGVtZW50IGFzIEVsZW1lbnQsXG4gIFluZ3dpZVRleHROb2RlIGFzIFRleHROb2RlLFxuICBZbmd3aWVDb250cm9sbGVyIGFzIENvbnRyb2xsZXIsXG4gIFluZ3dpZVRyYW5zZm9ybSBhcyB0cmFuc2Zvcm1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=