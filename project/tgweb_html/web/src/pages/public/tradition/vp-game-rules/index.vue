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
          // {title:"体育赛事",router:'/rules/gameReport',id:'999'},
          {title: '时时彩', router: '/rules/ssc', id: '4'},
          {title: ' 六合彩', router: '/rules/lhc', id: '1'},
          {title: 'PC蛋蛋', router: '/rules/pcdd', id: '10'},
          {title: '快3', router: '/rules/k3', id: '9'},
          {title: '11选5', router: '/rules/cp11x5', id: '24'},
          {title: 'PK10', router: '/rules/pk10', id: '12'},
          {title: '快乐十分', router: '/rules/klsf', id: '5'},
          {title: '低频彩', router: '/rules/sd', id: '29'}
        ],
        sideSelect: ''
      }
    },
    methods: {
      sideSelectFc (item) {
        this.sideSelect = item.title
        this.$router.push({
          path: item.router,
          query: {
            id: item.id
          }
        })
      }
    },
    watch: {
      $route () {}
    },
    created () {
      document.querySelector('body').style.background = '#F4F4F4'
      this.sideSelect = this.$route.meta.name
    },
    computed: {},
    mounted () {
      this.sideNav.forEach(item => {
        if (item.router == this.$route.path) {
          this.sideSelect = item.title
        }
      })
    },
    beforeDestroy () {
      document.querySelector('body').style.background = '#F9F9F9'
    },
    components: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .vp-lottery-rules-wrap {
    width: 1350px;
    margin: 0 auto;
  }

  .vp-lottery-rules-side {
    width: 300px;
    float: left;
    min-height: 900px;
    margin-right: 30px;
    background-color: #fff;
    .rules-side-header {
      height: 80px;
      padding-left: 47px;
      background: #fafafa;
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
          color: #ff6600;
          border-left: 5px solid #ff6600;
        }
        &.active {
          background: #ff6600;
          border-left: 5px solid #ff6600;
          a {
            color: #fff;
          }
        }
      }
    }
  }

  .vp-lottery-rules-container {
    float: left;
    width: 1015px;
    min-height: 900px;
    background: #fff;
  }

  .rules-container-header {
    height: 63px;
    border-bottom: 1px solid #e4e0e0;
    padding: 0 10px;
    ul {
      li {
        float: left;
        padding: 0 20px;
        cursor: pointer;
        a {
          color: #666;
          line-height: 60px;
        }
        &:hover {
          //  border-bottom: 3px solid #FF6600;
          a {
            color: #ff6600;
            // line-height: 60px;
          }
        }
        &.active {
          border-bottom: 3px solid #ff6600;
          a {
            color: #ff6600;
            line-height: 60px;
          }
        }
      }
    }
  }

  .rules-container-text {
    padding: 25px 30px;
    font-size: 14px;
    line-height: 30px;
    color: #444444;
    text-align: justify;
  }
</style>
