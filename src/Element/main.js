import YngwieNode from "../Node/main.js";
import YngwieController from "../Controller/main.js";
import YngwieError from "../Error/main.js";

export default class YngwieElement extends YngwieNode {

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
    let controller = YngwieController.init(evtName, fns);
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
      throw new YngwieError("Only YngwieElement can be rendered to target", elem);
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
    throw new YngwieError("Only YngwieElement can be injected into target", elem);
  }

}
