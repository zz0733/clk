<template>
  <article id="h5app">
    <router-view class="app-main"></router-view>
  </article>
</template>
<script>
import store from "@/vuex/store";
import UserService from "@/service/public/UserService.js";
let timer;

export default {
  name: "h5app",
  $route: function(to, from) {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    getBalance() {
      if (localStorage.token) {
        this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
          if (res && res.code == 200) {
            this.$store.commit("mainState/resetBalance", res.data);
          }
        });
      }
    }
  },
  created() {
    clearInterval(timer);
    this.getBalance();
    timer = setInterval(this.getBalance, 6000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        clearInterval(timer);
      } else if (document.visibilityState == "visible") {
        clearInterval(timer);
        timer = setInterval(this.getBalance, 6000);
      }
    });
  },
  mounted() {
    const Mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(Mobile)) {
      document.getElementsByTagName("body")[0].className += "ios-picker";
    }
  },
  components: {},
  store
};
</script>
<style lang="less" scoped>
#h5app {
  height: 100%;
  width: 100%;
}
.app-main {
  height: 100%;
  width: 100%;
}
</style>


