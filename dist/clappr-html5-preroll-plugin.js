!function(A,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("Clappr")):"function"==typeof define&&define.amd?define(["Clappr"],e):"object"==typeof exports?exports.ClapprHtml5PrerollPlugin=e(require("Clappr")):A.ClapprHtml5PrerollPlugin=e(A.Clappr)}(this,function(A){return function(A){function e(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return A[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var t={};return e.m=A,e.c=t,e.p="",e(0)}([function(A,e,t){(function(r){"use strict";function o(A){return A&&A.__esModule?A:{"default":A}}function n(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}function i(A,e){if(!A)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?A:e}function l(A,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);A.prototype=Object.create(e&&e.prototype,{constructor:{value:A,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(A,e):A.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&"function"==typeof Symbol&&A.constructor===Symbol?"symbol":typeof A},s=function y(A,e,t){null===A&&(A=Function.prototype);var r=Object.getOwnPropertyDescriptor(A,e);if(void 0===r){var o=Object.getPrototypeOf(A);return null===o?void 0:y(o,e,t)}if("value"in r)return r.value;var n=r.get;if(void 0!==n)return n.call(t)},c=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),u=t(9);t(6);var p=t(1),h=t(7),f=o(h),d=t(8),g=o(d),C=function(A){function e(A){n(this,e);var t=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,A));return console.log("plugin configuration",t.options.html5PrerollPlugin),t._forceOverlay=t.options.html5PrerollPlugin.forceOverlay===!0,t}return l(e,A),c(e,[{key:"name",get:function(){return"html5-preroll-plugin"}},{key:"attributes",get:function(){return{"class":this.name,"data-preroll":""}}}]),c(e,[{key:"bindEvents",value:function(){this.listenTo(this.core.mediaControl,u.Events.MEDIACONTROL_CONTAINERCHANGED,this._onMediaControlContainerChanged),this.listenTo(this.core,u.Events.CORE_READY,this._onCoreReady)}},{key:"_onMediaControlContainerChanged",value:function(){this.core.mediaControl.container.$el.append(this.el)}},{key:"_onCoreReady",value:function(){if(this._posterPlugin=this.core.mediaControl&&this.core.mediaControl.container&&this.core.mediaControl.container.getPlugin("poster"),!this._posterPlugin)throw new Error("Failed to get Clappr internal poster plugin");if(this._clickToPausePlugin=this.core.mediaControl&&this.core.mediaControl.container&&this.core.mediaControl.container.getPlugin("click_to_pause"),!this._clickToPausePlugin)throw new Error("Failed to get Clappr internal click-to-pause plugin");this._createAdPlayer()}},{key:"_disableControls",value:function(){this._posterPlugin&&(this._posterPlugin.container.disableMediaControl(),this._posterPlugin.disable()),this._clickToPausePlugin&&this._clickToPausePlugin.disable()}},{key:"_enableControls",value:function(){this._posterPlugin&&(this._posterPlugin.container.enableMediaControl(),this._posterPlugin.enable()),this._clickToPausePlugin&&this._clickToPausePlugin.enable()}},{key:"_createAdPlayer",value:function(){var A=this;if(this._playback=this.core.mediaControl&&this.core.mediaControl.container&&this.core.mediaControl.container.playback,!this._playback)throw new Error("Failed to get Clappr playback");if("no_op"!==this._playback.name){this._playback.el,this._adContainer;if(r.nextTick(function(){return A._disableControls()}),this._videoMock=!1,this._videoPoster=!1,"video"===this._playback.tagName){var e=this._playback.el&&this._playback.el.src;e&&0!==e.length?"html5_video"!==this._playback.name||this._playback.el.hasAttribute("poster")||(this._playback.el.poster="data:image/svg+xml,"+g["default"],this._videoPoster=!0):(this._playback.el.src=p.MOCK_MP4,this._videoMock=!0)}if(this._forceOverlay||"ontouchstart"in window){var t=function(){var e=function t(e){try{A._clickOverlay.removeEventListener("click",t,!1),e.preventDefault(),e.stopPropagation()}catch(r){}A._clickOverlay.style.display="none",A._playVideoAd()};return A._clickOverlay.addEventListener("click",e,!1),A._clickOverlay.style.display="block",{v:void 0}}();if("object"===("undefined"==typeof t?"undefined":a(t)))return t.v}this._playVideoAd()}}},{key:"_playVideoAd",value:function(){var A=this;console.log("Your content in 3 seconds..."),setTimeout(function(){A._playVideoContent()},3e3)}},{key:"_playVideoContent",value:function(){var A=this;this._videoPoster===!0&&this._playback.$el.attr("poster",null),this._videoMock===!0&&(this._playback.el.src="",this._playback.stop()),r.nextTick(function(){A._enableControls(),A.core.mediaControl.play(),console.log("that's it folks!")})}},{key:"_remove",value:function(){this._$adContainer&&this._$adContainer.remove(),this._$clickOverlay&&this._$clickOverlay.remove()}},{key:"render",value:function(){return this._remove(),this._$adContainer=(0,u.$)("<div />").addClass("preroll-container").attr("data-preroll",""),this._$clickOverlay=(0,u.$)("<div />").addClass("preroll-overlay").attr("data-preroll",""),this._$clickOverlay.append(f["default"]).find("svg path").css("fill","#fff"),this._$clickOverlay.find("svg").addClass("preroll-overlay-icon").attr("data-preroll",""),this.$el.append(this._$adContainer),this.$el.append(this._$clickOverlay),this._adContainer=this._$adContainer[0],this._clickOverlay=this._$clickOverlay[0],this}},{key:"destroy",value:function(){s(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"destroy",this).call(this)}}]),e}(u.UICorePlugin);e["default"]=C,A.exports=e["default"]}).call(e,t(4))},function(A,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.MOCK_MP4="data:video/mp4;base64, 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"},function(A,e,t){e=A.exports=t(3)(),e.push([A.id,".html5-preroll-plugin[data-preroll]{text-align:left}.html5-preroll-plugin[data-preroll],.html5-preroll-plugin[data-preroll] .preroll-container[data-preroll]{position:absolute;top:0;left:0;width:100%;height:100%}.html5-preroll-plugin[data-preroll] .preroll-overlay[data-preroll]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1337;background-color:#000;cursor:pointer;overflow:hidden;display:none}.html5-preroll-plugin[data-preroll] .preroll-overlay[data-preroll]:hover .preroll-overlay-icon[data-preroll]{opacity:1}.html5-preroll-plugin[data-preroll] .preroll-overlay[data-preroll] .preroll-overlay-icon[data-preroll]{position:relative;width:100%;height:25%;top:50%;transform:translateY(-50%);opacity:.75}",""])},function(A,e){A.exports=function(){var A=[];return A.toString=function(){for(var A=[],e=0;e<this.length;e++){var t=this[e];t[2]?A.push("@media "+t[2]+"{"+t[1]+"}"):A.push(t[1])}return A.join("")},A.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var n=this[o][0];"number"==typeof n&&(r[n]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&r[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),A.push(i))}},A}},function(A,e){function t(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(A){if(c===setTimeout)return setTimeout(A,0);if((c===t||!c)&&setTimeout)return c=setTimeout,setTimeout(A,0);try{return c(A,0)}catch(e){try{return c.call(null,A,0)}catch(e){return c.call(this,A,0)}}}function n(A){if(u===clearTimeout)return clearTimeout(A);if((u===r||!u)&&clearTimeout)return u=clearTimeout,clearTimeout(A);try{return u(A)}catch(e){try{return u.call(null,A)}catch(e){return u.call(this,A)}}}function i(){d&&h&&(d=!1,h.length?f=h.concat(f):g=-1,f.length&&l())}function l(){if(!d){var A=o(i);d=!0;for(var e=f.length;e;){for(h=f,f=[];++g<e;)h&&h[g].run();g=-1,e=f.length}h=null,d=!1,n(A)}}function a(A,e){this.fun=A,this.array=e}function s(){}var c,u,p=A.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:t}catch(A){c=t}try{u="function"==typeof clearTimeout?clearTimeout:r}catch(A){u=r}}();var h,f=[],d=!1,g=-1;p.nextTick=function(A){var e=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)e[t-1]=arguments[t];f.push(new a(A,e)),1!==f.length||d||o(l)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=s,p.addListener=s,p.once=s,p.off=s,p.removeListener=s,p.removeAllListeners=s,p.emit=s,p.binding=function(A){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(A){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(A,e,t){function r(A,e){for(var t=0;t<A.length;t++){var r=A[t],o=h[r.id];if(o){o.refs++;for(var n=0;n<o.parts.length;n++)o.parts[n](r.parts[n]);for(;n<r.parts.length;n++)o.parts.push(s(r.parts[n],e))}else{for(var i=[],n=0;n<r.parts.length;n++)i.push(s(r.parts[n],e));h[r.id]={id:r.id,refs:1,parts:i}}}}function o(A){for(var e=[],t={},r=0;r<A.length;r++){var o=A[r],n=o[0],i=o[1],l=o[2],a=o[3],s={css:i,media:l,sourceMap:a};t[n]?t[n].parts.push(s):e.push(t[n]={id:n,parts:[s]})}return e}function n(A,e){var t=g(),r=v[v.length-1];if("top"===A.insertAt)r?r.nextSibling?t.insertBefore(e,r.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),v.push(e);else{if("bottom"!==A.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e)}}function i(A){A.parentNode.removeChild(A);var e=v.indexOf(A);e>=0&&v.splice(e,1)}function l(A){var e=document.createElement("style");return e.type="text/css",n(A,e),e}function a(A){var e=document.createElement("link");return e.rel="stylesheet",n(A,e),e}function s(A,e){var t,r,o;if(e.singleton){var n=y++;t=C||(C=l(e)),r=c.bind(null,t,n,!1),o=c.bind(null,t,n,!0)}else A.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=a(e),r=p.bind(null,t),o=function(){i(t),t.href&&URL.revokeObjectURL(t.href)}):(t=l(e),r=u.bind(null,t),o=function(){i(t)});return r(A),function(e){if(e){if(e.css===A.css&&e.media===A.media&&e.sourceMap===A.sourceMap)return;r(A=e)}else o()}}function c(A,e,t,r){var o=t?"":r.css;if(A.styleSheet)A.styleSheet.cssText=m(e,o);else{var n=document.createTextNode(o),i=A.childNodes;i[e]&&A.removeChild(i[e]),i.length?A.insertBefore(n,i[e]):A.appendChild(n)}}function u(A,e){var t=e.css,r=e.media;if(r&&A.setAttribute("media",r),A.styleSheet)A.styleSheet.cssText=t;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(t))}}function p(A,e){var t=e.css,r=e.sourceMap;r&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([t],{type:"text/css"}),n=A.href;A.href=URL.createObjectURL(o),n&&URL.revokeObjectURL(n)}var h={},f=function(A){var e;return function(){return"undefined"==typeof e&&(e=A.apply(this,arguments)),e}},d=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=f(function(){return document.head||document.getElementsByTagName("head")[0]}),C=null,y=0,v=[];A.exports=function(A,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var t=o(A);return r(t,e),function(A){for(var n=[],i=0;i<t.length;i++){var l=t[i],a=h[l.id];a.refs--,n.push(a)}if(A){var s=o(A);r(s,e)}for(var i=0;i<n.length;i++){var a=n[i];if(0===a.refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete h[a.id]}}}};var m=function(){var A=[];return function(e,t){return A[e]=t,A.filter(Boolean).join("\n")}}()},function(A,e,t){var r=t(2);"string"==typeof r&&(r=[[A.id,r,""]]);t(5)(r,{});r.locals&&(A.exports=r.locals)},function(A,e){A.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#010101" d="M1.425.35L14.575 8l-13.15 7.65V.35z"></path></svg>'},function(A,e){A.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect x="0" y="0" width="1" height="1" fill="#000000"></rect></svg>'},function(e,t){e.exports=A}])});