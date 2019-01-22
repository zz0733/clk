<template>
  <div class="main">
    <div class="header-nav">
      <div class="header-nav-body clear-fix">
        <span>您好,欢迎来到彩票之家</span>
        <span>{{time}}</span>
        <nav class="nav">
          <ul class="clear-fix">
            <li><a target="_blank" :href="links.navLink">网址导航</a></li>
            <li><a target="_blank" href="javascript: void(0)" @click="addFavorite('500彩票')">添加收藏</a></li>
            <li><a target="_blank" :href="links.kefu">在线客服</a></li>
            <li><a target="_blank" href="/m">手机版</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header-main clear-fix">
      <a href="javascript: void(0)" @click="$router.push('/')">
        <img class="logo" src="/static/cpzj/img/logo.png"/>
      </a>
      <div class="header-image"></div>
      <!-- 登录前 -->
      <div class="login-before clear-fix" v-if="!userinfo">
        <div class="form-input">
          <div class="row clear-fix">
            <input class="header-input" type="text" autocomplete="off" placeholder="用户名" v-model="passKey.userName"
                   @blur="getCode"></input>
            <input class="header-input" maxlength="20" autocomplete="off" type="password" placeholder="密码"
                   v-model="passKey.password"></input>
            <button class="header-button" @click="login">登录</button>
          </div>
          <div class="row clear-fix">
            <input class="header-input w-100" size="mini" autocomplete="off" placeholder="验证码" maxlength="4" type="text"
                   v-model="passKey.code"></input>
            <img class="auth-image" :src="codeImg" alt="" @click="getCode">
            <button class="header-button" @click="register">注册</button>
            <a class="forget_pwd" onclick="alert('忘记账号，请联系在线客服人员取回！');" href="javascript:void(0)">忘记密码?</a>
            <button class="header-button" @click="loginTest">试玩</button>
          </div>
        </div>
      </div>
      <!-- 登录后 -->
      <div class="login-after" v-if="userinfo">
        <div class="row">
          <span>用户账号</span>：<span>{{userinfo.userName}}</span>
        </div>
        <div class="row">
          <a href="javascript: void(0)" @click="goUserCen('personage',1)">投注记录</a>
          &nbsp;&nbsp;
          <span>余额</span>：<span>{{userinfo ? userinfo.balance : ''}}</span>
          <span :class="'fa fa-fw fa-refresh ' + (balanceRefreshing?'fa-spin':'')" @click="getBalance"></span>
        </div>
        <div class="row">
          <a href="javascript: void(0)" @click="goUserCen('personage',0)">会员中心</a>
          &nbsp;&nbsp;
          <a href="javascript: void(0)" @click="goUserCen('recharge',0)">存款</a>
          &nbsp;&nbsp;
          <a href="javascript: void(0)" @click="goUserCen('withdraw',0)">取款</a>
          &nbsp;&nbsp;
          <a href="javascript: void(0)" @click="logout">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        passKey: {},
        codeImg: '/static/cpzj/img/code.jpg',
        time: this.getHMS(new Date()),
        balanceRefreshing: false,
        links: {
          kefu: 'https://gzz833.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=83359&configID=41292&jid=9582045656&s=1',
          navLink: 'https://6668611.com/',
        }
      }
    },
    methods: {
      /**
       * 收藏本站
       * @param title
       */
      addFavorite (title) {
        var url = 'http://' + location.hostname + '/'
        try {
          window.external.addFavorite(url, title)
        }
        catch (e) {
          try {
            window.sidebar.addPanel(title, url, '')
          }
          catch (e) {
            alert('抱歉，您所使用的浏览器无法完成此操作。\n加入收藏失败，电脑请使用Ctrl+D进行添加')
          }
        }
      },
      getCode () {
        if (!this.passKey.userName) {
          // alert("请务必输入6位账号");
          return false
        }
        if (this.passKey.userName.length < 5) {
          // alert("请务必输入6位账号");
          return false
        }

        this.$http.post(`${this.$HOST_NAME}/captcha`, {
          userName: this.passKey.userName
        }).then(res => {
          if (res.code === 200) {
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
      login () {
        if (!this.validateAccountLogin(this.passKey.userName)) {
          alert('请输入5-20位数字或字母组成的账号')
          return false
        }
        if (!this.validateAccountLogin(this.passKey.password)) {
          alert('请输入5-20位数字或字母组成的密码')
          return false
        }
        if (this.passKey.code === '') {
          alert('验证码请务必输入')
          return false
        }
        if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
          alert('请输入4位验证码')
          return false
        }

        this.$http.post(`${this.$HOST_NAME}/login`, this.passKey).then(res => {
          if (res.code === 200) {
            this.$router.push({
              name: 'clause'
            })
            UserService.setCache(res, 'v1', 'login')
          } else {
            alert(res.message)
          }
        })
      },
      loginTest () {
        this.$http.post(`/api/test/registerTest`, {}).then(res => {
          if (res.code === 200) {
            UserService.setCache(res, 'test')
            window.location.reload()
          }
        })
      },
      logout () {
        UserService.logout.call(this)
      },
      getBalance () {
        this.balanceRefreshing = true
        this.$http.post(`${this.$HOST_NAME}/member/getBalance`).then(res => {
          if (res.code === 200) {
            this.balanceRefreshing = false
            let userinfo = JSON.parse(localStorage.userinfo)
            userinfo.balance = res.data
            this.$store.commit('mainState/reloadUserinfo', userinfo)
          }
        })
      },
      goUserCen (name, num) {
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
      register () {
        this.$store.commit('cpzj/showRegister', true)
      }
    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      }
    },
    created () {
      setInterval(() => {
        this.time = this.getTimes(new Date())
      }, 1000)

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          if (!localStorage.userinfo) {
            let timer = setInterval(() => {
              if (localStorage.userinfo) {
                clearInterval(timer)
                window.location.reload()
              }
            }, 1000)
          }
        }
      })
    },
    store
  }
