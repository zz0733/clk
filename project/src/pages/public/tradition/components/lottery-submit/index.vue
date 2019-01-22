<template>
<div class="submit-content">
  <div class="submit-title">
    <div class="text">
      <span class="fl">下注信息</span>
      <span class="fr">
          <label for="">第</label>
          {{childNeedMess.issue}}
          <label for="">期</label>
        </span>
    </div>
    <!-- <div class="close-box" @click="close">
                <div>
                    <span class="cubeic-close"></span>
                </div>
            </div> -->
  </div>
  <div class="submit-total-box">
    共计:
    <span>{{totalObj.num}}</span>注，下注金额
    <span> {{totalObj.momey}} </span>元
  </div>
  <div class="submit-list">
    <cube-scroll :data="submitListDatas">
      <!-- 单换行 -->
      <!-- <div v-if="sideSelect=='合肖'||sideSelect=='全不中'" class="single-item-wrap">
                    <div class="single-item">{{submitListDatas[0]&&submitListDatas[0].intTitle}}</div>
                    <div class="single-item">{{submitListDatas[0]&&submitListDatas[0].code}}</div>
                    <div class="single-item">赔率：{{submitListDatas[0]&&submitListDatas[0].odds}}</div>
                    <div class="single-item"> ¥ {{submitMoney}}</div>
                </div> -->
      <!-- 多换行 -->
      <div v-if="sideSelect=='连尾'||sideSelect=='连肖'">
        <div class="item" v-for="(item,index) in submitListDatas" :key=index>
          <div class="left" :class="{
                              'active':
                                  sideSelect=='连尾'||
                                  sideSelect=='连肖'
                              }">
            <span>
                <span class="name">{{item.intTitle}}</span>
            <span>-</span>
            </span>

            <span class="play" :class="{'overSenv':item.code.length>15}">{{item.code}}</span>
          </div>
          <div class="center">
            赔率：{{(+item.odds*(1-total.rebate*0.01)).toFixed(2)}}
          </div>
          <div class="right">
            ¥ {{submitMoney}}
          </div>
        </div>
      </div>

      <div v-else-if="sideSelect=='合肖'||sideSelect=='全不中'">
        <div class="single-item-wrap">
          <div class="single-item">
            <span>{{submitListDatas[0]&&submitListDatas[0].intTitle}}</span>
            <span v-if="sideSelect=='合肖'">-</span>
            <span v-if="sideSelect=='合肖'">{{childSelect}}</span>
          </div>
          <div class="single-item">{{submitListDatas[0]&&submitListDatas[0].code}}</div>
          <div class="single-item">赔率：{{submitListDatas[0]&&submitListDatas[0].odds}}</div>
          <div class="single-item"> ¥ {{submitMoney}}</div>
        </div>
      </div>

      <div v-else>
        <div class="item" v-for="(item,index1) in submitListDatas" :key="index1">
          <div class="left" :class="{
                              'active':
                                  sideSelect=='连码'||
                                  sideSelect=='生肖连'||
                                  sideSelect=='尾数连'
                              }">
            <span>
                <span class="name">{{item.intTitle}}</span>
            <span>-</span>
            </span>

            <span class="play" :class="{'overSenv':item.code.length>15}">{{item.code}}</span>
          </div>
          <div class="center" v-show="$route.meta.series!='lhc'">
            赔率：{{(+item.odds*(1-total.rebate*0.01)).toFixed(2)}}
          </div>
          <div class="center" v-show="$route.meta.series=='lhc'">
            赔率：{{item.odds}}
          </div>

          <div class="right">
            ¥ {{submitMoney}}
          </div>
        </div>
      </div>

      <div class="lottery-left-nav-gasket"></div>
    </cube-scroll>
  </div>
  <div class="submit-btn">
    <span @click="close">取消 </span>
    <span @click="sure">确认</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    submitList: {
      type: Array
    },
    total: {
      type: Object
    },
    sideSelect: {
      type: String
    },
    childSelect: {
      type: String
    },
    childNeedMess: {
      type: Object
    }
  },
  data() {
    return {
      submitListDatas: [],
      totalObj: {
        momey: "",
        num: "",
        inputVal: ""
      },
      submitMoney: 0,
      ifSure: true
    };
  },
  methods: {
    close() {
      // console.log(this.sideSelect);
      this.$emit("hidePopup");
    },
    sure() {
      if (this.ifSure) {
        this.$emit("allSubmit");
        this.ifSure = false;
        setTimeout(() => {
          this.ifSure = true;
        }, 5000);
      }

    },
    resetMoney() {
      if (this.total.model.name == "元") {
        this.submitMoney =
          this.total.double * this.total.inputVal * this.total.model.db;
      } else if (this.total.model.name == "角") {
        this.submitMoney = (
          this.total.double *
          this.total.inputVal *
          this.total.model.db
        ).toFixed(1);
      } else if (this.total.model.name == "分") {
        this.submitMoney = (
          this.total.double *
          this.total.inputVal *
          this.total.model.db
        ).toFixed(2);
      }
    }
  },
  created: function() {},
  mounted() {
    this.totalObj.momey = this.total.momey;
    this.totalObj.num = this.total.num;
    this.totalObj.inputVal = this.total.inputVal;
    this.submitListDatas = this.submitList;
    // console.log(this.submitList)
    this.resetMoney();
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";
@scaleStar: 1.1;
@time: 0.2s;
.submit-content {
  width: 6.6rem;
  height: 6rem;
  background: #fff;
  border-radius: 0.2rem;
  opacity: 1;
  -webkit-animation: animateSub @time ease-in-out 1 both;
  -o-animation: animateSub @time ease-in-out 1 both;
  -moz-animation: animateSub @time ease-in-out 1 both;
  animation: animateSub @time ease-in-out 1 both;
  @-webkit-keyframes animateSub {
    0% {
      opacity: 0;
      -webkit-transform: scale(@scaleStar);
      -moz-transform: scale(@scaleStar);
      -o-transform: scale(@scaleStar);
      transform: scale(@scaleStar);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(scaleEnd);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @-moz-keyframes animateSub {
    0% {
      opacity: 0;
      -webkit-transform: scale(@scaleStar);
      -moz-transform: scale(@scaleStar);
      -o-transform: scale(@scaleStar);
      transform: scale(@scaleStar);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @-o-keyframes animateSub {
    0% {
      opacity: 0;
      -webkit-transform: scale(@scaleStar);
      -moz-transform: scale(@scaleStar);
      -o-transform: scale(@scaleStar);
      transform: scale(@scaleStar);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @-ms-keyframes animateSub {
    0% {
      opacity: 0;
      -webkit-transform: scale(@scaleStar);
      -moz-transform: scale(@scaleStar);
      -o-transform: scale(@scaleStar);
      transform: scale(@scaleStar);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes animateSub {
    0% {
      opacity: 0;
      -webkit-transform: scale(@scaleStar);
      -moz-transform: scale(@scaleStar);
      -o-transform: scale(@scaleStar);
      transform: scale(@scaleStar);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
  .submit-title {
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0 0 0.32rem;
    border-bottom: 1px solid #dbdbdb;
    background: @main-color;
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    .text {
      color: #fff;
      font-size: 0.32rem;
      .fl {
        float: left;
      }
      .fr {
        float: right;
        padding-right: 15px;
        font-size: 0.3rem;
      }
    }
    .close-box {
      float: right;
      width: 0.62rem;
      height: 0.52rem;
      //   background: #e1e1e1;
      border-bottom-left-radius: 0.24rem;
      border-top-left-radius: 0.24rem;
      margin-top: 0.22rem;
      div {
        margin-left: 0.03rem;
        margin-top: 0.02rem;
        height: 0.48rem;
        width: 0.48rem;
        border-radius: 50%;
        background: #fff;
        span {
          position: absolute;
          top: 0;
          right: 0.16rem;
          font-size: 0.4rem;
          color: #999;
        }
      }
    }
  }
  .submit-total-box {
    height: 0.7rem;
    line-height: 0.7rem;
    padding-right: 0.27rem;
    width: 100%;
    text-align: right;
    color: #000;
    font-size: 0.28rem;
    background: #f9f9f9;
    .issue {
      float: left;
      padding-left: 0.27rem;
      label {
        color: #000;
      }
    }
    span {
      color: @main-brder-color;
      padding: 0 0.04rem;
    }
  }
  .submit-list {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3.12rem;
    padding: 0 0.27rem;
    .item {
      // display: flex;
      height: 0.78rem;
      line-height: 0.78rem;
      border-bottom: 1px solid #f1f1f1;
      text-align: center;
      span {
        color: #000;
      }
      .left {
        white-space: nowrap;
        font-size: 0.28rem;
        color: #888888;
        float: left;
        width: 1.28rem;
        &.active {
          width: auto;
        }
        .play {
          &.overSenv {
            font-size: 0.16rem;
          }
        }
      }
      .center {
        font-size: 0.28rem;
        display: inline-block;
        //   position: absolute;
        //   left: 2.57rem;
      }
      .right {
        font-size: 0.28rem;
        color: @main-brder-color;
        float: right;
      }
    }
    .single-item-wrap {
      .single-item {
        height: 0.78rem;
        line-height: 0.78rem;
        border-bottom: 1px solid #f1f1f1;
        font-size: 0.28rem;
        color: #888888;
        &:last-child {
          color: @main-brder-color;
        }
      }
    }
  }
  .submit-btn {
    text-align: center;
    padding-top: 0.3rem;
    span {
      display: inline-block;
      width: 2.5rem;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #666666;
      font-size: 0.32rem;
      text-align: center;
      border-radius: 0.1rem;
      &:first-child {
        background: #f8f8f8;
        margin-right: 0.25rem;
      }
      &:last-child {
        background: @main-color;
        color: #fff;
      }
    }
  }
}
</style>
