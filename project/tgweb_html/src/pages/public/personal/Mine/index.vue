<template>
  <div class="mine">
    <cube-scroll>
      <!-- 我的头部 -->
      <div class="header">
        <!-- 头像 -->
        <div class="portrait fl" @click="$router.push({path:'/personal_index/personal_info'})">
          <img :src="this.$store.state.mainState.userinfo.pic|capitalize" alt="">
        </div>
        <!-- 会员信息 -->
        <div class="userInfo fl">
          <div class="info">
            <span>{{this.$store.state.mainState.userinfo.userName}}</span>
            <span>LV{{this.$store.state.mainState.userinfo.levelId}}</span>
            <!-- <router-link tag="span" to="/sign">签到</router-link> -->
          </div>
          <div class="F5-banlance">
            <p>可用余额：{{this.$store.state.mainState.balance||this.$store.state.mainState.userinfo.balance}}</p>
            <!-- <img :class="{f5Img:f5Img}" @click="getBalance" src="../../../../assets/img/public/image/common/personal/userInfo/f5.png" alt=""> -->
          </div>

          <!--会员等级和进度条暂时隐藏 -->
          <!-- <van-progress :percentage="50"  color="#fff"/>
                                                    <div class="dengji-logo">

                                                          <span></span>
                                                          <span></span>
                                                    </div> -->
        </div>
        <router-link tag="span" to="/personal_index/personal_info" class="setSpan"></router-link>
      </div>
      <!-- 存取款 -->
      <div class="paymaney clearfloat">
        <router-link tag="div" to="/personal_index/pay_money" class="fl">
          <img src="../../../../assets/img/public/image/common/personal/userInfo/deposit@3x.png" alt="">
          <span>我要存款</span>
        </router-link>
        <router-link tag="div" to="/personal_index/get_money" class="fr">
          <img src="../../../../assets/img/public/image/common/personal/userInfo/withdrawals@3x.png" alt="">
          <span>我要取款</span>
        </router-link>
      </div>
      <!-- 功能列表 -->
      <div class="functionList" v-for="(item,i) in functionList" :key="i">
        <router-link tag="div" :to="v.path" class="row" v-for="(v,i) in item" :key="i">
          <img :src="v.img" alt="">
          <div>
            <span>{{v.text}}</span>
            <span class="fr cubeic-arrow"></span>
          </div>

        </router-link>
      </div>
      <!--安全退出  -->
      <div class="loginout" @click="exit">
        安全退出
      </div>

      <div style="height:.3rem"></div>
    </cube-scroll>
  </div>
</template>

<script>
  import vpPubFooter from '@/pages/public/common/Footer'
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        functionList: [
          [{
            text: '游戏记录',
            img: require('../../../../assets/img/public/image/common/personal/userInfo/recording@3x.png'),
            path: '/personal_index/game_record'
          },
            {
              text: '帐变记录',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/Finance@3x.png'),
              path: '/personal/trading_record'
            },
            {
              text: '实时返水',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/backwater@3x.png'),
              path: '/personal_index/honest'
            }
          ],
          [{
            text: '个人资料',
            img: require('../../../../assets/img/public/image/common/personal/userInfo/persondata@3x.png'),
            path: '/personal_index/personal_info'
          },
            {
              text: '信息中心',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/mymessage@3x.png'),
              path: '/personal_index/message_index'
            },
            {
              text: '安全问题',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/safe@3x.png'),
              path: '/personal_index/safety'
            }
          ],
          [{
            text: '代理中心',
            img: require('../../../../assets/img/public/image/common/personal/userInfo/proxy@3x.png'),
            path: '/personal_index/agency_index'
          },
            {
              text: '团队管理',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/team@3x.png'),
              path: '/personal_index/team'
            },
            {
              text: '开户管理',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/account@3x.png'),
              path: '/personal_index/open_account'
            },
            {
              text: '财务管理',
              img: require('../../../../assets/img/public/image/common/personal/userInfo/Finance@3x.png'),
              path: '/personal_index/finance'
            }
          ]
        ],
        f5Img: false
      }
    },
    methods: {
      // 安全退出
      exit () {
        UserService.logout.call(this)
        this.$router.push('/')
        // this.$newToast("退出成功");
      },
      getBalance () {
        // if(!this.f5Img) return false;
        this.f5Img = true
        setTimeout(() => {
          if (localStorage.token) {
            this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
              if (res && res.code == 200) {
                this.$store.commit('mainState/resetBalance', res.data)
                this.f5Img = false
              }
            })
          }
        }, 500)
      }
    },
    created () {
      // 先判断用户是否登录了
      this.$nextTick(() => {
        if (!localStorage.token) {
          // this.$newToast("请先登录");
          //  让用户在登录页面返回到首页
          this.$router.push('/')
          this.$router.push('/admin/login')
        }
      })
    },
    components: {
      vpPubFooter
    },
    filters: {
      capitalize: function (value) {
        try {
          return require(`@assets/img/public/image/common/personal/proimt/${value}`)
        } catch (err) {
          return require(`@assets/img/public/image/common/personal/proimt/默认.png`)
        }
      }
    },
    store
  }
