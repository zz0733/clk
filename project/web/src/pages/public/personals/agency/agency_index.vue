<template>
  <div class="agency_index">
    <!-- <div class="header">
          代理中心
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

        <DatePicker placeholder="选择时间" type="daterange" placement="bottom-end" style="width: 236px;margin-left:25px;" @on-change="hanlderTime"></DatePicker>
      </div>

      <div class="agency-info">
        <ul>

          <li>
            <img src="/static/public/image/proimt/p-netprofit@2x.png" alt="">
            <div>
              <p>团队净利润</p>
              <p>{{agencyData.net||0}}元</p>
            </div>
          </li>

          <li>
            <img src="/static/public/image/proimt/p-balance@2x.png" alt="">
            <div>
              <p>团队余额</p>
              <p>{{agencyData.balance||0}}元</p>
            </div>
          </li>

          <li>
            <img src="/static/public/image/proimt/p-depositors@2x.png" alt="">
            <div>
              <p>存款人数</p>
              <p>{{agencyData.depositCount||0}}人</p>
            </div>
          </li>

          <li>
            <img src="/static/public/image/proimt/p-team@2x.png" alt="">
            <div>
              <p>团队总人数</p>
              <p>{{agencyData.memberCount||0}}人</p>
            </div>
          </li>

          <li></li>
        </ul>

      </div>

      <div class="quantity">
        <ul class="clearfloat">
          <li :class="{liSelect:liSelect ==0}" @click="toggle(0)">
            <p>投注量</p>
            <!-- <p>{{agencyData.netAmountList_sum||0}}</p> -->
            <p>{{agencyData.betAmountList_sum||0}}</p>

          </li>
          <li :class="{liSelect:liSelect ==1}" @click="toggle(1)">
            <p>充值量</p>
            <p>{{agencyData.rechargeList_sum||0}}</p>
          </li>
          <li :class="{liSelect:liSelect ==2}" @click="toggle(2)">
            <p>提现量</p>
            <p>{{agencyData.withdrawList_sum||0}}</p>
          </li>
          <li :class="{liSelect:liSelect ==3}" @click="toggle(3)">
            <p>新增用户数</p>
            <p>{{agencyData.newMemberList_sum||0}}</p>
          </li>
          <li :class="{liSelect:liSelect ==4}" @click="toggle(4)">
            <p>返点</p>
            <p>{{agencyData.rebateList_sum||0}}</p>
          </li>
        </ul>
      </div>

      <div class="echarts">
        <div id="ECharts" style="width: 936px;height:315px;"></div>
      </div>

    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      day: "1",
      timeStart: "",
      timeEnd: "",
      agencyData: {},
      liSelect: 0
    };
  },
  methods: {
    getTeamInfo() {
      this.$http
        .post(`${this.$HOST_NAME}/Agency/getTeamInfo`, {
          timeStart:
            this.timeStart || this.getYMD(new Date() - 1000 * 60 * 60 * 24),
          timeEnd: this.timeEnd || this.getYMD(new Date())
        })
        .then(res => {
          if (res.code == 200) {
            this.agencyData = res.data;
          }
        });
    },
    hanlderRadio(val) {
      if (val == 1) {
        this.timeStart = this.getYMD(new Date() - 1000 * 60 * 60 * 24);
        this.timeEnd = this.getYMD(new Date());
      } else if (val == 2) {
        this.timeStart = this.getYMD(new Date() - 1000 * 60 * 60 * 24 * 2);
        this.timeEnd = this.getYMD(new Date() - 1000 * 60 * 60 * 24);
      } else {
        this.timeStart = this.getYMD(new Date() - 1000 * 60 * 60 * 24 * 7);
        this.timeEnd = this.getYMD(new Date());
      }

      this.getTeamInfo();
    },
    hanlderTime(date) {
      this.timeStart = date[0];
      this.timeEnd = date[1];
      this.getTeamInfo();
    },
    toggle(i) {
      this.liSelect = i;
    }
  },
  created() {
    this.getTeamInfo();
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("ECharts"));
    var symbolSize = 8;
    var data = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]];
    var option = {
      color: ["#3f90c8"],
      tooltip: {
        formatter: function(params) {
          var data = params.data || [0, 0];
          return data[0].toFixed(2) + ", " + data[1].toFixed(2);
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        min: 0,
        max: 23,
        type: "value",
        splitNumber: 23
      },
      yAxis: {
        min: -1,
        max: 1,
        type: "value",
        splitNumber: 5
      },
      series: [
        {
          id: "a",
          type: "line",
          smooth: true,
          symbolSize: symbolSize,
          data: data
        }
      ]
    };
    myChart.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.agency_index {
  padding: 0 14px;
  // .header {
  //   height: 66px;
  //   // line-height: 66px;
  //   border-bottom: 1px solid #f3f3f3;
  //   font-size: 1.8em;
  //   padding-left: 10px;
  //  color: #696969;
  //   line-height: 85px;
  //   font-weight: 400;
  // }
  .content {
    .search {
      height: 64px;
      line-height: 64px;
      padding: 0 10px;
    }
    .agency-info {
      //   height: 148px;
      //   background: #fff;
      //   padding: 30px 20px;
      //   margin-bottom: 20px;
      margin-top: 10px;
      padding-bottom: 40px;
      border-bottom: 1px solid #f3f3f3;
      ul {
        display: flex;
        li {
          // float: left;
          // width: 25%;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            border-radius: 50%;
            width: 62px;
            margin-right: 20px;
          }
          div {
            p:nth-child(1) {
              color: #333;
              font-weight: 400;
              font-size: 16px;
              padding: 10px 0;
            }
            p:nth-child(2) {
              color: #ff9146;
            }
          }
        }
      }
    }
    .quantity {
      border-bottom: 1px solid #f3f3f3;
      padding: 25px 0;
      ul {
        li {
          float: left;
          width: 20%;
          height: 80px;

          padding: 15px;
          padding-left: 50px;
          cursor: pointer;
          p:nth-child(1) {
            font-size: 16px;
            color: #999;
          }
          p:nth-child(2) {
            font-size: 20px;
            color: #333;
            margin-top: 20px;
          }
        }

        .liSelect {
          background: #f5f5f5;
          border-radius: 10px;
          p:nth-child(2) {
            color: #f60;
          }
        }
      }
    }
  }
}
</style>
