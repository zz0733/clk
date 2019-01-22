// vuex配置模块
import Vue from 'vue';
import Vuex from 'vuex';
import mainState from './mainState.js';
import personal from './personal'
Vue.use(Vuex);


const store = new Vuex.Store({
  modules:{
    mainState:mainState,
    personal:personal
  }
}) 

export default store
