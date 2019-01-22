<template>
  <div class="login-wrap">
    <div class="list-box">
      <div class="list">
        <!-- <i class="iconfont icon-yonghu"></i> -->
        账户：
        <input @keydown="pulicError=''" placeholder="帐号(5-20位数字或字母)" type="text" v-model="passKey.userName"
               @blur="getCode">
      </div>
      <div class="list">
        <!-- <i class="iconfont icon-mima"></i> -->
        密码：
        <input @keydown="pulicError=''" placeholder="密码(5-20位数字或字母)" type="password" v-model="passKey.password">
      </div>
      <div class="list list3">
        验证码：
        <input @keydown="pulicError=''" placeholder="请输入验证码" type="text" v-model="passKey.code">
        <img class="yzm" :src="codeImg" alt="" @click="getCode">
      </div>
      <div class="err" v-if="pulicError">
        <i class="iconfont icon-baojing"></i>
        <span ref="pulicError">{{pulicError}}</span>
      </div>
      <div @click="login" class="submit">
        立即登录
      </div>
      <div class="forget">
        <span>没有账号？<label @click="register">立即注册</label></span>
        <!-- <span>
            忘记登录密码？
            </span> -->
      </div>
    </div>
  </div>
</template>


<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        passKey: {
          userName: '',
          password: '',
          code: ''
        },
        pulicError: '',
        codeImg: '/static/public/image/common/code.jpg',
      }
    },
    methods: {
      getCode () {
        if (!this.passKey.userName) {
          this.pulicError = '请输入6位帐号'
          // alert("请输入6位帐号");
          return false
        }

        if (this.passKey.userName.length < 6) {
          // alert("请输入6位帐号");
          this.pulicError = '请输入6位帐号'
          this.passKey.userName = ''
          // var oInput = document.getElementById("userName");
          // oInput.focus();
          return false
        }
        this.$http.post(`${this.$HOST_NAME}/captcha`, {
          userName: this.passKey.userName
        }).then(res => {
          if (res.code == 200) {
            this.codeImg = res.data.captcha_image_text
            this.passKey.captcha_key = res.data.captcha_key
          } else {
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: res.message,
              model: 'warn'
            })
          }
        })
      },
      login () {
        if (this.passKey.userName == '') {
          alert('请务必输入账号')
          return false
        }
        if (this.passKey.userName.length < 6) {
          alert('请务必输入6位账号')
          return false
        }
        if (this.passKey.password == '') {
          alert('密码请务必输入')
          return false
        }
        if (this.passKey.password.length < 6) {
          alert('请务必输入6位密码')
          return false
        }
        if (this.passKey.code == '') {
          alert('验证码请务必输入')
          return false
        }
        if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
          alert('请输入4位验证码')
          return false
        }

        this.$http.post(`${this.$HOST_NAME}/login`, this.passKey).then(res => {
          if (res.code == 200) {
            this.$http
              .post(`${this.$HOST_NAME}/member/refundInfo`)
              .then(res => {
                let refund = res.data.platform
                localStorage.setItem('refund', JSON.stringify(refund))
              })
              .then(res => {
                window.location.reload()
              })
            UserService.setCache(res, 'v1', 'login')

            // setTimeout(() => {
            //   window.location.href = "/static/public/html/clause.html";
            // }, 500);
          } else {
            alert(res.message)
          }
        })
      },
      // 打开注册界面
      register () {
        this.$store.commit('alert/setChooseModel', '用户注册')
        this.$store.commit('alert/setLoginTitle', '用户注册')
      }
    },
    store
  }
</script>
<style lang="less" scoped>
  .login-wrap {
    width: 350px;
    margin: 0 auto;
    padding-bottom: 50px;
    .list-box {
      .list {
        padding-bottom: 25px;
        position: relative;
        font-size: 16px;
        color: #333;
        input {
          width: 296px;
          height: 46px;
          border: 1px solid #DBDBDB;
          border-radius: 3px;
          color: #444444;
          font-size: 16px;
          text-indent: 4px;
          outline: none;
          padding-left: 15px;
        }
      }
      .list.list3 {
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
      .err {
        width: 296px;
        margin-left: 52px;
        height: 30px;
        line-height: 30px;
        color: #FF6600;
        font-size: 16px;
        border: 1px solid #FF6600;
        background: #FDFFEF;
        border-radius: 3px;
        padding: 0 14px;
        margin-bottom: 20px;
        i {
          margin-right: 5px;
        }
      }
      .forget {
        font-size: 16px;
        color: #999;
        zoom: 1;
        overflow: hidden;
        padding-top: 30px;
        text-align: center;
        span {
          &:first-child {
            // float: left;
            label {
              text-decoration: underline;
              color: #FF6D0E;
              cursor: pointer;
            }
          }
          // &:last-child{
          //     // float: right;
          //     cursor: pointer;
          // }
        }
      }
      .submit {
        width: 296px;
        height: 45px;
        font-size: 18px;
        text-align: center;
        line-height: 45px;
        background: #FF0024;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 52px;
      }
    }
  }
</style>
