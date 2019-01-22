<template>
  <div class="honest nigth-bg">
    <div class="honest-index" v-if="honestDetail">
      <img src="../../../../../../assets/img/public/image/common/personal/userIndex/honest.png" alt="">
      <div class="submit bg-color" @click="honestDetail=false">一键返水</div>
      <p class="shuoming">所有平台返水都是按美东时间计算,会员可随时返水。如会员未自行返水,系统每天将自动为您返水。由于数据同步有延迟,请下注后30分钟左右再来返水！</p>
    </div>
    <div class="honest-detail" v-else>
      <div class="honest-main" v-if="honestData.lenght">
        <div class="main-title">
          <span>游戏类型</span>
          <span>有效投注</span>
          <span>返水金额</span>
          <span>返水比例</span>
        </div>
        <div class="main-row">
          <span>AG真人视讯</span>
          <span>0</span>
          <span>0</span>
          <span>0.80%</span>
        </div>
        <div class="total-refund">
          <div class="left">
            <span>有效投注</span>
            <span>￥0.00</span>
          </div>
          <div class="right">
            <span>总返水</span>
            <span>￥0.00</span>
          </div>
        </div>
      </div>

      <div class="no-data" v-else>
        <img src="../../../../../../assets/img/public/image/common/personal/userIndex/no-data.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        honestDetail: true,
        honestData: []

      }
    },
    created () {
      this.$loading(true)
      setTimeout(() => {
        this.$loading(false)
      }, 500)
    }
  }
</script>

<style lang="less" scoped>
  .honest {
    .honest-index {
      img {
        width: 100%;
      }
      .submit {
        margin: 0 0.2rem;
        margin-top: 0.4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        color: #fff;
        font-size: 0.36rem;
      }
      .shuoming {
        color: #888888;
        font-size: 0.28rem;
        padding: 0.5rem;
        line-height: 0.48rem;
      }
    }
    .honest-detail {
      .no-data {
        padding-top: 140px;
        img {
          width: 100%;
        }
        p {
          margin-top: 0.75rem;
          font-size: 0.28rem;
          color: #777777;
          text-align: center;
        }
      }
      .honest-main {
        margin-top: 0.2rem;
        background: #fff;
        .main-title {
          display: flex;
          height: 0.6rem;
          line-height: 0.6rem;
          border-bottom: 1px solid #f1f1f1;
          span {
            flex: 1;
            font-size: 0.28rem;
            color: #424242;
            text-align: center;
          }
        }
        .main-row {
          display: flex;
          height: 0.6rem;
          line-height: 0.6rem;
          border-bottom: 1px solid #f8f8f8;
          span {
            flex: 1;
            font-size: 0.28rem;
            color: #888888;
            text-align: center;
          }
        }
        .total-refund {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #fff;
          height: 0.88rem;
          line-height: 0.88rem;
          display: flex;
          padding: 0 .32rem;
          div {
            flex: 1;
            span:nth-child(1) {
              color: #424242;
              font-size: .3rem;
            }
            span:nth-child(2) {
              color: #FF0000;
              font-size: .32rem;
            }
          }
          div:nth-child(2) {
            text-align: right;
          }
        }
      }
    }
  }
</style>
