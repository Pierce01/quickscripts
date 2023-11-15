var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../promptUI/node_modules/async/internal/once.js
var require_once = __commonJS({
  "../promptUI/node_modules/async/internal/once.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = once;
    function once(fn) {
      function wrapper(...args) {
        if (fn === null)
          return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
      }
      Object.assign(wrapper, fn);
      return wrapper;
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/isArrayLike.js
var require_isArrayLike = __commonJS({
  "../promptUI/node_modules/async/internal/isArrayLike.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isArrayLike;
    function isArrayLike(value2) {
      return value2 && typeof value2.length === "number" && value2.length >= 0 && value2.length % 1 === 0;
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/getIterator.js
var require_getIterator = __commonJS({
  "../promptUI/node_modules/async/internal/getIterator.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = function(coll) {
      return coll[Symbol.iterator] && coll[Symbol.iterator]();
    };
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/iterator.js
var require_iterator = __commonJS({
  "../promptUI/node_modules/async/internal/iterator.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = createIterator;
    var _isArrayLike = require_isArrayLike();
    var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
    var _getIterator = require_getIterator();
    var _getIterator2 = _interopRequireDefault(_getIterator);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function createArrayIterator(coll) {
      var i2 = -1;
      var len = coll.length;
      return function next() {
        return ++i2 < len ? { value: coll[i2], key: i2 } : null;
      };
    }
    function createES2015Iterator(iterator) {
      var i2 = -1;
      return function next() {
        var item2 = iterator.next();
        if (item2.done)
          return null;
        i2++;
        return { value: item2.value, key: i2 };
      };
    }
    function createObjectIterator(obj) {
      var okeys = obj ? Object.keys(obj) : [];
      var i2 = -1;
      var len = okeys.length;
      return function next() {
        var key = okeys[++i2];
        if (key === "__proto__") {
          return next();
        }
        return i2 < len ? { value: obj[key], key } : null;
      };
    }
    function createIterator(coll) {
      if ((0, _isArrayLike2.default)(coll)) {
        return createArrayIterator(coll);
      }
      var iterator = (0, _getIterator2.default)(coll);
      return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/onlyOnce.js
var require_onlyOnce = __commonJS({
  "../promptUI/node_modules/async/internal/onlyOnce.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = onlyOnce;
    function onlyOnce(fn) {
      return function(...args) {
        if (fn === null)
          throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
      };
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/initialParams.js
var require_initialParams = __commonJS({
  "../promptUI/node_modules/async/internal/initialParams.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = function(fn) {
      return function(...args) {
        var callback = args.pop();
        return fn.call(this, args, callback);
      };
    };
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/setImmediate.js
var require_setImmediate = __commonJS({
  "../promptUI/node_modules/async/internal/setImmediate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.fallback = fallback;
    exports2.wrap = wrap;
    var hasQueueMicrotask = exports2.hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
    var hasSetImmediate = exports2.hasSetImmediate = typeof setImmediate === "function" && setImmediate;
    var hasNextTick = exports2.hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
    function fallback(fn) {
      setTimeout(fn, 0);
    }
    function wrap(defer) {
      return (fn, ...args) => defer(() => fn(...args));
    }
    var _defer;
    if (hasQueueMicrotask) {
      _defer = queueMicrotask;
    } else if (hasSetImmediate) {
      _defer = setImmediate;
    } else if (hasNextTick) {
      _defer = process.nextTick;
    } else {
      _defer = fallback;
    }
    exports2.default = wrap(_defer);
  }
});

// ../promptUI/node_modules/async/asyncify.js
var require_asyncify = __commonJS({
  "../promptUI/node_modules/async/asyncify.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = asyncify;
    var _initialParams = require_initialParams();
    var _initialParams2 = _interopRequireDefault(_initialParams);
    var _setImmediate = require_setImmediate();
    var _setImmediate2 = _interopRequireDefault(_setImmediate);
    var _wrapAsync = require_wrapAsync();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function asyncify(func) {
      if ((0, _wrapAsync.isAsync)(func)) {
        return function(...args) {
          const callback = args.pop();
          const promise = func.apply(this, args);
          return handlePromise(promise, callback);
        };
      }
      return (0, _initialParams2.default)(function(args, callback) {
        var result;
        try {
          result = func.apply(this, args);
        } catch (e) {
          return callback(e);
        }
        if (result && typeof result.then === "function") {
          return handlePromise(result, callback);
        } else {
          callback(null, result);
        }
      });
    }
    function handlePromise(promise, callback) {
      return promise.then((value2) => {
        invokeCallback(callback, null, value2);
      }, (err) => {
        invokeCallback(callback, err && err.message ? err : new Error(err));
      });
    }
    function invokeCallback(callback, error, value2) {
      try {
        callback(error, value2);
      } catch (err) {
        (0, _setImmediate2.default)((e) => {
          throw e;
        }, err);
      }
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/wrapAsync.js
var require_wrapAsync = __commonJS({
  "../promptUI/node_modules/async/internal/wrapAsync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isAsyncIterable = exports2.isAsyncGenerator = exports2.isAsync = void 0;
    var _asyncify = require_asyncify();
    var _asyncify2 = _interopRequireDefault(_asyncify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function isAsync(fn) {
      return fn[Symbol.toStringTag] === "AsyncFunction";
    }
    function isAsyncGenerator(fn) {
      return fn[Symbol.toStringTag] === "AsyncGenerator";
    }
    function isAsyncIterable(obj) {
      return typeof obj[Symbol.asyncIterator] === "function";
    }
    function wrapAsync(asyncFn) {
      if (typeof asyncFn !== "function")
        throw new Error("expected a function");
      return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
    }
    exports2.default = wrapAsync;
    exports2.isAsync = isAsync;
    exports2.isAsyncGenerator = isAsyncGenerator;
    exports2.isAsyncIterable = isAsyncIterable;
  }
});

// ../promptUI/node_modules/async/internal/breakLoop.js
var require_breakLoop = __commonJS({
  "../promptUI/node_modules/async/internal/breakLoop.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var breakLoop = {};
    exports2.default = breakLoop;
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/asyncEachOfLimit.js
var require_asyncEachOfLimit = __commonJS({
  "../promptUI/node_modules/async/internal/asyncEachOfLimit.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = asyncEachOfLimit;
    var _breakLoop = require_breakLoop();
    var _breakLoop2 = _interopRequireDefault(_breakLoop);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function asyncEachOfLimit(generator, limit, iteratee, callback) {
      let done = false;
      let canceled = false;
      let awaiting = false;
      let running = 0;
      let idx = 0;
      function replenish() {
        if (running >= limit || awaiting || done)
          return;
        awaiting = true;
        generator.next().then(({ value: value2, done: iterDone }) => {
          if (canceled || done)
            return;
          awaiting = false;
          if (iterDone) {
            done = true;
            if (running <= 0) {
              callback(null);
            }
            return;
          }
          running++;
          iteratee(value2, idx, iterateeCallback);
          idx++;
          replenish();
        }).catch(handleError);
      }
      function iterateeCallback(err, result) {
        running -= 1;
        if (canceled)
          return;
        if (err)
          return handleError(err);
        if (err === false) {
          done = true;
          canceled = true;
          return;
        }
        if (result === _breakLoop2.default || done && running <= 0) {
          done = true;
          return callback(null);
        }
        replenish();
      }
      function handleError(err) {
        if (canceled)
          return;
        awaiting = false;
        done = true;
        callback(err);
      }
      replenish();
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/eachOfLimit.js
var require_eachOfLimit = __commonJS({
  "../promptUI/node_modules/async/internal/eachOfLimit.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _once = require_once();
    var _once2 = _interopRequireDefault(_once);
    var _iterator = require_iterator();
    var _iterator2 = _interopRequireDefault(_iterator);
    var _onlyOnce = require_onlyOnce();
    var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
    var _wrapAsync = require_wrapAsync();
    var _asyncEachOfLimit = require_asyncEachOfLimit();
    var _asyncEachOfLimit2 = _interopRequireDefault(_asyncEachOfLimit);
    var _breakLoop = require_breakLoop();
    var _breakLoop2 = _interopRequireDefault(_breakLoop);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports2.default = (limit) => {
      return (obj, iteratee, callback) => {
        callback = (0, _once2.default)(callback);
        if (limit <= 0) {
          throw new RangeError("concurrency limit cannot be less than 1");
        }
        if (!obj) {
          return callback(null);
        }
        if ((0, _wrapAsync.isAsyncGenerator)(obj)) {
          return (0, _asyncEachOfLimit2.default)(obj, limit, iteratee, callback);
        }
        if ((0, _wrapAsync.isAsyncIterable)(obj)) {
          return (0, _asyncEachOfLimit2.default)(obj[Symbol.asyncIterator](), limit, iteratee, callback);
        }
        var nextElem = (0, _iterator2.default)(obj);
        var done = false;
        var canceled = false;
        var running = 0;
        var looping = false;
        function iterateeCallback(err, value2) {
          if (canceled)
            return;
          running -= 1;
          if (err) {
            done = true;
            callback(err);
          } else if (err === false) {
            done = true;
            canceled = true;
          } else if (value2 === _breakLoop2.default || done && running <= 0) {
            done = true;
            return callback(null);
          } else if (!looping) {
            replenish();
          }
        }
        function replenish() {
          looping = true;
          while (running < limit && !done) {
            var elem = nextElem();
            if (elem === null) {
              done = true;
              if (running <= 0) {
                callback(null);
              }
              return;
            }
            running += 1;
            iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
          }
          looping = false;
        }
        replenish();
      };
    };
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/withoutIndex.js
var require_withoutIndex = __commonJS({
  "../promptUI/node_modules/async/internal/withoutIndex.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = _withoutIndex;
    function _withoutIndex(iteratee) {
      return (value2, index, callback) => iteratee(value2, callback);
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/awaitify.js
var require_awaitify = __commonJS({
  "../promptUI/node_modules/async/internal/awaitify.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = awaitify;
    function awaitify(asyncFn, arity = asyncFn.length) {
      if (!arity)
        throw new Error("arity is undefined");
      function awaitable(...args) {
        if (typeof args[arity - 1] === "function") {
          return asyncFn.apply(this, args);
        }
        return new Promise((resolve4, reject) => {
          args[arity - 1] = (err, ...cbArgs) => {
            if (err)
              return reject(err);
            resolve4(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
          };
          asyncFn.apply(this, args);
        });
      }
      return awaitable;
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/eachLimit.js
var require_eachLimit = __commonJS({
  "../promptUI/node_modules/async/eachLimit.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _eachOfLimit = require_eachOfLimit();
    var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
    var _withoutIndex = require_withoutIndex();
    var _withoutIndex2 = _interopRequireDefault(_withoutIndex);
    var _wrapAsync = require_wrapAsync();
    var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
    var _awaitify = require_awaitify();
    var _awaitify2 = _interopRequireDefault(_awaitify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eachLimit(coll, limit, iteratee, callback) {
      return (0, _eachOfLimit2.default)(limit)(coll, (0, _withoutIndex2.default)((0, _wrapAsync2.default)(iteratee)), callback);
    }
    exports2.default = (0, _awaitify2.default)(eachLimit, 4);
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/eachSeries.js
var require_eachSeries = __commonJS({
  "../promptUI/node_modules/async/eachSeries.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _eachLimit = require_eachLimit();
    var _eachLimit2 = _interopRequireDefault(_eachLimit);
    var _awaitify = require_awaitify();
    var _awaitify2 = _interopRequireDefault(_awaitify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eachSeries(coll, iteratee, callback) {
      return (0, _eachLimit2.default)(coll, 1, iteratee, callback);
    }
    exports2.default = (0, _awaitify2.default)(eachSeries, 3);
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/filter.js
var require_filter = __commonJS({
  "../promptUI/node_modules/async/internal/filter.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = _filter;
    var _isArrayLike = require_isArrayLike();
    var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
    var _wrapAsync = require_wrapAsync();
    var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function filterArray(eachfn, arr, iteratee, callback) {
      var truthValues = new Array(arr.length);
      eachfn(arr, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
          truthValues[index] = !!v;
          iterCb(err);
        });
      }, (err) => {
        if (err)
          return callback(err);
        var results = [];
        for (var i2 = 0; i2 < arr.length; i2++) {
          if (truthValues[i2])
            results.push(arr[i2]);
        }
        callback(null, results);
      });
    }
    function filterGeneric(eachfn, coll, iteratee, callback) {
      var results = [];
      eachfn(coll, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
          if (err)
            return iterCb(err);
          if (v) {
            results.push({ index, value: x });
          }
          iterCb(err);
        });
      }, (err) => {
        if (err)
          return callback(err);
        callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
      });
    }
    function _filter(eachfn, coll, iteratee, callback) {
      var filter = (0, _isArrayLike2.default)(coll) ? filterArray : filterGeneric;
      return filter(eachfn, coll, (0, _wrapAsync2.default)(iteratee), callback);
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/internal/reject.js
var require_reject = __commonJS({
  "../promptUI/node_modules/async/internal/reject.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = reject;
    var _filter = require_filter();
    var _filter2 = _interopRequireDefault(_filter);
    var _wrapAsync = require_wrapAsync();
    var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function reject(eachfn, arr, _iteratee, callback) {
      const iteratee = (0, _wrapAsync2.default)(_iteratee);
      return (0, _filter2.default)(eachfn, arr, (value2, cb) => {
        iteratee(value2, (err, v) => {
          cb(err, !v);
        });
      }, callback);
    }
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/eachOfLimit.js
var require_eachOfLimit2 = __commonJS({
  "../promptUI/node_modules/async/eachOfLimit.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _eachOfLimit2 = require_eachOfLimit();
    var _eachOfLimit3 = _interopRequireDefault(_eachOfLimit2);
    var _wrapAsync = require_wrapAsync();
    var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
    var _awaitify = require_awaitify();
    var _awaitify2 = _interopRequireDefault(_awaitify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eachOfLimit(coll, limit, iteratee, callback) {
      return (0, _eachOfLimit3.default)(limit)(coll, (0, _wrapAsync2.default)(iteratee), callback);
    }
    exports2.default = (0, _awaitify2.default)(eachOfLimit, 4);
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/eachOfSeries.js
var require_eachOfSeries = __commonJS({
  "../promptUI/node_modules/async/eachOfSeries.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _eachOfLimit = require_eachOfLimit2();
    var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
    var _awaitify = require_awaitify();
    var _awaitify2 = _interopRequireDefault(_awaitify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function eachOfSeries(coll, iteratee, callback) {
      return (0, _eachOfLimit2.default)(coll, 1, iteratee, callback);
    }
    exports2.default = (0, _awaitify2.default)(eachOfSeries, 3);
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/async/rejectSeries.js
var require_rejectSeries = __commonJS({
  "../promptUI/node_modules/async/rejectSeries.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    var _reject2 = require_reject();
    var _reject3 = _interopRequireDefault(_reject2);
    var _eachOfSeries = require_eachOfSeries();
    var _eachOfSeries2 = _interopRequireDefault(_eachOfSeries);
    var _awaitify = require_awaitify();
    var _awaitify2 = _interopRequireDefault(_awaitify);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function rejectSeries(coll, iteratee, callback) {
      return (0, _reject3.default)(_eachOfSeries2.default, coll, iteratee, callback);
    }
    exports2.default = (0, _awaitify2.default)(rejectSeries, 3);
    module2.exports = exports2["default"];
  }
});

// ../promptUI/node_modules/mute-stream/mute.js
var require_mute = __commonJS({
  "../promptUI/node_modules/mute-stream/mute.js"(exports2, module2) {
    var Stream = require("stream");
    module2.exports = MuteStream;
    function MuteStream(opts) {
      Stream.apply(this);
      opts = opts || {};
      this.writable = this.readable = true;
      this.muted = false;
      this.on("pipe", this._onpipe);
      this.replace = opts.replace;
      this._prompt = opts.prompt || null;
      this._hadControl = false;
    }
    MuteStream.prototype = Object.create(Stream.prototype);
    Object.defineProperty(MuteStream.prototype, "constructor", {
      value: MuteStream,
      enumerable: false
    });
    MuteStream.prototype.mute = function() {
      this.muted = true;
    };
    MuteStream.prototype.unmute = function() {
      this.muted = false;
    };
    Object.defineProperty(MuteStream.prototype, "_onpipe", {
      value: onPipe,
      enumerable: false,
      writable: true,
      configurable: true
    });
    function onPipe(src) {
      this._src = src;
    }
    Object.defineProperty(MuteStream.prototype, "isTTY", {
      get: getIsTTY,
      set: setIsTTY,
      enumerable: true,
      configurable: true
    });
    function getIsTTY() {
      return this._dest ? this._dest.isTTY : this._src ? this._src.isTTY : false;
    }
    function setIsTTY(isTTY) {
      Object.defineProperty(this, "isTTY", {
        value: isTTY,
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
    Object.defineProperty(MuteStream.prototype, "rows", {
      get: function() {
        return this._dest ? this._dest.rows : this._src ? this._src.rows : void 0;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(MuteStream.prototype, "columns", {
      get: function() {
        return this._dest ? this._dest.columns : this._src ? this._src.columns : void 0;
      },
      enumerable: true,
      configurable: true
    });
    MuteStream.prototype.pipe = function(dest, options) {
      this._dest = dest;
      return Stream.prototype.pipe.call(this, dest, options);
    };
    MuteStream.prototype.pause = function() {
      if (this._src)
        return this._src.pause();
    };
    MuteStream.prototype.resume = function() {
      if (this._src)
        return this._src.resume();
    };
    MuteStream.prototype.write = function(c) {
      if (this.muted) {
        if (!this.replace)
          return true;
        if (c.match(/^\u001b/)) {
          if (c.indexOf(this._prompt) === 0) {
            c = c.substr(this._prompt.length);
            c = c.replace(/./g, this.replace);
            c = this._prompt + c;
          }
          this._hadControl = true;
          return this.emit("data", c);
        } else {
          if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
            this._hadControl = false;
            this.emit("data", this._prompt);
            c = c.substr(this._prompt.length);
          }
          c = c.toString().replace(/./g, this.replace);
        }
      }
      this.emit("data", c);
    };
    MuteStream.prototype.end = function(c) {
      if (this.muted) {
        if (c && this.replace) {
          c = c.toString().replace(/./g, this.replace);
        } else {
          c = null;
        }
      }
      if (c)
        this.emit("data", c);
      this.emit("end");
    };
    function proxy(fn) {
      return function() {
        var d = this._dest;
        var s = this._src;
        if (d && d[fn])
          d[fn].apply(d, arguments);
        if (s && s[fn])
          s[fn].apply(s, arguments);
      };
    }
    MuteStream.prototype.destroy = proxy("destroy");
    MuteStream.prototype.destroySoon = proxy("destroySoon");
    MuteStream.prototype.close = proxy("close");
  }
});

// ../promptUI/node_modules/read/lib/read.js
var require_read = __commonJS({
  "../promptUI/node_modules/read/lib/read.js"(exports2, module2) {
    module2.exports = read;
    var readline = require("readline");
    var Mute = require_mute();
    function read(opts, cb) {
      if (opts.num) {
        throw new Error("read() no longer accepts a char number limit");
      }
      if (typeof opts.default !== "undefined" && typeof opts.default !== "string" && typeof opts.default !== "number") {
        throw new Error("default value must be string or number");
      }
      var input = opts.input || process.stdin;
      var output = opts.output || process.stdout;
      var prompt2 = (opts.prompt || "").trim() + " ";
      var silent = opts.silent;
      var editDef = false;
      var timeout = opts.timeout;
      var def = opts.default || "";
      if (def) {
        if (silent) {
          prompt2 += "(<default hidden>) ";
        } else if (opts.edit) {
          editDef = true;
        } else {
          prompt2 += "(" + def + ") ";
        }
      }
      var terminal = !!(opts.terminal || output.isTTY);
      var m = new Mute({ replace: opts.replace, prompt: prompt2 });
      m.pipe(output, { end: false });
      output = m;
      var rlOpts = { input, output, terminal };
      if (process.version.match(/^v0\.6/)) {
        var rl = readline.createInterface(rlOpts.input, rlOpts.output);
      } else {
        var rl = readline.createInterface(rlOpts);
      }
      output.unmute();
      rl.setPrompt(prompt2);
      rl.prompt();
      if (silent) {
        output.mute();
      } else if (editDef) {
        rl.line = def;
        rl.cursor = def.length;
        rl._refreshLine();
      }
      var called = false;
      rl.on("line", onLine);
      rl.on("error", onError);
      rl.on("SIGINT", function() {
        rl.close();
        onError(new Error("canceled"));
      });
      var timer;
      if (timeout) {
        timer = setTimeout(function() {
          onError(new Error("timed out"));
        }, timeout);
      }
      function done() {
        called = true;
        rl.close();
        if (process.version.match(/^v0\.6/)) {
          rl.input.removeAllListeners("data");
          rl.input.removeAllListeners("keypress");
          rl.input.pause();
        }
        clearTimeout(timer);
        output.mute();
        output.end();
      }
      function onError(er) {
        if (called)
          return;
        done();
        return cb(er);
      }
      function onLine(line) {
        if (called)
          return;
        if (silent && terminal) {
          output.unmute();
          output.write("\r\n");
        }
        done();
        line = line.replace(/\r?\n$/, "");
        var isDefault = !!(editDef && line === def);
        if (def && !line) {
          isDefault = true;
          line = def;
        }
        cb(null, line, isDefault);
      }
    }
  }
});

// ../promptUI/node_modules/revalidator/lib/revalidator.js
var require_revalidator = __commonJS({
  "../promptUI/node_modules/revalidator/lib/revalidator.js"(exports2, module2) {
    (function(exports3) {
      exports3.validate = validate;
      exports3.mixin = mixin;
      function validate(object, schema, options) {
        options = mixin({}, options, validate.defaults);
        var errors = [];
        validateObject(object, schema, options, errors);
        return {
          valid: !errors.length,
          errors
        };
      }
      ;
      validate.defaults = {
        /**
         * <p>
         * Enforce 'format' constraints.
         * </p><p>
         * <em>Default: <code>true</code></em>
         * </p>
         */
        validateFormats: true,
        /**
         * <p>
         * When {@link #validateFormats} is <code>true</code>,
         * treat unrecognized formats as validation errors.
         * </p><p>
         * <em>Default: <code>false</code></em>
         * </p>
         *
         * @see validation.formats for default supported formats.
         */
        validateFormatsStrict: false,
        /**
         * <p>
         * When {@link #validateFormats} is <code>true</code>,
         * also validate formats defined in {@link #validate.formatExtensions}.
         * </p><p>
         * <em>Default: <code>true</code></em>
         * </p>
         */
        validateFormatExtensions: true
      };
      validate.messages = {
        required: "is required",
        allowEmpty: "must not be empty",
        minLength: "is too short (minimum is %{expected} characters)",
        maxLength: "is too long (maximum is %{expected} characters)",
        pattern: "invalid input",
        minimum: "must be greater than or equal to %{expected}",
        maximum: "must be less than or equal to %{expected}",
        exclusiveMinimum: "must be greater than %{expected}",
        exclusiveMaximum: "must be less than %{expected}",
        divisibleBy: "must be divisible by %{expected}",
        minItems: "must contain more than %{expected} items",
        maxItems: "must contain less than %{expected} items",
        uniqueItems: "must hold a unique set of values",
        format: "is not a valid %{expected}",
        conform: "must conform to given constraint",
        type: "must be of %{expected} type"
      };
      validate.messages["enum"] = "must be present in given enumerator";
      validate.formats = {
        "email": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "ip-address": /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
        "ipv6": /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
        "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
        "date": /^\d{4}-\d{2}-\d{2}$/,
        "time": /^\d{2}:\d{2}:\d{2}$/,
        "color": /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
        //'style':        (not supported)
        //'phone':        (not supported)
        //'uri':          (not supported)
        "host-name": /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
        "utc-millisec": {
          test: function(value2) {
            return typeof value2 === "number" && value2 >= 0;
          }
        },
        "regex": {
          test: function(value2) {
            try {
              new RegExp(value2);
            } catch (e) {
              return false;
            }
            return true;
          }
        }
      };
      validate.formatExtensions = {
        "url": /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
      };
      function mixin(obj) {
        var sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          var source = sources.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== "object") {
            throw new TypeError("mixin non-object");
          }
          for (var p in source) {
            if (source.hasOwnProperty(p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      }
      ;
      function validateObject(object, schema, options, errors) {
        var props, allProps = Object.keys(object), visitedProps = [];
        if (schema.properties) {
          props = schema.properties;
          for (var p in props) {
            if (props.hasOwnProperty(p)) {
              visitedProps.push(p);
              validateProperty(object, object[p], p, props[p], options, errors);
            }
          }
        }
        if (schema.patternProperties) {
          props = schema.patternProperties;
          for (var p in props) {
            if (props.hasOwnProperty(p)) {
              var re = new RegExp(p);
              for (var k in object) {
                if (object.hasOwnProperty(k)) {
                  visitedProps.push(k);
                  if (re.exec(k) !== null) {
                    validateProperty(object, object[k], p, props[p], options, errors);
                  }
                }
              }
            }
          }
        }
        if (void 0 !== schema.additionalProperties) {
          var i2, l;
          var unvisitedProps = allProps.filter(function(k2) {
            return -1 === visitedProps.indexOf(k2);
          });
          if (schema.additionalProperties === false && unvisitedProps.length > 0) {
            for (i2 = 0, l = unvisitedProps.length; i2 < l; i2++) {
              error("additionalProperties", unvisitedProps[i2], object[unvisitedProps[i2]], false, errors);
            }
          } else if (typeof schema.additionalProperties == "object" && unvisitedProps.length > 0) {
            for (i2 = 0, l = unvisitedProps.length; i2 < l; i2++) {
              validateProperty(object, object[unvisitedProps[i2]], unvisitedProps[i2], schema.unvisitedProperties, options, errors);
            }
          }
        }
      }
      ;
      function validateProperty(object, value2, property, schema, options, errors) {
        var format, valid, spec, type;
        function constrain(name2, value3, assert) {
          if (schema[name2] !== void 0 && !assert(value3, schema[name2])) {
            error(name2, property, value3, schema, errors);
          }
        }
        if (value2 === void 0) {
          if (schema.required && schema.type !== "any") {
            return error("required", property, void 0, schema, errors);
          } else {
            return;
          }
        }
        if (options.cast) {
          if (("integer" === schema.type || "number" === schema.type) && value2 == +value2) {
            value2 = +value2;
            object[property] = value2;
          }
          if ("boolean" === schema.type) {
            if ("true" === value2 || "1" === value2 || 1 === value2) {
              value2 = true;
              object[property] = value2;
            }
            if ("false" === value2 || "0" === value2 || 0 === value2) {
              value2 = false;
              object[property] = value2;
            }
          }
        }
        if (schema.format && options.validateFormats) {
          format = schema.format;
          if (options.validateFormatExtensions) {
            spec = validate.formatExtensions[format];
          }
          if (!spec) {
            spec = validate.formats[format];
          }
          if (!spec) {
            if (options.validateFormatsStrict) {
              return error("format", property, value2, schema, errors);
            }
          } else {
            if (!spec.test(value2)) {
              return error("format", property, value2, schema, errors);
            }
          }
        }
        if (schema["enum"] && schema["enum"].indexOf(value2) === -1) {
          error("enum", property, value2, schema, errors);
        }
        if (typeof schema.dependencies === "string" && object[schema.dependencies] === void 0) {
          error("dependencies", property, null, schema, errors);
        }
        if (isArray(schema.dependencies)) {
          for (var i2 = 0, l = schema.dependencies.length; i2 < l; i2++) {
            if (object[schema.dependencies[i2]] === void 0) {
              error("dependencies", property, null, schema, errors);
            }
          }
        }
        if (typeof schema.dependencies === "object") {
          validateObject(object, schema.dependencies, options, errors);
        }
        checkType(value2, schema.type, function(err, type2) {
          if (err)
            return error("type", property, typeof value2, schema, errors);
          constrain("conform", value2, function(a, e) {
            return e(a, object);
          });
          switch (type2 || (isArray(value2) ? "array" : typeof value2)) {
            case "string":
              constrain("allowEmpty", value2, function(a, e) {
                return e ? e : a !== "";
              });
              constrain("minLength", value2.length, function(a, e) {
                return a >= e;
              });
              constrain("maxLength", value2.length, function(a, e) {
                return a <= e;
              });
              constrain("pattern", value2, function(a, e) {
                e = typeof e === "string" ? e = new RegExp(e) : e;
                return e.test(a);
              });
              break;
            case "integer":
            case "number":
              constrain("minimum", value2, function(a, e) {
                return a >= e;
              });
              constrain("maximum", value2, function(a, e) {
                return a <= e;
              });
              constrain("exclusiveMinimum", value2, function(a, e) {
                return a > e;
              });
              constrain("exclusiveMaximum", value2, function(a, e) {
                return a < e;
              });
              constrain("divisibleBy", value2, function(a, e) {
                var multiplier = Math.max((a - Math.floor(a)).toString().length - 2, (e - Math.floor(e)).toString().length - 2);
                multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;
                return a * multiplier % (e * multiplier) === 0;
              });
              break;
            case "array":
              constrain("items", value2, function(a, e) {
                for (var i3 = 0, l2 = a.length; i3 < l2; i3++) {
                  validateProperty(object, a[i3], property, e, options, errors);
                }
                return true;
              });
              constrain("minItems", value2, function(a, e) {
                return a.length >= e;
              });
              constrain("maxItems", value2, function(a, e) {
                return a.length <= e;
              });
              constrain("uniqueItems", value2, function(a) {
                var h = {};
                for (var i3 = 0, l2 = a.length; i3 < l2; i3++) {
                  var key = JSON.stringify(a[i3]);
                  if (h[key])
                    return false;
                  h[key] = true;
                }
                return true;
              });
              break;
            case "object":
              if (schema.properties || schema.patternProperties || schema.additionalProperties) {
                validateObject(value2, schema, options, errors);
              }
              break;
          }
        });
      }
      ;
      function checkType(val, type, callback) {
        var result = false, types = isArray(type) ? type : [type];
        if (type === void 0)
          return callback(null, type);
        for (var i2 = 0, l = types.length; i2 < l; i2++) {
          type = types[i2].toLowerCase().trim();
          if (type === "string" ? typeof val === "string" : type === "array" ? isArray(val) : type === "object" ? val && typeof val === "object" && !isArray(val) : type === "number" ? typeof val === "number" : type === "integer" ? typeof val === "number" && ~~val === val : type === "null" ? val === null : type === "boolean" ? typeof val === "boolean" : type === "date" ? isDate(val) : type === "any" ? typeof val !== "undefined" : false) {
            return callback(null, type);
          }
        }
        ;
        callback(true);
      }
      ;
      function error(attribute, property, actual, schema, errors) {
        var lookup = { expected: schema[attribute], actual, attribute, property };
        var message = schema.messages && schema.messages[attribute] || schema.message || validate.messages[attribute] || "no default message";
        message = message.replace(/%\{([a-z]+)\}/ig, function(_, match) {
          return lookup[match.toLowerCase()] || "";
        });
        errors.push({
          attribute,
          property,
          expected: schema[attribute],
          actual,
          message
        });
      }
      ;
      function isArray(value2) {
        var s = typeof value2;
        if (s === "object") {
          if (value2) {
            if (typeof value2.length === "number" && !value2.propertyIsEnumerable("length") && typeof value2.splice === "function") {
              return true;
            }
          }
        }
        return false;
      }
      function isDate(value2) {
        var s = typeof value2;
        if (s === "object") {
          if (value2) {
            if (typeof value2.getTime === "function") {
              return true;
            }
          }
        }
        return false;
      }
    })(typeof module2 === "object" && module2 && module2.exports ? module2.exports : window);
  }
});

// ../promptUI/node_modules/winston/package.json
var require_package = __commonJS({
  "../promptUI/node_modules/winston/package.json"(exports2, module2) {
    module2.exports = {
      name: "winston",
      description: "A multi-transport async logging library for Node.js",
      version: "2.4.7",
      author: "Charlie Robbins <charlie.robbins@gmail.com>",
      maintainers: [
        "Jarrett Cruger <jcrugzz@gmail.com>",
        "Alberto Pose <albertopose@gmail.com>"
      ],
      repository: {
        type: "git",
        url: "https://github.com/winstonjs/winston.git"
      },
      keywords: [
        "winston",
        "logging",
        "sysadmin",
        "tools"
      ],
      dependencies: {
        async: "^2.6.4",
        colors: "1.0.x",
        cycle: "1.0.x",
        eyes: "0.1.x",
        isstream: "0.1.x",
        "stack-trace": "0.0.x"
      },
      devDependencies: {
        "cross-spawn-async": "^2.0.0",
        hock: "1.x.x",
        "std-mocks": "~1.0.0",
        vows: "0.7.x"
      },
      main: "./lib/winston",
      scripts: {
        test: "vows --dot-matrix --isolate"
      },
      types: "./index.d.ts",
      engines: {
        node: ">= 0.10.0"
      },
      license: "MIT"
    };
  }
});

// ../promptUI/node_modules/cycle/cycle.js
var require_cycle = __commonJS({
  "../promptUI/node_modules/cycle/cycle.js"(exports, module) {
    var cycle = exports;
    cycle.decycle = function decycle(object) {
      "use strict";
      var objects = [], paths = [];
      return function derez(value2, path4) {
        var i2, name2, nu;
        if (typeof value2 === "object" && value2 !== null && !(value2 instanceof Boolean) && !(value2 instanceof Date) && !(value2 instanceof Number) && !(value2 instanceof RegExp) && !(value2 instanceof String)) {
          for (i2 = 0; i2 < objects.length; i2 += 1) {
            if (objects[i2] === value2) {
              return { $ref: paths[i2] };
            }
          }
          objects.push(value2);
          paths.push(path4);
          if (Object.prototype.toString.apply(value2) === "[object Array]") {
            nu = [];
            for (i2 = 0; i2 < value2.length; i2 += 1) {
              nu[i2] = derez(value2[i2], path4 + "[" + i2 + "]");
            }
          } else {
            nu = {};
            for (name2 in value2) {
              if (Object.prototype.hasOwnProperty.call(value2, name2)) {
                nu[name2] = derez(
                  value2[name2],
                  path4 + "[" + JSON.stringify(name2) + "]"
                );
              }
            }
          }
          return nu;
        }
        return value2;
      }(object, "$");
    };
    cycle.retrocycle = function retrocycle($) {
      "use strict";
      var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
      (function rez(value) {
        var i, item, name, path;
        if (value && typeof value === "object") {
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            for (i = 0; i < value.length; i += 1) {
              item = value[i];
              if (item && typeof item === "object") {
                path = item.$ref;
                if (typeof path === "string" && px.test(path)) {
                  value[i] = eval(path);
                } else {
                  rez(item);
                }
              }
            }
          } else {
            for (name in value) {
              if (typeof value[name] === "object") {
                item = value[name];
                if (item) {
                  path = item.$ref;
                  if (typeof path === "string" && px.test(path)) {
                    value[name] = eval(path);
                  } else {
                    rez(item);
                  }
                }
              }
            }
          }
        }
      })($);
      return $;
    };
  }
});

// ../promptUI/node_modules/colors/lib/styles.js
var require_styles = __commonJS({
  "../promptUI/node_modules/colors/lib/styles.js"(exports2, module2) {
    var styles = {};
    module2["exports"] = styles;
    var codes = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(codes).forEach(function(key) {
      var val = codes[key];
      var style = styles[key] = [];
      style.open = "\x1B[" + val[0] + "m";
      style.close = "\x1B[" + val[1] + "m";
    });
  }
});

// ../promptUI/node_modules/colors/lib/system/supports-colors.js
var require_supports_colors = __commonJS({
  "../promptUI/node_modules/colors/lib/system/supports-colors.js"(exports2, module2) {
    var argv = process.argv;
    module2.exports = function() {
      if (argv.indexOf("--no-color") !== -1 || argv.indexOf("--color=false") !== -1) {
        return false;
      }
      if (argv.indexOf("--color") !== -1 || argv.indexOf("--color=true") !== -1 || argv.indexOf("--color=always") !== -1) {
        return true;
      }
      if (process.stdout && !process.stdout.isTTY) {
        return false;
      }
      if (process.platform === "win32") {
        return true;
      }
      if ("COLORTERM" in process.env) {
        return true;
      }
      if (process.env.TERM === "dumb") {
        return false;
      }
      if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
        return true;
      }
      return false;
    }();
  }
});

// ../promptUI/node_modules/colors/lib/custom/trap.js
var require_trap = __commonJS({
  "../promptUI/node_modules/colors/lib/custom/trap.js"(exports2, module2) {
    module2["exports"] = function runTheTrap(text, options) {
      var result = "";
      text = text || "Run the trap, drop the bass";
      text = text.split("");
      var trap = {
        a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
        b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
        c: ["\xA9", "\u023B", "\u03FE"],
        d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
        e: ["\xCB", "\u0115", "\u018E", "\u0258", "\u03A3", "\u03BE", "\u04BC", "\u0A6C"],
        f: ["\u04FA"],
        g: ["\u0262"],
        h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
        i: ["\u0F0F"],
        j: ["\u0134"],
        k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
        l: ["\u0139"],
        m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
        n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
        o: ["\xD8", "\xF5", "\xF8", "\u01FE", "\u0298", "\u047A", "\u05DD", "\u06DD", "\u0E4F"],
        p: ["\u01F7", "\u048E"],
        q: ["\u09CD"],
        r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
        s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
        t: ["\u0141", "\u0166", "\u0373"],
        u: ["\u01B1", "\u054D"],
        v: ["\u05D8"],
        w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
        x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
        y: ["\xA5", "\u04B0", "\u04CB"],
        z: ["\u01B5", "\u0240"]
      };
      text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [" "];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== "undefined") {
          result += trap[c][rand];
        } else {
          result += c;
        }
      });
      return result;
    };
  }
});

// ../promptUI/node_modules/colors/lib/custom/zalgo.js
var require_zalgo = __commonJS({
  "../promptUI/node_modules/colors/lib/custom/zalgo.js"(exports2, module2) {
    module2["exports"] = function zalgo(text, options) {
      text = text || "   he is here   ";
      var soul = {
        "up": [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A"
        ],
        "down": [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323"
        ],
        "mid": [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489"
        ]
      }, all = [].concat(soul.up, soul.down, soul.mid), zalgo2 = {};
      function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
      }
      function is_char(character) {
        var bool = false;
        all.filter(function(i2) {
          bool = i2 === character;
        });
        return bool;
      }
      function heComes(text2, options2) {
        var result = "", counts, l;
        options2 = options2 || {};
        options2["up"] = options2["up"] || true;
        options2["mid"] = options2["mid"] || true;
        options2["down"] = options2["down"] || true;
        options2["size"] = options2["size"] || "maxi";
        text2 = text2.split("");
        for (l in text2) {
          if (is_char(l)) {
            continue;
          }
          result = result + text2[l];
          counts = { "up": 0, "down": 0, "mid": 0 };
          switch (options2.size) {
            case "mini":
              counts.up = randomNumber(8);
              counts.min = randomNumber(2);
              counts.down = randomNumber(8);
              break;
            case "maxi":
              counts.up = randomNumber(16) + 3;
              counts.min = randomNumber(4) + 1;
              counts.down = randomNumber(64) + 3;
              break;
            default:
              counts.up = randomNumber(8) + 1;
              counts.mid = randomNumber(6) / 2;
              counts.down = randomNumber(8) + 1;
              break;
          }
          var arr = ["up", "mid", "down"];
          for (var d in arr) {
            var index = arr[d];
            for (var i2 = 0; i2 <= counts[index]; i2++) {
              if (options2[index]) {
                result = result + soul[index][randomNumber(soul[index].length)];
              }
            }
          }
        }
        return result;
      }
      return heComes(text);
    };
  }
});

// ../promptUI/node_modules/colors/lib/maps/america.js
var require_america = __commonJS({
  "../promptUI/node_modules/colors/lib/maps/america.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = function() {
      return function(letter, i2, exploded) {
        if (letter === " ")
          return letter;
        switch (i2 % 3) {
          case 0:
            return colors.red(letter);
          case 1:
            return colors.white(letter);
          case 2:
            return colors.blue(letter);
        }
      };
    }();
  }
});

// ../promptUI/node_modules/colors/lib/maps/zebra.js
var require_zebra = __commonJS({
  "../promptUI/node_modules/colors/lib/maps/zebra.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = function(letter, i2, exploded) {
      return i2 % 2 === 0 ? letter : colors.inverse(letter);
    };
  }
});

// ../promptUI/node_modules/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS({
  "../promptUI/node_modules/colors/lib/maps/rainbow.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = function() {
      var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
      return function(letter, i2, exploded) {
        if (letter === " ") {
          return letter;
        } else {
          return colors[rainbowColors[i2++ % rainbowColors.length]](letter);
        }
      };
    }();
  }
});

// ../promptUI/node_modules/colors/lib/maps/random.js
var require_random = __commonJS({
  "../promptUI/node_modules/colors/lib/maps/random.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = function() {
      var available = ["underline", "inverse", "grey", "yellow", "red", "green", "blue", "white", "cyan", "magenta"];
      return function(letter, i2, exploded) {
        return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
      };
    }();
  }
});

// ../promptUI/node_modules/colors/lib/colors.js
var require_colors = __commonJS({
  "../promptUI/node_modules/colors/lib/colors.js"(exports2, module2) {
    var colors = {};
    module2["exports"] = colors;
    colors.themes = {};
    var ansiStyles = colors.styles = require_styles();
    var defineProps = Object.defineProperties;
    colors.supportsColor = require_supports_colors();
    if (typeof colors.enabled === "undefined") {
      colors.enabled = colors.supportsColor;
    }
    colors.stripColors = colors.strip = function(str) {
      return ("" + str).replace(/\x1B\[\d+m/g, "");
    };
    var stylize = colors.stylize = function stylize2(str, style) {
      return ansiStyles[style].open + str + ansiStyles[style].close;
    };
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    var escapeStringRegexp = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
    function build(_styles) {
      var builder = function builder2() {
        return applyStyle.apply(builder2, arguments);
      };
      builder._styles = _styles;
      builder.__proto__ = proto;
      return builder;
    }
    var styles = function() {
      var ret = {};
      ansiStyles.grey = ansiStyles.gray;
      Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
        ret[key] = {
          get: function() {
            return build(this._styles.concat(key));
          }
        };
      });
      return ret;
    }();
    var proto = defineProps(function colors2() {
    }, styles);
    function applyStyle() {
      var args = arguments;
      var argsLen = args.length;
      var str = argsLen !== 0 && String(arguments[0]);
      if (argsLen > 1) {
        for (var a = 1; a < argsLen; a++) {
          str += " " + args[a];
        }
      }
      if (!colors.enabled || !str) {
        return str;
      }
      var nestedStyles = this._styles;
      var i2 = nestedStyles.length;
      while (i2--) {
        var code = ansiStyles[nestedStyles[i2]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
      }
      return str;
    }
    function applyTheme(theme) {
      for (var style in theme) {
        (function(style2) {
          colors[style2] = function(str) {
            return colors[theme[style2]](str);
          };
        })(style);
      }
    }
    colors.setTheme = function(theme) {
      if (typeof theme === "string") {
        try {
          colors.themes[theme] = require(theme);
          applyTheme(colors.themes[theme]);
          return colors.themes[theme];
        } catch (err) {
          console.log(err);
          return err;
        }
      } else {
        applyTheme(theme);
      }
    };
    function init() {
      var ret = {};
      Object.keys(styles).forEach(function(name2) {
        ret[name2] = {
          get: function() {
            return build([name2]);
          }
        };
      });
      return ret;
    }
    var sequencer = function sequencer2(map2, str) {
      var exploded = str.split(""), i2 = 0;
      exploded = exploded.map(map2);
      return exploded.join("");
    };
    colors.trap = require_trap();
    colors.zalgo = require_zalgo();
    colors.maps = {};
    colors.maps.america = require_america();
    colors.maps.zebra = require_zebra();
    colors.maps.rainbow = require_rainbow();
    colors.maps.random = require_random();
    for (map in colors.maps) {
      (function(map2) {
        colors[map2] = function(str) {
          return sequencer(colors.maps[map2], str);
        };
      })(map);
    }
    var map;
    defineProps(colors, init());
  }
});

// ../promptUI/node_modules/colors/safe.js
var require_safe = __commonJS({
  "../promptUI/node_modules/colors/safe.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = colors;
  }
});

// ../promptUI/node_modules/winston/lib/winston/config/cli-config.js
var require_cli_config = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/config/cli-config.js"(exports2) {
    var cliConfig = exports2;
    cliConfig.levels = {
      error: 0,
      warn: 1,
      help: 2,
      data: 3,
      info: 4,
      debug: 5,
      prompt: 6,
      verbose: 7,
      input: 8,
      silly: 9
    };
    cliConfig.colors = {
      error: "red",
      warn: "yellow",
      help: "cyan",
      data: "grey",
      info: "green",
      debug: "blue",
      prompt: "grey",
      verbose: "cyan",
      input: "grey",
      silly: "magenta"
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/config/npm-config.js
var require_npm_config = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/config/npm-config.js"(exports2) {
    var npmConfig = exports2;
    npmConfig.levels = {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
    };
    npmConfig.colors = {
      error: "red",
      warn: "yellow",
      info: "green",
      verbose: "cyan",
      debug: "blue",
      silly: "magenta"
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/config/syslog-config.js
var require_syslog_config = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/config/syslog-config.js"(exports2) {
    var syslogConfig = exports2;
    syslogConfig.levels = {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    };
    syslogConfig.colors = {
      emerg: "red",
      alert: "yellow",
      crit: "red",
      error: "red",
      warning: "red",
      notice: "yellow",
      info: "green",
      debug: "blue"
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/config.js
var require_config = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/config.js"(exports2) {
    var colors = require_safe();
    colors.enabled = true;
    var config = exports2;
    var allColors = exports2.allColors = {};
    config.addColors = function(colors2) {
      mixin(allColors, colors2);
    };
    config.colorize = function(level, message) {
      if (typeof message === "undefined")
        message = level;
      var colorized = message;
      if (allColors[level] instanceof Array) {
        for (var i2 = 0, l = allColors[level].length; i2 < l; ++i2) {
          colorized = colors[allColors[level][i2]](colorized);
        }
      } else if (allColors[level].match(/\s/)) {
        var colorArr = allColors[level].split(/\s+/);
        for (var i2 = 0; i2 < colorArr.length; ++i2) {
          colorized = colors[colorArr[i2]](colorized);
        }
        allColors[level] = colorArr;
      } else {
        colorized = colors[allColors[level]](colorized);
      }
      return colorized;
    };
    config.cli = require_cli_config();
    config.npm = require_npm_config();
    config.syslog = require_syslog_config();
    config.addColors(config.cli.colors);
    config.addColors(config.npm.colors);
    config.addColors(config.syslog.colors);
    function mixin(target) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.forEach(function(a) {
        var keys = Object.keys(a);
        for (var i2 = 0; i2 < keys.length; i2++) {
          target[keys[i2]] = a[keys[i2]];
        }
      });
      return target;
    }
  }
});

// ../promptUI/node_modules/winston/lib/winston/common.js
var require_common = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/common.js"(exports2) {
    var util = require("util");
    var crypto = require("crypto");
    var cycle2 = require_cycle();
    var fs = require("fs");
    var StringDecoder = require("string_decoder").StringDecoder;
    var Stream = require("stream").Stream;
    var config = require_config();
    exports2.setLevels = function(target, past, current, isDefault) {
      var self2 = this;
      if (past) {
        Object.keys(past).forEach(function(level) {
          delete target[level];
        });
      }
      target.levels = current || config.npm.levels;
      if (target.padLevels) {
        target.levelLength = exports2.longestElement(Object.keys(target.levels));
      }
      Object.keys(target.levels).forEach(function(level) {
        if (level === "log") {
          console.warn('Log level named "log" will clash with the method "log". Consider using a different name.');
          return;
        }
        target[level] = function(msg) {
          var args = [level].concat(Array.prototype.slice.call(arguments));
          target.log.apply(target, args);
        };
      });
      return target;
    };
    exports2.longestElement = function(xs) {
      return Math.max.apply(
        null,
        xs.map(function(x) {
          return x.length;
        })
      );
    };
    exports2.clone = function(obj) {
      if (obj instanceof Error) {
        var copy = { message: obj.message };
        Object.getOwnPropertyNames(obj).forEach(function(key) {
          copy[key] = obj[key];
        });
        return cycle2.decycle(copy);
      } else if (!(obj instanceof Object)) {
        return obj;
      } else if (obj instanceof Date) {
        return new Date(obj.getTime());
      }
      return clone(cycle2.decycle(obj));
    };
    function clone(obj) {
      var copy = Array.isArray(obj) ? [] : {};
      for (var i2 in obj) {
        if (obj.hasOwnProperty(i2)) {
          if (Array.isArray(obj[i2])) {
            copy[i2] = obj[i2].slice(0);
          } else if (obj[i2] instanceof Buffer) {
            copy[i2] = obj[i2].slice(0);
          } else if (typeof obj[i2] != "function") {
            copy[i2] = obj[i2] instanceof Object ? exports2.clone(obj[i2]) : obj[i2];
          } else if (typeof obj[i2] === "function") {
            copy[i2] = obj[i2];
          }
        }
      }
      return copy;
    }
    exports2.log = function(options) {
      var timestampFn = typeof options.timestamp === "function" ? options.timestamp : exports2.timestamp, timestamp = options.timestamp ? timestampFn() : null, showLevel = options.showLevel === void 0 ? true : options.showLevel, meta = options.meta !== null && options.meta !== void 0 ? exports2.clone(options.meta) : options.meta || null, output;
      if (options.raw) {
        if (typeof meta !== "object" && meta != null) {
          meta = { meta };
        }
        output = exports2.clone(meta) || {};
        output.level = options.level;
        output.message = options.message.stripColors ? options.message.stripColors : options.message;
        return JSON.stringify(output);
      }
      if (options.json || true === options.logstash) {
        if (typeof meta !== "object" && meta != null) {
          meta = { meta };
        }
        output = exports2.clone(meta) || {};
        output.level = options.level;
        output.message = output.message || "";
        if (options.label) {
          output.label = options.label;
        }
        if (options.message) {
          output.message = options.message;
        }
        if (timestamp) {
          output.timestamp = timestamp;
        }
        if (options.logstash === true) {
          var logstashOutput = {};
          if (output.message !== void 0) {
            logstashOutput["@message"] = output.message;
            delete output.message;
          }
          if (output.timestamp !== void 0) {
            logstashOutput["@timestamp"] = output.timestamp;
            delete output.timestamp;
          }
          logstashOutput["@fields"] = exports2.clone(output);
          output = logstashOutput;
        }
        if (typeof options.stringify === "function") {
          return options.stringify(output);
        }
        return JSON.stringify(output, function(key, value2) {
          return value2 instanceof Buffer ? value2.toString("base64") : value2;
        });
      }
      if (typeof options.formatter == "function") {
        options.meta = meta || options.meta;
        if (options.meta instanceof Error) {
          options.meta = exports2.clone(options.meta);
        }
        return String(options.formatter(exports2.clone(options)));
      }
      output = timestamp ? timestamp + " - " : "";
      if (showLevel) {
        output += options.colorize === "all" || options.colorize === "level" || options.colorize === true ? config.colorize(options.level) : options.level;
      }
      output += options.align ? "	" : "";
      output += timestamp || showLevel ? ": " : "";
      output += options.label ? "[" + options.label + "] " : "";
      output += options.colorize === "all" || options.colorize === "message" ? config.colorize(options.level, options.message) : options.message;
      if (meta !== null && meta !== void 0) {
        if (typeof meta !== "object") {
          output += " " + meta;
        } else if (Object.keys(meta).length > 0) {
          if (typeof options.prettyPrint === "function") {
            output += " " + options.prettyPrint(meta);
          } else if (options.prettyPrint) {
            output += " \n" + util.inspect(meta, false, options.depth || null, options.colorize);
          } else if (options.humanReadableUnhandledException && Object.keys(meta).length >= 5 && meta.hasOwnProperty("date") && meta.hasOwnProperty("process") && meta.hasOwnProperty("os") && meta.hasOwnProperty("trace") && meta.hasOwnProperty("stack")) {
            var stack = meta.stack;
            delete meta.stack;
            delete meta.trace;
            output += " " + exports2.serialize(meta);
            if (stack) {
              output += "\n" + stack.join("\n");
            }
          } else {
            output += " " + exports2.serialize(meta);
          }
        }
      }
      return output;
    };
    exports2.capitalize = function(str) {
      return str && str[0].toUpperCase() + str.slice(1);
    };
    exports2.hash = function(str) {
      return crypto.createHash("sha1").update(str).digest("hex");
    };
    exports2.pad = function(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    };
    exports2.timestamp = function() {
      return (/* @__PURE__ */ new Date()).toISOString();
    };
    exports2.serialize = function(obj, key) {
      if (typeof key === "symbol") {
        key = key.toString();
      }
      if (typeof obj === "symbol") {
        obj = obj.toString();
      }
      if (obj === null) {
        obj = "null";
      } else if (obj === void 0) {
        obj = "undefined";
      } else if (obj === false) {
        obj = "false";
      }
      if (typeof obj !== "object") {
        return key ? key + "=" + obj : obj;
      }
      if (obj instanceof Buffer) {
        return key ? key + "=" + obj.toString("base64") : obj.toString("base64");
      }
      var msg = "", keys = Object.keys(obj), length = keys.length;
      for (var i2 = 0; i2 < length; i2++) {
        if (Array.isArray(obj[keys[i2]])) {
          msg += keys[i2] + "=[";
          for (var j = 0, l = obj[keys[i2]].length; j < l; j++) {
            msg += exports2.serialize(obj[keys[i2]][j]);
            if (j < l - 1) {
              msg += ", ";
            }
          }
          msg += "]";
        } else if (obj[keys[i2]] instanceof Date) {
          msg += keys[i2] + "=" + obj[keys[i2]];
        } else {
          msg += exports2.serialize(obj[keys[i2]], keys[i2]);
        }
        if (i2 < length - 1) {
          msg += ", ";
        }
      }
      return msg;
    };
    exports2.tailFile = function(options, callback) {
      var buffer = Buffer.alloc(64 * 1024), decode = new StringDecoder("utf8"), stream = new Stream(), buff = "", pos = 0, row = 0;
      if (options.start === -1) {
        delete options.start;
      }
      stream.readable = true;
      stream.destroy = function() {
        stream.destroyed = true;
        stream.emit("end");
        stream.emit("close");
      };
      fs.open(options.file, "a+", "0644", function(err, fd) {
        if (err) {
          if (!callback) {
            stream.emit("error", err);
          } else {
            callback(err);
          }
          stream.destroy();
          return;
        }
        (function read() {
          if (stream.destroyed) {
            fs.close(fd, nop);
            return;
          }
          return fs.read(fd, buffer, 0, buffer.length, pos, function(err2, bytes) {
            if (err2) {
              if (!callback) {
                stream.emit("error", err2);
              } else {
                callback(err2);
              }
              stream.destroy();
              return;
            }
            if (!bytes) {
              if (buff) {
                if (options.start == null || row > options.start) {
                  if (!callback) {
                    stream.emit("line", buff);
                  } else {
                    callback(null, buff);
                  }
                }
                row++;
                buff = "";
              }
              return setTimeout(read, 1e3);
            }
            var data = decode.write(buffer.slice(0, bytes));
            if (!callback) {
              stream.emit("data", data);
            }
            var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
            for (; i2 < l; i2++) {
              if (options.start == null || row > options.start) {
                if (!callback) {
                  stream.emit("line", data[i2]);
                } else {
                  callback(null, data[i2]);
                }
              }
              row++;
            }
            buff = data[l];
            pos += bytes;
            return read();
          });
        })();
      });
      if (!callback) {
        return stream;
      }
      return stream.destroy;
    };
    exports2.stringArrayToSet = function(strArray, errMsg) {
      if (typeof errMsg === "undefined") {
        errMsg = "Cannot make set from Array with non-string elements";
      }
      return strArray.reduce(function(set, el) {
        if (!(typeof el === "string" || el instanceof String)) {
          throw new Error(errMsg);
        }
        set[el] = true;
        return set;
      }, /* @__PURE__ */ Object.create(null));
    };
    function nop() {
    }
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports/transport.js
var require_transport = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports/transport.js"(exports2) {
    var events = require("events");
    var util = require("util");
    var Transport = exports2.Transport = function(options) {
      events.EventEmitter.call(this);
      options = options || {};
      this.silent = options.silent || false;
      this.raw = options.raw || false;
      this.name = options.name || this.name;
      this.formatter = options.formatter;
      this.level = options.level;
      this.handleExceptions = options.handleExceptions || false;
      this.exceptionsLevel = options.exceptionsLevel || "error";
      this.humanReadableUnhandledException = options.humanReadableUnhandledException || false;
    };
    util.inherits(Transport, events.EventEmitter);
    Transport.prototype.formatQuery = function(query) {
      return query;
    };
    Transport.prototype.normalizeQuery = function(options) {
      options = options || {};
      options.rows = options.rows || options.limit || 10;
      options.start = options.start || 0;
      options.until = options.until || /* @__PURE__ */ new Date();
      if (typeof options.until !== "object") {
        options.until = new Date(options.until);
      }
      options.from = options.from || options.until - 24 * 60 * 60 * 1e3;
      if (typeof options.from !== "object") {
        options.from = new Date(options.from);
      }
      options.order = options.order || "desc";
      options.fields = options.fields;
      return options;
    };
    Transport.prototype.formatResults = function(results, options) {
      return results;
    };
    Transport.prototype.logException = function(msg, meta, callback) {
      var self2 = this, called;
      if (this.silent) {
        return callback();
      }
      function onComplete() {
        if (!called) {
          called = true;
          self2.removeListener("logged", onComplete);
          self2.removeListener("error", onComplete);
          callback();
        }
      }
      this.once("logged", onComplete);
      this.once("error", onComplete);
      this.log(self2.exceptionsLevel, msg, meta, function() {
      });
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports/console.js
var require_console = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports/console.js"(exports2) {
    var events = require("events");
    var os = require("os");
    var util = require("util");
    var common = require_common();
    var Transport = require_transport().Transport;
    var Console = exports2.Console = function(options) {
      Transport.call(this, options);
      options = options || {};
      this.json = options.json || false;
      this.colorize = options.colorize || false;
      this.prettyPrint = options.prettyPrint || false;
      this.timestamp = typeof options.timestamp !== "undefined" ? options.timestamp : false;
      this.showLevel = options.showLevel === void 0 ? true : options.showLevel;
      this.label = options.label || null;
      this.logstash = options.logstash || false;
      this.depth = options.depth || null;
      this.align = options.align || false;
      this.stderrLevels = setStderrLevels(options.stderrLevels, options.debugStdout);
      this.eol = options.eol || os.EOL;
      if (this.json) {
        this.stringify = options.stringify || function(obj) {
          return JSON.stringify(obj, null, 2);
        };
      }
      function setStderrLevels(levels, debugStdout) {
        var defaultMsg = "Cannot have non-string elements in stderrLevels Array";
        if (debugStdout) {
          if (levels) {
            throw new Error("Cannot set debugStdout and stderrLevels together");
          }
          return common.stringArrayToSet(["error"], defaultMsg);
        }
        if (!levels) {
          return common.stringArrayToSet(["error", "debug"], defaultMsg);
        } else if (!Array.isArray(levels)) {
          throw new Error("Cannot set stderrLevels to type other than Array");
        }
        return common.stringArrayToSet(levels, defaultMsg);
      }
      ;
    };
    util.inherits(Console, Transport);
    Console.prototype.name = "console";
    Console.prototype.log = function(level, msg, meta, callback) {
      if (this.silent) {
        return callback(null, true);
      }
      var self2 = this, output;
      output = common.log({
        colorize: this.colorize,
        json: this.json,
        level,
        message: msg,
        meta,
        stringify: this.stringify,
        timestamp: this.timestamp,
        showLevel: this.showLevel,
        prettyPrint: this.prettyPrint,
        raw: this.raw,
        label: this.label,
        logstash: this.logstash,
        depth: this.depth,
        formatter: this.formatter,
        align: this.align,
        humanReadableUnhandledException: this.humanReadableUnhandledException
      });
      if (this.stderrLevels[level]) {
        process.stderr.write(output + this.eol);
      } else {
        process.stdout.write(output + this.eol);
      }
      self2.emit("logged");
      callback(null, true);
    };
  }
});

// ../promptUI/node_modules/winston/node_modules/async/dist/async.js
var require_async = __commonJS({
  "../promptUI/node_modules/winston/node_modules/async/dist/async.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.async = global2.async || {});
    })(exports2, function(exports3) {
      "use strict";
      function slice(arrayLike, start) {
        start = start | 0;
        var newLen = Math.max(arrayLike.length - start, 0);
        var newArr = Array(newLen);
        for (var idx = 0; idx < newLen; idx++) {
          newArr[idx] = arrayLike[start + idx];
        }
        return newArr;
      }
      var apply = function(fn) {
        var args = slice(arguments, 1);
        return function() {
          var callArgs = slice(arguments);
          return fn.apply(null, args.concat(callArgs));
        };
      };
      var initialParams = function(fn) {
        return function() {
          var args = slice(arguments);
          var callback = args.pop();
          fn.call(this, args, callback);
        };
      };
      function isObject(value2) {
        var type = typeof value2;
        return value2 != null && (type == "object" || type == "function");
      }
      var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
      var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
      function fallback(fn) {
        setTimeout(fn, 0);
      }
      function wrap(defer) {
        return function(fn) {
          var args = slice(arguments, 1);
          defer(function() {
            fn.apply(null, args);
          });
        };
      }
      var _defer;
      if (hasSetImmediate) {
        _defer = setImmediate;
      } else if (hasNextTick) {
        _defer = process.nextTick;
      } else {
        _defer = fallback;
      }
      var setImmediate$1 = wrap(_defer);
      function asyncify(func) {
        return initialParams(function(args, callback) {
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (isObject(result) && typeof result.then === "function") {
            result.then(function(value2) {
              invokeCallback(callback, null, value2);
            }, function(err) {
              invokeCallback(callback, err.message ? err : new Error(err));
            });
          } else {
            callback(null, result);
          }
        });
      }
      function invokeCallback(callback, error, value2) {
        try {
          callback(error, value2);
        } catch (e) {
          setImmediate$1(rethrow, e);
        }
      }
      function rethrow(error) {
        throw error;
      }
      var supportsSymbol = typeof Symbol === "function";
      function isAsync(fn) {
        return supportsSymbol && fn[Symbol.toStringTag] === "AsyncFunction";
      }
      function wrapAsync(asyncFn) {
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
      }
      function applyEach$1(eachfn) {
        return function(fns) {
          var args = slice(arguments, 1);
          var go = initialParams(function(args2, callback) {
            var that = this;
            return eachfn(fns, function(fn, cb) {
              wrapAsync(fn).apply(that, args2.concat(cb));
            }, callback);
          });
          if (args.length) {
            return go.apply(this, args);
          } else {
            return go;
          }
        };
      }
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value2) {
        var isOwn = hasOwnProperty.call(value2, symToStringTag$1), tag = value2[symToStringTag$1];
        try {
          value2[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value2);
        if (unmasked) {
          if (isOwn) {
            value2[symToStringTag$1] = tag;
          } else {
            delete value2[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$1 = Object.prototype;
      var nativeObjectToString$1 = objectProto$1.toString;
      function objectToString(value2) {
        return nativeObjectToString$1.call(value2);
      }
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value2) {
        if (value2 == null) {
          return value2 === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value2) ? getRawTag(value2) : objectToString(value2);
      }
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value2) {
        if (!isObject(value2)) {
          return false;
        }
        var tag = baseGetTag(value2);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value2) {
        return typeof value2 == "number" && value2 > -1 && value2 % 1 == 0 && value2 <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value2) {
        return value2 != null && isLength(value2.length) && !isFunction(value2);
      }
      var breakLoop = {};
      function noop() {
      }
      function once(fn) {
        return function() {
          if (fn === null)
            return;
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator;
      var getIterator = function(coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
      };
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function isObjectLike(value2) {
        return value2 != null && typeof value2 == "object";
      }
      var argsTag = "[object Arguments]";
      function baseIsArguments(value2) {
        return isObjectLike(value2) && baseGetTag(value2) == argsTag;
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value2) {
        return isObjectLike(value2) && hasOwnProperty$2.call(value2, "callee") && !propertyIsEnumerable.call(value2, "callee");
      };
      var isArray = Array.isArray;
      function stubFalse() {
        return false;
      }
      var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value2, length) {
        var type = typeof value2;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value2)) && (value2 > -1 && value2 % 1 == 0 && value2 < length);
      }
      var argsTag$1 = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag$1 = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value2) {
        return isObjectLike(value2) && isLength(value2.length) && !!typedArrayTags[baseGetTag(value2)];
      }
      function baseUnary(func) {
        return function(value2) {
          return func(value2);
        };
      }
      var freeExports$1 = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
      var freeModule$1 = freeExports$1 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var freeProcess = moduleExports$1 && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$2 = Object.prototype;
      var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
      function arrayLikeKeys(value2, inherited) {
        var isArr = isArray(value2), isArg = !isArr && isArguments(value2), isBuff = !isArr && !isArg && isBuffer(value2), isType = !isArr && !isArg && !isBuff && isTypedArray(value2), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value2.length, String) : [], length = result.length;
        for (var key in value2) {
          if ((inherited || hasOwnProperty$1.call(value2, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$5 = Object.prototype;
      function isPrototype(value2) {
        var Ctor = value2 && value2.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
        return value2 === proto;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$3.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function createArrayIterator(coll) {
        var i2 = -1;
        var len = coll.length;
        return function next() {
          return ++i2 < len ? { value: coll[i2], key: i2 } : null;
        };
      }
      function createES2015Iterator(iterator2) {
        var i2 = -1;
        return function next() {
          var item2 = iterator2.next();
          if (item2.done)
            return null;
          i2++;
          return { value: item2.value, key: i2 };
        };
      }
      function createObjectIterator(obj) {
        var okeys = keys(obj);
        var i2 = -1;
        var len = okeys.length;
        return function next() {
          var key = okeys[++i2];
          if (key === "__proto__") {
            return next();
          }
          return i2 < len ? { value: obj[key], key } : null;
        };
      }
      function iterator(coll) {
        if (isArrayLike(coll)) {
          return createArrayIterator(coll);
        }
        var iterator2 = getIterator(coll);
        return iterator2 ? createES2015Iterator(iterator2) : createObjectIterator(coll);
      }
      function onlyOnce(fn) {
        return function() {
          if (fn === null)
            throw new Error("Callback was already called.");
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      function _eachOfLimit(limit) {
        return function(obj, iteratee, callback) {
          callback = once(callback || noop);
          if (limit <= 0 || !obj) {
            return callback(null);
          }
          var nextElem = iterator(obj);
          var done = false;
          var running = 0;
          var looping = false;
          function iterateeCallback(err, value2) {
            running -= 1;
            if (err) {
              done = true;
              callback(err);
            } else if (value2 === breakLoop || done && running <= 0) {
              done = true;
              return callback(null);
            } else if (!looping) {
              replenish();
            }
          }
          function replenish() {
            looping = true;
            while (running < limit && !done) {
              var elem = nextElem();
              if (elem === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return;
              }
              running += 1;
              iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
          }
          replenish();
        };
      }
      function eachOfLimit(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
      }
      function doLimit(fn, limit) {
        return function(iterable, iteratee, callback) {
          return fn(iterable, limit, iteratee, callback);
        };
      }
      function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback || noop);
        var index2 = 0, completed = 0, length = coll.length;
        if (length === 0) {
          callback(null);
        }
        function iteratorCallback(err, value2) {
          if (err) {
            callback(err);
          } else if (++completed === length || value2 === breakLoop) {
            callback(null);
          }
        }
        for (; index2 < length; index2++) {
          iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
        }
      }
      var eachOfGeneric = doLimit(eachOfLimit, Infinity);
      var eachOf = function(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        eachOfImplementation(coll, wrapAsync(iteratee), callback);
      };
      function doParallel(fn) {
        return function(obj, iteratee, callback) {
          return fn(eachOf, obj, wrapAsync(iteratee), callback);
        };
      }
      function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = callback || noop;
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
        eachfn(arr, function(value2, _, callback2) {
          var index2 = counter++;
          _iteratee(value2, function(err, v) {
            results[index2] = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      var map = doParallel(_asyncMap);
      var applyEach = applyEach$1(map);
      function doParallelLimit(fn) {
        return function(obj, limit, iteratee, callback) {
          return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
        };
      }
      var mapLimit = doParallelLimit(_asyncMap);
      var mapSeries = doLimit(mapLimit, 1);
      var applyEachSeries = applyEach$1(mapSeries);
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index2];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value2) {
        return value2 !== value2;
      }
      function strictIndexOf(array, value2, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value2) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value2, fromIndex) {
        return value2 === value2 ? strictIndexOf(array, value2, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var auto = function(tasks, concurrency, callback) {
        if (typeof concurrency === "function") {
          callback = concurrency;
          concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$1 = keys(tasks);
        var numTasks = keys$$1.length;
        if (!numTasks) {
          return callback(null);
        }
        if (!concurrency) {
          concurrency = numTasks;
        }
        var results = {};
        var runningTasks = 0;
        var hasError = false;
        var listeners = /* @__PURE__ */ Object.create(null);
        var readyTasks = [];
        var readyToCheck = [];
        var uncheckedDependencies = {};
        baseForOwn(tasks, function(task, key) {
          if (!isArray(task)) {
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
          }
          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
          }
          uncheckedDependencies[key] = remainingDependencies;
          arrayEach(dependencies, function(dependencyName) {
            if (!tasks[dependencyName]) {
              throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
            }
            addListener(dependencyName, function() {
              remainingDependencies--;
              if (remainingDependencies === 0) {
                enqueueTask(key, task);
              }
            });
          });
        });
        checkForDeadlocks();
        processQueue();
        function enqueueTask(key, task) {
          readyTasks.push(function() {
            runTask(key, task);
          });
        }
        function processQueue() {
          if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
          }
        }
        function addListener(taskName, fn) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
          }
          taskListeners.push(fn);
        }
        function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          arrayEach(taskListeners, function(fn) {
            fn();
          });
          processQueue();
        }
        function runTask(key, task) {
          if (hasError)
            return;
          var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            if (err) {
              var safeResults = {};
              baseForOwn(results, function(val, rkey) {
                safeResults[rkey] = val;
              });
              safeResults[key] = result;
              hasError = true;
              listeners = /* @__PURE__ */ Object.create(null);
              callback(err, safeResults);
            } else {
              results[key] = result;
              taskComplete(key);
            }
          });
          runningTasks++;
          var taskFn = wrapAsync(task[task.length - 1]);
          if (task.length > 1) {
            taskFn(results, taskCallback);
          } else {
            taskFn(taskCallback);
          }
        }
        function checkForDeadlocks() {
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function(dependent) {
              if (--uncheckedDependencies[dependent] === 0) {
                readyToCheck.push(dependent);
              }
            });
          }
          if (counter !== numTasks) {
            throw new Error(
              "async.auto cannot execute tasks due to a recursive dependency"
            );
          }
        }
        function getDependents(taskName) {
          var result = [];
          baseForOwn(tasks, function(task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
              result.push(key);
            }
          });
          return result;
        }
      };
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      var symbolTag = "[object Symbol]";
      function isSymbol(value2) {
        return typeof value2 == "symbol" || isObjectLike(value2) && baseGetTag(value2) == symbolTag;
      }
      var INFINITY = 1 / 0;
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value2) {
        if (typeof value2 == "string") {
          return value2;
        }
        if (isArray(value2)) {
          return arrayMap(value2, baseToString) + "";
        }
        if (isSymbol(value2)) {
          return symbolToString ? symbolToString.call(value2) : "";
        }
        var result = value2 + "";
        return result == "0" && 1 / value2 == -INFINITY ? "-0" : result;
      }
      function baseSlice(array, start, end) {
        var index2 = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index2 < length) {
          result[index2] = array[index2 + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function asciiToArray(string) {
        return string.split("");
      }
      var rsAstralRange = "\\ud800-\\udfff";
      var rsComboMarksRange = "\\u0300-\\u036f";
      var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange = "\\u20d0-\\u20ff";
      var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      var rsVarRange = "\\ufe0e\\ufe0f";
      var rsZWJ = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      var rsAstralRange$1 = "\\ud800-\\udfff";
      var rsComboMarksRange$1 = "\\u0300-\\u036f";
      var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
      var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
      var rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange$1 + "]";
      var rsCombo = "[" + rsComboRange$1 + "]";
      var rsFitz = "\\ud83c[\\udffb-\\udfff]";
      var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
      var rsNonAstral = "[^" + rsAstralRange$1 + "]";
      var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
      var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
      var rsZWJ$1 = "\\u200d";
      var reOptMod = rsModifier + "?";
      var rsOptVar = "[" + rsVarRange$1 + "]?";
      var rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
      var rsSeq = rsOptVar + reOptMod + rsOptJoin;
      var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function toString(value2) {
        return value2 == null ? "" : baseToString(value2);
      }
      var reTrim = /^\s+|\s+$/g;
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === void 0)) {
          return string.replace(reTrim, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
      var FN_ARG_SPLIT = /,/;
      var FN_ARG = /(=.+)?(\s*)$/;
      var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
      function parseParams(func) {
        func = func.toString().replace(STRIP_COMMENTS, "");
        func = func.match(FN_ARGS)[2].replace(" ", "");
        func = func ? func.split(FN_ARG_SPLIT) : [];
        func = func.map(function(arg) {
          return trim(arg.replace(FN_ARG, ""));
        });
        return func;
      }
      function autoInject(tasks, callback) {
        var newTasks = {};
        baseForOwn(tasks, function(taskFn, key) {
          var params;
          var fnIsAsync = isAsync(taskFn);
          var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
          if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];
            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (hasNoDeps) {
            newTasks[key] = taskFn;
          } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
              throw new Error("autoInject task functions require explicit parameters.");
            }
            if (!fnIsAsync)
              params.pop();
            newTasks[key] = params.concat(newTask);
          }
          function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function(name2) {
              return results[name2];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
          }
        });
        auto(newTasks, callback);
      }
      function DLL() {
        this.head = this.tail = null;
        this.length = 0;
      }
      function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
      }
      DLL.prototype.removeLink = function(node) {
        if (node.prev)
          node.prev.next = node.next;
        else
          this.head = node.next;
        if (node.next)
          node.next.prev = node.prev;
        else
          this.tail = node.prev;
        node.prev = node.next = null;
        this.length -= 1;
        return node;
      };
      DLL.prototype.empty = function() {
        while (this.head)
          this.shift();
        return this;
      };
      DLL.prototype.insertAfter = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next)
          node.next.prev = newNode;
        else
          this.tail = newNode;
        node.next = newNode;
        this.length += 1;
      };
      DLL.prototype.insertBefore = function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev)
          node.prev.next = newNode;
        else
          this.head = newNode;
        node.prev = newNode;
        this.length += 1;
      };
      DLL.prototype.unshift = function(node) {
        if (this.head)
          this.insertBefore(this.head, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.push = function(node) {
        if (this.tail)
          this.insertAfter(this.tail, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.shift = function() {
        return this.head && this.removeLink(this.head);
      };
      DLL.prototype.pop = function() {
        return this.tail && this.removeLink(this.tail);
      };
      DLL.prototype.toArray = function() {
        var arr = Array(this.length);
        var curr = this.head;
        for (var idx = 0; idx < this.length; idx++) {
          arr[idx] = curr.data;
          curr = curr.next;
        }
        return arr;
      };
      DLL.prototype.remove = function(testFn) {
        var curr = this.head;
        while (!!curr) {
          var next = curr.next;
          if (testFn(curr)) {
            this.removeLink(curr);
          }
          curr = next;
        }
        return this;
      };
      function queue(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new Error("Concurrency must not be zero");
        }
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
        var processingScheduled = false;
        function _insert(data, insertAtFront, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0 && q.idle()) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          for (var i2 = 0, l = data.length; i2 < l; i2++) {
            var item2 = {
              data: data[i2],
              callback: callback || noop
            };
            if (insertAtFront) {
              q._tasks.unshift(item2);
            } else {
              q._tasks.push(item2);
            }
          }
          if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
              processingScheduled = false;
              q.process();
            });
          }
        }
        function _next(tasks) {
          return function(err) {
            numRunning -= 1;
            for (var i2 = 0, l = tasks.length; i2 < l; i2++) {
              var task = tasks[i2];
              var index2 = baseIndexOf(workersList, task, 0);
              if (index2 === 0) {
                workersList.shift();
              } else if (index2 > 0) {
                workersList.splice(index2, 1);
              }
              task.callback.apply(task, arguments);
              if (err != null) {
                q.error(err, task.data);
              }
            }
            if (numRunning <= q.concurrency - q.buffer) {
              q.unsaturated();
            }
            if (q.idle()) {
              q.drain();
            }
            q.process();
          };
        }
        var isProcessing = false;
        var q = {
          _tasks: new DLL(),
          concurrency,
          payload,
          saturated: noop,
          unsaturated: noop,
          buffer: concurrency / 4,
          empty: noop,
          drain: noop,
          error: noop,
          started: false,
          paused: false,
          push: function(data, callback) {
            _insert(data, false, callback);
          },
          kill: function() {
            q.drain = noop;
            q._tasks.empty();
          },
          unshift: function(data, callback) {
            _insert(data, true, callback);
          },
          remove: function(testFn) {
            q._tasks.remove(testFn);
          },
          process: function() {
            if (isProcessing) {
              return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
              var tasks = [], data = [];
              var l = q._tasks.length;
              if (q.payload)
                l = Math.min(l, q.payload);
              for (var i2 = 0; i2 < l; i2++) {
                var node = q._tasks.shift();
                tasks.push(node);
                workersList.push(node);
                data.push(node.data);
              }
              numRunning += 1;
              if (q._tasks.length === 0) {
                q.empty();
              }
              if (numRunning === q.concurrency) {
                q.saturated();
              }
              var cb = onlyOnce(_next(tasks));
              _worker(data, cb);
            }
            isProcessing = false;
          },
          length: function() {
            return q._tasks.length;
          },
          running: function() {
            return numRunning;
          },
          workersList: function() {
            return workersList;
          },
          idle: function() {
            return q._tasks.length + numRunning === 0;
          },
          pause: function() {
            q.paused = true;
          },
          resume: function() {
            if (q.paused === false) {
              return;
            }
            q.paused = false;
            setImmediate$1(q.process);
          }
        };
        return q;
      }
      function cargo(worker, payload) {
        return queue(worker, 1, payload);
      }
      var eachOfSeries = doLimit(eachOfLimit, 1);
      function reduce(coll, memo, iteratee, callback) {
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOfSeries(coll, function(x, i2, callback2) {
          _iteratee(memo, x, function(err, v) {
            memo = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, memo);
        });
      }
      function seq() {
        var _functions = arrayMap(arguments, wrapAsync);
        return function() {
          var args = slice(arguments);
          var that = this;
          var cb = args[args.length - 1];
          if (typeof cb == "function") {
            args.pop();
          } else {
            cb = noop;
          }
          reduce(
            _functions,
            args,
            function(newargs, fn, cb2) {
              fn.apply(that, newargs.concat(function(err) {
                var nextargs = slice(arguments, 1);
                cb2(err, nextargs);
              }));
            },
            function(err, results) {
              cb.apply(that, [err].concat(results));
            }
          );
        };
      }
      var compose = function() {
        return seq.apply(null, slice(arguments).reverse());
      };
      var _concat = Array.prototype.concat;
      var concatLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err) {
            if (err)
              return callback2(err);
            return callback2(null, slice(arguments, 1));
          });
        }, function(err, mapResults) {
          var result = [];
          for (var i2 = 0; i2 < mapResults.length; i2++) {
            if (mapResults[i2]) {
              result = _concat.apply(result, mapResults[i2]);
            }
          }
          return callback(err, result);
        });
      };
      var concat = doLimit(concatLimit, Infinity);
      var concatSeries = doLimit(concatLimit, 1);
      var constant = function() {
        var values = slice(arguments);
        var args = [null].concat(values);
        return function() {
          var callback = arguments[arguments.length - 1];
          return callback.apply(this, args);
        };
      };
      function identity(value2) {
        return value2;
      }
      function _createTester(check, getResult) {
        return function(eachfn, arr, iteratee, cb) {
          cb = cb || noop;
          var testPassed = false;
          var testResult;
          eachfn(arr, function(value2, _, callback) {
            iteratee(value2, function(err, result) {
              if (err) {
                callback(err);
              } else if (check(result) && !testResult) {
                testPassed = true;
                testResult = getResult(true, value2);
                callback(null, breakLoop);
              } else {
                callback();
              }
            });
          }, function(err) {
            if (err) {
              cb(err);
            } else {
              cb(null, testPassed ? testResult : getResult(false));
            }
          });
        };
      }
      function _findGetResult(v, x) {
        return x;
      }
      var detect = doParallel(_createTester(identity, _findGetResult));
      var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
      var detectSeries = doLimit(detectLimit, 1);
      function consoleFunc(name2) {
        return function(fn) {
          var args = slice(arguments, 1);
          args.push(function(err) {
            var args2 = slice(arguments, 1);
            if (typeof console === "object") {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name2]) {
                arrayEach(args2, function(x) {
                  console[name2](x);
                });
              }
            }
          });
          wrapAsync(fn).apply(null, args);
        };
      }
      var dir = consoleFunc("dir");
      function doDuring(fn, test, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          args.push(check);
          _test.apply(this, args);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        check(null, true);
      }
      function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        var next = function(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          if (test.apply(this, args))
            return _iteratee(next);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function doUntil(iteratee, test, callback) {
        doWhilst(iteratee, function() {
          return !test.apply(this, arguments);
        }, callback);
      }
      function during(test, fn, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          _test(check);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        _test(check);
      }
      function _withoutIndex(iteratee) {
        return function(value2, index2, callback) {
          return iteratee(value2, callback);
        };
      }
      function eachLimit(coll, iteratee, callback) {
        eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      function eachLimit$1(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var eachSeries = doLimit(eachLimit$1, 1);
      function ensureAsync(fn) {
        if (isAsync(fn))
          return fn;
        return initialParams(function(args, callback) {
          var sync = true;
          args.push(function() {
            var innerArgs = arguments;
            if (sync) {
              setImmediate$1(function() {
                callback.apply(null, innerArgs);
              });
            } else {
              callback.apply(null, innerArgs);
            }
          });
          fn.apply(this, args);
          sync = false;
        });
      }
      function notId(v) {
        return !v;
      }
      var every = doParallel(_createTester(notId, notId));
      var everyLimit = doParallelLimit(_createTester(notId, notId));
      var everySeries = doLimit(everyLimit, 1);
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            truthValues[index2] = !!v;
            callback2(err);
          });
        }, function(err) {
          if (err)
            return callback(err);
          var results = [];
          for (var i2 = 0; i2 < arr.length; i2++) {
            if (truthValues[i2])
              results.push(arr[i2]);
          }
          callback(null, results);
        });
      }
      function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            if (err) {
              callback2(err);
            } else {
              if (v) {
                results.push({ index: index2, value: x });
              }
              callback2();
            }
          });
        }, function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, arrayMap(results.sort(function(a, b) {
              return a.index - b.index;
            }), baseProperty("value")));
          }
        });
      }
      function _filter(eachfn, coll, iteratee, callback) {
        var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
        filter2(eachfn, coll, wrapAsync(iteratee), callback || noop);
      }
      var filter = doParallel(_filter);
      var filterLimit = doParallelLimit(_filter);
      var filterSeries = doLimit(filterLimit, 1);
      function forever(fn, errback) {
        var done = onlyOnce(errback || noop);
        var task = wrapAsync(ensureAsync(fn));
        function next(err) {
          if (err)
            return done(err);
          task(next);
        }
        next();
      }
      var groupByLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err, key) {
            if (err)
              return callback2(err);
            return callback2(null, { key, val });
          });
        }, function(err, mapResults) {
          var result = {};
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          for (var i2 = 0; i2 < mapResults.length; i2++) {
            if (mapResults[i2]) {
              var key = mapResults[i2].key;
              var val = mapResults[i2].val;
              if (hasOwnProperty2.call(result, key)) {
                result[key].push(val);
              } else {
                result[key] = [val];
              }
            }
          }
          return callback(err, result);
        });
      };
      var groupBy = doLimit(groupByLimit, Infinity);
      var groupBySeries = doLimit(groupByLimit, 1);
      var log = consoleFunc("log");
      function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback || noop);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        eachOfLimit(obj, limit, function(val, key, next) {
          _iteratee(val, key, function(err, result) {
            if (err)
              return next(err);
            newObj[key] = result;
            next();
          });
        }, function(err) {
          callback(err, newObj);
        });
      }
      var mapValues = doLimit(mapValuesLimit, Infinity);
      var mapValuesSeries = doLimit(mapValuesLimit, 1);
      function has(obj, key) {
        return key in obj;
      }
      function memoize(fn, hasher) {
        var memo = /* @__PURE__ */ Object.create(null);
        var queues = /* @__PURE__ */ Object.create(null);
        hasher = hasher || identity;
        var _fn = wrapAsync(fn);
        var memoized = initialParams(function memoized2(args, callback) {
          var key = hasher.apply(null, args);
          if (has(memo, key)) {
            setImmediate$1(function() {
              callback.apply(null, memo[key]);
            });
          } else if (has(queues, key)) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function() {
              var args2 = slice(arguments);
              memo[key] = args2;
              var q = queues[key];
              delete queues[key];
              for (var i2 = 0, l = q.length; i2 < l; i2++) {
                q[i2].apply(null, args2);
              }
            }));
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
      }
      var _defer$1;
      if (hasNextTick) {
        _defer$1 = process.nextTick;
      } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
      } else {
        _defer$1 = fallback;
      }
      var nextTick = wrap(_defer$1);
      function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, function(task, key, callback2) {
          wrapAsync(task)(function(err, result) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            results[key] = result;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      function parallelLimit(tasks, callback) {
        _parallel(eachOf, tasks, callback);
      }
      function parallelLimit$1(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
      }
      var queue$1 = function(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue(function(items, cb) {
          _worker(items[0], cb);
        }, concurrency, 1);
      };
      var priorityQueue = function(worker, concurrency) {
        var q = queue$1(worker, concurrency);
        q.push = function(data, priority, callback) {
          if (callback == null)
            callback = noop;
          if (typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          priority = priority || 0;
          var nextNode = q._tasks.head;
          while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
          }
          for (var i2 = 0, l = data.length; i2 < l; i2++) {
            var item2 = {
              data: data[i2],
              priority,
              callback
            };
            if (nextNode) {
              q._tasks.insertBefore(nextNode, item2);
            } else {
              q._tasks.push(item2);
            }
          }
          setImmediate$1(q.process);
        };
        delete q.unshift;
        return q;
      };
      function race(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length)
          return callback();
        for (var i2 = 0, l = tasks.length; i2 < l; i2++) {
          wrapAsync(tasks[i2])(callback);
        }
      }
      function reduceRight(array, memo, iteratee, callback) {
        var reversed = slice(array).reverse();
        reduce(reversed, memo, iteratee, callback);
      }
      function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function reflectOn(args, reflectCallback) {
          args.push(function callback(error, cbArg) {
            if (error) {
              reflectCallback(null, { error });
            } else {
              var value2;
              if (arguments.length <= 2) {
                value2 = cbArg;
              } else {
                value2 = slice(arguments, 1);
              }
              reflectCallback(null, { value: value2 });
            }
          });
          return _fn.apply(this, args);
        });
      }
      function reflectAll(tasks) {
        var results;
        if (isArray(tasks)) {
          results = arrayMap(tasks, reflect);
        } else {
          results = {};
          baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
          });
        }
        return results;
      }
      function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function(value2, cb) {
          iteratee(value2, function(err, v) {
            cb(err, !v);
          });
        }, callback);
      }
      var reject = doParallel(reject$1);
      var rejectLimit = doParallelLimit(reject$1);
      var rejectSeries = doLimit(rejectLimit, 1);
      function constant$1(value2) {
        return function() {
          return value2;
        };
      }
      function retry(opts, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
        var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
        function parseTimes(acc, t) {
          if (typeof t === "object") {
            acc.times = +t.times || DEFAULT_TIMES;
            acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            acc.errorFilter = t.errorFilter;
          } else if (typeof t === "number" || typeof t === "string") {
            acc.times = +t || DEFAULT_TIMES;
          } else {
            throw new Error("Invalid arguments for async.retry");
          }
        }
        if (arguments.length < 3 && typeof opts === "function") {
          callback = task || noop;
          task = opts;
        } else {
          parseTimes(options, opts);
          callback = callback || noop;
        }
        if (typeof task !== "function") {
          throw new Error("Invalid arguments for async.retry");
        }
        var _task = wrapAsync(task);
        var attempt = 1;
        function retryAttempt() {
          _task(function(err) {
            if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
              setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
              callback.apply(null, arguments);
            }
          });
        }
        retryAttempt();
      }
      var retryable = function(opts, task) {
        if (!task) {
          task = opts;
          opts = null;
        }
        var _task = wrapAsync(task);
        return initialParams(function(args, callback) {
          function taskFn(cb) {
            _task.apply(null, args.concat(cb));
          }
          if (opts)
            retry(opts, taskFn, callback);
          else
            retry(taskFn, callback);
        });
      };
      function series(tasks, callback) {
        _parallel(eachOfSeries, tasks, callback);
      }
      var some = doParallel(_createTester(Boolean, identity));
      var someLimit = doParallelLimit(_createTester(Boolean, identity));
      var someSeries = doLimit(someLimit, 1);
      function sortBy(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        map(coll, function(x, callback2) {
          _iteratee(x, function(err, criteria) {
            if (err)
              return callback2(err);
            callback2(null, { value: x, criteria });
          });
        }, function(err, results) {
          if (err)
            return callback(err);
          callback(null, arrayMap(results.sort(comparator), baseProperty("value")));
        });
        function comparator(left, right) {
          var a = left.criteria, b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      }
      function timeout(asyncFn, milliseconds, info) {
        var fn = wrapAsync(asyncFn);
        return initialParams(function(args, callback) {
          var timedOut = false;
          var timer;
          function timeoutCallback() {
            var name2 = asyncFn.name || "anonymous";
            var error = new Error('Callback function "' + name2 + '" timed out.');
            error.code = "ETIMEDOUT";
            if (info) {
              error.info = info;
            }
            timedOut = true;
            callback(error);
          }
          args.push(function() {
            if (!timedOut) {
              callback.apply(null, arguments);
              clearTimeout(timer);
            }
          });
          timer = setTimeout(timeoutCallback, milliseconds);
          fn.apply(null, args);
        });
      }
      var nativeCeil = Math.ceil;
      var nativeMax = Math.max;
      function baseRange(start, end, step, fromRight) {
        var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index2] = start;
          start += step;
        }
        return result;
      }
      function timeLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
      }
      var times = doLimit(timeLimit, Infinity);
      var timesSeries = doLimit(timeLimit, 1);
      function transform(coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3) {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = isArray(coll) ? [] : {};
        }
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOf(coll, function(v, k, cb) {
          _iteratee(accumulator, v, k, cb);
        }, function(err) {
          callback(err, accumulator);
        });
      }
      function tryEach(tasks, callback) {
        var error = null;
        var result;
        callback = callback || noop;
        eachSeries(tasks, function(task, callback2) {
          wrapAsync(task)(function(err, res) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            } else {
              result = res;
            }
            error = err;
            callback2(!err);
          });
        }, function() {
          callback(error, result);
        });
      }
      function unmemoize(fn) {
        return function() {
          return (fn.unmemoized || fn).apply(null, arguments);
        };
      }
      function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        if (!test())
          return callback(null);
        var next = function(err) {
          if (err)
            return callback(err);
          if (test())
            return _iteratee(next);
          var args = slice(arguments, 1);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function until(test, iteratee, callback) {
        whilst(function() {
          return !test.apply(this, arguments);
        }, iteratee, callback);
      }
      var waterfall = function(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length)
          return callback();
        var taskIndex = 0;
        function nextTask(args) {
          var task = wrapAsync(tasks[taskIndex++]);
          args.push(onlyOnce(next));
          task.apply(null, args);
        }
        function next(err) {
          if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
          }
          nextTask(slice(arguments, 1));
        }
        nextTask([]);
      };
      var index = {
        apply,
        applyEach,
        applyEachSeries,
        asyncify,
        auto,
        autoInject,
        cargo,
        compose,
        concat,
        concatLimit,
        concatSeries,
        constant,
        detect,
        detectLimit,
        detectSeries,
        dir,
        doDuring,
        doUntil,
        doWhilst,
        during,
        each: eachLimit,
        eachLimit: eachLimit$1,
        eachOf,
        eachOfLimit,
        eachOfSeries,
        eachSeries,
        ensureAsync,
        every,
        everyLimit,
        everySeries,
        filter,
        filterLimit,
        filterSeries,
        forever,
        groupBy,
        groupByLimit,
        groupBySeries,
        log,
        map,
        mapLimit,
        mapSeries,
        mapValues,
        mapValuesLimit,
        mapValuesSeries,
        memoize,
        nextTick,
        parallel: parallelLimit,
        parallelLimit: parallelLimit$1,
        priorityQueue,
        queue: queue$1,
        race,
        reduce,
        reduceRight,
        reflect,
        reflectAll,
        reject,
        rejectLimit,
        rejectSeries,
        retry,
        retryable,
        seq,
        series,
        setImmediate: setImmediate$1,
        some,
        someLimit,
        someSeries,
        sortBy,
        timeout,
        times,
        timesLimit: timeLimit,
        timesSeries,
        transform,
        tryEach,
        unmemoize,
        until,
        waterfall,
        whilst,
        // aliases
        all: every,
        allLimit: everyLimit,
        allSeries: everySeries,
        any: some,
        anyLimit: someLimit,
        anySeries: someSeries,
        find: detect,
        findLimit: detectLimit,
        findSeries: detectSeries,
        forEach: eachLimit,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
      };
      exports3["default"] = index;
      exports3.apply = apply;
      exports3.applyEach = applyEach;
      exports3.applyEachSeries = applyEachSeries;
      exports3.asyncify = asyncify;
      exports3.auto = auto;
      exports3.autoInject = autoInject;
      exports3.cargo = cargo;
      exports3.compose = compose;
      exports3.concat = concat;
      exports3.concatLimit = concatLimit;
      exports3.concatSeries = concatSeries;
      exports3.constant = constant;
      exports3.detect = detect;
      exports3.detectLimit = detectLimit;
      exports3.detectSeries = detectSeries;
      exports3.dir = dir;
      exports3.doDuring = doDuring;
      exports3.doUntil = doUntil;
      exports3.doWhilst = doWhilst;
      exports3.during = during;
      exports3.each = eachLimit;
      exports3.eachLimit = eachLimit$1;
      exports3.eachOf = eachOf;
      exports3.eachOfLimit = eachOfLimit;
      exports3.eachOfSeries = eachOfSeries;
      exports3.eachSeries = eachSeries;
      exports3.ensureAsync = ensureAsync;
      exports3.every = every;
      exports3.everyLimit = everyLimit;
      exports3.everySeries = everySeries;
      exports3.filter = filter;
      exports3.filterLimit = filterLimit;
      exports3.filterSeries = filterSeries;
      exports3.forever = forever;
      exports3.groupBy = groupBy;
      exports3.groupByLimit = groupByLimit;
      exports3.groupBySeries = groupBySeries;
      exports3.log = log;
      exports3.map = map;
      exports3.mapLimit = mapLimit;
      exports3.mapSeries = mapSeries;
      exports3.mapValues = mapValues;
      exports3.mapValuesLimit = mapValuesLimit;
      exports3.mapValuesSeries = mapValuesSeries;
      exports3.memoize = memoize;
      exports3.nextTick = nextTick;
      exports3.parallel = parallelLimit;
      exports3.parallelLimit = parallelLimit$1;
      exports3.priorityQueue = priorityQueue;
      exports3.queue = queue$1;
      exports3.race = race;
      exports3.reduce = reduce;
      exports3.reduceRight = reduceRight;
      exports3.reflect = reflect;
      exports3.reflectAll = reflectAll;
      exports3.reject = reject;
      exports3.rejectLimit = rejectLimit;
      exports3.rejectSeries = rejectSeries;
      exports3.retry = retry;
      exports3.retryable = retryable;
      exports3.seq = seq;
      exports3.series = series;
      exports3.setImmediate = setImmediate$1;
      exports3.some = some;
      exports3.someLimit = someLimit;
      exports3.someSeries = someSeries;
      exports3.sortBy = sortBy;
      exports3.timeout = timeout;
      exports3.times = times;
      exports3.timesLimit = timeLimit;
      exports3.timesSeries = timesSeries;
      exports3.transform = transform;
      exports3.tryEach = tryEach;
      exports3.unmemoize = unmemoize;
      exports3.until = until;
      exports3.waterfall = waterfall;
      exports3.whilst = whilst;
      exports3.all = every;
      exports3.allLimit = everyLimit;
      exports3.allSeries = everySeries;
      exports3.any = some;
      exports3.anyLimit = someLimit;
      exports3.anySeries = someSeries;
      exports3.find = detect;
      exports3.findLimit = detectLimit;
      exports3.findSeries = detectSeries;
      exports3.forEach = eachLimit;
      exports3.forEachSeries = eachSeries;
      exports3.forEachLimit = eachLimit$1;
      exports3.forEachOf = eachOf;
      exports3.forEachOfSeries = eachOfSeries;
      exports3.forEachOfLimit = eachOfLimit;
      exports3.inject = reduce;
      exports3.foldl = reduce;
      exports3.foldr = reduceRight;
      exports3.select = filter;
      exports3.selectLimit = filterLimit;
      exports3.selectSeries = filterSeries;
      exports3.wrapSync = asyncify;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// ../promptUI/node_modules/isstream/isstream.js
