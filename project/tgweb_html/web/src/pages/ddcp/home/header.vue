<template>
  <div class="w-header">
    <!-- 头部顶部 -->
    <div class="header-top">
      <div class="container-top">
        <div class="linkbar clearfix">
          <div class="snavAll">
            Hi，欢迎来到NN500彩票网，祝您中大奖!
          </div>
          <div class="link fr">
            <ul class="clearfix">
              <li><a href="javascript:;" @click="tryPlay">免费试玩</a></li>
              <!-- <li><a href="#/home/contactUs?p_id=1" class="red">备用网址</a></li> -->
              <li><a href="/static/ddcp/html/download/index.html">手机APP下载</a></li>
              <li><a href="javascript:alert('加入收藏失败，请使用Ctrl+D进行添加');">加入收藏</a></li>
              <li><a href="https://kjzb.com/dns" target="_bank">防劫持教程</a></li>
            </ul>
          </div>
        </div>

        <div class="loginBox">
          <!-- logo -->
          <h3 class="logo">
            <router-link to="/home" class="router-link-exact-active curr">
              <img src="/static/ddcp/img/logo.png">
            </router-link>
            <!--<img src="/static/ddcp/img/slogan.png">-->
          </h3>
          <div class="user">
            <!-- 登录前 -->
            <ul class="snavInfo" v-if="!userinfo">
              <li>
                <input type="text" placeholder="请输入用户名" autocomplete="off" class="userInput" v-model="passKey.userName"
                       @blur="getCode">
              </li>
              <li>
                <input type="password" placeholder="请输入密码" autocomplete="off" class="userInput"
                       v-model="passKey.password">
              </li>
              <li>
                <input type="passwoed" placeholder="验证码" autocomplete="off" class="userInput" v-model="passKey.code">
                <span class="codeyzm" :style="{backgroundImage: 'url(' + codeImg + ')'}" @click="getCode"></span>
              </li>
              <li>
                <button @click="login">登陆</button>
                <button @click="$router.push({name:'register'})">注册</button>
              </li>

            </ul>

            <ul class="snavInfo" v-else>
              <li>欢迎您，{{userinfo.userName}}</li>
              <li>余额：
                <span v-if="balanceShow">{{userinfo&&userinfo.balance}}<span @click="balanceShow=false"
                                                                             style="padding-left: 8px;">隐藏</span></span>
                <span v-else>已隐藏<span @click="balanceShow=true" style="padding-left: 8px;">显示</span></span>
              </li>
              <li @click="goUserCen('recharge',0)"><span>充值</span></li>
              <li @click="goUserCen('withdraw',0)"><span>提现</span></li>
              <li @click="logout"><span>退出</span></li>
              <li>
                <a class="ServiceBtn"
                   href="https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=918068&configID=41397&jid=8004026909&s=1"
                   target="_blank"></a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!-- 导航栏 -->
    <div class="nav">
      <div class="container clearfix">
        <div class="hotGame fl">
          <div class="txt" style="text-align: center;">热门游戏</div>
          <div class="subNav">
            <div class="officialGames fl">
              <h3>购彩大厅<span>传</span></h3>
              <div class="subWrapper clearfix">
                <div class="sub fl" v-for="(game,i) in hotGames.officialGames" :key="i">
                  <a :href="game.router" target="_blank">
                    <div style="text-align: center;"><img :src="game.name|capitalize" alt=""></div>
                    <div class="cpname">{{game.name}}</div>
                  </a>
                </div>
              </div>
            </div>
            <div class="creditGames fr" v-show="false">
              <h3>用玩法<span>信</span></h3>
              <div class="subWrapper clearfix">
                <div class="sub fl" v-for="(game,i) in hotGames.creditGames" :key="i">
                  <img :src="game.icon" alt="">
                  <span>{{game.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="clearfix fr">
          <div class="shadow" ref="shadow"></div>
          <li v-for="(nav,i) in navList" :key="i" :ref="'item'+i" class="item" :class="{navActive:navActive ==i}"
              @click.stop="toggleNav(i,nav.router)">
            <i class="hot" v-if="nav.hot"></i>
            <div class="icon">
              <i :class="nav.icon"></i>
            </div>
            <div class="name">{{nav.name}}</div>
            <div class="sub-nav clearfix" v-if="nav.child">
              <div class="sub" v-for="(subitem,i) in nav.child" :key="i"
                   @click.stop="goThirdParty(subitem,nav.platform)">
                <span>{{subitem.name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'
  import data from '../../public/games/public.js'

  export default {
    mixins: [data],
    data () {
      return {
        passKey: {
          userName: '',
          password: '',
          code: ''
        },
        codeImg: '/static/ddcp/img/code.jpg',
        balanceShow: false,
        hotGames: {
          officialGames: []
        },
        navList: [{
          name: '网站首页',
          icon: 'fa-home',
          router: '/home'
        },
          {
            name: '购彩大厅',
            icon: 'Home',
            router: '/plays/hall'
          },
          {
            name: '棋牌游戏',
            icon: 'Home',
            router: '/home/qipai',
            hot: true
          },
          {
            name: '真人视讯',
            icon: 'Home',
            platform: 'live_casino',
            router: '/home/live',
            child: [{
              name: 'AG视讯',
              id: '14'
            },
              {
                name: 'BBIN视讯',
                id: '15'
              },
              {
                name: 'BG视讯',
                id: '44'
              },
              {
                name: 'DG视讯',
                id: '33'
              },
              {
                name: 'DS视讯',
                id: '16'
              },
              {
                name: 'LEBO视讯',
                id: '35'
              },
              {
                name: 'OG视讯',
                id: '39'
              },
              {
                name: 'eBET视讯',
                id: '34'
              },
              {
                name: 'LMG视讯',
                id: '36'
              },
              {
                name: '欧博视讯',
                id: '37'
              },
              {
                name: 'SA视讯',
                id: '40'
              }
            ]
          },
          {
            name: '体育投注',
            icon: 'Sports',
            platform: 'sport',
            router: '/home/sport',
            child: [{
              name: '皇冠体育',
              id: 21
            },
              {
                name: '沙巴体育',
                id: 20
              },
              {
                name: 'BBIN体育',
                id: 41
              },
              {
                name: 'AG体育',
                id: 22
              }
            ]
          },
          {
            name: '电子游艺',
            icon: 'Home',
            router: '/home/games?id=26'
          },
          {
            name: '捕鱼达人',
            icon: 'Home',
            router: '/home/buyu',
            hot: true
          },
          {
            name: '优惠活动',
            router: '/home/youhui',
            hot: true
          },
          {
            name: '在线客服',
            icon: 'Home',
            router: '/kefu'
          }
        ]
      }
    },
    methods: {
      toggleNav (i, link) {
        if (link == '/kefu') {
          window.open(
            'https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=918068&configID=41397&jid=8004026909&s=1'
          )
          return false
        }
        if (link == '/plays/hall') {
          window.open('#/plays/hall')
          return false
        }
        if (link == '/plays/tradition/1') {
          window.open('#/plays/tradition/1')
          return false
        }
        if (link == '/qipai') {
          this.trustLogin(item)
          return false
        }
        this.$store.commit('hsyl/setNav', i)
        this.$router.push(link)
      },
      goThirdParty (item) {
        // 第三方跳转
        if (item.id) {
          this.getItemId(item)
        }
      },
      login () {
        if (!this.validateAccountLogin(this.passKey.userName)) {
          alert('请输入5-20位数字或字母组成的账号')
          return false
        }
        if (!this.validateAccountLogin(this.passKey.password)) {
          alert('请输入5-20位数字或字母组成的密码')
          return false
        }
        if (!this.passKey.code) {
          alert('验证码请务必输入')
          return false
        }
        if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
          alert('请输入4位验证码')
          return false
        }

        this.$http.post(`${this.$HOST_NAME}/login`, this.passKey).then(res => {
          if (res.code == 200) {
            this.$http
              .post(`${this.$HOST_NAME}/member/refundInfo`)
              .then(res => {
                let refund = res.data.platform
                localStorage.setItem('refund', JSON.stringify(refund))
              })
              .then(res => {
                this.$router.push({
                  name: 'clause'
                })
              })
            UserService.setCache(res, 'v1', 'login')
          } else {
            alert(res.message)
          }
        })
      },
      getCode () {
        if (!this.passKey.userName) {
          alert('请输入账号！')
          return false
        }
        this.$http
          .post(`${this.$HOST_NAME}/captcha`, {
            userName: this.passKey.userName
          })
          .then(res => {
            if (res.code == 200) {
              this.codeImg = res.data.captcha_image_text
              this.passKey.captcha_key = res.data.captcha_key
            } else {
              this.$store.commit('alert/showTipModel', {
                bool: true,
                title: res.message,
                model: 'warn'
              })
            }
          })
      },
      logout () {
        UserService.logout.call(this)
      },
      getBalance () {
        this.refreshS = true
        this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo)
            userinfo.balance = res.data
            this.$store.commit('mainState/reloadUserinfo', userinfo)
            this.refreshS = false
            alert('刷新余额成功')
          } else {
            alert('服务器报错')
          }
        })
      },
      goUserCen (name, num) {
        if (!localStorage.userinfo) {
          this.$router.push('/home/login')
          return false
        }
        //name的类型有 ：  recharge （充值）  personage （个人资料）
        //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
        this.$store.commit('showPersonal', {
          bool: true
        })
        this.$store.commit('showContent', {
          parent: name
        })
        this.$store.commit('showNav', {
          child: num
        })
      },
      async tryPlay () {
        let res = await this.$http.post('/api/test/registerTest', {})
        if (res && res.code == 200) {
          UserService.setCache(res, 'test')

          this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
            let platform = res.data.platform
            let alias = res.data.alias
            let keys = Object.keys(platform)
            let refund = []
            keys.forEach((v, i) => {
              refund[i] = {}
              refund[i].title = v
              refund[i].list = []
              platform[v].forEach((a, j) => {
                refund[i].list[j] = {}
                refund[i].list[j].key = Object.keys(a)[0]
                refund[i].list[j].refund = Object.values(a)[0]
                refund[i].list[j].name = alias[refund[i].list[j].key]
              })
            })
            localStorage.setItem('refund', JSON.stringify(refund))
          })
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      },
      getLeftMenu () {
        this.$http.post(`${this.$HOST_NAME}/games/lottery/leftMenu`, {
          prePage: 34
        }).then(res => {
          if (res && res.code == 200) {
            res.data.forEach(item => {
              item.id ? item.router = `#/plays/tradition/${item.id}` : ''
            })
            this.hotGames.officialGames = res.data
          }
        })
      }
    },
    created () {
      //  this.$nextTick(()=>{
      this.getLeftMenu()
      //  })

    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      },
      navActive () {
        return this.$store.state.hsyl.navActive
      }
    },
    store,
    filters: {
      capitalize: function (value) {
        try {
          return `/static/public/image/lottery/ico/vp-${value}.png`
        } catch (err) {
          return `/static/public/image/lottery/ico/vp-changwan-ico.png`
        }

      }
    },
  }
