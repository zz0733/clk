<template>
  <div class="nav">
    <ul class="nav-main clear-fix">
      <li v-for="(item,i) in navlist" :class="{'nav-active': navActive === i}" :key="i">
        <em v-if="item.hot" class="hot"></em>
        <p @click="toggleNav(i,item.link)">{{item.name}}</p>
        <ol class="nav-children clear-fix" v-if="item.sub">
          <li v-for="(child, index) in item.sub" :key="index" @click.stop="goThirdParty(child)">
            <div>
              <img v-if="child.icon" :src="child.icon"/>
            </div>
            <p>{{child.name}}</p>
            <img v-if="child.hot" class="hot" src="/static/cpzj/img/hot.gif">
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import data from '../../public/games/public.js'

  export default {
    mixins: [data],
    data () {
      return {
        navlist: [
          {name: '首页', link: '/home', en: 'HOME'},
          {
            name: '购彩大厅', link: '/plays/hall', en: 'LOTTERY', hot: true, sub: [
              {
                name: '快速赛车',
                icon: '/static/public/image/lottery/ico/vp-快速赛车.png',
                path: '/plays/tradition/12',
                hot: true
              },
              {
                name: '三分赛车',
                icon: '/static/public/image/lottery/ico/vp-3分赛车.png',
                path: '/plays/tradition/13',
                hot: true
              },
              {
                name: '北京赛车',
                icon: '/static/public/image/lottery/ico/vp-北京赛车.png',
                path: '/plays/tradition/2'
              },
              {
                name: '快速时时彩',
                icon: '/static/public/image/lottery/ico/vp-快速时时彩.png',
                path: '/plays/tradition/16',
                hot: true
              },
              {
                name: '三分时时彩',
                icon: '/static/public/image/lottery/ico/vp-3分时时彩.png',
                path: '/plays/tradition/17',
                hot: true
              },
              {
                name: '重庆时时彩',
                icon: '/static/public/image/lottery/ico/vp-重庆时时彩.png',
                path: '/plays/tradition/4'
              },
              {
                name: '幸运飞艇',
                icon: '/static/public/image/lottery/ico/vp-幸运飞艇.png',
                path: '/plays/tradition/3',
                hot: true
              },
              {
                name: '快速六合彩',
                icon: '/static/public/image/lottery/ico/vp-快速六合彩.png',
                path: '/plays/tradition/18'
              },
              {
                name: '香港六合彩',
                icon: '/static/public/image/lottery/ico/vp-香港六合彩.png',
                path: '/plays/tradition/1',
                hot: true
              },
              {
                name: '广东快乐十分',
                icon: '/static/public/image/lottery/ico/vp-广东快乐十分.png',
                path: '/plays/tradition/5'
              },
              {
                name: '幸运农场',
                icon: '/static/public/image/lottery/ico/vp-幸运农场.png',
                path: '/plays/tradition/6',
                hot: true
              },
              {
                name: '广东11选5',
                icon: '/static/public/image/lottery/ico/vp-广东11选5.png',
                path: '/plays/tradition/7'
              },
              {
                name: '排列3',
                icon: '/static/public/image/lottery/ico/vp-排列3.png',
                path: '/plays/tradition/28',
                hot: true
              },
              {
                name: '上海时时乐',
                icon: '/static/public/image/lottery/ico/vp-上海时时乐.png',
                path: '/plays/tradition/29'
              },
              {
                name: '江苏快三',
                icon: '/static/public/image/lottery/ico/vp-江苏快3.png',
                path: '/plays/tradition/9'
              }
            ]
          },
          {
            name: '真人视讯', link: '/home/live', hot: true, en: 'CASINO', sub: [
              {name: 'AG视讯厅', platform: 'live_casino', id: '14', icon: '/static/cpzj/img/live/icon/AG_LIVE.png'},
              {name: 'BBIN视讯厅', platform: 'live_casino', id: '15', icon: '/static/cpzj/img/live/icon/BBIN_LIVE.png'},
              {name: 'BG视讯厅', platform: 'live_casino', id: '44', icon: '/static/cpzj/img/live/icon/BG_LIVE.png'},
              {name: 'DG视讯厅', platform: 'live_casino', id: '33', icon: '/static/cpzj/img/live/icon/DG_LIVE.png'},
              {name: 'DS视讯厅', platform: 'live_casino', id: '16', icon: '/static/cpzj/img/live/icon/DS_LIVE.png'},
              {name: 'LEBO视讯厅', platform: 'live_casino', id: '35', icon: '/static/cpzj/img/live/icon/LEBO_LIVE.png'},
              {name: 'OG视讯厅', platform: 'live_casino', id: '39', icon: '/static/cpzj/img/live/icon/OG_LIVE.png'},
              {name: 'eBET视讯厅', platform: 'live_casino', id: '34', icon: '/static/cpzj/img/live/icon/EBET_LIVE.png'},
              {name: 'LMG视讯厅', platform: 'live_casino', id: '36', icon: '/static/cpzj/img/live/icon/LMG_LIVE.png'},
              {name: '欧博视讯厅', platform: 'live_casino', id: '37', icon: '/static/cpzj/img/live/icon/AB_LIVE.png'},
              {name: 'SA视讯厅', platform: 'live_casino', id: '40', icon: '/static/cpzj/img/live/icon/SA_LIVE.png'}
            ]
          },
          {name: '棋牌游戏', link: '/home/qipai', hot: true, en: 'CHESS'},
          {
            name: '体育赛事', link: '/home/tiyu', hot: true, en: 'SPORT', sub: [
              {
                name: '皇冠体育',
                path: '/home/tiyu',
                id: '21',
                icon: '/static/cpzj/img/home/tiyu-icon/SX_SPORT.png'
              },
              {
                name: '沙巴体育',
                path: '/home/tiyu',
                id: '20',
                icon: '/static/cpzj/img/home/tiyu-icon/SB_SPORT.png'
              },
              {
                name: 'BBIN体育',
                path: '/home/tiyu',
                id: '41',
                icon: '/static/cpzj/img/home/tiyu-icon/BBIN_SPORT.png'
              },
              {
                name: 'AG体育',
                path: '/home/tiyu',
                id: '22',
                icon: '/static/cpzj/img/home/tiyu-icon/AG_SPORT.png'
              }
            ]
          },
          {name: '电子游艺', link: '/home/games', hot: true, en: 'GAME'},
          {name: '捕鱼达人', link: '/home/buyu', en: 'FISHING'},
          {name: '优惠活动', link: '/home/youhui', en: 'ACTIVITY'},
          {name: '在线客服', link: 'kefu', en: 'SERVICE'}
        ]
      }
    },
    methods: {
      goHome () {
        this.$router.push('/home')
        this.$store.commit('hsyl/setNav', 0)
      },
      toggleNav (i, link) {
        if (link == 'kefu') {
          // let url = JSON.parse(localStorage.getItem("config")).service[0].url;
          window.open(
            'https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=918069&configID=41399&jid=3557231003&s=1'
          )
          return false
        }
        if (link == '/plays/hall') {
          window.open('#/plays/hall')
          return false
        }

        this.$store.commit('hsyl/setNav', i)
        if (i == 1 || i == 2) {
          this.$router.push({
            path: link,
            query: {
              id: i
            }
          })
          return false
        }

        this.$router.push(link)
      },
      goThirdParty (item) {
        // 彩票跳转
        if (item.path && item.path.includes('/plays/tradition')) {
          window.open(this.$router.resolve(item.path).href)
          return false
        }
        // 第三方体育跳转
        if (item.id) {
          this.getItemId(item)
        }
      }
    },
    computed: {
      navActive () {
        return this.$store.state.hsyl.navActive
      }
    },
    store
  }
