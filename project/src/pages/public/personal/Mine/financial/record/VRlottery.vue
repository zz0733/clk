<template>
                   
        <div class="lottery">



 <div id="mescroll" class="mescroll" :class="{mainNone:lotteryDetail ==true}">
                  <div class="lottery-all" v-if="!lotteryDetail" id="dataList">

                                <div class="row" v-for="item in lotteryData">

                                      <div class="row-header">
                                                  <span class="fl">{{item.lotteryName}}</span>
                                                  <span  class="fr">{{item.betTime}}</span>
                                      </div>

                                      <div class="row-content">

                                           <i  @click="getDetail(item)" class="cubeic-arrow"></i>
                                                   <div>
                                                         <span>{{item.playwayName}}</span>
                                                         <span>{{item.netAmount}}</span>
                                                   </div>
                                                  
                                                   <div>
                                                         <span>第{{item.issue}}期</span>
                                                         <span>
                                                           <label :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'contain'}"></label>
                                                           {{item.status}}
                                                           </span>
                                                   </div>
                                      </div>

                                </div>
                  </div>
 </div>





                    <div class="lottery-detail" v-if="lotteryDetail">

                              <div class="header">
                                <span class="fl mh5-back" @click="lotteryDetail = false"></span>
                                    彩票详情
                              </div>
                         
                          <cube-scroll>
                             <div class="row">
                                  <label>订单号</label>
                                  <span>{{detail.billNo}}</span>
                             </div>
                               <div class="bar">
                                  <label>彩种</label>
                                  <span>{{detail.lotteryName}}</span>
                             </div>
                                 <div class="row">
                                  <label>期数</label>
                                  <span>{{detail.issue}}</span>
                             </div>
                               <div class="bar">
                                  <label>下注金额</label>
                                  <span class="spanColor">{{detail.betAmount}}</span>
                             </div>
                                 <div class="row">
                                  <label>有效投注</label>
                                  <span class="spanColor">{{detail.validBetAmount}}</span>
                             </div>
                               <div class="bar">
                                  <label>输赢</label>
                                  <span class="spanColor">{{detail.netAmount}}</span>
                             </div>
                                 <div class="row">
                                  <label>订单个数</label>
                                  <span>{{detail.betCount}}</span>
                             </div>
                               <div class="bar">
                                  <label>玩法</label>
                                  <span>{{detail.playwayName}}</span>
                             </div>
                                 <div class="row">
                                  <label>下注内容</label>
                                  <span>{{detail.betInfo}}</span>
                             </div>
                               <div class="bar">
                                  <label>下注时间</label>
                                  <span>{{detail.betTime}}</span>
                             </div>
                                 <div class="row">
                                  <label>返点值</label>
                                  <span>{{detail.rebate}}%</span>
                             </div>
                               <div class="bar">
                                  <label>返点金额</label>
                                  <span class="spanColor">{{detail.fdAmount}}</span>
                             </div>
                                 <div class="row">
                                  <label>结算时间</label>
                                  <span>{{detail.openTime}}</span>
                             </div>
                               <div class="bar">
                                  <label>开奖结果</label>
                                  <span>{{detail.result||'未开奖'}}</span>
                             </div>
                               <div class="row">
                                  <label>状态</label>
                                  <span>{{detail.status}}</span>
                             </div>
                               <div style="height:.3rem;"></div>
                             </cube-scroll>
                    </div>
        </div>



</template>

