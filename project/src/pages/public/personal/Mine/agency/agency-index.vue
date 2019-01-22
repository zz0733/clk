<template>
  <div class="agency-index">
    <div class="header">
      <p>
        {{timeStart}}&nbsp; - &nbsp;{{timeEnd}}
      </p>

      <p @click="timeShow =true">
        筛选
      </p>
      <i class="cubeic-select" @click="timeShow =true"></i>
    </div>
    <div class="agency-content">
      <!-- <cube-scroll> -->
        <div class="row" v-for="(v,i) in functionList" :key="i">
          <img :src="v.img" alt="">
          <div>
            <span>{{v.text}}</span>
            <span class="fr">
              {{v.money}}
            </span>
          </div>
        </div>
      <!-- </cube-scroll> -->
    </div>
    <van-picker v-if="timeShow" class="time-picker" @cancel="timeShow =false" @confirm="hanlderTime" show-toolbar :columns="columns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      agencyData: {},
      functionList: [
        {
          key: "memberCount",
          text: "团队总人数",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-team@2x.png"),
          money: ""
        },
        {
          key: "net",
          text: "团队净利润",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-balance@2x.png"),
          money: ""
        },
        {
          key: "agency_money",
          text: "代理收入",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/agency-money@2x.png"),
          money: ""
        },
        {
          key: "newMemberList_sum",
          text: "新增用户",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-newuser@2x.png"),
          money: "0.00"
        },
        {
          key: "depositCount",
          text: "存款人数",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-depositors@2x.png"),
          money: ""
        },
        {
          key: "balance",
          text: "团队余额",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-netprofit@2x.png"),
          money: ""
        },
        {
          key: "rechargeList_sum",
          text: "充值量",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-recharge@2x.png"),
          money: "88.00"
        },
        {
          key: "betAmountList_sum",
          text: "投注量",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-betting@2x.png"),
          money: "0.00"
        },
        {
          key: "withdrawList_sum",
          text: "提现量",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-withdraw@2x.png"),
          money: "7.00"
        },
        {
          key: "rebateList_sum",
          text: "返点",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-rebate@2x.png"),
          money: "0.00"
        },
        // {
        //   key: "refundList_sum",
        //   text: "返水",
        //   img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-fanshui@2x.png"),
        //   money: "0.00"
        // },
        {
          key: "discounts",
          text: "优惠",
          img: require("../../../../../assets/img/public/image/common/personal/userInfo/p-youhui@2x.png"),
          money: "0.00"
        }
      ],
      timeStart: this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7),
      timeEnd: this.getToday(new Date()),
      columns: ["今天", "昨天", "最近七天", "最近一个月", "最近三个月"],
      timeShow: false
    };
  },
  methods: {
    getTeamInfo() {
      this.$http
        .post(`${this.$HOST_NAME}/Agency/getTeamInfo`, {
          timeStart: this.timeStart,
          timeEnd: this.timeEnd
        })
        .then(res => {
          if (res.code == 200) {
            for (let key in res.data) {
              this.functionList.forEach(item => {
                if (key === item.key) {
                  item.money = res.data[key];
                }
              });
            }
            this.$loading(false);
          } else {
            if (res && res.message) {
              this.$newToast(res.message);
            } else {
              // //this.$newToast("服务器报错");
            }
          }
        });
    },
    hanlderTime(val) {
      console.log(val);
      if (val == "今天") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24);
        this.timeEnd = this.getToday(new Date());
      } else if (val == "昨天") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 2);
        this.timeEnd = this.getToday(new Date() - 1000 * 60 * 60 * 24);
      } else if (val == "最近七天") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7);
        this.timeEnd = this.getToday(new Date());
      } else if (val == "最近一个月") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 30);
        this.timeEnd = this.getToday(new Date());
      } else if (val == "最近三个月") {
        this.timeStart = this.getToday(
          new Date() - 1000 * 60 * 60 * 24 * 30 * 3
        );
        this.timeEnd = this.getToday(new Date());
      }

      this.getTeamInfo();
      this.timeShow = false;
    }
  },
  created() {
    this.$loading(true);
    this.getTeamInfo();
  },
  beforeDestroy() {
    this.$loading(false);
  }
};
</script>

<style lang="less" scoped>
.agency-index {
  height: 92%;
  background: #f8f8f8;
  overflow-y: scroll;
  .header {
    height: 0.9rem;
    background: #f9f9f9;
    line-height: 0.9rem;
    padding-left: 0.2rem;
    position: relative;
    p {
      font-size: 0.26rem;
      color: #999;
    }
    p:nth-child(2) {
      position: absolute;
      right: 0.6rem;
      top: 0;
      font-size: 0.28rem;
      color: #666;
    }
    .cubeic-select {
      position: absolute;
      right: 0.26rem;
      // top: 0.45rem;
      font-size: 0.24rem;
      top: 0;
      border-width: 0.16rem 0.08rem 0 0.08rem;
    }
  }
  .agency-content {
    // height: 10.5rem;
    // padding-bottom: 2rem;
    background: #fff;
    margin-top: 0.2rem;
    .row {
      height: 0.98rem;
      padding-left: 0.84rem;
      position: relative;
      img {
        position: absolute;
        top: 0.24rem;
        left: 0.24rem;
        width: 0.58rem;
      }
      div {
        line-height: 0.98rem;
        margin-right: 0.2rem;
        border-bottom: 1px solid #f5f5f5;
        margin-left: 0.24rem;
        font-size: 0.3rem;
        span:nth-child(2) {
          margin-right: 0.28rem;
          font-size: 0.3rem;
          color: #f90;
        }
      }
    }
  }

  .time-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
}
</style>
