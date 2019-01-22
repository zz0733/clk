<template>
  <div class="bet">

    <!-- <div class="header">
                    投注记录
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

        <Select v-model="type" @on-change="hanlderList">
          <Option v-for="(item,i) in gameData" :key="i" :value="item.type">{{item.name}}</Option>
        </Select>

        <Select v-model="platform" @on-change="hanlderPlatform" class="platform-select">
          <Option v-for="(item,i) in gameDetail.list" :key="i" :value="item.platform">{{item.name}}</Option>
        </Select>

        <!-- <Select v-model="gameName" @on-change="hanlderGameName" v-else>
                              <Option v-for="(item,i) in gameDetail.list" :key="i" :value="item.gameName" >{{item.name}}</Option>
                          </Select> -->

        <span v-if="statusShow">
          <label class="text">状态：</label>
          <Select v-model="status" @on-change="hanlderStatus">
            <Option v-for="(item,i) in statusList" :key="i" :value="i">{{item}}</Option>
          </Select>
        </span>

        <DatePicker placeholder="选择时间" type="daterange" placement="bottom-end" style="width: 236px;margin-left:25px;" @on-change="hanlderDate"></DatePicker>
      </div>

      <Table :columns="columns1" :data="data1" no-data-text="<div style='margin:100px 0;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>

      <div class="totalBet" v-if="validBetAmount">
        总投注：
        <span style="color:red">{{validBetAmount}}</span> ，总单量：
        <span style="color:red;">{{betCount}}</span>， 总输赢：
        <span style="color:red;">{{netAmount}}</span>
      </div>

      <div class="page">
        <Page show-total :current="i" v-if="total>0" :total="total" size="small" @on-change="hanlderPage"></Page>
      </div>

    </div>
  </div>
</template>

