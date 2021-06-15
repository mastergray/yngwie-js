export default class YngwieController {

  // CONSTRUCTOR :: STRING, [(EVENT, ELEMENT -> VOID)] -> yngwieController
  constructor(evtName, fns) {
    this._evtName = evtName;
    this._fns = fns || [];
  }

  // :: (EVENT, ELEMENT -> VOID) -> this;
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
      return new Function("evt", "elem", fn.toString());
    });
    return new YngwieController(evtName, fns);
  }

  // :: ELEMENT, OBJECT -> ELEMENT
  // Creates event listener and binds it to given DOM ELEMENT, and calls function of listener to given context
  // NOTE: If no context is given, function is called in the context of the ELEMENT the listener is bound to
  render(elem, ctx) {
    return this._fns.reduce((elem, fn) => {
      elem.addEventListener(this._evtName, function (evt) {
        fn.call(ctx === undefined ? elem : ctx, evt, elem);
      });
      return elem;
    }, elem);
  }

  // :: STRING, [(EVENT, ELEMENT -> VOID)]|(EVENT, ELEMENT -> VOID) -> yngwieController
  // Static factory method:
  static init(evtName, fns) {
    return fns !== undefined
      ? new YngwieController(evtName, Array.isArray(fns) === true ? fns : [fns])
      : new YngwieController(evtName);
  }

}
