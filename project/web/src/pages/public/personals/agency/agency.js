
import store from "@/vuex/store";
const Agency = {

  data: function () {
    return {
      refundData: [],
      // 反水选中的
      refundList: 0,

      // 选中的反水比例
      setRefund: [],
    }
  },
  methods: {
    // 获取反水信息
    getRefundInfo() {
      this.$store.commit("loading", true);
      this.$http
        .post(`${this.$HOST_NAME}/member/refundInfo`)
        .then(res => {
          localStorage.setItem("refund", JSON.stringify(res.data.platform))
          this.refundData = res.data.platform;
          this.refundData.forEach(v => {
            v.active = "未设置";
            v.list.forEach((a, i) => {
              a.value = this.toFloat(a.value);
              a.option = [{
                value: '0.0',
                name: "0%"
              }];

              for (let j = 1; j <= a.value * 10; j++) {
                a.option.push({
                  value: j / 10,
                  name: j / 10 + "%"
                });
              }
            });
          });
          // console.log(this.refundData)
          this.setRefund = this.refundData[0].list;
          this.refundName = this.refundData[0].name;
          this.$store.commit("loading", false);

          // for循环 反水比例
          // for (
          //   let i = 170; i <= this.$store.state.mainState.userinfo.agencyInfo.rebate / 10; i++
          // ) {
          //   this.options1.push(i + "0");
          // }
        })
    },

    toFloat(value) {
      value = Math.round(parseFloat(value) * 10) / 10;
      if (value.toString().indexOf(".") < 0) {
        value = value.toString() + ".0";
      }
      return value - 0;
    },
    //  减少
    reduce() {
      this.setRefund.forEach(v => {
        let refund = (v.value * 10 - 1) / 10;
        v.value = refund <= 0 ? '0.0' : refund;
      });
    },
    // 增加
    increase() {
      let refund = JSON.parse(localStorage.getItem("refund"));
      // console.log(this.refundData)
      // console.log(this.setRefund)
      // let maxRefund;
      refund.forEach(v => {
        if (v.name == this.refundName) {
          v.list.forEach((a, b) => {
            // maxRefund = a.refund;
            this.setRefund[b].value =
              this.setRefund[b].value * 10 + 1 >= a.value * 10 ?
                a.value * 1 :
                (this.setRefund[b].value * 10 + 1) / 10;
          });
        }
      });
    },
    // 最大反水
    MaxRefund() {
      let arr = [];
      this.setRefund.forEach(v => {
        arr.push(v.value);
      });

      let Max = Math.max(...arr);

      this.refundData.forEach(v => {
        if (v.name == this.refundName) {
          v.active = Max + "%";
        }
        // console.log(this.refundName)
      })
      // this.setRefund.active = "已设置";
    },

    // 转换成JSON格式
    productJsonParams() {
      // {"视讯":[{"EBET_LIVE":"0.4"},{"DG_LIVE":"0.4"},{"LEBO_LIVE":"0.4"},{"LMG_LIVE":"0.4"},{"AB_LIVE":"0.4"},{"DS_LIVE":"0.4"},{"OG_LIVE":"0.4"},{"SA_LIVE":"0.4"},{"AG_LIVE":"0.4"},{"BBIN_LIVE":"0.4"},{"DS_LIVE":"0.4"}],
      // "电子":[{"MG_GAME":"0.4"},{"AE_GAME":"0.4"},{"TTG_GAME":"0.4"},{"JDB_GAME":"0.4"},{"DT_GAME":"0.4"},{"FG_GAME":"0.4"},{"CQ9_GAME":"0.4"},{"MW_GAME":"0.4"},{"KY_GAME":"0.4"},{"AG_GAME":"0.4"},{"BBIN_GAME":"0.4"},{"PT_GAME":"0.4"}],
      // "体育":[{"BBIN_SPORT":"0.4"},{"AG_SPORT":"0.4"},{"SHABA_SPORT":"0.4"},{"SX_SPORT":"0.4"}],
      // "vr彩票":[{"VR_LOTTERY":"0.4"}],
      // "棋牌":[{"CT_LOTTERY":"0.4"}]}
      let sendParam = {};
      sendParam.refundjson = {};
      this.refundData.forEach(v => {
        sendParam.refundjson[v.name] = []; //{视讯:[{BG_LIVE:"0.4"}]}
        v.list.forEach((a, b) => {
          sendParam.refundjson[v.name][b] = {};
          sendParam.refundjson[v.name][b][a.key] = a.value;
        });
      });
      return JSON.stringify(sendParam.refundjson);
    },

    // 切换反水选中
    toggleRefund(i, list, name) {
      this.refundList = i;
      this.setRefund = list;
      this.refundName = name;
      // console.log(list)
    },
  },
  created() {
  },
  beforeDestroy() {
    this.$store.commit("loading", false);
    localStorage.removeItem('refund')
  },
  store
}

export default Agency 