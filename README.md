# yngwie
A declarative approach to generating client-side HTML using it's own virtual DOM implementation.

### Still a work in progress.

## Classes
1. Yngwie.Node (YngwieNode)  
2. Yngwie.Element (YngwieElement)
3. Yngwie.TextNode (YngwieTextNode)
4. Yngwie.Controller (YngwieController)
5. Yngwie.transform (YngwieTransfrom)

## Yngwie.Element (YngwieNode)
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

### CONSTRUCTOR :: (STRING -> yngwieNode)
Creates instance of yngwieNode with the given STRING stored as it's value 

```
// Creates instance of YngwieNode with the STRING "Hello World!" stored in it's value:
let node = new Yngwie.Node("Hello World!")
```

## Yngwie.Element (YngwieNode => YngwieElement)
Virtual DOM Element that extends YngwieNode class

### Properties

Property|Type|Description
--------|----|-----------
value | STRING | Tag name of element
attribs | {STRING:STRING} | Attribute name and value assoicated with this element in the form of {attribute_name:attribute_value}
text | STRING | Text that is appended as the first child of this element when the element is rendered 
controllers | [yngwieController] | Event listeners bound to this element 


### CONSTRUCTOR :: (STRING, OBJECT, TEXT, [yngwieController] -> yngwieNode)
Creates instance of YngwieElement with the given tag name, attributes, text, and event listeners

```
// Returns instance of YngwieNode with a tag of "div", the attribute "class" with the value of "container", and to append a text node with the value "Hello World!" when this YngwieElement instance is rendered:
let elem = new Yngwie.Element("div", {"class":"container"}, "Hello World!");
```

## Yngwie.TextNode (YngwieNode => YngwieTextNode)
Virtual Text Node 

## Yngwie.Controller (YngwieController)
Binds event handlers for a specific event to an instance of YngwieElement 

## Yngwie.transform (YngwieTransform)
Method for transforming a STRING of HTML or a DOMElement into an YngwieElement instance a STRING stored as it's value 