</script>

<style lang="less" scoped>
  .w-header {
    .clear:before,
    .clear:after {
      content: "";
      display: table;
    }
    .clear:after {
      clear: both;
    }
    .clear {
      *zoom: 1;
    }
    .sports {
      .sportsShow {
        display: none;
        width: 400px !important;
        left: -125px;
      }
      &:hover {
        .sportsShow {
          display: block;
        }
      }
    }
    .container-top {
      width: 1000px;
      margin: 0 auto;
    }
    .container {
      width: 1000px;
      margin: 0 auto;
    }
    .header-top {
      background: #f8f8f8;
      border-bottom: 1px solid #e8e8e8;
      .linkbar {
        height: 32px;
        line-height: 32px;
        .snavAll {
          float: left;
          padding-right: 20px;
          color: #666;
          font-size: 12px;
        }
        .link {
          li {
            float: left;
            padding: 0 8px;
            a {
              color: #666;
              font-size: 12px;
            }
            a.red {
              color: #e4393c;
              font-weight: bold;
            }
            a:hover {
              color: #e4393c;
            }
          }
        }
      }
      .loginBox {
        height: 85px;
        line-height: 85px;
        h3.logo {
          float: left;
          padding: 0;
          margin: 0;
          margin-right: 10px;
          line-height: 0;
          img {
            margin-top: 15px;
          }
          .curr {
            img {
              width: 200px;
            }
          }
        }
        .user {
          float: right;
          line-height: inherit;
          .snavInfo {
            li {
              display: inline-block;
              cursor: pointer;
              color: #666;
              font-size: 12px;
              position: relative;
            }
            input {
              width: 120px;
              font-size: 14px;
              height: 36px;
              text-indent: 6px;
              outline: none;
              border: 1px solid #939cf6;
              margin-right: 10px;
              vertical-align: middle;
            }
            .codeyzm {
              width: 60px;
              height: 30px;
              padding-left: 10px;
              position: absolute;
              top: 28px;
              left: 58px;
              background-size: 100% 100%;
            }
            span:hover {
              color: #e4393c;
            }
            button {
              height: 36px;
              line-height: 36px;
              border: none;
              width: 80px;
              color: #fff;
              background: #e4393c;
              border-radius: 6px;
              cursor: pointer;
              font-size: 12px;
              box-shadow: 2px 2px 2px #b6b6b6;
              outline: none;
              transition: all 0.5s linear;
            }
            button:hover {
              background: #101482;
              font-size: 13px;
            }
            .fenge {
              color: #ccc;
              font-size: 13px;
              padding: 0;
            }
            .ServiceBtn {
              background: url("/static/ddcp/img/home/service.gif");
              color: #e4393c !important;
              display: block;
              background-position: 0 -26px;
              height: 25px;
              width: 87px;
              margin-left: 25px;
            }
          }
        }
      }
    }
    .nav {
      @h: 62px;
      @w: 83px;
      background: #e4393c;
      height: @h;
      line-height: @h;
      .hotGame {
        width: 220px;
        position: relative;
        text-align: right;
        color: #fff;
        cursor: pointer;
        &:hover .subNav {
          display: block;
        }
        .subNav {
          z-index: 6;
          position: absolute;
          left: 41.5px;
          top: 62px;
          padding: 10px;
          background-color: #fff;
          display: none;
          // box-shadow: h-shadow v-shadow blur spread color inset;
          // h-shadow 必需。水平阴影的位置。允许负值。
          // v-shadow 必需。垂直阴影的位置。允许负值。
          // blur 可选。模糊距离。
          // spread 可选。阴影的尺寸。
          // color 可选。阴影的颜色。请参阅 CSS 颜色值。
          // inset 	可选。将外部阴影 (outset) 改为内部阴影。
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
          .officialGames {
          }
          h3 {
            border-bottom: 1px solid #e4393c;
            color: #666;
            text-align: center;
            span {
              padding: 2px 4px;
              background: #f83b3b;
              color: #ffffff;
              margin-left: 10px;
              font-weight: 500;
              border-radius: 4px;
            }
          }
          .subWrapper {
            width: 540px;
            .sub {
              width: 98px;
              height: 100px;
              margin: 5px;
              padding-top: 5px;
              line-height: 18px;
              cursor: pointer;
              &:hover {
                box-shadow: 0px 1px 1px 1px #e4393c;
              }
              img {
                width: 70px;
              }
              .cpname {
                text-align: center;
                color: #666;
                font-size: 13px;
              }
            }
          }
        }
      }
      ul {
        position: relative;
        z-index: 99;
        .shadow {
          position: absolute;
          width: @w;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.2);
          left: 0;
          top: 0;
          display: none;
        }
        li {
          position: relative;
          float: left;
          width: @w;
          height: 60px;
          cursor: pointer;
          text-align: center;
          color: #fff;
          font-size: 14px;
          border-left: 1px solid #de2e31;
          border-right: 1px solid #e85759;
          span.name {
            width: 100%;
            display: inline-block;
            margin-top: 19px;
          }
          .hot {
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 14px;
            background-image: url("/static/ddcp/img/icon/hot.gif");
          }
          &.navActive {
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffc107;
          }
          &:hover {
            .navActive();
          }
          &:hover .sub-nav {
            display: block;
            transform: translateX(-50%);
          }
          .sub-nav {
            z-index: 6;
            position: absolute;
            left: 41.5px;
            top: 60px;
            width: @w;
            background-color: #e4393c;
            display: none;
            .sub {
              text-align: center;
              width: @w;
              height: 40px;
              line-height: 40px;
              color: #fff;
              font-size: 13px;
              // transition: property duration timing-function delay;
              transition: all 0.3s linear;
              &:hover {
                color: #000;
              }
            }
          }
        }
      }
    }
  }
</style>
