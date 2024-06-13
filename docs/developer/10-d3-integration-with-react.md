# D3.js integration into React components

The challenge of integrating D3.js with React is that React and D3 both control the DOM.
The entire select/enter/exit/update D3 pattern is in direct conflict with React and its virtual
DOM strategy.

## The Black-box technique

The solution implemented in LODEX is to wrap the D3 code in a component that will be
rendered and handled by React. To do this we use React to render a SVG (our blackbox)
and use D3 to fill it on React events.

This method allows us to create exactly what we want as D3 element and we have the
benefit to be able to use the same kind of code as the many examples available on the
web.

To do this correctly, we have to be careful about some points due to the React and D3
logics.

## Base of the component

Our component must render a blackbox for D3 so we will put a SVG during the render()
event:

```jsx
render() {
    const { width, height, margin } = this.state;
    return (
        <div id="divContainer"
             ref={this.divContainer}
             style={styles.divContainer}>
        <svg id="svgContainer"
             ref={this.svgContainer}
             width={width}
             height={height}>
        </svg>
        </div>
    );
}
```

We define some methods to append and remove D3 elements to this SVG container. For
example we can create two main methods `setChart()` and `removeChart()` which are the
methods to append all the chart to the `svgContainer` and to remove it.

We want the chart to have the capacity to update its size (e.g.: the user resizes the
window so the charts have to adapt itself to the new size). To do so we define a method
`updateDimensions()` which remove and redraw the chart at the right size.

For example:

```javascript
updateDimensions() {
    this.removeGraph();
    this.setGraph();
}
```

We can have other methods which will be called from those main methods. For example
a function `setAxisScale()` which will be called from `setChart()`.

## React events

When we have these main methods we want to call it at the right time. To do this
properly we use React events to create, remove and resize the chart.

- `componentDidUpdate()` is the main entry point to append the chart to our black
box, that's in this event that we will call `setChart()` method because our
component will already have all its datas updated like the input datas for the chart
and other required informations.

- `componentWillUpdate()` is the place where we remove the chart by calling
`removeChart()`, like so the we will correctly update the chart when an update
appears, throught thoses update events.

- `componentDidMount()` is useful to setup the chart at the begin of the component
lifecycle throught `setChart()` and we will bind our previous method
`updateDimensions()` to resize like so :
```javascript
window.addEventListener('resize', this.updateDimensions.bind(this))
```

- `componentWillUnmount()` will allow us to remove the chart properly at the end
of the component lifecycle using `removeChart()` and to remove the resize
event binding like so :
```javascript
window.removeEventListener('resize',this.updateDimensions.bind(this))
```

## Important precisions

### React Refs

Refs are a way to access DOM nodes of React elements created on the render method.
They are useful to us because they point directly on an element of the component. For
example we have a Ref: `<svg id="svgContainer" ref={this.svgContainer}>` which
point on the `svgContainer` (our blackbox) we defined in the render part.

To append an element or modify it with D3.js we can use the ref to select it and don't
use the id, e.g.:
```javascript
d3.select(this.svgContainer.current).attr('width', svgWidth);
```

The benefit of using React Refs is the direct link from the ref to the HTML node element,
using it avoids issues if we have multiple instances of our component on the same page.
Indeed with multiple instances we could have multiple element with the same id and a
D3 `select()` will return all these instances so a modification on one of our component
will affect all the others.

### Unique id

Because of the D3.js logic, particularly the select method, we can have some problems
with multiples component instances. In some cases we can use the React Refs like
explained before but sometimes we have to use select and other D3 method with HTML
class or id.

A solution to avoid conflicts problems is to define a unique id for the component instance.
To do so we use a function to generate the unique id:
```javascript
function generateUniqueId(length = 8) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('',);
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
```

Then we call this function in the constructor of our component to have a unique id by
instance:
```javascript
constructor(props) {
    super(props);
    this.uniqueId = generateUniqueId();
}
```

The last step is to use this unique id next to the original id of an html element like so:
```javascript
Element.attr('id', `mask${this.uniqueId}`)
```

And we can use it this way:
```javascript
Element.attr('clip-path', `url(#mask${this.uniqueId})`)
```

Doing this doesn't had a lot of complexity and allow us to use the method `select('id')` of
D3.js without creating conflicts between multiple instances.
