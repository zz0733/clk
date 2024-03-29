// vuex配置模块
import Vue from 'vue'
import Vuex from 'vuex'
import mainState from './public/mainState'
import alert from './public/alert.js'
import lottery from './public/lottery'
import hsyl from './hsyl/hsyl'
import wbw from './wbw/wbw'
import personal from './personal.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mainState: mainState,
    alert: alert,
    lottery: lottery,
    hsyl: hsyl,
    wbw,
    personal: personal
  }
})

export default store
