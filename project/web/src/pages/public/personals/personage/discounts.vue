<template>
<div class="withdrawal-record">
  <!-- <div class="header">
         优惠记录
        </div> -->
  <div class="content">

    <div class="search">

      <RadioGroup v-model="day" @on-change="hanlderRadio">
        <Radio label="1">

          <span class="radio-span">今日</span>
        </Radio>
        <Radio label="2">

          <span class="radio-span">昨天</span>
        </Radio>
        <Radio label="3">

          <span class="radio-span">最近七天</span>
        </Radio>
      </RadioGroup>

      <DatePicker type="daterange" placement="bottom-end" style="width: 236px;" placeholder="选择时间" @on-change="hanlderDate"></DatePicker>
      <span class="searchSpan" @click="serachRecord">搜索</span>
    </div>


    <Table :columns="columns" :data="data" no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>


    <div class="page">
      <Page :current="i" v-if="total>0" :total="total" size="small" @on-change="hanlderPage"></Page>
    </div>
  </div>

</div>
</template>

<script>
import mixins from "./record";
export default {
  mixins: [mixins],
  data() {
    return {
      columns: [{
          title: "优惠名称",
          align: "center",
          // width: 240,
          key: "title",
          width: 300,
        },
        {
          title: "订单号",
          align: "center",
          key: "orderId",
          width: 240,
          // width:0
        },

        {
          title: "领取时间",
          align: "center",
          key: "time",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                this.$moment
                .unix(params.row.time - 0)
                .format("YYYY-MM-DD HH:mm:ss")
              )
            ]);
          }
        },
        {
          title: "金额",
          align: "center",
          key: "bouns",
          // width:0
        },

        {
          title: "状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.status == "success" ?
                "成功" :
                false || params.row.status == "fail" ? "失败" : "审核中"
              )
            ]);
          }
        },


      ],
      data: []
    };
  },
  methods: {
    getRecord() {
      this.$store.commit("loading", true);
      this.$http
        .post(`${this.$HOST_NAME}/preferential/receive?page=` + this.i, {
          timeStart: this.startTime,
          timeEnd: this.endTime,
          page: this.i,
          limit: 10
        })
        .then(res => {
          if (res.code == 200) {
            this.data = res.data.data.list;
            this.total = res.data.total;
            this.$store.commit("loading", false);
          } else {
            this.$store.commit("loading", false);
          }
        });
    },
  }
};
</script>

<style lang="less" scoped>
.withdrawal-record {
  // .header {
  //   height: 66px;
  //   // line-height: 66px;
  //   border-bottom: 1px solid #f3f3f3;
  //   font-size: 1.8em;
  //   padding-left: 10px;
  //   color: #696969;
  //   line-height: 85px;
  //   font-weight: 400;
  //   padding: 0 14px;
  // }
  .content {
    // position: relative;
    .search {
      height: 64px;
      line-height: 64px;
      padding: 0 10px;
      padding: 0 14px;
      .searchSpan {
        display: inline-block;
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 1.6em;
        font-weight: 200;
        color: #fff;
        background: linear-gradient(180deg, #ff3492, #ff1e4f);
        border-radius: 5px;
        margin-left: 18px;
        letter-spacing: 5px;
        cursor: pointer;
      }
    }
    .page {
      position: absolute;
      right: 25px;
      bottom: 20px;
    }
  }
}
</style>
