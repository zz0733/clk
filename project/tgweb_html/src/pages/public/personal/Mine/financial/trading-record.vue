<template>
  <div class="trading-record">
    <vp-pub-header title="记录查询"></vp-pub-header>
    <div class="record-list">
      <van-tabs>
        <van-tab v-for="(item,i) in recordList" :class="{active:active===i}" :key="i">
          <div slot="title" class="tab-title" @click="toggle(i)">
            <img :src="item.img" alt="">
            <span class="elseSpan">{{item.text}}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div ref="record-content" class="record-content">
      <div class="header">
        <ul>
          <li v-for="(item,i) in date" :key="i" @click="toggleDate(i)" :class="{dateActive:dateActive==i}">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="record-scroll">
        <cube-scroll ref="scroll" :options="options" @pulling-down="onPullingDown">
          <div id="dataList" v-if="renderData.length">
            <div v-if="type != 'other'" class="totleMoney">
              <span>{{totalText}}：</span>
              <span>￥{{totalMoney}}</span>
            </div>
            <div v-else class="totleMoney">
              <span>总存：</span>
              <span>￥{{totalMoney.deposit_amount}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>总取：</span>
              <span>￥{{totalMoney.withdrawals_amount}}</span>
            </div>
            <div class="row" v-for="(item,i) in renderData" :key="i">
              <div class="row-header">
                <span class="fl">{{title}}</span>
                <span v-if="item.status=='处理中'&& type=='withdrawals'||type=='deposit'" class="ifSpan"
                      @click="cuizhang(item.id,item.time)">催账</span>
              </div>
              <div class="row-content">
                <div>
                  <span>{{item.code||item.title||item.subType||item.type}}</span>
                  <span>{{item.amount||item.bouns}}</span>
                </div>
                <div>
                  <span>{{item.time}}</span>
                  <span v-if="type=='withdrawals'||type=='deposit'" @click="showToast(item.remark)">
                    <label :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'contain'}"></label>
                    {{item.status=='失败'?'失败详情':item.status}}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align:center;padding-top:1rem;" v-if="noData">
            <img style="width:60%;" src="../../../../../assets/img/public/image/common/personal/userInfo/no-data.png"
                 alt="">
          </div>
          <div class="scrollStable"></div>
        </cube-scroll>
      </div>

    </div>
  </div>
</template>