var require_isstream = __commonJS({
  "../promptUI/node_modules/isstream/isstream.js"(exports2, module2) {
    var stream = require("stream");
    function isStream(obj) {
      return obj instanceof stream.Stream;
    }
    function isReadable(obj) {
      return isStream(obj) && typeof obj._read == "function" && typeof obj._readableState == "object";
    }
    function isWritable(obj) {
      return isStream(obj) && typeof obj._write == "function" && typeof obj._writableState == "object";
    }
    function isDuplex(obj) {
      return isReadable(obj) && isWritable(obj);
    }
    module2.exports = isStream;
    module2.exports.isReadable = isReadable;
    module2.exports.isWritable = isWritable;
    module2.exports.isDuplex = isDuplex;
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports/file.js
var require_file = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports/file.js"(exports2) {
    var events = require("events");
    var fs = require("fs");
    var path4 = require("path");
    var util = require("util");
    var async = require_async();
    var zlib = require("zlib");
    var common = require_common();
    var Transport = require_transport().Transport;
    var isWritable = require_isstream().isWritable;
    var Stream = require("stream").Stream;
    var os = require("os");
    var File = exports2.File = function(options) {
      var self2 = this;
      Transport.call(this, options);
      function throwIf(target) {
        Array.prototype.slice.call(arguments, 1).forEach(function(name2) {
          if (options[name2]) {
            throw new Error("Cannot set " + name2 + " and " + target + "together");
          }
        });
      }
      if (options.filename || options.dirname) {
        throwIf("filename or dirname", "stream");
        this._basename = this.filename = options.filename ? path4.basename(options.filename) : "winston.log";
        this.dirname = options.dirname || path4.dirname(options.filename);
        this.options = options.options || { flags: "a" };
        this.options.highWaterMark = this.options.highWaterMark || 24;
      } else if (options.stream) {
        throwIf("stream", "filename", "maxsize");
        this._stream = options.stream;
        this._isStreams2 = isWritable(this._stream);
        this._stream.on("error", function(error) {
          self2.emit("error", error);
        });
        this._stream.setMaxListeners(Infinity);
      } else {
        throw new Error("Cannot log to file without filename or stream.");
      }
      this.json = options.json !== false;
      this.logstash = options.logstash || false;
      this.colorize = options.colorize || false;
      this.maxsize = options.maxsize || null;
      this.rotationFormat = options.rotationFormat || false;
      this.zippedArchive = options.zippedArchive || false;
      this.maxFiles = options.maxFiles || null;
      this.prettyPrint = options.prettyPrint || false;
      this.label = options.label || null;
      this.timestamp = options.timestamp != null ? options.timestamp : true;
      this.eol = options.eol || os.EOL;
      this.tailable = options.tailable || false;
      this.depth = options.depth || null;
      this.showLevel = options.showLevel === void 0 ? true : options.showLevel;
      this.maxRetries = options.maxRetries || 2;
      if (this.json) {
        this.stringify = options.stringify;
      }
      this._size = 0;
      this._created = 0;
      this._buffer = [];
      this._draining = false;
      this._opening = false;
      this._failures = 0;
      this._archive = null;
    };
    util.inherits(File, Transport);
    File.prototype.name = "file";
    File.prototype.log = function(level, msg, meta, callback) {
      if (this.silent) {
        return callback(null, true);
      }
      if (this._failures >= this.maxRetries) {
        return callback(new Error("Transport is in a failed state."));
      }
      var self2 = this;
      if (typeof msg !== "string") {
        msg = "" + msg;
      }
      var output = common.log({
        level,
        message: msg,
        meta,
        json: this.json,
        logstash: this.logstash,
        colorize: this.colorize,
        prettyPrint: this.prettyPrint,
        timestamp: this.timestamp,
        showLevel: this.showLevel,
        stringify: this.stringify,
        label: this.label,
        depth: this.depth,
        formatter: this.formatter,
        humanReadableUnhandledException: this.humanReadableUnhandledException
      });
      if (typeof output === "string") {
        output += this.eol;
      }
      if (!this.filename) {
        this._write(output, callback);
        this._size += output.length;
        this._lazyDrain();
      } else {
        this.open(function(err) {
          if (err) {
            return self2._buffer.push([output, callback]);
          }
          self2._write(output, callback);
          self2._size += output.length;
          self2._lazyDrain();
        });
      }
    };
    File.prototype._write = function(data, callback) {
      if (this._isStreams2) {
        this._stream.write(data);
        return callback && process.nextTick(function() {
          callback(null, true);
        });
      }
      var ret = this._stream.write(data);
      if (!callback)
        return;
      if (ret === false) {
        return this._stream.once("drain", function() {
          callback(null, true);
        });
      }
      process.nextTick(function() {
        callback(null, true);
      });
    };
    File.prototype.query = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var file = path4.join(this.dirname, this.filename), options = this.normalizeQuery(options), buff = "", results = [], row = 0;
      var stream = fs.createReadStream(file, {
        encoding: "utf8"
      });
      stream.on("error", function(err) {
        if (stream.readable) {
          stream.destroy();
        }
        if (!callback)
          return;
        return err.code !== "ENOENT" ? callback(err) : callback(null, results);
      });
      stream.on("data", function(data) {
        var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
        for (; i2 < l; i2++) {
          if (!options.start || row >= options.start) {
            add(data[i2]);
          }
          row++;
        }
        buff = data[l];
      });
      stream.on("close", function() {
        if (buff)
          add(buff, true);
        if (options.order === "desc") {
          results = results.reverse();
        }
        if (callback)
          callback(null, results);
      });
      function add(buff2, attempt) {
        try {
          var log = JSON.parse(buff2);
          if (check(log))
            push(log);
        } catch (e) {
          if (!attempt) {
            stream.emit("error", e);
          }
        }
      }
      function push(log) {
        if (options.rows && results.length >= options.rows && options.order != "desc") {
          if (stream.readable) {
            stream.destroy();
          }
          return;
        }
        if (options.fields) {
          var obj = {};
          options.fields.forEach(function(key) {
            obj[key] = log[key];
          });
          log = obj;
        }
        if (options.order === "desc") {
          if (results.length >= options.rows) {
            results.shift();
          }
        }
        results.push(log);
      }
      function check(log) {
        if (!log)
          return;
        if (typeof log !== "object")
          return;
        var time = new Date(log.timestamp);
        if (options.from && time < options.from || options.until && time > options.until || options.level && options.level !== log.level) {
          return;
        }
        return true;
      }
    };
    File.prototype.stream = function(options) {
      var file = path4.join(this.dirname, this.filename), options = options || {}, stream = new Stream();
      var tail = {
        file,
        start: options.start
      };
      stream.destroy = common.tailFile(tail, function(err, line) {
        if (err) {
          return stream.emit("error", err);
        }
        try {
          stream.emit("data", line);
          line = JSON.parse(line);
          stream.emit("log", line);
        } catch (e) {
          stream.emit("error", e);
        }
      });
      return stream;
    };
    File.prototype.open = function(callback) {
      if (this.opening) {
        return callback(true);
      } else if (!this._stream || this.maxsize && this._size >= this.maxsize) {
        callback(true);
        return this._createStream();
      }
      this._archive = this.zippedArchive ? this._stream.path : null;
      callback();
    };
    File.prototype.close = function() {
      var self2 = this;
      if (this._stream) {
        this._stream.end();
        this._stream.destroySoon();
        this._stream.once("finish", function() {
          self2.emit("flush");
          self2.emit("closed");
        });
      }
    };
    File.prototype.flush = function() {
      var self2 = this;
      if (!this._buffer.length) {
        return self2.emit("flush");
      }
      this._buffer.forEach(function(item2) {
        var str = item2[0], callback = item2[1];
        process.nextTick(function() {
          self2._write(str, callback);
          self2._size += str.length;
        });
      });
      self2._buffer.length = 0;
      self2._stream.once("drain", function() {
        self2.emit("flush");
        self2.emit("logged");
      });
    };
    File.prototype._createStream = function() {
      var self2 = this;
      this.opening = true;
      (function checkFile(target) {
        var fullname = path4.join(self2.dirname, target);
        function createAndFlush(size) {
          if (self2._stream) {
            self2._stream.end();
            self2._stream.destroySoon();
          }
          self2._size = size;
          self2.filename = target;
          self2._stream = fs.createWriteStream(fullname, self2.options);
          self2._isStreams2 = isWritable(self2._stream);
          self2._stream.on("error", function(error) {
            if (self2._failures < self2.maxRetries) {
              self2._createStream();
              self2._failures++;
            } else {
              self2.emit("error", error);
            }
          });
          self2._stream.setMaxListeners(Infinity);
          self2.once("flush", function() {
            self2.flush();
            self2.opening = false;
            self2.emit("open", fullname);
          });
          self2.flush();
          compressFile();
        }
        function compressFile() {
          if (self2._archive) {
            var gzip = zlib.createGzip();
            var inp = fs.createReadStream(String(self2._archive));
            var out = fs.createWriteStream(self2._archive + ".gz");
            inp.pipe(gzip).pipe(out);
            fs.unlink(String(self2._archive), function() {
            });
            self2._archive = "";
          }
        }
        fs.stat(fullname, function(err, stats) {
          if (err) {
            if (err.code !== "ENOENT") {
              return self2.emit("error", err);
            }
            return createAndFlush(0);
          }
          if (!stats || self2.maxsize && stats.size >= self2.maxsize) {
            return self2._incFile(function() {
              checkFile(self2._getFile());
            });
          }
          createAndFlush(stats.size);
        });
      })(this._getFile());
    };
    File.prototype._incFile = function(callback) {
      var ext = path4.extname(this._basename), basename3 = path4.basename(this._basename, ext), oldest, target;
      if (!this.tailable) {
        this._created += 1;
        this._checkMaxFilesIncrementing(ext, basename3, callback);
      } else {
        this._checkMaxFilesTailable(ext, basename3, callback);
      }
    };
    File.prototype._getFile = function() {
      var ext = path4.extname(this._basename), basename3 = path4.basename(this._basename, ext);
      return !this.tailable && this._created ? basename3 + (this.rotationFormat ? this.rotationFormat() : this._created) + ext : basename3 + ext;
    };
    File.prototype._checkMaxFilesIncrementing = function(ext, basename3, callback) {
      var oldest, target, self2 = this;
      if (self2.zippedArchive) {
        self2._archive = path4.join(self2.dirname, basename3 + (self2._created === 1 ? "" : self2._created - 1) + ext);
      }
      if (!self2.maxFiles || self2._created < self2.maxFiles) {
        return callback();
      }
      oldest = self2._created - self2.maxFiles;
      target = path4.join(self2.dirname, basename3 + (oldest !== 0 ? oldest : "") + ext + (self2.zippedArchive ? ".gz" : ""));
      fs.unlink(target, callback);
    };
    File.prototype._checkMaxFilesTailable = function(ext, basename3, callback) {
      var tasks = [], self2 = this;
      if (!this.maxFiles)
        return;
      for (var x = this.maxFiles - 1; x > 0; x--) {
        tasks.push(function(i2) {
          return function(cb) {
            var tmppath = path4.join(self2.dirname, basename3 + (i2 - 1) + ext + (self2.zippedArchive ? ".gz" : ""));
            fs.exists(tmppath, function(exists2) {
              if (!exists2) {
                return cb(null);
              }
              fs.rename(tmppath, path4.join(self2.dirname, basename3 + i2 + ext + (self2.zippedArchive ? ".gz" : "")), cb);
            });
          };
        }(x));
      }
      if (self2.zippedArchive) {
        self2._archive = path4.join(self2.dirname, basename3 + 1 + ext);
      }
      async.series(tasks, function(err) {
        fs.rename(
          path4.join(self2.dirname, basename3 + ext),
          path4.join(self2.dirname, basename3 + 1 + ext),
          callback
        );
      });
    };
    File.prototype._lazyDrain = function() {
      var self2 = this;
      if (!this._draining && this._stream) {
        this._draining = true;
        this._stream.once("drain", function() {
          self2._draining = false;
          self2.emit("logged");
        });
      }
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports/http.js
var require_http = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports/http.js"(exports2) {
    var util = require("util");
    var winston = require_winston();
    var http = require("http");
    var https = require("https");
    var Stream = require("stream").Stream;
    var Transport = require_transport().Transport;
    var Http = exports2.Http = function(options) {
      Transport.call(this, options);
      options = options || {};
      this.name = "http";
      this.ssl = !!options.ssl;
      this.host = options.host || "localhost";
      this.port = options.port;
      this.auth = options.auth;
      this.path = options.path || "";
      this.agent = options.agent;
      this.headers = options.headers || {};
      this.headers["content-type"] = "application/json";
      if (!this.port) {
        this.port = this.ssl ? 443 : 80;
      }
    };
    util.inherits(Http, winston.Transport);
    Http.prototype.name = "http";
    Http.prototype._request = function(options, callback) {
      options = options || {};
      var auth = options.auth || this.auth, path4 = options.path || this.path || "", req;
      delete options.auth;
      delete options.path;
      req = (this.ssl ? https : http).request({
        host: this.host,
        port: this.port,
        path: "/" + path4.replace(/^\//, ""),
        method: "POST",
        headers: this.headers,
        agent: this.agent,
        auth: auth ? auth.username + ":" + auth.password : ""
      });
      req.on("error", callback);
      req.on("response", function(res) {
        var body = "";
        res.on("data", function(chunk2) {
          body += chunk2;
        });
        res.on("end", function() {
          callback(null, res, body);
        });
        res.resume();
      });
      req.end(new Buffer.from(JSON.stringify(options), "utf8"));
    };
    Http.prototype.log = function(level, msg, meta, callback) {
      var self2 = this;
      if (typeof meta === "function") {
        callback = meta;
        meta = {};
      }
      var options = {
        method: "collect",
        params: {
          level,
          message: msg,
          meta
        }
      };
      if (meta) {
        if (meta.path) {
          options.path = meta.path;
          delete meta.path;
        }
        if (meta.auth) {
          options.auth = meta.auth;
          delete meta.auth;
        }
      }
      this._request(options, function(err, res) {
        if (res && res.statusCode !== 200) {
          err = new Error("HTTP Status Code: " + res.statusCode);
        }
        if (err)
          return callback(err);
        self2.emit("logged");
        if (callback)
          callback(null, true);
      });
    };
    Http.prototype.query = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var self2 = this, options = this.normalizeQuery(options);
      options = {
        method: "query",
        params: options
      };
      if (options.params.path) {
        options.path = options.params.path;
        delete options.params.path;
      }
      if (options.params.auth) {
        options.auth = options.params.auth;
        delete options.params.auth;
      }
      this._request(options, function(err, res, body) {
        if (res && res.statusCode !== 200) {
          err = new Error("HTTP Status Code: " + res.statusCode);
        }
        if (err)
          return callback(err);
        if (typeof body === "string") {
          try {
            body = JSON.parse(body);
          } catch (e) {
            return callback(e);
          }
        }
        callback(null, body);
      });
    };
    Http.prototype.stream = function(options) {
      options = options || {};
      var self2 = this, stream = new Stream(), req, buff;
      stream.destroy = function() {
        req.destroy();
      };
      options = {
        method: "stream",
        params: options
      };
      if (options.params.path) {
        options.path = options.params.path;
        delete options.params.path;
      }
      if (options.params.auth) {
        options.auth = options.params.auth;
        delete options.params.auth;
      }
      req = this._request(options);
      buff = "";
      req.on("data", function(data) {
        var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
        for (; i2 < l; i2++) {
          try {
            stream.emit("log", JSON.parse(data[i2]));
          } catch (e) {
            stream.emit("error", e);
          }
        }
        buff = data[l];
      });
      req.on("error", function(err) {
        stream.emit("error", err);
      });
      return stream;
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports/memory.js
var require_memory = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports/memory.js"(exports2) {
    var events = require("events");
    var util = require("util");
    var common = require_common();
    var Transport = require_transport().Transport;
    var Memory = exports2.Memory = function(options) {
      Transport.call(this, options);
      options = options || {};
      this.errorOutput = [];
      this.writeOutput = [];
      this.json = options.json || false;
      this.colorize = options.colorize || false;
      this.prettyPrint = options.prettyPrint || false;
      this.timestamp = typeof options.timestamp !== "undefined" ? options.timestamp : false;
      this.showLevel = options.showLevel === void 0 ? true : options.showLevel;
      this.label = options.label || null;
      this.depth = options.depth || null;
      if (this.json) {
        this.stringify = options.stringify || function(obj) {
          return JSON.stringify(obj, null, 2);
        };
      }
    };
    util.inherits(Memory, Transport);
    Memory.prototype.name = "memory";
    Memory.prototype.log = function(level, msg, meta, callback) {
      if (this.silent) {
        return callback(null, true);
      }
      var self2 = this, output;
      output = common.log({
        colorize: this.colorize,
        json: this.json,
        level,
        message: msg,
        meta,
        stringify: this.stringify,
        timestamp: this.timestamp,
        prettyPrint: this.prettyPrint,
        raw: this.raw,
        label: this.label,
        depth: this.depth,
        formatter: this.formatter,
        humanReadableUnhandledException: this.humanReadableUnhandledException
      });
      if (level === "error" || level === "debug") {
        this.errorOutput.push(output);
      } else {
        this.writeOutput.push(output);
      }
      self2.emit("logged");
      callback(null, true);
    };
    Memory.prototype.clearLogs = function() {
      this.errorOutput = [];
      this.writeOutput = [];
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/transports.js
var require_transports = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/transports.js"(exports2) {
    Object.defineProperty(exports2, "Console", {
      configurable: true,
      enumerable: true,
      get: function() {
        return require_console().Console;
      }
    });
    Object.defineProperty(exports2, "File", {
      configurable: true,
      enumerable: true,
      get: function() {
        return require_file().File;
      }
    });
    Object.defineProperty(exports2, "Http", {
      configurable: true,
      enumerable: true,
      get: function() {
        return require_http().Http;
      }
    });
    Object.defineProperty(exports2, "Memory", {
      configurable: true,
      enumerable: true,
      get: function() {
        return require_memory().Memory;
      }
    });
  }
});

// ../promptUI/node_modules/stack-trace/lib/stack-trace.js
var require_stack_trace = __commonJS({
  "../promptUI/node_modules/stack-trace/lib/stack-trace.js"(exports2) {
    exports2.get = function(belowFn) {
      var oldLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = Infinity;
      var dummyObject = {};
      var v8Handler = Error.prepareStackTrace;
      Error.prepareStackTrace = function(dummyObject2, v8StackTrace2) {
        return v8StackTrace2;
      };
      Error.captureStackTrace(dummyObject, belowFn || exports2.get);
      var v8StackTrace = dummyObject.stack;
      Error.prepareStackTrace = v8Handler;
      Error.stackTraceLimit = oldLimit;
      return v8StackTrace;
    };
    exports2.parse = function(err) {
      if (!err.stack) {
        return [];
      }
      var self2 = this;
      var lines = err.stack.split("\n").slice(1);
      return lines.map(function(line) {
        if (line.match(/^\s*[-]{4,}$/)) {
          return self2._createParsedCallSite({
            fileName: line,
            lineNumber: null,
            functionName: null,
            typeName: null,
            methodName: null,
            columnNumber: null,
            "native": null
          });
        }
        var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
        if (!lineMatch) {
          return;
        }
        var object = null;
        var method = null;
        var functionName = null;
        var typeName = null;
        var methodName = null;
        var isNative = lineMatch[5] === "native";
        if (lineMatch[1]) {
          functionName = lineMatch[1];
          var methodStart = functionName.lastIndexOf(".");
          if (functionName[methodStart - 1] == ".")
            methodStart--;
          if (methodStart > 0) {
            object = functionName.substr(0, methodStart);
            method = functionName.substr(methodStart + 1);
            var objectEnd = object.indexOf(".Module");
            if (objectEnd > 0) {
              functionName = functionName.substr(objectEnd + 1);
              object = object.substr(0, objectEnd);
            }
          }
          typeName = null;
        }
        if (method) {
          typeName = object;
          methodName = method;
        }
        if (method === "<anonymous>") {
          methodName = null;
          functionName = null;
        }
        var properties = {
          fileName: lineMatch[2] || null,
          lineNumber: parseInt(lineMatch[3], 10) || null,
          functionName,
          typeName,
          methodName,
          columnNumber: parseInt(lineMatch[4], 10) || null,
          "native": isNative
        };
        return self2._createParsedCallSite(properties);
      }).filter(function(callSite) {
        return !!callSite;
      });
    };
    function CallSite(properties) {
      for (var property in properties) {
        this[property] = properties[property];
      }
    }
    var strProperties = [
      "this",
      "typeName",
      "functionName",
      "methodName",
      "fileName",
      "lineNumber",
      "columnNumber",
      "function",
      "evalOrigin"
    ];
    var boolProperties = [
      "topLevel",
      "eval",
      "native",
      "constructor"
    ];
    strProperties.forEach(function(property) {
      CallSite.prototype[property] = null;
      CallSite.prototype["get" + property[0].toUpperCase() + property.substr(1)] = function() {
        return this[property];
      };
    });
    boolProperties.forEach(function(property) {
      CallSite.prototype[property] = false;
      CallSite.prototype["is" + property[0].toUpperCase() + property.substr(1)] = function() {
        return this[property];
      };
    });
    exports2._createParsedCallSite = function(properties) {
      return new CallSite(properties);
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/exception.js
var require_exception = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/exception.js"(exports2) {
    var os = require("os");
    var stackTrace = require_stack_trace();
    var exception = exports2;
    exception.getAllInfo = function(err) {
      return {
        date: (/* @__PURE__ */ new Date()).toString(),
        process: exception.getProcessInfo(),
        os: exception.getOsInfo(),
        trace: exception.getTrace(err),
        stack: err.stack && err.stack.split("\n")
      };
    };
    exception.getProcessInfo = function() {
      return {
        pid: process.pid,
        uid: process.getuid ? process.getuid() : null,
        gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        execPath: process.execPath,
        version: process.version,
        argv: process.argv,
        memoryUsage: process.memoryUsage()
      };
    };
    exception.getOsInfo = function() {
      return {
        loadavg: os.loadavg(),
        uptime: os.uptime()
      };
    };
    exception.getTrace = function(err) {
      var trace = err ? stackTrace.parse(err) : stackTrace.get();
      return trace.map(function(site) {
        return {
          column: site.getColumnNumber(),
          file: site.getFileName(),
          function: site.getFunctionName(),
          line: site.getLineNumber(),
          method: site.getMethodName(),
          native: site.isNative()
        };
      });
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/container.js
var require_container = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/container.js"(exports2) {
    var common = require_common();
    var winston = require_winston();
    var extend = require("util")._extend;
    var Container = exports2.Container = function(options) {
      this.loggers = {};
      this.options = options || {};
      this.default = {
        transports: [
          new winston.transports.Console({
            level: "silly",
            colorize: false
          })
        ]
      };
    };
    Container.prototype.get = Container.prototype.add = function(id, options) {
      var self2 = this, existing;
      if (!this.loggers[id]) {
        options = extend({}, options || this.options || this.default);
        existing = options.transports || this.options.transports;
        options.transports = existing ? existing.slice() : [];
        if (options.transports.length === 0 && (!options || !options["console"])) {
          options.transports.push(this.default.transports[0]);
        }
        Object.keys(options).forEach(function(key) {
          if (key === "transports" || key === "filters" || key === "rewriters") {
            return;
          }
          var name2 = common.capitalize(key);
          if (!winston.transports[name2]) {
            throw new Error("Cannot add unknown transport: " + name2);
          }
          var namedOptions = options[key];
          namedOptions.id = id;
          options.transports.push(new winston.transports[name2](namedOptions));
        });
        options.id = id;
        this.loggers[id] = new winston.Logger(options);
        this.loggers[id].on("close", function() {
          self2._delete(id);
        });
      }
      return this.loggers[id];
    };
    Container.prototype.has = function(id) {
      return !!this.loggers[id];
    };
    Container.prototype.close = function(id) {
      var self2 = this;
      function _close(id2) {
        if (!self2.loggers[id2]) {
          return;
        }
        self2.loggers[id2].close();
        self2._delete(id2);
      }
      return id ? _close(id) : Object.keys(this.loggers).forEach(function(id2) {
        _close(id2);
      });
    };
    Container.prototype._delete = function(id) {
      delete this.loggers[id];
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston/logger.js
var require_logger = __commonJS({
  "../promptUI/node_modules/winston/lib/winston/logger.js"(exports2) {
    var events = require("events");
    var util = require("util");
    var async = require_async();
    var config = require_config();
    var common = require_common();
    var exception = require_exception();
    var Stream = require("stream").Stream;
    var formatRegExp = /%[sdj%]/g;
    var Logger = exports2.Logger = function(options) {
      events.EventEmitter.call(this);
      this.configure(options);
    };
    util.inherits(Logger, events.EventEmitter);
    Logger.prototype.configure = function(options) {
      var self2 = this;
      if (Array.isArray(this._names) && this._names.length) {
        this.clear();
      }
      options = options || {};
      this.transports = {};
      this._names = [];
      if (options.transports) {
        options.transports.forEach(function(transport) {
          self2.add(transport, null, true);
        });
      }
      this.padLevels = options.padLevels || false;
      this.setLevels(options.levels);
      if (options.colors) {
        config.addColors(options.colors);
      }
      this.id = options.id || null;
      this.level = options.level || "info";
      this.emitErrs = options.emitErrs || false;
      this.stripColors = options.stripColors || false;
      this.exitOnError = typeof options.exitOnError !== "undefined" ? options.exitOnError : true;
      this.exceptionHandlers = {};
      this.profilers = {};
      ["rewriters", "filters"].forEach(function(kind) {
        self2[kind] = Array.isArray(options[kind]) ? options[kind] : [];
      });
      if (options.exceptionHandlers) {
        this.handleExceptions(options.exceptionHandlers);
      }
    };
    Logger.prototype.log = function(level) {
      var args = Array.prototype.slice.call(arguments, 1), self2 = this, transports;
      while (args[args.length - 1] === null) {
        args.pop();
      }
      var callback = typeof args[args.length - 1] === "function" ? args.pop() : null;
      function onError(err) {
        if (callback) {
          callback(err);
        } else if (self2.emitErrs) {
          self2.emit("error", err);
        }
      }
      if (this._names.length === 0) {
        return onError(new Error("Cannot log with no transports."));
      } else if (typeof self2.levels[level] === "undefined") {
        return onError(new Error("Unknown log level: " + level));
      }
      var targets = this._names.filter(function(name2) {
        var transport = self2.transports[name2];
        return transport.level && self2.levels[transport.level] >= self2.levels[level] || !transport.level && self2.levels[self2.level] >= self2.levels[level];
      });
      if (!targets.length) {
        if (callback) {
          callback();
        }
        return;
      }
      var msg, meta = {}, validMeta = false;
      var hasFormat = args && args[0] && args[0].match && args[0].match(formatRegExp) !== null;
      var tokens = hasFormat ? args[0].match(formatRegExp) : [];
      var ptokens = tokens.filter(function(t) {
        return t === "%%";
      });
      if (args.length - 1 - (tokens.length - ptokens.length) > 0 || args.length === 1) {
        meta = args[args.length - 1] || args;
        var metaType = Object.prototype.toString.call(meta);
        validMeta = metaType === "[object Object]" || metaType === "[object Error]" || metaType === "[object Array]";
        meta = validMeta ? args.pop() : {};
      }
      msg = util.format.apply(null, args);
      function finish(err) {
        if (callback) {
          if (err)
            return callback(err);
          callback(null, level, msg, meta);
        }
        callback = null;
        if (!err) {
          self2.emit("logged", level, msg, meta);
        }
      }
      if (this.padLevels) {
        msg = new Array(this.levelLength - level.length + 1).join(" ") + msg;
      }
      this.rewriters.forEach(function(rewriter) {
        meta = rewriter(level, msg, meta, self2);
      });
      this.filters.forEach(function(filter) {
        var filtered = filter(level, msg, meta, self2);
        if (typeof filtered === "string")
          msg = filtered;
        else {
          msg = filtered.msg;
          meta = filtered.meta;
        }
      });
      if (this.stripColors) {
        var code = /\u001b\[(\d+(;\d+)*)?m/g;
        msg = ("" + msg).replace(code, "");
      }
      function transportLog(name2, next) {
        var transport = self2.transports[name2];
        transport.log(level, msg, meta, function(err) {
          if (err) {
            err.transport = transport;
            finish(err);
            return next();
          }
          self2.emit("logging", transport, level, msg, meta);
          next();
        });
      }
      async.forEach(targets, transportLog, finish);
      return this;
    };
    Logger.prototype.query = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      var self2 = this, options = options || {}, results = {}, query = common.clone(options.query) || {}, transports;
      function queryTransport(transport, next) {
        if (options.query) {
          options.query = transport.formatQuery(query);
        }
        transport.query(options, function(err, results2) {
          if (err) {
            return next(err);
          }
          next(null, transport.formatResults(results2, options.format));
        });
      }
      function addResults(transport, next) {
        queryTransport(transport, function(err, result) {
          if (next) {
            result = err || result;
            if (result) {
              results[transport.name] = result;
            }
            next();
          }
          next = null;
        });
      }
      if (options.transport) {
        options.transport = options.transport.toLowerCase();
        return queryTransport(this.transports[options.transport], callback);
      }
      transports = this._names.map(function(name2) {
        return self2.transports[name2];
      }).filter(function(transport) {
        return !!transport.query;
      });
      async.forEach(transports, addResults, function() {
        callback(null, results);
      });
    };
    Logger.prototype.stream = function(options) {
      var self2 = this, options = options || {}, out = new Stream(), streams = [], transports;
      if (options.transport) {
        var transport = this.transports[options.transport];
        delete options.transport;
        if (transport && transport.stream) {
          return transport.stream(options);
        }
      }
      out._streams = streams;
      out.destroy = function() {
        var i2 = streams.length;
        while (i2--)
          streams[i2].destroy();
      };
      transports = this._names.map(function(name2) {
        return self2.transports[name2];
      }).filter(function(transport2) {
        return !!transport2.stream;
      });
      transports.forEach(function(transport2) {
        var stream = transport2.stream(options);
        if (!stream)
          return;
        streams.push(stream);
        stream.on("log", function(log) {
          log.transport = log.transport || [];
          log.transport.push(transport2.name);
          out.emit("log", log);
        });
        stream.on("error", function(err) {
          err.transport = err.transport || [];
          err.transport.push(transport2.name);
          out.emit("error", err);
        });
      });
      return out;
    };
    Logger.prototype.close = function() {
      var self2 = this;
      this._names.forEach(function(name2) {
        var transport = self2.transports[name2];
        if (transport && transport.close) {
          transport.close();
        }
      });
      this.emit("close");
    };
    Logger.prototype.handleExceptions = function() {
      var args = Array.prototype.slice.call(arguments), handlers = [], self2 = this;
      args.forEach(function(a) {
        if (Array.isArray(a)) {
          handlers = handlers.concat(a);
        } else {
          handlers.push(a);
        }
      });
      this.exceptionHandlers = this.exceptionHandlers || {};
      handlers.forEach(function(handler) {
        self2.exceptionHandlers[handler.name] = handler;
      });
      this._hnames = Object.keys(self2.exceptionHandlers);
      if (!this.catchExceptions) {
        this.catchExceptions = this._uncaughtException.bind(this);
        process.on("uncaughtException", this.catchExceptions);
      }
    };
    Logger.prototype.unhandleExceptions = function() {
      var self2 = this;
      if (this.catchExceptions) {
        Object.keys(this.exceptionHandlers).forEach(function(name2) {
          var handler = self2.exceptionHandlers[name2];
          if (handler.close) {
            handler.close();
          }
        });
        this.exceptionHandlers = {};
        Object.keys(this.transports).forEach(function(name2) {
          var transport = self2.transports[name2];
          if (transport.handleExceptions) {
            transport.handleExceptions = false;
          }
        });
        process.removeListener("uncaughtException", this.catchExceptions);
        this.catchExceptions = false;
      }
    };
    Logger.prototype.add = function(transport, options, created) {
      var instance = created ? transport : new transport(options);
      if (!instance.name && !instance.log) {
        throw new Error("Unknown transport with no log() method");
      } else if (this.transports[instance.name]) {
        throw new Error("Transport already attached: " + instance.name + ", assign a different name");
      }
      this.transports[instance.name] = instance;
      this._names = Object.keys(this.transports);
      instance._onError = this._onError.bind(this, instance);
      if (!created) {
        instance.on("error", instance._onError);
      }
      if (instance.handleExceptions && !this.catchExceptions) {
        this.handleExceptions();
      }
      return this;
    };
    Logger.prototype.clear = function() {
      Object.keys(this.transports).forEach(function(name2) {
        this.remove({ name: name2 });
      }, this);
    };
    Logger.prototype.remove = function(transport) {
      var name2 = typeof transport !== "string" ? transport.name || transport.prototype.name : transport;
      if (!this.transports[name2]) {
        throw new Error("Transport " + name2 + " not attached to this instance");
      }
      var instance = this.transports[name2];
      delete this.transports[name2];
      this._names = Object.keys(this.transports);
      if (instance.close) {
        instance.close();
      }
      if (instance._onError) {
        instance.removeListener("error", instance._onError);
      }
      return this;
    };
    Logger.prototype.startTimer = function() {
      return new ProfileHandler(this);
    };
    Logger.prototype.profile = function(id) {
      var now = Date.now(), then, args, msg, meta, callback;
      if (this.profilers[id]) {
        then = this.profilers[id];
        delete this.profilers[id];
        args = Array.prototype.slice.call(arguments);
        callback = typeof args[args.length - 1] === "function" ? args.pop() : null;
        meta = typeof args[args.length - 1] === "object" ? args.pop() : {};
        msg = args.length === 2 ? args[1] : id;
        meta.durationMs = now - then;
        return this.info(msg, meta, callback);
      } else {
        this.profilers[id] = now;
      }
      return this;
    };
    Logger.prototype.setLevels = function(target) {
      return common.setLevels(this, this.levels, target);
    };
    Logger.prototype.cli = function() {
      this.padLevels = true;
      this.setLevels(config.cli.levels);
      config.addColors(config.cli.colors);
      if (this.transports.console) {
        this.transports.console.colorize = this.transports.console.colorize || true;
        this.transports.console.timestamp = this.transports.console.timestamp || false;
      }
      return this;
    };
    Logger.prototype._uncaughtException = function(err) {
      var self2 = this, responded = false, info = exception.getAllInfo(err), handlers = this._getExceptionHandlers(), timeout, doExit;
      doExit = typeof this.exitOnError === "function" ? this.exitOnError(err) : this.exitOnError;
      function logAndWait(transport, next) {
        transport.logException("uncaughtException: " + (err.message || err), info, next, err);
      }
      function gracefulExit() {
        if (doExit && !responded) {
          clearTimeout(timeout);
          responded = true;
          process.exit(1);
        }
      }
      if (!handlers || handlers.length === 0) {
        return gracefulExit();
      }
      async.forEach(handlers, logAndWait, gracefulExit);
      if (doExit) {
        timeout = setTimeout(gracefulExit, 3e3);
      }
    };
    Logger.prototype._getExceptionHandlers = function() {
      var self2 = this;
      return this._hnames.map(function(name2) {
        return self2.exceptionHandlers[name2];
      }).concat(this._names.map(function(name2) {
        return self2.transports[name2].handleExceptions && self2.transports[name2];
      })).filter(Boolean);
    };
    Logger.prototype._onError = function(transport, err) {
      if (this.emitErrs) {
        this.emit("error", err, transport);
      }
    };
    function ProfileHandler(logger) {
      this.logger = logger;
      this.start = Date.now();
    }
    ProfileHandler.prototype.done = function(msg) {
      var args = Array.prototype.slice.call(arguments), callback = typeof args[args.length - 1] === "function" ? args.pop() : null, meta = typeof args[args.length - 1] === "object" ? args.pop() : {};
      meta.duration = Date.now() - this.start + "ms";
      return this.logger.info(msg, meta, callback);
    };
  }
});

// ../promptUI/node_modules/winston/lib/winston.js
var require_winston = __commonJS({
  "../promptUI/node_modules/winston/lib/winston.js"(exports2) {
    var winston = exports2;
    winston.version = require_package().version;
    winston.transports = require_transports();
    var common = require_common();
    winston.hash = common.hash;
    winston.clone = common.clone;
    winston.longestElement = common.longestElement;
    winston.exception = require_exception();
    winston.config = require_config();
    winston.addColors = winston.config.addColors;
    winston.Container = require_container().Container;
    winston.Logger = require_logger().Logger;
    winston.Transport = require_transport().Transport;
    winston.loggers = new winston.Container();
    var defaultLogger = new winston.Logger({
      transports: [new winston.transports.Console()]
    });
    var methods = [
      "log",
      "query",
      "stream",
      "add",
      "remove",
      "clear",
      "profile",
      "startTimer",
      "extend",
      "cli",
      "handleExceptions",
      "unhandleExceptions",
      "configure"
    ];
    winston.padLevels = false;
    common.setLevels(winston, null, defaultLogger.levels);
    methods.forEach(function(method) {
      winston[method] = function() {
        return defaultLogger[method].apply(defaultLogger, arguments);
      };
    });
    winston.cli = function() {
      winston.padLevels = true;
      common.setLevels(winston, defaultLogger.levels, winston.config.cli.levels);
      defaultLogger.setLevels(winston.config.cli.levels);
      winston.config.addColors(winston.config.cli.colors);
      if (defaultLogger.transports.console) {
        defaultLogger.transports.console.colorize = true;
        defaultLogger.transports.console.timestamp = false;
      }
      return winston;
    };
    winston.setLevels = function(target) {
      common.setLevels(winston, defaultLogger.levels, target);
      defaultLogger.setLevels(target);
    };
    Object.defineProperty(winston, "level", {
      get: function() {
        return defaultLogger.level;
      },
      set: function(val) {
        defaultLogger.level = val;
        Object.keys(defaultLogger.transports).forEach(function(key) {
          defaultLogger.transports[key].level = val;
        });
      }
    });
    ["emitErrs", "exitOnError", "padLevels", "levelLength", "stripColors"].forEach(function(prop) {
      Object.defineProperty(winston, prop, {
        get: function() {
          return defaultLogger[prop];
        },
        set: function(val) {
          defaultLogger[prop] = val;
        }
      });
    });
    Object.defineProperty(winston, "default", {
      get: function() {
        return {
          transports: defaultLogger.transports,
          exceptionHandlers: defaultLogger.exceptionHandlers
        };
      }
    });
  }
});

// ../promptUI/node_modules/@colors/colors/lib/styles.js
var require_styles2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/styles.js"(exports2, module2) {
    var styles = {};
    module2["exports"] = styles;
    var codes = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(codes).forEach(function(key) {
      var val = codes[key];
      var style = styles[key] = [];
      style.open = "\x1B[" + val[0] + "m";
      style.close = "\x1B[" + val[1] + "m";
    });
  }
});

// ../promptUI/node_modules/@colors/colors/lib/system/has-flag.js
var require_has_flag = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/system/has-flag.js"(exports2, module2) {
    "use strict";
    module2.exports = function(flag, argv) {
      argv = argv || process.argv;
      var terminatorPos = argv.indexOf("--");
      var prefix = /^-{1,2}/.test(flag) ? "" : "--";
      var pos = argv.indexOf(prefix + flag);
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/system/supports-colors.js
var require_supports_colors2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/system/supports-colors.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor = void 0;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      var min2 = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        var osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(sign) {
          return sign in env;
        }) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min2;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if ("TERM_PROGRAM" in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Hyper":
            return 3;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min2;
      }
      return min2;
    }
    function getSupportLevel(stream) {
      var level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/custom/trap.js
var require_trap2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/custom/trap.js"(exports2, module2) {
    module2["exports"] = function runTheTrap(text, options) {
      var result = "";
      text = text || "Run the trap, drop the bass";
      text = text.split("");
      var trap = {
        a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
        b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
        c: ["\xA9", "\u023B", "\u03FE"],
        d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
        e: [
          "\xCB",
          "\u0115",
          "\u018E",
          "\u0258",
          "\u03A3",
          "\u03BE",
          "\u04BC",
          "\u0A6C"
        ],
        f: ["\u04FA"],
        g: ["\u0262"],
        h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
        i: ["\u0F0F"],
        j: ["\u0134"],
        k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
        l: ["\u0139"],
        m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
        n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
        o: [
          "\xD8",
          "\xF5",
          "\xF8",
          "\u01FE",
          "\u0298",
          "\u047A",
          "\u05DD",
          "\u06DD",
          "\u0E4F"
        ],
        p: ["\u01F7", "\u048E"],
        q: ["\u09CD"],
        r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
        s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
        t: ["\u0141", "\u0166", "\u0373"],
        u: ["\u01B1", "\u054D"],
        v: ["\u05D8"],
        w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
        x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
        y: ["\xA5", "\u04B0", "\u04CB"],
        z: ["\u01B5", "\u0240"]
      };
      text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [" "];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== "undefined") {
          result += trap[c][rand];
        } else {
          result += c;
        }
      });
      return result;
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/custom/zalgo.js
var require_zalgo2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/custom/zalgo.js"(exports2, module2) {
    module2["exports"] = function zalgo(text, options) {
      text = text || "   he is here   ";
      var soul = {
        "up": [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A"
        ],
        "down": [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323"
        ],
        "mid": [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489"
        ]
      };
      var all = [].concat(soul.up, soul.down, soul.mid);
      function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
      }
      function isChar(character) {
        var bool = false;
        all.filter(function(i2) {
          bool = i2 === character;
        });
        return bool;
      }
      function heComes(text2, options2) {
        var result = "";
        var counts;
        var l;
        options2 = options2 || {};
        options2["up"] = typeof options2["up"] !== "undefined" ? options2["up"] : true;
        options2["mid"] = typeof options2["mid"] !== "undefined" ? options2["mid"] : true;
        options2["down"] = typeof options2["down"] !== "undefined" ? options2["down"] : true;
        options2["size"] = typeof options2["size"] !== "undefined" ? options2["size"] : "maxi";
        text2 = text2.split("");
        for (l in text2) {
          if (isChar(l)) {
            continue;
          }
          result = result + text2[l];
          counts = { "up": 0, "down": 0, "mid": 0 };
          switch (options2.size) {
            case "mini":
              counts.up = randomNumber(8);
              counts.mid = randomNumber(2);
              counts.down = randomNumber(8);
              break;
            case "maxi":
              counts.up = randomNumber(16) + 3;
              counts.mid = randomNumber(4) + 1;
              counts.down = randomNumber(64) + 3;
              break;
            default:
              counts.up = randomNumber(8) + 1;
              counts.mid = randomNumber(6) / 2;
              counts.down = randomNumber(8) + 1;
              break;
          }
          var arr = ["up", "mid", "down"];
          for (var d in arr) {
            var index = arr[d];
            for (var i2 = 0; i2 <= counts[index]; i2++) {
              if (options2[index]) {
                result = result + soul[index][randomNumber(soul[index].length)];
              }
            }
          }
        }
        return result;
      }
      return heComes(text, options);
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/maps/america.js
var require_america2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/maps/america.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i2, exploded) {
        if (letter === " ")
          return letter;
        switch (i2 % 3) {
          case 0:
            return colors.red(letter);
          case 1:
            return colors.white(letter);
          case 2:
            return colors.blue(letter);
        }
      };
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/maps/zebra.js
var require_zebra2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/maps/zebra.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i2, exploded) {
        return i2 % 2 === 0 ? letter : colors.inverse(letter);
      };
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/maps/rainbow.js
var require_rainbow2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/maps/rainbow.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
      return function(letter, i2, exploded) {
        if (letter === " ") {
          return letter;
        } else {
          return colors[rainbowColors[i2++ % rainbowColors.length]](letter);
        }
      };
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/maps/random.js
var require_random2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/maps/random.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      var available = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
      ];
      return function(letter, i2, exploded) {
        return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
      };
    };
  }
});

