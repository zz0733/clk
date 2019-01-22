<template>
<div class="team-refund">

  <div class="team-refund-header">
    <span class="fl mh5-back" @click="teamRefundShow"></span> 修改返点
  </div>




  <div class="team-refund-main">
    <div class="row" :key='i' v-for="(val,i) in refund">
      <label>{{val.name}}:</label>

      <span class="fr cubeic-arrow" @click="updataRefund(val.name,val.list)"></span>
    </div>
  </div>


  <div class="team-refund-content" v-if="refundShow">

    <div class="refund-header">
      <span class="fl mh5-back" @click="refundShow = false"></span> 修改{{refundKey}}反水
    </div>

    <cube-scroll>

      <div class="refund-title">
        <span></span> {{refundKey}}反水设置
      </div>

      <div class="refund-btn">
        <span>
                                      {{refundKey}}反水
                                    </span>
        <span>
                                          <img src="../../../../../assets/img/public/image/common/personal/angencyImg/jianshao.png"  alt="" @click="reduce" >
                                          <img src="../../../../../assets/img/public/image/common/personal/angencyImg/zengjia.png" alt="" @click="increase">
                                      </span>
      </div>

      <div class="refund-content">
        <div class="refund-row" :key='key' v-for="(item,key) in refundVal">
          <label>{{item.name||item.key}}:</label>

          <cube-select v-model="item.value" :options="item.key|redundCaplitalize"></cube-select>

        </div>
      </div>

      <div class="submitRefund" @click="saveRefund">
        保存
      </div>

      <div style="height:.2rem"></div>
    </cube-scroll>
  </div>

  <div class="sumbit" @click="upUser">确定</div>
  <div class="close" @click="teamRefundShow">取消</div>

</div>
</template>

