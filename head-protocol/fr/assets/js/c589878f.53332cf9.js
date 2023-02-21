"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[822],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return n?a.createElement(h,i(i({ref:t},l),{},{components:n})):a.createElement(h,i({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1371:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={slug:7,title:"7. Use with-pattern based component interfaces\n",authors:[],tags:["Accepted"]},i=void 0,c={permalink:"/head-protocol/fr/adr/7",source:"@site/adr/2021-06-11_007-with-pattern-component-interfaces.md",title:"7. Use with-pattern based component interfaces\n",description:"Status",date:"2021-06-11T00:00:00.000Z",formattedDate:"11 juin 2021",tags:[{label:"Accepted",permalink:"/head-protocol/fr/adr/tags/accepted"}],readingTime:1.17,truncated:!1,authors:[],frontMatter:{slug:"7",title:"7. Use with-pattern based component interfaces\n",authors:[],tags:["Accepted"]},prevItem:{title:"6. Network Broadcasts all messages\n",permalink:"/head-protocol/fr/adr/6"},nextItem:{title:"8. Custom Prelude\n",permalink:"/head-protocol/fr/adr/8"}},s={authorsImageUrls:[]},p=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],l={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"status"},"Status"),(0,r.kt)("p",null,"Accepted"),(0,r.kt)("h2",{id:"context"},"Context"),(0,r.kt)("p",null,"The ",(0,r.kt)("em",{parentName:"p"},"with pattern")," or ",(0,r.kt)("em",{parentName:"p"},"bracket pattern")," is a functional programming idiom, a\nparticular instance of ",(0,r.kt)("em",{parentName:"p"},"Continuation-Passing Style"),', whereby one component that\ncontrols some resource that is consumed by another component of the system, is\ncreated via a function that takes as argument a function consuming the resource,\ninstead of returning it. This pattern allows safe reclaiming of resources when\nthe "wrapped" action terminates, whether normally or unexpectedly.'),(0,r.kt)("p",null,'TODO "Tying the knot"'),(0,r.kt)("h2",{id:"decision"},"Decision"),(0,r.kt)("p",null,"We use this pattern to provide interfaces to all ",(0,r.kt)("em",{parentName:"p"},"active components"),", which\nexchange messages with other components of the system. A prototypical signature\nof such a component could be:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-hs"},"type Component m = inmsg -> m ()\ntype Callback m = outmsg -> m ()\n\nwithXXX :: Callback m -> (Component m -> m a) -> m a\n")),(0,r.kt)("p",null,"Note that ",(0,r.kt)("inlineCode",{parentName:"p"},"withXXX")," can also allocate resources in order to provide ",(0,r.kt)("inlineCode",{parentName:"p"},"Component"),"\nor use the ",(0,r.kt)("inlineCode",{parentName:"p"},"Callback"),", e.g. fork threads which invoke ",(0,r.kt)("inlineCode",{parentName:"p"},"Callback"),", but also make\nsure they are cleaned up."),(0,r.kt)("h2",{id:"consequences"},"Consequences"),(0,r.kt)("p",null,'Components can be layered on top of another to provide additional behavior given the same interface. This also similar to "decorating" in the object-orientation world.'),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"Component")," is agnostic about the messages it consumes/produces, it can be defined as a ",(0,r.kt)("a",{parentName:"p",href:"https://hackage.haskell.org/package/base-4.15.0.0/docs/Data-Functor-Contravariant.html"},(0,r.kt)("inlineCode",{parentName:"a"},"Contravariant")," functor")," and the ",(0,r.kt)("inlineCode",{parentName:"p"},"Callback")," part as a (covariant) ",(0,r.kt)("inlineCode",{parentName:"p"},"Functor"),". This makes it possible to use ",(0,r.kt)("inlineCode",{parentName:"p"},"map")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"contramap")," operations to transform messages."))}m.isMDXComponent=!0}}]);