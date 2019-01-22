<template>
  <div class="register">
    <div class="wrapper">
      <div class="content">
        <fieldset>
          <legend class="join-acc">注册帐号</legend>
          <div class="row">
            <label><span class="star">*</span>用户名:</label>
            <input type="text" maxlength="16" v-model="userName" @blur="getCode">
            <div class="remark">帐号：请输入4-12个字元, 仅可输入英文字母以及数字的组合!!</div>
          </div>
          <div class="row">
            <label><span class="star">*</span>密码:</label>
            <input type="password" maxlength="16" v-model="password">
            <div class="remark">密码规则：须为<font color="red"><b>6~12码英文或数字</b></font>且符合0~9或a~z字元</div>
          </div>
          <div class="row">
            <label><span class="star">*</span>确认密码:</label>
            <input type="password" maxlength="16" v-model="register_password">
          </div>
          <div class="row">
            <label><span class="star">*</span>验证码:</label>
            <input type="text" v-model="code">
            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
          </div>
        </fieldset>
        <fieldset v-if="register.length">
          <legend class="join-acc">会员资料</legend>
          <div class="row" v-for="(item,index) in register" :key="index">
            <label>{{item.name}}:</label>
            <input type="text" :placeholder="item.placeholder" v-model="item.value" maxlength="16">
          </div>
        </fieldset>
        <div class="agree">
          <input type="checkbox" name="agree" v-model="agree">
          我已届满合法博彩年龄﹐且同意各项开户条约。
        </div>
        <div class="operate">
          <a class="btn" @click="submitRegister">确认</a>
          <a class="btn" @click="submitReset">重设</a>
        </div>
        <div class="row tip_info">
          <p>备注：</p>
          <p>1.标记有 * 者为必填项目。</p>
          <p>2.取款密码为取款时的凭证,请会员务必仔细填写。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import UserService from "@/service/public/UserService";
export default {
  data() {
    return {
      register: [],
      codeImg: "/static/hsyl/img/code.jpg",
      captcha_key: "",
      userName: "",
      password: "",
      register_password: "",
      code: "",
      agree: false
    };
  },
  created() {
    let register = JSON.parse(localStorage.getItem("config")).register.pc;
    register.forEach((v, i) => {
      this.register[i] = {};
      switch (v) {
        case "phone":
          this.register[i].placeholder = "请输入手机号";
          this.register[i].value = "";
          this.register[i].key = v;
          this.register[i].name = "手机号";
          break;
        case "email":
          this.register[i].placeholder = "请输入邮箱地址";
          this.register[i].value = "";
          this.register[i].key = v;
          this.register[i].name = "邮箱";
          break;
        case "wechat":
          this.register[i].placeholder = "请输入微信号";
          this.register[i].value = "";
          this.register[i].key = v;
          this.register[i].name = "微信";
          break;
        case "realName":
          this.register[i].placeholder = "请输入真实姓名";
          this.register[i].value = "";
          this.register[i].key = v;
          this.register[i].name = "真实姓名";
          break;
        case "payPassword":
          this.register[i].placeholder = "请输入支付密码";
          this.register[i].value = "";
          this.register[i].key = v;
          this.register[i].name = "支付密码";
          break;
      }
    });
  },
  methods: {
    getCode() {
      if (!this.userName) {
        return false;
      }

      this.$http
        .post(`${this.$HOST_NAME}/captcha`, {
          userName: this.userName
        })
        .then(res => {
          if (res.code == 200) {
            this.codeImg = res.data.captcha_image_text;
            this.captcha_key = res.data.captcha_key;
          }
        });
    },
    submitReset() {
      this.userName = "";
      this.password = "";
      this.register_password = "";
      this.code = "";
      this.register &&
        this.register.forEach(item => {
          item.value = "";
        });
    },
    submitRegister() {
      let stauePassword = this.validateAccount(this.password);

      if (this.userName.length < 5) {
        alert("账号 5-20位数字或字母");
        return false;
      }
      if (!stauePassword) {
        alert("请输入6-10位数字或字母的密码");
        return false;
      }
      if (this.password !== this.register_password) {
        alert("两次密码不一致");
        return false;
      }
      if (this.code == "") {
        alert("请输入验证码");
        return false;
      }
      if (this.code.length < 4 || this.code.length > 4) {
        alert("请输入4位验证码");
        return false;
      }

      if (!this.agree) {
        alert("请点击同意才可以进行注册！");
        return false;
      }

      let params = {};
      params.userName = this.userName;
      params.password = this.password;
      params.device = "pc";
      params.code = this.code;
      params.captcha_key = this.captcha_key;
      let flag = true;

      for (let i = 0; i < this.register.length; i++) {
        if (this.register[i].value) {
          alert(this.register[i].placeholder);
          flag = false;
          break;
        }
        params[this.register[i].key] = this.register[i].value;
      }

      if (!flag) {
        return false;
      }

      this.$http
        .post(`${this.$HOST_NAME}/checkUsername/${this.userName}`, {})
        .then(res => {
          if (res && res.code == 200) {
            this.$http.post(`${this.$HOST_NAME}/register`, params).then(res => {
              if (res.code == 200) {
                UserService.setCache(res, "v1");
                this.$http
                  .post(`${this.$HOST_NAME}/member/refundInfo`)
                  .then(res => {
                    let refund = res.data.platform;
                    // this.refundData = refund;
                    localStorage.setItem("refund", JSON.stringify(refund));
                  });
                setTimeout(() => {
                  alert("注册成功");
                  window.location.href = "/";
                }, 500);
              } else {
                alert(res.message);
              }
            });
          } else {
            alert(res.message);
            return false;
          }
        });
    }
  },
  store
};
</script>

