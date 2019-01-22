<template>
  <div class="Myloading" v-if="loadingShow">
    <div class="main">
      <img src="../../../assets/img/public/image/common/loading.gif" alt="">
      <!-- <div class="ivu-spin-main"><span class="ivu-spin-dot"></span> <div class="ivu-spin-text"></div></div> -->
      <!-- <van-loading type="spinner" color="black" /> -->
      <!-- <van-loading color="black" /> -->
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      loadingShow: false
    };
  }
};
</script>

<style lang="less"  scoped>
.Myloading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0.88rem;
  left: 0;
  background-color: hsla(0, 0%, 100%, 1);
  z-index: 2018;
  .main {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    margin-left: -15px;
    margin-top: -15px;
    height: 3.66rem;
    z-index: 2019;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
    .ivu-spin-large .ivu-spin-dot {
      width: 0.8rem;
      height: 0.8rem;
    }
    .ivu-spin-dot {
      position: relative;
      display: block;
      border-radius: 50%;
      background-color: #2d8cf0;
      width: 0.4rem;
      height: 0.4rem;
      -webkit-animation: ani-spin-bounce 1s 0s ease-in-out infinite;
      animation: ani-spin-bounce 1s 0s ease-in-out infinite;
    }
    @keyframes ani-spin-bounce {
      0% {
        transform: scale(0);
      }
      to {
        transform: scale(1);
        opacity: 0;
      }
    }
  }
}
</style>