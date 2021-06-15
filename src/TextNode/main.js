import YngwieNode from "../Node/main.js";
import YngwieError from "../Error/main.js";

export default class YngwieTextNode extends YngwieNode {

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

    throw new YngwieError("Only STRINGs and other YngwieTextNodes can append a YngwieTextNode", val);
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