</script>

<style type="text/less" lang="less" scoped>
  .row:after, .clear-fix {
    content: '';
    display: table;
    clear: both;
    zoom: 1;
  }

  .main {
    .header-nav {
      line-height: 30px;
      background-color: #f5f5f5;
      .header-nav-body {
        width: 1000px;
        margin: 0 auto;
        font-size: 12px;
        .nav {
          float: right;
          ul {
            li {
              float: right;
              a {
                color: #5e5e5e;
              }
              a:hover {
                color: #f13131;
              }
            }
            li:after {
              content: '|';
              padding: 0 5px;
            }
            li:first-child::after {
              content: '';
              padding: unset;
            }
          }
        }
      }
    }
    .header-main {
      width: 1000px;
      height: 99px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      a {
        float: left;
        .logo {
          height: 99px;
        }
      }
      .header-image {
        float: left;
        width: 240px;
        height: 87px;
        background-size: 100% 100%;
        background: url("/static/cpzj/img/header-img.png") no-repeat;
      }
      .login-before, .login-after {
        width: 420px;
        height: 99px;
        padding: 15px;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        .row {
          position: relative;
          margin-bottom: 15px;
          white-space: nowrap;
        }
      }
      .login-before {
        .form-input {
          .header-input, .header-button {
            float: left;
            height: 20px;
            padding: 4px 14px;
            line-height: 20px;
            border-radius: 15px;
            box-sizing: content-box;
            margin-right: 10px;
            border: none;
            font-size: 14px;
            outline: none;
            &:last-child {
              margin-right: 0;
            }
          }
          .header-input {
            width: 120px;
            border: 1px solid #999999;
            &.w-100 {
              width: 70px;
            }
            &:hover, &:focus {
              border: 1px solid #f13131;
              box-shadow: 0 0 3px 0 #f13131;
            }
          }
          .header-button {
            width: 40px;
            color: #444444;
            background-color: #D4D4D4;
            &:hover {
              color: white;
              background-color: #f13131;
            }
          }
          .auth-image {
            float: left;
            margin-top: 2px;
            height: 26px;
            width: 57px;
            margin-right: 10px;
          }
          .forget_pwd {
            float: left;
            line-height: 30px;
            margin-right: 10px;
            font-size: 12px;
            color: #999999;
            &:hover {
              color: #f13131;
            }
          }
        }
        .form-button {
          width: 60px;
          position: absolute;
          right: 0;
          top: 10px;
        }
      }
      .login-after {
        .row {
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }
</style>