<script>
let self;
export default {
  props: ["refundData"],
  data() {
    return {
      refund: [],
      refundKey: "",
      refundShow: false,
      refundVal: []
    };
  },
  methods: {
    teamRefundShow() {
      this.$emit("teamRefundHide", false);
    },
    updataRefund(key, val) {
      this.refundKey = key;
      // console.log(val)
      let arr = [];
      // val.forEach((v, i) => {
      //   arr[i] = {};
      //   arr[i].name = this.refundData.alias[Object.keys(v)[0]];
      //   arr[i].key = Object.keys(v)[0];
      //   arr[i].refund = String(Object.values(v)[0]);
      // });
      this.refundVal = val;
      this.refundShow = true;
      // console.log(this.refundVal)
    },
    reduce() {
      // console.log(this.refundVal)
      this.refundVal.forEach(v => {
        v.value =
          v.value * 10 - 1 <= 0 ? "0.00" : String((v.value * 10 - 1) / 10).indexOf('.') != -1 ? String((v.value * 10 - 1) / 10) + '0' : String((v.value * 10 - 1) / 10) + '.00';
      });
    },
    increase() {
      let arr = this.refundVal;
      let refund;

      JSON.parse(localStorage.refundKey).forEach((v) => {
        if (v.name == self.refundKey) {
          refund = v.list
        }
      });

      //  console.log(arr)

      arr.forEach((v, i) => {

        // v.value =  String(v.value)
        if (v.name == refund[i].name) {

          // console.log(v.value * 10 + 1)
          // console.log(refund[i].value * 10 + 1)

          // v.value = v.value * 10 + 1 >= refund[i].value * 10 + 1 ? refund[i].value : String((v.value * 10 + 1) / 10)
          v.value = v.value * 10 + 1 >= refund[i].value * 10 + 1 ? refund[i].value : String((v.value * 10 + 1) / 10).indexOf('.') != -1 ? String((v.value * 10 + 1) / 10) + '0' : String((v.value * 10 + 1) / 10) + '.00'
        }
      })

      // console.log(arr)

      // arr.forEach((v, i) => {
      //   // if (Object.keys(v)[0] == this.refundVal[i].key) {
      //   //   this.refundVal[i].value = String(
      //   //     this.refundVal[i].value * 10 + 1 >= Object.values(v)[0] * 10
      //   //       ? Object.values(v)[0]
      //   //       : (this.refundVal[i].value * 10 + 1) / 10+'0'
      //   //   );
      //   // }
      // });

      // let arr;




    },
    saveRefund() {
      let arr = [];

      this.refundVal.forEach((v, i) => {
        arr[i] = {};
        arr[i][v.key] = v.refund;
      });

      this.refund[this.refundKey] = arr;
      this.refundShow = false;
    },
    productJsonParams() {
      // {"视讯":[{"EBET_LIVE":"0.4"},{"DG_LIVE":"0.4"},{"LEBO_LIVE":"0.4"},{"LMG_LIVE":"0.4"},{"AB_LIVE":"0.4"},{"DS_LIVE":"0.4"},{"OG_LIVE":"0.4"},{"SA_LIVE":"0.4"},{"AG_LIVE":"0.4"},{"BBIN_LIVE":"0.4"},{"DS_LIVE":"0.4"}],
      // "电子":[{"MG_GAME":"0.4"},{"AE_GAME":"0.4"},{"TTG_GAME":"0.4"},{"JDB_GAME":"0.4"},{"DT_GAME":"0.4"},{"FG_GAME":"0.4"},{"CQ9_GAME":"0.4"},{"MW_GAME":"0.4"},{"KY_GAME":"0.4"},{"AG_GAME":"0.4"},{"BBIN_GAME":"0.4"},{"PT_GAME":"0.4"}],
      // "体育":[{"BBIN_SPORT":"0.4"},{"AG_SPORT":"0.4"},{"SHABA_SPORT":"0.4"},{"SX_SPORT":"0.4"}],
      // "vr彩票":[{"VR_LOTTERY":"0.4"}],
      // "棋牌":[{"CT_LOTTERY":"0.4"}]}
      let sendParam = {};
      sendParam.refundjson = {};
      this.refund.forEach(v => {
        sendParam.refundjson[v.name] = []; //{视讯:[{BG_LIVE:"0.4"}]}
        v.list.forEach((a, b) => {
          sendParam.refundjson[v.name][b] = {};
          sendParam.refundjson[v.name][b][a.key] = a.value;
        });
      });
      return JSON.stringify(sendParam.refundjson);
    },
    upUser() {

      // console.log(this.refund)
      this.$http
        .post(`${this.$HOST_NAME}/Agency/upUser`, {
          uname: this.refundData.name,
          refundjson:this.productJsonParams()
        })
        .then(res => {
          if (res.code == 200) {
            this.$toast.success(res.data);
          } else {

          }
        });
    }
  },
  created() {
    this.refund = this.refundData.userPlatform;
    localStorage.setItem('refundKey', JSON.stringify(this.refundData.userPlatform))
  },
  mounted() {
    self = this;
  },
  filters: {
    redundCaplitalize: value => {
      // console.log(value)
      // console.log(JSON.parse(localStorage.getItem('linkRefund')))
      // let linkRefund = JSON.parse(localStorage.getItem("linkRefund"));
      // let refund = self.refundData.platform[self.refundKey];
      // let a;
      // refund.forEach(v => {
      //   if (Object.keys(v)[0] == value) {
      //     a = Object.values(v)[0];
      //   }
      // });

      // console.log(self.refundData)

      // if()
      let refund;
      let a;

      JSON.parse(localStorage.refundKey).forEach((v) => {
        if (v.name == self.refundKey) {

          refund = v.list
          // localStorage.setItem('refundKey', JSON.stringify(v.list))
        }
      })
      // console.log(refund)
      // console.log(value)

      refund.forEach(v => {
        if (v.key == value) {
          a = v.value
        }
      })

      //  refund.forEach(v => {
      //   if (Object.keys(v)[0] == value) {
      //     a = Object.values(v)[0];
      //   }
      // });



      let arr = ["0.00"];
      for (let i = 1; i <= a * 10; i++) {
        arr.push(String(i / 10).indexOf('.') != -1 ? String(i / 10) + '0' : String(i / 10) + '.00');
      }
      return arr;
      // console.log(self.refundData)
    }
  }
};
</script>

