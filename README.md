# [littlehand](http://i.imgur.com/MQfM7uH.gif)
### A Shorthand Component syntax for Angular 2

A util to quickly and conveniently create dumb little components.

##### Install
`npm i littlehand`


##### Usage
```js
import little from 'littlehand'

// API
// little(selector: string, template: string): Component;

const Product = little('my-product', `
  <div class="Product">
    <h4 class="Product--name">{{ name }}</h4>
    <button class="Product--buyBtn" (click)="buy.emit()">{{ buyText }}</button>
  </div>    
`);

// little auto-infers the inputs and outputs of your component
// so it found two inputs: name, buyText
// and one output: buy

// Go ahead and use it, it's just a normal Component.
@Component({
  selector: 'my-app',
  directives: [Product],
  template: `<my-product name="Toothpaste" buyText="Buy Now!" (buy)="onBuy()">`
})
class MyApp {}
```
