(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();var ai=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function D1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var $f;(function(t){(function(e){var r=typeof globalThis=="object"?globalThis:typeof ai=="object"?ai:typeof self=="object"?self:typeof this=="object"?this:d(),i=s(t);typeof r.Reflect<"u"&&(i=s(r.Reflect,i)),e(i,r),typeof r.Reflect>"u"&&(r.Reflect=t);function s(p,h){return function(g,b){Object.defineProperty(p,g,{configurable:!0,writable:!0,value:b}),h&&h(g,b)}}function o(){try{return Function("return this;")()}catch{}}function l(){try{return(0,eval)("(function() { return this; })()")}catch{}}function d(){return o()||l()}})(function(e,r){var i=Object.prototype.hasOwnProperty,s=typeof Symbol=="function",o=s&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",l=s&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",d=typeof Object.create=="function",p={__proto__:[]}instanceof Array,h=!d&&!p,g={create:d?function(){return qn(Object.create(null))}:p?function(){return qn({__proto__:null})}:function(){return qn({})},has:h?function(T,$){return i.call(T,$)}:function(T,$){return $ in T},get:h?function(T,$){return i.call(T,$)?T[$]:void 0}:function(T,$){return T[$]}},b=Object.getPrototypeOf(Function),y=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:jn(),x=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:bn(),A=typeof WeakMap=="function"?WeakMap:fs(),k=s?Symbol.for("@reflect-metadata:registry"):void 0,I=Pi(),U=zl(I);function H(T,$,N,G){if(ce(N)){if(!Bn(T))throw new TypeError;if(!ds($))throw new TypeError;return st(T,$)}else{if(!Bn(T))throw new TypeError;if(!Me($))throw new TypeError;if(!Me(G)&&!ce(G)&&!mn(G))throw new TypeError;return mn(G)&&(G=void 0),N=cr(N),kt(T,$,N,G)}}e("decorate",H);function z(T,$){function N(G,ne){if(!Me(G))throw new TypeError;if(!ce(ne)&&!Kt(ne))throw new TypeError;Re(T,$,G,ne)}return N}e("metadata",z);function V(T,$,N,G){if(!Me(N))throw new TypeError;return ce(G)||(G=cr(G)),Re(T,$,N,G)}e("defineMetadata",V);function j(T,$,N){if(!Me($))throw new TypeError;return ce(N)||(N=cr(N)),Ge(T,$,N)}e("hasMetadata",j);function ie(T,$,N){if(!Me($))throw new TypeError;return ce(N)||(N=cr(N)),rt(T,$,N)}e("hasOwnMetadata",ie);function te(T,$,N){if(!Me($))throw new TypeError;return ce(N)||(N=cr(N)),ut(T,$,N)}e("getMetadata",te);function Ae(T,$,N){if(!Me($))throw new TypeError;return ce(N)||(N=cr(N)),Je(T,$,N)}e("getOwnMetadata",Ae);function He(T,$){if(!Me(T))throw new TypeError;return ce($)||($=cr($)),lr(T,$)}e("getMetadataKeys",He);function Rt(T,$){if(!Me(T))throw new TypeError;return ce($)||($=cr($)),Wt(T,$)}e("getOwnMetadataKeys",Rt);function dt(T,$,N){if(!Me($))throw new TypeError;if(ce(N)||(N=cr(N)),!Me($))throw new TypeError;ce(N)||(N=cr(N));var G=Vn($,N,!1);return ce(G)?!1:G.OrdinaryDeleteMetadata(T,$,N)}e("deleteMetadata",dt);function st(T,$){for(var N=T.length-1;N>=0;--N){var G=T[N],ne=G($);if(!ce(ne)&&!mn(ne)){if(!ds(ne))throw new TypeError;$=ne}}return $}function kt(T,$,N,G){for(var ne=T.length-1;ne>=0;--ne){var nt=T[ne],Ze=nt($,N,G);if(!ce(Ze)&&!mn(Ze)){if(!Me(Ze))throw new TypeError;G=Ze}}return G}function Ge(T,$,N){var G=rt(T,$,N);if(G)return!0;var ne=Nt($);return mn(ne)?!1:Ge(T,ne,N)}function rt(T,$,N){var G=Vn($,N,!1);return ce(G)?!1:gn(G.OrdinaryHasOwnMetadata(T,$,N))}function ut(T,$,N){var G=rt(T,$,N);if(G)return Je(T,$,N);var ne=Nt($);if(!mn(ne))return ut(T,ne,N)}function Je(T,$,N){var G=Vn($,N,!1);if(!ce(G))return G.OrdinaryGetOwnMetadata(T,$,N)}function Re(T,$,N,G){var ne=Vn(N,G,!0);ne.OrdinaryDefineOwnMetadata(T,$,N,G)}function lr(T,$){var N=Wt(T,$),G=Nt(T);if(G===null)return N;var ne=lr(G,$);if(ne.length<=0)return N;if(N.length<=0)return ne;for(var nt=new x,Ze=[],be=0,W=N;be<W.length;be++){var Y=W[be],Z=nt.has(Y);Z||(nt.add(Y),Ze.push(Y))}for(var Q=0,_e=ne;Q<_e.length;Q++){var Y=_e[Q],Z=nt.has(Y);Z||(nt.add(Y),Ze.push(Y))}return Ze}function Wt(T,$){var N=Vn(T,$,!1);return N?N.OrdinaryOwnMetadataKeys(T,$):[]}function Et(T){if(T===null)return 1;switch(typeof T){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return T===null?1:6;default:return 6}}function ce(T){return T===void 0}function mn(T){return T===null}function Fl(T){return typeof T=="symbol"}function Me(T){return typeof T=="object"?T!==null:typeof T=="function"}function xi(T,$){switch(Et(T)){case 0:return T;case 1:return T;case 2:return T;case 3:return T;case 4:return T;case 5:return T}var N="string",G=Aa(T,o);if(G!==void 0){var ne=G.call(T,N);if(Me(ne))throw new TypeError;return ne}return Ul(T)}function Ul(T,$){var N,G;{var ne=T.toString;if(Yr(ne)){var G=ne.call(T);if(!Me(G))return G}var N=T.valueOf;if(Yr(N)){var G=N.call(T);if(!Me(G))return G}}throw new TypeError}function gn(T){return!!T}function zn(T){return""+T}function cr(T){var $=xi(T);return Fl($)?$:zn($)}function Bn(T){return Array.isArray?Array.isArray(T):T instanceof Object?T instanceof Array:Object.prototype.toString.call(T)==="[object Array]"}function Yr(T){return typeof T=="function"}function ds(T){return typeof T=="function"}function Kt(T){switch(Et(T)){case 3:return!0;case 4:return!0;default:return!1}}function Jr(T,$){return T===$||T!==T&&$!==$}function Aa(T,$){var N=T[$];if(N!=null){if(!Yr(N))throw new TypeError;return N}}function ur(T){var $=Aa(T,l);if(!Yr($))throw new TypeError;var N=$.call(T);if(!Me(N))throw new TypeError;return N}function ps(T){return T.value}function Ea(T){var $=T.next();return $.done?!1:$}function vn(T){var $=T.return;$&&$.call(T)}function Nt(T){var $=Object.getPrototypeOf(T);if(typeof T!="function"||T===b||$!==b)return $;var N=T.prototype,G=N&&Object.getPrototypeOf(N);if(G==null||G===Object.prototype)return $;var ne=G.constructor;return typeof ne!="function"||ne===T?$:ne}function Hn(){var T;!ce(k)&&typeof r.Reflect<"u"&&!(k in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(T=Gn(r.Reflect));var $,N,G,ne=new A,nt={registerProvider:Ze,getProvider:W,setProvider:Z};return nt;function Ze(Q){if(!Object.isExtensible(nt))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case T===Q:break;case ce($):$=Q;break;case $===Q:break;case ce(N):N=Q;break;case N===Q:break;default:G===void 0&&(G=new x),G.add(Q);break}}function be(Q,_e){if(!ce($)){if($.isProviderFor(Q,_e))return $;if(!ce(N)){if(N.isProviderFor(Q,_e))return $;if(!ce(G))for(var ke=ur(G);;){var Qe=Ea(ke);if(!Qe)return;var Yt=ps(Qe);if(Yt.isProviderFor(Q,_e))return vn(ke),Yt}}}if(!ce(T)&&T.isProviderFor(Q,_e))return T}function W(Q,_e){var ke=ne.get(Q),Qe;return ce(ke)||(Qe=ke.get(_e)),ce(Qe)&&(Qe=be(Q,_e),ce(Qe)||(ce(ke)&&(ke=new y,ne.set(Q,ke)),ke.set(_e,Qe))),Qe}function Y(Q){if(ce(Q))throw new TypeError;return $===Q||N===Q||!ce(G)&&G.has(Q)}function Z(Q,_e,ke){if(!Y(ke))throw new Error("Metadata provider not registered.");var Qe=W(Q,_e);if(Qe!==ke){if(!ce(Qe))return!1;var Yt=ne.get(Q);ce(Yt)&&(Yt=new y,ne.set(Q,Yt)),Yt.set(_e,ke)}return!0}}function Pi(){var T;return!ce(k)&&Me(r.Reflect)&&Object.isExtensible(r.Reflect)&&(T=r.Reflect[k]),ce(T)&&(T=Hn()),!ce(k)&&Me(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,k,{enumerable:!1,configurable:!1,writable:!1,value:T}),T}function zl(T){var $=new A,N={isProviderFor:function(Y,Z){var Q=$.get(Y);return ce(Q)?!1:Q.has(Z)},OrdinaryDefineOwnMetadata:Ze,OrdinaryHasOwnMetadata:ne,OrdinaryGetOwnMetadata:nt,OrdinaryOwnMetadataKeys:be,OrdinaryDeleteMetadata:W};return I.registerProvider(N),N;function G(Y,Z,Q){var _e=$.get(Y),ke=!1;if(ce(_e)){if(!Q)return;_e=new y,$.set(Y,_e),ke=!0}var Qe=_e.get(Z);if(ce(Qe)){if(!Q)return;if(Qe=new y,_e.set(Z,Qe),!T.setProvider(Y,Z,N))throw _e.delete(Z),ke&&$.delete(Y),new Error("Wrong provider for target.")}return Qe}function ne(Y,Z,Q){var _e=G(Z,Q,!1);return ce(_e)?!1:gn(_e.has(Y))}function nt(Y,Z,Q){var _e=G(Z,Q,!1);if(!ce(_e))return _e.get(Y)}function Ze(Y,Z,Q,_e){var ke=G(Q,_e,!0);ke.set(Y,Z)}function be(Y,Z){var Q=[],_e=G(Y,Z,!1);if(ce(_e))return Q;for(var ke=_e.keys(),Qe=ur(ke),Yt=0;;){var ms=Ea(Qe);if(!ms)return Q.length=Yt,Q;var Bl=ps(ms);try{Q[Yt]=Bl}catch(Hl){try{vn(Qe)}finally{throw Hl}}Yt++}}function W(Y,Z,Q){var _e=G(Z,Q,!1);if(ce(_e)||!_e.delete(Y))return!1;if(_e.size===0){var ke=$.get(Z);ce(ke)||(ke.delete(Q),ke.size===0&&$.delete(ke))}return!0}}function Gn(T){var $=T.defineMetadata,N=T.hasOwnMetadata,G=T.getOwnMetadata,ne=T.getOwnMetadataKeys,nt=T.deleteMetadata,Ze=new A,be={isProviderFor:function(W,Y){var Z=Ze.get(W);return!ce(Z)&&Z.has(Y)?!0:ne(W,Y).length?(ce(Z)&&(Z=new x,Ze.set(W,Z)),Z.add(Y),!0):!1},OrdinaryDefineOwnMetadata:$,OrdinaryHasOwnMetadata:N,OrdinaryGetOwnMetadata:G,OrdinaryOwnMetadataKeys:ne,OrdinaryDeleteMetadata:nt};return be}function Vn(T,$,N){var G=I.getProvider(T,$);if(!ce(G))return G;if(N){if(I.setProvider(T,$,U))return U;throw new Error("Illegal state.")}}function jn(){var T={},$=[],N=function(){function be(W,Y,Z){this._index=0,this._keys=W,this._values=Y,this._selector=Z}return be.prototype["@@iterator"]=function(){return this},be.prototype[l]=function(){return this},be.prototype.next=function(){var W=this._index;if(W>=0&&W<this._keys.length){var Y=this._selector(this._keys[W],this._values[W]);return W+1>=this._keys.length?(this._index=-1,this._keys=$,this._values=$):this._index++,{value:Y,done:!1}}return{value:void 0,done:!0}},be.prototype.throw=function(W){throw this._index>=0&&(this._index=-1,this._keys=$,this._values=$),W},be.prototype.return=function(W){return this._index>=0&&(this._index=-1,this._keys=$,this._values=$),{value:W,done:!0}},be}(),G=function(){function be(){this._keys=[],this._values=[],this._cacheKey=T,this._cacheIndex=-2}return Object.defineProperty(be.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),be.prototype.has=function(W){return this._find(W,!1)>=0},be.prototype.get=function(W){var Y=this._find(W,!1);return Y>=0?this._values[Y]:void 0},be.prototype.set=function(W,Y){var Z=this._find(W,!0);return this._values[Z]=Y,this},be.prototype.delete=function(W){var Y=this._find(W,!1);if(Y>=0){for(var Z=this._keys.length,Q=Y+1;Q<Z;Q++)this._keys[Q-1]=this._keys[Q],this._values[Q-1]=this._values[Q];return this._keys.length--,this._values.length--,Jr(W,this._cacheKey)&&(this._cacheKey=T,this._cacheIndex=-2),!0}return!1},be.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=T,this._cacheIndex=-2},be.prototype.keys=function(){return new N(this._keys,this._values,ne)},be.prototype.values=function(){return new N(this._keys,this._values,nt)},be.prototype.entries=function(){return new N(this._keys,this._values,Ze)},be.prototype["@@iterator"]=function(){return this.entries()},be.prototype[l]=function(){return this.entries()},be.prototype._find=function(W,Y){if(!Jr(this._cacheKey,W)){this._cacheIndex=-1;for(var Z=0;Z<this._keys.length;Z++)if(Jr(this._keys[Z],W)){this._cacheIndex=Z;break}}return this._cacheIndex<0&&Y&&(this._cacheIndex=this._keys.length,this._keys.push(W),this._values.push(void 0)),this._cacheIndex},be}();return G;function ne(be,W){return be}function nt(be,W){return W}function Ze(be,W){return[be,W]}}function bn(){var T=function(){function $(){this._map=new y}return Object.defineProperty($.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),$.prototype.has=function(N){return this._map.has(N)},$.prototype.add=function(N){return this._map.set(N,N),this},$.prototype.delete=function(N){return this._map.delete(N)},$.prototype.clear=function(){this._map.clear()},$.prototype.keys=function(){return this._map.keys()},$.prototype.values=function(){return this._map.keys()},$.prototype.entries=function(){return this._map.entries()},$.prototype["@@iterator"]=function(){return this.keys()},$.prototype[l]=function(){return this.keys()},$}();return T}function fs(){var T=16,$=g.create(),N=G();return function(){function W(){this._key=G()}return W.prototype.has=function(Y){var Z=ne(Y,!1);return Z!==void 0?g.has(Z,this._key):!1},W.prototype.get=function(Y){var Z=ne(Y,!1);return Z!==void 0?g.get(Z,this._key):void 0},W.prototype.set=function(Y,Z){var Q=ne(Y,!0);return Q[this._key]=Z,this},W.prototype.delete=function(Y){var Z=ne(Y,!1);return Z!==void 0?delete Z[this._key]:!1},W.prototype.clear=function(){this._key=G()},W}();function G(){var W;do W="@@WeakMap@@"+be();while(g.has($,W));return $[W]=!0,W}function ne(W,Y){if(!i.call(W,N)){if(!Y)return;Object.defineProperty(W,N,{value:g.create()})}return W[N]}function nt(W,Y){for(var Z=0;Z<Y;++Z)W[Z]=Math.random()*255|0;return W}function Ze(W){if(typeof Uint8Array=="function"){var Y=new Uint8Array(W);return typeof crypto<"u"?crypto.getRandomValues(Y):typeof msCrypto<"u"?msCrypto.getRandomValues(Y):nt(Y,W),Y}return nt(new Array(W),W)}function be(){var W=Ze(T);W[6]=W[6]&79|64,W[8]=W[8]&191|128;for(var Y="",Z=0;Z<T;++Z){var Q=W[Z];(Z===4||Z===6||Z===8)&&(Y+="-"),Q<16&&(Y+="0"),Y+=Q.toString(16).toLowerCase()}return Y}}function qn(T){return T.__=void 0,delete T.__,T}})})($f||($f={}));const I1={type:"logger",log(t){this.output("log",t)},warn(t){this.output("warn",t)},error(t){this.output("error",t)},output(t,e){console&&console[t]&&console[t].apply(console,e)}};class $o{constructor(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(e,r)}init(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=r.prefix||"i18next:",this.logger=e||I1,this.options=r,this.debug=r.debug}log(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.forward(r,"log","",!0)}warn(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.forward(r,"warn","",!0)}error(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.forward(r,"error","")}deprecate(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return this.forward(r,"warn","WARNING DEPRECATED: ",!0)}forward(e,r,i,s){return s&&!this.debug?null:(typeof e[0]=="string"&&(e[0]=`${i}${this.prefix} ${e[0]}`),this.logger[r](e))}create(e){return new $o(this.logger,{prefix:`${this.prefix}:${e}:`,...this.options})}clone(e){return e=e||this.options,e.prefix=e.prefix||this.prefix,new $o(this.logger,e)}}var Br=new $o;let Al=class{constructor(){this.observers={}}on(e,r){return e.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);const s=this.observers[i].get(r)||0;this.observers[i].set(r,s+1)}),this}off(e,r){if(this.observers[e]){if(!r){delete this.observers[e];return}this.observers[e].delete(r)}}emit(e){for(var r=arguments.length,i=new Array(r>1?r-1:0),s=1;s<r;s++)i[s-1]=arguments[s];this.observers[e]&&Array.from(this.observers[e].entries()).forEach(l=>{let[d,p]=l;for(let h=0;h<p;h++)d(...i)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(l=>{let[d,p]=l;for(let h=0;h<p;h++)d.apply(d,[e,...i])})}};function Ds(){let t,e;const r=new Promise((i,s)=>{t=i,e=s});return r.resolve=t,r.reject=e,r}function Df(t){return t==null?"":""+t}function R1(t,e,r){t.forEach(i=>{e[i]&&(r[i]=e[i])})}const k1=/###/g;function Vs(t,e,r){function i(d){return d&&d.indexOf("###")>-1?d.replace(k1,"."):d}function s(){return!t||typeof t=="string"}const o=typeof e!="string"?e:e.split(".");let l=0;for(;l<o.length-1;){if(s())return{};const d=i(o[l]);!t[d]&&r&&(t[d]=new r),Object.prototype.hasOwnProperty.call(t,d)?t=t[d]:t={},++l}return s()?{}:{obj:t,k:i(o[l])}}function If(t,e,r){const{obj:i,k:s}=Vs(t,e,Object);if(i!==void 0||e.length===1){i[s]=r;return}let o=e[e.length-1],l=e.slice(0,e.length-1),d=Vs(t,l,Object);for(;d.obj===void 0&&l.length;)o=`${l[l.length-1]}.${o}`,l=l.slice(0,l.length-1),d=Vs(t,l,Object),d&&d.obj&&typeof d.obj[`${d.k}.${o}`]<"u"&&(d.obj=void 0);d.obj[`${d.k}.${o}`]=r}function N1(t,e,r,i){const{obj:s,k:o}=Vs(t,e,Object);s[o]=s[o]||[],s[o].push(r)}function Do(t,e){const{obj:r,k:i}=Vs(t,e);if(r)return r[i]}function L1(t,e,r){const i=Do(t,r);return i!==void 0?i:Do(e,r)}function Dm(t,e,r){for(const i in e)i!=="__proto__"&&i!=="constructor"&&(i in t?typeof t[i]=="string"||t[i]instanceof String||typeof e[i]=="string"||e[i]instanceof String?r&&(t[i]=e[i]):Dm(t[i],e[i],r):t[i]=e[i]);return t}function Ui(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}var M1={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function F1(t){return typeof t=="string"?t.replace(/[&<>"'\/]/g,e=>M1[e]):t}class U1{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){const r=this.regExpMap.get(e);if(r!==void 0)return r;const i=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,i),this.regExpQueue.push(e),i}}const z1=[" ",",","?","!",";"],B1=new U1(20);function H1(t,e,r){e=e||"",r=r||"";const i=z1.filter(l=>e.indexOf(l)<0&&r.indexOf(l)<0);if(i.length===0)return!0;const s=B1.getRegExp(`(${i.map(l=>l==="?"?"\\?":l).join("|")})`);let o=!s.test(t);if(!o){const l=t.indexOf(r);l>0&&!s.test(t.substring(0,l))&&(o=!0)}return o}function vu(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!t)return;if(t[e])return t[e];const i=e.split(r);let s=t;for(let o=0;o<i.length;){if(!s||typeof s!="object")return;let l,d="";for(let p=o;p<i.length;++p)if(p!==o&&(d+=r),d+=i[p],l=s[d],l!==void 0){if(["string","number","boolean"].indexOf(typeof l)>-1&&p<i.length-1)continue;o+=p-o+1;break}s=l}return s}function Io(t){return t&&t.indexOf("_")>0?t.replace("_","-"):t}class Rf extends Al{constructor(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=e||{},this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)}removeNamespaces(e){const r=this.options.ns.indexOf(e);r>-1&&this.options.ns.splice(r,1)}getResource(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const o=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,l=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let d;e.indexOf(".")>-1?d=e.split("."):(d=[e,r],i&&(Array.isArray(i)?d.push(...i):typeof i=="string"&&o?d.push(...i.split(o)):d.push(i)));const p=Do(this.data,d);return!p&&!r&&!i&&e.indexOf(".")>-1&&(e=d[0],r=d[1],i=d.slice(2).join(".")),p||!l||typeof i!="string"?p:vu(this.data&&this.data[e]&&this.data[e][r],i,o)}addResource(e,r,i,s){let o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const l=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator;let d=[e,r];i&&(d=d.concat(l?i.split(l):i)),e.indexOf(".")>-1&&(d=e.split("."),s=r,r=d[1]),this.addNamespaces(r),If(this.data,d,s),o.silent||this.emit("added",e,r,i,s)}addResources(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const o in i)(typeof i[o]=="string"||Object.prototype.toString.apply(i[o])==="[object Array]")&&this.addResource(e,r,o,i[o],{silent:!0});s.silent||this.emit("added",e,r,i)}addResourceBundle(e,r,i,s,o){let l=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},d=[e,r];e.indexOf(".")>-1&&(d=e.split("."),s=i,i=r,r=d[1]),this.addNamespaces(r);let p=Do(this.data,d)||{};l.skipCopy||(i=JSON.parse(JSON.stringify(i))),s?Dm(p,i,o):p={...p,...i},If(this.data,d,p),l.silent||this.emit("added",e,r,i)}removeResourceBundle(e,r){this.hasResourceBundle(e,r)&&delete this.data[e][r],this.removeNamespaces(r),this.emit("removed",e,r)}hasResourceBundle(e,r){return this.getResource(e,r)!==void 0}getResourceBundle(e,r){return r||(r=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(e,r)}:this.getResource(e,r)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){const r=this.getDataByLanguage(e);return!!(r&&Object.keys(r)||[]).find(s=>r[s]&&Object.keys(r[s]).length>0)}toJSON(){return this.data}}var Im={processors:{},addPostProcessor(t){this.processors[t.name]=t},handle(t,e,r,i,s){return t.forEach(o=>{this.processors[o]&&(e=this.processors[o].process(e,r,i,s))}),e}};const kf={};class Ro extends Al{constructor(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),R1(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,this),this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Br.create("translator")}changeLanguage(e){e&&(this.language=e)}exists(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(e==null)return!1;const i=this.resolve(e,r);return i&&i.res!==void 0}extractFromKey(e,r){let i=r.nsSeparator!==void 0?r.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");const s=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator;let o=r.ns||this.options.defaultNS||[];const l=i&&e.indexOf(i)>-1,d=!this.options.userDefinedKeySeparator&&!r.keySeparator&&!this.options.userDefinedNsSeparator&&!r.nsSeparator&&!H1(e,i,s);if(l&&!d){const p=e.match(this.interpolator.nestingRegexp);if(p&&p.length>0)return{key:e,namespaces:o};const h=e.split(i);(i!==s||i===s&&this.options.ns.indexOf(h[0])>-1)&&(o=h.shift()),e=h.join(s)}return typeof o=="string"&&(o=[o]),{key:e,namespaces:o}}translate(e,r,i){if(typeof r!="object"&&this.options.overloadTranslationOptionHandler&&(r=this.options.overloadTranslationOptionHandler(arguments)),typeof r=="object"&&(r={...r}),r||(r={}),e==null)return"";Array.isArray(e)||(e=[String(e)]);const s=r.returnDetails!==void 0?r.returnDetails:this.options.returnDetails,o=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator,{key:l,namespaces:d}=this.extractFromKey(e[e.length-1],r),p=d[d.length-1],h=r.lng||this.language,g=r.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(h&&h.toLowerCase()==="cimode"){if(g){const V=r.nsSeparator||this.options.nsSeparator;return s?{res:`${p}${V}${l}`,usedKey:l,exactUsedKey:l,usedLng:h,usedNS:p,usedParams:this.getUsedParamsDetails(r)}:`${p}${V}${l}`}return s?{res:l,usedKey:l,exactUsedKey:l,usedLng:h,usedNS:p,usedParams:this.getUsedParamsDetails(r)}:l}const b=this.resolve(e,r);let y=b&&b.res;const x=b&&b.usedKey||l,A=b&&b.exactUsedKey||l,k=Object.prototype.toString.apply(y),I=["[object Number]","[object Function]","[object RegExp]"],U=r.joinArrays!==void 0?r.joinArrays:this.options.joinArrays,H=!this.i18nFormat||this.i18nFormat.handleAsObject;if(H&&y&&(typeof y!="string"&&typeof y!="boolean"&&typeof y!="number")&&I.indexOf(k)<0&&!(typeof U=="string"&&k==="[object Array]")){if(!r.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const V=this.options.returnedObjectHandler?this.options.returnedObjectHandler(x,y,{...r,ns:d}):`key '${l} (${this.language})' returned an object instead of string.`;return s?(b.res=V,b.usedParams=this.getUsedParamsDetails(r),b):V}if(o){const V=k==="[object Array]",j=V?[]:{},ie=V?A:x;for(const te in y)if(Object.prototype.hasOwnProperty.call(y,te)){const Ae=`${ie}${o}${te}`;j[te]=this.translate(Ae,{...r,joinArrays:!1,ns:d}),j[te]===Ae&&(j[te]=y[te])}y=j}}else if(H&&typeof U=="string"&&k==="[object Array]")y=y.join(U),y&&(y=this.extendTranslation(y,e,r,i));else{let V=!1,j=!1;const ie=r.count!==void 0&&typeof r.count!="string",te=Ro.hasDefaultValue(r),Ae=ie?this.pluralResolver.getSuffix(h,r.count,r):"",He=r.ordinal&&ie?this.pluralResolver.getSuffix(h,r.count,{ordinal:!1}):"",Rt=ie&&!r.ordinal&&r.count===0&&this.pluralResolver.shouldUseIntlApi(),dt=Rt&&r[`defaultValue${this.options.pluralSeparator}zero`]||r[`defaultValue${Ae}`]||r[`defaultValue${He}`]||r.defaultValue;!this.isValidLookup(y)&&te&&(V=!0,y=dt),this.isValidLookup(y)||(j=!0,y=l);const kt=(r.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&j?void 0:y,Ge=te&&dt!==y&&this.options.updateMissing;if(j||V||Ge){if(this.logger.log(Ge?"updateKey":"missingKey",h,p,l,Ge?dt:y),o){const Re=this.resolve(l,{...r,keySeparator:!1});Re&&Re.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let rt=[];const ut=this.languageUtils.getFallbackCodes(this.options.fallbackLng,r.lng||this.language);if(this.options.saveMissingTo==="fallback"&&ut&&ut[0])for(let Re=0;Re<ut.length;Re++)rt.push(ut[Re]);else this.options.saveMissingTo==="all"?rt=this.languageUtils.toResolveHierarchy(r.lng||this.language):rt.push(r.lng||this.language);const Je=(Re,lr,Wt)=>{const Et=te&&Wt!==y?Wt:kt;this.options.missingKeyHandler?this.options.missingKeyHandler(Re,p,lr,Et,Ge,r):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(Re,p,lr,Et,Ge,r),this.emit("missingKey",Re,p,lr,y)};this.options.saveMissing&&(this.options.saveMissingPlurals&&ie?rt.forEach(Re=>{const lr=this.pluralResolver.getSuffixes(Re,r);Rt&&r[`defaultValue${this.options.pluralSeparator}zero`]&&lr.indexOf(`${this.options.pluralSeparator}zero`)<0&&lr.push(`${this.options.pluralSeparator}zero`),lr.forEach(Wt=>{Je([Re],l+Wt,r[`defaultValue${Wt}`]||dt)})}):Je(rt,l,dt))}y=this.extendTranslation(y,e,r,b,i),j&&y===l&&this.options.appendNamespaceToMissingKey&&(y=`${p}:${l}`),(j||V)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?y=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${p}:${l}`:l,V?y:void 0):y=this.options.parseMissingKeyHandler(y))}return s?(b.res=y,b.usedParams=this.getUsedParamsDetails(r),b):y}extendTranslation(e,r,i,s,o){var l=this;if(this.i18nFormat&&this.i18nFormat.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});const h=typeof e=="string"&&(i&&i.interpolation&&i.interpolation.skipOnVariables!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let g;if(h){const y=e.match(this.interpolator.nestingRegexp);g=y&&y.length}let b=i.replace&&typeof i.replace!="string"?i.replace:i;if(this.options.interpolation.defaultVariables&&(b={...this.options.interpolation.defaultVariables,...b}),e=this.interpolator.interpolate(e,b,i.lng||this.language,i),h){const y=e.match(this.interpolator.nestingRegexp),x=y&&y.length;g<x&&(i.nest=!1)}!i.lng&&this.options.compatibilityAPI!=="v1"&&s&&s.res&&(i.lng=s.usedLng),i.nest!==!1&&(e=this.interpolator.nest(e,function(){for(var y=arguments.length,x=new Array(y),A=0;A<y;A++)x[A]=arguments[A];return o&&o[0]===x[0]&&!i.context?(l.logger.warn(`It seems you are nesting recursively key: ${x[0]} in key: ${r[0]}`),null):l.translate(...x,r)},i)),i.interpolation&&this.interpolator.reset()}const d=i.postProcess||this.options.postProcess,p=typeof d=="string"?[d]:d;return e!=null&&p&&p.length&&i.applyPostProcessor!==!1&&(e=Im.handle(p,e,r,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),e}resolve(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i,s,o,l,d;return typeof e=="string"&&(e=[e]),e.forEach(p=>{if(this.isValidLookup(i))return;const h=this.extractFromKey(p,r),g=h.key;s=g;let b=h.namespaces;this.options.fallbackNS&&(b=b.concat(this.options.fallbackNS));const y=r.count!==void 0&&typeof r.count!="string",x=y&&!r.ordinal&&r.count===0&&this.pluralResolver.shouldUseIntlApi(),A=r.context!==void 0&&(typeof r.context=="string"||typeof r.context=="number")&&r.context!=="",k=r.lngs?r.lngs:this.languageUtils.toResolveHierarchy(r.lng||this.language,r.fallbackLng);b.forEach(I=>{this.isValidLookup(i)||(d=I,!kf[`${k[0]}-${I}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(d)&&(kf[`${k[0]}-${I}`]=!0,this.logger.warn(`key "${s}" for languages "${k.join(", ")}" won't get resolved as namespace "${d}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),k.forEach(U=>{if(this.isValidLookup(i))return;l=U;const H=[g];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(H,g,U,I,r);else{let V;y&&(V=this.pluralResolver.getSuffix(U,r.count,r));const j=`${this.options.pluralSeparator}zero`,ie=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(y&&(H.push(g+V),r.ordinal&&V.indexOf(ie)===0&&H.push(g+V.replace(ie,this.options.pluralSeparator)),x&&H.push(g+j)),A){const te=`${g}${this.options.contextSeparator}${r.context}`;H.push(te),y&&(H.push(te+V),r.ordinal&&V.indexOf(ie)===0&&H.push(te+V.replace(ie,this.options.pluralSeparator)),x&&H.push(te+j))}}let z;for(;z=H.pop();)this.isValidLookup(i)||(o=z,i=this.getResource(U,I,z,r))}))})}),{res:i,usedKey:s,exactUsedKey:o,usedLng:l,usedNS:d}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e==="")}getResource(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(e,r,i,s):this.resourceStore.getResource(e,r,i,s)}getUsedParamsDetails(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const r=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=e.replace&&typeof e.replace!="string";let s=i?e.replace:e;if(i&&typeof e.count<"u"&&(s.count=e.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!i){s={...s};for(const o of r)delete s[o]}return s}static hasDefaultValue(e){const r="defaultValue";for(const i in e)if(Object.prototype.hasOwnProperty.call(e,i)&&r===i.substring(0,r.length)&&e[i]!==void 0)return!0;return!1}}function tu(t){return t.charAt(0).toUpperCase()+t.slice(1)}class Nf{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Br.create("languageUtils")}getScriptPartFromCode(e){if(e=Io(e),!e||e.indexOf("-")<0)return null;const r=e.split("-");return r.length===2||(r.pop(),r[r.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(r.join("-"))}getLanguagePartFromCode(e){if(e=Io(e),!e||e.indexOf("-")<0)return e;const r=e.split("-");return this.formatLanguageCode(r[0])}formatLanguageCode(e){if(typeof e=="string"&&e.indexOf("-")>-1){const r=["hans","hant","latn","cyrl","cans","mong","arab"];let i=e.split("-");return this.options.lowerCaseLng?i=i.map(s=>s.toLowerCase()):i.length===2?(i[0]=i[0].toLowerCase(),i[1]=i[1].toUpperCase(),r.indexOf(i[1].toLowerCase())>-1&&(i[1]=tu(i[1].toLowerCase()))):i.length===3&&(i[0]=i[0].toLowerCase(),i[1].length===2&&(i[1]=i[1].toUpperCase()),i[0]!=="sgn"&&i[2].length===2&&(i[2]=i[2].toUpperCase()),r.indexOf(i[1].toLowerCase())>-1&&(i[1]=tu(i[1].toLowerCase())),r.indexOf(i[2].toLowerCase())>-1&&(i[2]=tu(i[2].toLowerCase()))),i.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(e)>-1}getBestMatchFromCodes(e){if(!e)return null;let r;return e.forEach(i=>{if(r)return;const s=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(s))&&(r=s)}),!r&&this.options.supportedLngs&&e.forEach(i=>{if(r)return;const s=this.getLanguagePartFromCode(i);if(this.isSupportedCode(s))return r=s;r=this.options.supportedLngs.find(o=>{if(o===s)return o;if(!(o.indexOf("-")<0&&s.indexOf("-")<0)&&(o.indexOf("-")>0&&s.indexOf("-")<0&&o.substring(0,o.indexOf("-"))===s||o.indexOf(s)===0&&s.length>1))return o})}),r||(r=this.getFallbackCodes(this.options.fallbackLng)[0]),r}getFallbackCodes(e,r){if(!e)return[];if(typeof e=="function"&&(e=e(r)),typeof e=="string"&&(e=[e]),Object.prototype.toString.apply(e)==="[object Array]")return e;if(!r)return e.default||[];let i=e[r];return i||(i=e[this.getScriptPartFromCode(r)]),i||(i=e[this.formatLanguageCode(r)]),i||(i=e[this.getLanguagePartFromCode(r)]),i||(i=e.default),i||[]}toResolveHierarchy(e,r){const i=this.getFallbackCodes(r||this.options.fallbackLng||[],e),s=[],o=l=>{l&&(this.isSupportedCode(l)?s.push(l):this.logger.warn(`rejecting language code not found in supportedLngs: ${l}`))};return typeof e=="string"&&(e.indexOf("-")>-1||e.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&o(this.formatLanguageCode(e)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&o(this.getScriptPartFromCode(e)),this.options.load!=="currentOnly"&&o(this.getLanguagePartFromCode(e))):typeof e=="string"&&o(this.formatLanguageCode(e)),i.forEach(l=>{s.indexOf(l)<0&&o(this.formatLanguageCode(l))}),s}}let G1=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],V1={1:function(t){return+(t>1)},2:function(t){return+(t!=1)},3:function(t){return 0},4:function(t){return t%10==1&&t%100!=11?0:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?1:2},5:function(t){return t==0?0:t==1?1:t==2?2:t%100>=3&&t%100<=10?3:t%100>=11?4:5},6:function(t){return t==1?0:t>=2&&t<=4?1:2},7:function(t){return t==1?0:t%10>=2&&t%10<=4&&(t%100<10||t%100>=20)?1:2},8:function(t){return t==1?0:t==2?1:t!=8&&t!=11?2:3},9:function(t){return+(t>=2)},10:function(t){return t==1?0:t==2?1:t<7?2:t<11?3:4},11:function(t){return t==1||t==11?0:t==2||t==12?1:t>2&&t<20?2:3},12:function(t){return+(t%10!=1||t%100==11)},13:function(t){return+(t!==0)},14:function(t){return t==1?0:t==2?1:t==3?2:3},15:function(t){return t%10==1&&t%100!=11?0:t%10>=2&&(t%100<10||t%100>=20)?1:2},16:function(t){return t%10==1&&t%100!=11?0:t!==0?1:2},17:function(t){return t==1||t%10==1&&t%100!=11?0:1},18:function(t){return t==0?0:t==1?1:2},19:function(t){return t==1?0:t==0||t%100>1&&t%100<11?1:t%100>10&&t%100<20?2:3},20:function(t){return t==1?0:t==0||t%100>0&&t%100<20?1:2},21:function(t){return t%100==1?1:t%100==2?2:t%100==3||t%100==4?3:0},22:function(t){return t==1?0:t==2?1:(t<0||t>10)&&t%10==0?2:3}};const j1=["v1","v2","v3"],q1=["v4"],Lf={zero:0,one:1,two:2,few:3,many:4,other:5};function W1(){const t={};return G1.forEach(e=>{e.lngs.forEach(r=>{t[r]={numbers:e.nr,plurals:V1[e.fc]}})}),t}class K1{constructor(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=e,this.options=r,this.logger=Br.create("pluralResolver"),(!this.options.compatibilityJSON||q1.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=W1()}addRule(e,r){this.rules[e]=r}getRule(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi())try{return new Intl.PluralRules(Io(e==="dev"?"en":e),{type:r.ordinal?"ordinal":"cardinal"})}catch{return}return this.rules[e]||this.rules[this.languageUtils.getLanguagePartFromCode(e)]}needsPlural(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=this.getRule(e,r);return this.shouldUseIntlApi()?i&&i.resolvedOptions().pluralCategories.length>1:i&&i.numbers.length>1}getPluralFormsOfKey(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(e,i).map(s=>`${r}${s}`)}getSuffixes(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const i=this.getRule(e,r);return i?this.shouldUseIntlApi()?i.resolvedOptions().pluralCategories.sort((s,o)=>Lf[s]-Lf[o]).map(s=>`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s}`):i.numbers.map(s=>this.getSuffix(e,s,r)):[]}getSuffix(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=this.getRule(e,i);return s?this.shouldUseIntlApi()?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${s.select(r)}`:this.getSuffixRetroCompatible(s,r):(this.logger.warn(`no plural rule found for: ${e}`),"")}getSuffixRetroCompatible(e,r){const i=e.noAbs?e.plurals(r):e.plurals(Math.abs(r));let s=e.numbers[i];this.options.simplifyPluralSuffix&&e.numbers.length===2&&e.numbers[0]===1&&(s===2?s="plural":s===1&&(s=""));const o=()=>this.options.prepend&&s.toString()?this.options.prepend+s.toString():s.toString();return this.options.compatibilityJSON==="v1"?s===1?"":typeof s=="number"?`_plural_${s.toString()}`:o():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&e.numbers.length===2&&e.numbers[0]===1?o():this.options.prepend&&i.toString()?this.options.prepend+i.toString():i.toString()}shouldUseIntlApi(){return!j1.includes(this.options.compatibilityJSON)}}function Mf(t,e,r){let i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,o=L1(t,e,r);return!o&&s&&typeof r=="string"&&(o=vu(t,r,i),o===void 0&&(o=vu(e,r,i))),o}class Y1{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Br.create("interpolator"),this.options=e,this.format=e.interpolation&&e.interpolation.format||(r=>r),this.init(e)}init(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};e.interpolation||(e.interpolation={escapeValue:!0});const r=e.interpolation;this.escape=r.escape!==void 0?r.escape:F1,this.escapeValue=r.escapeValue!==void 0?r.escapeValue:!0,this.useRawValueToEscape=r.useRawValueToEscape!==void 0?r.useRawValueToEscape:!1,this.prefix=r.prefix?Ui(r.prefix):r.prefixEscaped||"{{",this.suffix=r.suffix?Ui(r.suffix):r.suffixEscaped||"}}",this.formatSeparator=r.formatSeparator?r.formatSeparator:r.formatSeparator||",",this.unescapePrefix=r.unescapeSuffix?"":r.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":r.unescapeSuffix||"",this.nestingPrefix=r.nestingPrefix?Ui(r.nestingPrefix):r.nestingPrefixEscaped||Ui("$t("),this.nestingSuffix=r.nestingSuffix?Ui(r.nestingSuffix):r.nestingSuffixEscaped||Ui(")"),this.nestingOptionsSeparator=r.nestingOptionsSeparator?r.nestingOptionsSeparator:r.nestingOptionsSeparator||",",this.maxReplaces=r.maxReplaces?r.maxReplaces:1e3,this.alwaysFormat=r.alwaysFormat!==void 0?r.alwaysFormat:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const e=(r,i)=>r&&r.source===i?(r.lastIndex=0,r):new RegExp(i,"g");this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(e,r,i,s){let o,l,d;const p=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{};function h(A){return A.replace(/\$/g,"$$$$")}const g=A=>{if(A.indexOf(this.formatSeparator)<0){const H=Mf(r,p,A,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(H,void 0,i,{...s,...r,interpolationkey:A}):H}const k=A.split(this.formatSeparator),I=k.shift().trim(),U=k.join(this.formatSeparator).trim();return this.format(Mf(r,p,I,this.options.keySeparator,this.options.ignoreJSONStructure),U,i,{...s,...r,interpolationkey:I})};this.resetRegExp();const b=s&&s.missingInterpolationHandler||this.options.missingInterpolationHandler,y=s&&s.interpolation&&s.interpolation.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:A=>h(A)},{regex:this.regexp,safeValue:A=>this.escapeValue?h(this.escape(A)):h(A)}].forEach(A=>{for(d=0;o=A.regex.exec(e);){const k=o[1].trim();if(l=g(k),l===void 0)if(typeof b=="function"){const U=b(e,o,s);l=typeof U=="string"?U:""}else if(s&&Object.prototype.hasOwnProperty.call(s,k))l="";else if(y){l=o[0];continue}else this.logger.warn(`missed to pass in variable ${k} for interpolating ${e}`),l="";else typeof l!="string"&&!this.useRawValueToEscape&&(l=Df(l));const I=A.safeValue(l);if(e=e.replace(o[0],I),y?(A.regex.lastIndex+=l.length,A.regex.lastIndex-=o[0].length):A.regex.lastIndex=0,d++,d>=this.maxReplaces)break}}),e}nest(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s,o,l;function d(p,h){const g=this.nestingOptionsSeparator;if(p.indexOf(g)<0)return p;const b=p.split(new RegExp(`${g}[ ]*{`));let y=`{${b[1]}`;p=b[0],y=this.interpolate(y,l);const x=y.match(/'/g),A=y.match(/"/g);(x&&x.length%2===0&&!A||A.length%2!==0)&&(y=y.replace(/'/g,'"'));try{l=JSON.parse(y),h&&(l={...h,...l})}catch(k){return this.logger.warn(`failed parsing options string in nesting for key ${p}`,k),`${p}${g}${y}`}return l.defaultValue&&l.defaultValue.indexOf(this.prefix)>-1&&delete l.defaultValue,p}for(;s=this.nestingRegexp.exec(e);){let p=[];l={...i},l=l.replace&&typeof l.replace!="string"?l.replace:l,l.applyPostProcessor=!1,delete l.defaultValue;let h=!1;if(s[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(s[1])){const g=s[1].split(this.formatSeparator).map(b=>b.trim());s[1]=g.shift(),p=g,h=!0}if(o=r(d.call(this,s[1].trim(),l),l),o&&s[0]===e&&typeof o!="string")return o;typeof o!="string"&&(o=Df(o)),o||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${e}`),o=""),h&&(o=p.reduce((g,b)=>this.format(g,b,i.lng,{...i,interpolationkey:s[1].trim()}),o.trim())),e=e.replace(s[0],o),this.regexp.lastIndex=0}return e}}function J1(t){let e=t.toLowerCase().trim();const r={};if(t.indexOf("(")>-1){const i=t.split("(");e=i[0].toLowerCase().trim();const s=i[1].substring(0,i[1].length-1);e==="currency"&&s.indexOf(":")<0?r.currency||(r.currency=s.trim()):e==="relativetime"&&s.indexOf(":")<0?r.range||(r.range=s.trim()):s.split(";").forEach(l=>{if(!l)return;const[d,...p]=l.split(":"),h=p.join(":").trim().replace(/^'+|'+$/g,"");r[d.trim()]||(r[d.trim()]=h),h==="false"&&(r[d.trim()]=!1),h==="true"&&(r[d.trim()]=!0),isNaN(h)||(r[d.trim()]=parseInt(h,10))})}return{formatName:e,formatOptions:r}}function zi(t){const e={};return function(i,s,o){const l=s+JSON.stringify(o);let d=e[l];return d||(d=t(Io(s),o),e[l]=d),d(i)}}let Z1=class{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Br.create("formatter"),this.options=e,this.formats={number:zi((r,i)=>{const s=new Intl.NumberFormat(r,{...i});return o=>s.format(o)}),currency:zi((r,i)=>{const s=new Intl.NumberFormat(r,{...i,style:"currency"});return o=>s.format(o)}),datetime:zi((r,i)=>{const s=new Intl.DateTimeFormat(r,{...i});return o=>s.format(o)}),relativetime:zi((r,i)=>{const s=new Intl.RelativeTimeFormat(r,{...i});return o=>s.format(o,i.range||"day")}),list:zi((r,i)=>{const s=new Intl.ListFormat(r,{...i});return o=>s.format(o)})},this.init(e)}init(e){const i=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}}).interpolation;this.formatSeparator=i.formatSeparator?i.formatSeparator:i.formatSeparator||","}add(e,r){this.formats[e.toLowerCase().trim()]=r}addCached(e,r){this.formats[e.toLowerCase().trim()]=zi(r)}format(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return r.split(this.formatSeparator).reduce((d,p)=>{const{formatName:h,formatOptions:g}=J1(p);if(this.formats[h]){let b=d;try{const y=s&&s.formatParams&&s.formatParams[s.interpolationkey]||{},x=y.locale||y.lng||s.locale||s.lng||i;b=this.formats[h](d,x,{...g,...s,...y})}catch(y){this.logger.warn(y)}return b}else this.logger.warn(`there was no format function for ${h}`);return d},e)}};function Q1(t,e){t.pending[e]!==void 0&&(delete t.pending[e],t.pendingCount--)}class X1 extends Al{constructor(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=e,this.store=r,this.services=i,this.languageUtils=i.languageUtils,this.options=s,this.logger=Br.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(i,s.backend,s)}queueLoad(e,r,i,s){const o={},l={},d={},p={};return e.forEach(h=>{let g=!0;r.forEach(b=>{const y=`${h}|${b}`;!i.reload&&this.store.hasResourceBundle(h,b)?this.state[y]=2:this.state[y]<0||(this.state[y]===1?l[y]===void 0&&(l[y]=!0):(this.state[y]=1,g=!1,l[y]===void 0&&(l[y]=!0),o[y]===void 0&&(o[y]=!0),p[b]===void 0&&(p[b]=!0)))}),g||(d[h]=!0)}),(Object.keys(o).length||Object.keys(l).length)&&this.queue.push({pending:l,pendingCount:Object.keys(l).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(o),pending:Object.keys(l),toLoadLanguages:Object.keys(d),toLoadNamespaces:Object.keys(p)}}loaded(e,r,i){const s=e.split("|"),o=s[0],l=s[1];r&&this.emit("failedLoading",o,l,r),i&&this.store.addResourceBundle(o,l,i,void 0,void 0,{skipCopy:!0}),this.state[e]=r?-1:2;const d={};this.queue.forEach(p=>{N1(p.loaded,[o],l),Q1(p,e),r&&p.errors.push(r),p.pendingCount===0&&!p.done&&(Object.keys(p.loaded).forEach(h=>{d[h]||(d[h]={});const g=p.loaded[h];g.length&&g.forEach(b=>{d[h][b]===void 0&&(d[h][b]=!0)})}),p.done=!0,p.errors.length?p.callback(p.errors):p.callback())}),this.emit("loaded",d),this.queue=this.queue.filter(p=>!p.done)}read(e,r,i){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,l=arguments.length>5?arguments[5]:void 0;if(!e.length)return l(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:r,fcName:i,tried:s,wait:o,callback:l});return}this.readingCalls++;const d=(h,g)=>{if(this.readingCalls--,this.waitingReads.length>0){const b=this.waitingReads.shift();this.read(b.lng,b.ns,b.fcName,b.tried,b.wait,b.callback)}if(h&&g&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,e,r,i,s+1,o*2,l)},o);return}l(h,g)},p=this.backend[i].bind(this.backend);if(p.length===2){try{const h=p(e,r);h&&typeof h.then=="function"?h.then(g=>d(null,g)).catch(d):d(null,h)}catch(h){d(h)}return}return p(e,r,d)}prepareLoading(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();typeof e=="string"&&(e=this.languageUtils.toResolveHierarchy(e)),typeof r=="string"&&(r=[r]);const o=this.queueLoad(e,r,i,s);if(!o.toLoad.length)return o.pending.length||s(),null;o.toLoad.forEach(l=>{this.loadOne(l)})}load(e,r,i){this.prepareLoading(e,r,{},i)}reload(e,r,i){this.prepareLoading(e,r,{reload:!0},i)}loadOne(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const i=e.split("|"),s=i[0],o=i[1];this.read(s,o,"read",void 0,void 0,(l,d)=>{l&&this.logger.warn(`${r}loading namespace ${o} for language ${s} failed`,l),!l&&d&&this.logger.log(`${r}loaded namespace ${o} for language ${s}`,d),this.loaded(e,l,d)})}saveMissing(e,r,i,s,o){let l=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},d=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(r)){this.logger.warn(`did not save key "${i}" as the namespace "${r}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if(this.backend&&this.backend.create){const p={...l,isUpdate:o},h=this.backend.create.bind(this.backend);if(h.length<6)try{let g;h.length===5?g=h(e,r,i,s,p):g=h(e,r,i,s),g&&typeof g.then=="function"?g.then(b=>d(null,b)).catch(d):d(null,g)}catch(g){d(g)}else h(e,r,i,s,d,p)}!e||!e[0]||this.store.addResource(e[0],r,i,s)}}}function Ff(){return{debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:function(e){let r={};if(typeof e[1]=="object"&&(r=e[1]),typeof e[1]=="string"&&(r.defaultValue=e[1]),typeof e[2]=="string"&&(r.tDescription=e[2]),typeof e[2]=="object"||typeof e[3]=="object"){const i=e[3]||e[2];Object.keys(i).forEach(s=>{r[s]=i[s]})}return r},interpolation:{escapeValue:!0,format:t=>t,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}}function Uf(t){return typeof t.ns=="string"&&(t.ns=[t.ns]),typeof t.fallbackLng=="string"&&(t.fallbackLng=[t.fallbackLng]),typeof t.fallbackNS=="string"&&(t.fallbackNS=[t.fallbackNS]),t.supportedLngs&&t.supportedLngs.indexOf("cimode")<0&&(t.supportedLngs=t.supportedLngs.concat(["cimode"])),t}function vo(){}function ex(t){Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach(r=>{typeof t[r]=="function"&&(t[r]=t[r].bind(t))})}class Js extends Al{constructor(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;if(super(),this.options=Uf(e),this.services={},this.logger=Br,this.modules={external:[]},ex(this),r&&!this.isInitialized&&!e.isClone){if(!this.options.initImmediate)return this.init(e,r),this;setTimeout(()=>{this.init(e,r)},0)}}init(){var e=this;let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof r=="function"&&(i=r,r={}),!r.defaultNS&&r.defaultNS!==!1&&r.ns&&(typeof r.ns=="string"?r.defaultNS=r.ns:r.ns.indexOf("translation")<0&&(r.defaultNS=r.ns[0]));const s=Ff();this.options={...s,...this.options,...Uf(r)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...s.interpolation,...this.options.interpolation}),r.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=r.keySeparator),r.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=r.nsSeparator);function o(g){return g?typeof g=="function"?new g:g:null}if(!this.options.isClone){this.modules.logger?Br.init(o(this.modules.logger),this.options):Br.init(null,this.options);let g;this.modules.formatter?g=this.modules.formatter:typeof Intl<"u"&&(g=Z1);const b=new Nf(this.options);this.store=new Rf(this.options.resources,this.options);const y=this.services;y.logger=Br,y.resourceStore=this.store,y.languageUtils=b,y.pluralResolver=new K1(b,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),g&&(!this.options.interpolation.format||this.options.interpolation.format===s.interpolation.format)&&(y.formatter=o(g),y.formatter.init(y,this.options),this.options.interpolation.format=y.formatter.format.bind(y.formatter)),y.interpolator=new Y1(this.options),y.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},y.backendConnector=new X1(o(this.modules.backend),y.resourceStore,y,this.options),y.backendConnector.on("*",function(x){for(var A=arguments.length,k=new Array(A>1?A-1:0),I=1;I<A;I++)k[I-1]=arguments[I];e.emit(x,...k)}),this.modules.languageDetector&&(y.languageDetector=o(this.modules.languageDetector),y.languageDetector.init&&y.languageDetector.init(y,this.options.detection,this.options)),this.modules.i18nFormat&&(y.i18nFormat=o(this.modules.i18nFormat),y.i18nFormat.init&&y.i18nFormat.init(this)),this.translator=new Ro(this.services,this.options),this.translator.on("*",function(x){for(var A=arguments.length,k=new Array(A>1?A-1:0),I=1;I<A;I++)k[I-1]=arguments[I];e.emit(x,...k)}),this.modules.external.forEach(x=>{x.init&&x.init(this)})}if(this.format=this.options.interpolation.format,i||(i=vo),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const g=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);g.length>0&&g[0]!=="dev"&&(this.options.lng=g[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(g=>{this[g]=function(){return e.store[g](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(g=>{this[g]=function(){return e.store[g](...arguments),e}});const p=Ds(),h=()=>{const g=(b,y)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),p.resolve(y),i(b,y)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return g(null,this.t.bind(this));this.changeLanguage(this.options.lng,g)};return this.options.resources||!this.options.initImmediate?h():setTimeout(h,0),p}loadResources(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:vo;const s=typeof e=="string"?e:this.language;if(typeof e=="function"&&(i=e),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();const o=[],l=d=>{if(!d||d==="cimode")return;this.services.languageUtils.toResolveHierarchy(d).forEach(h=>{h!=="cimode"&&o.indexOf(h)<0&&o.push(h)})};s?l(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(p=>l(p)),this.options.preload&&this.options.preload.forEach(d=>l(d)),this.services.backendConnector.load(o,this.options.ns,d=>{!d&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(d)})}else i(null)}reloadResources(e,r,i){const s=Ds();return e||(e=this.languages),r||(r=this.options.ns),i||(i=vo),this.services.backendConnector.reload(e,r,o=>{s.resolve(),i(o)}),s}use(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return e.type==="backend"&&(this.modules.backend=e),(e.type==="logger"||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type==="languageDetector"&&(this.modules.languageDetector=e),e.type==="i18nFormat"&&(this.modules.i18nFormat=e),e.type==="postProcessor"&&Im.addPostProcessor(e),e.type==="formatter"&&(this.modules.formatter=e),e.type==="3rdParty"&&this.modules.external.push(e),this}setResolvedLanguage(e){if(!(!e||!this.languages)&&!(["cimode","dev"].indexOf(e)>-1))for(let r=0;r<this.languages.length;r++){const i=this.languages[r];if(!(["cimode","dev"].indexOf(i)>-1)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}}changeLanguage(e,r){var i=this;this.isLanguageChangingTo=e;const s=Ds();this.emit("languageChanging",e);const o=p=>{this.language=p,this.languages=this.services.languageUtils.toResolveHierarchy(p),this.resolvedLanguage=void 0,this.setResolvedLanguage(p)},l=(p,h)=>{h?(o(h),this.translator.changeLanguage(h),this.isLanguageChangingTo=void 0,this.emit("languageChanged",h),this.logger.log("languageChanged",h)):this.isLanguageChangingTo=void 0,s.resolve(function(){return i.t(...arguments)}),r&&r(p,function(){return i.t(...arguments)})},d=p=>{!e&&!p&&this.services.languageDetector&&(p=[]);const h=typeof p=="string"?p:this.services.languageUtils.getBestMatchFromCodes(p);h&&(this.language||o(h),this.translator.language||this.translator.changeLanguage(h),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(h)),this.loadResources(h,g=>{l(g,h)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?d(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(d):this.services.languageDetector.detect(d):d(e),s}getFixedT(e,r,i){var s=this;const o=function(l,d){let p;if(typeof d!="object"){for(var h=arguments.length,g=new Array(h>2?h-2:0),b=2;b<h;b++)g[b-2]=arguments[b];p=s.options.overloadTranslationOptionHandler([l,d].concat(g))}else p={...d};p.lng=p.lng||o.lng,p.lngs=p.lngs||o.lngs,p.ns=p.ns||o.ns,p.keyPrefix=p.keyPrefix||i||o.keyPrefix;const y=s.options.keySeparator||".";let x;return p.keyPrefix&&Array.isArray(l)?x=l.map(A=>`${p.keyPrefix}${y}${A}`):x=p.keyPrefix?`${p.keyPrefix}${y}${l}`:l,s.t(x,p)};return typeof e=="string"?o.lng=e:o.lngs=e,o.ns=r,o.keyPrefix=i,o}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const i=r.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,o=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;const l=(d,p)=>{const h=this.services.backendConnector.state[`${d}|${p}`];return h===-1||h===2};if(r.precheck){const d=r.precheck(this,l);if(d!==void 0)return d}return!!(this.hasResourceBundle(i,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||l(i,e)&&(!s||l(o,e)))}loadNamespaces(e,r){const i=Ds();return this.options.ns?(typeof e=="string"&&(e=[e]),e.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{i.resolve(),r&&r(s)}),i):(r&&r(),Promise.resolve())}loadLanguages(e,r){const i=Ds();typeof e=="string"&&(e=[e]);const s=this.options.preload||[],o=e.filter(l=>s.indexOf(l)<0&&this.services.languageUtils.isSupportedCode(l));return o.length?(this.options.preload=s.concat(o),this.loadResources(l=>{i.resolve(),r&&r(l)}),i):(r&&r(),Promise.resolve())}dir(e){if(e||(e=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!e)return"rtl";const r=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=this.services&&this.services.languageUtils||new Nf(Ff());return r.indexOf(i.getLanguagePartFromCode(e))>-1||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;return new Js(e,r)}cloneInstance(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:vo;const i=e.forkResourceStore;i&&delete e.forkResourceStore;const s={...this.options,...e,isClone:!0},o=new Js(s);return(e.debug!==void 0||e.prefix!==void 0)&&(o.logger=o.logger.clone(e)),["store","services","language"].forEach(d=>{o[d]=this[d]}),o.services={...this.services},o.services.utils={hasLoadedNamespace:o.hasLoadedNamespace.bind(o)},i&&(o.store=new Rf(this.store.data,s),o.services.resourceStore=o.store),o.translator=new Ro(o.services,s),o.translator.on("*",function(d){for(var p=arguments.length,h=new Array(p>1?p-1:0),g=1;g<p;g++)h[g-1]=arguments[g];o.emit(d,...h)}),o.init(s,r),o.translator.options=s,o.translator.backendConnector.services.utils={hasLoadedNamespace:o.hasLoadedNamespace.bind(o)},o}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const ct=Js.createInstance();ct.createInstance=Js.createInstance;ct.createInstance;ct.dir;ct.init;ct.loadResources;ct.reloadResources;ct.use;ct.changeLanguage;ct.getFixedT;const ir=ct.t;ct.exists;ct.setDefaultNamespace;ct.hasLoadedNamespace;ct.loadNamespaces;ct.loadLanguages;const tx={alerts:{saveImport:{name:"Import savefile",message:"Are you sure want to import savefile? Your current progress will be lost."},saveDelete:{name:"Delete save data",message:"Are you sure want to delete save data? Your current progress will be lost."},clearMessages:{name:"Clear log messages",message:"Are you sure want to clear log messages?"},fastForward:{name:"Spend accumulated time",message:"Are you sure want to spend accumulated time?"},purchaseProgramOverwrite:{name:"Purchase an already owned program",message:'Are you sure want to purchase program "$t(programs:{{value.programName}}:name)"? This will replace your current program with level {{value.level}} and quality {{value.quality}}.'},processDelete:{name:"Delete a process",message:`Are you sure want to delete process for program "$t(programs:{{value.programName}}:name)"? It's progress will be lost.`},processReplace:{name:"Replace a process",message:'Are you sure want to overwrite process for program "$t(programs:{{value.programName}}:name)"? This will replace your current process with {{value.threads}} threads.'},scalableProcessReplace:{name:"Replace a scalable process",message:'Are you sure want to replace scalable process? This will delete your current process for program "$t(programs:{{value.programName}}:name)".'},deleteAllProcesses:{name:"Delete all process",message:"Are you sure want to delete all processes? Their progress will be lost."}},common:{sections:{general:"General",parameters:"Parameters",skills:"Skills",attributes:"Attributes",stats:"Stats",requirements:"Requirements",bonusModifiers:"Bonus modifiers"},general:{name:"Name",level:"Level",exp:"Experience",hp:"HP",hpRatio:"HP ratio",loyalty:"Loyalty",attributePoints:"Attribute points",skillPoints:"Skill points",quality:"Quality",template:"Template",money:"Money",credibility:"Credibility"},attributes:{strength:"Strength",endurance:"Endurance",agility:"Agility",perception:"Perception",intellect:"Intellect",charisma:"Charisma"},skills:{closeCombat:"Close combat",rangedCombat:"Ranged combat",stealth:"Stealth",infoGathering:"Info gathering",persuasion:"Persuasion",hacking:"Hacking",engineering:"Engineering",chemistry:"Chemistry"},stats:{damage:"Damage",defense:"Defense",maxHp:"Max HP"},quality:{abysmal:"Abysmal",bad:"Bad",mediocre:"Mediocre",average:"Average",cool:"Cool",good:"Good",excellent:"Excellent"}},events:{gameStarted:{name:"Game started",message:"Game has been started"},gameSaved:{name:"Game saved",message:"Game has been saved"},fastForwarded:{name:"Accumulated time spent",message:"Accumulated time has been spent"},levelReached:{name:"Development level reached",message:"Development level {{value.level}} has been reached"},featureUnlocked:{name:"New feature unlocked",message:'New feature "$t(features:{{value.feature}})" has been unlocked'},storyEvent:{name:"Story event",message:"$t(story:{{value.messageKey}})"},performanceUpgraded:{name:"Mainframe performance upgraded",message:"Mainframe performance has been upgraded to {{value.level}}"},coresUpgraded:{name:"Mainframe cores upgraded",message:"Mainframe cores has been upgraded to {{value.level}}"},ramUpgraded:{name:"Mainframe ram upgraded",message:"Mainframe RAM has been upgraded to {{value.level}}"},programPurchased:{name:"Program purchased",message:'Program "$t(programs:{{value.programName}}:name)" with level {{value.level}} and quality {{value.quality}} has been purchased'},processStarted:{name:"Process started",message:'Process for program "$t(programs:{{value.programName}}:name)" with {{value.threads}} threads has been started'},processFinished:{name:"Process finished",message:'Process for program "$t(programs:{{value.programName}}:name)" with {{value.threads}} threads has been finished'},processDeleted:{name:"Process deleted",message:'Process for program "$t(programs:{{value.programName}}:name)" with {{value.threads}} threads has been deleted'},allProcessesDeleted:{name:"All processes deleted",message:"All process have been deleted"}},features:{automation:"Automation",automationMainframeHardware:"Mainframe hardware automation",automationMainframePrograms:"Mainframe programs automation",mainframeHardware:"Mainframe hardware",mainframePrograms:"Mainframe programs",cityOverview:"City overview",companyManagement:"Company management"},notifications:{storyEvent:{name:"Story event",message:"$t(story:{{value.messageKey}})"},featureUnlocked:{name:"New feature unlocked",message:'New feature "$t(features:{{value.feature}})" has been unlocked'}},programs:{shareServer:{name:"Mainframe share server",overview:"Program to share your mainframe capabilities to city network. Passively generates income and development points.",programDescription:"Can generate up to {{value.money}} money and {{value.developmentPoints}} CDP per second",processDescription:"Generates {{value.money}} money and {{value.developmentPoints}} CDP per second"},codeGenerator:{name:"Code generator",overview:"Program to develop other programs. Generates computational base points and improves mainframe products discount.",programDescription:"Generates {{value.value}} CBP per completion ({{value.minAvgValue}} - {{value.maxAvgValue}} CBP per second on average)",processDescription:"Generates {{value.value}} CBP per completion ({{value.avgValue}} CBP per second on average)"},predictiveComputator:{name:"Predictive computator",overview:"Program to speed up completion of currently running processes.",programDescription:"Can speed up currently running processes by up to {{value.value}}",processDescription:"Speeds up currently running processes by {{value.value}}"},mainframeHardwareAutobuyer:{name:"Mainframe hardware autobuyer",overview:"Program to automatically buy mainframe hardware.",programDescription:"Buys new mainframe hardware {{value.value}} times per completion ({{value.minAvgValue}} - {{value.maxAvgValue}} times per second on average)",processDescription:"Buys new mainframe hardware {{value.value}} times per completion ({{value.avgValue}} times per second on average)"},mainframeProgramsAutobuyer:{name:"Mainframe programs autobuyer",overview:"Program to automatically buy mainframe programs.",programDescription:"Buys new mainframe programs {{value.value}} times per completion ({{value.minAvgValue}} - {{value.maxAvgValue}} times per second on average)",processDescription:"Buys new mainframe programs {{value.value}} times per completion ({{value.avgValue}} times per second on average)"}},scenarios:{tutorial:{name:"First steps",description:"In this scenario you will learn basics of the game."}},sideJobs:{activities:{fullTemplate:{title:"Side job template",description:"Only for development"},oddjob:{title:"Odd job",description:"Low end side job with minimum wage. Available for everyone"},writeSimpleScripts:{title:"Write simple scripts",description:"Write simple scripts and programs"}},groups:{basic:"Basic"}},story:{tutorial_level_1:"You have been tasked with creating new company. However, the only resource you have is some low tier mainframe. Perhaps, you can share it to get some money?",tutorial_level_2:"The more you share, the harder it becomes to raise your development level. You need to upgrade what you already have.",tutorial_level_15:"Now that you raised your development high enough, it's time to operate in the city. You'll need to hire mercenaries for that. However, you cannot get too much attention, so you need to focus on non-combat activities. Perhaps, diplomacy will be good?"},ui:{common:{cancel:"Cancel",save:"Save",delete:"Delete",close:"Close",loading:"Loading...",continue:"Continue",notEnoughMoney:"Not enough money",available:"Available",willBeAvailableIn:"Will be available in {{value}}",higherDevelopmentLevelRequired:"Higher development level required"},pages:{cityOverview:"City overview",companyManagement:"Company management",mainframe:"Mainframe",statistics:"Statistics",settings:"Settings",automation:"Automation",credits:"Credits"},topBar:{menu:"Toggle menu",messageLog:"Toggle message log",gameSpeedButtons:{pause:"Pause",playNormal:"Play on normal speed (without accumulated time)",playFast:"Play on fast speed (with accumulated time)",fastForward:"Spend all accumulated time"},accumulatedTime:"Accumulated time",money:"Money",developmentLevel:"Development level",developmentLevelNext:"Development level, next level will be reached in {{value}}",availableGoals:{titleGoalsExist:"Available development level goals:",titleNoGoals:"No available development level goals",reachLevel:"Reach development level {{value}}"}},messageLog:{messageLog:"Message log",clearMessages:"Clear messages"},fastForwardingScreen:{fastForwarding:"Spending accumulated time...",stop:"Stop"},settings:{settings:"Settings",language:"Language",theme:"Theme",messageLogSize:"Maximum amount of messages in log",messageLogSizeHint:"Excessive messages in log won't be removed until new message is received",updateInterval:"Update interval (ms)",autosaveEnabled:"Enable autosave",autosaveInterval:"Autosave interval (s)",maxTicksPerUpdate:"Maximum amount of updates per tick when game speed is fast",maxTicksPerUpdateHint:"Too high number can cause strain on CPU",maxTicksPerFastForward:"Maximum amount of updates per tick when accumulated time is being spent",maxTicksPerFastForwardHint:"Too high number can cause strain on CPU",longNumberFormat:"Long number format",languages:{en:"English",ru:"Russian"},themes:{light:"Light",dark:"Dark"},longNumberFormats:{scientific:"Scientific",builtIn:"Built-in"},saveGame:"Save game",importSavefile:"Import savefile",exportSavefile:"Export savefile",deleteSaveData:"Delete save data",messageFilter:"Message filter",messageFilterHint:"Enable events in filter to receive messages about them in the log.",alertFilter:"Alert filter",alertFilterHint:"Enable alerts in filter to make them visible when event happens.",alertToggle:"Show alerts like this in the future",notificationTypeFilter:"Notification type filter",notificationTypeFilterHint:"Enable notification types in filter to make them visible when event happens.",notificationTypeToggle:"Show notifications like this in the future"},city:{cityOverview:{title:"City overview",hint:"Click on a highlighted district to see it's info and available actions.",toggleZoomPanel:"Toggle zoom panel",zoom:"Zoom",name:"Name"}},mainframe:{mainframe:"Mainframe",program:"Program",level:"Level",quality:"Quality",threads:"Threads",cores:"Cores",programDescription:{cost:"Costs {{value.cost}} money to purchase",requirements:"Requires {{value.ram}} RAM and up to {{value.cores}} cores to run {{value.threads}} threads",requirementsScalable:"Autoscalable and uses all unused RAM and cores",completionTime:"Can be completed in {{value.minTime}} - {{value.maxTime}}",completionTimeScalable:"It will run every tick"},tabs:{processes:"Processes",hardware:"Hardware",programs:"Programs"},hardware:{hardwareHint:"Press either Ctrl or Shift to buy 10 levels. Press both Ctrl and Shift to buy 100 levels. Hardware upgrade priority can be changed by dragging it by the title. Upgrades on top have higher priority.",performance:"Performance level: {{value}}",performanceHint:"Higher performance level leads to faster running processes",cores:"Cores level: {{value}}",coresHint:"Additional cores allow better scalability and running more processes at same time",ram:"RAM level: {{value}}",ramHint:"Additional RAM allows to keep more processes in memory so they could ran later or in bigger batches",buy:"Buy x{{value.increase}} for {{value.cost}}"},programs:{programsHint:"Program upgrade priority can be changed by dragging it by the title. Programs on top have higher priority.",purchaseProgram:"Purchase program",purchaseProgramDialogHint:"Select program type, level and quality to purchase it. Level cannot be above current development level. Quality is limited depending on gained favors. If you already have program with same name, old one will be replaced with new one.",purchase:"Purchase for {{value.cost}}",emptyListNotification:"You don't have any owned programs",toggleAutoupgrade:"Toggle autoupgrade",toggleAutoupgradeAll:"Toggle autoupgrade for all programs"},processes:{processesHint:"To make a program run, a process has to be start for it. Topmost processes for non-scalable programs have more priority when cores are assigned to processes. Process for scalable program has cores and RAM assigned last. Only one process for scalable program can run at same time. Process minimal completion time is limited. Processes can be rearranged by dragging them by their title.",startProcess:"Start process",startProcessDialogHint:"Select one of owned programs to start process for it. If you already have process for same program, old process will be replaced with new one. Threads allow to run multiple instances of same program at same time, but additional threads require additional memory.",emptyListNotification:"You don't have any processes",programSelectItem:"$t(programs:{{value.programName}}:name), level {{value.level}}, quality {{value.quality}}",progressBarLabel:"{{value.currentCompletionPoints}} / {{value.maxCompletionPoints}}",progressBarHintActive:"Process will be completed in {{value}}",progressBarHintPaused:"Process isn't active",processToggle:"Enable / disable process",allProcessesToggle:"Enable / disable all processes",processDelete:"Delete process",allProcessesDelete:"Delete all process",autoscalable:"Autoscalable",usesCores:"{{value.cores}} / {{value.maxCores}}",availableCores:"Available cores: {{value}}",availableRam:"Available RAM: {{value}}",processDescription:{completionTime:"Can be completed in {{value}}",completionTimeScalable:"It will run every tick",completionTimeNoCores:"Requires assigned cores to be completed"}}},statistics:{statistics:"Statistics",total:"Total",tabs:{general:"General",growth:"Growth",income:"Income",expenses:"Expenses",unlockedFeatures:"Unlocked features"},hints:{mainframeDiscount:"Mainframe discount multiplicatively depends on computational base points generated by programs and company members",computationalBase:"Computational base affects discount for mainframe hardware upgrades and programs"},general:{time:{title:"In-game passed time",timeThisRun:"Since arrival to the city",timeTotal:"Total time"},multipliers:{title:"Multipliers and discounts",programCompletionSpeed:"Predictive computator multiplier",mainframeDiscount:"Mainframe products discount (%)"}},growth:{programCompletionSpeed:{title:"Process completion speed",pointsPerSecond:"PCP per second"},money:{title:"Money income per second",program:"By sharing server"},developmentPoints:{title:"Development points per second",program:"By sharing server"},pointsByPrograms:{title:"Points per second generated by programs",computationalBase:"Computational base"}},income:{money:{title:"Money income",program:"By sharing server"},developmentPoints:{title:"Development points",program:"By sharing server"},pointsByPrograms:{title:"Points generated by programs",computationalBase:"Computational base"}},expenses:{money:{title:"Money expenses",mainframeHardware:"On mainframe hardware",mainframePrograms:"On mainframe programs"}},unlockedFeatures:{title:"Unlocked features"}},automation:{automation:"Automation",tabs:{autobuyers:"Autobuyers"},mainframeHardwareAutobuyer:{mainframeHardwareAutobuyer:"Mainframe hardware autobuyer",percentageHint:"Percentage of available money reserved for upgrading mainframe hardware"},mainframeProgramsAutobuyer:{mainframeProgramsAutobuyer:"Mainframe programs autobuyer",percentageHint:"Percentage of available money reserved for buying programs"}},credits:{OmniLRenegadE:"Idea, coding, design, balance"}}},rx={alerts:{saveImport:{name:"Импорт сохранения",message:"Вы действительно хотите импортировать сохранение? Ваш текущий прогресс будет утерян."},saveDelete:{name:"Удаление сохранения",message:"Вы действительно хотите удалить сохранение? Ваш текущий прогресс будет утерян."},clearMessages:{name:"Удаление сообшений",message:"Вы действительно хотите удалить сообщения?"},fastForward:{name:"Трата накопленного времени",message:"Вы действительно хотите потратить накопленное время?"},purchaseProgramOverwrite:{name:"Покупка уже купленной програмы",message:'Вы действительно хотите приобрести программу "$t(programs:{{value.programName}}:name)"? Это заменит вашу текущую программу с уровнем {{value.level}} и качеством {{value.quality}}.'},processDelete:{name:"Удаление процесса",message:'Вы действительно хотите удалить процесс для программы "$t(programs:{{value.programName}}:name)"? Его прогресс будет утерян.'},processReplace:{name:"Замена процесса",message:'Вы действительно хотите заменить процесс для программы "$t(programs:{{value.programName}}:name)"? Это заменит текущий процесс с {{value.threads}} потоками.'},scalableProcessReplace:{name:"Замена табируемого процесса",message:'Вы действительно хотите заменить автомасштабируемый процесс? Это удалит текущий процесс для программы "$t(programs:{{value.programName}}:name)".'},deleteAllProcesses:{name:"Удаление всех процессов",message:"Вы действительно хотите удалить все процессы? Их прогресс будет утерян."}},common:{sections:{general:"Общее",parameters:"Параметры",skills:"Навыки",attributes:"Атрибуты",stats:"Статы",requirements:"Требования",bonusModifiers:"Модификаторы бонуса"},general:{name:"Имя",level:"Уровень",exp:"Опыт",hp:"Здоровье",hpRatio:"Уровень здоровья",loyalty:"Лояльность",attributePoints:"Очки аттрибутов",skillPoints:"Очки навыков",quality:"Качество",template:"Шаблон",money:"Деньги",credibility:"Авторитет"},attributes:{strength:"Сила",endurance:"Выносливость",agility:"Ловкость",perception:"Восприятие",intellect:"Интеллект",charisma:"Харизма"},skills:{closeCombat:"Ближний бой",rangedCombat:"Дальний бой",stealth:"Скрытность",infoGathering:"Сбор информации",persuasion:"Убеждение",hacking:"Хакинг",engineering:"Инженерия",chemistry:"Химия"},stats:{damage:"Урон",defense:"Защита",maxHp:"Макс. здоровье"},quality:{abysmal:"Ужасное",bad:"Плохое",mediocre:"Посредственное",average:"Среднее",cool:"Неплохое",good:"Хорошее",excellent:"Отличное"}},events:{gameStarted:{name:"Игра началась",message:"Игра началась"},gameSaved:{name:"Игра сохранена",message:"Игра сохранена"},fastForwarded:{name:"Накопленное время потрачено",message:"Накопленное время потрачено"},levelReached:{name:"Уровень развития достигнут",message:"Уровень развития {{value.level}} достигнут"},featureUnlocked:{name:"Новая возможность разблокирована",message:'Новая возможность "$t(features:{{value.feature}})" разблокирована'},storyEvent:{name:"Сюжетное событие",message:"$t(story:{{value.messageKey}})"},performanceUpgraded:{name:"Производительность мейнфрема улучшена",message:"Производительность мейнфрема улучшена до {{value.level}}"},coresUpgraded:{name:"Ядра мейнфрейма улучшены",message:"Ядра мейнфрейма улучшены до {{value.level}}"},ramUpgraded:{name:"Память мейнфрейма улучшена",message:"Память мейнфрейма улучшена до {{value.level}}"},programPurchased:{name:"Программа приобретена",message:'Программа "$t(programs:{{value.programName}}:name)" с уровнем {{value.level}} и качеством {{value.quality}} приобретена'},processStarted:{name:"Процесс начат",message:'Процесс для программы "$t(programs:{{value.programName}}:name)" с {{value.threads}} потоками начат'},processFinished:{name:"Процесс закончен",message:'Процесс для программы "$t(programs:{{value.programName}}:name)" с {{value.threads}} потоками закончен'},processDeleted:{name:"Процесс удален",message:'Процесс для программы "$t(programs:{{value.programName}}:name)" с {{value.threads}} потоками удален'},allProcessesDeleted:{name:"Все процессы удалены",message:"Все процессы удалены"}},features:{automation:"Автоматизация",automationMainframeHardware:"Автоматизация оборудования мейнфрейма",automationMainframePrograms:"Автоматизация програм для мейнфрейма",mainframeHardware:"Оборудование мейнфрейма",mainframePrograms:"Программы для мейнфрейма",cityOverview:"Обзор города",companyManagement:"Управление компанией"},notifications:{storyEvent:{name:"Сюжетное событие",message:"$t(story:{{value.messageKey}})"},featureUnlocked:{name:"Новая возможность разблокирована",message:'Новая возможность "$t(features:{{value.feature}})" разблокирована'}},programs:{shareServer:{name:"Сервер для аренды мейнфрейма",overview:"Программа для предоставления доступа к мейнфрейму городской сети. Пассивно генерирует доход и очки развития города.",programDescription:"Может генерировать до {{value.money}} денег и {{value.developmentPoints}} ОРГ в секунду.",processDescription:"Генерирует {{value.money}} денег и {{value.developmentPoints}} ОРГ в секунду."},codeGenerator:{name:"Генератор кода",overview:"Программа для разработки других программ. Генерирует очки вычислительной базы и улучшает скидку на продукты для мейнфрейма.",programDescription:"Генерирует {{value.value}} ОВБ за завершение ({{value.minAvgValue}} - {{value.maxAvgValue}} ОВБ в секунду в среднем)",processDescription:"Генерирует {{value.value}} ОВБ за завершение ({{value.avgValue}} ОВБ в секунду в среднем)"},predictiveComputator:{name:"Предсказательный вычислитель",overview:"Программа для ускорения выполнения других процессов.",programDescription:"Может ускорить выполняемые процессы до {{value.value}}",processDescription:"Ускоряет выполнениямые процессы в {{value.value}} раз"},mainframeHardwareAutobuyer:{name:"Автопокупка оборудования мейнфрейма",overview:"Программа для автоматической покупки оборудования мейнфрейма.",programDescription:"Покупает новое оборудование мейнфрейма {{value.value}} раз за выполнение ({{value.minAvgValue}} - {{value.maxAvgValue}} раз в секунду в среднем)",processDescription:"Покупает новое оборудование мейнфрейма {{value.value}} раз за выполнение ({{value.avgValue}} раз в секунду в среднем)"},mainframeProgramsAutobuyer:{name:"Автопокупка программ для мейнфрейма",overview:"Программа для автоматической покупки программ для мейнфрейма.",programDescription:"Покупает новые программы для мейнфрейма {{value.value}} раз за выполнение ({{value.minAvgValue}} - {{value.maxAvgValue}} раз в секунду в среднем)",processDescription:"Покупает новые программы для мейнфрейма {{value.value}} раз за выполнение ({{value.avgValue}} раз в секунду в среднем)"}},scenarios:{tutorial:{name:"Первые шаги",description:"В этом сценарии вы научитесь основам игры."}},sideJobs:{activities:{fullTemplate:{title:"Образец подработки",description:"Только для разработки"},oddjob:{title:"Мелкая подработка",description:"Низкооплачиваемая подработка без особых требований"},writeSimpleScripts:{title:"Написание простых скриптов",description:"Написание простых скриптов и програм"}},groups:{basic:"Обычные"}},story:{tutorial_level_1:'Тебе было назначено создание "охранной" компании. Однако, единственный ресурс, который у тебя есть, это все лишь слабый мейнфрейм. Возможно, его можно арендовать, что заработать немного денег?',tutorial_level_2:"Чем больше ты арендуешь, тем сложнее поднять твой уровень развития. Тебе нужно улучшить то, что у тебя есть.",tutorial_level_15:"Теперь, когда ты достаточно поднял уровень развития, настало время работать в городе. Для этого тебе нужно нанять наемников. Но пока ты не можешь привлекать слишком много внимания, поэтому тебе стоит сфокусироваться на небоевых занятиях. Возможно, дипломатия будет хорошим выбором?"},ui:{common:{cancel:"Отмена",save:"Сохранить",delete:"Удалить",close:"Закрыть",loading:"Загрузка...",continue:"Продолжить",notEnoughMoney:"Не достаточно денег",available:"Доступно",willBeAvailableIn:"Будет доступно через {{value}}",higherDevelopmentLevelRequired:"Требуется больший уровень развития"},pages:{cityOverview:"Обзор города",companyManagement:"Управление компанией",mainframe:"Мейнфрейм",statistics:"Статистика",settings:"Настройки",automation:"Автоматизация",credits:"Титры"},topBar:{menu:"Показать/скрыть меню",messageLog:"Показать/скрыть сообщения",gameSpeedButtons:{pause:"Пауза",playNormal:"Играть на нормальной скорости (без накопленного времени)",playFast:"Играть на быстрой скорости (с накопленным временем)",fastForward:"Потратить все накопленное время"},accumulatedTime:"Накопленное время",money:"Деньги",developmentLevel:"Уровень развития",developmentLevelNext:"Уровень развития, следующий уровень будет достигнут через {{value}}",availableGoals:{titleGoalsExist:"Доступные цели уровня развития:",titleNoGoals:"Доступных целей уроня развития нет",reachLevel:"Достичь уровень развития {{value}}"}},messageLog:{messageLog:"Сообщения",clearMessages:"Удалить сообщения"},fastForwardingScreen:{fastForwarding:"Трата накопленного времени...",stop:"Стоп"},settings:{settings:"Настройки",language:"Язык",theme:"Тема",messageLogSize:"Максимальное количество сообщений",messageLogSizeHint:"Лишние сообщения не будут удалены, пока не будет получено новое сообщение",updateInterval:"Интервал обновления (мс)",autosaveEnabled:"Включить автосохранение",autosaveInterval:"Интервал автосохранения (сек)",maxTicksPerUpdate:"Максимальное количество обновлений за тик при быстрой скорости игры",maxTicksPerUpdateHint:"Слишком большое значение может привести к нагрузке на процессор",maxTicksPerFastForward:"Максимальное количество обновлений за тик при трате накопленного времени",maxTicksPerFastForwardHint:"Слишком большое значение может привести к нагрузке на процессор",longNumberFormat:"Формат больших чисел",languages:{en:"Английский",ru:"Русский"},themes:{light:"Светлая",dark:"Темная"},longNumberFormats:{scientific:"Научный",builtIn:"Встроенный"},saveGame:"Сохранить игру",importSavefile:"Импорт сохранения",exportSavefile:"Экспорт сохранения",deleteSaveData:"Удалить сохраненные данные",messageFilter:"Фильтр сообщений",messageFilterHint:"Включите события в фильтре, чтобы получать сообщения о них.",alertFilter:"Фильтр предупреждений",alertFilterHint:"Включите предупреждения в фильтре, чтобы они появлялись, когда соответствующее события произошли.",alertToggle:"Показывать подобные предупреждения в будущем",notificationTypeFilter:"Фильтр уведомлений",notificationTypeFilterHint:"Включите уведомления в фильтре, чтобы они появлялись, когда соответствующее события произошли.",notificationTypeToggle:"Показывать подобные уведомления в будущем"},city:{cityOverview:{title:"Обзор города",hint:"Кликните на подсвеченный район, чтобы просмотреть информацию о нем и доступные с ним действия.",toggleZoomPanel:"Показать/скрыть панель масштабирования",zoom:"Масштаб",name:"Название"}},mainframe:{mainframe:"Мейнфрейм",program:"Программа",level:"Уровень",quality:"Качество",threads:"Потоки",cores:"Ядра",programDescription:{cost:"Стоит {{value.cost}} для покупки",requirements:"Требует {{value.ram}} памяти и до {{value.cores}} ядер для запуска {{value.threads}} потоков",requirementsScalable:"Автомасштабируется и использует все неиспользуемые ядра и память",completionTime:"Может быть выполнена за {{value.minTime}} - {{value.maxTime}}",completionTimeScalable:"Выполняется каждый тик"},tabs:{processes:"Процессы",hardware:"Оборудование",programs:"Программы"},hardware:{hardwareHint:"Нажмите Ctrl или Shift для покупки 10 уровней. Нажмите вместе Ctrl и Shift для покупки 100 уровней. Приоритет улучшения оборудования может быть изменен путем его перетаскивания за название. Улучшения наверху имеют больший приоритет.",performance:"Уровень производительности: {{value}}",performanceHint:"Высокие уровни производительности ведут к более быстрым процессам",cores:"Уровень ядер: {{value}}",coresHint:"Дополнительные ядра дают лучшее масштабирование и выполнение большего числа процессов одновременно",ram:"Уровень памяти: {{value}}",ramHint:"Дополнительная память дает возможность держать больше процессов в памяти, чтобы они смогли выполниться позже или в больших группах",buy:"Купить x{{value.increase}} за {{value.cost}}"},programs:{programsHint:"Приоритет улучшения программы может быть изменен путем его перетаскивания за название. Программы наверху имеют больший приоритет.",purchaseProgram:"Купить программу",purchaseProgramDialogHint:"Выберите тип программы, уровень и качество, чтобы купить её. Уровень не может быть выше текущего уровня развития города. Качество зависит от полученных услуг. Если у тебя уже есть программа с тем же именем, старая будет заменена на новую.",purchase:"Купить за {{value.cost}}",emptyListNotification:"У тебя нет имеющихся програм",toggleAutoupgrade:"Включить/выключить автопокупку",toggleAutoupgradeAll:"Включить/выключить автопокупку для всех программ"},processes:{processesHint:"Чтобы программа выполнялась, для неё должен быть начат процесс. Процессы для немасштабируемых программ наверху списка имеют приоритет, когда ядра распределяются по процессам. Ядра и память будут назначены для процесса с масштабируемой программой в последнюю очередь. Только один процесс для масштабируемой программы может выполняться. Минимальное время выполнения процесса ограничено. Порядок процессов можно поменять перетаскиванием их за названия.",startProcess:"Начать процесс",startProcessDialogHint:"Выберите одну из имеющихся программ, чтобы начать процесс для неё. Если у тебя уже есть процесс для выбранной программы, старый процесс будет замене на новый. Потоки позволяют выполняться нескольким экземплярам программы одновременно, но дополнительные потоки требует больше памяти.",emptyListNotification:"У тебя нет процессов",programSelectItem:"$t(programs:{{value.programName}}:name), уровень {{value.level}}, качество {{value.quality}}",progressBarLabel:"{{value.currentCompletionPoints}} / {{value.maxCompletionPoints}}",progressBarHintActive:"Процесс будет выполнен через {{value}}",progressBarHintPaused:"Процесс неактивен",processToggle:"Включить / выключить процесс",allProcessesToggle:"Включить / выключить все процессы",processDelete:"Удалить процесс",allProcessesDelete:"Удалить все процессы",autoscalable:"Автомасштабируется",usesCores:"{{value.cores}} / {{value.maxCores}}",availableCores:"Доступные ядра: {{value}}",availableRam:"Доступная память: {{value}}",processDescription:{completionTime:"Может быть выполнен через {{value}}",completionTimeScalable:"Выполняется каждый тик",completionTimeNoCores:"Для выполнения требуются назначенные ядра"}}},statistics:{statistics:"Статистика",total:"Всего",tabs:{general:"Обшее",growth:"Прирост",income:"Накопления",expenses:"Расходы",unlockedFeatures:"Разблокированные возможности"},hints:{mainframeDiscount:"Скидка на продукты для мейнфрейма мультипликативно зависит от очков вычистельной базы, сгенерированных программами и членами команды",computationalBase:"Вычислительная база влияет на скидку на оборудование и программы для мейнфрейма"},general:{time:{title:"Внутриигровое прошедшее время",timeThisRun:"С момента прибытия в город",timeTotal:"Общее время"},multipliers:{title:"Множители и скидки",programCompletionSpeed:"Скорость предсказательного вычислителя",mainframeDiscount:"Скидка на продукты для мейнфрейма (%)"}},growth:{programCompletionSpeed:{title:"Скорость выполнения процесса",pointsPerSecond:"ОВП в секунду"},money:{title:"Деньги в секунду",program:"Аренда сервера"},developmentPoints:{title:"Очки развития города в секунду",program:"Аренда сервера"},pointsByPrograms:{title:"Очки в секунду, сгенерированные программами",computationalBase:"Вычислительная база"}},income:{money:{title:"Деньги",program:"Аренда сервера"},developmentPoints:{title:"Очки развития города",program:"Аренда сервера"},pointsByPrograms:{title:"Очки, сгенерированные программами",computationalBase:"Вычислительная база"}},expenses:{money:{title:"Расходы денег",mainframeHardware:"На оборудование мейнфрейма",mainframePrograms:"На программы мейнфрейма"}},unlockedFeatures:{title:"Разблокированные возможности"}},automation:{automation:"Автоматизация",tabs:{autobuyers:"Автопокупка"},mainframeHardwareAutobuyer:{mainframeHardwareAutobuyer:"Автопокупка оборудования мейнфрейма",percentageHint:"Процент доступных денег, зарезервированный для улучшения оборудования мейнфрейма"},mainframeProgramsAutobuyer:{mainframeProgramsAutobuyer:"Автопокупка программ для мейнфрейма",percentageHint:"Процент доступных денег, зарезервированный для улучшения программ для мейнфрейма"}},credits:{OmniLRenegadE:"Идея, код, дизайн, баланс"}}},nx={en:tx,ru:rx};(()=>{var t={665:(i,s,o)=>{o.d(s,{H:()=>d});const l=["initialized","loaded","languageChanged"];class d extends HTMLElement{set i18next(h){this._i18next!==h&&(this._disconnect(),this._i18next=h,this._connect())}static get observedAttributes(){return[]}constructor(h){super(),this._observedAttributes=[],this._initialized=!1,this._props={},this._i18next=window.i18next;const g=h.reduce((b,y)=>{const x=y.toLowerCase();return x!==y&&(b[x]=y),b},{});this._observedAttributes=h,this._attrMap=b=>g[b]||b}connectedCallback(){this._assignProps(),this._disconnect(),this._connect(),this._initialized=!0,this._render()}disconnectedCallback(){this._disconnect()}attributeChangedCallback(h,g,b){g!==b&&(this._properties(this._attrMap(h),b),window.requestAnimationFrame(()=>{this._render()}))}_assignProps(){Array.from(this.attributes).forEach(h=>this._properties(this._attrMap(h.name),h.value)),this._observedAttributes.forEach(h=>{this[h]!==void 0&&this._properties(h,this[h]),Object.defineProperty(this,h,{get(){return this._props[h]},set(g){this.attributeChangedCallback(h,this._props[h],g)},configurable:!0,enumerable:!0})})}_connect(){this._i18next&&(this._off=l.map(h=>{const g=()=>{window.requestAnimationFrame(()=>{this._assignProps(),this._render()})};return this._i18next.on(h,g),()=>this._i18next.off(h,g)}))}_disconnect(){this._off&&this._off.forEach(h=>h())}_languages(h){const g=this._i18next&&this._i18next.languages||navigator.languages;return[].concat(h,g).filter(Boolean)}_properties(h,g){}_render(){}}},834:(i,s,o)=>{var l=o(665),d=o(903);const p=["value","lng","options","date","time","weekday","era","year","month","day","hour","minute","second","hour12","hourCycle","timeZone","timeZoneName","localeMatcher","formatMatcher","numberingSystem","calendar"],h={year:"numeric",month:"numeric",day:"numeric"},g={hour:"numeric",minute:"numeric",second:"numeric"};class b extends l.H{static get observedAttributes(){return(0,d.C8)(p)}constructor(){super(p)}_properties(x,A){const{_props:k}=this;switch(x){case"value":k[x]=(0,d.ZU)(A);break;case"date":(0,d.Pl)(A)&&(this._props=Object.assign(k,h));break;case"time":if((0,d.Pl)(A)){const I=k.hour12||!1;this._props=Object.assign(k,g,{hour12:I})}else{const{hour:I,minute:U,second:H,...z}=k;this._props=z}break;case"hour12":k[x]=(0,d.Pl)(A);break;case"options":this._props=Object.assign(k,(0,d.Qs)(A,A));break;default:k[x]=(0,d.Qs)(A,A)}}_render(){if(this._initialized){const{value:x,lng:A,...k}=this._props,I=x||new Date,U=this._languages(A);try{this.textContent=new Intl.DateTimeFormat(U,k).format(I)}catch(H){this.textContent=new Intl.DateTimeFormat(U).format(I),console.log(H)}}}}customElements.define("intl-datetime",b)},200:(i,s,o)=>{var l=o(665),d=o(903);const p=["key","label","count","context","lng","ns","options","value","dangerous"];class h extends l.H{static get observedAttributes(){return(0,d.C8)(p)}constructor(){super(p),this._props={}}_properties(b,y){if(b==="dangerous")this._props.interpolation={escapeValue:!(0,d.Pl)(y)};else{const x=(0,d.ZU)(y)||(0,d.Qs)(y)||y;b==="options"&&typeof x=="object"?this._props={...this._props,...x}:this._props[b]=x}}_render(){if(this._initialized){const{label:b,key:y,...x}=this._props,A=this._i18next.t(b||y,x);A&&(this.innerHTML=A)}}}customElements.define("intl-message",h)},563:(i,s,o)=>{var l=o(665),d=o(903);const p=["value","lng","options","styleProp","currency","currencyDisplay","currencySign","unit","unitDisplay","notation","compactDisplay","useGrouping","signDisplay","localeMatcher","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","numberingSystem"];class h extends l.H{static get observedAttributes(){return(0,d.C8)(p)}constructor(){super(p),this._props.value=0}_properties(b,y){const{_props:x}=this;switch(b){case"options":this._props=Object.assign(x,(0,d.Qs)(y));break;case"styleProp":typeof y=="string"&&(x.style=y);break;default:x[b]=(0,d.Qs)(y,y)}}_render(){if(this._initialized){const{value:b,lng:y,...x}=this._props,A=this._languages(y);try{this.textContent=new Intl.NumberFormat(A,x).format(b)}catch(k){this.textContent=new Intl.NumberFormat(A).format(b),console.log(k)}}}}customElements.define("intl-number",h)},743:(i,s,o)=>{var l=o(665),d=o(903);const p=["year","month","week","day","hour","minute","second"],h=[12,4,7,24,60,60],g={year:31536e3,quarter:10368e3,month:2592e3,week:604800,day:86400,hour:3600,minute:60},b=(U,H)=>{const z=H.getDay(),{day:V}=U,j=V<0?V+z-7:V-z+7;return V<0?Math.ceil(j/7):Math.floor(j/7)},y=(U,H,z=1)=>Math.trunc((U.getTime()-H.getTime())/1e3/z),x=(U,H)=>{if((ie=U)&&ie instanceof Date&&!isNaN(ie.getTime())){const te=new Date,Ae=y(U,te,g.day),He=(z=U,V=te,j=Ae,Math.abs(j)<31?0:Math.trunc(z.getMonth()+12*z.getFullYear()-(V.getMonth()+12*V.getFullYear()))),Rt={year:Math.trunc(He/12),month:He,week:y(U,te,g.week),day:Ae,hour:y(U,te,g.hour),minute:y(U,te,g.minute),second:y(U,te)};for(let dt=0;dt<p.length;dt++){const st=p[dt];let kt=Rt[st];if(kt!==0)return st==="week"&&(kt=b(Rt,te)),{value:kt,unit:st,date:U}}return{value:0,unit:"second",date:new Date}}{const te=A({unit:H},!0)*U+Date.now();return{value:(0,d.He)(U),unit:H,date:new Date(te)}}var z,V,j,ie},A=({date:U=new Date,unit:H},z)=>{const V=g[H]||1;let j=(V+y(U,new Date))%V||V;return j<0&&(j=V+j||1),z||(j=Math.trunc(j/6)||1),1e3*j},k=["value","lng","options","unit","localeMatcher","styleProp","numeric","update"];class I extends l.H{static get observedAttributes(){return(0,d.C8)(k)}constructor(){super(k)}disconnectedCallback(){clearTimeout(this._timerId),super.disconnectedCallback()}_setTimer(){const{date:H,value:z,unit:V}=this._props,j=A({date:H,unit:V});this._timerId=setTimeout(()=>{this._timerId=null;const ie=(({value:te,unit:Ae})=>{if(te===1){const He=p.indexOf(Ae);te=h[He]||te,Ae=He!==-1&&p[He+1]||"second"}return{value:te,unit:Ae}})(x(H,V));ie.value!==z?(this._props.value=ie.value,this._properties("unit",ie.unit),this._render()):this._props.update&&this._setTimer()},j)}_properties(H,z){const{_props:V}=this;switch(H){case"value":const ie=(0,d.ZU)(z)||(0,d.He)(z)||0;this._props=Object.assign(V,x(ie,V.unit));break;case"options":const te=(0,d.Qs)(z);typeof te=="object"&&(this._props=Object.assign(V,te));break;case"update":(V[H]=(0,d.Pl)(z))||clearTimeout(this._timerId);break;case"styleProp":typeof z=="string"&&(V.style=z);break;case"unit":V[H]=(j=z,j=String(j).replace(/s$/,""),p.indexOf(j)!==-1?j:"second");break;default:V[H]=(0,d.Qs)(z,z)}var j}_render(){if(this._initialized){const{value:H=0,lng:z,unit:V="second",date:j,update:ie,...te}=this._props;ie&&!this._timerId&&this._setTimer();const Ae=this._languages(z);try{this.textContent=new Intl.RelativeTimeFormat(Ae,te).format(H,V)}catch(He){this.textContent=new Intl.RelativeTimeFormat(Ae).format(H,V),console.log(He)}}}}customElements.define("intl-relative-time",I)},903:(i,s,o)=>{o.d(s,{C8:()=>y,He:()=>b,Pl:()=>l,Qs:()=>g,ZU:()=>h});const l=x=>x===""||!!x,d=x=>x instanceof Date&&!isNaN(x.getTime()),p=/^\d{4}-\d{2}-\d{2}/,h=x=>{if(d(x))return x;if(typeof x=="string"){const A=new Date(x);if(p.test(String(x))&&d(A))return A}},g=(x,A)=>{if(typeof x=="string")try{return JSON.parse(x)}catch{}return A},b=x=>{const A=Number(x);if(!isNaN(A))return A},y=x=>x.map(A=>A.toLowerCase())}},e={};function r(i){var s=e[i];if(s!==void 0)return s.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,r),o.exports}r.d=(i,s)=>{for(var o in s)r.o(s,o)&&!r.o(i,o)&&Object.defineProperty(i,o,{enumerable:!0,get:s[o]})},r.o=(i,s)=>Object.prototype.hasOwnProperty.call(i,s),r(200),r(834),r(743),r(563)})();const Rm=document.createElement("template");Rm.innerHTML='<style>*{box-sizing:border-box}:host{--fade-in-transition-duration:150ms;--fade-out-transition-duration:800ms;--fade-out-transition-delay:300ms;--fill-color-transition-duration:150ms;--viewport-overflow-x:auto;--viewport-overflow-y:auto;--viewport-scroll-snap-type:none;--viewport-scroll-behavior:auto;--viewport-overscroll-behavior:auto;--viewport-z-index:0;--scrollbar-width:16px;--scrollbar-padding:2px;--scrollbar-fill-color:transparent;--scrollbar-fill-color-hover:transparent;--scrollbar-border-width:0;--scrollbar-border-style:none;--scrollbar-border-color:#999;--scrollbar-border-radius:0;--scrollbar-box-shadow:none;--scrollbar-z-index-hover:30;--vertical-scrollbar-padding:var(--scrollbar-padding);--vertical-scrollbar-background:none;--vertical-scrollbar-background-size:auto;--vertical-scrollbar-z-index:20;--horizontal-scrollbar-padding:var(--scrollbar-padding);--horizontal-scrollbar-background:none;--horizontal-scrollbar-background-size:auto;--horizontal-scrollbar-z-index:10;--scrollbar-track-fill-color:transparent;--scrollbar-track-fill-color-hover:transparent;--scrollbar-track-border-width:0;--scrollbar-track-border-style:none;--scrollbar-track-border-color:#999;--scrollbar-track-border-radius:0;--scrollbar-track-box-shadow:none;--vertical-scrollbar-track-background:none;--vertical-scrollbar-track-background-size:auto;--horizontal-scrollbar-track-background:none;--horizontal-scrollbar-track-background-size:auto;--scrollbar-thumb-fill-color:#ccc;--scrollbar-thumb-fill-color-hover:#aaa;--scrollbar-thumb-border-width:0;--scrollbar-thumb-border-style:none;--scrollbar-thumb-border-color:#999;--scrollbar-thumb-border-radius:var(--scrollbar-width);--scrollbar-thumb-box-shadow:none;--vertical-scrollbar-thumb-background:none;--vertical-scrollbar-thumb-background-size:auto;--horizontal-scrollbar-thumb-background:none;--horizontal-scrollbar-thumb-background-size:auto;--content-padding:0;position:relative;overflow:hidden;display:grid;grid-template:1fr/1fr}.viewport{z-index:var(--viewport-z-index);display:grid;overflow-x:var(--viewport-overflow-x);overflow-y:var(--viewport-overflow-y);scrollbar-width:none;outline:0;scroll-behavior:var(--viewport-scroll-behavior);overscroll-behavior:var(--viewport-overscroll-behavior);scroll-snap-type:var(--viewport-scroll-snap-type)}.viewport::-webkit-scrollbar{width:0;height:0}.content{padding:var(--content-padding)}.content.restrict-width{width:var(--viewport-width)}.content.restrict-height{height:var(--viewport-height)}.scrollbar{user-select:none;touch-action:none;position:absolute;border-width:var(--scrollbar-border-width);border-style:var(--scrollbar-border-style);border-color:var(--scrollbar-border-color);border-radius:var(--scrollbar-border-radius);box-shadow:var(--scrollbar-box-shadow);opacity:0;transition:opacity var(--fade-out-transition-duration) ease-in-out var(--fade-out-transition-delay),background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar{z-index:var(--vertical-scrollbar-z-index);width:var(--scrollbar-width);right:0;top:0;bottom:0;padding:var(--vertical-scrollbar-padding);background:var(--vertical-scrollbar-background);background-color:var(--scrollbar-fill-color);background-size:var(--vertical-scrollbar-background-size)}.vertical-scrollbar.left-position{left:0;right:auto}.horizontal-scrollbar{z-index:var(--horizontal-scrollbar-z-index);height:var(--scrollbar-width);left:0;right:0;bottom:0;padding:var(--horizontal-scrollbar-padding);background:var(--horizontal-scrollbar-background);background-color:var(--scrollbar-fill-color);background-size:var(--horizontal-scrollbar-background-size)}.horizontal-scrollbar.top-position{top:0;bottom:auto}.scrollbar:hover,.scrollbar.scrolling-with-thumb,.viewport:hover~.scrollbar,.viewport:not(:focus):focus-within~.scrollbar,.viewport.touch~.scrollbar{opacity:1;transition:opacity var(--fade-in-transition-duration) ease-in-out 0s,background-color var(--fill-color-transition-duration) ease-out}.viewport.scrollbar-visible~.scrollbar{opacity:1;transition:none}.scrollbar:hover,.scrollbar.scrolling-with-thumb{z-index:var(--scrollbar-z-index-hover);background-color:var(--scrollbar-fill-color-hover)}.scrollbar.hidden{display:none}.scrollbar .scrollbar-track{height:100%;width:100%;border-width:var(--scrollbar-track-border-width);border-style:var(--scrollbar-track-border-style);border-color:var(--scrollbar-track-border-color);border-radius:var(--scrollbar-track-border-radius);box-shadow:var(--scrollbar-track-box-shadow);transition:background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar .scrollbar-track{background:var(--vertical-scrollbar-track-background);background-color:var(--scrollbar-track-fill-color);background-size:var(--vertical-scrollbar-track-background-size)}.horizontal-scrollbar .scrollbar-track{background:var(--horizontal-scrollbar-track-background);background-color:var(--scrollbar-track-fill-color);background-size:var(--horizontal-scrollbar-track-background-size)}.scrollbar-track:hover,.scrollbar.scrolling-with-thumb .scrollbar-track{background-color:var(--scrollbar-track-fill-color-hover)}.scrollbar .scrollbar-thumb{height:100%;width:100%;border-width:var(--scrollbar-thumb-border-width);border-style:var(--scrollbar-thumb-border-style);border-color:var(--scrollbar-thumb-border-color);border-radius:var(--scrollbar-thumb-border-radius);transform:translate3d(0,0,0);box-shadow:var(--scrollbar-thumb-box-shadow);transition:background-color var(--fill-color-transition-duration) ease-out}.vertical-scrollbar .scrollbar-thumb{background:var(--vertical-scrollbar-thumb-background);background-color:var(--scrollbar-thumb-fill-color);background-size:var(--vertical-scrollbar-thumb-background-size)}.horizontal-scrollbar .scrollbar-thumb{background:var(--horizontal-scrollbar-thumb-background);background-color:var(--scrollbar-thumb-fill-color);background-size:var(--horizontal-scrollbar-thumb-background-size)}.scrollbar .scrollbar-thumb:hover,.scrollbar.scrolling-with-thumb .scrollbar-thumb{background-color:var(--scrollbar-thumb-fill-color-hover)}</style><div class="viewport" tabindex="-1"><div class="content"><slot></slot></div></div><div class="scrollbar vertical-scrollbar hidden"><div class="scrollbar-track"><div class="scrollbar-thumb"></div></div></div><div class="scrollbar horizontal-scrollbar hidden"><div class="scrollbar-track"><div class="scrollbar-thumb"></div></div></div>';const bu=Symbol("vertical"),km=Symbol("horizontal"),Bi=[{key:bu,name:"vertical",size:"height",o:"offsetHeight",l:"scrollHeight",position:"top",t:"scrollTop",i:"overflow-y",h:"clientY",v:"pageY"},{key:km,name:"horizontal",size:"width",o:"offsetWidth",l:"scrollWidth",position:"left",t:"scrollLeft",i:"overflow-x",h:"clientX",v:"pageX"}];class ix extends HTMLElement{constructor(){super(),this.u(),this.p(),this.g()}static get observedAttributes(){return["scrollbar-visibility","vertical-scrollbar-position","horizontal-scrollbar-position"]}connectedCallback(){this.k(),this.m(),this.S()}attributeChangedCallback(e,r,i){e==="scrollbar-visibility"?this.viewport.classList.toggle("scrollbar-visible",i==="always"):e==="vertical-scrollbar-position"?this.elements[bu].C.classList.toggle("left-position",i==="left"):e==="horizontal-scrollbar-position"&&this.elements[km].C.classList.toggle("top-position",i==="top")}u(){this.viewport,this.content,this.elements={},this.cache={},this.T={},this.$=null;for(let e of Bi)this.elements[e.key]={C:null,W:null,T:null},this.cache[e.key]={A:!1,F:!1,M:0,O:0,P:1},this.T[e.key]={q:!0,L:1,R:{v:0,t:0}}}p(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Rm.content.cloneNode(!0)),this.viewport=this.shadowRoot.querySelector(".viewport"),this.content=this.viewport.querySelector(".content");for(let e of Bi){const r=this.elements[e.key];r.C=this.shadowRoot.querySelector(`.${e.name}-scrollbar`),r.W=r.C.querySelector(".scrollbar-track"),r.T=r.W.querySelector(".scrollbar-thumb")}}g(){const e=new ResizeObserver(()=>{this.H()});e.observe(this.viewport),e.observe(this.content);for(let r of Bi){const i=this.elements[r.key];e.observe(i.W),i.W.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),this.D(r,o)});const s=o=>{this.X(r,o)};i.T.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),i.T.addEventListener("pointermove",s,{passive:!0}),i.T.setPointerCapture(o.pointerId),this.Y(r,o)}),i.T.addEventListener("pointerup",o=>{i.T.removeEventListener("pointermove",s,{passive:!0}),i.T.releasePointerCapture(o.pointerId),this.j(r)},{passive:!0})}this.viewport.addEventListener("scroll",()=>{this.B()},{passive:!0}),this.viewport.addEventListener("touchstart",()=>{this.G()},{passive:!0}),this.viewport.addEventListener("touchend",()=>{this.I()},{passive:!0})}D(e,r){const i=this.elements[e.key],s=this.cache[e.key],o=i.W.getBoundingClientRect(),l=i.T.getBoundingClientRect(),d=r[e.h]-o[e.position]-l[e.size]/2,p=s.O/o[e.size],h=d/s.P*p;requestAnimationFrame(()=>{this.viewport.scrollTo({[e.position]:h,behavior:"smooth"}),this.viewport.focus({preventScroll:!0})})}Y(e,r){const i=this.elements[e.key],s=this.T[e.key],o=i.W.getBoundingClientRect();s.q=!0,s.L=this.cache[e.key].O/o[e.size],s.R.v=r.touches?r.touches[0][e.v]:r[e.v],s.R.t=this.viewport[e.t],requestAnimationFrame(()=>{this.viewport.classList.add(`scrolling-with-${e.name}-thumb`),i.C.classList.add("scrolling-with-thumb"),this.viewport.focus({preventScroll:!0})})}X(e,r){const i=this.T[e.key];if(i.q){const s=((r.touches?r.touches[0][e.v]:r[e.v])-i.R.v)/this.cache[e.key].P*i.L,o=i.R.t+s;this.viewport[e.t]=o}}j(e){const r=this.T[e.key];r.q&&(r.q=!1,this.viewport.classList.remove(`scrolling-with-${e.name}-thumb`),this.elements[e.key].C.classList.remove("scrolling-with-thumb"))}G(){this.viewport.classList.add("touch")}I(){this.viewport.classList.remove("touch")}B(){this.$===null&&(this.$=requestAnimationFrame(()=>{this.S(),this.$=null}))}H(){this.k(),this.$===null&&(this.$=requestAnimationFrame(()=>{this.m(),this.S(),this.$=null}))}k(){const e=getComputedStyle(this.viewport);for(let r of Bi){const i=this.cache[r.key];i.F=e.getPropertyValue(r.i).trim()==="hidden",i.M=Math.floor(10*this.viewport[r.o])/10,i.O=Math.floor(10*this.elements[r.key].W[r.o])/10,i.P=i.O/this.viewport[r.l],i.A=!i.F&&this.viewport[r.l]>Math.ceil(i.M)}}m(){for(let e of Bi){const r=this.elements[e.key],i=this.cache[e.key];if(this.shadowRoot.host.style.setProperty(`--viewport-${e.size}`,`${i.M}px`),this.content.classList.toggle(`restrict-${e.size}`,i.F),r.C.classList.toggle("hidden",!i.A),i.A){const s=i.M*i.P;r.T.style[e.size]=`${s}px`}}}S(){for(let e of Bi){const r=this.cache[e.key];if(r.A){const i=this.viewport[e.t]*r.P;this.elements[e.key].T.style.transform=e.key===bu?`translate3D(0, ${i}px, 0)`:`translate3D(${i}px, 0, 0)`}}}}window.customElements.define("scrollable-component",ix);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ao=globalThis,Th=Ao.ShadowRoot&&(Ao.ShadyCSS===void 0||Ao.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oh=Symbol(),zf=new WeakMap;let Nm=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==Oh)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(Th&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=zf.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&zf.set(r,e))}return e}toString(){return this.cssText}};const sx=t=>new Nm(typeof t=="string"?t:t+"",void 0,Oh),K=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,s,o)=>i+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new Nm(r,t,Oh)},ax=(t,e)=>{if(Th)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),s=Ao.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}},Bf=Th?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return sx(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ox,defineProperty:lx,getOwnPropertyDescriptor:cx,getOwnPropertyNames:ux,getOwnPropertySymbols:hx,getPrototypeOf:dx}=Object,On=globalThis,Hf=On.trustedTypes,px=Hf?Hf.emptyScript:"",ru=On.reactiveElementPolyfillSupport,js=(t,e)=>t,Wi={toAttribute(t,e){switch(e){case Boolean:t=t?px:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},$h=(t,e)=>!ox(t,e),Gf={attribute:!0,type:String,converter:Wi,reflect:!1,hasChanged:$h};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),On.litPropertyMetadata??(On.litPropertyMetadata=new WeakMap);class Gi extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Gf){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,r);s!==void 0&&lx(this.prototype,e,s)}}static getPropertyDescriptor(e,r,i){const{get:s,set:o}=cx(this.prototype,e)??{get(){return this[r]},set(l){this[r]=l}};return{get(){return s==null?void 0:s.call(this)},set(l){const d=s==null?void 0:s.call(this);o.call(this,l),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Gf}static _$Ei(){if(this.hasOwnProperty(js("elementProperties")))return;const e=dx(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(js("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(js("properties"))){const r=this.properties,i=[...ux(r),...hx(r)];for(const s of i)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,s]of r)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)r.unshift(Bf(s))}else e!==void 0&&r.push(Bf(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ax(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostConnected)==null?void 0:i.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostDisconnected)==null?void 0:i.call(r)})}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$EC(e,r){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const l=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Wi).toAttribute(r,i.type);this._$Em=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(e,r){var o;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:Wi;this._$Em=s,this[s]=d.fromAttribute(r,l.type),this._$Em=null}}requestUpdate(e,r,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??$h)(this[e],r))return;this.P(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,r,i){this._$AL.has(e)||this._$AL.set(e,r),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,l]of this._$Ep)this[o]=l;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,l]of s)l.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],l)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(r)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(r=>this._$EC(r,this[r]))),this._$EU()}updated(e){}firstUpdated(e){}}Gi.elementStyles=[],Gi.shadowRootOptions={mode:"open"},Gi[js("elementProperties")]=new Map,Gi[js("finalized")]=new Map,ru==null||ru({ReactiveElement:Gi}),(On.reactiveElementVersions??(On.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qs=globalThis,ko=qs.trustedTypes,Vf=ko?ko.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dh="$lit$",cn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ih="?"+cn,fx=`<${Ih}>`,di=document,Zs=()=>di.createComment(""),Qs=t=>t===null||typeof t!="object"&&typeof t!="function",Lm=Array.isArray,Mm=t=>Lm(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",nu=`[ 	
\f\r]`,Is=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jf=/-->/g,qf=/>/g,ri=RegExp(`>|${nu}(?:([^\\s"'>=/]+)(${nu}*=${nu}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wf=/'/g,Kf=/"/g,Fm=/^(?:script|style|textarea|title)$/i,mx=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),O=mx(1),qt=Symbol.for("lit-noChange"),ze=Symbol.for("lit-nothing"),Yf=new WeakMap,ci=di.createTreeWalker(di,129);function Um(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vf!==void 0?Vf.createHTML(e):e}const zm=(t,e)=>{const r=t.length-1,i=[];let s,o=e===2?"<svg>":"",l=Is;for(let d=0;d<r;d++){const p=t[d];let h,g,b=-1,y=0;for(;y<p.length&&(l.lastIndex=y,g=l.exec(p),g!==null);)y=l.lastIndex,l===Is?g[1]==="!--"?l=jf:g[1]!==void 0?l=qf:g[2]!==void 0?(Fm.test(g[2])&&(s=RegExp("</"+g[2],"g")),l=ri):g[3]!==void 0&&(l=ri):l===ri?g[0]===">"?(l=s??Is,b=-1):g[1]===void 0?b=-2:(b=l.lastIndex-g[2].length,h=g[1],l=g[3]===void 0?ri:g[3]==='"'?Kf:Wf):l===Kf||l===Wf?l=ri:l===jf||l===qf?l=Is:(l=ri,s=void 0);const x=l===ri&&t[d+1].startsWith("/>")?" ":"";o+=l===Is?p+fx:b>=0?(i.push(h),p.slice(0,b)+Dh+p.slice(b)+cn+x):p+cn+(b===-2?d:x)}return[Um(t,o+(t[r]||"<?>")+(e===2?"</svg>":"")),i]};class Xs{constructor({strings:e,_$litType$:r},i){let s;this.parts=[];let o=0,l=0;const d=e.length-1,p=this.parts,[h,g]=zm(e,r);if(this.el=Xs.createElement(h,i),ci.currentNode=this.el.content,r===2){const b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=ci.nextNode())!==null&&p.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const b of s.getAttributeNames())if(b.endsWith(Dh)){const y=g[l++],x=s.getAttribute(b).split(cn),A=/([.?@])?(.*)/.exec(y);p.push({type:1,index:o,name:A[2],strings:x,ctor:A[1]==="."?Hm:A[1]==="?"?Gm:A[1]==="@"?Vm:pa}),s.removeAttribute(b)}else b.startsWith(cn)&&(p.push({type:6,index:o}),s.removeAttribute(b));if(Fm.test(s.tagName)){const b=s.textContent.split(cn),y=b.length-1;if(y>0){s.textContent=ko?ko.emptyScript:"";for(let x=0;x<y;x++)s.append(b[x],Zs()),ci.nextNode(),p.push({type:2,index:++o});s.append(b[y],Zs())}}}else if(s.nodeType===8)if(s.data===Ih)p.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(cn,b+1))!==-1;)p.push({type:7,index:o}),b+=cn.length-1}o++}}static createElement(e,r){const i=di.createElement("template");return i.innerHTML=e,i}}function pi(t,e,r=t,i){var l,d;if(e===qt)return e;let s=i!==void 0?(l=r._$Co)==null?void 0:l[i]:r._$Cl;const o=Qs(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((d=s==null?void 0:s._$AO)==null||d.call(s,!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=s:r._$Cl=s),s!==void 0&&(e=pi(t,s._$AS(t,e.values),s,i)),e}class Bm{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??di).importNode(r,!0);ci.currentNode=s;let o=ci.nextNode(),l=0,d=0,p=i[0];for(;p!==void 0;){if(l===p.index){let h;p.type===2?h=new ts(o,o.nextSibling,this,e):p.type===1?h=new p.ctor(o,p.name,p.strings,this,e):p.type===6&&(h=new jm(o,this,e)),this._$AV.push(h),p=i[++d]}l!==(p==null?void 0:p.index)&&(o=ci.nextNode(),l++)}return ci.currentNode=di,s}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class ts{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,i,s){this.type=2,this._$AH=ze,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=pi(this,e,r),Qs(e)?e===ze||e==null||e===""?(this._$AH!==ze&&this._$AR(),this._$AH=ze):e!==this._$AH&&e!==qt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Mm(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==ze&&Qs(this._$AH)?this._$AA.nextSibling.data=e:this.T(di.createTextNode(e)),this._$AH=e}$(e){var o;const{values:r,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Xs.createElement(Um(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(r);else{const l=new Bm(s,this),d=l.u(this.options);l.p(r),this.T(d),this._$AH=l}}_$AC(e){let r=Yf.get(e.strings);return r===void 0&&Yf.set(e.strings,r=new Xs(e)),r}k(e){Lm(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const o of e)s===r.length?r.push(i=new ts(this.S(Zs()),this.S(Zs()),this,this.options)):i=r[s],i._$AI(o),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,r);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class pa{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,s,o){this.type=1,this._$AH=ze,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ze}_$AI(e,r=this,i,s){const o=this.strings;let l=!1;if(o===void 0)e=pi(this,e,r,0),l=!Qs(e)||e!==this._$AH&&e!==qt,l&&(this._$AH=e);else{const d=e;let p,h;for(e=o[0],p=0;p<o.length-1;p++)h=pi(this,d[i+p],r,p),h===qt&&(h=this._$AH[p]),l||(l=!Qs(h)||h!==this._$AH[p]),h===ze?e=ze:e!==ze&&(e+=(h??"")+o[p+1]),this._$AH[p]=h}l&&!s&&this.j(e)}j(e){e===ze?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Hm extends pa{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ze?void 0:e}}class Gm extends pa{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ze)}}class Vm extends pa{constructor(e,r,i,s,o){super(e,r,i,s,o),this.type=5}_$AI(e,r=this){if((e=pi(this,e,r,0)??ze)===qt)return;const i=this._$AH,s=e===ze&&i!==ze||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==ze&&(i===ze||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class jm{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){pi(this,e)}}const gx={P:Dh,A:cn,C:Ih,M:1,L:zm,R:Bm,D:Mm,V:pi,I:ts,H:pa,N:Gm,U:Vm,B:Hm,F:jm},iu=qs.litHtmlPolyfillSupport;iu==null||iu(Xs,ts),(qs.litHtmlVersions??(qs.litHtmlVersions=[])).push("3.1.3");const vx=(t,e,r)=>{const i=(r==null?void 0:r.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(r==null?void 0:r.renderBefore)??null;i._$litPart$=s=new ts(e.insertBefore(Zs(),o),o,void 0,r??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ji=class extends Gi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=vx(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return qt}};var $m;ji._$litElement$=!0,ji.finalized=!0,($m=globalThis.litElementHydrateSupport)==null||$m.call(globalThis,{LitElement:ji});const su=globalThis.litElementPolyfillSupport;su==null||su({LitElement:ji});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.5");var bx=K`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,yu="";function _u(t){yu=t}function yx(t=""){if(!yu){const e=[...document.getElementsByTagName("script")],r=e.find(i=>i.hasAttribute("data-shoelace"));if(r)_u(r.getAttribute("data-shoelace"));else{const i=e.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));let s="";i&&(s=i.getAttribute("src")),_u(s.split("/").slice(0,-1).join("/"))}}return yu.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var _x={name:"default",resolver:t=>yx(`assets/icons/${t}.svg`)},wx=_x,Jf={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Sx={name:"system",resolver:t=>t in Jf?`data:image/svg+xml,${encodeURIComponent(Jf[t])}`:""},xx=Sx,Px=[wx,xx],wu=[];function Cx(t){wu.push(t)}function Ax(t){wu=wu.filter(e=>e!==t)}function Zf(t){return Px.find(e=>e.name===t)}var Ex=K`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,qm=Object.defineProperty,Tx=Object.defineProperties,Ox=Object.getOwnPropertyDescriptor,$x=Object.getOwnPropertyDescriptors,Qf=Object.getOwnPropertySymbols,Dx=Object.prototype.hasOwnProperty,Ix=Object.prototype.propertyIsEnumerable,au=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Xf=(t,e,r)=>e in t?qm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Fn=(t,e)=>{for(var r in e||(e={}))Dx.call(e,r)&&Xf(t,r,e[r]);if(Qf)for(var r of Qf(e))Ix.call(e,r)&&Xf(t,r,e[r]);return t},El=(t,e)=>Tx(t,$x(e)),_=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ox(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&qm(e,r,s),s},Rx=function(t,e){this[0]=t,this[1]=e},kx=t=>{var e=t[au("asyncIterator")],r=!1,i,s={};return e==null?(e=t[au("iterator")](),i=o=>s[o]=l=>e[o](l)):(e=e.call(t),i=o=>s[o]=l=>{if(r){if(r=!1,o==="throw")throw l;return l}return r=!0,{done:!1,value:new Rx(new Promise(d=>{var p=e[o](l);if(!(p instanceof Object))throw TypeError("Object expected");d(p)}),1)}}),s[au("iterator")]=()=>s,i("next"),"throw"in e?i("throw"):s.throw=o=>{throw o},"return"in e&&i("return"),s};function De(t,e){const r=Fn({waitUntilFirstUpdate:!1},e);return(i,s)=>{const{update:o}=i,l=Array.isArray(t)?t:[t];i.update=function(d){l.forEach(p=>{const h=p;if(d.has(h)){const g=d.get(h),b=this[h];g!==b&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](g,b)}}),o.call(this,d)}}}var vt=K`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nx={attribute:!0,type:String,converter:Wi,reflect:!1,hasChanged:$h},Lx=(t=Nx,e,r)=>{const{kind:i,metadata:s}=r;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(r.name,t),i==="accessor"){const{name:l}=r;return{set(d){const p=e.get.call(this);e.set.call(this,d),this.requestUpdate(l,p,t)},init(d){return d!==void 0&&this.P(l,void 0,t),d}}}if(i==="setter"){const{name:l}=r;return function(d){const p=this[l];e.call(this,d),this.requestUpdate(l,p,t)}}throw Error("Unsupported decorator location: "+i)};function P(t){return(e,r)=>typeof r=="object"?Lx(t,e,r):((i,s,o)=>{const l=s.hasOwnProperty(o);return s.constructor.createProperty(o,l?{...i,wrapped:!0}:i),l?Object.getOwnPropertyDescriptor(s,o):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ae(t){return P({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Mx(t){return(e,r)=>{const i=typeof e=="function"?e:e[r];Object.assign(i,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fx=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Be(t,e){return(r,i,s)=>{const o=l=>{var d;return((d=l.renderRoot)==null?void 0:d.querySelector(t))??null};return Fx(r,i,{get(){return o(this)}})}}var et=class extends ji{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const r=new CustomEvent(t,Fn({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(r),r}static define(t,e=this,r={}){const i=customElements.get(t);if(!i){customElements.define(t,class extends e{},r);return}let s=" (unknown version)",o=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version),!(s&&o&&s===o)&&console.warn(`Attempted to register <${t}>${s}, but <${t}>${o} has already been registered.`)}};et.version="2.15.0";et.dependencies={};_([P()],et.prototype,"dir",2);_([P()],et.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Ux}=gx,zx=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,Wm=t=>t.strings===void 0,em=()=>document.createComment(""),Rs=(t,e,r)=>{var o;const i=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(r===void 0){const l=i.insertBefore(em(),s),d=i.insertBefore(em(),s);r=new Ux(l,d,t,t.options)}else{const l=r._$AB.nextSibling,d=r._$AM,p=d!==t;if(p){let h;(o=r._$AQ)==null||o.call(r,t),r._$AM=t,r._$AP!==void 0&&(h=t._$AU)!==d._$AU&&r._$AP(h)}if(l!==s||p){let h=r._$AA;for(;h!==l;){const g=h.nextSibling;i.insertBefore(h,s),h=g}}}return r},ni=(t,e,r=t)=>(t._$AI(e,r),t),Bx={},Km=(t,e=Bx)=>t._$AH=e,Hx=t=>t._$AH,ou=t=>{var i;(i=t._$AP)==null||i.call(t,!1,!0);let e=t._$AA;const r=t._$AB.nextSibling;for(;e!==r;){const s=e.nextSibling;e.remove(),e=s}};var ks=Symbol(),bo=Symbol(),lu,cu=new Map,Ut=class extends et{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var r;let i;if(e!=null&&e.spriteSheet){this.svg=O`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const s=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(s),this.svg}try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return i.status===410?ks:bo}catch{return bo}try{const s=document.createElement("div");s.innerHTML=await i.text();const o=s.firstElementChild;if(((r=o==null?void 0:o.tagName)==null?void 0:r.toLowerCase())!=="svg")return ks;lu||(lu=new DOMParser);const d=lu.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return d?(d.part.add("svg"),document.adoptNode(d)):ks}catch{return ks}}connectedCallback(){super.connectedCallback(),Cx(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Ax(this)}getIconSource(){const t=Zf(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:r}=this.getIconSource(),i=r?Zf(this.library):void 0;if(!e){this.svg=null;return}let s=cu.get(e);if(s||(s=this.resolveIcon(e,i),cu.set(e,s)),!this.initialRender)return;const o=await s;if(o===bo&&cu.delete(e),e===this.getIconSource().url){if(zx(o)){this.svg=o;return}switch(o){case bo:case ks:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(!0),(t=i==null?void 0:i.mutator)==null||t.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};Ut.styles=[vt,Ex];_([ae()],Ut.prototype,"svg",2);_([P({reflect:!0})],Ut.prototype,"name",2);_([P()],Ut.prototype,"src",2);_([P()],Ut.prototype,"label",2);_([P({reflect:!0})],Ut.prototype,"library",2);_([De("label")],Ut.prototype,"handleLabelChange",1);_([De(["name","src","library"])],Ut.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rs=t=>(...e)=>({_$litDirective$:t,values:e});let ns=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye=rs(class extends ns{constructor(t){var e;if(super(t),t.type!==Rr.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,s;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const r=t.element.classList;for(const o of this.st)o in e||(r.remove(o),this.st.delete(o));for(const o in e){const l=!!e[o];l===this.st.has(o)||(s=this.nt)!=null&&s.has(o)||(l?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return qt}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ym=Symbol.for(""),Gx=t=>{if((t==null?void 0:t.r)===Ym)return t==null?void 0:t._$litStatic$},No=(t,...e)=>({_$litStatic$:e.reduce((r,i,s)=>r+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[s+1],t[0]),r:Ym}),tm=new Map,Vx=t=>(e,...r)=>{const i=r.length;let s,o;const l=[],d=[];let p,h=0,g=!1;for(;h<i;){for(p=e[h];h<i&&(o=r[h],(s=Gx(o))!==void 0);)p+=s+e[++h],g=!0;h!==i&&d.push(o),l.push(p),h++}if(h===i&&l.push(e[i]),g){const b=l.join("$$lit$$");(e=tm.get(b))===void 0&&(l.raw=l,tm.set(b,e=l)),r=d}return t(e,...r)},Eo=Vx(O);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=t=>t??ze;var Pt=class extends et{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?No`a`:No`button`;return Eo`
      <${e}
        part="base"
        class=${Ye({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${he(t?void 0:this.disabled)}
        type=${he(t?void 0:"button")}
        href=${he(t?this.href:void 0)}
        target=${he(t?this.target:void 0)}
        download=${he(t?this.download:void 0)}
        rel=${he(t&&this.target?"noreferrer noopener":void 0)}
        role=${he(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${he(this.name)}
          library=${he(this.library)}
          src=${he(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};Pt.styles=[vt,bx];Pt.dependencies={"sl-icon":Ut};_([Be(".icon-button")],Pt.prototype,"button",2);_([ae()],Pt.prototype,"hasFocus",2);_([P()],Pt.prototype,"name",2);_([P()],Pt.prototype,"library",2);_([P()],Pt.prototype,"src",2);_([P()],Pt.prototype,"href",2);_([P()],Pt.prototype,"target",2);_([P()],Pt.prototype,"download",2);_([P()],Pt.prototype,"label",2);_([P({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);Pt.define("sl-icon-button");var jx=K`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,qx=K`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const $n=Math.min,rr=Math.max,Lo=Math.round,yo=Math.floor,Dn=t=>({x:t,y:t}),Wx={left:"right",right:"left",bottom:"top",top:"bottom"},Kx={start:"end",end:"start"};function Su(t,e,r){return rr(t,$n(e,r))}function is(t,e){return typeof t=="function"?t(e):t}function In(t){return t.split("-")[0]}function ss(t){return t.split("-")[1]}function Jm(t){return t==="x"?"y":"x"}function Rh(t){return t==="y"?"height":"width"}function fa(t){return["top","bottom"].includes(In(t))?"y":"x"}function kh(t){return Jm(fa(t))}function Yx(t,e,r){r===void 0&&(r=!1);const i=ss(t),s=kh(t),o=Rh(s);let l=s==="x"?i===(r?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[o]>e.floating[o]&&(l=Mo(l)),[l,Mo(l)]}function Jx(t){const e=Mo(t);return[xu(t),e,xu(e)]}function xu(t){return t.replace(/start|end/g,e=>Kx[e])}function Zx(t,e,r){const i=["left","right"],s=["right","left"],o=["top","bottom"],l=["bottom","top"];switch(t){case"top":case"bottom":return r?e?s:i:e?i:s;case"left":case"right":return e?o:l;default:return[]}}function Qx(t,e,r,i){const s=ss(t);let o=Zx(In(t),r==="start",i);return s&&(o=o.map(l=>l+"-"+s),e&&(o=o.concat(o.map(xu)))),o}function Mo(t){return t.replace(/left|right|bottom|top/g,e=>Wx[e])}function Xx(t){return{top:0,right:0,bottom:0,left:0,...t}}function Zm(t){return typeof t!="number"?Xx(t):{top:t,right:t,bottom:t,left:t}}function Fo(t){const{x:e,y:r,width:i,height:s}=t;return{width:i,height:s,top:r,left:e,right:e+i,bottom:r+s,x:e,y:r}}function rm(t,e,r){let{reference:i,floating:s}=t;const o=fa(e),l=kh(e),d=Rh(l),p=In(e),h=o==="y",g=i.x+i.width/2-s.width/2,b=i.y+i.height/2-s.height/2,y=i[d]/2-s[d]/2;let x;switch(p){case"top":x={x:g,y:i.y-s.height};break;case"bottom":x={x:g,y:i.y+i.height};break;case"right":x={x:i.x+i.width,y:b};break;case"left":x={x:i.x-s.width,y:b};break;default:x={x:i.x,y:i.y}}switch(ss(e)){case"start":x[l]-=y*(r&&h?-1:1);break;case"end":x[l]+=y*(r&&h?-1:1);break}return x}const eP=async(t,e,r)=>{const{placement:i="bottom",strategy:s="absolute",middleware:o=[],platform:l}=r,d=o.filter(Boolean),p=await(l.isRTL==null?void 0:l.isRTL(e));let h=await l.getElementRects({reference:t,floating:e,strategy:s}),{x:g,y:b}=rm(h,i,p),y=i,x={},A=0;for(let k=0;k<d.length;k++){const{name:I,fn:U}=d[k],{x:H,y:z,data:V,reset:j}=await U({x:g,y:b,initialPlacement:i,placement:y,strategy:s,middlewareData:x,rects:h,platform:l,elements:{reference:t,floating:e}});g=H??g,b=z??b,x={...x,[I]:{...x[I],...V}},j&&A<=50&&(A++,typeof j=="object"&&(j.placement&&(y=j.placement),j.rects&&(h=j.rects===!0?await l.getElementRects({reference:t,floating:e,strategy:s}):j.rects),{x:g,y:b}=rm(h,y,p)),k=-1)}return{x:g,y:b,placement:y,strategy:s,middlewareData:x}};async function Nh(t,e){var r;e===void 0&&(e={});const{x:i,y:s,platform:o,rects:l,elements:d,strategy:p}=t,{boundary:h="clippingAncestors",rootBoundary:g="viewport",elementContext:b="floating",altBoundary:y=!1,padding:x=0}=is(e,t),A=Zm(x),I=d[y?b==="floating"?"reference":"floating":b],U=Fo(await o.getClippingRect({element:(r=await(o.isElement==null?void 0:o.isElement(I)))==null||r?I:I.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(d.floating)),boundary:h,rootBoundary:g,strategy:p})),H=b==="floating"?{x:i,y:s,width:l.floating.width,height:l.floating.height}:l.reference,z=await(o.getOffsetParent==null?void 0:o.getOffsetParent(d.floating)),V=await(o.isElement==null?void 0:o.isElement(z))?await(o.getScale==null?void 0:o.getScale(z))||{x:1,y:1}:{x:1,y:1},j=Fo(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:d,rect:H,offsetParent:z,strategy:p}):H);return{top:(U.top-j.top+A.top)/V.y,bottom:(j.bottom-U.bottom+A.bottom)/V.y,left:(U.left-j.left+A.left)/V.x,right:(j.right-U.right+A.right)/V.x}}const tP=t=>({name:"arrow",options:t,async fn(e){const{x:r,y:i,placement:s,rects:o,platform:l,elements:d,middlewareData:p}=e,{element:h,padding:g=0}=is(t,e)||{};if(h==null)return{};const b=Zm(g),y={x:r,y:i},x=kh(s),A=Rh(x),k=await l.getDimensions(h),I=x==="y",U=I?"top":"left",H=I?"bottom":"right",z=I?"clientHeight":"clientWidth",V=o.reference[A]+o.reference[x]-y[x]-o.floating[A],j=y[x]-o.reference[x],ie=await(l.getOffsetParent==null?void 0:l.getOffsetParent(h));let te=ie?ie[z]:0;(!te||!await(l.isElement==null?void 0:l.isElement(ie)))&&(te=d.floating[z]||o.floating[A]);const Ae=V/2-j/2,He=te/2-k[A]/2-1,Rt=$n(b[U],He),dt=$n(b[H],He),st=Rt,kt=te-k[A]-dt,Ge=te/2-k[A]/2+Ae,rt=Su(st,Ge,kt),ut=!p.arrow&&ss(s)!=null&&Ge!==rt&&o.reference[A]/2-(Ge<st?Rt:dt)-k[A]/2<0,Je=ut?Ge<st?Ge-st:Ge-kt:0;return{[x]:y[x]+Je,data:{[x]:rt,centerOffset:Ge-rt-Je,...ut&&{alignmentOffset:Je}},reset:ut}}}),rP=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,i;const{placement:s,middlewareData:o,rects:l,initialPlacement:d,platform:p,elements:h}=e,{mainAxis:g=!0,crossAxis:b=!0,fallbackPlacements:y,fallbackStrategy:x="bestFit",fallbackAxisSideDirection:A="none",flipAlignment:k=!0,...I}=is(t,e);if((r=o.arrow)!=null&&r.alignmentOffset)return{};const U=In(s),H=In(d)===d,z=await(p.isRTL==null?void 0:p.isRTL(h.floating)),V=y||(H||!k?[Mo(d)]:Jx(d));!y&&A!=="none"&&V.push(...Qx(d,k,A,z));const j=[d,...V],ie=await Nh(e,I),te=[];let Ae=((i=o.flip)==null?void 0:i.overflows)||[];if(g&&te.push(ie[U]),b){const st=Yx(s,l,z);te.push(ie[st[0]],ie[st[1]])}if(Ae=[...Ae,{placement:s,overflows:te}],!te.every(st=>st<=0)){var He,Rt;const st=(((He=o.flip)==null?void 0:He.index)||0)+1,kt=j[st];if(kt)return{data:{index:st,overflows:Ae},reset:{placement:kt}};let Ge=(Rt=Ae.filter(rt=>rt.overflows[0]<=0).sort((rt,ut)=>rt.overflows[1]-ut.overflows[1])[0])==null?void 0:Rt.placement;if(!Ge)switch(x){case"bestFit":{var dt;const rt=(dt=Ae.map(ut=>[ut.placement,ut.overflows.filter(Je=>Je>0).reduce((Je,Re)=>Je+Re,0)]).sort((ut,Je)=>ut[1]-Je[1])[0])==null?void 0:dt[0];rt&&(Ge=rt);break}case"initialPlacement":Ge=d;break}if(s!==Ge)return{reset:{placement:Ge}}}return{}}}};async function nP(t,e){const{placement:r,platform:i,elements:s}=t,o=await(i.isRTL==null?void 0:i.isRTL(s.floating)),l=In(r),d=ss(r),p=fa(r)==="y",h=["left","top"].includes(l)?-1:1,g=o&&p?-1:1,b=is(e,t);let{mainAxis:y,crossAxis:x,alignmentAxis:A}=typeof b=="number"?{mainAxis:b,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...b};return d&&typeof A=="number"&&(x=d==="end"?A*-1:A),p?{x:x*g,y:y*h}:{x:y*h,y:x*g}}const iP=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,i;const{x:s,y:o,placement:l,middlewareData:d}=e,p=await nP(e,t);return l===((r=d.offset)==null?void 0:r.placement)&&(i=d.arrow)!=null&&i.alignmentOffset?{}:{x:s+p.x,y:o+p.y,data:{...p,placement:l}}}}},sP=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:r,y:i,placement:s}=e,{mainAxis:o=!0,crossAxis:l=!1,limiter:d={fn:I=>{let{x:U,y:H}=I;return{x:U,y:H}}},...p}=is(t,e),h={x:r,y:i},g=await Nh(e,p),b=fa(In(s)),y=Jm(b);let x=h[y],A=h[b];if(o){const I=y==="y"?"top":"left",U=y==="y"?"bottom":"right",H=x+g[I],z=x-g[U];x=Su(H,x,z)}if(l){const I=b==="y"?"top":"left",U=b==="y"?"bottom":"right",H=A+g[I],z=A-g[U];A=Su(H,A,z)}const k=d.fn({...e,[y]:x,[b]:A});return{...k,data:{x:k.x-r,y:k.y-i}}}}},aP=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:r,rects:i,platform:s,elements:o}=e,{apply:l=()=>{},...d}=is(t,e),p=await Nh(e,d),h=In(r),g=ss(r),b=fa(r)==="y",{width:y,height:x}=i.floating;let A,k;h==="top"||h==="bottom"?(A=h,k=g===(await(s.isRTL==null?void 0:s.isRTL(o.floating))?"start":"end")?"left":"right"):(k=h,A=g==="end"?"top":"bottom");const I=x-p[A],U=y-p[k],H=!e.middlewareData.shift;let z=I,V=U;if(b){const ie=y-p.left-p.right;V=g||H?$n(U,ie):ie}else{const ie=x-p.top-p.bottom;z=g||H?$n(I,ie):ie}if(H&&!g){const ie=rr(p.left,0),te=rr(p.right,0),Ae=rr(p.top,0),He=rr(p.bottom,0);b?V=y-2*(ie!==0||te!==0?ie+te:rr(p.left,p.right)):z=x-2*(Ae!==0||He!==0?Ae+He:rr(p.top,p.bottom))}await l({...e,availableWidth:V,availableHeight:z});const j=await s.getDimensions(o.floating);return y!==j.width||x!==j.height?{reset:{rects:!0}}:{}}}};function as(t){return Qm(t)?(t.nodeName||"").toLowerCase():"#document"}function nr(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function pn(t){var e;return(e=(Qm(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Qm(t){return t instanceof Node||t instanceof nr(t).Node}function Gr(t){return t instanceof Element||t instanceof nr(t).Element}function Vr(t){return t instanceof HTMLElement||t instanceof nr(t).HTMLElement}function nm(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof nr(t).ShadowRoot}function ma(t){const{overflow:e,overflowX:r,overflowY:i,display:s}=Nr(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+r)&&!["inline","contents"].includes(s)}function oP(t){return["table","td","th"].includes(as(t))}function Lh(t){const e=Mh(),r=Nr(t);return r.transform!=="none"||r.perspective!=="none"||(r.containerType?r.containerType!=="normal":!1)||!e&&(r.backdropFilter?r.backdropFilter!=="none":!1)||!e&&(r.filter?r.filter!=="none":!1)||["transform","perspective","filter"].some(i=>(r.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(r.contain||"").includes(i))}function lP(t){let e=Rn(t);for(;Vr(e)&&!Ki(e);){if(Lh(e))return e;e=Rn(e)}return null}function Mh(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ki(t){return["html","body","#document"].includes(as(t))}function Nr(t){return nr(t).getComputedStyle(t)}function Tl(t){return Gr(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Rn(t){if(as(t)==="html")return t;const e=t.assignedSlot||t.parentNode||nm(t)&&t.host||pn(t);return nm(e)?e.host:e}function Xm(t){const e=Rn(t);return Ki(e)?t.ownerDocument?t.ownerDocument.body:t.body:Vr(e)&&ma(e)?e:Xm(e)}function ea(t,e,r){var i;e===void 0&&(e=[]),r===void 0&&(r=!0);const s=Xm(t),o=s===((i=t.ownerDocument)==null?void 0:i.body),l=nr(s);return o?e.concat(l,l.visualViewport||[],ma(s)?s:[],l.frameElement&&r?ea(l.frameElement):[]):e.concat(s,ea(s,[],r))}function eg(t){const e=Nr(t);let r=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const s=Vr(t),o=s?t.offsetWidth:r,l=s?t.offsetHeight:i,d=Lo(r)!==o||Lo(i)!==l;return d&&(r=o,i=l),{width:r,height:i,$:d}}function Fh(t){return Gr(t)?t:t.contextElement}function qi(t){const e=Fh(t);if(!Vr(e))return Dn(1);const r=e.getBoundingClientRect(),{width:i,height:s,$:o}=eg(e);let l=(o?Lo(r.width):r.width)/i,d=(o?Lo(r.height):r.height)/s;return(!l||!Number.isFinite(l))&&(l=1),(!d||!Number.isFinite(d))&&(d=1),{x:l,y:d}}const cP=Dn(0);function tg(t){const e=nr(t);return!Mh()||!e.visualViewport?cP:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function uP(t,e,r){return e===void 0&&(e=!1),!r||e&&r!==nr(t)?!1:e}function fi(t,e,r,i){e===void 0&&(e=!1),r===void 0&&(r=!1);const s=t.getBoundingClientRect(),o=Fh(t);let l=Dn(1);e&&(i?Gr(i)&&(l=qi(i)):l=qi(t));const d=uP(o,r,i)?tg(o):Dn(0);let p=(s.left+d.x)/l.x,h=(s.top+d.y)/l.y,g=s.width/l.x,b=s.height/l.y;if(o){const y=nr(o),x=i&&Gr(i)?nr(i):i;let A=y,k=A.frameElement;for(;k&&i&&x!==A;){const I=qi(k),U=k.getBoundingClientRect(),H=Nr(k),z=U.left+(k.clientLeft+parseFloat(H.paddingLeft))*I.x,V=U.top+(k.clientTop+parseFloat(H.paddingTop))*I.y;p*=I.x,h*=I.y,g*=I.x,b*=I.y,p+=z,h+=V,A=nr(k),k=A.frameElement}}return Fo({width:g,height:b,x:p,y:h})}const hP=[":popover-open",":modal"];function Uh(t){return hP.some(e=>{try{return t.matches(e)}catch{return!1}})}function dP(t){let{elements:e,rect:r,offsetParent:i,strategy:s}=t;const o=s==="fixed",l=pn(i),d=e?Uh(e.floating):!1;if(i===l||d&&o)return r;let p={scrollLeft:0,scrollTop:0},h=Dn(1);const g=Dn(0),b=Vr(i);if((b||!b&&!o)&&((as(i)!=="body"||ma(l))&&(p=Tl(i)),Vr(i))){const y=fi(i);h=qi(i),g.x=y.x+i.clientLeft,g.y=y.y+i.clientTop}return{width:r.width*h.x,height:r.height*h.y,x:r.x*h.x-p.scrollLeft*h.x+g.x,y:r.y*h.y-p.scrollTop*h.y+g.y}}function pP(t){return Array.from(t.getClientRects())}function rg(t){return fi(pn(t)).left+Tl(t).scrollLeft}function fP(t){const e=pn(t),r=Tl(t),i=t.ownerDocument.body,s=rr(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),o=rr(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let l=-r.scrollLeft+rg(t);const d=-r.scrollTop;return Nr(i).direction==="rtl"&&(l+=rr(e.clientWidth,i.clientWidth)-s),{width:s,height:o,x:l,y:d}}function mP(t,e){const r=nr(t),i=pn(t),s=r.visualViewport;let o=i.clientWidth,l=i.clientHeight,d=0,p=0;if(s){o=s.width,l=s.height;const h=Mh();(!h||h&&e==="fixed")&&(d=s.offsetLeft,p=s.offsetTop)}return{width:o,height:l,x:d,y:p}}function gP(t,e){const r=fi(t,!0,e==="fixed"),i=r.top+t.clientTop,s=r.left+t.clientLeft,o=Vr(t)?qi(t):Dn(1),l=t.clientWidth*o.x,d=t.clientHeight*o.y,p=s*o.x,h=i*o.y;return{width:l,height:d,x:p,y:h}}function im(t,e,r){let i;if(e==="viewport")i=mP(t,r);else if(e==="document")i=fP(pn(t));else if(Gr(e))i=gP(e,r);else{const s=tg(t);i={...e,x:e.x-s.x,y:e.y-s.y}}return Fo(i)}function ng(t,e){const r=Rn(t);return r===e||!Gr(r)||Ki(r)?!1:Nr(r).position==="fixed"||ng(r,e)}function vP(t,e){const r=e.get(t);if(r)return r;let i=ea(t,[],!1).filter(d=>Gr(d)&&as(d)!=="body"),s=null;const o=Nr(t).position==="fixed";let l=o?Rn(t):t;for(;Gr(l)&&!Ki(l);){const d=Nr(l),p=Lh(l);!p&&d.position==="fixed"&&(s=null),(o?!p&&!s:!p&&d.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||ma(l)&&!p&&ng(t,l))?i=i.filter(g=>g!==l):s=d,l=Rn(l)}return e.set(t,i),i}function bP(t){let{element:e,boundary:r,rootBoundary:i,strategy:s}=t;const l=[...r==="clippingAncestors"?Uh(e)?[]:vP(e,this._c):[].concat(r),i],d=l[0],p=l.reduce((h,g)=>{const b=im(e,g,s);return h.top=rr(b.top,h.top),h.right=$n(b.right,h.right),h.bottom=$n(b.bottom,h.bottom),h.left=rr(b.left,h.left),h},im(e,d,s));return{width:p.right-p.left,height:p.bottom-p.top,x:p.left,y:p.top}}function yP(t){const{width:e,height:r}=eg(t);return{width:e,height:r}}function _P(t,e,r){const i=Vr(e),s=pn(e),o=r==="fixed",l=fi(t,!0,o,e);let d={scrollLeft:0,scrollTop:0};const p=Dn(0);if(i||!i&&!o)if((as(e)!=="body"||ma(s))&&(d=Tl(e)),i){const b=fi(e,!0,o,e);p.x=b.x+e.clientLeft,p.y=b.y+e.clientTop}else s&&(p.x=rg(s));const h=l.left+d.scrollLeft-p.x,g=l.top+d.scrollTop-p.y;return{x:h,y:g,width:l.width,height:l.height}}function uu(t){return Nr(t).position==="static"}function sm(t,e){return!Vr(t)||Nr(t).position==="fixed"?null:e?e(t):t.offsetParent}function ig(t,e){const r=nr(t);if(Uh(t))return r;if(!Vr(t)){let s=Rn(t);for(;s&&!Ki(s);){if(Gr(s)&&!uu(s))return s;s=Rn(s)}return r}let i=sm(t,e);for(;i&&oP(i)&&uu(i);)i=sm(i,e);return i&&Ki(i)&&uu(i)&&!Lh(i)?r:i||lP(t)||r}const wP=async function(t){const e=this.getOffsetParent||ig,r=this.getDimensions,i=await r(t.floating);return{reference:_P(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function SP(t){return Nr(t).direction==="rtl"}const To={convertOffsetParentRelativeRectToViewportRelativeRect:dP,getDocumentElement:pn,getClippingRect:bP,getOffsetParent:ig,getElementRects:wP,getClientRects:pP,getDimensions:yP,getScale:qi,isElement:Gr,isRTL:SP};function xP(t,e){let r=null,i;const s=pn(t);function o(){var d;clearTimeout(i),(d=r)==null||d.disconnect(),r=null}function l(d,p){d===void 0&&(d=!1),p===void 0&&(p=1),o();const{left:h,top:g,width:b,height:y}=t.getBoundingClientRect();if(d||e(),!b||!y)return;const x=yo(g),A=yo(s.clientWidth-(h+b)),k=yo(s.clientHeight-(g+y)),I=yo(h),H={rootMargin:-x+"px "+-A+"px "+-k+"px "+-I+"px",threshold:rr(0,$n(1,p))||1};let z=!0;function V(j){const ie=j[0].intersectionRatio;if(ie!==p){if(!z)return l();ie?l(!1,ie):i=setTimeout(()=>{l(!1,1e-7)},1e3)}z=!1}try{r=new IntersectionObserver(V,{...H,root:s.ownerDocument})}catch{r=new IntersectionObserver(V,H)}r.observe(t)}return l(!0),o}function PP(t,e,r,i){i===void 0&&(i={});const{ancestorScroll:s=!0,ancestorResize:o=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:d=typeof IntersectionObserver=="function",animationFrame:p=!1}=i,h=Fh(t),g=s||o?[...h?ea(h):[],...ea(e)]:[];g.forEach(U=>{s&&U.addEventListener("scroll",r,{passive:!0}),o&&U.addEventListener("resize",r)});const b=h&&d?xP(h,r):null;let y=-1,x=null;l&&(x=new ResizeObserver(U=>{let[H]=U;H&&H.target===h&&x&&(x.unobserve(e),cancelAnimationFrame(y),y=requestAnimationFrame(()=>{var z;(z=x)==null||z.observe(e)})),r()}),h&&!p&&x.observe(h),x.observe(e));let A,k=p?fi(t):null;p&&I();function I(){const U=fi(t);k&&(U.x!==k.x||U.y!==k.y||U.width!==k.width||U.height!==k.height)&&r(),k=U,A=requestAnimationFrame(I)}return r(),()=>{var U;g.forEach(H=>{s&&H.removeEventListener("scroll",r),o&&H.removeEventListener("resize",r)}),b==null||b(),(U=x)==null||U.disconnect(),x=null,p&&cancelAnimationFrame(A)}}const CP=iP,AP=sP,EP=rP,am=aP,TP=tP,OP=(t,e,r)=>{const i=new Map,s={platform:To,...r},o={...s.platform,_c:i};return eP(t,e,{...s,platform:o})};function $P(t){return DP(t)}function hu(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function DP(t){for(let e=t;e;e=hu(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=hu(t);e;e=hu(e)){if(!(e instanceof Element))continue;const r=getComputedStyle(e);if(r.display!=="contents"&&(r.position!=="static"||r.filter!=="none"||e.tagName==="BODY"))return e}return null}function IP(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var Le=class extends et{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),r=this.placement.includes("top")||this.placement.includes("bottom");let i=0,s=0,o=0,l=0,d=0,p=0,h=0,g=0;r?t.top<e.top?(i=t.left,s=t.bottom,o=t.right,l=t.bottom,d=e.left,p=e.top,h=e.right,g=e.top):(i=e.left,s=e.bottom,o=e.right,l=e.bottom,d=t.left,p=t.top,h=t.right,g=t.top):t.left<e.left?(i=t.right,s=t.top,o=e.left,l=e.top,d=t.right,p=t.bottom,h=e.left,g=e.bottom):(i=e.right,s=e.top,o=t.left,l=t.top,d=e.right,p=e.bottom,h=t.left,g=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${o}px`),this.style.setProperty("--hover-bridge-top-right-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${g}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||IP(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=PP(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[CP({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(am({apply:({rects:r})=>{const i=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(EP({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(AP({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(am({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(TP({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?r=>To.getOffsetParent(r,$P):To.getOffsetParent;OP(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:El(Fn({},To),{getOffsetParent:e})}).then(({x:r,y:i,middlewareData:s,placement:o})=>{const l=getComputedStyle(this).direction==="rtl",d={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${r}px`,top:`${i}px`}),this.arrow){const p=s.arrow.x,h=s.arrow.y;let g="",b="",y="",x="";if(this.arrowPlacement==="start"){const A=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",b=l?A:"",x=l?"":A}else if(this.arrowPlacement==="end"){const A=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";b=l?"":A,x=l?A:"",y=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(x=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":"",g=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(x=typeof p=="number"?`${p}px`:"",g=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:g,right:b,bottom:y,left:x,[d]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return O`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Ye({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Ye({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?O`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};Le.styles=[vt,qx];_([Be(".popup")],Le.prototype,"popup",2);_([Be(".popup__arrow")],Le.prototype,"arrowEl",2);_([P()],Le.prototype,"anchor",2);_([P({type:Boolean,reflect:!0})],Le.prototype,"active",2);_([P({reflect:!0})],Le.prototype,"placement",2);_([P({reflect:!0})],Le.prototype,"strategy",2);_([P({type:Number})],Le.prototype,"distance",2);_([P({type:Number})],Le.prototype,"skidding",2);_([P({type:Boolean})],Le.prototype,"arrow",2);_([P({attribute:"arrow-placement"})],Le.prototype,"arrowPlacement",2);_([P({attribute:"arrow-padding",type:Number})],Le.prototype,"arrowPadding",2);_([P({type:Boolean})],Le.prototype,"flip",2);_([P({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],Le.prototype,"flipFallbackPlacements",2);_([P({attribute:"flip-fallback-strategy"})],Le.prototype,"flipFallbackStrategy",2);_([P({type:Object})],Le.prototype,"flipBoundary",2);_([P({attribute:"flip-padding",type:Number})],Le.prototype,"flipPadding",2);_([P({type:Boolean})],Le.prototype,"shift",2);_([P({type:Object})],Le.prototype,"shiftBoundary",2);_([P({attribute:"shift-padding",type:Number})],Le.prototype,"shiftPadding",2);_([P({attribute:"auto-size"})],Le.prototype,"autoSize",2);_([P()],Le.prototype,"sync",2);_([P({type:Object})],Le.prototype,"autoSizeBoundary",2);_([P({attribute:"auto-size-padding",type:Number})],Le.prototype,"autoSizePadding",2);_([P({attribute:"hover-bridge",type:Boolean})],Le.prototype,"hoverBridge",2);var sg=new Map,RP=new WeakMap;function kP(t){return t??{keyframes:[],options:{duration:0}}}function om(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function fn(t,e){sg.set(t,kP(e))}function un(t,e,r){const i=RP.get(t);if(i!=null&&i[e])return om(i[e],r.dir);const s=sg.get(e);return s?om(s,r.dir):{keyframes:[],options:{duration:0}}}function Yi(t,e){return new Promise(r=>{function i(s){s.target===t&&(t.removeEventListener(e,i),r())}t.addEventListener(e,i)})}function hn(t,e,r){return new Promise(i=>{if((r==null?void 0:r.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=t.animate(e,El(Fn({},r),{duration:NP()?0:r.duration}));s.addEventListener("cancel",i,{once:!0}),s.addEventListener("finish",i,{once:!0})})}function lm(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function NP(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Tn(t){return Promise.all(t.getAnimations().map(e=>new Promise(r=>{e.cancel(),requestAnimationFrame(r)})))}const Pu=new Set,LP=new MutationObserver(cg),Vi=new Map;let ag=document.documentElement.dir||"ltr",og=document.documentElement.lang||navigator.language,oi;LP.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function lg(...t){t.map(e=>{const r=e.$code.toLowerCase();Vi.has(r)?Vi.set(r,Object.assign(Object.assign({},Vi.get(r)),e)):Vi.set(r,e),oi||(oi=e)}),cg()}function cg(){ag=document.documentElement.dir||"ltr",og=document.documentElement.lang||navigator.language,[...Pu.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let MP=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Pu.add(this.host)}hostDisconnected(){Pu.delete(this.host)}dir(){return`${this.host.dir||ag}`.toLowerCase()}lang(){return`${this.host.lang||og}`.toLowerCase()}getTranslationData(e){var r,i;const s=new Intl.Locale(e.replace(/_/g,"-")),o=s==null?void 0:s.language.toLowerCase(),l=(i=(r=s==null?void 0:s.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&i!==void 0?i:"",d=Vi.get(`${o}-${l}`),p=Vi.get(o);return{locale:s,language:o,region:l,primary:d,secondary:p}}exists(e,r){var i;const{primary:s,secondary:o}=this.getTranslationData((i=r.lang)!==null&&i!==void 0?i:this.lang());return r=Object.assign({includeFallback:!1},r),!!(s&&s[e]||o&&o[e]||r.includeFallback&&oi&&oi[e])}term(e,...r){const{primary:i,secondary:s}=this.getTranslationData(this.lang());let o;if(i&&i[e])o=i[e];else if(s&&s[e])o=s[e];else if(oi&&oi[e])o=oi[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof o=="function"?o(...r):o}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,r)}};var ug={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};lg(ug);var FP=ug,Ar=class extends MP{};lg(FP);var Ct=class extends et{constructor(){super(),this.localize=new Ar(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=lm(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=lm(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Tn(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:r,options:i}=un(this,"tooltip.show",{dir:this.localize.dir()});await hn(this.popup.popup,r,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Tn(this.body);const{keyframes:r,options:i}=un(this,"tooltip.hide",{dir:this.localize.dir()});await hn(this.popup.popup,r,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Yi(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Yi(this,"sl-after-hide")}render(){return O`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Ye({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};Ct.styles=[vt,jx];Ct.dependencies={"sl-popup":Le};_([Be("slot:not([name])")],Ct.prototype,"defaultSlot",2);_([Be(".tooltip__body")],Ct.prototype,"body",2);_([Be("sl-popup")],Ct.prototype,"popup",2);_([P()],Ct.prototype,"content",2);_([P()],Ct.prototype,"placement",2);_([P({type:Boolean,reflect:!0})],Ct.prototype,"disabled",2);_([P({type:Number})],Ct.prototype,"distance",2);_([P({type:Boolean,reflect:!0})],Ct.prototype,"open",2);_([P({type:Number})],Ct.prototype,"skidding",2);_([P()],Ct.prototype,"trigger",2);_([P({type:Boolean})],Ct.prototype,"hoist",2);_([De("open",{waitUntilFirstUpdate:!0})],Ct.prototype,"handleOpenChange",1);_([De(["content","distance","hoist","placement","skidding"])],Ct.prototype,"handleOptionsChange",1);_([De("disabled")],Ct.prototype,"handleDisabledChange",1);fn("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});fn("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});Ct.define("sl-tooltip");var UP=K`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,Ol=class extends et{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};Ol.styles=[vt,UP];_([P({type:Boolean,reflect:!0})],Ol.prototype,"vertical",2);_([De("vertical")],Ol.prototype,"handleVerticalChange",1);Ol.define("sl-divider");var zP=K`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,yi=class extends et{constructor(){super(...arguments),this.localize=new Ar(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return O`
      <span
        part="base"
        class=${Ye({tag:!0,"tag--primary":this.variant==="primary","tag--success":this.variant==="success","tag--neutral":this.variant==="neutral","tag--warning":this.variant==="warning","tag--danger":this.variant==="danger","tag--text":this.variant==="text","tag--small":this.size==="small","tag--medium":this.size==="medium","tag--large":this.size==="large","tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?O`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};yi.styles=[vt,zP];yi.dependencies={"sl-icon-button":Pt};_([P({reflect:!0})],yi.prototype,"variant",2);_([P({reflect:!0})],yi.prototype,"size",2);_([P({type:Boolean,reflect:!0})],yi.prototype,"pill",2);_([P({type:Boolean})],yi.prototype,"removable",2);var BP=K`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;function HP(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}var Cu=new Set;function GP(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function VP(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function cm(t){if(Cu.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const e=GP()+VP();document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${e}px`)}}function um(t){Cu.delete(t),Cu.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function Au(t,e,r="vertical",i="smooth"){const s=HP(t,e),o=s.top+e.scrollTop,l=s.left+e.scrollLeft,d=e.scrollLeft,p=e.scrollLeft+e.offsetWidth,h=e.scrollTop,g=e.scrollTop+e.offsetHeight;(r==="horizontal"||r==="both")&&(l<d?e.scrollTo({left:l,behavior:i}):l+t.clientWidth>p&&e.scrollTo({left:l-e.offsetWidth+t.clientWidth,behavior:i})),(r==="vertical"||r==="both")&&(o<h?e.scrollTo({top:o,behavior:i}):o+t.clientHeight>g&&e.scrollTo({top:o-e.offsetHeight+t.clientHeight,behavior:i}))}var ga=(t="value")=>(e,r)=>{const i=e.constructor,s=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(o,l,d){var p;const h=i.getPropertyOptions(t),g=typeof h.attribute=="string"?h.attribute:t;if(o===g){const b=h.converter||Wi,x=(typeof b=="function"?b:(p=b==null?void 0:b.fromAttribute)!=null?p:Wi.fromAttribute)(d,h.type);this[t]!==x&&(this[r]=x)}s.call(this,o,l,d)}},va=K`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Ns=new WeakMap,Ls=new WeakMap,Ms=new WeakMap,du=new WeakSet,_o=new WeakMap,os=class{constructor(t,e){this.handleFormData=r=>{const i=this.options.disabled(this.host),s=this.options.name(this.host),o=this.options.value(this.host),l=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!i&&!l&&typeof s=="string"&&s.length>0&&typeof o<"u"&&(Array.isArray(o)?o.forEach(d=>{r.formData.append(s,d.toString())}):r.formData.append(s,o.toString()))},this.handleFormSubmit=r=>{var i;const s=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&((i=Ns.get(this.form))==null||i.forEach(l=>{this.setUserInteracted(l,!0)})),this.form&&!this.form.noValidate&&!s&&!o(this.host)&&(r.preventDefault(),r.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),_o.set(this.host,[])},this.handleInteraction=r=>{const i=_o.get(this.host);i.includes(r.type)||i.push(r.type),i.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const r=this.form.querySelectorAll("*");for(const i of r)if(typeof i.checkValidity=="function"&&!i.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const r=this.form.querySelectorAll("*");for(const i of r)if(typeof i.reportValidity=="function"&&!i.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Fn({form:r=>{const i=r.form;if(i){const o=r.getRootNode().querySelector(`#${i}`);if(o)return o}return r.closest("form")},name:r=>r.name,value:r=>r.value,defaultValue:r=>r.defaultValue,disabled:r=>{var i;return(i=r.disabled)!=null?i:!1},reportValidity:r=>typeof r.reportValidity=="function"?r.reportValidity():!0,checkValidity:r=>typeof r.checkValidity=="function"?r.checkValidity():!0,setValue:(r,i)=>r.value=i,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),_o.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),_o.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Ns.has(this.form)?Ns.get(this.form).add(this.host):Ns.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Ls.has(this.form)||(Ls.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Ms.has(this.form)||(Ms.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=Ns.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Ls.has(this.form)&&(this.form.reportValidity=Ls.get(this.form),Ls.delete(this.form)),Ms.has(this.form)&&(this.form.checkValidity=Ms.get(this.form),Ms.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?du.add(t):du.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const r=document.createElement("button");r.type=t,r.style.position="absolute",r.style.width="0",r.style.height="0",r.style.clipPath="inset(50%)",r.style.overflow="hidden",r.style.whiteSpace="nowrap",e&&(r.name=e.name,r.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(i=>{e.hasAttribute(i)&&r.setAttribute(i,e.getAttribute(i))})),this.form.append(r),r.click(),r.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,r=!!du.has(e),i=!!e.required;e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&r),e.toggleAttribute("data-user-valid",t&&r)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t==null||t.preventDefault()}},zh=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(El(Fn({},zh),{valid:!1,valueMissing:!0}));Object.freeze(El(Fn({},zh),{valid:!1,customError:!0}));var _i=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{const i=r.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Eu=class extends ns{constructor(e){if(super(e),this.it=ze,e.type!==Rr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ze||e==null)return this._t=void 0,this.it=e;if(e===qt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Eu.directiveName="unsafeHTML",Eu.resultType=1;const jP=rs(Eu);var Ce=class extends et{constructor(){super(...arguments),this.formControlController=new os(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new _i(this,"help-text","label"),this.localize=new Ar(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this.value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>O`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,r=e.closest(".select__clear")!==null,i=e.closest("sl-icon-button")!==null;if(!(r||i)){if(t.key==="Escape"&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const s=this.getAllOptions(),o=s.indexOf(this.currentOption);let l=Math.max(0,o);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(l=o+1,l>s.length-1&&(l=0)):t.key==="ArrowUp"?(l=o-1,l<0&&(l=s.length-1)):t.key==="Home"?l=0:t.key==="End"&&(l=s.length-1),this.setCurrentOption(s[l])}if(t.key.length===1||t.key==="Backspace"){const s=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const o of s)if(o.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(o);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),(t=this.closeWatcher)==null||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const r=t.composedPath().some(i=>i instanceof Element&&i.tagName.toLowerCase()==="sl-icon-button");this.disabled||r||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.key!=="Tab"&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.value!==""&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const r=t.target.closest("sl-option"),i=this.value;r&&!r.disabled&&(this.multiple?this.toggleOptionSelection(r):this.setSelectedOptions(r),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==i&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],r=[];customElements.get("sl-option")?(t.forEach(i=>r.push(i.value)),this.setSelectedOptions(t.filter(i=>e.includes(i.value)))):customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange())}handleTagRemove(t,e){t.stopPropagation(),this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(r=>{r.current=!1,r.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),r=Array.isArray(t)?t:[t];e.forEach(i=>i.selected=!1),r.length&&r.forEach(i=>i.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){var t,e,r,i;this.selectedOptions=this.getAllOptions().filter(s=>s.selected),this.multiple?(this.value=this.selectedOptions.map(s=>s.value),this.placeholder&&this.value.length===0?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length)):(this.value=(e=(t=this.selectedOptions[0])==null?void 0:t.value)!=null?e:"",this.displayLabel=(i=(r=this.selectedOptions[0])==null?void 0:r.getTextLabel())!=null?i:""),this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const r=this.getTag(t,e);return O`<div @sl-remove=${i=>this.handleTagRemove(i,t)}>
          ${typeof r=="string"?jP(r):r}
        </div>`}else if(e===this.maxOptionsVisible)return O`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`;return O``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(r=>e.includes(r.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Tn(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=un(this,"select.show",{dir:this.localize.dir()});await hn(this.popup.popup,t,e),this.currentOption&&Au(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Tn(this);const{keyframes:t,options:e}=un(this,"select.hide",{dir:this.localize.dir()});await hn(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Yi(this,"sl-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Yi(this,"sl-after-hide")}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e,s=this.clearable&&!this.disabled&&this.value.length>0,o=this.placeholder&&this.value.length===0;return O`
      <div
        part="form-control"
        class=${Ye({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${r?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${Ye({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":o,"select--top":this.placement==="top","select--bottom":this.placement==="bottom","select--small":this.size==="small","select--medium":this.size==="medium","select--large":this.size==="large"})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?O`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${s?O`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Ce.styles=[vt,va,BP];Ce.dependencies={"sl-icon":Ut,"sl-popup":Le,"sl-tag":yi};_([Be(".select")],Ce.prototype,"popup",2);_([Be(".select__combobox")],Ce.prototype,"combobox",2);_([Be(".select__display-input")],Ce.prototype,"displayInput",2);_([Be(".select__value-input")],Ce.prototype,"valueInput",2);_([Be(".select__listbox")],Ce.prototype,"listbox",2);_([ae()],Ce.prototype,"hasFocus",2);_([ae()],Ce.prototype,"displayLabel",2);_([ae()],Ce.prototype,"currentOption",2);_([ae()],Ce.prototype,"selectedOptions",2);_([P()],Ce.prototype,"name",2);_([P({converter:{fromAttribute:t=>t.split(" "),toAttribute:t=>t.join(" ")}})],Ce.prototype,"value",2);_([ga()],Ce.prototype,"defaultValue",2);_([P({reflect:!0})],Ce.prototype,"size",2);_([P()],Ce.prototype,"placeholder",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"multiple",2);_([P({attribute:"max-options-visible",type:Number})],Ce.prototype,"maxOptionsVisible",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"disabled",2);_([P({type:Boolean})],Ce.prototype,"clearable",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"open",2);_([P({type:Boolean})],Ce.prototype,"hoist",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"filled",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"pill",2);_([P()],Ce.prototype,"label",2);_([P({reflect:!0})],Ce.prototype,"placement",2);_([P({attribute:"help-text"})],Ce.prototype,"helpText",2);_([P({reflect:!0})],Ce.prototype,"form",2);_([P({type:Boolean,reflect:!0})],Ce.prototype,"required",2);_([P()],Ce.prototype,"getTag",2);_([De("disabled",{waitUntilFirstUpdate:!0})],Ce.prototype,"handleDisabledChange",1);_([De("value",{waitUntilFirstUpdate:!0})],Ce.prototype,"handleValueChange",1);_([De("open",{waitUntilFirstUpdate:!0})],Ce.prototype,"handleOpenChange",1);fn("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});fn("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});Ce.define("sl-select");var qP=K`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,Er=class extends et{constructor(){super(...arguments),this.localize=new Ar(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){const t=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=t;return}t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){typeof this.value!="string"&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(r=>{r.nodeType===Node.ELEMENT_NODE&&(r.hasAttribute("slot")||(e+=r.textContent)),r.nodeType===Node.TEXT_NODE&&(e+=r.textContent)}),e.trim()}render(){return O`
      <div
        part="base"
        class=${Ye({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Er.styles=[vt,qP];Er.dependencies={"sl-icon":Ut};_([Be(".option__label")],Er.prototype,"defaultSlot",2);_([ae()],Er.prototype,"current",2);_([ae()],Er.prototype,"selected",2);_([ae()],Er.prototype,"hasHover",2);_([P({reflect:!0})],Er.prototype,"value",2);_([P({type:Boolean,reflect:!0})],Er.prototype,"disabled",2);_([De("disabled")],Er.prototype,"handleDisabledChange",1);_([De("selected")],Er.prototype,"handleSelectedChange",1);_([De("value")],Er.prototype,"handleValueChange",1);Er.define("sl-option");var WP=K`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Bh=class extends et{constructor(){super(...arguments),this.localize=new Ar(this)}render(){return O`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Bh.styles=[vt,WP];var KP=K`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button[checked]]) {
    z-index: 2;
  }
`,Ie=class extends et{constructor(){super(...arguments),this.formControlController=new os(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new _i(this,"[default]","prefix","suffix"),this.localize=new Ar(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:zh}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?No`a`:No`button`;return Eo`
      <${e}
        part="base"
        class=${Ye({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${he(t?void 0:this.disabled)}
        type=${he(t?void 0:this.type)}
        title=${this.title}
        name=${he(t?void 0:this.name)}
        value=${he(t?void 0:this.value)}
        href=${he(t?this.href:void 0)}
        target=${he(t?this.target:void 0)}
        download=${he(t?this.download:void 0)}
        rel=${he(t?this.rel:void 0)}
        role=${he(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Eo` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Eo`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};Ie.styles=[vt,KP];Ie.dependencies={"sl-icon":Ut,"sl-spinner":Bh};_([Be(".button")],Ie.prototype,"button",2);_([ae()],Ie.prototype,"hasFocus",2);_([ae()],Ie.prototype,"invalid",2);_([P()],Ie.prototype,"title",2);_([P({reflect:!0})],Ie.prototype,"variant",2);_([P({reflect:!0})],Ie.prototype,"size",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"caret",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"disabled",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"loading",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"outline",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"pill",2);_([P({type:Boolean,reflect:!0})],Ie.prototype,"circle",2);_([P()],Ie.prototype,"type",2);_([P()],Ie.prototype,"name",2);_([P()],Ie.prototype,"value",2);_([P()],Ie.prototype,"href",2);_([P()],Ie.prototype,"target",2);_([P()],Ie.prototype,"rel",2);_([P()],Ie.prototype,"download",2);_([P()],Ie.prototype,"form",2);_([P({attribute:"formaction"})],Ie.prototype,"formAction",2);_([P({attribute:"formenctype"})],Ie.prototype,"formEnctype",2);_([P({attribute:"formmethod"})],Ie.prototype,"formMethod",2);_([P({attribute:"formnovalidate",type:Boolean})],Ie.prototype,"formNoValidate",2);_([P({attribute:"formtarget"})],Ie.prototype,"formTarget",2);_([De("disabled",{waitUntilFirstUpdate:!0})],Ie.prototype,"handleDisabledChange",1);Ie.define("sl-button");Bh.define("sl-spinner");var hm=new WeakMap;function hg(t){let e=hm.get(t);return e||(e=window.getComputedStyle(t,null),hm.set(t,e)),e}function YP(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=hg(t);return e.visibility!=="hidden"&&e.display!=="none"}function JP(t){const e=hg(t),{overflowY:r,overflowX:i}=e;return r==="scroll"||i==="scroll"?!0:r!=="auto"||i!=="auto"?!1:t.scrollHeight>t.clientHeight&&r==="auto"||t.scrollWidth>t.clientWidth&&i==="auto"}function ZP(t){const e=t.tagName.toLowerCase(),r=Number(t.getAttribute("tabindex"));return t.hasAttribute("tabindex")&&(isNaN(r)||r<=-1)||t.hasAttribute("disabled")||t.closest("[inert]")||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||!YP(t)?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:JP(t)}function QP(t,e){var r;return((r=t.getRootNode({composed:!0}))==null?void 0:r.host)!==e}function dm(t){const e=new WeakMap,r=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,!0),!r.includes(s)&&ZP(s)&&r.push(s),s instanceof HTMLSlotElement&&QP(s,t)&&s.assignedElements({flatten:!0}).forEach(o=>{i(o)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const o of s.children)i(o)}return i(t),r.sort((s,o)=>{const l=Number(s.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-l})}function*Hh(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*kx(Hh(t.shadowRoot.activeElement))))}function XP(){return[...Hh()].pop()}var Fs=[],eC=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{var r;if(e.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=XP();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=dm(this.element);let o=s.findIndex(d=>d===i);this.previousFocus=this.currentFocus;const l=this.tabDirection==="forward"?1:-1;for(;;){o+l>=s.length?o=0:o+l<0?o=s.length-1:o+=l,this.previousFocus=this.currentFocus;const d=s[o];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||d&&this.possiblyHasTabbableChildren(d))return;e.preventDefault(),this.currentFocus=d,(r=this.currentFocus)==null||r.focus({preventScroll:!1});const p=[...Hh()];if(p.includes(this.currentFocus)||!p.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){Fs.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Fs=Fs.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Fs[Fs.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=dm(this.element);if(!this.element.matches(":focus-within")){const e=t[0],r=t[t.length-1],i=this.tabDirection==="forward"?e:r;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}},tC=K`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,qr=class extends et{constructor(){super(...arguments),this.hasSlotController=new _i(this,"footer"),this.localize=new Ar(this),this.modal=new eC(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),cm(this))}disconnectedCallback(){var t;super.disconnectedCallback(),this.modal.deactivate(),um(this),(t=this.closeWatcher)==null||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const r=un(this,"dialog.denyClose",{dir:this.localize.dir()});hn(this.panel,r.keyframes,r.options);return}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),cm(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Tn(this.dialog),Tn(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=un(this,"dialog.show",{dir:this.localize.dir()}),r=un(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([hn(this.panel,e.keyframes,e.options),hn(this.overlay,r.keyframes,r.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Tn(this.dialog),Tn(this.overlay)]);const t=un(this,"dialog.hide",{dir:this.localize.dir()}),e=un(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([hn(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),hn(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,um(this);const r=this.originalTrigger;typeof(r==null?void 0:r.focus)=="function"&&setTimeout(()=>r.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Yi(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Yi(this,"sl-after-hide")}render(){return O`
      <div
        part="base"
        class=${Ye({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${he(this.noHeader?this.label:void 0)}
          aria-labelledby=${he(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":O`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};qr.styles=[vt,tC];qr.dependencies={"sl-icon-button":Pt};_([Be(".dialog")],qr.prototype,"dialog",2);_([Be(".dialog__panel")],qr.prototype,"panel",2);_([Be(".dialog__overlay")],qr.prototype,"overlay",2);_([P({type:Boolean,reflect:!0})],qr.prototype,"open",2);_([P({reflect:!0})],qr.prototype,"label",2);_([P({attribute:"no-header",type:Boolean,reflect:!0})],qr.prototype,"noHeader",2);_([De("open",{waitUntilFirstUpdate:!0})],qr.prototype,"handleOpenChange",1);fn("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});fn("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});fn("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});fn("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});fn("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});qr.define("sl-dialog");var rC=K`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ta=rs(class extends ns{constructor(t){if(super(t),t.type!==Rr.PROPERTY&&t.type!==Rr.ATTRIBUTE&&t.type!==Rr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Wm(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===qt||e===ze)return e;const r=t.element,i=t.name;if(t.type===Rr.PROPERTY){if(e===r[i])return qt}else if(t.type===Rr.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(i))return qt}else if(t.type===Rr.ATTRIBUTE&&r.getAttribute(i)===e+"")return qt;return Km(t),e}});var tt=class extends et{constructor(){super(...arguments),this.formControlController=new os(this),this.hasSlotController=new _i(this,"help-text","label"),this.localize=new Ar(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",`${t*100}%`)}syncTooltip(t){if(this.output!==null){const e=this.input.offsetWidth,r=this.output.offsetWidth,i=getComputedStyle(this.input).getPropertyValue("--thumb-size"),s=this.localize.dir()==="rtl",o=e*t;if(s){const l=`${e-o}px + ${t} * ${i}`;this.output.style.translate=`calc((${l} - ${r/2}px - ${i} / 2))`}else{const l=`${o}px - ${t} * ${i}`;this.output.style.translate=`calc(${l} - ${r/2}px + ${i} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),this.tooltip!=="none"&&this.syncTooltip(t)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e;return O`
      <div
        part="form-control"
        class=${Ye({"form-control":!0,"form-control--medium":!0,"form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ye({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":this.localize.dir()==="rtl","range--tooltip-visible":this.hasTooltip,"range--tooltip-top":this.tooltip==="top","range--tooltip-bottom":this.tooltip==="bottom"})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${he(this.name)}
              ?disabled=${this.disabled}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${ta(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${this.tooltip!=="none"&&!this.disabled?O`
                  <output part="tooltip" class="range__tooltip">
                    ${typeof this.tooltipFormatter=="function"?this.tooltipFormatter(this.value):this.value}
                  </output>
                `:""}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};tt.styles=[vt,va,rC];_([Be(".range__control")],tt.prototype,"input",2);_([Be(".range__tooltip")],tt.prototype,"output",2);_([ae()],tt.prototype,"hasFocus",2);_([ae()],tt.prototype,"hasTooltip",2);_([P()],tt.prototype,"title",2);_([P()],tt.prototype,"name",2);_([P({type:Number})],tt.prototype,"value",2);_([P()],tt.prototype,"label",2);_([P({attribute:"help-text"})],tt.prototype,"helpText",2);_([P({type:Boolean,reflect:!0})],tt.prototype,"disabled",2);_([P({type:Number})],tt.prototype,"min",2);_([P({type:Number})],tt.prototype,"max",2);_([P({type:Number})],tt.prototype,"step",2);_([P()],tt.prototype,"tooltip",2);_([P({attribute:!1})],tt.prototype,"tooltipFormatter",2);_([P({reflect:!0})],tt.prototype,"form",2);_([ga()],tt.prototype,"defaultValue",2);_([Mx({passive:!0})],tt.prototype,"handleThumbDragStart",1);_([De("value",{waitUntilFirstUpdate:!0})],tt.prototype,"handleValueChange",1);_([De("disabled",{waitUntilFirstUpdate:!0})],tt.prototype,"handleDisabledChange",1);_([De("hasTooltip",{waitUntilFirstUpdate:!0})],tt.prototype,"syncRange",1);tt.define("sl-range");var nC=K`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,yt=class extends et{constructor(){super(...arguments),this.formControlController=new os(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new _i(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return O`
      <div
        class=${Ye({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${Ye({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":this.size==="small","checkbox--medium":this.size==="medium","checkbox--large":this.size==="large"})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${he(this.value)}
            .indeterminate=${ta(this.indeterminate)}
            .checked=${ta(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?O`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?O`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};yt.styles=[vt,va,nC];yt.dependencies={"sl-icon":Ut};_([Be('input[type="checkbox"]')],yt.prototype,"input",2);_([ae()],yt.prototype,"hasFocus",2);_([P()],yt.prototype,"title",2);_([P()],yt.prototype,"name",2);_([P()],yt.prototype,"value",2);_([P({reflect:!0})],yt.prototype,"size",2);_([P({type:Boolean,reflect:!0})],yt.prototype,"disabled",2);_([P({type:Boolean,reflect:!0})],yt.prototype,"checked",2);_([P({type:Boolean,reflect:!0})],yt.prototype,"indeterminate",2);_([ga("checked")],yt.prototype,"defaultChecked",2);_([P({reflect:!0})],yt.prototype,"form",2);_([P({type:Boolean,reflect:!0})],yt.prototype,"required",2);_([P({attribute:"help-text"})],yt.prototype,"helpText",2);_([De("disabled",{waitUntilFirstUpdate:!0})],yt.prototype,"handleDisabledChange",1);_([De(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],yt.prototype,"handleStateChange",1);yt.define("sl-checkbox");var iC=K`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,ve=class extends et{constructor(){super(...arguments),this.formControlController=new os(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new _i(this,"help-text","label"),this.localize=new Ar(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((t=this.input)==null?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,((t=this.input)==null?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;t.key==="Enter"&&!e&&setTimeout(()=>{!t.defaultPrevented&&!t.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,i="preserve"){const s=e??this.input.selectionStart,o=r??this.input.selectionEnd;this.input.setRangeText(t,s,o,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),r=this.label?!0:!!t,i=this.helpText?!0:!!e,o=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return O`
      <div
        part="form-control"
        class=${Ye({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":r,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${r?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Ye({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${he(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${he(this.placeholder)}
              minlength=${he(this.minlength)}
              maxlength=${he(this.maxlength)}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${ta(this.value)}
              autocapitalize=${he(this.autocapitalize)}
              autocomplete=${he(this.autocomplete)}
              autocorrect=${he(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${he(this.pattern)}
              enterkeyhint=${he(this.enterkeyhint)}
              inputmode=${he(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${o?O`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?O`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?O`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:O`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ve.styles=[vt,va,iC];ve.dependencies={"sl-icon":Ut};_([Be(".input__control")],ve.prototype,"input",2);_([ae()],ve.prototype,"hasFocus",2);_([P()],ve.prototype,"title",2);_([P({reflect:!0})],ve.prototype,"type",2);_([P()],ve.prototype,"name",2);_([P()],ve.prototype,"value",2);_([ga()],ve.prototype,"defaultValue",2);_([P({reflect:!0})],ve.prototype,"size",2);_([P({type:Boolean,reflect:!0})],ve.prototype,"filled",2);_([P({type:Boolean,reflect:!0})],ve.prototype,"pill",2);_([P()],ve.prototype,"label",2);_([P({attribute:"help-text"})],ve.prototype,"helpText",2);_([P({type:Boolean})],ve.prototype,"clearable",2);_([P({type:Boolean,reflect:!0})],ve.prototype,"disabled",2);_([P()],ve.prototype,"placeholder",2);_([P({type:Boolean,reflect:!0})],ve.prototype,"readonly",2);_([P({attribute:"password-toggle",type:Boolean})],ve.prototype,"passwordToggle",2);_([P({attribute:"password-visible",type:Boolean})],ve.prototype,"passwordVisible",2);_([P({attribute:"no-spin-buttons",type:Boolean})],ve.prototype,"noSpinButtons",2);_([P({reflect:!0})],ve.prototype,"form",2);_([P({type:Boolean,reflect:!0})],ve.prototype,"required",2);_([P()],ve.prototype,"pattern",2);_([P({type:Number})],ve.prototype,"minlength",2);_([P({type:Number})],ve.prototype,"maxlength",2);_([P()],ve.prototype,"min",2);_([P()],ve.prototype,"max",2);_([P()],ve.prototype,"step",2);_([P()],ve.prototype,"autocapitalize",2);_([P()],ve.prototype,"autocorrect",2);_([P()],ve.prototype,"autocomplete",2);_([P({type:Boolean})],ve.prototype,"autofocus",2);_([P()],ve.prototype,"enterkeyhint",2);_([P({type:Boolean,converter:{fromAttribute:t=>!(!t||t==="false"),toAttribute:t=>t?"true":"false"}})],ve.prototype,"spellcheck",2);_([P()],ve.prototype,"inputmode",2);_([De("disabled",{waitUntilFirstUpdate:!0})],ve.prototype,"handleDisabledChange",1);_([De("step",{waitUntilFirstUpdate:!0})],ve.prototype,"handleStepChange",1);_([De("value",{waitUntilFirstUpdate:!0})],ve.prototype,"handleValueChange",1);ve.define("sl-input");Ut.define("sl-icon");var sC=K`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,or=class extends et{constructor(){super(...arguments),this.localize=new Ar(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){const t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(r=>!["aria-labelledby","aria-controls"].includes(r.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(r=>r.attributeName==="disabled")&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((r,i)=>{var s;r[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab((s=this.getActiveTab())!=null?s:this.tabs[0],{emitEvents:!1}),i.unobserve(r[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(t={includeDisabled:!0}){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(r=>t.includeDisabled?r.tagName.toLowerCase()==="sl-tab":r.tagName.toLowerCase()==="sl-tab"&&!r.disabled)}getAllPanels(){return[...this.body.assignedElements()].filter(t=>t.tagName.toLowerCase()==="sl-tab-panel")}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const r=t.target.closest("sl-tab");(r==null?void 0:r.closest("sl-tab-group"))===this&&r!==null&&this.setActiveTab(r,{scrollBehavior:"smooth"})}handleKeyDown(t){const r=t.target.closest("sl-tab");if((r==null?void 0:r.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&r!==null&&(this.setActiveTab(r,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const s=this.tabs.find(l=>l.matches(":focus")),o=this.localize.dir()==="rtl";if((s==null?void 0:s.tagName.toLowerCase())==="sl-tab"){let l=this.tabs.indexOf(s);t.key==="Home"?l=0:t.key==="End"?l=this.tabs.length-1:["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&t.key==="ArrowUp"?l--:(["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&t.key==="ArrowDown")&&l++,l<0&&(l=this.tabs.length-1),l>this.tabs.length-1&&(l=0),this.tabs[l].focus({preventScroll:!0}),this.activation==="auto"&&this.setActiveTab(this.tabs[l],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&Au(this.tabs[l],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.localize.dir()==="rtl"?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=Fn({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const r=this.activeTab;this.activeTab=t,this.tabs.forEach(i=>i.active=i===this.activeTab),this.panels.forEach(i=>{var s;return i.active=i.name===((s=this.activeTab)==null?void 0:s.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Au(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&this.emit("sl-tab-hide",{detail:{name:r.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(r=>r.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,r=t.clientHeight,i=this.localize.dir()==="rtl",s=this.getAllTabs(),l=s.slice(0,s.indexOf(t)).reduce((d,p)=>({left:d.left+p.clientWidth,top:d.top+p.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=i?`${-1*l.left}px`:`${l.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.translate=`0 ${l.top}px`;break}}syncTabsAndPanels(){this.tabs=this.getAllTabs({includeDisabled:!1}),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find(r=>r.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t=this.localize.dir()==="rtl";return O`
      <div
        part="base"
        class=${Ye({"tab-group":!0,"tab-group--top":this.placement==="top","tab-group--bottom":this.placement==="bottom","tab-group--start":this.placement==="start","tab-group--end":this.placement==="end","tab-group--rtl":this.localize.dir()==="rtl","tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?O`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?O`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};or.styles=[vt,sC];or.dependencies={"sl-icon-button":Pt};_([Be(".tab-group")],or.prototype,"tabGroup",2);_([Be(".tab-group__body")],or.prototype,"body",2);_([Be(".tab-group__nav")],or.prototype,"nav",2);_([Be(".tab-group__indicator")],or.prototype,"indicator",2);_([ae()],or.prototype,"hasScrollControls",2);_([P()],or.prototype,"placement",2);_([P()],or.prototype,"activation",2);_([P({attribute:"no-scroll-controls",type:Boolean})],or.prototype,"noScrollControls",2);_([De("noScrollControls",{waitUntilFirstUpdate:!0})],or.prototype,"updateScrollControls",1);_([De("placement",{waitUntilFirstUpdate:!0})],or.prototype,"syncIndicator",1);or.define("sl-tab-group");var aC=K`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,oC=0,Wr=class extends et{constructor(){super(...arguments),this.localize=new Ar(this),this.attrId=++oC,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}render(){return this.id=this.id.length>0?this.id:this.componentId,O`
      <div
        part="base"
        class=${Ye({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        tabindex=${this.disabled?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?O`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Wr.styles=[vt,aC];Wr.dependencies={"sl-icon-button":Pt};_([Be(".tab")],Wr.prototype,"tab",2);_([P({reflect:!0})],Wr.prototype,"panel",2);_([P({type:Boolean,reflect:!0})],Wr.prototype,"active",2);_([P({type:Boolean})],Wr.prototype,"closable",2);_([P({type:Boolean,reflect:!0})],Wr.prototype,"disabled",2);_([De("active")],Wr.prototype,"handleActiveChange",1);_([De("disabled")],Wr.prototype,"handleDisabledChange",1);Wr.define("sl-tab");var lC=K`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,cC=0,ba=class extends et{constructor(){super(...arguments),this.attrId=++cC,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return O`
      <slot
        part="base"
        class=${Ye({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};ba.styles=[vt,lC];_([P({reflect:!0})],ba.prototype,"name",2);_([P({type:Boolean,reflect:!0})],ba.prototype,"active",2);_([De("active")],ba.prototype,"handleActiveChange",1);ba.define("sl-tab-panel");var uC=K`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dg="important",hC=" !"+dg,dC=rs(class extends ns{constructor(t){var e;if(super(t),t.type!==Rr.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return i==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(const i in e){const s=e[i];if(s!=null){this.ft.add(i);const o=typeof s=="string"&&s.endsWith(hC);i.includes("-")||o?r.setProperty(i,o?s.slice(0,-11):s,o?dg:""):r[i]=s}}return qt}});var ya=class extends et{constructor(){super(...arguments),this.localize=new Ar(this),this.value=0,this.indeterminate=!1,this.label=""}render(){return O`
      <div
        part="base"
        class=${Ye({"progress-bar":!0,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":this.localize.dir()==="rtl"})}
        role="progressbar"
        title=${he(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${dC({width:`${this.value}%`})}>
          ${this.indeterminate?"":O` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};ya.styles=[vt,uC];_([P({type:Number,reflect:!0})],ya.prototype,"value",2);_([P({type:Boolean,reflect:!0})],ya.prototype,"indeterminate",2);_([P()],ya.prototype,"label",2);ya.define("sl-progress-bar");var pC=K`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,Dt=class extends et{constructor(){super(...arguments),this.formControlController=new os(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new _i(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?!0:!!t;return O`
      <div
        class=${Ye({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${Ye({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":this.size==="small","switch--medium":this.size==="medium","switch--large":this.size==="large"})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${he(this.value)}
            .checked=${ta(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Dt.styles=[vt,va,pC];_([Be('input[type="checkbox"]')],Dt.prototype,"input",2);_([ae()],Dt.prototype,"hasFocus",2);_([P()],Dt.prototype,"title",2);_([P()],Dt.prototype,"name",2);_([P()],Dt.prototype,"value",2);_([P({reflect:!0})],Dt.prototype,"size",2);_([P({type:Boolean,reflect:!0})],Dt.prototype,"disabled",2);_([P({type:Boolean,reflect:!0})],Dt.prototype,"checked",2);_([ga("checked")],Dt.prototype,"defaultChecked",2);_([P({reflect:!0})],Dt.prototype,"form",2);_([P({type:Boolean,reflect:!0})],Dt.prototype,"required",2);_([P({attribute:"help-text"})],Dt.prototype,"helpText",2);_([De("checked",{waitUntilFirstUpdate:!0})],Dt.prototype,"handleCheckedChange",1);_([De("disabled",{waitUntilFirstUpdate:!0})],Dt.prototype,"handleDisabledChange",1);Dt.define("sl-switch");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ws=(t,e)=>{var i;const r=t._$AN;if(r===void 0)return!1;for(const s of r)(i=s._$AO)==null||i.call(s,e,!1),Ws(s,e);return!0},Uo=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while((r==null?void 0:r.size)===0)},pg=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),gC(e)}};function fC(t){this._$AN!==void 0?(Uo(this),this._$AM=t,pg(this)):this._$AM=t}function mC(t,e=!1,r=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(i))for(let o=r;o<i.length;o++)Ws(i[o],!1),Uo(i[o]);else i!=null&&(Ws(i,!1),Uo(i));else Ws(this,t)}const gC=t=>{t.type==Rr.CHILD&&(t._$AP??(t._$AP=mC),t._$AQ??(t._$AQ=fC))};class vC extends ns{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,i){super._$AT(e,r,i),pg(this),this.isConnected=e._$AU}_$AO(e,r=!0){var i,s;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),r&&(Ws(this,e),Uo(this))}setValue(e){if(Wm(this._$Ct))this._$Ct._$AI(e,this);else{const r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je=()=>new bC;class bC{}const pu=new WeakMap,qe=rs(class extends vC{render(t){return ze}update(t,[e]){var i;const r=e!==this.Y;return r&&this.Y!==void 0&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.Y=e,this.ht=(i=t.options)==null?void 0:i.host,this.rt(this.ct=t.element)),ze}rt(t){if(typeof this.Y=="function"){const e=this.ht??globalThis;let r=pu.get(e);r===void 0&&(r=new WeakMap,pu.set(e,r)),r.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),r.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=pu.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class ee extends ji{render(){var e;return(e=this.controller)==null||e.startRendering(),this.renderContent()}updated(e){var r;super.updated(e),(r=this.controller)==null||r.stopRendering()}}const pl=class pl extends Event{constructor(e,r,i){super(pl.type,{bubbles:!0,composed:!0}),this.gameAlert=e,this.messageParams=r,this.gameAlertKey=i}};pl.type="confirmation-alert-open";let sr=pl;const fl=class fl extends Event{constructor(e,r){super(fl.type,{bubbles:!0,composed:!0}),this.gameAlert=e,this.gameAlertKey=r}};fl.type="confirmation-alert-close";let mi=fl;const ml=class ml extends Event{constructor(e,r){super(ml.type,{bubbles:!0,composed:!0}),this.gameAlert=e,this.gameAlertKey=r}};ml.type="confirmation-alert-submit";let ht=ml;var xr="named",fg="name",Gh="unmanaged",mg="optional",$l="inject",ra="multi_inject",gg="inversify:tagged",vg="inversify:tagged_props",Tu="inversify:paramtypes",yC="design:paramtypes",pm="post_construct",Ou="pre_destroy";function _C(){return[$l,ra,fg,Gh,xr,mg]}var fm=_C(),lt={Request:"Request",Singleton:"Singleton",Transient:"Transient"},We={ConstantValue:"ConstantValue",Constructor:"Constructor",DynamicValue:"DynamicValue",Factory:"Factory",Function:"Function",Instance:"Instance",Invalid:"Invalid",Provider:"Provider"},_a={ClassProperty:"ClassProperty",ConstructorArgument:"ConstructorArgument",Variable:"Variable"},wC=0;function wa(){return wC++}var SC=function(){function t(e,r){this.id=wa(),this.activated=!1,this.serviceIdentifier=e,this.scope=r,this.type=We.Invalid,this.constraint=function(i){return!0},this.implementationType=null,this.cache=null,this.factory=null,this.provider=null,this.onActivation=null,this.onDeactivation=null,this.dynamicValue=null}return t.prototype.clone=function(){var e=new t(this.serviceIdentifier,this.scope);return e.activated=e.scope===lt.Singleton?this.activated:!1,e.implementationType=this.implementationType,e.dynamicValue=this.dynamicValue,e.scope=this.scope,e.type=this.type,e.factory=this.factory,e.provider=this.provider,e.constraint=this.constraint,e.onActivation=this.onActivation,e.onDeactivation=this.onDeactivation,e.cache=this.cache,e},t}(),xC="Cannot apply @injectable decorator multiple times.",bg="Metadata key was used more than once in a parameter:",Us="NULL argument",mm="Key Not Found",PC="Ambiguous match found for serviceIdentifier:",CC="Could not unbind serviceIdentifier:",AC="No matching bindings found for serviceIdentifier:",yg="Missing required @injectable annotation in:",EC="Missing required @inject or @multiInject annotation in:",TC=function(t){return"@inject called with undefined this could mean that the class "+t+" has a circular dependency problem. You can use a LazyServiceIdentifier to  overcome this limitation."},OC="Circular dependency found:",$C="Invalid binding type:",DC="No snapshot available to restore.",IC="Invalid return type in middleware. Middleware must return!",RC="Value provided to function binding must be a function!",kC=function(t){return"You are attempting to construct '"+t+`' in a synchronous way
 but it has asynchronous dependencies.`},NC="The toSelf function can only be applied when a constructor is used as service identifier",_g="The @inject @multiInject @tagged and @named decorators must be applied to the parameters of a class constructor or a class property.",LC=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return"The number of constructor arguments in the derived class "+(t[0]+" must be >= than the number of constructor arguments of its base class.")},MC="Invalid Container constructor argument. Container options must be an object.",FC='Invalid Container option. Default scope must be a string ("singleton" or "transient").',UC="Invalid Container option. Auto bind injectable must be a boolean",zC="Invalid Container option. Skip base check must be a boolean",BC="Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)",HC=function(t,e){return"@postConstruct error in class "+t+": "+e},GC=function(t,e){return"@preDestroy error in class "+t+": "+e},$u=function(t,e){return"onDeactivation() error in class "+t+": "+e},VC=function(t,e){return"It looks like there is a circular dependency in one of the '"+t+"' bindings. Please investigate bindings with "+("service identifier '"+e+"'.")},jC="Maximum call stack size exceeded",qC=function(){function t(){}return t.prototype.getConstructorMetadata=function(e){var r=Reflect.getMetadata(Tu,e),i=Reflect.getMetadata(gg,e);return{compilerGeneratedMetadata:r,userGeneratedMetadata:i||{}}},t.prototype.getPropertiesMetadata=function(e){var r=Reflect.getMetadata(vg,e)||[];return r},t}(),Oo={MultipleBindingsAvailable:2,NoBindingsAvailable:0,OnlyOneBindingAvailable:1};function wg(t){return t instanceof RangeError||t.message===jC}var WC=function(t,e){try{return t()}catch(r){throw wg(r)&&(r=e()),r}};function na(t){if(typeof t=="function"){var e=t;return e.name}else{if(typeof t=="symbol")return t.toString();var e=t;return e}}function gm(t,e,r){var i="",s=r(t,e);return s.length!==0&&(i=`
Registered bindings:`,s.forEach(function(o){var l="Object";o.implementationType!==null&&(l=Dl(o.implementationType)),i=i+`
 `+l,o.constraint.metaData&&(i=i+" - "+o.constraint.metaData)})),i}function Sg(t,e){return t.parentRequest===null?!1:t.parentRequest.serviceIdentifier===e?!0:Sg(t.parentRequest,e)}function KC(t){function e(i,s){s===void 0&&(s=[]);var o=na(i.serviceIdentifier);return s.push(o),i.parentRequest!==null?e(i.parentRequest,s):s}var r=e(t);return r.reverse().join(" --> ")}function xg(t){t.childRequests.forEach(function(e){if(Sg(e,e.serviceIdentifier)){var r=KC(e);throw new Error(OC+" "+r)}else xg(e)})}function YC(t,e){if(e.isTagged()||e.isNamed()){var r="",i=e.getNamedTag(),s=e.getCustomTags();return i!==null&&(r+=i.toString()+`
`),s!==null&&s.forEach(function(o){r+=o.toString()+`
`})," "+t+`
 `+t+" - "+r}else return" "+t}function Dl(t){if(t.name)return t.name;var e=t.toString(),r=e.match(/^function\s*([^\s(]+)/);return r?r[1]:"Anonymous function: "+e}function JC(t){return t.toString().slice(7,-1)}var Pg=function(){function t(e){this.id=wa(),this.container=e}return t.prototype.addPlan=function(e){this.plan=e},t.prototype.setCurrentRequest=function(e){this.currentRequest=e},t}(),gi=function(){function t(e,r){this.key=e,this.value=r}return t.prototype.toString=function(){return this.key===xr?"named: "+String(this.value).toString()+" ":"tagged: { key:"+this.key.toString()+", value: "+String(this.value)+" }"},t}(),ZC=function(){function t(e,r){this.parentContext=e,this.rootRequest=r}return t}(),QC=function(){function t(e){this._cb=e}return t.prototype.unwrap=function(){return this._cb()},t}(),XC=function(){function t(e){this.str=e}return t.prototype.startsWith=function(e){return this.str.indexOf(e)===0},t.prototype.endsWith=function(e){var r="",i=e.split("").reverse().join("");return r=this.str.split("").reverse().join(""),this.startsWith.call({str:r},i)},t.prototype.contains=function(e){return this.str.indexOf(e)!==-1},t.prototype.equals=function(e){return this.str===e},t.prototype.value=function(){return this.str},t}(),Il=function(){function t(e,r,i,s){this.id=wa(),this.type=e,this.serviceIdentifier=i;var o=typeof r=="symbol"?JC(r):r;this.name=new XC(o||""),this.identifier=r,this.metadata=new Array;var l=null;typeof s=="string"?l=new gi(xr,s):s instanceof gi&&(l=s),l!==null&&this.metadata.push(l)}return t.prototype.hasTag=function(e){for(var r=0,i=this.metadata;r<i.length;r++){var s=i[r];if(s.key===e)return!0}return!1},t.prototype.isArray=function(){return this.hasTag(ra)},t.prototype.matchesArray=function(e){return this.matchesTag(ra)(e)},t.prototype.isNamed=function(){return this.hasTag(xr)},t.prototype.isTagged=function(){return this.metadata.some(function(e){return fm.every(function(r){return e.key!==r})})},t.prototype.isOptional=function(){return this.matchesTag(mg)(!0)},t.prototype.getNamedTag=function(){return this.isNamed()?this.metadata.filter(function(e){return e.key===xr})[0]:null},t.prototype.getCustomTags=function(){return this.isTagged()?this.metadata.filter(function(e){return fm.every(function(r){return e.key!==r})}):null},t.prototype.matchesNamedTag=function(e){return this.matchesTag(xr)(e)},t.prototype.matchesTag=function(e){var r=this;return function(i){for(var s=0,o=r.metadata;s<o.length;s++){var l=o[s];if(l.key===e&&l.value===i)return!0}return!1}},t}(),zo=function(t,e,r){if(r||arguments.length===2)for(var i=0,s=e.length,o;i<s;i++)(o||!(i in e))&&(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))};function eA(t,e){var r=Dl(e);return Cg(t,r,e,!1)}function Cg(t,e,r,i){var s=t.getConstructorMetadata(r),o=s.compilerGeneratedMetadata;if(o===void 0){var l=yg+" "+e+".";throw new Error(l)}var d=s.userGeneratedMetadata,p=Object.keys(d),h=r.length===0&&p.length>0,g=p.length>r.length,b=h||g?p.length:r.length,y=rA(i,e,o,d,b),x=Ag(t,r,e),A=zo(zo([],y,!0),x,!0);return A}function tA(t,e,r,i,s){var o=s[t.toString()]||[],l=Tg(o),d=l.unmanaged!==!0,p=i[t],h=l.inject||l.multiInject;if(p=h||p,p instanceof QC&&(p=p.unwrap()),d){var g=p===Object,b=p===Function,y=p===void 0,x=g||b||y;if(!e&&x){var A=EC+" argument "+t+" in class "+r+".";throw new Error(A)}var k=new Il(_a.ConstructorArgument,l.targetName,p);return k.metadata=o,k}return null}function rA(t,e,r,i,s){for(var o=[],l=0;l<s;l++){var d=l,p=tA(d,t,e,r,i);p!==null&&o.push(p)}return o}function nA(t,e,r,i){var s=t||e;if(s===void 0){var o=yg+" for property "+String(r)+" in class "+i+".";throw new Error(o)}return s}function Ag(t,e,r){for(var i=t.getPropertiesMetadata(e),s=[],o=Object.getOwnPropertySymbols(i),l=Object.keys(i),d=l.concat(o),p=0,h=d;p<h.length;p++){var g=h[p],b=i[g],y=Tg(b),x=y.targetName||g,A=nA(y.inject,y.multiInject,g,r),k=new Il(_a.ClassProperty,x,A);k.metadata=b,s.push(k)}var I=Object.getPrototypeOf(e.prototype).constructor;if(I!==Object){var U=Ag(t,I,r);s=zo(zo([],s,!0),U,!0)}return s}function Eg(t,e){var r=Object.getPrototypeOf(e.prototype).constructor;if(r!==Object){var i=Dl(r),s=Cg(t,i,r,!0),o=s.map(function(p){return p.metadata.filter(function(h){return h.key===Gh})}),l=[].concat.apply([],o).length,d=s.length-l;return d>0?d:Eg(t,r)}else return 0}function Tg(t){var e={};return t.forEach(function(r){e[r.key.toString()]=r.value}),{inject:e[$l],multiInject:e[ra],targetName:e[fg],unmanaged:e[Gh]}}var Vh=function(){function t(e,r,i,s,o){this.id=wa(),this.serviceIdentifier=e,this.parentContext=r,this.parentRequest=i,this.target=o,this.childRequests=[],this.bindings=Array.isArray(s)?s:[s],this.requestScope=i===null?new Map:null}return t.prototype.addChildRequest=function(e,r,i){var s=new t(e,this.parentContext,this,r,i);return this.childRequests.push(s),s},t}();function Bo(t){return t._bindingDictionary}function iA(t,e,r,i,s,o){var l=t?ra:$l,d=new gi(l,r),p=new Il(e,i,r,d);if(s!==void 0){var h=new gi(s,o);p.metadata.push(h)}return p}function vm(t,e,r,i,s){var o=ia(r.container,s.serviceIdentifier),l=[];return o.length===Oo.NoBindingsAvailable&&r.container.options.autoBindInjectable&&typeof s.serviceIdentifier=="function"&&t.getConstructorMetadata(s.serviceIdentifier).compilerGeneratedMetadata&&(r.container.bind(s.serviceIdentifier).toSelf(),o=ia(r.container,s.serviceIdentifier)),e?l=o:l=o.filter(function(d){var p=new Vh(d.serviceIdentifier,r,i,d,s);return d.constraint(p)}),sA(s.serviceIdentifier,l,s,r.container),l}function sA(t,e,r,i){switch(e.length){case Oo.NoBindingsAvailable:if(r.isOptional())return e;var s=na(t),o=AC;throw o+=YC(s,r),o+=gm(i,s,ia),new Error(o);case Oo.OnlyOneBindingAvailable:return e;case Oo.MultipleBindingsAvailable:default:if(r.isArray())return e;var s=na(t),o=PC+" "+s;throw o+=gm(i,s,ia),new Error(o)}}function Og(t,e,r,i,s,o){var l,d;if(s===null){l=vm(t,e,i,null,o),d=new Vh(r,i,null,l,o);var p=new ZC(i,d);i.addPlan(p)}else l=vm(t,e,i,s,o),d=s.addChildRequest(o.serviceIdentifier,l,o);l.forEach(function(h){var g=null;if(o.isArray())g=d.addChildRequest(h.serviceIdentifier,h,o);else{if(h.cache)return;g=d}if(h.type===We.Instance&&h.implementationType!==null){var b=eA(t,h.implementationType);if(!i.container.options.skipBaseClassChecks){var y=Eg(t,h.implementationType);if(b.length<y){var x=LC(Dl(h.implementationType));throw new Error(x)}}b.forEach(function(A){Og(t,!1,A.serviceIdentifier,i,g,A)})}})}function ia(t,e){var r=[],i=Bo(t);return i.hasKey(e)?r=i.get(e):t.parent!==null&&(r=ia(t.parent,e)),r}function aA(t,e,r,i,s,o,l,d){d===void 0&&(d=!1);var p=new Pg(e),h=iA(r,i,s,"",o,l);try{return Og(t,d,s,p,null,h),p}catch(g){throw wg(g)&&xg(p.plan.rootRequest),g}}function oA(t,e,r,i){var s=new Il(_a.Variable,"",e,new gi(r,i)),o=new Pg(t),l=new Vh(e,o,null,[],s);return l}function jt(t){var e=typeof t=="object"&&t!==null||typeof t=="function";return e&&typeof t.then=="function"}function $g(t){return jt(t)?!0:Array.isArray(t)&&t.some(jt)}var lA=function(t,e,r,i){function s(o){return o instanceof r?o:new r(function(l){l(o)})}return new(r||(r=Promise))(function(o,l){function d(g){try{h(i.next(g))}catch(b){l(b)}}function p(g){try{h(i.throw(g))}catch(b){l(b)}}function h(g){g.done?o(g.value):s(g.value).then(d,p)}h((i=i.apply(t,e||[])).next())})},cA=function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},i,s,o,l;return l={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function d(h){return function(g){return p([h,g])}}function p(h){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,s&&(o=h[0]&2?s.return:h[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,h[1])).done)return o;switch(s=0,o&&(h=[h[0]&2,o.value]),h[0]){case 0:case 1:o=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,s=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(h[0]===6||h[0]===2)){r=0;continue}if(h[0]===3&&(!o||h[1]>o[0]&&h[1]<o[3])){r.label=h[1];break}if(h[0]===6&&r.label<o[1]){r.label=o[1],o=h;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(h);break}o[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(g){h=[6,g],s=0}finally{i=o=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}},uA=function(t,e){return e.scope===lt.Singleton&&e.activated?e.cache:e.scope===lt.Request&&t.has(e.id)?t.get(e.id):null},hA=function(t,e,r){e.scope===lt.Singleton&&pA(e,r),e.scope===lt.Request&&dA(t,e,r)},dA=function(t,e,r){t.has(e.id)||t.set(e.id,r)},pA=function(t,e){t.cache=e,t.activated=!0,jt(e)&&fA(t,e)},fA=function(t,e){return lA(void 0,void 0,void 0,function(){var r,i;return cA(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,e];case 1:return r=s.sent(),t.cache=r,[3,3];case 2:throw i=s.sent(),t.cache=null,t.activated=!1,i;case 3:return[2]}})})},Ks;(function(t){t.DynamicValue="toDynamicValue",t.Factory="toFactory",t.Provider="toProvider"})(Ks||(Ks={}));var mA=function(t){var e=null;switch(t.type){case We.ConstantValue:case We.Function:e=t.cache;break;case We.Constructor:case We.Instance:e=t.implementationType;break;case We.DynamicValue:e=t.dynamicValue;break;case We.Provider:e=t.provider;break;case We.Factory:e=t.factory;break}if(e===null){var r=na(t.serviceIdentifier);throw new Error($C+" "+r)}},gA=function(t){switch(t.type){case We.Factory:return{factory:t.factory,factoryType:Ks.Factory};case We.Provider:return{factory:t.provider,factoryType:Ks.Provider};case We.DynamicValue:return{factory:t.dynamicValue,factoryType:Ks.DynamicValue};default:throw new Error("Unexpected factory type "+t.type)}},Ji=function(){return Ji=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++){e=arguments[r];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},Ji.apply(this,arguments)},Dg=function(t,e,r,i){function s(o){return o instanceof r?o:new r(function(l){l(o)})}return new(r||(r=Promise))(function(o,l){function d(g){try{h(i.next(g))}catch(b){l(b)}}function p(g){try{h(i.throw(g))}catch(b){l(b)}}function h(g){g.done?o(g.value):s(g.value).then(d,p)}h((i=i.apply(t,e||[])).next())})},Ig=function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},i,s,o,l;return l={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function d(h){return function(g){return p([h,g])}}function p(h){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,s&&(o=h[0]&2?s.return:h[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,h[1])).done)return o;switch(s=0,o&&(h=[h[0]&2,o.value]),h[0]){case 0:case 1:o=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,s=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(h[0]===6||h[0]===2)){r=0;continue}if(h[0]===3&&(!o||h[1]>o[0]&&h[1]<o[3])){r.label=h[1];break}if(h[0]===6&&r.label<o[1]){r.label=o[1],o=h;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(h);break}o[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(g){h=[6,g],s=0}finally{i=o=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}},vA=function(t,e,r){if(r||arguments.length===2)for(var i=0,s=e.length,o;i<s;i++)(o||!(i in e))&&(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))};function bA(t,e){return t.reduce(function(r,i){var s=e(i),o=i.target.type;return o===_a.ConstructorArgument?r.constructorInjections.push(s):(r.propertyRequests.push(i),r.propertyInjections.push(s)),r.isAsync||(r.isAsync=$g(s)),r},{constructorInjections:[],propertyInjections:[],propertyRequests:[],isAsync:!1})}function yA(t,e,r){var i;if(e.length>0){var s=bA(e,r),o=Ji(Ji({},s),{constr:t});s.isAsync?i=_A(o):i=Rg(o)}else i=new t;return i}function Rg(t){var e,r=new((e=t.constr).bind.apply(e,vA([void 0],t.constructorInjections,!1)));return t.propertyRequests.forEach(function(i,s){var o=i.target.identifier,l=t.propertyInjections[s];(!i.target.isOptional()||l!==void 0)&&(r[o]=l)}),r}function _A(t){return Dg(this,void 0,void 0,function(){var e,r;return Ig(this,function(i){switch(i.label){case 0:return[4,bm(t.constructorInjections)];case 1:return e=i.sent(),[4,bm(t.propertyInjections)];case 2:return r=i.sent(),[2,Rg(Ji(Ji({},t),{constructorInjections:e,propertyInjections:r}))]}})})}function bm(t){return Dg(this,void 0,void 0,function(){var e,r,i,s;return Ig(this,function(o){for(e=[],r=0,i=t;r<i.length;r++)s=i[r],Array.isArray(s)?e.push(Promise.all(s)):e.push(s);return[2,Promise.all(e)]})})}function ym(t,e){var r=wA(t,e);return jt(r)?r.then(function(){return e}):e}function wA(t,e){var r,i;if(Reflect.hasMetadata(pm,t)){var s=Reflect.getMetadata(pm,t);try{return(i=(r=e)[s.value])===null||i===void 0?void 0:i.call(r)}catch(o){if(o instanceof Error)throw new Error(HC(t.name,o.message))}}}function SA(t,e){t.scope!==lt.Singleton&&xA(t,e)}function xA(t,e){var r="Class cannot be instantiated in "+(t.scope===lt.Request?"request":"transient")+" scope.";if(typeof t.onDeactivation=="function")throw new Error($u(e.name,r));if(Reflect.hasMetadata(Ou,e))throw new Error(GC(e.name,r))}function PA(t,e,r,i){SA(t,e);var s=yA(e,r,i);return jt(s)?s.then(function(o){return ym(e,o)}):ym(e,s)}var CA=function(t,e,r,i){function s(o){return o instanceof r?o:new r(function(l){l(o)})}return new(r||(r=Promise))(function(o,l){function d(g){try{h(i.next(g))}catch(b){l(b)}}function p(g){try{h(i.throw(g))}catch(b){l(b)}}function h(g){g.done?o(g.value):s(g.value).then(d,p)}h((i=i.apply(t,e||[])).next())})},AA=function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},i,s,o,l;return l={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function d(h){return function(g){return p([h,g])}}function p(h){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,s&&(o=h[0]&2?s.return:h[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,h[1])).done)return o;switch(s=0,o&&(h=[h[0]&2,o.value]),h[0]){case 0:case 1:o=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,s=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(h[0]===6||h[0]===2)){r=0;continue}if(h[0]===3&&(!o||h[1]>o[0]&&h[1]<o[3])){r.label=h[1];break}if(h[0]===6&&r.label<o[1]){r.label=o[1],o=h;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(h);break}o[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(g){h=[6,g],s=0}finally{i=o=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}},jh=function(t){return function(e){e.parentContext.setCurrentRequest(e);var r=e.bindings,i=e.childRequests,s=e.target&&e.target.isArray(),o=!e.parentRequest||!e.parentRequest.target||!e.target||!e.parentRequest.target.matchesArray(e.target.serviceIdentifier);if(s&&o)return i.map(function(d){var p=jh(t);return p(d)});if(e.target.isOptional()&&r.length===0)return;var l=r[0];return $A(t,e,l)}},EA=function(t,e){var r=gA(t);return WC(function(){return r.factory.bind(t)(e)},function(){return new Error(VC(r.factoryType,e.currentRequest.serviceIdentifier.toString()))})},TA=function(t,e,r){var i,s=e.childRequests;switch(mA(r),r.type){case We.ConstantValue:case We.Function:i=r.cache;break;case We.Constructor:i=r.implementationType;break;case We.Instance:i=PA(r,r.implementationType,s,jh(t));break;default:i=EA(r,e.parentContext)}return i},OA=function(t,e,r){var i=uA(t,e);return i!==null||(i=r(),hA(t,e,i)),i},$A=function(t,e,r){return OA(t,r,function(){var i=TA(t,e,r);return jt(i)?i=i.then(function(s){return _m(e,r,s)}):i=_m(e,r,i),i})};function _m(t,e,r){var i=DA(t.parentContext,e,r),s=kA(t.parentContext.container),o,l=s.next();do{o=l.value;var d=t.parentContext,p=t.serviceIdentifier,h=RA(o,p);jt(i)?i=kg(h,d,i):i=IA(h,d,i),l=s.next()}while(l.done!==!0&&!Bo(o).hasKey(t.serviceIdentifier));return i}var DA=function(t,e,r){var i;return typeof e.onActivation=="function"?i=e.onActivation(t,r):i=r,i},IA=function(t,e,r){for(var i=t.next();!i.done;){if(r=i.value(e,r),jt(r))return kg(t,e,r);i=t.next()}return r},kg=function(t,e,r){return CA(void 0,void 0,void 0,function(){var i,s;return AA(this,function(o){switch(o.label){case 0:return[4,r];case 1:i=o.sent(),s=t.next(),o.label=2;case 2:return s.done?[3,4]:[4,s.value(e,i)];case 3:return i=o.sent(),s=t.next(),[3,2];case 4:return[2,i]}})})},RA=function(t,e){var r=t._activations;return r.hasKey(e)?r.get(e).values():[].values()},kA=function(t){for(var e=[t],r=t.parent;r!==null;)e.push(r),r=r.parent;var i=function(){var o=e.pop();return o!==void 0?{done:!1,value:o}:{done:!0,value:void 0}},s={next:i};return s};function NA(t){var e=jh(t.plan.rootRequest.requestScope);return e(t.plan.rootRequest)}var on=function(t,e){var r=t.parentRequest;return r!==null?e(r)?!0:on(r,e):!1},Gs=function(t){return function(e){var r=function(i){return i!==null&&i.target!==null&&i.target.matchesTag(t)(e)};return r.metaData=new gi(t,e),r}},wo=Gs(xr),fu=function(t){return function(e){var r=null;if(e!==null)if(r=e.bindings[0],typeof t=="string"){var i=r.serviceIdentifier;return i===t}else{var s=e.bindings[0].implementationType;return t===s}return!1}},Ho=function(){function t(e){this._binding=e}return t.prototype.when=function(e){return this._binding.constraint=e,new xt(this._binding)},t.prototype.whenTargetNamed=function(e){return this._binding.constraint=wo(e),new xt(this._binding)},t.prototype.whenTargetIsDefault=function(){return this._binding.constraint=function(e){if(e===null)return!1;var r=e.target!==null&&!e.target.isNamed()&&!e.target.isTagged();return r},new xt(this._binding)},t.prototype.whenTargetTagged=function(e,r){return this._binding.constraint=Gs(e)(r),new xt(this._binding)},t.prototype.whenInjectedInto=function(e){return this._binding.constraint=function(r){return r!==null&&fu(e)(r.parentRequest)},new xt(this._binding)},t.prototype.whenParentNamed=function(e){return this._binding.constraint=function(r){return r!==null&&wo(e)(r.parentRequest)},new xt(this._binding)},t.prototype.whenParentTagged=function(e,r){return this._binding.constraint=function(i){return i!==null&&Gs(e)(r)(i.parentRequest)},new xt(this._binding)},t.prototype.whenAnyAncestorIs=function(e){return this._binding.constraint=function(r){return r!==null&&on(r,fu(e))},new xt(this._binding)},t.prototype.whenNoAncestorIs=function(e){return this._binding.constraint=function(r){return r!==null&&!on(r,fu(e))},new xt(this._binding)},t.prototype.whenAnyAncestorNamed=function(e){return this._binding.constraint=function(r){return r!==null&&on(r,wo(e))},new xt(this._binding)},t.prototype.whenNoAncestorNamed=function(e){return this._binding.constraint=function(r){return r!==null&&!on(r,wo(e))},new xt(this._binding)},t.prototype.whenAnyAncestorTagged=function(e,r){return this._binding.constraint=function(i){return i!==null&&on(i,Gs(e)(r))},new xt(this._binding)},t.prototype.whenNoAncestorTagged=function(e,r){return this._binding.constraint=function(i){return i!==null&&!on(i,Gs(e)(r))},new xt(this._binding)},t.prototype.whenAnyAncestorMatches=function(e){return this._binding.constraint=function(r){return r!==null&&on(r,e)},new xt(this._binding)},t.prototype.whenNoAncestorMatches=function(e){return this._binding.constraint=function(r){return r!==null&&!on(r,e)},new xt(this._binding)},t}(),xt=function(){function t(e){this._binding=e}return t.prototype.onActivation=function(e){return this._binding.onActivation=e,new Ho(this._binding)},t.prototype.onDeactivation=function(e){return this._binding.onDeactivation=e,new Ho(this._binding)},t}(),ln=function(){function t(e){this._binding=e,this._bindingWhenSyntax=new Ho(this._binding),this._bindingOnSyntax=new xt(this._binding)}return t.prototype.when=function(e){return this._bindingWhenSyntax.when(e)},t.prototype.whenTargetNamed=function(e){return this._bindingWhenSyntax.whenTargetNamed(e)},t.prototype.whenTargetIsDefault=function(){return this._bindingWhenSyntax.whenTargetIsDefault()},t.prototype.whenTargetTagged=function(e,r){return this._bindingWhenSyntax.whenTargetTagged(e,r)},t.prototype.whenInjectedInto=function(e){return this._bindingWhenSyntax.whenInjectedInto(e)},t.prototype.whenParentNamed=function(e){return this._bindingWhenSyntax.whenParentNamed(e)},t.prototype.whenParentTagged=function(e,r){return this._bindingWhenSyntax.whenParentTagged(e,r)},t.prototype.whenAnyAncestorIs=function(e){return this._bindingWhenSyntax.whenAnyAncestorIs(e)},t.prototype.whenNoAncestorIs=function(e){return this._bindingWhenSyntax.whenNoAncestorIs(e)},t.prototype.whenAnyAncestorNamed=function(e){return this._bindingWhenSyntax.whenAnyAncestorNamed(e)},t.prototype.whenAnyAncestorTagged=function(e,r){return this._bindingWhenSyntax.whenAnyAncestorTagged(e,r)},t.prototype.whenNoAncestorNamed=function(e){return this._bindingWhenSyntax.whenNoAncestorNamed(e)},t.prototype.whenNoAncestorTagged=function(e,r){return this._bindingWhenSyntax.whenNoAncestorTagged(e,r)},t.prototype.whenAnyAncestorMatches=function(e){return this._bindingWhenSyntax.whenAnyAncestorMatches(e)},t.prototype.whenNoAncestorMatches=function(e){return this._bindingWhenSyntax.whenNoAncestorMatches(e)},t.prototype.onActivation=function(e){return this._bindingOnSyntax.onActivation(e)},t.prototype.onDeactivation=function(e){return this._bindingOnSyntax.onDeactivation(e)},t}(),LA=function(){function t(e){this._binding=e}return t.prototype.inRequestScope=function(){return this._binding.scope=lt.Request,new ln(this._binding)},t.prototype.inSingletonScope=function(){return this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.inTransientScope=function(){return this._binding.scope=lt.Transient,new ln(this._binding)},t}(),wm=function(){function t(e){this._binding=e,this._bindingWhenSyntax=new Ho(this._binding),this._bindingOnSyntax=new xt(this._binding),this._bindingInSyntax=new LA(e)}return t.prototype.inRequestScope=function(){return this._bindingInSyntax.inRequestScope()},t.prototype.inSingletonScope=function(){return this._bindingInSyntax.inSingletonScope()},t.prototype.inTransientScope=function(){return this._bindingInSyntax.inTransientScope()},t.prototype.when=function(e){return this._bindingWhenSyntax.when(e)},t.prototype.whenTargetNamed=function(e){return this._bindingWhenSyntax.whenTargetNamed(e)},t.prototype.whenTargetIsDefault=function(){return this._bindingWhenSyntax.whenTargetIsDefault()},t.prototype.whenTargetTagged=function(e,r){return this._bindingWhenSyntax.whenTargetTagged(e,r)},t.prototype.whenInjectedInto=function(e){return this._bindingWhenSyntax.whenInjectedInto(e)},t.prototype.whenParentNamed=function(e){return this._bindingWhenSyntax.whenParentNamed(e)},t.prototype.whenParentTagged=function(e,r){return this._bindingWhenSyntax.whenParentTagged(e,r)},t.prototype.whenAnyAncestorIs=function(e){return this._bindingWhenSyntax.whenAnyAncestorIs(e)},t.prototype.whenNoAncestorIs=function(e){return this._bindingWhenSyntax.whenNoAncestorIs(e)},t.prototype.whenAnyAncestorNamed=function(e){return this._bindingWhenSyntax.whenAnyAncestorNamed(e)},t.prototype.whenAnyAncestorTagged=function(e,r){return this._bindingWhenSyntax.whenAnyAncestorTagged(e,r)},t.prototype.whenNoAncestorNamed=function(e){return this._bindingWhenSyntax.whenNoAncestorNamed(e)},t.prototype.whenNoAncestorTagged=function(e,r){return this._bindingWhenSyntax.whenNoAncestorTagged(e,r)},t.prototype.whenAnyAncestorMatches=function(e){return this._bindingWhenSyntax.whenAnyAncestorMatches(e)},t.prototype.whenNoAncestorMatches=function(e){return this._bindingWhenSyntax.whenNoAncestorMatches(e)},t.prototype.onActivation=function(e){return this._bindingOnSyntax.onActivation(e)},t.prototype.onDeactivation=function(e){return this._bindingOnSyntax.onDeactivation(e)},t}(),MA=function(){function t(e){this._binding=e}return t.prototype.to=function(e){return this._binding.type=We.Instance,this._binding.implementationType=e,new wm(this._binding)},t.prototype.toSelf=function(){if(typeof this._binding.serviceIdentifier!="function")throw new Error(""+NC);var e=this._binding.serviceIdentifier;return this.to(e)},t.prototype.toConstantValue=function(e){return this._binding.type=We.ConstantValue,this._binding.cache=e,this._binding.dynamicValue=null,this._binding.implementationType=null,this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.toDynamicValue=function(e){return this._binding.type=We.DynamicValue,this._binding.cache=null,this._binding.dynamicValue=e,this._binding.implementationType=null,new wm(this._binding)},t.prototype.toConstructor=function(e){return this._binding.type=We.Constructor,this._binding.implementationType=e,this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.toFactory=function(e){return this._binding.type=We.Factory,this._binding.factory=e,this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.toFunction=function(e){if(typeof e!="function")throw new Error(RC);var r=this.toConstantValue(e);return this._binding.type=We.Function,this._binding.scope=lt.Singleton,r},t.prototype.toAutoFactory=function(e){return this._binding.type=We.Factory,this._binding.factory=function(r){var i=function(){return r.container.get(e)};return i},this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.toAutoNamedFactory=function(e){return this._binding.type=We.Factory,this._binding.factory=function(r){return function(i){return r.container.getNamed(e,i)}},new ln(this._binding)},t.prototype.toProvider=function(e){return this._binding.type=We.Provider,this._binding.provider=e,this._binding.scope=lt.Singleton,new ln(this._binding)},t.prototype.toService=function(e){this.toDynamicValue(function(r){return r.container.get(e)})},t}(),FA=function(){function t(){}return t.of=function(e,r,i,s,o){var l=new t;return l.bindings=e,l.middleware=r,l.deactivations=s,l.activations=i,l.moduleActivationStore=o,l},t}();function UA(t){return typeof t=="object"&&t!==null&&"clone"in t&&typeof t.clone=="function"}var li=function(){function t(){this._map=new Map}return t.prototype.getMap=function(){return this._map},t.prototype.add=function(e,r){if(e==null)throw new Error(Us);if(r==null)throw new Error(Us);var i=this._map.get(e);i!==void 0?i.push(r):this._map.set(e,[r])},t.prototype.get=function(e){if(e==null)throw new Error(Us);var r=this._map.get(e);if(r!==void 0)return r;throw new Error(mm)},t.prototype.remove=function(e){if(e==null)throw new Error(Us);if(!this._map.delete(e))throw new Error(mm)},t.prototype.removeIntersection=function(e){var r=this;this.traverse(function(i,s){var o=e.hasKey(i)?e.get(i):void 0;if(o!==void 0){var l=s.filter(function(d){return!o.some(function(p){return d===p})});r._setValue(i,l)}})},t.prototype.removeByCondition=function(e){var r=this,i=[];return this._map.forEach(function(s,o){for(var l=[],d=0,p=s;d<p.length;d++){var h=p[d],g=e(h);g?i.push(h):l.push(h)}r._setValue(o,l)}),i},t.prototype.hasKey=function(e){if(e==null)throw new Error(Us);return this._map.has(e)},t.prototype.clone=function(){var e=new t;return this._map.forEach(function(r,i){r.forEach(function(s){return e.add(i,UA(s)?s.clone():s)})}),e},t.prototype.traverse=function(e){this._map.forEach(function(r,i){e(i,r)})},t.prototype._setValue=function(e,r){r.length>0?this._map.set(e,r):this._map.delete(e)},t}(),zA=function(){function t(){this._map=new Map}return t.prototype.remove=function(e){if(this._map.has(e)){var r=this._map.get(e);return this._map.delete(e),r}return this._getEmptyHandlersStore()},t.prototype.addDeactivation=function(e,r,i){this._getModuleActivationHandlers(e).onDeactivations.add(r,i)},t.prototype.addActivation=function(e,r,i){this._getModuleActivationHandlers(e).onActivations.add(r,i)},t.prototype.clone=function(){var e=new t;return this._map.forEach(function(r,i){e._map.set(i,{onActivations:r.onActivations.clone(),onDeactivations:r.onDeactivations.clone()})}),e},t.prototype._getModuleActivationHandlers=function(e){var r=this._map.get(e);return r===void 0&&(r=this._getEmptyHandlersStore(),this._map.set(e,r)),r},t.prototype._getEmptyHandlersStore=function(){var e={onActivations:new li,onDeactivations:new li};return e},t}(),Go=function(){return Go=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++){e=arguments[r];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},Go.apply(this,arguments)},yr=function(t,e,r,i){function s(o){return o instanceof r?o:new r(function(l){l(o)})}return new(r||(r=Promise))(function(o,l){function d(g){try{h(i.next(g))}catch(b){l(b)}}function p(g){try{h(i.throw(g))}catch(b){l(b)}}function h(g){g.done?o(g.value):s(g.value).then(d,p)}h((i=i.apply(t,e||[])).next())})},_r=function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},i,s,o,l;return l={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function d(h){return function(g){return p([h,g])}}function p(h){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,s&&(o=h[0]&2?s.return:h[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,h[1])).done)return o;switch(s=0,o&&(h=[h[0]&2,o.value]),h[0]){case 0:case 1:o=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,s=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(h[0]===6||h[0]===2)){r=0;continue}if(h[0]===3&&(!o||h[1]>o[0]&&h[1]<o[3])){r.label=h[1];break}if(h[0]===6&&r.label<o[1]){r.label=o[1],o=h;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(h);break}o[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(g){h=[6,g],s=0}finally{i=o=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}},BA=function(t,e,r){if(r||arguments.length===2)for(var i=0,s=e.length,o;i<s;i++)(o||!(i in e))&&(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))},HA=function(){function t(e){var r=e||{};if(typeof r!="object")throw new Error(""+MC);if(r.defaultScope===void 0)r.defaultScope=lt.Transient;else if(r.defaultScope!==lt.Singleton&&r.defaultScope!==lt.Transient&&r.defaultScope!==lt.Request)throw new Error(""+FC);if(r.autoBindInjectable===void 0)r.autoBindInjectable=!1;else if(typeof r.autoBindInjectable!="boolean")throw new Error(""+UC);if(r.skipBaseClassChecks===void 0)r.skipBaseClassChecks=!1;else if(typeof r.skipBaseClassChecks!="boolean")throw new Error(""+zC);this.options={autoBindInjectable:r.autoBindInjectable,defaultScope:r.defaultScope,skipBaseClassChecks:r.skipBaseClassChecks},this.id=wa(),this._bindingDictionary=new li,this._snapshots=[],this._middleware=null,this._activations=new li,this._deactivations=new li,this.parent=null,this._metadataReader=new qC,this._moduleActivationStore=new zA}return t.merge=function(e,r){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];var o=new t,l=BA([e,r],i,!0).map(function(h){return Bo(h)}),d=Bo(o);function p(h,g){h.traverse(function(b,y){y.forEach(function(x){g.add(x.serviceIdentifier,x.clone())})})}return l.forEach(function(h){p(h,d)}),o},t.prototype.load=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var i=this._getContainerModuleHelpersFactory(),s=0,o=e;s<o.length;s++){var l=o[s],d=i(l.id);l.registry(d.bindFunction,d.unbindFunction,d.isboundFunction,d.rebindFunction,d.unbindAsyncFunction,d.onActivationFunction,d.onDeactivationFunction)}},t.prototype.loadAsync=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return yr(this,void 0,void 0,function(){var i,s,o,l,d;return _r(this,function(p){switch(p.label){case 0:i=this._getContainerModuleHelpersFactory(),s=0,o=e,p.label=1;case 1:return s<o.length?(l=o[s],d=i(l.id),[4,l.registry(d.bindFunction,d.unbindFunction,d.isboundFunction,d.rebindFunction,d.unbindAsyncFunction,d.onActivationFunction,d.onDeactivationFunction)]):[3,4];case 2:p.sent(),p.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},t.prototype.unload=function(){for(var e=this,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];r.forEach(function(s){var o=e._removeModuleBindings(s.id);e._deactivateSingletons(o),e._removeModuleHandlers(s.id)})},t.prototype.unloadAsync=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return yr(this,void 0,void 0,function(){var i,s,o,l;return _r(this,function(d){switch(d.label){case 0:i=0,s=e,d.label=1;case 1:return i<s.length?(o=s[i],l=this._removeModuleBindings(o.id),[4,this._deactivateSingletonsAsync(l)]):[3,4];case 2:d.sent(),this._removeModuleHandlers(o.id),d.label=3;case 3:return i++,[3,1];case 4:return[2]}})})},t.prototype.bind=function(e){var r=this.options.defaultScope||lt.Transient,i=new SC(e,r);return this._bindingDictionary.add(e,i),new MA(i)},t.prototype.rebind=function(e){return this.unbind(e),this.bind(e)},t.prototype.rebindAsync=function(e){return yr(this,void 0,void 0,function(){return _r(this,function(r){switch(r.label){case 0:return[4,this.unbindAsync(e)];case 1:return r.sent(),[2,this.bind(e)]}})})},t.prototype.unbind=function(e){if(this._bindingDictionary.hasKey(e)){var r=this._bindingDictionary.get(e);this._deactivateSingletons(r)}this._removeServiceFromDictionary(e)},t.prototype.unbindAsync=function(e){return yr(this,void 0,void 0,function(){var r;return _r(this,function(i){switch(i.label){case 0:return this._bindingDictionary.hasKey(e)?(r=this._bindingDictionary.get(e),[4,this._deactivateSingletonsAsync(r)]):[3,2];case 1:i.sent(),i.label=2;case 2:return this._removeServiceFromDictionary(e),[2]}})})},t.prototype.unbindAll=function(){var e=this;this._bindingDictionary.traverse(function(r,i){e._deactivateSingletons(i)}),this._bindingDictionary=new li},t.prototype.unbindAllAsync=function(){return yr(this,void 0,void 0,function(){var e,r=this;return _r(this,function(i){switch(i.label){case 0:return e=[],this._bindingDictionary.traverse(function(s,o){e.push(r._deactivateSingletonsAsync(o))}),[4,Promise.all(e)];case 1:return i.sent(),this._bindingDictionary=new li,[2]}})})},t.prototype.onActivation=function(e,r){this._activations.add(e,r)},t.prototype.onDeactivation=function(e,r){this._deactivations.add(e,r)},t.prototype.isBound=function(e){var r=this._bindingDictionary.hasKey(e);return!r&&this.parent&&(r=this.parent.isBound(e)),r},t.prototype.isCurrentBound=function(e){return this._bindingDictionary.hasKey(e)},t.prototype.isBoundNamed=function(e,r){return this.isBoundTagged(e,xr,r)},t.prototype.isBoundTagged=function(e,r,i){var s=!1;if(this._bindingDictionary.hasKey(e)){var o=this._bindingDictionary.get(e),l=oA(this,e,r,i);s=o.some(function(d){return d.constraint(l)})}return!s&&this.parent&&(s=this.parent.isBoundTagged(e,r,i)),s},t.prototype.snapshot=function(){this._snapshots.push(FA.of(this._bindingDictionary.clone(),this._middleware,this._activations.clone(),this._deactivations.clone(),this._moduleActivationStore.clone()))},t.prototype.restore=function(){var e=this._snapshots.pop();if(e===void 0)throw new Error(DC);this._bindingDictionary=e.bindings,this._activations=e.activations,this._deactivations=e.deactivations,this._middleware=e.middleware,this._moduleActivationStore=e.moduleActivationStore},t.prototype.createChild=function(e){var r=new t(e||this.options);return r.parent=this,r},t.prototype.applyMiddleware=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var i=this._middleware?this._middleware:this._planAndResolve();this._middleware=e.reduce(function(s,o){return o(s)},i)},t.prototype.applyCustomMetadataReader=function(e){this._metadataReader=e},t.prototype.get=function(e){var r=this._getNotAllArgs(e,!1);return this._getButThrowIfAsync(r)},t.prototype.getAsync=function(e){return yr(this,void 0,void 0,function(){var r;return _r(this,function(i){return r=this._getNotAllArgs(e,!1),[2,this._get(r)]})})},t.prototype.getTagged=function(e,r,i){var s=this._getNotAllArgs(e,!1,r,i);return this._getButThrowIfAsync(s)},t.prototype.getTaggedAsync=function(e,r,i){return yr(this,void 0,void 0,function(){var s;return _r(this,function(o){return s=this._getNotAllArgs(e,!1,r,i),[2,this._get(s)]})})},t.prototype.getNamed=function(e,r){return this.getTagged(e,xr,r)},t.prototype.getNamedAsync=function(e,r){return this.getTaggedAsync(e,xr,r)},t.prototype.getAll=function(e){var r=this._getAllArgs(e);return this._getButThrowIfAsync(r)},t.prototype.getAllAsync=function(e){var r=this._getAllArgs(e);return this._getAll(r)},t.prototype.getAllTagged=function(e,r,i){var s=this._getNotAllArgs(e,!0,r,i);return this._getButThrowIfAsync(s)},t.prototype.getAllTaggedAsync=function(e,r,i){var s=this._getNotAllArgs(e,!0,r,i);return this._getAll(s)},t.prototype.getAllNamed=function(e,r){return this.getAllTagged(e,xr,r)},t.prototype.getAllNamedAsync=function(e,r){return this.getAllTaggedAsync(e,xr,r)},t.prototype.resolve=function(e){var r=this.isBound(e);r||this.bind(e).toSelf();var i=this.get(e);return r||this.unbind(e),i},t.prototype._preDestroy=function(e,r){var i,s;if(Reflect.hasMetadata(Ou,e)){var o=Reflect.getMetadata(Ou,e);return(s=(i=r)[o.value])===null||s===void 0?void 0:s.call(i)}},t.prototype._removeModuleHandlers=function(e){var r=this._moduleActivationStore.remove(e);this._activations.removeIntersection(r.onActivations),this._deactivations.removeIntersection(r.onDeactivations)},t.prototype._removeModuleBindings=function(e){return this._bindingDictionary.removeByCondition(function(r){return r.moduleId===e})},t.prototype._deactivate=function(e,r){var i=this,s=Object.getPrototypeOf(r).constructor;try{if(this._deactivations.hasKey(e.serviceIdentifier)){var o=this._deactivateContainer(r,this._deactivations.get(e.serviceIdentifier).values());if(jt(o))return this._handleDeactivationError(o.then(function(){return i._propagateContainerDeactivationThenBindingAndPreDestroyAsync(e,r,s)}),s)}var l=this._propagateContainerDeactivationThenBindingAndPreDestroy(e,r,s);if(jt(l))return this._handleDeactivationError(l,s)}catch(d){if(d instanceof Error)throw new Error($u(s.name,d.message))}},t.prototype._handleDeactivationError=function(e,r){return yr(this,void 0,void 0,function(){var i;return _r(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,e];case 1:return s.sent(),[3,3];case 2:if(i=s.sent(),i instanceof Error)throw new Error($u(r.name,i.message));return[3,3];case 3:return[2]}})})},t.prototype._deactivateContainer=function(e,r){for(var i=this,s=r.next();s.value;){var o=s.value(e);if(jt(o))return o.then(function(){return i._deactivateContainerAsync(e,r)});s=r.next()}},t.prototype._deactivateContainerAsync=function(e,r){return yr(this,void 0,void 0,function(){var i;return _r(this,function(s){switch(s.label){case 0:i=r.next(),s.label=1;case 1:return i.value?[4,i.value(e)]:[3,3];case 2:return s.sent(),i=r.next(),[3,1];case 3:return[2]}})})},t.prototype._getContainerModuleHelpersFactory=function(){var e=this,r=function(g,b){g._binding.moduleId=b},i=function(g){return function(b){var y=e.bind(b);return r(y,g),y}},s=function(){return function(g){return e.unbind(g)}},o=function(){return function(g){return e.unbindAsync(g)}},l=function(){return function(g){return e.isBound(g)}},d=function(g){return function(b){var y=e.rebind(b);return r(y,g),y}},p=function(g){return function(b,y){e._moduleActivationStore.addActivation(g,b,y),e.onActivation(b,y)}},h=function(g){return function(b,y){e._moduleActivationStore.addDeactivation(g,b,y),e.onDeactivation(b,y)}};return function(g){return{bindFunction:i(g),isboundFunction:l(),onActivationFunction:p(g),onDeactivationFunction:h(g),rebindFunction:d(g),unbindFunction:s(),unbindAsyncFunction:o()}}},t.prototype._getAll=function(e){return Promise.all(this._get(e))},t.prototype._get=function(e){var r=Go(Go({},e),{contextInterceptor:function(s){return s},targetType:_a.Variable});if(this._middleware){var i=this._middleware(r);if(i==null)throw new Error(IC);return i}return this._planAndResolve()(r)},t.prototype._getButThrowIfAsync=function(e){var r=this._get(e);if($g(r))throw new Error(kC(e.serviceIdentifier));return r},t.prototype._getAllArgs=function(e){var r={avoidConstraints:!0,isMultiInject:!0,serviceIdentifier:e};return r},t.prototype._getNotAllArgs=function(e,r,i,s){var o={avoidConstraints:!1,isMultiInject:r,serviceIdentifier:e,key:i,value:s};return o},t.prototype._planAndResolve=function(){var e=this;return function(r){var i=aA(e._metadataReader,e,r.isMultiInject,r.targetType,r.serviceIdentifier,r.key,r.value,r.avoidConstraints);i=r.contextInterceptor(i);var s=NA(i);return s}},t.prototype._deactivateIfSingleton=function(e){var r=this;if(e.activated)return jt(e.cache)?e.cache.then(function(i){return r._deactivate(e,i)}):this._deactivate(e,e.cache)},t.prototype._deactivateSingletons=function(e){for(var r=0,i=e;r<i.length;r++){var s=i[r],o=this._deactivateIfSingleton(s);if(jt(o))throw new Error(BC)}},t.prototype._deactivateSingletonsAsync=function(e){return yr(this,void 0,void 0,function(){var r=this;return _r(this,function(i){switch(i.label){case 0:return[4,Promise.all(e.map(function(s){return r._deactivateIfSingleton(s)}))];case 1:return i.sent(),[2]}})})},t.prototype._propagateContainerDeactivationThenBindingAndPreDestroy=function(e,r,i){return this.parent?this._deactivate.bind(this.parent)(e,r):this._bindingDeactivationAndPreDestroy(e,r,i)},t.prototype._propagateContainerDeactivationThenBindingAndPreDestroyAsync=function(e,r,i){return yr(this,void 0,void 0,function(){return _r(this,function(s){switch(s.label){case 0:return this.parent?[4,this._deactivate.bind(this.parent)(e,r)]:[3,2];case 1:return s.sent(),[3,4];case 2:return[4,this._bindingDeactivationAndPreDestroyAsync(e,r,i)];case 3:s.sent(),s.label=4;case 4:return[2]}})})},t.prototype._removeServiceFromDictionary=function(e){try{this._bindingDictionary.remove(e)}catch{throw new Error(CC+" "+na(e))}},t.prototype._bindingDeactivationAndPreDestroy=function(e,r,i){var s=this;if(typeof e.onDeactivation=="function"){var o=e.onDeactivation(r);if(jt(o))return o.then(function(){return s._preDestroy(i,r)})}return this._preDestroy(i,r)},t.prototype._bindingDeactivationAndPreDestroyAsync=function(e,r,i){return yr(this,void 0,void 0,function(){return _r(this,function(s){switch(s.label){case 0:return typeof e.onDeactivation!="function"?[3,2]:[4,e.onDeactivation(r)];case 1:s.sent(),s.label=2;case 2:return[4,this._preDestroy(i,r)];case 3:return s.sent(),[2]}})})},t}();function GA(t){for(var e=new Set,r=0,i=t;r<i.length;r++){var s=i[r];if(e.has(s))return s;e.add(s)}}function VA(t){return t.prototype!==void 0}function jA(t){if(t!==void 0)throw new Error(_g)}function qA(t,e,r,i){jA(e),Ng(gg,t,r.toString(),i)}function WA(t,e,r){if(VA(t))throw new Error(_g);Ng(vg,t.constructor,e,r)}function KA(t){var e=[];if(Array.isArray(t)){e=t;var r=GA(e.map(function(i){return i.key}));if(r!==void 0)throw new Error(bg+" "+r.toString())}else e=[t];return e}function Ng(t,e,r,i){var s=KA(i),o={};Reflect.hasOwnMetadata(t,e)&&(o=Reflect.getMetadata(t,e));var l=o[r];if(l===void 0)l=[];else for(var d=function(b){if(s.some(function(y){return y.key===b.key}))throw new Error(bg+" "+b.key.toString())},p=0,h=l;p<h.length;p++){var g=h[p];d(g)}l.push.apply(l,s),o[r]=l,Reflect.defineMetadata(t,o,e)}function YA(t){return function(e,r,i){typeof i=="number"?qA(e,r,i,t):WA(e,r,t)}}function It(){return function(t){if(Reflect.hasOwnMetadata(Tu,t))throw new Error(xC);var e=Reflect.getMetadata(yC,t)||[];return Reflect.defineMetadata(Tu,e,t),t}}function JA(t){return function(e){return function(r,i,s){if(e===void 0){var o=typeof r=="function"?r.name:r.constructor.name;throw new Error(TC(o))}return YA(new gi(t,e))(r,i,s)}}}var ge=JA($l),zs=Symbol.for("INJECTION");function Rl(t,e,r,i){function s(){return i&&!Reflect.hasMetadata(zs,this,e)&&Reflect.defineMetadata(zs,r(),this,e),Reflect.hasMetadata(zs,this,e)?Reflect.getMetadata(zs,this,e):r()}function o(l){Reflect.defineMetadata(zs,l,this,e)}Object.defineProperty(t,e,{configurable:!0,enumerable:!0,get:s,set:o})}function ZA(t,e){return function(r){return function(i,s){var o=function(){return t.get(r)};Rl(i,s,o,e)}}}function QA(t,e){return function(r,i){return function(s,o){var l=function(){return t.getNamed(r,i)};Rl(s,o,l,e)}}}function XA(t,e){return function(r,i,s){return function(o,l){var d=function(){return t.getTagged(r,i,s)};Rl(o,l,d,e)}}}function eE(t,e){return function(r){return function(i,s){var o=function(){return t.getAll(r)};Rl(i,s,o,e)}}}function tE(t,e){e===void 0&&(e=!0);var r=ZA(t,e),i=QA(t,e),s=XA(t,e),o=eE(t,e);return{lazyInject:r,lazyInjectNamed:i,lazyInjectTagged:s,lazyMultiInject:o}}const Ee=new HA,kl=tE(Ee),B={StateUIConnector:Symbol("StateUIConnector"),App:Symbol("App"),AppState:Symbol("AppState"),ScenarioState:Symbol("ScenarioState"),GlobalState:Symbol("GlobalState"),CityState:Symbol("CityState"),SettingsState:Symbol("SettingsState"),MessageLogState:Symbol("MessageLogState"),NotificationsState:Symbol("NotificationsState"),MainframeHardwareState:Symbol("MainframeHardwareState"),MainframeProgramsState:Symbol("MainframeProgramsState"),MainframeProcessesState:Symbol("MainframeProcessesState"),ProgramFactory:Symbol("ProgramFactory"),MainframeHardwareAutomationState:Symbol("MainframeHardwareAutomationState"),MainframeProgramsAutomationState:Symbol("MainframeProgramsAutomationState"),Formatter:Symbol("Formatter")};class ue{constructor(e){this.handleRefreshUI=()=>{this.host.requestUpdate()},this.host=e,e.addController(this),this.eventsEmitterMap=new Map}hostConnected(){for(const[e,r]of this.eventsEmitterMap.entries())for(const i of r.values())e.uiEventBatcher.addListener(i,this.handleRefreshUI)}hostDisconnected(){for(const[e,r]of this.eventsEmitterMap.entries())this.clearEventSet(e,r)}addEventListener(e,r){let i=this.eventsEmitterMap.get(e);i||(i=new Set,this.eventsEmitterMap.set(e,i)),i.has(r)||(i.add(r),e.uiEventBatcher.addListener(r,this.handleRefreshUI))}removeEventListenersByEmitter(e){const r=this.eventsEmitterMap.get(e);r&&this.clearEventSet(e,r),this.eventsEmitterMap.delete(e)}removeAllEventListeners(){for(const[e,r]of this.eventsEmitterMap.entries())this.clearEventSet(e,r);this.eventsEmitterMap.clear()}startRendering(){this.stateUiConnector.pushEventListener(this)}stopRendering(){this.stateUiConnector.popEventListener()}get formatter(){return Ee.get(B.Formatter)}get stateUiConnector(){return Ee.get(B.StateUIConnector)}get app(){return Ee.get(B.App)}get appState(){return Ee.get(B.AppState)}get scenarioState(){return Ee.get(B.ScenarioState)}get globalState(){return Ee.get(B.GlobalState)}get settingsState(){return Ee.get(B.SettingsState)}get cityState(){return Ee.get(B.CityState)}get messageLogState(){return Ee.get(B.MessageLogState)}get notificationsState(){return Ee.get(B.NotificationsState)}get mainframeHardwareState(){return Ee.get(B.MainframeHardwareState)}get mainframeProgramsState(){return Ee.get(B.MainframeProgramsState)}get mainframeProcessesState(){return Ee.get(B.MainframeProcessesState)}get programFactory(){return Ee.get(B.ProgramFactory)}get mainframeHardwareAutomationState(){return Ee.get(B.MainframeHardwareAutomationState)}get mainframeProgramsAutomationState(){return Ee.get(B.MainframeProgramsAutomationState)}clearEventSet(e,r){for(const i of r.values())e.uiEventBatcher.removeListener(i,this.handleRefreshUI)}}class rE extends ue{isGameAlertEnabled(e){return this.settingsState.isGameAlertEnabled(e)}toggleGameAlert(e,r){this.settingsState.toggleGameAlert(e,r)}}var nE=Object.defineProperty,iE=Object.getOwnPropertyDescriptor,ls=(t,e,r,i)=>{for(var s=i>1?void 0:i?iE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&nE(e,r,s),s};let kn=class extends ee{constructor(){super(),this._gameAlertToggleRef=je(),this._messageParams="",this._isOpen=!1,this._alertToggled=!0,this.handleOpen=t=>{t.stopPropagation();const e=t;this._gameAlert=e.gameAlert,this._messageParams=e.messageParams,this._gameAlertKey=e.gameAlertKey,this.controller.isGameAlertEnabled(this._gameAlert)?(this._isOpen=!0,this._alertToggled=!0):(this._isOpen=!1,this.dispatchEvent(new ht(this._gameAlert,this._gameAlertKey)))},this.handleClose=t=>{t.stopPropagation(),this._isOpen=!1,this._gameAlert&&this.dispatchEvent(new mi(this._gameAlert,this._gameAlertKey))},this.handleSubmit=t=>{t.stopPropagation(),this._gameAlert&&(this._isOpen=!1,this._gameAlertToggleRef.value&&this.controller.toggleGameAlert(this._gameAlert,this._alertToggled),this.dispatchEvent(new ht(this._gameAlert,this._gameAlertKey)))},this.handleToggleAlert=t=>{t.stopPropagation(),this._gameAlert&&this._gameAlertToggleRef.value&&(this._alertToggled=this._gameAlertToggleRef.value.checked)},this.controller=new rE(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(sr.type,this.handleOpen)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(sr.type,this.handleOpen)}renderContent(){return O`
      <sl-dialog no-header ?open=${this._isOpen} @sl-request-close=${this.handleClose}>
        <p>
          <intl-message label="alerts:${this._gameAlert}:message" value=${this._messageParams}> Message </intl-message>
        </p>

        <sl-checkbox
          ref=${qe(this._gameAlertToggleRef)}
          size="medium"
          name="game-alert"
          ?checked=${this._alertToggled}
          @sl-change=${this.handleToggleAlert}
        >
          <intl-message label="ui:settings:alertToggle"> Toggle alert </intl-message>
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:cancel"> Cancel </intl-message>
        </sl-button>
        <sl-button slot="footer" size="medium" variant="danger" @click=${this.handleSubmit}>
          <intl-message label="ui:common:continue"> Continue </intl-message>
        </sl-button>
      </sl-dialog>
    `}};kn.styles=K`
    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }
  `;ls([ae()],kn.prototype,"_gameAlert",2);ls([ae()],kn.prototype,"_gameAlertKey",2);ls([ae()],kn.prototype,"_messageParams",2);ls([ae()],kn.prototype,"_isOpen",2);ls([ae()],kn.prototype,"_alertToggled",2);kn=ls([X("ca-confirmation-alert")],kn);class sE extends ue{get money(){return this.globalState.money.money}get growth(){return this.globalState.moneyGrowth.totalGrowth}get developmentLevel(){return this.globalState.development.level}}var aE=Object.defineProperty,oE=Object.getOwnPropertyDescriptor,qh=(t,e,r,i)=>{for(var s=i>1?void 0:i?oE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&aE(e,r,s),s};let sa=class extends ee{constructor(){super(),this.cost=0,this.level=0,this.renderMessage=()=>{if(this.level>this.controller.developmentLevel)return O`
        <intl-message slot="content" label="ui:common:higherDevelopmentLevelRequired">
          Higher development level required
        </intl-message>
      `;if(this.cost<=this.controller.money)return O` <intl-message slot="content" label="ui:common:available"> Available </intl-message> `;if(this.controller.growth>0){const t=this.controller.formatter.formatTimeShort((this.cost-this.controller.money)/this.controller.growth);return O`
        <intl-message slot="content" label="ui:common:willBeAvailableIn" value=${t}>
          Will be available
        </intl-message>
      `}return O` <intl-message slot="content" label="ui:common:notEnoughMoney"> Not enough money </intl-message> `},this.controller=new sE(this)}renderContent(){return O`
      <sl-tooltip>
        ${this.renderMessage()}

        <slot></slot>
      </sl-tooltip>
    `}};sa.styles=K``;qh([P({attribute:"cost",type:Number})],sa.prototype,"cost",2);qh([P({attribute:"level",type:Number})],sa.prototype,"level",2);sa=qh([X("ca-purchase-tooltip")],sa);var wr=(t=>(t[t.loading=0]="loading",t[t.running=1]="running",t[t.fastForward=2]="fastForward",t))(wr||{});class lE extends ue{hostConnected(){super.hostConnected(),this.app.startUp().catch(e=>{console.error(e)})}get appStage(){return this.app.appStage}}var cE=Object.defineProperty,uE=Object.getOwnPropertyDescriptor,hE=(t,e,r,i)=>{for(var s=i>1?void 0:i?uE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&cE(e,r,s),s};let Sm=class extends ee{constructor(){super(),this.controller=new lE(this)}renderContent(){switch(this.controller.appStage){case wr.loading:return O`<ca-loading-screen></ca-loading-screen>`;case wr.running:return O`<ca-game-screen></ca-game-screen>`;case wr.fastForward:return O`<ca-fast-forwarding-screen></ca-fast-forwarding-screen>`;default:return null}}};Sm=hE([X("ca-app-root")],Sm);var dE=Object.defineProperty,pE=Object.getOwnPropertyDescriptor,fE=(t,e,r,i)=>{for(var s=i>1?void 0:i?pE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&dE(e,r,s),s};let Du=class extends ee{renderContent(){return O`
      <span>
        <intl-message label="ui:common:loading"> Loading... </intl-message>
      </span>
    `}};Du.styles=K`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-50);
    }

    :host span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }
  `;Du=fE([X("ca-loading-screen")],Du);class mE extends ue{get accumulatedTime(){return this.globalState.time.accumulatedTime}stopFastForwarding(){this.app.stopFastForwarding()}}var gE=Object.defineProperty,vE=Object.getOwnPropertyDescriptor,bE=(t,e,r,i)=>{for(var s=i>1?void 0:i?vE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&gE(e,r,s),s};let Iu=class extends ee{constructor(){super(),this._maxTime=1,this.handleStopFastForwarding=t=>{t.stopPropagation(),t.preventDefault(),this.controller.stopFastForwarding()},this.controller=new mE(this)}renderContent(){const t=this.controller.formatter,e=this.controller.accumulatedTime;this._maxTime=Math.max(this._maxTime,e);const r=(this._maxTime-e)/this._maxTime*100;return O`
      <div>
        <span>
          <intl-message label="ui:fastForwardingScreen:fastForwarding"> Fast forwarding... </intl-message>
        </span>
      </div>

      <sl-progress-bar value=${r}> ${t.formatTimeShort(e)} </sl-progress-bar>

      <sl-button variant="danger" size="medium" @click=${this.handleStopFastForwarding}>
        <intl-message label="ui:fastForwardingScreen:stop"> Purchase a program </intl-message>
      </sl-button>
    `}};Iu.styles=K`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--sl-color-neutral-50);
      gap: var(--sl-spacing-large);
    }

    span {
      font-size: var(--sl-font-size-3x-large);
      font-weight: var(--sl-font-weight-semibold);
      letter-spacing: var(--sl-letter-spacing-loose);
    }

    sl-progress-bar {
      width: 80vw;
      --height: 2rem;
    }
  `;Iu=bE([X("ca-fast-forwarding-screen")],Iu);var Sr=(t=>(t[t.paused=0]="paused",t[t.normal=1]="normal",t[t.fast=2]="fast",t))(Sr||{}),Wh=(t=>(t.en="en",t.ru="ru",t))(Wh||{}),Ys=(t=>(t.light="light",t.dark="dark",t))(Ys||{}),ui=(t=>(t.cityOverview="cityOverview",t.companyManagement="companyManagement",t.mainframe="mainframe",t.statistics="statistics",t.automation="automation",t))(ui||{}),Vo=(t=>(t.settings="settings",t.credits="credits",t))(Vo||{}),Lg=(t=>(t.tutorial="tutorial",t))(Lg||{}),Hr=(t=>(t.gameStarted="gameStarted",t.gameSaved="gameSaved",t.fastForwared="fastForwarded",t.levelReached="levelReached",t.featureUnlocked="featureUnlocked",t.storyEvent="storyEvent",t))(Hr||{}),wi=(t=>(t.performanceUpgraded="performanceUpgraded",t.coresUpgraded="coresUpgraded",t.ramUpgraded="ramUpgraded",t.programPurchased="programPurchased",t))(wi||{}),hi=(t=>(t.processStarted="processStarted",t.processFinished="processFinished",t.processDeleted="processDeleted",t.allProcessesDeleted="allProcessesDeleted",t))(hi||{}),kr=(t=>(t.saveImport="saveImport",t.saveDelete="saveDelete",t.clearMessages="clearMessages",t.fastForward="fastForward",t))(kr||{}),$t=(t=>(t.purchaseProgramOverwrite="purchaseProgramOverwrite",t.processDelete="processDelete",t.processReplace="processReplace",t.scalableProcessReplace="scalableProcessReplace",t.deleteAllProcesses="deleteAllProcesses",t))($t||{}),Sa=(t=>(t.storyEvent="storyEvent",t.featureUnlocked="featureUnlocked",t))(Sa||{}),jo=(t=>(t.builtIn="builtIn",t.scientific="scientific",t))(jo||{}),Nl=(t=>(t.mainframeHardware="mainframeHardware",t.mainframePrograms="mainframePrograms",t))(Nl||{}),Zi=(t=>(t.program="program",t))(Zi||{}),Cr=(t=>(t.automation="automation",t.automationMainframeHardware="automationMainframeHardware",t.automationMainframePrograms="automationMainframePrograms",t.mainframeHardware="mainframeHardware",t.mainframePrograms="mainframePrograms",t.cityOverview="cityOverview",t.companyManagement="companyManagement",t))(Cr||{});class yE extends ue{get gameSpeed(){return this.globalState.gameSpeed}changeGameSpeed(e){this.globalState.gameSpeed=e,this.handleRefreshUI()}fastForward(){this.app.fastForward()}}var _E=Object.defineProperty,wE=Object.getOwnPropertyDescriptor,SE=(t,e,r,i)=>{for(var s=i>1?void 0:i?wE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&_E(e,r,s),s};let Ru=class extends ee{constructor(){super(),this.renderButton=t=>{const{label:e,gameSpeed:r,icon:i}=t;return O`
      <sl-tooltip>
        <intl-message slot="content" label="ui:topBar:gameSpeedButtons:${e}"> Game speed button </intl-message>

        <sl-icon-button
          name=${i}
          label=${ir(`topBar.gameSpeedButtons.${e}`,{ns:"ui"})}
          @click=${this.handleChangeGameSpeed(r)}
        >
        </sl-icon-button>
      </sl-tooltip>
    `},this.handleChangeGameSpeed=t=>e=>{e.preventDefault(),e.stopPropagation(),this.controller.changeGameSpeed(t)},this.handleOpenFastForwardDialog=t=>{t.stopPropagation(),this.dispatchEvent(new sr(kr.fastForward,""))},this.handleConfirmFastForwardDialog=t=>{t.gameAlert===kr.fastForward&&this.controller.fastForward()},this.controller=new yE(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(ht.type,this.handleConfirmFastForwardDialog)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(ht.type,this.handleConfirmFastForwardDialog)}renderContent(){const t=this.controller.gameSpeed;return O`
      ${this.renderButton({gameSpeed:Sr.paused,label:"pause",icon:t===Sr.paused?"pause-fill":"pause"})}
      ${this.renderButton({gameSpeed:Sr.normal,label:"playNormal",icon:t===Sr.normal?"play-fill":"play"})}
      ${this.renderButton({gameSpeed:Sr.fast,label:"playFast",icon:t===Sr.fast?"fast-forward-fill":"fast-forward"})}
      <sl-tooltip>
        <intl-message slot="content" label="ui:topBar:gameSpeedButtons:fastForward"> Game speed button </intl-message>

        <sl-icon-button
          name="skip-end"
          label=${ir("topBar.gameSpeedButtons.fastForward",{ns:"ui"})}
          @click=${this.handleOpenFastForwardDialog}
        >
        </sl-icon-button>
      </sl-tooltip>
    `}};Ru.styles=K`
    :host {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }
  `;Ru=SE([X("ca-game-speed-buttons")],Ru);class xE extends ue{get accumulatedTime(){return this.globalState.time.accumulatedTime}get money(){return this.globalState.money.money}get developmentLevel(){return this.globalState.development.level}get developmentGrowth(){return this.globalState.developmentGrowth.totalGrowth}get developmentPointsUntilNextLevel(){return this.globalState.development.getNextLevelPoints()-this.globalState.development.points}}var PE=Object.defineProperty,CE=Object.getOwnPropertyDescriptor,AE=(t,e,r,i)=>{for(var s=i>1?void 0:i?CE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&PE(e,r,s),s};let ku=class extends ee{constructor(){super(),this.controller=new xE(this)}renderContent(){const t=this.controller.formatter,e=t.formatTimeShort(this.controller.accumulatedTime),r=t.formatNumberLong(this.controller.money),i=t.formatNumberDecimal(this.controller.developmentLevel),s=this.controller.developmentGrowth>0,o=s?t.formatTimeShort(this.controller.developmentPointsUntilNextLevel/this.controller.developmentGrowth):"";return O`
      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:accumulatedTime"> Accumulated time </intl-message>

          <sl-icon name="clock"> </sl-icon>

          <span class="text"> ${e} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:money"> Money </intl-message>

          <sl-icon name="currency-bitcoin"> </sl-icon>

          <span class="text"> ${r} </span>
        </sl-tooltip>
      </div>

      <div class="block">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:${s?"developmentLevelNext":"developmentLevel"}" value=${o}>
            Development level
          </intl-message>

          <sl-icon name="star"> </sl-icon>

          <span class="text"> ${i} </span>
        </sl-tooltip>
      </div>
    `}};ku.styles=K`
    :host {
      height: 100%;
      display: flex;
      align-items: stretch;
      gap: var(--sl-spacing-medium);
    }

    div.block {
      display: flex;
      align-items: center;
    }

    sl-icon {
      color: var(--ca-hint-color);
    }

    sl-icon[name='clock'] {
      margin-right: var(--sl-spacing-small);
    }

    sl-icon[name='currency-bitcoin'] {
      margin-right: var(--sl-spacing-2x-small);
    }

    sl-icon[name='star'] {
      margin-right: var(--sl-spacing-2x-small);
    }

    span.text {
      font-size: var(--sl-font-size-medium);
    }
  `;ku=AE([X("ca-top-bar-values")],ku);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xm=(t,e,r)=>{const i=new Map;for(let s=e;s<=r;s++)i.set(t[s],s);return i},Pr=rs(class extends ns{constructor(t){if(super(t),t.type!==Rr.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let i;r===void 0?r=e:e!==void 0&&(i=e);const s=[],o=[];let l=0;for(const d of t)s[l]=i?i(d,l):l,o[l]=r(d,l),l++;return{values:o,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,i]){const s=Hx(t),{values:o,keys:l}=this.dt(e,r,i);if(!Array.isArray(s))return this.ut=l,o;const d=this.ut??(this.ut=[]),p=[];let h,g,b=0,y=s.length-1,x=0,A=o.length-1;for(;b<=y&&x<=A;)if(s[b]===null)b++;else if(s[y]===null)y--;else if(d[b]===l[x])p[x]=ni(s[b],o[x]),b++,x++;else if(d[y]===l[A])p[A]=ni(s[y],o[A]),y--,A--;else if(d[b]===l[A])p[A]=ni(s[b],o[A]),Rs(t,p[A+1],s[b]),b++,A--;else if(d[y]===l[x])p[x]=ni(s[y],o[x]),Rs(t,s[b],s[y]),y--,x++;else if(h===void 0&&(h=xm(l,x,A),g=xm(d,b,y)),h.has(d[b]))if(h.has(d[y])){const k=g.get(l[x]),I=k!==void 0?s[k]:null;if(I===null){const U=Rs(t,s[b]);ni(U,o[x]),p[x]=U}else p[x]=ni(I,o[x]),Rs(t,s[b],I),s[k]=null;x++}else ou(s[y]),y--;else ou(s[b]),b++;for(;x<=A;){const k=Rs(t,p[A+1]);ni(k,o[x]),p[x++]=k}for(;b<=y;){const k=s[b++];k!==null&&ou(k)}return this.ut=l,Km(t,p),qt}});class EE extends ue{listAvailableGoals(){return this.globalState.storyEvents.listAvailableGoals()}}var TE=Object.defineProperty,OE=Object.getOwnPropertyDescriptor,$E=(t,e,r,i)=>{for(var s=i>1?void 0:i?OE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&TE(e,r,s),s};let Nu=class extends ee{constructor(){super(),this.renderTooltipContent=()=>{const t=this.controller.listAvailableGoals();return t.length===0?O`
        <intl-message label="ui:topBar:availableGoals:titleNoGoals">
          No available development level goals
        </intl-message>
      `:O`
      <intl-message label="ui:topBar:availableGoals:titleGoalsExist"> Available development level goals </intl-message>
      <ul class="goals">
        ${Pr(t,e=>e.key,this.renderGoal)}
      </ul>
    `},this.renderGoal=t=>O`
      <li>
        <intl-message label="ui:topBar:availableGoals:reachLevel" value=${t.level}></intl-message>
      </li>
    `,this.controller=new EE(this)}renderContent(){return O`
      <sl-tooltip>
        <span slot="content">${this.renderTooltipContent()}</span>

        <sl-icon name="crosshair"> </sl-icon>
      </sl-tooltip>
    `}};Nu.styles=K`
    :host {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
    }

    sl-icon {
      color: var(--ca-hint-color);
    }

    ul.goals {
      margin: 1rem 0 0 0;
      padding: 0;
    }

    ul.goals li {
      margin: 0;
      list-style: none;
    }
  `;Nu=$E([X("ca-top-bar-available-goals")],Nu);const gl=class gl extends Event{constructor(){super(gl.type,{bubbles:!0,composed:!0})}};gl.type="logs-toggled";let Lu=gl;const vl=class vl extends Event{constructor(){super(vl.type,{bubbles:!0,composed:!0})}};vl.type="menu-toggled";let Mu=vl;var DE=Object.defineProperty,IE=Object.getOwnPropertyDescriptor,RE=(t,e,r,i)=>{for(var s=i>1?void 0:i?IE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&DE(e,r,s),s};let Fu=class extends ee{constructor(){super(...arguments),this.handleMenuClick=()=>{this.dispatchEvent(new Mu)},this.handleLogsClick=()=>{this.dispatchEvent(new Lu)}}renderContent(){return O`
      <div class="group">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:menu"> Menu </intl-message>

          <sl-icon-button name="list" label=${ir("topBar.menu",{ns:"ui"})} @click=${this.handleMenuClick}>
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <div class="group">
        <ca-game-speed-buttons></ca-game-speed-buttons>
      </div>

      <div class="group">
        <ca-top-bar-values></ca-top-bar-values>
      </div>

      <div class="gutter"></div>

      <div class="group">
        <ca-top-bar-available-goals></ca-top-bar-available-goals>
      </div>

      <div class="group">
        <sl-tooltip>
          <intl-message slot="content" label="ui:topBar:messageLog"> Message log </intl-message>

          <sl-icon-button
            name="chat-left-dots"
            label=${ir("topBar.messageLog",{ns:"ui"})}
            @click=${this.handleLogsClick}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `}};Fu.styles=K`
    :host {
      display: flex;
      align-items: stretch;
      box-sizing: border-box;
      width: 100%;
      gap: var(--sl-spacing-2x-large);
    }

    .group {
      flex: 0 0 auto;
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
    }

    .gutter {
      flex: 1 1 auto;
    }
  `;Fu=RE([X("ca-top-bar")],Fu);var kE=Object.defineProperty,NE=Object.getOwnPropertyDescriptor,Kh=(t,e,r,i)=>{for(var s=i>1?void 0:i?NE(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&kE(e,r,s),s};let aa=class extends ee{constructor(){super(...arguments),this.name="",this.selected=!1}renderContent(){const t=Ye({selected:this.selected});return O`
      <button type="button" class=${t}>
        <intl-message label="ui:pages:${this.name}"> Name </intl-message>
      </button>
    `}};aa.styles=K`
    :host {
      width: 100%;
    }

    button {
      display: flex;
      padding: var(--sl-spacing-small);
      width: 100%;
      background: none;
      border: 0 solid var(--sl-color-primary-600);
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-medium);
      letter-spacing: var(--sl-letter-spacing-normal);
      color: var(--sl-color-neutral-950);
      white-space: nowrap;

      transition:
        border-left-width var(--sl-transition-x-fast) ease,
        background-color var(--sl-transition-x-fast) ease;
    }

    button:hover {
      background-color: var(--sl-color-neutral-100);
      cursor: pointer;
    }

    button.selected {
      border-left-width: var(--sl-spacing-2x-small);
      font-weight: var(--sl-font-weight-bold);
    }
  `;Kh([P({attribute:!0,type:String})],aa.prototype,"name",2);Kh([P({attribute:!0,type:Boolean})],aa.prototype,"selected",2);aa=Kh([X("ca-menu-item")],aa);const LE="tutorial",ME={messageLogSize:30,updateInterval:100,autosaveEnabled:!0,autosaveInterval:6e4,maxTicksPerUpdate:5,maxTicksPerFastForward:1e4,longNumberFormat:"builtIn",mapSize:3},FE={mapWidth:100,mapHeight:100,districtsNum:1,money:0,developmentLevel:1,accumulatedTime:0,mainframeHardware:{performanceLevel:1,coresLevel:1,ramLevel:1,performancePrice:{baseMultiplier:3e4,base:1.3},coresPrice:{baseMultiplier:3e5,base:1.3},ramPrice:{baseMultiplier:6e5,base:1.3}},mainframeSoftware:{performanceBoost:.05,programs:["shareServer"],minCompletionTime:1e3},developmentLevelRequirements:{baseMultiplier:6e4,base:1.5},pointsByProgramMultipliers:{program:1},discounts:{program:2e13},storyEvents:[]},UE={mainframeHardwareAutobuyer:{moneyShare:5,priority:["ram","cores","performance"]},mainframeProgramsAutobuyer:{moneyShare:10}},zE={cityOverview:"cityOverview",companyManagement:"companyManagement",automation:"automation"},Ue={startingScenario:LE,defaultSettings:ME,defaultScenarioSettings:FE,defaultAutomationSettings:UE,menuUnlockRequirements:zE},BE=Object.values(Wh),HE=Object.values(Ys),GE=Object.values(ui),VE=Object.values(Vo);Object.values(Lg);const jE=Object.values(Hr),qE=Object.values(wi),WE=Object.values(hi),KE=Object.values(kr),YE=Object.values($t),JE=Object.values(Sa),ZE=[0,1,2,3,4,5,6],QE=Object.values(jo),gt=1e3,Pm=Object.values(Nl),Nn=Object.values(Zi),Yh=new Image,bl=class bl extends Event{constructor(e){super(bl.type,{bubbles:!0,composed:!0}),this.menuItem="",this.menuItem=e}};bl.type="menu-item-selected";let Uu=bl;class XE extends ue{isFeatureUnlocked(e){return this.globalState.unlockedFeatures.isFeatureUnlocked(e)}}var eT=Object.defineProperty,tT=Object.getOwnPropertyDescriptor,Mg=(t,e,r,i)=>{for(var s=i>1?void 0:i?tT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&eT(e,r,s),s};let qo=class extends ee{constructor(){super(),this.selectedMenuItem="",this.renderMenuItem=t=>{const r=Ue.menuUnlockRequirements[t];return r&&!this.controller.isFeatureUnlocked(r)?null:O`
      <ca-menu-item
        key=${t}
        name=${t}
        ?selected=${this.selectedMenuItem===t}
        @click=${this.handleMenuItemClick}
      >
      </ca-menu-item>
    `},this.handleMenuItemClick=t=>{t.stopPropagation();const r=t.target.getAttribute("name")??"";this.dispatchEvent(new Uu(r))},this.controller=new XE(this)}renderContent(){return O`
      <scrollable-component>
        <nav>
          ${GE.map(this.renderMenuItem)}

          <sl-divider></sl-divider>

          ${VE.map(this.renderMenuItem)}
        </nav>
      </scrollable-component>
    `}};qo.styles=K`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    nav {
      box-sizing: border-box;
      padding: var(--sl-spacing-small) var(--sl-spacing-2x-small);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    sl-divider {
      --spacing: var(--sl-spacing-2x-small);
    }
  `;Mg([P({attribute:"selected-menu-item",type:String})],qo.prototype,"selectedMenuItem",2);qo=Mg([X("ca-menu-bar")],qo);var rT=Object.defineProperty,nT=Object.getOwnPropertyDescriptor,Fg=(t,e,r,i)=>{for(var s=i>1?void 0:i?nT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&rT(e,r,s),s};let Wo=class extends ee{constructor(){super(...arguments),this.selectedMenuItem="",this.renderPage=()=>{switch(this.selectedMenuItem){case ui.cityOverview:return O`<ca-city-page></ca-city-page>`;case ui.mainframe:return O`<ca-mainframe-page></ca-mainframe-page>`;case ui.statistics:return O`<ca-statistics-page></ca-statistics-page>`;case ui.automation:return O`<ca-automation-page></ca-automation-page>`;case Vo.settings:return O`<ca-settings-page></ca-settings-page>`;case Vo.credits:return O`<ca-credits-page></ca-credits-page>`;default:return null}}}renderContent(){return O`
      <scrollable-component>
        <div class="content-wrapper">${this.renderPage()}</div>
      </scrollable-component>
    `}};Wo.styles=K`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --content-padding: var(--sl-spacing-small) var(--sl-spacing-medium);
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    div.content-wrapper {
      max-width: var(--ca-max-content-width);
    }
  `;Fg([P({attribute:"selected-menu-item",type:String})],Wo.prototype,"selectedMenuItem",2);Wo=Fg([X("ca-viewport")],Wo);class iT extends ue{getMessages(){return this.messageLogState.getMessages()}}var sT=Object.defineProperty,aT=Object.getOwnPropertyDescriptor,Ug=(t,e,r,i)=>{for(var s=i>1?void 0:i?aT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&sT(e,r,s),s};let Qi=class extends ee{constructor(){super(),this._scrollableComponentRef=je(),this._scrollSticky=!0,this.renderMessage=t=>{const e=t.parameters?JSON.stringify(t.parameters):void 0,r=`events:${t.event}:message`;return O`
      <p>
        [<intl-datetime time .value=${t.date}></intl-datetime>]
        <intl-message label=${r} value=${he(e)}>Message</intl-message>
      </p>
    `},this.handleScroll=()=>{if(!this._scrollableComponentRef.value)return;const t=this._scrollableComponentRef.value.viewport;this._scrollSticky=t.scrollHeight-Math.ceil(t.scrollTop)-Qi.SCROLL_EPS<=t.clientHeight},this.controller=new iT(this)}firstUpdated(){this._scrollableComponentRef.value&&this._scrollableComponentRef.value.viewport.addEventListener("scroll",this.handleScroll)}disconnectedCallback(){super.disconnectedCallback(),this._scrollableComponentRef.value&&this._scrollableComponentRef.value.viewport.removeEventListener("scroll",this.handleScroll)}updated(t){if(super.updated(t),this._scrollSticky&&this._scrollableComponentRef.value){const e=this._scrollableComponentRef.value.viewport;e.scrollTo({top:e.scrollHeight,behavior:"instant"})}}renderContent(){const t=this.controller.getMessages();return O`
      <scrollable-component ${qe(this._scrollableComponentRef)}>
        <div class="log-content">${Pr(t,e=>e.id,this.renderMessage)}</div>
      </scrollable-component>
    `}};Qi.styles=K`
    :host {
      display: block;
    }

    scrollable-component {
      width: 100%;
      height: 100%;
      --scrollbar-width: var(--ca-scrollbar-width);
      --scrollbar-thumb-fill-color: var(--ca-scrollbar-thumb-fill-color);
      --scrollbar-thumb-fill-color-hover: var(--ca-scrollbar-thumb-fill-color-hover);
    }

    div.log-content {
      box-sizing: border-box;
      width: 100%;
      padding: var(--sl-spacing-small);
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--sl-spacing-3x-small);
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  `;Qi.SCROLL_EPS=1;Ug([ae()],Qi.prototype,"_scrollSticky",2);Qi=Ug([X("ca-message-log-content")],Qi);class oT extends ue{clearMessages(){this.messageLogState.clearMessages()}}var lT=Object.defineProperty,cT=Object.getOwnPropertyDescriptor,uT=(t,e,r,i)=>{for(var s=i>1?void 0:i?cT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&lT(e,r,s),s};let zu=class extends ee{constructor(){super(),this.handleOpenClearMessagesDialog=t=>{t.stopPropagation(),this.dispatchEvent(new sr(kr.clearMessages,""))},this.handleConfirmClearMessagesDialog=t=>{t.gameAlert===kr.clearMessages&&this.controller.clearMessages()},this.controller=new oT(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(ht.type,this.handleConfirmClearMessagesDialog)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(ht.type,this.handleConfirmClearMessagesDialog)}renderContent(){return O`
      <div class="title-bar">
        <h4 class="title">
          <intl-message label="ui:messageLog:messageLog">Message log</intl-message>
        </h4>

        <div class="gutter"></div>

        <sl-tooltip>
          <intl-message slot="content" label="ui:messageLog:clearMessages"> Clear messages </intl-message>

          <sl-icon-button
            id="clear-messages-btn"
            name="x-circle"
            label=${ir("messageLog.clearMessages",{ns:"ui"})}
            @click=${this.handleOpenClearMessagesDialog}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>

      <ca-message-log-content></ca-message-log-content>
    `}};zu.styles=K`
    :host {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
    }

    div.title-bar div.gutter {
      flex: 1 1 auto;
    }

    div.title-bar {
      flex: 0;
      display: flex;
      align-items: flex-start;
      padding: var(--sl-spacing-small);
      border-bottom: var(--ca-border);
      height: var(--ca-message-log-top-bar);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: 0;
      line-height: var(--sl-line-height-denser);
      flex: 1 1 auto;
    }

    sl-icon-button {
      font-size: var(--sl-font-size-large);
      line-height: var(--sl-line-height-denser);
      margin-top: -0.3em;
      flex: 0 0 auto;
    }

    sl-icon-button#clear-messages-btn::part(base):hover {
      color: var(--sl-color-danger-600);
    }

    ca-message-log-content {
      flex: 1 1 auto;
      width: 100%;
      height: calc(100vh - var(--ca-message-log-top-bar) - var(--ca-top-bar-height));
    }
  `;zu=uT([X("ca-message-log-bar")],zu);class hT extends ue{hasUnreadNotifications(){return this.notificationsState.hasUnreadNotifications()}getUnreadNotification(){return this.notificationsState.getUnreadNotification()}popUnreadNotification(){this.notificationsState.popUnreadNotification()}isNotificationTypeEnabled(e){return this.settingsState.isNotificationTypeEnabled(e)}toggleNotificationType(e,r){this.settingsState.toggleNotificationType(e,r)}}var dT=Object.defineProperty,pT=Object.getOwnPropertyDescriptor,zg=(t,e,r,i)=>{for(var s=i>1?void 0:i?pT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&dT(e,r,s),s};let Ko=class extends ee{constructor(){super(),this._notificationTypeToggleRef=je(),this._notificationTypeToggled=!0,this.handleClose=t=>{if(t.stopPropagation(),this.controller.hasUnreadNotifications()){const e=this.controller.getUnreadNotification();this.controller.toggleNotificationType(e.notificationType,this._notificationTypeToggled),this.controller.popUnreadNotification(),this._notificationTypeToggled=!0}},this.handleToggleNotificationType=t=>{t.stopPropagation(),this._notificationTypeToggleRef.value&&(this._notificationTypeToggled=this._notificationTypeToggleRef.value.checked)},this.controller=new hT(this)}renderContent(){const t=this.controller.hasUnreadNotifications();if(!t)return null;const e=this.controller.getUnreadNotification(),r=e.parameters?JSON.stringify(e.parameters):"";return O`
      <sl-dialog no-header ?open=${t} @sl-request-close=${this.handleClose}>
        <p>
          <intl-message label="notifications:${e.notificationType}:message" value=${r}>
            Message
          </intl-message>
        </p>

        <sl-checkbox
          ref=${qe(this._notificationTypeToggleRef)}
          size="medium"
          name="notification-type"
          ?checked=${this._notificationTypeToggled}
          @sl-change=${this.handleToggleNotificationType}
        >
          <intl-message label="ui:settings:notificationTypeToggle"> Toggle notification type </intl-message>
        </sl-checkbox>

        <sl-button slot="footer" size="medium" variant="primary" @click=${this.handleClose}>
          <intl-message label="ui:common:continue"> Continue </intl-message>
        </sl-button>
      </sl-dialog>
    `}};Ko.styles=K`
    sl-dialog::part(footer) {
      text-align: right;
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-large);
    }
  `;zg([ae()],Ko.prototype,"_notificationTypeToggled",2);Ko=zg([X("ca-notification-modal")],Ko);var fT=Object.defineProperty,mT=Object.getOwnPropertyDescriptor,Ll=(t,e,r,i)=>{for(var s=i>1?void 0:i?mT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&fT(e,r,s),s};let Xi=class extends ee{constructor(){super(...arguments),this._menuOpened=!0,this._messageLogOpened=!0,this._selectedMenuItem=ui.mainframe,this.handleMenuToggle=()=>{this._menuOpened=!this._menuOpened},this.handleMessageLogToggle=()=>{this._messageLogOpened=!this._messageLogOpened},this.handleMenuItemSelect=t=>{const e=t;this._selectedMenuItem=e.menuItem}}renderContent(){return O`
      <div class="top-bar-outer-container">
        <div class="top-bar-inner-container">
          <ca-top-bar @menu-toggled=${this.handleMenuToggle} @logs-toggled=${this.handleMessageLogToggle}> </ca-top-bar>
        </div>
      </div>

      <div class="content-outer-container">
        <div class="content-inner-container">
          ${this._menuOpened?O`
                <div class="side-bar-container menu-bar-container">
                  <ca-menu-bar
                    selected-menu-item=${this._selectedMenuItem}
                    @menu-item-selected=${this.handleMenuItemSelect}
                  >
                  </ca-menu-bar>
                </div>
              `:ze}

          <div class="viewport-container">
            <ca-viewport selected-menu-item=${this._selectedMenuItem}></ca-viewport>
          </div>

          ${this._messageLogOpened?O`
                <div class="side-bar-container message-log-bar-container">
                  <ca-message-log-bar></ca-message-log-bar>
                </div>
              `:ze}
        </div>
      </div>

      <ca-confirmation-alert></ca-confirmation-alert>
      <ca-notification-modal></ca-notification-modal>
    `}};Xi.styles=K`
    :host {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: start;
      background-color: var(--sl-color-neutral-100);
    }

    .top-bar-outer-container {
      background-color: var(--sl-panel-background-color);
      border-bottom: var(--ca-border);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
      height: var(--ca-top-bar-height);
    }

    .top-bar-inner-container {
      max-width: var(--ca-max-width);
      width: 100vw;
      display: flex;
      padding: var(--sl-spacing-small);
    }

    .content-outer-container {
      box-sizing: border-box;
      height: calc(100vh - var(--ca-top-bar-height));
      box-shadow: var(--sl-shadow-small);
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex: 1 1 auto;
    }

    .content-inner-container {
      background-color: var(--sl-panel-background-color);
      max-width: var(--ca-max-width);
      width: 100vw;
      display: flex;
      align-items: stretch;
    }

    .side-bar-container {
      flex: 0 0 auto;
      box-sizing: border-box;
      width: 0;
      height: calc(100vh - var(--ca-top-bar-height));
    }

    .menu-bar-container {
      width: 15rem;
      border-right: var(--ca-border);
    }

    .viewport-container {
      flex: 1 1 auto;
      height: calc(100vh - var(--ca-top-bar-height));
    }

    .message-log-bar-container {
      width: 25rem;
      border-left: var(--ca-border);
    }
  `;Ll([ae()],Xi.prototype,"_menuOpened",2);Ll([ae()],Xi.prototype,"_messageLogOpened",2);Ll([ae()],Xi.prototype,"_selectedMenuItem",2);Xi=Ll([X("ca-game-screen")],Xi);class gT extends ue{saveGame(){this.app.saveGame()}importSavefile(e){this.app.importSavefile(e)}exportSavefile(){this.app.exportSavefile()}async deleteSaveData(){await this.app.deleteSaveData()}}var vT=Object.defineProperty,bT=Object.getOwnPropertyDescriptor,yT=(t,e,r,i)=>{for(var s=i>1?void 0:i?bT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&vT(e,r,s),s};let Bu=class extends ee{constructor(){super(),this._importInputRef=je(),this.handleSaveGame=t=>{t.stopPropagation(),this.controller.saveGame()},this.handleOpenImportSavefileDialog=t=>{t.stopPropagation(),this.dispatchEvent(new sr(kr.saveImport,""))},this.handleConfirmImportSavefileDialog=t=>{t.gameAlert===kr.saveImport&&this._importInputRef.value&&this._importInputRef.value.click()},this.handleChangeImportSavefile=t=>{var r;if(t.stopPropagation(),!this._importInputRef.value)return;const e=(r=this._importInputRef.value.files)==null?void 0:r.item(0);e&&this.controller.importSavefile(e)},this.handleExportSavefile=t=>{t.stopPropagation(),this.controller.exportSavefile()},this.handleOpenDeleteSaveDataDialog=t=>{t.stopPropagation(),this.dispatchEvent(new sr(kr.saveDelete,""))},this.handleConfirmDeleteSaveDataDialog=t=>{t.gameAlert===kr.saveDelete&&this.controller.deleteSaveData().catch(r=>{console.error(r)})},this.controller=new gT(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(ht.type,this.handleConfirmImportSavefileDialog),document.addEventListener(ht.type,this.handleConfirmDeleteSaveDataDialog)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(ht.type,this.handleConfirmImportSavefileDialog),document.removeEventListener(ht.type,this.handleConfirmDeleteSaveDataDialog)}renderContent(){return O`
      <input ${qe(this._importInputRef)} type="file" id="import-file" @change=${this.handleChangeImportSavefile} />

      <sl-button variant="primary" type="button" size="medium" @click=${this.handleSaveGame}>
        <intl-message label="ui:settings:saveGame"> Save game </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleOpenImportSavefileDialog}>
        <intl-message label="ui:settings:importSavefile"> Import savefile </intl-message>
      </sl-button>

      <sl-button variant="default" type="button" size="medium" outline @click=${this.handleExportSavefile}>
        <intl-message label="ui:settings:exportSavefile"> Export savefile </intl-message>
      </sl-button>

      <sl-button variant="danger" type="button" size="medium" @click=${this.handleOpenDeleteSaveDataDialog}>
        <intl-message label="ui:settings:deleteSaveData"> Delete save data </intl-message>
      </sl-button>
    `}};Bu.styles=K`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }

    input#import-file {
      display: none;
    }
  `;Bu=yT([X("ca-savefile-panel")],Bu);class _T extends ue{get language(){return this.settingsState.language}get theme(){return this.settingsState.theme}get messageLogSize(){return this.settingsState.messageLogSize}get updateInterval(){return this.settingsState.updateInterval}get autosaveEnabled(){return this.settingsState.autosaveEnabled}get autosaveInterval(){return this.settingsState.autosaveInterval}get maxTicksPerUpdate(){return this.settingsState.maxTicksPerUpdate}get maxTicksPerFastForward(){return this.settingsState.maxTicksPerFastForward}get longNumberFormat(){return this.settingsState.longNumberFormat}async setLanguage(e){await this.settingsState.setLanguage(e),this.handleRefreshUI()}setTheme(e){this.settingsState.setTheme(e),this.handleRefreshUI()}setMessageLogSize(e){this.settingsState.setMessageLogSize(e),this.handleRefreshUI()}setUpdateInterval(e){this.settingsState.setUpdateInterval(e),this.handleRefreshUI()}setAutosaveEnabled(e){this.settingsState.setAutosaveEnabled(e),this.handleRefreshUI()}setAutosaveInterval(e){this.settingsState.setAutosaveInterval(e),this.handleRefreshUI()}setMaxTicksPerUpdate(e){this.settingsState.setMaxTicksPerUpdate(e),this.handleRefreshUI()}setMaxTicksPerFastForward(e){this.settingsState.setMaxTicksPerFastForward(e),this.handleRefreshUI()}setLongNumberFormat(e){this.settingsState.setLongNumberFormat(e),this.handleRefreshUI()}}var wT=Object.defineProperty,ST=Object.getOwnPropertyDescriptor,Bg=(t,e,r,i)=>{for(var s=i>1?void 0:i?ST(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&wT(e,r,s),s};let Yo=class extends ee{constructor(){super(),this._languageInputRef=je(),this._themeInputRef=je(),this._messageLogSizeInputRef=je(),this._updateIntervalInputRef=je(),this._autosaveEnabledSwitchRef=je(),this._autosaveIntervalInputRef=je(),this._maxTicksPerUpdateInputRef=je(),this._maxTicksPerFastForwardInputRef=je(),this._longNumberFormatInputRef=je(),this._isSaving=!1,this.startSaving=()=>{this._isSaving=!0},this.stopSaving=()=>{this._isSaving=!1},this.handleChangeLanguage=async()=>{if(this._languageInputRef.value){this.startSaving();try{await this.controller.setLanguage(this._languageInputRef.value.value)}catch(t){console.error(t)}finally{this.stopSaving()}}},this.handleChangeTheme=()=>{this._themeInputRef.value&&this.controller.setTheme(this._themeInputRef.value.value)},this.handleChangeMessageLogSize=()=>{if(!this._messageLogSizeInputRef.value)return;let t=this._messageLogSizeInputRef.value.valueAsNumber;t<1&&(t=1),t>100&&(t=100),this.controller.setMessageLogSize(t),this._messageLogSizeInputRef.value.valueAsNumber=t},this.handleChangeUpdateInterval=()=>{this._updateIntervalInputRef.value&&this.controller.setUpdateInterval(this._updateIntervalInputRef.value.value)},this.handleChangeAutosaveEnabled=()=>{this._autosaveEnabledSwitchRef.value&&this.controller.setAutosaveEnabled(this._autosaveEnabledSwitchRef.value.checked)},this.handleChangeAutosaveInterval=()=>{this._autosaveIntervalInputRef.value&&this.controller.setAutosaveInterval(this._autosaveIntervalInputRef.value.value)},this.handleChangeMaxTicksPerUpdate=()=>{this._maxTicksPerUpdateInputRef.value&&this.controller.setMaxTicksPerUpdate(this._maxTicksPerUpdateInputRef.value.value)},this.handleChangeMaxTicksPerFastForward=()=>{if(!this._maxTicksPerFastForwardInputRef.value)return;let t=this._maxTicksPerFastForwardInputRef.value.valueAsNumber;t<1&&(t=1),t>1e8&&(t=1e8),this.controller.setMaxTicksPerFastForward(t),this._maxTicksPerFastForwardInputRef.value.valueAsNumber=t},this.handleChangeLongNumberFormat=()=>{this._longNumberFormatInputRef.value&&this.controller.setLongNumberFormat(this._longNumberFormatInputRef.value.value)},this.autosaveIntervalFormatter=t=>this.controller.formatter.formatNumberDecimal(t/1e3),this.decimalNumberFormatter=t=>this.controller.formatter.formatNumberDecimal(t),this.controller=new _T(this)}renderContent(){const t=this._isSaving?this.renderSpinner():this.renderForm();return O`${t}`}updated(t){super.updated(t),this._autosaveIntervalInputRef.value&&(this._autosaveIntervalInputRef.value.tooltipFormatter=this.autosaveIntervalFormatter),this._updateIntervalInputRef.value&&(this._updateIntervalInputRef.value.tooltipFormatter=this.decimalNumberFormatter),this._maxTicksPerUpdateInputRef.value&&(this._maxTicksPerUpdateInputRef.value.tooltipFormatter=this.decimalNumberFormatter)}renderForm(){return O`
      <sl-select
        ${qe(this._languageInputRef)}
        name="language"
        value=${this.controller.language}
        @sl-change=${this.handleChangeLanguage}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:language">Language</intl-message>
        </span>

        ${BE.map(t=>O` <sl-option value=${t}>
              <intl-message label="ui:settings:languages:${t}"> Language </intl-message>
            </sl-option>`)}
      </sl-select>

      <sl-select
        ${qe(this._themeInputRef)}
        name="theme"
        value=${this.controller.theme}
        @sl-change=${this.handleChangeTheme}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:theme">Theme</intl-message>
        </span>

        ${HE.map(t=>O` <sl-option value=${t}>
              <intl-message label="ui:settings:themes:${t}"> Theme </intl-message>
            </sl-option>`)}
      </sl-select>

      <sl-input
        ${qe(this._messageLogSizeInputRef)}
        name="messageLogSize"
        value=${this.controller.messageLogSize}
        type="number"
        min="1"
        max="100"
        step="1"
        @sl-change=${this.handleChangeMessageLogSize}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:messageLogSize">Message log size</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:messageLogSizeHint">
            Excessive messages in log won't be removed until new message is received
          </intl-message>
        </span>
      </sl-input>

      <sl-select
        ${qe(this._longNumberFormatInputRef)}
        name="longNumberFormat"
        value=${this.controller.longNumberFormat}
        @sl-change=${this.handleChangeLongNumberFormat}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:longNumberFormat">Long number format</intl-message>
        </span>

        ${QE.map(t=>O` <sl-option value=${t}>
              <intl-message label="ui:settings:longNumberFormats:${t}">
                Long number format
              </intl-message>
            </sl-option>`)}
      </sl-select>

      <sl-range
        ${qe(this._updateIntervalInputRef)}
        min="25"
        max="1000"
        step="1"
        name="updateInterval"
        value=${this.controller.updateInterval}
        @sl-change=${this.handleChangeUpdateInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:updateInterval">Update interval</intl-message>
        </span>
      </sl-range>

      <sl-range
        ${qe(this._maxTicksPerUpdateInputRef)}
        min="2"
        max="100"
        step="1"
        name="maxTicksPerUpdate"
        value=${this.controller.maxTicksPerUpdate}
        @sl-change=${this.handleChangeMaxTicksPerUpdate}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxTicksPerUpdate">Max ticks per update</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxTicksPerUpdateHint">
            Excessive messages in log won't be removed until new message is received
          </intl-message>
        </span>
      </sl-range>

      <sl-switch
        ${qe(this._autosaveEnabledSwitchRef)}
        size="large"
        name="autosaveEnabled"
        ?checked=${this.controller.autosaveEnabled}
        @sl-change=${this.handleChangeAutosaveEnabled}
      >
        <span class="input-label">
          <intl-message label="ui:settings:autosaveEnabled">Autosave enabled</intl-message>
        </span>
      </sl-switch>

      <sl-range
        ${qe(this._autosaveIntervalInputRef)}
        min="10000"
        max="600000"
        step="1000"
        name="autosaveInterval"
        value=${this.controller.autosaveInterval}
        @sl-change=${this.handleChangeAutosaveInterval}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:autosaveInterval">Autosave interval</intl-message>
        </span>
      </sl-range>

      <sl-input
        ${qe(this._maxTicksPerFastForwardInputRef)}
        name="maxTicksPerFastForward"
        value=${this.controller.maxTicksPerFastForward}
        type="number"
        min="1"
        max="100000000"
        step="1"
        @sl-change=${this.handleChangeMaxTicksPerFastForward}
      >
        <span class="input-label" slot="label">
          <intl-message label="ui:settings:maxTicksPerFastForward">Max ticks per fast forward</intl-message>
        </span>

        <span slot="help-text">
          <intl-message label="ui:settings:maxTicksPerFastForwardHint">
            Too high number can cause strain on CPU
          </intl-message>
        </span>
      </sl-input>
    `}renderSpinner(){return O`
      <div class="spinner-container">
        <sl-spinner></sl-spinner>
      </div>
    `}};Yo.styles=K`
    :host {
      width: 100%;
      max-width: var(--ca-viewport-width);
      display: grid;
      column-gap: var(--sl-spacing-3x-large);
      row-gap: var(--sl-spacing-large);
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      align-items: flex-start;
      margin-bottom: var(--sl-spacing-large);
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.spinner-container {
      width: 100%;
      max-width: 20em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--sl-spacing-3x-large);
      font-size: var(--sl-font-size-3x-large);
      box-sizing: border-box;
    }

    div.spinner-container sl-spinner {
      --speed: var(--sl-transition-x-slow);
    }
  `;Bg([ae()],Yo.prototype,"_isSaving",2);Yo=Bg([X("ca-settings-form")],Yo);const yl=class yl extends Event{constructor(){super(yl.type,{bubbles:!0,composed:!0})}};yl.type="message-filter-dialog-close";let Hu=yl;class xT extends ue{isMessageEventEnabled(e){return this.settingsState.isMessageEventEnabled(e)}toggleMessageEvent(e,r){this.settingsState.toggleMessageEvent(e,r),this.handleRefreshUI()}}var PT=Object.defineProperty,CT=Object.getOwnPropertyDescriptor,Hg=(t,e,r,i)=>{for(var s=i>1?void 0:i?CT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&PT(e,r,s),s};let Jo=class extends ee{constructor(){super(),this.isOpen=!1,this.renderEventCheckbox=t=>O`
      <sl-checkbox
        size="medium"
        name="event"
        value=${t}
        ?checked=${this.controller.isMessageEventEnabled(t)}
        @sl-change=${this.handleToggleEvent}
      >
        <intl-message label=${`events:${t}:name`}> Event </intl-message>
      </sl-checkbox>
    `,this.handleClose=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new Hu)},this.handleToggleEvent=t=>{t.stopPropagation();const e=t.target;this.controller.toggleMessageEvent(e.value,e.checked)},this.controller=new xT(this)}renderContent(){return O`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:messageFilter"> Message filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:messageFilterHint">
              Enable events in filter to start adding messages for them in log.
            </intl-message>
          </p>

          <div class="events-container">${Pr(jE,t=>t,this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${Pr(qE,t=>t,this.renderEventCheckbox)}</div>

          <sl-divider></sl-divider>

          <div class="events-container">${Pr(WE,t=>t,this.renderEventCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `}};Jo.styles=K`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-small);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }

    sl-divider {
      --spacing: var(--sl-spacing-medium);
    }
  `;Hg([P({attribute:"is-open",type:Boolean})],Jo.prototype,"isOpen",2);Jo=Hg([X("ca-message-filter-dialog")],Jo);const _l=class _l extends Event{constructor(){super(_l.type,{bubbles:!0,composed:!0})}};_l.type="alert-filter-dialog-close";let Gu=_l;class AT extends ue{isAlertEnabled(e){return this.settingsState.isGameAlertEnabled(e)}toggleAlertFilterEvent(e,r){this.settingsState.toggleGameAlert(e,r),this.handleRefreshUI()}}var ET=Object.defineProperty,TT=Object.getOwnPropertyDescriptor,Gg=(t,e,r,i)=>{for(var s=i>1?void 0:i?TT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&ET(e,r,s),s};let Zo=class extends ee{constructor(){super(),this.isOpen=!1,this.renderGameAlertCheckbox=t=>O`
      <sl-checkbox
        size="medium"
        name="event"
        value=${t}
        ?checked=${this.controller.isAlertEnabled(t)}
        @sl-change=${this.handleToggleAlert}
      >
        <intl-message label=${`alerts:${t}:name`}> Alert </intl-message>
      </sl-checkbox>
    `,this.handleClose=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new Gu)},this.handleToggleAlert=t=>{const e=t.target;this.controller.toggleAlertFilterEvent(e.value,e.checked)},this.controller=new AT(this)}renderContent(){return O`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:alertFilter"> Alert filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:alertFilterHint">
              Enable alerts in filter to make them visible when event happens.
            </intl-message>
          </p>

          <div class="events-container">
            ${Pr(KE,t=>t,this.renderGameAlertCheckbox)}
          </div>

          <sl-divider></sl-divider>

          <div class="events-container">${Pr(YE,t=>t,this.renderGameAlertCheckbox)}</div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `}};Zo.styles=K`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-small);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }

    sl-divider {
      --spacing: var(--sl-spacing-medium);
    }
  `;Gg([P({attribute:"is-open",type:Boolean})],Zo.prototype,"isOpen",2);Zo=Gg([X("ca-alert-filter-dialog")],Zo);var OT=Object.defineProperty,$T=Object.getOwnPropertyDescriptor,Ml=(t,e,r,i)=>{for(var s=i>1?void 0:i?$T(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&OT(e,r,s),s};let es=class extends ee{constructor(){super(...arguments),this._isMessageFilterOpen=!1,this._isAlertFilterOpen=!1,this._isNotificationTypeFilterOpen=!1,this.handleMessageFilterDialogOpen=t=>{t.preventDefault(),t.stopPropagation(),this._isMessageFilterOpen=!0},this.handleMessageFilterDialogClose=t=>{t.preventDefault(),t.stopPropagation(),this._isMessageFilterOpen=!1},this.handleAlertFilterDialogOpen=t=>{t.preventDefault(),t.stopPropagation(),this._isAlertFilterOpen=!0},this.handleAlertFilterDialogClose=t=>{t.preventDefault(),t.stopPropagation(),this._isAlertFilterOpen=!1},this.handleNotificationTypeFilterDialogOpen=t=>{t.preventDefault(),t.stopPropagation(),this._isNotificationTypeFilterOpen=!0},this.handleNotificationTypeFilterDialogClose=t=>{t.preventDefault(),t.stopPropagation(),this._isNotificationTypeFilterOpen=!1}}renderContent(){return O`
      <sl-button variant="default" size="medium" @click=${this.handleMessageFilterDialogOpen}>
        <sl-icon slot="prefix" name="chat-left-dots"></sl-icon>
        <intl-message label="ui:settings:messageFilter">Message filter</intl-message>
      </sl-button>

      <sl-button variant="default" size="medium" @click=${this.handleAlertFilterDialogOpen}>
        <sl-icon slot="prefix" name="question-circle"></sl-icon>
        <intl-message label="ui:settings:alertFilter">Alert filter</intl-message>
      </sl-button>

      <sl-button variant="default" size="medium" @click=${this.handleNotificationTypeFilterDialogOpen}>
        <sl-icon slot="prefix" name="exclamation-circle"></sl-icon>
        <intl-message label="ui:settings:notificationTypeFilter">Notification type filter</intl-message>
      </sl-button>

      <ca-message-filter-dialog
        ?is-open=${this._isMessageFilterOpen}
        @message-filter-dialog-close=${this.handleMessageFilterDialogClose}
      >
      </ca-message-filter-dialog>

      <ca-alert-filter-dialog
        ?is-open=${this._isAlertFilterOpen}
        @alert-filter-dialog-close=${this.handleAlertFilterDialogClose}
      >
      </ca-alert-filter-dialog>

      <ca-notification-type-filter-dialog
        ?is-open=${this._isNotificationTypeFilterOpen}
        @notification-type-filter-dialog-close=${this.handleNotificationTypeFilterDialogClose}
      >
      </ca-notification-type-filter-dialog>
    `}};es.styles=K`
    :host {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--sl-spacing-large);
    }
  `;Ml([ae()],es.prototype,"_isMessageFilterOpen",2);Ml([ae()],es.prototype,"_isAlertFilterOpen",2);Ml([ae()],es.prototype,"_isNotificationTypeFilterOpen",2);es=Ml([X("ca-events-filter-panel")],es);const wl=class wl extends Event{constructor(){super(wl.type,{bubbles:!0,composed:!0})}};wl.type="notification-type-filter-dialog-close";let Vu=wl;class DT extends ue{isNotificationTypeEnabled(e){return this.settingsState.isNotificationTypeEnabled(e)}toggleNotificationTypeFilter(e,r){this.settingsState.toggleNotificationType(e,r),this.handleRefreshUI()}}var IT=Object.defineProperty,RT=Object.getOwnPropertyDescriptor,Vg=(t,e,r,i)=>{for(var s=i>1?void 0:i?RT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&IT(e,r,s),s};let Qo=class extends ee{constructor(){super(),this.isOpen=!1,this.renderGameAlertCheckbox=t=>O`
      <sl-checkbox
        size="medium"
        name="event"
        value=${t}
        ?checked=${this.controller.isNotificationTypeEnabled(t)}
        @sl-change=${this.handleToggleAlert}
      >
        <intl-message label=${`notifications:${t}:name`}> Alert </intl-message>
      </sl-checkbox>
    `,this.handleClose=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new Vu)},this.handleToggleAlert=t=>{const e=t.target;this.controller.toggleNotificationTypeFilter(e.value,e.checked)},this.controller=new DT(this)}renderContent(){return O`
      <sl-dialog ?open=${this.isOpen} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:settings:notificationTypeFilter"> Notification type filter </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:settings:notificationTypeFilterHint">
              Enable notification types in filter to see notifications for those events.
            </intl-message>
          </p>

          <div class="events-container">
            ${Pr(JE,t=>t,this.renderGameAlertCheckbox)}
          </div>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>
      </sl-dialog>
    `}};Qo.styles=K`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-small);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.events-container {
      display: grid;
      column-gap: var(--sl-spacing-3x-small);
      row-gap: var(--sl-spacing-3x-small);
      grid-template-columns: repeat(2, minmax(0, 30em));
      grid-auto-rows: auto;
    }

    sl-divider {
      --spacing: var(--sl-spacing-medium);
    }
  `;Vg([P({attribute:"is-open",type:Boolean})],Qo.prototype,"isOpen",2);Qo=Vg([X("ca-notification-type-filter-dialog")],Qo);var kT=Object.defineProperty,NT=Object.getOwnPropertyDescriptor,LT=(t,e,r,i)=>{for(var s=i>1?void 0:i?NT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&kT(e,r,s),s};let ju=class extends ee{renderContent(){return O`
      <h3 class="title">
        <intl-message label="ui:settings:settings">Settings</intl-message>
      </h3>

      <ca-savefile-panel></ca-savefile-panel>
      <sl-divider></sl-divider>
      <ca-events-filter-panel></ca-events-filter-panel>
      <sl-divider></sl-divider>
      <ca-settings-form></ca-settings-form>
    `}};ju.styles=K`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    sl-divider {
      --spacing: var(--sl-spacing-large);
    }
  `;ju=LT([X("ca-settings-page")],ju);const Sl=class Sl extends Event{constructor(e){super(Sl.type,{bubbles:!0,composed:!0}),this.district=e}};Sl.type="city-map-district-select";let Xo=Sl;class MT extends ue{constructor(e){super(e),this._map=this.cityState.getMap()}get map(){return this._map}get mapWidth(){return this.scenarioState.currentValues.mapWidth}get mapHeight(){return this.scenarioState.currentValues.mapHeight}}var FT=Object.defineProperty,UT=Object.getOwnPropertyDescriptor,Jh=(t,e,r,i)=>{for(var s=i>1?void 0:i?UT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&FT(e,r,s),s};let oa=class extends ee{constructor(){super(),this._canvasRef=je(),this.handleMouseLeave=()=>{this.dispatchEvent(new Xo(void 0))},this.handleMouseMove=t=>{const e=this.cellSizeWithBorder,r=Math.min(Math.floor(t.offsetX/e),this.controller.mapWidth-1),i=Math.min(Math.floor(t.offsetY/e),this.controller.mapHeight-1);this.dispatchEvent(new Xo(this.map[r][i]))},this.controller=new MT(this)}renderContent(){const t=this.cellSizeWithBorder,e=this.controller.mapWidth*t,r=this.controller.mapHeight*t;return O`
      <canvas
        ${qe(this._canvasRef)}
        width=${e}
        height=${r}
        @mouseleave=${this.handleMouseLeave}
        @mousemove=${this.handleMouseMove}
      >
        Canvas is not supported
      </canvas>
    `}get cellSizeWithBorder(){return this.mapCellZoom+1}get map(){return this.controller.map}firstUpdated(){this.renderCanvas()}updated(t){super.updated(t),this.renderCanvas()}renderCanvas(){if(!this._canvasRef.value)return;const t=this._canvasRef.value.getContext("2d");if(!t)throw new Error("Canvas context is not supported");const e=document.createElement("canvas");e.width=this._canvasRef.value.width,e.height=this._canvasRef.value.height;const r=e.getContext("2d");if(!r)throw new Error("Canvas context is not supported");this.renderCells(r),this.renderBorders(r),t.drawImage(e,0,0)}renderCells(t){const e=this.cellSizeWithBorder;for(let r=0;r<this.controller.mapWidth;r++)for(let i=0;i<this.controller.mapHeight;i++)t.fillStyle=this.selectedDistrict===this.map[r][i]?"#050":"#010",t.fillRect(r*e,i*e,(r+1)*e,(i+1)*e)}renderBorders(t){const e=this.cellSizeWithBorder;t.lineWidth=1,t.strokeStyle="#EEEEEE";for(let r=0;r<this.controller.mapWidth;r++)for(let i=0;i<this.controller.mapHeight;i++)r<this.controller.mapWidth-1&&this.map[r][i]!==this.map[r+1][i]&&(this.updateContextBorderStyle(t,this.map[r][i]===this.selectedDistrict||this.map[r+1][i]===this.selectedDistrict),t.beginPath(),t.moveTo((r+1)*e,i*e),t.lineTo((r+1)*e,(i+1)*e),t.stroke()),i<this.controller.mapHeight-1&&this.map[r][i]!==this.map[r][i+1]&&(this.updateContextBorderStyle(t,this.map[r][i]===this.selectedDistrict||this.map[r][i+1]===this.selectedDistrict),t.beginPath(),t.moveTo(r*e,(i+1)*e),t.lineTo((r+1)*e,(i+1)*e),t.stroke());for(let r=0;r<this.controller.mapWidth;r++)this.updateContextBorderStyle(t,this.map[r][0]===this.selectedDistrict),t.beginPath(),t.moveTo(r*e,0),t.lineTo((r+1)*e,0),t.stroke();for(let r=0;r<this.controller.mapHeight;r++)this.updateContextBorderStyle(t,this.map[0][r]===this.selectedDistrict),t.beginPath(),t.moveTo(0,r*e),t.lineTo(0,(r+1)*e),t.stroke();for(let r=0;r<this.controller.mapWidth;r++)this.updateContextBorderStyle(t,this.map[r][this.controller.mapHeight-1]===this.selectedDistrict),t.beginPath(),t.moveTo(r*e,this.controller.mapHeight*e),t.lineTo((r+1)*e,this.controller.mapHeight*e),t.stroke();for(let r=0;r<this.controller.mapHeight;r++)this.updateContextBorderStyle(t,this.map[this.controller.mapWidth-1][r]===this.selectedDistrict),t.beginPath(),t.moveTo(this.controller.mapWidth*e,r*e),t.lineTo(this.controller.mapWidth*e,(r+1)*e),t.stroke()}updateContextBorderStyle(t,e){e?t.lineWidth=2:t.lineWidth=1}};oa.styles=K`
    canvas {
      cursor: pointer;
    }
  `;Jh([P({attribute:"map-cell-zoom",type:Number})],oa.prototype,"mapCellZoom",2);Jh([P({attribute:"selected-district",type:Number})],oa.prototype,"selectedDistrict",2);oa=Jh([X("ca-city-map-canvas")],oa);var zT=Object.defineProperty,BT=Object.getOwnPropertyDescriptor,jg=(t,e,r,i)=>{for(var s=i>1?void 0:i?BT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&zT(e,r,s),s};let el=class extends ee{renderContent(){return this.districtInfo?O`
      <p><intl-message label="ui:city:cityOverview:name">Name</intl-message>: ${this.districtInfo.name}</p>
    `:null}};el.styles=K`
    p {
      margin-top: 0;
    }
  `;jg([P({attribute:!1})],el.prototype,"districtInfo",2);el=jg([X("ca-city-district-info-panel")],el);class HT extends ue{}const xl=class xl extends Event{constructor(e){super(xl.type,{bubbles:!0,composed:!0}),this.zoom=e}};xl.type="map-cell-zoom-change";let qu=xl;var GT=Object.defineProperty,VT=Object.getOwnPropertyDescriptor,Zh=(t,e,r,i)=>{for(var s=i>1?void 0:i?VT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&GT(e,r,s),s};let la=class extends ee{constructor(){super(),this._showRange=!1,this._rangeElementRef=je(),this.handleToggleZoomPanel=t=>{t.stopPropagation(),this._showRange=!this._showRange},this.handleChangeZoom=t=>{t.stopPropagation(),this._rangeElementRef.value&&this.dispatchEvent(new qu(this._rangeElementRef.value.value))},this.decimalNumberFormatter=t=>this.controller.formatter.formatNumberDecimal(t),this.controller=new HT(this)}renderContent(){const t=Ye({"range-container":!0,"show-range":this._showRange});return O`
      <div class=${t}>
        <sl-range
          ${qe(this._rangeElementRef)}
          min="1"
          max="5"
          step="1"
          tooltip="bottom"
          value=${this.zoom}
          @sl-change=${this.handleChangeZoom}
        >
        </sl-range>
      </div>

      <div class="zoom-button-container">
        <sl-tooltip placement="bottom">
          <intl-message slot="content" label="ui:city:cityOverview:toggleZoomPanel"> Toggle zoom panel </intl-message>

          <sl-icon-button
            name="zoom-in"
            label=${ir("city.cityOverview.toggleZoomPanel",{ns:"ui"})}
            @click=${this.handleToggleZoomPanel}
          >
          </sl-icon-button>
        </sl-tooltip>
      </div>
    `}updated(t){super.updated(t),this._rangeElementRef.value&&(this._rangeElementRef.value.tooltipFormatter=this.decimalNumberFormatter)}};la.styles=K`
    :host {
      display: flex;
      align-items: center;
      background-color: var(--sl-panel-background-color);
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
    }

    sl-icon-button {
      font-size: var(--sl-font-size-large);
    }

    div.range-container {
      flex: 1 1 auto;
      width: 0;
      box-sizing: border-box;
      display: none;
    }

    div.range-container.show-range {
      width: 20em;
      display: block;
      padding: var(--sl-spacing-2x-small) var(--sl-spacing-medium);
    }

    div.zoom-button-container {
      flex: 0 0 auto;
      padding: var(--sl-spacing-3x-small);
      position: relative;
    }

    sl-range {
      width: 100%;
    }
  `;Zh([P({attribute:!0,type:Number})],la.prototype,"zoom",2);Zh([ae()],la.prototype,"_showRange",2);la=Zh([X("ca-map-cell-zoom-panel")],la);class jT extends ue{get mapCellSize(){return this.settingsState.mapCellSize}getDistrictInfo(e){return this.cityState.getDistrictInfo(e)}setMapCellSize(e){this.settingsState.setMapCellSize(e),this.handleRefreshUI()}}var qT=Object.defineProperty,WT=Object.getOwnPropertyDescriptor,qg=(t,e,r,i)=>{for(var s=i>1?void 0:i?WT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&qT(e,r,s),s};let tl=class extends ee{constructor(){super(),this.handleSelectDistrict=t=>{const e=t;this._selectedDistrict=e.district},this.handleChangeZoom=t=>{const e=t,{zoom:r}=e;this.controller.setMapCellSize(r)},this.controller=new jT(this)}renderContent(){return O`
      <h3 class="title">
        <intl-message label="ui:city:cityOverview:title">City overview</intl-message>
      </h3>

      <p>
        <intl-message label="ui:city:cityOverview:hint">City overview hint</intl-message>
      </p>

      <ca-map-cell-zoom-panel zoom=${this.controller.mapCellSize} @map-cell-zoom-change=${this.handleChangeZoom}>
      </ca-map-cell-zoom-panel>

      <div class="content">
        <ca-city-map-canvas
          selected-district=${he(this._selectedDistrict)}
          map-cell-zoom=${this.controller.mapCellSize}
          @city-map-district-select=${this.handleSelectDistrict}
        >
        </ca-city-map-canvas>

        <ca-city-district-info-panel
          .districtInfo=${this._selectedDistrict!==void 0?this.controller.getDistrictInfo(this._selectedDistrict):void 0}
        >
        </ca-city-district-info-panel>
      </div>
    `}};tl.styles=K`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
    }

    div.content {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: var(--sl-spacing-medium);
      flex-wrap: wrap;
    }

    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      line-height: var(--sl-line-height-denser);
    }

    p {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }

    ca-city-map {
      flex: 0 0 auto;
    }

    ca-city-district-info-panel {
      min-width: 25em;
      flex: 1 0;
    }

    ca-map-cell-zoom-panel {
      position: absolute;
      top: 0;
      right: 0;
    }
  `;qg([ae()],tl.prototype,"_selectedDistrict",2);tl=qg([X("ca-city-overview")],tl);var KT=Object.defineProperty,YT=Object.getOwnPropertyDescriptor,JT=(t,e,r,i)=>{for(var s=i>1?void 0:i?YT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&KT(e,r,s),s};let Wu=class extends ee{renderContent(){return O`<ca-city-overview></ca-city-overview>`}};Wu.styles=K``;Wu=JT([X("ca-city-page")],Wu);class ZT extends ue{get developmentLevel(){return this.globalState.development.level}isAutoUpgradeEnabled(e){return this.getParameter(e).autoUpgradeEnabled}toggleAutoUpdateEnabled(e,r){this.getParameter(e).autoUpgradeEnabled=r}getLevel(e){return this.getParameter(e).level}purchase(e,r){this.getParameter(r).purchase(e)}checkCanPurchase(e,r){return this.getParameter(r).checkCanPurchase(e)}getPurchaseCost(e,r){return this.getParameter(r).getIncreaseCost(e)}isHardwareAutomationUnlocked(){return this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.automationMainframeHardware)}getParameter(e){switch(e){case"performance":return this.mainframeHardwareState.performance;case"cores":return this.mainframeHardwareState.cores;case"ram":return this.mainframeHardwareState.ram;default:throw new Error("Invalid hardware panel article type")}}}var QT=Object.defineProperty,XT=Object.getOwnPropertyDescriptor,Qh=(t,e,r,i)=>{for(var s=i>1?void 0:i?XT(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&QT(e,r,s),s};let ca=class extends ee{constructor(){super(),this.handleBuy=t=>{t.stopPropagation(),t.preventDefault();const e=this.calculateIncrease();this.controller.purchase(e,this.type)},this.handleToggleAutoUpgrade=t=>{t.stopPropagation(),t.preventDefault();const e=this.controller.isAutoUpgradeEnabled(this.type);this.controller.toggleAutoUpdateEnabled(this.type,!e)},this.handleDragStart=t=>{t.dataTransfer&&t.dataTransfer.setData("text/plain",this.type)},this.controller=new ZT(this)}renderContent(){const t=this.calculateIncrease(),e=this.controller.formatter,r=this.controller.getLevel(this.type),i=!this.controller.checkCanPurchase(t,this.type),s=this.controller.getPurchaseCost(t,this.type),o=JSON.stringify({cost:e.formatNumberLong(s),increase:e.formatNumberDecimal(t)}),l=this.controller.isAutoUpgradeEnabled(this.type)?"arrow-up-circle-fill":"arrow-up-circle";return O`
      <div class="text-container">
        <div class="text-container-inner">
          <h4 class="title" draggable="true" @dragstart=${this.handleDragStart}>
            <intl-message label="ui:mainframe:hardware:${this.type}" value=${e.formatNumberDecimal(r)}>
              Level
            </intl-message>

            <sl-tooltip>
              <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgrade">
                Toggle autoupgrade
              </intl-message>

              ${this.controller.isHardwareAutomationUnlocked()?O`
                    <sl-icon-button
                      id="toggle-autoupgrade-btn"
                      name=${l}
                      label=${ir("mainframe.programs.toggleAutoupgrade",{ns:"ui"})}
                      @click=${this.handleToggleAutoUpgrade}
                    >
                    </sl-icon-button>
                  `:null}
            </sl-tooltip>
          </h4>
          <p class="hint">
            <intl-message label="ui:mainframe:hardware:${this.type}Hint"> Higher level leads to profit. </intl-message>
          </p>
        </div>
      </div>

      <div class="button-container">
        <ca-purchase-tooltip cost=${s} level=${r+1}>
          <sl-button variant="primary" type="button" size="medium" ?disabled=${i} @click=${this.handleBuy}>
            <intl-message label="ui:mainframe:hardware:buy" value=${o}> Buy </intl-message>
          </sl-button>
        </ca-purchase-tooltip>
      </div>
    `}calculateIncrease(){return Math.max(Math.min(this.maxIncrease,this.controller.developmentLevel-this.controller.getLevel(this.type)),1)}};ca.styles=K`
    :host {
      width: 100%;
      padding: var(--sl-spacing-large);
      box-sizing: border-box;
      border: var(--ca-border);
      border-radius: var(--sl-border-radius-small);
      display: flex;
      align-items: center;
      gap: var(--sl-spacing-3x-large);
    }

    div.text-container {
      flex: 1 1 auto;
      overflow: hidden;
    }

    div.text-container-inner {
      max-width: 100%;
    }

    div.button-container {
      flex: 0 0 auto;
    }

    h4.title {
      width: 100%;
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      line-height: var(--sl-line-height-denser);
      cursor: grab;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    p.hint {
      width: 100%;
      margin: 0;
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    h4.title sl-icon-button {
      position: relative;
      top: 0.1em;
    }
  `;Qh([P({attribute:"type",type:String})],ca.prototype,"type",2);Qh([P({attribute:"max-increase",type:Number})],ca.prototype,"maxIncrease",2);ca=Qh([X("ca-mainframe-hardware-panel-article")],ca);const Ku=(t,e)=>e.baseMultiplier*Math.pow(e.base,t),Wg=(t,e,r)=>{let i=t,s=e-t,o;for(;s>0;)o=i+s,o<=e&&r(o)?i=o:s=Math.floor(s/2);return i},eO=t=>t<0?0:t>100?100:Math.floor(t),Kg=t=>t>=0&&t<=100;function cs(t,e,r){let i=r;i<0&&(i=0),i>=t.length&&(i=t.length-1);const s=t[e];if(e<i)for(let o=e;o<i;o++)t[o]=t[o+1];else for(let o=e;o>i;o--)t[o]=t[o-1];t[i]=s}class tO extends ue{listParameters(){return this.mainframeHardwareState.listParameters()}moveParameter(e,r){this.mainframeHardwareState.moveParameter(e,r)}}const rO=120,nO=140;var iO=Object.defineProperty,sO=Object.getOwnPropertyDescriptor,xa=(t,e,r,i)=>{for(var s=i>1?void 0:i?sO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&iO(e,r,s),s};let vi=class extends ee{constructor(){super(),this._articlesListRef=je(),this._shiftPressed=!1,this._ctrlPressed=!1,this.renderParametersList=()=>{let e=this.controller.listParameters();if(this._draggedParameterType&&this._draggedParameterPosition!==void 0){const r=e.findIndex(s=>s.type===this._draggedParameterType),i=[...e];cs(i,r,this._draggedParameterPosition),e=i}return Pr(e,r=>r.type,this.renderParameter)},this.renderParameter=e=>{const r=this.getMaxIncrease();return O`
      <ca-mainframe-hardware-panel-article
        class=${e.type===this._draggedParameterType?"dragged":""}
        type=${e.type}
        max-increase=${r}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
      </ca-mainframe-hardware-panel-article>
    `},this.handleKeypress=e=>{this._shiftPressed=e.shiftKey,this._ctrlPressed=e.ctrlKey},this.handleDragStart=e=>{e.stopPropagation(),e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.dropEffect="move",e.dataTransfer.setDragImage(Yh,0,0),this._draggedParameterType=e.dataTransfer.getData("text/plain"))},this.handleDragOver=e=>{if(e.stopPropagation(),e.preventDefault(),this._articlesListRef.value){const r=this._articlesListRef.value.getBoundingClientRect(),i=Math.max(e.clientY-r.top,0);this._draggedParameterPosition=Math.min(Math.floor(i/nO),this.controller.listParameters().length-1)}},this.handleDragEnd=e=>{e.stopPropagation(),this._draggedParameterType&&this._draggedParameterPosition!==void 0&&this.controller.moveParameter(this._draggedParameterType,this._draggedParameterPosition),this._draggedParameterType=void 0,this._draggedParameterPosition=void 0},this.controller=new tO(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.handleKeypress),window.addEventListener("keyup",this.handleKeypress)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.handleKeypress),window.removeEventListener("keyup",this.handleKeypress)}renderContent(){return O`
      <p class="hint">
        <intl-message label="ui:mainframe:hardware:hardwareHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>

      <div class="articles-list" ${qe(this._articlesListRef)} @dragover=${this.handleDragOver}>
        ${this.renderParametersList()}
      </div>
    `}getMaxIncrease(){let e=1;return this._shiftPressed&&(e*=10),this._ctrlPressed&&(e*=10),e}};vi.styles=K`
    :host {
      display: block;
      width: 100%;
      max-width: var(--ca-viewport-width);
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.articles-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--sl-spacing-large);
    }

    div.articles-list ca-mainframe-hardware-panel-article {
      width: 100%;
      height: ${rO}px;
    }

    div.articles-list ca-mainframe-hardware-panel-article.dragged {
      background-color: var(--ca-dragged-color);
    }
  `;xa([ae()],vi.prototype,"_shiftPressed",2);xa([ae()],vi.prototype,"_ctrlPressed",2);xa([ae()],vi.prototype,"_draggedParameterType",2);xa([ae()],vi.prototype,"_draggedParameterPosition",2);vi=xa([X("ca-mainframe-hardware-panel")],vi);var mt=(t=>(t.shareServer="shareServer",t.codeGenerator="codeGenerator",t.predictiveComputator="predictiveComputator",t.mainframeHardwareAutobuyer="mainframeHardwareAutobuyer",t.mainframeProgramsAutobuyer="mainframeProgramsAutobuyer",t))(mt||{});const aO=Object.values(mt),Bs={PROGRAM_UPGRADED:Symbol("PROGRAM_UPGRADED")},Pl=class Pl extends Event{constructor(){super(Pl.type,{bubbles:!0,composed:!0})}};Pl.type="purchase-program-dialog-close";let rl=Pl;class oO extends ue{hostDisconnected(){super.hostDisconnected(),this.deleteSelectedProgram()}get money(){return this.globalState.money.money}get developmentLevel(){return this.globalState.development.level}getSelectedProgram(e,r,i){var s;return(((s=this._selectedProgram)==null?void 0:s.name)!==e||this._selectedProgram.level!==r||this._selectedProgram.quality!==i)&&(this.deleteSelectedProgram(),this._selectedProgram=this.programFactory.makeProgram({name:e,level:r,quality:i,autoUpgradeEnabled:!0})),this._selectedProgram}getOwnedProgram(e){return this.mainframeProgramsState.getOwnedProgramByName(e)}purchaseProgram(e,r,i){return this.mainframeProgramsState.purchaseProgram({name:e,level:r,quality:i,autoUpgradeEnabled:!0})}deleteSelectedProgram(){this._selectedProgram&&(this.removeEventListenersByEmitter(this._selectedProgram),this.programFactory.deleteProgram(this._selectedProgram))}}var lO=Object.defineProperty,cO=Object.getOwnPropertyDescriptor,us=(t,e,r,i)=>{for(var s=i>1?void 0:i?cO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&lO(e,r,s),s};let Ln=class extends ee{constructor(){super(),this._programInputRef=je(),this._levelInputRef=je(),this._qualityInputRef=je(),this.isOpen=!1,this._programName=void 0,this._level=1,this._quality=0,this._confirmationAlertVisible=!1,this.handleClose=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new rl)},this.handleProgramChange=()=>{this._programInputRef.value&&(this._programName=this._programInputRef.value.value)},this.handleLevelChange=()=>{if(!this._levelInputRef.value)return;let t=this._levelInputRef.value.valueAsNumber;t<1&&(t=1),t>this.controller.developmentLevel&&(t=this.controller.developmentLevel),this._level=t,this._levelInputRef.value.valueAsNumber=t},this.handleQualityChange=()=>{this._qualityInputRef.value&&(this._quality=+this._qualityInputRef.value.value)},this.handleOpenConfirmationAlert=t=>{if(t.stopPropagation(),t.preventDefault(),!this._programName)return;const e=this.controller.getOwnedProgram(this._programName);if(e){const r=this.controller.formatter,i=JSON.stringify({programName:this._programName,level:r.formatNumberDecimal(e.level),quality:r.formatQuality(e.quality)});this._confirmationAlertVisible=!0,this.dispatchEvent(new sr($t.purchaseProgramOverwrite,i))}else this.purchase()},this.handleConfirmConfirmationAlert=t=>{t.gameAlert===$t.purchaseProgramOverwrite&&(this._confirmationAlertVisible=!1,this.purchase())},this.purchase=()=>{if(!this._programName)return;this.controller.purchaseProgram(this._programName,this._level,this._quality)&&this.dispatchEvent(new rl)},this.handleCloseConfirmationAlert=t=>{t.gameAlert===$t.purchaseProgramOverwrite&&(this._confirmationAlertVisible=!1)},this.controller=new oO(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(mi.type,this.handleCloseConfirmationAlert),document.addEventListener(ht.type,this.handleConfirmConfirmationAlert)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(mi.type,this.handleCloseConfirmationAlert),document.removeEventListener(ht.type,this.handleConfirmConfirmationAlert)}updated(t){super.updated(t),t.get("isOpen")===!1&&(this._programName=void 0,this._level=this.controller.developmentLevel,this._quality=0,this._confirmationAlertVisible=!1)}renderContent(){const{formatter:t,money:e,developmentLevel:r}=this.controller,i=this._programName?this.controller.getSelectedProgram(this._programName,this._level,this._quality):void 0,s=i?i.cost:0,o=JSON.stringify({cost:t.formatNumberLong(s)}),l=!(i&&this._level<=r&&s<=e);return O`
      <sl-dialog ?open=${this.isOpen&&!this._confirmationAlertVisible} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:programs:purchaseProgram"> Purchase a program </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:programs:purchaseProgramDialogHint">
              Select program type, level and quality to purchase it.
            </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select
              ${qe(this._programInputRef)}
              name="program"
              value=${this._programName??""}
              hoist
              @sl-change=${this.handleProgramChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:program">Program</intl-message>
              </span>

              ${aO.map(d=>O`<sl-option value=${d}>
                    <intl-message label="programs:${d}:name"> Program </intl-message>
                  </sl-option>`)}
            </sl-select>

            <sl-input
              ${qe(this._levelInputRef)}
              name="level"
              value=${this._level}
              type="number"
              min="1"
              max=${r}
              step="1"
              @sl-change=${this.handleLevelChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:level">Level</intl-message>
              </span>
            </sl-input>

            <sl-select
              ${qe(this._qualityInputRef)}
              name="quality"
              value=${this._quality}
              hoist
              @sl-change=${this.handleQualityChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:quality">Quality</intl-message>
              </span>

              ${ZE.map(d=>O` <sl-option value=${d}> ${t.formatQuality(d)} </sl-option>`)}
            </sl-select>
          </div>

          <ca-program-description
            program-name=${he(this._programName)}
            level=${this._level}
            quality=${this._quality}
            threads=${1}
          >
          </ca-program-description>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <ca-purchase-tooltip cost=${s} level=${this._level} slot="footer">
          <sl-button
            size="medium"
            variant="primary"
            ?disabled=${l}
            @click=${this.handleOpenConfirmationAlert}
          >
            <intl-message label="ui:mainframe:programs:purchase" value=${o}> Purchase </intl-message>
          </sl-button>
        </ca-purchase-tooltip>
      </sl-dialog>
    `}};Ln.styles=K`
    sl-dialog {
      --width: 50rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    div.inputs-container {
      display: grid;
      column-gap: var(--sl-spacing-medium);
      grid-template-columns: repeat(3, 1fr);
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    ca-program-description[program-name] {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }
  `;us([P({attribute:"is-open",type:Boolean})],Ln.prototype,"isOpen",2);us([ae()],Ln.prototype,"_programName",2);us([ae()],Ln.prototype,"_level",2);us([ae()],Ln.prototype,"_quality",2);us([ae()],Ln.prototype,"_confirmationAlertVisible",2);Ln=us([X("ca-purchase-program-dialog")],Ln);class uO extends ue{listOwnedPrograms(){return this.mainframeProgramsState.listOwnedPrograms()}toggleAutoupgrade(e){this.mainframeProgramsState.toggleProgramsAutoUpgrade(e)}moveProgram(e,r){this.mainframeProgramsState.moveProgram(e,r)}isProgramsAutomationUnlocked(){return this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.automationMainframePrograms)}}const Yg=64;var hO=Object.defineProperty,dO=Object.getOwnPropertyDescriptor,Xh=(t,e,r,i)=>{for(var s=i>1?void 0:i?dO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&hO(e,r,s),s};let ua=class extends ee{constructor(){super(),this._tbodyRef=je(),this.renderList=()=>{let t=this.controller.listOwnedPrograms();if(t.length===0)return this.renderEmptyListNotification();if(this._draggedItemName&&this._draggedItemPosition!==void 0){const e=t.findIndex(i=>i.name===this._draggedItemName),r=[...t];cs(r,e,this._draggedItemPosition),t=r}return Pr(t,e=>e.name,this.renderListItem)},this.renderEmptyListNotification=()=>O`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:programs:emptyListNotification"> You don't have any programs </intl-message>
        </td>
      </tr>
    `,this.renderListItem=t=>O`
      <ca-owned-programs-list-item
        class=${t.name===this._draggedItemName?"dragged":""}
        program-name=${t.name}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
      </ca-owned-programs-list-item>
    `,this.handleToggleAutoupgrade=t=>{t.stopPropagation(),t.preventDefault();const e=this.checkSomeProgramsAutoupgradeActive();this.controller.toggleAutoupgrade(!e)},this.handleDragStart=t=>{t.stopPropagation(),t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.dropEffect="move",t.dataTransfer.setDragImage(Yh,0,0),this._draggedItemName=t.dataTransfer.getData("text/plain"))},this.handleDragOver=t=>{if(t.stopPropagation(),t.preventDefault(),this._tbodyRef.value){const e=this._tbodyRef.value.getBoundingClientRect(),r=Math.max(t.clientY-e.top,0);this._draggedItemPosition=Math.min(Math.floor(r/Yg),this.controller.listOwnedPrograms().length-1)}},this.handleDragEnd=t=>{t.stopPropagation(),this._draggedItemName&&this._draggedItemPosition!==void 0&&this.controller.moveProgram(this._draggedItemName,this._draggedItemPosition),this._draggedItemName=void 0,this._draggedItemPosition=void 0},this.controller=new uO(this)}renderContent(){const e=this.checkSomeProgramsAutoupgradeActive()?"arrow-up-circle-fill":"arrow-up-circle";return O`
      <table>
        <thead>
          <th class="program">
            <intl-message label="ui:mainframe:program">Program</intl-message>
          </th>
          <th class="level">
            <intl-message label="ui:mainframe:level">Level</intl-message>
          </th>
          <th class="quality">
            <intl-message label="ui:mainframe:quality">Quality</intl-message>
          </th>
          ${this.controller.isProgramsAutomationUnlocked()?O`
                <th class="autoupgrade">
                  <sl-tooltip>
                    <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgradeAll">
                      Toggle autoupgrade
                    </intl-message>

                    <sl-icon-button
                      id="toggle-autoupgrade-btn"
                      name=${e}
                      label=${ir("mainframe.programs.toggleAutoupgradeAll",{ns:"ui"})}
                      @click=${this.handleToggleAutoupgrade}
                    >
                    </sl-icon-button>
                  </sl-tooltip>
                </th>
              `:null}
        </thead>

        <tbody ${qe(this._tbodyRef)} @dragover=${this.handleDragOver}>
          ${this.renderList()}
        </tbody>
      </table>
    `}checkSomeProgramsAutoupgradeActive(){return this.controller.listOwnedPrograms().some(e=>e.autoUpgradeEnabled)}};ua.styles=K`
    :host {
      width: 100%;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: var(--sl-font-weight-bold);
    }

    th.program {
      width: 40%;
      cursor: grab;
    }

    th.level {
      width: 25%;
    }

    th.quality {
      width: 25%;
    }

    th.autoupgrade {
      width: auto;
      text-align: right;
      font-size: var(--sl-font-size-large);
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.notification td {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }

    tbody ca-owned-programs-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    tbody ca-owned-programs-list-item {
      height: ${Yg}px;
    }

    tbody ca-owned-programs-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }
  `;Xh([ae()],ua.prototype,"_draggedItemName",2);Xh([ae()],ua.prototype,"_draggedItemPosition",2);ua=Xh([X("ca-owned-programs-list")],ua);class pO extends ue{getProgram(e){var r;return((r=this._ownedProgram)==null?void 0:r.name)!==e&&(this._ownedProgram&&this.removeEventListenersByEmitter(this._ownedProgram),this._ownedProgram=this.mainframeProgramsState.getOwnedProgramByName(e)),this._ownedProgram}isProgramsAutomationUnlocked(){return this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.automationMainframePrograms)}}var fO=Object.defineProperty,mO=Object.getOwnPropertyDescriptor,Jg=(t,e,r,i)=>{for(var s=i>1?void 0:i?mO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&fO(e,r,s),s};let nl=class extends ee{constructor(){super(),this.programName=mt.shareServer,this.handleToggleAutoUpgrade=t=>{t.stopPropagation(),t.preventDefault();const e=this.controller.getProgram(this.programName);e&&(e.autoUpgradeEnabled=!e.autoUpgradeEnabled)},this.handleDragStart=t=>{t.dataTransfer&&t.dataTransfer.setData("text/plain",this.programName)},this.controller=new pO(this)}renderContent(){const t=this.controller.formatter,e=this.controller.getProgram(this.programName);if(!e)return O``;const r=e.autoUpgradeEnabled?"arrow-up-circle-fill":"arrow-up-circle";return O`
      <td class="program" draggable="true" @dragstart=${this.handleDragStart}>
        <intl-message id="title" label="programs:${e.name}:name"> Progam name </intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-program-description
            slot="content"
            program-name=${e.name}
            level=${e.level}
            quality=${e.quality}
            threads=${1}
          >
          </ca-program-description>
        </sl-tooltip>
      </td>

      <td class="level">${t.formatNumberDecimal(e.level)}</td>

      <td class="quality">${t.formatQuality(e.quality)}</td>

      ${this.controller.isProgramsAutomationUnlocked()?O`
            <td class="autoupgrade">
              <sl-tooltip>
                <intl-message slot="content" label="ui:mainframe:programs:toggleAutoupgrade">
                  Toggle autoupgrade
                </intl-message>

                <sl-icon-button
                  id="toggle-autoupgrade-btn"
                  name=${r}
                  label=${ir("mainframe.programs.toggleAutoupgrade",{ns:"ui"})}
                  @click=${this.handleToggleAutoUpgrade}
                >
                </sl-icon-button>
              </sl-tooltip>
            </td>
          `:null}
    `}};nl.styles=K`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 40%;
      cursor: grab;
    }

    td.level {
      width: 25%;
    }

    td.quality {
      width: 25%;
    }

    td.autoupgrade {
      width: auto;
      text-align: right;
      font-size: var(--sl-font-size-large);
    }

    td {
      text-align: left;
      vertical-align: middle;
      padding: var(--sl-spacing-small);
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    sl-icon[name='question-circle'] {
      position: relative;
      top: 0.25em;
      margin-left: 0.5em;
      color: var(--ca-hint-color);
      font-size: var(--sl-font-size-large);
    }
  `;Jg([P({attribute:"program-name",type:String})],nl.prototype,"programName",2);nl=Jg([X("ca-owned-programs-list-item")],nl);var gO=Object.defineProperty,vO=Object.getOwnPropertyDescriptor,Zg=(t,e,r,i)=>{for(var s=i>1?void 0:i?vO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&gO(e,r,s),s};let il=class extends ee{constructor(){super(...arguments),this._isPurchaseProgramDialogOpen=!1,this.handlePurchaseProgramDialogOpen=t=>{t.preventDefault(),t.stopPropagation(),this._isPurchaseProgramDialogOpen=!0},this.handlePurchaseProgramDialogClose=t=>{t.preventDefault(),t.stopPropagation(),this._isPurchaseProgramDialogOpen=!1}}renderContent(){return O`
      <p class="hint">
        <intl-message label="ui:mainframe:programs:programsHint">
          Press either ctrl or shift to buy 10 levels. Press both ctrl and shift to buy 100 levels.
        </intl-message>
      </p>

      <sl-button variant="primary" size="medium" @click=${this.handlePurchaseProgramDialogOpen}>
        <intl-message label="ui:mainframe:programs:purchaseProgram"> Purchase a program </intl-message>
      </sl-button>

      <ca-purchase-program-dialog
        ?is-open=${this._isPurchaseProgramDialogOpen}
        @purchase-program-dialog-close=${this.handlePurchaseProgramDialogClose}
      >
      </ca-purchase-program-dialog>

      <ca-owned-programs-list></ca-owned-programs-list>
    `}};il.styles=K`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    ca-owned-programs-list {
      margin-top: var(--sl-spacing-large);
    }

    p.hint {
      margin: 0 0 var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }
  `;Zg([ae()],il.prototype,"_isPurchaseProgramDialogOpen",2);il=Zg([X("ca-mainframe-programs-panel")],il);class bO extends ue{get availableCores(){return this.mainframeProcessesState.availableCores}get availableRam(){return this.mainframeProcessesState.availableRam}}var yO=Object.defineProperty,_O=Object.getOwnPropertyDescriptor,Qg=(t,e,r,i)=>{for(var s=i>1?void 0:i?_O(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&yO(e,r,s),s};let sl=class extends ee{constructor(){super(),this._isStartProcessDialogOpen=!1,this.handleStartProcessDialogOpen=t=>{t.preventDefault(),t.stopPropagation(),this._isStartProcessDialogOpen=!0},this.handleStartProcessDialogClose=t=>{t.preventDefault(),t.stopPropagation(),this._isStartProcessDialogOpen=!1},this.controller=new bO(this)}renderContent(){const t=this.controller.formatter;return O`
      <p class="hint">
        <intl-message label="ui:mainframe:processes:processesHint"> Start process hint. </intl-message>
      </p>

      <div class="top-container">
        <sl-button variant="primary" size="medium" @click=${this.handleStartProcessDialogOpen}>
          <intl-message label="ui:mainframe:processes:startProcess"> Purchase a program </intl-message>
        </sl-button>
        <div>
          <intl-message
            label="ui:mainframe:processes:availableCores"
            value=${t.formatNumberDecimal(this.controller.availableCores)}
          >
            Available cores
          </intl-message>
        </div>
        <div>
          <intl-message
            label="ui:mainframe:processes:availableRam"
            value=${t.formatNumberDecimal(this.controller.availableRam)}
          >
            Available ram
          </intl-message>
        </div>
      </div>

      <ca-start-process-dialog
        ?is-open=${this._isStartProcessDialogOpen}
        @start-process-dialog-close=${this.handleStartProcessDialogClose}
      >
      </ca-start-process-dialog>

      <ca-processes-list></ca-processes-list>
    `}};sl.styles=K`
    :host {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    div.top-container {
      display: flex;
      align-items: center;
      gap: var(--sl-spacing-3x-large);
    }

    ca-processes-list {
      margin-top: var(--sl-spacing-large);
    }
  `;Qg([ae()],sl.prototype,"_isStartProcessDialogOpen",2);sl=Qg([X("ca-mainframe-processes-panel")],sl);const Cl=class Cl extends Event{constructor(){super(Cl.type,{bubbles:!0,composed:!0})}};Cl.type="start-process-dialog-close";let al=Cl;class wO extends ue{get ram(){return this.mainframeHardwareState.ram.level}get cores(){return this.mainframeHardwareState.cores.level}getAvailableRamForProgram(e){let r=this.mainframeProcessesState.availableRam;if(e){const i=this.mainframeProcessesState.getProcessByName(e);i&&(r+=i.totalRam)}return r}listPrograms(){return this.mainframeProgramsState.listOwnedPrograms()}getProgram(e){var r;return((r=this._program)==null?void 0:r.name)!==e&&this._program&&this.removeEventListenersByEmitter(this._program),this._program=this.mainframeProgramsState.getOwnedProgramByName(e),this._program}getRunningScalableProgram(){return this.mainframeProcessesState.runningScalableProcess}getProcessByName(e){return this.mainframeProcessesState.getProcessByName(e)}startProcess(e,r){return this.mainframeProcessesState.addProcess(e,r)}}var SO=Object.defineProperty,xO=Object.getOwnPropertyDescriptor,hs=(t,e,r,i)=>{for(var s=i>1?void 0:i?xO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&SO(e,r,s),s};let Mn=class extends ee{constructor(){super(),this._programInputRef=je(),this._threadsInputRef=je(),this.isOpen=!1,this._programName=void 0,this._threads=1,this._maxThreads=1,this._confirmationAlertVisible=!1,this.handleClose=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new al)},this.handleProgramChange=()=>{if(!this._programInputRef.value)return;this._programName=this._programInputRef.value.value;const t=this.controller.getProgram(this._programName),e=this.controller.getAvailableRamForProgram(this._programName);this._maxThreads=1,t&&!t.isAutoscalable&&(this._maxThreads=Math.max(Math.floor(e/t.ram),0))},this.handleThreadsChange=()=>{if(!this._threadsInputRef.value)return;let t=this._threadsInputRef.value.valueAsNumber;t>this._maxThreads&&(t=this._maxThreads),t<1&&(t=1),this._threads=t,this._threadsInputRef.value.valueAsNumber=t},this.handleOpenConfirmationAlert=t=>{if(t.stopPropagation(),t.preventDefault(),!this._programName)return;const e=this.controller.getProgram(this._programName),r=this.controller.getRunningScalableProgram(),i=this.controller.getProcessByName(this._programName),s=this.controller.formatter;if(i){const o=JSON.stringify({programName:this._programName,threads:s.formatNumberDecimal(i.threads)});this._confirmationAlertVisible=!0,this.dispatchEvent(new sr($t.processReplace,o))}else if(e!=null&&e.isAutoscalable&&r){const o=JSON.stringify({programName:r.program.name});this._confirmationAlertVisible=!0,this.dispatchEvent(new sr($t.scalableProcessReplace,o))}else this.startProcess()},this.handleConfirmConfirmationAlert=t=>{const e=t;e.gameAlert!==$t.processReplace&&e.gameAlert!==$t.scalableProcessReplace||(this._confirmationAlertVisible=!1,this.startProcess())},this.startProcess=()=>{this._programName&&this.controller.startProcess(this._programName,this._threads)&&this.dispatchEvent(new al)},this.handleCloseConfirmationAlert=t=>{const e=t;e.gameAlert!==$t.processReplace&&e.gameAlert!==$t.scalableProcessReplace||(this._confirmationAlertVisible=!1)},this.formatProgramSelectItem=t=>{const e=this.controller.formatter,r=JSON.stringify({programName:t.name,level:e.formatNumberDecimal(t.level),quality:e.formatQuality(t.quality)});return O`<sl-option value=${t.name}>
      <intl-message label="ui:mainframe:processes:programSelectItem" value=${r}> Program </intl-message>
    </sl-option>`},this.controller=new wO(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(mi.type,this.handleCloseConfirmationAlert),document.addEventListener(ht.type,this.handleConfirmConfirmationAlert)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(mi.type,this.handleCloseConfirmationAlert),document.removeEventListener(ht.type,this.handleConfirmConfirmationAlert)}updated(t){super.updated(t),t.get("isOpen")===!1&&(this._programName=void 0,this._threads=1,this._confirmationAlertVisible=!1)}renderContent(){const t=this._programName?this.controller.getProgram(this._programName):void 0,e=t!=null&&t.isAutoscalable?this.controller.cores:this._threads,r=!(t&&!t.isAutoscalable),i=!(t&&(t.isAutoscalable||this._threads>=1&&this._threads<=this._maxThreads));return O`
      <sl-dialog ?open=${this.isOpen&&!this._confirmationAlertVisible} @sl-request-close=${this.handleClose}>
        <h4 slot="label" class="title">
          <intl-message label="ui:mainframe:processes:startProcess"> Start process </intl-message>
        </h4>

        <div class="body">
          <p class="hint">
            <intl-message label="ui:mainframe:processes:startProcessDialogHint"> Select program. </intl-message>
          </p>

          <div class="inputs-container">
            <sl-select
            ${qe(this._programInputRef)}
             name="program" value=${this._programName??""} hoist @sl-change=${this.handleProgramChange}>
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:program">Program</intl-message>
              </span>

              ${this.controller.listPrograms().map(this.formatProgramSelectItem)}
            </sl-select>

            <sl-input
            ${qe(this._threadsInputRef)}
              name="threads"
              value=${this._threads}
              type="number"
              min="1"
              max=${Math.max(this._maxThreads,1)}
              step="1"
              ?disabled=${r}
              @sl-change=${this.handleThreadsChange}
            >
              <span class="input-label" slot="label">
                <intl-message label="ui:mainframe:threads">Threads</intl-message>
              </span>
            </sl-input>
            </sl-select>
          </div>

          <ca-program-description
            program-name=${he(this._programName)}
            level=${(t==null?void 0:t.level)??1}
            quality=${(t==null?void 0:t.quality)??0}
            threads=${e}
          >
          </ca-program-description>
        </div>

        <sl-button slot="footer" size="medium" variant="default" outline @click=${this.handleClose}>
          <intl-message label="ui:common:close"> Close </intl-message>
        </sl-button>

        <sl-button ?disabled=${i} slot="footer" size="medium" variant="primary" @click=${this.handleOpenConfirmationAlert}>
          <intl-message label="ui:mainframe:processes:startProcess"> Start process </intl-message>
        </sl-button>
      </sl-dialog>
    `}};Mn.styles=K`
    sl-dialog {
      --width: 40rem;
    }

    sl-dialog::part(body) {
      padding-top: 0;
      padding-bottom: 0;
    }

    sl-dialog::part(footer) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--sl-spacing-small);
    }

    h4.title {
      font-size: var(--sl-font-size-large);
      font-weight: var(--sl-font-weight-bold);
      margin: 0;
    }

    div.body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    div.inputs-container {
      display: grid;
      column-gap: var(--sl-spacing-medium);
      grid-template-columns: 2fr 1fr;
    }

    p.hint {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-medium);
      color: var(--ca-hint-color);
      font-size: var(--ca-hint-font-size);
    }

    ca-program-description[program-name] {
      margin-top: var(--sl-spacing-medium);
      margin-bottom: 0;
    }

    span.input-label {
      font-size: var(--sl-font-size-medium);
      line-height: var(--sl-line-height-dense);
    }

    div.footer {
      display: flex;
    }
  `;hs([P({attribute:"is-open",type:Boolean})],Mn.prototype,"isOpen",2);hs([ae()],Mn.prototype,"_programName",2);hs([ae()],Mn.prototype,"_threads",2);hs([ae()],Mn.prototype,"_maxThreads",2);hs([ae()],Mn.prototype,"_confirmationAlertVisible",2);Mn=hs([X("ca-start-process-dialog")],Mn);class PO extends ue{listProcesses(){return this.mainframeProcessesState.listProcesses()}toggleAllProcesses(e){this.mainframeProcessesState.toggleAllProcesses(e)}deleteAllProcesses(){this.mainframeProcessesState.deleteAllProcesses()}moveProcess(e,r){this.mainframeProcessesState.moveProcess(e,r)}}const Xg=61;var CO=Object.defineProperty,AO=Object.getOwnPropertyDescriptor,ed=(t,e,r,i)=>{for(var s=i>1?void 0:i?AO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&CO(e,r,s),s};let ha=class extends ee{constructor(){super(),this._tbodyRef=je(),this.renderList=()=>{let t=this.controller.listProcesses();if(t.length===0)return this.renderEmptyListNotification();if(this._draggedItemName&&this._draggedItemPosition!==void 0){const e=t.findIndex(i=>i.program.name===this._draggedItemName),r=[...t];cs(r,e,this._draggedItemPosition),t=r}return Pr(t,e=>e,this.renderListItem)},this.renderEmptyListNotification=()=>O`
      <tr class="notification">
        <td colspan="4">
          <intl-message label="ui:mainframe:processes:emptyListNotification">
            You don't have any processes
          </intl-message>
        </td>
      </tr>
    `,this.renderListItem=t=>O`
      <ca-processes-list-item
        class=${t.program.name===this._draggedItemName?"dragged":""}
        program-name=${t.program.name}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
      </ca-processes-list-item>
    `,this.handleToggleAllProcesses=t=>{t.preventDefault(),t.stopPropagation();const e=this.checkSomeProcessesActive();this.controller.toggleAllProcesses(!e)},this.handleOpenDeleteAllProcessesDialog=t=>{t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new sr($t.deleteAllProcesses,""))},this.handleConfirmAllDeleteProcessesDialog=t=>{t.gameAlert===$t.deleteAllProcesses&&this.controller.deleteAllProcesses()},this.handleDragStart=t=>{t.stopPropagation(),t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.dropEffect="move",t.dataTransfer.setDragImage(Yh,0,0),this._draggedItemName=t.dataTransfer.getData("text/plain"))},this.handleDragOver=t=>{if(t.stopPropagation(),t.preventDefault(),this._tbodyRef.value){const e=this._tbodyRef.value.getBoundingClientRect(),r=Math.max(t.clientY-e.top,0);this._draggedItemPosition=Math.min(Math.floor(r/Xg),this.controller.listProcesses().length-1)}},this.handleDragEnd=t=>{t.stopPropagation(),this._draggedItemName&&this._draggedItemPosition!==void 0&&this.controller.moveProcess(this._draggedItemName,this._draggedItemPosition),this._draggedItemName=void 0,this._draggedItemPosition=void 0},this.controller=new PO(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(ht.type,this.handleConfirmAllDeleteProcessesDialog)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(ht.type,this.handleConfirmAllDeleteProcessesDialog)}renderContent(){const t=this.checkSomeProcessesActive();return O`
      <table>
        <thead>
          <th class="program">
            <intl-message label="ui:mainframe:program">Program</intl-message>
          </th>
          <th class="cores">
            <intl-message label="ui:mainframe:cores">Cores</intl-message>
          </th>
          <th class="progress">
            <div class="buttons-container">
              <sl-tooltip>
                <intl-message slot="content" label="ui:mainframe:processes:allProcessesToggle">
                  Toggle all processes
                </intl-message>

                <sl-icon-button
                  name=${t?"play-fill":"pause-fill"}
                  label=${ir("mainframe.processes.allProcessesToggle",{ns:"ui"})}
                  @click=${this.handleToggleAllProcesses}
                >
                </sl-icon-button>
              </sl-tooltip>

              <sl-tooltip>
                <intl-message slot="content" label="ui:mainframe:processes:allProcessesDelete">
                  Delete all processes
                </intl-message>

                <sl-icon-button
                  id="delete-btn"
                  name="x-lg"
                  label=${ir("mainframe.processes.allProcessesDelete",{ns:"ui"})}
                  @click=${this.handleOpenDeleteAllProcessesDialog}
                >
                </sl-icon-button>
              </sl-tooltip>
            </div>
          </th>
        </thead>

        <tbody ${qe(this._tbodyRef)} @dragover=${this.handleDragOver}>
          ${this.renderList()}
        </tbody>
      </table>
    `}checkSomeProcessesActive(){return this.controller.listProcesses().some(t=>t.isActive)}};ha.styles=K`
    :host {
      width: 100%;
      align-self: stretch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: var(--sl-font-weight-bold);
    }

    th.program,
    td.program {
      width: 32%;
    }

    th.cores,
    td.cores {
      width: 17%;
    }

    thead th {
      font-weight: var(--ca-table-header-font-weight);
      border-top: var(--ca-border);
      border-bottom: var(--ca-border);
      text-align: left;
      padding: var(--sl-spacing-small);
    }

    tr.notification td {
      padding: var(--sl-spacing-3x-large);
      text-align: center;
      border-bottom: var(--ca-border);
    }

    tbody ca-processes-list-item:nth-child(2n + 1) {
      background-color: var(--ca-table-row-odd-color);
    }

    tbody ca-processes-list-item {
      height: ${Xg}px;
    }

    tbody ca-processes-list-item.dragged {
      background-color: var(--ca-dragged-color);
    }

    div.buttons-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }
  `;ed([ae()],ha.prototype,"_draggedItemName",2);ed([ae()],ha.prototype,"_draggedItemPosition",2);ha=ed([X("ca-processes-list")],ha);class EO extends ue{getProcess(e){var r;return((r=this._process)==null?void 0:r.program.name)!==e&&(this._process&&this.removeEventListenersByEmitter(this._process),this._process=this.mainframeProcessesState.getProcessByName(e)),this._process}toggleProcess(){var e;(e=this._process)==null||e.toggleActive(!this._process.isActive)}deleteProcess(){this._process&&this.mainframeProcessesState.deleteProcess(this._process.program.name)}}var TO=Object.defineProperty,OO=Object.getOwnPropertyDescriptor,ev=(t,e,r,i)=>{for(var s=i>1?void 0:i?OO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&TO(e,r,s),s};let ol=class extends ee{constructor(){super(),this.programName=mt.shareServer,this.handleToggleProcess=t=>{t.preventDefault(),t.stopPropagation(),this.controller.toggleProcess()},this.handleOpenDeleteProcessDialog=t=>{t.preventDefault(),t.stopPropagation();const e=JSON.stringify({programName:this.programName});this.dispatchEvent(new sr($t.processDelete,e,this.programName))},this.handleConfirmDeleteProcessDialog=t=>{const e=t;e.gameAlert!==$t.processDelete||e.gameAlertKey!==this.programName||this.controller.deleteProcess()},this.handleDragStart=t=>{t.dataTransfer&&t.dataTransfer.setData("text/plain",this.programName)},this.controller=new EO(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(ht.type,this.handleConfirmDeleteProcessDialog)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(ht.type,this.handleConfirmDeleteProcessDialog)}renderContent(){const t=this.controller.formatter,e=this.controller.getProcess(this.programName);if(!e)return O``;const r=JSON.stringify({cores:t.formatNumberDecimal(e.usedCores),maxCores:t.formatNumberDecimal(e.maxCores)}),i=e.program.isAutoscalable?O`<intl-message label="ui:mainframe:processes:autoscalable">Autoscalable</intl-message>`:O`<intl-message label="ui:mainframe:processes:usesCores" value=${r}>Cores</intl-message>`;return O`
      <td class="program" draggable="true" @dragstart=${this.handleDragStart}>
        <intl-message label="programs:${e.program.name}:name">Progam name</intl-message>

        <sl-tooltip>
          <sl-icon name="question-circle"></sl-icon>

          <ca-process-description slot="content" program-name=${e.program.name}> </ca-process-description>
        </sl-tooltip>
      </td>

      <td class="cores">${i}</td>

      <td>
        <div class="indicators-container">
          <ca-processes-list-item-progress program-name=${e.program.name}> </ca-processes-list-item-progress>

          <sl-tooltip>
            <intl-message slot="content" label="ui:mainframe:processes:processToggle"> Toggle process </intl-message>

            <sl-icon-button
              name=${e.isActive?"play-fill":"pause-fill"}
              label=${ir("mainframe.processes.processToggle",{ns:"ui"})}
              @click=${this.handleToggleProcess}
            >
            </sl-icon-button>
          </sl-tooltip>

          <sl-tooltip>
            <intl-message slot="content" label="ui:mainframe:processes:processDelete"> Delete process </intl-message>

            <sl-icon-button
              id="delete-btn"
              name="x-lg"
              label=${ir("mainframe.processes.processDelete",{ns:"ui"})}
              @click=${this.handleOpenDeleteProcessDialog}
            >
            </sl-icon-button>
          </sl-tooltip>
        </div>
      </td>
    `}};ol.styles=K`
    :host {
      display: table-row;
      border-bottom: var(--ca-border);
    }

    td.program {
      width: 32%;
      cursor: grab;
    }

    td.cores {
      width: 17%;
    }

    td {
      text-align: left;
      vertical-align: middle;
      padding: var(--sl-spacing-small);
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    sl-icon[name='question-circle'] {
      position: relative;
      top: 0.25em;
      margin-left: 0.5em;
      color: var(--ca-hint-color);
      font-size: var(--sl-font-size-large);
    }

    div.indicators-container {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: var(--sl-spacing-small);
      font-size: var(--sl-font-size-large);
    }
  `;ev([P({attribute:"program-name",type:String})],ol.prototype,"programName",2);ol=ev([X("ca-processes-list-item")],ol);class $O extends ue{getProcess(e){var r;return((r=this._process)==null?void 0:r.program.name)!==e&&(this._process&&this.removeEventListenersByEmitter(this._process),this._process=this.mainframeProcessesState.getProcessByName(e)),this._process}}var DO=Object.defineProperty,IO=Object.getOwnPropertyDescriptor,tv=(t,e,r,i)=>{for(var s=i>1?void 0:i?IO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&DO(e,r,s),s};let ll=class extends ee{constructor(){super(),this.programName=mt.shareServer,this.controller=new $O(this)}renderContent(){const t=this.controller.formatter,e=this.controller.getProcess(this.programName);if(!e)return O``;const r=JSON.stringify({currentCompletionPoints:t.formatNumberLong(e.currentCompletionPoints),maxCompletionPoints:t.formatNumberLong(e.maxCompletionPoints)}),i=e.calculateCompletionDelta(1);let s,o;i>0?(s="ui:mainframe:processes:progressBarHintActive",o=t.formatTimeShort((e.maxCompletionPoints-e.currentCompletionPoints)/i)):(s="ui:mainframe:processes:progressBarHintPaused",o="");const l=e.currentCompletionPoints/e.maxCompletionPoints*100;return e.program.isAutoscalable?O`<div class="progress-gap"></div>`:O` <sl-tooltip>
          <intl-message slot="content" label=${s} value=${o}>
            Progress bar hint
          </intl-message>

          <sl-progress-bar value=${l}>
            <intl-message label="ui:mainframe:processes:progressBarLabel" value=${r}>
              Progress
            </intl-message>
          </sl-progress-bar>
        </sl-tooltip>`}};ll.styles=K`
    :host {
      flex: 1 1 auto;
    }
  `;tv([P({attribute:"program-name",type:String})],ll.prototype,"programName",2);ll=tv([X("ca-processes-list-item-progress")],ll);class RO extends ue{get availableRam(){return this.mainframeProcessesState.availableRam}get availableCores(){return this.mainframeProcessesState.availableCores}getProcess(e){var r;return((r=this._process)==null?void 0:r.program.name)!==e&&(this._process&&(this.removeEventListenersByEmitter(this._process),this.removeEventListenersByEmitter(this._process.program)),this._process=this.mainframeProcessesState.getProcessByName(e)),this._process}}var kO=Object.defineProperty,NO=Object.getOwnPropertyDescriptor,rv=(t,e,r,i)=>{for(var s=i>1?void 0:i?NO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&kO(e,r,s),s};let cl=class extends ee{constructor(){super(),this.programName="",this.renderScalableDescription=t=>{const e=this.controller.availableRam,r=JSON.stringify(t.program.buildProcessDescriptionParametersObject(t.usedCores,t.usedCores,e));return O`<intl-message label="ui:mainframe:programDescription:requirementsScalable"> Requirements </intl-message>
      <intl-message label="ui:mainframe:processes:processDescription:completionTimeScalable">
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:processDescription" value=${r}>
        Program description
      </intl-message>`},this.renderOrdinaryDescription=t=>{const e=this.controller.formatter,r=JSON.stringify(t.program.buildRequirementsParametersObject(t.threads)),i=t.calculateCompletionDelta(1);let s,o="completionTimeNoCores",l="";i>0&&(s=t.calculateCompletionTime(),o="completionTime",l=e.formatTimeShort(s));const d=JSON.stringify(t.program.buildProcessDescriptionParametersObject(t.threads,t.usedCores,1));return O`<intl-message label="ui:mainframe:programDescription:requirements" value=${r}>
        Requirements
      </intl-message>
      <intl-message
        label="ui:mainframe:processes:processDescription:${o}"
        value=${l}
      >
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:processDescription" value=${d}>
        Program description
      </intl-message>`},this.controller=new RO(this)}renderContent(){const t=this.programName?this.controller.getProcess(this.programName):void 0;if(!t)return O``;const e=t.program.isAutoscalable?this.renderScalableDescription(t):this.renderOrdinaryDescription(t);return O`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>

      ${e}`}};cl.styles=K`
    :host {
      white-space: pre-line;
    }
  `;rv([P({attribute:"program-name",type:String})],cl.prototype,"programName",2);cl=rv([X("ca-process-description")],cl);class LO extends ue{hostDisconnected(){super.hostDisconnected(),this.deleteOldProgram()}get ram(){return this.mainframeHardwareState.ram.level}get cores(){return this.mainframeHardwareState.cores.level}getProgram(e,r,i){var s;return(((s=this._program)==null?void 0:s.name)!==e||this._program.level!==r||this._program.quality!==i)&&(this.deleteOldProgram(),this._program=this.programFactory.makeProgram({name:e,level:r,quality:i,autoUpgradeEnabled:!0})),this._program}deleteOldProgram(){this._program&&(this.removeEventListenersByEmitter(this._program),this.programFactory.deleteProgram(this._program))}}var MO=Object.defineProperty,FO=Object.getOwnPropertyDescriptor,Pa=(t,e,r,i)=>{for(var s=i>1?void 0:i?FO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&MO(e,r,s),s};let bi=class extends ee{constructor(){super(),this.programName="",this.level=1,this.quality=0,this.threads=0,this.renderScalableDescription=t=>{const e=this.controller.cores,r=this.controller.ram,i=JSON.stringify(t.buildProgramDescriptionParametersObject(e,r));return O`<intl-message label="ui:mainframe:programDescription:requirementsScalable"> Requirements </intl-message>
      <intl-message label="ui:mainframe:programDescription:completionTimeScalable"> Completion time </intl-message>
      <intl-message label="programs:${this.programName}:programDescription" value=${i}>
        Program description
      </intl-message>`},this.renderOrdinaryDescription=t=>{const e=this.controller.formatter,r=JSON.stringify(t.buildRequirementsParametersObject(this.threads)),i=JSON.stringify(t.buildProgramDescriptionParametersObject(this.threads,1)),s=t.buildCompletionTimeParametersObject(this.threads),o=JSON.stringify({minTime:e.formatTimeShort(s.minTime),maxTime:e.formatTimeShort(s.maxTime)});return O`<intl-message label="ui:mainframe:programDescription:requirements" value=${r}>
        Requirements
      </intl-message>
      <intl-message label="ui:mainframe:programDescription:completionTime" value=${o}>
        Completion time
      </intl-message>
      <intl-message label="programs:${this.programName}:programDescription" value=${i}>
        Program description
      </intl-message>`},this.controller=new LO(this)}renderContent(){const t=this.programName?this.controller.getProgram(this.programName,this.level,this.quality):void 0;if(!t)return O``;const e=JSON.stringify(t.buildCostParametersObject()),r=t.isAutoscalable?this.renderScalableDescription(t):this.renderOrdinaryDescription(t);return O`<intl-message label="programs:${this.programName}:overview"> Program overview </intl-message>

      <intl-message label="ui:mainframe:programDescription:cost" value=${e}> Cost </intl-message>
      ${r}`}};bi.styles=K`
    :host {
      white-space: pre-line;
    }
  `;Pa([P({attribute:"program-name",type:String})],bi.prototype,"programName",2);Pa([P({attribute:"level",type:Number})],bi.prototype,"level",2);Pa([P({attribute:"quality",type:Number})],bi.prototype,"quality",2);Pa([P({attribute:"threads",type:Number})],bi.prototype,"threads",2);bi=Pa([X("ca-program-description")],bi);class UO extends ue{isMainframeHardwareUnlocked(){return this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.mainframeHardware)}isMainframeProgramsUnlocked(){return this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.mainframePrograms)}}var zO=Object.defineProperty,BO=Object.getOwnPropertyDescriptor,HO=(t,e,r,i)=>{for(var s=i>1?void 0:i?BO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&zO(e,r,s),s};let Yu=class extends ee{constructor(){super(),this.controller=new UO(this)}renderContent(){const t=this.controller.isMainframeHardwareUnlocked(),e=this.controller.isMainframeProgramsUnlocked();return O`
      <h3 class="title">
        <intl-message label="ui:mainframe:mainframe">Mainframe</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="processes">
          <intl-message label="ui:mainframe:tabs:processes">Processes</intl-message>
        </sl-tab>
        ${t?O`
              <sl-tab slot="nav" panel="hardware">
                <intl-message label="ui:mainframe:tabs:hardware">Hardware</intl-message>
              </sl-tab>
            `:null}
        ${e?O`
              <sl-tab slot="nav" panel="programs">
                <intl-message label="ui:mainframe:tabs:programs">Programs</intl-message>
              </sl-tab>
            `:null}

        <sl-tab-panel name="processes">
          <ca-mainframe-processes-panel></ca-mainframe-processes-panel>
        </sl-tab-panel>
        ${t?O`
              <sl-tab-panel name="hardware">
                <ca-mainframe-hardware-panel></ca-mainframe-hardware-panel>
              </sl-tab-panel>
            `:null}
        ${e?O`
              <sl-tab-panel name="programs">
                <ca-mainframe-programs-panel></ca-mainframe-programs-panel>
              </sl-tab-panel>
            `:null}
      </sl-tab-group>
    `}};Yu.styles=K`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;Yu=HO([X("ca-mainframe-page")],Yu);class GO extends ue{get gameTime(){return this.globalState.time.gameTime}get gameTimeTotal(){return this.globalState.time.gameTimeTotal}}const td=K`
  :host {
    max-width: var(--ca-viewport-width);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`,Lr=K`
  :host {
    max-width: var(--ca-viewport-width);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  h4.title {
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-bold);
    margin-top: 0;
    margin-bottom: var(--sl-spacing-2x-small);
    line-height: var(--sl-line-height-normal);
  }

  .parameters-table {
    display: grid;
    column-gap: var(--sl-spacing-3x-small);
    row-gap: var(--sl-spacing-3x-small);
    grid-template-columns: 1fr 0fr;
    grid-auto-rows: auto;
    margin-bottom: var(--sl-spacing-small);
  }

  .parameters-table > span:nth-child(even) {
    text-align: end;
    white-space: nowrap;
  }

  sl-icon[name='question-circle'] {
    position: relative;
    top: 0.25em;
    margin-left: 0.5em;
    color: var(--ca-hint-color);
    font-size: var(--sl-font-size-large);
  }
`;var VO=Object.defineProperty,jO=Object.getOwnPropertyDescriptor,qO=(t,e,r,i)=>{for(var s=i>1?void 0:i?jO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&VO(e,r,s),s};let Ju=class extends ee{constructor(){super(),this.controller=new GO(this)}renderContent(){const t=this.controller.formatter;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:general:time:title">In-game passed time</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:general:time:timeThisRun">Time this run</intl-message>
        </span>
        <span> ${t.formatTimeShort(this.controller.gameTime)} </span>

        <span>
          <intl-message label="ui:statistics:general:time:timeTotal">Total time</intl-message>
        </span>
        <span> ${t.formatTimeShort(this.controller.gameTimeTotal)} </span>
      </div>

      <ca-statistics-multipliers></ca-statistics-multipliers>
    `}};Ju.styles=Lr;Ju=qO([X("ca-statistics-general-panel")],Ju);var WO=Object.defineProperty,KO=Object.getOwnPropertyDescriptor,YO=(t,e,r,i)=>{for(var s=i>1?void 0:i?KO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&WO(e,r,s),s};let Zu=class extends ee{renderContent(){return O`
      <ca-statistics-money-growth></ca-statistics-money-growth>

      <ca-statistics-development-growth></ca-statistics-development-growth>

      <ca-statistics-program-completion-speed></ca-statistics-program-completion-speed>

      <ca-statistics-programs-growth></ca-statistics-programs-growth>
    `}};Zu.styles=td;Zu=YO([X("ca-statistics-growth-panel")],Zu);var JO=Object.defineProperty,ZO=Object.getOwnPropertyDescriptor,QO=(t,e,r,i)=>{for(var s=i>1?void 0:i?ZO(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&JO(e,r,s),s};let Qu=class extends ee{renderContent(){return O`
      <ca-statistics-money-income></ca-statistics-money-income>

      <ca-statistics-development-income></ca-statistics-development-income>

      <ca-statistics-programs-income></ca-statistics-programs-income>
    `}};Qu.styles=td;Qu=QO([X("ca-statistics-income-panel")],Qu);var XO=Object.defineProperty,e$=Object.getOwnPropertyDescriptor,t$=(t,e,r,i)=>{for(var s=i>1?void 0:i?e$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&XO(e,r,s),s};let Xu=class extends ee{renderContent(){return O` <ca-statistics-money-expenses></ca-statistics-money-expenses> `}};Xu.styles=td;Xu=t$([X("ca-statistics-expenses-panel")],Xu);class r$ extends ue{constructor(){super(...arguments),this.getMoneyExpenses=e=>this.globalState.money.getExpenses(e)}}var n$=Object.defineProperty,i$=Object.getOwnPropertyDescriptor,s$=(t,e,r,i)=>{for(var s=i>1?void 0:i?i$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&n$(e,r,s),s};let eh=class extends ee{constructor(){super(),this.renderExpenseArticle=(t,e)=>{if(e<=0)return"";const r=this.controller.formatter;return O`
      <span>
        <intl-message label="ui:statistics:expenses:money:${t}">Purchase type</intl-message>
      </span>
      <span> ${r.formatNumberLong(e)} </span>
    `},this.controller=new r$(this)}renderContent(){const t=this.controller.formatter,e=Pm.reduce((r,i)=>r+this.controller.getMoneyExpenses(i),0);return O`
      <h4 class="title">
        <intl-message label="ui:statistics:expenses:money:title">money</intl-message>
      </h4>

      <div class="parameters-table">
        ${Pm.map(r=>this.renderExpenseArticle(r,this.controller.getMoneyExpenses(r)))}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${t.formatNumberLong(e)} </span>
      </div>
    `}};eh.styles=Lr;eh=s$([X("ca-statistics-money-expenses")],eh);class a$ extends ue{constructor(){super(...arguments),this.getMoneyIncome=e=>this.globalState.money.getIncome(e)}}var o$=Object.defineProperty,l$=Object.getOwnPropertyDescriptor,c$=(t,e,r,i)=>{for(var s=i>1?void 0:i?l$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&o$(e,r,s),s};let th=class extends ee{constructor(){super(),this.renderIncomeSource=(t,e)=>{if(e<=0)return"";const r=this.controller.formatter;return O`
      <span>
        <intl-message label="ui:statistics:income:money:${t}">Income source</intl-message>
      </span>
      <span> ${r.formatNumberLong(e)} </span>
    `},this.controller=new a$(this)}renderContent(){const t=this.controller.formatter,e=Nn.reduce((r,i)=>r+this.controller.getMoneyIncome(i),0);return O`
      <h4 class="title">
        <intl-message label="ui:statistics:income:money:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${Nn.map(r=>this.renderIncomeSource(r,this.controller.getMoneyIncome(r)))}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${t.formatNumberLong(e)} </span>
      </div>
    `}};th.styles=Lr;th=c$([X("ca-statistics-money-income")],th);class u$ extends ue{constructor(){super(...arguments),this.getDevelopmentIncome=e=>this.globalState.development.getIncome(e)}}var h$=Object.defineProperty,d$=Object.getOwnPropertyDescriptor,p$=(t,e,r,i)=>{for(var s=i>1?void 0:i?d$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&h$(e,r,s),s};let rh=class extends ee{constructor(){super(),this.renderIncomeSource=(t,e)=>{if(e<=0)return"";const r=this.controller.formatter;return O`
      <span>
        <intl-message label="ui:statistics:income:developmentPoints:${t}">Income source</intl-message>
      </span>
      <span> ${r.formatNumberLong(e)} </span>
    `},this.controller=new u$(this)}renderContent(){const t=this.controller.formatter,e=Nn.reduce((r,i)=>r+this.controller.getDevelopmentIncome(i),0);return O`
      <h4 class="title">
        <intl-message label="ui:statistics:income:developmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${Nn.map(r=>this.renderIncomeSource(r,this.controller.getDevelopmentIncome(r)))}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${t.formatNumberLong(e)} </span>
      </div>
    `}};rh.styles=Lr;rh=p$([X("ca-statistics-development-income")],rh);class f$ extends ue{get computationalBase(){return this.globalState.computationalBase.pointsByProgram}}var m$=Object.defineProperty,g$=Object.getOwnPropertyDescriptor,v$=(t,e,r,i)=>{for(var s=i>1?void 0:i?g$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&m$(e,r,s),s};let nh=class extends ee{constructor(){super(),this.controller=new f$(this)}renderContent(){const t=this.controller.formatter,e=this.controller.computationalBase;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:income:pointsByPrograms:title">Points by programs</intl-message>
      </h4>

      <div class="parameters-table">
        ${e>1?O`
              <span>
                <intl-message label="ui:statistics:income:pointsByPrograms:computationalBase">
                  Computational base
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:computationalBase">
                    Computational base hint
                  </intl-message>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${t.formatNumberLong(this.controller.computationalBase)} </span>
            `:null}
      </div>
    `}};nh.styles=Lr;nh=v$([X("ca-statistics-programs-income")],nh);class b$ extends ue{get programCompletionSpeed(){return this.globalState.programCompletionSpeed.speed*gt}}var y$=Object.defineProperty,_$=Object.getOwnPropertyDescriptor,w$=(t,e,r,i)=>{for(var s=i>1?void 0:i?_$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&y$(e,r,s),s};let ih=class extends ee{constructor(){super(),this.controller=new b$(this)}renderContent(){const t=this.controller.formatter;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:programCompletionSpeed:title">Program completion speed</intl-message>
      </h4>

      <div class="parameters-table">
        <span>
          <intl-message label="ui:statistics:growth:programCompletionSpeed:pointsPerSecond">
            Program completion speed
          </intl-message>
        </span>
        <span> ${t.formatNumberLong(this.controller.programCompletionSpeed)} </span>
      </div>
    `}};ih.styles=Lr;ih=w$([X("ca-statistics-program-completion-speed")],ih);class S$ extends ue{constructor(){super(...arguments),this.getMoneyGrowth=e=>this.globalState.moneyGrowth.getGrowth(e)*gt}get moneyTotalGrowth(){return this.globalState.moneyGrowth.totalGrowth*gt}}var x$=Object.defineProperty,P$=Object.getOwnPropertyDescriptor,C$=(t,e,r,i)=>{for(var s=i>1?void 0:i?P$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&x$(e,r,s),s};let sh=class extends ee{constructor(){super(),this.renderIncomeSource=(t,e)=>{if(e<=0)return"";const r=this.controller.formatter;return O`
      <span>
        <intl-message label="ui:statistics:growth:money:${t}">Income source</intl-message>
      </span>
      <span> ${r.formatNumberLong(e)} </span>
    `},this.controller=new S$(this)}renderContent(){const t=this.controller.formatter,e=this.controller.moneyTotalGrowth;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:money:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${Nn.map(r=>this.renderIncomeSource(r,this.controller.getMoneyGrowth(r)))}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${t.formatNumberLong(e)} </span>
      </div>
    `}};sh.styles=Lr;sh=C$([X("ca-statistics-money-growth")],sh);class A$ extends ue{constructor(){super(...arguments),this.getDevelopmentGrowth=e=>this.globalState.developmentGrowth.getGrowth(e)*gt}get developmentTotalGrowth(){return this.globalState.developmentGrowth.totalGrowth*gt}}var E$=Object.defineProperty,T$=Object.getOwnPropertyDescriptor,O$=(t,e,r,i)=>{for(var s=i>1?void 0:i?T$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&E$(e,r,s),s};let ah=class extends ee{constructor(){super(),this.renderIncomeSource=(t,e)=>{if(e<=0)return"";const r=this.controller.formatter;return O`
      <span>
        <intl-message label="ui:statistics:growth:developmentPoints:${t}">Income source</intl-message>
      </span>
      <span> ${r.formatNumberLong(e)} </span>
    `},this.controller=new A$(this)}renderContent(){const t=this.controller.formatter,e=this.controller.developmentTotalGrowth;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:developmentPoints:title">Title</intl-message>
      </h4>

      <div class="parameters-table">
        ${Nn.map(r=>this.renderIncomeSource(r,this.controller.getDevelopmentGrowth(r)))}

        <span>
          <intl-message label="ui:statistics:total">Total</intl-message>
        </span>
        <span> ${t.formatNumberLong(e)} </span>
      </div>
    `}};ah.styles=Lr;ah=O$([X("ca-statistics-development-growth")],ah);class $$ extends ue{get programCompletionSpeedMultiplier(){return this.globalState.programCompletionSpeed.multiplier}get mainframeDiscount(){return this.globalState.computationalBase.discount}}var D$=Object.defineProperty,I$=Object.getOwnPropertyDescriptor,R$=(t,e,r,i)=>{for(var s=i>1?void 0:i?I$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&D$(e,r,s),s};let oh=class extends ee{constructor(){super(),this.controller=new $$(this)}renderContent(){const t=this.controller.formatter,e=this.controller.programCompletionSpeedMultiplier,r=this.controller.mainframeDiscount*100;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:general:multipliers:title">Multipliers and discounts</intl-message>
      </h4>

      <div class="parameters-table">
        ${e>1?O`
              <span>
                <intl-message label="ui:statistics:general:multipliers:programCompletionSpeed">
                  Program completion speed
                </intl-message>
              </span>
              <span> ${t.formatNumberFloat(e)} </span>
            `:null}
        ${r>0?O`
              <span>
                <intl-message label="ui:statistics:general:multipliers:mainframeDiscount">
                  Mainframe discount
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:mainframeDiscount">
                    Mainframe discount hint
                  </intl-message>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${t.formatNumberFloat(r)} </span>
            `:null}
      </div>
    `}};oh.styles=Lr;oh=R$([X("ca-statistics-multipliers")],oh);class k$ extends ue{get computationalBase(){return this.globalState.programsGrowth.computationalBase*gt}}var N$=Object.defineProperty,L$=Object.getOwnPropertyDescriptor,M$=(t,e,r,i)=>{for(var s=i>1?void 0:i?L$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&N$(e,r,s),s};let lh=class extends ee{constructor(){super(),this.controller=new k$(this)}renderContent(){const t=this.controller.formatter,e=this.controller.computationalBase;return O`
      <h4 class="title">
        <intl-message label="ui:statistics:growth:pointsByPrograms:title">Points per second by programs</intl-message>
      </h4>

      ${e>0?O`
            <div class="parameters-table">
              <span>
                <intl-message label="ui:statistics:growth:pointsByPrograms:computationalBase">
                  Computational base
                </intl-message>

                <sl-tooltip>
                  <intl-message slot="content" label="ui:statistics:hints:computationalBase">
                    Computational base hint
                  </intl-message>

                  <sl-icon name="question-circle"></sl-icon>
                </sl-tooltip>
              </span>
              <span> ${t.formatNumberLong(e)} </span>
            </div>
          `:null}
    `}};lh.styles=Lr;lh=M$([X("ca-statistics-programs-growth")],lh);class F$ extends ue{listUnlockedFeatures(){return this.globalState.unlockedFeatures.listUnlockedFeatures()}}var U$=Object.defineProperty,z$=Object.getOwnPropertyDescriptor,B$=(t,e,r,i)=>{for(var s=i>1?void 0:i?z$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&U$(e,r,s),s};let ch=class extends ee{constructor(){super(),this.renderFeature=t=>O`
    <span>
      <intl-message label=${`features:${t}`}> Feature </intl-message>
    </span>
    <span></span>
  `,this.controller=new F$(this)}renderContent(){const t=this.controller.listUnlockedFeatures();return O`
      <h4 class="title">
        <intl-message label="ui:statistics:unlockedFeatures:title"> Unlocked features </intl-message>
      </h4>

      <div class="parameters-table">${Pr(t,e=>e,this.renderFeature)}</div>
    `}};ch.styles=Lr;ch=B$([X("ca-statistics-unlocked-features-panel")],ch);var H$=Object.defineProperty,G$=Object.getOwnPropertyDescriptor,V$=(t,e,r,i)=>{for(var s=i>1?void 0:i?G$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&H$(e,r,s),s};let uh=class extends ee{renderContent(){return O`
      <h3 class="title">
        <intl-message label="ui:statistics:statistics">Statistics</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="general">
          <intl-message label="ui:statistics:tabs:general">General</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="growth">
          <intl-message label="ui:statistics:tabs:growth">Growth</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="income">
          <intl-message label="ui:statistics:tabs:income">Income</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="expenses">
          <intl-message label="ui:statistics:tabs:expenses">Expenses</intl-message>
        </sl-tab>
        <sl-tab slot="nav" panel="unlocked-features">
          <intl-message label="ui:statistics:tabs:unlockedFeatures">Unlocked features</intl-message>
        </sl-tab>

        <sl-tab-panel name="general">
          <ca-statistics-general-panel></ca-statistics-general-panel>
        </sl-tab-panel>
        <sl-tab-panel name="growth">
          <ca-statistics-growth-panel></ca-statistics-growth-panel>
        </sl-tab-panel>
        <sl-tab-panel name="income">
          <ca-statistics-income-panel></ca-statistics-income-panel>
        </sl-tab-panel>
        <sl-tab-panel name="expenses">
          <ca-statistics-expenses-panel></ca-statistics-expenses-panel>
        </sl-tab-panel>
        <sl-tab-panel name="unlocked-features">
          <ca-statistics-unlocked-features-panel></ca-statistics-unlocked-features-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `}};uh.styles=K`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;uh=V$([X("ca-statistics-page")],uh);class j$ extends ue{isFeatureUnlocked(e){return this.globalState.unlockedFeatures.isFeatureUnlocked(e)}}var q$=Object.defineProperty,W$=Object.getOwnPropertyDescriptor,K$=(t,e,r,i)=>{for(var s=i>1?void 0:i?W$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&q$(e,r,s),s};let hh=class extends ee{constructor(){super(),this.controller=new j$(this)}renderContent(){return O`
      ${this.controller.isFeatureUnlocked(Cr.automationMainframeHardware)?O`<ca-automation-mainframe-hardware-autobuyer></ca-automation-mainframe-hardware-autobuyer>`:null}
      ${this.controller.isFeatureUnlocked(Cr.automationMainframePrograms)?O`<ca-automation-mainframe-programs-autobuyer></ca-automation-mainframe-programs-autobuyer>`:null}
    `}};hh.styles=K`
    :host {
      max-width: var(--ca-viewport-width);
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      gap: var(--sl-spacing-medium);
    }
  `;hh=K$([X("ca-automation-autobuyers-panel")],hh);class Y$ extends ue{get moneyShare(){return this.mainframeHardwareAutomationState.moneyShare}set moneyShare(e){this.mainframeHardwareAutomationState.moneyShare=e}}const nv=K`
  :host {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: var(--sl-spacing-large);
    box-sizing: border-box;
    border: var(--ca-border);
    border-radius: var(--sl-border-radius-small);
    gap: var(--sl-spacing-3x-large);
  }

  div.text-container {
    flex: 1 1 auto;
    overflow: hidden;
  }

  div.text-container-inner {
    max-width: 100%;
  }

  h4.title {
    width: 100%;
    font-size: var(--sl-font-size-large);
    font-weight: var(--sl-font-weight-bold);
    margin-top: 0;
    margin-bottom: var(--sl-spacing-medium);
    line-height: var(--sl-line-height-denser);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p.hint {
    width: 100%;
    margin: 0;
    color: var(--ca-hint-color);
    font-size: var(--ca-hint-font-size);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div.input-container {
    flex: 0 0 auto;
    min-width: 15rem;
  }
`;var J$=Object.defineProperty,Z$=Object.getOwnPropertyDescriptor,Q$=(t,e,r,i)=>{for(var s=i>1?void 0:i?Z$(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&J$(e,r,s),s};let dh=class extends ee{constructor(){super(),this._moneyShareRef=je(),this.handleChangeMoneyShare=()=>{if(!this._moneyShareRef.value)return;const t=eO(this._moneyShareRef.value.valueAsNumber);this.controller.moneyShare=t,this._moneyShareRef.value.valueAsNumber=t},this.controller=new Y$(this)}renderContent(){const{moneyShare:t}=this.controller;return O`
      <div class="text-container">
        <div class="text-container-inner">
          <h4 class="title">
            <intl-message label="ui:automation:mainframeHardwareAutobuyer:mainframeHardwareAutobuyer">
              Mainframe hardware autobuyer
            </intl-message>
          </h4>

          <p class="hint">
            <intl-message label="ui:automation:mainframeHardwareAutobuyer:percentageHint">
              Percentages hint
            </intl-message>
          </p>
        </div>
      </div>

      <div class="input-container">
        <sl-input
          ${qe(this._moneyShareRef)}
          name="moneyShare"
          value=${t}
          type="number"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangeMoneyShare}
        >
        </sl-input>
      </div>
    `}};dh.styles=nv;dh=Q$([X("ca-automation-mainframe-hardware-autobuyer")],dh);class X$ extends ue{get moneyShare(){return this.mainframeProgramsAutomationState.moneyShare}set moneyShare(e){this.mainframeProgramsAutomationState.moneyShare=e}}var eD=Object.defineProperty,tD=Object.getOwnPropertyDescriptor,rD=(t,e,r,i)=>{for(var s=i>1?void 0:i?tD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&eD(e,r,s),s};let ph=class extends ee{constructor(){super(),this._moneyShareRef=je(),this.handleChangeMoneyShare=()=>{if(!this._moneyShareRef.value)return;const t=this.normalizeValue(this._moneyShareRef.value.valueAsNumber);this.controller.moneyShare=t,this._moneyShareRef.value.valueAsNumber=t},this.controller=new X$(this)}renderContent(){const{moneyShare:t}=this.controller;return O`
      <div class="text-container">
        <div class="text-container-inner">
          <h4 class="title">
            <intl-message label="ui:automation:mainframeProgramsAutobuyer:mainframeProgramsAutobuyer">
              Mainframe programs autobuyer
            </intl-message>
          </h4>

          <p class="hint">
            <intl-message label="ui:automation:mainframeProgramsAutobuyer:percentageHint">
              Percentages hint
            </intl-message>
          </p>
        </div>
      </div>

      <div class="input-container">
        <sl-input
          ${qe(this._moneyShareRef)}
          name="moneyShare"
          value=${t}
          type="number"
          min="0"
          max="100"
          step="1"
          @sl-change=${this.handleChangeMoneyShare}
        >
        </sl-input>
      </div>
    `}normalizeValue(t){return t<0?0:t>100?100:t}};ph.styles=nv;ph=rD([X("ca-automation-mainframe-programs-autobuyer")],ph);var nD=Object.defineProperty,iD=Object.getOwnPropertyDescriptor,sD=(t,e,r,i)=>{for(var s=i>1?void 0:i?iD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&nD(e,r,s),s};let fh=class extends ee{renderContent(){return O`
      <h3 class="title">
        <intl-message label="ui:automation:automation">Statistics</intl-message>
      </h3>

      <sl-tab-group>
        <sl-tab slot="nav" panel="autobuyers">
          <intl-message label="ui:automation:tabs:autobuyers">Autobuyers</intl-message>
        </sl-tab>

        <sl-tab-panel name="autobuyers">
          <ca-automation-autobuyers-panel></ca-automation-autobuyers-panel>
        </sl-tab-panel>
      </sl-tab-group>
    `}};fh.styles=K`
    h3.title {
      font-size: var(--sl-font-size-2x-large);
      font-weight: var(--sl-font-weight-bold);
      margin-top: 0;
      margin-bottom: var(--sl-spacing-2x-small);
      line-height: var(--sl-line-height-denser);
    }
  `;fh=sD([X("ca-automation-page")],fh);var aD=Object.defineProperty,oD=Object.getOwnPropertyDescriptor,lD=(t,e,r,i)=>{for(var s=i>1?void 0:i?oD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&aD(e,r,s),s};let mh=class extends ee{renderContent(){return O`
      <p class="server-link">
        <a target="_blank" href="https://discord.gg/CmsTxU2EMw">Discord</a>
      </p>
      <p class="contributors">
        Vladimir Butin (OmniLRenegade) - <intl-message label="ui:credits:OmniLRenegadE"></intl-message>
      </p>
    `}};mh.styles=K`
    p.server-link {
      margin-top: 0;
      margin-bottom: var(--sl-spacing-large);
    }

    p.server-link a,
    p.server-link a:visited,
    p.server-link a:hover {
      text-decoration: none;
      color: var(--sl-color-primary-600);
    }

    p.contributors {
      margin: 0;
    }
  `;mh=lD([X("ca-credits-page")],mh);var cD=Object.defineProperty,uD=Object.getOwnPropertyDescriptor,hD=(t,e,r,i)=>{for(var s=i>1?void 0:i?uD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&cD(e,r,s),s};let gh=class{constructor(){this._eventListenerStack=[],this._registeredEventEmitters=new Set}pushEventListener(t){this._eventListenerStack.push(t)}popEventListener(){this._eventListenerStack.pop()}connectEventHandler(t,e){this._eventListenerStack.length>0&&this._eventListenerStack[this._eventListenerStack.length-1].addEventListener(t,e)}registerEventEmitter(t){this._registeredEventEmitters.add(t)}unregisterEventEmitter(t){this._registeredEventEmitters.delete(t),t.uiEventBatcher.removeAllListeners()}fireUIEvents(){for(const t of this._registeredEventEmitters.values())t.uiEventBatcher.fireEvents()}};gh=hD([It()],gh);var iv={exports:{}};(function(t){var e=Object.prototype.hasOwnProperty,r="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(r=!1));function s(p,h,g){this.fn=p,this.context=h,this.once=g||!1}function o(p,h,g,b,y){if(typeof g!="function")throw new TypeError("The listener must be a function");var x=new s(g,b||p,y),A=r?r+h:h;return p._events[A]?p._events[A].fn?p._events[A]=[p._events[A],x]:p._events[A].push(x):(p._events[A]=x,p._eventsCount++),p}function l(p,h){--p._eventsCount===0?p._events=new i:delete p._events[h]}function d(){this._events=new i,this._eventsCount=0}d.prototype.eventNames=function(){var h=[],g,b;if(this._eventsCount===0)return h;for(b in g=this._events)e.call(g,b)&&h.push(r?b.slice(1):b);return Object.getOwnPropertySymbols?h.concat(Object.getOwnPropertySymbols(g)):h},d.prototype.listeners=function(h){var g=r?r+h:h,b=this._events[g];if(!b)return[];if(b.fn)return[b.fn];for(var y=0,x=b.length,A=new Array(x);y<x;y++)A[y]=b[y].fn;return A},d.prototype.listenerCount=function(h){var g=r?r+h:h,b=this._events[g];return b?b.fn?1:b.length:0},d.prototype.emit=function(h,g,b,y,x,A){var k=r?r+h:h;if(!this._events[k])return!1;var I=this._events[k],U=arguments.length,H,z;if(I.fn){switch(I.once&&this.removeListener(h,I.fn,void 0,!0),U){case 1:return I.fn.call(I.context),!0;case 2:return I.fn.call(I.context,g),!0;case 3:return I.fn.call(I.context,g,b),!0;case 4:return I.fn.call(I.context,g,b,y),!0;case 5:return I.fn.call(I.context,g,b,y,x),!0;case 6:return I.fn.call(I.context,g,b,y,x,A),!0}for(z=1,H=new Array(U-1);z<U;z++)H[z-1]=arguments[z];I.fn.apply(I.context,H)}else{var V=I.length,j;for(z=0;z<V;z++)switch(I[z].once&&this.removeListener(h,I[z].fn,void 0,!0),U){case 1:I[z].fn.call(I[z].context);break;case 2:I[z].fn.call(I[z].context,g);break;case 3:I[z].fn.call(I[z].context,g,b);break;case 4:I[z].fn.call(I[z].context,g,b,y);break;default:if(!H)for(j=1,H=new Array(U-1);j<U;j++)H[j-1]=arguments[j];I[z].fn.apply(I[z].context,H)}}return!0},d.prototype.on=function(h,g,b){return o(this,h,g,b,!1)},d.prototype.once=function(h,g,b){return o(this,h,g,b,!0)},d.prototype.removeListener=function(h,g,b,y){var x=r?r+h:h;if(!this._events[x])return this;if(!g)return l(this,x),this;var A=this._events[x];if(A.fn)A.fn===g&&(!y||A.once)&&(!b||A.context===b)&&l(this,x);else{for(var k=0,I=[],U=A.length;k<U;k++)(A[k].fn!==g||y&&!A[k].once||b&&A[k].context!==b)&&I.push(A[k]);I.length?this._events[x]=I.length===1?I[0]:I:l(this,x)}return this},d.prototype.removeAllListeners=function(h){var g;return h?(g=r?r+h:h,this._events[g]&&l(this,g)):(this._events=new i,this._eventsCount=0),this},d.prototype.off=d.prototype.removeListener,d.prototype.addListener=d.prototype.on,d.prefixed=r,d.EventEmitter=d,t.exports=d})(iv);var dD=iv.exports;const pD=D1(dD);class At{constructor(){this._eventSet=new Set,this._eventEmitter=new pD}fireEvents(){for(const e of this._eventSet.values())this._eventEmitter.emit(e);this._eventSet.clear()}enqueueEvent(e){this._eventSet.add(e)}addListener(e,r){this._eventEmitter.addListener(e,r)}removeListener(e,r){this._eventEmitter.removeListener(e,r)}removeAllListeners(){this._eventEmitter.removeAllListeners()}}const So={CHANGED_APP_STAGE:Symbol("CHANGED_APP_STAGE"),REFRESHED_UI:Symbol("REFRESHED_UI")},mu="ca-save";var fD=Object.defineProperty,mD=Object.getOwnPropertyDescriptor,gD=(t,e,r,i)=>{for(var s=i>1?void 0:i?mD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&fD(e,r,s),s},xo=(t,e)=>(r,i)=>e(r,i,t);let vh=class{constructor(t,e,r,i){this.saveGame=()=>{const s=this._appState.serialize();localStorage.setItem(mu,s),this._messageLogState.postMessage(Hr.gameSaved)},this.startLoadingGame=()=>{this._appStage=wr.loading,this.stopUpdateTimer(),this.stopAutosaveTimer(),this._messageLogState.clearMessages(),this.emitChangedAppStageEvent()},this.startRunningGame=()=>{this._appStage=wr.running,this.restartUpdateTimer(),this.restartAutosaveTimer(),this._messageLogState.postMessage(Hr.gameStarted),this.emitChangedAppStageEvent()},this.updateGame=()=>{switch(this.appStage){case wr.running:this._appState.updateState();break;case wr.fastForward:this._appState.fastForwardState()||(this._appStage=wr.running,this._messageLogState.postMessage(Hr.fastForwared),this.uiEventBatcher.enqueueEvent(So.CHANGED_APP_STAGE));break}this.uiEventBatcher.enqueueEvent(So.REFRESHED_UI),this._stateUIConnector.fireUIEvents()},this._appState=t,this._settingsState=e,this._messageLogState=r,this._appStage=wr.loading,this._updateTimer=void 0,this._autosaveTimer=void 0,this._stateUIConnector=i,this.uiEventBatcher=new At,this._stateUIConnector.registerEventEmitter(this)}get appStage(){return this._stateUIConnector.connectEventHandler(this,So.CHANGED_APP_STAGE),this._appStage}async startUp(){this.startLoadingGame();const t=localStorage.getItem(mu);if(t)try{await this._appState.deserialize(t)}catch(e){console.error(e),await this._appState.startNewState()}else await this._appState.startNewState();this.startRunningGame()}importSavefile(t){this.startLoadingGame();const e=new FileReader;e.addEventListener("load",()=>{this._appState.deserialize(e.result).then(()=>{this.startRunningGame()}).catch(r=>(console.error(r),this._appState.startNewState()))}),e.addEventListener("error",()=>{console.error(`An error occurred during importing file ${t.name}`),this.startRunningGame()}),e.readAsText(t)}exportSavefile(){const t=this._appState.serialize(),e=`cyberiada-savefile-${new Date().toLocaleString()}.txt`,r=new File([t],e,{endings:"transparent"}),i=document.createElement("a");i.download=e,i.href=URL.createObjectURL(r),i.click(),URL.revokeObjectURL(i.href)}async deleteSaveData(){this.startLoadingGame(),localStorage.removeItem(mu);try{await this.startUp()}catch(t){console.error(t)}}restartUpdateTimer(){this.stopUpdateTimer(),this._updateTimer=setInterval(this.updateGame,this._settingsState.updateInterval)}restartAutosaveTimer(){this.stopAutosaveTimer(),this._settingsState.autosaveEnabled&&(this._autosaveTimer=setInterval(this.saveGame,this._settingsState.autosaveInterval))}fastForward(){this._appStage=wr.fastForward,this.emitChangedAppStageEvent()}stopFastForwarding(){this._appStage=wr.running,this._messageLogState.postMessage(Hr.fastForwared),this.emitChangedAppStageEvent()}emitChangedAppStageEvent(){this.uiEventBatcher.enqueueEvent(So.CHANGED_APP_STAGE),this._stateUIConnector.fireUIEvents()}stopUpdateTimer(){this._updateTimer&&clearInterval(this._updateTimer),this._updateTimer=void 0}stopAutosaveTimer(){this._autosaveTimer&&clearInterval(this._autosaveTimer),this._autosaveTimer=void 0}};vh=gD([It(),xo(0,ge(B.AppState)),xo(1,ge(B.SettingsState)),xo(2,ge(B.MessageLogState)),xo(3,ge(B.StateUIConnector))],vh);var vD=Object.defineProperty,bD=Object.getOwnPropertyDescriptor,yD=(t,e,r,i)=>{for(var s=i>1?void 0:i?bD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&vD(e,r,s),s},Ir=(t,e)=>(r,i)=>e(r,i,t);let bh=class{constructor(t,e,r,i,s,o,l,d,p,h,g){this.processSingleTick=()=>{this._mainframeProcessesState.processTick(),this._globalState.recalculate()},this._scenarioState=t,this._globalState=e,this._settingsState=r,this._cityState=i,this._messageLogState=s,this._mainframeHardwareState=o,this._mainframeProgramsState=l,this._mainframeProcessesState=d,this._programFactory=p,this._mainframeHardwareAutomationState=h,this._mainframeProgramsAutomationState=g}updateState(){let t=0;switch(this._globalState.gameSpeed){case Sr.paused:t=0;break;case Sr.normal:t=1;break;case Sr.fast:t=this._settingsState.maxTicksPerUpdate;break}this.processTicks(t)}fastForwardState(){const t=this._settingsState.maxTicksPerFastForward;return this.processTicks(t)===t}async startNewState(){this._programFactory.deleteAllPrograms(),await this._settingsState.startNewState(),await this._scenarioState.startNewState(),await this._globalState.startNewState(),await this._cityState.startNewState(),await this._mainframeHardwareState.startNewState(),await this._mainframeProgramsState.startNewState(),await this._mainframeProcessesState.startNewState(),await this._mainframeHardwareAutomationState.startNewState(),await this._mainframeProgramsAutomationState.startNewState()}serialize(){const t={scenario:this._scenarioState.serialize(),global:this._globalState.serialize(),settings:this._settingsState.serialize(),city:this._cityState.serialize(),mainframeHardware:this._mainframeHardwareState.serialize(),mainframePrograms:this._mainframeProgramsState.serialize(),mainframeProcesses:this._mainframeProcessesState.serialize(),mainframeHardwareAutomationState:this._mainframeHardwareAutomationState.serialize(),mainframeProgramsAutomationState:this._mainframeProgramsAutomationState.serialize()};return btoa(JSON.stringify(t))}async deserialize(t){const e=JSON.parse(atob(t));this._programFactory.deleteAllPrograms(),await this._scenarioState.deserialize(e.scenario),await this._globalState.deserialize(e.global),await this._settingsState.deserialize(e.settings),await this._cityState.deserialize(e.city),await this._mainframeHardwareState.deserialize(e.mainframeHardware),await this._mainframeProgramsState.deserialize(e.mainframePrograms),await this._mainframeProcessesState.deserialize(e.mainframeProcesses),await this._mainframeHardwareAutomationState.deserialize(e.mainframeHardwareAutomationState),await this._mainframeProgramsAutomationState.deserialize(e.mainframeProgramsAutomationState)}processTicks(t){let e=0;for(this._globalState.time.updateLastUpdateTime();e<t&&this._globalState.time.tryNextTick();e++)this.processSingleTick();return e}};bh=yD([It(),Ir(0,ge(B.ScenarioState)),Ir(1,ge(B.GlobalState)),Ir(2,ge(B.SettingsState)),Ir(3,ge(B.CityState)),Ir(4,ge(B.MessageLogState)),Ir(5,ge(B.MainframeHardwareState)),Ir(6,ge(B.MainframeProgramsState)),Ir(7,ge(B.MainframeProcessesState)),Ir(8,ge(B.ProgramFactory)),Ir(9,ge(B.MainframeHardwareAutomationState)),Ir(10,ge(B.MainframeProgramsAutomationState))],bh);var ul={exports:{}};/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ul.exports;(function(t,e){(function(){var r,i="4.17.21",s=200,o="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",l="Expected a function",d="Invalid `variable` option passed into `_.template`",p="__lodash_hash_undefined__",h=500,g="__lodash_placeholder__",b=1,y=2,x=4,A=1,k=2,I=1,U=2,H=4,z=8,V=16,j=32,ie=64,te=128,Ae=256,He=512,Rt=30,dt="...",st=800,kt=16,Ge=1,rt=2,ut=3,Je=1/0,Re=9007199254740991,lr=17976931348623157e292,Wt=NaN,Et=4294967295,ce=Et-1,mn=Et>>>1,Fl=[["ary",te],["bind",I],["bindKey",U],["curry",z],["curryRight",V],["flip",He],["partial",j],["partialRight",ie],["rearg",Ae]],Me="[object Arguments]",xi="[object Array]",Ul="[object AsyncFunction]",gn="[object Boolean]",zn="[object Date]",cr="[object DOMException]",Bn="[object Error]",Yr="[object Function]",ds="[object GeneratorFunction]",Kt="[object Map]",Jr="[object Number]",Aa="[object Null]",ur="[object Object]",ps="[object Promise]",Ea="[object Proxy]",vn="[object RegExp]",Nt="[object Set]",Hn="[object String]",Pi="[object Symbol]",zl="[object Undefined]",Gn="[object WeakMap]",Vn="[object WeakSet]",jn="[object ArrayBuffer]",bn="[object DataView]",fs="[object Float32Array]",qn="[object Float64Array]",T="[object Int8Array]",$="[object Int16Array]",N="[object Int32Array]",G="[object Uint8Array]",ne="[object Uint8ClampedArray]",nt="[object Uint16Array]",Ze="[object Uint32Array]",be=/\b__p \+= '';/g,W=/\b(__p \+=) '' \+/g,Y=/(__e\(.*?\)|\b__t\)) \+\n'';/g,Z=/&(?:amp|lt|gt|quot|#39);/g,Q=/[&<>"']/g,_e=RegExp(Z.source),ke=RegExp(Q.source),Qe=/<%-([\s\S]+?)%>/g,Yt=/<%([\s\S]+?)%>/g,ms=/<%=([\s\S]+?)%>/g,Bl=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Hl=/^\w*$/,ov=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Gl=/[\\^$.*+?()[\]{}|]/g,lv=RegExp(Gl.source),Vl=/^\s+/,cv=/\s/,uv=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,hv=/\{\n\/\* \[wrapped with (.+)\] \*/,dv=/,? & /,pv=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,fv=/[()=,{}\[\]\/\s]/,mv=/\\(\\)?/g,gv=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,nd=/\w*$/,vv=/^[-+]0x[0-9a-f]+$/i,bv=/^0b[01]+$/i,yv=/^\[object .+?Constructor\]$/,_v=/^0o[0-7]+$/i,wv=/^(?:0|[1-9]\d*)$/,Sv=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Ta=/($^)/,xv=/['\n\r\u2028\u2029\\]/g,Oa="\\ud800-\\udfff",Pv="\\u0300-\\u036f",Cv="\\ufe20-\\ufe2f",Av="\\u20d0-\\u20ff",id=Pv+Cv+Av,sd="\\u2700-\\u27bf",ad="a-z\\xdf-\\xf6\\xf8-\\xff",Ev="\\xac\\xb1\\xd7\\xf7",Tv="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",Ov="\\u2000-\\u206f",$v=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",od="A-Z\\xc0-\\xd6\\xd8-\\xde",ld="\\ufe0e\\ufe0f",cd=Ev+Tv+Ov+$v,jl="['’]",Dv="["+Oa+"]",ud="["+cd+"]",$a="["+id+"]",hd="\\d+",Iv="["+sd+"]",dd="["+ad+"]",pd="[^"+Oa+cd+hd+sd+ad+od+"]",ql="\\ud83c[\\udffb-\\udfff]",Rv="(?:"+$a+"|"+ql+")",fd="[^"+Oa+"]",Wl="(?:\\ud83c[\\udde6-\\uddff]){2}",Kl="[\\ud800-\\udbff][\\udc00-\\udfff]",Ci="["+od+"]",md="\\u200d",gd="(?:"+dd+"|"+pd+")",kv="(?:"+Ci+"|"+pd+")",vd="(?:"+jl+"(?:d|ll|m|re|s|t|ve))?",bd="(?:"+jl+"(?:D|LL|M|RE|S|T|VE))?",yd=Rv+"?",_d="["+ld+"]?",Nv="(?:"+md+"(?:"+[fd,Wl,Kl].join("|")+")"+_d+yd+")*",Lv="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Mv="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",wd=_d+yd+Nv,Fv="(?:"+[Iv,Wl,Kl].join("|")+")"+wd,Uv="(?:"+[fd+$a+"?",$a,Wl,Kl,Dv].join("|")+")",zv=RegExp(jl,"g"),Bv=RegExp($a,"g"),Yl=RegExp(ql+"(?="+ql+")|"+Uv+wd,"g"),Hv=RegExp([Ci+"?"+dd+"+"+vd+"(?="+[ud,Ci,"$"].join("|")+")",kv+"+"+bd+"(?="+[ud,Ci+gd,"$"].join("|")+")",Ci+"?"+gd+"+"+vd,Ci+"+"+bd,Mv,Lv,hd,Fv].join("|"),"g"),Gv=RegExp("["+md+Oa+id+ld+"]"),Vv=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,jv=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],qv=-1,Ve={};Ve[fs]=Ve[qn]=Ve[T]=Ve[$]=Ve[N]=Ve[G]=Ve[ne]=Ve[nt]=Ve[Ze]=!0,Ve[Me]=Ve[xi]=Ve[jn]=Ve[gn]=Ve[bn]=Ve[zn]=Ve[Bn]=Ve[Yr]=Ve[Kt]=Ve[Jr]=Ve[ur]=Ve[vn]=Ve[Nt]=Ve[Hn]=Ve[Gn]=!1;var Fe={};Fe[Me]=Fe[xi]=Fe[jn]=Fe[bn]=Fe[gn]=Fe[zn]=Fe[fs]=Fe[qn]=Fe[T]=Fe[$]=Fe[N]=Fe[Kt]=Fe[Jr]=Fe[ur]=Fe[vn]=Fe[Nt]=Fe[Hn]=Fe[Pi]=Fe[G]=Fe[ne]=Fe[nt]=Fe[Ze]=!0,Fe[Bn]=Fe[Yr]=Fe[Gn]=!1;var Wv={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},Kv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yv={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Jv={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Zv=parseFloat,Qv=parseInt,Sd=typeof ai=="object"&&ai&&ai.Object===Object&&ai,Xv=typeof self=="object"&&self&&self.Object===Object&&self,_t=Sd||Xv||Function("return this")(),Jl=e&&!e.nodeType&&e,Wn=Jl&&!0&&t&&!t.nodeType&&t,xd=Wn&&Wn.exports===Jl,Zl=xd&&Sd.process,hr=function(){try{var C=Wn&&Wn.require&&Wn.require("util").types;return C||Zl&&Zl.binding&&Zl.binding("util")}catch{}}(),Pd=hr&&hr.isArrayBuffer,Cd=hr&&hr.isDate,Ad=hr&&hr.isMap,Ed=hr&&hr.isRegExp,Td=hr&&hr.isSet,Od=hr&&hr.isTypedArray;function Jt(C,R,D){switch(D.length){case 0:return C.call(R);case 1:return C.call(R,D[0]);case 2:return C.call(R,D[0],D[1]);case 3:return C.call(R,D[0],D[1],D[2])}return C.apply(R,D)}function eb(C,R,D,J){for(var de=-1,Te=C==null?0:C.length;++de<Te;){var pt=C[de];R(J,pt,D(pt),C)}return J}function dr(C,R){for(var D=-1,J=C==null?0:C.length;++D<J&&R(C[D],D,C)!==!1;);return C}function tb(C,R){for(var D=C==null?0:C.length;D--&&R(C[D],D,C)!==!1;);return C}function $d(C,R){for(var D=-1,J=C==null?0:C.length;++D<J;)if(!R(C[D],D,C))return!1;return!0}function yn(C,R){for(var D=-1,J=C==null?0:C.length,de=0,Te=[];++D<J;){var pt=C[D];R(pt,D,C)&&(Te[de++]=pt)}return Te}function Da(C,R){var D=C==null?0:C.length;return!!D&&Ai(C,R,0)>-1}function Ql(C,R,D){for(var J=-1,de=C==null?0:C.length;++J<de;)if(D(R,C[J]))return!0;return!1}function Ke(C,R){for(var D=-1,J=C==null?0:C.length,de=Array(J);++D<J;)de[D]=R(C[D],D,C);return de}function _n(C,R){for(var D=-1,J=R.length,de=C.length;++D<J;)C[de+D]=R[D];return C}function Xl(C,R,D,J){var de=-1,Te=C==null?0:C.length;for(J&&Te&&(D=C[++de]);++de<Te;)D=R(D,C[de],de,C);return D}function rb(C,R,D,J){var de=C==null?0:C.length;for(J&&de&&(D=C[--de]);de--;)D=R(D,C[de],de,C);return D}function ec(C,R){for(var D=-1,J=C==null?0:C.length;++D<J;)if(R(C[D],D,C))return!0;return!1}var nb=tc("length");function ib(C){return C.split("")}function sb(C){return C.match(pv)||[]}function Dd(C,R,D){var J;return D(C,function(de,Te,pt){if(R(de,Te,pt))return J=Te,!1}),J}function Ia(C,R,D,J){for(var de=C.length,Te=D+(J?1:-1);J?Te--:++Te<de;)if(R(C[Te],Te,C))return Te;return-1}function Ai(C,R,D){return R===R?vb(C,R,D):Ia(C,Id,D)}function ab(C,R,D,J){for(var de=D-1,Te=C.length;++de<Te;)if(J(C[de],R))return de;return-1}function Id(C){return C!==C}function Rd(C,R){var D=C==null?0:C.length;return D?nc(C,R)/D:Wt}function tc(C){return function(R){return R==null?r:R[C]}}function rc(C){return function(R){return C==null?r:C[R]}}function kd(C,R,D,J,de){return de(C,function(Te,pt,Ne){D=J?(J=!1,Te):R(D,Te,pt,Ne)}),D}function ob(C,R){var D=C.length;for(C.sort(R);D--;)C[D]=C[D].value;return C}function nc(C,R){for(var D,J=-1,de=C.length;++J<de;){var Te=R(C[J]);Te!==r&&(D=D===r?Te:D+Te)}return D}function ic(C,R){for(var D=-1,J=Array(C);++D<C;)J[D]=R(D);return J}function lb(C,R){return Ke(R,function(D){return[D,C[D]]})}function Nd(C){return C&&C.slice(0,Ud(C)+1).replace(Vl,"")}function Zt(C){return function(R){return C(R)}}function sc(C,R){return Ke(R,function(D){return C[D]})}function gs(C,R){return C.has(R)}function Ld(C,R){for(var D=-1,J=C.length;++D<J&&Ai(R,C[D],0)>-1;);return D}function Md(C,R){for(var D=C.length;D--&&Ai(R,C[D],0)>-1;);return D}function cb(C,R){for(var D=C.length,J=0;D--;)C[D]===R&&++J;return J}var ub=rc(Wv),hb=rc(Kv);function db(C){return"\\"+Jv[C]}function pb(C,R){return C==null?r:C[R]}function Ei(C){return Gv.test(C)}function fb(C){return Vv.test(C)}function mb(C){for(var R,D=[];!(R=C.next()).done;)D.push(R.value);return D}function ac(C){var R=-1,D=Array(C.size);return C.forEach(function(J,de){D[++R]=[de,J]}),D}function Fd(C,R){return function(D){return C(R(D))}}function wn(C,R){for(var D=-1,J=C.length,de=0,Te=[];++D<J;){var pt=C[D];(pt===R||pt===g)&&(C[D]=g,Te[de++]=D)}return Te}function Ra(C){var R=-1,D=Array(C.size);return C.forEach(function(J){D[++R]=J}),D}function gb(C){var R=-1,D=Array(C.size);return C.forEach(function(J){D[++R]=[J,J]}),D}function vb(C,R,D){for(var J=D-1,de=C.length;++J<de;)if(C[J]===R)return J;return-1}function bb(C,R,D){for(var J=D+1;J--;)if(C[J]===R)return J;return J}function Ti(C){return Ei(C)?_b(C):nb(C)}function Tr(C){return Ei(C)?wb(C):ib(C)}function Ud(C){for(var R=C.length;R--&&cv.test(C.charAt(R)););return R}var yb=rc(Yv);function _b(C){for(var R=Yl.lastIndex=0;Yl.test(C);)++R;return R}function wb(C){return C.match(Yl)||[]}function Sb(C){return C.match(Hv)||[]}var xb=function C(R){R=R==null?_t:Oi.defaults(_t.Object(),R,Oi.pick(_t,jv));var D=R.Array,J=R.Date,de=R.Error,Te=R.Function,pt=R.Math,Ne=R.Object,oc=R.RegExp,Pb=R.String,pr=R.TypeError,ka=D.prototype,Cb=Te.prototype,$i=Ne.prototype,Na=R["__core-js_shared__"],La=Cb.toString,$e=$i.hasOwnProperty,Ab=0,zd=function(){var n=/[^.]+$/.exec(Na&&Na.keys&&Na.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),Ma=$i.toString,Eb=La.call(Ne),Tb=_t._,Ob=oc("^"+La.call($e).replace(Gl,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Fa=xd?R.Buffer:r,Sn=R.Symbol,Ua=R.Uint8Array,Bd=Fa?Fa.allocUnsafe:r,za=Fd(Ne.getPrototypeOf,Ne),Hd=Ne.create,Gd=$i.propertyIsEnumerable,Ba=ka.splice,Vd=Sn?Sn.isConcatSpreadable:r,vs=Sn?Sn.iterator:r,Kn=Sn?Sn.toStringTag:r,Ha=function(){try{var n=Xn(Ne,"defineProperty");return n({},"",{}),n}catch{}}(),$b=R.clearTimeout!==_t.clearTimeout&&R.clearTimeout,Db=J&&J.now!==_t.Date.now&&J.now,Ib=R.setTimeout!==_t.setTimeout&&R.setTimeout,Ga=pt.ceil,Va=pt.floor,lc=Ne.getOwnPropertySymbols,Rb=Fa?Fa.isBuffer:r,jd=R.isFinite,kb=ka.join,Nb=Fd(Ne.keys,Ne),ft=pt.max,Tt=pt.min,Lb=J.now,Mb=R.parseInt,qd=pt.random,Fb=ka.reverse,cc=Xn(R,"DataView"),bs=Xn(R,"Map"),uc=Xn(R,"Promise"),Di=Xn(R,"Set"),ys=Xn(R,"WeakMap"),_s=Xn(Ne,"create"),ja=ys&&new ys,Ii={},Ub=ei(cc),zb=ei(bs),Bb=ei(uc),Hb=ei(Di),Gb=ei(ys),qa=Sn?Sn.prototype:r,ws=qa?qa.valueOf:r,Wd=qa?qa.toString:r;function m(n){if(it(n)&&!pe(n)&&!(n instanceof Se)){if(n instanceof fr)return n;if($e.call(n,"__wrapped__"))return Kp(n)}return new fr(n)}var Ri=function(){function n(){}return function(a){if(!Xe(a))return{};if(Hd)return Hd(a);n.prototype=a;var c=new n;return n.prototype=r,c}}();function Wa(){}function fr(n,a){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!a,this.__index__=0,this.__values__=r}m.templateSettings={escape:Qe,evaluate:Yt,interpolate:ms,variable:"",imports:{_:m}},m.prototype=Wa.prototype,m.prototype.constructor=m,fr.prototype=Ri(Wa.prototype),fr.prototype.constructor=fr;function Se(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Et,this.__views__=[]}function Vb(){var n=new Se(this.__wrapped__);return n.__actions__=zt(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=zt(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=zt(this.__views__),n}function jb(){if(this.__filtered__){var n=new Se(this);n.__dir__=-1,n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function qb(){var n=this.__wrapped__.value(),a=this.__dir__,c=pe(n),u=a<0,f=c?n.length:0,v=i_(0,f,this.__views__),w=v.start,S=v.end,E=S-w,L=u?S:w-1,M=this.__iteratees__,F=M.length,q=0,re=Tt(E,this.__takeCount__);if(!c||!u&&f==E&&re==E)return vp(n,this.__actions__);var oe=[];e:for(;E--&&q<re;){L+=a;for(var me=-1,le=n[L];++me<F;){var we=M[me],xe=we.iteratee,er=we.type,Ft=xe(le);if(er==rt)le=Ft;else if(!Ft){if(er==Ge)continue e;break e}}oe[q++]=le}return oe}Se.prototype=Ri(Wa.prototype),Se.prototype.constructor=Se;function Yn(n){var a=-1,c=n==null?0:n.length;for(this.clear();++a<c;){var u=n[a];this.set(u[0],u[1])}}function Wb(){this.__data__=_s?_s(null):{},this.size=0}function Kb(n){var a=this.has(n)&&delete this.__data__[n];return this.size-=a?1:0,a}function Yb(n){var a=this.__data__;if(_s){var c=a[n];return c===p?r:c}return $e.call(a,n)?a[n]:r}function Jb(n){var a=this.__data__;return _s?a[n]!==r:$e.call(a,n)}function Zb(n,a){var c=this.__data__;return this.size+=this.has(n)?0:1,c[n]=_s&&a===r?p:a,this}Yn.prototype.clear=Wb,Yn.prototype.delete=Kb,Yn.prototype.get=Yb,Yn.prototype.has=Jb,Yn.prototype.set=Zb;function Zr(n){var a=-1,c=n==null?0:n.length;for(this.clear();++a<c;){var u=n[a];this.set(u[0],u[1])}}function Qb(){this.__data__=[],this.size=0}function Xb(n){var a=this.__data__,c=Ka(a,n);if(c<0)return!1;var u=a.length-1;return c==u?a.pop():Ba.call(a,c,1),--this.size,!0}function ey(n){var a=this.__data__,c=Ka(a,n);return c<0?r:a[c][1]}function ty(n){return Ka(this.__data__,n)>-1}function ry(n,a){var c=this.__data__,u=Ka(c,n);return u<0?(++this.size,c.push([n,a])):c[u][1]=a,this}Zr.prototype.clear=Qb,Zr.prototype.delete=Xb,Zr.prototype.get=ey,Zr.prototype.has=ty,Zr.prototype.set=ry;function Qr(n){var a=-1,c=n==null?0:n.length;for(this.clear();++a<c;){var u=n[a];this.set(u[0],u[1])}}function ny(){this.size=0,this.__data__={hash:new Yn,map:new(bs||Zr),string:new Yn}}function iy(n){var a=ao(this,n).delete(n);return this.size-=a?1:0,a}function sy(n){return ao(this,n).get(n)}function ay(n){return ao(this,n).has(n)}function oy(n,a){var c=ao(this,n),u=c.size;return c.set(n,a),this.size+=c.size==u?0:1,this}Qr.prototype.clear=ny,Qr.prototype.delete=iy,Qr.prototype.get=sy,Qr.prototype.has=ay,Qr.prototype.set=oy;function Jn(n){var a=-1,c=n==null?0:n.length;for(this.__data__=new Qr;++a<c;)this.add(n[a])}function ly(n){return this.__data__.set(n,p),this}function cy(n){return this.__data__.has(n)}Jn.prototype.add=Jn.prototype.push=ly,Jn.prototype.has=cy;function Or(n){var a=this.__data__=new Zr(n);this.size=a.size}function uy(){this.__data__=new Zr,this.size=0}function hy(n){var a=this.__data__,c=a.delete(n);return this.size=a.size,c}function dy(n){return this.__data__.get(n)}function py(n){return this.__data__.has(n)}function fy(n,a){var c=this.__data__;if(c instanceof Zr){var u=c.__data__;if(!bs||u.length<s-1)return u.push([n,a]),this.size=++c.size,this;c=this.__data__=new Qr(u)}return c.set(n,a),this.size=c.size,this}Or.prototype.clear=uy,Or.prototype.delete=hy,Or.prototype.get=dy,Or.prototype.has=py,Or.prototype.set=fy;function Kd(n,a){var c=pe(n),u=!c&&ti(n),f=!c&&!u&&En(n),v=!c&&!u&&!f&&Mi(n),w=c||u||f||v,S=w?ic(n.length,Pb):[],E=S.length;for(var L in n)(a||$e.call(n,L))&&!(w&&(L=="length"||f&&(L=="offset"||L=="parent")||v&&(L=="buffer"||L=="byteLength"||L=="byteOffset")||rn(L,E)))&&S.push(L);return S}function Yd(n){var a=n.length;return a?n[wc(0,a-1)]:r}function my(n,a){return oo(zt(n),Zn(a,0,n.length))}function gy(n){return oo(zt(n))}function hc(n,a,c){(c!==r&&!$r(n[a],c)||c===r&&!(a in n))&&Xr(n,a,c)}function Ss(n,a,c){var u=n[a];(!($e.call(n,a)&&$r(u,c))||c===r&&!(a in n))&&Xr(n,a,c)}function Ka(n,a){for(var c=n.length;c--;)if($r(n[c][0],a))return c;return-1}function vy(n,a,c,u){return xn(n,function(f,v,w){a(u,f,c(f),w)}),u}function Jd(n,a){return n&&Ur(a,bt(a),n)}function by(n,a){return n&&Ur(a,Ht(a),n)}function Xr(n,a,c){a=="__proto__"&&Ha?Ha(n,a,{configurable:!0,enumerable:!0,value:c,writable:!0}):n[a]=c}function dc(n,a){for(var c=-1,u=a.length,f=D(u),v=n==null;++c<u;)f[c]=v?r:qc(n,a[c]);return f}function Zn(n,a,c){return n===n&&(c!==r&&(n=n<=c?n:c),a!==r&&(n=n>=a?n:a)),n}function mr(n,a,c,u,f,v){var w,S=a&b,E=a&y,L=a&x;if(c&&(w=f?c(n,u,f,v):c(n)),w!==r)return w;if(!Xe(n))return n;var M=pe(n);if(M){if(w=a_(n),!S)return zt(n,w)}else{var F=Ot(n),q=F==Yr||F==ds;if(En(n))return _p(n,S);if(F==ur||F==Me||q&&!f){if(w=E||q?{}:Up(n),!S)return E?Yy(n,by(w,n)):Ky(n,Jd(w,n))}else{if(!Fe[F])return f?n:{};w=o_(n,F,S)}}v||(v=new Or);var re=v.get(n);if(re)return re;v.set(n,w),mf(n)?n.forEach(function(le){w.add(mr(le,a,c,le,n,v))}):pf(n)&&n.forEach(function(le,we){w.set(we,mr(le,a,c,we,n,v))});var oe=L?E?Ic:Dc:E?Ht:bt,me=M?r:oe(n);return dr(me||n,function(le,we){me&&(we=le,le=n[we]),Ss(w,we,mr(le,a,c,we,n,v))}),w}function yy(n){var a=bt(n);return function(c){return Zd(c,n,a)}}function Zd(n,a,c){var u=c.length;if(n==null)return!u;for(n=Ne(n);u--;){var f=c[u],v=a[f],w=n[f];if(w===r&&!(f in n)||!v(w))return!1}return!0}function Qd(n,a,c){if(typeof n!="function")throw new pr(l);return Os(function(){n.apply(r,c)},a)}function xs(n,a,c,u){var f=-1,v=Da,w=!0,S=n.length,E=[],L=a.length;if(!S)return E;c&&(a=Ke(a,Zt(c))),u?(v=Ql,w=!1):a.length>=s&&(v=gs,w=!1,a=new Jn(a));e:for(;++f<S;){var M=n[f],F=c==null?M:c(M);if(M=u||M!==0?M:0,w&&F===F){for(var q=L;q--;)if(a[q]===F)continue e;E.push(M)}else v(a,F,u)||E.push(M)}return E}var xn=Cp(Fr),Xd=Cp(fc,!0);function _y(n,a){var c=!0;return xn(n,function(u,f,v){return c=!!a(u,f,v),c}),c}function Ya(n,a,c){for(var u=-1,f=n.length;++u<f;){var v=n[u],w=a(v);if(w!=null&&(S===r?w===w&&!Xt(w):c(w,S)))var S=w,E=v}return E}function wy(n,a,c,u){var f=n.length;for(c=fe(c),c<0&&(c=-c>f?0:f+c),u=u===r||u>f?f:fe(u),u<0&&(u+=f),u=c>u?0:vf(u);c<u;)n[c++]=a;return n}function ep(n,a){var c=[];return xn(n,function(u,f,v){a(u,f,v)&&c.push(u)}),c}function wt(n,a,c,u,f){var v=-1,w=n.length;for(c||(c=c_),f||(f=[]);++v<w;){var S=n[v];a>0&&c(S)?a>1?wt(S,a-1,c,u,f):_n(f,S):u||(f[f.length]=S)}return f}var pc=Ap(),tp=Ap(!0);function Fr(n,a){return n&&pc(n,a,bt)}function fc(n,a){return n&&tp(n,a,bt)}function Ja(n,a){return yn(a,function(c){return nn(n[c])})}function Qn(n,a){a=Cn(a,n);for(var c=0,u=a.length;n!=null&&c<u;)n=n[zr(a[c++])];return c&&c==u?n:r}function rp(n,a,c){var u=a(n);return pe(n)?u:_n(u,c(n))}function Lt(n){return n==null?n===r?zl:Aa:Kn&&Kn in Ne(n)?n_(n):g_(n)}function mc(n,a){return n>a}function Sy(n,a){return n!=null&&$e.call(n,a)}function xy(n,a){return n!=null&&a in Ne(n)}function Py(n,a,c){return n>=Tt(a,c)&&n<ft(a,c)}function gc(n,a,c){for(var u=c?Ql:Da,f=n[0].length,v=n.length,w=v,S=D(v),E=1/0,L=[];w--;){var M=n[w];w&&a&&(M=Ke(M,Zt(a))),E=Tt(M.length,E),S[w]=!c&&(a||f>=120&&M.length>=120)?new Jn(w&&M):r}M=n[0];var F=-1,q=S[0];e:for(;++F<f&&L.length<E;){var re=M[F],oe=a?a(re):re;if(re=c||re!==0?re:0,!(q?gs(q,oe):u(L,oe,c))){for(w=v;--w;){var me=S[w];if(!(me?gs(me,oe):u(n[w],oe,c)))continue e}q&&q.push(oe),L.push(re)}}return L}function Cy(n,a,c,u){return Fr(n,function(f,v,w){a(u,c(f),v,w)}),u}function Ps(n,a,c){a=Cn(a,n),n=Gp(n,a);var u=n==null?n:n[zr(vr(a))];return u==null?r:Jt(u,n,c)}function np(n){return it(n)&&Lt(n)==Me}function Ay(n){return it(n)&&Lt(n)==jn}function Ey(n){return it(n)&&Lt(n)==zn}function Cs(n,a,c,u,f){return n===a?!0:n==null||a==null||!it(n)&&!it(a)?n!==n&&a!==a:Ty(n,a,c,u,Cs,f)}function Ty(n,a,c,u,f,v){var w=pe(n),S=pe(a),E=w?xi:Ot(n),L=S?xi:Ot(a);E=E==Me?ur:E,L=L==Me?ur:L;var M=E==ur,F=L==ur,q=E==L;if(q&&En(n)){if(!En(a))return!1;w=!0,M=!1}if(q&&!M)return v||(v=new Or),w||Mi(n)?Lp(n,a,c,u,f,v):t_(n,a,E,c,u,f,v);if(!(c&A)){var re=M&&$e.call(n,"__wrapped__"),oe=F&&$e.call(a,"__wrapped__");if(re||oe){var me=re?n.value():n,le=oe?a.value():a;return v||(v=new Or),f(me,le,c,u,v)}}return q?(v||(v=new Or),r_(n,a,c,u,f,v)):!1}function Oy(n){return it(n)&&Ot(n)==Kt}function vc(n,a,c,u){var f=c.length,v=f,w=!u;if(n==null)return!v;for(n=Ne(n);f--;){var S=c[f];if(w&&S[2]?S[1]!==n[S[0]]:!(S[0]in n))return!1}for(;++f<v;){S=c[f];var E=S[0],L=n[E],M=S[1];if(w&&S[2]){if(L===r&&!(E in n))return!1}else{var F=new Or;if(u)var q=u(L,M,E,n,a,F);if(!(q===r?Cs(M,L,A|k,u,F):q))return!1}}return!0}function ip(n){if(!Xe(n)||h_(n))return!1;var a=nn(n)?Ob:yv;return a.test(ei(n))}function $y(n){return it(n)&&Lt(n)==vn}function Dy(n){return it(n)&&Ot(n)==Nt}function Iy(n){return it(n)&&fo(n.length)&&!!Ve[Lt(n)]}function sp(n){return typeof n=="function"?n:n==null?Gt:typeof n=="object"?pe(n)?lp(n[0],n[1]):op(n):Tf(n)}function bc(n){if(!Ts(n))return Nb(n);var a=[];for(var c in Ne(n))$e.call(n,c)&&c!="constructor"&&a.push(c);return a}function Ry(n){if(!Xe(n))return m_(n);var a=Ts(n),c=[];for(var u in n)u=="constructor"&&(a||!$e.call(n,u))||c.push(u);return c}function yc(n,a){return n<a}function ap(n,a){var c=-1,u=Bt(n)?D(n.length):[];return xn(n,function(f,v,w){u[++c]=a(f,v,w)}),u}function op(n){var a=kc(n);return a.length==1&&a[0][2]?Bp(a[0][0],a[0][1]):function(c){return c===n||vc(c,n,a)}}function lp(n,a){return Lc(n)&&zp(a)?Bp(zr(n),a):function(c){var u=qc(c,n);return u===r&&u===a?Wc(c,n):Cs(a,u,A|k)}}function Za(n,a,c,u,f){n!==a&&pc(a,function(v,w){if(f||(f=new Or),Xe(v))ky(n,a,w,c,Za,u,f);else{var S=u?u(Fc(n,w),v,w+"",n,a,f):r;S===r&&(S=v),hc(n,w,S)}},Ht)}function ky(n,a,c,u,f,v,w){var S=Fc(n,c),E=Fc(a,c),L=w.get(E);if(L){hc(n,c,L);return}var M=v?v(S,E,c+"",n,a,w):r,F=M===r;if(F){var q=pe(E),re=!q&&En(E),oe=!q&&!re&&Mi(E);M=E,q||re||oe?pe(S)?M=S:at(S)?M=zt(S):re?(F=!1,M=_p(E,!0)):oe?(F=!1,M=wp(E,!0)):M=[]:$s(E)||ti(E)?(M=S,ti(S)?M=bf(S):(!Xe(S)||nn(S))&&(M=Up(E))):F=!1}F&&(w.set(E,M),f(M,E,u,v,w),w.delete(E)),hc(n,c,M)}function cp(n,a){var c=n.length;if(c)return a+=a<0?c:0,rn(a,c)?n[a]:r}function up(n,a,c){a.length?a=Ke(a,function(v){return pe(v)?function(w){return Qn(w,v.length===1?v[0]:v)}:v}):a=[Gt];var u=-1;a=Ke(a,Zt(se()));var f=ap(n,function(v,w,S){var E=Ke(a,function(L){return L(v)});return{criteria:E,index:++u,value:v}});return ob(f,function(v,w){return Wy(v,w,c)})}function Ny(n,a){return hp(n,a,function(c,u){return Wc(n,u)})}function hp(n,a,c){for(var u=-1,f=a.length,v={};++u<f;){var w=a[u],S=Qn(n,w);c(S,w)&&As(v,Cn(w,n),S)}return v}function Ly(n){return function(a){return Qn(a,n)}}function _c(n,a,c,u){var f=u?ab:Ai,v=-1,w=a.length,S=n;for(n===a&&(a=zt(a)),c&&(S=Ke(n,Zt(c)));++v<w;)for(var E=0,L=a[v],M=c?c(L):L;(E=f(S,M,E,u))>-1;)S!==n&&Ba.call(S,E,1),Ba.call(n,E,1);return n}function dp(n,a){for(var c=n?a.length:0,u=c-1;c--;){var f=a[c];if(c==u||f!==v){var v=f;rn(f)?Ba.call(n,f,1):Pc(n,f)}}return n}function wc(n,a){return n+Va(qd()*(a-n+1))}function My(n,a,c,u){for(var f=-1,v=ft(Ga((a-n)/(c||1)),0),w=D(v);v--;)w[u?v:++f]=n,n+=c;return w}function Sc(n,a){var c="";if(!n||a<1||a>Re)return c;do a%2&&(c+=n),a=Va(a/2),a&&(n+=n);while(a);return c}function ye(n,a){return Uc(Hp(n,a,Gt),n+"")}function Fy(n){return Yd(Fi(n))}function Uy(n,a){var c=Fi(n);return oo(c,Zn(a,0,c.length))}function As(n,a,c,u){if(!Xe(n))return n;a=Cn(a,n);for(var f=-1,v=a.length,w=v-1,S=n;S!=null&&++f<v;){var E=zr(a[f]),L=c;if(E==="__proto__"||E==="constructor"||E==="prototype")return n;if(f!=w){var M=S[E];L=u?u(M,E,S):r,L===r&&(L=Xe(M)?M:rn(a[f+1])?[]:{})}Ss(S,E,L),S=S[E]}return n}var pp=ja?function(n,a){return ja.set(n,a),n}:Gt,zy=Ha?function(n,a){return Ha(n,"toString",{configurable:!0,enumerable:!1,value:Yc(a),writable:!0})}:Gt;function By(n){return oo(Fi(n))}function gr(n,a,c){var u=-1,f=n.length;a<0&&(a=-a>f?0:f+a),c=c>f?f:c,c<0&&(c+=f),f=a>c?0:c-a>>>0,a>>>=0;for(var v=D(f);++u<f;)v[u]=n[u+a];return v}function Hy(n,a){var c;return xn(n,function(u,f,v){return c=a(u,f,v),!c}),!!c}function Qa(n,a,c){var u=0,f=n==null?u:n.length;if(typeof a=="number"&&a===a&&f<=mn){for(;u<f;){var v=u+f>>>1,w=n[v];w!==null&&!Xt(w)&&(c?w<=a:w<a)?u=v+1:f=v}return f}return xc(n,a,Gt,c)}function xc(n,a,c,u){var f=0,v=n==null?0:n.length;if(v===0)return 0;a=c(a);for(var w=a!==a,S=a===null,E=Xt(a),L=a===r;f<v;){var M=Va((f+v)/2),F=c(n[M]),q=F!==r,re=F===null,oe=F===F,me=Xt(F);if(w)var le=u||oe;else L?le=oe&&(u||q):S?le=oe&&q&&(u||!re):E?le=oe&&q&&!re&&(u||!me):re||me?le=!1:le=u?F<=a:F<a;le?f=M+1:v=M}return Tt(v,ce)}function fp(n,a){for(var c=-1,u=n.length,f=0,v=[];++c<u;){var w=n[c],S=a?a(w):w;if(!c||!$r(S,E)){var E=S;v[f++]=w===0?0:w}}return v}function mp(n){return typeof n=="number"?n:Xt(n)?Wt:+n}function Qt(n){if(typeof n=="string")return n;if(pe(n))return Ke(n,Qt)+"";if(Xt(n))return Wd?Wd.call(n):"";var a=n+"";return a=="0"&&1/n==-Je?"-0":a}function Pn(n,a,c){var u=-1,f=Da,v=n.length,w=!0,S=[],E=S;if(c)w=!1,f=Ql;else if(v>=s){var L=a?null:Xy(n);if(L)return Ra(L);w=!1,f=gs,E=new Jn}else E=a?[]:S;e:for(;++u<v;){var M=n[u],F=a?a(M):M;if(M=c||M!==0?M:0,w&&F===F){for(var q=E.length;q--;)if(E[q]===F)continue e;a&&E.push(F),S.push(M)}else f(E,F,c)||(E!==S&&E.push(F),S.push(M))}return S}function Pc(n,a){return a=Cn(a,n),n=Gp(n,a),n==null||delete n[zr(vr(a))]}function gp(n,a,c,u){return As(n,a,c(Qn(n,a)),u)}function Xa(n,a,c,u){for(var f=n.length,v=u?f:-1;(u?v--:++v<f)&&a(n[v],v,n););return c?gr(n,u?0:v,u?v+1:f):gr(n,u?v+1:0,u?f:v)}function vp(n,a){var c=n;return c instanceof Se&&(c=c.value()),Xl(a,function(u,f){return f.func.apply(f.thisArg,_n([u],f.args))},c)}function Cc(n,a,c){var u=n.length;if(u<2)return u?Pn(n[0]):[];for(var f=-1,v=D(u);++f<u;)for(var w=n[f],S=-1;++S<u;)S!=f&&(v[f]=xs(v[f]||w,n[S],a,c));return Pn(wt(v,1),a,c)}function bp(n,a,c){for(var u=-1,f=n.length,v=a.length,w={};++u<f;){var S=u<v?a[u]:r;c(w,n[u],S)}return w}function Ac(n){return at(n)?n:[]}function Ec(n){return typeof n=="function"?n:Gt}function Cn(n,a){return pe(n)?n:Lc(n,a)?[n]:Wp(Oe(n))}var Gy=ye;function An(n,a,c){var u=n.length;return c=c===r?u:c,!a&&c>=u?n:gr(n,a,c)}var yp=$b||function(n){return _t.clearTimeout(n)};function _p(n,a){if(a)return n.slice();var c=n.length,u=Bd?Bd(c):new n.constructor(c);return n.copy(u),u}function Tc(n){var a=new n.constructor(n.byteLength);return new Ua(a).set(new Ua(n)),a}function Vy(n,a){var c=a?Tc(n.buffer):n.buffer;return new n.constructor(c,n.byteOffset,n.byteLength)}function jy(n){var a=new n.constructor(n.source,nd.exec(n));return a.lastIndex=n.lastIndex,a}function qy(n){return ws?Ne(ws.call(n)):{}}function wp(n,a){var c=a?Tc(n.buffer):n.buffer;return new n.constructor(c,n.byteOffset,n.length)}function Sp(n,a){if(n!==a){var c=n!==r,u=n===null,f=n===n,v=Xt(n),w=a!==r,S=a===null,E=a===a,L=Xt(a);if(!S&&!L&&!v&&n>a||v&&w&&E&&!S&&!L||u&&w&&E||!c&&E||!f)return 1;if(!u&&!v&&!L&&n<a||L&&c&&f&&!u&&!v||S&&c&&f||!w&&f||!E)return-1}return 0}function Wy(n,a,c){for(var u=-1,f=n.criteria,v=a.criteria,w=f.length,S=c.length;++u<w;){var E=Sp(f[u],v[u]);if(E){if(u>=S)return E;var L=c[u];return E*(L=="desc"?-1:1)}}return n.index-a.index}function xp(n,a,c,u){for(var f=-1,v=n.length,w=c.length,S=-1,E=a.length,L=ft(v-w,0),M=D(E+L),F=!u;++S<E;)M[S]=a[S];for(;++f<w;)(F||f<v)&&(M[c[f]]=n[f]);for(;L--;)M[S++]=n[f++];return M}function Pp(n,a,c,u){for(var f=-1,v=n.length,w=-1,S=c.length,E=-1,L=a.length,M=ft(v-S,0),F=D(M+L),q=!u;++f<M;)F[f]=n[f];for(var re=f;++E<L;)F[re+E]=a[E];for(;++w<S;)(q||f<v)&&(F[re+c[w]]=n[f++]);return F}function zt(n,a){var c=-1,u=n.length;for(a||(a=D(u));++c<u;)a[c]=n[c];return a}function Ur(n,a,c,u){var f=!c;c||(c={});for(var v=-1,w=a.length;++v<w;){var S=a[v],E=u?u(c[S],n[S],S,c,n):r;E===r&&(E=n[S]),f?Xr(c,S,E):Ss(c,S,E)}return c}function Ky(n,a){return Ur(n,Nc(n),a)}function Yy(n,a){return Ur(n,Mp(n),a)}function eo(n,a){return function(c,u){var f=pe(c)?eb:vy,v=a?a():{};return f(c,n,se(u,2),v)}}function ki(n){return ye(function(a,c){var u=-1,f=c.length,v=f>1?c[f-1]:r,w=f>2?c[2]:r;for(v=n.length>3&&typeof v=="function"?(f--,v):r,w&&Mt(c[0],c[1],w)&&(v=f<3?r:v,f=1),a=Ne(a);++u<f;){var S=c[u];S&&n(a,S,u,v)}return a})}function Cp(n,a){return function(c,u){if(c==null)return c;if(!Bt(c))return n(c,u);for(var f=c.length,v=a?f:-1,w=Ne(c);(a?v--:++v<f)&&u(w[v],v,w)!==!1;);return c}}function Ap(n){return function(a,c,u){for(var f=-1,v=Ne(a),w=u(a),S=w.length;S--;){var E=w[n?S:++f];if(c(v[E],E,v)===!1)break}return a}}function Jy(n,a,c){var u=a&I,f=Es(n);function v(){var w=this&&this!==_t&&this instanceof v?f:n;return w.apply(u?c:this,arguments)}return v}function Ep(n){return function(a){a=Oe(a);var c=Ei(a)?Tr(a):r,u=c?c[0]:a.charAt(0),f=c?An(c,1).join(""):a.slice(1);return u[n]()+f}}function Ni(n){return function(a){return Xl(Af(Cf(a).replace(zv,"")),n,"")}}function Es(n){return function(){var a=arguments;switch(a.length){case 0:return new n;case 1:return new n(a[0]);case 2:return new n(a[0],a[1]);case 3:return new n(a[0],a[1],a[2]);case 4:return new n(a[0],a[1],a[2],a[3]);case 5:return new n(a[0],a[1],a[2],a[3],a[4]);case 6:return new n(a[0],a[1],a[2],a[3],a[4],a[5]);case 7:return new n(a[0],a[1],a[2],a[3],a[4],a[5],a[6])}var c=Ri(n.prototype),u=n.apply(c,a);return Xe(u)?u:c}}function Zy(n,a,c){var u=Es(n);function f(){for(var v=arguments.length,w=D(v),S=v,E=Li(f);S--;)w[S]=arguments[S];var L=v<3&&w[0]!==E&&w[v-1]!==E?[]:wn(w,E);if(v-=L.length,v<c)return Ip(n,a,to,f.placeholder,r,w,L,r,r,c-v);var M=this&&this!==_t&&this instanceof f?u:n;return Jt(M,this,w)}return f}function Tp(n){return function(a,c,u){var f=Ne(a);if(!Bt(a)){var v=se(c,3);a=bt(a),c=function(S){return v(f[S],S,f)}}var w=n(a,c,u);return w>-1?f[v?a[w]:w]:r}}function Op(n){return tn(function(a){var c=a.length,u=c,f=fr.prototype.thru;for(n&&a.reverse();u--;){var v=a[u];if(typeof v!="function")throw new pr(l);if(f&&!w&&so(v)=="wrapper")var w=new fr([],!0)}for(u=w?u:c;++u<c;){v=a[u];var S=so(v),E=S=="wrapper"?Rc(v):r;E&&Mc(E[0])&&E[1]==(te|z|j|Ae)&&!E[4].length&&E[9]==1?w=w[so(E[0])].apply(w,E[3]):w=v.length==1&&Mc(v)?w[S]():w.thru(v)}return function(){var L=arguments,M=L[0];if(w&&L.length==1&&pe(M))return w.plant(M).value();for(var F=0,q=c?a[F].apply(this,L):M;++F<c;)q=a[F].call(this,q);return q}})}function to(n,a,c,u,f,v,w,S,E,L){var M=a&te,F=a&I,q=a&U,re=a&(z|V),oe=a&He,me=q?r:Es(n);function le(){for(var we=arguments.length,xe=D(we),er=we;er--;)xe[er]=arguments[er];if(re)var Ft=Li(le),tr=cb(xe,Ft);if(u&&(xe=xp(xe,u,f,re)),v&&(xe=Pp(xe,v,w,re)),we-=tr,re&&we<L){var ot=wn(xe,Ft);return Ip(n,a,to,le.placeholder,c,xe,ot,S,E,L-we)}var Dr=F?c:this,an=q?Dr[n]:n;return we=xe.length,S?xe=v_(xe,S):oe&&we>1&&xe.reverse(),M&&E<we&&(xe.length=E),this&&this!==_t&&this instanceof le&&(an=me||Es(an)),an.apply(Dr,xe)}return le}function $p(n,a){return function(c,u){return Cy(c,n,a(u),{})}}function ro(n,a){return function(c,u){var f;if(c===r&&u===r)return a;if(c!==r&&(f=c),u!==r){if(f===r)return u;typeof c=="string"||typeof u=="string"?(c=Qt(c),u=Qt(u)):(c=mp(c),u=mp(u)),f=n(c,u)}return f}}function Oc(n){return tn(function(a){return a=Ke(a,Zt(se())),ye(function(c){var u=this;return n(a,function(f){return Jt(f,u,c)})})})}function no(n,a){a=a===r?" ":Qt(a);var c=a.length;if(c<2)return c?Sc(a,n):a;var u=Sc(a,Ga(n/Ti(a)));return Ei(a)?An(Tr(u),0,n).join(""):u.slice(0,n)}function Qy(n,a,c,u){var f=a&I,v=Es(n);function w(){for(var S=-1,E=arguments.length,L=-1,M=u.length,F=D(M+E),q=this&&this!==_t&&this instanceof w?v:n;++L<M;)F[L]=u[L];for(;E--;)F[L++]=arguments[++S];return Jt(q,f?c:this,F)}return w}function Dp(n){return function(a,c,u){return u&&typeof u!="number"&&Mt(a,c,u)&&(c=u=r),a=sn(a),c===r?(c=a,a=0):c=sn(c),u=u===r?a<c?1:-1:sn(u),My(a,c,u,n)}}function io(n){return function(a,c){return typeof a=="string"&&typeof c=="string"||(a=br(a),c=br(c)),n(a,c)}}function Ip(n,a,c,u,f,v,w,S,E,L){var M=a&z,F=M?w:r,q=M?r:w,re=M?v:r,oe=M?r:v;a|=M?j:ie,a&=~(M?ie:j),a&H||(a&=~(I|U));var me=[n,a,f,re,F,oe,q,S,E,L],le=c.apply(r,me);return Mc(n)&&Vp(le,me),le.placeholder=u,jp(le,n,a)}function $c(n){var a=pt[n];return function(c,u){if(c=br(c),u=u==null?0:Tt(fe(u),292),u&&jd(c)){var f=(Oe(c)+"e").split("e"),v=a(f[0]+"e"+(+f[1]+u));return f=(Oe(v)+"e").split("e"),+(f[0]+"e"+(+f[1]-u))}return a(c)}}var Xy=Di&&1/Ra(new Di([,-0]))[1]==Je?function(n){return new Di(n)}:Qc;function Rp(n){return function(a){var c=Ot(a);return c==Kt?ac(a):c==Nt?gb(a):lb(a,n(a))}}function en(n,a,c,u,f,v,w,S){var E=a&U;if(!E&&typeof n!="function")throw new pr(l);var L=u?u.length:0;if(L||(a&=~(j|ie),u=f=r),w=w===r?w:ft(fe(w),0),S=S===r?S:fe(S),L-=f?f.length:0,a&ie){var M=u,F=f;u=f=r}var q=E?r:Rc(n),re=[n,a,c,u,f,M,F,v,w,S];if(q&&f_(re,q),n=re[0],a=re[1],c=re[2],u=re[3],f=re[4],S=re[9]=re[9]===r?E?0:n.length:ft(re[9]-L,0),!S&&a&(z|V)&&(a&=~(z|V)),!a||a==I)var oe=Jy(n,a,c);else a==z||a==V?oe=Zy(n,a,S):(a==j||a==(I|j))&&!f.length?oe=Qy(n,a,c,u):oe=to.apply(r,re);var me=q?pp:Vp;return jp(me(oe,re),n,a)}function kp(n,a,c,u){return n===r||$r(n,$i[c])&&!$e.call(u,c)?a:n}function Np(n,a,c,u,f,v){return Xe(n)&&Xe(a)&&(v.set(a,n),Za(n,a,r,Np,v),v.delete(a)),n}function e_(n){return $s(n)?r:n}function Lp(n,a,c,u,f,v){var w=c&A,S=n.length,E=a.length;if(S!=E&&!(w&&E>S))return!1;var L=v.get(n),M=v.get(a);if(L&&M)return L==a&&M==n;var F=-1,q=!0,re=c&k?new Jn:r;for(v.set(n,a),v.set(a,n);++F<S;){var oe=n[F],me=a[F];if(u)var le=w?u(me,oe,F,a,n,v):u(oe,me,F,n,a,v);if(le!==r){if(le)continue;q=!1;break}if(re){if(!ec(a,function(we,xe){if(!gs(re,xe)&&(oe===we||f(oe,we,c,u,v)))return re.push(xe)})){q=!1;break}}else if(!(oe===me||f(oe,me,c,u,v))){q=!1;break}}return v.delete(n),v.delete(a),q}function t_(n,a,c,u,f,v,w){switch(c){case bn:if(n.byteLength!=a.byteLength||n.byteOffset!=a.byteOffset)return!1;n=n.buffer,a=a.buffer;case jn:return!(n.byteLength!=a.byteLength||!v(new Ua(n),new Ua(a)));case gn:case zn:case Jr:return $r(+n,+a);case Bn:return n.name==a.name&&n.message==a.message;case vn:case Hn:return n==a+"";case Kt:var S=ac;case Nt:var E=u&A;if(S||(S=Ra),n.size!=a.size&&!E)return!1;var L=w.get(n);if(L)return L==a;u|=k,w.set(n,a);var M=Lp(S(n),S(a),u,f,v,w);return w.delete(n),M;case Pi:if(ws)return ws.call(n)==ws.call(a)}return!1}function r_(n,a,c,u,f,v){var w=c&A,S=Dc(n),E=S.length,L=Dc(a),M=L.length;if(E!=M&&!w)return!1;for(var F=E;F--;){var q=S[F];if(!(w?q in a:$e.call(a,q)))return!1}var re=v.get(n),oe=v.get(a);if(re&&oe)return re==a&&oe==n;var me=!0;v.set(n,a),v.set(a,n);for(var le=w;++F<E;){q=S[F];var we=n[q],xe=a[q];if(u)var er=w?u(xe,we,q,a,n,v):u(we,xe,q,n,a,v);if(!(er===r?we===xe||f(we,xe,c,u,v):er)){me=!1;break}le||(le=q=="constructor")}if(me&&!le){var Ft=n.constructor,tr=a.constructor;Ft!=tr&&"constructor"in n&&"constructor"in a&&!(typeof Ft=="function"&&Ft instanceof Ft&&typeof tr=="function"&&tr instanceof tr)&&(me=!1)}return v.delete(n),v.delete(a),me}function tn(n){return Uc(Hp(n,r,Zp),n+"")}function Dc(n){return rp(n,bt,Nc)}function Ic(n){return rp(n,Ht,Mp)}var Rc=ja?function(n){return ja.get(n)}:Qc;function so(n){for(var a=n.name+"",c=Ii[a],u=$e.call(Ii,a)?c.length:0;u--;){var f=c[u],v=f.func;if(v==null||v==n)return f.name}return a}function Li(n){var a=$e.call(m,"placeholder")?m:n;return a.placeholder}function se(){var n=m.iteratee||Jc;return n=n===Jc?sp:n,arguments.length?n(arguments[0],arguments[1]):n}function ao(n,a){var c=n.__data__;return u_(a)?c[typeof a=="string"?"string":"hash"]:c.map}function kc(n){for(var a=bt(n),c=a.length;c--;){var u=a[c],f=n[u];a[c]=[u,f,zp(f)]}return a}function Xn(n,a){var c=pb(n,a);return ip(c)?c:r}function n_(n){var a=$e.call(n,Kn),c=n[Kn];try{n[Kn]=r;var u=!0}catch{}var f=Ma.call(n);return u&&(a?n[Kn]=c:delete n[Kn]),f}var Nc=lc?function(n){return n==null?[]:(n=Ne(n),yn(lc(n),function(a){return Gd.call(n,a)}))}:Xc,Mp=lc?function(n){for(var a=[];n;)_n(a,Nc(n)),n=za(n);return a}:Xc,Ot=Lt;(cc&&Ot(new cc(new ArrayBuffer(1)))!=bn||bs&&Ot(new bs)!=Kt||uc&&Ot(uc.resolve())!=ps||Di&&Ot(new Di)!=Nt||ys&&Ot(new ys)!=Gn)&&(Ot=function(n){var a=Lt(n),c=a==ur?n.constructor:r,u=c?ei(c):"";if(u)switch(u){case Ub:return bn;case zb:return Kt;case Bb:return ps;case Hb:return Nt;case Gb:return Gn}return a});function i_(n,a,c){for(var u=-1,f=c.length;++u<f;){var v=c[u],w=v.size;switch(v.type){case"drop":n+=w;break;case"dropRight":a-=w;break;case"take":a=Tt(a,n+w);break;case"takeRight":n=ft(n,a-w);break}}return{start:n,end:a}}function s_(n){var a=n.match(hv);return a?a[1].split(dv):[]}function Fp(n,a,c){a=Cn(a,n);for(var u=-1,f=a.length,v=!1;++u<f;){var w=zr(a[u]);if(!(v=n!=null&&c(n,w)))break;n=n[w]}return v||++u!=f?v:(f=n==null?0:n.length,!!f&&fo(f)&&rn(w,f)&&(pe(n)||ti(n)))}function a_(n){var a=n.length,c=new n.constructor(a);return a&&typeof n[0]=="string"&&$e.call(n,"index")&&(c.index=n.index,c.input=n.input),c}function Up(n){return typeof n.constructor=="function"&&!Ts(n)?Ri(za(n)):{}}function o_(n,a,c){var u=n.constructor;switch(a){case jn:return Tc(n);case gn:case zn:return new u(+n);case bn:return Vy(n,c);case fs:case qn:case T:case $:case N:case G:case ne:case nt:case Ze:return wp(n,c);case Kt:return new u;case Jr:case Hn:return new u(n);case vn:return jy(n);case Nt:return new u;case Pi:return qy(n)}}function l_(n,a){var c=a.length;if(!c)return n;var u=c-1;return a[u]=(c>1?"& ":"")+a[u],a=a.join(c>2?", ":" "),n.replace(uv,`{
/* [wrapped with `+a+`] */
`)}function c_(n){return pe(n)||ti(n)||!!(Vd&&n&&n[Vd])}function rn(n,a){var c=typeof n;return a=a??Re,!!a&&(c=="number"||c!="symbol"&&wv.test(n))&&n>-1&&n%1==0&&n<a}function Mt(n,a,c){if(!Xe(c))return!1;var u=typeof a;return(u=="number"?Bt(c)&&rn(a,c.length):u=="string"&&a in c)?$r(c[a],n):!1}function Lc(n,a){if(pe(n))return!1;var c=typeof n;return c=="number"||c=="symbol"||c=="boolean"||n==null||Xt(n)?!0:Hl.test(n)||!Bl.test(n)||a!=null&&n in Ne(a)}function u_(n){var a=typeof n;return a=="string"||a=="number"||a=="symbol"||a=="boolean"?n!=="__proto__":n===null}function Mc(n){var a=so(n),c=m[a];if(typeof c!="function"||!(a in Se.prototype))return!1;if(n===c)return!0;var u=Rc(c);return!!u&&n===u[0]}function h_(n){return!!zd&&zd in n}var d_=Na?nn:eu;function Ts(n){var a=n&&n.constructor,c=typeof a=="function"&&a.prototype||$i;return n===c}function zp(n){return n===n&&!Xe(n)}function Bp(n,a){return function(c){return c==null?!1:c[n]===a&&(a!==r||n in Ne(c))}}function p_(n){var a=ho(n,function(u){return c.size===h&&c.clear(),u}),c=a.cache;return a}function f_(n,a){var c=n[1],u=a[1],f=c|u,v=f<(I|U|te),w=u==te&&c==z||u==te&&c==Ae&&n[7].length<=a[8]||u==(te|Ae)&&a[7].length<=a[8]&&c==z;if(!(v||w))return n;u&I&&(n[2]=a[2],f|=c&I?0:H);var S=a[3];if(S){var E=n[3];n[3]=E?xp(E,S,a[4]):S,n[4]=E?wn(n[3],g):a[4]}return S=a[5],S&&(E=n[5],n[5]=E?Pp(E,S,a[6]):S,n[6]=E?wn(n[5],g):a[6]),S=a[7],S&&(n[7]=S),u&te&&(n[8]=n[8]==null?a[8]:Tt(n[8],a[8])),n[9]==null&&(n[9]=a[9]),n[0]=a[0],n[1]=f,n}function m_(n){var a=[];if(n!=null)for(var c in Ne(n))a.push(c);return a}function g_(n){return Ma.call(n)}function Hp(n,a,c){return a=ft(a===r?n.length-1:a,0),function(){for(var u=arguments,f=-1,v=ft(u.length-a,0),w=D(v);++f<v;)w[f]=u[a+f];f=-1;for(var S=D(a+1);++f<a;)S[f]=u[f];return S[a]=c(w),Jt(n,this,S)}}function Gp(n,a){return a.length<2?n:Qn(n,gr(a,0,-1))}function v_(n,a){for(var c=n.length,u=Tt(a.length,c),f=zt(n);u--;){var v=a[u];n[u]=rn(v,c)?f[v]:r}return n}function Fc(n,a){if(!(a==="constructor"&&typeof n[a]=="function")&&a!="__proto__")return n[a]}var Vp=qp(pp),Os=Ib||function(n,a){return _t.setTimeout(n,a)},Uc=qp(zy);function jp(n,a,c){var u=a+"";return Uc(n,l_(u,b_(s_(u),c)))}function qp(n){var a=0,c=0;return function(){var u=Lb(),f=kt-(u-c);if(c=u,f>0){if(++a>=st)return arguments[0]}else a=0;return n.apply(r,arguments)}}function oo(n,a){var c=-1,u=n.length,f=u-1;for(a=a===r?u:a;++c<a;){var v=wc(c,f),w=n[v];n[v]=n[c],n[c]=w}return n.length=a,n}var Wp=p_(function(n){var a=[];return n.charCodeAt(0)===46&&a.push(""),n.replace(ov,function(c,u,f,v){a.push(f?v.replace(mv,"$1"):u||c)}),a});function zr(n){if(typeof n=="string"||Xt(n))return n;var a=n+"";return a=="0"&&1/n==-Je?"-0":a}function ei(n){if(n!=null){try{return La.call(n)}catch{}try{return n+""}catch{}}return""}function b_(n,a){return dr(Fl,function(c){var u="_."+c[0];a&c[1]&&!Da(n,u)&&n.push(u)}),n.sort()}function Kp(n){if(n instanceof Se)return n.clone();var a=new fr(n.__wrapped__,n.__chain__);return a.__actions__=zt(n.__actions__),a.__index__=n.__index__,a.__values__=n.__values__,a}function y_(n,a,c){(c?Mt(n,a,c):a===r)?a=1:a=ft(fe(a),0);var u=n==null?0:n.length;if(!u||a<1)return[];for(var f=0,v=0,w=D(Ga(u/a));f<u;)w[v++]=gr(n,f,f+=a);return w}function __(n){for(var a=-1,c=n==null?0:n.length,u=0,f=[];++a<c;){var v=n[a];v&&(f[u++]=v)}return f}function w_(){var n=arguments.length;if(!n)return[];for(var a=D(n-1),c=arguments[0],u=n;u--;)a[u-1]=arguments[u];return _n(pe(c)?zt(c):[c],wt(a,1))}var S_=ye(function(n,a){return at(n)?xs(n,wt(a,1,at,!0)):[]}),x_=ye(function(n,a){var c=vr(a);return at(c)&&(c=r),at(n)?xs(n,wt(a,1,at,!0),se(c,2)):[]}),P_=ye(function(n,a){var c=vr(a);return at(c)&&(c=r),at(n)?xs(n,wt(a,1,at,!0),r,c):[]});function C_(n,a,c){var u=n==null?0:n.length;return u?(a=c||a===r?1:fe(a),gr(n,a<0?0:a,u)):[]}function A_(n,a,c){var u=n==null?0:n.length;return u?(a=c||a===r?1:fe(a),a=u-a,gr(n,0,a<0?0:a)):[]}function E_(n,a){return n&&n.length?Xa(n,se(a,3),!0,!0):[]}function T_(n,a){return n&&n.length?Xa(n,se(a,3),!0):[]}function O_(n,a,c,u){var f=n==null?0:n.length;return f?(c&&typeof c!="number"&&Mt(n,a,c)&&(c=0,u=f),wy(n,a,c,u)):[]}function Yp(n,a,c){var u=n==null?0:n.length;if(!u)return-1;var f=c==null?0:fe(c);return f<0&&(f=ft(u+f,0)),Ia(n,se(a,3),f)}function Jp(n,a,c){var u=n==null?0:n.length;if(!u)return-1;var f=u-1;return c!==r&&(f=fe(c),f=c<0?ft(u+f,0):Tt(f,u-1)),Ia(n,se(a,3),f,!0)}function Zp(n){var a=n==null?0:n.length;return a?wt(n,1):[]}function $_(n){var a=n==null?0:n.length;return a?wt(n,Je):[]}function D_(n,a){var c=n==null?0:n.length;return c?(a=a===r?1:fe(a),wt(n,a)):[]}function I_(n){for(var a=-1,c=n==null?0:n.length,u={};++a<c;){var f=n[a];u[f[0]]=f[1]}return u}function Qp(n){return n&&n.length?n[0]:r}function R_(n,a,c){var u=n==null?0:n.length;if(!u)return-1;var f=c==null?0:fe(c);return f<0&&(f=ft(u+f,0)),Ai(n,a,f)}function k_(n){var a=n==null?0:n.length;return a?gr(n,0,-1):[]}var N_=ye(function(n){var a=Ke(n,Ac);return a.length&&a[0]===n[0]?gc(a):[]}),L_=ye(function(n){var a=vr(n),c=Ke(n,Ac);return a===vr(c)?a=r:c.pop(),c.length&&c[0]===n[0]?gc(c,se(a,2)):[]}),M_=ye(function(n){var a=vr(n),c=Ke(n,Ac);return a=typeof a=="function"?a:r,a&&c.pop(),c.length&&c[0]===n[0]?gc(c,r,a):[]});function F_(n,a){return n==null?"":kb.call(n,a)}function vr(n){var a=n==null?0:n.length;return a?n[a-1]:r}function U_(n,a,c){var u=n==null?0:n.length;if(!u)return-1;var f=u;return c!==r&&(f=fe(c),f=f<0?ft(u+f,0):Tt(f,u-1)),a===a?bb(n,a,f):Ia(n,Id,f,!0)}function z_(n,a){return n&&n.length?cp(n,fe(a)):r}var B_=ye(Xp);function Xp(n,a){return n&&n.length&&a&&a.length?_c(n,a):n}function H_(n,a,c){return n&&n.length&&a&&a.length?_c(n,a,se(c,2)):n}function G_(n,a,c){return n&&n.length&&a&&a.length?_c(n,a,r,c):n}var V_=tn(function(n,a){var c=n==null?0:n.length,u=dc(n,a);return dp(n,Ke(a,function(f){return rn(f,c)?+f:f}).sort(Sp)),u});function j_(n,a){var c=[];if(!(n&&n.length))return c;var u=-1,f=[],v=n.length;for(a=se(a,3);++u<v;){var w=n[u];a(w,u,n)&&(c.push(w),f.push(u))}return dp(n,f),c}function zc(n){return n==null?n:Fb.call(n)}function q_(n,a,c){var u=n==null?0:n.length;return u?(c&&typeof c!="number"&&Mt(n,a,c)?(a=0,c=u):(a=a==null?0:fe(a),c=c===r?u:fe(c)),gr(n,a,c)):[]}function W_(n,a){return Qa(n,a)}function K_(n,a,c){return xc(n,a,se(c,2))}function Y_(n,a){var c=n==null?0:n.length;if(c){var u=Qa(n,a);if(u<c&&$r(n[u],a))return u}return-1}function J_(n,a){return Qa(n,a,!0)}function Z_(n,a,c){return xc(n,a,se(c,2),!0)}function Q_(n,a){var c=n==null?0:n.length;if(c){var u=Qa(n,a,!0)-1;if($r(n[u],a))return u}return-1}function X_(n){return n&&n.length?fp(n):[]}function ew(n,a){return n&&n.length?fp(n,se(a,2)):[]}function tw(n){var a=n==null?0:n.length;return a?gr(n,1,a):[]}function rw(n,a,c){return n&&n.length?(a=c||a===r?1:fe(a),gr(n,0,a<0?0:a)):[]}function nw(n,a,c){var u=n==null?0:n.length;return u?(a=c||a===r?1:fe(a),a=u-a,gr(n,a<0?0:a,u)):[]}function iw(n,a){return n&&n.length?Xa(n,se(a,3),!1,!0):[]}function sw(n,a){return n&&n.length?Xa(n,se(a,3)):[]}var aw=ye(function(n){return Pn(wt(n,1,at,!0))}),ow=ye(function(n){var a=vr(n);return at(a)&&(a=r),Pn(wt(n,1,at,!0),se(a,2))}),lw=ye(function(n){var a=vr(n);return a=typeof a=="function"?a:r,Pn(wt(n,1,at,!0),r,a)});function cw(n){return n&&n.length?Pn(n):[]}function uw(n,a){return n&&n.length?Pn(n,se(a,2)):[]}function hw(n,a){return a=typeof a=="function"?a:r,n&&n.length?Pn(n,r,a):[]}function Bc(n){if(!(n&&n.length))return[];var a=0;return n=yn(n,function(c){if(at(c))return a=ft(c.length,a),!0}),ic(a,function(c){return Ke(n,tc(c))})}function ef(n,a){if(!(n&&n.length))return[];var c=Bc(n);return a==null?c:Ke(c,function(u){return Jt(a,r,u)})}var dw=ye(function(n,a){return at(n)?xs(n,a):[]}),pw=ye(function(n){return Cc(yn(n,at))}),fw=ye(function(n){var a=vr(n);return at(a)&&(a=r),Cc(yn(n,at),se(a,2))}),mw=ye(function(n){var a=vr(n);return a=typeof a=="function"?a:r,Cc(yn(n,at),r,a)}),gw=ye(Bc);function vw(n,a){return bp(n||[],a||[],Ss)}function bw(n,a){return bp(n||[],a||[],As)}var yw=ye(function(n){var a=n.length,c=a>1?n[a-1]:r;return c=typeof c=="function"?(n.pop(),c):r,ef(n,c)});function tf(n){var a=m(n);return a.__chain__=!0,a}function _w(n,a){return a(n),n}function lo(n,a){return a(n)}var ww=tn(function(n){var a=n.length,c=a?n[0]:0,u=this.__wrapped__,f=function(v){return dc(v,n)};return a>1||this.__actions__.length||!(u instanceof Se)||!rn(c)?this.thru(f):(u=u.slice(c,+c+(a?1:0)),u.__actions__.push({func:lo,args:[f],thisArg:r}),new fr(u,this.__chain__).thru(function(v){return a&&!v.length&&v.push(r),v}))});function Sw(){return tf(this)}function xw(){return new fr(this.value(),this.__chain__)}function Pw(){this.__values__===r&&(this.__values__=gf(this.value()));var n=this.__index__>=this.__values__.length,a=n?r:this.__values__[this.__index__++];return{done:n,value:a}}function Cw(){return this}function Aw(n){for(var a,c=this;c instanceof Wa;){var u=Kp(c);u.__index__=0,u.__values__=r,a?f.__wrapped__=u:a=u;var f=u;c=c.__wrapped__}return f.__wrapped__=n,a}function Ew(){var n=this.__wrapped__;if(n instanceof Se){var a=n;return this.__actions__.length&&(a=new Se(this)),a=a.reverse(),a.__actions__.push({func:lo,args:[zc],thisArg:r}),new fr(a,this.__chain__)}return this.thru(zc)}function Tw(){return vp(this.__wrapped__,this.__actions__)}var Ow=eo(function(n,a,c){$e.call(n,c)?++n[c]:Xr(n,c,1)});function $w(n,a,c){var u=pe(n)?$d:_y;return c&&Mt(n,a,c)&&(a=r),u(n,se(a,3))}function Dw(n,a){var c=pe(n)?yn:ep;return c(n,se(a,3))}var Iw=Tp(Yp),Rw=Tp(Jp);function kw(n,a){return wt(co(n,a),1)}function Nw(n,a){return wt(co(n,a),Je)}function Lw(n,a,c){return c=c===r?1:fe(c),wt(co(n,a),c)}function rf(n,a){var c=pe(n)?dr:xn;return c(n,se(a,3))}function nf(n,a){var c=pe(n)?tb:Xd;return c(n,se(a,3))}var Mw=eo(function(n,a,c){$e.call(n,c)?n[c].push(a):Xr(n,c,[a])});function Fw(n,a,c,u){n=Bt(n)?n:Fi(n),c=c&&!u?fe(c):0;var f=n.length;return c<0&&(c=ft(f+c,0)),mo(n)?c<=f&&n.indexOf(a,c)>-1:!!f&&Ai(n,a,c)>-1}var Uw=ye(function(n,a,c){var u=-1,f=typeof a=="function",v=Bt(n)?D(n.length):[];return xn(n,function(w){v[++u]=f?Jt(a,w,c):Ps(w,a,c)}),v}),zw=eo(function(n,a,c){Xr(n,c,a)});function co(n,a){var c=pe(n)?Ke:ap;return c(n,se(a,3))}function Bw(n,a,c,u){return n==null?[]:(pe(a)||(a=a==null?[]:[a]),c=u?r:c,pe(c)||(c=c==null?[]:[c]),up(n,a,c))}var Hw=eo(function(n,a,c){n[c?0:1].push(a)},function(){return[[],[]]});function Gw(n,a,c){var u=pe(n)?Xl:kd,f=arguments.length<3;return u(n,se(a,4),c,f,xn)}function Vw(n,a,c){var u=pe(n)?rb:kd,f=arguments.length<3;return u(n,se(a,4),c,f,Xd)}function jw(n,a){var c=pe(n)?yn:ep;return c(n,po(se(a,3)))}function qw(n){var a=pe(n)?Yd:Fy;return a(n)}function Ww(n,a,c){(c?Mt(n,a,c):a===r)?a=1:a=fe(a);var u=pe(n)?my:Uy;return u(n,a)}function Kw(n){var a=pe(n)?gy:By;return a(n)}function Yw(n){if(n==null)return 0;if(Bt(n))return mo(n)?Ti(n):n.length;var a=Ot(n);return a==Kt||a==Nt?n.size:bc(n).length}function Jw(n,a,c){var u=pe(n)?ec:Hy;return c&&Mt(n,a,c)&&(a=r),u(n,se(a,3))}var Zw=ye(function(n,a){if(n==null)return[];var c=a.length;return c>1&&Mt(n,a[0],a[1])?a=[]:c>2&&Mt(a[0],a[1],a[2])&&(a=[a[0]]),up(n,wt(a,1),[])}),uo=Db||function(){return _t.Date.now()};function Qw(n,a){if(typeof a!="function")throw new pr(l);return n=fe(n),function(){if(--n<1)return a.apply(this,arguments)}}function sf(n,a,c){return a=c?r:a,a=n&&a==null?n.length:a,en(n,te,r,r,r,r,a)}function af(n,a){var c;if(typeof a!="function")throw new pr(l);return n=fe(n),function(){return--n>0&&(c=a.apply(this,arguments)),n<=1&&(a=r),c}}var Hc=ye(function(n,a,c){var u=I;if(c.length){var f=wn(c,Li(Hc));u|=j}return en(n,u,a,c,f)}),of=ye(function(n,a,c){var u=I|U;if(c.length){var f=wn(c,Li(of));u|=j}return en(a,u,n,c,f)});function lf(n,a,c){a=c?r:a;var u=en(n,z,r,r,r,r,r,a);return u.placeholder=lf.placeholder,u}function cf(n,a,c){a=c?r:a;var u=en(n,V,r,r,r,r,r,a);return u.placeholder=cf.placeholder,u}function uf(n,a,c){var u,f,v,w,S,E,L=0,M=!1,F=!1,q=!0;if(typeof n!="function")throw new pr(l);a=br(a)||0,Xe(c)&&(M=!!c.leading,F="maxWait"in c,v=F?ft(br(c.maxWait)||0,a):v,q="trailing"in c?!!c.trailing:q);function re(ot){var Dr=u,an=f;return u=f=r,L=ot,w=n.apply(an,Dr),w}function oe(ot){return L=ot,S=Os(we,a),M?re(ot):w}function me(ot){var Dr=ot-E,an=ot-L,Of=a-Dr;return F?Tt(Of,v-an):Of}function le(ot){var Dr=ot-E,an=ot-L;return E===r||Dr>=a||Dr<0||F&&an>=v}function we(){var ot=uo();if(le(ot))return xe(ot);S=Os(we,me(ot))}function xe(ot){return S=r,q&&u?re(ot):(u=f=r,w)}function er(){S!==r&&yp(S),L=0,u=E=f=S=r}function Ft(){return S===r?w:xe(uo())}function tr(){var ot=uo(),Dr=le(ot);if(u=arguments,f=this,E=ot,Dr){if(S===r)return oe(E);if(F)return yp(S),S=Os(we,a),re(E)}return S===r&&(S=Os(we,a)),w}return tr.cancel=er,tr.flush=Ft,tr}var Xw=ye(function(n,a){return Qd(n,1,a)}),e0=ye(function(n,a,c){return Qd(n,br(a)||0,c)});function t0(n){return en(n,He)}function ho(n,a){if(typeof n!="function"||a!=null&&typeof a!="function")throw new pr(l);var c=function(){var u=arguments,f=a?a.apply(this,u):u[0],v=c.cache;if(v.has(f))return v.get(f);var w=n.apply(this,u);return c.cache=v.set(f,w)||v,w};return c.cache=new(ho.Cache||Qr),c}ho.Cache=Qr;function po(n){if(typeof n!="function")throw new pr(l);return function(){var a=arguments;switch(a.length){case 0:return!n.call(this);case 1:return!n.call(this,a[0]);case 2:return!n.call(this,a[0],a[1]);case 3:return!n.call(this,a[0],a[1],a[2])}return!n.apply(this,a)}}function r0(n){return af(2,n)}var n0=Gy(function(n,a){a=a.length==1&&pe(a[0])?Ke(a[0],Zt(se())):Ke(wt(a,1),Zt(se()));var c=a.length;return ye(function(u){for(var f=-1,v=Tt(u.length,c);++f<v;)u[f]=a[f].call(this,u[f]);return Jt(n,this,u)})}),Gc=ye(function(n,a){var c=wn(a,Li(Gc));return en(n,j,r,a,c)}),hf=ye(function(n,a){var c=wn(a,Li(hf));return en(n,ie,r,a,c)}),i0=tn(function(n,a){return en(n,Ae,r,r,r,a)});function s0(n,a){if(typeof n!="function")throw new pr(l);return a=a===r?a:fe(a),ye(n,a)}function a0(n,a){if(typeof n!="function")throw new pr(l);return a=a==null?0:ft(fe(a),0),ye(function(c){var u=c[a],f=An(c,0,a);return u&&_n(f,u),Jt(n,this,f)})}function o0(n,a,c){var u=!0,f=!0;if(typeof n!="function")throw new pr(l);return Xe(c)&&(u="leading"in c?!!c.leading:u,f="trailing"in c?!!c.trailing:f),uf(n,a,{leading:u,maxWait:a,trailing:f})}function l0(n){return sf(n,1)}function c0(n,a){return Gc(Ec(a),n)}function u0(){if(!arguments.length)return[];var n=arguments[0];return pe(n)?n:[n]}function h0(n){return mr(n,x)}function d0(n,a){return a=typeof a=="function"?a:r,mr(n,x,a)}function p0(n){return mr(n,b|x)}function f0(n,a){return a=typeof a=="function"?a:r,mr(n,b|x,a)}function m0(n,a){return a==null||Zd(n,a,bt(a))}function $r(n,a){return n===a||n!==n&&a!==a}var g0=io(mc),v0=io(function(n,a){return n>=a}),ti=np(function(){return arguments}())?np:function(n){return it(n)&&$e.call(n,"callee")&&!Gd.call(n,"callee")},pe=D.isArray,b0=Pd?Zt(Pd):Ay;function Bt(n){return n!=null&&fo(n.length)&&!nn(n)}function at(n){return it(n)&&Bt(n)}function y0(n){return n===!0||n===!1||it(n)&&Lt(n)==gn}var En=Rb||eu,_0=Cd?Zt(Cd):Ey;function w0(n){return it(n)&&n.nodeType===1&&!$s(n)}function S0(n){if(n==null)return!0;if(Bt(n)&&(pe(n)||typeof n=="string"||typeof n.splice=="function"||En(n)||Mi(n)||ti(n)))return!n.length;var a=Ot(n);if(a==Kt||a==Nt)return!n.size;if(Ts(n))return!bc(n).length;for(var c in n)if($e.call(n,c))return!1;return!0}function x0(n,a){return Cs(n,a)}function P0(n,a,c){c=typeof c=="function"?c:r;var u=c?c(n,a):r;return u===r?Cs(n,a,r,c):!!u}function Vc(n){if(!it(n))return!1;var a=Lt(n);return a==Bn||a==cr||typeof n.message=="string"&&typeof n.name=="string"&&!$s(n)}function C0(n){return typeof n=="number"&&jd(n)}function nn(n){if(!Xe(n))return!1;var a=Lt(n);return a==Yr||a==ds||a==Ul||a==Ea}function df(n){return typeof n=="number"&&n==fe(n)}function fo(n){return typeof n=="number"&&n>-1&&n%1==0&&n<=Re}function Xe(n){var a=typeof n;return n!=null&&(a=="object"||a=="function")}function it(n){return n!=null&&typeof n=="object"}var pf=Ad?Zt(Ad):Oy;function A0(n,a){return n===a||vc(n,a,kc(a))}function E0(n,a,c){return c=typeof c=="function"?c:r,vc(n,a,kc(a),c)}function T0(n){return ff(n)&&n!=+n}function O0(n){if(d_(n))throw new de(o);return ip(n)}function $0(n){return n===null}function D0(n){return n==null}function ff(n){return typeof n=="number"||it(n)&&Lt(n)==Jr}function $s(n){if(!it(n)||Lt(n)!=ur)return!1;var a=za(n);if(a===null)return!0;var c=$e.call(a,"constructor")&&a.constructor;return typeof c=="function"&&c instanceof c&&La.call(c)==Eb}var jc=Ed?Zt(Ed):$y;function I0(n){return df(n)&&n>=-Re&&n<=Re}var mf=Td?Zt(Td):Dy;function mo(n){return typeof n=="string"||!pe(n)&&it(n)&&Lt(n)==Hn}function Xt(n){return typeof n=="symbol"||it(n)&&Lt(n)==Pi}var Mi=Od?Zt(Od):Iy;function R0(n){return n===r}function k0(n){return it(n)&&Ot(n)==Gn}function N0(n){return it(n)&&Lt(n)==Vn}var L0=io(yc),M0=io(function(n,a){return n<=a});function gf(n){if(!n)return[];if(Bt(n))return mo(n)?Tr(n):zt(n);if(vs&&n[vs])return mb(n[vs]());var a=Ot(n),c=a==Kt?ac:a==Nt?Ra:Fi;return c(n)}function sn(n){if(!n)return n===0?n:0;if(n=br(n),n===Je||n===-Je){var a=n<0?-1:1;return a*lr}return n===n?n:0}function fe(n){var a=sn(n),c=a%1;return a===a?c?a-c:a:0}function vf(n){return n?Zn(fe(n),0,Et):0}function br(n){if(typeof n=="number")return n;if(Xt(n))return Wt;if(Xe(n)){var a=typeof n.valueOf=="function"?n.valueOf():n;n=Xe(a)?a+"":a}if(typeof n!="string")return n===0?n:+n;n=Nd(n);var c=bv.test(n);return c||_v.test(n)?Qv(n.slice(2),c?2:8):vv.test(n)?Wt:+n}function bf(n){return Ur(n,Ht(n))}function F0(n){return n?Zn(fe(n),-Re,Re):n===0?n:0}function Oe(n){return n==null?"":Qt(n)}var U0=ki(function(n,a){if(Ts(a)||Bt(a)){Ur(a,bt(a),n);return}for(var c in a)$e.call(a,c)&&Ss(n,c,a[c])}),yf=ki(function(n,a){Ur(a,Ht(a),n)}),go=ki(function(n,a,c,u){Ur(a,Ht(a),n,u)}),z0=ki(function(n,a,c,u){Ur(a,bt(a),n,u)}),B0=tn(dc);function H0(n,a){var c=Ri(n);return a==null?c:Jd(c,a)}var G0=ye(function(n,a){n=Ne(n);var c=-1,u=a.length,f=u>2?a[2]:r;for(f&&Mt(a[0],a[1],f)&&(u=1);++c<u;)for(var v=a[c],w=Ht(v),S=-1,E=w.length;++S<E;){var L=w[S],M=n[L];(M===r||$r(M,$i[L])&&!$e.call(n,L))&&(n[L]=v[L])}return n}),V0=ye(function(n){return n.push(r,Np),Jt(_f,r,n)});function j0(n,a){return Dd(n,se(a,3),Fr)}function q0(n,a){return Dd(n,se(a,3),fc)}function W0(n,a){return n==null?n:pc(n,se(a,3),Ht)}function K0(n,a){return n==null?n:tp(n,se(a,3),Ht)}function Y0(n,a){return n&&Fr(n,se(a,3))}function J0(n,a){return n&&fc(n,se(a,3))}function Z0(n){return n==null?[]:Ja(n,bt(n))}function Q0(n){return n==null?[]:Ja(n,Ht(n))}function qc(n,a,c){var u=n==null?r:Qn(n,a);return u===r?c:u}function X0(n,a){return n!=null&&Fp(n,a,Sy)}function Wc(n,a){return n!=null&&Fp(n,a,xy)}var eS=$p(function(n,a,c){a!=null&&typeof a.toString!="function"&&(a=Ma.call(a)),n[a]=c},Yc(Gt)),tS=$p(function(n,a,c){a!=null&&typeof a.toString!="function"&&(a=Ma.call(a)),$e.call(n,a)?n[a].push(c):n[a]=[c]},se),rS=ye(Ps);function bt(n){return Bt(n)?Kd(n):bc(n)}function Ht(n){return Bt(n)?Kd(n,!0):Ry(n)}function nS(n,a){var c={};return a=se(a,3),Fr(n,function(u,f,v){Xr(c,a(u,f,v),u)}),c}function iS(n,a){var c={};return a=se(a,3),Fr(n,function(u,f,v){Xr(c,f,a(u,f,v))}),c}var sS=ki(function(n,a,c){Za(n,a,c)}),_f=ki(function(n,a,c,u){Za(n,a,c,u)}),aS=tn(function(n,a){var c={};if(n==null)return c;var u=!1;a=Ke(a,function(v){return v=Cn(v,n),u||(u=v.length>1),v}),Ur(n,Ic(n),c),u&&(c=mr(c,b|y|x,e_));for(var f=a.length;f--;)Pc(c,a[f]);return c});function oS(n,a){return wf(n,po(se(a)))}var lS=tn(function(n,a){return n==null?{}:Ny(n,a)});function wf(n,a){if(n==null)return{};var c=Ke(Ic(n),function(u){return[u]});return a=se(a),hp(n,c,function(u,f){return a(u,f[0])})}function cS(n,a,c){a=Cn(a,n);var u=-1,f=a.length;for(f||(f=1,n=r);++u<f;){var v=n==null?r:n[zr(a[u])];v===r&&(u=f,v=c),n=nn(v)?v.call(n):v}return n}function uS(n,a,c){return n==null?n:As(n,a,c)}function hS(n,a,c,u){return u=typeof u=="function"?u:r,n==null?n:As(n,a,c,u)}var Sf=Rp(bt),xf=Rp(Ht);function dS(n,a,c){var u=pe(n),f=u||En(n)||Mi(n);if(a=se(a,4),c==null){var v=n&&n.constructor;f?c=u?new v:[]:Xe(n)?c=nn(v)?Ri(za(n)):{}:c={}}return(f?dr:Fr)(n,function(w,S,E){return a(c,w,S,E)}),c}function pS(n,a){return n==null?!0:Pc(n,a)}function fS(n,a,c){return n==null?n:gp(n,a,Ec(c))}function mS(n,a,c,u){return u=typeof u=="function"?u:r,n==null?n:gp(n,a,Ec(c),u)}function Fi(n){return n==null?[]:sc(n,bt(n))}function gS(n){return n==null?[]:sc(n,Ht(n))}function vS(n,a,c){return c===r&&(c=a,a=r),c!==r&&(c=br(c),c=c===c?c:0),a!==r&&(a=br(a),a=a===a?a:0),Zn(br(n),a,c)}function bS(n,a,c){return a=sn(a),c===r?(c=a,a=0):c=sn(c),n=br(n),Py(n,a,c)}function yS(n,a,c){if(c&&typeof c!="boolean"&&Mt(n,a,c)&&(a=c=r),c===r&&(typeof a=="boolean"?(c=a,a=r):typeof n=="boolean"&&(c=n,n=r)),n===r&&a===r?(n=0,a=1):(n=sn(n),a===r?(a=n,n=0):a=sn(a)),n>a){var u=n;n=a,a=u}if(c||n%1||a%1){var f=qd();return Tt(n+f*(a-n+Zv("1e-"+((f+"").length-1))),a)}return wc(n,a)}var _S=Ni(function(n,a,c){return a=a.toLowerCase(),n+(c?Pf(a):a)});function Pf(n){return Kc(Oe(n).toLowerCase())}function Cf(n){return n=Oe(n),n&&n.replace(Sv,ub).replace(Bv,"")}function wS(n,a,c){n=Oe(n),a=Qt(a);var u=n.length;c=c===r?u:Zn(fe(c),0,u);var f=c;return c-=a.length,c>=0&&n.slice(c,f)==a}function SS(n){return n=Oe(n),n&&ke.test(n)?n.replace(Q,hb):n}function xS(n){return n=Oe(n),n&&lv.test(n)?n.replace(Gl,"\\$&"):n}var PS=Ni(function(n,a,c){return n+(c?"-":"")+a.toLowerCase()}),CS=Ni(function(n,a,c){return n+(c?" ":"")+a.toLowerCase()}),AS=Ep("toLowerCase");function ES(n,a,c){n=Oe(n),a=fe(a);var u=a?Ti(n):0;if(!a||u>=a)return n;var f=(a-u)/2;return no(Va(f),c)+n+no(Ga(f),c)}function TS(n,a,c){n=Oe(n),a=fe(a);var u=a?Ti(n):0;return a&&u<a?n+no(a-u,c):n}function OS(n,a,c){n=Oe(n),a=fe(a);var u=a?Ti(n):0;return a&&u<a?no(a-u,c)+n:n}function $S(n,a,c){return c||a==null?a=0:a&&(a=+a),Mb(Oe(n).replace(Vl,""),a||0)}function DS(n,a,c){return(c?Mt(n,a,c):a===r)?a=1:a=fe(a),Sc(Oe(n),a)}function IS(){var n=arguments,a=Oe(n[0]);return n.length<3?a:a.replace(n[1],n[2])}var RS=Ni(function(n,a,c){return n+(c?"_":"")+a.toLowerCase()});function kS(n,a,c){return c&&typeof c!="number"&&Mt(n,a,c)&&(a=c=r),c=c===r?Et:c>>>0,c?(n=Oe(n),n&&(typeof a=="string"||a!=null&&!jc(a))&&(a=Qt(a),!a&&Ei(n))?An(Tr(n),0,c):n.split(a,c)):[]}var NS=Ni(function(n,a,c){return n+(c?" ":"")+Kc(a)});function LS(n,a,c){return n=Oe(n),c=c==null?0:Zn(fe(c),0,n.length),a=Qt(a),n.slice(c,c+a.length)==a}function MS(n,a,c){var u=m.templateSettings;c&&Mt(n,a,c)&&(a=r),n=Oe(n),a=go({},a,u,kp);var f=go({},a.imports,u.imports,kp),v=bt(f),w=sc(f,v),S,E,L=0,M=a.interpolate||Ta,F="__p += '",q=oc((a.escape||Ta).source+"|"+M.source+"|"+(M===ms?gv:Ta).source+"|"+(a.evaluate||Ta).source+"|$","g"),re="//# sourceURL="+($e.call(a,"sourceURL")?(a.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++qv+"]")+`
`;n.replace(q,function(le,we,xe,er,Ft,tr){return xe||(xe=er),F+=n.slice(L,tr).replace(xv,db),we&&(S=!0,F+=`' +
__e(`+we+`) +
'`),Ft&&(E=!0,F+=`';
`+Ft+`;
__p += '`),xe&&(F+=`' +
((__t = (`+xe+`)) == null ? '' : __t) +
'`),L=tr+le.length,le}),F+=`';
`;var oe=$e.call(a,"variable")&&a.variable;if(!oe)F=`with (obj) {
`+F+`
}
`;else if(fv.test(oe))throw new de(d);F=(E?F.replace(be,""):F).replace(W,"$1").replace(Y,"$1;"),F="function("+(oe||"obj")+`) {
`+(oe?"":`obj || (obj = {});
`)+"var __t, __p = ''"+(S?", __e = _.escape":"")+(E?`, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`:`;
`)+F+`return __p
}`;var me=Ef(function(){return Te(v,re+"return "+F).apply(r,w)});if(me.source=F,Vc(me))throw me;return me}function FS(n){return Oe(n).toLowerCase()}function US(n){return Oe(n).toUpperCase()}function zS(n,a,c){if(n=Oe(n),n&&(c||a===r))return Nd(n);if(!n||!(a=Qt(a)))return n;var u=Tr(n),f=Tr(a),v=Ld(u,f),w=Md(u,f)+1;return An(u,v,w).join("")}function BS(n,a,c){if(n=Oe(n),n&&(c||a===r))return n.slice(0,Ud(n)+1);if(!n||!(a=Qt(a)))return n;var u=Tr(n),f=Md(u,Tr(a))+1;return An(u,0,f).join("")}function HS(n,a,c){if(n=Oe(n),n&&(c||a===r))return n.replace(Vl,"");if(!n||!(a=Qt(a)))return n;var u=Tr(n),f=Ld(u,Tr(a));return An(u,f).join("")}function GS(n,a){var c=Rt,u=dt;if(Xe(a)){var f="separator"in a?a.separator:f;c="length"in a?fe(a.length):c,u="omission"in a?Qt(a.omission):u}n=Oe(n);var v=n.length;if(Ei(n)){var w=Tr(n);v=w.length}if(c>=v)return n;var S=c-Ti(u);if(S<1)return u;var E=w?An(w,0,S).join(""):n.slice(0,S);if(f===r)return E+u;if(w&&(S+=E.length-S),jc(f)){if(n.slice(S).search(f)){var L,M=E;for(f.global||(f=oc(f.source,Oe(nd.exec(f))+"g")),f.lastIndex=0;L=f.exec(M);)var F=L.index;E=E.slice(0,F===r?S:F)}}else if(n.indexOf(Qt(f),S)!=S){var q=E.lastIndexOf(f);q>-1&&(E=E.slice(0,q))}return E+u}function VS(n){return n=Oe(n),n&&_e.test(n)?n.replace(Z,yb):n}var jS=Ni(function(n,a,c){return n+(c?" ":"")+a.toUpperCase()}),Kc=Ep("toUpperCase");function Af(n,a,c){return n=Oe(n),a=c?r:a,a===r?fb(n)?Sb(n):sb(n):n.match(a)||[]}var Ef=ye(function(n,a){try{return Jt(n,r,a)}catch(c){return Vc(c)?c:new de(c)}}),qS=tn(function(n,a){return dr(a,function(c){c=zr(c),Xr(n,c,Hc(n[c],n))}),n});function WS(n){var a=n==null?0:n.length,c=se();return n=a?Ke(n,function(u){if(typeof u[1]!="function")throw new pr(l);return[c(u[0]),u[1]]}):[],ye(function(u){for(var f=-1;++f<a;){var v=n[f];if(Jt(v[0],this,u))return Jt(v[1],this,u)}})}function KS(n){return yy(mr(n,b))}function Yc(n){return function(){return n}}function YS(n,a){return n==null||n!==n?a:n}var JS=Op(),ZS=Op(!0);function Gt(n){return n}function Jc(n){return sp(typeof n=="function"?n:mr(n,b))}function QS(n){return op(mr(n,b))}function XS(n,a){return lp(n,mr(a,b))}var e1=ye(function(n,a){return function(c){return Ps(c,n,a)}}),t1=ye(function(n,a){return function(c){return Ps(n,c,a)}});function Zc(n,a,c){var u=bt(a),f=Ja(a,u);c==null&&!(Xe(a)&&(f.length||!u.length))&&(c=a,a=n,n=this,f=Ja(a,bt(a)));var v=!(Xe(c)&&"chain"in c)||!!c.chain,w=nn(n);return dr(f,function(S){var E=a[S];n[S]=E,w&&(n.prototype[S]=function(){var L=this.__chain__;if(v||L){var M=n(this.__wrapped__),F=M.__actions__=zt(this.__actions__);return F.push({func:E,args:arguments,thisArg:n}),M.__chain__=L,M}return E.apply(n,_n([this.value()],arguments))})}),n}function r1(){return _t._===this&&(_t._=Tb),this}function Qc(){}function n1(n){return n=fe(n),ye(function(a){return cp(a,n)})}var i1=Oc(Ke),s1=Oc($d),a1=Oc(ec);function Tf(n){return Lc(n)?tc(zr(n)):Ly(n)}function o1(n){return function(a){return n==null?r:Qn(n,a)}}var l1=Dp(),c1=Dp(!0);function Xc(){return[]}function eu(){return!1}function u1(){return{}}function h1(){return""}function d1(){return!0}function p1(n,a){if(n=fe(n),n<1||n>Re)return[];var c=Et,u=Tt(n,Et);a=se(a),n-=Et;for(var f=ic(u,a);++c<n;)a(c);return f}function f1(n){return pe(n)?Ke(n,zr):Xt(n)?[n]:zt(Wp(Oe(n)))}function m1(n){var a=++Ab;return Oe(n)+a}var g1=ro(function(n,a){return n+a},0),v1=$c("ceil"),b1=ro(function(n,a){return n/a},1),y1=$c("floor");function _1(n){return n&&n.length?Ya(n,Gt,mc):r}function w1(n,a){return n&&n.length?Ya(n,se(a,2),mc):r}function S1(n){return Rd(n,Gt)}function x1(n,a){return Rd(n,se(a,2))}function P1(n){return n&&n.length?Ya(n,Gt,yc):r}function C1(n,a){return n&&n.length?Ya(n,se(a,2),yc):r}var A1=ro(function(n,a){return n*a},1),E1=$c("round"),T1=ro(function(n,a){return n-a},0);function O1(n){return n&&n.length?nc(n,Gt):0}function $1(n,a){return n&&n.length?nc(n,se(a,2)):0}return m.after=Qw,m.ary=sf,m.assign=U0,m.assignIn=yf,m.assignInWith=go,m.assignWith=z0,m.at=B0,m.before=af,m.bind=Hc,m.bindAll=qS,m.bindKey=of,m.castArray=u0,m.chain=tf,m.chunk=y_,m.compact=__,m.concat=w_,m.cond=WS,m.conforms=KS,m.constant=Yc,m.countBy=Ow,m.create=H0,m.curry=lf,m.curryRight=cf,m.debounce=uf,m.defaults=G0,m.defaultsDeep=V0,m.defer=Xw,m.delay=e0,m.difference=S_,m.differenceBy=x_,m.differenceWith=P_,m.drop=C_,m.dropRight=A_,m.dropRightWhile=E_,m.dropWhile=T_,m.fill=O_,m.filter=Dw,m.flatMap=kw,m.flatMapDeep=Nw,m.flatMapDepth=Lw,m.flatten=Zp,m.flattenDeep=$_,m.flattenDepth=D_,m.flip=t0,m.flow=JS,m.flowRight=ZS,m.fromPairs=I_,m.functions=Z0,m.functionsIn=Q0,m.groupBy=Mw,m.initial=k_,m.intersection=N_,m.intersectionBy=L_,m.intersectionWith=M_,m.invert=eS,m.invertBy=tS,m.invokeMap=Uw,m.iteratee=Jc,m.keyBy=zw,m.keys=bt,m.keysIn=Ht,m.map=co,m.mapKeys=nS,m.mapValues=iS,m.matches=QS,m.matchesProperty=XS,m.memoize=ho,m.merge=sS,m.mergeWith=_f,m.method=e1,m.methodOf=t1,m.mixin=Zc,m.negate=po,m.nthArg=n1,m.omit=aS,m.omitBy=oS,m.once=r0,m.orderBy=Bw,m.over=i1,m.overArgs=n0,m.overEvery=s1,m.overSome=a1,m.partial=Gc,m.partialRight=hf,m.partition=Hw,m.pick=lS,m.pickBy=wf,m.property=Tf,m.propertyOf=o1,m.pull=B_,m.pullAll=Xp,m.pullAllBy=H_,m.pullAllWith=G_,m.pullAt=V_,m.range=l1,m.rangeRight=c1,m.rearg=i0,m.reject=jw,m.remove=j_,m.rest=s0,m.reverse=zc,m.sampleSize=Ww,m.set=uS,m.setWith=hS,m.shuffle=Kw,m.slice=q_,m.sortBy=Zw,m.sortedUniq=X_,m.sortedUniqBy=ew,m.split=kS,m.spread=a0,m.tail=tw,m.take=rw,m.takeRight=nw,m.takeRightWhile=iw,m.takeWhile=sw,m.tap=_w,m.throttle=o0,m.thru=lo,m.toArray=gf,m.toPairs=Sf,m.toPairsIn=xf,m.toPath=f1,m.toPlainObject=bf,m.transform=dS,m.unary=l0,m.union=aw,m.unionBy=ow,m.unionWith=lw,m.uniq=cw,m.uniqBy=uw,m.uniqWith=hw,m.unset=pS,m.unzip=Bc,m.unzipWith=ef,m.update=fS,m.updateWith=mS,m.values=Fi,m.valuesIn=gS,m.without=dw,m.words=Af,m.wrap=c0,m.xor=pw,m.xorBy=fw,m.xorWith=mw,m.zip=gw,m.zipObject=vw,m.zipObjectDeep=bw,m.zipWith=yw,m.entries=Sf,m.entriesIn=xf,m.extend=yf,m.extendWith=go,Zc(m,m),m.add=g1,m.attempt=Ef,m.camelCase=_S,m.capitalize=Pf,m.ceil=v1,m.clamp=vS,m.clone=h0,m.cloneDeep=p0,m.cloneDeepWith=f0,m.cloneWith=d0,m.conformsTo=m0,m.deburr=Cf,m.defaultTo=YS,m.divide=b1,m.endsWith=wS,m.eq=$r,m.escape=SS,m.escapeRegExp=xS,m.every=$w,m.find=Iw,m.findIndex=Yp,m.findKey=j0,m.findLast=Rw,m.findLastIndex=Jp,m.findLastKey=q0,m.floor=y1,m.forEach=rf,m.forEachRight=nf,m.forIn=W0,m.forInRight=K0,m.forOwn=Y0,m.forOwnRight=J0,m.get=qc,m.gt=g0,m.gte=v0,m.has=X0,m.hasIn=Wc,m.head=Qp,m.identity=Gt,m.includes=Fw,m.indexOf=R_,m.inRange=bS,m.invoke=rS,m.isArguments=ti,m.isArray=pe,m.isArrayBuffer=b0,m.isArrayLike=Bt,m.isArrayLikeObject=at,m.isBoolean=y0,m.isBuffer=En,m.isDate=_0,m.isElement=w0,m.isEmpty=S0,m.isEqual=x0,m.isEqualWith=P0,m.isError=Vc,m.isFinite=C0,m.isFunction=nn,m.isInteger=df,m.isLength=fo,m.isMap=pf,m.isMatch=A0,m.isMatchWith=E0,m.isNaN=T0,m.isNative=O0,m.isNil=D0,m.isNull=$0,m.isNumber=ff,m.isObject=Xe,m.isObjectLike=it,m.isPlainObject=$s,m.isRegExp=jc,m.isSafeInteger=I0,m.isSet=mf,m.isString=mo,m.isSymbol=Xt,m.isTypedArray=Mi,m.isUndefined=R0,m.isWeakMap=k0,m.isWeakSet=N0,m.join=F_,m.kebabCase=PS,m.last=vr,m.lastIndexOf=U_,m.lowerCase=CS,m.lowerFirst=AS,m.lt=L0,m.lte=M0,m.max=_1,m.maxBy=w1,m.mean=S1,m.meanBy=x1,m.min=P1,m.minBy=C1,m.stubArray=Xc,m.stubFalse=eu,m.stubObject=u1,m.stubString=h1,m.stubTrue=d1,m.multiply=A1,m.nth=z_,m.noConflict=r1,m.noop=Qc,m.now=uo,m.pad=ES,m.padEnd=TS,m.padStart=OS,m.parseInt=$S,m.random=yS,m.reduce=Gw,m.reduceRight=Vw,m.repeat=DS,m.replace=IS,m.result=cS,m.round=E1,m.runInContext=C,m.sample=qw,m.size=Yw,m.snakeCase=RS,m.some=Jw,m.sortedIndex=W_,m.sortedIndexBy=K_,m.sortedIndexOf=Y_,m.sortedLastIndex=J_,m.sortedLastIndexBy=Z_,m.sortedLastIndexOf=Q_,m.startCase=NS,m.startsWith=LS,m.subtract=T1,m.sum=O1,m.sumBy=$1,m.template=MS,m.times=p1,m.toFinite=sn,m.toInteger=fe,m.toLength=vf,m.toLower=FS,m.toNumber=br,m.toSafeInteger=F0,m.toString=Oe,m.toUpper=US,m.trim=zS,m.trimEnd=BS,m.trimStart=HS,m.truncate=GS,m.unescape=VS,m.uniqueId=m1,m.upperCase=jS,m.upperFirst=Kc,m.each=rf,m.eachRight=nf,m.first=Qp,Zc(m,function(){var n={};return Fr(m,function(a,c){$e.call(m.prototype,c)||(n[c]=a)}),n}(),{chain:!1}),m.VERSION=i,dr(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){m[n].placeholder=m}),dr(["drop","take"],function(n,a){Se.prototype[n]=function(c){c=c===r?1:ft(fe(c),0);var u=this.__filtered__&&!a?new Se(this):this.clone();return u.__filtered__?u.__takeCount__=Tt(c,u.__takeCount__):u.__views__.push({size:Tt(c,Et),type:n+(u.__dir__<0?"Right":"")}),u},Se.prototype[n+"Right"]=function(c){return this.reverse()[n](c).reverse()}}),dr(["filter","map","takeWhile"],function(n,a){var c=a+1,u=c==Ge||c==ut;Se.prototype[n]=function(f){var v=this.clone();return v.__iteratees__.push({iteratee:se(f,3),type:c}),v.__filtered__=v.__filtered__||u,v}}),dr(["head","last"],function(n,a){var c="take"+(a?"Right":"");Se.prototype[n]=function(){return this[c](1).value()[0]}}),dr(["initial","tail"],function(n,a){var c="drop"+(a?"":"Right");Se.prototype[n]=function(){return this.__filtered__?new Se(this):this[c](1)}}),Se.prototype.compact=function(){return this.filter(Gt)},Se.prototype.find=function(n){return this.filter(n).head()},Se.prototype.findLast=function(n){return this.reverse().find(n)},Se.prototype.invokeMap=ye(function(n,a){return typeof n=="function"?new Se(this):this.map(function(c){return Ps(c,n,a)})}),Se.prototype.reject=function(n){return this.filter(po(se(n)))},Se.prototype.slice=function(n,a){n=fe(n);var c=this;return c.__filtered__&&(n>0||a<0)?new Se(c):(n<0?c=c.takeRight(-n):n&&(c=c.drop(n)),a!==r&&(a=fe(a),c=a<0?c.dropRight(-a):c.take(a-n)),c)},Se.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Se.prototype.toArray=function(){return this.take(Et)},Fr(Se.prototype,function(n,a){var c=/^(?:filter|find|map|reject)|While$/.test(a),u=/^(?:head|last)$/.test(a),f=m[u?"take"+(a=="last"?"Right":""):a],v=u||/^find/.test(a);f&&(m.prototype[a]=function(){var w=this.__wrapped__,S=u?[1]:arguments,E=w instanceof Se,L=S[0],M=E||pe(w),F=function(we){var xe=f.apply(m,_n([we],S));return u&&q?xe[0]:xe};M&&c&&typeof L=="function"&&L.length!=1&&(E=M=!1);var q=this.__chain__,re=!!this.__actions__.length,oe=v&&!q,me=E&&!re;if(!v&&M){w=me?w:new Se(this);var le=n.apply(w,S);return le.__actions__.push({func:lo,args:[F],thisArg:r}),new fr(le,q)}return oe&&me?n.apply(this,S):(le=this.thru(F),oe?u?le.value()[0]:le.value():le)})}),dr(["pop","push","shift","sort","splice","unshift"],function(n){var a=ka[n],c=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",u=/^(?:pop|shift)$/.test(n);m.prototype[n]=function(){var f=arguments;if(u&&!this.__chain__){var v=this.value();return a.apply(pe(v)?v:[],f)}return this[c](function(w){return a.apply(pe(w)?w:[],f)})}}),Fr(Se.prototype,function(n,a){var c=m[a];if(c){var u=c.name+"";$e.call(Ii,u)||(Ii[u]=[]),Ii[u].push({name:a,func:c})}}),Ii[to(r,U).name]=[{name:"wrapper",func:r}],Se.prototype.clone=Vb,Se.prototype.reverse=jb,Se.prototype.value=qb,m.prototype.at=ww,m.prototype.chain=Sw,m.prototype.commit=xw,m.prototype.next=Pw,m.prototype.plant=Aw,m.prototype.reverse=Ew,m.prototype.toJSON=m.prototype.valueOf=m.prototype.value=Tw,m.prototype.first=m.prototype.head,vs&&(m.prototype[vs]=Cw),m},Oi=xb();Wn?((Wn.exports=Oi)._=Oi,Jl._=Oi):_t._=Oi}).call(ai)})(ul,ul.exports);var _D=ul.exports;const wD={districtsNum:5,mainframeHardware:{performanceLevel:1,coresLevel:1,ramLevel:1,performancePrice:{baseMultiplier:1e4,base:1.3},coresPrice:{baseMultiplier:6e4,base:1.3},ramPrice:{baseMultiplier:12e4,base:1.3}},mainframeSoftware:{performanceBoost:.1},developmentLevelRequirements:{baseMultiplier:3e4,base:1.5},pointsByProgramMultipliers:{program:2},discounts:{program:4e6},storyEvents:[{key:"tutorial_level_1",level:1,messages:["tutorial_level_1"]},{key:"tutorial_level_2",level:2,unlockFeatures:["mainframeHardware","mainframePrograms"],messages:["tutorial_level_2"]},{key:"tutorial_level_15",level:15,unlockFeatures:["cityOverview","companyManagement"],messages:["tutorial_level_15"]}]},SD={tutorial:wD};var xD=Object.defineProperty,PD=Object.getOwnPropertyDescriptor,CD=(t,e,r,i)=>{for(var s=i>1?void 0:i?PD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&xD(e,r,s),s};let yh=class{constructor(){this._scenario=Ue.startingScenario,this._currentValues=this.getScenarioValues(this._scenario)}get scenario(){return this._scenario}set scenario(t){this._scenario=t,this._currentValues=this.getScenarioValues(t)}get currentValues(){return this._currentValues}getScenarioValues(t){return _D.merge({},Ue.defaultScenarioSettings,SD[t])}async startNewState(){this.scenario=Ue.startingScenario}async deserialize(t){this.scenario=t.scenario}serialize(){return{scenario:this._scenario}}};yh=CD([It()],yh);const Pe={MONEY_CHANGED:Symbol("MONEY_CHANGED"),MONEY_INCREASED:Symbol("MONEY_INCREASED"),MONEY_SPENT:Symbol("MONEY_SPENT"),ACCUMULATED_TIME_CHANGED:Symbol("ACCUMULATED_TIME_CHANGED"),DEVELOPMENT_POINTS_CHANGED:Symbol("DEVELOPMENT_POINTS_CHANGED"),DEVELOPMENT_LEVEL_CHANGED:Symbol("DEVELOPMENT_LEVEL_CHANGED"),PROGRAM_COMPLETION_SPEED_CHANGED:Symbol("PROGRAM_COMPLETION_SPEED_CHANGED"),MONEY_GROWTH_CHANGED:Symbol("MONEY_GROWTH_CHANGED"),DEVELOPMENT_GROWTH_CHANGED:Symbol("DEVELOPMENT_GROWTH_CHANGED"),POINTS_BY_PROGRAM_CHANGED:Symbol("POINTS_BY_PROGRAM_CHANGED"),MAINFRAME_DISCOUNT_CHANGED:Symbol("MAINFRAME_DISCOUNT_CHANGED"),GROWTH_BY_PROGRAM_CHANGED:Symbol("GROWTH_BY_PROGRAM_CHANGED"),FEATURE_UNLOCKED:Symbol("FEATURE_UNLOCKED")};class AD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._scenarioState=e.scenarioState,this._money=0,this._income=new Map,this._expenses=new Map,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get money(){return this._stateUiConnector.connectEventHandler(this,Pe.MONEY_CHANGED),this._money}increase(e,r){this._money+=e;const i=this.getIncome(r);this._income.set(r,i+e),this.uiEventBatcher.enqueueEvent(Pe.MONEY_INCREASED),this.uiEventBatcher.enqueueEvent(Pe.MONEY_CHANGED)}purchase(e,r,i){if(this._money>=e){this._money-=e,i();const s=this.getExpenses(r);return this._expenses.set(r,s+e),this.uiEventBatcher.enqueueEvent(Pe.MONEY_SPENT),this.uiEventBatcher.enqueueEvent(Pe.MONEY_CHANGED),!0}return!1}getIncome(e){return this._stateUiConnector.connectEventHandler(this,Pe.MONEY_INCREASED),this._income.get(e)??0}getExpenses(e){return this._stateUiConnector.connectEventHandler(this,Pe.MONEY_SPENT),this._expenses.get(e)??0}async startNewState(){this._money=this._scenarioState.currentValues.money,this._income.clear(),this._expenses.clear()}async deserialize(e){this._money=e.money,this._income.clear(),Object.entries(e.income).forEach(([r,i])=>{this._income.set(r,i)}),this._expenses.clear(),Object.entries(e.expenses).forEach(([r,i])=>{this._expenses.set(r,i)})}serialize(){return{money:this._money,income:Object.fromEntries(this._income.entries()),expenses:Object.fromEntries(this._expenses.entries())}}}class ED{constructor(e){this._stateUiConnector=e.stateUiConnector,this._settingsState=e.settingsState,this._scenarioState=e.scenarioState,this._lastUpdateTime=0,this._accumulatedTime=0,this._gameTime=0,this._gameTimeTotal=0,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get lastUpdateTime(){return this._lastUpdateTime}get accumulatedTime(){return this._stateUiConnector.connectEventHandler(this,Pe.ACCUMULATED_TIME_CHANGED),this._accumulatedTime}get gameTime(){return this._stateUiConnector.connectEventHandler(this,Pe.ACCUMULATED_TIME_CHANGED),this._gameTime}get gameTimeTotal(){return this._stateUiConnector.connectEventHandler(this,Pe.ACCUMULATED_TIME_CHANGED),this._gameTimeTotal}updateLastUpdateTime(){const e=Date.now();this._accumulatedTime+=e-this.lastUpdateTime,this._lastUpdateTime=e}tryNextTick(){return this._accumulatedTime>=this._settingsState.updateInterval?(this._accumulatedTime-=this._settingsState.updateInterval,this._gameTime+=this._settingsState.updateInterval,this._gameTimeTotal+=this._settingsState.updateInterval,this.uiEventBatcher.enqueueEvent(Pe.ACCUMULATED_TIME_CHANGED),!0):!1}async startNewState(){this._lastUpdateTime=Date.now(),this._accumulatedTime=this._scenarioState.currentValues.accumulatedTime,this._gameTime=0,this._gameTimeTotal=0}async deserialize(e){this._lastUpdateTime=e.lastUpdateTime,this._accumulatedTime=e.accumulatedTime,this._gameTime=e.gameTime,this._gameTimeTotal=e.gameTimeTotal,this.updateLastUpdateTime()}serialize(){return{lastUpdateTime:this._lastUpdateTime,accumulatedTime:this._accumulatedTime,gameTime:this._gameTime,gameTimeTotal:this._gameTimeTotal}}}class TD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._scenarioState=e.scenarioState,this._messageLogState=e.messageLogState,this._globalState=e.globalState,this._points=0,this._level=1,this._levelUpdateRequested=!1,this._income=new Map,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get points(){return this._stateUiConnector.connectEventHandler(this,Pe.DEVELOPMENT_POINTS_CHANGED),this._points}get level(){return this._stateUiConnector.connectEventHandler(this,Pe.DEVELOPMENT_LEVEL_CHANGED),this._level}increase(e,r){this._points+=e;const i=this.getIncome(r);this._income.set(r,i+e),this.requestLevelRecalculation(),this.uiEventBatcher.enqueueEvent(Pe.DEVELOPMENT_POINTS_CHANGED)}getIncome(e){return this._stateUiConnector.connectEventHandler(this,Pe.DEVELOPMENT_POINTS_CHANGED),this._income.get(e)??0}getNextLevelPoints(){const{base:e,baseMultiplier:r}=this._scenarioState.currentValues.developmentLevelRequirements;return r*(Math.pow(e,this._level)-1)/(e-1)}requestLevelRecalculation(){this._levelUpdateRequested=!0}recalculateLevel(){if(!this._levelUpdateRequested)return;this._levelUpdateRequested=!1;const{base:e,baseMultiplier:r}=this._scenarioState.currentValues.developmentLevelRequirements,i=Math.floor(Math.log(1+this._points*(e-1)/r)/Math.log(e))+1;i>this._level&&(this._level=i,this._messageLogState.postMessage(Hr.levelReached,{level:i}),this._globalState.storyEvents.visitEvents(),this.uiEventBatcher.enqueueEvent(Pe.DEVELOPMENT_LEVEL_CHANGED))}async startNewState(){this._points=0,this._level=this._scenarioState.currentValues.developmentLevel,this._income.clear(),this.requestLevelRecalculation()}async deserialize(e){this._points=e.points,this._level=this._scenarioState.currentValues.developmentLevel,this._income.clear(),Object.entries(e.income).forEach(([r,i])=>{this._income.set(r,i)}),this.requestLevelRecalculation()}serialize(){return{points:this._points,income:Object.fromEntries(this._income.entries())}}}class OD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._mainframeProcessesState=e.mainframeProcessesState,this._mainframeHardwareState=e.mainframeHardwareState,this._scenarioState=e.scenarioState,this._multiplier=1,this._speed=1,this._updateRequested=!1,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get multiplier(){return this._stateUiConnector.connectEventHandler(this,Pe.PROGRAM_COMPLETION_SPEED_CHANGED),this._multiplier}get speed(){return this._stateUiConnector.connectEventHandler(this,Pe.PROGRAM_COMPLETION_SPEED_CHANGED),this._speed}requestRecalculation(){this._updateRequested=!0}recalculate(){this._updateRequested&&(this._updateRequested=!1,this.updateMultiplier(),this.updateSpeed(),this.uiEventBatcher.enqueueEvent(Pe.PROGRAM_COMPLETION_SPEED_CHANGED))}updateMultiplier(){const e=this._mainframeProcessesState.getProcessByName(mt.predictiveComputator);let r=1;e!=null&&e.isActive&&(r=e.program.calculateProgramCompletionSpeedMultiplier(this._mainframeProcessesState.availableCores,this._mainframeProcessesState.availableRam)),this._multiplier=r}updateSpeed(){this._speed=this._multiplier*(1+(this._mainframeHardwareState.performance.level-1)*this._scenarioState.currentValues.mainframeSoftware.performanceBoost)}}class $D{constructor(e){this._stateUiConnector=e.stateUiConnector,this._mainframeProcessesState=e.mainframeProcessesState,this._totalGrowth=0,this._growth=new Map,this._updateRequested=!0,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get totalGrowth(){return this._stateUiConnector.connectEventHandler(this,Pe.MONEY_GROWTH_CHANGED),this._totalGrowth}getGrowth(e){return this._stateUiConnector.connectEventHandler(this,Pe.MONEY_GROWTH_CHANGED),this._growth.get(e)??0}requestRecalculation(){this._updateRequested=!0}recalculate(){this._updateRequested&&(this._updateRequested=!1,this.updateGrowthByProgram(),this.updateTotalGrowth(),this.uiEventBatcher.enqueueEvent(Pe.MONEY_GROWTH_CHANGED))}updateGrowthByProgram(){const e=this._mainframeProcessesState.getProcessByName(mt.shareServer);let r=0;e!=null&&e.isActive&&(r=e.program.calculateMoneyDelta(this._mainframeProcessesState.availableCores,this._mainframeProcessesState.availableRam,1)),this._growth.set(Zi.program,r)}updateTotalGrowth(){this._totalGrowth=Nn.reduce((e,r)=>e+this.getGrowth(r),0)}}class DD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._mainframeProcessesState=e.mainframeProcessesState,this._totalGrowth=0,this._growth=new Map,this._updateRequested=!0,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get totalGrowth(){return this._stateUiConnector.connectEventHandler(this,Pe.DEVELOPMENT_GROWTH_CHANGED),this._totalGrowth}getGrowth(e){return this._stateUiConnector.connectEventHandler(this,Pe.DEVELOPMENT_GROWTH_CHANGED),this._growth.get(e)??0}requestRecalculation(){this._updateRequested=!0}recalculate(){this._updateRequested&&(this._updateRequested=!1,this.updateGrowthByProgram(),this.updateTotalGrowth(),this.uiEventBatcher.enqueueEvent(Pe.DEVELOPMENT_GROWTH_CHANGED))}updateGrowthByProgram(){const e=this._mainframeProcessesState.getProcessByName(mt.shareServer);let r=0;e!=null&&e.isActive&&(r=e.program.calculateDevelopmentPointsDelta(this._mainframeProcessesState.availableCores,this._mainframeProcessesState.availableRam,1)),this._growth.set(Zi.program,r)}updateTotalGrowth(){this._totalGrowth=Nn.reduce((e,r)=>e+this.getGrowth(r),0)}}class ID{constructor(e){this._stateUiConnector=e.stateUiConnector,this._scenarioState=e.scenarioState,this._pointsByProgram=1,this._discount=0,this._discountUpdateRequested=!1,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get pointsByProgram(){return this._stateUiConnector.connectEventHandler(this,Pe.POINTS_BY_PROGRAM_CHANGED),this._pointsByProgram}get discount(){return this._stateUiConnector.connectEventHandler(this,Pe.MAINFRAME_DISCOUNT_CHANGED),this._discount}increaseByProgram(e){this._pointsByProgram+=e,this.requestDiscountRecalculation(),this.uiEventBatcher.enqueueEvent(Pe.POINTS_BY_PROGRAM_CHANGED)}requestDiscountRecalculation(){this._discountUpdateRequested=!0}recalculateDiscount(){if(!this._discountUpdateRequested)return;this._discountUpdateRequested=!1;let e=1;e+=Math.log(this._pointsByProgram)/Math.log(this._scenarioState.currentValues.discounts.program),this._discount=1-1/e,this.uiEventBatcher.enqueueEvent(Pe.MAINFRAME_DISCOUNT_CHANGED)}async startNewState(){this._pointsByProgram=1,this._discount=0,this.requestDiscountRecalculation()}async deserialize(e){this._pointsByProgram=e.pointsByProgram,this.requestDiscountRecalculation()}serialize(){return{pointsByProgram:this._pointsByProgram}}}class RD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._mainframeProcessesState=e.mainframeProcessesState,this._computationalBase=0,this._updateRequested=!0,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get computationalBase(){return this._stateUiConnector.connectEventHandler(this,Pe.GROWTH_BY_PROGRAM_CHANGED),this._computationalBase}requestRecalculation(){this._updateRequested=!0}recalculate(){this._updateRequested&&(this._updateRequested=!1,this.updateComputationalBase(),this.uiEventBatcher.enqueueEvent(Pe.GROWTH_BY_PROGRAM_CHANGED))}updateComputationalBase(){const e=this._mainframeProcessesState.getProcessByName(mt.codeGenerator);let r=0;e!=null&&e.isActive&&(r=e.program.calculateDelta(e.threads)*e.calculateCompletionDelta(1)/e.maxCompletionPoints),this._computationalBase=r}}class kD{constructor(e){this._stateUiConnector=e.stateUiConnector,this._messageLogState=e.messageLogState,this._notificationsState=e.notificationsState,this._unlockedFeatures=new Set,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}isFeatureUnlocked(e){return this._stateUiConnector.connectEventHandler(this,Pe.FEATURE_UNLOCKED),this._unlockedFeatures.has(e)}unlockFeature(e){this._unlockedFeatures.has(e)||(this.uiEventBatcher.enqueueEvent(Pe.FEATURE_UNLOCKED),this._unlockedFeatures.add(e),this._notificationsState.pushNotification(Sa.featureUnlocked,{feature:e}),this._messageLogState.postMessage(Hr.featureUnlocked,{feature:e}))}listUnlockedFeatures(){return Array.from(this._unlockedFeatures.values())}async startNewState(){this._unlockedFeatures.clear(),this.uiEventBatcher.enqueueEvent(Pe.FEATURE_UNLOCKED)}async deserialize(e){this._unlockedFeatures.clear(),e.unlockedFeatures.forEach(r=>this._unlockedFeatures.add(r)),this.uiEventBatcher.enqueueEvent(Pe.FEATURE_UNLOCKED)}serialize(){return{unlockedFeatures:Array.from(this._unlockedFeatures.values())}}}class ND{constructor(e){this._messageLogState=e.messageLogState,this._notificationsState=e.notificationsState,this._scenarioState=e.scenarioState,this._globalState=e.globalState,this._lastUpdateDevelopmentLevel=0}visitEvents(){const e=this._scenarioState.currentValues.storyEvents;for(const r of e)r.level<=this._lastUpdateDevelopmentLevel||r.level>this._globalState.development.level||(r.messages&&r.messages.forEach(i=>{this._notificationsState.pushNotification(Sa.storyEvent,{messageKey:i}),this._messageLogState.postMessage(Hr.storyEvent,{messageKey:i})}),r.unlockFeatures&&r.unlockFeatures.forEach(i=>{this._globalState.unlockedFeatures.unlockFeature(i)}));this._lastUpdateDevelopmentLevel=Math.max(this._lastUpdateDevelopmentLevel,this._globalState.development.level)}listAvailableGoals(){var i;const e=[],r=this._scenarioState.currentValues.storyEvents;for(const s of r)s.level<=this._globalState.development.level||(i=s.unlockFeatures)!=null&&i.every(o=>this._globalState.unlockedFeatures.isFeatureUnlocked(o))||e.push(s);return e}async startNewState(){this._lastUpdateDevelopmentLevel=0,this.visitEvents()}async deserialize(e){this._lastUpdateDevelopmentLevel=e.lastUpdateDevelopmentLevel}serialize(){return{lastUpdateDevelopmentLevel:this._lastUpdateDevelopmentLevel}}}var LD=Object.defineProperty,MD=Object.getOwnPropertyDescriptor,Un=(t,e,r,i)=>{for(var s=i>1?void 0:i?MD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&LD(e,r,s),s};const{lazyInject:Si}=kl;let jr=class{constructor(){this._randomSeed=0,this._gameSpeed=Sr.normal}get randomSeed(){return this._randomSeed}get gameSpeed(){return this._gameSpeed}set gameSpeed(t){this._gameSpeed=t}get money(){return this._money||(this._money=new AD({stateUiConnector:this._stateUiConnector,scenarioState:this._scenarioState})),this._money}get time(){return this._time||(this._time=new ED({stateUiConnector:this._stateUiConnector,settingsState:this._settingsState,scenarioState:this._scenarioState})),this._time}get development(){return this._development||(this._development=new TD({stateUiConnector:this._stateUiConnector,scenarioState:this._scenarioState,messageLogState:this._messageLogState,globalState:this})),this._development}get computationalBase(){return this._computationalBase||(this._computationalBase=new ID({stateUiConnector:this._stateUiConnector,scenarioState:this._scenarioState})),this._computationalBase}get programCompletionSpeed(){return this._programCompletionSpeed||(this._programCompletionSpeed=new OD({stateUiConnector:this._stateUiConnector,mainframeProcessesState:this._mainframeProcessesState,mainframeHardwareState:this._mainframeHardwareState,scenarioState:this._scenarioState})),this._programCompletionSpeed}get moneyGrowth(){return this._moneyGrowth||(this._moneyGrowth=new $D({stateUiConnector:this._stateUiConnector,mainframeProcessesState:this._mainframeProcessesState})),this._moneyGrowth}get developmentGrowth(){return this._developmentGrowth||(this._developmentGrowth=new DD({stateUiConnector:this._stateUiConnector,mainframeProcessesState:this._mainframeProcessesState})),this._developmentGrowth}get programsGrowth(){return this._programsGrowth||(this._programsGrowth=new RD({stateUiConnector:this._stateUiConnector,mainframeProcessesState:this._mainframeProcessesState})),this._programsGrowth}get unlockedFeatures(){return this._unlockedFeatures||(this._unlockedFeatures=new kD({stateUiConnector:this._stateUiConnector,messageLogState:this._messageLogState,notificationsState:this._notificationsState})),this._unlockedFeatures}get storyEvents(){return this._storyEvents||(this._storyEvents=new ND({globalState:this,scenarioState:this._scenarioState,messageLogState:this._messageLogState,notificationsState:this._notificationsState})),this._storyEvents}requestGrowthRecalculation(){this.programCompletionSpeed.requestRecalculation(),this.moneyGrowth.requestRecalculation(),this.developmentGrowth.requestRecalculation(),this.programsGrowth.requestRecalculation()}recalculate(){this.development.recalculateLevel(),this.computationalBase.recalculateDiscount(),this.programCompletionSpeed.recalculate(),this.moneyGrowth.recalculate(),this.developmentGrowth.recalculate(),this.programsGrowth.recalculate()}async startNewState(){this._randomSeed=Date.now(),this._gameSpeed=Sr.normal,await this.money.startNewState(),await this.time.startNewState(),await this.development.startNewState(),await this.computationalBase.startNewState(),await this.unlockedFeatures.startNewState(),await this.storyEvents.startNewState(),this.requestGrowthRecalculation()}async deserialize(t){this._randomSeed=t.randomSeed,this._gameSpeed=t.gameSpeed,await this.money.deserialize(t.money),await this.time.deserialize(t.time),await this.development.deserialize(t.development),await this.computationalBase.deserialize(t.computationalBase),await this.unlockedFeatures.deserialize(t.unlockedFeatures),await this.storyEvents.deserialize(t.storyEvents),this.requestGrowthRecalculation()}serialize(){return{randomSeed:this._randomSeed,gameSpeed:this._gameSpeed,money:this.money.serialize(),time:this.time.serialize(),development:this.development.serialize(),computationalBase:this.computationalBase.serialize(),unlockedFeatures:this.unlockedFeatures.serialize(),storyEvents:this.storyEvents.serialize()}}};Un([Si(B.StateUIConnector)],jr.prototype,"_stateUiConnector",2);Un([Si(B.ScenarioState)],jr.prototype,"_scenarioState",2);Un([Si(B.SettingsState)],jr.prototype,"_settingsState",2);Un([Si(B.MainframeProcessesState)],jr.prototype,"_mainframeProcessesState",2);Un([Si(B.MainframeHardwareState)],jr.prototype,"_mainframeHardwareState",2);Un([Si(B.MessageLogState)],jr.prototype,"_messageLogState",2);Un([Si(B.NotificationsState)],jr.prototype,"_notificationsState",2);jr=Un([It()],jr);const FD={classes:""},UD={classes:"sl-theme-dark"},zD={light:FD,dark:UD};var BD=Object.defineProperty,HD=Object.getOwnPropertyDescriptor,sv=(t,e,r,i)=>{for(var s=i>1?void 0:i?HD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&BD(e,r,s),s};const{lazyInject:GD}=kl;let hl=class{constructor(){this._language=Wh.en,this._theme=Ys.light,this._messageLogSize=Ue.defaultSettings.messageLogSize,this._updateInterval=Ue.defaultSettings.updateInterval,this._autosaveEnabled=Ue.defaultSettings.autosaveEnabled,this._autosaveInterval=Ue.defaultSettings.autosaveInterval,this._maxTicksPerUpdate=Ue.defaultSettings.maxTicksPerUpdate,this._maxTicksPerFastForward=Ue.defaultSettings.maxTicksPerFastForward,this._longNumberFormat=Ue.defaultSettings.longNumberFormat,this._mapCellSize=Ue.defaultSettings.mapSize,this._enabledMessageEvents=new Set,this._enabledGameAlerts=new Set,this._enabledNotificationTypes=new Set}get language(){return this._language}get theme(){return this._theme}get messageLogSize(){return this._messageLogSize}get updateInterval(){return this._updateInterval}get autosaveEnabled(){return this._autosaveEnabled}get autosaveInterval(){return this._autosaveInterval}get maxTicksPerUpdate(){return this._maxTicksPerUpdate}get maxTicksPerFastForward(){return this._maxTicksPerFastForward}get longNumberFormat(){return this._longNumberFormat}get mapCellSize(){return this._mapCellSize}isMessageEventEnabled(t){return this._enabledMessageEvents.has(t)}isGameAlertEnabled(t){return this._enabledGameAlerts.has(t)}isNotificationTypeEnabled(t){return this._enabledNotificationTypes.has(t)}async setLanguage(t){this._language=t,await ct.changeLanguage(this.language),document.documentElement.lang=this.language}setTheme(t){this._theme=t,document.body.className=zD[this.theme].classes}setMessageLogSize(t){this._messageLogSize=t}setUpdateInterval(t){this._updateInterval=t,this._app.restartUpdateTimer()}setAutosaveEnabled(t){this._autosaveEnabled=t,this._app.restartAutosaveTimer()}setAutosaveInterval(t){this._autosaveInterval=t,this._app.restartAutosaveTimer()}setMaxTicksPerUpdate(t){this._maxTicksPerUpdate=t}setMaxTicksPerFastForward(t){this._maxTicksPerFastForward=t}setLongNumberFormat(t){this._longNumberFormat=t}setMapCellSize(t){this._mapCellSize=t}toggleMessageEvent(t,e){e?this._enabledMessageEvents.add(t):this._enabledMessageEvents.delete(t)}toggleGameAlert(t,e){e?this._enabledGameAlerts.add(t):this._enabledGameAlerts.delete(t)}toggleNotificationType(t,e){e?this._enabledNotificationTypes.add(t):this._enabledNotificationTypes.delete(t)}async startNewState(){await ct.changeLanguage(),await this.setLanguage(ct.resolvedLanguage),this.setTheme(window.matchMedia("(prefers-color-scheme:dark)").matches?Ys.dark:Ys.light),this.setMessageLogSize(Ue.defaultSettings.messageLogSize),this.setUpdateInterval(Ue.defaultSettings.updateInterval),this.setAutosaveEnabled(Ue.defaultSettings.autosaveEnabled),this.setAutosaveInterval(Ue.defaultSettings.autosaveInterval),this.setMaxTicksPerUpdate(Ue.defaultSettings.maxTicksPerUpdate),this.setMaxTicksPerFastForward(Ue.defaultSettings.maxTicksPerFastForward),this.setLongNumberFormat(Ue.defaultSettings.longNumberFormat),this.setMapCellSize(Ue.defaultSettings.mapSize),this.deserializeMessageEvents(this.getAllMessageEvents()),this.deserializeGameAlerts(this.getAllGameAlerts()),this.deserializeNotificationTypes(this.getAllNotificationTypes())}async deserialize(t){await this.setLanguage(t.language),this.setTheme(t.theme),this.setMessageLogSize(t.messageLogSize),this.setUpdateInterval(t.updateInterval),this.setAutosaveEnabled(t.autosaveEnabled),this.setAutosaveInterval(t.autosaveInterval),this.setMaxTicksPerUpdate(t.maxTicksPerUpdate),this.setMaxTicksPerFastForward(t.maxTicksPerFastForward),this.setLongNumberFormat(t.longNumberFormat),this.setMapCellSize(t.mapCellSize),this.deserializeMessageEvents(t.enabledMessageEvents),this.deserializeGameAlerts(t.enabledGameAlerts),this.deserializeNotificationTypes(t.enabledNotificationTypes)}serialize(){return{language:this.language,theme:this.theme,messageLogSize:this.messageLogSize,updateInterval:this.updateInterval,autosaveEnabled:this.autosaveEnabled,autosaveInterval:this.autosaveInterval,maxTicksPerUpdate:this.maxTicksPerUpdate,maxTicksPerFastForward:this.maxTicksPerFastForward,longNumberFormat:this.longNumberFormat,mapCellSize:this.mapCellSize,enabledMessageEvents:this.serializeMessageEvents(),enabledGameAlerts:this.serializeGameAlerts(),enabledNotificationTypes:this.serializeNotificationTypes()}}serializeMessageEvents(){return Array.from(this._enabledMessageEvents.values())}deserializeMessageEvents(t){this._enabledMessageEvents.clear(),t.forEach(e=>this._enabledMessageEvents.add(e))}serializeGameAlerts(){return Array.from(this._enabledGameAlerts.values())}deserializeGameAlerts(t){this._enabledGameAlerts.clear(),t.forEach(e=>this._enabledGameAlerts.add(e))}serializeNotificationTypes(){return Array.from(this._enabledNotificationTypes.values())}deserializeNotificationTypes(t){this._enabledNotificationTypes.clear(),t.forEach(e=>this._enabledNotificationTypes.add(e))}getAllMessageEvents(){return[...Object.values(Hr),...Object.values(wi),...Object.values(hi)]}getAllGameAlerts(){return[...Object.values(kr),...Object.values($t)]}getAllNotificationTypes(){return Object.values(Sa)}};sv([GD(B.App)],hl.prototype,"_app",2);hl=sv([It()],hl);class da{constructor(){this._name="",this._startingPoint={x:0,y:0}}static deserialize(e){const r=new da;return r._name=e.name,r._startingPoint=e.startingPoint,r}static deserializeMapGeneratorResult(e){const r=new da;return r._name=e.name,r._startingPoint=e.startingPoint,r}get name(){return this._name}get startingPoint(){return{x:this._startingPoint.x,y:this._startingPoint.y}}serialize(){return{name:this._name,startingPoint:this._startingPoint}}}var VD=Object.defineProperty,jD=Object.getOwnPropertyDescriptor,qD=(t,e,r,i)=>{for(var s=i>1?void 0:i?jD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&VD(e,r,s),s},Cm=(t,e)=>(r,i)=>e(r,i,t);let _h=class{constructor(t,e){this._scenarioState=t,this._globalState=e,this._map=[],this._districts=new Map}getMap(){return this._map}getDistrictInfo(t){if(!this._districts.has(t))throw new Error(`Missing district ${t}`);return this._districts.get(t)}async startNewState(){await this.generateMap()}async deserialize(t){this._map=[];for(let e=0;e<this._scenarioState.currentValues.mapWidth;e++){const r=[];for(let i=0;i<this._scenarioState.currentValues.mapHeight;i++)r.push(t.map[e][i]);this._map.push(r)}this._districts.clear(),Object.entries(t.districts).forEach(([e,r])=>{const i=parseInt(e),s=da.deserialize(r);this._districts.set(i,s)})}serialize(){const t=this.getMap(),e={};return this._districts.forEach((r,i)=>{e[i]=r.serialize()}),{map:t,districts:e}}generateMap(){return new Promise((t,e)=>{const r=new Worker(new URL("/cyberiada/assets/index-BZ9o5rYs.js",import.meta.url),{type:"module"});r.addEventListener("message",s=>{this._map=s.data.map,this._districts.clear();for(const[o,l]of Object.entries(s.data.districts)){const d=parseInt(o),p=da.deserializeMapGeneratorResult(l);this._districts.set(d,p)}t()}),r.addEventListener("error",s=>{e(s.error)}),r.addEventListener("messageerror",()=>{e("Unable to parse map generator message")});const i=this._scenarioState.currentValues;r.postMessage({mapWidth:i.mapWidth,mapHeight:i.mapHeight,districtsNum:i.districtsNum,randomSeed:this._globalState.randomSeed})})}};_h=qD([It(),Cm(0,ge(B.ScenarioState)),Cm(1,ge(B.GlobalState))],_h);const gu={UPDATED_MESSAGES:Symbol("UPDATED_MESSAGES")};let Po;const WD=new Uint8Array(16);function KD(){if(!Po&&(Po=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!Po))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return Po(WD)}const St=[];for(let t=0;t<256;++t)St.push((t+256).toString(16).slice(1));function YD(t,e=0){return St[t[e+0]]+St[t[e+1]]+St[t[e+2]]+St[t[e+3]]+"-"+St[t[e+4]]+St[t[e+5]]+"-"+St[t[e+6]]+St[t[e+7]]+"-"+St[t[e+8]]+St[t[e+9]]+"-"+St[t[e+10]]+St[t[e+11]]+St[t[e+12]]+St[t[e+13]]+St[t[e+14]]+St[t[e+15]]}const JD=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Am={randomUUID:JD};function ZD(t,e,r){if(Am.randomUUID&&!e&&!t)return Am.randomUUID();t=t||{};const i=t.random||(t.rng||KD)();return i[6]=i[6]&15|64,i[8]=i[8]&63|128,YD(i)}var QD=Object.defineProperty,XD=Object.getOwnPropertyDescriptor,eI=(t,e,r,i)=>{for(var s=i>1?void 0:i?XD(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&QD(e,r,s),s},Em=(t,e)=>(r,i)=>e(r,i,t);let wh=class{constructor(t,e){this._stateUiConnector=t,this._settingsState=e,this._messages=[],this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}postMessage(t,e){if(!this._settingsState.isMessageEventEnabled(t))return;this._messages.push({date:new Date,id:ZD(),event:t,parameters:e});const r=this._messages.length-this._settingsState.messageLogSize;r>0&&this._messages.splice(0,r),this.uiEventBatcher.enqueueEvent(gu.UPDATED_MESSAGES)}getMessages(){return this._stateUiConnector.connectEventHandler(this,gu.UPDATED_MESSAGES),this._messages}clearMessages(){this._messages.splice(0),this.uiEventBatcher.enqueueEvent(gu.UPDATED_MESSAGES)}};wh=eI([It(),Em(0,ge(B.StateUIConnector)),Em(1,ge(B.SettingsState))],wh);const tI={ram:0,completionPoints:{baseMultiplier:0,base:1},cost:{baseMultiplier:3e4,base:1.15},costQualityMultiplier:10,unlockFeatures:[],scalableResourcesModifier:.5,money:1,moneyQualityMultiplier:2,developmentPoints:1,developmentPointsQualityMultiplier:2},rI={ram:0,completionPoints:{baseMultiplier:0,base:1},cost:{baseMultiplier:6e4,base:1.15},costQualityMultiplier:10,unlockFeatures:[],scalableResourcesModifier:.5,speedModifierLevelMultiplier:.001,speedModifierQualityMultiplier:1.3},nI={ram:1,completionPoints:{baseMultiplier:12e4,base:1},cost:{baseMultiplier:6e4,base:1.15},costQualityMultiplier:10,unlockFeatures:[],computationalBaseLevelMultiplier:1,computationalBaseQualityMultiplier:900},iI={ram:3,completionPoints:{baseMultiplier:3e5,base:1.01},cost:{baseMultiplier:9e5,base:1.15},costQualityMultiplier:10,unlockFeatures:["automation","automationMainframeHardware"]},sI={ram:5,completionPoints:{baseMultiplier:9e5,base:1.01},cost:{baseMultiplier:18e5,base:1.15},costQualityMultiplier:10,unlockFeatures:["automation","automationMainframePrograms"]},dn={shareServer:tI,predictiveComputator:rI,codeGenerator:nI,mainframeHardwareAutobuyer:iI,mainframeProgramsAutobuyer:sI};class Ca{constructor(e){this.stateUiConnector=e.stateUiConnector,this.globalState=e.globalState,this.mainframeProgramsState=e.mainframeProgramsState,this.mainframeProcessesState=e.mainframeProcessesState,this.mainframeHardwareState=e.mainframeHardwareState,this.scenarioState=e.scenarioState,this.formatter=e.formatter,this._level=e.level,this._quality=e.quality,this._autoUpgradeEnabled=e.autoUpgradeEnabled,this.uiEventBatcher=new At,this.stateUiConnector.registerEventEmitter(this)}get level(){return this.stateUiConnector.connectEventHandler(this,Bs.PROGRAM_UPGRADED),this._level}get quality(){return this.stateUiConnector.connectEventHandler(this,Bs.PROGRAM_UPGRADED),this._quality}get completionPoints(){const e=dn[this.name];return Ku(this.globalState.development.level-this.level,e.completionPoints)}get autoUpgradeEnabled(){return this.stateUiConnector.connectEventHandler(this,Bs.PROGRAM_UPGRADED),this._autoUpgradeEnabled}set autoUpgradeEnabled(e){if(!this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.automationMainframePrograms))throw new Error("Mainframe program automation is not unlocked");this._autoUpgradeEnabled=e,this.uiEventBatcher.enqueueEvent(Bs.PROGRAM_UPGRADED),this.mainframeProgramsState.requestUiUpdate()}get cost(){const e=dn[this.name];return(1-this.globalState.computationalBase.discount)*Ku(this.level-1,e.cost)*Math.pow(e.costQualityMultiplier,this.quality)}get ram(){return dn[this.name].ram}get cores(){return this.quality+1}get unlockFeatures(){return dn[this.name].unlockFeatures}update(e){if(this.name!==e.name)throw new Error(`Unable to update program ${this.name} with ${e.name}`);this._level=e.level,this._quality=e.quality,this.mainframeProcessesState.requestUpdateProcesses(),this.uiEventBatcher.enqueueEvent(Bs.PROGRAM_UPGRADED)}calculateCompletionDelta(e,r,i){const s=r*this.globalState.programCompletionSpeed.speed,o=e*this.completionPoints/this.scenarioState.currentValues.mainframeSoftware.minCompletionTime;return i*Math.min(s,o)}calculateCompletionTime(e,r){const i=e*this.completionPoints,s=this.calculateCompletionDelta(e,r,1);return i/s}removeEventListeners(){this.stateUiConnector.unregisterEventEmitter(this)}serialize(){return{name:this.name,level:this.level,quality:this.quality,autoUpgradeEnabled:this.autoUpgradeEnabled}}buildCostParametersObject(){return{cost:this.formatter.formatNumberLong(this.cost)}}buildRequirementsParametersObject(e){return{cores:this.formatter.formatNumberDecimal(this.cores*e),ram:this.formatter.formatNumberDecimal(this.ram*e),threads:this.formatter.formatNumberDecimal(e)}}buildCompletionTimeParametersObject(e){const r=this.calculateCompletionTime(e,this.cores*e),i=this.calculateCompletionTime(e,1);return{minTime:r,maxTime:i}}}class aI extends Ca{constructor(e){super(e),this.name=mt.shareServer,this.isRepeatable=!0,this.isAutoscalable=!0,this._settingsState=e.settingsState}perform(e,r){const i=this.calculateMoneyDelta(e,r,this._settingsState.updateInterval),s=this.calculateDevelopmentPointsDelta(e,r,this._settingsState.updateInterval);this.globalState.money.increase(i,Zi.program),this.globalState.development.increase(s,Zi.program)}buildProgramDescriptionParametersObject(e,r){const i=this.calculateMoneyDelta(e,r,gt),s=this.calculateDevelopmentPointsDelta(e,r,gt);return{money:this.formatter.formatNumberLong(i),developmentPoints:this.formatter.formatNumberLong(s)}}buildProcessDescriptionParametersObject(e,r,i){const s=this.calculateMoneyDelta(r,i,gt),o=this.calculateDevelopmentPointsDelta(r,i,gt);return{money:this.formatter.formatNumberLong(s),developmentPoints:this.formatter.formatNumberLong(o)}}calculateMoneyDelta(e,r,i){const s=dn[this.name];return this.calculateModifier(e,r,i)*s.money*Math.pow(s.moneyQualityMultiplier,this.quality)}calculateDevelopmentPointsDelta(e,r,i){const s=dn[this.name];return this.calculateModifier(e,r,i)*s.developmentPoints*Math.pow(s.developmentPointsQualityMultiplier,this.quality)}calculateModifier(e,r,i){const s=dn[this.name];return i*Math.pow(e*r,s.scalableResourcesModifier)*this.level*(1+(this.mainframeHardwareState.performance.level-1)*this.scenarioState.currentValues.mainframeSoftware.performanceBoost)}}class oI extends Ca{constructor(){super(...arguments),this.name=mt.codeGenerator,this.isRepeatable=!0,this.isAutoscalable=!1}perform(e){this.globalState.computationalBase.increaseByProgram(this.calculateDelta(e))}buildProgramDescriptionParametersObject(e){const r=this.calculateDelta(e),i=this.buildCompletionTimeParametersObject(e),s=r/i.maxTime,o=r/i.minTime;return{value:this.formatter.formatNumberLong(r),minAvgValue:this.formatter.formatNumberLong(s*gt),maxAvgValue:this.formatter.formatNumberLong(o*gt)}}buildProcessDescriptionParametersObject(e,r){const i=this.calculateDelta(e),s=this.calculateCompletionTime(e,r),o=i/s;return{value:this.formatter.formatNumberLong(i),avgValue:this.formatter.formatNumberLong(o*gt)}}calculateDelta(e){const r=dn[this.name];return this.scenarioState.currentValues.pointsByProgramMultipliers.program*e*r.computationalBaseLevelMultiplier*this.level*Math.pow(r.computationalBaseQualityMultiplier,this.quality)}}class lI extends Ca{constructor(){super(...arguments),this.name=mt.predictiveComputator,this.isRepeatable=!0,this.isAutoscalable=!0}perform(){}buildProgramDescriptionParametersObject(e,r){return{value:this.formatter.formatNumberLong(this.calculateProgramCompletionSpeedMultiplier(e,r))}}buildProcessDescriptionParametersObject(e,r,i){return{value:this.formatter.formatNumberLong(this.calculateProgramCompletionSpeedMultiplier(r,i))}}calculateProgramCompletionSpeedMultiplier(e,r){const i=dn[this.name];return Math.max(1,1+Math.pow(e*r,i.scalableResourcesModifier)*i.speedModifierLevelMultiplier*this.level*Math.pow(i.speedModifierQualityMultiplier,this.quality)*(1+(this.mainframeHardwareState.performance.level-1)*this.scenarioState.currentValues.mainframeSoftware.performanceBoost))}}class cI extends Ca{constructor(e){super(e),this.name=mt.mainframeHardwareAutobuyer,this.isRepeatable=!0,this.isAutoscalable=!1,this.makeCheckParameterFunction=(r,i)=>s=>r.checkCanPurchase(s)&&r.getIncreaseCost(s)<=i,this._mainframeHardwareAutomationState=e.mainframeHardwareAutomationState}perform(e){let r=e,i=this.globalState.money.money*this._mainframeHardwareAutomationState.moneyShare/100;for(const s of this.mainframeHardwareState.listParameters()){if(r===0)break;if(!s.autoUpgradeEnabled)continue;const o=this.makeCheckParameterFunction(s,i),l=Wg(0,r,o),d=s.getIncreaseCost(l);l>0&&s.purchase(l)&&(r-=l,i-=d)}}buildProgramDescriptionParametersObject(e){const r=this.buildCompletionTimeParametersObject(e),i=e/r.maxTime,s=e/r.minTime;return{value:this.formatter.formatNumberDecimal(e),minAvgValue:this.formatter.formatNumberDecimal(i*gt),maxAvgValue:this.formatter.formatNumberDecimal(s*gt)}}buildProcessDescriptionParametersObject(e,r){const i=this.calculateCompletionTime(e,r),s=e/i;return{value:this.formatter.formatNumberDecimal(e),avgValue:this.formatter.formatNumberDecimal(s*gt)}}}class uI extends Ca{constructor(e){super(e),this.name=mt.mainframeProgramsAutobuyer,this.isRepeatable=!0,this.isAutoscalable=!1,this.makeCheckProgramFunction=(r,i)=>s=>{const o=this._programFactory.makeProgram({level:s,name:r.name,quality:r.quality,autoUpgradeEnabled:r.autoUpgradeEnabled}),l=o.cost<=i;return this._programFactory.deleteProgram(o),l},this._programFactory=e.programFactory,this._mainframeProgramsAutomationState=e.mainframeProgramsAutomationState}perform(e){let r=e,i=this.globalState.money.money*this._mainframeProgramsAutomationState.moneyShare/100;for(const s of this.mainframeProgramsState.listOwnedPrograms()){if(r===0)break;if(!s.autoUpgradeEnabled)continue;const o=this.makeCheckProgramFunction(s,i),l=Wg(s.level,this.globalState.development.level,o);if(l>s.level){const d={level:l,name:s.name,quality:s.quality,autoUpgradeEnabled:s.autoUpgradeEnabled},p=this._programFactory.makeProgram(d);this.mainframeProgramsState.purchaseProgram(d)&&(i-=p.cost,r--),this._programFactory.deleteProgram(p)}}}buildProgramDescriptionParametersObject(e){const r=this.buildCompletionTimeParametersObject(e),i=e/r.maxTime,s=e/r.minTime;return{value:this.formatter.formatNumberDecimal(e),minAvgValue:this.formatter.formatNumberDecimal(i*gt),maxAvgValue:this.formatter.formatNumberDecimal(s*gt)}}buildProcessDescriptionParametersObject(e,r){const i=this.calculateCompletionTime(e,r),s=e/i;return{value:this.formatter.formatNumberDecimal(e),avgValue:this.formatter.formatNumberDecimal(s*gt)}}}var hI=Object.defineProperty,dI=Object.getOwnPropertyDescriptor,Mr=(t,e,r,i)=>{for(var s=i>1?void 0:i?dI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&hI(e,r,s),s};const{lazyInject:Kr}=kl;let ar=class{constructor(){this._programRepository=new Set}makeProgram(t){const e=this.makeProgramImplementation(t);return this._programRepository.add(e),e}deleteProgram(t){t.removeEventListeners(),this._programRepository.delete(t)}deleteAllPrograms(){for(const t of this._programRepository.values())t.removeEventListeners();this._programRepository.clear()}makeProgramImplementation(t){const e={formatter:this._formatter,level:t.level,quality:t.quality,autoUpgradeEnabled:t.autoUpgradeEnabled,stateUiConnector:this._stateUiConnector,globalState:this._globalState,mainframeProgramsState:this._mainframeProgramsState,mainframeProcessesState:this._mainframeProcessesState,mainframeHardwareState:this._mainframeHardwareState,scenarioState:this._scenarioState};switch(t.name){case mt.shareServer:return new aI({...e,settingsState:this._settingsState});case mt.codeGenerator:return new oI({...e});case mt.predictiveComputator:return new lI({...e});case mt.mainframeHardwareAutobuyer:return new cI({...e,mainframeHardwareAutomationState:this._mainframeHardwareAutomationState});case mt.mainframeProgramsAutobuyer:return new uI({...e,programFactory:this,mainframeProgramsAutomationState:this._mainframeProgramsAutomationState})}}};Mr([Kr(B.StateUIConnector)],ar.prototype,"_stateUiConnector",2);Mr([Kr(B.ScenarioState)],ar.prototype,"_scenarioState",2);Mr([Kr(B.GlobalState)],ar.prototype,"_globalState",2);Mr([Kr(B.SettingsState)],ar.prototype,"_settingsState",2);Mr([Kr(B.MainframeProgramsState)],ar.prototype,"_mainframeProgramsState",2);Mr([Kr(B.MainframeProcessesState)],ar.prototype,"_mainframeProcessesState",2);Mr([Kr(B.MainframeHardwareState)],ar.prototype,"_mainframeHardwareState",2);Mr([Kr(B.MainframeHardwareAutomationState)],ar.prototype,"_mainframeHardwareAutomationState",2);Mr([Kr(B.MainframeProgramsAutomationState)],ar.prototype,"_mainframeProgramsAutomationState",2);Mr([Kr(B.Formatter)],ar.prototype,"_formatter",2);ar=Mr([It()],ar);const si={HARDWARE_UPGRADED:Symbol("HARDWARE_UPGRADED"),AUTOBUYER_UPDATED:Symbol("AUTOBUYER_UPDATED")};class rd{constructor(e){this.handlePurchaseIncrease=r=>()=>{this._level+=r,this.messageLogState.postMessage(this.purchaseEvent,{level:this.formatter.formatNumberDecimal(this.level)}),this.mainframeHardwareState.emitUpgradedEvent()},this.stateUiConnector=e.stateUiConnector,this.mainframeHardwareState=e.mainframeHardwareState,this.scenarioState=e.scenarioState,this.globalState=e.globalState,this.messageLogState=e.messageLogState,this.formatter=e.formatter,this._level=0,this._autoUpgradeEnabled=!0}get level(){return this._level}get autoUpgradeEnabled(){return this.stateUiConnector.connectEventHandler(this.mainframeHardwareState,si.AUTOBUYER_UPDATED),this._autoUpgradeEnabled}set autoUpgradeEnabled(e){if(!this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.automationMainframeHardware))throw new Error("Mainframe program automation is not unlocked");this._autoUpgradeEnabled=e,this.mainframeHardwareState.emitAutobuyerUpdatedEvent()}getIncreaseCost(e){const r=this.priceExp,i=Ku(this.level-1,r);return(1-this.globalState.computationalBase.discount)*(i*(Math.pow(r.base,e)-1))/(r.base-1)}purchase(e){if(!this.checkCanPurchase(e))return!1;const r=this.getIncreaseCost(e);return this.globalState.money.purchase(r,Nl.mainframeHardware,this.handlePurchaseIncrease(e))}checkCanPurchase(e){if(!this.globalState.unlockedFeatures.isFeatureUnlocked(Cr.mainframeHardware))return!1;const r=this.globalState.development.level-this.level;return e>r?!1:this.getIncreaseCost(e)<=this.globalState.money.money}async startNewState(){this._autoUpgradeEnabled=!0}async deserialize(e){this._level=e.level,this._autoUpgradeEnabled=e.autoUpgradeEnabled}serialize(){return{level:this._level,autoUpgradeEnabled:this._autoUpgradeEnabled}}}class pI extends rd{constructor(){super(...arguments),this.type="performance"}get priceExp(){return this.scenarioState.currentValues.mainframeHardware.performancePrice}get purchaseEvent(){return wi.performanceUpgraded}async startNewState(){await super.startNewState(),this._level=this.scenarioState.currentValues.mainframeHardware.performanceLevel}}class fI extends rd{constructor(){super(...arguments),this.type="cores"}get priceExp(){return this.scenarioState.currentValues.mainframeHardware.coresPrice}get purchaseEvent(){return wi.coresUpgraded}async startNewState(){await super.startNewState(),this._level=this.scenarioState.currentValues.mainframeHardware.coresLevel}}class mI extends rd{constructor(){super(...arguments),this.type="ram"}get priceExp(){return this.scenarioState.currentValues.mainframeHardware.ramPrice}get purchaseEvent(){return wi.ramUpgraded}async startNewState(){await super.startNewState(),this._level=this.scenarioState.currentValues.mainframeHardware.ramLevel}}var gI=Object.defineProperty,vI=Object.getOwnPropertyDescriptor,av=(t,e,r,i)=>{for(var s=i>1?void 0:i?vI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&gI(e,r,s),s},Hs=(t,e)=>(r,i)=>e(r,i,t);const{lazyInject:bI}=kl;let dl=class{constructor(t,e,r,i,s){this.getParameterByType=l=>{switch(l){case"performance":return this.performance;case"cores":return this.cores;case"ram":return this.ram}},this._stateUiConnector=t,this._scenarioState=e,this._globalState=r,this._messageLogState=i,this._formatter=s;const o={stateUiConnector:this._stateUiConnector,mainframeHardwareState:this,globalState:this._globalState,messageLogState:this._messageLogState,scenarioState:this._scenarioState,formatter:this._formatter};this._performance=new pI(o),this._cores=new fI(o),this._ram=new mI(o),this.buildParametersList(Ue.defaultAutomationSettings.mainframeHardwareAutobuyer.priority),this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get performance(){return this._stateUiConnector.connectEventHandler(this,si.HARDWARE_UPGRADED),this._performance}get cores(){return this._stateUiConnector.connectEventHandler(this,si.HARDWARE_UPGRADED),this._cores}get ram(){return this._stateUiConnector.connectEventHandler(this,si.HARDWARE_UPGRADED),this._ram}listParameters(){return this._stateUiConnector.connectEventHandler(this,si.AUTOBUYER_UPDATED),this._parametersList}moveParameter(t,e){const r=this._parametersList.findIndex(i=>i.type===t);r!==-1&&(cs(this._parametersList,r,e),this.emitAutobuyerUpdatedEvent())}emitUpgradedEvent(){this._mainframeProcessesState.requestUpdateProcesses(),this._globalState.requestGrowthRecalculation(),this.uiEventBatcher.enqueueEvent(si.HARDWARE_UPGRADED)}emitAutobuyerUpdatedEvent(){this.uiEventBatcher.enqueueEvent(si.AUTOBUYER_UPDATED)}async startNewState(){await this._performance.startNewState(),await this._cores.startNewState(),await this._ram.startNewState(),this.buildParametersList(Ue.defaultAutomationSettings.mainframeHardwareAutobuyer.priority)}async deserialize(t){await this._performance.deserialize(t.performance),await this._cores.deserialize(t.cores),await this._ram.deserialize(t.ram),this.buildParametersList(t.parametersList)}serialize(){return{performance:this._performance.serialize(),cores:this._cores.serialize(),ram:this._ram.serialize(),parametersList:this._parametersList.map(t=>t.type)}}buildParametersList(t){this._parametersList=t.map(this.getParameterByType)}};av([bI(B.MainframeProcessesState)],dl.prototype,"_mainframeProcessesState",2);dl=av([It(),Hs(0,ge(B.StateUIConnector)),Hs(1,ge(B.ScenarioState)),Hs(2,ge(B.GlobalState)),Hs(3,ge(B.MessageLogState)),Hs(4,ge(B.Formatter))],dl);const Tm={OWNED_PROGRAMS_UPDATED:Symbol("OWNED_PROGRAMS_UPDATED")};var yI=Object.defineProperty,_I=Object.getOwnPropertyDescriptor,wI=(t,e,r,i)=>{for(var s=i>1?void 0:i?_I(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&yI(e,r,s),s},Hi=(t,e)=>(r,i)=>e(r,i,t);let Sh=class{constructor(t,e,r,i,s,o){this.handlePurchaseProgram=l=>()=>{this.addProgram(l),this._messageLogState.postMessage(wi.programPurchased,{programName:l.name,level:this._formatter.formatNumberDecimal(l.level),quality:this._formatter.formatQuality(l.quality)});for(const d of l.unlockFeatures)this._globalState.unlockedFeatures.unlockFeature(d)},this._stateUiConnector=t,this._programFactory=e,this._scenarioState=r,this._globalState=i,this._messageLogState=s,this._formatter=o,this._programsList=[],this._ownedPrograms=new Map,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}purchaseProgram(t){if(!this._globalState.unlockedFeatures.isFeatureUnlocked(Cr.mainframePrograms)||t.level>this._globalState.development.level)return!1;const e=this.getOwnedProgramByName(t.name),r=this._programFactory.makeProgram(t),i=this._globalState.money.purchase(r.cost,Nl.mainframePrograms,this.handlePurchaseProgram(r));return(!i||e)&&this._programFactory.deleteProgram(r),i}listOwnedPrograms(){return this._stateUiConnector.connectEventHandler(this,Tm.OWNED_PROGRAMS_UPDATED),this._programsList}getOwnedProgramByName(t){return this._ownedPrograms.get(t)}toggleProgramsAutoUpgrade(t){for(const e of this._ownedPrograms.values())e.autoUpgradeEnabled=t;this.requestUiUpdate()}requestUiUpdate(){this.uiEventBatcher.enqueueEvent(Tm.OWNED_PROGRAMS_UPDATED)}moveProgram(t,e){const r=this._programsList.findIndex(i=>i.name===t);r!==-1&&(cs(this._programsList,r,e),this.requestUiUpdate())}async startNewState(){this.clearState();for(const t of this._scenarioState.currentValues.mainframeSoftware.programs)this.addProgram(this._programFactory.makeProgram({name:t,level:1,quality:0,autoUpgradeEnabled:!0}));this.requestUiUpdate()}async deserialize(t){this.clearState(),t.ownedPrograms.forEach(e=>{const r=this._programFactory.makeProgram(e);this._ownedPrograms.set(e.name,r),this._programsList.push(r)}),this.requestUiUpdate()}serialize(){return{ownedPrograms:this._programsList.map(t=>t.serialize())}}addUiEventListener(t,e){this.uiEventBatcher.addListener(t,e)}removeUiEventListener(t,e){this.uiEventBatcher.removeListener(t,e)}fireUiEvents(){this.uiEventBatcher.fireEvents()}addProgram(t){const e=this._ownedPrograms.get(t.name);e?e.update(t):(this._ownedPrograms.set(t.name,t),this._programsList.push(t)),this.requestUiUpdate()}clearState(){for(const t of this._programsList)this._programFactory.deleteProgram(t);this._ownedPrograms.clear(),this._programsList=[]}};Sh=wI([It(),Hi(0,ge(B.StateUIConnector)),Hi(1,ge(B.ProgramFactory)),Hi(2,ge(B.ScenarioState)),Hi(3,ge(B.GlobalState)),Hi(4,ge(B.MessageLogState)),Hi(5,ge(B.Formatter))],Sh);const Vt={PROCESSES_UPDATED:Symbol("PROCESSES_UPDATED"),PROCESS_UPDATED:Symbol("PROCESS_UPDATED"),PROCESS_PROGRESS_UPDATED:Symbol("PROCESS_PROGRESS_UPDATED")};class SI{constructor(e){this._stateUiConnector=e.stateUiConnector,this._mainframeProcessesState=e.mainframeProcessesState,this._program=e.program,this._isActive=e.isActive,this._threads=e.threads,this._currentCompletionPoints=e.currentCompletionPoints,this._usedCores=0,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get program(){return this._program}get isActive(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESS_UPDATED),this._isActive}get threads(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESS_UPDATED),this._threads}get currentCompletionPoints(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESS_PROGRESS_UPDATED),this._currentCompletionPoints}get maxCompletionPoints(){return this.program.completionPoints*this.threads}get totalRam(){return this.program.ram*this.threads}get usedCores(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESS_UPDATED),this._usedCores}set usedCores(e){this._usedCores=e,this.uiEventBatcher.enqueueEvent(Vt.PROCESS_UPDATED)}get maxCores(){return this.threads*this.program.cores}calculateCompletionDelta(e){return this.program.calculateCompletionDelta(this.threads,this.usedCores,e)}calculateCompletionTime(){return this.program.calculateCompletionTime(this.threads,this.usedCores)}toggleActive(e){this._isActive=e,this._mainframeProcessesState.requestUpdateProcesses(),this.uiEventBatcher.enqueueEvent(Vt.PROCESS_UPDATED)}increaseCompletion(e){this._currentCompletionPoints+=e;const r=this.maxCompletionPoints;this._currentCompletionPoints>r&&(this._currentCompletionPoints=r),this.uiEventBatcher.enqueueEvent(Vt.PROCESS_PROGRESS_UPDATED)}resetCompletion(){this._currentCompletionPoints=0,this.uiEventBatcher.enqueueEvent(Vt.PROCESS_PROGRESS_UPDATED)}update(e){this._threads=e,this.resetCompletion(),this._mainframeProcessesState.requestUpdateProcesses(),this.uiEventBatcher.enqueueEvent(Vt.PROCESS_UPDATED)}serialize(){return{programName:this.program.name,isActive:this.isActive,threads:this._threads,currentCompletionPoints:this.currentCompletionPoints}}removeEventListeners(){this._stateUiConnector.unregisterEventEmitter(this)}}var xI=Object.defineProperty,PI=Object.getOwnPropertyDescriptor,CI=(t,e,r,i)=>{for(var s=i>1?void 0:i?PI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&xI(e,r,s),s},ii=(t,e)=>(r,i)=>e(r,i,t);let xh=class{constructor(t,e,r,i,s,o,l){this.updateRunningProcesses=()=>{this._processUpdateRequested=!1,this._availableCores=this._mainframeHardwareState.cores.level,this._availableRam=this._mainframeHardwareState.ram.level,this._runningProcesses.splice(0),this._runningScalableProcess=this._processesList.find(h=>h.program.isAutoscalable);let d=0,p=0;for(const h of this._processesList)if(!h.program.isAutoscalable){if(d=h.totalRam,this._availableRam-=d,!h.isActive){h.usedCores=0;continue}p=Math.min(h.maxCores,this._availableCores),p>0?(h.usedCores=p,this._runningProcesses.push(h),this._availableCores-=p):h.usedCores=0}this._runningScalableProcess&&(this._runningScalableProcess.usedCores=this._runningScalableProcess.isActive?this._availableCores:0),this._globalState.requestGrowthRecalculation(),this.uiEventBatcher.enqueueEvent(Vt.PROCESSES_UPDATED)},this.createProcess=d=>new SI({mainframeProcessesState:this,stateUiConnector:this._stateUiConnector,isActive:d.isActive,threads:d.threads,program:this._mainframeProgramsState.getOwnedProgramByName(d.programName),currentCompletionPoints:d.currentCompletionPoints}),this._stateUiConnector=t,this._globalState=e,this._settingsState=r,this._mainframeHardwareState=i,this._mainframeProgramsState=s,this._messageLogState=o,this._formatter=l,this._processesMap=new Map,this._processesList=[],this._runningProcesses=[],this._availableCores=0,this._availableRam=0,this._processUpdateRequested=!1,this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}get availableCores(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESSES_UPDATED),this._availableCores}get availableRam(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESSES_UPDATED),this._availableRam}get runningScalableProcess(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESSES_UPDATED),this._runningScalableProcess}listProcesses(){return this._stateUiConnector.connectEventHandler(this,Vt.PROCESSES_UPDATED),this._processesList}getProcessByName(t){return this._processesMap.get(t)}addProcess(t,e){const r=this._mainframeProgramsState.getOwnedProgramByName(t);if(!r)return!1;if(!r.isAutoscalable&&e<=0)throw new Error("Invalid amount of threads for process");const i=r.isAutoscalable?0:e,s=this.getProcessByName(t);if(!r.isAutoscalable){let o=this.availableRam;if(s&&(o+=s.totalRam),o<r.ram*e)return!1}if(r.isAutoscalable&&!s&&this.deleteAutoscalableProcesses(),s)s.update(e);else{const o=this.createProcess({isActive:!0,threads:i,currentCompletionPoints:0,programName:t});r.isAutoscalable?this._processesList.unshift(o):this._processesList.push(o),this._processesMap.set(t,o)}return this.requestUpdateProcesses(),this._messageLogState.postMessage(hi.processStarted,{programName:r.name,threads:this._formatter.formatNumberDecimal(i)}),!0}toggleAllProcesses(t){for(const e of this._processesMap.values())e.toggleActive(t);this.requestUpdateProcesses()}deleteProcess(t){const e=this.getProcessByName(t);let r=0;for(;r<this._processesList.length;)this._processesList[r].program.name===t?this._processesList.splice(r,1):r++;e&&(e.removeEventListeners(),this._processesMap.delete(t),this._messageLogState.postMessage(hi.processDeleted,{programName:t,threads:this._formatter.formatNumberDecimal(e.threads)})),this.requestUpdateProcesses()}deleteAllProcesses(){this.clearState(),this._messageLogState.postMessage(hi.allProcessesDeleted),this.requestUpdateProcesses()}requestUpdateProcesses(){this._processUpdateRequested=!0}processTick(){var e;this._processUpdateRequested&&this.updateRunningProcesses(),(e=this._runningScalableProcess)!=null&&e.isActive&&this._runningScalableProcess.program.perform(this._availableCores,this._availableRam);let t=!1;for(const r of this._runningProcesses)r.increaseCompletion(r.calculateCompletionDelta(this._settingsState.updateInterval)),r.currentCompletionPoints>=r.maxCompletionPoints&&(r.program.perform(r.threads,r.totalRam),t=!0);t&&(this.updateFinishedProcesses(),this.updateRunningProcesses())}moveProcess(t,e){const r=this._processesList.findIndex(i=>i.program.name===t);r!==-1&&(cs(this._processesList,r,e),this.requestUpdateProcesses())}async startNewState(){this.clearState(),this.requestUpdateProcesses()}async deserialize(t){this.clearState(),t.processes.forEach(e=>{const r=this.createProcess(e);this._processesMap.set(e.programName,r),this._processesList.push(r)}),this.requestUpdateProcesses()}serialize(){return{processes:this._processesList.map(t=>t.serialize())}}updateFinishedProcesses(){let t=0;for(;t<this._processesList.length;){const e=this._processesList[t];!e.program.isAutoscalable&&e.currentCompletionPoints>=e.maxCompletionPoints?(this._processesList.splice(t,1),e.program.isRepeatable?(e.resetCompletion(),this._processesList.push(e)):(e.removeEventListeners(),this._messageLogState.postMessage(hi.processDeleted,{programName:e.program.name,threads:this._formatter.formatNumberDecimal(e.threads)}))):t++}}deleteAutoscalableProcesses(){const t=this._runningScalableProcess;this._runningScalableProcess=void 0,t&&this.deleteProcess(t.program.name)}clearState(){for(const t of this._processesMap.values())t.removeEventListeners();this._processesList=[],this._processesMap.clear()}};xh=CI([It(),ii(0,ge(B.StateUIConnector)),ii(1,ge(B.GlobalState)),ii(2,ge(B.SettingsState)),ii(3,ge(B.MainframeHardwareState)),ii(4,ge(B.MainframeProgramsState)),ii(5,ge(B.MessageLogState)),ii(6,ge(B.Formatter))],xh);var AI=Object.defineProperty,EI=Object.getOwnPropertyDescriptor,TI=(t,e,r,i)=>{for(var s=i>1?void 0:i?EI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&AI(e,r,s),s};let Ph=class{constructor(){this._moneyShare=Ue.defaultAutomationSettings.mainframeHardwareAutobuyer.moneyShare}get moneyShare(){return this._moneyShare}set moneyShare(t){Kg(t)&&(this._moneyShare=t)}async startNewState(){this._moneyShare=Ue.defaultAutomationSettings.mainframeHardwareAutobuyer.moneyShare}async deserialize(t){this._moneyShare=t.moneyShare}serialize(){return{moneyShare:this._moneyShare}}};Ph=TI([It()],Ph);var OI=Object.defineProperty,$I=Object.getOwnPropertyDescriptor,DI=(t,e,r,i)=>{for(var s=i>1?void 0:i?$I(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&OI(e,r,s),s};let Ch=class{constructor(){this._moneyShare=Ue.defaultAutomationSettings.mainframeProgramsAutobuyer.moneyShare}get moneyShare(){return this._moneyShare}set moneyShare(t){Kg(t)&&(this._moneyShare=t)}async startNewState(){this._moneyShare=Ue.defaultAutomationSettings.mainframeProgramsAutobuyer.moneyShare}async deserialize(t){this._moneyShare=t.moneyShare}serialize(){return{moneyShare:this._moneyShare}}};Ch=DI([It()],Ch);const Co={UPDATED_NOTIFICATIONS:Symbol("UPDATED_NOTIFICATIONS")};var II=Object.defineProperty,RI=Object.getOwnPropertyDescriptor,kI=(t,e,r,i)=>{for(var s=i>1?void 0:i?RI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&II(e,r,s),s},Om=(t,e)=>(r,i)=>e(r,i,t);let Ah=class{constructor(t,e){this._stateUiConnector=t,this._settingsState=e,this._notifications=[],this.uiEventBatcher=new At,this._stateUiConnector.registerEventEmitter(this)}pushNotification(t,e){this._settingsState.isNotificationTypeEnabled(t)&&(this._notifications.push({notificationType:t,parameters:e}),this.uiEventBatcher.enqueueEvent(Co.UPDATED_NOTIFICATIONS))}getUnreadNotification(){for(this._stateUiConnector.connectEventHandler(this,Co.UPDATED_NOTIFICATIONS);this.hasUnreadNotifications();){const t=this._notifications[0];if(this._settingsState.isNotificationTypeEnabled(t.notificationType))return t;this._notifications.shift()}}hasUnreadNotifications(){return this._stateUiConnector.connectEventHandler(this,Co.UPDATED_NOTIFICATIONS),this._notifications.length>0}popUnreadNotification(){this.hasUnreadNotifications()&&(this._notifications.shift(),this.uiEventBatcher.enqueueEvent(Co.UPDATED_NOTIFICATIONS))}};Ah=kI([It(),Om(0,ge(B.StateUIConnector)),Om(1,ge(B.SettingsState))],Ah);var NI=Object.defineProperty,LI=Object.getOwnPropertyDescriptor,MI=(t,e,r,i)=>{for(var s=i>1?void 0:i?LI(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(s=(i?l(e,r,s):l(s))||s);return i&&s&&NI(e,r,s),s},FI=(t,e)=>(r,i)=>e(r,i,t);const UI=[{units:24*60*60*1e3},{units:60*60*1e3},{units:60*1e3},{units:1e3}],zI={0:"I",1:"II",2:"III",3:"IV",4:"V",5:"VI",6:"VII"};let Eh=class{constructor(t){this.updateBuiltInFormatters=()=>{this._decimalBuiltInFormatter=new Intl.NumberFormat(this._settingsState.language,{maximumFractionDigits:0}),this._floatBuiltInFormatter=new Intl.NumberFormat(this._settingsState.language,{minimumFractionDigits:2,maximumFractionDigits:2})},this._settingsState=t,this._decimalBuiltInFormatter=new Intl.NumberFormat(navigator.language,{maximumFractionDigits:0}),this._floatBuiltInFormatter=new Intl.NumberFormat(navigator.language,{minimumFractionDigits:2,maximumFractionDigits:2}),ct.on("languageChanged",this.updateBuiltInFormatters)}formatTimeShort(t){let e=t;const r=[];for(const{units:i}of UI){const s=Math.floor(e/i);e=e-s*i,r.push(s.toString().padStart(2,"0"))}return r.join(":")}formatNumberFloat(t){return this._floatBuiltInFormatter.format(t)}formatNumberDecimal(t){return this._decimalBuiltInFormatter.format(t)}formatNumberLong(t){switch(this._settingsState.longNumberFormat){case jo.builtIn:return this.formatNumberFloat(t);case jo.scientific:return this.formatNumberExponential(t)}}formatQuality(t){return t<0?"0-":t>6?"VII+":zI[t]}formatNumberExponential(t){return t.toExponential(2)}};Eh=MI([It(),FI(0,ge(B.SettingsState))],Eh);Ee.bind(B.StateUIConnector).to(gh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.App).to(vh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.AppState).to(bh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.GlobalState).to(jr).inSingletonScope().whenTargetIsDefault();Ee.bind(B.ScenarioState).to(yh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.SettingsState).to(hl).inSingletonScope().whenTargetIsDefault();Ee.bind(B.CityState).to(_h).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MessageLogState).to(wh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.NotificationsState).to(Ah).inSingletonScope().whenTargetIsDefault();Ee.bind(B.ProgramFactory).to(ar).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MainframeHardwareState).to(dl).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MainframeProgramsState).to(Sh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MainframeProcessesState).to(xh).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MainframeHardwareAutomationState).to(Ph).inSingletonScope().whenTargetIsDefault();Ee.bind(B.MainframeProgramsAutomationState).to(Ch).inSingletonScope().whenTargetIsDefault();Ee.bind(B.Formatter).to(Eh).inSingletonScope().whenTargetIsDefault();_u("/cyberiada/shoelace");window.i18next=ct;ct.init({resources:nx,fallbackLng:"en",debug:!1}).then(()=>{const t=document.createElement("ca-app-root");document.getElementById("root").append(t)}).catch(t=>{console.error(t)});
