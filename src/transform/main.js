import YngwieElement from "../Element/main.js";
import YngwieTextNode from "../TextNode/main.js";

// :: STRING -> yngwieElement
// Transforms string of HTML into a yngwieElement
// NOTE: This DOES NOT transform event handlers into YngwieController objects:
export default function YngwieTransform (html) {
  return walkNode(typeof(html) === "string" ? toNode(html) : html);
}

// :: STRING -> NODE
// Transforms string of HTML into client-side DOM node:
function toNode(html) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  return doc.body.firstElementChild;
}

// :: NODE, NODE, node.nodeType -> VOID
// Creates an instance of YngwieElement from the given node and all of it's desendents:
// NOTE: Inspired by Crockford's DOM walking algorithm from "Javascript:The Good Parts"
function walkNode(node, result) {

  if (node.nodeType === 1) {
    let attribs = getAttributes(node);
    let elem = new YngwieElement(node.tagName, attribs);
    result = result === undefined
      ? elem
      : result.append(elem);
  }

  if (node.nodeType === 3) {
    let textNode = new YngwieTextNode(node.nodeValue);
    result = result === undefined
      ? textNode
      : result.append(textNode);
  }

  node = node.firstChild;

  while (node) {
    let child = walkNode(node);
    if (child !== undefined) {
        result.append(child);
    }
    node = node.nextSibling;
  }

  return result;

}

// :: DOMElement -> OBJECT
// Returns OBJECT of attributes from the given DOM Element:
function getAttributes(elem) {
  return Array.from(elem.attributes).reduce((result, attrib) => {
    result[attrib.name] = attrib.value;
    return result;
  }, {});
}