// ../promptUI/node_modules/@colors/colors/lib/colors.js
var require_colors2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/lib/colors.js"(exports2, module2) {
    var colors = {};
    module2["exports"] = colors;
    colors.themes = {};
    var util = require("util");
    var ansiStyles = colors.styles = require_styles2();
    var defineProps = Object.defineProperties;
    var newLineRegex = new RegExp(/[\r\n]+/g);
    colors.supportsColor = require_supports_colors2().supportsColor;
    if (typeof colors.enabled === "undefined") {
      colors.enabled = colors.supportsColor() !== false;
    }
    colors.enable = function() {
      colors.enabled = true;
    };
    colors.disable = function() {
      colors.enabled = false;
    };
    colors.stripColors = colors.strip = function(str) {
      return ("" + str).replace(/\x1B\[\d+m/g, "");
    };
    var stylize = colors.stylize = function stylize2(str, style) {
      if (!colors.enabled) {
        return str + "";
      }
      var styleMap = ansiStyles[style];
      if (!styleMap && style in colors) {
        return colors[style](str);
      }
      return styleMap.open + str + styleMap.close;
    };
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    var escapeStringRegexp = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
    function build(_styles) {
      var builder = function builder2() {
        return applyStyle.apply(builder2, arguments);
      };
      builder._styles = _styles;
      builder.__proto__ = proto;
      return builder;
    }
    var styles = function() {
      var ret = {};
      ansiStyles.grey = ansiStyles.gray;
      Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
        ret[key] = {
          get: function() {
            return build(this._styles.concat(key));
          }
        };
      });
      return ret;
    }();
    var proto = defineProps(function colors2() {
    }, styles);
    function applyStyle() {
      var args = Array.prototype.slice.call(arguments);
      var str = args.map(function(arg) {
        if (arg != null && arg.constructor === String) {
          return arg;
        } else {
          return util.inspect(arg);
        }
      }).join(" ");
      if (!colors.enabled || !str) {
        return str;
      }
      var newLinesPresent = str.indexOf("\n") != -1;
      var nestedStyles = this._styles;
      var i2 = nestedStyles.length;
      while (i2--) {
        var code = ansiStyles[nestedStyles[i2]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) {
          str = str.replace(newLineRegex, function(match) {
            return code.close + match + code.open;
          });
        }
      }
      return str;
    }
    colors.setTheme = function(theme) {
      if (typeof theme === "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var style in theme) {
        (function(style2) {
          colors[style2] = function(str) {
            if (typeof theme[style2] === "object") {
              var out = str;
              for (var i2 in theme[style2]) {
                out = colors[theme[style2][i2]](out);
              }
              return out;
            }
            return colors[theme[style2]](str);
          };
        })(style);
      }
    };
    function init() {
      var ret = {};
      Object.keys(styles).forEach(function(name2) {
        ret[name2] = {
          get: function() {
            return build([name2]);
          }
        };
      });
      return ret;
    }
    var sequencer = function sequencer2(map2, str) {
      var exploded = str.split("");
      exploded = exploded.map(map2);
      return exploded.join("");
    };
    colors.trap = require_trap2();
    colors.zalgo = require_zalgo2();
    colors.maps = {};
    colors.maps.america = require_america2()(colors);
    colors.maps.zebra = require_zebra2()(colors);
    colors.maps.rainbow = require_rainbow2()(colors);
    colors.maps.random = require_random2()(colors);
    for (map in colors.maps) {
      (function(map2) {
        colors[map2] = function(str) {
          return sequencer(colors.maps[map2], str);
        };
      })(map);
    }
    var map;
    defineProps(colors, init());
  }
});

