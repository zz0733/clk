<template>
    <div class="new-home">

       <div class="container clearfloat">
           <!-- 左边 -->
            <div class="wrapL">
                  <!-- 左边导航 -->

              <div class="subnav_top">
                <ul>
                  <li @click="windowJump(item.url)" v-for="(item, index) in leftTopData" :key="index">
                    <span class="bg_url" :style="{'background':`url(${item.backgroundImg}) ${item.x} ${item.y} no-repeat`,'background-size':item.cover?'cover':''}"></span>
                    <span class="nav_item_title">{{item.title}}</span>
                    <span class="nav_item_desc">{{item.desc}}</span>
                  </li>
                </ul>
              </div>
              <div class="subnav_bottom">
                <div class="title" @click="windowJump('#/plays/hall')">
                  传统彩票
                </div>
                
                <ul class="clearfloat">
                  
                  <li  v-for="(item,key) in wraplCtData" :key="key">
                    <a :href="item.router" target="_blank" class="MustLogin">
                      <span  class="sortName">{{item.sortNmae}}</span>
                  
                    </a>
                  </li>
                </ul>
              </div>
               <!-- <div class="lotteryMenuTop clearfloat" v-show="false">
                     <div  :class="['ltbtn',{'active':(active==0)}]" @click="active=0">官方彩</div>
                     <div :class="['ltbtn',{'active':(active==1)},'ctbtn']" @click="active=1">传统彩</div>
                </div> -->

              <!--     <ul class="subnav" v-if="active==0">
                      <li  v-for="(item,key) in wraplData" :key="key">
                        <a :href="item.router" target="_blank" class="MustLogin">
                          <img :src="item.img" alt="">
                          <span  class="sortName">{{item.sortNmae}}</span>
                          <span  class="des">{{item.des}}</span>
                        </a>
                      </li>
                   </ul>

                    <ul  class="subnav" v-if="active==1">
                       <li  v-for="(item,key) in wraplCtData" :key="key">
                         <a :href="item.router" target="_blank" class="MustLogin">
                           <img :src="item.img" alt="">
                           <span  class="sortName">{{item.sortNmae}}</span>
                           <span  class="des">{{item.des}}</span>
                         </a>
                           </li>
                   </ul> -->
            </div>
            <!-- 中间 -->
            <div class="wrapC">
               <div class="banner">
                   <el-carousel :interval="2000" arrow="never" height="250px">
                    <el-carousel-item v-for="(item,i) in carouselData" :key="i">
                      <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                        <img :src="item.img" alt="">
                      </a>
                      <img :src="item.img" alt="" v-else>
                    </el-carousel-item>
                  </el-carousel>
               </div>
                <!-- <div class="autoTab">

                    <ul class="hd clearfloat">
                        <li :class="{on:hdActive==0}" @click="getResult({type:'k3',id:9});hdActive=0">江苏快３</li>
                        <li :class="{on:hdActive==1}" @click="getResult({type:'bjpk',id:2});hdActive=1">北京PK10</li>
                        <li :class="{on:hdActive==2}" @click="getResult({type:'kslhc',id:18});hdActive=2">快速六合彩</li>
                    </ul>
                    
                    <div class="bd" v-if="hdActive==0">
                          <div class="shaizi">
                            <label for="" :key="index" v-for="(item,index) in allReData[0].lastresultInfoArr">
                              <span  :class="'active'+item"></span><i v-if="index<2">+</i>
                            </label>
                            <i>=</i>
                            <em>{{allReData[0].total}}</em>
                          </div>

                          <div class="bd-text">
                              <p>
                                <span>当前期：第<i>{{allReData[0].lastissue}}</i>期</span>
                                <span>开奖号码：<i>{{allReData[0].lastresultInfo}}</i></span>
                                  <span >和值：<i>{{allReData[0].total}}</i></span> 
                                  <span>形态：<a class="valueType">{{allReData[0].lastluzhuArr[0]}}</a><a class="valueType">{{allReData[0].lastluzhuArr[1]}}</a>
                                  </span>
                            </p>
                          </div>     
                    </div>

                    <div class="bd" v-if="hdActive==1">
                      <div class="pk10 cqssc">
                          <div class="number clearfloat">
                              <em :class="'pkActive'+item" :key="index" v-for="(item,index) in allReData[1].lastresultInfoArr">{{item}}</em>
                          </div>
                          <a :href="allReData[1].router" target="_blank" class="mainColorBtn">立即投注</a>
                      </div>

                      <div class="bd-text">
                          <p>
                            <span>当前期：第<i>{{allReData[1].lastissue}}</i>期</span>
                            <span>开奖号码：<i>{{allReData[1].lastresultInfo}}</i></span>
                            
                        </p>
                      </div>     
                    </div>

                    <div class="bd" v-if="hdActive==2">
                      <div class="kslhc cqssc">
                          <div class="number clearfloat">
                              <em :class="{'Red':
                                +item==1||+item==7||
                                +item==13||+item==19||
                                +item==23||+item==29 ||
                                +item==35||+item==45||
                                +item==2||+item==8 ||
                                +item==12 ||+item==18||
                                +item==24||+item==30||
                                +item==34||+item==40||
                                +item==46,
                                'Blue':
                                +item==3||+item==9||
                                +item==15||+item==25||
                                +item==31||+item==37 ||
                                +item==41||+item==47||
                                +item==4||+item==10||
                                +item==14||+item==20||
                                +item==26||+item==36||
                                +item==42||+item==48,
                                'Green':
                                +item==5||+item==11||
                                +item==17||+item==21||
                                +item==27||+item==33||
                                +item==39||+item==43||
                                +item==6||+item==16||
                                +item==22||+item==28||
                                +item==32||+item==38||
                                +item==44||+item==49||
                                item=='?'                                                             
                                }" :key="index" v-for="(item,index) in allReData[2].lastresultInfoArr">{{item}}</em>
                          </div>
                          <a :href="allReData[2].router" target="_blank" class="mainColorBtn">立即投注</a>
                      </div>

                      <div class="bd-text">
                          <p>
                            <span>当前期：第<i>{{allReData[2].lastissue}}</i>期</span>
                            <span>开奖号码：<i>{{allReData[2].lastresultInfo}}</i></span>
                            
                        </p>
                      </div>      
                    </div>
                     
                </div> -->
                <div class="auto_tab">
                  <div class="tab">
                    <ul>
                      <li v-for="(item, index) in tabData">
                        <span>{{item.title}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="content">
                  
                  </div>
                </div>
            </div>
            <!-- 右边 -->
            <div class="wrapR">

                  <!-- 登录前 -->
                 <div class="login-after" v-if="!userinfo">
                       <a href="#/home/login">登录</a>
                       <a href="#/home/register">用户注册</a>
                 </div>
                  
                  <!-- 登陆后 -->
                  <div class="login-before" v-else>
                       <h3>欢迎您，{{userinfo.userName}}</h3>
                       <a class="loginout" @click="logout">
                         <em>退出</em>
                          <i class="el-icon-close"></i>
                       </a>
                  </div>


                  <div class="slide">
                      <h6>昨日奖金榜</h6>
                     <table>
                          <tr>
                               <td>
                                  <img src="../../../../static/500w/img/home/td1.jpg" alt="">
                                  <p >账号昵称：<span >逆***</span><br >昨日奖金：<i>923770</i></p>
                               </td>
                               <td>
                                  <ins class="oneIns">1</ins>
                               </td>
                          </tr>

                            <tr>
                               <td>
                                  <img src="../../../../static/500w/img/home/slder8.jpg" alt="">
                                  <p >账号昵称：<span >龙***</span><br >昨日奖金：<i>420732</i></p>
                               </td>
                               <td>
                                  <ins class="twoIns">2</ins>
                               </td>
                          </tr>
                            <tr>
                               <td>
                                  <img src="../../../../static/500w/img/home/slder1.jpg" alt="">
                                  <p >账号昵称：<span >赐***</span><br >昨日奖金：<i>231702</i></p>
                               </td>
                               <td>
                                  <ins class="threeIns">3</ins>
                               </td>
                          </tr>
                     </table>
                  </div>

                   <div class="winningList">
                        <h6>中奖信息</h6>
                         <div style="overflow:hidden;">
                             <ul class="winerList">
                            <li class="clearfloat" v-for="(item,key) in scrollDatas" :key="key">
                              <img :src="item.ico">
                              <p class="color">{{item.account}}**** {{item.name}}
                               <br>喜中
                               <span>¥{{item.out}}</span>
                               </p>
                            </li>                      
                        </ul>
                         </div>
                   </div>
            </div>

            
       </div>
     
          <!-- svg动画 -->
     <div class="home-svg"  v-if="svgShow">
       <!-- <svg width='100px' height='100px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring">
         <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
          <circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="#dc3b40" fill="none" stroke-width="20">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0s"></animateTransform>
         </circle>
       </svg> -->
       <embed type="image/svg+xml" src="../../../../static/500w/img/loading.svg" />
    </div>

    </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import navTopBg from "../../../../static/cpzj/img/caiz_icon44x44.png";
import navTopBg1 from "../../../../static/cpzj/img/home/GDKS.png";
export default {
  data() {
    return {
      active: 1,
      svgShow: true,
      tabData: [
        {
          title: "北京赛车",
          par: {
            id: 2,
            key: 'tradition'
          },
          active: true,

        },{
          title: "快速赛车",
          par: {
            id: 12,
            key: 'tradition'

          },
          active: false
        },
        {
          title: "重庆时时彩",
          par: {
            id: 4,
            key: 'tradition'

          },
          active: false
        },
        {
          title: "幸运飞艇",
          par: {
            id: 3,
            key: 'tradition'

          },
          active: false
        },{
          title: "香港六合彩",
          par: {
            id: 1,
            key: 'tradition'

          },
          active: false,
        }
      ],
      carouselData: [
        
      ],
      leftTopData:[
        {
          title: "北京pk拾",
          url: "#/plays/tradition/2",
          desc: "",
          x: "-3px",
          backgroundImg: navTopBg,
          y: "-192px"
        },
        {
          title: "重庆时时彩",
          url: "#/plays/tradition/4",
          x: "-3px",
          backgroundImg:navTopBg,
          desc: "易操作，回单快",
          y: "-64px"
        },
        {
          title: "江苏快3",
          url: "#/plays/tradition/9",
          x: "-3px",
          backgroundImg:navTopBg,
          desc: "投掷骰子 轻松中奖",
          y: "-322px"
        },
        {
          title: "六合彩",
          url: "#/plays/tradition/1",
          x: "-3px",
          backgroundImg:navTopBg,
          desc: "73%返奖率",
          y: "-256px"
        },
        {
          title: "广东快乐十分",
          url: "#/plays/tradition/5",
          x: "0px",
          backgroundImg:"../../../../static/cpzj/img/home/GDKS.png",
          desc: "高额中奖",
          cover: true,
          y: "0px"
        }
      ],
      wraplData: [
        {
          img: "/static/500w/img/home/vp-9.png",
          sortNmae: "江苏快3",
          des: "全天82期",
          router: "#/plays/tradition/9"
        },
        {
          img: "/static/500w/img/home/PK10.png",
          sortNmae: "北京赛车",
          des: "全天179期",
          router: "#/plays/tradition/2"
        },
        {
          img: "/static/500w/img/home/vp-12.png",
          sortNmae: "快速赛车",
          des: "全天1152期",
          router: "#/plays/tradition/12"
        },
        {
          img: "/static/500w/img/home/vp-13.png",
          sortNmae: "3分赛车",
          des: "3分钟1期",
          router: "#/plays/tradition/13"
        },
        {
          img: "/static/500w/img/home/vp-4.png",
          sortNmae: "重庆时时彩",
          des: "全天120期",
          router: "#/plays/tradition/4"
        },
           {
          img: "/static/500w/img/home/vp-4.png",
          sortNmae: "福彩3D",
          des: "全天120期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-16.png",
          sortNmae: "北京快乐8",
          des: "全天1152期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-17.png",
          sortNmae: "上海时时乐",
          des: "全天480期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-1.png",
          sortNmae: "江苏快三",
          des: "一周三期",
          router: "#/plays/tradition/9"
        },
        {
          img: "/static/500w/img/home/vp-18.png",
          sortNmae: "排列三",
          des: "全天1152期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-19.png",
          sortNmae: "快乐十分",
          des: "5分钟1期",
          router: "#/plays/tradition/5"
        }
      ],
      wraplCtData: [
        {
          img: "/static/500w/img/home/PK10.png",
          sortNmae: "北京PK拾",
          des: "全天179期",
          router: "#/plays/tradition/2"
        },
             {
          img: "/static/500w/img/home/vp-1.png",
          sortNmae: "香港六合彩",
          des: "一周三期",
          router: "#/plays/tradition/1"
        },
          {
          img: "/static/500w/img/home/vp-4.png",
          sortNmae: "重庆时时彩",
          des: "全天120期",
          router: "#/plays/tradition/4"
        },
         {
          img: "/static/500w/img/home/vp-4.png",
          sortNmae: "福彩3D",
          des: "全天120期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-16.png",
          sortNmae: "北京快乐8",
          des: "全天1152期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-17.png",
          sortNmae: "上海时时乐",
          des: "全天480期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-1.png",
          sortNmae: "江苏快三",
          des: "一周三期",
          router: "#/plays/tradition/9"
        },
        {
          img: "/static/500w/img/home/vp-18.png",
          sortNmae: "排列三",
          des: "全天1152期",
          router: "#"
        },
        {
          img: "/static/500w/img/home/vp-19.png",
          sortNmae: "快乐十分",
          des: "5分钟1期",
          router: "#/plays/tradition/5"
        }
      
      ],
      hdActive: 0,
      // 滚动名单
      random: [
        {
          account: "",
          name: "江苏快3",
          ico: "/static/500w/img/home/slder1.jpg",
          out: 0
        },
        {
          account: "",
          name: "湖北快3",
          ico: "/static/500w/img/home/slder.jpg",
          out: 0
        },
        {
          account: "",
          name: "5分六合",
          ico: "/static/500w/img/home/slder2.jpg",
          out: 0
        },
        {
          account: "",
          name: "极速赛车",
          ico: "/static/500w/img/home/slder3.jpg",
          out: 0
        },
        {
          account: "",
          name: "北京赛车",
          ico: "/static/500w/img/home/slder4.jpg",
          out: 0
        },
        {
          account: "",
          name: "快速11选5",
          ico: "/static/500w/img/home/slder5.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运飞艇",
          ico: "/static/500w/img/home/td1.jpg",
          out: 0
        },
        {
          account: "",
          name: "重庆时时彩",
          ico: "/static/500w/img/home/slder6.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运农场",
          ico: "/static/500w/img/home/slder7.jpg",
          out: 0
        },
        {
          account: "",
          name: "广东快乐十分",
          ico: "/static/500w/img/home/slder8.jpg",
          out: 0
        }
      ],
      scrollDatas: [],
      allReData: [
        {
          router: "#/plays/tradition/9",
          id: 9,
          type: "k3",
          lastissue: "",
          lastresultInfo: "",
          lastresultInfoArr: "",
          lastluzhu: "",
          lastluzhuArr: "",
          total: ""
        },
        {
          router: "#/plays/tradition/2",
          id: 2,
          type: "bjpk",
          lastissue: "",
          lastresultInfo: "",
          lastresultInfoArr: "",
          lastluzhu: "",
          lastluzhuArr: "",
          total: ""
        },
        {
          router: "#/plays/tradition/18",
          id: 18,
          type: "kslhc",
          lastissue: "",
          lastresultInfo: "",
          lastresultInfoArr: "",
          lastluzhu: "",
          lastluzhuArr: "",
          total: ""
        }
      ]
    };
  },
  methods: {
    windowJump: function(url){
      window.open(url, '_blank');
    },
    //获取banner
    async getbannner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },
    async getResult(item) {
    
      let res = await this.$http.get(
        `${this.$HOST_NAME}/lottery/getIssue/${item.id}`,
        {}
      );
      if (res && res.code == 200) {
        
        switch (item.type) {
          case "k3":
            this.allReData[0].lastissue = res.data.lastissue;
            this.allReData[0].lastresultInfo = res.data.lastresultInfo;
            this.allReData[0].lastresultInfoArr = res.data.lastresultInfo.split(
              ","
            );
            this.allReData[0].total =
              parseInt(this.allReData[0].lastresultInfoArr[0]) +
              parseInt(this.allReData[0].lastresultInfoArr[1]) +
              parseInt(this.allReData[0].lastresultInfoArr[2]);

            this.allReData[0].lastluzhu = res.data.lastluzhu;
            this.allReData[0].lastluzhuArr = res.data.lastluzhu.split(",");
            break;
          case "bjpk":
            this.allReData[1].lastissue = res.data.lastissue;
            this.allReData[1].lastresultInfo = res.data.lastresultInfo;
            this.allReData[1].lastresultInfoArr = res.data.lastresultInfo.split(
              ","
            );

            this.allReData[1].lastluzhu = res.data.lastluzhu;
            this.allReData[1].lastluzhuArr = res.data.lastluzhu.split(",");
            break;
          case "kslhc":
            this.allReData[2].lastissue = res.data.lastissue;
            this.allReData[2].lastresultInfo = res.data.lastresultInfo;
            this.allReData[2].lastresultInfoArr = res.data.lastresultInfo.split(
              ","
            );

            this.allReData[2].lastluzhu = res.data.lastluzhu;
            this.allReData[2].lastluzhuArr = res.data.lastluzhu.split(",");
            break;
        }

          this.svgShow = false;
      }
    },
    setNavCurr() {
      this.$store.commit("setCurr", 1);
      this.$router.push("/home/youhui");
    },
    logout() {
      UserService.logout.call(this);
    }
  },
  created() {
    // this.svgShow = true;
    let chars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "j",
      "k",
      "-",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    function generateMixed(n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 61);
        res += chars[id];
      }
      return res;
    }
    //50个模型demo
    let datas = [];
    for (let index = 0; index < 50; index++) {
      // debugger;
      let obj = {};
      Object.assign(obj, obj, this.random[Math.floor(Math.random() * 10)]);
      datas.push(obj);
    }
    // 求出随机数
    datas.forEach((item, v) => {
      let arr = [2, 3, 5, 4];
      item.out =
        Math.ceil(Math.random() * 10) *
        Math.pow(
          arr[Math.floor(Math.random() * arr.length)],
          arr[Math.floor(Math.random() * arr.length)]
        );
      item.account = generateMixed(3);
    });
    this.scrollDatas = datas;
    // console.log(datas);
  },
  mounted() {
    this.getResult({ type: "k3", id: 9 });
    this.getResult({ type: "bjpk", id: 2 });
    this.getResult({ type: "kslhc", id: 18 });
    this.getbannner();
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  store
};
</script>

