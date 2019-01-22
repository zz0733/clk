<template>
  <div class="traninf-record">
    <mi-nav v-on:select-time="selectTime"></mi-nav>
    <div class="record-list">
      <van-tabs :line-width="70" >
        <van-tab v-for="(item,i) in recordList" :key="i">
          <div slot="title" class="tab-title" @click="toggle(i)">
            <span>{{item.text}}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="record-content" ref="recordContent">
      <div id="mescroll" class="mescroll">
        <div id="dataList">
          <div class="row" v-for="(item,i) in recordData" :key="i">
            <div class="row-header">
              <span class="fl">{{title}}</span>
              <!-- <span v-show="(type=='withdrawals'||type=='deposit') && (item.status !=='fail') &&(item.status !=='success') " class="ifSpan" >催账</span> -->
              <!-- <span>催账</span> -->
            </div>
            <div class="row-content">
              <div>
                <span>{{item.code||item.title||item.subType||item.type}}</span>
                <span>{{item.amount||item.bouns}}</span>
              </div>
              <div>
                <span>{{$moment.unix(item.time?item.time:item.created_at - 0).format('YYYY-MM-DD HH:mm:ss')}}</span>
                <span v-if="type=='withdrawals'||type=='deposit'" @click="showToast(item.remark)">
                             <label :class="item.status"></label>
                             {{item.status=='fail'?'失败详情':(item.status =='success'?'成功':'处理中')}}
                         </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="record-total" v-if="type != 'other' && recordData.length">
      <span>{{totalText}}</span>
      <span>￥{{totalAmount}}</span>
    </div>
    <div class="other-total" v-else-if="recordData.length">
      <div class="left">
        <span>总存</span>
        <span>￥{{totalObj.deposit_amount}}</span>
      </div>
      <div class="right">
        <span>总取</span>
        <span>￥{{totalObj.withdrawals_amount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getSystemDate from "../../components/time.js";
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css' 

export default {
  data() {
    return {
      // timeNum: 0,
      // timeData: [
      //   { title: "本周" },
      //   { title: "上周" },
      //   { title: "本月" },
      //   { title: "上月" }
      // ],
      recordList: [
        {
          text: "提现记录"
        },
        {
          text: "充值记录"
        },
        {
          text: "优惠记录"
        },
        {
          text: "代理记录"
        },
        {
          text: "其他记录"
        }
      ],
      mescroll: null,
      orderHis: [],
      recordData: [],
      url: `${this.$HOST_NAME}/withdrawals/index`,
      type: "withdrawals",
      totalAmount: "",
      totalObj: {},
      totalText: "总提现",
      title: "提款",
      timeStart: getSystemDate.getCurrWeekDays()[0],
      timeEnd: getSystemDate.getCurrWeekDays()[1],
      tip: "提现"
    };
  },
  methods: {
    selectTime(time) {
      this.mescroll.destroy();
      this.mescroll.removeEmpty();
      document.getElementById("mescroll").scrollTop = 0;
      if (time == 0) {
        (this.timeStart = getSystemDate.getCurrWeekDays()[0]),
          (this.timeEnd = getSystemDate.getCurrWeekDays()[1]);
      } else if (time == 1) {
        (this.timeStart = getSystemDate.getLastWeekDays()[0]),
          (this.timeEnd = getSystemDate.getLastWeekDays()[1]);
      } else if (time == 2) {
        (this.timeStart = getSystemDate.getCurrMonthDays()[0]),
          (this.timeEnd = getSystemDate.getCurrMonthDays()[1]);
      } else if (time == 3) {
        (this.timeStart = getSystemDate.getLastMonthDays()[0]),
          (this.timeEnd = getSystemDate.getLastMonthDays()[1]);
      }
      this.createdMescroll();
    },
    showToast(txt) {
      if (txt) {
        this.$newToast(txt);
      }
    },
    transform(obj) {
      const { url, type, totalText, title, tip } = obj;
      this.url = url;
      this.type = type;
      this.totalText = totalText;
      this.title = title;
      this.tip = tip;
    },
    toggle(i = 0) {
      this.recordData = [];
      this.mescroll.destroy();
      this.mescroll.removeEmpty();
      // console.log( document.querySelectorAll('#mescroll').scrollTop)
      document.getElementById("mescroll").scrollTop = 0;
      // this.mescroll.setPageNum(2);
      // this.$refs.recordContent.scrollTop
      switch (i) {
        case 0:
          this.transform({
            url: `${this.$HOST_NAME}/withdrawals/index`,
            type: "withdrawals",
            totalText: "总提现",
            title: "提款",
            tip: "提现"
          });
          break;
        case 1:
          this.transform({
            url: `${this.$HOST_NAME}/deposit/index`,
            type: "deposit",
            totalText: "总存款",
            title: "存款",
            tip: "充值"
          });
          break;
        case 2:
          this.transform({
            url: `${this.$HOST_NAME}/preferential/receive`,
            type: "preferential",
            totalText: "总优惠",
            title: "优惠",
            tip: "优惠"
          });
          break;
        case 3:
          this.transform({
            url: `${this.$HOST_NAME}/Agency/record`,
            type: "agency",
            totalText: "总收入",
            title: "收入",
            tip: "代理"
          });
          break;
        case 4:
          this.transform({
            url: `${this.$HOST_NAME}/member/record/other`,
            type: "other",
            totalText: "合计",
            title: "加款/减款",
            tip: "其他"
          });
          break;
        default:
          break;
      }
      this.createdMescroll();
      // this.upCallback({ num: 1 });
      // this.upCallback({ num: 1 });
    },
    createdMescroll() {
      this.mescroll = new MeScroll("mescroll", {
        up: {
          callback: this.upCallback, //上拉回调
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          page: {
            size: 10
          }, //可配置每页8条数据,默认10
          toTop: {
            offset: 1000
          },
          empty: {
            warpId: "dataList",
            icon: require("../../../../../../assets/img/public/image/common/personal/userIndex/no-data.png"),
            tip: `暂无${this.tip}记录`
          },
          htmlNodata: '<p class="upwarp-nodata">没有更多了</p>'
        }
      });
    },
    upCallback(page) {
      this.getListDataFromNet(
        page.num,
        curPageData => {
          if (page.num == 1) this.recordData = [];
          this.recordData = this.recordData.concat(curPageData.data.list);
          this.$loading(false);
          this.mescroll.endByPage(
            curPageData.data.list.length,
            curPageData.per_page
          );
        },
        () => {
          this.mescroll.endErr();
        }
      );
    },
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      this.$http
        .post(`${this.url}`, {
          timeStart: this.timeStart,
          timeEnd: this.timeEnd,
          page: pageNum
        })
        .then(
          res => {
            this.orderHis = res.data;
            if (this.type == "other") {
              this.totalObj = res.data.data.amount;
            } else {
              this.totalAmount = res.data.data.amount;
            }

            successCallback && successCallback(this.orderHis); //成功回调
          },
          err => {}
        );
    }
  },
  created() {
    this.$loading(true);
  },
  mounted() {
     this.$nextTick(()=>{
        let fontSize = +document.querySelector('html').style.fontSize.split('px')[0] / 100
        let clientHeight = document.body.clientHeight
        let contH = clientHeight - (396 ) * fontSize
        this.$refs['recordContent'].style.height = contH + 'px'
    });
    this.createdMescroll();
  },
  filters: {
    fliterImg: function(status) {
      if (status == "fail") {
        return require("@assets/img/public/image/common/personal/userInfo/status-false.png");
      } else if (status == "success") {
        return require("@assets/img/public/image/common/personal/userInfo/status-success.png");
      } else {
        return require("@assets/img/public/image/common/personal/userInfo/status-wait.png");
      }
    }
  },
  destroyed() {
    this.mescroll.destroy();
  }
};
</script>

<style lang="less" scoped>
.traninf-record {
  .record-list {
    margin-top: 0.2rem;
    /deep/ .van-tab {
      flex: 0 0 25%;
    }
  }
  .record-content {
    margin-top: 0.2rem;
    .row {
      height: 1.98rem;
      margin-bottom: 0.2rem;
      background: #fff;
      padding: 0 0.3rem;
      .row-header {
        height: 0.76rem;
        line-height: 0.76rem;
        border-bottom: 0.02rem solid #f2f2f2;
        span:nth-child(1) {
          font-size: 0.3rem;
        }
        .ifSpan {
          font-size: 0.28rem;
          display: inline-block;
          width: 0.78rem;
          height: 0.42rem;
          border-radius: 0.1rem;
          color: #f50;
          border: 0.02rem solid #f00;
          text-align: center;
          line-height: 0.42rem;
          margin-top: 0.15rem;
          float: right;
        }
        .elseSpan {
          font-size: 0.28rem;
          display: inline-block;
          width: 0.78rem;
          height: 0.42rem;
          border-radius: 0.1rem;
          color: #ccc;
          border: 0.02rem solid #ccc;
          text-align: center;
          line-height: 0.42rem;
          margin-top: 0.15rem;
          float: right;
        }
      }
      .row-content {
        position: relative;
        div {
          display: flex;
          height: 0.6rem;
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
        div:nth-child(2) {
          span:nth-child(1) {
            font-size: 0.28rem;
            color: #999999;
          }
          span:nth-child(2) {
            label {
              display: inline-block;
              width: 0.33rem;
              height: 0.33rem;
              vertical-align: middle;
              background-size: contain;
              background-image: url("../../../../../../assets/img/public/image/common/personal/userInfo/status-wait.png");
              &.fail {
                background-image: url("../../../../../../assets/img/public/image/common/personal/userInfo/status-false.png");
              }
              &.success {
                background-image: url("../../../../../../assets/img/public/image/common/personal/userInfo/status-success.png");
              }
            }
          }
        }
      }
    }
  }
  .record-total {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
    background: #fff;
    padding-right: 0.32rem;
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      background: rgba(219, 219, 219, 0.5);
      position: absolute;
      top: 0;
      left: 0;
    }
    span {
      font-weight: 400;
      font-family: PingFangSC-Regular !important;
      &:nth-child(1) {
        font-size: 0.3rem;
        color: #424242;
      }
      &:nth-child(2) {
        font-size: 0.36rem;
        color: #ff0000;
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
