<template>
  <div class="time-lottery-wrap">
    <div v-if="timer.timerModel!='days'" class="lottery-timer-center">
      <span v-if="!this.timer.djs_next_kaipan"></span>
      <span class="tip" v-if="this.timer.djs_next_kaipan"></span>
      <span class="timer" v-show="timer.timeLeave>=3600">{{hoursDatas.hou>9?hoursDatas.hou:'0'+hoursDatas.hou}}</span>
      <span class="timer" v-show="timer.timeLeave>=3600">:</span>
      <span class="timer">{{hoursDatas.min>9?hoursDatas.min:'0'+hoursDatas.min}}</span>
      <span class="timer">:</span>
      <span class="timer">{{hoursDatas.sec>9?hoursDatas.sec:'0'+hoursDatas.sec}}</span>
    </div>
    <div v-if="timer.timerModel=='days'" class="lottery-timer-center">
      <span v-if="!this.timer.djs_next_kaipan"></span>
      <span class="tip" v-if="this.timer.djs_next_kaipan"></span>
      <span class="timer">{{daysDatas.day>9?daysDatas.day:'0'+daysDatas.day}}</span>
      <span class="timer doc active">天</span>
      <span class="timer">{{daysDatas.hou>9?daysDatas.hou:'0'+daysDatas.hou}}</span>
      <span class="timer doc active">时</span>
      <span class="timer">{{daysDatas.min>9?daysDatas.min:'0'+daysDatas.min}}</span>
      <span class="timer doc active">分</span>
    </div>
  </div>


