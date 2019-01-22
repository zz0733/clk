<template>
<div class="hsyl-home-header">

  <div class="wrapper">

    <!-- <div class="lang">
                                  <i class="i_flag_china"></i>
                                  中文
                                </div> -->

    <div class="time">
      <span id="time">{{time}}</span>
    </div>

     <div class="app_down"><a href="/static/hsyl/html/download/index.html" target="_blank">APP下载</a></div>

    <!-- 登录前 -->
    <div class="login-before" v-if="!userinfo">

      <div class="userName">
        <i></i>
        <input type="text" placeholder="帐号" v-model="passKey.userName" @blur="getCode">
      </div>

      <div class="password">
        <i class="ico"></i>
        <input maxlength="20" type="password" placeholder="密码" v-model="passKey.password">
        <a class="forget_pwd" onclick="alert('忘记账号，请联系在线客服人员取回！');" href="javascript:void(0)">忘记?</a>
      </div>

      <div class="code">
        <input maxlength="4" type="text" v-model="passKey.code">
        <img :src="codeImg" alt="" @click="getCode">

        <a class="btn_login" @click="login">登录</a>
        <a class="btn_reg" @click="register">注册</a>
        <a class="btn_reg" @click="loginTest">试玩</a>
        <!-- <a class="btn_try" @click="kefuFc">在线客服</a> -->
      </div>
    </div>

    <!-- 登录后 -->

    <div class="login-after" v-if="userinfo">

      <ul>
        <li>
          账号：{{userinfo.userName}}
        </li>
        <li>
          余额:{{userinfo&&userinfo.balance}}
          <img src="/static/hsyl/img/new.png" alt="" @click="getBalance">
        </li>
        <li class="dt" @click="goUserCen('personage',0)">个人中心</li>
        <li class="dt" @click="goUserCen('recharge',0)">存款</li>
        <li class="dt" @click="goUserCen('withdraw',0)">取款</li>
        <li class="dt" @click="goUserCen('personage',1)">投注记录</li>
        <li class="dt" @click="goUserCen('message',0)">信息</li>
        <li class="dt">
          <a class="out_btn" @click="logout">退出</a>
        </li>
      </ul>
    </div>

  </div>

</div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
export default {
  data() {
    return {
      passKey: {},
      codeImg: "/static/hsyl/img/code.jpg",
      time: this.getTimes(new Date())
    };
  },
  methods: {
    getCode() {
      if (!this.passKey.userName) {
        // alert("请务必输入6位账号");
        return false;
      }
      if (this.passKey.userName.length < 5) {
        // alert("请务必输入6位账号");
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
        // alert("请务必输入账号");
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
    loginTest() {
      this.$http.post(`/api/test/registerTest`, {}).then(res => {
        if (res.code == 200) {
          UserService.setCache(res, "test");
          window.location.reload();
        }
      });
    },
    logout() {
      UserService.logout.call(this);
    },
    getBalance() {
      this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
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
    register() {
      this.$store.commit("hsyl/showRegister", true);
    },
    kefuFc() {
      let url = JSON.parse(localStorage.getItem("config")).service[0].url;
      window.open(url);
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  created() {
    setInterval(() => {
      this.time = this.getTimes(new Date());
    }, 1000);

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
  },
  store
};
</script>

