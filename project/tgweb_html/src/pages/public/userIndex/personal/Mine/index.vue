<template>
  <!-- <div class="Index"> -->
    <div class="mine mescroll" id="mescroll">
      <!-- <cube-scroll :options="options"> -->
    <!-- <div id="dataList"> -->
      <!-- 头部 -->
    
      <div class="mine-header ">

        <div class="mine-bg-img">
          <h2>个人中心</h2>

          <div class="longin-after" v-if="!isLogin" @click="goTo('/admin/login')">

            登录/注册

          </div>

          <div class="login-before" v-else>

            <div class="user-img">

              <img :src="this.$store.state.mainState.userinfo.pic|capitalize" alt="">

            </div>

            <div class="user-info">

              <p>{{this.$store.state.mainState.userinfo.userName}}</p>

              <p>

                <i :class="userlevelId"></i>

                <span>VIP{{this.$store.state.mainState.userinfo.levelId}}</span>

              </p>

            </div>

          </div>


          <!-- 取款导航 -->
          <ul class="tranparent">

            <li tag="li" @click="goTo(item.path)" class="tranparent-item" v-for="(item,index) in tranparentData"
                :key="index">

              <a class="list-font">

                <!-- <img :src="item.img" alt=""> -->
                <i :class="item.class"></i>

                <span class="textwhite">{{item.title}}</span>

              </a>

            </li>

          </ul>

        </div>

      </div>
 
      <!-- 代理 或者 会员余额 -->
      <div class="balance-view">

        <div class="balance-item mr-2 ">

          <div class="item-icon">

            <i class="icon iconfont h5-icon-tent-money text-color"></i>

          </div>

          <div class="item-text">

            <p class="user-banlance">账号余额</p>

            <p class="user-money">￥{{banlance}}</p>

          </div>

        </div>

        <div class="balance-item ">
          <div class="item-icon">

            <i class="icon iconfont h5-icon-h-proxy text-color"></i>

          </div>

          <div class="item-text">

            <p class="user-banlance">代理收入</p>

            <p class="user-money">￥{{banlance}}</p>

            <router-link tag="p" to="/personal_index/agency_getMoney" class="user-transfer">
              <span></span>
              <span>转账</span>
            </router-link>

          </div>
        </div>

      </div>

      <div class="balance-view" v-if="false">
        <div class="balance-user-item ">

          <div class="item-icon">

            <i class="icon iconfont h5-icon-tent-money text-color"></i>

          </div>

          <div class="item-text">

            <p class="user-banlance">账号余额<span class="user-money"> ￥{{banlance}}</span></p>

            <!-- <p class="user-money"></p> -->

          </div>

        </div>
      </div>


      <!-- 功能列表 -->
      <div class="functionList " v-for="(item,i) in functionList" :key="i">

        <div @click="goTo(v.path)" class="row" v-for="(v,i) in item" :key="i">

          <i :class="v.class" class="text-color"></i>

          <div>

            <span>{{v.text}}</span>

            <span class="fr icon iconfont h5-icon-next"></span>

            <span class="fr row-text">{{v.toast}}</span>

          </div>

        </div>

      </div>

    <!-- </div> -->
      <!-- </cube-scroll>  -->
  
    <!-- </div> -->

    <color-picker v-if="colorPickerShow" @colorPickerHide="colorPickerHide"></color-picker>
    <ios-alert title="清除缓存" v-if="iosAlertShow" :cancel="onCancel" :sure="onSure"></ios-alert>
  </div>
</template>

<script>
import colorPicker from "../components/colorPicker/colorPicker";

import store from "@/vuex/store";

// import BScroll from "better-scroll";

//  import MeScroll from 'mescroll.js'
//  import 'mescroll.js/mescroll.min.css'

// import iosAlert from "../components/iosAlert";

