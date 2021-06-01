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

  // :: STRING, [(EVT -> VOID)] -> this
  // CONSTRUCTOR
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
    let evtName = (' ' + this._evtName).slice(1);
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



class YngwieElement extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // :: STRING. OBJECT, STRING, [yngwieController] -> this
  // CONSTRUCTOR
  constructor(tagname, attribs, text, controllers) {
    super(tagname);
    this._attribs = attribs || {};  // Element Attributes
    this._text = text;              // Element text that's appended as first child of this element
    this._controllers = [];         // Controllers bound to this element
  }

  // :: OBJECT -> this
  // Sets "attribs" OBJECT with given OBJECT:
  attribs(attribs) {
    this._attribs = attribs;
    return this;
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

  // :: STRING -> this
  // Appends text node as first child of element at render with given string as it's value:
  text(str) {
    this._text = str;
    return this;
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
    return this.parse((result, node) => {
      if (node.hasAttribute(name)) {
        if (value === undefined) {
          result.push(node);
        } else {
          if (node.getAttribute(name) === value) {
            result.push(node);
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
    let tagname = (' ' + this._value).slice(1);
    let attribs = Object.keys(this._attribs).reduce((result, id) => {
      result[id] = (' ' + this._attribs[id]).slice(1);
      return result;
    }, {});
    let text = this._text !== undefined
      ? (' ' + this._text).slice(1)
      : undefined;
    let controllers = this._controllers.map((controller) => {
      return controller.clone();
    });
    let elem = YngwieElement(tagname, attribs, text, controllers);
    return this.children().reduce((elem, child) => {
      child = child.clone();
      return elem.append(child);
    }, elem);
  }

  // :: VOID -> DOMElement
  // Transforms YngwieElement and it's desendants into browser a DOMElement:
  render() {

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
    return this.children().reduce((result, child) => {
      child = child.render();
      result.appendChild(child);
      return result;
    }, elem);

  }

  /**
   *
   *  Static Methods
   *
   */

  // Static factory method:
  static init(tagname, attribs, text, controllers) {
    return new YngwieElement(tagname, attribs, text, controllers)
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
class YngwieNode {

  // STRING -> yngwieNode
  // CONSTRUCTOR
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

      // Return instance:
      return this;

    }

    throw new Error("Can only apppend YngwieNode to other YngwieNodes");

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

    throw new Error("Can only insert a YngwieNode before other YngwieNodes");

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

    throw new Error("Can only replace a YngwieNode with another YngwieNode");

  }

  // :: VOID -> yngwieNode
  // Returns deep clone of this node:
  clone() {
    let value =  (' ' + this._value).slice(1);
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

      throw new Error("Can only parse a YngwieNode");

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


class YngwieTextNode extends _Node_main_js__WEBPACK_IMPORTED_MODULE_0__.default {

  // :: STRING -> yngwieTextNode
  // CONSTRUCTOR:
  constructor(text) {
    super(text);
  }

  //:: VOID -> NODE
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

    throw new Error("Only STRINGs can append YngwieTextNodes");
  }

  // :: VOID -> yngwieTextNode
  // Creates a clone of this yngwieTextNode:
  clone() {
    return new YngwieTextNode((' ' + this._value).slice(1));
  }

  // :: VOID -> OBJECT
  // Returns OBJECT of all properties set for this instance:
  inspect() {
    return {"type":"text","value":this._text};
  }

  /**
   *
   *  Static Methods
   *
   */

  // STRING -> yngwieTextNode
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

// :: NODE, NOD, node.nodeTypE -> VOID
// Creates an YngwieElement from the given node and all of it's desendents:
// NOTE: Inspired by Crockford's DOM walking algorithm from "Javascript:The Good Parts"
function walkNode(node, result) {

  if (node.nodeType === 1) {
    let elem = new _Element_main_js__WEBPACK_IMPORTED_MODULE_0__.default(node.tagName, getAttributes(node));
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
  return Array.from(elem).reduce((result, attrib) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy90cmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDeUM7QUFDWTs7QUFFdEMsNEJBQTRCLGtEQUFVOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEQrQztBQUNFOztBQUVqRDtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIscURBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsc0RBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7Ozs7Ozs7VUMxREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNNO0FBQ0U7QUFDSTtBQUNGOztBQVFqRCIsImZpbGUiOiJ5bmd3aWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJZbmd3aWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llQ29udHJvbGxlciB7XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWVCAtPiBWT0lEKV0gLT4gdGhpc1xuICAvLyBDT05TVFJVQ1RPUlxuICBjb25zdHJ1Y3RvcihldnROYW1lLCBmbnMpIHtcbiAgICB0aGlzLl9ldnROYW1lID0gZXZ0TmFtZTtcbiAgICB0aGlzLl9mbnMgPSBmbnMgfHwgW107XG4gIH1cblxuICAvLyA6OiAoRVZUIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBDcmVhdGVzIGNsb25lIG9mIHRoaXMgeW5nd2llQ29udHJvbGxlcjpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IGV2dE5hbWUgPSAoJyAnICsgdGhpcy5fZXZ0TmFtZSkuc2xpY2UoMSk7XG4gICAgbGV0IGZucyA9IHRoaXMuX2Zucy5tYXAoZm49PntcbiAgICAgIHJldHVybiBmbi50b1N0cmluZygpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRE9NRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIENyZWF0ZXMgZXZlbnQgbGlzdGVuZXIgYW5kIGJpbmRzIGl0IGdpdmVuIERPTUVsZW1lbnRcbiAgcmVuZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm5zLnJlZHVjZSgobm9kZSwgZm4pID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldnROYW1lLCBmbik7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LCBub2RlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgW0VWRU5UIC0+IFZPSURdfEVWRU5UIC0+IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGV2dE5hbWUsIGZucykge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBBcnJheS5pc0FycmF5KGZucykgPT09IHRydWUgPyBmbnMgOiBbZm5zXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4uL0NvbnRyb2xsZXIvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUNvbnRyb2xsZXJdIC0+IHRoaXNcbiAgLy8gQ09OU1RSVUNUT1JcbiAgY29uc3RydWN0b3IodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICBzdXBlcih0YWduYW1lKTtcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgIC8vIEVsZW1lbnQgQXR0cmlidXRlc1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0OyAgICAgICAgICAgICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9jb250cm9sbGVycyA9IFtdOyAgICAgICAgIC8vIENvbnRyb2xsZXJzIGJvdW5kIHRvIHRoaXMgZWxlbWVudFxuICB9XG5cbiAgLy8gOjogT0JKRUNUIC0+IHRoaXNcbiAgLy8gU2V0cyBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBPQkpFQ1Q6XG4gIGF0dHJpYnMoYXR0cmlicykge1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gU1RSSU5HfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGF0dHJpYnV0ZSBieSBuYW1lIHN0b3JlZCBpbiBcImF0dHJpYnNcIiBPQkpFQ1QsIG90aGVyd2lzZSByZXR1cm5zIFVOREVGSU5FRFxuICBnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBTVFJJTkcgLT4gdGhpc1xuICAvLyBCaW5kcyBTVFJJTkcgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyB0ZXh0IG5vZGUgYXMgZmlyc3QgY2hpbGQgb2YgZWxlbWVudCBhdCByZW5kZXIgd2l0aCBnaXZlbiBzdHJpbmcgYXMgaXQncyB2YWx1ZTpcbiAgdGV4dChzdHIpIHtcbiAgICB0aGlzLl90ZXh0ID0gc3RyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWduYW1lOlxuXHQvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcblx0Z2V0RWxlbWVudHNCeVRhZ05hbWUodGFnbmFtZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLl92YWx1ZSA9PT0gdGFnbmFtZSkge1xuICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuXHR9XG5cblx0Ly8gU1RSSU5HLCBTVFJJTkd8VU5ERUZJTkVEIC0+IFt5bmd3aWVFbGVtZW50XVxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIHZhbHVlOlxuXHQvLyBOT1RFOiBJZiBubyB2YWx1ZSBpcyBnaXZlbiwgdGhlbiBhbnkgZWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgaXMgcmV0dXJuZWRcblx0Z2V0RWxlbWVudHNCeUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG5cdH1cblxuICAvLyBTVFJJTkcgLT4gW3luZ3dpZUVsZW1lbnRdXG4gIC8vIFJldHVybnMgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3MgbmFtZVxuICAvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBjbGFzcyBuYW1lOlxuICBnZXRFbGVtZW50c0J5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHNCeUF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIFluZ3dpZUVsZW1lbnQgdGhhdCBoYXMgdGhlIGdpdmVuIElEOlxuICAvLyBOT1RFOiBSZXR1cm5zIFVOREVGSU5FRCBpZiBubyBlbGVtZW50cyBhcmUgZm91bmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgZ2V0RWxlbWVudEJ5SUQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiaWRcIiwgaWQpLnBvcCgpO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWRU5UKSAtPiBWT0lEXXwoRVZFTlQpIC0+IFZPSUQgLT4gIHRoaXNcbiAgLy8gQmluZHMgY29udHJvbGxlciBieSBldmVudCBuYW1lIHRvIG5vZGUgYXQgcmVuZGVyOlxuICBvbihldnROYW1lLCBmbnMpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IFluZ3dpZUNvbnRyb2xsZXIuaW5pdChldnROYW1lLCBmbnMpO1xuICAgIHRoaXMuX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBWT0lEIC0+IHluZ3dpZUVsZW1lbnRcbiAgLy8gUmV0dXJucyBjbG9uZSBvZiB0aGlzIHluZ3dpZUVsZW1lbnQ6XG4gIGNsb25lKCkge1xuICAgIGxldCB0YWduYW1lID0gKCcgJyArIHRoaXMuX3ZhbHVlKS5zbGljZSgxKTtcbiAgICBsZXQgYXR0cmlicyA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgocmVzdWx0LCBpZCkgPT4ge1xuICAgICAgcmVzdWx0W2lkXSA9ICgnICcgKyB0aGlzLl9hdHRyaWJzW2lkXSkuc2xpY2UoMSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbiAgICBsZXQgdGV4dCA9IHRoaXMuX3RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgPyAoJyAnICsgdGhpcy5fdGV4dCkuc2xpY2UoMSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGxldCBjb250cm9sbGVycyA9IHRoaXMuX2NvbnRyb2xsZXJzLm1hcCgoY29udHJvbGxlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvbmUoKTtcbiAgICB9KTtcbiAgICBsZXQgZWxlbSA9IFluZ3dpZUVsZW1lbnQodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpO1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChlbGVtLCBjaGlsZCkgPT4ge1xuICAgICAgY2hpbGQgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIGVsZW0uYXBwZW5kKGNoaWxkKTtcbiAgICB9LCBlbGVtKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gRE9NRWxlbWVudFxuICAvLyBUcmFuc2Zvcm1zIFluZ3dpZUVsZW1lbnQgYW5kIGl0J3MgZGVzZW5kYW50cyBpbnRvIGJyb3dzZXIgYSBET01FbGVtZW50OlxuICByZW5kZXIoKSB7XG5cbiAgICAvLyBJbnRpYWxpemUgRE9NRWxlbWVudDpcbiAgICBsZXQgZWxlbSA9IE9iamVjdC5rZXlzKHRoaXMuX2F0dHJpYnMpLnJlZHVjZSgoZWxlbSwgaWQpID0+IHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGlkLCB0aGlzLl9hdHRyaWJzW2lkXSk7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX3ZhbHVlKSk7XG5cbiAgICAvLyBCaW5kIENvbnRyb2xsZXJzOlxuICAgIGVsZW0gPSB0aGlzLl9jb250cm9sbGVycy5yZWR1Y2UoKGVsZW0sIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIHJldHVybiBjb250cm9sbGVyLnJlbmRlcihlbGVtKTtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHNldCwgY3JlYXRlIGFuZCBhcHBlbmQgdGV4dCBub2RlOlxuICAgIGlmICh0eXBlb2YodGhpcy5fdGV4dCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBlbGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuX3RleHQpO1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChlbGVtVGV4dCk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuZCBhcHBlbmQgYWxsIGNoaWxkcmVuIGFuZCByZXR1cm4gcmVzdWx0OlxuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuKCkucmVkdWNlKChyZXN1bHQsIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLnJlbmRlcigpO1xuICAgICAgcmVzdWx0LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgZWxlbSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBzdGF0aWMgaW5pdCh0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycykge1xuICAgIHJldHVybiBuZXcgWW5nd2llRWxlbWVudCh0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycylcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVOb2RlIHtcblxuICAvLyBTVFJJTkcgLT4geW5nd2llTm9kZVxuICAvLyBDT05TVFJVQ1RPUlxuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7ICAgICAgIC8vIEFyYml0cmFyeSBTVFJJTkcgdmFsdWUgdGhhdCBjYW4gYmUgc3RvcmVkIGJ5IHRoaXMgbm9kZVxuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDsgIC8vIFBhcmVudCBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9maXJzdCA9IHVuZGVmaW5lZDsgICAvLyBGaXJzdCBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9sYXN0ID0gdW5kZWZpbmVkOyAgICAvLyBMYXN0IGNoaWxkIG9mIHRoaXMgbm9kZTtcbiAgICB0aGlzLl9uZXh0ID0gdW5kZWZpbmVkOyAgICAvLyBOZXh0IHNpYmxpbmcgb2YgdGhpcyBub2RlXG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDsgICAgLy8gUHJldmlvdXMgc2libGluZyBvZiB0aGUgbm9kZVxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiBbeW5nd2llTm9kZV1cbiAgLy8gUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgY2hpbGRyZW4oKSB7XG5cbiAgICBsZXQgY2hpbGQgPSB0aGlzLl9maXJzdDsgICAvLyBGaXJzdCBjaGlsZFxuICAgIGxldCBjaGlsZHJlbiA9IFtdOyAgICAgICAgIC8vIEFycmF5IG9mIGNoaWxkcmVuIHRvIHJldHVyblxuXG4gICAgLy8gTG9va3MgZm9yIG5leHQgc2libGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBzaWJsaW5nczpcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGFuIGFycmFyeSB5bmdpd05vZGUgZWxlbWVudHM6XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICAvLyA6OiB5bmd3aWVOb2RlIC0+IHRoaXNcbiAgLy8gQWRkcyBnaXZlbiBub2RlIHRvIGNoaWxkcmVuIG9mIHRoaXMgbm9kZTpcbiAgLy8gTk9URTogSWYgZ2l2ZW4gbm9kZSBhbHJlYWR5IGhhcyBhIHBhcmVudCwgdGhhdCBub2RlIGlzIGRldGFjaGVkIGFuZCBhcHBlbmVkIHRvIHRoaXMgbm9kZTpcbiAgYXBwZW5kKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIC8vIElmIGdpdmVuIG5vZGUgaGFzIHBhcmVudCwgZGV0YWNoIHRoYXQgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICAgICAgaWYgKG5vZGUuX3BhcmVudCkge1xuICAgICAgICBub2RlLmRldGFjaCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgbmV3IG5vZGUgYXMgbGFzdCBzaWJsaW5nOlxuICAgICAgaWYgKHRoaXMuX2ZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX2xhc3Q7ICAgIC8vIFNldHMgbmV3IGxhc3QgY2hpbGQncyBwcmV2aW91cyBub2RlIHRvIG9sZCBsYXN0IG5vZGVcbiAgICAgICAgdGhpcy5fbGFzdC5fbmV4dCA9IG5vZGU7ICAgIC8vIFNldCBvbGQgbGFzdCBjaGlsZCBuZXh0IGVsZW1lbnQgdG8gbmV3IGxhc3QgY2hpbGRcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7ICAgICAgICAgLy8gU2V0IG5ldyBsYXN0IGNoaWxkIHRvIGdpdmVuIG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHRoZXIgYXJlIG5vIGNoaWxkcmVuLCB0aGVuIHRoaXMgbm9kZSBpcyBhbiBvbmx5IGNoaWxkOlxuICAgICAgICB0aGlzLl9maXJzdCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2xhc3QgPSBub2RlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgcGFyZW50XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAvLyBSZXR1cm4gaW5zdGFuY2U6XG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IGFwcHBlbmQgWW5nd2llTm9kZSB0byBvdGhlciBZbmd3aWVOb2Rlc1wiKTtcblxuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB0aGlzXG4gIC8vIERldGFjaGVzIHRoaXMgbm9kZSBmcm9tIGl0J3MgcGFyZW50OlxuICBkZXRhY2goKSB7XG5cbiAgICAvLyBNYWtlIHByZXZpb3VzIG5vZGUncyBuZXh0IG5vZGUgdGhpcyBub2RlJ3MgbmV4dCBub2RlOlxuICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICB0aGlzLl9wcmV2Ll9uZXh0ID0gdGhpcy5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gcHJldmlvdXMgbm9kZSwgdGhlbiB0aGlzIG5vZGUgbXVzdCBiZSBmaXJzdCBjaGlsZCBvZiBwYXJlbnQgKGlmIG5vZGUgaGFzIHBhcmVudCk6XG4gICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSB0aGlzLl9uZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2UgbmV4dCBub2RlJ3MgcHJldmlvdXMgbm9kZSB0aGlzIG5vZGUncyBwcmV2aW91cyBub2RlOlxuICAgIGlmICh0aGlzLl9uZXh0KSB7XG4gICAgICB0aGlzLl9uZXh0Ll9wcmV2ID0gdGhpcy5fcHJldjtcbiAgICB9XG5cbiAgICAvLyBVbnNldCBhbGwgcmVsYXRpb25zOlxuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZXR1cm4gaW5zdGFuY2U6XG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpcztcbiAgLy8gSW5zZXJ0cyBnaXZlbiB5bmd3aWVOb2RlIGJlZm9yZSB0aGlzIGluc3RhbmNlIG9mIHluZ3dpZU5vZGU6XG4gIC8vIE5PVEU6IGEuaW5zZXJ0c0JlZm9yZShiKSBtZWFucyBcImJcIiBpcyBpbnNlcnRlZCBiZWZvcmUgXCJhXCJcbiAgaW5zZXJ0QmVmb3JlKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIGlmICh0aGlzLl9wcmV2KSB7XG4gICAgICAgIHRoaXMuX3ByZXYuX25leHQgPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5fZmlyc3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCByZWxhdGlvbnNcbiAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgICAgbm9kZS5fbmV4dCA9IHRoaXM7XG4gICAgICBub2RlLl9wYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgaW5zZXJ0IGEgWW5nd2llTm9kZSBiZWZvcmUgb3RoZXIgWW5nd2llTm9kZXNcIik7XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4geW5nd2llTm9kZVxuICAvLyBSZXBsYWNlIHRoaXMgbm9kZSB3aXRoIGdpdmVuIG5vZGU6XG4gIHJlcGxhY2VXaXRoKG5vZGUpIHtcblxuICAgIC8vIENoZWNrcyBpZiBhcmd1bWVudCBpcyBhIG5vZGU6XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBZbmd3aWVOb2RlKSB7XG5cbiAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUpO1xuICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgLy8gUmV0dXJuIGdpdmVuIG5vZGU6XG4gICAgICByZXR1cm4gbm9kZTtcblxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IHJlcGxhY2UgYSBZbmd3aWVOb2RlIHdpdGggYW5vdGhlciBZbmd3aWVOb2RlXCIpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZU5vZGVcbiAgLy8gUmV0dXJucyBkZWVwIGNsb25lIG9mIHRoaXMgbm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHZhbHVlID0gICgnICcgKyB0aGlzLl92YWx1ZSkuc2xpY2UoMSk7XG4gICAgbGV0IGNsb25lID0gbmV3IFluZ3dpZU5vZGUodmFsdWUpXG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNsb25lID0gY2hpbGQuY2xvbmUoKTtcbiAgICAgIHJldHVybiByZXN1bHQuYXBwZW5kKGNsb25lKTtcbiAgICB9LCBjbG9uZSk7XG4gIH1cblxuICAvLyBOT0RFLCAqIC0+IE5PREUgLT4gKlxuICAvLyBBcHBsaWVzIGZ1bmN0aW9uIHRvIGEgcmVzdWx0IGFuZCB0aGlzIG5vZGUsIHdoZXJlIHRoYXQgZnVuY3Rpb24gcmV0dXJucyB0aGUgbmV4dCBub2RlIHRvIHRoYXQgZnVuY3Rpb24gaXMgYXBwbGllZCB0b1xuICAvLyBOT1RFOiBSZXN1bHQgaXMgcmV0dXJuZWQgd2hlbiB0aGVyZSBpcyBubyBuZXh0IG5vZGUgdG8gYXBwbHkgZnVuY3Rpb24gdG9cbiAgc3RlcChmbiwgcmVzdWx0KSB7XG4gICAgbmV4dCA9IGZuKHRoaXMsIHJlc3VsdCk7XG4gICAgaWYgKG5leHQpIHtcbiAgICAgIG5leHQuc3RlcChmbiwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIDo6IE5PREUsICogLT4gKiwgKiAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gdGhpcyBub2RlIGFuZCBpdCdzIGRlc2NlbmRhbnRzLCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGF0IGZ1bmN0aW9uOlxuICBwYXJzZShmbiwgcmVzdWx0KSB7XG4gICAgWW5nd2llTm9kZS5wYXJzZSh0aGlzLCAobm9kZSkgPT4ge1xuICAgICAgcmVzdWx0ID0gZm4obm9kZSwgcmVzdWx0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFN0YXRpYyBGdW5jdGlvblxuICAgKlxuICAgKi9cblxuICAvLyBTdGF0aWMgRmFjdG9yeSBNZXRob2RcbiAgc3RhdGljIGluaXQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZU5vZGUodmFsdWUpO1xuICB9XG5cbiAgLy8gTk9ERSwgTk9ERSAtPiBWT0lEIC0+IFZPSURcbiAgLy8gQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGEgbm9kZSBhbmQgYWxsIGl0J3MgZGVzZW5kYW50c1xuICAvLyBOT0RFOiBUaGlzIGlzIGEgcmUtaW1wbGVtZW50YXRpb24gb2YgQ3JvY2tmb3JkJ3MgRE9NIHdhbGsgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OiBUaGUgR29vZCBQYXJ0c1wiXG4gIHN0YXRpYyBwYXJzZShub2RlLCBmbikge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgZm4obm9kZSk7XG4gICAgICBub2RlID0gbm9kZS5fZmlyc3Q7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBZbmd3aWVOb2RlLnBhcnNlKG5vZGUsIGZuKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBwYXJzZSBhIFluZ3dpZU5vZGVcIik7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llTm9kZSBmcm9tIFwiLi4vTm9kZS9tYWluLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZVRleHROb2RlIGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gOjogU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENPTlNUUlVDVE9SOlxuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgc3VwZXIodGV4dCk7XG4gIH1cblxuICAvLzo6IFZPSUQgLT4gTk9ERVxuICAvLyBDcmVhdGVzICBET00gVGV4dCBub2RlIHNldCB3aXRoIHRoZSBTVFJJTkcgc3RvcmVkIGluIF92YWx1ZTpcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gdGhpc1xuICAvLyBBcHBlbmRzIFNUUklORyBpbnN0ZWFkIG9mIE5PREUgc2luY2UgYSBUZXh0Tm9kZSBoYXMgbm8gY2hpbGRyZW5cbiAgYXBwZW5kKHN0cikge1xuXG4gICAgaWYgKHR5cGVvZihzdHIpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlICs9IHN0cjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBTVFJJTkdzIGNhbiBhcHBlbmQgWW5nd2llVGV4dE5vZGVzXCIpO1xuICB9XG5cbiAgLy8gOjogVk9JRCAtPiB5bmd3aWVUZXh0Tm9kZVxuICAvLyBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB5bmd3aWVUZXh0Tm9kZTpcbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZSgoJyAnICsgdGhpcy5fdmFsdWUpLnNsaWNlKDEpKTtcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4gT0JKRUNUXG4gIC8vIFJldHVybnMgT0JKRUNUIG9mIGFsbCBwcm9wZXJ0aWVzIHNldCBmb3IgdGhpcyBpbnN0YW5jZTpcbiAgaW5zcGVjdCgpIHtcbiAgICByZXR1cm4ge1widHlwZVwiOlwidGV4dFwiLFwidmFsdWVcIjp0aGlzLl90ZXh0fTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgU3RhdGljIE1ldGhvZHNcbiAgICpcbiAgICovXG5cbiAgLy8gU1RSSU5HIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIFN0YXRpYyBmYWN0b3J5IG1ldGhvZDpcbiAgaW5pdCh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4uL1RleHROb2RlL21haW4uanNcIjtcblxuLy8gOjogU1RSSU5HIC0+IHluZ3dpZUVsZW1lbnRcbi8vIFRyYW5zZm9ybXMgc3RyaW5nIG9mIEhUTUwgaW50byBhIHluZ3dpZUVsZW1lbnRcbi8vIE5PVEU6IFRoaXMgRE9FUyBOT1QgdHJhbnNmb3JtIGV2ZW50IGhhbmRsZXJzIGludG8gWW5nd2llQ29udHJvbGxlciBvYmplY3RzOlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gWW5nd2llVHJhbnNmb3JtIChodG1sKSB7XG4gIHJldHVybiB3YWxrTm9kZSh0eXBlb2YoaHRtbCkgPT09IFwic3RyaW5nXCIgPyB0b05vZGUoaHRtbCkgOiBodG1sKTtcbn1cblxuLy8gOjogU1RSSU5HIC0+IE5PREVcbi8vIFRyYW5zZm9ybXMgc3RyaW5nIG9mIEhUTUwgaW50byBjbGllbnQtc2lkZSBET00gbm9kZTpcbmZ1bmN0aW9uIHRvTm9kZShodG1sKSB7XG4gIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsIFwidGV4dC9odG1sXCIpO1xuICByZXR1cm4gZG9jLmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbi8vIDo6IE5PREUsIE5PRCwgbm9kZS5ub2RlVHlwRSAtPiBWT0lEXG4vLyBDcmVhdGVzIGFuIFluZ3dpZUVsZW1lbnQgZnJvbSB0aGUgZ2l2ZW4gbm9kZSBhbmQgYWxsIG9mIGl0J3MgZGVzZW5kZW50czpcbi8vIE5PVEU6IEluc3BpcmVkIGJ5IENyb2NrZm9yZCdzIERPTSB3YWxraW5nIGFsZ29yaXRobSBmcm9tIFwiSmF2YXNjcmlwdDpUaGUgR29vZCBQYXJ0c1wiXG5mdW5jdGlvbiB3YWxrTm9kZShub2RlLCByZXN1bHQpIHtcblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBnZXRBdHRyaWJ1dGVzKG5vZGUpKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtKS5yZWR1Y2UoKHJlc3VsdCwgYXR0cmliKSA9PiB7XG4gICAgcmVzdWx0W2F0dHJpYi5uYW1lXSA9IGF0dHJpYi52YWx1ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUVsZW1lbnQgZnJvbSBcIi4vRWxlbWVudC9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVGV4dE5vZGUgZnJvbSBcIi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4vQ29udHJvbGxlci9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llVHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybS9tYWluLmpzXCI7XG5cbmV4cG9ydCB7XG4gIFluZ3dpZU5vZGUgYXMgTm9kZSxcbiAgWW5nd2llRWxlbWVudCBhcyBFbGVtZW50LFxuICBZbmd3aWVUZXh0Tm9kZSBhcyBUZXh0Tm9kZSxcbiAgWW5nd2llQ29udHJvbGxlciBhcyBDb250cm9sbGVyLFxuICBZbmd3aWVUcmFuc2Zvcm0gYXMgdHJhbnNmb3JtXG59XG4iXSwic291cmNlUm9vdCI6IiJ9