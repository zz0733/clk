<template>
  <div class="main">
    <div class="content">
      <!--通告区域-->
      <div class="notice clear-fix">
        <div class="notice-l">
          <i class="fa fa-fw fa-bullhorn"></i>
          最新通告
        </div>
        <div class="notice-content">
          <marquee align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                   onmouseover="this.stop()"
                   style="color: #666666; font-size: 15px; line-height: 40px;overflow: hidden;height: 40px;">
            <span v-html="lantern"></span>
          </marquee>
        </div>
      </div>
      <!--内容区域-->
      <div class="body">
        <!--左边-->
        <div class="left">
          <!--左上菜单-->
          <div class="up">
            <ul>
              <li @click="$router.push(item.path)" v-for="(item, i) in navData" :key="i">
                <img class="icon" :src="item.icon"/>
                <span class="name"><a href="javascript: void(0)">{{item.name}}</a></span>
                <span class="other"><a href="javascript: void(0)">{{item.doc}}</a></span>
              </li>
            </ul>
          </div>
          <!--左下tab-->
          <div class="down">
            <ol class="tab">
              <li @click="$router.push(item.path)"
                  @mouseover="tabIndex = i"
                  :class="{'tab-item': true, 'active': tabIndex === i}"
                  v-for="(item, i) in tabData" :key="i">
                <span>{{item.name}}</span>
                <ol class="list">
                  <li @click.stop="goGamePage(game)" class="list-item" v-for="(game, index) in item.list" :key="index">
                    {{game.name}}
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
        <!--中间部分-->
        <div class="center">
          <!--中间上面的走马灯-->
          <div class="up">
            <el-carousel :interval="5000" arrow="never" height="220px">
              <el-carousel-item v-for="(item,i) in carouselData" :key="i">
                <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                  <div class="img-box" :style="'background-image: url(\''+ item.img +'\')'"></div>
                </a>
                <div class="img-box" :style="'background-image: url(\''+ item.img +'\')'" v-else></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!--中间下面的tab-->
          <div class="down">
            <ol class="tab">
              <li :class="{'tab-item': true, 'active': tabResultIndex === i}"
                  v-for="(item, i) in tabResultData"
                  @click="tabResultIndex = i"
                  :key="i">
                <span class="name">{{item.name}}</span>
                <div class="content" v-if="item.result">
                  <p>第<span>{{item.result.lastissue}}</span>期</p>
                  <div class="content-res clear-fix">
                    <img class="content-icon" :src="item.icon"/>
                    <div class="content-main">
                      <div class="result">
                        <div class="info clear-fix" v-if="item.result.lastresultInfo">
                          <span class="item"
                                v-for="(num, i) in item.result.lastresultInfo.split(',')"
                                :key="num + i">{{num}}</span>
                        </div>
                        <div class="lu-zhu clear-fix" v-if="item.result.lastluzhu">
                          <span class="item"
                                v-for="(info, i) in item.result.lastluzhu.split(',')"
                                :key="info + i">
                            {{info}}
                          </span>
                        </div>
                      </div>
                      <div class="action">
                        <button class="action-button" @click="$router.push(`/plays/tradition/${item.id}`)">立即投注</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div class="right">
          <div class="up">
            <h3 class="head">
              中奖排行榜
              <span class="fa fa-fw fa-trophy" style="color: red;"></span>
            </h3>
            <div class="winning-box">
              <ul class="winning-list">
                <li class="winning-item" v-for="(item, i) in winningInfo" :key="i">
                  <span class="order">{{i + 1}}</span>
                  <span class="name">{{item.name.padEnd(8, '*')}}</span>
                  <span class="num">{{item.num}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="center">
            <div class="text">
              <p>手机APP 即将上线 敬请期待</p>
            </div>
            <div class="down-box">
              <div class="down-title">500万彩票客户端</div>
              <span class="android">
                <span class="fa fa-fw fa-android"></span>
                <span class="name">安卓版</span>
              </span>
              <span class="apple">
                <span class="fa fa-fw fa-apple"></span>
                <span class="name">IOS版</span>
              </span>
            </div>
          </div>
          <img class="down" src="/static/500wcp/img/gounian.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import store from '@/vuex/store'
  import data from '../../public/games/public.js'

  export default {
    mixins: [data],
    data () {
      return {
        lantern: '',
        lanternWidth: '0',
        carouselData: [],
        navData: [
          {
            name: '北京赛车',
            doc: '',
            icon: '/static/public/image/lottery/ico/vp-北京赛车.png',
            path: '/plays/tradition/2'
          },
          {
            name: '重庆时时彩',
            doc: '易操作,回单快',
            icon: '/static/public/image/lottery/ico/vp-重庆时时彩.png',
            path: '/plays/tradition/4'
          },
          {
            name: '江苏快三',
            doc: '投掷骰子 轻松中奖',
            icon: '/static/public/image/lottery/ico/vp-北京赛车.png',
            path: '/plays/tradition/2'
          },
          {
            name: '香港六合彩',
            doc: '%73返奖率',
            icon: '/static/public/image/lottery/ico/vp-香港六合彩.png',
            path: '/plays/tradition/1',
          },
          {
            name: '广东快乐十分',
            doc: '高额中奖',
            icon: '/static/public/image/lottery/ico/vp-广东快乐十分.png',
            path: '/plays/tradition/5'
          }
        ],
        tabData: [
          {
            name: '传统彩票',
            path: '/plays/hall',
            list: [
              {
                name: '快速赛车',
                path: '/plays/tradition/12',
              },
              {
                name: '三分赛车',
                path: '/plays/tradition/13',
              },
              {
                name: '北京赛车',
                path: '/plays/tradition/2'
              },
              {
                name: '快速时时彩',
                path: '/plays/tradition/16',
              },
              {
                name: '三分时时彩',
                path: '/plays/tradition/17',
              },
              {
                name: '重庆时时彩',
                path: '/plays/tradition/4'
              },
              {
                name: '幸运飞艇',
                path: '/plays/tradition/3',
              },
              {
                name: '快速六合彩',
                path: '/plays/tradition/18'
              },
              {
                name: '香港六合彩',
                path: '/plays/tradition/1',
              },
              {
                name: '广东快乐十分',
                path: '/plays/tradition/5'
              },
              {
                name: '幸运农场',
                path: '/plays/tradition/6',
              },
              {
                name: '广东11选5',
                path: '/plays/tradition/7'
              },
              {
                name: '排列3',
                path: '/plays/tradition/28',
              },
              {
                name: '上海时时乐',
                path: '/plays/tradition/29'
              },
              {
                name: '江苏快三',
                path: '/plays/tradition/9'
              }
            ]
          },
          {
            name: '真人视讯',
            path: '/home/live',
            list: [
              {name: 'AG视讯厅', platform: 'live_casino', id: '14', icon: '/static/500wcp/img/live/icon/AG_LIVE.png'},
              {name: 'BBIN视讯厅', platform: 'live_casino', id: '15', icon: '/static/500wcp/img/live/icon/BBIN_LIVE.png'},
              {name: 'BG视讯厅', platform: 'live_casino', id: '44', icon: '/static/500wcp/img/live/icon/BG_LIVE.png'},
              {name: 'DG视讯厅', platform: 'live_casino', id: '33', icon: '/static/500wcp/img/live/icon/DG_LIVE.png'},
              {name: 'DS视讯厅', platform: 'live_casino', id: '16', icon: '/static/500wcp/img/live/icon/DS_LIVE.png'},
              {name: 'LEBO视讯厅', platform: 'live_casino', id: '35', icon: '/static/500wcp/img/live/icon/LEBO_LIVE.png'},
              {name: 'OG视讯厅', platform: 'live_casino', id: '39', icon: '/static/500wcp/img/live/icon/OG_LIVE.png'},
              {name: 'eBET视讯厅', platform: 'live_casino', id: '34', icon: '/static/500wcp/img/live/icon/EBET_LIVE.png'},
              {name: 'LMG视讯厅', platform: 'live_casino', id: '36', icon: '/static/500wcp/img/live/icon/LMG_LIVE.png'},
              {name: '欧博视讯厅', platform: 'live_casino', id: '37', icon: '/static/500wcp/img/live/icon/AB_LIVE.png'},
              {name: 'SA视讯厅', platform: 'live_casino', id: '40', icon: '/static/500wcp/img/live/icon/SA_LIVE.png'}
            ]
          }
        ],
        tabIndex: 0,
        tabResultData: [
          {
            name: '北京赛车',
            icon: '/static/public/image/lottery/ico/vp-北京赛车.png',
            id: 2,
            result: null
          },
          {
            name: '快速赛车',
            icon: '/static/public/image/lottery/ico/vp-快速赛车.png',
            id: 12,
            result: null
          },
          {
            name: '重庆时时彩',
            icon: '/static/public/image/lottery/ico/vp-重庆时时彩.png',
            id: 4,
            result: null
          },
          {
            name: '幸运飞艇',
            icon: '/static/public/image/lottery/ico/vp-幸运飞艇.png',
            id: 3,
            result: null
          },
          {
            name: '香港六合彩',
            icon: '/static/public/image/lottery/ico/vp-香港六合彩.png',
            id: 1,
            result: null
          }
        ],
        tabResultIndex: 0,
        winningInfo: []
      }
    },
    watch: {
      tabResultIndex: 'refreshResult',
    },
    methods: {
      initWinningInfo () {
        let length = 50
        let data = []
        for (let i = 0; i < length; i++) {
          let num = parseInt(Math.random() * (Math.random() * (Math.random() * 360000)))
          num = num < 10 ? num * 1234 : num
          num = num < 100 ? num * 123 : num
          num = num < 1000 ? num * 12 : num
          let name = String.fromCharCode((num % 26) + 97) + num.toString(32)
          name = name.substr(0, 3)
          data[i] = {name, num}
        }
        this.arraySort(data, (v1, v2) => v1.num < v2.num)
        this.winningInfo = data
      },
      refreshResult () {
        let item = this.tabResultData[this.tabResultIndex]
        if (item) {
          this.$http.get(`${this.$HOST_NAME}/lottery/getIssue/${item.id}`).then(
            res => {
              item.result = {
                lastissue: res.data.lastissue,
                lastluzhu: res.data.lastluzhu,
                lastresultInfo: res.data.lastresultInfo,
              }
            })
        }
      },
      goGamePage (game) {
        if (game) {
          // 彩票跳转
          if (game.path && game.path.includes('/plays/tradition')) {
            this.$router.push(game.path)
            return false
          }
          // 第三方体育跳转
          if (game.id) {
            this.getItemId(game)
          }
        }
      },
      //获取banner
      async getbannner () {
        let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
          position: 'banner',
          clientType: 'pc'
        })
        if (res && res.code == 200) {
          this.carouselData = res.data[0] && res.data[0].body
        }
      },
      async getPopout () {
        if (!this.$store.state.mainState.ifpourT || localStorage.token) return false
        let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
          type: 'popups',
          desc_client_type: 'html'
        })
        if (res && res.code == 200) {
          if (!res.data.data.length) return false
          this.showPopout = true
          this.popups = res.data.data[0] && res.data.data[0].description
          this.$store.commit('mainState/resetPour', false)
        }
      },
      // 获取公告
      async getlantern () {
        let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
          type: 'lantern',
          desc_client_type: 'html'
        })
        if (res && res.code == 200) {
          if (!res.data.data.length) return false
          this.lantern = res.data.data[0] && res.data.data[0].description
        }
        // 参数： type: lantern 走马灯
        // 参数： type: popups 弹窗
        // 参数： type: notice 提示
      },
      hotTag (item) {
        this.hotNow.img = item.img
        this.hotNow.name = item.name
        this.hotNow.class = item.class
        this.hotNow.title = item.title
        this.hotNow.text = item.text
        this.hotNow.btn = item.btn
      }
    },
    created () {
      this.$store.commit('hsyl/setNav', 0)
    },
    mounted () {
      this.getPopout()
      this.getlantern()
      this.getbannner()
      this.refreshResult()
      this.initWinningInfo()
    },
    components: {},
    store
  }
