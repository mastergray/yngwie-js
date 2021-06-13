export default class YngwieController {

  // CONSTRUCTOR :: STRING, [(EVT -> VOID)] -> this
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVT, yngwieElement, NODE -> VOID) -> this;
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

  // ::yngwieElement, DOMElement -> DOMElement
  // Creates event listener and binds it given DOMElement
  render(elem, node) {
    return this._fns.reduce((node, fn) => {
      node.addEventListener(this._evtName, evt => {
        fn(evt, elem, node);
      });
      return node;
    }, node);
  }

  // :: STRING, [EVENT, yngwieElement, NODE -> VOID]|EVENT, yngwieElement, NODE -> VOID -> yngwieController
  // Static factory method:
  static init(evtName, fns) {
    return new YngwieController(evtName, Array.isArray(fns) === true ? fns : [fns]);
  }

}
