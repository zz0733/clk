<template>
<div class="new-header">
  <div class="cont-top cen">
    <div ref="time"></div>
    <ul>
      <li v-if="!userinfo">
        <a @click="tryPlay">免费试玩</a>
      </li>
      <li>
        <a href="#/home/contactUs/4">代理加盟</a>
      </li>
      <li>
        <a target="_blank" href="/static/hqyl/html/download/index.html">APP下载</a>
      </li>
      <li>
        <a target="_blank" href="https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=89567&configID=41282&jid=3954076820&s=1">在线客服</a>
      </li>
    </ul>
  </div>
  <div class="cont-center">
    <div class="main  cen">
      <div class="left fl">
        <div class="logo">
          <a href="/">
            <img src="/static/hqyl/img/logo.png" alt="">
          </a>
        </div>
        <div class="xianjin">
          <a href="/">
            <img src="/static/hqyl/img/yule.png" alt="">
          </a>
        </div>
      </div>
      <ul v-if="userinfo" class="center fl">
        <li>
          <span>账号：</span> {{userinfo&&userinfo.userName}}
          <label @click="goUserCen('personage',7)">修改密码</label>
        </li>
        <li>
          <span>本地余额： </span>
          <a @click="goUserCen('personage',0)">{{userinfo&&userinfo.balance}}</a>
          <a></a>
          <a @click="getBalance" class="refresh" :class="{'active':refreshS}"></a>
          <label @click="goUserCen('message',0)" class="message"></label>
        </li>
        <li>
          <!-- 代理中心 -->
          <span @click="goUserCen('agency',0)">申请代理</span>
          <!-- 返水记录 -->
          <label @click="goUserCen('discounts','1')">实时返水</label>
        </li>
      </ul>
      <div v-if="userinfo" class="right fl">
        <ul>
          <li>
            <!-- 网银转账 -->
            <a @click="goUserCen('recharge',0)"></a>
            <!-- 申请提现 -->
            <a @click="goUserCen('withdraw',0)"></a>
          </li>
          <li>
            <a @click="goUserCen('personage',1)"></a>
            <!-- 投注记录 -->
            <a @click="goUserCen('personage',0)"></a>
            <!-- 投注记录 -->
          </li>
          <li>
            <a @click="logout"></a>
          </li>
        </ul>
      </div>
      <div v-if="!userinfo" class="login-wrap">
        <ul>
          <li>
            <input placeholder="账号" type="text" v-model="passKey.userName" @blur="getCode">
            <input maxlength="20" placeholder="输入密码" type="password" v-model="passKey.password" @keyup.13="login">
            <label onclick="alert('忘记密码，请联系在线客服人员取回！');">忘记密码？</label>
          </li>
          <li>
            <input maxlength="4" class="code" placeholder="验证码" type="text" v-model="passKey.code" @keyup.13="login">
            <a @click="login"></a>
            <img class="yzm" :src="codeImg" alt="" @click="getCode">
          </li>
          <li>
            <a href="#/home/register" class="register">

            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cont-nav cen">
      <ul>
        <li v-for="(item,index) in navList" :key='index'>
          <img v-if="item.tag" src="/static/hqyl/img/home/hot11.gif" alt="">
          <a @click="goTo(item)">{{item.name}}</a>
          <div class="child-wrap">
            <div class="item" v-for="(itemInt,indexInt) in item.child" :key="indexInt">
              <a @click="thirdParty(itemInt)">{{itemInt.name}}</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import data from "../../public/games/public.js";
