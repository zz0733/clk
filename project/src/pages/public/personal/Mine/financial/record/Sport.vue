<template>
                   
        <div class="sport">
     <div class="screen" @click="showPicker">
                           筛选
                         </div>


                    <div id="mescroll" class="mescroll" :class="{mainNone:lotteryDetail ==true}"  :style="{height:flag?'0':'100%'}">
                                      <div class="sport-all" v-show="!lotteryDetail" id="dataList"  v-if="!flag">

                                                    <div class="row" v-for="item in lotteryData">

                                                          <div class="row-header">
                                                                      <span class="fl">{{item.gameName}}{{item.platform}}</span>
                                                                      <span  class="fr">{{item.betTime}}</span>
                                                          </div>

                                                          <div class="row-content">

                                                              <i  @click="getDetail(item)" class="cubeic-arrow"></i>
                                                                      <div>
                                                                            <span>{{item.billNo}}</span>
                                                                            <span>{{item.netAmount}}</span>
                                                                      </div>
                                                                      
                                                                      <div>
                                                                            <span></span>
                                                                            <span>
                                                                              <label :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'contain'}"></label>
                                                                              {{item.status}}
                                                                              </span>
                                                                      </div>
                                                          </div>

                                                    </div>
                                      </div>
                    </div>





                    <div class="sport-detail" v-if="lotteryDetail">
                              
                              <div class="header">
                                <span class="fl mh5-back" @click="lotteryDetail = false;bentInfoShow = false"></span>
                                   体育详情
                              </div>
                          
                            <cube-scroll>
                             <div class="row">
                                  <label>订单号</label>
                                  <span>{{detail.billNo}}</span>
                             </div>
                               <div class="bar">
                                  <label>游戏名称</label>
                                  <span>{{detail.platform}}</span>
                             </div>
                                 <div class="row">
                                  <label>游戏类型</label>
                                  <span>{{detail.gameName}}</span>
                             </div>
                               <div class="bar"  v-if="flag">
                                  <label>玩法</label>
                                  <span>{{betInfo.bettypename}}</span>
                             </div>
                                 <div class="row">
                                  <label>下注金额</label>
                                  <span class="spanColor">{{detail.betAmount}}</span>
                             </div>
                               <div class="bar">
                                  <label>有效金额</label>
                                  <span class="spanColor">{{detail.validBetAmount}}</span>
                             </div>
                                 <div class="row">
                                  <label>输赢</label>
                                  <span class="spanColor">{{detail.netAmount}}</span>
                             </div>
                                 
                                  <div class="betInfo" v-if="bentInfoShow">
                                      <div class="betInfo-header">
                                          下注内容
                                      </div>

                                       <div class="betInfo-content" v-for="item in betInfo">
                                              <div>
                                                  <span class="fl">主队VS客队</span>
                                                  <span class="fr">{{item.leaguename}}</span>
                                              </div>
                                               <div>
                                                  <span class="fl">
                                                      {{item.hometeamname}}VS{{item.awayteamname}}
                                                  </span>
                                                  <span class="fr">下注内容：<span>{{item.teambetname}}</span></span>
                                              </div>
                                       </div>

                                  </div>
                                 <div class="bar">
                                  <label>下注时间</label>
                                  <span>{{detail.betTime}}</span>
                             </div>
                               <div class="row">
                                  <label>状态</label>
                                  <span>{{detail.status}}</span>
                             </div>
                                 <div style="height:.3rem;"></div>
                             </cube-scroll>
                             
                    </div>

                        <div style="text-align:center;margin-top:.2rem;"  v-if="flag">

                                 <img  style="width:60%;" src="../../../../../../assets/img/public/image/common/personal/userInfo/no-data.png" alt="">
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
      betInfo: [],
      flag: false,
      screedData: [],
      platform: "",
      bentInfoShow: false
    };
  },
  methods: {
    getDetail(item) {
      this.detail = item;
      if (item.betInfo) {
        this.betInfo = item.betInfo;
        this.bentInfoShow = true;
      }
      this.lotteryDetail = true;
    },
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      //延时一秒,模拟联网
      setTimeout(() => {
        this.$http
          .post(`${this.$HOST_NAME}/games/getBetRecords?page=${pageNum}`, {
            timeStart: this.$route.query.timeStart,
            timeEnd: this.$route.query.timeEnd,
            type: this.$route.query.type,
            platform: this.platform
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
                      v.imgUrl =require("../../../../../../assets/img/public/image/common/personal/userInfo/status-wait.png") 
                      break;
                    case 1:
                      if (parseInt(v.netAmount) > 0) {
                        v.status = "已中奖";
                        v.imgUrl =require("../../../../../../assets/img/public/image/common/personal/userInfo/status-success.png") ;
                      } else if (parseInt(v.netAmount) < 0) {
                        v.status = "未中奖";
                        v.imgUrl =require("../../../../../../assets/img/public/image/common/personal/userInfo/status-false.png");
                      } else {
                        v.status = "和";
                        v.imgUrl = require("../../../../../../assets/img/public/image/common/personal/userInfo/he.png");
                      }
                      break;
                    case 2:
                      v.status = "无效";
                      v.imgUrl = require("../../../../../../assets/img/public/image/common/personal/userInfo/invalid.png");
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
      this.getScreed("SPORT");
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.newMescroll();
      this.createPicker();
    });
  }
};
</script>

<style lang="less" >
@import "../../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";
.sport {
  height: 92%;
  background: #f8f8f8;
  .screen {
    position: absolute;
    top: 0.26rem;
    right: 0.2rem;
    font-size: 0.36rem;
    color: #fff;
  }
  .sport-all {
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
  .sport-detail {
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
    .betInfo {
      height: auto;
      background: #fff;
      min-height: 2.2rem;

      .betInfo-header {
        height: 0.7rem;
        line-height: 0.7rem;
        padding-left: 0.6rem;
        font-size: 0.28rem;
        color: #888;
        background: #f9f9f9;
      }
      .betInfo-content {
        padding-left: 0.6rem;
        padding-right: 0.2rem;
        div {
          height: 0.75rem;
          line-height: 0.75rem;
          display: flex;
          span {
            font-size: 0.26rem;
            color: #888;
          }
        }
        div:nth-child(2) {
          span:nth-child(1) {
            color: #000;
            flex: 5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(2) {
            flex: 2;
            span {
              color: #f60;
            }
          }
        }
      }
    }
  }
}

.mainNone {
  display: none;
}
</style>
