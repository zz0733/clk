/*! sign by h5 */
webpackJsonp([49],{"2h7q":function(t,e,a){var n=a("8TaQ");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("5a68b7b4",n,!0,{})},"8TaQ":function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".main-wrap[data-v-6a9b88a1]{height:100%;overflow:hidden;background:#fff}",""])},"nF/t":function(t,e,a){"use strict";function n(t){a("2h7q")}Object.defineProperty(e,"__esModule",{value:!0});var r,o=a("bOdI"),c=a.n(o),s=a("Xxa5"),i=a.n(s),u=a("exGp"),f=a.n(u),l=(r={data:function(){return{activeDate:"start"}},methods:{}},c()(r,"methods",{setBalanceToLocal:function(){var t=this;return f()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(localStorage.token){e.next=2;break}return e.abrupt("return",!1);case 2:return e.next=4,t.$http.post(t.$HOST_NAME+"/member/setBalanceToLocal",{});case 4:a=e.sent,a&&a.code;case 6:case"end":return e.stop()}},e,t)}))()}}),c()(r,"created",function(){this.setBalanceToLocal()}),c()(r,"components",{}),c()(r,"watch",{$route:function(){this.activeDate=(new Date).getTime()}}),r),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-wrap"},[a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("router-view",{key:t.activeDate})],1)],1)},p=[],h={render:d,staticRenderFns:p},v=h,m=a("VU/8"),b=n,w=m(l,v,!1,b,"data-v-6a9b88a1",null);e.default=w.exports}});