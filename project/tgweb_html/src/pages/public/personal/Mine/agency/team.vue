<template>
  <div class="team">
    <div class="searchTime">
      <p>
        <span @click="frontFc()">{{getToday(st)}}&nbsp;</span> -
        <span @click="lastFc()">&nbsp;{{getToday(et)}}</span>
      </p>
      <!-- <p>

                       筛选

                     </p>

                        <i class="cube-select-icon" @click="timeShow =true"></i> -->

    </div>

    <div class="title">
      <ul>
        <li v-for="(item,i) in agencyData" :key="i" :class="{agencyActive:agencyActive ==i}" @click="toggle(i)">
          <span>
            <img :src="item|capitalize" alt="">
            <label>{{item.name}}</label>
          </span>
        </li>
      </ul>
    </div>


    <div class="content" :style="{height:teamData.length ==0?'0':'72%'}">
      <div class="header">
        <span>用户</span>
        <span>余额</span>
        <span>状态</span>
        <span>操作</span>
      </div>

      <div id="mescroll" class="mescroll">
        <div id="dataList">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item :name="i+1" v-for="(item,i) in teamData" :key="i">
              <div slot="title">
                <span>{{item.userName}}</span>
                <span>{{item.balance.toFixed(2)}}</span>
                <span>{{item.status=='yes'?'启用':'禁用'}}</span>
              </div>
              <span @click="teamReport(item)">
                <label></label>报表</span>
              <span @click="teamRefund(item.userName,item.platform)">
                <label></label>修改</span>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>


      <div v-if="teamData.length ==0" style='margin:100px 0;text-align: center;'><img
        src='../../../../../assets/img/public/image/common/personal/userInfo/no-data.png'
        width="60%" alt=''></div>

    </div>


    <div class="team-repotr" v-if="teamReportShow">
      <div class="team-header">
        <span class="fl mh5-back" @click="teamReportShow =false"></span> 代理报表
      </div>
      <div class="team-title">
        <p>
          {{timeStart}}&nbsp; - &nbsp;{{timeEnd}}
        </p>
        <p>
          筛选
        </p>
        <i class="cubeic-select" @click="timeShow =true"></i>
        <!-- <i  v-else class="van-icon  van-cell__right-icon"></i> -->
      </div>


      <div class="team-content">

        <div class="row">

          <label>盈利总和:</label>

          <span>{{reportData.winlossmoney}}</span>

        </div>

        <div class="row">

          <label>有效投注:</label>

          <span>{{reportData.betmoney}}</span>

        </div>

        <div class="row">

          <label>提现总和:</label>

          <span>{{reportData.Withdrawals}}</span>

        </div>

        <div class="row">

          <label>派彩总和:</label>

          <span>{{reportData.winmoney}}</span>

        </div>

        <div class="row">

          <label>充值总和:</label>

          <span>{{reportData.Deposit}}</span>

        </div>

      </div>

    </div>


    <van-datetime-picker :max-date='new Date()' class="time-picker" v-model="currentDate" type="date"
                         v-if="teamTimeShow"
                         @cancel="hanldCalDate" @confirm="hanlderTeamTime"/>


    <team-refund v-if="teamRefundShow" :refundData="refundData" @teamRefundHide="teamRefundShow = false"></team-refund>

  </div>
</template>

