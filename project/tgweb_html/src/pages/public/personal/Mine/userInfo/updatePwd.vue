<template>

  <div>
    <div class="uppwd" v-if="this.$route.params.id === '0'">

      <div class="pwdInput">
        <van-cell-group>
          <van-field placeholder="输入旧密码" type="password" v-model="loginOldPassword"/>
        </van-cell-group>
        <van-cell-group>
          <van-field placeholder="请输入6~20位新密码" type="password" v-model="loginNewPassword"/>
        </van-cell-group>
        <van-cell-group>
          <van-field placeholder="重复输入一次新密码" type="password" v-model="reLoginOldPassword"/>
        </van-cell-group>
      </div>

      <!-- <div class="mibao">
                               <div class="row">
                                      {{this.$store.state.mainState.userinfo.secret}}
                               </div>
                                   <van-cell-group>
                                    <van-field  placeholder="请输入密保答案" type="text" v-model="loginValue"/>
                                  </van-cell-group>
                         </div> -->
    </div>
    <div v-else>
      <van-cell-group>
        <van-field placeholder="输入旧密码" type="password" v-model="payOldPassword" maxlength="6"/>
      </van-cell-group>
      <van-cell-group>
        <van-field placeholder="请输入6位新密码" type="password" v-model="payNewPassword" maxlength="6"/>
      </van-cell-group>
      <van-cell-group>
        <van-field placeholder="重复输入一次新密码" type="password" v-model="password_confirmation" maxlength="6"/>
      </van-cell-group>
      <div class="mibao">
        <div class="row">
          {{this.$store.state.mainState.userinfo.secret}}
        </div>
        <van-cell-group>
          <van-field placeholder="请输入密保答案" type="text" v-model="payValue"/>
        </van-cell-group>
      </div>
    </div>

    <div class="add" @click="updataPwd">确认修改</div>
  </div>
</template>

<script>
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        loginOldPassword: '',
        loginNewPassword: '',
        reLoginOldPassword: '',
        payOldPassword: '',
        payNewPassword: '',
        password_confirmation: '',
        loginValue: '',
        payValue: ''
      }
    },
    methods: {
      updataPwd () {
        if (this.$route.params.id == '0') {
          let stauePassword = this.validateAccount(this.loginOldPassword)
          let newPassword = this.validateAccount(this.loginNewPassword)

          if (!stauePassword) {
            this.$newToast('请输入6-10位数字或字母旧密码')
            return false
          }
          if (!newPassword) {
            this.$newToast('请输入6-10位数字或字母新密码')
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
        } else {
          let isOldPwd = this.dInvalidMoney(this.payOldPassword)
          let isNewPwd = this.dInvalidMoney(this.payNewPassword)

          if (!this.payOldPassword || !isOldPwd) {
            this.$newToast('请输入6位数字旧资金密码')
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
      }
    },
    created () {},
    store
  }
</script>

<style lang="less" scoped>
  .uppwd {
    .pwdInput {
      padding: 0 0.2rem;
      background: #fff;
      color: #000;
    }
  }

  .mibao {
    margin-top: 0.3rem;
    background: #fff;
    padding: 0 0.1rem;
    .row {
      height: 1rem;
      line-height: 1rem;
      margin: 0 0.2rem;
      // border-bottom: 1px solid #dbdbdb;
      padding-left: 0.1rem;
    }
  }

  .add {
    height: 0.9rem;
    line-height: 0.9rem;
    background: #ff6700;
    text-align: center;
    color: #fff;
    border-radius: 0.15rem;
    margin: 0 0.2rem;
    margin-top: 0.3rem;
    font-size: 0.36rem;
  }

  .van-cell {
    padding: 0.2rem 0.3rem;
    line-height: 0.48rem;
    font-size: 0.28rem;
  }

  .van-key {
    font-size: 0.48rem;
    height: 1.08rem;
    line-height: 1.08rem;
  }
</style>