// ../promptUI/node_modules/@colors/colors/safe.js
var require_safe2 = __commonJS({
  "../promptUI/node_modules/@colors/colors/safe.js"(exports2, module2) {
    var colors = require_colors2();
    module2["exports"] = colors;
  }
});

// ../promptUI/node_modules/prompt/package.json
var require_package2 = __commonJS({
  "../promptUI/node_modules/prompt/package.json"(exports2, module2) {
    module2.exports = {
      name: "prompt",
      version: "1.3.0",
      description: "A beautiful command-line prompt for node.js",
      author: "Nodejitsu Inc. <info@nodejitsu.com>",
      maintainers: [
        "indexzero <charlie@nodejitsu.com>",
        "jesusabdullah <josh@nodejitsu.com>"
      ],
      repository: {
        type: "git",
        url: "http://github.com/flatiron/prompt.git"
      },
      keywords: [
        "prompt",
        "command-line",
        "customize",
        "validation"
      ],
      dependencies: {
        "@colors/colors": "1.5.0",
        async: "3.2.3",
        read: "1.0.x",
        revalidator: "0.1.x",
        winston: "2.x"
      },
      devDependencies: {
        eslint: "^7.32.0",
        vows: "^0.7.0"
      },
      main: "./lib/prompt",
      scripts: {
        test: "vows test/prompt-test.js --spec",
        "test-all": "vows --spec"
      },
      license: "MIT",
      engines: {
        node: ">= 6.0.0"
      }
    };
  }
});

