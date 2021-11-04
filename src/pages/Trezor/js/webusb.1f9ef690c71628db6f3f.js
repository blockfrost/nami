!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.TrezorConnect=e():t.TrezorConnect=e()}(self,(function(){return(()=>{var t={"./node_modules/@babel/runtime/regenerator/index.js":(t,e,r)=>{t.exports=r("./node_modules/regenerator-runtime/runtime.js")},"./node_modules/es6-promise/dist/es6-promise.js":function(t,e,r){var n=r("./node_modules/process/browser.js");
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */t.exports=function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}var o=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},i=0,s=void 0,a=void 0,u=function(t,e){_[i]=t,_[i+1]=e,2===(i+=2)&&(a?a(x):E())};function c(t){a=t}function f(t){u=t}var h="undefined"!=typeof window?window:void 0,l=h||{},p=l.MutationObserver||l.WebKitMutationObserver,d="undefined"==typeof self&&void 0!==n&&"[object process]"==={}.toString.call(n),y="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function v(){return function(){return n.nextTick(x)}}function m(){return void 0!==s?function(){s(x)}:g()}function b(){var t=0,e=new p(x),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function w(){var t=new MessageChannel;return t.port1.onmessage=x,function(){return t.port2.postMessage(0)}}function g(){var t=setTimeout;return function(){return t(x,1)}}var _=new Array(1e3);function x(){for(var t=0;t<i;t+=2)(0,_[t])(_[t+1]),_[t]=void 0,_[t+1]=void 0;i=0}function T(){try{var t=Function("return this")().require("vertx");return s=t.runOnLoop||t.runOnContext,m()}catch(t){return g()}}var E=void 0;function A(t,e){var r=this,n=new this.constructor(L);void 0===n[O]&&X(n);var o=r._state;if(o){var i=arguments[o-1];u((function(){return Y(o,n,i,r._result)}))}else q(r,n,t,e);return n}function j(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(L);return C(r,t),r}E=d?v():p?b():y?w():void 0===h?T():g();var O=Math.random().toString(36).substring(2);function L(){}var B=void 0,S=1,P=2;function k(){return new TypeError("You cannot resolve a promise with itself")}function U(){return new TypeError("A promises callback cannot return that same promise.")}function F(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function I(t,e,r){u((function(t){var n=!1,o=F(r,e,(function(r){n||(n=!0,e!==r?C(t,r):G(t,r))}),(function(e){n||(n=!0,M(t,e))}),"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,M(t,o))}),t)}function R(t,e){e._state===S?G(t,e._result):e._state===P?M(t,e._result):q(e,void 0,(function(e){return C(t,e)}),(function(e){return M(t,e)}))}function D(t,r,n){r.constructor===t.constructor&&n===A&&r.constructor.resolve===j?R(t,r):void 0===n?G(t,r):e(n)?I(t,r,n):G(t,r)}function C(e,r){if(e===r)M(e,k());else if(t(r)){var n=void 0;try{n=r.then}catch(t){return void M(e,t)}D(e,r,n)}else G(e,r)}function N(t){t._onerror&&t._onerror(t._result),H(t)}function G(t,e){t._state===B&&(t._result=e,t._state=S,0!==t._subscribers.length&&u(H,t))}function M(t,e){t._state===B&&(t._state=P,t._result=e,u(N,t))}function q(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+S]=r,o[i+P]=n,0===i&&t._state&&u(H,t)}function H(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?Y(r,n,o,i):o(i);t._subscribers.length=0}}function Y(t,r,n,o){var i=e(n),s=void 0,a=void 0,u=!0;if(i){try{s=n(o)}catch(t){u=!1,a=t}if(r===s)return void M(r,U())}else s=o;r._state!==B||(i&&u?C(r,s):!1===u?M(r,a):t===S?G(r,s):t===P&&M(r,s))}function z(t,e){try{e((function(e){C(t,e)}),(function(e){M(t,e)}))}catch(e){M(t,e)}}var J=0;function V(){return J++}function X(t){t[O]=J++,t._state=void 0,t._result=void 0,t._subscribers=[]}function $(){return new Error("Array Methods must be provided an Array")}var K=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(L),this.promise[O]||X(this.promise),o(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?G(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&G(this.promise,this._result))):M(this.promise,$())}return t.prototype._enumerate=function(t){for(var e=0;this._state===B&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===j){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===A&&t._state!==B)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===rt){var a=new r(L);s?M(a,i):D(a,t,o),this._willSettleAt(a,e)}else this._willSettleAt(new r((function(e){return e(t)})),e)}else this._willSettleAt(n(t),e)},t.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===B&&(this._remaining--,t===P?M(n,r):this._result[e]=r),0===this._remaining&&G(n,this._result)},t.prototype._willSettleAt=function(t,e){var r=this;q(t,void 0,(function(t){return r._settledAt(S,e,t)}),(function(t){return r._settledAt(P,e,t)}))},t}();function W(t){return new K(this,t).promise}function Q(t){var e=this;return o(t)?new e((function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)})):new e((function(t,e){return e(new TypeError("You must pass an array to race."))}))}function Z(t){var e=new this(L);return M(e,t),e}function tt(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function et(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var rt=function(){function t(e){this[O]=V(),this._result=this._state=void 0,this._subscribers=[],L!==e&&("function"!=typeof e&&tt(),this instanceof t?z(this,e):et())}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var r=this,n=r.constructor;return e(t)?r.then((function(e){return n.resolve(t()).then((function(){return e}))}),(function(e){return n.resolve(t()).then((function(){throw e}))})):r.then(t,t)},t}();function nt(){var t=void 0;if(void 0!==r.g)t=r.g;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=rt}return rt.prototype.then=A,rt.all=W,rt.race=Q,rt.resolve=j,rt.reject=Z,rt._setScheduler=c,rt._setAsap=f,rt._asap=u,rt.polyfill=nt,rt.Promise=rt,rt}()},"./node_modules/process/browser.js":t=>{var e,r,n=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function s(t){if(e===setTimeout)return setTimeout(t,0);if((e===o||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(r){try{return e.call(null,t,0)}catch(r){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:o}catch(t){e=o}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(t){r=i}}();var a,u=[],c=!1,f=-1;function h(){c&&a&&(c=!1,a.length?u=a.concat(u):f=-1,u.length&&l())}function l(){if(!c){var t=s(h);c=!0;for(var e=u.length;e;){for(a=u,u=[];++f<e;)a&&a[f].run();f=-1,e=u.length}a=null,c=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function d(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new p(t,e)),1!==u.length||c||s(l)},p.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=d,n.addListener=d,n.once=d,n.off=d,n.removeListener=d,n.removeAllListeners=d,n.emit=d,n.prependListener=d,n.prependOnceListener=d,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},"./node_modules/regenerator-runtime/runtime.js":(t,e,r)=>{var n=r("./node_modules/es6-promise/dist/es6-promise.js").Promise,o=function(t){"use strict";var e,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},s=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),s=new B(n||[]);return i._invoke=function(t,e,r){var n=l;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var a=j(s,r);if(a){if(a===v)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=h(t,e,r);if("normal"===u.type){if(n=r.done?y:p,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,s),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var l="suspendedStart",p="suspendedYield",d="executing",y="completed",v={};function m(){}function b(){}function w(){}var g={};c(g,s,(function(){return this}));var _=Object.getPrototypeOf,x=_&&_(_(S([])));x&&x!==r&&o.call(x,s)&&(g=x);var T=w.prototype=m.prototype=Object.create(g);function E(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){function r(n,i,s,a){var u=h(t[n],t,i);if("throw"!==u.type){var c=u.arg,f=c.value;return f&&"object"==typeof f&&o.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,s,a)}),(function(t){r("throw",t,s,a)})):e.resolve(f).then((function(t){c.value=t,s(c)}),(function(t){return r("throw",t,s,a)}))}a(u.arg)}var n;this._invoke=function(t,o){function i(){return new e((function(e,n){r(t,o,e,n)}))}return n=n?n.then(i,i):i()}}function j(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=h(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function B(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var r=t[s];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){for(;++n<t.length;)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return b.prototype=w,c(T,"constructor",w),c(w,"constructor",b),b.displayName=c(w,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,c(t,u,"GeneratorFunction")),t.prototype=Object.create(T),t},t.awrap=function(t){return{__await:t}},E(A.prototype),c(A.prototype,a,(function(){return this})),t.AsyncIterator=A,t.async=function(e,r,o,i,s){void 0===s&&(s=n);var a=new A(f(e,r,o,i),s);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(T),c(T,u,"Generator"),c(T,s,(function(){return this})),c(T,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,B.prototype={constructor:B,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return a.type="throw",a.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],a=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var u=o.call(s,"catchLoc"),c=o.call(s,"finallyLoc");if(u&&c){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(u){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=o}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};return(()=>{"use strict";var t=r("./node_modules/es6-promise/dist/es6-promise.js").Promise;function e(e,r,n,o,i,s,a){try{var u=e[s](a),c=u.value}catch(t){return void n(t)}u.done?r(c):t.resolve(c).then(o,i)}function n(r){return function(){var n=this,o=arguments;return new t((function(t,i){var s=r.apply(n,o);function a(r){e(s,t,i,a,u,"next",r)}function u(r){e(s,t,i,a,u,"throw",r)}a(void 0)}))}}var o=r("./node_modules/@babel/runtime/regenerator/index.js"),i=r.n(o),s=r("./node_modules/es6-promise/dist/es6-promise.js").Promise,a="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==a&&a,u="URLSearchParams"in a,c="Symbol"in a&&"iterator"in Symbol,f="FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch(t){return!1}}(),h="FormData"in a,l="ArrayBuffer"in a;if(l)var p=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],d=ArrayBuffer.isView||function(t){return t&&p.indexOf(Object.prototype.toString.call(t))>-1};function y(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function v(t){return"string"!=typeof t&&(t=String(t)),t}function m(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return c&&(e[Symbol.iterator]=function(){return e}),e}function b(t){this.map={},t instanceof b?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function w(t){if(t.bodyUsed)return s.reject(new TypeError("Already read"));t.bodyUsed=!0}function g(t){return new s((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function _(t){var e=new FileReader,r=g(e);return e.readAsArrayBuffer(t),r}function x(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function T(){return this.bodyUsed=!1,this._initBody=function(t){var e;this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:f&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:h&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:u&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():l&&f&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=x(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):l&&(ArrayBuffer.prototype.isPrototypeOf(t)||d(t))?this._bodyArrayBuffer=x(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):u&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},f&&(this.blob=function(){var t=w(this);if(t)return t;if(this._bodyBlob)return s.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return s.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return s.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var t=w(this);return t||(ArrayBuffer.isView(this._bodyArrayBuffer)?s.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):s.resolve(this._bodyArrayBuffer))}return this.blob().then(_)}),this.text=function(){var t,e,r,n=w(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=g(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return s.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return s.resolve(this._bodyText)},h&&(this.formData=function(){return this.text().then(j)}),this.json=function(){return this.text().then(JSON.parse)},this}b.prototype.append=function(t,e){t=y(t),e=v(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},b.prototype.delete=function(t){delete this.map[y(t)]},b.prototype.get=function(t){return t=y(t),this.has(t)?this.map[t]:null},b.prototype.has=function(t){return this.map.hasOwnProperty(y(t))},b.prototype.set=function(t,e){this.map[y(t)]=v(e)},b.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},b.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),m(t)},b.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),m(t)},b.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),m(t)},c&&(b.prototype[Symbol.iterator]=b.prototype.entries);var E=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function A(t,e){if(!(this instanceof A))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,o=(e=e||{}).body;if(t instanceof A){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new b(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new b(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),E.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==e.cache&&"no-cache"!==e.cache)){var i=/([?&])_=[^&]*/;if(i.test(this.url))this.url=this.url.replace(i,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function j(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}})),e}function O(t,e){if(!(this instanceof O))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText=void 0===e.statusText?"":""+e.statusText,this.headers=new b(e.headers),this.url=e.url||"",this._initBody(t)}A.prototype.clone=function(){return new A(this,{body:this._bodyInit})},T.call(A.prototype),T.call(O.prototype),O.prototype.clone=function(){return new O(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new b(this.headers),url:this.url})},O.error=function(){var t=new O(null,{status:0,statusText:""});return t.type="error",t};var L=[301,302,303,307,308];O.redirect=function(t,e){if(-1===L.indexOf(e))throw new RangeError("Invalid status code");return new O(null,{status:e,headers:{location:t}})};var B=a.DOMException;try{new B}catch(t){(B=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack}).prototype=Object.create(Error.prototype),B.prototype.constructor=B}function S(t,e){return new s((function(r,n){var o=new A(t,e);if(o.signal&&o.signal.aborted)return n(new B("Aborted","AbortError"));var i=new XMLHttpRequest;function s(){i.abort()}i.onload=function(){var t,e,n={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",e=new b,t.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(t){return 0===t.indexOf("\n")?t.substr(1,t.length):t})).forEach((function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}})),e)};n.url="responseURL"in i?i.responseURL:n.headers.get("X-Request-URL");var o="response"in i?i.response:i.responseText;setTimeout((function(){r(new O(o,n))}),0)},i.onerror=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.ontimeout=function(){setTimeout((function(){n(new TypeError("Network request failed"))}),0)},i.onabort=function(){setTimeout((function(){n(new B("Aborted","AbortError"))}),0)},i.open(o.method,function(t){try{return""===t&&a.location.href?a.location.href:t}catch(e){return t}}(o.url),!0),"include"===o.credentials?i.withCredentials=!0:"omit"===o.credentials&&(i.withCredentials=!1),"responseType"in i&&(f?i.responseType="blob":l&&o.headers.get("Content-Type")&&-1!==o.headers.get("Content-Type").indexOf("application/octet-stream")&&(i.responseType="arraybuffer")),!e||"object"!=typeof e.headers||e.headers instanceof b?o.headers.forEach((function(t,e){i.setRequestHeader(e,t)})):Object.getOwnPropertyNames(e.headers).forEach((function(t){i.setRequestHeader(t,v(e.headers[t]))})),o.signal&&(o.signal.addEventListener("abort",s),i.onreadystatechange=function(){4===i.readyState&&o.signal.removeEventListener("abort",s)}),i.send(void 0===o._bodyInit?null:o._bodyInit)}))}S.polyfill=!0,a.fetch||(a.fetch=S,a.Headers=b,a.Request=A,a.Response=O);var P=function(){var t=n(i().mark((function t(e,r){var n,o;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return void 0===r&&(r="text"),t.next=3,fetch(e,{credentials:"same-origin"});case 3:if(!(n=t.sent).ok){t.next=13;break}if("json"!==r){t.next=10;break}return t.next=8,n.text();case 8:return o=t.sent,t.abrupt("return",JSON.parse(o));case 10:if("binary"!==r){t.next=12;break}return t.abrupt("return",n.arrayBuffer());case 12:return t.abrupt("return",n.text());case 13:throw new Error("httpRequest error: "+e+" "+n.statusText);case 14:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),k=function(){var t=n(i().mark((function t(e){var r,o,s,a,u,c;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.data){t.next=2;break}return t.abrupt("return");case 2:if(r=e.data,!((o=document.getElementsByTagName("button"))&&o.length>0)){t.next=6;break}return t.abrupt("return");case 6:return t.next=8,P("./data/config.json","json");case 8:s=t.sent,a=s.webusb.map((function(t){return{vendorId:parseInt(t.vendorId,16),productId:parseInt(t.productId,16)}})),u=document.createElement("button"),"string"==typeof r.style?(c=JSON.parse(r.style),Object.keys(c).forEach((function(t){Object.prototype.hasOwnProperty.call(u.style,t)&&u.style.setProperty(t,c[t])}))):u.className="default",u.onclick=n(i().mark((function t(){var e,r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=navigator,!(r=e.usb)){t.next=9;break}return t.prev=2,t.next=5,r.requestDevice({filters:a});case 5:t.next=9;break;case 7:t.prev=7,t.t0=t.catch(2);case 9:case"end":return t.stop()}}),t,null,[[2,7]])}))),document.body&&document.body.append(u);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();window.addEventListener("message",k)})(),n=n.default})()}));