<script>
import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m";
import mixin from "./publis";
export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  methods: {
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      //延时一秒,模拟联网
      setTimeout(() => {
        this.$http
          .post(`${this.$HOST_NAME}/games/getBetRecords?page=${pageNum}`, {
            timeStart: this.$route.query.timeStart,
            timeEnd: this.$route.query.timeEnd,
            type: this.$route.query.type
          })
          .then(
            res => {
              if (res.data.data) {
                res.data.data.forEach(v => {
                  v.betTime = this.$moment
                    .unix(v.betTime - 0)
                    .format("YYYY-MM-DD HH:mm:ss");
                  switch (v.status) {
                    case 0:
                      v.status = "待开奖";
                      v.imgUrl = "../../../../../../assets/img/public/image/common/personal/userInfo/status-wait.png";
                      break;
                    case 1:
                      v.status = "已中奖";
                      v.imgUrl = "../../../../../../assets/img/public/image/common/personal/userInfo/status-success.png";
                      break;
                    case 2:
                      v.status = "未中奖";
                      v.imgUrl ="../../../../../../assets/img/public/image/common/personal/userInfo/status-false.png";
                      break;
                    case 3:
                      v.status = "和";
                      v.imgUrl = "../../../../../../assets/img/public/image/common/personal/userInfo/he.png";
                      break;
                    case 4:
                      v.status = "取消";
                      v.imgUrl ="../../../../../../assets/img/public/image/common/personal/userInfo/quxiaio.png";
                      break;
                    case 5:
                      v.status = "撤销";
                      v.imgUrl = "../../../../../../assets/img/public/image/common/personal/userInfo/cancel.png";
                      break;
                  }
                });
              }

              this.orderHis = res.data;
              // console.log(this.orderHis);
              successCallback && successCallback(this.orderHis); //成功回调
            },
            err => {}
          );
      }, 500);
    }
  },
  created() {
    this.$nextTick(() => {
      this.$loading(true);
    });
  },
  mounted() {
    this.newMescroll();
  }
};
</script>

<style lang="less" >
@import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";
.lottery {
  height: 92%;
  background: #f8f8f8;
  .lottery-all {
    // background: #f1f1f1;
    // padding-bottom: 0.2rem;
    .row {
      margin: 0 0.2rem;
      height: 1.86rem;
      background: #fff;
      padding: 0 0.46rem 0 0.24rem;
      margin-bottom: 0.2rem;

      .row-header {
        height: 0.72rem;
        border-bottom: 1px solid #f1f1f1;
        line-height: 0.72rem;
        span:nth-child(1) {
          font-size: 0.3rem;
          color: #333;
        }
        span:nth-child(2) {
          font-size: 0.26rem;
          color: #666;
        }
      }
      .row-content {
        position: relative;
        i {
          position: absolute;
          right: -0.4rem;
          top: 0.12rem;
          font-size: 0.28rem;
          color: #ffaa41;
        }
        div {
          display: flex;
          height: 0.57rem;
          justify-content: space-between;
          align-items: center;
          span:nth-child(1) {
            font-size: 0.28rem;
            color: #333;
          }
          span:nth-child(2) {
            color: #ff5100;
            font-size: 0.26rem;
          }
        }
        div:nth-child(3) {
          span:nth-child(1) {
            font-size: 0.28rem;
            color: #999999;
          }
          span:nth-child(2) {
            label {
              display: inline-block;
              width: 0.34rem;
              height: 0.34rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .lottery-detail {
    height: 100%;
    .header {
      height: 0.88rem;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      line-height: 0.88rem;
      text-align: center;
      width: 100%;
      color: #fff;
      font-size: 0.36rem;
      padding: 0 0.18rem;
      margin-bottom: 0.2rem;
      position: absolute;
      top: 0;
      left: 0;

      span {
        // font-size: 0.46rem;
      }
    }

    .row {
      height: 0.72rem;
      line-height: 0.72rem;
      background: #fff;
      display: flex;
      label {
        display: inline-block;
        width: 2.5rem;
        padding-left: 0.6rem;
        font-size: 0.28rem;
        color: #888;
      }
      span {
        font-size: 0.28rem;
        color: #282828;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .spanColor {
        color: #ff0000;
      }
    }
    .bar {
      height: 0.72rem;
      line-height: 0.72rem;
      background: #f9f9f9;
      display: flex;
      label {
        display: inline-block;
        width: 2.5rem;
        padding-left: 0.6rem;
        font-size: 0.28rem;
        color: #888;
      }
      span {
        font-size: 0.28rem;
        color: #282828;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .spanColor {
        color: #ff0000;
      }
    }
  }
}

.mainNone {
  display: none;
}
</style>
