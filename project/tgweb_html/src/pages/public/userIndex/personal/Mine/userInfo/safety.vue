<template>
  <div class="safety">


    <div class="safety-content">

      <nav>

        <a v-for="(item,index) in safetyData" :key="index" :class="{'active':index ==safetyNum }"
           @click="safetyNum =index">

          {{item.title}}

        </a>

      </nav>

      <div class="safety-view " v-if="safetyNum ==0">

        <div class="row">

          <label>原登录密码</label>

          <input type="password" placeholder="请输入原登录密码" v-model="loginOldPassword">

        </div>

        <div class="row">

          <label>新登录密码</label>

          <input type="password" placeholder="请输入新密码" v-model="loginNewPassword">

        </div>

        <div class="row">

          <label>确认密码</label>

          <input type="password" placeholder="重新输入新密码" v-model="reLoginOldPassword">

        </div>


      </div>


      <div class="safety-view" v-if="safetyNum ==1 && this.$store.state.mainState.userinfo.payPassword=='set'">

        <div class="row">

          <label>原资金密码</label>

          <input type="password" placeholder="请输入原资金密码" v-model="payOldPassword" maxlength="6">

        </div>

        <div class="row">

          <label>新资金密码</label>

          <input type="password" placeholder="请输入新密码" v-model="payNewPassword" maxlength="6">

        </div>

        <div class="row">

          <label>确认密码</label>

          <input type="password" placeholder="重新输入新密码" v-model="password_confirmation" maxlength="6">

        </div>

      </div>


      <div class="up-mibao" v-if="safetyNum ==1 && this.$store.state.mainState.userinfo.payPassword=='set'">

        <p>请回答密保问题</p>

        <div class="row">

          <label>密保问题</label>

          <span>{{this.$store.state.mainState.userinfo.secret}}</span>

        </div>

        <div class="row">

          <label>密保答案</label>

          <input type="text" placeholder="请输入密保答案" v-model="payValue">

        </div>

      </div>


      <div class="safety-view" v-if="safetyNum ==1 && this.$store.state.mainState.userinfo.payPassword=='noset'">
        <div class="row">

          <label>资金密码</label>

          <input type="password" placeholder="请输入6位资金密码" v-model="payNewPassword">

        </div>

        <div class="row">

          <label>确认密码</label>

          <input type="password" placeholder="重新输入6位资金密码" v-model="password_confirmation">

        </div>
      </div>


      <div class="set-mibao" v-if="safetyNum ==2">

        <div class="old-mibao" v-if="this.$store.state.mainState.userinfo.secret">

          <p>请回答原密保问题</p>

          <div class="row">

            <label>密保问题</label>

            <span>{{this.$store.state.mainState.userinfo.secret}}</span>

          </div>

          <div class="row">

            <label>密保答案</label>

            <input type="text" placeholder="请输入密保答案" v-model="value">

          </div>

          <p>请设置新密保问题</p>

          <div class="row">

            <label>密保问题</label>

            <cube-select :options="secretData" v-model="newKey"></cube-select>

          </div>

          <div class="row">

            <label>密保答案</label>

            <input type="text" placeholder="请输入密保答案" v-model="newValue">

          </div>

        </div>

        <div v-else class="new-mibao">

          <div class="row">

            <label>密保问题</label>

            <cube-select :options="secretData" v-model="newKey"></cube-select>

          </div>

          <div class="row">

            <label>密保答案</label>

            <input type="text" placeholder="请输入密保答案" v-model="newValue">

          </div>

        </div>

      </div>


      <div class="submitBt bg-color " @click="updataPwd">{{upText}}</div>

    </div>

  </div>
</template>

