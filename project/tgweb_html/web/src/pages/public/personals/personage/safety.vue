<template>
  <div class="safety">
    <div class="header">
      <ul>
        <li>
          <span>账户安全</span>
        </li>
        <li class="aisle">
          <span :class="{spanActive:spanActive ==0}" @click="toggle(0)">修改登录密码</span>
        </li>
        <li class="aisle">
          <span :class="{spanActive:spanActive ==1}" @click="toggle(1)">修改资金密码</span>
        </li>
        <li class="aisle">
          <span :class="{spanActive:spanActive ==2}" @click="toggle(2)">修改密保问题</span>
        </li>
      </ul>
    </div>

    <div class="content">

      <div class="setLoginPaw" v-if="setLoginPaw">
        <div class="row">
          <label>
            旧密码：
          </label>
          <input type="password" v-model="param.oldpassword">
        </div>
        <div class="row">
          <label>
            新密码：
          </label>
          <input type="password" v-model="param.password">
        </div>
        <div class="row">
          <label>
            确认密码：
          </label>
          <input type="password" v-model="param.password_confirmation">
        </div>
        <!-- <div class="row">
                                          <label>
                                               密保问题：
                                          </label>
                                         <Select v-model="param.loginKey">
                                              <Option v-for="(item,i) in secretKeyList" :key="i" :value="item">{{item}}</Option>
                                          </Select>
                                      </div>
                                        <div class="row">
                                          <label>
                                               密保答案：
                                          </label>
                                          <input type="text" v-model="param.loginVal">
                                      </div> -->
      </div>

      <div class="setPayPwd" v-if="setPayPwd">
        <div class="row">
          <label>
            旧资金密码：
          </label>
          <input type="password" v-model="param.oldPay">
        </div>
        <div class="row">
          <label>
            新资金密码：
          </label>
          <input type="password" v-model="param.newPay">
        </div>
        <div class="row">
          <label>
            确认密码：
          </label>
          <input type="password" v-model="param.confirmPay">
        </div>
        <div class="row">
          <label>
            密保问题：
          </label>
          <Select v-model="param.payKey">
            <Option v-for="(item,i) in secretKeyList" :key="i" :value="item">{{item}}</Option>
          </Select>
        </div>
        <div class="row">
          <label>
            密保答案：
          </label>
          <input type="text" v-model="param.payVal">
        </div>
      </div>

      <div class="setEncrypted" v-if="setEncrypted">
        <div class="row">
          <label>
            密保问题：
          </label>
          <Select v-model="param.oldkey">
            <Option v-for="(item,i) in secretKeyList" :key="i" :value="item">{{item}}</Option>
          </Select>
        </div>
        <div class="row">
          <label>
            密保答案：
          </label>
          <input type="text" v-model="param.oldValue">
        </div>

        <div class="row" v-if="this.$store.state.mainState.userinfo.secret">
          <label>
            新密保问题：
          </label>
          <Select v-model="param.newKey">
            <Option v-for="(item,i) in secretKeyList" :key="i" :value="item">{{item}}</Option>
          </Select>
        </div>
        <div class="row" v-if="this.$store.state.mainState.userinfo.secret">
          <label>
            新密保答案：
          </label>
          <input type="text" v-model="param.newValue">
        </div>

      </div>

    </div>

    <div class="submitPay" @click="submitPwd">
      确认提交
    </div>

    <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
      {{toastText}}
    </div>

  </div>
</template>

