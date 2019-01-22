<template>
<div class="w-header">
  <!-- 头部顶部 -->
  <div class="header-top">
    <div class="container-top">
      <div class="snavAll">
        您好，欢迎您来到彩票之家
      </div>

      <div class="bar-right">
            <a href="/m">手机版</a>|
            <a href="javascript:void(0)" target="_blank" onclick="menu_url(62)">在线客服</a>|
            <a href="javascript:void(0);" onclick="AddFavorite('彩票之家')">添加收藏</a>|
            <a href="http://5550988.com/" target="_blank">导航网址</a>
        </div>
      <!-- 登录前 -->
     <!-- <ul class="snavInfo" v-if="!userinfo">
        <a></a>
        <router-link to="/home/login" tag="li">亲，请登录</router-link>
        <li class="fenge">|</li>
        <router-link to="/home/register" tag="li">用户注册</router-link>
        <a class="ServiceBtn" href="https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=83355&configID=41342&jid=8968396061&s=1" target="_blank"></a>
      </ul>

      <ul class="snavInfo" v-else>
        <li>欢迎您，{{userinfo.userName}}</li>
        <li>余额：
          <span v-if="balanceShow">{{userinfo&&userinfo.balance}}<span @click="balanceShow=false" style="padding-left: 8px;">隐藏</span></span>
          <span v-else>已隐藏<span @click="balanceShow=true" style="padding-left: 8px;">显示</span></span>
        </li>
        <li @click="goUserCen('recharge',0)">充值</li>
        <li @click="goUserCen('withdraw',0)">提现</li>
        <li @click="logout">退出</li>
        <a class="ServiceBtn" href="https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=918065&configID=41386&jid=7848409807&s=1" target="_blank"></a>
      </ul> -->

    </div>
  </div>

  <!--登录-->
  <div class="login">
     <div class="clear">
      <div class="logo left">
        
      </div>
      <div class="logo_1 left">
      <img src="../../../../static/cpzj/img/home/logo1.png" alt="">
      </div>
      <div class="right">
        <div class="user_login">
          <Login :isChildren="false"></Login>
        </div>
      </div>            
     </div>
  </div>
  <!-- 导航栏 -->
  <div class="nav">
    <div class="container">

      <!-- logo -->

      <!-- 导航 -->
      <ul>
        <li>
          <router-link to="/home" :class="{curr:navCurr ==0}" @click.native="setNavCurr(0)">首页</router-link>
        </li>
         <li class="sports">
          <a href="javascript:;">传统彩票</a>
          <div class="menu-child1 sportsShow sportsShow1">
            <div class="gamelist-1 clear" style="background-image: none; background-color: rgba(0,0,0,0.8);">
                  <div class="official_play">
                      <div class="high_wrap">
                          <div class="gamelist_r">
                              <div class="items">
                                  <div @click="itemJumpUrl(item)" v-for="(item,index) in navData" :key="index" class="item">
                                      <div class="item-ico" @click="getItemId({id: '21',platform: 'sport'});">
                                          <img :src="`../../../../static/cpzj/img/home/${item.imgurl}`"  />
                                          <p class="hot"><font>{{item.title}}</font></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="triangles_back" style="left: 155px;"></div>
          </div>
        </li>
          <li>
          <router-link to="/home/games?id=26&name=MG老虎机" @click.native="setNavCurr(5)" :class="{curr:navCurr ==5}">电子游艺</router-link>
        </li>
             <li>
          <router-link to="/home/live" @click.native="setNavCurr(4)" :class="{curr:navCurr ==4}">真人视讯</router-link>
        </li>
        <li class="sports">
          <a href="javascript:;">体育投注</a>
          <div class="menu-child1 sportsShow">
            <div class="gamelist-1 clear" style="background-image: none; background-color: rgba(0,0,0,0.8);">
                  <div class="official_play">
                      <div class="high_wrap">
                          <div class="gamelist_r">
                              <div class="items">
                                  <div class="item">
                                      <div class="item-ico" @click="getItemId({id: '21',platform: 'sport'});">
                                          <img src="/static/500w/img/hgty.png">
                                          <p class="hot"><font>皇冠体育</font></p>
                                      </div>
                                  </div>
                                  <div class="item">
                                      <div class="item-ico"  @click="getItemId({id: '20',platform: 'sport'});">
                                          <img src="/static/500w/img/sbty.png">
                                          <p class="hot"><font>沙巴体育</font></p>
                                      </div>
                                  </div>
                                  <div class="item">
                                      <div class="item-ico" @click="getItemId({id: '41',platform: 'sport'});">
                                          <img src="/static/500w/img/bbin.png">
                                          <p class="hot"><font>BB体育</font></p>
                                      </div>
                                  </div>
                                  <div class="item">
                                      <div class="item-ico" @click="getItemId({id: '22',platform: 'sport'});">
                                          <img src="/static/500w/img/sbty.png">
                                          <p class="hot"><font>AG体育</font></p>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="triangles_back" style="left: 155px;"></div>
          </div>
        </li>
               <li>
          <router-link to="/home/buyu" @click.native="setNavCurr(6)" :class="{curr:navCurr ==6}">捕鱼达人</router-link>
        </li>
          <li>
          <router-link to="/home/moblie" @click.native="setNavCurr(2)" :class="{curr:navCurr ==2}"> 手机购彩</router-link>
        </li>
              <li>
          <router-link to="/home/buyu" @click.native="setNavCurr(6)" :class="{curr:navCurr ==6}">优惠活动</router-link>
        </li>
             <li>
          <router-link to="/home/buyu" @click.native="setNavCurr(6)" :class="{curr:navCurr ==6}">在线客服</router-link>
        </li>
        <!--
        <li>
          <a href="#/plays/hall" target="_blank">购彩大厅</a>
        </li>
   
        <li>
          <router-link to="/home/qipai" @click.native="setNavCurr(7)" :class="{curr:navCurr ==7}">棋牌游戏</router-link>
        </li>
    
 
      
        <li>
          <router-link to="/home/youhui" :class="{curr:navCurr ==1}" @click.native="setNavCurr(1)">活动中心</router-link>
        </li>
    -->
        <li v-show="false">
          <a @click="goUserCen('personage',0)">我的账户</a>
        </li>
        <li v-show="false">
          <router-link to="/home/help" :class="{curr:navCurr ==3}" @click.native="setNavCurr(3)">帮助指南</router-link>
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<script>
const navData = [{
  title: '快速赛车',
  imgurl:'kssc.png',
  router: "#/plays/tradition/12"
},
{
  title: '三分赛车',
  imgurl:'sfssc.png',
  router: "#/plays/tradition/13"
},
{
  title: '北京pk拾',
  imgurl:'gf_a3.png',
  router: "#/plays/tradition/2"
},
{
  title: '快速时时彩',
  imgurl:'ksssc.png',
  router: "#/plays/tradition/16"
},
{
  title: '三分时时彩',
  imgurl:'sfsc.png',
  router: "#/plays/tradition/17"
},
{
  title: '重庆时时彩',
  imgurl:'gf_a1.png',
   router: "#/plays/tradition/4"
},
{
  title: '幸运飞艇',
  imgurl:'xyft.png',
  router: "#/plays/tradition/3"
},
{
  title: '快速六合彩',
  imgurl:'kslhc.png',
  router: "#/plays/tradition/18"
},
{
  title: '香港六合彩',
  imgurl:'xy_a1.png',
  router: "#/plays/tradition/1"
},
{
  title: '广东快乐10分',
  imgurl:'xy_a2.png',
  router: "#/plays/tradition/5"
},
{
  title: '幸运农场',
  imgurl:'xync.png',
  href: '#/plays/tradition/6'
},
{
  title: '广东11选5',
  imgurl:'gd115.png',
  href: '#/plays/tradition/7'
},
{
  title: '北京快乐8',
  imgurl:'gf_a2.png',
  href: '#'
},
{
  title: '上海时时乐',
  imgurl:'xy_a11.png',
  href: '#'
},
{
  title: '江苏快三',
  imgurl:'gf_a6.png',
  router: "#/plays/tradition/9"
},

]
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import data from "../../public/games/public.js";
import Login from "./login.vue"
export default {
   mixins: [data],
   components:{Login},
  data() {
    return {
      // navCurr: 0
      balanceShow: false,
      navData,
    };
  },
  mounted() {},
  methods: {
    logout() {
      UserService.logout.call(this);
    },
    itemJumpUrl(item){
      window.open(item.router,'_blank')
    },
    getBalance() {
      this.refreshS = true;
      this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
          this.refreshS = false;
          alert("刷新余额成功");
        } else {
          alert("服务器报错");
        }
      });
    },
    goUserCen(name, num) {
      if (!localStorage.userinfo) {
        this.$router.push("/home/login");
        return false;
      }
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", {
        bool: true
      });
      this.$store.commit("showContent", {
        parent: name
      });
      this.$store.commit("showNav", {
        child: num
      });
    },
    async tryPlay() {
      let res = await this.$http.post("/api/test/registerTest", {});
      if (res && res.code == 200) {
        UserService.setCache(res, "test");

        this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
          let platform = res.data.platform;
          let alias = res.data.alias;
          let keys = Object.keys(platform);
          let refund = [];
          keys.forEach((v, i) => {
            refund[i] = {};
            refund[i].title = v;
            refund[i].list = [];
            platform[v].forEach((a, j) => {
              refund[i].list[j] = {};
              refund[i].list[j].key = Object.keys(a)[0];
              refund[i].list[j].refund = Object.values(a)[0];
              refund[i].list[j].name = alias[refund[i].list[j].key];
            });
          });

          // this.refundData = refund;
          localStorage.setItem("refund", JSON.stringify(refund));
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    goTo(item) {
      if (item.router == "/qipai") {
        this.trustLogin(item);
        return false;
      }
      this.$router.push({
        path: item.router
      });
    },
    thirdParty(item) {
      console.log(item);
      if (item.type) {
        if (item.name == "传统彩票") {
          window.open("#/plays/hall");
        } else {
          this.getItemId(item);
        }
      } else {
        this.getItemId(item);
      }
    },
    setNavCurr(num) {
      this.$store.commit("setCurr", num);
    },
    routerJump:function(url){
      this.$router.push(url)
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    navCurr() {
      return this.$store.state.wbw.curr;
    }
  },

  created() {

  },
  store
};
</script>

<style lang="less" scoped>
input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
}
input{
      -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
}
.login{
  width: 1000px;    margin: 0 auto;
  margin-top: 5px;
  >div{
    // overflow:hidden;
  }
  .left{
    float: left;
  }
  .right{
    float:right;
  }
  .logo{
    width: 271px;
    position: relative;
    background: url('../../../../static/cpzj/img/home/logo.png') no-repeat left center;
    background-size: 100%;
    background-position-y: 0;
    height: 99px;
  }
  .logo_1{
    width: 240px;
    height: 87px;
    background: none;
    margin-left: 18px;
    margin-top: 5px;
  }
  .user_login{
        width: 412px;
    height: 85px;
    margin-top: 0px;
    // float: right;
    .form-group{
      margin-top:13px;
      margin-right:10px;
    }
    .bg-btn{
          margin-left: 10px;
    width: 80px;
    height: 27px;
    border-radius: 4px;
    border: none;
    color: black;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    margin-top: 2px;
    border-radius: 25px;
    margin-left: 3px;
    cursor: pointer;
    text-align: center;
        outline: none;
     &:hover{
           background-color: #f13131;
    color: white;
     }
    }
     input {
           line-height: normal;
        width: 140px;
        height: 20px;
        border-radius: 25px;
        text-indent: 12px;
            border: 1px solid #ccc;
            height: 30px;
            padding: 4px;
     }  
  }
  .forget{
    font-size: 12px;
    color: #bbb;
    margin-left: 5px;
  }
}




