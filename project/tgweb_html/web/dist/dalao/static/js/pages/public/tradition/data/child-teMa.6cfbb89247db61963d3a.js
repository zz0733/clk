/*! This file is created by qianduan */
webpackJsonp([108],{29:function(i,t,s){s("j1ja"),i.exports=s("NEzU")},NEzU:function(i,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("Xxa5"),a=s.n(n),e=s("exGp"),c=s.n(e),o={props:{animalList:{type:Object}},data:function(){return{}},methods:{navSelectFc:function(i){this.navSelect=i.title,this.resetAllAdd(),this.getOdds()},rightFastAnimaFc:function(i){if(!this.isopen)return!1;i.active=!i.active,this.checkAnima(i)},rightFastHalfFc:function(i){if(!this.isopen)return!1;this.active.rightFastHalf=i,this.checkHalf(i)},getAnimaNum:function(){var i=this;return c()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i.animaList=i.animalList,i.animNumBelong();case 2:case"end":return t.stop()}},t,i)}))()},animNumBelong:function(){var i=this;return c()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i.listTop.forEach(function(t){t&&t.mess.forEach(function(t){i.animaList["鼠"].includes(+t.ball)?t.animal="鼠":i.animaList["牛"].includes(+t.ball)?t.animal="牛":i.animaList["虎"].includes(+t.ball)?t.animal="虎":i.animaList["兔"].includes(+t.ball)?t.animal="兔":i.animaList["龙"].includes(+t.ball)?t.animal="龙":i.animaList["蛇"].includes(+t.ball)?t.animal="蛇":i.animaList["马"].includes(+t.ball)?t.animal="马":i.animaList["羊"].includes(+t.ball)?t.animal="羊":i.animaList["猴"].includes(+t.ball)?t.animal="猴":i.animaList["鸡"].includes(+t.ball)?t.animal="鸡":i.animaList["狗"].includes(+t.ball)?t.animal="狗":i.animaList["猪"].includes(+t.ball)&&(t.animal="猪")})});case 1:case"end":return t.stop()}},t,i)}))()},checkBoSe:function(i){if(!this.isopen)return!1;this.resetAll(),"红大"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball>=25&&i&&"红"==i.boSe&&(i.active=!0)})}):"红小"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball<25&&i&&"红"==i.boSe&&(i.active=!0)})}):"红单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2!=0&&i&&"红"==i.boSe&&(i.active=!0)})}):"红双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2==0&&i&&"红"==i.boSe&&(i.active=!0)})}):"红合单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"单"==i.he&&i&&"红"==i.boSe&&(i.active=!0)})}):"红合双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"双"==i.he&&i&&"红"==i.boSe&&(i.active=!0)})}):"绿大"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball>=25&&i&&"绿"==i.boSe&&(i.active=!0)})}):"绿小"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball<25&&i&&"绿"==i.boSe&&(i.active=!0)})}):"绿单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2!=0&&i&&"绿"==i.boSe&&(i.active=!0)})}):"绿双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2==0&&i&&"绿"==i.boSe&&(i.active=!0)})}):"绿合单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"单"==i.he&&i&&"绿"==i.boSe&&(i.active=!0)})}):"绿合双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"双"==i.he&&i&&"绿"==i.boSe&&(i.active=!0)})}):"蓝大"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball>=25&&i&&"蓝"==i.boSe&&(i.active=!0)})}):"蓝小"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball<25&&i&&"蓝"==i.boSe&&(i.active=!0)})}):"蓝单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2!=0&&i&&"蓝"==i.boSe&&(i.active=!0)})}):"蓝双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2==0&&i&&"蓝"==i.boSe&&(i.active=!0)})}):"蓝合单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"单"==i.he&&i&&"蓝"==i.boSe&&(i.active=!0)})}):"蓝合双"==i&&this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){"双"==i.he&&i&&"蓝"==i.boSe&&(i.active=!0)})})},checkHalf:function(i){this.resetAll(),"单"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2!=0&&(i.active=!0)})}):"双"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball%2==0&&(i.active=!0)})}):"大"==i?this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball>=25&&(i.active=!0)})}):"小"==i&&this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){+i.ball<25&&(i.active=!0)})})},checkAnima:function(i){if(!this.isopen)return!1;this.listTop.forEach(function(t,s){t.mess&&t.mess.forEach(function(t,s){i.title==t.animal&&(t.active=!t.active)})})},resetAllAdd:function(){this.listTop.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){i.active=!1,i.model=""})}),this.listBot.forEach(function(i,t){i.mess&&i.mess.forEach(function(i,t){i.active=!1,i.model=""})}),this.submitList=[],this.totalCount={number:0,total:0},this.listRigTemaAnima.forEach(function(i){i.active=!1}),this.active.rightFastHalf="",this.temaType="",this.seletPriceStaue="",this.saveSelectMoney.money="",this.selectFast.list.forEach(function(i,t){i.active=!1}),this.totalCount.number=0,this.totalCount.total=0},review:function(){if(!this.isopen)return!1;var i=[];this.listTop.forEach(function(t,s){t.mess&&t.mess.forEach(function(t,s){t.active&&t.model&&i.push(t)})}),this.listBot.forEach(function(t,s){t.mess&&t.mess.forEach(function(t,s){t.active&&t.model&&i.push(t)})}),this.publicReview(i)}},watch:{temaType:function(i){this.checkBoSe(i)},animalList:{handler:function(i,t){this.getAnimaNum()},deep:!0}}};t.default=o}},[29]);