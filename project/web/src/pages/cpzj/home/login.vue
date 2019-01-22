<template>
<div>
  <div class="wbw-login" v-if="isShow">
  <h3 class="reg_tit">用户登录</h3>
  <p class="reg_small"></p>
  <ul class="regMain">
    <li>
      <span>账 号：</span>
      <input type="text" autocomplete="off" class="userInput" v-model="passKey.userName" @blur="getCode">

    </li>

    <li>
      <span>密 码：</span>
      <input type="password" autocomplete="off" class="userInput" v-model="passKey.password">

    </li>
    <li>
      <span>验 证 码：</span>
      <input type="passwoed" autocomplete="off" class="userInput" v-model="passKey.code">
      <span class="codeyzm" :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'cover'}" @click="getCode"></span>

    </li>

    <li style="margin-top: 23px;">
      <span></span>
      <a class="mainColorBtn" @click="login">登 录</a>
      <a><a @click="forgetPwd" class="forgetPwd">忘记密码?</a></a>
    </li>
  </ul>
</div>
<div v-else>
  <form action="">
            <div class="clear">
              <div class="form-group left">
                <input type="text" v-model="passKey.userName" @blur="getCode" placeholder="用户名">
              </div>
              <div class="form-group left">
                <input type="password" autocomplete="off" v-model="passKey.password" placeholder="密码">
              </div>
              <div class="form-group left">
                <button @click="login" class="btn_login bg-btn">登陆</button>
              </div>
            </div>
            <div class="clear">
              <div class="form-group left">
                <input class="codey_input" type="text" placeholder="验证码">
                <img class="codey" :src="codeImg" @click="getCode" />
              </div>
              <div class="form-group left">
                <button class="btn_res bg-btn" @click="routerJump('home/register')">注册</button>
                <span  @click="forgetPwd" class="forget">忘记密码</span>
              </div>
               <div class="form-group left">
                <button class="btn_login bg-btn">试玩</button>
              </div>
            </div>
          </form>
</div>

</div>

</template>

<script>
import UserService from "@/service/public/UserService.js";
import img from "../../../../static/klk/img/thirdparty/code.jpg";
export default {
  name: 'Login', 
  props: {
     
      isChildren: {
        type: Boolean,
        default: false,

      }
    },
  data() {
    
    return {
      passKey: {
        userName: "",
        password: "",
        code: "",
        
      },
      isShow: false,
      codeImg: img,
    };
  },
  watch:{
    isChildren:function(val){
      this.isShow = val
    }

  },
  mouted(){
    console.log(this)
  },
  methods: {
    routerJump:function(url){
      this.$router.push(url)
    },
    forgetPwd() {
      alert("请联系客服修改密码");
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
          this.$http
            .post(`${this.$HOST_NAME}/member/refundInfo`)
            .then(res => {
              let refund = res.data.platform;
              localStorage.setItem("refund", JSON.stringify(refund));
            })
            .then(res => {
              this.$router.push({
                name: "clause"
              });
            });
          UserService.setCache(res, "v1", "login");
          window.location.href='/';
        } else {
          alert(res.message);
        }
      });
    },
    getCode() {
      if (!this.passKey.userName) {
        // alert("请输入6位帐号");
        return false;
      }

      if (this.passKey.userName.length < 5) {
        // alert("请输入6位帐号");
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
    }
  }
};
</script>

<style lang="less" scoped>
     .codey {
        width: 50px;
        height: 26px;
        display: inline-block;
        padding-left: 4px;
        vertical-align: -6px;
      }
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
           .codeyzm {
        width: 55px;
        height: 22px;
        padding-left: 10px;
        position: absolute;
        top: 3px;
        left: 334px;
      }
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
     .codey_input{
       width: 85px;
     }
  }
  
  .forget{
    font-size: 12px;
    color: #bbb;
    margin-left: 5px;
  }
}



.wbw-login {
  width: 870px;
  min-height: 480px;
  margin: 30px auto;
  border: 1px solid #e1e1e2;
  padding-top: 20px;
  font-size: 14px;
  background: url("../../../../static/cpzj/img/home/loginBg.png") no-repeat 450px 220px #fff;
  h3 {
    font-size: 24px;
    color: #ff2c55;
    margin-bottom: 5px;
    margin-left: 30px;
    margin-top: 0;
  }
  p {
    margin-left: 30px;
    color: #646464;
    margin-bottom: 10px;
    margin-top: 0;
    height: 24px;
  }
  .regMain {
    border-top: 1px dashed #e0e3e6;
    padding: 50px 0;
    font-size: 0;
    margin: 0 30px;
    li {
      color: #000;
      line-height: 36px;
      margin-bottom: 4px;
      position: relative;
      >span {
        display: inline-block;
        width: 18%;
        text-align: right;
        font-size: 12px;
        color: #333;
        padding-right: 5px;
      }
      >input {
        height: 36px;
        width: 280px;
        border: 1px solid #e7e8e8;
        background-color: #feffff;
        color: #a9a9a9;
        padding-left: 10px;
        margin: 0;
        vertical-align: top !important;
        line-height: 20px;
        padding: 5px;
        font-size: 12px;
      }
      >input:focus {
        outline: none;
      }
 
      .mainColorBtn {
        display: inline-block;
        width: 130px;
        line-height: 36px;
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
      }
      .forgetPwd {
        font-size: 12px;
        text-decoration: underline;
        margin-left: 40px;
        color: #ff2c55;
      }
    }
  }
}
</style>
