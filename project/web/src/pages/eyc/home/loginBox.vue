<template>
    <div class="login-box">
        <div class="login-t" v-if="userinfo">
            <div class="w1200">
                <ul class="clearfix login-after">
                    <li class="LI-1">
                        账号：<span>{{userinfo.userName}}</span>
                    </li>
                    <li class="LI-2" style="width:150px;">
                        余额：
                        <span>{{userinfo&&userinfo.balance}}</span>
                        <img class="refresh" src="/static/eyc/img/icon/refresh.png" @click="getBalance">
                    </li>
                    <li class="LI-3">
                        <a href="javascript:void(0)" @click="goUserCen('personage',1)">
                            <span>下注记录 　|</span></a></li>
                    <li class="LI-4">
                        <a href="javascript:void(0)" @click="goUserCen('recharge',0)"><span>线上存款 　|</span></a>
                    </li>
                    <li class="LI-4">
                        <a href="javascript:void(0)" @click="goUserCen('withdraw',0)"><span>线上取款 　|</span></a>
                    </li>

                    <li class="LI-4">
                        <a href="javascript:void(0)" @click="goUserCen('agency',0)"><span>代理中心 　|</span></a>
                    </li>

                    <li class="LI-4">
                        <a href="javascript:void(0)" @click="goUserCen('message',0)"><span>站内信 　|</span></a>
                    </li>
                    <li class="LI-5">
                        <a href="/m/#/"><span>手机投注 </span></a>
                    </li>
                    <li>
                        <input value="登出" @click="logout" type="button">
                    </li>
                </ul>
            </div>
        </div>

        <div class="login-t" v-else>
            <div class="w1200">
                <ul class="clearfix login-before">
                    <li>
                        <input v-model="passKey.userName" type="text" placeholder="用户名" tabindex="1" required @blur="getCode">
                    </li>
                    <li>
                        <input v-model="passKey.password" type="password" placeholder="密码" autocomplete="off" tabindex="2" required>
                    </li>
                    <li>
                        <input v-model="passKey.code" type="text" maxlength="4" placeholder="验证码" tabindex="3" required>
                        <img class="code" :src="codeImg" @click="getCode">
                    </li>
                    <li><input type="button" value="注册" @click="$router.push('/home/register')"></li>
                    <li><input type="button" class="login" value="登录" @click="login"></li>
                    <li>
                        <a class="forget-ps" onclick="alert('忘记账号密码，请联系在线客服人员取回！')" href="javascript:;">忘记密码？</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from "@/service/public/UserService.js";
export default {
  data() {
    return {
      passKey: {},
      codeImg: "/static/hsyl/img/code.jpg"
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  methods: {
    logout() {
      UserService.logout.call(this);
    },
    getCode() {
      if (!this.passKey.userName) {
        alert("请输入账号！");
        return false;
      }
      if (this.passKey.userName.length < 5) {
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
      if (!this.passKey.userName) {
        alert("请务必输入账号");
        return false;
      }
      if (this.passKey.userName.length < 5) {
        alert("请务必输入5位账号");
        return false;
      }
      if (!this.passKey.password) {
        alert("密码请务必输入");
        return false;
      }
      if (this.passKey.password.length < 6) {
        alert("请务必输入6位密码");
        return false;
      }
      if (!this.passKey.code) {
        alert("验证码请务必输入");
        return false;
      }
      if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
        alert("请输入4位验证码");
        return false;
      }

      this.$http.post(`${this.$HOST_NAME}/login`, this.passKey).then(res => {
        if (res.code == 200) {
          this.$http
            .post(`${this.$HOST_NAME}/member/refundInfo`)
            .then(res => {
              let refund = res.data.platform;
              localStorage.setItem("refund", JSON.stringify(refund));
            })
            .then(res => {
              this.$router.push({ name: "clause" });
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
      this.$store.commit("showPersonal", { bool: true });
      this.$store.commit("showContent", { parent: name });
      this.$store.commit("showNav", { child: num });
    }
  }
};
</script>
<style lang="less" scoped>
.login-box {
  .login-t {
    height: 50px;
    line-height: 50px;
    background: #333946;
    .login-after {
      margin-left: 75px;
      li {
        float: left;
        position: relative;
        span {
          margin-left: 10px;
          color: #daba60;
        }
        img.refresh {
          margin: 0 5px;
          cursor: pointer;
        }
      }
      .LI-1 {
        width: 180px;
        color: #daba60;
        font-size: 15px;
      }
      .LI-2 {
        width: 180px !important;
        color: #daba60;
        font-size: 15px;
        span {
          color: #ff4a00;
        }
      }
      input[type="button"] {
        border: none;
        margin-left: 35px;
        width: 85px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        border-radius: 3px;
        background: #de3c34;
      }
    }
    .login-before {
      margin-left: 6px;
      li {
        float: left;
        position: relative;
        input[type="text"],
        input[type="password"] {
          border: none;
          width: 215px;
          height: 34px;
          line-height: 34px;
          border-radius: 3px;
          color: #333946;
          background: #fff;
          margin-right: 35px;
          padding-left: 10px;
        }
        input[type="button"] {
          cursor: pointer;
          border: none;
          margin-left: 35px;
          width: 85px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          border-radius: 3px;
          background: #de3c34;
          outline: none;
        }
        .login {
          background: #fe9813;
        }
        img {
          width: 60px;
          cursor: pointer;
          top: 8px;
          right: 38px;
          margin-top: 1px;
          height: 33px;
          border-radius: 5px;
          position: absolute;
        }
        a.forget-ps {
          color: #fff;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
