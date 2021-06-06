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
  // NOTE: To unset next, set to NULL:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvRXJyb3IvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy90cmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDeUM7QUFD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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUMrQztBQUNFOztBQUVqRDtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixxREFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixzREFBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDTTtBQUNFO0FBQ0k7QUFDRjtBQUNSOztBQVN6QyIsImZpbGUiOiJ5bmd3aWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJZbmd3aWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llQ29udHJvbGxlciB7XG5cbiAgLy8gQ09OU1RSVUNUT1IgOjogU1RSSU5HLCBbKEVWVCAtPiBWT0lEKV0gLT4gdGhpc1xuICBjb25zdHJ1Y3RvcihldnROYW1lLCBmbnMpIHtcbiAgICB0aGlzLl9ldnROYW1lID0gZXZ0TmFtZTtcbiAgICB0aGlzLl9mbnMgPSBmbnMgfHwgW107XG4gIH1cblxuICAvLyA6OiAoRVZUIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBDcmVhdGVzIGNsb25lIG9mIHRoaXMgeW5nd2llQ29udHJvbGxlcjpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IGV2dE5hbWUgPSBgJHt0aGlzLl9ldnROYW1lfWA7XG4gICAgbGV0IGZucyA9IHRoaXMuX2Zucy5tYXAoZm49PntcbiAgICAgIHJldHVybiBmbi50b1N0cmluZygpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRE9NRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIENyZWF0ZXMgZXZlbnQgbGlzdGVuZXIgYW5kIGJpbmRzIGl0IGdpdmVuIERPTUVsZW1lbnRcbiAgcmVuZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm5zLnJlZHVjZSgobm9kZSwgZm4pID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldnROYW1lLCBmbik7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LCBub2RlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgW0VWRU5UIC0+IFZPSURdfEVWRU5UIC0+IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGV2dE5hbWUsIGZucykge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBBcnJheS5pc0FycmF5KGZucykgPT09IHRydWUgPyBmbnMgOiBbZm5zXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4uL0NvbnRyb2xsZXIvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVycm9yIGZyb20gXCIuLi9FcnJvci9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVsZW1lbnQgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcuIE9CSkVDVCwgU1RSSU5HLCBbeW5nd2llQ29udHJvbGxlcl0gLT4gdGhpc1xuICBjb25zdHJ1Y3Rvcih0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycykge1xuICAgIHN1cGVyKHRhZ25hbWUpO1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzIHx8IHt9OyAgICAgICAgICAgICAgICAgICAvLyBFbGVtZW50IEF0dHJpYnV0ZXNcbiAgICB0aGlzLl90ZXh0ID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHRleHQ7ICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9jb250cm9sbGVycyA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udHJvbGxlcnMgYm91bmQgdG8gdGhpcyBlbGVtZW50XG4gIH1cblxuICAvLyA6OiBPQkpFQ1R8VU5ERUZJTkVEIC0+IHRoaXN8T0JKRUNUXG4gIC8vIFNldHMgXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gT0JKRUNUOlxuICAvLyBOT1RFOiBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgc2V0IGF0dHJpYnV0ZXMgYXJlIHJldHVybmVkOlxuICBhdHRyaWJzKGF0dHJpYnMpIHtcbiAgICBpZiAoYXR0cmlicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlicztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYXR0cmlicyA9IGF0dHJpYnM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gQk9PTEVBTlxuICAvLyBSZXR1cm5zIEJPT0xFQU4gZm9yIGlmIGF0dHJpYnV0ZSB3aXRoIGdpdmVuIG5hbWUgZXhpc3RzIGluIFwiYXR0cmlic1wiIE9CSkVDVDpcbiAgaGFzQXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBTVFJJTkd8VU5ERUZJTkVEXG4gIC8vIFJldHVybnMgdmFsdWUgb2YgYXR0cmlidXRlIGJ5IG5hbWUgc3RvcmVkIGluIFwiYXR0cmlic1wiIE9CSkVDVCwgb3RoZXJ3aXNlIHJldHVybnMgVU5ERUZJTkVEXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnNbbmFtZV07XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFNUUklORyAtPiB0aGlzXG4gIC8vIEJpbmRzIFNUUklORyB2YWx1ZSB0byBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBuYW1lOlxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLl9hdHRyaWJzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8VU5ERUZJTkVEIC0+IHRoaXN8VU5ERUZJTkVEXG4gIC8vIEFwcGVuZHMgdGV4dCBub2RlIGFzIGZpcnN0IGNoaWxkIG9mIGVsZW1lbnQgYXQgcmVuZGVyIHdpdGggZ2l2ZW4gc3RyaW5nIGFzIGl0J3MgdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCBzZXQgdGV4dCBpcyByZXR1cm5lZDpcbiAgLy8gTk9URTogVG8gdW5zZXQgbmV4dCwgc2V0IHRvIE5VTEw6XG4gIHRleHQoc3RyKSB7XG4gICAgaWYgKHN0ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGV4dCA9IHN0cjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiBZbmd3aWVFbGVtbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gdGFnbmFtZTpcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ25hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSgocmVzdWx0LCBub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS5fdmFsdWUgPT09IHRhZ25hbWUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvLyBTVFJJTkcsIFNUUklOR3xVTkRFRklORUQgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBhdHRyaWJ1dGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWU6XG4gIC8vIE5PVEU6IElmIG5vIHZhbHVlIGlzIGdpdmVuLCB0aGVuIGFueSBlbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBhdHRyaWJ1dGUgbmFtZSBpcyByZXR1cm5lZFxuICBnZXRFbGVtZW50c0J5QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2UoKG5vZGUsIHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVFbGVtZW50KSB7XG4gICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLy8gU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuICAvLyBSZXR1cm5zIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGNsYXNzIG5hbWVcbiAgLy8gTk9URTogUmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgbmFtZTpcbiAgZ2V0RWxlbWVudHNCeUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc05hbWUpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBZbmd3aWVFbGVtZW50IHRoYXQgaGFzIHRoZSBnaXZlbiBJRDpcbiAgLy8gTk9URTogUmV0dXJucyBVTkRFRklORUQgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIElEXG4gIGdldEVsZW1lbnRCeUlEKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImlkXCIsIGlkKS5wb3AoKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgWyhFVkVOVCkgLT4gVk9JRF18KEVWRU5UKSAtPiBWT0lEIC0+ICB0aGlzXG4gIC8vIEJpbmRzIGNvbnRyb2xsZXIgYnkgZXZlbnQgbmFtZSB0byBub2RlIGF0IHJlbmRlcjpcbiAgb24oZXZ0TmFtZSwgZm5zKSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBZbmd3aWVDb250cm9sbGVyLmluaXQoZXZ0TmFtZSwgZm5zKTtcbiAgICB0aGlzLl9jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gVk9JRCAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIFJldHVybnMgY2xvbmUgb2YgdGhpcyB5bmd3aWVFbGVtZW50OlxuICBjbG9uZSgpIHtcblxuICAgIC8vIENvcHkgdGFnbmFtZTpcbiAgICBsZXQgdGFnbmFtZSA9IGAke3RoaXMuX3ZhbHVlfWA7XG5cbiAgICAvLyBDb3B5IGF0dHJpYnV0ZXM6XG4gICAgbGV0IGF0dHJpYnMgPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKHJlc3VsdCwgaWQpID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSBgJHt0aGlzLl9hdHRyaWJzW2lkXX1gO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBDb3B5IHNldDpcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgJHt0aGlzLl90ZXh0fWBcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gQ29weSBjb250cm9sbGVyczpcbiAgICBsZXQgY29udHJvbGxlcnMgPSB0aGlzLl9jb250cm9sbGVycy5tYXAoKGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLmNsb25lKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDb3B5IGNoaWxkcmVuIGFuZCByZXR1cm4gZWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KHRhZ25hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKTtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgoZWxlbSwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiBlbGVtLmFwcGVuZChjaGlsZCk7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8vIDo6IFNUUklOR3xET01FbGVtZW50IC0+IERPTUVsZW1lbnRcbiAgLy8gVHJhbnNmb3JtcyBZbmd3aWVFbGVtZW50IGFuZCBpdCdzIGRlc2VuZGFudHMgaW50byBicm93c2VyIGEgRE9NRWxlbWVudDpcbiAgLy8gTk9URTogT3B0aW9uYWwgYXJ1Z21lbnQgZGV0ZXJtaW5lcyB3aGVyZSB0byBhcHBlbmQgcmVuZGVyIHRvLCBvdGhlcndpc2UgcmVlbmRlciBpcyByZXR1cm5lZDtcbiAgcmVuZGVyKHRhcmdldCkge1xuXG4gICAgLy8gSW50aWFsaXplIERPTUVsZW1lbnQ6XG4gICAgbGV0IGVsZW0gPSBPYmplY3Qua2V5cyh0aGlzLl9hdHRyaWJzKS5yZWR1Y2UoKGVsZW0sIGlkKSA9PiB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShpZCwgdGhpcy5fYXR0cmlic1tpZF0pO1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLl92YWx1ZSkpO1xuXG4gICAgLy8gQmluZCBDb250cm9sbGVyczpcbiAgICBlbGVtID0gdGhpcy5fY29udHJvbGxlcnMucmVkdWNlKChlbGVtLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICByZXR1cm4gY29udHJvbGxlci5yZW5kZXIoZWxlbSk7XG4gICAgfSwgZWxlbSk7XG5cbiAgICAvLyBJZiBzZXQsIGNyZWF0ZSBhbmQgYXBwZW5kIHRleHQgbm9kZTpcbiAgICBpZiAodHlwZW9mKHRoaXMuX3RleHQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgZWxlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl90ZXh0KTtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoZWxlbVRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbmRlciBhbmQgYXBwZW5kIGFsbCBjaGlsZHJlbiBhbmQgcmV0dXJuIHJlc3VsdDpcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5yZW5kZXIoKTtcbiAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgdGFyZ2V0IGlzIGdpdmVuLCBhcHBlbmRzIHJlc3VsdCBvZiByZW5kZXIgdG8gdGhhdCB0YXJnZXQ6XG4gICAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBJZiB0YXJnZXQgaXMgc3RyaW5nLCBmaW5kIG5vZGUgdXNpbmcgcXVlcnkgc2VsZWN0b3I6XG4gICAgICBpZiAodHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpLmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcmlzZSBhc3N1bWUgdGhhdCB0YXJnZXQgaXMgRE9NRWxlbWVudDpcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogIFN0YXRpYyBNZXRob2RzXG4gICAqXG4gICAqL1xuXG4gIC8vIDo6IFNUUklORy4gT0JKRUNULCBTVFJJTkcsIFt5bmd3aWVDb250cm9sbGVyXSAtPiB5bmd3aWVFbGVtZW50XG4gIC8vIHN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgc3RhdGljIGluaXQodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZUVsZW1lbnQodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpXG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RE9NRWxlbWVudCwgW3luZ3dpZUVsZW1lbnRdIC0+IERPTUVsZW1lbnRcbiAgLy8gUmVuZGVycyBhbiBhcnJheSBvZiB5bmd3aWVFbGVtZW50cyBhbmQgYXBwZW5kcyByZXN1bHQgdG8gZ2l2ZW4gdGFyZ2V0OlxuICAvLyBOT1RFOiBET01FbGVtZW50IG9mIHRhcmdldCBpcyByZXR1cm5lZFxuICBzdGF0aWMgcmVuZGVyVG8odGFyZ2V0LCBlbGVtcykge1xuICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG4gICAgICA6IHRhcmdldDtcbiAgICByZXR1cm4gZWxlbXMucmVkdWNlKChyZXN1bHQsIGVsZW0pID0+IHtcbiAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICBlbGVtLnJlbmRlcihyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBZbmd3aWVFbGVtZW50IGNhbiBiZSByZW5kZXJlZCB0byB0YXJnZXRcIiwgZWxlbSk7XG4gICAgfSwgbm9kZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RE9NRWxlbWVudCwgeW5nd2llRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIFJlcGxhY2VzIHRoZSBnaXZlbiB0YXJnZXQgd2l0aCB0aGUgcmVuZGVyIG9mIHRoZSBnaXZlbiBpbnN0YW5jZSAgb2YgWW5nd2llRWxlbWVudDpcbiAgc3RhdGljIGluamVjdCh0YXJnZXQsIGVsZW0pIHtcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIFluZ3dpZUVsZW1lbnQpIHtcbiAgICAgIGxldCBub2RlID0gdHlwZW9mKHRhcmdldCkgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbiAgICAgICAgOiB0YXJnZXQ7XG4gICAgICBsZXQgcmVzdWx0ID0gZWxlbS5yZW5kZXIoKTtcbiAgICAgIG5vZGUucmVwbGFjZVdpdGgocmVzdWx0KTtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJPbmx5IFluZ3dpZUVsZW1lbnQgY2FuIGJlIGluamVjdGVkIGludG8gdGFyZ2V0XCIsIGVsZW0pO1xuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORywgKiAtPiBFUlJPUlxuICAvLyBOT1RFIDo6IFwiZGF0YVwiIGFyZ3VtZW50IGlzIGFsd2F5cyBjYXN0IGFzIFNUUklORzpcbiAgY29uc3RydWN0b3IobXNnLCBkYXRhKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLmRhdGEgPSBgJHtkYXRhfWA7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+ICBWT0lEXG4gIC8vIENvbnNvbGVzIG91dCBzdGFjayB0cmFjZSBvZiBlcnJvciwgYWxvbmcgd2l0aCB0aGUgZGF0YSB0aGF0IGNhdXNlZCB0aGUgZXhjZXB0aW9uIHRvIGJlIHRocm93bjpcbiAgbG9nKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhY2spO1xuICAgIGNvbnNvbGUubG9nKFwiV2hhdCBGYWlsZWQ6IFwiLCB0aGlzLmRhdGEpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVOb2RlIHtcblxuICAvLyBDT05TVFJVQ1RPUiA6OiBTVFJJTkcgLT4geW5nd2llTm9kZVxuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7ICAgICAgIC8vIEFyYml0cmFyeSBTVFJJTkcgdmFsdWUgdGhhdCBjYW4gYmUgc3RvcmVkIGJ5IHRoaXMgbm9kZVxuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDsgIC8vIFBhcmVudCBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9maXJzdCA9IHVuZGVmaW5lZDsgICAvLyBGaXJzdCBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9sYXN0ID0gdW5kZWZpbmVkOyAgICAvLyBMYXN0IGNoaWxkIG9mIHRoaXMgbm9kZTtcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkOyAgICAvLyBOZXh0IHNpYmxpbmcgb2YgdGhpcyBub2RlXG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDsgICAgLy8gUHJldmlvdXMgc2libGluZyBvZiB0aGUgbm9kZVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBbeW5nd2llTm9kZV1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgY2hpbGRyZW4oKSB7XG5cbiAgICBsZXQgY2hpbGQgPSB0aGlzLl9maXJzdDsgICAvLyBGaXJzdCBjaGlsZFxuICAgIGxldCBjaGlsZHJlbiA9IFtdOyAgICAgICAgIC8vIEFycmF5IG9mIGNoaWxkcmVuIHRvIHJldHVyblxuXG4gICAgLy8gTG9va3MgZm9yIG5leHQgc2libGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBzaWJsaW5nczpcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmFyeSB5bmdpd05vZGUgZWxlbWVudHM6XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXNcbiAgLy8gQWRkcyBnaXZlbiBub2RlIHRvIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgLy8gTk9URTogSWYgZ2l2ZW4gbm9kZSBhbHJlYWR5IGhhcyBhIHBhcmVudCwgdGhhdCBub2RlIGlzIGRldGFjaGVkIGFuZCBhcHBlbmVkIHRvIHRoaXMgbm9kZTpcbiAgYXBwZW5kKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIElmIGdpdmVuIG5vZGUgaGFzIHBhcmVudCwgZGV0YWNoIHRoYXQgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICAgICAgaWYgKG5vZGUuX3BhcmVudCkge1xuICAgICAgICBub2RlLmRldGFjaCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbmV3IG5vZGUgYXMgbGFzdCBzaWJsaW5nOlxuICAgICAgaWYgKHRoaXMuX2ZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX2xhc3Q7ICAgIC8vIFNldHMgbmV3IGxhc3QgY2hpbGQncyBwcmV2aW91cyBub2RlIHRvIG9sZCBsYXN0IG5vZGVcbiAgICAgICAgdGhpcy5fbGFzdC5fbmV4dCA9IG5vZGU7ICAgIC8vIFNldCBvbGQgbGFzdCBjaGlsZCBuZXh0IGVsZW1lbnQgdG8gbmV3IGxhc3QgY2hpbGRcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7ICAgICAgICAgLy8gU2V0IG5ldyBsYXN0IGNoaWxkIHRvIGdpdmVuIG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXIgYXJlIG5vIGNoaWxkcmVuLCB0aGVuIHRoaXMgbm9kZSBpcyBhbiBvbmx5IGNoaWxkOlxuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFyZW50XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAvLyBSZXR1cm4gaW5zdGFuY2U6Y29zbm9sZVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgWW5nd2llRXJyb3IoXCJDYW4gb25seSBhcHBwZW5kIFluZ3dpZU5vZGUgdG8gb3RoZXIgWW5nd2llTm9kZXNcIiwgbm9kZSk7XG5cbiAgfVxuXG4gIC8vIDo6IFt5bmd3aWVOb2RlXSAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgYW4gYXJyYXkgb2YgWW5nd2llTm9kZXMgdG8gdGhpcyBpbnN0YW5jZTpcbiAgYXBwZW5kcyhub2Rlcykge1xuICAgIGlmIChub2RlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gbm9kZXMucmVkdWNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kKG5vZGUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkV4cGVjdGVkIGFycmF5IGFzIGFyZ3VlbW50XCIsIG5vZGVzKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gdGhpc1xuICAvLyBEZXRhY2hlcyB0aGlzIG5vZGUgZnJvbSBpdCdzIHBhcmVudDpcbiAgZGV0YWNoKCkge1xuXG4gICAgLy8gTWFrZSBwcmV2aW91cyBub2RlJ3MgbmV4dCBub2RlIHRoaXMgbm9kZSdzIG5leHQgbm9kZTpcbiAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IHRoaXMuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG5vIHByZXZpb3VzIG5vZGUsIHRoZW4gdGhpcyBub2RlIG11c3QgYmUgZmlyc3QgY2hpbGQgb2YgcGFyZW50IChpZiBub2RlIGhhcyBwYXJlbnQpOlxuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gdGhpcy5fbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIG5leHQgbm9kZSdzIHByZXZpb3VzIG5vZGUgdGhpcyBub2RlJ3MgcHJldmlvdXMgbm9kZTpcbiAgICBpZiAodGhpcy5fbmV4dCkge1xuICAgICAgdGhpcy5fbmV4dC5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgfVxuXG4gICAgLy8gVW5zZXQgYWxsIHJlbGF0aW9uczpcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXYgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gUmV0dXJuIGluc3RhbmNlOlxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXM7XG4gIC8vIEluc2VydHMgZ2l2ZW4geW5nd2llTm9kZSBiZWZvcmUgdGhpcyBpbnN0YW5jZSBvZiB5bmd3aWVOb2RlOlxuICAvLyBOT1RFOiBhLmluc2VydHNCZWZvcmUoYikgbWVhbnMgXCJiXCIgaXMgaW5zZXJ0ZWQgYmVmb3JlIFwiYVwiXG4gIGluc2VydEJlZm9yZShub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBTZXQgcmVsYXRpb25zXG4gICAgICBub2RlLl9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICAgIG5vZGUuX25leHQgPSB0aGlzO1xuICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZyByZWxhdGlvbnM6XG4gICAgICBpZiAodGhpcy5fcHJldikge1xuICAgICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcHJldmlvdXMgc2libGluZzpcbiAgICAgIHRoaXMuX3ByZXYgPSBub2RlO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IGluc2VydCBhIFluZ3dpZU5vZGUgYmVmb3JlIG90aGVyIFluZ3dpZU5vZGVzXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmVwbGFjZSB0aGlzIG5vZGUgd2l0aCBnaXZlbiBub2RlOlxuICByZXBsYWNlV2l0aChub2RlKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICAvLyBDaGVja3MgaWYgdGhpcyBub2RlIGhhcyBhIHBhcmVudFxuICAgICAgaWYgKHRoaXMuX3BhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgLy8gUmVwbGFjZW1lbnQgaXMgYWNjb21wbGlzaGVkIGJ5IGZpcnN0IGluc2VydGluZyBnaXZlbiBub2RlLCB0aGVuIGRldGF0Y2hpbmcgdGhpcyBub2RlOlxuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShub2RlKTtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgICAgcmV0dXJuIG5vZGU7XG5cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBZbmd3aWVOb2RlIGlmIFluZ3dpZU5vZGUgYmVpbmcgcmVwbGFjZWQgaGFzIHBhcmVudFwiLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgYSBZbmd3aWVOb2RlIHdpdGggYW5vdGhlciBZbmd3aWVOb2RlXCIsIG5vZGUpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmV0dXJucyBkZWVwIGNsb25lIG9mIHRoaXMgbm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHZhbHVlID0gYCR7dGhpcy5fdmFsdWV9YDtcbiAgICBsZXQgY2xvbmUgPSBuZXcgWW5nd2llTm9kZSh2YWx1ZSlcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2xvbmUgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuICAgIH0sIGNsb25lKTtcbiAgfVxuXG4gIC8vIE5PREUsICogLT4gTk9ERSAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gYSByZXN1bHQgYW5kIHRoaXMgbm9kZSwgd2hlcmUgdGhhdCBmdW5jdGlvbiByZXR1cm5zIHRoZSBuZXh0IG5vZGUgdG8gdGhhdCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvXG4gIC8vIE5PVEU6IFJlc3VsdCBpcyByZXR1cm5lZCB3aGVuIHRoZXJlIGlzIG5vIG5leHQgbm9kZSB0byBhcHBseSBmdW5jdGlvbiB0b1xuICBzdGVwKGZuLCByZXN1bHQpIHtcbiAgICBuZXh0ID0gZm4odGhpcywgcmVzdWx0KTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5zdGVwKGZuLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gOjogTk9ERSwgKiAtPiAqLCAqIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byB0aGlzIG5vZGUgYW5kIGl0J3MgZGVzY2VuZGFudHMsIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHBhcnNlKGZuLCByZXN1bHQpIHtcbiAgICBZbmd3aWVOb2RlLnBhcnNlKHRoaXMsIChub2RlKSA9PiB7XG4gICAgICByZXN1bHQgPSBmbihub2RlLCByZXN1bHQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogU3RhdGljIEZ1bmN0aW9uXG4gICAqXG4gICAqL1xuXG4gIC8vIFN0YXRpYyBGYWN0b3J5IE1ldGhvZFxuICBzdGF0aWMgaW5pdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTm9kZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBOT0RFLCBOT0RFIC0+IFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gYSBub2RlIGFuZCBhbGwgaXQncyBkZXNlbmRhbnRzXG4gIC8vIE5PREU6IFRoaXMgaXMgYSByZS1pbXBsZW1lbnRhdGlvbiBvZiBDcm9ja2ZvcmQncyBET00gd2FsayBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6IFRoZSBHb29kIFBhcnRzXCJcbiAgc3RhdGljIHBhcnNlKG5vZGUsIGZuKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICBmbihub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLl9maXJzdDtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIFluZ3dpZU5vZGUucGFyc2Uobm9kZSwgZm4pO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93IG5ldyBZbmd3aWVFcnJvcihcIkNhbiBvbmx5IHBhcnNlIGEgWW5nd2llTm9kZVwiLCBub2RlKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVFcnJvciBmcm9tIFwiLi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVUZXh0Tm9kZSBleHRlbmRzIFluZ3dpZU5vZGUge1xuXG4gIC8vIENPTlNUUlVDVE9SIDo6IFNUUklORyAtPiB5bmd3aWVUZXh0Tm9kZVxuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgc3VwZXIodGV4dCk7XG4gIH1cblxuICAvLzo6IFZPSUQgLT4gRE9NVGV4dE5vZGVcbiAgLy8gQ3JlYXRlcyAgRE9NIFRleHQgbm9kZSBzZXQgd2l0aCB0aGUgU1RSSU5HIHN0b3JlZCBpbiBfdmFsdWU6XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBTVFJJTkcgaW5zdGVhZCBvZiBOT0RFIHNpbmNlIGEgVGV4dE5vZGUgaGFzIG5vIGNoaWxkcmVuXG4gIGFwcGVuZChzdHIpIHtcbiAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gc3RyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhyb3cgbmV3IFluZ3dpZUVycm9yKFwiT25seSBTVFJJTkdzIGNhbiBhcHBlbmQgWW5nd2llVGV4dE5vZGVzXCIsIHN0cik7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHluZ3dpZVRleHROb2RlOlxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKGAke3RoaXMuX3ZhbHVlfWApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBpbml0KHRleHQpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKHRleHQpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFbGVtZW50IGZyb20gXCIuLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuXG4vLyA6OiBTVFJJTkcgLT4geW5nd2llRWxlbWVudFxuLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgeW5nd2llRWxlbWVudFxuLy8gTk9URTogVGhpcyBET0VTIE5PVCB0cmFuc2Zvcm0gZXZlbnQgaGFuZGxlcnMgaW50byBZbmd3aWVDb250cm9sbGVyIG9iamVjdHM6XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZbmd3aWVUcmFuc2Zvcm0gKGh0bWwpIHtcbiAgcmV0dXJuIHdhbGtOb2RlKHR5cGVvZihodG1sKSA9PT0gXCJzdHJpbmdcIiA/IHRvTm9kZShodG1sKSA6IGh0bWwpO1xufVxuXG4vLyA6OiBTVFJJTkcgLT4gTk9ERVxuLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBpbnRvIGNsaWVudC1zaWRlIERPTSBub2RlOlxuZnVuY3Rpb24gdG9Ob2RlKGh0bWwpIHtcbiAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gIHJldHVybiBkb2MuYm9keS5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxuLy8gOjogTk9ERSwgTk9ERSwgbm9kZS5ub2RlVHlwZSAtPiBWT0lEXG4vLyBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFluZ3dpZUVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gbm9kZSBhbmQgYWxsIG9mIGl0J3MgZGVzZW5kZW50czpcbi8vIE5PVEU6IEluc3BpcmVkIGJ5IENyb2NrZm9yZCdzIERPTSB3YWxraW5nIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDpUaGUgR29vZCBQYXJ0c1wiXG5mdW5jdGlvbiB3YWxrTm9kZShub2RlLCByZXN1bHQpIHtcblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGxldCBhdHRyaWJzID0gZ2V0QXR0cmlidXRlcyhub2RlKTtcbiAgICBsZXQgZWxlbSA9IG5ldyBZbmd3aWVFbGVtZW50KG5vZGUudGFnTmFtZSwgYXR0cmlicyk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gZWxlbVxuICAgICAgOiByZXN1bHQuYXBwZW5kKGVsZW0pO1xuICB9XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBsZXQgdGV4dE5vZGUgPSBuZXcgWW5nd2llVGV4dE5vZGUobm9kZS5ub2RlVmFsdWUpO1xuICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IHRleHROb2RlXG4gICAgICA6IHJlc3VsdC5hcHBlbmQodGV4dE5vZGUpO1xuICB9XG5cbiAgbm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuICB3aGlsZSAobm9kZSkge1xuICAgIGxldCBjaGlsZCA9IHdhbGtOb2RlKG5vZGUpO1xuICAgIGlmIChjaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5hcHBlbmQoY2hpbGQpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG5cbn1cblxuLy8gOjogRE9NRWxlbWVudCAtPiBPQkpFQ1Rcbi8vIFJldHVybnMgT0JKRUNUIG9mIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZ2l2ZW4gRE9NIEVsZW1lbnQ6XG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGVsZW0pIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbS5hdHRyaWJ1dGVzKS5yZWR1Y2UoKHJlc3VsdCwgYXR0cmliKSA9PiB7XG4gICAgcmVzdWx0W2F0dHJpYi5uYW1lXSA9IGF0dHJpYi52YWx1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRXJyb3IgZnJvbSBcIi4vRXJyb3IvbWFpbi5qc1wiO1xuXG5leHBvcnQge1xuICBZbmd3aWVOb2RlIGFzIE5vZGUsXG4gIFluZ3dpZUVsZW1lbnQgYXMgRWxlbWVudCxcbiAgWW5nd2llVGV4dE5vZGUgYXMgVGV4dE5vZGUsXG4gIFluZ3dpZUNvbnRyb2xsZXIgYXMgQ29udHJvbGxlcixcbiAgWW5nd2llVHJhbnNmb3JtIGFzIHRyYW5zZm9ybSxcbiAgWW5nd2llRXJyb3IgYXMgRXJyb3Jcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=