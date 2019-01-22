<template>
  <div class="game-record">
      <mi-nav></mi-nav>
    <div class="record-list">
      <van-tabs>
        <van-tab v-for="(item,i) in recordList" :key="i">
          <div slot="title" class="tab-title">
            <span>{{item.text}}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
      <mi-title :titleList="['时间','笔数','有效投注','输赢']" style="padding-right:.3rem;"></mi-title>
      <div class="game-view" ref="gameContent">
        <cube-scroll>
          <div class="row" v-for="item in 30">
            <i class="icon iconfont h5-icon-next"></i>
            <span>
                      <p>2018-10-20</p>
                      <p>星期四</p>
                   </span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
          </div>
         </cube-scroll>
      </div>
    <div class="other-total">
      <div class="left">
        <span>总投注</span>
        <span>￥0.00</span>
      </div>
      <div class="right">
        <span>总输赢</span>
        <span>￥0.00</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordList: [
        {
          text: "视讯"
        },
        {
          text: "彩票"
        },
        {
          text: "电子"
        },
        {
          text: "棋牌"
        },
        {
          text: "体育"
        }
      ]
    };
  },
  methods: {},
  created(){
     this.$nextTick(()=>{
        let fontSize = +document.querySelector('html').style.fontSize.split('px')[0] / 100
        let clientHeight = document.body.clientHeight
        let contH = clientHeight - (446 ) * fontSize
        this.$refs['gameContent'].style.height = contH + 'px'
    });
  }
};
</script>

<style lang="less" scoped>
.game-record {
  // padding-bottom: 0.88rem;
  .record-list {
    margin-top: 0.2rem;
    /deep/ .van-tab {
      flex: 0 0 20%;
    }
  }
  .game-view {
    flex: 1;
    // overflow: auto;
    // -webkit-overflow-scrolling: touch;
    background: #fff;
    padding-right: 0.3rem;
    // height: 6rem;
    .row {
      height: 1rem;
      line-height: 1rem;
      display: flex;
      span {
        flex: 1;
        font-size: 0.28rem;
        color: #888888;
        text-align: center;
        p {
          &:nth-child(1) {
            line-height: 0.6rem;
          }
          &:nth-child(2) {
            line-height: 0.3rem;
          }
        }
        &:last-child {
          color: #ff0000;
        }
      }
      i {
        position: absolute;
        right: 0;
        color: #c7c7cb;
        font-size: 0.26rem;
      }
      &::after {
        content: "";
        width: 0.3rem;
        height: 1px;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  .other-total {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 0.88rem;
    line-height: 0.88rem;
    display: flex;
    padding: 0 0.32rem;
    div {
      flex: 1;
      span:nth-child(1) {
        color: #424242;
        font-size: 0.3rem;
      }
      span:nth-child(2) {
        color: #ff0000;
        font-size: 0.32rem;
      }
    }
    div:nth-child(2) {
      text-align: right;
    }
  }
}
</style>
