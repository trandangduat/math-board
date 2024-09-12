/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../public/SVG/graph-paper.svg */ \"./public/SVG/graph-paper.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nhtml, body{\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\nbody {\r\n    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\r\n    background-color: #fff7ed;\r\n    overflow: hidden;\r\n}\r\n\r\ncanvas {\r\n    cursor: crosshair;\r\n    display: block;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n#control-panel {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 99;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n#control-panel .btn {\r\n    padding: 0.5rem 1rem;\r\n    cursor: pointer;\r\n    font-size: large;\r\n}\r\n\r\n#controls #brush-options {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 99;\r\n}\r\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://math-board/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://math-board/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://math-board/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://math-board/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/is-electron/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-electron/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("// https://github.com/electron/electron/issues/2288\nfunction isElectron() {\n    // Renderer process\n    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {\n        return true;\n    }\n\n    // Main process\n    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {\n        return true;\n    }\n\n    // Detect the user agent when the `nodeIntegration` option is set to false\n    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {\n        return true;\n    }\n\n    return false;\n}\n\nmodule.exports = isElectron;\n\n\n//# sourceURL=webpack://math-board/./node_modules/is-electron/index.js?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar runtime = (function (exports) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n  function define(obj, key, value) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n    return obj[key];\n  }\n  try {\n    // IE 8 has a broken Object.defineProperty that only works on DOM objects.\n    define({}, \"\");\n  } catch (err) {\n    define = function(obj, key, value) {\n      return obj[key] = value;\n    };\n  }\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    defineProperty(generator, \"_invoke\", { value: makeInvokeMethod(innerFn, self, context) });\n\n    return generator;\n  }\n  exports.wrap = wrap;\n\n  // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n  function tryCatch(fn, obj, arg) {\n    try {\n      return { type: \"normal\", arg: fn.call(obj, arg) };\n    } catch (err) {\n      return { type: \"throw\", arg: err };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\";\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n  var IteratorPrototype = {};\n  define(IteratorPrototype, iteratorSymbol, function () {\n    return this;\n  });\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n  if (NativeIteratorPrototype &&\n      NativeIteratorPrototype !== Op &&\n      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype =\n    Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = GeneratorFunctionPrototype;\n  defineProperty(Gp, \"constructor\", { value: GeneratorFunctionPrototype, configurable: true });\n  defineProperty(\n    GeneratorFunctionPrototype,\n    \"constructor\",\n    { value: GeneratorFunction, configurable: true }\n  );\n  GeneratorFunction.displayName = define(\n    GeneratorFunctionPrototype,\n    toStringTagSymbol,\n    \"GeneratorFunction\"\n  );\n\n  // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function(method) {\n      define(prototype, method, function(arg) {\n        return this._invoke(method, arg);\n      });\n    });\n  }\n\n  exports.isGeneratorFunction = function(genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor\n      ? ctor === GeneratorFunction ||\n        // For the native GeneratorFunction constructor, the best we can\n        // do is to check its .name property.\n        (ctor.displayName || ctor.name) === \"GeneratorFunction\"\n      : false;\n  };\n\n  exports.mark = function(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      define(genFun, toStringTagSymbol, \"GeneratorFunction\");\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  };\n\n  // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n  exports.awrap = function(arg) {\n    return { __await: arg };\n  };\n\n  function AsyncIterator(generator, PromiseImpl) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n        if (value &&\n            typeof value === \"object\" &&\n            hasOwn.call(value, \"__await\")) {\n          return PromiseImpl.resolve(value.__await).then(function(value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function(err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return PromiseImpl.resolve(value).then(function(unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function(error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new PromiseImpl(function(resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(\n          callInvokeWithMethodAndArg,\n          // Avoid propagating failures to Promises returned by later\n          // invocations of the iterator.\n          callInvokeWithMethodAndArg\n        ) : callInvokeWithMethodAndArg();\n    }\n\n    // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n    defineProperty(this, \"_invoke\", { value: enqueue });\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {\n    return this;\n  });\n  exports.AsyncIterator = AsyncIterator;\n\n  // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n    if (PromiseImpl === void 0) PromiseImpl = Promise;\n\n    var iter = new AsyncIterator(\n      wrap(innerFn, outerFn, self, tryLocsList),\n      PromiseImpl\n    );\n\n    return exports.isGeneratorFunction(outerFn)\n      ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function(result) {\n          return result.done ? result.value : iter.next();\n        });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        }\n\n        // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n\n        var record = tryCatch(innerFn, self, context);\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done\n            ? GenStateCompleted\n            : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted;\n          // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  }\n\n  // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n  function maybeInvokeDelegate(delegate, context) {\n    var methodName = context.method;\n    var method = delegate.iterator[methodName];\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method, or a missing .next mehtod, always terminate the\n      // yield* loop.\n      context.delegate = null;\n\n      // Note: [\"return\"] must be used for ES3 parsing compatibility.\n      if (methodName === \"throw\" && delegate.iterator[\"return\"]) {\n        // If the delegate iterator has a return method, give it a\n        // chance to clean up.\n        context.method = \"return\";\n        context.arg = undefined;\n        maybeInvokeDelegate(delegate, context);\n\n        if (context.method === \"throw\") {\n          // If maybeInvokeDelegate(context) changed context.method from\n          // \"return\" to \"throw\", let that override the TypeError below.\n          return ContinueSentinel;\n        }\n      }\n      if (methodName !== \"return\") {\n        context.method = \"throw\";\n        context.arg = new TypeError(\n          \"The iterator does not provide a '\" + methodName + \"' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (! info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value;\n\n      // Resume execution at the desired location (see delegateYield).\n      context.next = delegate.nextLoc;\n\n      // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    }\n\n    // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n    context.delegate = null;\n    return ContinueSentinel;\n  }\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  defineIteratorMethods(Gp);\n\n  define(Gp, toStringTagSymbol, \"Generator\");\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  define(Gp, iteratorSymbol, function() {\n    return this;\n  });\n\n  define(Gp, \"toString\", function() {\n    return \"[object Generator]\";\n  });\n\n  function pushTryEntry(locs) {\n    var entry = { tryLoc: locs[0] };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{ tryLoc: \"root\" }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  exports.keys = function(val) {\n    var object = Object(val);\n    var keys = [];\n    for (var key in object) {\n      keys.push(key);\n    }\n    keys.reverse();\n\n    // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      }\n\n      // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1, next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n\n          return next;\n        };\n\n        return next.next = next;\n      }\n    }\n\n    // Return an iterator with no values.\n    return { next: doneResult };\n  }\n  exports.values = values;\n\n  function doneResult() {\n    return { value: undefined, done: true };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n\n    reset: function(skipTempReset) {\n      this.prev = 0;\n      this.next = 0;\n      // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n\n      this.method = \"next\";\n      this.arg = undefined;\n\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" &&\n              hasOwn.call(this, name) &&\n              !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n\n    stop: function() {\n      this.done = true;\n\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n\n    dispatchException: function(exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !! caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n\n    abrupt: function(type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc <= this.prev &&\n            hasOwn.call(entry, \"finallyLoc\") &&\n            this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry &&\n          (type === \"break\" ||\n           type === \"continue\") &&\n          finallyEntry.tryLoc <= arg &&\n          arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n\n    complete: function(record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" ||\n          record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n\n    finish: function(finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n\n    \"catch\": function(tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n          return thrown;\n        }\n      }\n\n      // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n      throw new Error(\"illegal catch attempt\");\n    },\n\n    delegateYield: function(iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n\n  // Regardless of whether this script is executing as a CommonJS module\n  // or not, return the runtime object so that we can declare the variable\n  // regeneratorRuntime in the outer scope, which allows this module to be\n  // injected easily by `bin/regenerator --include-runtime script.js`.\n  return exports;\n\n}(\n  // If this script is executing as a CommonJS module, use module.exports\n  // as the regeneratorRuntime namespace. Otherwise create a new empty\n  // object. Either way, the resulting object will be used to initialize\n  // the regeneratorRuntime variable at the top of this file.\n   true ? module.exports : 0\n));\n\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  // This module should not be running in strict mode, so the above\n  // assignment should always work unless something is misconfigured. Just\n  // in case runtime.js accidentally runs in strict mode, in modern engines\n  // we can explicitly access globalThis. In older engines we can escape\n  // strict mode using a global Function call. This could conceivably fail\n  // if a Content Security Policy forbids using Function, but in that case\n  // the proper solution is to fix the accidental strict mode problem. If\n  // you've misconfigured your bundler to force strict mode and applied a\n  // CSP to forbid Function, and you're not willing to fix either of those\n  // problems, please detail your unique predicament in a GitHub issue.\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://math-board/./node_modules/regenerator-runtime/runtime.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://math-board/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://math-board/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/Tesseract.js":
/*!****************************************************!*\
  !*** ./node_modules/tesseract.js/src/Tesseract.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createWorker = __webpack_require__(/*! ./createWorker */ \"./node_modules/tesseract.js/src/createWorker.js\");\n\nconst recognize = async (image, langs, options) => {\n  const worker = await createWorker(langs, 1, options);\n  return worker.recognize(image)\n    .finally(async () => {\n      await worker.terminate();\n    });\n};\n\nconst detect = async (image, options) => {\n  const worker = await createWorker('osd', 0, options);\n  return worker.detect(image)\n    .finally(async () => {\n      await worker.terminate();\n    });\n};\n\nmodule.exports = {\n  recognize,\n  detect,\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/Tesseract.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/constants/OEM.js":