</script>

<style type="text/less" lang="less" scoped>
  .clear-fix {
    content: '';
    display: table;
    clear: both;
    zoom: 1;
  }

  .nav {
    background-color: #f13131;
    height: 46px;
    .nav-main {
      width: 1000px;
      margin: 0 auto;
      > li {
        width: 110px;
        height: 46px;
        float: left;
        color: white;
        position: relative;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        > p {
          text-align: center;
          line-height: 46px;
          cursor: pointer;
        }
        .hot {
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 14px;
          background: url("/static/cpzj/img/hot_new.gif") no-repeat;
        }
        &:hover {
          .nav-children {
            display: block;
          }
        }
        .nav-children {
          display: none;
          position: absolute;
          top: 52px;
          left: -110px;
          z-index: 1000;
          padding: 30px;
          width: 460px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.8);
          box-shadow: 0 -2px 20px 0 #3c3c3c;
          > li {
            margin: 5px;
            width: 90px;
            float: left;
            border-radius: 4px;
            position: relative;
            > div {
              width: 80px;
              height: 80px;
              margin: 0 auto;
              background-image: url("/static/cpzj/img/game-icon-bg.png");
              background-size: 100% 100%;
              > img {
                width: 60px;
                margin: 10px;
              }
            }
            > p {
              padding: 5px;
              font-size: 12px;
              text-align: center;
            }
            > .hot {
              position: absolute;
              top: 0;
              right: 0;
            }
            &:hover {
              background-color: rgba(255, 255, 255, 0.5);
            }
          }
          &:after {
            content: '';
            display: block;
            top: -20px;
            left: 155px;
            width: 0;
            height: 0;
            position: absolute;
            border: 10px solid transparent;
            border-bottom: 10px solid rgba(0, 0, 0, 0.8);
          }
          &:before {
            content: '';
            display: block;
            top: -6px;
            left: 110px;
            width: 110px;
            height: 6px;
            border-radius: 4px;
            position: absolute;
          }
        }
      }
      .nav-active, li:hover {
        background-color: #bd2626;
      }
    }
  }
</style>