</script>

<style type="text/less" lang="less" scoped>
  .clear-fix:after {
    content: '';
    display: table;
    clear: both;
    zoom: 1;
  }

  .img-box {
    width: 100%;
    height: 100%;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }

  .main {
    background: url(/static/500wcp/img/bg-article.png) #fff no-repeat center 96px;
    padding-bottom: 10px;
    .content {
      width: 1000px;
      margin: 0 auto;
      .notice {
        height: 40px;
        line-height: 40px;
        .notice-l {
          width: 100px;
          color: red;
          font-size: 14px;
          font-weight: 600;
          float: left;
          > i.fa {
            color: black;
            font-weight: 500;
            font-size: 20px;
          }
        }
        .notice-content {
          width: 900px;
          height: 40px;
          float: left;
        }
      }
      .body {
        &:after {
          content: '';
          display: table;
          clear: both;
          zoom: 1;
        }
        > .left, > .center, > .right {
          float: left;
        }
        .left {
          width: 250px;
          .up {
            border: 1px solid #EDEDED;
            background-color: #f8f8f8;
            ul {
              li {
                height: 55px;
                width: 100%;
                box-sizing: border-box;
                border-bottom: 1px dashed #D1D1D1;
                &:last-child {
                  border-bottom-color: transparent;
                }
                .icon {
                  width: 44px;
                  height: 44px;
                  margin: 5px;
                  display: inline-block;
                  background-repeat: no-repeat;
                }
                .name, .other {
                  display: inline-block;
                  vertical-align: top;
                  height: 54px;
                  line-height: 54px;
                  a:hover {
                    color: #f13131;
                  }
                }
                .name {
                  font-size: 14px;
                  a {
                    color: #333333;
                  }
                }
                .other {
                  font-size: 12px;
                  a {
                    color: #999999;
                  }
                }
              }
            }
          }
          .down {
            .tab {
              position: relative;
              height: 243px;
              margin-top: 10px;
              overflow: hidden;
              font-size: 14px;
              border: 1px solid #EDEDED;
              background-color: #f8f8f8;
              &:after {
                content: '';
                display: table;
                clear: both;
                zoom: 1;
              }
              .tab-item {
                float: left;
                width: 50%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: white;
                cursor: pointer;
                &.active {
                  background-color: #f8f8f8;
                  span {
                    color: #f13131;
                  }
                  .list {
                    display: block;
                  }
                }
                .list {
                  position: absolute;
                  left: 0;
                  top: 40px;
                  width: 100%;
                  display: none;
                  background-color: #f8f8f8;
                  font-size: 12px;
                  padding: 5px;
                  &:after {
                    content: '';
                    display: table;
                    clear: both;
                    zoom: 1;
                  }
                  .list-item {
                    float: left;
                    width: 33%;
                    box-sizing: border-box;
                    padding-left: 5px;
                    text-align: left;
                    cursor: pointer;
                    &:hover {
                      color: #f13131;
                    }
                  }
                }
              }
            }
          }
        }
        .center {
          width: 516px;
          margin: 0 10px;
          .up {
            height: 220px;
          }
          .down {
            margin-top: 10px;
            height: 300px;
            border: 1px solid #EDEDED;
            box-sizing: border-box;
            .tab {
              position: relative;
              &:after {
                content: '';
                display: table;
                clear: both;
                zoom: 1;
              }
              .tab-item {
                float: left;
                width: 20%;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #333333;
                cursor: pointer;
                background-color: #dbdbdb;
                box-sizing: border-box;
                border-right: 1px solid white;
                -webkit-transition: all 0.5s;
                transition: all 0.5s;
                &:last-child {
                  border-right: none;
                }
                &.active, &:hover {
                  color: white;
                  background-color: #f13131;
                }
                &.active {
                  .content {
                    display: block;
                  }
                }
                .name {
                  cursor: inherit !important;
                }
                .content {
                  position: absolute;
                  display: none;
                  left: 0;
                  top: 44px;
                  height: 254px;
                  width: 100%;
                  padding: 10px;
                  box-sizing: border-box;
                  color: #333333;
                  p {
                    margin-left: 10px;
                    text-align: left;
                    color: #333333;
                    span {
                      color: #f13131;
                      padding: 0 5px;
                    }
                  }
                }
                .content-res {
                  .content-icon {
                    float: left;
                    width: 70px;
                    height: 70px;
                    margin: 10px;
                  }
                  .content-main {
                    float: left;
                    width: 404px;
                    .result {
                      width: 100%;
                      .info {
                        width: 100%;
                        display: block;
                        .item {
                          display: block;
                          float: left;
                          height: 40px;
                          line-height: 40px;
                          width: 40px;
                          border-radius: 50%;
                          color: white;
                          font-size: 20px;
                          font-weight: 700;
                          background-color: red;
                          margin: 5px;
                        }
                      }
                      .lu-zhu {
                        width: 100%;
                        display: block;
                        .item {
                          display: block;
                          float: left;
                          height: 30px;
                          line-height: 30px;
                          border-radius: 4px;
                          min-width: 30px;
                          padding: 0 6px;
                          border: 1px solid #555;
                          color: #555;
                          font-size: 16px;
                          font-weight: 500;
                          background-color: white;
                          margin: 5px;
                        }
                      }
                    }
                    .action {
                      width: 100%;
                      text-align: right;
                      &-button {
                        color: white;
                        background-color: #f13131;
                        line-height: 20px;
                        padding: 8px;
                        border: none;
                        &:hover {
                          background-color: #d00000;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .right {
          width: 214px;
          .up {
            border: 1px solid #EDEDED;
            .head {
              text-align: center;
              line-height: 38px;
              background-color: #f8f8f8;
              border-bottom: 1px solid #EDEDED;
            }
            .winning-box {
              position: relative;
              height: 280px;
              overflow: hidden;
              font-size: 14px;
              line-height: 28px;
              .winning-list {
                position: absolute;
                width: 100%;
                bottom: -500%;
                left: 0;
                -webkit-animation: winning-list-animation 30s linear infinite;
                animation: winning-list-animation 30s linear infinite;
                .winning-item {
                  width: 100%;
                  padding: 0 10px;
                  &:after {
                    content: '';
                    display: table;
                    clear: both;
                    zoom: 1;
                  }
                  &:nth-child(1),
                  &:nth-child(2),
                  &:nth-child(3) {
                    .order {
                      background-color: red;
                    }
                  }
                  .order {
                    display: block;
                    float: left;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: white;
                    background-color: #afafaf;
                    border-radius: 4px;
                  }
                  .name {
                    float: left;
                    margin-left: 20px;
                  }
                  .num {
                    float: right;
                  }
                }
              }
            }
          }
          .center {
            border: 1px solid #EDEDED;
            margin-top: 10px;
            margin-left: 0;
            height: 100px;
            width: 100%;
            position: relative;
            font-size: 14px;
            &:after {
              content: '';
              display: table;
              clear: both;
              zoom: 1;
            }
            .text {
              float: left;
              height: 100px;
              width: 100px;
              box-sizing: border-box;
              padding: 20px;
              line-height: 20px;
            }
            .down-box {
              float: left;
              width: 112px;
              &:after {
                content: '';
                display: table;
                clear: both;
                zoom: 1;
              }
              .down-title {
                padding: 10px 0;
                width: 100%;
                float: left;
              }
              .android {
                width: 46px;
                float: left;
                font-size: 12px;
                .fa {
                  width: 44px;
                  height: 44px;
                  font-size: 30px;
                  line-height: 44px;
                  color: white;
                  background-color: #4DCB6A;
                }
              }
              .apple {
                padding-left: 10px;
                width: 46px;
                float: left;
                font-size: 12px;
                .fa {
                  width: 44px;
                  height: 44px;
                  font-size: 30px;
                  line-height: 44px;
                  color: white;
                  background-color: #999999;
                }
              }
              .name {
                display: block;
                width: 44px;
                height: 20px;
                line-height: 20px;
                text-align: center;
              }
            }
          }
          .down {
            margin-top: 10px;
            width: 100%;
            height: 88px;
          }
        }
      }
    }
  }

  @keyframes winning-list-animation {
    from {
      bottom: -500%;
    }
    to {
      bottom: 100%;
    }
  }

  @-webkit-keyframes winning-list-animation {
    from {
      bottom: -500%;
    }
    to {
      bottom: 100%;
    }
  }
</style>
