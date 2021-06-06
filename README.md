# yngwie
A declarative approach to generating client-side HTML using it's own virtual DOM implementation.

### Still a work in progress.

## Classes

### Yngwie.Node ([YngwieNode](#yngwieNode))

  - **Instance Methods**  
    - [CONSTRUCTOR](#node)
    - [append](#append)
    - [detach](#detach)
    - [children](#children)
    - [appends](#appends)
    - [insertBefore](#insertBefore)
    - [replaceWith](#replaceWith)
    - [clone](#clone)
    -  [parse](#parse)

  - **Static Methods**
    - [init](#node_init)
    - [parse](#node_parse)

### Yngwie.Element ([YngwieElement](#yngwieElement))
### Yngwie.TextNode ([YngwieTextNode](#yngwieTextNode))
### Yngwie.Controller ([YngwieController](#yngwieController))
### Yngwie.transform ([YngwieTransfrom](#yngwieTransform))
### Yngwie.Error ([YngwieError](#yngwieError))

<a id="yngwieNode" />

## Yngwie.Node (YngwieNode)
Virtual DOM Node

### Properties

Property|Type|Description
--------|----|-----------
value | STRING | Arbitrary STRING value that can be stored in this node
parent | yngwieNode | Parent of this node (is UNDEFINED if this node has no parent)
first | yngwieNode | First child of this node (is UNDEFINED if this node has no children)
last | yngwieNode | Last child of this node (is UNDEFINED if this node has no children)
next | yngwieNode | This node's next sibling (is UNDEFINED if this is the last child of this node's parent)
prev | yngwieNode | This node's previous sibling (is UNDEFINED if this is the first child of this node's parent)

<a id="node" />

### CONSTRUCTOR :: STRING -> yngwieNode
Creates instance of yngwieNode with the given STRING stored as it's value.

```javascript
// Creates instance of YngwieNode with the STRING "Hello World!" stored in it's value:
let node = new Yngwie.Node("Hello World!")
```

<a id="append" />

### yngwieNode.append :: yngwieNode -> this
Chainable method that appends the given instance of YngwieNode to this instance of YngwieNode. If argument is not
a yngwieNode, a YngwieError is thrown. If given node already has a parent, that node is detached and appended to this node.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// Appends b,c, and d to a:
a.append(b).append(c).append(d)
```

<a id="detach" />

### yngwiwNode.detach :: VOID -> this
Chainable method that detaches this instance of YngwieNode from it's parent. When a yngwieNode is detached, that means
it has no parent, previous sibling, or next sibling but it's children are still intact.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");

// Append b to a:
a.append(b);

// Detach b from a:
b.detach();
```

<a id="children" />

### yngwieNode.children :: VOID -> [yngwieNode]
Returns all children of this node. If this node has no children, then an empty array is returned.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// Appends b,c, and d to a:
a.append(b).append(c).append(d)

// Returns array with nodes b,c and d:
a.children();
```

<a id="appends" />

### yngwieNode.appends :: [yngwieNode] -> this
Chainable method that appends an array of yngwieNodes to this instance of YngwieNode. If any element
of the given array is not an instance of YngwieNode, then a YngwieError exception is thrown. If argument
is not an array, then a YngwieError exception is also thrown.

```javascript
// Create "a" node:
let a = new Yngwie.Node("a");

// Creates children and appends them:
a.appends([
  new Yngwie.Node("b"),
  new Yngwie.Node("c"),
  new Yngwie.Node("d")
]);

// Returns [b,c,d]:
a.children();
```

<a id="insertBefore" />

### yngwieNode.insertBefore :: yngwieNode -> this
Chainable method that inserts the given yngwieNode before this instance of yngwieNode. If argument is not
an instance of YngwieNode, then a YngwieError exception is thrown.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// b and c and now children of a:
a.appends([b,c]);

// d is inserted before c:
c.insertBefore(d);

// Returns [b,d,c]:
a.children();
```

<a id="replaceWith" />

### yngwieNode.replaceWith :: yngwieNode -> yngwieNode
Chainable method that replaces this instance of yngwieNode with the given instance of yngwieNode, returning
the node that has been replaced. If argument is not an instance of YngwieNode, then a YngwierError exception
is thrown. If this instance that's being replaced has no parent, then a YngwieError exception is also thrown.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// b and c and now children of a:
a.appends([b,c]);

// d is inserted before c:
c.replaceWith(d);

// Returns [b,d]:
a.children();
```

<a id="clone" />

### yngwieNode.clone :: VOID -> yngwieNode
Chainable method that creates a clone of this instance of yngwieNode that includes
all of it's descendants, whereas the descendants themselves are also clones.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// b and c are now children of a:
a.appends([b,c]);

// Create clone of a and append d:
let cloneOfA = a.clone().append(d);

// Returns [b,c]:
a.children();

// Returns [b,c,d]:
cloneOfA.children();
```

<a id="parse" />

### yngwieNode.parse :: (yngwieNode, a -> a), a
Applies function to this instance of yngwieNode and all of it's descendants, returning a result.

```javascript
// Create some nodes:
let a = new Yngwie.Node("a");
let b = new Yngwie.Node("b");
let c = new Yngwie.Node("c");
let d = new Yngwie.Node("d");

// b,c,d are now children of a:
a.appends([b,c,d]);

// Returns ["a", "b", "c", "d"]:
a.parse((node, result) => {
  result.push(node._value);
}, []);
```

<a id="node_init" />

### YngwieNode.init :: STRING -> yngwieNode
Static factory method for creating an instance of YngwieNode.

```javascript
// Create "a" node and appends children, then returns ["a", "b", "c", "e", "f", "d"]:
Yngwie.Node.init("a").appends([
  Yngwie.Node.init("b"),
  Yngwie.Node.init("c").appends([
    Yngwie.Node.init("e"),
    Yngwie.Node.init("f")
  ]),
  Yngwie.Node.init("d"),
]).parse((node, result) => {
  result.push(node._value);
  return result;
}, []);
```

<a id="node_parse" />

### YngwieNode.parse :: yngwieNode, (yngwieNode -> VOID) -> VOID
Applies function to given yngwieNode and all of it's depdents using Crockford's
recursive DOM walk algorithm from "Javascript: The Good Parts".

```javascript
// Create "a" node and appends children:
let a = Yngwie.Node.init("a").appends([
  Yngwie.Node.init("b"),
  Yngwie.Node.init("c").appends([
    Yngwie.Node.init("e"),
    Yngwie.Node.init("f")
  ]),
  Yngwie.Node.init("d"),
]);

// Writes each node's value to console:
Yngwie.Node.parse(a, (node) => {
  console.log(node._value);
});
```   


<a id="yngwieElement" />

## Yngwie.Element (YngwieNode => YngwieElement)
Virtual DOM Element that extends YngwieNode class

### Properties

Property|Type|Description
--------|----|-----------
value | STRING | Tag name of element
attribs | {STRING:STRING} | Attribute name and value associated with this element in the form of {attribute_name:attribute_value}
text | STRING | Text that is appended as the first child of this element when the element is rendered
controllers | [yngwieController] | Event listeners bound to this element


### CONSTRUCTOR :: STRING, OBJECT, TEXT, [yngwieController] -> yngwieNode
Creates instance of YngwieElement with the given tag name, attributes, text, and event listeners

```javascript
// Returns instance of YngwieNode with a tag of "div", the attribute "class" with the value of "container", and to append a text node with the value "Hello World!" when this YngwieElement instance is rendered:
let elem = new Yngwie.Element("div", {"class":"container"}, "Hello World!");
```

<a id="yngwieTextNode" />

## Yngwie.TextNode (YngwieNode => YngwieTextNode)
Virtual Text Node

<a id="yngwieController" />

## Yngwie.Controller (YngwieController)
Binds event handlers for a specific event to an instance of YngwieElement

<a id="yngwieTransform" />

## Yngwie.transform (YngwieTransform)
Method for transforming a STRING of HTML or a DOM [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) into an instance of YngwieElement.

<a id="yngwieError" />

## Yngwie.Error (YngwieError)
Extends [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) class for handling yngwie.js errors.
