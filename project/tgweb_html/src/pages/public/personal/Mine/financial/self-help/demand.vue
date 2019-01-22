<template>
  <div class="demand">

    <div class="content">

      <div class="channel">
        <label>存款渠道</label>
      </div>
      <div class="time">
        <label>存款时间</label>
      </div>
      <div class="money">
        <label>存款金额</label>
      </div>
      <div class="screenshot">
        <label>存款截图</label>
      </div>
      <div class="remark">
        <label>备注</label>
      </div>
    </div>

    <div class="submitInfo">
      提交信息
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .demand {
    .content {
      background: #fff;
      padding: 0 0.2rem;
      label {
        text-align: right;
        width: 1.2rem;
        display: inline-block;
        font-size: 0.28rem;
      }
      .channel,
      .time,
      .screenshot {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #dbdbdb;
      }
      .money,
      .remark {
        height: 0.95rem;
        line-height: 0.95rem;
        border-bottom: 1px solid #dbdbdb;
      }
    }
    .submitInfo {
      margin: 0 0.2rem;
      margin-top: 0.28rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      border-radius: .15rem;
      font-size: .36rem;
      color: #fff;
    }
  }
</style>
