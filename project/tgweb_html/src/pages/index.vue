<template>
  <div>
    <!-- 个人中心
    <div v-if="$route.path.includes('/personal')">
       <vp-header></vp-header>
       <router-view></router-view>
       <vp-footer></vp-footer>
    </div> -->
    <!-- 传统彩票 -->
    <div class="content">
      <!-- <vp-header></vp-header> -->
      <div class="content-view">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>


    <!-- 彩票规则 -->
    <!-- <div  v-if="$route.path.includes('/rules')">
        <vp-header></vp-header>
        <div class="content-view-rules">
           <router-view></router-view>
        </div>
        <vp-footer></vp-footer>
    </div>  -->
    <!-- 开奖走势-->
    <!-- <div  v-if="$route.path.includes('/trend')">
        <vp-header></vp-header>
        <div class="content-view-trend">
           <router-view></router-view>
        </div>
        <vp-footer></vp-footer>
    </div>          -->
  </div>

</template>
<script>
  import UserService from '@/service/public/UserService.js'
  import vpPubFooter from '@/pages/public/common/Footer'

  export default {
    name: 'index',
    data () {
      return {}
    },
    watch: {
      $route () {}
    },
    methods: {},
    created () {
    },

    computed: {},
    mounted () {
      alert()
    },
    components: {
      vpPubFooter
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../../../assets/less/public/var.less";

  .content {
    height: 100%;
    .content-view {
      height: 100%;
      // background-color: #fff;
    }
  }

  // .content-view-rules{
  //     width: @base-width;
  //     min-width:@base-width ;
  //     min-height: 600px;
  //     margin: 0 auto;
  //     padding-top: 20px;
  // }
  // .content-view-trend{
  //      width: @base-width;
  //     min-width:@base-width ;
  //     min-height: 600px;
  //     margin: 0 auto;
  //     padding-top: 20px;
  //     background: #fff;
  // }
</style>
