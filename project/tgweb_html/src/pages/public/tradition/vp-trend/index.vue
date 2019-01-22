<template>
  <div class="container-trend">
    <div class="trend-wrap">
      <vp-pub-header title="开奖走势"></vp-pub-header>
      <div class="sel">
        <div @click="selNameFc">
          <span>{{col1.lotName}}</span>
        </div>
        <!-- $route.query.series!='sd'&& -->
        <div v-if="$route.query.id!='1'&&$route.query.id!='11'&&$route.query.id!='28'" @click="showDatePicker">
          <span>{{timeText}}</span>
        </div>
      </div>
      <div class="result-title">
        开奖结果
      </div>
      <div class="content">
        <div class="scroll-list-wrap">
          <cube-scroll ref="scroll" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
            <div class="item-box">
              <div class="item">
                <div class="t">开奖时间</div>
                <div class="t">开奖号码</div>
              </div>
              <div class="item" :key=outIndex v-for=" (outItem,outIndex) in  historyDatas">
                <div class="left">
                  <div class="issue">
                    {{outItem.issue}}期
                  </div>
                  <div class="openingTime">{{outItem.openingTime}}</div>
                </div>
                <div class="right">
                  <div class="resultInfo">
                    <div class="box">
                      <div :class="{
                        'activeRLhc':$route.query.series=='lhc'&&bose.red.includes(+intItem),
                        'activeBLhc':$route.query.series=='lhc'&&bose.blue.includes(+intItem),
                        'activeGLhc':$route.query.series=='lhc'&&bose.green.includes(+intItem),
                        'activePk1':$route.query.series=='pk10'&&+intItem==1,
                        'activePk2':$route.query.series=='pk10'&&+intItem==2,
                        'activePk3':$route.query.series=='pk10'&&+intItem==3,
                        'activePk4':$route.query.series=='pk10'&&+intItem==4,
                        'activePk5':$route.query.series=='pk10'&&+intItem==5,
                        'activePk6':$route.query.series=='pk10'&&+intItem==6,
                        'activePk7':$route.query.series=='pk10'&&+intItem==7,
                        'activePk8':$route.query.series=='pk10'&&+intItem==8,
                        'activePk9':$route.query.series=='pk10'&&+intItem==9,
                        'activePk10':$route.query.series=='pk10'&&+intItem==10,
                      }" class="ball" :key=intIndex v-for=" (intItem,intIndex) in  outItem.resultInfo">{{intItem}}
                      </div>
                    </div>
                  </div>
                  <div class="luzhu">
                    <div class="box">
                      <div class="ball" :key=intIndex v-for=" (intItem,intIndex) in  outItem.luzhu">{{intItem}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <img class="nodataImg" v-if="noDatas" src="../../../../assets/img/public/image/common/home/noDatas.png"
                   alt="">
            </div>
          </cube-scroll>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vpPubHeader from '@/pages/public/common/Header'
  import $ from 'jquery'

  export default {
    data () {
      return {
        bose: {
          red: [1, 7, 13, 19, 23, 29, 35, 45, 2, 8, 12, 18, 24, 30, 34, 40, 46],
          blue: [3, 9, 15, 25, 31, 37, 41, 47, 4, 10, 14, 20, 26, 36, 42, 48],
          green: [5, 11, 17, 21, 27, 33, 39, 43, 6, 16, 22, 28, 32, 38, 44, 49]
        },
        col1Data: [],
        col1: {
          lotName: '',
          nowInder: 0
        },
        stopPullUp: false,
        stopPullDown: false,
        pageSize: 20,
        timeText: this.getToday(new Date()),
        historyDatas: [],
        pullDownRefreshObj: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
          txt: '刷新成功'
        },
        pullUpLoadObj: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false,
          txt: '刷新成功'
        },
        noDatas: false,
        selectedVal: ''
      }
    },
    methods: {
      //获取全部彩种
      async getNavFc () {
        let res = await this.$http.post(
          `${this.$HOST_NAME}/games/lottery/category`, {}
        )
        if (res && res.code == 200) {
          res.data.forEach((item, v) => {
            item &&
            item.lottery.forEach(innerItem => {
              this.col1Data.push({
                value: innerItem.id,
                text: innerItem.name,
                series: JSON.parse(innerItem.special_setting).series
              })
              if (this.$route.query.id == innerItem.id) {
                this.col1.lotName = innerItem.name
                this.col1.lotteryId = innerItem.id
              }
            })
          })
          this.col1Data.forEach((item, v) => {
            if (item.text == this.col1.lotName) {
              this.col1.nowInder = v
            }
          })
        } else {

        }
      },
      //选彩种
      selNameFc () {
        this.newPicker()
        this.picker.setData([this.col1Data], [this.col1.nowInder])
        this.picker.show()
        // let flag = this.$isMobile();
        // if(flag){
        //   document.querySelector('.cube-picker').style.position="absolute";
        // }
      },
      newPicker () {
        let $this = this
        this.picker = this.$createPicker({
          title: '',
          data: [$this.col1Data],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.col1.lotteryId = selectedVal[0]
            this.showPickerReturn(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {}
        })
      },
      showPickerReturn (selectedVal, selectedIndex, selectedText) {
        // console.log(selectedIndex, selectedText)
        // console.log(this.col1Data[selectedIndex[0]])
        this.$router.push({
          path: '/plays/trend',
          query: {
            id: this.col1Data[selectedIndex[0]].value,
            series: this.col1Data[selectedIndex[0]].series
          }
        })
        this.timeText = this.getToday(new Date())

        this.col1.lotName = selectedText[0]
        this.col1.nowInder = selectedIndex
        this.$loading3(true)
        this.selectedVal = selectedVal[0]
        this.getTrendDadas({
          lotteryId: selectedVal[0],
          pageSize: 20,
          date: this.timeText
        })
      },
      // 选择时间
      showDatePicker () {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '',
            min: new Date(new Date().getFullYear() - 5, 7, 8),
            max: new Date(),
            value: new Date(),
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }

        this.datePicker.show()
      },
      selectHandle (date, selectedVal, selectedText) {
        this.timeText = this.$moment(date).format('YYYY-MM-DD')
        this.$loading2(true)
        this.getTrendDadas({
          lotteryId: this.col1.lotteryId,
          pageSize: 20,
          date: this.timeText
        })
        // console.log(this.timeText)
        // this.timeText=selectedVal[0]+'-'+selectedVal[1]+'-'+selectedVal[2];
        // this.$createDialog({
        //   type: 'worn',
        //   content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        //   icon: 'cubeic-alert'
        // }).show()
      },
      async getTrendDadas (data, type) {
        this.noDatas = false
        // if (this.$route.query.series == 'sd' || this.$route.query.id == '1') {
        //   this.timeText = '';
        // }
        if (this.$route.query.id == '1' || this.$route.query.id == '11' || this.$route.query.id == '28') {
          this.timeText = ''
        }
        let res = await this.$http.post(
          `${this.$HOST_NAME}/lottery/getResults`, {
            lotteryId: this.$route.query.id,
            pageSize: this.pageSize,
            date: this.timeText
            // date: this.$route.query.series == 'sd' || this.$route.query.id == '1' ? '' : this.timeText
          }
        )
        if (res && res.code == 200) {
          res.data.data.forEach(item => {
            if (!item.lotteryName.includes('k3') ||
              !item.lotteryName.includes('pcdd') ||
              !item.lotteryName.includes('dpc')
            ) {
              item.issue = item.issue.toString().substring(4, item.issue.length)
            }
            item.resultInfo = item.resultInfo.split(',')
            item.luzhu = item.luzhu.split(',')
            item.openingTime = this.$moment
              .unix(item.openingTime - 0)
              .format('MM-DD HH:mm')
          })
          if (!res.data.data.length) {
            this.noDatas = true
          }
          if (type === 'pulldown') {
            if (this.historyDatas[0].issue === res.data.data[0].issue) {
              this.stopPullDown = true
            }
            this.historyDatas = res.data.data
          } else if (type === 'pullUp') {
            if (res.data.data.length === res.data.total) {
              this.stopPullUp = true
            }
            this.historyDatas = res.data.data
          } else {
            this.historyDatas = res.data.data
          }
          this.$loading2(false)
          this.$loading3(false)
        } else {

          this.$loading2(false)
          this.$loading3(false)
        }
      },
      onPullingDown () {
        if (this.stopPullDown) {
          this.$newToast('已经是最新的数据了')
          this.$refs.scroll.forceUpdate()
        } else {
          this.getTrendDadas({
              lotteryId: this.col1.lotteryId,
              pageSize: 20,
              date: this.timeText
            },
            'pulldown'
          )
            .then(() => {
              this.$refs.scroll.refresh()
              this.$refs.scroll.forceUpdate()
            })
            .catch(() => {
              this.$refs.scroll.forceUpdate()
            })
        }
      },
      onPullingUp () {
        if (this.stopPullUp) {
          this.$newToast('没有更多数据了')
          this.$refs.scroll.forceUpdate()
        } else {
          this.pageSize += 20
          this.getTrendDadas({
              lotteryId: this.col1.lotteryId,
              pageSize: this.pageSize,
              date: this.timeText
            },
            'pullUp'
          )
            .then(() => {
              this.$refs.scroll.refresh()
              this.$refs.scroll.forceUpdate()
            })
            .catch(() => {
              this.$refs.scroll.forceUpdate()
            })
        }
      },
      reload () {
        window.location.reload()
      }
    },
    created: function () {
      this.getNavFc()
      this.$loading3(true)
      this.getTrendDadas({
        lotteryId: this.$route.query.id,
        pageSize: 20,
        date: this.timeText
      })
    },
    watch: {
      // $route (to, from) {
      // console.log(11221)
      // this.selectedVal=this.$route.query.id;
      // this.getTrendDadas({
      //   lotteryId: this.selectedVal,
      //   pageSize: 20,
      //   date: this.timeText
      // });
      // this.getData()
      // }
    },
    mounted () {
      window.addEventListener('popstate', this.reload, false)
    },
    computed: {
      options () {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('popstate', this.reload, false)
    },
    components: {
      vpPubHeader
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/less/public/var.less";

  .container-trend {
    .trend-wrap {
      position: fixed;
      width: 100%;
    }
    .sel {
      // display: flex;
      margin: 0.2rem 0.5rem 0.2rem 0.5rem;
      zoom: 1;
      overflow: hidden;
      div {
        width: 3.04rem;
        display: inline-block;
        font-size: 0.32rem;
        line-height: 0.76rem;
        color: #333;
        text-align: center;
        border: 1px solid @main-lottery-border-color;
        border-radius: 0.1rem;
        &:first-child {
          float: left;
        }
        &:nth-child(2) {
          float: left;
          margin-left: 16px;
        }
        span {
          &:after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 0.13rem solid transparent;
            border-right: 0.13rem solid transparent;
            border-top: 0.19rem solid #b9b4ac;
            margin-left: 0.2rem;
          }
        }
      }
    }
    .result-title {
      font-size: 0.32rem;
      color: #333;
      line-height: 0.66rem;
      background: rgba(241, 241, 241, 1);
      padding-left: 0.1rem;
    }
    .content {
      width: 100%;
      height: 100%;
      .scroll-list-wrap {
        position: fixed;
        top: 2.72rem;
        left: 0;
        right: 0;
        bottom: 0;
        // height: 300px;
        .item-box {
          .item {
            display: flex;
            font-size: 0.3rem;
            color: #333;
            .t {
              text-align: center;
              line-height: 0.66rem;
              border: 1px solid rgba(241, 241, 241, 0.6);
              &:first-child {
                flex: 3;
              }
              &:last-child {
                border-left: 0;
                flex: 7;
              }
            }
            .left {
              flex: 3;
              text-align: center;
              border-bottom: 1px solid rgba(241, 241, 241, 0.6);
              div {
                height: 0.56rem;
                line-height: 0.56rem;
              }
              .openingTime {
                font-size: 0.26rem;
                color: #999;
              }
            }
            .right {
              flex: 7;
              text-align: center;
              border-left: 1px solid rgba(241, 241, 241, 0.6);
              border-bottom: 1px solid rgba(241, 241, 241, 0.6);
              padding: 0.1rem 0 0 0;
              .resultInfo {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 0.1rem;
                .box {
                  .ball {
                    float: left;
                    width: 0.46rem;
                    height: 0.46rem;
                    line-height: 0.46rem;
                    border-radius: 50%;
                    background: @main-color;
                    color: #fff;
                    margin-left: 0.05rem;
                    font-size: 0.26rem;
                    &.activeRLhc {
                      background: #F36055 !important;
                      border: 1px solid #F36055 !important;
                    }
                    &.activeBLhc {
                      background: #20A2D8 !important;
                      border: 1px solid #20A2D8 !important;
                    }
                    &.activeGLhc {
                      background: #49BB27 !important;
                      border: 1px solid #49BB27 !important;
                    }
                    &.activePk1 {
                      background: #E6DE0B !important;
                      border: 1px solid #E6DE0B !important;
                      border-radius: 0;
                    }
                    &.activePk2 {
                      background: #4B84F8 !important;
                      border: 1px solid #4B84F8 !important;
                      border-radius: 0;
                    }
                    &.activePk3 {
                      background: #4C4C4C !important;
                      border: 1px solid #4C4C4C !important;
                      border-radius: 0;
                    }
                    &.activePk4 {
                      background: #D86F1A !important;
                      border: 1px solid #D86F1A !important;
                      border-radius: 0;
                    }
                    &.activePk5 {
                      background: #80E7E6 !important;
                      border: 1px solid #80E7E6 !important;
                      border-radius: 0;
                    }
                    &.activePk6 {
                      background: #4403F3 !important;
                      border: 1px solid #4403F3 !important;
                      border-radius: 0;
                    }
                    &.activePk7 {
                      background: #DFDFDF !important;
                      border: 1px solid #DFDFDF !important;
                      border-radius: 0;
                    }
                    &.activePk8 {
                      background: #D10108 !important;
                      border: 1px solid #D10108 !important;
                      border-radius: 0;
                    }
                    &.activePk9 {
                      background: #650000 !important;
                      border: 1px solid #650000 !important;
                      border-radius: 0;
                    }
                    &.activePk10 {
                      background: #73C32E !important;
                      border: 1px solid #73C32E !important;
                      border-radius: 0;
                    }
                    &:first-child {
                      margin-left: 0;
                    }
                  }
                }
              }
              .luzhu {
                display: flex;
                justify-content: center;
                align-items: center;
                .box {
                  .ball {
                    float: left;
                    padding: 0 0.14rem;
                    line-height: 0.32rem;
                    border: 1px solid rgba(241, 241, 241, 0.6);
                    margin-left: 0.05rem;
                    border-radius: 0.06rem;
                    color: #666;
                    font-size: 0.26rem;
                    &:first-child {
                      margin-left: 0;
                    }
                  }
                }
              }
            }
          }
          .nodataImg {
            width: 60%;
            margin: 1rem auto;
            display: block;
          }
        }
      }
    }
  }
</style>