<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        amount: '',
        setLoginPaw: true,
        setPayPwd: false,
        setEncrypted: false,
        secretKeyList: [],
        param: {},
        toastShow: false,
        toastNum: 96,
        toastText: ''
      }
    },
    methods: {
      toggle (i) {
        // this.spanActive = i;
        this.$store.commit('bankSafety', i)
        this.param = {}
        this.toastShow = false
        switch (i) {
          case 0:
            this.setLoginPaw = true
            this.setPayPwd = false
            this.setEncrypted = false
            break
          case 1:
            this.setLoginPaw = false
            this.setPayPwd = true
            this.setEncrypted = false
            break
          case 2:
            this.setLoginPaw = false
            this.setPayPwd = false
            this.setEncrypted = true
            break
        }
      },
      secretKey () {
        this.$http.post(`${this.$HOST_NAME}/member/secretKey`).then(res => {
          if (res.code == 200) {
            this.secretKeyList = res.data
            this.key = res.data[0]
            this.loginKey = res.data[0]
          }
        })
      },
      submitPwd () {
        let url
        let param = {}
        if (this.spanActive == 0) {
          url = `${this.$HOST_NAME}/member/resetPassword`
          param.oldpassword = this.param.oldpassword
          // let isOldPwd = this.valiPwdAccount(param.oldpassword);
          if (!param.oldpassword) {
            this.toastShow = true
            this.toastText = '请输入6位旧密码'
            this.toastNum = 96
            this.reset(0)
            return false
          }
          param.password = this.param.password
          // let isNewPwd = this.valiPwdAccount(param.password);
          if (!param.password) {
            this.toastShow = true
            this.toastText = '请输入6位新密码'
            this.toastNum = 152
            this.reset(0)
            return false
          }
          param.password_confirmation = this.param.password_confirmation
          if (param.password_confirmation !== param.password) {
            this.toastShow = true
            this.toastText = '两次密码不一致'
            this.toastNum = 210
            this.reset(0)
            return false
          }
          if (param.password === param.oldpassword) {
            this.toastShow = true
            this.toastText = '新密码不能与原密码一致'
            this.toastNum = 152
            this.reset(0)
            return false
          }
          // param.key = this.param.loginKey;
          // if (!param.key) {
          //   this.toastShow = true;
          //   this.toastText = "请选择密保问题";
          //   this.toastNum = 265;
          //   return false;
          // }
          // param.value = this.param.loginVal;
          // if (!param.value) {
          //   this.toastShow = true;
          //   this.toastText = "请输入密保答案";
          //   this.toastNum = 322;
          //   return false;
          // }
        } else if (this.spanActive == 1) {
          url = `${this.$HOST_NAME}/member/resetPayPassword`
          param.oldpassword = this.param.oldPay
          if (!param.oldpassword) {
            this.toastShow = true
            this.toastText = '请输入6位旧密码'
            this.toastNum = 96
            this.reset(1)
            return false
          }
          param.paypassword = this.param.newPay
          if (!param.paypassword) {
            this.toastShow = true
            this.toastText = '请输入6位新密码'
            this.toastNum = 152
            this.reset(1)
            return false
          }
          param.password_confirmation = this.param.confirmPay
          if (param.password_confirmation !== param.paypassword) {
            this.toastShow = true
            this.toastText = '两次密码不一致'
            this.toastNum = 210
            this.reset(1)
            return false
          }
          if (param.paypassword === param.oldpassword) {
            this.toastShow = true
            this.toastText = '新密码不能与原密码一致'
            this.toastNum = 152
            this.reset(1)
            return false
          }
          param.key = this.param.payKey
          if (!param.key) {
            this.toastShow = true
            this.toastText = '请选择密保问题'
            this.toastNum = 265
            return false
          }
          param.value = this.param.payVal
          if (!param.value) {
            this.toastShow = true
            this.toastText = '请输入密保答案'
            this.toastNum = 322
            return false
          }
        } else {
          url = `${this.$HOST_NAME}/member/secret`
          param.key = this.param.oldkey
          if (!param.key) {
            this.toastShow = true
            this.toastText = '请选择密码问题'
            this.toastNum = 96
            return false
          }
          param.value = this.param.oldValue
          if (!param.value) {
            this.toastShow = true
            this.toastText = '请输入密保答案'
            this.toastNum = 152
            return false
          }
          param.newKey = this.param.newKey
          param.newValue = this.param.newValue
          if (param.value === param.newValue) {
            this.toastShow = true
            this.toastText = '新密保不能与原密保一致'
            this.toastNum = 265
            this.reset(2)
            return false
          }
        }

        this.toastShow = false
        this.$http.post(url, param).then(res => {
          if (res.code == 200) {
            if (
              !this.$store.state.mainState.userinfo.secret &&
              url.includes('/member/secret')
            ) {
              this.$success('设置成功')
            } else {
              this.$success('修改成功')
            }

            this.param = {}
            UserService.vpGetBasicInfo.call(this)
          } else {
            this.$error(res.message)
          }
        })
      },
      reset (index) {
        switch (index) {
          case 1: //资金密码
            this.param.newPay = ''
            this.param.confirmPay = ''
            break
          case 2: //密保问题
            this.param.oldValue = ''
            this.param.newValue = ''
            break
          default: //登陆密码
            this.param.password = ''
            this.param.password_confirmation = ''
            this.break
        }
      }
    },
    created () {
      this.secretKey()
      if (this.$store.state.personal.bankSafety == 2) {
        this.setLoginPaw = false
        this.setPayPwd = false
        this.setEncrypted = true
      }
    },
    destroyed () {
      this.$store.commit('bankSafety', 0)
    },
    computed: {
      spanActive () {
        return this.$store.state.personal.bankSafety
      }
    },
    store
  }
