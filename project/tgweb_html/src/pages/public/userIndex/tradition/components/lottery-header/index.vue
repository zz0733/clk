<template>
  <div>
    <div class="header bg-color ">
      <div class="left" @click="goback">
        <span class="title">{{title}}</span>
        <span class="fl cubeic-arrow"></span>
      </div>
      <div class="right">
        <div>{{balance?'¥:'+balance:''}}</div>
        <div class="img" @click="toggle">
          <img src="../../../../../../assets/img/public/image/lottery/plays-tradition/m-toggle-list.png" alt="">
        </div>
      </div>
    </div>
    <vp-menu-bar-right :title='title' ref="menubarR"></vp-menu-bar-right>
    <vp-menu-bar-left v-on:child-say="menubarLFc" ref="menubarL"></vp-menu-bar-left>
  </div>

</template>

<script>
  import vpMenuBarRight from '../../components/menuBar-right'
  import vpMenuBarLeft from '../../components/menuBar-left'
  import store from '@/vuex/store'

  export default {
    props: ['title'],
    data () {
      return {}
    },
    methods: {
      goback () {
        this.$refs.menubarL.ifShowFc(true)
        this.$emit('menu-animate-say', !0)
      },
      toggle () {
        this.$refs.menubarR.ifShowFc(true)
      },
      menubarLFc () {
        this.$emit('menu-animate-say', !1)
      }
    },
    computed: {
      balance () {
        return this.$store.state.mainState.balance
      }
    },
    components: {
      vpMenuBarRight,
      vpMenuBarLeft
    },
    store
  }
</script>

<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";

  .header {
    height: 0.88rem;
    //   background: @main-color;
    //   background: linear-gradient(90deg,  #ff8e00,#ff5100);
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    padding: 0 0.18rem;
    .left {
      float: left;
      font-size: 0.36rem;
      .title {
        float: left;
      }
      .fl {
        font-size: 0.46rem;
      }
    }
    .right {
      font-size: 0.36rem;
      float: right;
      div {
        display: inline-block;
      }
      .img {
        margin-left: 16px;
        vertical-align: middle;
        img {
          width: .47rem;
          cursor: pointer;
        }
      }
    }

  }
</style>