export default {
  mixins: [data],
  data() {
    return {
      refreshS: false,
      passKey: {
        userName: "",
        password: "",
        code: ""
      },
      codeImg: "/static/hqyl/img/yzm.png",
      time: this.getTimes(new Date()),
      interval: null,
      navList: [{
          name: "网站首页",
          router: "/"
        },
        {
          name: "体育投注",
          child: [{
              name: "皇冠体育",
              id: "21",
              platform: "sport"
            },
            {
              name: "沙巴体育",
              id: "20",
              platform: "sport"
            },
            {
              name: "BB体育",
              id: "41",
              platform: "sport"
            },
            {
              name: "AG体育",
              id: "22",
              platform: "sport"
            }
          ],
          router: ""
        },
        {
          name: "真人视讯",
          router: "/home/live"
        },
        {
          name: "电子游艺",
          router: "/home/games?id=26&name=MG老虎机"
        },
        {
          name: "彩票游戏",
          // child: [
          //   { name: "传统彩票", type: "notGame" },
          //   { name: "VR彩票", type: "notGame", platform: "vr_lottery", id: 13 }
          // ],
          router: "/plays/hall"
        },
        {
          name: "棋牌游戏",
          tag: "hot",
          router: "/qipai",
          platform: "KY_CHESS",
          gameName: "0"
        },
        {
          name: "捕鱼达人",
          router: "/home/buyu"
        },
        {
          name: "优惠活动",
          router: "/home/youhui"
        }
      ]
    };
  },
  mounted() {
    let estObjMD = this.getTimes();
    this.interval = setInterval(estObjMD.dispTimeMD, 1000);
  },
  methods: {
    getTimes() {
      var that = this;
      let estObjMD = {
        pre0: function(num) {
          if (num < 10) {
            num = "0" + num;
          }
          return num;
        },
        /* 美东時間顯示 */
        dispTimeMD: function() {
          let timestam = new Date().getTime();
          let time = timestam - 43200000;
          let dateObj = new Date(time),
            p0 = estObjMD.pre0,
            Y = dateObj.getFullYear(),
            Mh = dateObj.getMonth() + 1,
            D = p0(dateObj.getDate()),
            H = p0(dateObj.getHours()),
            M = p0(dateObj.getMinutes()),
            S = p0(dateObj.getSeconds());

          if (Mh > 12) {
            Mh = "01";
          } else if (Mh < 10) {
            Mh = "0" + Mh;
          }
          let str = `美东时间 - ${Y}/${Mh}/${D}/ ${H}:${M}:${S}`;
          that.$refs.time.innerHTML = str;
        }
      };
      return estObjMD;
    },
    getCode() {
      if (!this.passKey.userName) {
        // alert("请输入6位帐号");
        return false;
      }

      if (this.passKey.userName.length < 5) {
        // alert("请输入5位帐号");
        this.passKey.userName = "";
        var oInput = document.getElementById("userName");
        oInput.focus();
        return false;
      }

      this.$http
        .post(`${this.$HOST_NAME}/captcha`, {
          userName: this.passKey.userName
        })
        .then(res => {
          if (res.code == 200) {
            this.codeImg = res.data.captcha_image_text;
            this.passKey.captcha_key = res.data.captcha_key;
          } else {
            this.$store.commit("alert/showTipModel", {
              bool: true,
              title: res.message,
              model: "warn"
            });
          }
        });
    },
    login() {
      if (this.passKey.userName == "") {
        alert("请务必输入账号");
        return false;
      }
      if (this.passKey.userName.length < 5) {
        alert("请务必输入5位账号");
        return false;
      }
      if (this.passKey.password == "") {
        alert("密码请务必输入");
        return false;
      }
      if (this.passKey.password.length < 6) {
        alert("请务必输入6位密码");
        return false;
      }
      if (this.passKey.code == "") {
        alert("验证码请务必输入");
        return false;
      }
      if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
        alert("请输入4位验证码");
        return false;
      }

      this.$http.post(`${this.$HOST_NAME}/login`, this.passKey).then(res => {
        if (res.code == 200) {
          this.$router.push({
            name: "clause"
          });
          UserService.setCache(res, "v1", "login");
        } else {
          alert(res.message);
        }
      });
    },
    logout() {
      UserService.logout.call(this);
    },
    getBalance() {
      this.refreshS = true;
      this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
          this.refreshS = false;
          // alert("刷新余额成功");
        } else {
          alert("服务器报错");
        }
      });
    },
    goUserCen(name, num) {
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
      } else if (item.router == "/plays/hall") {
        window.open("#/plays/hall");
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
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  created() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        if (!localStorage.userinfo) {
          let timer = setInterval(() => {
            if (localStorage.userinfo) {
              clearInterval(timer);
              window.location.reload();
            }
          }, 1000);
        }
      }
    });
    // $(document).keydown(function(event) {
    //   if (event.keyCode == 13) {
    //     this.login()
    //   }
    // });
  },
  beforeDestroy() {},
  destroyed() {
    clearInterval(this.interval);
  },
  store
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #666;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #666;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #666;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #666;
}