<style lang="less">
.team-refund {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #f5f5f5;
  padding-top: 1.08rem;
  z-index: 1001;
  .team-refund-header {
    height: 0.88rem;
    width: 100%;
    background: linear-gradient(90deg, #ff5100, #ff8e00);
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    padding: 0 0.18rem;
    position: absolute;
    top: 0;
    left: 0;
    span {
      // font-size: 0.46rem;
    }
  }
  .team-refund-main {
    .row {
      height: 1.1rem;
      background: #fff;
      line-height: 1.1rem;
      border-bottom: 0.02rem solid #f5f5f5;
      position: relative;
      label {
        display: inline-block;
        width: 1.46rem;
        text-align: right;
        font-size: 0.3rem;
      }
      span {
        margin-right: 0.28rem;
        font-size: 0.3rem;
        color: #aaa;
      }
    }
  }
  .team-refund-content {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // padding-top: 0.88rem;
    height: 100%;
    background: #f5f5f5;
    padding-top: 1.08rem;
    .refund-header {
      width: 100%;
      background: linear-gradient(90deg, #ff5100, #ff8e00);
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      padding: 0 0.18rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1002;
      span {
        font-size: 0.46rem;
      }
    }
    .refund-title {
      padding-left: 0.5rem;
      height: 0.88rem;
      line-height: 0.88rem;
      background-color: rgba(255, 255, 255, 1);
      position: relative;
      font-size: 0.3rem;
      border-bottom: 1px solid #f5f5f5;
      span {
        position: absolute;
        left: 0.4rem;
        top: 0.24rem;
        width: 0.05rem;
        height: 0.38rem;
        background-color: rgba(255, 153, 0, 1);
      }
    }
    .refund-btn {
      // width: 7.5rem;
      height: 0.8rem;
      background-color: rgba(255, 255, 255, 1);
      line-height: 0.8rem;
      position: relative;
      margin-bottom: 0.2rem;
      span {
        padding-left: 0.4rem;
        width: 1.12rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color: rgba(255, 153, 0, 1);
        font-size: 0.28rem;
        text-align: left;
        font-family: PingFangSC-Regular;
      }
      span:nth-child(2) {
        width: 3rem;
        float: right;
        padding-top: 0.25rem;
        // width: 100
        img {
          margin: 0 0.4rem;
          width: 0.3rem;
        }
      }
    }
    .refund-content {
      .refund-row {
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        label {
          display: inline-block;
          width: 2rem;
          text-align: right;
          font-size: 0.3rem;
        }
        .cube-select {
          padding: 0.1rem 0.4rem 0.2rem 0.2rem;
          border-radius: 0.04rem;
          font-size: 0.28rem;
          height: 0.9rem;
          line-height: 0.85rem;
          width: 72%;
          position: absolute;
          top: 0;
          right: 0.1rem;
          .cube-select-placeholder {
            display: none;
          }
        }
        .cube-select::after {
          border: none;
        }
        .cube-select-icon {
          border-width: 0.2rem 0.12rem 0 0.12rem;
          border-color: #ccc7c6 transparent transparent transparent;
        }
      }
    }
    .submitRefund {
      height: 0.9rem;
      line-height: 0.9rem;
      background: #f60;
      text-align: center;
      border-radius: 0.15rem;
      color: #fff;
      margin: 0.3rem 0.24rem;
    }
  }
  .sumbit {
    margin: 0.3rem;
    background: linear-gradient(90deg, #ff5100, #ff8e00);
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.32rem;
    border-radius: 0.15rem;
  }
  .close {
    margin: 0.3rem;
    background: #666;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.32rem;
    border-radius: 0.15rem;
  }
}
</style>
