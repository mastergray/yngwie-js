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

  //:: VOID -> DOMTextNode
  // Creates  DOM Text node set with the STRING stored in _value:
  render() {
    return document.createTextNode(this._value);
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
