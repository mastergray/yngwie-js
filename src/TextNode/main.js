import YngwieNode from "../Node/main.js";

export default class YngwieTextNode extends YngwieNode {

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
