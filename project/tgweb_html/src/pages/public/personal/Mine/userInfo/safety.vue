<template>
  <div class="safety">


    <!--  安全问题首页-->
    <div class="safety-list">


      <div class="row clearfloat">
        <div class="row-left fl">
          <img src="../../../../../assets/img/public/image/common/personal/userInfo/safe-login@3x.png" alt="">
          <span>登录密码</span>
        </div>
        <div @click="goUpdate('/personal_index/update_pwd/0')" class="row-right fr">
          <span>修改</span>
          <span class=" cubeic-arrow"></span>
        </div>
      </div>

      <div class="row clearfloat">
        <div class="row-left fl">
          <img src="../../../../../assets/img/public/image/common/personal/userInfo/safe-transaction@3x.png" alt="">
          <span>资金密码</span>
        </div>
        <div class="row-right fr" @click="keyboardShow" v-if="this.$store.state.mainState.userinfo.payPassword!='set'">
          <span>未设置</span>
          <span class=" cubeic-arrow"></span>
        </div>
        <div @click="goUpdate('/personal_index/update_pwd/1')" v-else class="row-right fr">
          <span>修改</span>
          <span class=" cubeic-arrow"></span>
        </div>
      </div>
      <div class="row clearfloat">
        <div class="row-left fl">
          <img src="../../../../../assets/img/public/image/common/personal/userInfo/safe-safe@3x.png" alt="">
          <span>安全问题</span>
        </div>
        <div @click="goUpdate('/personal_index/mibao')" class="row-right fr">
          <span>修改</span>
          <span class=" cubeic-arrow"></span>
        </div>
      </div>


    </div>


    <!-- 修改交易密码 -->
    <div class="keyboard" v-if="showKeyboard">
      <div class="title">
        <i class="cubeic-close fl" @click="showKeyboard = false"></i>
        请设置资金密码
        <span class="fr" @click="submitPay">完成</span>
      </div>
      <div class="reminder">
        为了保障您的资金安全，请牢记资金密码
      </div>
      <van-password-input class="pasyworld" :value="value"/>
      <van-number-keyboard :show="showKeyboard" class="numberKey" @input="onInput" @delete="onDelete"/>
    </div>


  </div>
</template>

<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        showKeyboard: false,
        value: ''
      }
    },
    methods: {
      onInput (key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete () {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      submitPay () {
        this.$http
          .post(`${this.$HOST_NAME}/member/resetMember`, {
            payPassword: this.value
          })
          .then(res => {
            if (res.status == 'success') {
              this.showKeyboard = false
              this.value = ''
              UserService.vpGetBasicInfo.call(this)
              // this.$confirm("设置成功");
              this.$toast.success('设置成功')
            } else {
              // this.$errToast(res.message);

            }
          })
      },
      keyboardShow () {
        if (localStorage.Public_User == 'test') {
          this.$newToast('试玩用户无权限，请注册正式用户')
        } else {
          this.showKeyboard = true
        }
      },
      goUpdate (link) {
        if (localStorage.Public_User == 'test') {
          this.$newToast('试玩用户无权限，请注册正式用户')
        } else {
          this.$router.push(link)
        }
      }
    },
    store
  }
</script>

<style lang="less" scoped>
  .safety {
    .safety-list {
      margin-top: 0.1rem;
      background: #fff;
      padding: 0 0.2rem;
      .row {
        height: 1.02rem;
        border-bottom: 1px solid #f5f5f5;
        padding: 0.24rem 0;
        .row-left {
          img {
            width: 0.54rem;
            height: 0.54rem;
            vertical-align: middle;
          }
          span {
            font-size: 0.28rem;
            padding-left: 0.1rem;
          }
        }
        .row-right {
          padding-top: 0.12rem;
          span {
            font-size: 0.3rem;
            color: #898989;
          }
        }
      }
    }
    .keyboard {
      background: #fff;
      margin-top: 2.3rem;
      padding-bottom: 0.1rem;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .title {
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.34rem;
        padding: 0 0.3rem;
        span {
          font-size: 0.34rem;
        }
      }
      .reminder {
        height: 1.1rem;
        line-height: 1.1rem;
        text-align: center;
        font-size: 0.3rem;
        border-top: 1px solid #dbdbdb;
      }
      .pasyworld {
        ul {
          li {
            width: 1.14rem;
            height: 1.04rem;
          }
        }
      }
      .numberKey {
        position: initial;
        margin-top: 0.1rem;
        border-top: none;
      }
    }
  }
</style>
