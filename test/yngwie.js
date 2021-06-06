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

  // :: [yngwieElement] -> this
  // Appends an array of YngwieElements to this instance:
  appends(elems) {
    return elems.reduce((result, elem) => {
      return this.append(elem);
    }, this);
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

  // Static factory method:
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
      elem.render(result);
      return result;
    }, node)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9Db250cm9sbGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vWW5nd2llLy4vc3JjL0VsZW1lbnQvbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvTm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy9UZXh0Tm9kZS9tYWluLmpzIiwid2VicGFjazovL1luZ3dpZS8uL3NyYy90cmFuc2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vWW5nd2llL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Zbmd3aWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Zbmd3aWUvLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7Ozs7QUNWZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDeUM7QUFDWTs7QUFFdEMsNEJBQTRCLGtEQUFVOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxzQkFBc0I7QUFDdEIsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2REFBcUI7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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a0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ053QztBQUNNO0FBQ0U7QUFDSTtBQUNGOztBQVFqRCIsImZpbGUiOiJ5bmd3aWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJZbmd3aWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiWW5nd2llXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llQ29udHJvbGxlciB7XG5cbiAgLy8gOjogU1RSSU5HLCBbKEVWVCAtPiBWT0lEKV0gLT4gdGhpc1xuICAvLyBDT05TVFJVQ1RPUlxuICBjb25zdHJ1Y3RvcihldnROYW1lLCBmbnMpIHtcbiAgICB0aGlzLl9ldnROYW1lID0gZXZ0TmFtZTtcbiAgICB0aGlzLl9mbnMgPSBmbnMgfHwgW107XG4gIH1cblxuICAvLyA6OiAoRVZUIC0+IFZPSUQpIC0+IHRoaXM7XG4gIC8vIEFkZHMgZnVuY3Rpb24gdG8gbGlzdGVuZXI6XG4gIGFkZChmbikge1xuICAgIHRoaXMuX2Zucy5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBDcmVhdGVzIGNsb25lIG9mIHRoaXMgeW5nd2llQ29udHJvbGxlcjpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IGV2dE5hbWUgPSAoJyAnICsgdGhpcy5fZXZ0TmFtZSkuc2xpY2UoMSk7XG4gICAgbGV0IGZucyA9IHRoaXMuX2Zucy5tYXAoZm49PntcbiAgICAgIHJldHVybiBmbi50b1N0cmluZygpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBmbnMpO1xuICB9XG5cbiAgLy8gOjogRE9NRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIENyZWF0ZXMgZXZlbnQgbGlzdGVuZXIgYW5kIGJpbmRzIGl0IGdpdmVuIERPTUVsZW1lbnRcbiAgcmVuZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZm5zLnJlZHVjZSgobm9kZSwgZm4pID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldnROYW1lLCBmbik7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LCBub2RlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORywgW0VWRU5UIC0+IFZPSURdfEVWRU5UIC0+IFZPSUQgLT4geW5nd2llQ29udHJvbGxlclxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KGV2dE5hbWUsIGZucykge1xuICAgIHJldHVybiBuZXcgWW5nd2llQ29udHJvbGxlcihldnROYW1lLCBBcnJheS5pc0FycmF5KGZucykgPT09IHRydWUgPyBmbnMgOiBbZm5zXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4uL05vZGUvbWFpbi5qc1wiO1xuaW1wb3J0IFluZ3dpZUNvbnRyb2xsZXIgZnJvbSBcIi4uL0NvbnRyb2xsZXIvbWFpbi5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZbmd3aWVFbGVtZW50IGV4dGVuZHMgWW5nd2llTm9kZSB7XG5cbiAgLy8gOjogU1RSSU5HLiBPQkpFQ1QsIFNUUklORywgW3luZ3dpZUNvbnRyb2xsZXJdIC0+IHRoaXNcbiAgLy8gQ09OU1RSVUNUT1JcbiAgY29uc3RydWN0b3IodGFnbmFtZSwgYXR0cmlicywgdGV4dCwgY29udHJvbGxlcnMpIHtcbiAgICBzdXBlcih0YWduYW1lKTtcbiAgICB0aGlzLl9hdHRyaWJzID0gYXR0cmlicyB8fCB7fTsgIC8vIEVsZW1lbnQgQXR0cmlidXRlc1xuICAgIHRoaXMuX3RleHQgPSB0ZXh0OyAgICAgICAgICAgICAgLy8gRWxlbWVudCB0ZXh0IHRoYXQncyBhcHBlbmRlZCBhcyBmaXJzdCBjaGlsZCBvZiB0aGlzIGVsZW1lbnRcbiAgICB0aGlzLl9jb250cm9sbGVycyA9IFtdOyAgICAgICAgIC8vIENvbnRyb2xsZXJzIGJvdW5kIHRvIHRoaXMgZWxlbWVudFxuICB9XG5cbiAgLy8gOjogT0JKRUNUIC0+IHRoaXNcbiAgLy8gU2V0cyBcImF0dHJpYnNcIiBPQkpFQ1Qgd2l0aCBnaXZlbiBPQkpFQ1Q6XG4gIGF0dHJpYnMoYXR0cmlicykge1xuICAgIHRoaXMuX2F0dHJpYnMgPSBhdHRyaWJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IEJPT0xFQU5cbiAgLy8gUmV0dXJucyBCT09MRUFOIGZvciBpZiBhdHRyaWJ1dGUgd2l0aCBnaXZlbiBuYW1lIGV4aXN0cyBpbiBcImF0dHJpYnNcIiBPQkpFQ1Q6XG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcgLT4gU1RSSU5HfFVOREVGSU5FRFxuICAvLyBSZXR1cm5zIHZhbHVlIG9mIGF0dHJpYnV0ZSBieSBuYW1lIHN0b3JlZCBpbiBcImF0dHJpYnNcIiBPQkpFQ1QsIG90aGVyd2lzZSByZXR1cm5zIFVOREVGSU5FRFxuICBnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJzW25hbWVdO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HLCBTVFJJTkcgLT4gdGhpc1xuICAvLyBCaW5kcyBTVFJJTkcgdmFsdWUgdG8gXCJhdHRyaWJzXCIgT0JKRUNUIHdpdGggZ2l2ZW4gbmFtZTpcbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5fYXR0cmlic1tuYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyB0ZXh0IG5vZGUgYXMgZmlyc3QgY2hpbGQgb2YgZWxlbWVudCBhdCByZW5kZXIgd2l0aCBnaXZlbiBzdHJpbmcgYXMgaXQncyB2YWx1ZTpcbiAgdGV4dChzdHIpIHtcbiAgICB0aGlzLl90ZXh0ID0gc3RyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gOjogU1RSSU5HIC0+IFt5bmd3aWVFbGVtZW50XVxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIFluZ3dpZUVsZW1udHMgdGhhdCBoYXZlIHRoZSBnaXZlbiB0YWduYW1lOlxuXHQvLyBOT1RFOiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZTpcblx0Z2V0RWxlbWVudHNCeVRhZ05hbWUodGFnbmFtZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChyZXN1bHQsIG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLl92YWx1ZSA9PT0gdGFnbmFtZSkge1xuICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuXHR9XG5cblx0Ly8gU1RSSU5HLCBTVFJJTkd8VU5ERUZJTkVEIC0+IFt5bmd3aWVFbGVtZW50XVxuXHQvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHluZ3dpZUVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYXR0cmlidXRlIHdpdGggdGhlIGdpdmVuIHZhbHVlOlxuXHQvLyBOT1RFOiBJZiBubyB2YWx1ZSBpcyBnaXZlbiwgdGhlbiBhbnkgZWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlIG5hbWUgaXMgcmV0dXJuZWRcblx0Z2V0RWxlbWVudHNCeUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKChub2RlLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llRWxlbWVudCkge1xuICAgICAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcblx0fVxuXG4gIC8vIFNUUklORyAtPiBbeW5nd2llRWxlbWVudF1cbiAgLy8gUmV0dXJucyBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBnaXZlbiBjbGFzcyBuYW1lXG4gIC8vIE5PVEU6IFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZWxlbWVudHMgYXJlIGZvdW5kIHdpdGggdGhlIGdpdmVuIGNsYXNzIG5hbWU6XG4gIGdldEVsZW1lbnRzQnlDbGFzcyhjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50c0J5QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgWW5nd2llRWxlbWVudCB0aGF0IGhhcyB0aGUgZ2l2ZW4gSUQ6XG4gIC8vIE5PVEU6IFJldHVybnMgVU5ERUZJTkVEIGlmIG5vIGVsZW1lbnRzIGFyZSBmb3VuZCB3aXRoIHRoZSBnaXZlbiBJRFxuICBnZXRFbGVtZW50QnlJRChpZCkge1xuICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnRzQnlBdHRyaWJ1dGUoXCJpZFwiLCBpZCkucG9wKCk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkcsIFsoRVZFTlQpIC0+IFZPSURdfChFVkVOVCkgLT4gVk9JRCAtPiAgdGhpc1xuICAvLyBCaW5kcyBjb250cm9sbGVyIGJ5IGV2ZW50IG5hbWUgdG8gbm9kZSBhdCByZW5kZXI6XG4gIG9uKGV2dE5hbWUsIGZucykge1xuICAgIGxldCBjb250cm9sbGVyID0gWW5nd2llQ29udHJvbGxlci5pbml0KGV2dE5hbWUsIGZucyk7XG4gICAgdGhpcy5fY29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFZPSUQgLT4geW5nd2llRWxlbWVudFxuICAvLyBSZXR1cm5zIGNsb25lIG9mIHRoaXMgeW5nd2llRWxlbWVudDpcbiAgY2xvbmUoKSB7XG4gICAgbGV0IHRhZ25hbWUgPSAoJyAnICsgdGhpcy5fdmFsdWUpLnNsaWNlKDEpO1xuICAgIGxldCBhdHRyaWJzID0gT2JqZWN0LmtleXModGhpcy5fYXR0cmlicykucmVkdWNlKChyZXN1bHQsIGlkKSA9PiB7XG4gICAgICByZXN1bHRbaWRdID0gKCcgJyArIHRoaXMuX2F0dHJpYnNbaWRdKS5zbGljZSgxKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuICAgIGxldCB0ZXh0ID0gdGhpcy5fdGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICA/ICgnICcgKyB0aGlzLl90ZXh0KS5zbGljZSgxKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbnRyb2xsZXJzID0gdGhpcy5fY29udHJvbGxlcnMubWFwKChjb250cm9sbGVyKSA9PiB7XG4gICAgICByZXR1cm4gY29udHJvbGxlci5jbG9uZSgpO1xuICAgIH0pO1xuICAgIGxldCBlbGVtID0gWW5nd2llRWxlbWVudCh0YWduYW1lLCBhdHRyaWJzLCB0ZXh0LCBjb250cm9sbGVycyk7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKGVsZW0sIGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZCA9IGNoaWxkLmNsb25lKCk7XG4gICAgICByZXR1cm4gZWxlbS5hcHBlbmQoY2hpbGQpO1xuICAgIH0sIGVsZW0pO1xuICB9XG5cbiAgLy8gOjogW3luZ3dpZUVsZW1lbnRdIC0+IHRoaXNcbiAgLy8gQXBwZW5kcyBhbiBhcnJheSBvZiBZbmd3aWVFbGVtZW50cyB0byB0aGlzIGluc3RhbmNlOlxuICBhcHBlbmRzKGVsZW1zKSB7XG4gICAgcmV0dXJuIGVsZW1zLnJlZHVjZSgocmVzdWx0LCBlbGVtKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBlbmQoZWxlbSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICAvLyA6OiBTVFJJTkd8RE9NRWxlbWVudCAtPiBET01FbGVtZW50XG4gIC8vIFRyYW5zZm9ybXMgWW5nd2llRWxlbWVudCBhbmQgaXQncyBkZXNlbmRhbnRzIGludG8gYnJvd3NlciBhIERPTUVsZW1lbnQ6XG4gIC8vIE5PVEU6IE9wdGlvbmFsIGFydWdtZW50IGRldGVybWluZXMgd2hlcmUgdG8gYXBwZW5kIHJlbmRlciB0bywgb3RoZXJ3aXNlIHJlZW5kZXIgaXMgcmV0dXJuZWQ7XG4gIHJlbmRlcih0YXJnZXQpIHtcblxuICAgIC8vIEludGlhbGl6ZSBET01FbGVtZW50OlxuICAgIGxldCBlbGVtID0gT2JqZWN0LmtleXModGhpcy5fYXR0cmlicykucmVkdWNlKChlbGVtLCBpZCkgPT4ge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoaWQsIHRoaXMuX2F0dHJpYnNbaWRdKTtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5fdmFsdWUpKTtcblxuICAgIC8vIEJpbmQgQ29udHJvbGxlcnM6XG4gICAgZWxlbSA9IHRoaXMuX2NvbnRyb2xsZXJzLnJlZHVjZSgoZWxlbSwgY29udHJvbGxlcikgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIucmVuZGVyKGVsZW0pO1xuICAgIH0sIGVsZW0pO1xuXG4gICAgLy8gSWYgc2V0LCBjcmVhdGUgYW5kIGFwcGVuZCB0ZXh0IG5vZGU6XG4gICAgaWYgKHR5cGVvZih0aGlzLl90ZXh0KSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IGVsZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5fdGV4dCk7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGVsZW1UZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgYW5kIGFwcGVuZCBhbGwgY2hpbGRyZW4gYW5kIHJldHVybiByZXN1bHQ6XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuY2hpbGRyZW4oKS5yZWR1Y2UoKHJlc3VsdCwgY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkID0gY2hpbGQucmVuZGVyKCk7XG4gICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBlbGVtKTtcblxuICAgIC8vIElmIHRhcmdldCBpcyBnaXZlbiwgYXBwZW5kcyByZXN1bHQgb2YgcmVuZGVyIHRvIHRoYXQgdGFyZ2V0OlxuICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSWYgdGFyZ2V0IGlzIHN0cmluZywgZmluZCBub2RlIHVzaW5nIHF1ZXJ5IHNlbGVjdG9yOlxuICAgICAgaWYgKHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KS5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJpc2UgYXNzdW1lIHRoYXQgdGFyZ2V0IGlzIERPTUVsZW1lbnQ6XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyBTdGF0aWMgZmFjdG9yeSBtZXRob2Q6XG4gIHN0YXRpYyBpbml0KHRhZ25hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBZbmd3aWVFbGVtZW50KHRhZ25hbWUsIGF0dHJpYnMsIHRleHQsIGNvbnRyb2xsZXJzKVxuICB9XG5cbiAgLy8gOjogU1RSSU5HfERPTUVsZW1lbnQsIFt5bmd3aWVFbGVtZW50XSAtPiBET01FbGVtZW50XG4gIC8vIFJlbmRlcnMgYW4gYXJyYXkgb2YgeW5nd2llRWxlbWVudHMgYW5kIGFwcGVuZHMgcmVzdWx0IHRvIGdpdmVuIHRhcmdldDpcbiAgLy8gTk9URTogRE9NRWxlbWVudCBvZiB0YXJnZXQgaXMgcmV0dXJuZWRcbiAgc3RhdGljIHJlbmRlclRvKHRhcmdldCwgZWxlbXMpIHtcbiAgICBsZXQgbm9kZSA9IHR5cGVvZih0YXJnZXQpID09PSBcInN0cmluZ1wiXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxuICAgICAgOiB0YXJnZXQ7XG4gICAgcmV0dXJuIGVsZW1zLnJlZHVjZSgocmVzdWx0LCBlbGVtKSA9PiB7XG4gICAgICBlbGVtLnJlbmRlcihyZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBub2RlKVxuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFluZ3dpZU5vZGUge1xuXG4gIC8vIFNUUklORyAtPiB5bmd3aWVOb2RlXG4gIC8vIENPTlNUUlVDVE9SXG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTsgICAgICAgLy8gQXJiaXRyYXJ5IFNUUklORyB2YWx1ZSB0aGF0IGNhbiBiZSBzdG9yZWQgYnkgdGhpcyBub2RlXG4gICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkOyAgLy8gUGFyZW50IG9mIHRoaXMgbm9kZVxuICAgIHRoaXMuX2ZpcnN0ID0gdW5kZWZpbmVkOyAgIC8vIEZpcnN0IGNoaWxkIG9mIHRoaXMgbm9kZVxuICAgIHRoaXMuX2xhc3QgPSB1bmRlZmluZWQ7ICAgIC8vIExhc3QgY2hpbGQgb2YgdGhpcyBub2RlO1xuICAgIHRoaXMuX25leHQgPSB1bmRlZmluZWQ7ICAgIC8vIE5leHQgc2libGluZyBvZiB0aGlzIG5vZGVcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkOyAgICAvLyBQcmV2aW91cyBzaWJsaW5nIG9mIHRoZSBub2RlXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IFt5bmd3aWVOb2RlXVxuICAvLyBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICBjaGlsZHJlbigpIHtcblxuICAgIGxldCBjaGlsZCA9IHRoaXMuX2ZpcnN0OyAgIC8vIEZpcnN0IGNoaWxkXG4gICAgbGV0IGNoaWxkcmVuID0gW107ICAgICAgICAgLy8gQXJyYXkgb2YgY2hpbGRyZW4gdG8gcmV0dXJuXG5cbiAgICAvLyBMb29rcyBmb3IgbmV4dCBzaWJsaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIHNpYmxpbmdzOlxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYW4gYXJyYXJ5IHluZ2l3Tm9kZSBlbGVtZW50czpcbiAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgfVxuXG4gIC8vIDo6IHluZ3dpZU5vZGUgLT4gdGhpc1xuICAvLyBBZGRzIGdpdmVuIG5vZGUgdG8gY2hpbGRyZW4gb2YgdGhpcyBub2RlOlxuICAvLyBOT1RFOiBJZiBnaXZlbiBub2RlIGFscmVhZHkgaGFzIGEgcGFyZW50LCB0aGF0IG5vZGUgaXMgZGV0YWNoZWQgYW5kIGFwcGVuZWQgdG8gdGhpcyBub2RlOlxuICBhcHBlbmQobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgLy8gSWYgZ2l2ZW4gbm9kZSBoYXMgcGFyZW50LCBkZXRhY2ggdGhhdCBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gICAgICBpZiAobm9kZS5fcGFyZW50KSB7XG4gICAgICAgIG5vZGUuZGV0YWNoKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBuZXcgbm9kZSBhcyBsYXN0IHNpYmxpbmc6XG4gICAgICBpZiAodGhpcy5fZmlyc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLl9wcmV2ID0gdGhpcy5fbGFzdDsgICAgLy8gU2V0cyBuZXcgbGFzdCBjaGlsZCdzIHByZXZpb3VzIG5vZGUgdG8gb2xkIGxhc3Qgbm9kZVxuICAgICAgICB0aGlzLl9sYXN0Ll9uZXh0ID0gbm9kZTsgICAgLy8gU2V0IG9sZCBsYXN0IGNoaWxkIG5leHQgZWxlbWVudCB0byBuZXcgbGFzdCBjaGlsZFxuICAgICAgICB0aGlzLl9sYXN0ID0gbm9kZTsgICAgICAgICAvLyBTZXQgbmV3IGxhc3QgY2hpbGQgdG8gZ2l2ZW4gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlciBhcmUgbm8gY2hpbGRyZW4sIHRoZW4gdGhpcyBub2RlIGlzIGFuIG9ubHkgY2hpbGQ6XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gbm9kZTtcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYXJlbnRcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXM7XG5cbiAgICAgIC8vIFJldHVybiBpbnN0YW5jZTpcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgYXBwcGVuZCBZbmd3aWVOb2RlIHRvIG90aGVyIFluZ3dpZU5vZGVzXCIpO1xuXG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHRoaXNcbiAgLy8gRGV0YWNoZXMgdGhpcyBub2RlIGZyb20gaXQncyBwYXJlbnQ6XG4gIGRldGFjaCgpIHtcblxuICAgIC8vIE1ha2UgcHJldmlvdXMgbm9kZSdzIG5leHQgbm9kZSB0aGlzIG5vZGUncyBuZXh0IG5vZGU6XG4gICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgIHRoaXMuX3ByZXYuX25leHQgPSB0aGlzLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBwcmV2aW91cyBub2RlLCB0aGVuIHRoaXMgbm9kZSBtdXN0IGJlIGZpcnN0IGNoaWxkIG9mIHBhcmVudCAoaWYgbm9kZSBoYXMgcGFyZW50KTpcbiAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IHRoaXMuX25leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBuZXh0IG5vZGUncyBwcmV2aW91cyBub2RlIHRoaXMgbm9kZSdzIHByZXZpb3VzIG5vZGU6XG4gICAgaWYgKHRoaXMuX25leHQpIHtcbiAgICAgIHRoaXMuX25leHQuX3ByZXYgPSB0aGlzLl9wcmV2O1xuICAgIH1cblxuICAgIC8vIFVuc2V0IGFsbCByZWxhdGlvbnM6XG4gICAgdGhpcy5fbmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3BhcmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFJldHVybiBpbnN0YW5jZTpcbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB0aGlzO1xuICAvLyBJbnNlcnRzIGdpdmVuIHluZ3dpZU5vZGUgYmVmb3JlIHRoaXMgaW5zdGFuY2Ugb2YgeW5nd2llTm9kZTpcbiAgLy8gTk9URTogYS5pbnNlcnRzQmVmb3JlKGIpIG1lYW5zIFwiYlwiIGlzIGluc2VydGVkIGJlZm9yZSBcImFcIlxuICBpbnNlcnRCZWZvcmUobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgaWYgKHRoaXMuX3ByZXYpIHtcbiAgICAgICAgdGhpcy5fcHJldi5fbmV4dCA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50Ll9maXJzdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHJlbGF0aW9uc1xuICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX3ByZXY7XG4gICAgICBub2RlLl9uZXh0ID0gdGhpcztcbiAgICAgIG5vZGUuX3BhcmVudCA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBpbnNlcnQgYSBZbmd3aWVOb2RlIGJlZm9yZSBvdGhlciBZbmd3aWVOb2Rlc1wiKTtcblxuICB9XG5cbiAgLy8gOjogeW5nd2llTm9kZSAtPiB5bmd3aWVOb2RlXG4gIC8vIFJlcGxhY2UgdGhpcyBub2RlIHdpdGggZ2l2ZW4gbm9kZTpcbiAgcmVwbGFjZVdpdGgobm9kZSkge1xuXG4gICAgLy8gQ2hlY2tzIGlmIGFyZ3VtZW50IGlzIGEgbm9kZTpcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFluZ3dpZU5vZGUpIHtcblxuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZSk7XG4gICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAvLyBSZXR1cm4gZ2l2ZW4gbm9kZTpcbiAgICAgIHJldHVybiBub2RlO1xuXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgcmVwbGFjZSBhIFluZ3dpZU5vZGUgd2l0aCBhbm90aGVyIFluZ3dpZU5vZGVcIik7XG5cbiAgfVxuXG4gIC8vIDo6IFZPSUQgLT4geW5nd2llTm9kZVxuICAvLyBSZXR1cm5zIGRlZXAgY2xvbmUgb2YgdGhpcyBub2RlOlxuICBjbG9uZSgpIHtcbiAgICBsZXQgdmFsdWUgPSAgKCcgJyArIHRoaXMuX3ZhbHVlKS5zbGljZSgxKTtcbiAgICBsZXQgY2xvbmUgPSBuZXcgWW5nd2llTm9kZSh2YWx1ZSlcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbigpLnJlZHVjZSgocmVzdWx0LCBjaGlsZCkgPT4ge1xuICAgICAgY2xvbmUgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdC5hcHBlbmQoY2xvbmUpO1xuICAgIH0sIGNsb25lKTtcbiAgfVxuXG4gIC8vIE5PREUsICogLT4gTk9ERSAtPiAqXG4gIC8vIEFwcGxpZXMgZnVuY3Rpb24gdG8gYSByZXN1bHQgYW5kIHRoaXMgbm9kZSwgd2hlcmUgdGhhdCBmdW5jdGlvbiByZXR1cm5zIHRoZSBuZXh0IG5vZGUgdG8gdGhhdCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvXG4gIC8vIE5PVEU6IFJlc3VsdCBpcyByZXR1cm5lZCB3aGVuIHRoZXJlIGlzIG5vIG5leHQgbm9kZSB0byBhcHBseSBmdW5jdGlvbiB0b1xuICBzdGVwKGZuLCByZXN1bHQpIHtcbiAgICBuZXh0ID0gZm4odGhpcywgcmVzdWx0KTtcbiAgICBpZiAobmV4dCkge1xuICAgICAgbmV4dC5zdGVwKGZuLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gOjogTk9ERSwgKiAtPiAqLCAqIC0+ICpcbiAgLy8gQXBwbGllcyBmdW5jdGlvbiB0byB0aGlzIG5vZGUgYW5kIGl0J3MgZGVzY2VuZGFudHMsIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb246XG4gIHBhcnNlKGZuLCByZXN1bHQpIHtcbiAgICBZbmd3aWVOb2RlLnBhcnNlKHRoaXMsIChub2RlKSA9PiB7XG4gICAgICByZXN1bHQgPSBmbihub2RlLCByZXN1bHQpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogU3RhdGljIEZ1bmN0aW9uXG4gICAqXG4gICAqL1xuXG4gIC8vIFN0YXRpYyBGYWN0b3J5IE1ldGhvZFxuICBzdGF0aWMgaW5pdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgWW5nd2llTm9kZSh2YWx1ZSk7XG4gIH1cblxuICAvLyBOT0RFLCBOT0RFIC0+IFZPSUQgLT4gVk9JRFxuICAvLyBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gYSBub2RlIGFuZCBhbGwgaXQncyBkZXNlbmRhbnRzXG4gIC8vIE5PREU6IFRoaXMgaXMgYSByZS1pbXBsZW1lbnRhdGlvbiBvZiBDcm9ja2ZvcmQncyBET00gd2FsayBhbGdvcml0aG0gZnJvbSBcIkphdmFzY3JpcHQ6IFRoZSBHb29kIFBhcnRzXCJcbiAgc3RhdGljIHBhcnNlKG5vZGUsIGZuKSB7XG5cbiAgICAvLyBDaGVja3MgaWYgYXJndW1lbnQgaXMgYSBub2RlOlxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgWW5nd2llTm9kZSkge1xuXG4gICAgICBmbihub2RlKTtcbiAgICAgIG5vZGUgPSBub2RlLl9maXJzdDtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIFluZ3dpZU5vZGUucGFyc2Uobm9kZSwgZm4pO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbiBvbmx5IHBhcnNlIGEgWW5nd2llTm9kZVwiKTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVOb2RlIGZyb20gXCIuLi9Ob2RlL21haW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWW5nd2llVGV4dE5vZGUgZXh0ZW5kcyBZbmd3aWVOb2RlIHtcblxuICAvLyA6OiBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gQ09OU1RSVUNUT1I6XG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICBzdXBlcih0ZXh0KTtcbiAgfVxuXG4gIC8vOjogVk9JRCAtPiBOT0RFXG4gIC8vIENyZWF0ZXMgIERPTSBUZXh0IG5vZGUgc2V0IHdpdGggdGhlIFNUUklORyBzdG9yZWQgaW4gX3ZhbHVlOlxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIC8vIDo6IFNUUklORyAtPiB0aGlzXG4gIC8vIEFwcGVuZHMgU1RSSU5HIGluc3RlYWQgb2YgTk9ERSBzaW5jZSBhIFRleHROb2RlIGhhcyBubyBjaGlsZHJlblxuICBhcHBlbmQoc3RyKSB7XG5cbiAgICBpZiAodHlwZW9mKHN0cikgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgKz0gc3RyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IFNUUklOR3MgY2FuIGFwcGVuZCBZbmd3aWVUZXh0Tm9kZXNcIik7XG4gIH1cblxuICAvLyA6OiBWT0lEIC0+IHluZ3dpZVRleHROb2RlXG4gIC8vIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHluZ3dpZVRleHROb2RlOlxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKCgnICcgKyB0aGlzLl92YWx1ZSkuc2xpY2UoMSkpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBTdGF0aWMgTWV0aG9kc1xuICAgKlxuICAgKi9cblxuICAvLyBTVFJJTkcgLT4geW5nd2llVGV4dE5vZGVcbiAgLy8gU3RhdGljIGZhY3RvcnkgbWV0aG9kOlxuICBpbml0KHRleHQpIHtcbiAgICByZXR1cm4gbmV3IFluZ3dpZVRleHROb2RlKHRleHQpO1xuICB9XG5cbn1cbiIsImltcG9ydCBZbmd3aWVFbGVtZW50IGZyb20gXCIuLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi4vVGV4dE5vZGUvbWFpbi5qc1wiO1xuXG4vLyA6OiBTVFJJTkcgLT4geW5nd2llRWxlbWVudFxuLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBpbnRvIGEgeW5nd2llRWxlbWVudFxuLy8gTk9URTogVGhpcyBET0VTIE5PVCB0cmFuc2Zvcm0gZXZlbnQgaGFuZGxlcnMgaW50byBZbmd3aWVDb250cm9sbGVyIG9iamVjdHM6XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBZbmd3aWVUcmFuc2Zvcm0gKGh0bWwpIHtcbiAgcmV0dXJuIHdhbGtOb2RlKHR5cGVvZihodG1sKSA9PT0gXCJzdHJpbmdcIiA/IHRvTm9kZShodG1sKSA6IGh0bWwpO1xufVxuXG4vLyA6OiBTVFJJTkcgLT4gTk9ERVxuLy8gVHJhbnNmb3JtcyBzdHJpbmcgb2YgSFRNTCBpbnRvIGNsaWVudC1zaWRlIERPTSBub2RlOlxuZnVuY3Rpb24gdG9Ob2RlKGh0bWwpIHtcbiAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gIHJldHVybiBkb2MuYm9keS5maXJzdEVsZW1lbnRDaGlsZDtcbn1cblxuLy8gOjogTk9ERSwgTk9ELCBub2RlLm5vZGVUeXBFIC0+IFZPSURcbi8vIENyZWF0ZXMgYW4gWW5nd2llRWxlbWVudCBmcm9tIHRoZSBnaXZlbiBub2RlIGFuZCBhbGwgb2YgaXQncyBkZXNlbmRlbnRzOlxuLy8gTk9URTogSW5zcGlyZWQgYnkgQ3JvY2tmb3JkJ3MgRE9NIHdhbGtpbmcgYWxnb3JpdGhtIGZyb20gXCJKYXZhc2NyaXB0OlRoZSBHb29kIFBhcnRzXCJcbmZ1bmN0aW9uIHdhbGtOb2RlKG5vZGUsIHJlc3VsdCkge1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgbGV0IGF0dHJpYnMgPSBnZXRBdHRyaWJ1dGVzKG5vZGUpO1xuICAgIGxldCBlbGVtID0gbmV3IFluZ3dpZUVsZW1lbnQobm9kZS50YWdOYW1lLCBhdHRyaWJzKTtcbiAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbGVtXG4gICAgICA6IHJlc3VsdC5hcHBlbmQoZWxlbSk7XG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0ZXh0Tm9kZSA9IG5ldyBZbmd3aWVUZXh0Tm9kZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgID8gdGV4dE5vZGVcbiAgICAgIDogcmVzdWx0LmFwcGVuZCh0ZXh0Tm9kZSk7XG4gIH1cblxuICBub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgbGV0IGNoaWxkID0gd2Fsa05vZGUobm9kZSk7XG4gICAgaWYgKGNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LmFwcGVuZChjaGlsZCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG4vLyA6OiBET01FbGVtZW50IC0+IE9CSkVDVFxuLy8gUmV0dXJucyBPQkpFQ1Qgb2YgYXR0cmlidXRlcyBmcm9tIHRoZSBnaXZlbiBET00gRWxlbWVudDpcbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoZWxlbSkge1xuICByZXR1cm4gQXJyYXkuZnJvbShlbGVtLmF0dHJpYnV0ZXMpLnJlZHVjZSgocmVzdWx0LCBhdHRyaWIpID0+IHtcbiAgICByZXN1bHRbYXR0cmliLm5hbWVdID0gYXR0cmliLnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIHt9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFluZ3dpZU5vZGUgZnJvbSBcIi4vTm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llRWxlbWVudCBmcm9tIFwiLi9FbGVtZW50L21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUZXh0Tm9kZSBmcm9tIFwiLi9UZXh0Tm9kZS9tYWluLmpzXCI7XG5pbXBvcnQgWW5nd2llQ29udHJvbGxlciBmcm9tIFwiLi9Db250cm9sbGVyL21haW4uanNcIjtcbmltcG9ydCBZbmd3aWVUcmFuc2Zvcm0gZnJvbSBcIi4vdHJhbnNmb3JtL21haW4uanNcIjtcblxuZXhwb3J0IHtcbiAgWW5nd2llTm9kZSBhcyBOb2RlLFxuICBZbmd3aWVFbGVtZW50IGFzIEVsZW1lbnQsXG4gIFluZ3dpZVRleHROb2RlIGFzIFRleHROb2RlLFxuICBZbmd3aWVDb250cm9sbGVyIGFzIENvbnRyb2xsZXIsXG4gIFluZ3dpZVRyYW5zZm9ybSBhcyB0cmFuc2Zvcm1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=