<script>
  import store from '@/vuex/store'

  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        safetyData: [
          {
            title: '登录密码'
          },

          {
            title: '资金密码'
          },

          {
            title: '密保问题'
          }
        ],

        secretData: [],

        safetyNum: 0,

        loginOldPassword: '',

        loginNewPassword: '',

        reLoginOldPassword: '',

        payOldPassword: '',

        payNewPassword: '',

        password_confirmation: '',

        loginValue: '',

        payValue: '',

        // 密保

        value: '',

        newKey: '',

        newValue: ''
      }
    },

    methods: {
      updataPwd () {
        if (this.safetyNum == 0) {
          let stauePassword = this.validateAccount(this.loginOldPassword)

          let newPassword = this.validateAccount(this.loginNewPassword)

          if (!stauePassword) {
            this.$newToast('请输入6-20位数字或字母原密码')

            return false
          }

          if (!newPassword) {
            this.$newToast('请输入6-20位数字或字母新密码')

            return false
          }

          if (this.reLoginOldPassword !== this.loginNewPassword) {
            this.$newToast('两次密码不一致')

            return false
          }

          // if (!this.loginValue) {

          //   this.$newToast("请输入密码答案");

          //   return false;

          // }

          this.$http

            .post(`${this.$HOST_NAME}/member/resetPassword`, {
              oldpassword: this.loginOldPassword,

              password: this.loginNewPassword,

              password_confirmation: this.reLoginOldPassword

              // key: this.$store.state.mainState.userinfo.secret,

              // value: this.loginValue
            })

            .then(res => {
              if (res.code == 200) {
                // this.$confirm("修改成功");

                this.loginOldPassword = ''

                this.loginNewPassword = ''

                this.reLoginOldPassword = ''

                this.loginValue = ''

                this.$toast.success('修改成功')
              } else {
                // this.$errToast(res.message);
              }
            })
        } else if (this.safetyNum == 1) {
          if (this.$store.state.mainState.userinfo.payPassword !== 'set') {
            let isNewPwd = this.dInvalidMoney(this.payNewPassword)
            if (!this.payNewPassword || !isNewPwd) {
              this.$newToast('请输入6位数字资金密码')
              return false
            }
            if (this.password_confirmation !== this.payNewPassword) {
              this.$newToast('两次密码不一致')

              return false
            }
            this.$http
              .post(`${this.$HOST_NAME}/member/resetMember`, {
                payPassword: this.payNewPassword
              })
              .then(res => {
                if (res.code == 200) {
                  this.payNewPassword = ''
                  this.password_confirmation = ''
                  UserService.vpGetBasicInfo.call(this)
                  // this.$confirm("设置成功");
                  this.$toast.success('设置成功')
                } else {
                  // this.$errToast(res.message);
                }
              })
          } else {
            let isOldPwd = this.dInvalidMoney(this.payOldPassword)

            let isNewPwd = this.dInvalidMoney(this.payNewPassword)

            if (!this.payOldPassword || !isOldPwd) {
              this.$newToast('请输入6位数字原资金密码')

              return false
            }

            if (!this.payNewPassword || !isNewPwd) {
              this.$newToast('请输入6位数字新资金密码')

              return false
            }

            if (this.password_confirmation !== this.payNewPassword) {
              this.$newToast('两次密码不一致')

              return false
            }

            if (!this.payValue) {
              this.$newToast('请输入密保答案')

              return false
            }

            this.$http

              .post(`${this.$HOST_NAME}/member/resetPayPassword`, {
                oldpassword: this.payOldPassword,

                paypassword: this.payNewPassword,

                password_confirmation: this.password_confirmation,

                key: this.$store.state.mainState.userinfo.secret,

                value: this.payValue
              })

              .then(res => {
                if (res.code == 200) {
                  this.payOldPassword = ''

                  this.payNewPassword = ''

                  this.password_confirmation = ''

                  this.payValue = ''

                  this.$toast.success('修改成功')
                } else {
                  // this.$errToast(res.message);
                }
              })
          }
        } else {
          let param = {}

          if (this.$store.state.mainState.userinfo.secret) {
            param.key = this.$store.state.mainState.userinfo.secret

            param.value = this.value

            if (!param.value) {
              this.$newToast('请输入原密保答案')

              return false
            }

            param.newKey = this.newKey

            if (!param.newKey) {
              this.$newToast('请选择新密保问题')

              return false
            }

            param.newValue = this.newValue

            if (!param.newValue) {
              this.$newToast('请输入新密保答案')

              return false
            }
          } else {
            param.key = this.newKey

            if (!param.key) {
              this.$newToast('请选择密保答案')

              return false
            }

            param.value = this.newValue

            if (!param.value) {
              this.$newToast('请输入密保答案')

              return false
            }
          }

          this.$http.post(`${this.$HOST_NAME}/member/secret`, param).then(res => {
            if (res.code == 200) {
              // this.$confirm("设置成功");

              this.$toast.success('设置成功')

              this.value = ''

              this.newKey = ''

              this.newValue = ''

              UserService.vpGetBasicInfo.call(this)
            } else {
              // this.$errToast(res.message);
            }
          })
        }
      },

      secretKey () {
        this.$http.post(`${this.$HOST_NAME}/member/secretKey`).then(res => {
          if (res.code == 200) {
            this.secretData = res.data
            this.newKey = res.data[0]
          } else {
          }
        })
      }
    },

    created () {
      this.secretKey()
    },

    computed: {
      upText () {
        if (this.safetyNum == 0) return '修改登录密码'

        if (this.safetyNum == 1) return '修改资金密码'

        if (this.safetyNum == 2) return '修改密保问题'
      }
    },

    store
  }
