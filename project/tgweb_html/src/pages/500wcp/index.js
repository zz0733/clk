import 'babel-polyfill'
import Vue from 'vue'
import Cube from 'cube-ui'
import klkApp from './App'
import router from './router'
import '@/service/public/service'
import '@/service/public/url/url'//优先配置url
import util from '@/service/public/util'
import FastClick from 'fastclick'
import store from '@/vuex/store'

import Stomp from 'stompjs'

import Vant from 'vant'

import '@/assets/iconfont/public/iconfont.css'
import 'vant/lib/index.css'
import animated from 'animate.css'

import 'reset.css'
import '@/assets/less/public/base.less'
import '@/assets/less/public/lottery.less'
import '@/assets/less/public/personal.less'

// 时间搓转换
import moment from 'moment'

Vue.prototype.$moment = moment
import toast from '@/service/public/toast/toast.js'

Vue.use(toast)
import Loading from '@/service/public/loading/loading.js'

Vue.use(Loading)
import Loading2 from '@/service/public/loading/loading2.js'

Vue.use(Loading2)
import Loading3 from '@/service/public/loading/loading3.js'

Vue.use(Loading3)
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
import Vuerify from 'vuerify'

Vue.use(Vuerify)

import { Toast, Field, Dialog, Lazyload } from 'vant'

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.use(Lazyload, {})
Vue.use(Field)

Vue.use(Cube)
Vue.use(Vant)
Vue.use(animated)
Vue.use(util)

//点击延迟处理
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
// 路由守卫
router.beforeEach((to, form, next) => {

  if (to.path == '/personal_index/get_money') {
    if (localStorage.Public_User == 'test') {
      Vue.prototype.$newToast('试玩用户无权限，请注册正式用户')
      return false
    } else {
      if (store.state.mainState.userinfo.cardNum === 'noset') {
        Vue.prototype.$newToast('提款前请先设置银行卡信息')
        next('/personal_index/set_bank')
        return false
      }
    }
  }
  if (to.path == '/personal_index/honest' || to.path == '/personal/trading_record' || to.path == '/personal_index/bank_account' || to.path == '/personal_index/pay_money') {
    if (localStorage.Public_User == 'test') {
      Vue.prototype.$newToast('试玩用户无权限，请注册正式用户')
      return false
    }
  }
  if (to.path == '/personal_index/update_pwd/0') {
    if (!store.state.mainState.userinfo.secret) {
      Vue.prototype.$newToast('修改密码前请先设置密保')
      next('/personal_index/mibao')
      return false
    }
  }
  if (to.path == '/personal_index/update_pwd/1') {
    if (!store.state.mainState.userinfo.secret) {
      Vue.prototype.$newToast('修改资金密码前请先设置密保')
      next('/personal_index/mibao')
      return false
    }
  }
  next()
})
// 滚回顶部
router.afterEach((to, from, next) => {
  setTimeout(() => {
    document.documentElement.scrollTop = 0
  }, 500)

})
//用于兼容IE10 11等
import promise from 'es6-promise'

promise.polyfill()
window.router = router
Vue.config.productionTip = false
new Vue({
  el: '#klkApp',
  router,
  render: h => h(klkApp),
  created () {

  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        document.title = '客拉客'
      }, 200)
    })
  }
})



