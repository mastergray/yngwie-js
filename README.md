# yngwie
A declarative approach to generating client-side HTML using it's own virtual DOM implementation.

## What Is This?

It's pretty much a virtual DOM, in that the [YngwieElement](https://github.com/mastergray/yngwie-js/wiki/Yngwie.Element) class can represent DOM [elements](https://developer.mozilla.org/en-US/docs/Web/API/Element), can create and manipulate those elements without them being part of the DOM, and can render those elements into actual DOM nodes. It can also do the reverse though, using [YngwieTransform](https://github.com/mastergray/yngwie-js/wiki/Yngwie.Transform) to generate yngwieElements from existing DOM nodes, or generate yngwieElements from a STRING of HTML markup, e.g. `<div>HTML Content</div>`. Read more [here](https://github.com/mastergray/yngwie-js/wiki/What-Is-This%3F#what-is-this).


## How To Use This
**yngwie** is built as an [ES6 module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), so you can't just *require* it with nodejs - nor would you want to since it's intended to run client-side in the browser. The two primary use cases then are to either include [yngwie.js](https://github.com/mastergray/yngwie-js/blob/main/dist/yngwie.js) as an external source with a `SCRIPT` tag or install from [NPM](https://www.npmjs.com/package/yngwie) and import the module into your project with [webpack](https://webpack.js.org/guides/getting-started/) using something like `import * as Yngwie from "yngwie"`.

## Examples

Creating elements and rendering them to the `BODY` element of a page:

```javascript
Yngwie.Element.renderTo("BODY", [
  Yngwie.Element.init("HEADER").appends([
    Yngwie.Element.init("DIV", {"class":"banner"}, "[Banner]")
    Yngwie.Element.init("NAV").appends([
      Yngwie.Element.init("A", {"href":"/some/page/link/URL"}, "Link 1"),
      Yngwie.Element.init("A", {"href":"/some/page/link/URL"}, "Link 2"),
      Yngwie.Element.init("A", {"href":"/some/page/link/URL"}, "Link 3")
    ]);
  ]);
]);

/*

  <!-- Result of render -->

  <body>
    <header>
      <div class="banner">[Banner]</div>
      <nav>
        <a href="/some/page/link/URL">Link 1</a>
        <a href="/some/page/link/URL">Link 1</a>
        <a href="/some/page/link/URL">Link 1</a>
      </nav>
    </header>
  </body>

*/
```

Transforming a STRING of HTML into a YngwieElement, binding a click event listener, then rendering result to the `BODY` of a page:

```javascript
Yngwie.Transform.toYNGWIE(`
  <ul>
    <li data-item="Item 1">Item 1</li>
    <li data-item="Item 2">Item 2</li>
    <li data-item="Item 3">Item 3</li>
  </ul>
`)
.on("click", evt => {
  if (evt.target.nodeType === 1 && evt.target.hasAttribute("data-item")) {
    console.log(evt.target.getAttribute("data-item"));
  }
})
.render("BODY");
```

See some not so great examples [here](https://github.com/mastergray/yngwie-js/tree/main/test). Otherwise, the API docs for [Yngiwe.Element](https://github.com/mastergray/yngwie-js/wiki/Yngwie.Element) are a good place to start.

## API
See the full API [here](https://github.com/mastergray/yngwie-js/wiki/API).
