/*! sign by h5 */
webpackJsonp([36],{Jyqb:function(t,e,i){"use strict";function a(t){i("WSiO")}var n={props:["title"],data:function(){return{}},methods:{goback:function(){if("开奖走势"==this.title)return this.$router.push("/plays/tradition/"+this.$route.query.id),!1;this.$router.go(-1),this.$loading(!1)}}},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[i("span",{staticClass:"mh5-back",on:{click:t.goback}}),t._v(" "),i("span",[t._v(t._s(t.title))])])},s=[],o={render:r,staticRenderFns:s},l=o,c=i("VU/8"),u=a,f=c(n,l,!1,u,"data-v-110b8a86",null);e.a=f.exports},N7QS:function(t,e,i){"use strict";function a(t){i("TUXm")}Object.defineProperty(e,"__esModule",{value:!0});var n=i("Jyqb"),r={data:function(){return{title:null}},components:{vpPubHeader:n.a},computed:{depositTitle:function(){return JSON.parse(localStorage.paylist)}},destroyed:function(){delete localStorage.bankData},watch:{$route:{handler:function(t,e){this.setTitle(t)},deep:!0,immediate:!0}},methods:{setTitle:function(t){if(t.query.id){if("/personal_index/bank_account"==t.path)return this.title="银行信息",!1;var e=this.depositTitle.filter(function(e){return e.id==t.query.id})[0];this.title=e.className}else"修改密码"==t.name?"0"==t.params.id?this.title="修改登陆密码":this.title="修改资金密码":"转账帮助"==t.name?"wechat"==t.params.name?this.title="微信转银行卡":this.title="支付宝转银行卡":this.title=t.name}}},s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"personal-index"},[i("vp-pub-header",{attrs:{title:t.title}}),t._v(" "),i("router-view")],1)},o=[],l={render:s,staticRenderFns:o},c=l,u=i("VU/8"),f=a,d=u(r,c,!1,f,null,null);e.default=d.exports},TUXm:function(t,e,i){var a=i("fOvE");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("3118ff46",a,!0,{})},WSiO:function(t,e,i){var a=i("oMo+");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("5a5a9369",a,!0,{})},fOvE:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".personal-index{height:100%;background:#f8f8f8;overflow:hidden}",""])},"oMo+":function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,".header[data-v-110b8a86]{height:.88rem;background:-webkit-linear-gradient(left,#ff8e00,#ff5100);background:linear-gradient(90deg,#ff8e00,#ff5100);line-height:.88rem;text-align:center;color:#fff;font-size:.36rem;padding:0 .18rem;position:relative}.header .mh5-back[data-v-110b8a86]{position:absolute;left:.2rem}.header span[data-v-110b8a86]{font-weight:600}",""])}});