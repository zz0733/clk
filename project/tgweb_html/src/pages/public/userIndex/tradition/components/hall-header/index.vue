<template>
  <div>
    <header class="vp-header-content bg-color ">
      <nav class="vp-header-content-nav">
        <ul class="vp-header-content-ul">
          <li class="logo" @click="toRouter('/')"><img src="../../../../../../assets/img/public/image/klk/logo1.png"
                                                       alt=""></li>
          <li class="login" v-if="!userinfo">
            <div class="person" id="picture" @click="tryPlay">
              <div class="register">试玩</div>
            </div>
            <div class="person" id="picture" @click="toRouter('/admin/register')">
              <div class="register">注册</div>
            </div>
            <div class="person" @click="toLogin">
              <div class="register">登录</div>
            </div>
          </li>
          <li class="userinfo" v-if="userinfo">
            <span v-if="guest" class="register" @click="toRouter('/admin/register')">注册</span>
            <span v-if="guest">游客</span>
            <!-- {{userinfo&&userinfo.userName}}, -->
            余额:{{this.$store.state.mainState.balance||userinfo.balance}}
            <span class="exit" @click="exit">退出</span>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script>
  import { _SetPost } from '@/service/public/service.js'
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'

  export default {
    data () {
      return {
        ifToggle: true,
        guest: JSON.parse(localStorage.guest)
      }
    },
    methods: {
      changeGuestStatu (flag) {
        localStorage.guest = flag
        this.guest = JSON.parse(localStorage.guest)
      },
      toLogin () {
        this.$router.push('/admin/login')
        this.changeGuestStatu(false)
      },
      toRouter (router) {
        // this.$router.back(-1);
        this.$router.push({
          path: router
        })
      },
      // noHomeIcoCli(){
      //     this.ifToggle=-this.ifToggle;
      // },
      // homeIcoCli(){
      //     this.$emit('header-say')
      // },
      exit () {
        UserService.logout.call(this)
        this.changeGuestStatu(false)
      },
      async tryPlay () {
        let res = await this.$http.post('/api/test/registerTest', {})
        if (res && res.code == 200) {
          this.changeGuestStatu(true)
          UserService.setCache(res, 'test')
          this.$toast.success('登录试玩成功')
          setTimeout(() => {
            window.location.reload()
          }, 500)
        } else {

        }
      }
    },
    watch: {},
    created: function () {},
    mounted () {},
    components: {},
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      }
    },
    store
  }
</script>

<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";

  .vp-header-content {
    width: 100%;
    // background: @main-color;
    &-nav {
      ul {
        height: 0.88rem;
        padding: 0.16rem 0.25rem 0 0.25rem;
        li {
          display: inline-block;
        }
        .logo {
          text-align: left;
          img {
            width: 2rem;
            position: absolute;
            top: 0.15rem;
            left: 5px;
          }
        }
        .login {
          float: right;
          color: #fff;
          font-size: 0.32rem;
          text-align: right;
          .person {
            float: left;
            text-align: center;
            .pic {
              height: 0.35rem;
            }
            .register {
              color: #fff;
              font-weight: 600;
              line-height: 0.64rem;
              font-size: 0.34rem;
            }
          }
          #picture {
            margin-right: 0.3rem;
          }
        }
        .userinfo {
          float: right;
          color: #fff;
          font-size: 0.32rem;
          line-height: 0.64rem;
          text-align: right;
        }
      }
    }
  }
</style>