<script>
  import store from '@/vuex/store'
  import teamRefund from './teamRefund'
  import '../../../../../assets/img/public/js/personal/mescroll-master/mescroll.m'

  export default {
    data () {
      return {
        agencyData: [{
          name: '玩家账户',
          img: require('../../../../../assets/img/public/image/common/personal/angencyImg/wanjia.png'),
          hover: require('../../../../../assets/img/public/image/common/personal/angencyImg/wanjia-xuanzhong.png'),
          active: true
        },
          {
            name: '代理账户',
            img: require('../../../../../assets/img/public/image/common/personal/angencyImg/daili.png'),
            hover: require('../../../../../assets/img/public/image/common/personal/angencyImg/daili-xuanzhong.png'),
            active: false
          }
        ],
        teamData: [],
        type: 'member',
        timeStart: this.getToday(new Date() - 1000 * 60 * 60 * 24 * 6 * 30),
        timeEnd: this.getToday(new Date()),
        st: new Date(new Date() - 1000 * 60 * 60 * 24 * 6 * 30),
        et: new Date(),
        etStar: '1',
        currentDate: new Date(),
        // minDate: new Date(),
        columns: ['今天', '昨天', '最近七天'],
        timeShow: false,
        agencyActive: 0,
        activeName: ['1'],
        orderHis: [],
        teamTimeShow: false,
        teamRefundShow: false,
        mescroll: null,
        reportData: {
          winlossmoney: 0,
          betmoney: 0,

          Withdrawals: 0,

          winmoney: 0,

          Deposit: 0

        },

        teamReportShow: false,

        param: {},

        url: '',

        refundData: {}

      }

    },

    methods: {

      frontFc () {

        this.teamTimeShow = true

        this.etStar = '1'

        this.currentDate = this.st

      },

      lastFc () {

        this.teamTimeShow = true

        this.etStar = '2'

        this.currentDate = this.et

      },

      hanldCalDate () {

        this.teamTimeShow = false

      },

      toggle (i) {

        this.agencyActive = i

        if (i == 1) {

          this.type = 'agency'

        } else {

          this.type = 'member'

        }

        this.agencyData.forEach((v, num) => {

          if (i == num) {

            v.active = true

          } else {

            v.active = false

          }

        })

        // this.$loading(true);

        this.mescroll.destroy()

        this.newScroll()

      },

      teamRefund (name, platform) {

        this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {

          this.refundData.name = name

          this.refundData.userPlatform = res.data.platform

          this.teamRefundShow = true

        })

        // console.log(this.refundData)

      },

      upCallback (page) {

        this.getListDataFromNet(
          page.num,

          curPageData => {

            if (page.num == 1) this.teamData = []

            //更新列表数据

            this.$loading(false)

            this.teamData = this.teamData.concat(curPageData.data)

            this.mescroll.endByPage(
              curPageData.data ? curPageData.data.length : 0,

              curPageData.per_page
            )

          },

          () => {

            this.mescroll.endErr()

          }
        )

      },

      getListDataFromNet (pageNum, successCallback, errorCallback) {

        setTimeout(() => {

          this.$http

            .post(`${this.$HOST_NAME}/Agency/getTeamList?page=${pageNum}`, {

              aid: this.$store.state.mainState.userinfo.agencyInfo.uid,

              timeStart: this.getToday(this.st),

              timeEnd: this.getToday(this.et),

              type: this.type,

            })

            .then(
              res => {

                // console.log(res)

                this.refundData.alias = res.data.alias

                this.refundData.platform = res.data.platform

                if (res.data.list.data) {

                  this.orderHis = res.data.list

                  successCallback && successCallback(this.orderHis)

                } else {

                  this.mescroll.endErr()

                }

              },

              err => {}
            )

        }, 500)

      },

      newScroll () {

        this.mescroll = new MeScroll('mescroll', {

          up: {

            callback: this.upCallback,

            isBounce: false,

            toTop: {

              offset: 1000

            }

          }

        })

      },

      // 选择时间

      hanlderTime (val) {

        if (val == '今天') {

          this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24)

          this.timeEnd = this.getToday(new Date())

        } else if (val == '昨天') {

          this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 2)

          this.timeEnd = this.getToday(new Date() - 1000 * 60 * 60 * 24)

        } else {

          this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7)

          this.timeEnd = this.getToday(new Date())

        }

        this.timeShow = false

        // this.mescroll.destroy();

        // this.newScroll();

        this.getTeamReport()

      },

      hanlderTeamTime (val) {

        if (this.etStar == '1') {

          this.st = val

        } else {

          this.et = val

        }

        // this.et = this.getToday(val);

        // this.st = this.getToday(val - 1000 * 60 * 60 * 24 * 7);

        this.teamTimeShow = false

        this.mescroll.destroy()

        this.newScroll()

      },

      getTeamReport () {

        this.$http.post(this.url, this.param).then(res => {

          if (res.code == 200) {

            this.reportData = res.data

          }

        })

      },

      //  报表

      teamReport (item) {

        if (this.type == 'member') {

          this.param.uid = item.uid

          this.url = `${this.$HOST_NAME}/Agency/userReport`

        } else {

          this.param.uname = item.userName

          this.url = `${this.$HOST_NAME}/Agency/teamReport`

        }

        this.param.st = this.timeStart

        this.param.et = this.timeEnd

        this.getTeamReport()

        this.teamReportShow = true

      }

    },

    created () {

      this.$loading(true)

    },

    mounted () {

      this.newScroll()

    },

    store,

    filters: {

      capitalize: function (item) {

        if (item.active) {

          return item.hover

        } else {

          return item.img

        }

      }

    },

    components: {

      teamRefund

    }

  }
</script>