.w-header {
  .clear:before, .clear:after { content: ""; display: table; }
.clear:after { clear: both; }
.clear { *zoom: 1; }
.sports{
  div.sportsShow{
    display: none; 
    width: 400px; 
    left: -125px;
  }
  div.sportsShow1{
    width: 534px;
    >div{
      padding: 20px 34px;
    }
     .items .item .item-ico {
      background: transparent;
      padding: 0px;
      &:hover{
        background: transparent; 
      }
      img{
        margin: 10%;width: 80%;
        height: 80%;
      }
    }
    .items {
      padding: 0px;
    }
    
  .item:first-child{
      margin-left: 0px;
    }
  }
  &:hover{
    .sportsShow{
      display:block;
    }
  }
}
.bar-right {
    padding: 0;
    width: auto;
    text-align: left;
    position: relative;
    vertical-align: top!important;
    float:right;
    a{
      color: #555;
      text-decoration: none;
      font-size: 12px;
      padding: 0 5px;
      outline: none !important;
    }
}
  .menu-child1{
    position: absolute;
    top: 27px;
    width: 1000px;
    *min-height: 564px;
    margin: 0 5px;
    padding: 1px;
    z-index: 9999;
    border-radius: 0 0 8px 8px;
    zoom: 1;
    left: 62px;
    margin-top: 24px;
    padding-top: 5px;
    padding-bottom: 0;
    .triangles_back{
      width: 26px;
      height: 19px;
      position: absolute;
      background: url(/static/500w/img/triangles_back.png) no-repeat;
      left: 125px;
      top: -8px;
    }
    .gamelist-1{
      padding-bottom: 5px;
      border-radius: 5px;
      .gamelist_r{
        margin-left: 0;
      }
    }
    .items{
      min-height: 62px;
      padding: 11px 0;
      cursor: pointer;
      .item{
        float: left;
        line-height: 28px;
        margin: 5px 0;
        height: 104px;
        width: 92px;
        position: relative;
        text-align: center;
        .item-ico{
          display: block;
          width: 80px;
          height: 76px;
          padding: 0 0 18px 0;
          margin: 0 auto;
          color: #222;
          text-align: center;
          background: url(/static/500w/img/game-icon-bg.png) no-repeat;
          overflow: hidden;
          img{
            width: 80%;
            height: 100%;
            margin: 10%;
          }
        }
        &:hover{
          background: url(/static/500w/img/Wbg_03.png) repeat;
        }
        &:first-child{
          margin-left: 14px;
        }
      }
      p{
        font-size: 12px;
        display: block;
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        line-height: 28px;
        overflow: hidden;
      }
    }
    .official_play{
      display: inline-block;
      zoom: 1;
      font-size: 0;
      float: left;
      .high_wrap{
        height: auto;
        float: none;
      }
    }
  }
  .container-top {
    width: 1000px;
    margin: 0 auto;
  }
  .container {
    width: 1000px;
    margin: 0 auto;
  }
  .header-top {
        height: 30px;
    line-height: 30px;
    background: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;
    .snavAll {
      float: left;
      padding-right: 20px;
      color: #000;
      font-size: 12px;
    }
    .snavInfo {
      float: right;
      height: 30px;
      li {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        color: #666;
        font-size: 12px;
      }
      .fenge {
        color: #ccc;
        font-size: 13px;
        padding: 0;
      }
      .ServiceBtn {
        background: url("/static/500w/img/home/service.gif");
        color: #e4393c !important;
        display: block;
        background-position: 0 -26px;
        height: 25px;
        float: right;
        width: 87px;
        position: relative;
        margin-left: 25px;
        margin-top: 2px;
      }
    }
  }
  .nav {
        background: #f13131;
    width: 100%;
    height: 45px;
    h3 {
      float: left;
      padding: 0;
      margin: 0;
      margin-right: 10px;
      line-height: 0;
      img {
        margin-top: 6px;
      }
    }
    ul {
      float: right;
      li {
        float: left;
        height: 40px;
        width: 110px;
        line-height: 40px;
      
        text-align: center;
        position: relative;
        a {
          font-size: 16px;
          color: #fff;
          font-family: 'Microsoft YaHei'
        }
        .curr {
          // color: #fedf50;
        }
      }
      li:hover {
            background: #bd2626;
    
        a {
          color: #fff;
        }
      }
    
    }
  }
}
</style>
