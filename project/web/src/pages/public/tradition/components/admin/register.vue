<template>
  <div class="register-wrap">
      <div class="list-box">
            <div class="list">
                <!-- <i class="iconfont icon-yonghu"></i> -->
                账户：
                <input  @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="用户名 5-20位数字或字母" type="text" v-model="userName" @blur="getCode">
            </div>
            <div class="list">
                <!-- <i class="iconfont icon-mima"></i> -->
                密码：
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="密码 5-20位数字或字母" type="password" v-model="password">
            </div> 
            <div class="list">
                重复密码：<!-- <i class="iconfont icon-youxiang"></i> -->
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码" type="password" v-model="password_confirmation">
            </div>              
            <div class="list list3">
                验证码：
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码" type="text" v-model="code">
                <img class="yzm" :src="codeImg" alt="" @click="getCode">
            </div>                               
            <div class="err" v-if="pulicError">
                <i class="iconfont icon-baojing"></i>
                <span ref="pulicError">{{pulicError}}</span>
            </div>
            <div @click="registerTest" class="submit">
                    立即注册
            </div>
            <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div>
      </div>
  </div>
</template>


<script>
import store from '@/vuex/store'
import UserService from "@/service/public/UserService.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
      password_confirmation: "",
      phoneNumber: "",
      pulicError: "",
      register: [],
      codeImg: "/static/public/image/common/code.jpg",
      captcha_key: "",
      code: "",
      agent: null      
    }
  },
  methods:{
    async registerTest() {
      let staueAcc = this.validateAccount(this.userName);
      let stauePassword = this.validateAccount(this.password);
      if (!staueAcc) {
        this.pulicError = "账号 5-20位数字或字母";
        return false;
      }
      if (!stauePassword) {
        this.pulicError = "密码 5-20位数字或字母";
        return false;
      }

      if (this.password != this.password_confirmation) {
        this.pulicError = "两次密码不一致";
        return false;
      }
      if (this.code == "") {
        this.pulicError = "请输入验证码";
        return false;
      }
      if (this.code.length < 4 || this.code.length > 4) {
        this.pulicError = "请输入4位验证码";
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
        if (!this.register[i].value) {
          this.pulicError = this.register[i].placeholder;
          flag = false;
          break;
        }
        params[this.register[i].key] = this.register[i].value;
      }

      if (!flag) {
        return false;
      }

      if (this.agent) {
        params.agent = this.agent;
      }

      let res = await this.$http.post(
        `${this.$HOST_NAME}/checkUsername/${this.userName}`,
        {}
      );
      if (res && res.code == 200) {
      } else {
        this.pulicError = "用户名已存在";
        return false;
      }
      this.registerSubmit(params);
    },
    async registerSubmit(params) {
      let res = await this.$http.post(`${this.$HOST_NAME}/register`, params);
      if (res.code == 200) {
        UserService.setCache(res, "v1");
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
          localStorage.setItem("refund", JSON.stringify(refund));
        });
        window.location.reload();
      } else {
        this.dNotify(res.message, "error");
      }
    },
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
    }
  },
  created() {
    this.$nextTick(() => {
      this.agent = this.GetQueryString("agent");
      let registerPc = JSON.parse(localStorage.getItem("config")).register.pc;
      registerPc.forEach((v, i) => {
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
    });
  },  
  store
};
</script>
<style lang="less" scoped>
 .register-wrap{
     width: 382px;
     margin: 0 auto;
     padding-bottom: 50px;
     .list-box{
        .list{
            padding-bottom: 25px;
            position: relative;
            font-size: 16px;
            color: #333;
            text-align: right;
            input{
                width:296px;
                height: 46px;
                border: 1px solid #DBDBDB;
                border-radius: 3px;
                color: #444444;
                font-size: 16px;
                text-indent: 4px;
                outline: none;
                padding-left: 15px;
            }
            i{
                position: absolute;
                top: 5px;
                left: 13px;
                font-size: 24px;
                color: #949494;
            }
        } 
        .list.list3{
          padding-bottom: 30px;
          margin-left: -16px;
          .yzm {
            display: inline-block;
            cursor: pointer;
            width: 90px;
            height: 30px;
            position: absolute;
            right: 15px;
            top: 8px;
          }          
        }        
        .err{
            width:296px; 
            margin-left: 85px;
            height: 30px;
            line-height: 30px;
            color: #FF6600;
            font-size: 16px;
            border:1px solid #FF6600;
            background: #FDFFEF;
            border-radius: 3px;
            padding: 0 14px;
            margin-bottom: 20px;
            i{
                margin-right: 5px;
            }
        }
        .forget{
            font-size: 16px;
            color: #666;
            zoom: 1;
            overflow: hidden;
            padding-bottom: 26px;
            span{
                &:first-child{
                    float: left;
                    label{
                        text-decoration:underline; 
                        cursor: pointer;
                    }
                }           
            }
        }
        .treaty{
            font-size: 16px;
            color: #999; 
            text-align: right;
            padding-top: 30px;
        }       
        .submit{
            width:296px;
            height:45px; 
            margin-left: 86px;
            margin-top: 5px;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            background:#FF0024;
            color: #fff;
            border-radius: 5px;   
            cursor: pointer;       
        }         
     }
 }
</style>