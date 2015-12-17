Basic events emitter implementation
===================================

[![NPM version](https://img.shields.io/npm/v/cjs-emitter.svg?style=flat-square)](https://www.npmjs.com/package/cjs-emitter)
[![Dependencies Status](https://img.shields.io/david/cjssdk/emitter.svg?style=flat-square)](https://david-dm.org/cjssdk/emitter)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/cjssdk)


Almost all components in STB SDK emit events: a [Model](https://github.com/cjssdk/model) emits an event each time an attribute is set, a [router](https://github.com/stbsdk/router) emits an event when a page is opened.
All components which emit events are instances of `Emitter`.

Typically, there aren't any strict restrictions on event names, as any string will be accepted. Usually it's a lowercase string with no spaces. Possible values: `click`, `move`, `focus:item`.

Functions can then be attached to objects, to be executed when an event is emitted. These functions are called listeners. Inside a listener function, this refers to the `Emitter` that the listener was attached to.


## Installation

```bash
npm install cjs-emitter
```


## Usage

Add the constructor to the scope:

```js
var Emitter = require('cjs-emitter');
```

Create an instance:

```js
var emitter = new Emitter();
```

Add listeners for some events:

```js
emitter.addListener('click', function ( data ) { ... });
emitter.addListener('click', function ( data ) { ... });
```

Add listener that will be notified only one time:

```js
emitter.once('click', function ( data ) { ... });
```

Add multiple listeners at once:

```js
emitter.addListeners({
    click: function ( data ) {},
    close: function ( data ) {}
});
```

Remove all instances of the given callback:

```js
emitter.removeListener('click', func1);
```

Remove all callbacks for the given event name:

```js
emitter.removeListener('click');
```

Clears all events:

```js
emitter.removeListener();
```

Execute each of the listeners in the given order with the supplied arguments:

```js
emitter.emit('init');
emitter.emit('click', {src: panel1, dst: panel2});
emitter.emit('load', error, data);
```


## Performance notes

It's a good idea to emit event only when there are some listeners:

```js
if ( emitter.events['click'] ) {
	// notify listeners
    emitter.emit('click', {event: event});
}
```


## Debug mode

> There is a global var `DEBUG` which activates additional consistency checks and protection logic not available in release mode.


## Contribution

If you have any problem or suggestion please open an issue [here](https://github.com/cjssdk/emitter/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License

`cjs-emitter` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
