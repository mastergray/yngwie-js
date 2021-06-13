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
    throw new YngwieError("Only STRINGs can append YngwieTextNodes", str);
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
