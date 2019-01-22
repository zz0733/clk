<template>
<div class="finance">
  <div class="header">
    <p>
      {{timeStart}}&nbsp; - &nbsp;{{timeEnd}}
    </p>

    <p @click="timeShow =true">
      筛选
    </p>
    <i class="cubeic-select" @click="timeShow =true"></i>
  </div>

  <div class="content">
    <div class="content-header">
      <ul>
        <li>账户</li>
        <li>存款</li>
        <li>取款</li>
        <li>利润</li>
        <li>优惠</li>
      </ul>
    </div>

    <div id="mescroll" class="mescroll">
      <div id="dataList">
        <div class="content-row" v-for="(item,i) in teamData" :key="i">
          <ul>
            <li>{{item.username}}</li>
            <li>{{item.Deposit}}</li>
            <li>{{item.Withdrawals}}</li>
            <li>{{item.winlossmoney}}</li>
            <li>{{item.preferential}}</li>

          </ul>
        </div>
      </div>
    </div>

    <div v-if="!teamData.length" style='margin:100px 0;text-align: center;'><img src='../../../../../assets/img/public/image/common/personal/userInfo/no-data.png' alt='' width="60%"></div>
  </div>


  <van-picker v-if="timeShow" class="time-picker" @cancel="timeShow =false" @confirm="hanlderTime" show-toolbar title="标题" :columns="columns" />

</div>
</template>

<script>
import "../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m";
import store from "@/vuex/store";
export default {
  data() {
    return {
      timeStart: this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7),
      timeEnd: this.getToday(new Date()),
      columns: ["今天", "昨天", "最近七天"],
      timeShow: false,
      mescroll: null,
      teamData: [],
      orderHis: []
    };
  },
  methods: {
    hanlderTime(val) {
      if (val == "今天") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24);
        this.timeEnd = this.getToday(new Date());
      } else if (val == "昨天") {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 2);
        this.timeEnd = this.getToday(new Date() - 1000 * 60 * 60 * 24);
      } else {
        this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7);
        this.timeEnd = this.getToday(new Date());
      }

      this.newScroll();
      this.timeShow = false;
    },
    // teamQuery() {
    //   this.$loading(true);
    //   this.$http
    //     .post(`${this.$HOST_NAME}/Agency/teamQuery`, {
    //       st: this.timeStart,
    //       et: this.timeEnd,
    //       uname: this.$store.state.mainState.userinfo.userName
    //     })
    //     .then(res => {
    //       if (res.code == 200) {
    //         this.teamData = res.data.data;
    //         this.$loading(false);
    //       }
    //     });
    // },
    newScroll() {
      this.mescroll = new MeScroll("mescroll", {
        up: {
          callback: this.upCallback,
          isBounce: false,
          toTop: {
            offset: 1000
          }
        }
      });
    },
    upCallback(page) {
      this.getListDataFromNet(
        page.num,
        curPageData => {
          if (page.num == 1) this.teamData = [];

          //更新列表数据
          this.$loading(false);
          // console.log(curPageData)
          this.teamData = this.teamData.concat(curPageData.data);
          this.mescroll.endByPage(
            curPageData.data ? curPageData.data.length : 0,
            curPageData.per_page
          );
        },
        () => {
          this.mescroll.endErr();
        }
      );
    },
    getListDataFromNet(pageNum, successCallback, errorCallback) {
      setTimeout(() => {
        this.$http
          .post(`${this.$HOST_NAME}/Agency/teamQuery?page=${pageNum}`, {
            st: this.timeStart,
            et: this.timeEnd,
            uname: this.$store.state.mainState.userinfo.userName
          })
          .then(
            res => {
              // console.log(res)
              // this.refundData.alias = res.data.alias;
              // this.refundData.platform = res.data.platform;
              if (res && res.code == 200) {
                if (res.data.data) {
                  this.orderHis = res.data;
                  successCallback && successCallback(this.orderHis);
                } else {
                  this.mescroll.endErr();
                }
              } else {
                this.mescroll.endErr();
              }
            },
            err => {}
          );
      }, 500);
    },
  },
  created() {
    // this.$nextTick(() => {
    //   this.teamQuery();
    // })
  },
  mounted() {
    this.newScroll();
  },
  destroyed() {
    this.$loading(false);
  },
  store
};
</script>

<style lang="less">
@import "../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";
.finance {
  position: relative;
  height: 100%;
  .header {
    height: 0.9rem;
    background: #ffffff;
    line-height: 0.9rem;
    padding-left: 0.2rem;
    position: absolute;
    left: 0;
    width: 100%;
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
      top: 0;
      border-width: 0.16rem 0.08rem 0 0.08rem;
      font-size: .24rem;
    }
  }
  .content {
    padding-top: 0.9rem;
    height: 85%;
    .content-header {
      ul {
        height: 0.82rem;
        background: #f9f9f9;
        display: flex;
        li {
          flex: 1;
          line-height: 0.82rem;
          text-align: center;
          font-size: 0.3rem;
          color: #333;
        }
      }
    }
    .content-row {
      border-bottom: 1px solid #dbdbdb;
      ul {
        height: 0.82rem;
        background: #fff;
        display: flex;
        li {
          flex: 1;
          line-height: 0.82rem;
          text-align: center;
          font-size: 0.3rem;
          color: #999;
        }
      }
    }
    .content-row:last-child {
      border-bottom: none;
    }
  }
  .time-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
