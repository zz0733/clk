<template>
<div class="login-public-css">

  <!-- <i @click="$router.push('/home')" class="back-login cubeic-back" ></i> -->
  <img @click="$router.push('/home')" class="back-login" src="@assets/img/public/image/common/back-login.png" alt="">
  <!-- <vp-pub-header title="登录"></vp-pub-header> -->
  <div class="container-login">
    <img :src="logoSrc" alt="" class="logo-bg">
    <div class="row">
      <div class="box">
        <div class="img">
          <img src="../../../assets/img/public/image/common/register/new-index-user.png" alt="">
        </div>
        <cube-input placeholder="账号" v-model="passKey.userName" @blur="getCode"></cube-input>
      </div>
    </div>
    <div class="row">
      <div class="box">
        <div class="img">
          <img src="../../../assets/img/public/image/common/register/new-index-password.png" alt="">
        </div>
        <cube-input v-model="passKey.password" type="password" placeholder="密码"></cube-input>
      </div>
    </div>
    <div class="row">
      <div class="box">
        <div class="img">
          <img src="../../../assets/img/public/image/common/register/new-index-yzm.png" alt="">
        </div>
        <cube-input :maxlength=4 v-model="passKey.code" type="tel" placeholder="验证码"></cube-input>
        <span class="codeImg" @click="getCode" :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'contain'}"></span>
      </div>
    </div>

    <div class="bar">
      <span class="fl" @click="service">忘记密码？</span>
      <span class="fr">
                  <span class="jizhu">记住密码</span>
      <cube-switch v-model="value"></cube-switch>
      </span>

    </div>
    <div class="submit-wrap">
      <!-- @touchstart="submit" -->
      <!-- :class="{'active':!ifCanclick}" -->
      <div @touchstart="submit" @click="submit" class="submitBt">立即登录</div>
    </div>

    <router-link tag="div" to="/admin/register" class="go-register">

      没有帐号？<span>立即注册</span>
    </router-link>
  </div>
  <img src="../../../assets/img/public/image/common/register/new-index-bg.png" alt="" class="bg-img">
</div>
</template>

<script>
import vpPubFooter from "@/pages/public/common/Footer";
import {
  _SetGet,
  _SetPost
} from "@/service/public/service.js";
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
export default {
  props: ["logoSrc"],
  data() {
    return {
      passKey: {},
      codeImg: "",

      value: false,
      ifCanclick: true
      // captcha_key:''
    };
  },
  methods: {
    async submit() {
      if (!this.ifCanclick) {
        return false;
      }
      if (!this.passKey.userName) {
        this.$newToast("请输入账户");
        return false;
      }
      if (!this.passKey.password) {
        this.$newToast("请输入密码");
        return false;
      }
      if (!this.passKey.code) {
        this.$newToast("请输入验证码");
        return false;
      }
      if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
        this.$newToast("请输入4位验证码");
        return false;
      }
      this.ifCanclick = false;
      // UserService.removeCache();
      let cache = this.$HOST_NAME;
      this.$HOST_NAME = "/api/v1";
      var res = await _SetPost(`${this.$HOST_NAME}/login`, this.passKey);
      if (res && res.code == 200) {
        this.ifCanclick = true;
        if (this.value) {
          var obj = {};
          obj.name = this.passKey.userName;
          obj.pwd = this.passKey.password;
          localStorage.setItem("remember", JSON.stringify(obj));
        } else {
          localStorage.removeItem("remember");
        }
        UserService.setCache(res, "v1");
        this.$store.commit("mainState/resetBalance", res.data.userinfo.balance);
        // this.$newToast(res.message);
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } else {
        this.ifCanclick = true;
        this.$HOST_NAME = cache;
        this.getCode()
        return false;
      }
    },
    getCode() {
      if (!this.passKey.userName) {
        return false;
      }

      if (this.passKey.userName.length < 5) {
        this.$newToast("请输入5位帐号");
        this.passKey.userName = "";
        var oInput = document.getElementById("userName");
        oInput.focus();
        return false;
      }

      this.$http
        .post(`/api/v1/captcha`, {
          userName: this.passKey.userName
        })
        .then(res => {
          if (res.code == 200) {
            this.codeImg = res.data.captcha_image_text;
            this.passKey.captcha_key = res.data.captcha_key;
          }
        });
    },
    service() {
      this.$newToast("请联系客服修改密码");
    }
  },
  created() {
    this.$nextTick(() => {
      if (localStorage.remember) {
        this.passKey.userName = JSON.parse(
          localStorage.getItem("remember")
        ).name;
        this.passKey.password = JSON.parse(
          localStorage.getItem("remember")
        ).pwd;
        this.getCode();
        this.value = true;
      }
    });
  },
  watch: {},
  mounted() {
    this.$http.get(`${this.$HOST_NAME}/games/list`).then(res => {
      if (res.code == 200) {
        res.data.forEach(outItem => {
          outItem.list.unshift({
            name: "所有游戏",
            platform: "all",
            status: "yes"
          });
        });
        localStorage.setItem("list", JSON.stringify(res.data));
      }
    });
  },
  computed: {},
  components: {
    vpPubFooter
  },
  store
};
</script>