<style lang="less" scoped>
@h: 25px;
.register {
  background: #000 url(/static/ecp/img/bg_promotions.jpg) center top no-repeat;
  min-height: 650px;
  .wrapper {
    width: 1000px;
    height: 100%;
    min-height: 650px;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.6);
    .content {
      width: 700px;
      margin: auto;
      padding: 20px 0;
      fieldset {
        border: 1px solid #b48d3e;
        padding: 10px;
        width: 100%;
        legend {
          color: #b48d3e;
          font-weight: bold;
          font-size: 13px;
        }
      }

      .row {
        clear: both;
        overflow: hidden;
        margin-top: 10px;
        width: 100%;
        font-size: 13px;
        label {
          display: inline-block;
          width: 135px;
          height: @h;
          text-indent: 10px;
          line-height: @h;
          color: #fff;
          text-align: right;
          padding-right: 10px;
          .star {
            color: #f00;
            font-weight: bold;
            vertical-align: -2px;
          }
        }
        input {
          height: @h;
          line-height: @h;
          border: 1px solid #666666;
          border-radius: 3px;
          box-shadow: 0 0 6px #3a3a3a;
          text-indent: 10px;
        }
        .remark {
          height: @h;
          line-height: @h;
          color: #fff;
          text-indent: 140px;
          margin-top: 10px;
        }
        img {
          margin-left: 5px;
          cursor: pointer;
          width: 78px;
          height: @h;
          vertical-align: middle;
        }
      }
      .agree {
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 13px;
        input {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
      }
      .operate {
        width: 100%;
        margin: auto;
        text-align: center;
        margin-top: 10px;
        .btn {
          display: inline-block;
          width: 80px;
          height: 40px;
          color: #000;
          background: #fff;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
          border: none;
          margin: 10px 0;
          cursor: pointer;
          transition: background 0.1s ease-in-out;
          border-radius: 3px;
        }
      }
      .tip_info {
        p {
          font-size: 12px;
          height: @h;
          line-height: @h;
          padding-left: 20px;
          color: #fff;
        }
      }
    }
  }
}
</style>