<style lang="less" scoped>
.subnav_bottom{
      width: 228px;
    margin-top: 10px;
    border-bottom: none;
    border: 1px solid #EDEDED;
    border-top: none;
    line-height: 40px;
    
    box-sizing: content-box;
  .title{
    background: #f8f8f8;
    color: #ff3333;
        border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    width: 76px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
  }
  ul{
        height: 202px;
    width: 228px;

    border-top: none;
    background: #F8F8F8;
    overflow: hidden;
    li{
      min-width: 60px;
      padding: 7px 0px 0 11px;
      display: inline-block;
      
        box-sizing: content-box;
      a{
        color: #555;
        &:hover{
          color: #f13131;
        }
      }
      
      font-size: 12px;
    }
  }
}
.subnav_top{
      width: 228px;
    height: 270px;
    overflow: hidden;
    border: 1px solid #EDEDED;
    background: #f8f8f8;
    ul{
      li{
        &:hover{
          cursor: pointer;
        }
        span{
          display:inline-block;
        }
        white-space: nowrap;
        
        margin: 0 7px;
        height: 54px;
        border-bottom: 1px dashed #D1D1D1;
        .nav_item_title,.nav_item_desc{
          vertical-align: 12px;
          &:hover{
                color: #f13131;
              }
        }
        .nav_item_title{
          color: #333;
          margin-left: 4px;
          font-size: 14px;
              
              
        }
        .nav_item_desc{
          color: #999;
          font-size: 12px;
          margin-left: 6px;
        }
      }
    }
  .bg_url{
    display: inline-block;
    width:44px;
    height: 44px;
  }
}



