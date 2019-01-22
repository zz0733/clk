<template>
<div class="peronsal-aside">
  <div class="aside-nav">
    <ul>
      <li v-for="(item,i) in navData" :key="i" :class="{liActive:item.type ==$store.state.personal.contentView}" @click="toggle(item)">
        <img :src="item.img" alt="">
        <span>{{item.text}}</span>
      </li>
      <li @click="goService">
        <img src="/static/public/image/userImg/kefu@3x.png" alt="">
        <span>客服</span>
      </li>

    </ul>
  </div>

  <div class="aside-content">
    <div class="header">
      <p>{{name}}</p>
      <!--  -->
      <p>余额:{{userinfo.balance}}
        <i :class="['ivu-icon' ,'ivu-icon-refresh',{active:refesh}]" @click="getBalance"></i>
      </p>
    </div>
    <component :is="'navAll'"></component>
  </div>
</div>
</template>

<script>
import store from "@/vuex/store";
import navAll from "../navmenu/nav";
export default {
  data() {
    return {
      navData: [{
          text: "充值",
          type: 'recharge',
          img: "/static/public/image/userImg/chongzhi@3x.png"
        },
        {
          text: "提款",
          type: 'withdraw',
          img: "/static/public/image/userImg/tikuan@3x.png"
        },
        {
          text: "个人",
          type: 'personage',
          img: "/static/public/image/userImg/geren@3x.png"
        },
        {
          text: "优惠",
          type: 'discounts',
          img: "/static/public/image/userImg/youhui@3x.png"
        },
        {
          text: "代理",
          type: 'agency',
          img: "/static/public/image/userImg/daili@3x.png"
        },
        {
          text: "信息",
          type: 'message',
          img: "/static/public/image/userImg/gonggao@3x.png"
        }
      ],
      amount: "",
      name: '',
      refesh: false
    };
  },
  methods: {
    toggle(item) {
      this.$store.commit("showContent", {
        parent: item.type
      });
      this.$store.commit("showNav", {
        child: 0
      });
      this.name = item.text;
    },
    getBalance() {
      this.refesh = true;
      this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
          this.refesh = false;
        }
      });
    },
    goService() {
      let service = JSON.parse(localStorage.config).service;
      if (service[0]) {
        window.open(service[0].url);
      }
    }
  },
  created() {
    if (!this.name) {
      this.navData.forEach((item) => {
        if (item.type == this.$store.state.personal.contentView) {
          this.name = item.text;
        }
      })
    }
    // this.getBalance();
  },
  computed: {
    liActive() {
      return this.$store.state.personal.liActive;
    },
    navView() {
      return this.$store.state.personal.navView;
    },
    text() {
      return this.$store.state.personal.navText;
    },
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  components: {
    navAll
  },
  store
};
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

.peronsal-aside {
  padding-left: 72px;
  position: relative;
  .aside-nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 72px;
    background: url("/static/public/image/userImg/mockup_bg.png") left bottom no-repeat, url("/static/public/image/userImg/mockup_bg_left.png");
    padding-top: 1.4em;
    border-radius: 15px 0 0 15px;
    ul {
      li {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        img {
          width: 42px;
          height: 42px;
          display: inline-block;
          // background: #fff;
          // border-radius: 50%;
        }
        span {
          font-size: 14px;
          color: #fff;
          margin-top: 7px;
          font-weight: 200;
          font-family: "Microsoft YaHei";
          font-weight: 400;
        }
      }
      .liActive {
        background: #fe6565;
      }
    }
  }
  .aside-content {
    color: #fff;
    font-weight: 200;
    .header {
      height: 10em;
      text-align: center;
      p:nth-child(1) {
        font-size: 2.4em;
        padding-top: 30px;
      }
      p:nth-child(2) {
        font-size: 1.6em;
        padding-top: 15px;
        i {
          cursor: pointer;
        }
        .active {
          -webkit-animation: animate 1s infinite linear;
          animation: animate 1s infinite linear;
          -moz-animation: animate 1s infinite linear;
          -o-animation: animate 1s infinite linear;
          -ms-animation: animate 1s infinite linear;
          // transform-origin: 40% 40%;
          // -webkit-transform-origin: 40% 40%;
          // -moz-transform-origin: 40% 40%;
          // -o-transform-origin: 40% 40%;
          // -ms-transform-origin: 40% 40%;
        }
      }
    }
  }
}
</style>