/*!********************************************************!*\
  !*** ./node_modules/tesseract.js/src/constants/OEM.js ***!
  \********************************************************/
/***/ ((module) => {

eval("/*\n * OEM = OCR Engine Mode, and there are 4 possible modes.\n *\n * By default tesseract.js uses LSTM_ONLY mode.\n *\n */\nmodule.exports = {\n  TESSERACT_ONLY: 0,\n  LSTM_ONLY: 1,\n  TESSERACT_LSTM_COMBINED: 2,\n  DEFAULT: 3,\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/constants/OEM.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/constants/PSM.js":
/*!********************************************************!*\
  !*** ./node_modules/tesseract.js/src/constants/PSM.js ***!
  \********************************************************/
/***/ ((module) => {

eval("/*\n * PSM = Page Segmentation Mode\n */\nmodule.exports = {\n  OSD_ONLY: '0',\n  AUTO_OSD: '1',\n  AUTO_ONLY: '2',\n  AUTO: '3',\n  SINGLE_COLUMN: '4',\n  SINGLE_BLOCK_VERT_TEXT: '5',\n  SINGLE_BLOCK: '6',\n  SINGLE_LINE: '7',\n  SINGLE_WORD: '8',\n  CIRCLE_WORD: '9',\n  SINGLE_CHAR: '10',\n  SPARSE_TEXT: '11',\n  SPARSE_TEXT_OSD: '12',\n  RAW_LINE: '13',\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/constants/PSM.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/constants/defaultOptions.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tesseract.js/src/constants/defaultOptions.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("module.exports = {\n  /*\n   * Use BlobURL for worker script by default\n   * TODO: remove this option\n   *\n   */\n  workerBlobURL: true,\n  logger: () => {},\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/constants/defaultOptions.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/constants/languages.js":
/*!**************************************************************!*\
  !*** ./node_modules/tesseract.js/src/constants/languages.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("/*\n * languages with existing tesseract traineddata\n * https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016\n */\n\n/**\n * @typedef {object} Languages\n * @property {string} AFR Afrikaans\n * @property {string} AMH Amharic\n * @property {string} ARA Arabic\n * @property {string} ASM Assamese\n * @property {string} AZE Azerbaijani\n * @property {string} AZE_CYRL Azerbaijani - Cyrillic\n * @property {string} BEL Belarusian\n * @property {string} BEN Bengali\n * @property {string} BOD Tibetan\n * @property {string} BOS Bosnian\n * @property {string} BUL Bulgarian\n * @property {string} CAT Catalan; Valencian\n * @property {string} CEB Cebuano\n * @property {string} CES Czech\n * @property {string} CHI_SIM Chinese - Simplified\n * @property {string} CHI_TRA Chinese - Traditional\n * @property {string} CHR Cherokee\n * @property {string} CYM Welsh\n * @property {string} DAN Danish\n * @property {string} DEU German\n * @property {string} DZO Dzongkha\n * @property {string} ELL Greek, Modern (1453-)\n * @property {string} ENG English\n * @property {string} ENM English, Middle (1100-1500)\n * @property {string} EPO Esperanto\n * @property {string} EST Estonian\n * @property {string} EUS Basque\n * @property {string} FAS Persian\n * @property {string} FIN Finnish\n * @property {string} FRA French\n * @property {string} FRK German Fraktur\n * @property {string} FRM French, Middle (ca. 1400-1600)\n * @property {string} GLE Irish\n * @property {string} GLG Galician\n * @property {string} GRC Greek, Ancient (-1453)\n * @property {string} GUJ Gujarati\n * @property {string} HAT Haitian; Haitian Creole\n * @property {string} HEB Hebrew\n * @property {string} HIN Hindi\n * @property {string} HRV Croatian\n * @property {string} HUN Hungarian\n * @property {string} IKU Inuktitut\n * @property {string} IND Indonesian\n * @property {string} ISL Icelandic\n * @property {string} ITA Italian\n * @property {string} ITA_OLD Italian - Old\n * @property {string} JAV Javanese\n * @property {string} JPN Japanese\n * @property {string} KAN Kannada\n * @property {string} KAT Georgian\n * @property {string} KAT_OLD Georgian - Old\n * @property {string} KAZ Kazakh\n * @property {string} KHM Central Khmer\n * @property {string} KIR Kirghiz; Kyrgyz\n * @property {string} KOR Korean\n * @property {string} KUR Kurdish\n * @property {string} LAO Lao\n * @property {string} LAT Latin\n * @property {string} LAV Latvian\n * @property {string} LIT Lithuanian\n * @property {string} MAL Malayalam\n * @property {string} MAR Marathi\n * @property {string} MKD Macedonian\n * @property {string} MLT Maltese\n * @property {string} MSA Malay\n * @property {string} MYA Burmese\n * @property {string} NEP Nepali\n * @property {string} NLD Dutch; Flemish\n * @property {string} NOR Norwegian\n * @property {string} ORI Oriya\n * @property {string} PAN Panjabi; Punjabi\n * @property {string} POL Polish\n * @property {string} POR Portuguese\n * @property {string} PUS Pushto; Pashto\n * @property {string} RON Romanian; Moldavian; Moldovan\n * @property {string} RUS Russian\n * @property {string} SAN Sanskrit\n * @property {string} SIN Sinhala; Sinhalese\n * @property {string} SLK Slovak\n * @property {string} SLV Slovenian\n * @property {string} SPA Spanish; Castilian\n * @property {string} SPA_OLD Spanish; Castilian - Old\n * @property {string} SQI Albanian\n * @property {string} SRP Serbian\n * @property {string} SRP_LATN Serbian - Latin\n * @property {string} SWA Swahili\n * @property {string} SWE Swedish\n * @property {string} SYR Syriac\n * @property {string} TAM Tamil\n * @property {string} TEL Telugu\n * @property {string} TGK Tajik\n * @property {string} TGL Tagalog\n * @property {string} THA Thai\n * @property {string} TIR Tigrinya\n * @property {string} TUR Turkish\n * @property {string} UIG Uighur; Uyghur\n * @property {string} UKR Ukrainian\n * @property {string} URD Urdu\n * @property {string} UZB Uzbek\n * @property {string} UZB_CYRL Uzbek - Cyrillic\n * @property {string} VIE Vietnamese\n * @property {string} YID Yiddish\n */\n\n/**\n  * @type {Languages}\n  */\nmodule.exports = {\n  AFR: 'afr',\n  AMH: 'amh',\n  ARA: 'ara',\n  ASM: 'asm',\n  AZE: 'aze',\n  AZE_CYRL: 'aze_cyrl',\n  BEL: 'bel',\n  BEN: 'ben',\n  BOD: 'bod',\n  BOS: 'bos',\n  BUL: 'bul',\n  CAT: 'cat',\n  CEB: 'ceb',\n  CES: 'ces',\n  CHI_SIM: 'chi_sim',\n  CHI_TRA: 'chi_tra',\n  CHR: 'chr',\n  CYM: 'cym',\n  DAN: 'dan',\n  DEU: 'deu',\n  DZO: 'dzo',\n  ELL: 'ell',\n  ENG: 'eng',\n  ENM: 'enm',\n  EPO: 'epo',\n  EST: 'est',\n  EUS: 'eus',\n  FAS: 'fas',\n  FIN: 'fin',\n  FRA: 'fra',\n  FRK: 'frk',\n  FRM: 'frm',\n  GLE: 'gle',\n  GLG: 'glg',\n  GRC: 'grc',\n  GUJ: 'guj',\n  HAT: 'hat',\n  HEB: 'heb',\n  HIN: 'hin',\n  HRV: 'hrv',\n  HUN: 'hun',\n  IKU: 'iku',\n  IND: 'ind',\n  ISL: 'isl',\n  ITA: 'ita',\n  ITA_OLD: 'ita_old',\n  JAV: 'jav',\n  JPN: 'jpn',\n  KAN: 'kan',\n  KAT: 'kat',\n  KAT_OLD: 'kat_old',\n  KAZ: 'kaz',\n  KHM: 'khm',\n  KIR: 'kir',\n  KOR: 'kor',\n  KUR: 'kur',\n  LAO: 'lao',\n  LAT: 'lat',\n  LAV: 'lav',\n  LIT: 'lit',\n  MAL: 'mal',\n  MAR: 'mar',\n  MKD: 'mkd',\n  MLT: 'mlt',\n  MSA: 'msa',\n  MYA: 'mya',\n  NEP: 'nep',\n  NLD: 'nld',\n  NOR: 'nor',\n  ORI: 'ori',\n  PAN: 'pan',\n  POL: 'pol',\n  POR: 'por',\n  PUS: 'pus',\n  RON: 'ron',\n  RUS: 'rus',\n  SAN: 'san',\n  SIN: 'sin',\n  SLK: 'slk',\n  SLV: 'slv',\n  SPA: 'spa',\n  SPA_OLD: 'spa_old',\n  SQI: 'sqi',\n  SRP: 'srp',\n  SRP_LATN: 'srp_latn',\n  SWA: 'swa',\n  SWE: 'swe',\n  SYR: 'syr',\n  TAM: 'tam',\n  TEL: 'tel',\n  TGK: 'tgk',\n  TGL: 'tgl',\n  THA: 'tha',\n  TIR: 'tir',\n  TUR: 'tur',\n  UIG: 'uig',\n  UKR: 'ukr',\n  URD: 'urd',\n  UZB: 'uzb',\n  UZB_CYRL: 'uzb_cyrl',\n  VIE: 'vie',\n  YID: 'yid',\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/constants/languages.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/createJob.js":
/*!****************************************************!*\
  !*** ./node_modules/tesseract.js/src/createJob.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const getId = __webpack_require__(/*! ./utils/getId */ \"./node_modules/tesseract.js/src/utils/getId.js\");\n\nlet jobCounter = 0;\n\nmodule.exports = ({\n  id: _id,\n  action,\n  payload = {},\n}) => {\n  let id = _id;\n  if (typeof id === 'undefined') {\n    id = getId('Job', jobCounter);\n    jobCounter += 1;\n  }\n\n  return {\n    id,\n    action,\n    payload,\n  };\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/createJob.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/createScheduler.js":
/*!**********************************************************!*\
  !*** ./node_modules/tesseract.js/src/createScheduler.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("const createJob = __webpack_require__(/*! ./createJob */ \"./node_modules/tesseract.js/src/createJob.js\");\nconst { log } = __webpack_require__(/*! ./utils/log */ \"./node_modules/tesseract.js/src/utils/log.js\");\nconst getId = __webpack_require__(/*! ./utils/getId */ \"./node_modules/tesseract.js/src/utils/getId.js\");\n\nlet schedulerCounter = 0;\n\nmodule.exports = () => {\n  const id = getId('Scheduler', schedulerCounter);\n  const workers = {};\n  const runningWorkers = {};\n  let jobQueue = [];\n\n  schedulerCounter += 1;\n\n  const getQueueLen = () => jobQueue.length;\n  const getNumWorkers = () => Object.keys(workers).length;\n\n  const dequeue = () => {\n    if (jobQueue.length !== 0) {\n      const wIds = Object.keys(workers);\n      for (let i = 0; i < wIds.length; i += 1) {\n        if (typeof runningWorkers[wIds[i]] === 'undefined') {\n          jobQueue[0](workers[wIds[i]]);\n          break;\n        }\n      }\n    }\n  };\n\n  const queue = (action, payload) => (\n    new Promise((resolve, reject) => {\n      const job = createJob({ action, payload });\n      jobQueue.push(async (w) => {\n        jobQueue.shift();\n        runningWorkers[w.id] = job;\n        try {\n          resolve(await w[action].apply(this, [...payload, job.id]));\n        } catch (err) {\n          reject(err);\n        } finally {\n          delete runningWorkers[w.id];\n          dequeue();\n        }\n      });\n      log(`[${id}]: Add ${job.id} to JobQueue`);\n      log(`[${id}]: JobQueue length=${jobQueue.length}`);\n      dequeue();\n    })\n  );\n\n  const addWorker = (w) => {\n    workers[w.id] = w;\n    log(`[${id}]: Add ${w.id}`);\n    log(`[${id}]: Number of workers=${getNumWorkers()}`);\n    dequeue();\n    return w.id;\n  };\n\n  const addJob = async (action, ...payload) => {\n    if (getNumWorkers() === 0) {\n      throw Error(`[${id}]: You need to have at least one worker before adding jobs`);\n    }\n    return queue(action, payload);\n  };\n\n  const terminate = async () => {\n    Object.keys(workers).forEach(async (wid) => {\n      await workers[wid].terminate();\n    });\n    jobQueue = [];\n  };\n\n  return {\n    addWorker,\n    addJob,\n    terminate,\n    getQueueLen,\n    getNumWorkers,\n  };\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/createScheduler.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/createWorker.js":
/*!*******************************************************!*\
  !*** ./node_modules/tesseract.js/src/createWorker.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const resolvePaths = __webpack_require__(/*! ./utils/resolvePaths */ \"./node_modules/tesseract.js/src/utils/resolvePaths.js\");\nconst circularize = __webpack_require__(/*! ./utils/circularize */ \"./node_modules/tesseract.js/src/utils/circularize.js\");\nconst createJob = __webpack_require__(/*! ./createJob */ \"./node_modules/tesseract.js/src/createJob.js\");\nconst { log } = __webpack_require__(/*! ./utils/log */ \"./node_modules/tesseract.js/src/utils/log.js\");\nconst getId = __webpack_require__(/*! ./utils/getId */ \"./node_modules/tesseract.js/src/utils/getId.js\");\nconst OEM = __webpack_require__(/*! ./constants/OEM */ \"./node_modules/tesseract.js/src/constants/OEM.js\");\nconst {\n  defaultOptions,\n  spawnWorker,\n  terminateWorker,\n  onMessage,\n  loadImage,\n  send,\n} = __webpack_require__(/*! ./worker/node */ \"./node_modules/tesseract.js/src/worker/browser/index.js\");\n\nlet workerCounter = 0;\n\nmodule.exports = async (langs = 'eng', oem = OEM.LSTM_ONLY, _options = {}, config = {}) => {\n  const id = getId('Worker', workerCounter);\n  const {\n    logger,\n    errorHandler,\n    ...options\n  } = resolvePaths({\n    ...defaultOptions,\n    ..._options,\n  });\n  const resolves = {};\n  const rejects = {};\n\n  // Current langs, oem, and config file.\n  // Used if the user ever re-initializes the worker using `worker.reinitialize`.\n  const currentLangs = typeof langs === 'string' ? langs.split('+') : langs;\n  let currentOem = oem;\n  let currentConfig = config;\n  const lstmOnlyCore = [OEM.DEFAULT, OEM.LSTM_ONLY].includes(oem) && !options.legacyCore;\n\n  let workerResReject;\n  let workerResResolve;\n  const workerRes = new Promise((resolve, reject) => {\n    workerResResolve = resolve;\n    workerResReject = reject;\n  });\n  const workerError = (event) => { workerResReject(event.message); };\n\n  let worker = spawnWorker(options);\n  worker.onerror = workerError;\n\n  workerCounter += 1;\n\n  const setResolve = (promiseId, res) => {\n    resolves[promiseId] = res;\n  };\n\n  const setReject = (promiseId, rej) => {\n    rejects[promiseId] = rej;\n  };\n\n  const startJob = ({ id: jobId, action, payload }) => (\n    new Promise((resolve, reject) => {\n      log(`[${id}]: Start ${jobId}, action=${action}`);\n      // Using both `action` and `jobId` in case user provides non-unique `jobId`.\n      const promiseId = `${action}-${jobId}`;\n      setResolve(promiseId, resolve);\n      setReject(promiseId, reject);\n      send(worker, {\n        workerId: id,\n        jobId,\n        action,\n        payload,\n      });\n    })\n  );\n\n  const load = () => (\n    console.warn('`load` is depreciated and should be removed from code (workers now come pre-loaded)')\n  );\n\n  const loadInternal = (jobId) => (\n    startJob(createJob({\n      id: jobId, action: 'load', payload: { options: { lstmOnly: lstmOnlyCore, corePath: options.corePath, logging: options.logging } },\n    }))\n  );\n\n  const writeText = (path, text, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'FS',\n      payload: { method: 'writeFile', args: [path, text] },\n    }))\n  );\n\n  const readText = (path, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'FS',\n      payload: { method: 'readFile', args: [path, { encoding: 'utf8' }] },\n    }))\n  );\n\n  const removeFile = (path, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'FS',\n      payload: { method: 'unlink', args: [path] },\n    }))\n  );\n\n  const FS = (method, args, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'FS',\n      payload: { method, args },\n    }))\n  );\n\n  const loadLanguage = () => (\n    console.warn('`loadLanguage` is depreciated and should be removed from code (workers now come with language pre-loaded)')\n  );\n\n  const loadLanguageInternal = (_langs, jobId) => startJob(createJob({\n    id: jobId,\n    action: 'loadLanguage',\n    payload: {\n      langs: _langs,\n      options: {\n        langPath: options.langPath,\n        dataPath: options.dataPath,\n        cachePath: options.cachePath,\n        cacheMethod: options.cacheMethod,\n        gzip: options.gzip,\n        lstmOnly: [OEM.DEFAULT, OEM.LSTM_ONLY].includes(currentOem)\n          && !options.legacyLang,\n      },\n    },\n  }));\n\n  const initialize = () => (\n    console.warn('`initialize` is depreciated and should be removed from code (workers now come pre-initialized)')\n  );\n\n  const initializeInternal = (_langs, _oem, _config, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'initialize',\n      payload: { langs: _langs, oem: _oem, config: _config },\n    }))\n  );\n\n  const reinitialize = (langs = 'eng', oem, config, jobId) => { // eslint-disable-line\n\n    if (lstmOnlyCore && [OEM.TESSERACT_ONLY, OEM.TESSERACT_LSTM_COMBINED].includes(oem)) throw Error('Legacy model requested but code missing.');\n\n    const _oem = oem || currentOem;\n    currentOem = _oem;\n\n    const _config = config || currentConfig;\n    currentConfig = _config;\n\n    // Only load langs that are not already loaded.\n    // This logic fails if the user downloaded the LSTM-only English data for a language\n    // and then uses `worker.reinitialize` to switch to the Legacy engine.\n    // However, the correct data will still be downloaded after initialization fails\n    // and this can be avoided entirely if the user loads the correct data ahead of time.\n    const langsArr = typeof langs === 'string' ? langs.split('+') : langs;\n    const _langs = langsArr.filter((x) => !currentLangs.includes(x));\n    currentLangs.push(..._langs);\n\n    if (_langs.length > 0) {\n      return loadLanguageInternal(_langs, jobId)\n        .then(() => initializeInternal(langs, _oem, _config, jobId));\n    }\n\n    return initializeInternal(langs, _oem, _config, jobId);\n  };\n\n  const setParameters = (params = {}, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'setParameters',\n      payload: { params },\n    }))\n  );\n\n  const recognize = async (image, opts = {}, output = {\n    blocks: true, text: true, hocr: true, tsv: true,\n  }, jobId) => (\n    startJob(createJob({\n      id: jobId,\n      action: 'recognize',\n      payload: { image: await loadImage(image), options: opts, output },\n    }))\n  );\n\n  const getPDF = (title = 'Tesseract OCR Result', textonly = false, jobId) => {\n    console.log('`getPDF` function is depreciated. `recognize` option `savePDF` should be used instead.');\n    return startJob(createJob({\n      id: jobId,\n      action: 'getPDF',\n      payload: { title, textonly },\n    }));\n  };\n\n  const detect = async (image, jobId) => {\n    if (lstmOnlyCore) throw Error('`worker.detect` requires Legacy model, which was not loaded.');\n\n    return startJob(createJob({\n      id: jobId,\n      action: 'detect',\n      payload: { image: await loadImage(image) },\n    }));\n  };\n\n  const terminate = async () => {\n    if (worker !== null) {\n      /*\n      await startJob(createJob({\n        id: jobId,\n        action: 'terminate',\n      }));\n      */\n      terminateWorker(worker);\n      worker = null;\n    }\n    return Promise.resolve();\n  };\n\n  onMessage(worker, ({\n    workerId, jobId, status, action, data,\n  }) => {\n    const promiseId = `${action}-${jobId}`;\n    if (status === 'resolve') {\n      log(`[${workerId}]: Complete ${jobId}`);\n      let d = data;\n      if (action === 'recognize') {\n        d = circularize(data);\n      } else if (action === 'getPDF') {\n        d = Array.from({ ...data, length: Object.keys(data).length });\n      }\n      resolves[promiseId]({ jobId, data: d });\n    } else if (status === 'reject') {\n      rejects[promiseId](data);\n      if (action === 'load') workerResReject(data);\n      if (errorHandler) {\n        errorHandler(data);\n      } else {\n        throw Error(data);\n      }\n    } else if (status === 'progress') {\n      logger({ ...data, userJobId: jobId });\n    }\n  });\n\n  const resolveObj = {\n    id,\n    worker,\n    setResolve,\n    setReject,\n    load,\n    writeText,\n    readText,\n    removeFile,\n    FS,\n    loadLanguage,\n    initialize,\n    reinitialize,\n    setParameters,\n    recognize,\n    getPDF,\n    detect,\n    terminate,\n  };\n\n  loadInternal()\n    .then(() => loadLanguageInternal(langs))\n    .then(() => initializeInternal(langs, oem, config))\n    .then(() => workerResResolve(resolveObj))\n    .catch(() => {});\n\n  return workerRes;\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/createWorker.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/tesseract.js/src/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n *\n * Entry point for tesseract.js, should be the entry when bundling.\n *\n * @fileoverview entry point for tesseract.js\n * @author Kevin Kwok <antimatter15@gmail.com>\n * @author Guillermo Webster <gui@mit.edu>\n * @author Jerome Wu <jeromewus@gmail.com>\n */\n__webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\nconst createScheduler = __webpack_require__(/*! ./createScheduler */ \"./node_modules/tesseract.js/src/createScheduler.js\");\nconst createWorker = __webpack_require__(/*! ./createWorker */ \"./node_modules/tesseract.js/src/createWorker.js\");\nconst Tesseract = __webpack_require__(/*! ./Tesseract */ \"./node_modules/tesseract.js/src/Tesseract.js\");\nconst languages = __webpack_require__(/*! ./constants/languages */ \"./node_modules/tesseract.js/src/constants/languages.js\");\nconst OEM = __webpack_require__(/*! ./constants/OEM */ \"./node_modules/tesseract.js/src/constants/OEM.js\");\nconst PSM = __webpack_require__(/*! ./constants/PSM */ \"./node_modules/tesseract.js/src/constants/PSM.js\");\nconst { setLogging } = __webpack_require__(/*! ./utils/log */ \"./node_modules/tesseract.js/src/utils/log.js\");\n\nmodule.exports = {\n  languages,\n  OEM,\n  PSM,\n  createScheduler,\n  createWorker,\n  setLogging,\n  ...Tesseract,\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/index.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/utils/circularize.js":
/*!************************************************************!*\
  !*** ./node_modules/tesseract.js/src/utils/circularize.js ***!
  \************************************************************/
/***/ ((module) => {

eval("/**\n * In the recognition result of tesseract, there\n * is a deep JSON object for details, it has around\n *\n * The result of dump.js is a big JSON tree\n * which can be easily serialized (for instance\n * to be sent from a webworker to the main app\n * or through Node's IPC), but we want\n * a (circular) DOM-like interface for walking\n * through the data.\n *\n * @fileoverview DOM-like interface for walking through data\n * @author Kevin Kwok <antimatter15@gmail.com>\n * @author Guillermo Webster <gui@mit.edu>\n * @author Jerome Wu <jeromewus@gmail.com>\n */\n\nmodule.exports = (page) => {\n  const blocks = [];\n  const paragraphs = [];\n  const lines = [];\n  const words = [];\n  const symbols = [];\n\n  if (page.blocks) {\n    page.blocks.forEach((block) => {\n      block.paragraphs.forEach((paragraph) => {\n        paragraph.lines.forEach((line) => {\n          line.words.forEach((word) => {\n            word.symbols.forEach((sym) => {\n              symbols.push({\n                ...sym, page, block, paragraph, line, word,\n              });\n            });\n            words.push({\n              ...word, page, block, paragraph, line,\n            });\n          });\n          lines.push({\n            ...line, page, block, paragraph,\n          });\n        });\n        paragraphs.push({\n          ...paragraph, page, block,\n        });\n      });\n      blocks.push({\n        ...block, page,\n      });\n    });\n  }\n\n  return {\n    ...page, blocks, paragraphs, lines, words, symbols,\n  };\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/utils/circularize.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/utils/getEnvironment.js":
/*!***************************************************************!*\
  !*** ./node_modules/tesseract.js/src/utils/getEnvironment.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const isElectron = __webpack_require__(/*! is-electron */ \"./node_modules/is-electron/index.js\");\n\nmodule.exports = (key) => {\n  const env = {};\n\n  if (typeof WorkerGlobalScope !== 'undefined') {\n    env.type = 'webworker';\n  } else if (isElectron()) {\n    env.type = 'electron';\n  } else if (typeof document === 'object') {\n    env.type = 'browser';\n  } else if (typeof process === 'object' && \"function\" === 'function') {\n    env.type = 'node';\n  }\n\n  if (typeof key === 'undefined') {\n    return env;\n  }\n\n  return env[key];\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/utils/getEnvironment.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/utils/getId.js":
/*!******************************************************!*\
  !*** ./node_modules/tesseract.js/src/utils/getId.js ***!
  \******************************************************/
/***/ ((module) => {

eval("module.exports = (prefix, cnt) => (\n  `${prefix}-${cnt}-${Math.random().toString(16).slice(3, 8)}`\n);\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/utils/getId.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/utils/log.js":
/*!****************************************************!*\
  !*** ./node_modules/tesseract.js/src/utils/log.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("let logging = false;\n\nexports.logging = logging;\n\nexports.setLogging = (_logging) => {\n  logging = _logging;\n};\n\nexports.log = (...args) => (logging ? console.log.apply(this, args) : null);\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/utils/log.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/utils/resolvePaths.js":
/*!*************************************************************!*\
  !*** ./node_modules/tesseract.js/src/utils/resolvePaths.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const isBrowser = __webpack_require__(/*! ./getEnvironment */ \"./node_modules/tesseract.js/src/utils/getEnvironment.js\")('type') === 'browser';\n\nconst resolveURL = isBrowser ? s => (new URL(s, window.location.href)).href : s => s; // eslint-disable-line\n\nmodule.exports = (options) => {\n  const opts = { ...options };\n  ['corePath', 'workerPath', 'langPath'].forEach((key) => {\n    if (options[key]) {\n      opts[key] = resolveURL(opts[key]);\n    }\n  });\n  return opts;\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/utils/resolvePaths.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/defaultOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/defaultOptions.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const version = (__webpack_require__(/*! ../../../package.json */ \"./node_modules/tesseract.js/package.json\").version);\nconst defaultOptions = __webpack_require__(/*! ../../constants/defaultOptions */ \"./node_modules/tesseract.js/src/constants/defaultOptions.js\");\n\n/*\n * Default options for browser worker\n */\nmodule.exports = {\n  ...defaultOptions,\n  workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${version}/dist/worker.min.js`,\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/defaultOptions.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/index.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n *\n * Tesseract Worker adapter for browser\n *\n * @fileoverview Tesseract Worker adapter for browser\n * @author Kevin Kwok <antimatter15@gmail.com>\n * @author Guillermo Webster <gui@mit.edu>\n * @author Jerome Wu <jeromewus@gmail.com>\n */\nconst defaultOptions = __webpack_require__(/*! ./defaultOptions */ \"./node_modules/tesseract.js/src/worker/browser/defaultOptions.js\");\nconst spawnWorker = __webpack_require__(/*! ./spawnWorker */ \"./node_modules/tesseract.js/src/worker/browser/spawnWorker.js\");\nconst terminateWorker = __webpack_require__(/*! ./terminateWorker */ \"./node_modules/tesseract.js/src/worker/browser/terminateWorker.js\");\nconst onMessage = __webpack_require__(/*! ./onMessage */ \"./node_modules/tesseract.js/src/worker/browser/onMessage.js\");\nconst send = __webpack_require__(/*! ./send */ \"./node_modules/tesseract.js/src/worker/browser/send.js\");\nconst loadImage = __webpack_require__(/*! ./loadImage */ \"./node_modules/tesseract.js/src/worker/browser/loadImage.js\");\n\nmodule.exports = {\n  defaultOptions,\n  spawnWorker,\n  terminateWorker,\n  onMessage,\n  send,\n  loadImage,\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/index.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/loadImage.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/loadImage.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("/**\n * readFromBlobOrFile\n *\n * @name readFromBlobOrFile\n * @function\n * @access private\n */\nconst readFromBlobOrFile = (blob) => (\n  new Promise((resolve, reject) => {\n    const fileReader = new FileReader();\n    fileReader.onload = () => {\n      resolve(fileReader.result);\n    };\n    fileReader.onerror = ({ target: { error: { code } } }) => {\n      reject(Error(`File could not be read! Code=${code}`));\n    };\n    fileReader.readAsArrayBuffer(blob);\n  })\n);\n\n/**\n * loadImage\n *\n * @name loadImage\n * @function load image from different source\n * @access private\n */\nconst loadImage = async (image) => {\n  let data = image;\n  if (typeof image === 'undefined') {\n    return 'undefined';\n  }\n\n  if (typeof image === 'string') {\n    // Base64 Image\n    if (/data:image\\/([a-zA-Z]*);base64,([^\"]*)/.test(image)) {\n      data = atob(image.split(',')[1])\n        .split('')\n        .map((c) => c.charCodeAt(0));\n    } else {\n      const resp = await fetch(image);\n      data = await resp.arrayBuffer();\n    }\n  } else if (typeof HTMLElement !== 'undefined' && image instanceof HTMLElement) {\n    if (image.tagName === 'IMG') {\n      data = await loadImage(image.src);\n    }\n    if (image.tagName === 'VIDEO') {\n      data = await loadImage(image.poster);\n    }\n    if (image.tagName === 'CANVAS') {\n      await new Promise((resolve) => {\n        image.toBlob(async (blob) => {\n          data = await readFromBlobOrFile(blob);\n          resolve();\n        });\n      });\n    }\n  } else if (typeof OffscreenCanvas !== 'undefined' && image instanceof OffscreenCanvas) {\n    const blob = await image.convertToBlob();\n    data = await readFromBlobOrFile(blob);\n  } else if (image instanceof File || image instanceof Blob) {\n    data = await readFromBlobOrFile(image);\n  }\n\n  return new Uint8Array(data);\n};\n\nmodule.exports = loadImage;\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/loadImage.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/onMessage.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/onMessage.js ***!
  \*******************************************************************/
/***/ ((module) => {

eval("module.exports = (worker, handler) => {\n  worker.onmessage = ({ data }) => { // eslint-disable-line\n    handler(data);\n  };\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/onMessage.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/send.js":
/*!**************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/send.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("/**\n * send\n *\n * @name send\n * @function send packet to worker and create a job\n * @access public\n */\nmodule.exports = async (worker, packet) => {\n  worker.postMessage(packet);\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/send.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/spawnWorker.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/spawnWorker.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("/**\n * spawnWorker\n *\n * @name spawnWorker\n * @function create a new Worker in browser\n * @access public\n */\nmodule.exports = ({ workerPath, workerBlobURL }) => {\n  let worker;\n  if (Blob && URL && workerBlobURL) {\n    const blob = new Blob([`importScripts(\"${workerPath}\");`], {\n      type: 'application/javascript',\n    });\n    worker = new Worker(URL.createObjectURL(blob));\n  } else {\n    worker = new Worker(workerPath);\n  }\n\n  return worker;\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/spawnWorker.js?");

/***/ }),

/***/ "./node_modules/tesseract.js/src/worker/browser/terminateWorker.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tesseract.js/src/worker/browser/terminateWorker.js ***!
  \*************************************************************************/
/***/ ((module) => {

eval("/**\n * terminateWorker\n *\n * @name terminateWorker\n * @function terminate worker\n * @access public\n */\nmodule.exports = (worker) => {\n  worker.terminate();\n};\n\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/src/worker/browser/terminateWorker.js?");

/***/ }),

/***/ "./src/Geometry.js":
/*!*************************!*\
  !*** ./src/Geometry.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAngleBetweenVectors: () => (/* binding */ getAngleBetweenVectors),\n/* harmony export */   perpendicularDistance: () => (/* binding */ perpendicularDistance),\n/* harmony export */   radianToDegree: () => (/* binding */ radianToDegree)\n/* harmony export */ });\nfunction perpendicularDistance (point, line) {\r\n    let x0 = point.x;\r\n    let y0 = point.y;\r\n    let x1 = line[0].x;\r\n    let y1 = line[0].y;\r\n    let x2 = line[1].x;\r\n    let y2 = line[1].y;\r\n    return Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));\r\n}\r\n\r\nfunction getAngleBetweenVectors (v1, v2) {\r\n    let dot = v1.x * v2.x + v1.y * v2.y;\r\n    let d1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);\r\n    let d2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);\r\n    if (!d1 || !d2) {\r\n        console.log(\"Division by zero\");\r\n        return 0;\r\n    }\r\n    return Math.acos(dot / (d1 * d2));\r\n}\r\n\r\nfunction radianToDegree (radian) {\r\n    return radian * 180 / Math.PI;\r\n}\r\n\n\n//# sourceURL=webpack://math-board/./src/Geometry.js?");

/***/ }),

/***/ "./src/Layer.js":
/*!**********************!*\
  !*** ./src/Layer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Layer: () => (/* binding */ Layer)\n/* harmony export */ });\nclass Layer {\r\n    constructor (id) {\r\n        this.id = id;\r\n        this.canvas = document.createElement(\"canvas\");\r\n        this.canvas.width = innerWidth;\r\n        this.canvas.height = innerHeight;\r\n        this.ctx = this.canvas.getContext(\"2d\", { willReadFrequently: true });\r\n    }\r\n    rect () {\r\n        return this.canvas.getBoundingClientRect();\r\n    }\r\n    clear () {\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n    clone (otherLayer) {\r\n        const compositeOperation = this.ctx.globalCompositeOperation;\r\n        if (this.ctx.globalCompositeOperation !== \"source-over\") {\r\n            this.ctx.globalCompositeOperation = \"source-over\";\r\n        }\r\n        this.clear();\r\n        this.ctx.drawImage(otherLayer.canvas, 0, 0);\r\n        if (compositeOperation !== \"source-over\") {\r\n            this.ctx.globalCompositeOperation = compositeOperation;\r\n        }\r\n    }\r\n    getImageData () {\r\n        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n    putImageData (imageData) {\r\n        this.clear();\r\n        this.ctx.putImageData(imageData, 0, 0);\r\n    }\r\n    setCompositeOperation (operation) {\r\n        this.ctx.globalCompositeOperation = operation;\r\n    }\r\n    async getSnapshot (rect) {\r\n        const [x, y, width, height] = [rect.x, rect.y, rect.w, rect.h];\r\n        const offscreenCanvas = new OffscreenCanvas(width, height);\r\n        const offscreenCtx = offscreenCanvas.getContext(\"2d\");\r\n        // offscreenCtx.clearRect(0, 0, width, height);\r\n        // fill offscreenCtx with white color\r\n        offscreenCtx.fillStyle = \"white\";\r\n        offscreenCtx.fillRect(0, 0, width, height);\r\n        offscreenCtx.drawImage(this.canvas, x, y, width, height, 0, 0, width, height);\r\n        const result = await offscreenCanvas.convertToBlob().then(blob => {\r\n            const url = URL.createObjectURL(blob);\r\n            return url;\r\n        });\r\n        return result;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://math-board/./src/Layer.js?");

/***/ }),

/***/ "./src/LineAlgorithms.js":
/*!*******************************!*\
  !*** ./src/LineAlgorithms.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Chaikin: () => (/* binding */ Chaikin),\n/* harmony export */   DouglasPeucker: () => (/* binding */ DouglasPeucker),\n/* harmony export */   addToBuffer: () => (/* binding */ addToBuffer),\n/* harmony export */   clearBuffer: () => (/* binding */ clearBuffer),\n/* harmony export */   createStroke: () => (/* binding */ createStroke),\n/* harmony export */   getNextPoints: () => (/* binding */ getNextPoints)\n/* harmony export */ });\n/* harmony import */ var _Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry.js */ \"./src/Geometry.js\");\n\r\n\r\nfunction createStroke (start, end) {\r\n    let dx = end.x - start.x;\r\n    let dy = end.y - start.y;\r\n    let additionalPoints = [];\r\n\r\n    if (!dx) {\r\n        while (start.y !== end.y) {\r\n            start.y += (dy > 0) ? 1 : -1;\r\n            additionalPoints.push({\r\n                x: start.x,\r\n                y: start.y\r\n            });\r\n        }\r\n    }\r\n    else if (!dy) {\r\n        while (start.x !== end.x) {\r\n            start.x += (dx > 0) ? 1 : -1;\r\n            additionalPoints.push({\r\n                x: start.x,\r\n                y: start.y\r\n            });\r\n        }\r\n    }\r\n    else {\r\n        let step = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy));\r\n        let sx = dx / step;\r\n        let sy = dy / step;\r\n        while (start.x !== end.x && start.y !== end.y) {\r\n            start.x += sx;\r\n            start.y += sy;\r\n            additionalPoints.push({\r\n                x: Math.round(start.x),\r\n                y: Math.round(start.y)\r\n            });\r\n        }\r\n    }\r\n\r\n    return additionalPoints;\r\n}\r\n\r\nfunction DouglasPeucker (path, epsilon) {\r\n    let maxDistance = 0;\r\n    let index = 0;\r\n    for (let i = 1; i < path.length - 1; i++) {\r\n        let d = (0,_Geometry_js__WEBPACK_IMPORTED_MODULE_0__.perpendicularDistance)(path[i], [path[0], path[path.length - 1]]);\r\n        if (d > maxDistance) {\r\n            maxDistance = d;\r\n            index = i;\r\n        }\r\n    }\r\n    let resultPath = [];\r\n    if (maxDistance > epsilon) {\r\n        let path1 = path.slice(0, index + 1);\r\n        let path2 = path.slice(index);\r\n        resultPath = [...DouglasPeucker(path1, epsilon).slice(0, -1), ...DouglasPeucker(path2, epsilon)];\r\n    } else {\r\n        resultPath = [path[0], path[path.length - 1]];\r\n    }\r\n    return resultPath;\r\n}\r\n\r\nfunction Chaikin (path, level) {\r\n    if (!level)\r\n        return path;\r\n\r\n    let newPath = [path[0]];\r\n    let len = path.length;\r\n    for (let i = 1; i < len; i++) {\r\n        let p0 = (i > 1 ? path[i - 2] : null);\r\n        let p1 = path[i - 1];\r\n        let p2 = path[i];\r\n        let q1 = {\r\n            x: Math.round(0.75 * p1.x + 0.25 * p2.x),\r\n            y: Math.round(0.75 * p1.y + 0.25 * p2.y)\r\n        };\r\n        let q2 = {\r\n            x: Math.round(0.25 * p1.x + 0.75 * p2.x),\r\n            y: Math.round(0.25 * p1.y + 0.75 * p2.y)\r\n        };\r\n        if (p0) {\r\n            let v10 = { x: p0.x - p1.x, y: p0.y - p1.y };\r\n            let v12 = { x: p2.x - p1.x, y: p2.y - p1.y };\r\n            let angle = (0,_Geometry_js__WEBPACK_IMPORTED_MODULE_0__.radianToDegree)((0,_Geometry_js__WEBPACK_IMPORTED_MODULE_0__.getAngleBetweenVectors)(v10, v12));\r\n            if (angle <= 90) {\r\n                newPath.pop();\r\n                newPath.push(p1);\r\n            }\r\n        }\r\n\r\n        let lastPoint = newPath[newPath.length - 1];\r\n        if (lastPoint.x !== q1.x || lastPoint.y !== q1.y) {\r\n            newPath.push(q1);\r\n        }\r\n        if (q1.x !== q2.x || q1.y !== q2.y) {\r\n            newPath.push(q2);\r\n        }\r\n    }\r\n    newPath.push(path[path.length - 1]);\r\n    return Chaikin(newPath, level - 1);\r\n}\r\n\r\n// source https://stackoverflow.com/questions/40324313/svg-smooth-freehand-drawing/\r\n\r\n// Below smoothing method is called 'Moving Average':\r\n// it calculates the average of the last mouse positions kept in a buffer,\r\n// the buffer is updated real-time with the current mouse position.\r\n\r\nconst BUFFER_SIZE = 4;\r\nlet buffer = [];\r\n\r\nfunction addToBuffer (point) {\r\n    buffer.push(point);\r\n    while (buffer.length > BUFFER_SIZE) {\r\n        buffer.shift();\r\n    }\r\n}\r\n\r\nfunction clearBuffer() {\r\n    buffer = [];\r\n}\r\n\r\nfunction getAveragePoint (offset) {\r\n    const len = buffer.length;\r\n    // Ensures the buffer has an odd number of points, which is beneficial for symmetric averaging, leading to smoother curves.\r\n    if (len % 2 === 1 || len == BUFFER_SIZE) {\r\n        let sum = { x: 0, y: 0 };\r\n        let count = 0;\r\n        for (let i = offset; i < len; i++) {\r\n            sum.x += buffer[i].x;\r\n            sum.y += buffer[i].y;\r\n            count++;\r\n        }\r\n        return {\r\n            x: Math.round(sum.x / count),\r\n            y: Math.round(sum.y / count)\r\n        };\r\n    }\r\n    return null;\r\n}\r\n\r\nfunction getNextPoints() {\r\n    let returnPoints = [];\r\n    let point = getAveragePoint(0);\r\n    if (point) {\r\n        returnPoints.push(point);\r\n        // Skips every other point to improve smoothing and reduce jitter from rapid mouse movements.\r\n        for (let offset = 2; offset < buffer.length; offset += 2) {\r\n            point = getAveragePoint(offset);\r\n            if (point) {\r\n                returnPoints.push(point);\r\n            }\r\n        }\r\n    }\r\n    return returnPoints;\r\n}\r\n\n\n//# sourceURL=webpack://math-board/./src/LineAlgorithms.js?");

/***/ }),

/***/ "./src/Stack.js":
/*!**********************!*\
  !*** ./src/Stack.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Stack: () => (/* binding */ Stack)\n/* harmony export */ });\nclass Stack {\r\n    constructor() {\r\n        this.stack = [];\r\n    }\r\n    push(item) {\r\n        this.stack.push(item);\r\n    }\r\n    pop() {\r\n        return this.stack.pop();\r\n    }\r\n    top() {\r\n        return this.stack[this.stack.length - 1];\r\n    }\r\n    get size() {\r\n        return this.stack.length;\r\n    }\r\n    empty() {\r\n        return this.size === 0;\r\n    }\r\n    clear() {\r\n        this.stack = [];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://math-board/./src/Stack.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.js */ \"./src/Layer.js\");\n/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stack.js */ \"./src/Stack.js\");\n/* harmony import */ var _LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LineAlgorithms.js */ \"./src/LineAlgorithms.js\");\n/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tesseract.js */ \"./node_modules/tesseract.js/src/index.js\");\n/* harmony import */ var tesseract_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tesseract_js__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst uiLayer = new _Layer_js__WEBPACK_IMPORTED_MODULE_1__.Layer(\"ui\");\r\nconst mainLayer = new _Layer_js__WEBPACK_IMPORTED_MODULE_1__.Layer(\"main\");\r\nconst offscreenLayer = new _Layer_js__WEBPACK_IMPORTED_MODULE_1__.Layer(\"offscreen\");\r\nconst History = new _Stack_js__WEBPACK_IMPORTED_MODULE_2__.Stack();\r\nconst DeletedHistory = new _Stack_js__WEBPACK_IMPORTED_MODULE_2__.Stack();\r\n\r\nconst mousePosTracker = document.getElementById(\"mouse-pos\");\r\nconst undoButton = document.getElementById(\"undo\");\r\nconst redoButton = document.getElementById(\"redo\");\r\nconst brushSizeSlider = document.getElementById(\"brush-size\");\r\nconst brushColorPicker = document.getElementById(\"brush-color\");\r\nconst brushModeToggle = document.getElementById(\"toggle-brush-mode\");\r\n\r\nconst [BEFORE_PAINTING, DURING_PAINTING, DONE_PAINTING] = [0, 1, 2];\r\nconst [MODE_DRAW, MODE_ERASER] = [0, 1];\r\n\r\nconst cursor = {\r\n    x: 0,\r\n    y: 0\r\n};\r\n\r\nconst brush = {\r\n    x: 0,\r\n    y: 0,\r\n    mode: MODE_DRAW,\r\n    radius: 2,\r\n    color: \"black\",\r\n    draw() {\r\n        uiLayer.ctx.beginPath();\r\n        uiLayer.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\r\n        uiLayer.ctx.strokeStyle = this.color;\r\n        uiLayer.ctx.stroke();\r\n    }\r\n}\r\n\r\nconst drawingRect = {\r\n    min_x: 99999,\r\n    min_y: 99999,\r\n    max_x: 0,\r\n    max_y: 0,\r\n    reset() {\r\n        this.min_x = this.min_y = 99999;\r\n        this.max_x = this.max_y = 0;\r\n    },\r\n    update(x, y) {\r\n        this.max_x = Math.max(this.max_x, x);\r\n        this.max_y = Math.max(this.max_y, y);\r\n        this.min_x = Math.min(this.min_x, x);\r\n        this.min_y = Math.min(this.min_y, y);\r\n    },\r\n    getRect() {\r\n        return {\r\n            x: this.min_x,\r\n            y: this.min_y,\r\n            w: this.max_x - this.min_x,\r\n            h: this.max_y - this.min_y\r\n        }\r\n    }\r\n}\r\n\r\nlet mainPath = [];\r\nlet tempPath = [];\r\nlet drawingState = false;\r\n\r\nfunction drawBrushPoint (x, y) {\r\n    mainLayer.ctx.beginPath();\r\n    mainLayer.ctx.arc(x, y, brush.radius, 0, Math.PI * 2);\r\n    mainLayer.ctx.fillStyle = brush.color;\r\n    mainLayer.ctx.fill();\r\n}\r\n\r\nfunction drawStroke (path) {\r\n    path.forEach(point => {\r\n        drawBrushPoint(point.x, point.y);\r\n    })\r\n}\r\n\r\nfunction clear() {\r\n    uiLayer.clear();\r\n    if (brush.mode == MODE_DRAW) {\r\n        mainLayer.clone(offscreenLayer);\r\n    }\r\n}\r\n\r\nfunction update() {\r\n    mousePosTracker.innerHTML = `(x: ${cursor.x}, y: ${cursor.y})`;\r\n    brush.x = cursor.x;\r\n    brush.y = cursor.y;\r\n}\r\n\r\nfunction draw() {\r\n    clear();\r\n    update();\r\n\r\n    brush.draw();\r\n    if (drawingState !== BEFORE_PAINTING) {\r\n        drawStroke([...mainPath, ...tempPath]);\r\n    }\r\n    if (drawingState == DONE_PAINTING) {\r\n        drawingState = BEFORE_PAINTING;\r\n        offscreenLayer.clone(mainLayer);\r\n        History.push(mainLayer.getImageData());\r\n        DeletedHistory.clear();\r\n        redoButton.disabled = true;\r\n        undoButton.disabled = false;\r\n    }\r\n\r\n    requestAnimationFrame(draw);\r\n}\r\n\r\nfunction undo(event) {\r\n    event.preventDefault()\r\n    if (History.size <= 1) {\r\n        return;\r\n    }\r\n    DeletedHistory.push(History.pop());\r\n    offscreenLayer.putImageData(History.top());\r\n    mainLayer.clone(offscreenLayer);\r\n    if (History.size <= 1) {\r\n        undoButton.disabled = true;\r\n    }\r\n    if (!DeletedHistory.empty()) {\r\n        redoButton.disabled = false;\r\n    }\r\n}\r\n\r\nfunction redo(event) {\r\n    event.preventDefault()\r\n    if (DeletedHistory.empty()) {\r\n        return;\r\n    }\r\n    History.push(DeletedHistory.pop());\r\n    offscreenLayer.putImageData(History.top());\r\n    mainLayer.clone(offscreenLayer);\r\n    if (DeletedHistory.empty()) {\r\n        redoButton.disabled = true;\r\n    }\r\n    if (History.size > 1) {\r\n        undoButton.disabled = false;\r\n    }\r\n}\r\n\r\nasync function capture() {\r\n    const result = await mainLayer.getSnapshot(drawingRect.getRect());\r\n    console.log(\"Image URL: \", result);\r\n    const worker = await (0,tesseract_js__WEBPACK_IMPORTED_MODULE_4__.createWorker)('eng');\r\n    const ret = await worker.recognize(result);\r\n    console.log(\"OCR result: \", ret.data.text);\r\n    await worker.terminate();\r\n}\r\n\r\nfunction getMousePos (e) {\r\n    return {\r\n        x: e.clientX - mainLayer.rect().left,\r\n        y: e.clientY - mainLayer.rect().top\r\n    };\r\n}\r\n\r\nfunction startDrawing (e) {\r\n    e.preventDefault();\r\n    drawingState = DURING_PAINTING;\r\n\r\n    const cursor = getMousePos(e);\r\n    drawingRect.reset();\r\n    mainPath = [];\r\n    tempPath = [];\r\n    (0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.clearBuffer)();\r\n\r\n    mainPath.push(cursor);\r\n    (0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.addToBuffer)(cursor);\r\n}\r\n\r\nfunction whileDrawing (e) {\r\n    e.preventDefault();\r\n\r\n    if (drawingState == DURING_PAINTING) {\r\n        const cursor = getMousePos(e);\r\n        (0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.addToBuffer)(cursor);\r\n        const nextPoints = (0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.getNextPoints)();\r\n        if (nextPoints.length > 0) {\r\n            // save one stable smoothed point\r\n            mainPath.push(...(0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.createStroke)(mainPath[mainPath.length - 1], nextPoints[0]));\r\n            // save the rest of average points between the stable point to the cursor\r\n            tempPath = [];\r\n            for (let i = 1; i < nextPoints.length; i++) {\r\n                tempPath.push(...(0,_LineAlgorithms_js__WEBPACK_IMPORTED_MODULE_3__.createStroke)(nextPoints[i - 1], nextPoints[i]));\r\n            }\r\n        }\r\n        if (mainPath.length > 0) {\r\n            const lastPoint = mainPath[mainPath.length - 1];\r\n            drawingRect.update(lastPoint.x, lastPoint.y);\r\n        }\r\n    }\r\n}\r\n\r\nfunction finishDrawing (e) {\r\n    e.preventDefault();\r\n\r\n    if (drawingState === DURING_PAINTING) {\r\n        drawingState = DONE_PAINTING;\r\n    }\r\n}\r\n\r\n\r\n(function main() {\r\n    document.body.appendChild(mainLayer.canvas);\r\n    document.body.appendChild(uiLayer.canvas);\r\n\r\n    addEventListener(\"mousemove\", (e) => {\r\n        cursor.x = e.clientX - mainLayer.rect().left;\r\n        cursor.y = e.clientY - mainLayer.rect().top;\r\n    });\r\n\r\n    uiLayer.canvas.addEventListener(\"mousedown\", startDrawing);\r\n    uiLayer.canvas.addEventListener(\"mousemove\", whileDrawing);\r\n    uiLayer.canvas.addEventListener(\"mouseup\", finishDrawing);\r\n    uiLayer.canvas.addEventListener(\"mouseout\", finishDrawing);\r\n\r\n    History.push(offscreenLayer.getImageData());\r\n\r\n    undoButton.addEventListener(\"click\", undo);\r\n    redoButton.addEventListener(\"click\", redo);\r\n    brushSizeSlider.addEventListener(\"input\", (e) => {\r\n        brush.radius = e.target.value;\r\n    });\r\n    brushColorPicker.addEventListener(\"input\", (e) => {\r\n        brush.color = e.target.value;\r\n    });\r\n    brushModeToggle.addEventListener(\"click\", (e) => {\r\n        brush.mode = (brush.mode === MODE_DRAW ? MODE_ERASER : MODE_DRAW);\r\n        brushModeToggle.innerHTML = (brush.mode === MODE_DRAW ? \"Draw\" : \"Erase\");\r\n        mainLayer.setCompositeOperation(brush.mode === MODE_ERASER ? \"destination-out\" : \"source-over\");\r\n        brushColorPicker.disabled = (brush.mode === MODE_ERASER);\r\n    });\r\n    document.getElementById(\"capture\").addEventListener(\"click\", capture);\r\n\r\n    draw();\r\n})()\r\n\n\n//# sourceURL=webpack://math-board/./src/index.js?");

/***/ }),

