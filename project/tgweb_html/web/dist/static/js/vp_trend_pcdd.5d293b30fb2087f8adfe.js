/*! This file is created by qianduan */
webpackJsonp([17],{"5zde":function(t,e,n){n("zQR9"),n("qyJz"),t.exports=n("FeBl").Array.from},Gu7T:function(t,e,n){"use strict";e.__esModule=!0;var a=n("c/Tr"),r=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,r.default)(t)}},TsW1:function(t,e,n){var a=n("tuYQ");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("0297c92e",a,!0,{})},"c/Tr":function(t,e,n){t.exports={default:n("5zde"),__esModule:!0}},cTF2:function(t,e,n){"use strict";function a(t){n("TsW1")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),i=n.n(r),d=n("Gu7T"),s=n.n(d),l=n("RRo+"),o=n.n(l),c=n("exGp"),p=n.n(c),v=n("YtJ0"),b={data:function(){return{isLoading:!1,titleLeft:["第一球","第二球","第三球","和值","大小","单双","色波"],titleRight:["和值"],resultBallLength:1,ballLength:28,periodsNum:20,canvas:{left:0,top:0,width:0,height:0,color:"#029BAE"},checkDatas:[{name:"折线显示",staue:!0},{name:"遗漏显示",staue:!0}],issueDatas:{name:"最近20期"},drawDeclList:[],allDatas:{},newDatas:{leftDatas:{newIssue:"",newResult:"",newSingle:"",newTimeArr:""},total:"",continuous:"",forget:"",lotteryId:""}}},methods:{drawPicFc:function(t,e,n,a){return!1},drawCanvasPic:function(){var t=this;this.drawDeclList.forEach(function(e,n){t.canvas.color=n%2==0?"#029BAE":"#FF5151";var a=t.$refs["trendCanvas"+(n+1)],r=t.$refs["postBall"+(n+1)],i=[];a[0].style.display="none",e.list.forEach(function(t,e){t.ballList.forEach(function(t,n){t.row=e+3,t.posit=n+1,t.staue&&i.push(t)})}),i.forEach(function(e,n){var r="";if(n>0){if(r=i[n].posit-i[n-1].posit,t.canvas.width=30*Math.abs(r),t.canvas.height=30,a[n].width=t.canvas.width,a[n].height=t.canvas.height,r>0){t.canvas.top=30*(e.row-1)-15,a[n].style.top=t.canvas.top+"px",t.canvas.left=30*(e.posit-1)-t.canvas.width+15,a[n].style.left=t.canvas.left+"px";var d=a[n].getContext("2d");d.beginPath(),d.strokeStyle=t.canvas.color,d.lineWidth=2,d.moveTo(0,0),d.lineTo(t.canvas.width,t.canvas.height),d.stroke()}if(r<0){t.canvas.top=30*(e.row-1)-15,a[n].style.top=t.canvas.top+"px",t.canvas.left=30*(e.posit-1)+15,a[n].style.left=t.canvas.left+"px";var s=a[n].getContext("2d");s.beginPath(),s.strokeStyle=t.canvas.color,s.lineWidth=2,s.moveTo(0,t.canvas.height),s.lineTo(t.canvas.width,0),s.stroke()}if(0==r){t.canvas.height=30,t.canvas.width=30,a[n].width=t.canvas.width,a[n].height=t.canvas.height,t.canvas.top=30*e.row-45,a[n].style.top=t.canvas.top+"px",t.canvas.left=30*(e.posit-1),a[n].style.left=t.canvas.left+"px";var l=a[n].getContext("2d");l.beginPath(),l.strokeStyle=t.canvas.color,l.lineWidth=2,l.moveTo(.5*t.canvas.width,0),l.lineTo(.5*t.canvas.width,t.canvas.height),l.stroke()}}}),i.forEach(function(t,e){r[e].style.top=30*(t.row-1)+4+"px",r[e].style.left=30*(t.posit-1)+4+"px"})})},checkFc:function(t){t.staue=!t.staue},issueFc:function(t,e){this.issueDatas.name=t,this.periodsNum=e,this.getHisDatas()},getHisDatas:function(){var t=this;return p()(i.a.mark(function e(){var n,a,r,d,l;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.isLoading=!0,n=t.$route.fullPath.split("/"),t.lotteryId=1*n.filter(function(t){return o()(1*t)&&""!==t})[0],e.next=5,t.$http.post(t.$HOST_NAME+"/lottery/trend",{lotteryId:t.lotteryId,pageSize:t.periodsNum});case 5:if(!(a=e.sent)||200!=a.code){e.next=30;break}if(a.data.data.list){e.next=10;break}return alert("暂无数据"),e.abrupt("return",!1);case 10:for(t.isLoading=!1,t.$refs.contentWrap&&(t.$refs.contentWrap.style.display="block"),t.newDatas.leftDatas.newIssue=[],t.newDatas.leftDatas.newResult=[],t.newDatas.leftDatas.newSingle=[],t.newDatas.leftDatas.newTimeArr=[],t.newDatas.total=[],t.newDatas.continuous=[],t.newDatas.forget=[],r=[{index:0,name:"dyq"},{index:1,name:"deq"},{index:2,name:"dsq"},{index:3,name:"hz"},{index:4,name:"dx"},{index:5,name:"ds"},{index:6,name:"sb"}],t.drawDeclList=[],d=a.data.data.gather.listunm,a.data.data.gather.total.forEach(function(e){t.newDatas.total=[].concat(s()(t.newDatas.total),s()(e))}),a.data.data.gather.continuous.forEach(function(e){t.newDatas.continuous=[].concat(s()(t.newDatas.continuous),s()(e))}),a.data.data.gather.forget.forEach(function(e){t.newDatas.forget=[].concat(s()(t.newDatas.forget),s()(e))}),l=0;l<t.resultBallLength;l++)t.drawDeclList.push({title:t.titleRight[l],list:[]});a.data.data.list.forEach(function(e){var n=[];for(var a in e)!function(a){switch(a){case"issue":t.newDatas.leftDatas.newIssue.push(e.issue);break;case"resultInfo":t.newDatas.leftDatas.newResult.push(e.resultInfo.split(","));break;case"openingTime":t.newDatas.leftDatas.newTimeArr.push(t.getTime(1e3*e.openingTime));break;default:r.forEach(function(t){t.name===a&&(n[t.index]=e[a])})}}(a);t.newDatas.leftDatas.newSingle.push(n);for(var i=0;i<t.resultBallLength;i++)!function(n){for(var a=[],r=0;r<t.ballLength;r++)a.push({ball:r,staue:!1,lost:d[e.issue][n][r]});a.forEach(function(r,i){i==parseInt(e.resultInfo.split(",")[0])+parseInt(e.resultInfo.split(",")[1])+parseInt(e.resultInfo.split(",")[2])&&(r.staue=!0,t.drawDeclList[n].list.push({ballList:a,activeBall:i}))})}(i)}),t.$nextTick(function(){t.drawCanvasPic()}),e.next=31;break;case 30:alert("获取开奖记录数据出错！！");case 31:case"end":return e.stop()}},e,t)}))()},translateObj:function(t){var e=[];for(var n in t)e.push([t[n],n]);return e.reverse(),e}},created:function(){this.childNeed&&this.getHisDatas()},mounted:function(){},computed:{childNeed:function(){return this.$store.state.lottery.childNeed}},watch:{childNeed:{handler:function(t,e){e||this.getHisDatas(),e&&t.className==e.className&&this.getHisDatas()},deep:!0}},store:v.a},f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"vp-lottery-trend-content"},[t.isLoading?n("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),n("div",{ref:"contentWrap",staticStyle:{display:"none"}},[n("div",{staticClass:"trend-toggle"},[n("span",{staticClass:"name"},[t._v(t._s(t.childNeed.name))]),t._v(" "),n("span",{staticClass:"check"},t._l(t.checkDatas,function(e,a){return n("label",{key:a,attrs:{for:""}},[n("span",{staticClass:"check-ico",class:{active:e.staue},on:{click:function(n){t.checkFc(e)}}}),t._v(" "),n("span",{staticClass:"check-name"},[t._v(t._s(e.name))])])})),t._v(" "),n("span",{staticClass:"issue"},[n("span",{staticClass:"periodbtn",class:{active:"最近20期"==t.issueDatas.name},on:{click:function(e){t.issueFc("最近20期",20)}}},[t._v("最近20期")]),t._v(" "),n("span",{staticClass:"periodbtn",class:{active:"最近30期"==t.issueDatas.name},on:{click:function(e){t.issueFc("最近30期",30)}}},[t._v("最近30期")]),t._v(" "),n("span",{staticClass:"periodbtn",class:{active:"最近50期"==t.issueDatas.name},on:{click:function(e){t.issueFc("最近50期",50)}}},[t._v("最近50期")]),t._v(" "),n("span",{staticClass:"periodbtn",class:{active:"最近100期"==t.issueDatas.name},on:{click:function(e){t.issueFc("最近100期",100)}}},[t._v("最近100期")])])]),t._v(" "),n("div",{staticClass:"trend-table-wrapper"},[n("div",{staticClass:"trend-table-inner"},[n("div",{staticClass:"trend-left-box"},[n("div",{staticClass:"trend-left-box-top"},[n("div",{staticClass:"td-issue"},[n("div",{staticClass:"left-title"},[t._v("期号")]),t._v(" "),t._l(t.newDatas.leftDatas.newIssue,function(e,a){return n("div",{key:a,staticClass:"issue-number"},[t._v("\n                  "+t._s(2==t.lotteryId||10==t.lotteryId?e:e.toString().substring(4,e.length))+"\n                ")])})],2),t._v(" "),n("div",{staticClass:"td-issue"},[n("div",{staticClass:"left-title"},[t._v("开奖时间")]),t._v(" "),t._l(t.newDatas.leftDatas.newTimeArr,function(e,a){return n("div",{key:a,staticClass:"issue-number"},[t._v("\n                  "+t._s(e)+"\n                ")])})],2),t._v(" "),n("div",{staticClass:"td-lottery-number"},[n("div",{staticClass:"left-title"},[t._v("开奖号")]),t._v(" "),n("div",{staticClass:"td-lottery-number-item"},t._l(t.newDatas.leftDatas.newResult,function(e,a){return n("div",{key:a,staticClass:"lottery-number"},t._l(e,function(e,a){return n("div",{key:a,staticClass:"left-td-ball"},[n("label",{attrs:{for:""}},[n("span",[t._v(t._s(e))])])])}))}))]),t._v(" "),n("div",{staticClass:"td-lottery-wide"},[n("div",{staticClass:"left-title"},t._l(t.titleLeft,function(e,a){return n("div",{key:a,staticClass:"td-lottery-wide-title"},[t._v(t._s(e))])})),t._v(" "),t._l(t.newDatas.leftDatas.newSingle,function(e,a){return n("div",{key:a,staticClass:"wide-wrap"},[n("div",{staticClass:"wide-inner-wrap"},t._l(e,function(e,a){return n("div",{key:a,staticClass:"item",class:{active:"大"==e||"单"==e}},[t._v(t._s(e)+"\n                    ")])}))])})],2)]),t._v(" "),t._m(0)]),t._v(" "),n("div",{staticClass:"trend-center-box"},[n("div",{staticClass:"trend-center-canvas-list"},t._l(t.drawDeclList,function(e,a){return n("div",{key:a,staticClass:"vp-lottery-trend-cavans"},[n("div",{staticClass:"trend-cavans-title"},[n("div",{staticClass:"t1"},[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"t2"},t._l(t.ballLength,function(e,a){return n("div",{key:a},[t._v(t._s(a))])}))]),t._v(" "),n("div",{staticClass:"trend-out-box"},t._l(e.list,function(e,r){return n("div",{key:r,staticClass:"row"},t._l(e.ballList,function(e,i){return n("div",{key:i,on:{click:function(n){t.drawPicFc(e,a,r,i)}}},[n("span",[t._v(t._s(t.checkDatas[1].staue?e.lost:""))])])}))})),t._v(" "),t._l(e.list,function(e,r){return n("canvas",{directives:[{name:"show",rawName:"v-show",value:t.checkDatas[0].staue,expression:"checkDatas[0].staue"}],key:r,ref:"trendCanvas"+(a+1),refInFor:!0})}),t._v(" "),n("div",{staticClass:"refBall-list"},t._l(e.list,function(e,r){return n("div",{key:r,ref:"postBall"+(a+1),refInFor:!0,class:{active:a%2!=0}},[n("span",[t._v("\n                                          "+t._s(e.activeBall)+"\n                                      ")])])}))],2)})),t._v(" "),n("div",{staticClass:"statistics-item"},t._l(t.newDatas.total,function(e,a){return n("div",{key:a},[t._v(t._s(e))])})),t._v(" "),n("div",{staticClass:"statistics-item"},t._l(t.newDatas.continuous,function(e,a){return n("div",{key:a},[t._v(t._s(e))])})),t._v(" "),n("div",{staticClass:"statistics-item"},t._l(t.newDatas.forget,function(e,a){return n("div",{key:a},[t._v(t._s(e))])}))])])])])],1)])},u=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"trend-statistics"},[n("div",[t._v("出现总次数")]),t._v(" "),n("div",[t._v("最大连出值")]),t._v(" "),n("div",[t._v("最大遗漏值")])])}],x={render:f,staticRenderFns:u},h=x,g=n("VU/8"),w=a,y=g(b,h,!1,w,"data-v-124e587b",null);e.default=y.exports},fBQ2:function(t,e,n){"use strict";var a=n("evD5"),r=n("X8DO");t.exports=function(t,e,n){e in t?a.f(t,e,r(0,n)):t[e]=n}},qyJz:function(t,e,n){"use strict";var a=n("+ZMJ"),r=n("kM2E"),i=n("sB3e"),d=n("msXi"),s=n("Mhyx"),l=n("QRG4"),o=n("fBQ2"),c=n("3fs2");r(r.S+r.F*!n("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,r,p,v=i(t),b="function"==typeof this?this:Array,f=arguments.length,u=f>1?arguments[1]:void 0,x=void 0!==u,h=0,g=c(v);if(x&&(u=a(u,f>2?arguments[2]:void 0,2)),void 0==g||b==Array&&s(g))for(e=l(v.length),n=new b(e);e>h;h++)o(n,h,x?u(v[h],h):v[h]);else for(p=g.call(v),n=new b;!(r=p.next()).done;h++)o(n,h,x?d(p,u,[r.value,h],!0):r.value);return n.length=h,n}})},tuYQ:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,'.vp-lottery-trend-content[data-v-124e587b]{padding-top:54px;font-size:15px;text-align:center;background:#f8f6f7}.vp-lottery-trend-content .ivu-spin-fix[data-v-124e587b]{position:fixed}.vp-lottery-trend-content .trend-toggle[data-v-124e587b]{min-width:800px;position:fixed;z-index:99;width:100%;height:56px;line-height:56px;text-align:center;background:#f8f6f7}.vp-lottery-trend-content .trend-toggle .name[data-v-124e587b]{color:#ff5151;margin-right:23px}.vp-lottery-trend-content .trend-toggle .check label[data-v-124e587b]{display:inline-block;margin:0 3px 0 16px}.vp-lottery-trend-content .trend-toggle .check label .check-ico[data-v-124e587b]{width:17px;height:17px;vertical-align:text-top;display:inline-block;cursor:pointer;border:1px solid gray;background:#f5f5f5}.vp-lottery-trend-content .trend-toggle .check label .check-ico.active[data-v-124e587b]{border:0;background:url("/static/public/image/lottery/trend/vp-trend-true-bg.png") #ff5151 50% no-repeat}.vp-lottery-trend-content .trend-toggle .check label .check-name[data-v-124e587b]{padding-left:3px}.vp-lottery-trend-content .trend-toggle .issue[data-v-124e587b]{padding-left:30px}.vp-lottery-trend-content .trend-toggle .issue .periodbtn[data-v-124e587b]{cursor:pointer;border:1px solid #dadada;border-radius:4px;padding:3px 8px;margin-right:8px}.vp-lottery-trend-content .trend-toggle .issue .periodbtn.active[data-v-124e587b]{background-color:#ff5151;color:#fff;border-color:#ff5151}.vp-lottery-trend-content .trend-table-wrapper[data-v-124e587b]{margin-top:56px;display:inline-block;height:calc(100vh - 175px);text-align:center;color:#515151;overflow-y:auto;overflow-x:hidden;cursor:default;padding-right:4px}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner[data-v-124e587b]{background-color:#f8f6f7;border:1px solid #ddd;border-right:0;border-bottom:0;display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .left-title[data-v-124e587b]{border-right:1px solid #ddd;border-bottom:1px solid #ddd;height:60px;line-height:60px;min-width:30px;white-space:nowrap;text-align:center;background:#f1edea}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .left-title span[data-v-124e587b]{border-right:1px solid #ddd}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .left-title span[data-v-124e587b]:last-child{border-right:none}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .left-td-ball[data-v-124e587b]{border-right:1px solid #ddd;border-bottom:1px solid #ddd;height:30px;line-height:30px;min-width:30px;text-align:center}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-issue .issue-number[data-v-124e587b]{border-right:1px solid #ddd;border-bottom:1px solid #ddd;padding-left:15px;padding-right:15px;line-height:30px;height:30px;white-space:nowrap}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-number .td-lottery-number-item[data-v-124e587b]{font-size:12px}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-number .lottery-number[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-number .lottery-number div label[data-v-124e587b]{display:inline-block;border-radius:50%;width:20px;height:20px;line-height:20px;text-align:center;background:#ff5151;color:#fff}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .left-title[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .left-title .td-lottery-wide-title[data-v-124e587b]{-ms-flex:1;flex:1;border-right:1px solid #ddd}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .left-title .td-lottery-wide-title[data-v-124e587b]:last-child{border-right:0}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .wide-wrap .wide-inner-wrap[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .wide-wrap .wide-inner-wrap .item[data-v-124e587b]{width:60px;-ms-flex:1;flex:1;height:30px;border-right:1px solid #ddd;border-bottom:1px solid #ddd;line-height:30px;white-space:nowrap;text-align:center}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-left-box-top .td-lottery-wide .wide-wrap .wide-inner-wrap .item.active[data-v-124e587b]{color:#ff5151}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-left-box .trend-statistics div[data-v-124e587b]{border-right:1px solid #ddd;border-bottom:1px solid #ddd;line-height:30px;height:30px;text-align:center}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans[data-v-124e587b]{position:relative}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-cavans-title[data-v-124e587b]{text-align:center;border-bottom:1px solid #ddd;height:60px;background:#f1edea}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-cavans-title .t1[data-v-124e587b]{line-height:30px;height:30px;border-bottom:1px solid #ddd;border-right:1px solid #ddd}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-cavans-title .t2[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-cavans-title .t2 div[data-v-124e587b]{height:30px;width:30px;line-height:30px;border-right:1px solid #ddd;border-bottom:1px solid #ddd}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-out-box[data-v-124e587b]{background:#f9faea}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-out-box .row[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-out-box .row div[data-v-124e587b]{width:30px;height:30px;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;line-height:30px}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-out-box .row div span[data-v-124e587b]{display:inline-block;width:20px;height:20px;line-height:20px}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .trend-out-box .row div.active span[data-v-124e587b]{border-radius:50%;background:#029bae;border:1px solid #029bae;color:#fff}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans canvas[data-v-124e587b]{position:absolute}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .refBall-list div[data-v-124e587b]{position:absolute;display:inline-block;width:22px;height:22px;line-height:22px;border-radius:50%;background:#029bae;border:1px solid #029bae;color:#fff}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .trend-center-canvas-list .vp-lottery-trend-cavans .refBall-list div.active[data-v-124e587b]{background:#ff5151;border:1px solid #ff5151}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .statistics-item[data-v-124e587b]{display:-ms-flexbox;display:flex}.vp-lottery-trend-content .trend-table-wrapper .trend-table-inner .trend-center-box .statistics-item div[data-v-124e587b]{width:30px;height:30px;line-height:30px;text-align:center;border-bottom:1px solid #ddd;border-right:1px solid #ddd}',""])}});