<template>
  <div class="ganme-record">
    <div class="all-record">
      <div class="header">
        <ul>
          <li v-for="(item,i) in date" :key="i" @click="toggleDate(i)" :class="{dateActive:dateActive==i}">
            <span>{{item}}</span>
          </li>

        </ul>
      </div>

      <div class="content">
        <cube-scroll>
          <div class="bar" v-for="(item,i) in gameData" :key="i" @click="goDetail(item.type)">
            <div class="bar-header">
              <img :src="item.className|capitalize" alt="">
              <span :style="item.className|isColor">{{item.className}}</span>

              <span v-if="item.className !=='综合统计'" class="fr cubeic-arrow"></span>
            </div>
            <div class="bar-main">
              <div>
                                                              <span>
                                                                  <p>投注额</p>
                                                                  <p>{{item.betAmount}}</p>
                                                              </span>
                <span>
                                                                  <p>单数</p>
                                                                  <p>{{item.betCount}}</p>
                                                              </span>
              </div>

              <div>

                                                                  <span>
                                                                  <p>有效投注</p>
                                                                  <p>{{item.validBetAmount}}</p>
                                                              </span>
                <span>
                                                                  <p>盈亏</p>
                                                                  <p>{{item.netAmount}}</p>
                                                              </span>
              </div>
            </div>
          </div>


        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'

  let self
  export default {
    data () {
      return {
        date: ['今日', '昨日', '七日'],
        // dateActive: 0,
        timeStart: this.getToday(new Date()),
        timeEnd: this.getToday(new Date()),
        gameData: []
      }
    },
    methods: {
      toggleDate (i) {
        this.$store.commit('reselutGame', i)
        // this.recordingList();
      },
      recordingList () {
        this.$http
          .post(`${this.$HOST_NAME}/games/getClassCount`, {
            timeStart: this.timeStart,
            timeEnd: this.timeEnd
          })
          .then(res => {
            if (res.code == 200) {
              this.gameData = res.data
              this.$loading(false)
            } else {
              this.$loading(false)

            }
          })
      },
      goDetail (type) {
        if (type == 'TOTAL') {
          return false
        } else {
          let url
          switch (type) {
            case 'CT_LOTTERY':
              url = '/personal_index/lottery'
              break

            case 'LIVE':
              url = '/personal_index/live'
              break

            case 'SPORT':
              url = '/personal_index/sport'
              break
            case 'GAME':
              url = '/personal_index/dianzi'
              break
            case 'VR_LOTTERY':
              url = '/personal_index/VRlottery'
              break
            case 'CHESS':
              url = '/personal_index/Chess'
              break
          }

          this.$router.push({
            path: url,
            query: {
              type: type,
              timeStart: this.timeStart,
              timeEnd: this.timeEnd
            }
          })
        }
      }
    },
    created () {
      this.$loading(true)
      // this.recordingList();
    },
    mounted () {
      self = this
    },
    destroyed () {
      this.$loading(false)
    },

    computed: {
      dateActive () {
        switch (this.$store.state.personal.gameActive) {
          case 0:
            this.timeStart = this.getToday(new Date())
            this.timeEnd = this.getToday(new Date())
            break

          case 1:
            this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24)
            this.timeEnd = this.getToday(new Date() - 1000 * 60 * 60 * 24)
            break
          case 2:
            this.timeStart = this.getToday(new Date() - 1000 * 60 * 60 * 24 * 7)
            this.timeEnd = this.getToday(new Date())
            break
        }
        this.recordingList()
        return this.$store.state.personal.gameActive
      }
    },

    filters: {
      capitalize: function (value) {
        if (value) {
          return require(`../../../.././../assets/img/public/image/common/personal/userInfo/${value}.png`)
        }
      },
      isColor: function (value) {
        let Color
        switch (value) {
          case '彩票游戏':
            Color = 'color:#db1a95'
            break
          case '体育赛事':
            Color = 'color:#fc552c'
            break
          case '真人视讯':
            Color = 'color:#318bd3'
            break
          case '电子游艺':
            Color = 'color:#24a338'
            break
          case '棋牌游戏':
            Color = 'color:#ff8e00'
            break
        }
        return Color
      }
    },
    store
  }
</script>

<style lang="less" scoped>
  .ganme-record {
    height: 92%;
    // background: #f5f5f5;
    .all-record {
      height: 100%;
      padding-top: 0.8rem;
      .header {
        height: 0.6rem;
        margin-bottom: 0.18rem;
        border-bottom: 1px solid #dbdbdb;
        position: absolute;
        top: 1.08rem;
        left: 0;
        width: 100%;

        ul {
          li {
            float: left;
            width: 33.33%;
            text-align: center;
            height: 0.6rem;
            padding: 0 0.2rem;
            padding-top: 0.08rem;
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
              height: 2px;
              background: #f60;
              left: 0;
              bottom: 1px;
            }
          }
        }
      }
      .content {
        height: 100%;
        // padding-bottom: 0.2rem;

        .bar {
          margin-bottom: 0.2rem;
          .bar-header {
            height: 0.72rem;
            background: #fff;
            line-height: 0.72rem;
            padding-left: 0.2rem;
            border-bottom: 1px solid #f5f5f5;
            img {
              width: 0.48rem;
              vertical-align: middle;
              margin-right: 0.1rem;
            }
            span {
              vertical-align: middle;
              font-size: 0.3rem;
            }
            span:nth-child(3) {
              color: #ff5100;
              margin-right: 0.2rem;
            }
          }
          .bar-main {
            height: 1.7rem;
            background: #fff;
            padding: 0 0.2rem;
            border-bottom: 1px solid #f5f5f5;
            div {
              height: 0.85rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                p:nth-child(1) {
                  font-size: 0.24rem;
                  color: #999;
                  margin-bottom: 0.1rem;
                }
                p:nth-child(2) {
                  font-size: 0.3rem;
                  color: #333;
                }
              }
              span:nth-child(2) {
                width: 1.8rem;
              }
            }

            div:nth-child(2) {
              span:nth-child(2) {
                p {
                  color: #ff5100;
                }
              }
            }
          }
        }
        .bar:nth-child(1) {
          .bar-main {
            background: #fffff1;
          }
        }
      }
    }
  }
</style>
