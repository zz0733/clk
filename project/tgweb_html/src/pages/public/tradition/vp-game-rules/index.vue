<template>
  <div>
    <div class="vp-lottery-rules-wrap">
      <div class="vp-lottery-rules-side">
        <div class="rules-side-header">彩票规则</div>
        <ul class="rules-ul">
          <li @click="sideSelectFc(item)" :class="{'active':item.title==sideSelect}" v-for="(item,index) in sideNav"
              :key=index>
            <a>{{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="vp-lottery-rules-container">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        sideNav: [
          {title: '体育赛事', router: '/rules/gameReport'},
          {title: '时时彩', router: '/rules/shishicai'},
          {title: ' 六合彩', router: '/rules/liuhecai'},
          {title: 'PC蛋蛋', router: '/rules/pcdandan'},
          {title: '快3', router: '/rules/kuaisan'},
          {title: '11选5', router: '/rules/eleven'},
          {title: 'PK10', router: '/rules/pk10'},
          {title: '快乐十分', router: '/rules/kuaile'},
          {title: '低频彩', router: '/rules/dipin'}
        ],
        sideSelect: ''
      }
    },

    methods: {
      sideSelectFc (item) {
        this.sideSelect = item.title
        this.$router.push({
          path: item.router
        })
      }
    },
    watch: {
      $route () {

      }
    },
    created () {
      document.querySelector('body').style.background = '#F4F4F4'
      this.sideSelect = this.$route.meta.name
    },
    beforeDestroy () {
      this.$loading(false)
    },
    computed: {},
    mounted () {
    },
    beforeDestroy () {
      document.querySelector('body').style.background = '#F9F9F9'
    },
    components: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .vp-lottery-rules-wrap {
    display: flex;
    align-items: stretch;
  }

  .vp-lottery-rules-side {
    width: 300px;
    min-height: 900px;
    margin-right: 30px;
    background-color: #fff;
    .rules-side-header {
      height: 80px;
      padding-left: 47px;
      background: #FAFAFA;
      line-height: 80px;
      color: #666666;
      font-size: 24px;
      border-bottom: 0;
    }
    .rules-ul {
      width: 100%;
      height: 300px;
      li {
        height: 60px;
        line-height: 60px;
        width: 100%;
        font-size: 18px;
        color: #666;
        padding-left: 70px;
        border-left: 5px solid #fff;
        cursor: pointer;
        a {
          color: #666;
        }
        &:hover {
          color: #FF6600;
          border-left: 5px solid #FF6600;
        }
        &.active {
          background: #FF6600;
          border-left: 5px solid #FF6600;
          a {
            color: #Fff;
          }
        }
      }
    }
  }

  .vp-lottery-rules-container {
    width: 1015px;
    min-height: 900px;
    background: #fff;

  }
</style>
