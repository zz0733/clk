import vpActivity from '@/pages/public/tradition/components/activity/activity'
import vpTimer from '@/pages/public/tradition/components/timer/timer'
import vpNavigation from '@/pages/public/tradition/components/navigation/navigation'
import vpLotteryLogo from '@/pages/public/tradition/components/lottery-logo/lottery-logo'
import vpPrizeHeader from '@/pages/public/tradition/components/prize-header/prize-header'

import vpLotteryAnimate from '@/pages/public/tradition/animate'

import UserService from '@/service/public/UserService.js'
import store from '@/vuex/store'

const mixin = {
  data: function () {
    return {
      isLoading: false,
      ifshowLottery: false,
      LotteryAnimateStaue: false,
      isopen: true,
      destroyedStaue: true,
      activityText: '★元宵节大礼★“十五团团吃汤圆，元宵圆圆像银元”元宵节大礼包已陆续派送，请留意账户余额变化',
      oddsListPar: {},
      timer: {
        timerModel: '',
        timeLeave: '',
        djs_next_kaipan: ''
      },
      openDatas: {},
      lastIssue: '',
      ifAnimateBt: true,
      ifAnimate: true,
      trueAward: [],
      savelotteryIndex: [],
      trendDatas: {},
      animateInter: null

    }
  },
  methods: {
    LotteryAnimateFc (bool) {
      this.LotteryAnimateStaue = bool
    },
    // 玩法选择（快速玩法）
    playsChoose (datas) {
      this.childNeedMess.plays = datas
    },
    // 配置参数
    param () {
      let param = this.$store.state.lottery.childNeedMess
      this.childNeedMess.code = param.code
      this.childNeedMess.id = param.id
      this.childNeedMess.series = param.series
      this.childNeedMess.title = param.title
    },
    // 时间到子组件触发
    timeout (datas) {
      this.getOpenDatas()
    },
    // 获取统计记录
    async getTrend () {
      let idArr = this.$route.fullPath.split('/')
      let lotteryId = idArr.filter(item => Number.isInteger(item * 1) && item !== '')[0] * 1
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/results`, {
        lotteryId: lotteryId,
        // lottery:this.$route.meta.code,
        // type:this.$route.meta.series
      })
      if (res && res.code === 200) {
        if (this.$route.meta.series === 'lhc') {
          return false
        }
        this.trendDatas = res
        this.tsferTrend()
      } else {
        // console.log('获取走势历史记录出错')
      }
    },
    //传递统计记录
    tsferTrend (type) {
      const task = function (that) {
        that.$refs.content.$refs.vpRanking.getTrend(that.trendDatas.data[`${that.$route.meta.code}`]['double:'])
        that.$refs.content.$refs.vpHistory.getData(that.trendDatas.data[`${that.$route.meta.code}`]['list'])
      }

      const timer = function (that) {
        if (that.$refs && that.$refs.content && that.$refs.content.$refs && that.$refs.content.$refs) task(that)
        else setTimeout(timer, 500, that)
      }

      if (type) timer(this)
      else this.$nextTick(() => {timer(this)})
    },
    // 获取向下传赔率
    async getOdds () {
      let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getOdds/${this.$route.meta.id}`, {})
      if (res && res.code === 200) {
        this.oddsListPar = res.data
      } else {
        // console.log('获取赔率失败')
      }
    },
    //soket接收信息
    websoc (msg) {
      if (msg.type === 'user.lotteryOpen') {
        msg && msg.data.forEach((item, index) => {
          if (item.lotteryId === this.$route.meta.id) {
            // console.log(item.lastresultInfo)
            this.ifAnimateBt = true//正在开奖显示结束
            clearInterval(this.animateInter)
            this.trueAward = item.lastresultInfo ? item.lastresultInfo.split(',') : []
            this.trueAward.forEach((item, _v) => {
              this.lotteryDatasShow[_v] = +item
            })
            this.savelotteryIndex = item.lastluzhu ? item.lastluzhu.split(',') : []
            this.lastIssue = item.lastissue//替换显示期号
            this.$refs.timer.playMusicReset()//播放音乐
            this.getTrend()//获取走势数据
          }
        })
      }
    },
    lotteryAnimateStart () {
      clearInterval(this.animateInter)
      this.animateInter = setInterval(() => {
        let length = this.lotteryDatasSave.length
        while (length) {
          let j = Math.floor(Math.random() * length--);
          [this.lotteryDatasSave[j], this.lotteryDatasSave[length]] = [this.lotteryDatasSave[length], this.lotteryDatasSave[j]]
        }
        this.lotteryDatasShow = []
        for (let index = 0; index < this.lotteryDatasShowLength; index++) {
          this.lotteryDatasShow.push(this.lotteryDatasSave[index])
        }
        // console.log(this.lotteryDatasShow)
      }, 80)
    },
    // 获取要开奖的时间等信息
    async getOpenDatas () {
      let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getIssue/${this.$route.meta.id}`, {})
      if (res && res.code === 200) {
        this.$Loading.finish()
        this.isLoading = false
        this.openDatas = res.data
        // 下注期数传
        this.childNeedMess.issue = res.data.issue
        // 时间传
        this.timer.timeLeave = res.data.djs_fengpan
        this.timer.djs_next_kaipan = res.data.djs_next_kaipan
        this.timer.lotteryName = res.data.lotteryName
        // 向下传信息
        this.$nextTick(() => {
          this.$refs.timer.getTime(this.timer)
        })
        // 锁定封关盘
        if (this.ifAnimate) {
          this.trueAward = res.data.lastresultInfo ? res.data.lastresultInfo.split(',') : []
          this.savelotteryIndex = res.data.lastluzhu ? res.data.lastluzhu.split(',') : []
          //最后开奖期数
          this.lastIssue = res.data.lastissue
          this.trueAward.forEach((item, _v) => {
            this.lotteryDatasSave[_v] = +item
            this.lotteryDatasShow[_v] = +item
          })
          if (
            this.childNeedMess.series === 'pcdd' ||
            this.childNeedMess.series === 'k3'
          ) {
            this.lastBallTotal = this.savelotteryIndex[0]
          }
        }
        if (res.data.djs_next_kaipan) {
          // 是否显示开奖动画
          this.ifAnimateBt = false
          this.lotteryAnimateStart()

          this.isopen = false
          if (this.fengpanStaue) {
            this.$store.commit('alert/showTipModel', {bool: true, title: '已封盘，请等待下一期开盘', model: 'warn'})
          }
          // 只封一次
          this.fengpanStaue = false
        } else {
          this.isopen = true
        }
        this.ifshowLottery = true
        this.ifAnimate = false

      } else {
        this.dNotify(res.message, 'error')
      }
    }
  },
  created: function () {
    if (this.sideReady) {
      this.param()
      this.getOpenDatas()
      this.getOdds()
      this.getTrend()
      if (this.getAnimal) this.getAnimal()
    }
    this.$Loading.start()
    UserService.vpGetBasWebsoc.call(this)
  },
  computed: {
    sideReady () {
      return this.$store.state.lottery.sideReady
    }
  },
  beforeDestroy () {
    this.destroyedStaue = false
    clearInterval(this.animateInter)
  },
  watch: {
    sideReady () {
      this.param()
      this.getOpenDatas()
      this.getOdds()
      this.getTrend()
      if (this.getAnimal) this.getAnimal()
    }
  },
  components: {
    vpActivity,
    vpTimer,
    vpNavigation,
    vpLotteryLogo,
    vpPrizeHeader,
    vpLotteryAnimate
  },
  store
}

export default mixin


