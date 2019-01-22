<template>
<div class="honest">

  <cube-scroll>
    <div class="honest-header">
      <span>游戏类型</span>
      <span>有效投注</span>
      <span>返水金额</span>
      <span>返水比例</span>
    </div>

    <van-collapse v-model="activeName" accordion>
      <van-collapse-item :name="i+1" v-for="(val,key,i) in refundData" :key="i">
        <div slot="title">
          <span>{{key}}</span>
          <span>{{Math.floor(validBetAmount[key].vm * 100) / 100}}</span>
          <span>{{Math.floor(validBetAmount[key].am * 100) / 100}}</span>
          <span>{{validBetAmount[key].point +'%'}}</span>
        </div>
        <div v-for="(v,i) in val" :key="i" class="refund">
          <span>{{v.platformName}}</span>
          <span>{{v.validBetAmount}}</span>
          <span>{{v.amount}}</span>
          <span>{{v.point}}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="submit" @click="yijianrefund">
      一键返水
    </div>

    <p class="shuoming">
      返水说明:所有平台返水都是按美东时间计算,会员可随时返水。如会员未自行返水,系统每天将自动为您返水。由于数据同步有延迟,请下注后30分钟左右再来返水！

    </p>
    <div style="height:.5rem;"></div>
  </cube-scroll>
</div>
</template>

<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      refundData: {},
      activeName: ["1"],
      execType: "select",
      validBetAmount: {}
      // amount: 0
    };
  },
  methods: {
    refund() {
      this.$http
        .post(`${this.$HOST_NAME}/member/refund`, {
          execType: this.execType
        })
        .then(res => {
          if (res.code == 200) {
            delete res.data["合计"];
            this.refundData = res.data;
            for (let key of Object.keys(this.refundData)) {
              this.validBetAmount[key] = {};
              this.validBetAmount[key].vm = 0;
              this.validBetAmount[key].am = 0;
              this.validBetAmount[key].point = 0;
              this.refundData[key].forEach(v => {
                this.validBetAmount[key].vm += parseFloat(v.validBetAmount);
                this.validBetAmount[key].am += parseFloat(v.amount);
                this.validBetAmount[key].point =
                  this.validBetAmount[key].point < v.point
                    ? v.point
                    : this.validBetAmount[key].point;
                v.point = v.point + "%";
              });
            }

            this.$loading(false);
          }
        });
    },
    yijianrefund() {
      this.execType = "execute";

      this.$http
        .post(`${this.$HOST_NAME}/member/refund`, {
          execType: this.execType
        })
        .then(res => {
          if (!res.data) {
            this.$newToast("暂无返水");
          } else {
            // this.refundData = {};
            this.execType = "select";
            this.$toast.success("返水总金额" + res.data);
            // window.location.reload();
            this.refund();
          }
        });
    }
  },
  created() {
    this.$loading(true);
    this.refund();
  },
  beforeDestroy() {
    this.$loading(false);
  },
  filters: {
    capitalize: function(value) {
      let nums = 0;
      nums += value;
      return nums;
    }
  },

  store
};
</script>

<style lang="less">
.honest {
  height: 92%;
  .honest-header {
    padding-right: 0.2rem;
    height: 0.62rem;
    display: flex;
    background: linear-gradient(180deg, #fff, #f5f5f5);
    border-top: 1px solid #f5f5f5;
    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.26rem;
    }
  }
  .van-cell {
    padding: 0;
    padding-right: 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    .van-cell__value--alone {
      > div {
        display: flex;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.26rem;
        }
      }
    }
    i {
      position: absolute;
      right: 0.3rem;
      top: 0.2rem;
    }
  }
  .van-collapse-item__content {
    padding: 0;
    // display: flex;
    // flex-wrap: wrap;
    .refund {
      // display: flex;
      height: 0.62rem;
      background: #f8f8f8;
      padding-right: 0.3rem;
      border-bottom: 1px dashed #ddd;
      display: flex;
      span {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.24rem;
        color: #666;
      }
      // flex: 0 0 33.33%;
      // display: inline-block;
      // font-size: 0.26rem;
      // margin: 0.3rem 0;
      // color: #999;
    }
    .refund:last-child {
      border: none;
    }
  }
  .submit {
    margin: 0 0.2rem;
    margin-top: 0.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #fff;
    border-radius: 0.15rem;
    background: linear-gradient(90deg, #ff5000, #ff8e00);
    font-size: 0.36rem;
  }
  .shuoming {
    color: #575e68;
    font-size: 0.28rem;
    padding: 0.3rem;
    line-height: 0.4rem;
    text-indent: -0.08rem;
  }
}
</style>
