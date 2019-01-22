<template>
<!-- 最大盒子 -->
<div class="picker-commpent">
  <!-- 阴影 -->
  <div class="picker"></div>
  <!-- 选择框 -->
  <div class="picker-panel">
    <!-- 头部 -->
    <div class="picker-choose">
      <span class="picker-cancel">取消</span>
      <div class="picker-title-group">
        <h1 class="picker-title">请选择</h1>
      </div>
      <span class="picker-confirm">确定</span>
    </div>
    <!-- 内容 -->
    <div class="picker-content">
      <ul class="picker-wheel-wrapper">
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
        <li>我是最牛逼的伟哥</li>
      </ul>
    </div>
  </div>


</div>
</template>

<script>
// import Scroll from 'cube-ui'
export default {
  data() {
    return {
      pickData: [],
      pickShow: false
    };
  }
};
</script>

<style lang="less" scoped>
.picker-commpent {
  .picker {
    background-color: #25262d;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2018;
  }
  .picker-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.46rem;
    text-align: center;
    font-size: 0.28rem;
    background: #fff;
    box-sizing: border-box;
    // transform: translate(-100%, -100%);
    pointer-events: auto;
    z-index: 2019;
    .picker-choose {
      display: flex;
      height: 1.2rem;
      border-bottom: 1px solid #f8f8f8;
      .picker-cancel,
      .picker-confirm {
        font-size: 0.3rem;
        color: #ff5100;
        line-height: 1.2rem;
        padding: 0 0.32rem;
      }
      .picker-title-group {
        flex: auto;
        display: flex;
        height: 100%;
        flex-flow: column;
        justify-content: center;
        text-align: center;
        .picker-title {
          font-size: .36rem;
          line-height: .5rem;
          font-weight: 400;
          color: #333;
        }
      }
    }
    .picker-content {
      position: relative;
      top: .2rem;
      height: 4rem;
      overflow: hidden;
      padding: .32rem;
      .picker-wheel-wrapper {
        height: 100%;
        width: 100%;
        overflow: scroll;
        li {
          height: .72rem;
          overflow: hidden;
          white-space: nowrap;
          color: #333;
          font-size: .4rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