</script>

<style lang="less" scoped>
  .safety {
    padding: 0 14px;
    .header {
      border-bottom: 1px solid #f3f3f3;
      height: 66px;
      color: #696969;
      line-height: 85px;
      padding-top: 10px;
      ul {
        li {
          // margin-left: 20px;
          padding: 0 20px;
          font-size: 1.8em;
          height: 40px;
          float: left;
          line-height: 40px;
          text-align: center;
          border-right: 1px solid #dbdbdb;
        }
        .aisle {
          border: none;
          font-size: 1.6em;
          font-weight: 200;
          padding: 0 20px;

          span {
            padding: 8px 20px;
            cursor: pointer;
          }
          .spanActive {
            background: linear-gradient(180deg, #fe8983, #f0b761);
            border-radius: 10px;
            color: #fff;
          }
        }
      }
    }
    .content {
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 25px;
      padding-top: 8px;

      .row {
        margin-top: 20px;
        label {
          width: 150px;
          display: inline-block;
          text-align: right;
          font-size: 15px;
          font-family: "Microsoft YaHei";
        }
        input {
          height: 36px;
          font-size: 16px;
          background: #f5f5f5;
          border: 0 solid #f5f5f5;
          border-radius: 10px;
          // padding: 0 16px;
          text-align: left;
          text-indent: 1em;
          -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
          -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
          box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
          color: #666;

          &:not(.other) {
            width: 242px;
            height: 36px;
            background: #f9f9f9;
          }
        }
        input:focus {
          outline: none !important;
          border: 1px solid rgba(254, 134, 93, 0.6);
          box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06),
          0 1px 10px 5px rgba(254, 134, 93, 0.14);
        }
        .ivu-select {
          width: 242px;
        }
      }
    }
    .submitPay {
      width: 140px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #fff;
      font-size: 1.8em;
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
      border-radius: 10px;
      margin-top: 25px;
      margin-left: 150px;
      display: inline-block;
      cursor: pointer;
    }
    .toast {
      width: 200px;
      height: 30px;
      line-height: 30px;
      background: #ff9900;
      color: #fff;
      font-size: 14px;
      font-weight: 200;
      position: absolute;
      right: 408px;
      top: 340px;
      border-radius: 5px;
      z-index: 99;
      text-indent: 1em;
    }
    .toast::after {
      content: "";
      width: 0;
      height: 0;
      border-width: 4px 8px 4px 0px;
      border-style: solid;
      border-color: transparent #f90 transparent transparent;
      display: block;
      position: absolute;
      top: 10px;
      left: -8px;
    }
  }
</style>
