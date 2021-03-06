/**
 * @license The MIT License (MIT)
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 */

/* eslint no-path-concat: 0 */

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
    console.assert(typeof this === 'object', 'must be constructed via new');

    // if ( DEVELOP ) {
    //     if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
    // }

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
     * @param {string} name - event identifier
     * @param {Function} callback - function to call on this event
     *
     * @example
     * emitter.addListener('click', function ( data ) { ... });
     * // one more click handler
     * emitter.addListener('click', function ( data ) { ... });
     */
    addListener: function ( name, callback ) {
        console.assert(arguments.length === 2, 'wrong arguments number');
        console.assert(typeof name === 'string', 'wrong name type');
        console.assert(name.length > 0, 'empty name');
        console.assert(typeof callback === 'function', 'callback should be a function');

        // if ( DEVELOP ) {
        //     if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
        //     if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
        //     if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
        // }

        // initialization may be required
        this.events[name] = this.events[name] || [];
        // append this new event to the list
        this.events[name].push(callback);
    },


    /**
     * Add a one time listener for the event.
     * This listener is invoked only the next time the event is fired, after which it is removed.
     *
     * @param {string} name - event identifier
     * @param {Function} callback - function to call on this event
     *
     * @example
     * emitter.once('click', function ( data ) { ... });
     */
    once: function ( name, callback ) {
        // current execution context
        var self = this;

        if ( DEVELOP ) {
            if ( arguments.length !== 2 ) {
                throw new Error(__filename + ': wrong arguments number');
            }
            if ( typeof name !== 'string' || name.length === 0 ) {
                throw new Error(__filename + ': wrong or empty name');
            }
            if ( typeof callback !== 'function' ) {
                throw new Error(__filename + ': wrong callback type');
            }
        }

        // initialization may be required
        this.events[name] = this.events[name] || [];
        // append this new event to the list
        this.events[name].push(function onceWrapper () {
            self.removeListener(name, onceWrapper);
            callback.apply(self, arguments);
        });
    },


    /**
     * Apply multiple listeners at once.
     *
     * @param {Object} callbacks - event names with callbacks
     *
     * @example
     * emitter.addListeners({
     *     click: function ( data ) {},
     *     close: function ( data ) {}
     * });
     */
    addListeners: function ( callbacks ) {
        var name;

        if ( DEVELOP ) {
            if ( arguments.length !== 1 ) {
                throw new Error(__filename + ': wrong arguments number');
            }
            if ( typeof callbacks !== 'object' ) {
                throw new Error(__filename + ': wrong callbacks type');
            }
            if ( Object.keys(callbacks).length === 0 ) {
                throw new Error(__filename + ': no callbacks given');
            }
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
     * @param {string} name - event identifier
     * @param {Function} callback - function to remove
     *
     * @example
     * emitter.removeListener('click', func1);
     */
    removeListener: function ( name, callback ) {
        if ( DEVELOP ) {
            if ( arguments.length !== 2 ) {
                throw new Error(__filename + ': wrong arguments number');
            }
            if ( typeof name !== 'string' || name.length === 0 ) {
                throw new Error(__filename + ': wrong or empty name');
            }
            if ( typeof callback !== 'function' ) {
                throw new Error(__filename + ': wrong callback type');
            }
            if ( this.events[name] && !Array.isArray(this.events[name]) ) {
                throw new Error(__filename + ': corrupted inner data');
            }
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
     *
     * @deprecated
     */
    /*removeAllListeners: function ( name ) {
        if ( DEVELOP ) {
            if ( arguments.length !== 0 && (typeof name !== 'string' || name.length === 0) ) {
                throw new Error(__filename + ': wrong or empty name');
            }
        }

        // check input
        if ( arguments.length === 0 ) {
            // no arguments so remove everything
            this.events = {};
        } else if ( name ) {
            if ( DEVELOP ) {
                if ( this.events[name] ) { throw new Error(__filename + ': event is not removed'); }
            }

            // only name is given so remove all callbacks for the given event
            // but object structure modification should be avoided
            this.events[name] = undefined;
        }
    },*/


    /**
     * Execute each of the listeners in the given order with the supplied arguments.
     *
     * @param {string} name - event identifier
     *
     * @example
     * emitter.emit('init');
     * emitter.emit('click', {src: panel1, dst: panel2});
     * emitter.emit('load', error, data);
     *
     * // it's a good idea to emit event only when there are some listeners
     * if ( this.events['click'] ) {
     *     this.emit('click', {event: event});
     * }
     */
    emit: function ( name ) {
        var event = this.events[name],
            index;

        if ( DEVELOP ) {
            if ( arguments.length < 1 ) {
                throw new Error(__filename + ': wrong arguments number');
            }
            if ( typeof name !== 'string' || name.length === 0 ) {
                throw new Error(__filename + ': wrong or empty name');
            }
        }

        // the event exists and should have some callbacks
        if ( event ) {
            if ( DEVELOP ) {
                if ( !Array.isArray(event) ) {
                    throw new Error(__filename + ': wrong event type');
                }
            }

            for ( index = 0; index < event.length; index++ ) {
                if ( DEVELOP ) {
                    if ( typeof event[index] !== 'function' ) {
                        throw new Error(__filename + ': wrong event callback type');
                    }
                }

                // invoke the callback with parameters
                event[index].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    }
};


// public
module.exports = Emitter;