</template>
<script>
  export default {
    props: {},
    data () {
      return {
        // 默认
        timer: {
          timerModel: 'hours',
          timeLeave: '',
          djs_next_kaipan: ''
        },
        hoursDatas: {
          hou: 0,
          min: 0,
          sec: 0
        },
        daysDatas: {
          day: 0,
          hou: 0,
          min: 0,
          sec: 0
        },
        btnTimer: null,
        ifPlayMusic: true
      }
    },
    methods: {
      getTime (timer) {
        // let timer={
        //   djs_next_kaipan:0,
        //   timeLeave:96400,
        //   timerModel:"hours"
        // }

        if (timer.djs_next_kaipan <= 0 && timer.timeLeave <= 0) {
          return false
        }
        this.timer = timer
        // 如果是按天倒计时（六合彩等）
        this.$nextTick(() => {
          if (this.timer.timeLeave >= 86400 && this.timer.djs_next_kaipan <= 0) {
            this.timer.timerModel = 'days'
            this.daysCalcu()
          } else {
            this.timer.timerModel = 'hours'
            this.hoursCalcu()
          }
        })

      },
      //大于1天的时间（每小时请求一次获取最新）
      daysCalcu () {
        if (this.timer.djs_next_kaipan <= 0) {
          let days = Math.floor(this.timer.timeLeave / (24 * 60 * 60))
          // 算算去了天数后还剩多少时间（s）
          let daysLeave = Math.floor(this.timer.timeLeave % (24 * 60 * 60))
          let hours = Math.floor(daysLeave / (60 * 60))
          // 算算去了小时后还剩多少时间(s)
          let hoursLeave = Math.floor(daysLeave % (60 * 60))
          let mins = Math.floor(hoursLeave / 60)
          // 算算去了分钟后还剩多少时间(s)
          let minsLeave = Math.floor(hoursLeave % 60)
          let sec = minsLeave
          this.daysDatas.day = days
          this.daysDatas.hou = hours
          this.daysDatas.min = mins
          this.daysDatas.sec = sec
          clearInterval(this.btnTimer)
          this.btnTimer = setInterval(() => {
            this.daysDatas.sec = this.daysDatas.sec - 1
            if (this.daysDatas.sec < 0 && this.daysDatas.min > 0) {
              this.daysDatas.min = this.daysDatas.min - 1
              this.daysDatas.sec = 59
            }
            if (this.daysDatas.sec < 0 && this.daysDatas.min < 1) {
              clearInterval(this.btnTimer)
              this.daysDatas.sec = 0
              this.$emit('child-say', true)
            }
          }, 1000)
        } else {
          this.timeStart(this.timer.djs_next_kaipan)
        }
      },
      //小于1天的时间，如果已经有下次开盘的倒计时传倒计时30秒
      hoursCalcu () {
        if (this.timer.djs_next_kaipan > 0) {
          this.timeStart(this.timer.djs_next_kaipan)
        } else {
          this.timeStart(this.timer.timeLeave)
        }

      },
      // 所有小时倒计时
      timeStart (timeParam) {
        let days = Math.floor(timeParam / (24 * 60 * 60))
        // 算算去了天数后还剩多少时间（s）
        let daysLeave = Math.floor(timeParam % (24 * 60 * 60))
        let hours = Math.floor(daysLeave / (60 * 60))
        // 算算去了小时后还剩多少时间(s)
        let hoursLeave = Math.floor(daysLeave % (60 * 60))
        let mins = Math.floor(hoursLeave / 60)
        // 算算去了分钟后还剩多少时间(s)
        let minsLeave = Math.floor(hoursLeave % 60)
        let sec = minsLeave

        this.hoursDatas.hou = hours
        this.hoursDatas.min = mins
        this.hoursDatas.sec = sec
        clearInterval(this.btnTimer)
        //当分钟和秒全部为0时请求，变化小时（小时不用算）
        this.btnTimer = setInterval(() => {
          this.hoursDatas.sec = this.hoursDatas.sec - 1
          if (this.hoursDatas.sec < 0 && this.hoursDatas.min > 0) {
            this.hoursDatas.min = this.hoursDatas.min - 1
            this.hoursDatas.sec = 59
          }
          if (this.hoursDatas.sec < 0 && this.hoursDatas.min < 1) {
            clearInterval(this.btnTimer)
            this.hoursDatas.sec = 0
            this.$emit('child-say', true)
          }
        }, 1000)
      },
      playMusic () {
        this.ifPlayMusic = !this.ifPlayMusic
      }
    },
    mounted () {

    },
    beforeDestroy () {
      // console.log(111111)
      clearInterval(this.btnTimer)
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../../../assets/less/public/var.less";

  .time-lottery-wrap {
    float: left;
    .lottery-timer-center {
      span {
        float: left;
        line-height: .5rem;
      }
      .timer {
        &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7) {
          line-height: .5rem;
          text-align: center;
          // background: #E8E8E8;
          border-radius: 10px;
          color: @main-brder-color;
          // font-size: .3rem;
          float: left;
        }
      }
      .doc {
        &.active {
          // -webkit-animation:mymove 1s  cubic-bezier(0,0,1,1)  infinite;
          // -moz-animation:mymove 1s  cubic-bezier(0,0,1,1)  infinite;
          // -o-animation:mymove 1s  cubic-bezier(0,0,1,1)  infinite;
          // -ms-animation:mymove 1s  cubic-bezier(0,0,1,1)  infinite;
          // animation:mymove 1s  cubic-bezier(0,0,1,1)  infinite;
          @-webkit-keyframes mymove {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @-moz-keyframes mymove {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @-ms-keyframes mymove {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @-o-keyframes mymove {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          @keyframes mymove {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }
      }
      .tip {
        font-size: .28rem;
        // color:#FF6600;
      }
    }
    .ousideTimerWrap {
      position: relative;
      .palyMusic {
        position: absolute;
        left: 7px;
        top: -7px;
        width: 33px;
        height: 33px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;

        i {
          &.i1 {
            color: @main-brder-color;
            //    font-size: 26px;
          }
          &.i2 {
            color: #cccccc;
            //    font-size: 22px;
          }
        }
      }
      .time-title {
        font-size: 16px;
        color: rgba(136, 136, 136, 1);
        padding-left: 45px;
        padding-bottom: 20px;
      }
    }
  }

</style>
