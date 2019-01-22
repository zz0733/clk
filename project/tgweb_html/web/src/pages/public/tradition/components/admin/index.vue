<template>
  <div class="vp-admin-wrap">
    <div class="vp-admin-wrap-close" @click="close">
      <div class="vp-admin-wrap-close-empty">
        <a></a>
      </div>
    </div>
    <vp-lgion v-if="modal=='用户登录'"></vp-lgion>
    <vp-register v-if="modal=='用户注册'"></vp-register>
  </div>
</template>


<script>
  import vpLgion from './login'
  import vpRegister from './register'
  import store from '@/vuex/store'

  export default {
    data () {
      return {}
    },
    methods: {
      close () {
        this.$store.commit('alert/showLogin', false)
        this.$store.commit('alert/setChooseModel', '用户登录')
      }
    },
    computed: {
      modal () {
        return this.$store.state.alert.login.chooseModel
      }
    },
    components: {
      vpLgion,
      vpRegister
    },
    store
  }
</script>
<style lang="less" scoped>
  .vp-admin-wrap-close {
    position: absolute;
    top: 15px;
    right: 0px;
    cursor: pointer;
    width: 60px;
    height: 40px;
    background: #F2F2F2;
    border-bottom-left-radius: 16px;
    border-top-left-radius: 16px;
    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      a {
        position: absolute;
        top: 6px;
        left: 5px;
        width: 26px;
        height: 26px;
        display: inline-block;
        background: url('/static/public/image/common/vp-common-close.png') #fff;
        background-size: 98% 98%;
      }
    }
  }
</style>
