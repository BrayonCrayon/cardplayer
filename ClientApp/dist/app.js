/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\src\\app.js: Support for the experimental syntax 'classProperties' isn't currently enabled (16:22):\n\n\u001b[0m \u001b[90m 14 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 15 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m \u001b[36mclass\u001b[39m \u001b[33mApp\u001b[39m \u001b[36mextends\u001b[39m \u001b[33mComponent\u001b[39m {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 16 | \u001b[39m  static displayName \u001b[33m=\u001b[39m \u001b[33mApp\u001b[39m\u001b[33m.\u001b[39mname\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                     \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 17 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 18 | \u001b[39m  render () {\u001b[0m\n\u001b[0m \u001b[90m 19 | \u001b[39m    \u001b[36mreturn\u001b[39m (\u001b[0m\n\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\n    at Parser._raise (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:742:17)\n    at Parser.raiseWithData (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:735:17)\n    at Parser.expectPlugin (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:8762:18)\n    at Parser.parseClassProperty (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12110:12)\n    at Parser.pushClassProperty (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12070:30)\n    at Parser.parseClassMemberWithIsStatic (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12003:14)\n    at Parser.parseClassMember (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11940:10)\n    at withTopicForbiddingContext (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11885:14)\n    at Parser.withTopicForbiddingContext (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:10956:14)\n    at Parser.parseClassBody (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11862:10)\n    at Parser.parseClass (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11836:22)\n    at Parser.parseExportDefaultExpression (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12272:19)\n    at Parser.parseExport (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12185:31)\n    at Parser.parseStatementContent (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11185:27)\n    at Parser.parseStatement (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11081:17)\n    at Parser.parseBlockOrModuleBlockBody (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11656:25)\n    at Parser.parseBlockBody (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11642:10)\n    at Parser.parseTopLevel (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:11012:10)\n    at Parser.parse (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12637:10)\n    at parse (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\parser\\lib\\index.js:12688:38)\n    at parser (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\core\\lib\\parser\\index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:93:38)\n    at normalizeFile.next (<anonymous>)\n    at run (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\core\\lib\\transformation\\index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\core\\lib\\transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:254:32)\n    at gen.next (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:266:13)\n    at async.call.value (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:216:11)\n    at errback.call (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:184:28)\n    at runGenerator.errback (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:72:7)\n    at val (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:108:33)\n    at step (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:280:14)\n    at gen.next (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\gensync\\index.js:266:13)");

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/css-loader/dist/cjs.js):\nModuleBuildError: Module build failed (from ./node_modules/resolve-url-loader/index.js):\nError: file://C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\src\\sass\\app.scss:4:460: missing '{'\n    at error (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:62:15)\n    at declarations (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:248:25)\n    at rule (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:561:21)\n    at rules (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:118:70)\n    at stylesheet (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:81:21)\n    at module.exports (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\css\\lib\\parse\\index.js:565:20)\n    at rework (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\rework\\index.js:27:21)\n    at process (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\resolve-url-loader\\lib\\engine\\rework.js:34:18)\n    at Object.resolveUrlLoader (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\resolve-url-loader\\index.js:165:33)\n    at runLoaders (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\webpack\\lib\\NormalModule.js:316:20)\n    at C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:233:18\n    at runSyncOrAsync (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:143:3)\n    at iterateNormalLoaders (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:232:2)\n    at iterateNormalLoaders (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:221:10)\n    at C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:236:3\n    at context.callback (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at Object.render [as callback] (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\sass-loader\\dist\\index.js:109:5)\n    at Object.done [as callback] (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\neo-async\\async.js:8067:18)\n    at options.success (C:\\Development\\c#\\CardPlayer\\CardPlayer\\ClientApp\\node_modules\\node-sass\\lib\\index.js:310:32)");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi ./src/app.js ./src/sass/app.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Development\c#\CardPlayer\CardPlayer\ClientApp\src\app.js */"./src/app.js");
module.exports = __webpack_require__(/*! C:\Development\c#\CardPlayer\CardPlayer\ClientApp\src\sass\app.scss */"./src/sass/app.scss");


/***/ })

/******/ });