</script>

<style lang="less" soped>
  .safety {

    .safety-content {
      nav {
        display: flex;

        background: #fff;

        padding: 0.25rem 0;

        a {
          flex: 1;

          text-align: center;

          font-size: 0.28rem;

          position: relative;
        }
      }

      .safety-view {
        margin-top: 0.2rem;

        padding-left: 0.3rem;

        background: #fff;

        .row {
          height: 45px;

          font-size: 0.3rem;

          color: #424242;

          line-height: 45px;

          position: relative;

          overflow: hidden;

          display: flex;

          label {
            // width: 25%;

            flex: 1;

            display: inline-block;
          }

          input {
            // width: 65%;

            flex: 3;

            font-size: 0.28rem;

            color: #424242;
          }

          &:last-child {
            border: none;
          }
        }
      }

      .up-mibao {
        background: #fff;

        p {
          height: 40px;

          line-height: 45px;

          font-size: 0.28rem;

          color: #666;

          background: #f6f6f8;

          padding-left: 0.3rem;
        }

        .row {
          height: 45px;

          font-size: 0.3rem;

          color: #424242;

          line-height: 45px;

          position: relative;

          overflow: hidden;

          display: flex;

          margin-left: 0.3rem;

          label {
            // width: 25%;

            flex: 1;

            display: inline-block;
          }

          input {
            // width: 65%;

            flex: 3;

            font-size: 0.28rem;

            color: #424242;
          }

          span {
            flex: 3;

            font-size: 0.28rem;

            color: #424242;
          }

          &:last-child {
            border: none;
          }
        }
      }

      .set-mibao {
        background: #fff;

        .new-mibao {
          margin-top: 0.2rem;
        }

        p {
          height: 40px;

          line-height: 45px;

          font-size: 0.28rem;

          color: #666;

          background: #f6f6f8;

          padding-left: 0.3rem;
        }

        .row {
          height: 45px;

          font-size: 0.3rem;

          color: #424242;

          line-height: 45px;

          position: relative;

          overflow: hidden;

          display: flex;

          margin-left: 0.3rem;

          label {
            // width: 25%;

            flex: 1;

            display: inline-block;
          }

          input {
            // width: 65%;

            flex: 3;

            font-size: 0.28rem;

            color: #424242;
          }

          span {
            flex: 3;

            font-size: 0.28rem;

            color: #424242;
          }

          .cube-select {
            flex: 3;

            padding: 0.1rem 0.4rem 0.2rem 0.2rem;

            border-radius: 0.04rem;

            font-size: 0.28rem;

            background-color: transparent;

            .cube-select-text {
              line-height: 35px;
            }

            .cube-select-placeholder {
              display: none;
            }

            .cube-select-text {
              color: #424242;
            }
            &::before {
              top: 14px;
            }
          }

          .cube-select::after {
            border: none;
          }

          &:last-child {
            border: none;
          }
        }
      }
    }

    .submitBt {
      height: 0.9rem;

      line-height: 0.9rem;

      // background: #ff6700;

      text-align: center;

      color: #fff;

      // border-radius: 0.15rem;

      margin: 0 0.2rem;

      margin-top: 0.3rem;

      font-size: 0.36rem;
    }
  }
</style>
