/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;
/******/
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.loaded = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./tests/main.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

    /**
     * @author Stanislav Kalashnik <darkpark.main@gmail.com>
     * @license GNU GENERAL PUBLIC LICENSE Version 3
     */

    'use strict';

    /* jshint undef:false */

    // dependencies
    var Emitter = __webpack_require__(/*! ../index */ 1);


    // declare named module
    QUnit.module('emitter');


    test('constructor', function testConstructor () {
        var em;

        em = new Emitter();
        strictEqual(typeof em.events, 'object', 'type');
        strictEqual(em.events.constructor, Object, 'constructor type');
        strictEqual(Object.keys(em.events).length, 0, 'keys');
    });


    test('addListener', function testAddListener () {
        var f1 = function () {},
            f2 = function () {},
            em;

        em = new Emitter();
        em.addListener();
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');
        em.addListener('click');
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');
        em.addListener('click', 123);
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em = new Emitter();
        em.addListener('click', f1);
        strictEqual(Object.keys(em.events).length, 1, 'one event');
        strictEqual(Array.isArray(em.events.click), true, 'event list type');
        strictEqual(em.events.click.length, 1, 'callbacks amount');
        strictEqual(typeof em.events.click[0], 'function', 'new callback type');
        strictEqual(em.events.click[0], f1, 'new callback link');

        em.addListener('click', f2);
        strictEqual(em.events.click.length, 2, 'callbacks amount');
        strictEqual(typeof em.events.click[1], 'function', 'new callback type 2');
        strictEqual(em.events.click[1], f2, 'new callback link 2');

        em = new Emitter();
        em.addListener('click', f1);
        em.addListener('click', f1);
        em.addListener('click', f1);
        strictEqual(em.events.click.length, 3, 'callbacks duplicates');
    });


    test('addListeners', function testAddListeners () {
        var f1 = function () {},
            f2 = function () {},
            em;

        em = new Emitter();
        em.addListeners();
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners([]);
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners('');
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners(true);
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners(false);
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners(undefined);
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({});
        strictEqual(Object.keys(em.events).length, 0, 'empty add');

        em.addListeners({click:123});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:[]});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:false});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:null});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:undefined});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:'123'});
        strictEqual(Object.keys(em.events).length, 0, 'wrong add');

        em.addListeners({click:f1});
        strictEqual(Object.keys(em.events).length, 1, 'normal add');
        strictEqual(em.events.click.length, 1, 'callbacks amount');

        em.addListeners({click:f1});
        strictEqual(Object.keys(em.events).length, 1, 'double add');
        strictEqual(em.events.click.length, 2, 'callbacks amount');

        em = new Emitter();
        em.addListeners({click:f1, close:f2, ok:f1});
        strictEqual(Object.keys(em.events).length, 3, 'double add');
        strictEqual(em.events.click.length, 1, 'callbacks amount');
        strictEqual(em.events.close.length, 1, 'callbacks amount');
        strictEqual(em.events.ok.length, 1, 'callbacks amount');
        strictEqual(em.events.click[0], f1, 'callback link');
        strictEqual(em.events.close[0], f2, 'callback link');
        strictEqual(em.events.ok[0], f1, 'callback link');
    });


    test('removeListener', function testRemoveListener () {
        var f1 = function () {},
            f2 = function () {},
            f3 = function () {},
            em;

        em = new Emitter();
        em.addListeners({click:f1, close:f2, ok:f1});
        strictEqual(Object.keys(em.events).length, 3, 'add 3 events');

        em.removeListener('click', f2);
        strictEqual(Object.keys(em.events).length, 3, 'wrong removal');
        strictEqual(em.events.click.length, 1, 'callbacks amount');

        em.removeListener('click', f3);
        strictEqual(Object.keys(em.events).length, 3, 'wrong removal');
        strictEqual(em.events.click.length, 1, 'callbacks amount');

        em.removeListener('click', f1);
        strictEqual(Object.keys(em.events).length, 2, 'normal removal');
        strictEqual(em.events.click, undefined, 'no event name');

        em = new Emitter();
        em.addListener('click', f1);
        em.addListener('click', f1);
        em.addListener('click', f1);
        strictEqual(em.events.click.length, 3, 'callbacks duplicates');
        em.removeListener('click', f1);
        strictEqual(em.events.click, undefined, 'callbacks duplicates');
        em.removeListener('click', f1);
        strictEqual(em.events.click, undefined, 'double removal');
    });


    test('removeAllListeners', function testRemoveAllListeners () {
        var f1 = function () {},
            f2 = function () {},
            em;

        em = new Emitter();
        em.addListener('click', f1);
        em.addListener('click', f2);
        strictEqual(em.events.click.length, 2, 'init');
        em.removeAllListeners('click');
        strictEqual(em.events.click, undefined, 'removal');

        em = new Emitter();
        em.addListener('click', f1);
        em.addListener('click', f2);
        em.addListener('close', f1);
        em.addListener('close', f2);
        strictEqual(em.events.click.length, 2, 'init');
        strictEqual(em.events.close.length, 2, 'init');
        em.removeAllListeners('click');
        em.removeAllListeners('close');
        strictEqual(em.events.click, undefined, 'removal');
        strictEqual(em.events.close, undefined, 'removal');
        em.removeAllListeners('click');
        em.removeAllListeners('close');
        strictEqual(em.events.click, undefined, 'double removal');
        strictEqual(em.events.close, undefined, 'double removal');

        em = new Emitter();
        em.addListener('click', f1);
        em.addListener('click', f2);
        em.addListener('close', f1);
        em.addListener('close', f2);
        strictEqual(Object.keys(em.events).length, 2, 'init');
        strictEqual(em.events.click.length, 2, 'init');
        strictEqual(em.events.close.length, 2, 'init');
        em.removeAllListeners();
        strictEqual(Object.keys(em.events).length, 0, 'removal');
        em.removeAllListeners();
        strictEqual(Object.keys(em.events).length, 0, 'double removal');
    });


    test('emit', function testEmit () {
        var em;

        expect(9);

        em = new Emitter();
        em.addListener('e1', function ( data ) {
            strictEqual(data, undefined, 'emit without data');
        });
        em.addListener('e2', function ( data ) {
            strictEqual(data, 123, 'emit with data');
        });
        em.addListener('e3', function ( data ) {
            propEqual(data, {a:1,b:2,c:3}, 'emit with complex data');
        });
        strictEqual(em.events.e1.length, 1, 'init');
        strictEqual(em.events.e2.length, 1, 'init');
        strictEqual(em.events.e3.length, 1, 'init');

        em.emit('e1');
        em.emit('e2', 123);
        em.emit('e3', {a:1,b:2,c:3});

        em.emit('e1');
        em.emit('e2', 123);
        em.emit('e3', {a:1,b:2,c:3});

        em.emit();
        em.emit(null);
        em.emit(false);
        em.emit(undefined);

        em.removeAllListeners();
        em.emit('e1');
        em.emit('e2', 123);
        em.emit('e3', {a:1,b:2,c:3});
    });


    test('once', function testOnce () {
        var em;

        expect(7);

        em = new Emitter();
        em.once('e1', function ( data ) {
            strictEqual(data, undefined, 'emit without data');
        });
        em.once('e2', function ( data ) {
            strictEqual(data, 123, 'emit with data');
        });
        em.once('e3', function ( data ) {
            propEqual(data, {a:1,b:2,c:3}, 'emit with complex data');
        });
        strictEqual(em.events.e1.length, 1, 'init');
        strictEqual(em.events.e2.length, 1, 'init');
        strictEqual(em.events.e3.length, 1, 'init');

        em.emit('e1');
        em.emit('e2', 123);
        em.emit('e3', {a:1,b:2,c:3});

        em.emit('e1');
        em.emit('e2', 123);
        em.emit('e3', {a:1,b:2,c:3});

        strictEqual(Object.keys(em.events).length, 0, 'no events');
    });