</script>

<style lang="less" scoped>
  @-webkit-keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .mine {
    background: #f8f8f8;
    padding-bottom: 0.98rem;
    height: 100%;
    .header {
      height: 2.9rem;
      width: 100%;
      background: url("../../../../assets/img/public/image/common/personal/userInfo/mine-bg.png") no-repeat;
      background-size: 100%;
      padding: 0.6rem 0.6rem 0 0.6rem;
      color: #fff;
      position: relative;
      .portrait {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: 0.26rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .userInfo {
        font-size: 0.3rem;
        .info {
          margin-bottom: 0.4rem;
          span:nth-child(2) {
            background: #fff;
            color: #000;
            padding: 0 0.08rem;
            margin: 0 0.2rem;
            border-radius: 0.08rem;
          }
          span:nth-child(3) {
            border: 0.02rem solid #fff;
            padding: 0.1rem 0.16rem;
          }
        }
      }
      .setSpan {
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        background: url("../../../../assets/img/public/image/common/personal/userInfo/set@3x.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0.2rem;
        right: 0.16rem;
      }
      .F5-banlance {
        position: relative;
        img {
          width: .3rem;
          position: absolute;
          top: -.05rem;
          right: -0.5rem;
        }
        .f5Img {
          -webkit-animation: animate 1s infinite linear;
          animation: animate 1s infinite linear;
          -moz-animation: animate 1s infinite linear;
          -o-animation: animate 1s infinite linear;
          -ms-animation: animate 1s infinite linear;
        }
      }
      .dengji-logo {
        margin-top: 0.1rem;
        position: relative;
        span {
          width: 0.24rem;
          height: 0.24rem;
          display: inline-block;
        }
        span:nth-child(1) {
          background: url("../../../../assets/img/public/image/common/personal/angencyImg/vip1.png") no-repeat;
          background-size: cover;
        }
        span:nth-child(2) {
          background: url("../../../../assets/img/public/image/common/personal/angencyImg/vip2.png") no-repeat;
          background-size: cover;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .paymaney {
      padding: 0.2rem 0.4rem;
      background: #fff;
      div {
        height: 0.8rem;
        width: 3.15rem;
        line-height: 0.8rem;
        text-align: center;
        background: #f7f6f6;
        border: 0.02rem solid #dbdbdb;
        border-radius: 0.1rem;
        img {
          width: 0.7rem;
          vertical-align: middle;
          padding-right: 0.25rem;
        }
        span {
          font-size: 0.3rem;
          color: #df0000;
          vertical-align: middle;
        }
      }
      div:last-child {
        span {
          color: #32a00e;
        }
      }
    }
    .functionList {
      background: #fff;
      margin-top: 0.2rem;
      .row {
        height: 0.9rem;
        padding-left: 0.84rem;
        position: relative;
        img {
          position: absolute;
          top: 0.16rem;
          left: 0.24rem;
          width: 0.58rem;
        }
        div {
          line-height: 0.9rem;
          border-bottom: 0.02rem solid #f5f5f5;
          margin-left: 0.24rem;
          font-size: 0.3rem;
          span:nth-child(2) {
            margin-right: 0.28rem;
            font-size: 0.3rem;
            color: #aaa;
            // margin-top: 0.05rem;
          }
        }
      }
      .row:last-child {
        div {
          border-bottom: none;
        }
      }
    }
    .apply-agency {
      height: 0.98rem;
      padding-left: 0.84rem;
      // margin-top: .02rem;
      position: relative;
      background: #fff;
      img {
        position: absolute;
        top: 0.24rem;
        left: 0.24rem;
        width: 0.58rem;
      }
      div {
        line-height: 0.98rem;
        border-top: 0.02rem solid #dbdbdb;
        margin-left: 0.24rem;
        font-size: 0.3rem;
        span:nth-child(2) {
          margin-right: 0.28rem;
          font-size: 0.3rem;
          color: #aaa;
        }
      }
    }
    .loginout {
      height: 0.9rem;
      line-height: 0.9rem;
      margin: 0.3rem 0.2rem;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      color: #fff;
      text-align: center;
      font-size: 0.36rem;
      border-radius: 0.15rem;
      // margin-bottom: 1.5rem;
    }
  }
</style>
