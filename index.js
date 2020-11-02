// CONSTRUCTOR :: STRING, {ATTRIB_NAME:ATTRIB_VALUE}, [YNGWIE|TEXT], [LISTENER], STRING -> YNGWIE
Yngwie = (tagname, attribs, children, listeners, attachment) => ({

  // tagname :: STRING -> YNGWIE
  // Tagname of element to create when instance is intialized:
  "tagname":(tagname) => Yngwie(tagname, attribs, children, listeners, attachment),

  // attribs :: {ATTRIB_NAME:ATTRIB_VALUE} -> YNGWIE
  // Attribues to set for new element created when instance is initailzed:
  "attribs":(attribs) => Yngwie(tagname, attribs, children, listeners, attachment),

  // children :: [YNGWIE|TEXT] -> YNGWIE
  // Additional children to initalize and attach to new element created when this instance is initialized:
  "children":(children) => Yngwie(tagname, attribs, children, listeners, attachment),

  // listeners :: [LISTENER] -> YNGWIE
  // Event listeners to attach to new element when instance is initailzed:
  "listeners":(listeners) => Yngwie(tagname, attribs, children, listeners, attachment),

  // attachment :: STRING -> Yngwie
  // Determines how new element will be attached to it's parent when instance is intialized:
  // NOTE: Child is appended to it's parent by default
  "attachment":(attachment) => Yngwie(tagname, attribs, children, listeners, attachment),

  // child :: YNGWIE -> YNGWIE
  // Add single child to new element when instance is initialized:
  "child":(yngwie) => {
    children = children || [];
    children.push(yngwie);
    return Yngwie(tagname, attribs, children, listeners, attachment);
  },

  // attrib :: STRING, * -> YNGWIE
  // Set single attribute for new element:
  "attrib":(name, value) => {
      attribs = attribs || {};
      attribs[name] = value;
      return Yngwie(tagname, attribs, children, listeners, attachment);
  },

  // on :: STRING, EVT -> VOID, OBJJECT - > YNGWIE
  // Set single event listener for
  "on":(evtName, fn, options) => {
      listeners = listeners || [];
      listeners.push(Yngwie.Listener(evtName, fn, options));
      return Yngwie(tagname, attribs, children, listeners, attachment);
  },

  // init :: NODE -> NODE
  // Initializes new element and attaches it to the given node, returning that node as a result:
 "init":(node) => {

   // Set default values:
   let _tagname = tagname || "DIV";
   let _attribs = attribs || {};
   let _children = children || [];
   let _listeners = listeners || [];
   let _attachment = attachment || "append";

   // Initialize node:
   let elem = document.createElement(_tagname);

   // Initialize attributes:
   elem = Object.keys(_attribs).reduce((elem, attrib_name) => {
     elem.setAttribute(attrib_name, _attribs[attrib_name]);
     return elem;
   }, elem);

   // Initialize children:
   elem = _children.reduce((elem, child) => child.init(elem), elem);

   // Initialize event listenrs:
   elem = _listeners.reduce((elem, listener) => listener.init(elem), elem);

   // Attach element to parent and return element:
   return Yngwie.attach(_attachment, node, elem);

 }

})

/**
 *
 *  Addtional "Constructors"
 *
 */

// CONSTRUCTOR :: STRING, STRING -> TEXT
// Creates a new text node element when instance is intilaized:
Yngwie.Text = (text, attachment) => ({

  // value :: STRING -> TEXT
  // Value of text node when this instance is initailzed:
  "value":(text) => Yngwie.text(text, attachment),

  // attachment :: STRING -> TEXT
  // Determines how text node should be attached to parent when instance is initalize:
  "attachment":(attachment) => Yngwie.text(text, attachment),

  // init :: NODE -> NODE
  // Initializes text node and attaches to parent:
  "init":(node) => Yngwie.attach(attachment || "append", node, document.createTextNode(text))

})

// CONSTRUCTOR :: STRING, EVT -> VOID, OBJECT -> LISTENER
// Creates a new event listener when instance is initalized:
Yngwie.Listener = (evtName, fn, options) => ({

  // evtName :: STRING -> LISTENER
  // Event to listener for when instance is intialized:
  "evtName":(evtName) => Yngwie.Listener(evtname, fn, options),

  // fn :: (EVT -> VOID) -> LISTENER
  // Function that's called by listener when instance is initalized:
  "fn":(fn) => Yngwie.Listener(evtName, fn, options),

  // options :: OBJECT -> LISTENEER
  // Options to apply to listener when instance is initalized:
  "options":(options) => Yngwie.Listener(evtName, fn, options),

  // init :: NODE -> NODE
  // Intializes new event listener and binds to given node:
  "init":(node) => {
    node.addEventListener(evtName, fn, options);
    return node;
  }

})


/**
 *
 *  "Static" Methods
 *
 */

 // attach :: STRING, PARENT_NODE, CHILD_NODE -> PARENT_NODE
 // Determines how a child should be "attached" to a parent:
 // NOTE: Using modern "attachment" methods means no support for IE...
 Yngwie.attach = (attachment, parent, child) => {
   switch (attachment) {
     case "append":
      parent.appendChild(child);
     break;
     case "prepend":
      parent.prepend(child);      // Not supported in IE
     break;
     case "after":
      child.after(parent);        // Not supported in IE
     break;
     case "before":
      child.brefore(parent)       // Not supported in IE
     break;
     case "replace":
      parent.replaceWith(child)   // Not supported in IE
     break;
     default:
       parent.appendChild(child);
   }
   return parent;
 }

// init :: STRING, [YNGWIE|TEXT] -> NODE
// "Static factory" method for intializing an array of YNGWIE instances and attaching them to the given node:
 Yngwie.init = (node, yngwies) => yngwies.reduce((parent, yngwie) => {
   return yngwie.init(parent)
 }, node);

 // declare :: {METHOD_ID:(*) -> ElemFold|ElemFold.Text} -> [ElemFold|ElemFold.Text] -> OF
 // Creates a "declaration" for "mapping" convience methods used to create HTML elements:
 Yngwie.declare = (mapping) => (yngwies) => Object.keys(mapping).reduce((result, methodName) => {
   yngwies = yngwies || [];
   result[methodName] = (...args) => {
     yngwies.push(mapping[methodName].apply(null, args))
     return result;
   }
   return result;
 }, {
   // Includes "init" method by default:
   "init":(node) => Yngwie.init(node, yngwies)
 })
