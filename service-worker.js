!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}({12:function(e){e.exports=JSON.parse('{"a":"0.0.48"}')},22:function(e,t,n){"use strict";n.r(t);var o=n(12);const r=location.pathname.lastIndexOf("/"),c=r>=0?location.pathname.substr(0,r):c,s=location.origin+c,a="cache-"+o.a,l=["/","/index.html","/styles.css","/bundle.js","/cube-bevelled.glb","/manifest.json","/icon.png"];self.addEventListener("install",async()=>{const e="[service worker install]";console.log(e,"CURRENT_CACHE_NAME:",a);const t=await caches.open(a);if(console.log(e,"currentCache:",t),t)for(const n of l){const o=s+n;console.log(e,"currentCache.add:",o),await t.add(o)}}),self.addEventListener("activate",async()=>{const e="[service worker activate]";console.log(e);const t=await caches.keys();console.log(e,"old caches:",JSON.stringify(t));for(const n of t)n!==a&&(console.log(e,"deleting old cache:",n),await caches.delete(n))}),self.addEventListener("fetch",async e=>{e.respondWith(caches.match(e.request).then(t=>(console.log("[service worker fetch]","event.request.url:",e.request.url,"response:",t),t||fetch(e.request))))})}});
//# sourceMappingURL=service-worker.js.map