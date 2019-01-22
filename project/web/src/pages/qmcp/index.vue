
<template>
  <div>
    <div class="vp-qmcp-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
      <!-- 传统彩票 -->
      <div class="vp-lottery-style" v-if="
        $route.path.includes('/plays')||
        $route.path.includes('/rules')||
        $route.path.includes('/trend')
        ">
        <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div>
      <!-- 主页 -->
      <div v-else class="hsyl-cont-wrap">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <vp-aside></vp-aside>
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
      </div>

    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>

  </div>
</template>
<script>
let timer;
import vpLotHeader from "@/pages/public/tradition/components/header/header";
import vpHomeHeader from "./home/header";
import vpNav from "./home/nav";
import vpAside from "./home/aside";
import vpHomeFooter from "./home/footer";
import personals from "../public/personals";
import store from "@/vuex/store";
export default {
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/qmcp/img/logo.png",
        downLoadurl: "/static/qmcp/html/download/index.html"
      }
    };
  },
  methods: {
    recalc() {
      this.init();
    },
    init() {
      // 手机适配
      if (this.dPcOrMobile() == "iphone") {
        document.querySelector("body").style.minHeight = 2420 + "px";
      } else {
        document.querySelector("body").style.minHeight = "auto";
      }
    },
    getBalance() {
      if (localStorage.token) {
        this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo);
            userinfo.balance = res.data;
            this.$store.commit("mainState/reloadUserinfo", userinfo);
          }
        });
      } else {
        clearInterval(timer);
      }
    }
  },
  created() {
    this.$http.get(`${this.$HOST_NAME}/games/list`).then(res => {
      if (res.code == 200) {
        localStorage.setItem("gameList", JSON.stringify(res.data));
      }
    });
    clearInterval(timer);
    timer = setInterval(this.getBalance, 10000);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        clearInterval(timer);
      } else if (document.visibilityState == "visible") {
        timer = setInterval(this.getBalance, 10000);
      }
    });
  },
  components: {
    vpHomeHeader,
    vpLotHeader,
    vpNav,
    vpAside,
    vpHomeFooter,
    personals,
  },
  store
};
</script>