<script>
import bet from "./bet";
export default {
  data() {
    return {
      day: "1",
      gameData: [],
      gameDetail: {},
      gameNum: "VR彩票",
      platform: "",
      betView: "bet2",
      columns1: bet.Live,
      data1: [],
      i: 1, //当前页码
      total: 1,
      timeStart: this.getYMD(new Date()),
      timeEnd: this.getYMD(new Date() - 0 + 1000 * 60 * 60 * 24),
      lotterShow: true,
      type: "",
      status: "",
      statusList: ["未结算", "赢", "输", "和", "取消", "撤消"],
      statusShow: false,

      validBetAmount: "",
      netAmount: "",
      betCount: ""
    };
  },
  methods: {
    hanlderRadio(val) {
      this.i = 1;
      if (val == "1") {
        this.timeStart = this.getYMD(new Date());
        this.timeEnd = this.getYMD(new Date() - 0 + 1000 * 60 * 60 * 24);
      } else if (val == "2") {
        this.timeStart = this.getYMD(new Date() - 1000 * 60 * 60 * 24);
        this.timeEnd = this.getYMD(new Date() - 1000 * 60 * 60 * 24);
      } else {
        this.timeStart = this.getYMD(new Date() - 1000 * 60 * 60 * 24 * 6);
        this.timeEnd = this.getYMD(new Date() - 0 + 1000 * 60 * 60 * 24);
      }
      this.getBetRecords();
    },
    hanlderList(name) {
      // this.gameDetail = this.gameData[i];
      this.gameData.forEach(v => {
        if (v.type == name) {
          this.gameDetail = v;
        }
      });
      this.i = 1;
      this.platform = "";
      // this.platform = this.gameDetail.list[0].platform;

      switch (name) {
        case "GAME":
          this.statusShow = false;
          this.lotterShow = true;
          this.columns1 = bet.Live;
          this.gameName = "";
          this.i = 1;
          break;
        case "SPORT":
          this.statusShow = true;
          this.lotterShow = true;
          this.gameName = "";
          this.statusList = ["未结算", "已结算", "无效"];
          this.status = "";
          this.columns1 = bet.sport;
          this.i = 1;
          break;
        case "LIVE":
          this.statusShow = false;
          this.gameName = "";
          this.lotterShow = true;
          this.columns1 = bet.Live;
          this.i = 1;
          break;
        case "VR_LOTTERY":
          this.statusShow = true;
          this.gameName = "";
          this.columns1 = bet.Lottery;
          this.status = "";
          this.statusList = ["未结算", "赢", "输", "和", "取消"];
          this.i = 1;
          break;
        case "CT_LOTTERY":
          this.statusShow = true;
          this.lotterShow = false;
          this.gameName = this.gameDetail.list[0].gameName;
          this.statusList = ["未结算", "赢", "输", "和", "取消", "撤消"];
          this.i = 1;
          this.status = "";
          this.columns1 = bet.Lottery;
          break;
        case "CHESS":
          this.statusShow = false;
          // this.lotterShow = false;
          // this.gameName = this.gameDetail.list[0].gameName;
          // this.statusList = ["未结算", "赢", "输", "和", "取消", "撤消"];
          this.i = 1;
          this.status = "";
          this.columns1 = bet.chess;
          break;
      }
      this.getBetRecords();
    },
    
    // 选择大类里的类型
    hanlderPlatform(val) {
      this.platform = val;
      this.i = 1;
      this.getBetRecords();
    },
    hanlderGameName(val) {
      this.gameName = val;
      this.getBetRecords();
    },

    // 选择状态
    hanlderStatus(i) {
      this.i = 1;
      this.status = i;
      this.getBetRecords();
    },

    // 选择时间
    hanlderDate(date) {
      this.timeStart = date[0];
      this.timeEnd = date[1];
      this.getBetRecords();
    },

    // 分页
    hanlderPage(value) {
      this.i = value;
      this.getBetRecords();
    },

    // 查询记录
    getBetRecords() {
      this.$store.commit("loading", true);

      let param = {};
      param.timeStart = this.timeStart;
      param.timeEnd = this.timeEnd;
      param.type = this.type;
      param.isTotal = 1;
      if (this.platform) {
        param.platform = this.platform;
      }

      if (this.status !== "") {
        param.status = this.status;
      }

      this.$http
        .post(`${this.$HOST_NAME}/games/getBetRecords?page=` + this.i, param)
        .then(res => {
          if (res.code == 200) {
            // this.getClassCount();
            this.data1 = res.data.data.list;
            this.total = res.data.total* 1;
            this.validBetAmount = res.data.data.total.validBetAmount;
            this.netAmount = res.data.data.total.netAmount;
            this.betCount = res.data.data.total.betCount;
            this.$store.commit("loading", false);
          } else {
            this.data1 = [];
            this.$store.commit("loading", false);
          }
        });
    },

    // 游戏下注统计
    getClassCount() {
      this.$http
        .post(`${this.$HOST_NAME}/games/getClassCount`, {
          timeStart: this.timeStart,
          timeEnd: this.timeEnd
        })
        .then(res => {
          if (res.code == 200) {
            this.validBetAmount = "";
            this.netAmount = "";
            this.betCount = "";
            res.data.forEach(v => {
              if (v.type == this.type) {
                this.validBetAmount = v.validBetAmount;
                this.netAmount = v.netAmount;
                this.betCount = v.betCount;
              }
            });
            this.$store.commit("loading", false);
          }
        });
    }
  },
  created() {
    this.$nextTick(() => {
      let gameList = JSON.parse(localStorage.getItem("gameList"));

      gameList.forEach((item, v) => {
        item.list.unshift({
          id: 999,
          name: "全部",
          platform: "",
          status: "yes"
        });
      });
      // gameList.unshift({
      //   list:[],
      //   name:"全部",
      //   type:""
      // });
      this.gameData = gameList;
      this.gameDetail = gameList[0];
      this.type = gameList[0].type;

      this.getBetRecords();
    });
  },
  beforeDestroy() {
    this.$store.commit("loading", false);
  }
};
</script>

<style lang="less" scoped>
.bet {
  // padding: 0 16px;
  // .header {
  //   height: 66px;
  //   border-bottom: 1px solid #f3f3f3;
  //   padding-left: 8px;
  //   font-size: 18px;
  //   color: #696969;
  //   line-height: 85px;
  //    padding: 0 16px;
  // }
  /deep/.ivu-poptip-body {
    padding: 0;
  }
  .content {
    .search {
      height: 64px;
      line-height: 64px;
      padding: 0 16px;
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
        // margin-left: 18px;
        letter-spacing: 5px;
        cursor: pointer;
      }
      .text {
        margin-left: 10px;
        font-size: 14px;
      }
      .ivu-select {
        width: 126px;
      }
      .platform-select {
        // margin-left: 10px;
        margin-right: 5px;
       /deep/ .ivu-select-dropdown-list {
          max-height: 520px;
        }
      }
    }
    .totalBet {
      position: absolute;
      bottom: 25px;
      left: 260px;
      font-size: 16px;
    }
    .page {
      position: absolute;
      right: 25px;
      bottom: 20px;
      /deep/ .ivu-page.mini .ivu-page-total{
        vertical-align: middle;
      }
    }
  }
}
</style>
