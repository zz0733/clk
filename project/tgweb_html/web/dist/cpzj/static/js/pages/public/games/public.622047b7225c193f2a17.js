/*! This file is created by qianduan */
webpackJsonp([110],{24:function(e,t,a){a("j1ja"),e.exports=a("uoXM")},uoXM:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),o=a("pFYg"),i=a.n(o),s=a("exGp"),l=a.n(s),c={data:function(){return{token:localStorage.token,Public_User:localStorage.Public_User}},methods:{login:function(e){var t=this;return l()(r.a.mark(function a(){var n,o;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n=void 0,n=e.length?JSON.parse(e[0].special_setting):"object"==i()(e.special_setting)?e.special_setting:"string"==typeof e.special_setting?JSON.parse(e.special_setting):e,a.next=4,t.$http.post(t.$HOST_NAME+"/games/login",{gameName:n.gameName,userType:"test"==localStorage.Public_User?1:0,platform:n.platform,device:"pc"});case 4:o=a.sent,o&&200==o.code?window.location.href=o.data.url:alert(o.message);case 6:case"end":return a.stop()}},a,t)}))()},getItemId:function(e){var t=this;return l()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(localStorage.token&&localStorage.userinfo){a.next=3;break}return alert("未登录"),a.abrupt("return",!1);case 3:n=t.$router.resolve({path:"/loading",query:{name:e.name,classId:e.id,platform:e.platform}}),window.open(n.href,"newwindow","height=750,width=1285, top=0, left="+(window.screen.availWidth-1295)/2);case 6:case"end":return a.stop()}},a,t)}))()},trustLogin:function(e){if(!localStorage.token)return alert("未登录"),!1;var t=this.$router.resolve({path:"/loading",query:{platform:e.platform,gameName:e.gameName,name:e.name,login:!0}});window.open(t.href,"newwindow","height=750,width=1285, top=0, left="+(window.screen.availWidth-1295)/2)},loginGame:function(e){if(!localStorage.token||!localStorage.userinfo)return alert("未登录"),!1;var t=this.$router.resolve({path:"/loading",query:{name:e.name,platform:JSON.parse(e.special_setting).platform,gameName:JSON.parse(e.special_setting).gameName,login:!0}});window.open(t.href,"newwindow","height=750,width=1285, top=0, left="+(window.screen.availWidth-1295)/2)}},beforeDestroy:function(){}};t.default=c}},[24]);