@-webkit-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-ms-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.new-header {
  background: black;
  .fl {
    float: left;
  }
  .cen {
    width: 1000px;
    margin: 0 auto;
  }
  .cont-top {
    height: 20px;
    line-height: 20px;
    color: #cfa972;
    font-size: 12px;
    zoom: 1;
    overflow: hidden;
    div {
      float: left;
    }
    ul {
      float: right;
      list-style-type: disc;
      list-style: disc;
      padding-right: 26px;
      li {
        float: left;
        list-style-type: disc;
        list-style: disc;
        margin-left: 24px;
        a {
          color: #cfa972;
        }
      }
    }
  }
  .cont-center {
    background: url(/static/hqyl/img/home/header-bg.jpg) repeat-x top #000;
    width: 100%;
    height: 143px;
    margin-top: -20px;
    padding-top: 20px;
    .main {
      .left {
        .xianjin,
        .logo {
          float: left;
        }
        .logo {
          width: 158px;
          height: 52px;
          vertical-align: middle;
          margin-top: 14px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .xianjin {
          margin-top: 34px;
          margin-left: 15px;
        }
      }
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .center {
        padding-left: 80px;
        padding-top: 10px;
        li {
          width: 250px;
          height: 20px;
          border-bottom: 1px solid #b38850;
          font-size: 12px;
          color: #fff;
          line-height: 20px;
          position: relative;
          &:first-child {
            border-top: 1px solid #b38850;
          }
          span {
            color: #ffd58e;
            cursor: pointer;
          }
          label {
            float: right;
            color: #ffd58e;
            display: inline-block;
            width: 100px;
            cursor: pointer;
            &.message {
              position: absolute;
              padding-left: 30px;
              right: 0;
              &::before {
                position: absolute;
                margin-left: 5px;
                content: "";
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(/static/hqyl/img/home/img-sprites.png) -26px -13px no-repeat;
                left: -4px;
                top: 3px;
              }
            }
          }
          a {
            color: #fff;
            position: relative;
            &.refresh {
              &::after {
                position: absolute;
                top: -2px;
                margin-left: 5px;
                content: "";
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("/static/public/image/common/refresh.png") no-repeat;
              }
              &.active {
                &::after {
                  -webkit-animation: animate 1s infinite linear;
                  animation: animate 1s infinite linear;
                  -moz-animation: animate 1s infinite linear;
                  -o-animation: animate 1s infinite linear;
                  -ms-animation: animate 1s infinite linear;
                  transform-origin: 40% 40%;
                  -webkit-transform-origin: 40% 40%;
                  -moz-transform-origin: 40% 40%;
                  -o-transform-origin: 40% 40%;
                  -ms-transform-origin: 40% 40%;
                }
              }
            }
          }
        }
      }
      .right {
        float: left;
        ul {
          padding-top: 10px;
          padding-left: 30px;
          li {
            float: left;
            padding-left: 10px;
            a {
              display: block;
              width: 110px;
              height: 28px;
              background: url(/static/hqyl/img/home/icons_index_new.png) no-repeat;
              background-position: -4px -319px;
              margin-bottom: 5px;
            }
            &:nth-child(1) {
              a {
                &:first-child {
                  &:hover {
                    background-position: -4px -352px;
                  }
                }
                &:last-child {
                  background-position: -4px -384px;
                  &:hover {
                    background-position: -4px -416px;
                  }
                }
              }
            }
            &:nth-child(2) {
              a {
                &:first-child {
                  background-position: -4px -449px;
                  &:hover {
                    background-position: -4px -483px;
                  }
                }
                &:last-child {
                  background-position: -4px -517px;
                  &:hover {
                    background-position: -4px -551px;
                  }
                }
              }
            }
            &:last-child {
              a {
                background-position: -131px -3px;
                height: 60px;
                width: 71px;
                &:hover {
                  background-position: -131px -68px;
                }
              }
            }
          }
        }
      }
      .login-wrap {
        padding-top: 15px;
        float: right;
        input {
          display: block;
          width: 154px;
          height: 26px;
          border-radius: 3px;
          background: transparent;
          color: #666;
          border: 1px inset #fff;
          margin-bottom: 5px;
          outline: 0;
          font-family: "Microsoft Yahei";
          background-color: white;
          font-size: 13px;
          text-indent: 4px;
          &.code {
            width: 117px;
          }
        }
        li {
          float: left;
          padding-left: 5px;
          position: relative;
          a {
            display: block;
            width: 120px;
            height: 29px;
            background: url(/static/hqyl/img/home/icons_index_new.png) no-repeat;
            background-position: -4px -252px;
            margin-top: -1px;
            margin-left: 2px;
            &:hover {
              background-position: -124px -252px;
            }
            &.register {
              background-position: -4px -5px;
              height: 60px;
              width: 100px;
              &:hover {
                background-position: -4px -70px;
              }
            }
          }
          .yzm {
            position: absolute;
            right: 8px;
            top: 3px;
            width: 50px;
            height: 20px;
            cursor: pointer;
          }
          label {
            position: absolute;
            right: 8px;
            top: 37px;
            cursor: pointer;
            font-size: 13px;
            color: #000;
            text-decoration: underline;
          }
        }
      }
    }
    .cont-nav {
      ul {
        padding: 0 20px;
        li {
          display: inline-block;
          height: 46px;
          padding-top: 18px;
          width: 120px;
          text-align: center;
          position: relative;
          a {
            color: #e0ab63;
            font-size: 15px;
            text-align: center;
            &:hover {
              color: #fff;
            }
          }
          img {
            position: absolute;
            top: 0;
            right: 15px;
          }
          .child-wrap {
            width: 100px;
            background-color: rgb(48, 4, 2);
            position: absolute;
            left: 8px;
            top: 46px;
            z-index: 5555;
            display: none;
            .item {
              color: #fff;
              a {
                line-height: 30px;
              }
            }
          }
          &:hover {
            .child-wrap {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
