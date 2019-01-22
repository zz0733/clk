<template>
<div class="message-index">
  <router-link tag="div" :to="v.path" class="row" v-for="(v,i) in messageData" :key="i">
    <img :src="v.img" alt="">
    <div>
      <span>{{v.text}}</span>
      <span class="fr cubeic-arrow"></span>
    </div>
  </router-link>
</div>
</template>

<script>
export default {
  data() {
    return {
      messageData: [{
          text: "系统消息",
          path: '/personal_index/myInfo',
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/system-message@2x.png")
        },
        {
          text: "编写信息",
          path: '/personal_index/sent',
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/write@2x.png")
        },
        {
          text: "已发信息",
          path: '/personal_index/write',
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/Published@2x.png")
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.message-index {
  background: #fff;
  .row {
    height: 1.02rem;
    padding-left: 1.04rem;
    position: relative;
    img {
      position: absolute;
      top: 0.16rem;
      left: 0.16rem;
      width: 0.68rem;
    }
    div {
      line-height: 1.02rem;
      margin-right: 0.2rem;
      border-bottom: 1px solid #f5f5f5;
      margin-left: 0.24rem;
      font-size: 0.3rem;
      span:nth-child(2) {
        // margin-right: 0.28rem;
        font-size: 0.3rem;
        color: #ccc;
      }
    }
  }
}
</style>