/***/ "./public/SVG/graph-paper.svg":
/*!************************************!*\
  !*** ./public/SVG/graph-paper.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"da323566adf2c21103cc.svg\";\n\n//# sourceURL=webpack://math-board/./public/SVG/graph-paper.svg?");

/***/ }),

/***/ "./node_modules/tesseract.js/package.json":
/*!************************************************!*\
  !*** ./node_modules/tesseract.js/package.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"name\":\"tesseract.js\",\"version\":\"5.1.1\",\"description\":\"Pure Javascript Multilingual OCR\",\"main\":\"src/index.js\",\"types\":\"src/index.d.ts\",\"unpkg\":\"dist/tesseract.min.js\",\"jsdelivr\":\"dist/tesseract.min.js\",\"scripts\":{\"start\":\"node scripts/server.js\",\"build\":\"rimraf dist && webpack --config scripts/webpack.config.prod.js && rollup -c scripts/rollup.esm.mjs\",\"profile:tesseract\":\"webpack-bundle-analyzer dist/tesseract-stats.json\",\"profile:worker\":\"webpack-bundle-analyzer dist/worker-stats.json\",\"prepublishOnly\":\"npm run build\",\"wait\":\"rimraf dist && wait-on http://localhost:3000/dist/tesseract.min.js\",\"test\":\"npm-run-all -p -r start test:all\",\"test:all\":\"npm-run-all wait test:browser:* test:node:all\",\"test:node\":\"nyc mocha --exit --bail --require ./scripts/test-helper.js\",\"test:node:all\":\"npm run test:node -- ./tests/*.test.js\",\"test:browser-tpl\":\"mocha-headless-chrome -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000\",\"test:browser:detect\":\"npm run test:browser-tpl -- -f ./tests/detect.test.html\",\"test:browser:recognize\":\"npm run test:browser-tpl -- -f ./tests/recognize.test.html\",\"test:browser:scheduler\":\"npm run test:browser-tpl -- -f ./tests/scheduler.test.html\",\"test:browser:FS\":\"npm run test:browser-tpl -- -f ./tests/FS.test.html\",\"lint\":\"eslint src\",\"lint:fix\":\"eslint --fix src\",\"postinstall\":\"opencollective-postinstall || true\"},\"browser\":{\"./src/worker/node/index.js\":\"./src/worker/browser/index.js\"},\"author\":\"\",\"contributors\":[\"jeromewu\"],\"license\":\"Apache-2.0\",\"devDependencies\":{\"@babel/core\":\"^7.21.4\",\"@babel/eslint-parser\":\"^7.21.3\",\"@babel/preset-env\":\"^7.21.4\",\"@rollup/plugin-commonjs\":\"^24.1.0\",\"acorn\":\"^8.8.2\",\"babel-loader\":\"^9.1.2\",\"buffer\":\"^6.0.3\",\"cors\":\"^2.8.5\",\"eslint\":\"^7.32.0\",\"eslint-config-airbnb-base\":\"^14.2.1\",\"eslint-plugin-import\":\"^2.27.5\",\"expect.js\":\"^0.3.1\",\"express\":\"^4.18.2\",\"mocha\":\"^10.2.0\",\"mocha-headless-chrome\":\"^4.0.0\",\"npm-run-all\":\"^4.1.5\",\"nyc\":\"^15.1.0\",\"rimraf\":\"^5.0.0\",\"rollup\":\"^3.20.7\",\"wait-on\":\"^7.0.1\",\"webpack\":\"^5.79.0\",\"webpack-bundle-analyzer\":\"^4.8.0\",\"webpack-cli\":\"^5.0.1\",\"webpack-dev-middleware\":\"^6.0.2\",\"rollup-plugin-sourcemaps\":\"^0.6.3\"},\"dependencies\":{\"bmp-js\":\"^0.1.0\",\"idb-keyval\":\"^6.2.0\",\"is-electron\":\"^2.2.2\",\"is-url\":\"^1.2.4\",\"node-fetch\":\"^2.6.9\",\"opencollective-postinstall\":\"^2.0.3\",\"regenerator-runtime\":\"^0.13.3\",\"tesseract.js-core\":\"^5.1.1\",\"wasm-feature-detect\":\"^1.2.11\",\"zlibjs\":\"^0.3.1\"},\"overrides\":{\"@rollup/pluginutils\":\"^5.0.2\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/naptha/tesseract.js.git\"},\"bugs\":{\"url\":\"https://github.com/naptha/tesseract.js/issues\"},\"homepage\":\"https://github.com/naptha/tesseract.js\",\"collective\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/tesseractjs\"}}');\n\n//# sourceURL=webpack://math-board/./node_modules/tesseract.js/package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;