// ../promptUI/node_modules/prompt/lib/prompt.js
var require_prompt = __commonJS({
  "../promptUI/node_modules/prompt/lib/prompt.js"(exports2, module2) {
    var events = require("events");
    var readline = require("readline");
    var eachSeries = require_eachSeries();
    var rejectSeries = require_rejectSeries();
    var read = require_read();
    var validate = require_revalidator().validate;
    var winston = require_winston();
    var colors = require_safe2();
    readline.Interface.prototype.setPrompt = function(prompt3, length) {
      this._prompt = prompt3;
      if (length) {
        this._promptLength = length;
      } else {
        var lines = prompt3.split(/[\r\n]/);
        var lastLine = lines[lines.length - 1];
        this._promptLength = lastLine.replace(/\u001b\[(\d+(;\d+)*)?m/g, "").length;
      }
    };
    module2.exports.version = require_package2().version;
    var stdin;
    var stdout;
    var history = [];
    var prompt2 = module2.exports = Object.create(events.EventEmitter.prototype);
    var logger = prompt2.logger = new winston.Logger({
      transports: [new winston.transports.Console()]
    });
    prompt2.started = false;
    prompt2.paused = false;
    prompt2.stopped = true;
    prompt2.allowEmpty = false;
    prompt2.message = "prompt";
    prompt2.delimiter = ": ";
    prompt2.colors = true;
    prompt2.properties = {};
    logger.cli();
    prompt2.start = function(options) {
      if (prompt2.started) {
        return;
      }
      options = options || {};
      stdin = options.stdin || process.stdin;
      stdout = options.stdout || process.stdout;
      prompt2.memory = options.memory || 10;
      prompt2.allowEmpty = options.allowEmpty || false;
      prompt2.message = options.message || prompt2.message;
      prompt2.delimiter = options.delimiter || prompt2.delimiter;
      prompt2.colors = options.colors || prompt2.colors;
      if (!options.noHandleSIGINT) {
        if (process.platform !== "win32") {
          process.on("SIGINT", function() {
            stdout.write("\n");
            process.exit(1);
          });
        } else {
          stdin.on("keypress", function(char, key) {
            if (key && key.ctrl && key.name == "c") {
              stdout.write("\n");
              process.emit("SIGINT");
              process.exit(1);
            }
          });
        }
      }
      prompt2.emit("start");
      prompt2.started = true;
      prompt2.stopped = false;
      return prompt2;
    };
    prompt2.pause = function() {
      if (!prompt2.started || prompt2.stopped || prompt2.paused) {
        return;
      }
      stdin.pause();
      prompt2.emit("pause");
      prompt2.paused = true;
      return prompt2;
    };
    prompt2.stop = function() {
      if (prompt2.stopped || !prompt2.started) {
        return;
      }
      stdin.destroy();
      prompt2.emit("stop");
      prompt2.stopped = true;
      prompt2.started = false;
      prompt2.paused = false;
      return prompt2;
    };
    prompt2.resume = function() {
      if (!prompt2.started || !prompt2.paused) {
        return;
      }
      stdin.resume();
      prompt2.emit("resume");
      prompt2.paused = false;
      return prompt2;
    };
    prompt2.history = function(search) {
      if (typeof search === "number") {
        return history[search] || {};
      }
      var names = history.map(function(pair) {
        return typeof pair.property === "string" ? pair.property : pair.property.name;
      });
      if (!~names.indexOf(search)) {
        return null;
      }
      return history.filter(function(pair) {
        return typeof pair.property === "string" ? pair.property === search : pair.property.name === search;
      })[0];
    };
    prompt2.get = function(schema, callback) {
      if (typeof callback === "function")
        return prompt2._get(schema, callback);
      return new Promise(function(resolve4, reject) {
        prompt2._get(schema, function(err, result) {
          return err ? reject(err) : resolve4(result);
        });
      });
    };
    prompt2._get = function(schema, callback) {
      function untangle(schema2, path4) {
        var results = [];
        path4 = path4 || [];
        if (schema2.properties) {
          Object.keys(schema2.properties).forEach(function(key) {
            var obj = {};
            obj[key] = schema2.properties[key];
            results = results.concat(untangle(obj[key], path4.concat(key)));
          });
          return results;
        }
        return {
          path: path4,
          schema: schema2
        };
      }
      function iterate(schema2, get, done) {
        var iterator = [], result = {};
        if (typeof schema2 === "string") {
          iterator.push({
            path: [schema2],
            schema: prompt2.properties[schema2.toLowerCase()] || {}
          });
        } else if (Array.isArray(schema2)) {
          iterator = schema2.map(function(element) {
            if (typeof element === "string") {
              return {
                path: [element],
                schema: prompt2.properties[element.toLowerCase()] || {}
              };
            } else if (element.properties) {
              return {
                path: [Object.keys(element.properties)[0]],
                schema: element.properties[Object.keys(element.properties)[0]]
              };
            } else if (element.path && element.schema) {
              return element;
            } else {
              return {
                path: [element.name || "question"],
                schema: element
              };
            }
          });
        } else if (schema2.properties) {
          iterator = untangle(schema2);
        } else {
          iterator = [{
            schema: schema2.schema ? schema2.schema : schema2,
            path: schema2.path || [schema2.name || "question"]
          }];
        }
        eachSeries(iterator, function(branch, next) {
          get(branch, function assembler(err, line) {
            if (err) {
              return next(err);
            }
            function build(path4, line2) {
              var obj = {};
              if (path4.length) {
                obj[path4[0]] = build(path4.slice(1), line2);
                return obj;
              }
              return line2;
            }
            function attach(obj, attr) {
              var keys;
              if (typeof attr !== "object" || attr instanceof Array) {
                return attr;
              }
              keys = Object.keys(attr);
              if (keys.length) {
                if (!obj[keys[0]]) {
                  obj[keys[0]] = {};
                }
                obj[keys[0]] = attach(obj[keys[0]], attr[keys[0]]);
              }
              return obj;
            }
            result = attach(result, build(branch.path, line));
            next();
          });
        }, function(err) {
          return err ? done(err) : done(null, result);
        });
      }
      iterate(schema, function get(target, next) {
        prompt2.getInput(target, function(err, line) {
          return err ? next(err) : next(null, line);
        });
      }, callback);
      return prompt2;
    };
    prompt2.confirm = function() {
      var args = Array.prototype.slice.call(arguments), msg = args.shift(), callback = args.pop(), opts = args.shift(), vars = !Array.isArray(msg) ? [msg] : msg, RX_Y = /^[yt]{1}/i, RX_YN = /^[yntf]{1}/i;
      function confirm(target, next) {
        var yes = target.yes || RX_Y, options = {
          description: typeof target === "string" ? target : target.description || "yes/no",
          pattern: target.pattern || RX_YN,
          name: "confirm",
          message: target.message || "yes/no"
        };
        for (var k in opts || {}) {
          if (opts.hasOwnProperty(k)) {
            options[k] = opts[k];
          }
        }
        prompt2.get([options], function(err, result) {
          next(null, err ? false : yes.test(result[options.name]));
        });
      }
      rejectSeries(vars, confirm, function(err, result) {
        callback(null, result.length === 0);
      });
    };
    var tmp = [];
    prompt2.getInput = function(prop, callback) {
      var schema = prop.schema || prop, propName = prop.path && prop.path.join(":") || prop, storedSchema = prompt2.properties[propName.toLowerCase()], delim = prompt2.delimiter, defaultLine, against, hidden, length, valid, name2, raw, msg;
      if (schema instanceof Object && !Object.keys(schema).length && typeof storedSchema !== "undefined") {
        schema = storedSchema;
      }
      if (typeof prop === "string" && !storedSchema) {
        schema = {};
      }
      schema = convert(schema);
      defaultLine = schema.default;
      name2 = prop.description || schema.description || propName;
      raw = prompt2.colors ? [colors.grey(name2), colors.grey(delim)] : [name2, delim];
      if (prompt2.message)
        raw.unshift(prompt2.message, delim);
      prop = {
        schema,
        path: propName.split(":")
      };
      if (!schema.properties) {
        schema = function() {
          var obj = { properties: {} };
          obj.properties[propName] = schema;
          return obj;
        }();
      }
      if (prompt2.override && prompt2.override.hasOwnProperty(propName)) {
        if (prompt2._performValidation(name2, prop, prompt2.override, schema, -1, callback)) {
          return callback(null, prompt2.override[propName]);
        }
        delete prompt2.override[propName];
      }
      if (typeof prop.schema.ask === "function" && !prop.schema.ask()) {
        return callback(null, prop.schema.default || "");
      }
      var type = (schema.properties && schema.properties[propName] && schema.properties[propName].type || "").toLowerCase().trim(), wait2 = type === "array";
      if (type === "array") {
        length = prop.schema.maxItems;
        if (length) {
          msg = (tmp.length + 1).toString() + "/" + length.toString();
        } else {
          msg = (tmp.length + 1).toString();
        }
        msg += delim;
        raw.push(prompt2.colors ? colors.grey(msg) : msg);
      }
      length = raw.join("").length;
      msg = raw.join("");
      if (schema.help) {
        schema.help.forEach(function(line) {
          logger.help(line);
        });
      }
      prompt2.emit("prompt", prop);
      if (typeof defaultLine === "function") {
        defaultLine = defaultLine();
      }
      if (typeof defaultLine === "undefined") {
        defaultLine = "";
      }
      defaultLine = defaultLine.toString();
      read({
        prompt: msg,
        silent: prop.schema && prop.schema.hidden,
        replace: prop.schema && prop.schema.replace,
        default: defaultLine,
        input: stdin,
        output: stdout
      }, function(err, line) {
        if (err && wait2 === false) {
          return callback(err);
        }
        var against2 = {}, numericInput, isValid;
        if (line !== "") {
          if (schema.properties[propName]) {
            var type2 = (schema.properties[propName].type || "").toLowerCase().trim() || void 0;
            if (type2 === "number" || type2 === "integer") {
              line = Number(line);
            }
            if (type2 == "boolean") {
              if (line.toLowerCase() === "true" || line.toLowerCase() === "t") {
                line = true;
              } else if (line.toLowerCase() === "false" || line.toLowerCase() === "f") {
                line = false;
              }
            }
            if (type2 == "array") {
              var length2 = prop.schema.maxItems;
              if (err) {
                if (err.message == "canceled") {
                  wait2 = false;
                  stdout.write("\n");
                }
              } else {
                if (length2) {
                  if (tmp.length + 1 < length2) {
                    isValid = false;
                    wait2 = true;
                  } else {
                    isValid = true;
                    wait2 = false;
                  }
                } else {
                  isValid = false;
                  wait2 = true;
                }
                tmp.push(line);
              }
              line = tmp;
            }
          }
          against2[propName] = line;
        }
        if (prop && prop.schema.before) {
          line = prop.schema.before(line);
        }
        if (isValid === void 0)
          isValid = prompt2._performValidation(name2, prop, against2, schema, line, callback);
        if (!isValid) {
          return prompt2.getInput(prop, callback);
        }
        logger.input(line.yellow);
        prompt2._remember(propName, line);
        callback(null, line);
        tmp = [];
      });
    };
    prompt2._performValidation = function(name2, prop, against, schema, line, callback) {
      var numericInput, valid, msg;
      try {
        valid = validate(against, schema);
      } catch (err) {
        return line !== -1 ? callback(err) : false;
      }
      if (!valid.valid) {
        if (prop.schema.message) {
          logger.error(prop.schema.message);
        } else {
          msg = line !== -1 ? "Invalid input for " : "Invalid command-line input for ";
          if (prompt2.colors) {
            logger.error(msg + colors.grey(name2));
          } else {
            logger.error(msg + name2);
          }
        }
        prompt2.emit("invalid", prop, line);
      }
      return valid.valid;
    };
    prompt2.addProperties = function(obj, properties, callback) {
      properties = properties.filter(function(prop) {
        return typeof obj[prop] === "undefined";
      });
      if (properties.length === 0) {
        return callback(null, obj);
      }
      prompt2.get(properties, function(err, results) {
        if (err) {
          return callback(err);
        } else if (!results) {
          return callback(null, obj);
        }
        function putNested(obj2, path4, value2) {
          var last = obj2, key;
          while (path4.length > 1) {
            key = path4.shift();
            if (!last[key]) {
              last[key] = {};
            }
            last = last[key];
          }
          last[path4.shift()] = value2;
        }
        Object.keys(results).forEach(function(key) {
          putNested(obj, key.split("."), results[key]);
        });
        callback(null, obj);
      });
      return prompt2;
    };
    prompt2._remember = function(property, value2) {
      history.unshift({
        property,
        value: value2
      });
      if (history.length > prompt2.memory) {
        history.splice(prompt2.memory, history.length - prompt2.memory);
      }
    };
    function convert(schema) {
      var newProps = Object.keys(validate.messages), newSchema = false, key;
      newProps = newProps.concat(["description", "dependencies"]);
      for (key in schema) {
        if (newProps.indexOf(key) > 0) {
          newSchema = true;
          break;
        }
      }
      if (!newSchema || schema.validator || schema.warning || typeof schema.empty !== "undefined") {
        if (typeof schema.message !== "undefined") {
          schema.description = schema.message;
        }
        if (typeof schema.warning !== "undefined") {
          schema.message = schema.warning;
        }
        if (typeof schema.validator === "function") {
          schema.conform = schema.validator;
        } else {
          schema.pattern = schema.validator;
        }
        if (typeof schema.empty !== "undefined") {
          schema.required = !schema.empty;
        }
        delete schema.warning;
        delete schema.validator;
        delete schema.empty;
      }
      return schema;
    }
  }
});

// ../promptUI/UI.mjs
var import_prompt = __toESM(require_prompt(), 1);
var import_promises = require("fs/promises");
var import_path = require("path");
var UI = class {
  constructor(options = {}) {
    this.configObj = {
      path: (0, import_path.resolve)(options.configPath || "./config.json"),
      keys: options.keys || ["t4_token"]
    };
    this.started = false;
  }
  start() {
    import_prompt.default.start();
    this.started = true;
    return this.getConfig();
  }
  async ask(questions) {
    if (!this.started)
      await this.start();
    const results = {};
    for (let { name: name2, description, required, cb } of questions) {
      if (cb)
        await cb();
      const properties = {};
      properties[name2] = { description, required };
      results[name2] = (await import_prompt.default.get({ properties }))[name2];
    }
    return results;
  }
  async getConfig() {
    if (!await exists(this.configObj.path))
      return await newConfig(this);
    const configJson = JSON.parse(await (0, import_promises.readFile)(this.configObj.path));
    if (Object.keys(configJson).some((key) => !key))
      return await newConfig(this);
    return configJson;
  }
  async closeQuestion() {
    const { closeID } = await import_prompt.default.get({ properties: {
      closeID: {
        required: true,
        description: "If you're finished, type 1. If not, type 0"
      }
    } });
    if (parseInt(closeID))
      return process.exit(1);
    return null;
  }
};
async function newConfig(instance) {
  console.log("Config file not found or missing keys. Please follow the prompts below.");
  const keys = await instance.ask(instance.configObj.keys.map((name2) => {
    return { name: name2, required: true, description: `Enter key value for ${name2}` };
  }));
  try {
    await (0, import_promises.writeFile)(instance.configObj.path, JSON.stringify(keys, null, 2));
  } catch (e) {
    console.log(`Failed to write keys to config.json due to:

${e.stack}`);
    console.log("Keys will only be kept during this session...");
  }
  return keys;
}
async function exists(path4) {
  try {
    await (0, import_promises.stat)((0, import_path.resolve)(path4));
    return true;
  } catch (e) {
    return false;
  }
}

// ../../../../t4apiwrapper/t4.ts/esm/lib/utility/Global.js
var max = 999999;
var min = 1e5;
var MediaTypeCodes;
(function(MediaTypeCodes2) {
  MediaTypeCodes2[MediaTypeCodes2["Image"] = 1] = "Image";
  MediaTypeCodes2[MediaTypeCodes2["MicrosoftOfficeDocument"] = 2] = "MicrosoftOfficeDocument";
  MediaTypeCodes2[MediaTypeCodes2["PDF"] = 3] = "PDF";
  MediaTypeCodes2[MediaTypeCodes2["StylesheetCss"] = 4] = "StylesheetCss";
  MediaTypeCodes2[MediaTypeCodes2["JavascriptFileProgrammableLayout"] = 5] = "JavascriptFileProgrammableLayout";
  MediaTypeCodes2[MediaTypeCodes2["Font"] = 6] = "Font";
  MediaTypeCodes2[MediaTypeCodes2["PHP"] = 7] = "PHP";
  MediaTypeCodes2[MediaTypeCodes2["JavascriptFileOnPageJavascript"] = 8] = "JavascriptFileOnPageJavascript";
  MediaTypeCodes2[MediaTypeCodes2["WebDavCSS"] = 9] = "WebDavCSS";
  MediaTypeCodes2[MediaTypeCodes2["ImageGallery"] = 10] = "ImageGallery";
  MediaTypeCodes2[MediaTypeCodes2["MP3"] = 11] = "MP3";
  MediaTypeCodes2[MediaTypeCodes2["XMLDocument"] = 12] = "XMLDocument";
  MediaTypeCodes2[MediaTypeCodes2["XBM"] = 13] = "XBM";
  MediaTypeCodes2[MediaTypeCodes2["MP4"] = 14] = "MP4";
  MediaTypeCodes2[MediaTypeCodes2["Text"] = 15] = "Text";
  MediaTypeCodes2[MediaTypeCodes2["ASPX"] = 16] = "ASPX";
  MediaTypeCodes2[MediaTypeCodes2["KML"] = 17] = "KML";
  MediaTypeCodes2[MediaTypeCodes2["ZIP"] = 18] = "ZIP";
  MediaTypeCodes2[MediaTypeCodes2["wat"] = 19] = "wat";
  MediaTypeCodes2[MediaTypeCodes2["CSV"] = 20] = "CSV";
  MediaTypeCodes2[MediaTypeCodes2["ICS"] = 21] = "ICS";
  MediaTypeCodes2[MediaTypeCodes2["Mobileconfig"] = 22] = "Mobileconfig";
  MediaTypeCodes2[MediaTypeCodes2["htaccess"] = 23] = "htaccess";
  MediaTypeCodes2[MediaTypeCodes2["DXF"] = 24] = "DXF";
  MediaTypeCodes2[MediaTypeCodes2["JSON"] = 25] = "JSON";
  MediaTypeCodes2[MediaTypeCodes2["Ebook"] = 26] = "Ebook";
  MediaTypeCodes2[MediaTypeCodes2["PHAR"] = 27] = "PHAR";
  MediaTypeCodes2[MediaTypeCodes2["iCal"] = 28] = "iCal";
  MediaTypeCodes2[MediaTypeCodes2["CommonCartridgeCanvasCourse"] = 29] = "CommonCartridgeCanvasCourse";
  MediaTypeCodes2[MediaTypeCodes2["Javascript"] = 30] = "Javascript";
})(MediaTypeCodes || (MediaTypeCodes = {}));
var SyntaxTypeCodes;
(function(SyntaxTypeCodes2) {
  SyntaxTypeCodes2[SyntaxTypeCodes2["None"] = 0] = "None";
  SyntaxTypeCodes2[SyntaxTypeCodes2["Javascript"] = 1] = "Javascript";
  SyntaxTypeCodes2[SyntaxTypeCodes2["CSS"] = 2] = "CSS";
  SyntaxTypeCodes2[SyntaxTypeCodes2["HTML"] = 3] = "HTML";
  SyntaxTypeCodes2[SyntaxTypeCodes2["PHP"] = 4] = "PHP";
  SyntaxTypeCodes2[SyntaxTypeCodes2["Java"] = 5] = "Java";
})(SyntaxTypeCodes || (SyntaxTypeCodes = {}));
function MediaUploadData(data) {
  return {
    name: data.name,
    description: data.description,
    type: String(data.type),
    file: new Blob(),
    syntaxType: String(data.syntaxType || 0),
    myMedia: String(data.myMedia || 0),
    elements: JSON.stringify({ "keywords#9:undefined": `${data.keywords?.join(", ") || ""}` }),
    version: data.version || "undefined",
    binaryLanguage: data.binaryLanguage || "smxx",
    fileName: String(data.fileName),
    language: data.language || "smxx",
    categories: String(data.categoryID)
  };
}
function contentUploadData(options) {
  const { archiveSection, canPublishNow, canSaveAndApprove, channels, contentTypeID, elements, excludedMirrorSectionIds, expiryDate, language, owner, publishDate, reviewDate, status } = options;
  return {
    archiveSection,
    canPublishNow,
    canSaveAndApprove,
    channels,
    contentTypeID,
    elements,
    excludedMirrorSectionIds: excludedMirrorSectionIds || [],
    expiryDate,
    language,
    owner: owner || { id: 0, type: "USER" },
    publishDate,
    reviewDate,
    status,
    id: Math.floor(-Math.abs(Math.random() * (max - min) + min))
  };
}

// ../../../../t4apiwrapper/t4.ts/esm/lib/Content.js
var ContentEndpoint = "content";
var Content = class {
  client;
  util;
  constructor(client) {
    this.client = client;
    this.util = {
      getElementNames: (elements) => {
        return elements.reduce((elementObj, { alias, name: name2, id, type }) => {
          elementObj[alias || name2] = `${name2}#${id}:${type}`;
          return elementObj;
        }, {});
      },
      lazyMap: (elements, formattedNames) => {
        let newElements = {};
        Object.keys(elements).forEach((key) => {
          if (formattedNames.hasOwnProperty(key)) {
            newElements[formattedNames[key]] = elements[key];
          }
        });
        return newElements;
      }
    };
  }
  async getVersions(contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${ContentEndpoint}/${contentId}/${language}/version`, null);
    let jsonResp = await response.json();
    if (jsonResp.errorText) {
      jsonResp = await this.client.version.get(contentId, language);
    }
    return jsonResp;
  }
  async get(contentId, sectionId, language = this.client.language) {
    const response = await this.client.call("GET", `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null);
    return await response.json();
  }
  async getWithoutSection(contentId, version, language = this.client.language) {
    if (!version)
      version = (await this.getVersions(contentId, language))[0].version;
    const response = await this.client.call("GET", `${ContentEndpoint}/${contentId}/${language}/version/${version}`, null);
    return await response.json();
  }
  async delete(contentId, sectionId, language = this.client.language) {
    const response = await this.client.call("DELETE", `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, null);
    return response?.ok;
  }
  async create(sectionId, options, isFormatted = false) {
    const { channels, canPublishNow, canSaveAndApprove, contentType } = await this.prePopulateContentInfo(options.contentTypeID, sectionId);
    if (!isFormatted) {
      const formattedElementNames = this.util.getElementNames(contentType.contentTypeElements);
      options.elements = this.util.lazyMap(options.elements, formattedElementNames);
    }
    const uploadData = contentUploadData({
      channels,
      canPublishNow,
      canSaveAndApprove,
      ...options
    });
    const response = await this.client.call("POST", `${ContentEndpoint}/${sectionId}/${options.language}?prepareForEditor=true`, {
      body: uploadData
    });
    return await response.json();
  }
  async prePopulateContentInfo(contentTypeId, sectionId) {
    const response = await this.client.call("GET", `${ContentEndpoint}/type/${contentTypeId}/${sectionId}`, null);
    return await response.json();
  }
  async listLinkContent(sectionId) {
    const response = await this.client.call("GET", `${ContentEndpoint}/link/${sectionId}`, null);
    return await response.json();
  }
  async modify(contentId, sectionId, options, language = this.client.language) {
    let existingContent = await this.get(contentId, sectionId, language);
    if (!existingContent)
      throw Error(`Content ${contentId} in section ${sectionId} does not exist`);
    const response = await this.client.call("POST", `${ContentEndpoint}/${sectionId}/${contentId}/${language}`, {
      body: {
        ...existingContent,
        ...options,
        elements: {
          ...existingContent.elements,
          ...options.elements
        }
      }
    });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/ContentType.js
var ContentTypeEndpoint = "contenttype";
var ContentType = class {
  clinet;
  constructor(client) {
    this.clinet = client;
  }
  async list() {
    const response = await this.clinet.call("GET", ContentTypeEndpoint, null);
    return await response.json();
  }
  async get(contentTypeId) {
    const response = await this.clinet.call("GET", `${ContentTypeEndpoint}/${contentTypeId}`, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Download.js
var DownloadEndpoint = "download";
var Download = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async getFileFromElement(element, contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${DownloadEndpoint}/${contentId}/${language}/${element}`, null);
    return await response.json();
  }
  async getFileFromElementVersion(element, contentId, version, language) {
    const response = await this.client.call("GET", `${DownloadEndpoint}/${contentId}/${language}/${version}/${element}`, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/FormBuilder.js
var FormBuilderEndpoint = "formbuilder";
var FormBuilder = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async list(language = this.client.language) {
    const response = await this.client.call("POST", `${FormBuilderEndpoint}/${language}`, {
      body: "draw=5&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=name&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=lastModified&columns%5B1%5D%5Bname%5D=lastModified&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=usage&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=actions&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&search%5Bvalue%5D=&search%5Bregex%5D=false",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Hierarchy.js
var HierarchyEndpoint = "hierarchy";
var Hierarchy = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async get(id, language = this.client.language) {
    const response = await this.client.call("GET", `${HierarchyEndpoint}/${id}/${language}`, null);
    return await response.json();
  }
  async getSection(id, options) {
    const response = await this.client.call("POST", `${HierarchyEndpoint}/section`, {
      body: {
        read: {
          section: { id, language: "en" },
          activeNode: id,
          openNodes: [id],
          recursionDepth: -1,
          restrictedToPermitedSections: false,
          showContentInfo: true,
          showAllSections: true,
          expandCollapseAllChildren: true,
          ...options
        }
      }
    });
    const json = await response.json();
    return json[0] || json;
  }
  async getContents(id, options) {
    const response = await this.client.call("POST", `${HierarchyEndpoint}/content`, {
      body: {
        read: {
          section: { id, language: "en" },
          activeNode: id,
          openNodes: [id],
          recursionDepth: 1,
          restrictedToPermitedSections: false,
          showContentInfo: true,
          showAllSections: true,
          expandCollapseAllChildren: true,
          ...options
        }
      }
    });
    return await response.json();
  }
  async delete(id, isMandatory) {
    const response = await this.client.call("DELETE", `${HierarchyEndpoint}/${id}${isMandatory ? "?mandatory=true" : ""}`, null);
    return response?.ok;
  }
  async update(id, options, language = this.client.language) {
    let section = await this.get(id, language);
    const response = await this.client.call("PUT", `${HierarchyEndpoint}/${id}/${language}`, { body: Object.assign({}, section, options) });
    return response?.ok;
  }
  async add(parentID, options, language = this.client.language) {
    const response = await this.client.call("POST", `${HierarchyEndpoint}/${language}`, {
      body: {
        parent: parentID,
        ...options
      }
    });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/utility/helpers.js
async function* batch(tasks, limit, callback = (obj) => obj) {
  for (let i2 = 0; i2 < tasks.length; i2 = i2 + limit) {
    const batch2 = tasks.slice(i2, i2 + limit);
    const result = await Promise.all(batch2.map((task) => callback(task)));
    yield result;
  }
}
async function batcher(tasks, limit, timeout, callback) {
  let results = [];
  for await (const item2 of batch(tasks, limit, callback)) {
    results = results.concat(item2);
    await wait(timeout);
  }
  return results;
}
function wait(ms) {
  return new Promise((resolve4) => {
    setTimeout(() => resolve4(), ms);
  });
}

// ../../../../t4apiwrapper/t4.ts/esm/lib/Media.js
var path2 = __toESM(require("path"), 1);
var import_promises2 = require("fs/promises");
var MediaEndpoint = "media";
var Media = class {
  client;
  util;
  constructor(client) {
    this.client = client;
    this.util = {
      getMediaIDs: async (parentID, arrLimit = 50, reqTimeout = 1e4) => {
        const structure = await this.client.mediaCategory.list(parentID, "en");
        let categoryIds = [];
        const populateIds = (category) => {
          if (category?.id)
            categoryIds.push(category.id);
          if (category?.children?.length)
            category.children.map((cat) => populateIds(cat));
        };
        populateIds(structure[0]);
        const list = async (id) => await client.media.list(id, "en");
        const categories = await batcher(categoryIds, arrLimit, reqTimeout, list);
        const IdList = categories.map((category) => category.mediaRows.map((row) => row.id));
        return IdList.flat(Infinity);
      }
    };
  }
  async add(data) {
    const formData = new FormData();
    const expandedData = MediaUploadData(data);
    const filePath = path2.resolve(data.file);
    if (!await (0, import_promises2.stat)(filePath))
      throw Error(`File at ${filePath} does not exist.`);
    if (!expandedData.fileName || expandedData.fileName == "undefined")
      expandedData.fileName = path2.basename(filePath);
    const blob = new Blob([await (0, import_promises2.readFile)(filePath)]);
    for (let key in expandedData) {
      key == "file" ? formData.append("file", blob, expandedData.fileName) : formData.append(key, expandedData[key]);
    }
    const response = await this.client.call("POST", `${MediaEndpoint}`, { body: formData });
    return await response.json();
  }
  async get(contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${MediaEndpoint}/${contentId}/${language}`, null);
    return await response.json();
  }
  async getMediaUsage(mediaID, language = this.client.language) {
    const response = await this.client.call("GET", `${MediaEndpoint}/${mediaID}/${language}/usage`, null);
    return await response.json();
  }
  async bulkGetMediaUsage(mediaIDs, language = this.client.language) {
    const response = await this.client.call("POST", `${MediaEndpoint}/getUsage/${language}`, { body: mediaIDs });
    return await response.json();
  }
  async list(categoryID, language = this.client.language) {
    const response = await this.client.call("POST", `${MediaEndpoint}/category/${categoryID}/${language}/list?showPending=true&showUntranslated=true`, {
      body: "draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=2&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=3&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=4&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=5&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=6&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=7&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    });
    return await response.json();
  }
  async downloadSingle(id, type, version) {
    if (!version)
      version = (await this.client.content.getVersions(id, "smxx"))[0].version;
    const inital = await this.client.call("GET", `${MediaEndpoint}/${id}/smxx/${version}/${type}`, { redirect: "manual" });
    if (inital.status != 302)
      return null;
    const fileURL = await inital.text();
    const response = await fetch(fileURL);
    return await response.arrayBuffer();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/MediaCategory.js
var MediaCategoryEndpoint = "mediacategory";
var MediaCategory = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async list(categoryID, language) {
    const response = await this.client.call("POST", MediaCategoryEndpoint, {
      body: {
        category: {
          id: categoryID,
          language
        },
        recursionDepth: -1,
        explode: true,
        activeNode: -1,
        showInactive: true,
        showMyMedia: false
      }
    });
    return await response.json();
  }
  async get(categoryID, language = this.client.language) {
    const response = await this.client.call("GET", `${MediaCategoryEndpoint}/${categoryID}/${language}`, null);
    return await response.json();
  }
  async update(categoryID, options, language = this.client.language) {
    const current = await this.get(categoryID, language), newObj = Object.assign({}, current, options);
    const response = await this.client.call("PUT", `${MediaCategoryEndpoint}/${categoryID}/${language}`, {
      body: newObj
    });
    return await response.json();
  }
  async add(parentID, options, language = this.client.language) {
    if (!options.name)
      throw Error("Name not specified for new media category");
    const response = await this.client.call("POST", `${MediaCategoryEndpoint}/${language}`, {
      body: {
        description: "",
        archive: false,
        status: 0,
        show: false,
        eForm: false,
        "output-uri": "",
        parent: parentID,
        name: options.name,
        workflow: "-2",
        ...options
      }
    });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/MediaType.js
var MediaTypeEndpoint = "mediaType";
var MediaType = class {
  clinet;
  constructor(client) {
    this.clinet = client;
  }
  async list() {
    const response = await this.clinet.call("GET", MediaTypeEndpoint, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/List.js
var ListEndpoint = "list";
var List = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async get(listId, language = this.client.language) {
    const response = await this.client.call("GET", `${ListEndpoint}/${listId}/${language}`, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Profile.js
var ProfileEndpoint = "profile";
var Profile = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async get() {
    const response = await this.client.call("GET", ProfileEndpoint, null);
    return await response.json();
  }
  async update(body) {
    const currentProfile = await this.get();
    if (!currentProfile)
      throw Error("Failed to get client profile");
    const response = await this.client.call("POST", ProfileEndpoint, {
      body: Object.assign(currentProfile, body)
    });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Upload.js
var import_node_fs = require("node:fs");
var path3 = __toESM(require("path"), 1);
var { readFile: readFile3 } = import_node_fs.promises;
var UploadEndpoint = "upload";
var Upload = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async list() {
    const response = await this.client.call("GET", UploadEndpoint, null);
    return await response.json();
  }
  async add({ file, filename, elementID }) {
    const filePath = path3.resolve(file);
    if (!filename)
      filename = path3.basename(filePath);
    const blob = new Blob([await readFile3(filePath)]);
    const data = { filename, file: blob, elementID };
    const formData = new FormData();
    for (let key in data) {
      key == "file" ? formData.append(key, data[key], data.filename) : formData.append(key, data[key]);
    }
    const response = await this.client.call("POST", UploadEndpoint, { body: formData });
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/ServerSideLink.js
var ServerSideLinkEndpoint = "ssl";
var ServerSideLink = class {
  client;
  util;
  linkId;
  sslRegex;
  constructor(client) {
    this.client = client;
    this.linkId = 14;
    this.sslRegex = /sslink_id="(\d+)"/;
    this.util = {
      getFromSection: async (sectionId, language = this.client.language) => {
        const { hierarchy, content } = this.client;
        const serverSideLinks = [];
        const contentIds = (await hierarchy.getContents(sectionId)).contents.map((content2) => content2.id);
        await Promise.all(contentIds.map(async (contentId) => {
          const { types, elements, id } = await content.get(contentId, sectionId, language);
          if (!types.some((entry) => entry.id == this.linkId))
            return;
          const keys = Object.keys(elements).filter((name2) => name2.split(":").pop() == this.linkId.toString());
          const maxId = Math.max(...keys.map((key) => elements[key].match(this.sslRegex)?.[1]).filter((entry) => entry != null).map(Number));
          if (!maxId)
            return;
          for (let i2 = 1; i2 <= maxId; i2++) {
            const link = await this.get(i2, sectionId, parseInt(id));
            if (link.id)
              serverSideLinks.push(link);
          }
        }));
        return serverSideLinks;
      }
    };
  }
  async set(options) {
    const destinationSection = await this.client.hierarchy.get(options.toSection, options.language);
    if (!destinationSection)
      throw Error(`${options.toSection} doesn't exist!`);
    if (!options.path)
      options.path = destinationSection.path;
    if (!options.toContent)
      options.toContent = 0;
    const response = await (await this.client.call("PUT", ServerSideLinkEndpoint, { body: options })).json();
    return response;
  }
  async delete(options) {
    const response = await this.client.call("DELETE", ServerSideLinkEndpoint, { body: options });
    return await response.text();
  }
  async modify(linkId, options) {
    const response = await this.client.call("PUT", `${ServerSideLinkEndpoint}/${linkId}`, { body: options });
    return await response.json();
  }
  async get(linkId, sectionId, contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${ServerSideLinkEndpoint}/${linkId}/${language}/${sectionId}/${contentId}`, null);
    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  }
  async getSelectedContentsLinks(ids, language = this.client.language) {
    const response = await this.client.call("POST", `${ServerSideLinkEndpoint}/${language}`, { body: ids });
    return await response.json();
  }
  async getLinks(sectionId, contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${ServerSideLinkEndpoint}/${language}/${sectionId}/${contentId}`, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Version.js
var VersionEndpoint = "version";
var Version = class {
  client;
  constructor(client) {
    this.client = client;
  }
  async get(contentId, language = this.client.language) {
    const response = await this.client.call("GET", `${VersionEndpoint}/${contentId}/${language}`, null);
    return await response.json();
  }
};

// ../../../../t4apiwrapper/t4.ts/esm/lib/Client.js
var Client = class {
  url;
  token;
  content;
  contentType;
  download;
  formBuilder;
  hierarchy;
  media;
  mediaCategory;
  mediaType;
  language;
  list;
  profile;
  serverSideLink;
  upload;
  version;
  constructor(url, token, language = "en") {
    this.url = url;
    this.token = token;
    this.language = language;
    this.content = new Content(this);
    this.contentType = new ContentType(this);
    this.download = new Download(this);
    this.formBuilder = new FormBuilder(this);
    this.hierarchy = new Hierarchy(this);
    this.media = new Media(this);
    this.mediaCategory = new MediaCategory(this);
    this.mediaType = new MediaType(this);
    this.list = new List(this);
    this.profile = new Profile(this);
    this.serverSideLink = new ServerSideLink(this);
    this.upload = new Upload(this);
    this.version = new Version(this);
    this.isAuthorized = this.isAuthorized.bind(this);
  }
  async call(method, endpoint, options) {
    if (!this.token)
      throw Error("Token not specified");
    try {
      let headers = {
        "authorization": `Bearer ${this.token}`,
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9"
      };
      if (options?.body && (typeof options.body == "object" && !(options.body instanceof FormData) || Array.isArray(options.body))) {
        options.body = JSON.stringify(options.body);
        headers["content-type"] = "application/json";
      }
      headers = options?.headers ? Object.assign(options.headers, headers) : headers;
      const request = await fetch(`${this.url}/${endpoint}`, {
        ...options,
        headers,
        method
      });
      return request;
    } catch (error) {
      throw Error(`Request failed due to:
${error.message}
${error.cause}`);
    }
  }
  async isAuthorized() {
    return (await this.profile.get()).username !== void 0;
  }
};

// index.mjs
var rsUrl = "https://cms.seattleu.edu/terminalfour/rs";
(async () => {
  while (true) {
    const instance = new UI({ keys: ["t4_token", "contentTypeID"] });
    await main(instance);
    await instance.closeQuestion();
  }
})();
async function main(instance) {
  const config = await instance.start();
  const { hierarchy, isAuthorized, content, contentType } = new Client(rsUrl, config["t4_token"]);
  if (!await isAuthorized()) {
    console.error("Failed to login to t4...");
    return 0;
  }
  console.clear();
  const ct = await contentType.get(config["contentTypeID"]), ctElements = ct.contentTypeElements, ctElementsDisplay = ct.contentTypeElements.map((element, id) => `${id}: ${element.name}`);
  const { targetSectionID, sourceSectionID, targetElementNumbers } = await instance.ask([
    { name: "sourceSectionID", description: "Please enter the source section ID (not URL)", required: true },
    { name: "targetSectionID", description: "Please enter the target section ID (not URL)", required: true },
    { name: "targetElementNumbers", description: "Please enter the element number you'd like to mirror (seperated by a comma)", required: true, cb: () => {
      console.log(`Avalabile elements:
${ctElementsDisplay.join(",\n")}`);
    } }
  ]);
  const targetElements = targetElementNumbers.split(",").map((e) => parseInt(e)).map((elementNum) => ctElements[elementNum].name), targetSectionContents = (await hierarchy.getContents(targetSectionID)).contents, sourceSectionContents = (await hierarchy.getContents(sourceSectionID)).contents;
  for (let { name: name2, id } of sourceSectionContents) {
    const target = targetSectionContents.filter((obj) => obj.name == name2)[0];
    if (!target) {
      console.log(`Failed to find matching bio for ${name2}`);
      continue;
    }
    const sourceObj = (await content.get(id, sourceSectionID)).elements, sourceObjKeys = Object.keys(sourceObj), finalObj = {};
    sourceObjKeys.map((key) => {
      if (targetElements.includes(key.split("#")[0])) {
        finalObj[key] = sourceObj[key];
      }
    });
    console.log(await content.modify(target.id, targetSectionID, { elements: { ...finalObj } }));
  }
}