<style lang="less">
  @import "../../../../../assets/img/public/js/personal/mescroll-master/mescroll.min.css";

  .team {

    height: 100%;

    background: #fff;

    .searchTime {

      height: 0.6rem;

      background: #f9f9f9;

      line-height: 0.6rem;

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

        font-size: 0.26rem;

        color: #666;

      }

      .cube-select-icon {

        position: absolute;

        right: 0.26rem;

        top: 0.32rem;

        border-width: 0.16rem 0.08rem 0 0.08rem;

      }

    }

    .title {

      height: 0.86rem;

      margin-bottom: 0.86rem;

      background: #fff;

      // border-bottom: .02rem solid #dbdbdb;

      // margin:  0 auto;

      padding: 0 1rem;

      text-align: center;

      margin-bottom: 0.1rem;

      ul {

        li {

          float: left;

          // width: 33.33%;

          width: 50%;

          text-align: center;

          height: 0.86rem;

          // padding: 0 .7rem;

          // margin: 0 1rem;

          line-height: 0.86rem;

          // padding-top: 0.08rem;

          label {

            display: inline-block;

            // width: 100%;

            // height: 100%;

            font-size: 0.32rem;

            vertical-align: middle;

          }

          img {

            width: 0.4rem;

            height: 0.32rem;

            display: inline-block;

            vertical-align: middle;

          }

        }

        .agencyActive {

          span {

            color: #f60;

            position: relative;

            display: inline-block;

          }

          span::after {

            content: "";

            position: absolute;

            width: 100%;

            height: 0.02rem;

            background: #f60;

            left: 0;

            bottom: 0.02rem;

          }

        }

      }

    }

    .content {

      height: 72%;

      .header {

        height: 0.8rem;

        line-height: 0.8rem;

        background: #f5f5f5;

        display: flex;

        span {

          flex: 1;

          font-size: 0.3rem;

          color: #333;

          text-align: right;

          padding-right: 0.36rem;

        }

      }

      .van-cell {

        padding: 0.2rem 0;

        padding-right: 1.48rem;

        line-height: 0.48rem;

        background: #fff;

        color: #333;

        font-size: 0.28rem;

        border-bottom: 1px solid #dbdbdb8f;

        .van-cell__value--alone {

          width: 80%;

          div {

            display: flex;

            span {

              flex: 1;

              text-align: center;

            }

          }

        }

      }

      .van-cell__right-icon {

        color: #999;

        font-size: 0.24rem;

        position: absolute;

        top: 0.38rem;

        right: 0.6rem;

        line-height: 0;

      }

      .van-collapse-item__content {

        padding: 0;

        height: 0.9rem;

        line-height: 0.9rem;

        background: #f9f9f9;

        text-align: center;

        span {

          display: inline-block;

          height: 0.46rem;

          width: 1.1rem;

          line-height: 0.46rem;

          text-align: center;

          border: 1px solid #dbdbdb;

          border-radius: 0.05rem;

          font-size: 0.26rem;

          margin-right: 0.46rem;

          label {

            width: 0.28rem;

            height: 0.24rem;

            display: inline-block;

            background: url("../../../../../assets/img/public/image/common/personal/angencyImg/下级拷贝.png") no-repeat;

            background-size: cover;

            vertical-align: middle;

            margin-right: 0.1rem;

          }

        }

        span:nth-child(2) {

          label {

            background: url("../../../../../assets/img/public/image/common/personal/angencyImg/修改(1)拷贝.png") no-repeat;

            background-size: cover;

          }

        }

      }

    }

    .time-picker {

      position: fixed;

      bottom: 0;

      left: 0;

      width: 100%;

    }

    .team-repotr {

      height: 100%;

      width: 100%;

      position: absolute;

      top: 0;

      left: 0;

      // z-index: 9;

      background: #f5f5f5;

      // background: #000;

      // padding-top: 1.08rem;

      .team-header {

        height: 0.88rem;

        width: 100%;

        background: linear-gradient(90deg, #ff5100, #ff8e00);

        line-height: 0.88rem;

        text-align: center;

        color: #fff;

        font-size: 0.36rem;

        padding: 0 0.18rem;

        // position: absolute;

        // top: 0;

        // left: 0;

        z-index: 1002;

        span {

          // font-size: 0.46rem;

        }

      }

      .team-title {

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

        i {

          position: absolute;

          right: 0.26rem;

          top: 0.02rem;

          // border-width: 0.16rem 0.08rem 0 0.08rem;

        }

      }

      .team-content {

        .row {

          height: 1.1rem;

          background: #fff;

          border-bottom: 1px solid #f5f5f5;

          line-height: 1.1rem;

          label {

            width: 1.4rem;

            display: inline-block;

            text-align: right;

            font-size: 0.28rem;

            // color: #666;

          }

          span {

            font-size: 0.28rem;

            color: #666;

          }

        }

      }

    }

  }

  [class*="van-hairline"]::after {

    border: none;

  }
</style>
