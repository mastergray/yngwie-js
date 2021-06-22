import YngwieNode from "../Node/main.js";
import YngwieListener from "../Listener/main.js";
import YngwieError from "../Error/main.js";

export default class YngwieElement extends YngwieNode {

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
      throw new YngwieError("YngwieElement attributes can only be set with OBJECT", attribs);
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
      throw new YngwieError("Text of element can only be set with a STRING", str);
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
        throw new YngwieError("Only YngwieElement can be rendered to target", elem);
      }, node);
    }
    throw new YngwieError("Expected array as argument", elems);
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
    throw new YngwieError("Only YngwieElement can be injected into target", elem);
  }

}