/***/ },
/* 1 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

    /* WEBPACK VAR INJECTION */(function(__filename) {/**
     * @module stb-emitter
     *
     * @author Stanislav Kalashnik <darkpark.main@gmail.com>
     * @license GNU GENERAL PUBLIC LICENSE Version 3
     */

    'use strict';


    /**
     * Base Events Emitter implementation.
     *
     * @see http://nodejs.org/api/events.html
     * @constructor
     *
     * @example
     * var emitter = new Emitter();
     */
    function Emitter () {
        if ( true ) {
            if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
        }

        /**
         * Inner hash table for event names and linked callbacks.
         * Manual editing should be avoided.
         *
         * @member {Object.<string, function[]>}
         *
         * @example
         * {
         *     click: [
         *         function click1 () { ... },
         *         function click2 () { ... }
         *     ],
         *     keydown: [
         *         function () { ... }
         *     ]
         * }
         **/
        this.events = {};
    }


    Emitter.prototype = {
        /**
         * Bind an event to the given callback function.
         * The same callback function can be added multiple times for the same event name.
         *
         * @param {string} name event identifier
         * @param {function} callback function to call on this event
         *
         * @example
         * emitter.addListener('click', function ( data ) { ... });
         * // one more click handler
         * emitter.addListener('click', function ( data ) { ... });
         */
        addListener: function ( name, callback ) {
            if ( true ) {
                if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
                if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
                if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
            }

            // initialization may be required
            this.events[name] = this.events[name] || [];
            // append this new event to the list
            this.events[name].push(callback);
        },


        /**
         * Add a one time listener for the event.
         * This listener is invoked only the next time the event is fired, after which it is removed.
         *
         * @param {string} name event identifier
         * @param {function} callback function to call on this event
         *
         * @example
         * emitter.once('click', function ( data ) { ... });
         */
        once: function ( name, callback ) {
            // current execution context
            var self = this;

            if ( true ) {
                if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
                if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
                if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
            }

            // initialization may be required
            this.events[name] = this.events[name] || [];
            // append this new event to the list
            this.events[name].push(function onceWrapper ( data ) {
                callback(data);
                self.removeListener(name, onceWrapper);
            });
        },


        /**
         * Apply multiple listeners at once.
         *
         * @param {Object} callbacks event names with callbacks
         *
         * @example
         * emitter.addListeners({
         *     click: function ( data ) {},
         *     close: function ( data ) {}
         * });
         */
        addListeners: function ( callbacks ) {
            var name;

            if ( true ) {
                if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
                if ( typeof callbacks !== 'object' ) { throw new Error(__filename + ': wrong callbacks type'); }
                if ( Object.keys(callbacks).length === 0 ) { throw new Error(__filename + ': no callbacks given'); }
            }

            for ( name in callbacks ) {
                if ( callbacks.hasOwnProperty(name) ) {
                    this.addListener(name, callbacks[name]);
                }
            }
        },


        /**
         * Remove all instances of the given callback.
         *
         * @param {string} name event identifier
         * @param {function} callback function to remove
         *
         * @example
         * emitter.removeListener('click', func1);
         */
        removeListener: function ( name, callback ) {
            if ( true ) {
                if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
                if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
                if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
                if ( this.events[name] && !Array.isArray(this.events[name]) ) { throw new Error(__filename + ': corrupted inner data'); }
            }

            // the event exists and should have some callbacks
            if ( this.events[name] ) {
                // rework the callback list to exclude the given one
                this.events[name] = this.events[name].filter(function callbacksFilter ( fn ) { return fn !== callback; });
                // event has no more callbacks so clean it
                if ( this.events[name].length === 0 ) {
                    // as if there were no listeners at all
                    this.events[name] = undefined;
                }
            }
        },


        /**
         * Remove all callbacks for the given event name.
         * Without event name clears all events.
         *
         * @param {string} [name] event identifier
         *
         * @example
         * emitter.removeAllListeners('click');
         * emitter.removeAllListeners();
         */
        removeAllListeners: function ( name ) {
            if ( true ) {
                if ( arguments.length !== 0 && (typeof name !== 'string' || name.length === 0) ) { throw new Error(__filename + ': wrong or empty name'); }
            }

            // check input
            if ( arguments.length === 0 ) {
                // no arguments so remove everything
                this.events = {};
            } else if ( name ) {
                if ( true ) {
                    if ( this.events[name] ) { throw new Error(__filename + ': event is not removed'); }
                }

                // only name is given so remove all callbacks for the given event
                // but object structure modification should be avoided
                this.events[name] = undefined;
            }
        },


        /**
         * Execute each of the listeners in the given order with the supplied arguments.
         *
         * @param {string} name event identifier
         * @param {Object} [data] options to send
         *
         * @todo consider use context
         *
         * @example
         * emitter.emit('init');
         * emitter.emit('click', {src: panel1, dst: panel2});
         *
         * // it's a good idea to emit event only when there are some listeners
         * if ( this.events['click'] ) {
         *     this.emit('click', {event: event});
         * }
         */
        emit: function ( name, data ) {
            var event = this.events[name],
                i;

            if ( true ) {
                if ( arguments.length < 1 ) { throw new Error(__filename + ': wrong arguments number'); }
                if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
            }

            // the event exists and should have some callbacks
            if ( event ) {
                if ( true ) {
                    if ( !Array.isArray(event) ) { throw new Error(__filename + ': wrong event type'); }
                }

                for ( i = 0; i < event.length; i++ ) {
                    if ( true ) {
                        if ( typeof event[i] !== 'function' ) { throw new Error(__filename + ': wrong event callback type'); }
                    }

                    // invoke the callback with parameters
                    // http://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/6
                    event[i].call(this, data);
                }
            }
        }
    };

    // correct constructor name
    Emitter.prototype.constructor = Emitter;


    if ( true ) {
        // expose to the global scope
        window.Emitter = Emitter;
    }


    // public
    module.exports = Emitter;

    /* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map
