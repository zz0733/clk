<template>
<div>

  <ul v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1">
    <img src="/static/ddcp/img/left.png" alt="">
    <!-- <a @click="goUserCen(0,'充值',2)" class="wechat" href="javascript:;"></a>
  <a @click="goUserCen(0,'充值',3)"  class="zhifubao" href="javascript:;"></a>
  <a @click="goUserCen(0,'充值',4)"  class="qq" href="javascript:;"></a> -->
  <a @click="goUserCen('recharge',0)"  class="bank" href="javascript:;"></a>
  <a class="close" @click="s1=false" href="javascript:;"></a>
  </ul>
  <ul v-show="s2" class="TplFloatSet TplFloatPic_1">
    <img src="/static/ddcp/img/right.png" alt="">
    <a class="kefu" target="_blank" href="https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=918068&configID=41397&jid=8004026909&s=1"></a>
    <a class="close" @click="s2=false" href="javascript:;"></a>
  </ul>

</div>
</template>

<script>
import store from "@/vuex/store";
import $ from "jquery";
export default {
  data() {
    return {
      s1: true,
      s2: true
    };
  },
  methods: {
    addWindow() {
      window.addEventListener("scroll", this.scrollFunc);
    },
    scrollFunc(e) {
      $(".TplFloatPic_1")
        .stop()
        .animate({
          top: window.pageYOffset + 170
        }, 1000);
    },
    goUserCen(name, num) {
      if (!localStorage.token || !localStorage.userinfo) {
         alert('您还没有登录,请先登录。');
         return false;
      }
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", {
        bool: true
      });
      this.$store.commit("showContent", {
        parent: name
      });
      this.$store.commit("showNav", {
        child: num
      });
    },
    kefuFc() {
      let url = JSON.parse(localStorage.getItem("config")).service[0].url;
      window.open(url);
    }
  },
  mounted() {
    this.addWindow();
  },
  store
};
</script>

<style lang="less" scoped>
.TplFloatSet {
  position: absolute;
  // cursor: pointer;
  z-index: 1000;
  top: 170px;
  right: 0px;
  width: 132px;
  .close,
  .kefu,
  .btn_reg,
  .wechat,
  .zhifubao,
  .qq,
  .bank {
    padding: 15px 48px;
    position: absolute;
    bottom: -2px;
    left: 0px;
    // background: RED;
  }
  .kefu {
    bottom: 44px;
  }
  .btn_reg {
    bottom: 270px;
  }
  .wechat {
    bottom: 228px;
  }
  .zhifubao {
    bottom: 188px;
  }
  .qq {
    bottom: 148px;
  }
  .bank {
    bottom: 32px;
  }
}

.TplFloatSet0 {
  left: 32px;
  a {
    position: absolute;
  }
  .sign-in {
    width: 100%;
    height: 42px;
    top: 75px;
  }
}
</style>
