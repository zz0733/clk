<template>
    <div class="help">
        <cube-scroll>
            <img :src="src" alt="">
        </cube-scroll>
    </div>
</template>

<script>
export default {
  data() {
    return {
      src: null
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.params.name === "wechat") {
        vm.src =require("../../../../../assets/img/public/image/common/personal/userInfo/微信转银行卡.png")
          
      } else if (vm.$route.params.name === "alipay") {
        vm.src =require("../../../../../assets/img/public/image/common/personal/userInfo/支付宝转银行卡.png")
      }
    });
  }
};
</script>
<style lang="less" scoped>
.help {
  height: 100%;
  background: #fff;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