@keyframes animatesub {
  0% {
    top: 0;
  }
  100% {
    top: -2000px;
  }
}
.new-home {
      background: url(/static/cpzj/img/bg-article.png?b4939049da) #fff no-repeat center 96px;
    padding-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  .container {
    width: 1000px;
    margin: 0 auto;
    .wrapL {
      width: 232px;
     
    
      // border-top: 3px solid #e6c9a0;
      float: left;
      
      .lotteryMenuTop {
        .ltbtn {
          // display: inline-block;
          float: left;
          width: 50%;
          height: 30px;
          text-align: center;
          position: relative;
          font-size: 15px;
          color: #333;
          font-weight: 700;
          line-height: 29px;
          border-bottom: 1px solid #f4f1d9;
          border-top: 1px solid #f4f1d9;
          cursor: pointer;
        }
        .active {
          border-left: 1px solid #f4f1d9;
          color: #333;
        }
        .active::before {
          content: "";
          width: 100%;
          height: 3.5px;
          display: inline-block;
          position: absolute;
          top: -3.5px;
          left: 0;
          background: #e4393c;
        }
        .ctbtn {
          border-left: 1px solid #f4f1d9;
        }
      }
      .subnav {
        li {
          height: 46.4px;
          line-height: 46px;
          border-bottom: 1px dashed #ddd;
          padding: 2px 8px;
          &:last-child{
            border-bottom:none;
          }
          a {
            display: block;
            height: 100%;
            img {
              margin: 2px 5px;
              width: 38px;
              height: 38px;
              display: inline-block;
            }
            .sortName {
              margin-right: 5px;
              margin-bottom: 10px;
              vertical-align: top;
              font-size: 14px;
              color: #333;
              font-weight: 700;
            }
            .des {
              margin-right: 5px;
              margin-bottom: 10px;
              vertical-align: top;
              color: #999;
              font-size: 12px;
              font-weight: 100;
            }
          }
        }
        li:hover {
          img {
            transition: 0.5s;
            transform: rotate(1turn);
            transform-origin: 17px 25px;
          }
        }
      }
    }
    .wrapC {
      width: 488px;
      margin-left: 13px;
      float: left;
      height: 468px;
      .banner {
        height: 251px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .autoTab {
        height: 204px;
        margin-top: 13px;
        border: 1px solid #d7e2f7;
        box-sizing: border-box;
        .hd {
          li {
            width: 33.33333%;
            text-align: center;
            line-height: 30px;
            background: #edf7ff;
            border-top: 1px solid #fff;
            border-bottom: 1px solid #d7e2f7;
            box-sizing: border-box;
            cursor: pointer;
            float: left;
            font-size: 12px;
            color: #666;
          }
          .on {
            border-top: 2px solid #e4393c;
            background: #fff;
            border-bottom: none;
            margin-top: -1px;
          }
        }
        .bd {
          .shaizi {
            margin-top: 32px;
            text-align: center;
            span {
              display: inline-block;
              background: url("../../../../static/500w/img/home/open_num.png");
              width: 60px;
              height: 60px;
              vertical-align: middle;
              &.active1 {
                background-position-y: 0px;
              }
              &.active2 {
                background-position-y: -60px;
              }
              &.active3 {
                background-position-y: -120px;
              }
              &.active4 {
                background-position-y: -180px;
              }
              &.active5 {
                background-position-y: -240px;
              }
              &.active6 {
                background-position-y: -305px;
              }
            }
            i {
              font-size: 25px;
              vertical-align: middle;
              color: #999;
              margin: 10px;
            }
            em {
              font-size: 25px;
              color: #333;
              vertical-align: middle;
              margin: 3px;
            }
          }
          .bd-text {
            margin-top: 20px;
            p {
              text-align: center;
              font-size: 12px;
              span {
                margin-right: 14px;
                i {
                  color: red;
                  margin: 0 3px;
                }
                a {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  line-height: 18px;
                  color: #fff;
                  background: #ff9726;
                  border-radius: 2px;
                  margin-right: 6px;
                }
                a + a {
                  background: #5691d7;
                }
              }
              span:last-child {
                margin: 0;
              }
            }
          }
          .kslhc{
            .number{
              padding-top: 26px !important;
              em{
                border-radius: 0 !important;
                border:none !important;
                &.Blue{
                  background: #1C8CE2;
                }
                &.Red{
                  background: #BC2A1B;
                }
                &.Green{
                  background: #49BB27;
                }
                &:nth-child(6){
                  margin-right: 30px;
                }
              }
            }
            .mainColorBtn{
              margin-top: 18px !important;
            }
          }
          .pk10{
            .number{
              padding-top: 26px !important;
              em{
                width: 30px !important;
                height: 30px !important;
                font-size: 18px !important;
                line-height: 30px !important;
                border-radius: 0 !important;
                border:none !important;
                &.pkActive01{
                  background: #E6DE0B;
                }
                &.pkActive02{
                  background: #4B84F8;
                }
                &.pkActive03{
                  background: #4C4C4C;
                }
                &.pkActive04{
                  background: #D86F1A;
                }
                &.pkActive05{
                  background: #80E7E6;
                }
                &.pkActive06{
                  background: #4403F3;
                }
                &.pkActive07{
                  background: #DFDFDF;
                }
                &.pkActive08{
                  background: #D10108;
                }
                &.pkActive09{
                  background: #650000;
                }
                &.pkActive10{
                  background: #73C32E;
                }
              }
            }
            .mainColorBtn{
              margin-top: 18px !important;
            }
          }
          .cqssc {
            text-align: center;
            .number {
              float: left;
              padding-top: 45px;
              padding-left: 40px;
              em {
                border: 1px solid #b13032;
                background: linear-gradient(180deg, #e46062 2%, #c72c2e);
                font-size: 30px;
                color: #fff;
                border-radius: 50%;
                width: 41px;
                height: 41px;
                display: inline-block;
                line-height: 41px;
                text-align: center;
                font-weight: 100;
                margin: 0 5px;
                cursor: default;
              }
            }
            .mainColorBtn {
              display: inline-block;
              line-height: 30px;
              color: #fff !important;
              padding: 0 15px;
              border-radius: 3px;
              font-size: 14px;
              margin-right: 10px;
              min-width: 55px;
              text-align: center;
              cursor: pointer;
              background: #e4393c;
              margin: 10px 0;
              margin-top: 51px;
            }
          }
        }
      }
    }
    .wrapR {
      float: left;
      width: 252px;
      height: 472px;
      margin-left: 13px;
      .login-after {
        height: 44px;
        a {
          display: inline-block;
          width: 117.5px;
          text-align: center;
          background: #fff9dd;
          line-height: 42px;
          color: #e4393c;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #ebd4b3;
          box-sizing: border-box;
          border-radius: 2px;
        }
        a:nth-child(2) {
          margin-left: 12px;
        }
      }

      .login-before {
        padding: 0 15px;
        height: 44px;
        background: #fffdf3;
        border-radius: 2px;
        border: 1px solid #ebd4b3;
        border-top: 3px solid #ebd4b3;
        position: relative;
        h3 {
          line-height: 26px;
          text-align: center;
          margin: 7px;
          font-size: 14px;
          color: #36c;
          font-weight: bolder;
        }
        .loginout {
          width: 45px;
          height: 15px;
          line-height: 15px;
          display: inline-block;
          cursor: pointer;
          border: none;
          position: absolute;
          z-index: 2;
          top: 12px;
          right: 10px;
          line-height: 15px;
          padding-left: 5px;
          border-radius: 2px;
          font-size: 12px;
          color: #ccc;
          em {
            color: #fff;
          }
        }
        .loginout:hover {
          background: #d8d8d8;
          i {
            color: #fff;
          }
        }
      }
      .slide {
        border: 1px solid #dce1e5;
        margin-top: 13px;
        h6 {
          margin: 0;
          padding: 0 8px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          font-weight: 600;
        }
        table {
          margin: 5px 0;
          height: 152px;
          position: relative;
          border-collapse: collapse;
          border-spacing: 0;
          tr {
            height: 50px;
            border-bottom: 1px dashed #ccc;
            td {
              text-align: left;
              padding: 7px 15px;
              padding-right: 12px;
              border-right: none;
              vertical-align: middle;
              img {
                height: 36px;
                width: 36px;
                float: left;
                border-radius: 50%;
                margin-right: 9px;
                transition: 0.5s;
              }
              p {
                margin: 0;
                margin-top: 0;
                line-height: 1.7;
                height: 36px;
                font-size: 12px;
                i {
                  color: red;
                }
              }
              ins {
                display: block;
                width: 25px;
                height: 25px;
                margin: 0 auto;
                text-decoration: none;
                vertical-align: middle;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 25px;
              }
              .oneIns {
                background: radial-gradient(
                  circle at 25px 25px,
                  #c12f33,
                  #ca9293
                );
              }
              .twoIns {
                background: radial-gradient(
                  circle at 25px 25px,
                  #2b82cc,
                  #53b0fe
                );
              }
              .threeIns {
                background: radial-gradient(
                  circle at 25px 25px,
                  #c57532,
                  #f8a968
                );
              }
            }
            td:first-child {
              width: 280px;
            }
          }
        }
      }
      .winningList {
        margin-top: 13px;
        border: 1px solid #dce1e5;
        height: 204px;
        overflow: hidden;
        h6 {
          margin: 0;
          padding: 0 8px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          font-weight: 600;
        }
        .winerList {
          position: relative;
          animation: animatesub 80s linear infinite;
          li {
            height: 58px;
            cursor: default;
            padding: 0 15px;
            img {
              height: 36px;
              width: 36px;
              border-radius: 50%;
              float: left;
              margin-top: 2px;
              margin-right: 9px;
              transition: 0.5s;
            }
            p {
              margin: 0;
              float: left;
              line-height: 1.7;
              font-size: 12px;
              span {
                color: #f63745;
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
  }
  .home-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 820px;
    text-align: center;
    line-height: 820px;
    background: #fff;
    z-index: 1001;
  }
}
</style>