export default {
  data() {
    return {
      tranparentData: [
        {
          title: "我的信息",
          // img: require("../../../../assets/img/public/image/common/personal/userIndex/my-message@2x.png"),
          class: "icon iconfont h5-icon-my-message",
          path: "/personal_index/message_index"
        },

        {
          title: "我要充值",
          // img: require("../../../../assets/img/public/image/common/personal/userIndex/my-deposit@2x.png"),
          class: "icon iconfont h5-icon-my-deposit",
          path: "/personal_index/pay_money"
        },

        {
          title: "我要取款",
          // img: require("../../../../assets/img/public/image/common/personal/userIndex/my-draw@2x.png"),
          class: "icon iconfont h5-icon-my-draw",
          path: "/personal_index/get_money"
        }
      ],

      functionList: [
        [
          {
            text: "帐变记录",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/Finance@3x.png"),

            path: "/personal_index/trading_record",

            toast: "查看存/取款、转账记录",

            class: "icon iconfont h5-icon-tent-record"
          },

          {
            text: "投注记录",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/recording@3x.png"),

            path: "/personal_index/game_record",

            toast: "查看投注记录",

            class: "icon iconfont h5-icon-bet-record"
          },

          {
            text: "实时返水",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/backwater@3x.png"),

            path: "/personal_index/honest",

            toast: "查看反水记录",

            class: "icon iconfont h5-icon-backwater"
          }
        ],

        [
          {
            text: "代理中心",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/proxy@3x.png"),

            path: "/personal_index/agency_index",

            toast: "代理收益中心",

            class: "icon iconfont h5-icon-acting-center"
          },

          {
            text: "个人资料",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/persondata@3x.png"),

            path: "/personal_index/personal_info",

            toast: "修改用户详细资料",

            class: "icon iconfont h5-icon-personal-data"
          },

          {
            text: "账号安全",

            // img: require("../../../../assets/img/public/image/common/personal/userInfo/safe@3x.png"),

            path: "/personal_index/safety",

            toast: "设置用户密保问题",

            class: "icon iconfont h5-icon-account-safe"
          }
        ],

        [
          {
            text: "清除缓存",
            path: "clearCache",
            class: "icon iconfont h5-icon-clear-cache"
          },

          {
            text: "一键换肤",

            path: "toggleColor",

            class: "icon iconfont h5-icon-change-skin"
          },

          {
            text: "关于我们",
            path: "/personal_index/about",
            class: "icon iconfont h5-icon-about-us"
          }
        ]
      ],

      colorPickerShow: false,
      iosAlertShow: false,
      mescroll: null,
      options: {
        bounceTime: 600,
        // bounce:false,
        // momentum:false,
        // momentumLimitTime:500
        swipeTime: 500
        // momentumLimitDistance:50,
        // swipeBounceTime:800,
        // deceleration:0.10
      }
    };
  },

  methods: {
    goTo(path) {
      if (path == "clearCache") {
        this.iosAlertShow = true;
        return false;
      }
      if (path == "toggleColor") {
        this.colorPickerShow = true;
        return false;
      }
      if (!localStorage.token) {
        location.href = "#/admin/login";
        return false;
      } else {
        this.$router.push(path);
      }
    },

    colorPickerHide() {
      this.colorPickerShow = false;
    },
    onSure() {
      this.iosAlertShow = false;
      this.$newToast("清除成功！");
    },
    onCancel() {
      this.iosAlertShow = false;
    }
  },
  mounted() {
    // this.mescroll = new MeScroll("mescroll", {
    //   down:{
    //       warpClass :'aaa',
    //        callback:()=>{
    //           this.mescroll.endDownScroll();
    //        }
    //   }
    // });
    // this.mescroll.endDownScroll();
  },

  components: {
    colorPicker
  },

  computed: {
    isLogin() {
      if (localStorage.token) return true;

      return false;
    },
    banlance() {
      if (localStorage.token)
        return (
          this.$store.state.mainState.balance ||
          this.$store.state.mainState.userinfo.balance
        );
      return "0.00";
    },
    userlevelId() {
      if (localStorage.token)
        return (
          "icon iconfont h5-icon-level-V" +
          this.$store.state.mainState.userinfo.levelId
        );
      return "icon iconfont h5-icon-level-V1";
    }
  },

  filters: {
    capitalize: function(value) {
      try {
        return require(`@assets/img/public/image/common/personal/proimt/${value}`);
      } catch (err) {
        return require(`@assets/img/public/image/common/personal/proimt/默认.png`);
      }
    }
  },

  store
};
</script>