<script>
  import vpPubHeader from '@/pages/public/common/Header'
  import withdrawalPic from '@assets/img/public/image/common/personal/userInfo/record-withdraw@3x.png'
  import depositPic from '@assets/img/public/image/common/personal/userInfo/record-Recharge@3x.png'
  import preferentialPic from '@assets/img/public/image/common/personal/userInfo/record-youhui@3x.png'
  import agencyPic from '@assets/img/public/image/common/personal/userInfo/record-agency@3x.png'
  import otherPic from '@assets/img/public/image/common/personal/userInfo/record-other@3x.png'

  export default {
    components: {
      vpPubHeader
    },
    data () {
      return {
        recordList: [{
          text: '提现记录',
          img: withdrawalPic
        },
          {
            text: '充值记录',
            img: depositPic
          },
          {
            text: '优惠记录',
            img: preferentialPic
          },
          {
            text: '代理记录',
            img: agencyPic
          },
          {
            text: '其他记录',
            img: otherPic
          }
        ],
        active: 0,
        date: ['今日', '昨日', '七日'],
        dateActive: 0,
        renderData: [],
        url: `${this.$HOST_NAME}/withdrawals/index`,
        type: 'withdrawals',
        loadingShow: false,
        financeData: {},
        totalText: '总提现',
        totalMoney: '',
        title: '提款',
        params: {
          timeStart: this.getToday(new Date()) + ' 00:00:00',
          timeEnd: this.getTime(new Date()),
          limit: 100,
          page: 1
        },
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: true,
          pullDownRefresh: {
            txt: '更新成功'
          }
        },
        stopPullDown: false,
        noData: true
      }
    },
    methods: {
      showToast (txt) {
        if (txt) {
          this.$newToast(txt)
        }
      },
      toggleDate (i) {
        this.dateActive = i
        switch (i) {
          case 0:
            this.params.timeStart = this.getToday(new Date()) + ' 00:00:00'
            this.params.timeEnd = this.getTime(new Date())
            break
          case 1:
            this.params.timeStart =
              this.getToday(new Date() - 1000 * 60 * 60 * 24) + ' 00:00:00'
            this.params.timeEnd =
              this.getToday(new Date() - 1000 * 60 * 60 * 24) + ' 23:59:59 '
            break
          case 2:
            this.params.timeStart =
              this.getToday(new Date() - 1000 * 60 * 60 * 24 * 6) + ' 00:00:00'
            this.params.timeEnd = this.getTime(new Date())
            break
          default:
            break
        }
        this.params.page = 1
        this.stopPullDown = false
        this.fetchRecord()
      },
      transform (obj) {
        const {
          url,
          type,
          totalText,
          title,
        } = obj
        this.url = url
        this.type = type
        this.totalText = totalText
        this.title = title
      },
      toggle (i = 0) {
        this.active = i
        this.renderData = []
        switch (i) {
          case 0:
            this.transform({
              url: `${this.$HOST_NAME}/withdrawals/index`,
              type: 'withdrawals',
              totalText: '总提款',
              title: '提款',
            })
            break
          case 1:
            this.transform({
              url: `${this.$HOST_NAME}/deposit/index`,
              type: 'deposit',
              totalText: '总存款',
              title: '存款',
            })
            break
          case 2:
            this.transform({
              url: `${this.$HOST_NAME}/preferential/receive`,
              type: 'preferential',
              totalText: '总优惠',
              title: '优惠',
            })
            break
          case 3:
            this.transform({
              url: `${this.$HOST_NAME}/Agency/record`,
              type: 'agency',
              totalText: '总收入',
              title: '收入',
            })
            break
          case 4:
            this.transform({
              url: `${this.$HOST_NAME}/member/record/other`,
              type: 'other',
              totalText: '合计',
              title: '加款/减款',
            })
            break
          default:
            break
        }
        this.reset()
        this.stopPullDown = false
        this.fetchRecord()
      },
      onPullingDown () {
        if (!this.stopPullDown) {
          this.params.page++
          this.fetchRecord('pullDown')
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      reset () {
        this.params.timeStart = this.getToday(new Date()) + ' 00:00:00'
        this.params.timeEnd = this.getTime(new Date())
        this.params.page = 1
        this.dateActive = 0
      },
      fetchRecord (pullDown) {
        // this.$loading(true);
        this.$http
          .post(`${this.url}?page=${this.params.page}`, this.params)
          .then(res => {
            // this.$loading(false);
            if (res.code == 200) {
              if (res.data.data.list.length) {
                this.noData = false
                // if (this.type == "agency" || this.type == "other") {
                //   this.totalMoney = 0;
                // }
                res.data.data.list.forEach(v => {
                  if (v.status == 'fail') {
                    v.status = '失败'
                    v.imgUrl = require('@assets/img/public/image/common/personal/userInfo/status-false.png')
                  } else if (v.status == 'success') {
                    v.status = '成功'
                    v.imgUrl = require('@assets/img/public/image/common/personal/userInfo/status-success.png')
                  } else {
                    v.status = '处理中'
                    v.imgUrl = require('@assets/img/public/image/common/personal/userInfo/status-wait.png')
                  }
                  let timeTemp = v.time ? v.time : v.created_at
                  v.time = this.$moment
                    .unix(timeTemp - 0)
                    .format('YYYY-MM-DD HH:mm:ss')
                  this.totalMoney = res.data.data.amount
                })
              } else {
                this.noData = true
              }
              let temp = this.renderData
              if (pullDown && res.data.data.list.length <= 0) {
                //下拉的时候暂存一下数据，否则无数据页面会空白
                this.$newToast('暂无更多记录！')
                this.stopPullDown = true
                this.renderData = temp
                this.noData = false
              } else {
                this.renderData = res.data.data.list

              }
              this.$refs.scroll.refresh()
              this.$refs.scroll.forceUpdate()
            }
          })
      },
      cuizhang (id, time) {
        this.$http
          .post(`${this.$HOST_NAME}/emergency/application`, {
            financeId: id,
            type: this.type,
            date: time
          })
          .then(res => {
            if (res.code == 200) {
              this.$toast.success(res.data)
            } else {}
          })
      }
    },
    created () {
      this.fetchRecord()
      this.$nextTick(() => {
        let fontSize = +document.querySelector('html').style.fontSize.split('px')[0] / 100
        let clientHeight = window.innerHeight
        //加5防止意外
        let contH = clientHeight - (188 + 88) * fontSize
        // console.log(contH)
        this.$refs['record-content'].style.height = contH + 'px'
      })
    },
    destroyed () {
      this.$loading(false)
    },
    watch: {
      // renderData(newV, old) {
      //   // newV.length > 0 this.noData = false: this.noData = true
      //   if (newV.length >= 0) {
      //     this.noData = false
      //   } else {
      //     this.noData = true
      //   }
      // }
    }
  }
</script>

<style lang="less" scoped>
  .trading-record {
    height: 92%;
    position: relative;
    .record-list {
      height: 1.88rem;
      background: #fff;
      padding: 0.18rem 0.2rem;
      /deep/ .van-tabs__line {
        background-color: transparent;
      }
      /deep/ .van-tabs__nav--line {
        padding-bottom: 0px;
      }
      /deep/ .van-hairline--top-bottom::after {
        border-width: 0;
      }
      /deep/ .van-tabs--line .van-tabs__wrap {
        height: 1.7rem;
        .van-tab {
          border: none;
          background: transparent;
          flex: 0 0 20%;
          padding: 0;
          line-height: inherit;
          .tab-title {
            border: 0.02rem solid #dbdbdb;
            display: flex;
            flex: 0 0 18%;
            flex-direction: column;
            align-items: center;
            margin: 0 0.1rem;
            border-radius: 0.1rem;
            padding: 0.16rem 0;
            img {
              width: 0.7rem;
            }
            span {
              margin-top: 0.16rem;
              font-size: 0.22rem;
              color: #666;
            }
          }
        }
        .van-tab--active {
          .tab-title {
            border: 0.02rem solid #ff8500;
            position: relative;
            span {
              color: #ff8500;
            }
          }
        }
      }
    }
    .scrollStable {
      height: 1.1rem;
    }
    .record-content {
      background: #f1f1f145;
      position: relative;
      .header {
        height: 0.82rem;
        margin-bottom: 0.18rem;
        border-bottom: 0.02rem solid #dbdbdb;
        ul {
          li {
            float: left;
            width: 33.33%;
            text-align: center;
            height: 0.82rem;
            padding: 0 0.2rem;
            // padding-top: 0.08rem;
            line-height: 0.82rem;
            span {
              display: inline-block;
              width: 100%;
              height: 100%;
              font-size: 0.32rem;
            }
          }
          .dateActive {
            span {
              color: #f60;
              position: relative;
            }
            span::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 0.04rem;
              background: #f60;
              left: 0;
              bottom: 0.02rem;
            }
          }
        }
      }
      .record-scroll {
        position: absolute;
        top: .82rem;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
      }
      .totleMoney {
        height: 0.88rem;
        padding-left: 0.3rem;
        line-height: 0.88rem;
        span:nth-child(odd) {
          font-size: 0.3rem;
          color: #666;
        }
        span:nth-child(even) {
          font-size: 0.3rem;
          color: #f60;
        }
      }
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
              }
            }
          }
        }
      }
    }
  }
</style>