<style lang="less" scoped>
.mine {
  // background: #f8f8f8;
  // height: 100%;
  // width: 100%;
  // padding-bottom: 1.08rem;
  // display: flex;
  // flex-direction: column;
  height: 100%;
  padding-bottom: 1.08rem;
  .mine-header {
    height: 3.2rem;
    .mine-bg-img {
      background-image: url("../../../../../assets/img/public/image/common/personal/userIndex/starbg.png");
      background-size: 100%;
      background-repeat: no-repeat;
      height: 100%;
      width: 100%;
      position: relative;
      background-position: 28px -35px;
      h2 {
        padding-top: 0.32rem;

        font-size: 0.36rem;

        color: #fff;

        text-align: center;
      }

      .longin-after {
        height: 0.72rem;

        width: 2.4rem;

        background: #ff9a14;

        margin: 0 auto;

        margin-top: 0.52rem;

        font-size: 0.32rem;

        color: #fff;

        text-align: center;

        line-height: 0.72rem;

        border-radius: 15px;
      }

      .login-before {
        margin-top: 0.3rem;

        display: flex;

        justify-content: center;

        align-items: center;

        .user-img {
          margin-right: 0.15rem;

          width: 1.1rem;

          height: 1.1rem;

          border-radius: 50%;

          padding: 0.05rem 0.06rem;

          background: rgba(255, 255, 255, 0.4);

          // opacity: .6;

          img {
            width: 0.98rem;
            border-radius: 50%;
          }
        }

        .user-info {
          font-size: 0.3rem;

          color: #fff;

          i {
            font-size: 0.4rem;

            vertical-align: middle;
          }

          span {
            vertical-align: middle;
            font-family: ArialMT !important;
            font-size: 0.24rem;
          }

          p:nth-child(1) {
            margin-bottom: 0.24rem;
          }
        }
      }

      // 取款导航

      .tranparent {
        display: table;

        width: 100%;

        // opacity: 0.23;
        // opacity: 0.7;
        position: absolute;

        bottom: 0;
        left: 0;

        .tranparent-item {
          display: table-cell;

          width: 33.3333%;

          padding: 0.2rem 0;

          padding-left: 0.36rem;

          .list-font {
            font-size: 0.28rem;

            color: rgba(245, 246, 247, 0.6);

            i {
              vertical-align: middle;

              font-size: 0.3rem;

              color: #fff;
            }

            .textwhite {
              color: #fff;

              vertical-align: middle;
            }
          }
        }
      }
    }
  }

  /deep/.downwarp-content {
    display: none;
  }

  // 账号余额

  .balance-view {
    margin: 0.2rem 0;

    display: flex;

    background: #f8f8f8;

    height: 1.26rem;

    .balance-item {
      display: flex;

      flex: 1;

      background: #fff;

      .item-icon {
        flex: 2;

        justify-content: center;

        align-items: center;

        display: flex;

        i {
          font-size: 0.65rem;
        }
      }

      .item-text {
        flex: 4;
        position: relative;
        .user-banlance {
          font-size: 0.3rem;

          padding-top: 0.28rem;

          color: #424242;
        }

        .user-money {
          padding-top: 8px;

          color: #ff0000;

          font-size: 0.28rem;
        }
        .user-transfer {
          position: absolute;
          right: 0.22rem;
          top: 0;
          font-size: 0.26rem;
          color: #666;
          padding-top: 0.28rem;
          span:nth-child(1) {
            width: 0.2rem;
            height: 0.2rem;
            display: inline-block;
            // border: 1px dashed #666;
            background-image: url("../../../../../assets/img/public/image/common/personal/userIndex/transfer-icon@2x.png");
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
          }
        }
      }
    }
    .balance-user-item {
      display: flex;
      flex: 1;
      background: #fff;
      .item-icon {
        flex: 0 0 16%;
        justify-content: center;
        align-items: center;
        display: flex;
        i {
          font-size: 0.65rem;
        }
      }
      .item-text {
        position: relative;
        .user-banlance {
          font-size: 0.3rem;
          color: #424242;
          line-height: 1.26rem;
          .user-money {
            color: #ff0000;
            font-size: 0.32rem;
          }
        }
      }
    }
    .mr-2 {
      margin-right: 0.2rem;
    }
  }

  .functionList {
    background: #fff;

    // margin-top: 0.2rem;

    margin-bottom: 0.3rem;

    .row {
      height: 0.9rem;

      margin-left: 0.3rem;

      position: relative;

      color: #424242;

      i {
        position: absolute;

        top: 0.16rem;

        left: 0;

        font-size: 0.58rem;
      }

      div {
        line-height: 0.9rem;

        margin-left: 0.86rem;

        font-size: 0.3rem;

        span:nth-child(2) {
          margin-right: 0.28rem;

          font-size: 0.24rem;

          color: #c7c7cb;

          // margin-top: 0.05rem;
        }

        .row-text {
          color: #aaa;

          font-size: 0.26rem;

          margin-right: 0.2rem;
        }
      }
    }

    .row:last-child {
      border-bottom: none;
    }
  }
}
</style>
